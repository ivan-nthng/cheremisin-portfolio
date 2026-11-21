'use client'

import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, type ReactNode } from 'react'
import { appPopstateRecoveryHref, isPagesPath, ordinaryNavigation } from './policy'

type Navigation = {
  ready: (path: string) => void
  cancel: () => void
}
const Context = createContext<Navigation | null>(null)
export function usePageNavigation() {
  const value = useContext(Context)
  if (!value) throw new Error('Page navigation requires its router adapter')
  return value
}
type Request = { target: string; focus: boolean; stage: 'exit' | 'wait' | 'enter' }
type Props = {
  pathname: string
  onNavigate: (href: string) => unknown
  onRestoreUnownedEntry?: (href: string, scroll: boolean) => void
  children: ReactNode
}

/** A single owner for outgoing opacity, destination readiness and fail-open cleanup. */
export function PageMotion({ pathname, onNavigate, onRestoreUnownedEntry, children }: Props) {
  const root = useRef<HTMLDivElement>(null)
  const request = useRef<Request | null>(null)
  const animation = useRef<Animation | null>(null)
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const committed = useRef(pathname)
  const routers = useRef({ onNavigate, onRestoreUnownedEntry })
  routers.current = { onNavigate, onRestoreUnownedEntry }

  const cancel = useCallback(() => {
    request.current = null
    if (timeout.current) clearTimeout(timeout.current)
    timeout.current = null
    animation.current?.cancel()
    animation.current = null
    if (root.current) {
      root.current.style.removeProperty('opacity')
      root.current.inert = false
      root.current.dataset.pageMotion = 'idle'
    }
  }, [])

  const fade = useCallback((from: number, to: number) => {
    const node = root.current!
    const style = getComputedStyle(node)
    const token = style.getPropertyValue('--page-fade-duration').trim()
    const value = parseFloat(token)
    const duration = token.endsWith('ms') ? value : value * 1000
    const easing = style.getPropertyValue('--page-fade-ease').trim() || 'cubic-bezier(.23,1,.32,1)'
    animation.current = node.animate([{ opacity: from }, { opacity: to }], { duration: Number.isFinite(duration) ? duration : 200, easing, fill: 'both' })
    return animation.current.finished
  }, [])

  const start = useCallback((href: string) => {
    if (request.current) return
    if (document.querySelector('dialog[open],[role="dialog"][aria-modal="true"]')) return
    const from = new URL(location.href), to = new URL(href, from)
    const action = () => routers.current.onNavigate(href)
    if (!ordinaryNavigation(from, to) || isPagesPath(from.pathname) !== isPagesPath(to.pathname) ||
      matchMedia('(prefers-reduced-motion: reduce)').matches) {
      action()
      return
    }
    const current: Request = { target: to.pathname, focus: true, stage: 'exit' }
    request.current = current
    const node = root.current!
    node.inert = true
    node.dataset.pageMotion = 'exit'
    // A missing/error/slow destination must never leave the document black.
    timeout.current = setTimeout(cancel, 5000)
    void fade(1, 0).then(() => {
      if (request.current !== current) return
      node.style.opacity = '0'
      animation.current?.cancel()
      current.stage = 'wait'
      node.dataset.pageMotion = 'wait'
      try { void Promise.resolve(action()).catch(cancel) } catch { cancel() }
    }, () => {})
  }, [cancel, fade])

  const ready = useCallback((path: string) => {
    const current = request.current
    if (!current || current.target !== path || current.stage !== 'wait') return
    if (path === '/') { cancel(); return } // Home owns its eye/name entry.
    current.stage = 'enter'
    root.current!.dataset.pageMotion = 'enter'
    void fade(0, 1).then(() => {
      if (request.current !== current) return
      const focus = current.focus
      cancel()
      if (focus) {
        const heading = root.current?.querySelector<HTMLElement>('main h1') ?? root.current?.querySelector<HTMLElement>('main')
        if (heading) { if (!heading.hasAttribute('tabindex')) heading.tabIndex = -1; heading.focus({ preventScroll: true }) }
      }
    }, () => {})
  }, [cancel, fade])

  useLayoutEffect(() => {
    committed.current = pathname
    const current = request.current
    if (current && (pathname === '/' || pathname !== current.target)) cancel()
  }, [pathname, cancel])

  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    const pop = (event: PopStateEvent) => {
      const to = new URL(location.href)
      const restore = routers.current.onRestoreUnownedEntry
      if (restore) {
        const href = appPopstateRecoveryHref(event.state, committed.current, to)
        // Next ignores a native hash entry with null state. Replace this entry
        // rather than adding another history step or leaving the old view live.
        if (href) { cancel(); restore(href, Boolean(to.hash)); return }
      }
      cancel()
      const from = new URL(committed.current || '/', to)
      if (!root.current || !ordinaryNavigation(from, to) || to.pathname === '/' || reduced.matches ||
        isPagesPath(from.pathname) !== isPagesPath(to.pathname) ||
        document.querySelector('dialog[open],[role="dialog"][aria-modal="true"]')) return
      // Browser traversal already owns the URL and scroll. Use the same ready
      // gate for entry without replaying navigation or stealing restored focus.
      request.current = { target: to.pathname, focus: false, stage: 'wait' }
      root.current.style.opacity = '0'
      root.current.inert = true
      root.current.dataset.pageMotion = 'wait'
      timeout.current = setTimeout(cancel, 5000)
    }
    const hidden = () => { if (document.visibilityState === 'hidden') cancel() }
    window.addEventListener('popstate', pop)
    window.addEventListener('pageshow', cancel)
    window.addEventListener('pagehide', cancel)
    window.addEventListener('error', cancel)
    window.addEventListener('unhandledrejection', cancel)
    document.addEventListener('visibilitychange', hidden)
    reduced.addEventListener('change', cancel)
    return () => {
      window.removeEventListener('popstate', pop)
      window.removeEventListener('pageshow', cancel)
      window.removeEventListener('pagehide', cancel)
      window.removeEventListener('error', cancel)
      window.removeEventListener('unhandledrejection', cancel)
      document.removeEventListener('visibilitychange', hidden)
      reduced.removeEventListener('change', cancel)
      cancel()
    }
  }, [cancel])

  const value = useMemo<Navigation>(() => ({ cancel, ready }), [cancel, ready])

  return <Context.Provider value={value}><div ref={root} data-page-motion="idle" onClickCapture={event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    const anchor = (event.target as Element).closest<HTMLAnchorElement>('a[href]')
    if (!anchor || anchor.hasAttribute('download') ||
      anchor.target && anchor.target !== '_self' || anchor.closest('dialog,[role="dialog"],[data-no-page-motion]')) return
    const from = new URL(location.href), to = new URL(anchor.href, from)
    if (!ordinaryNavigation(from, to) || isPagesPath(from.pathname) !== isPagesPath(to.pathname) ||
      matchMedia('(prefers-reduced-motion: reduce)').matches || document.querySelector('dialog[open],[role="dialog"][aria-modal="true"]')) return
    event.preventDefault()
    start(to.pathname + to.search + to.hash)
  }}>{children}</div></Context.Provider>
}

/** Mounted inside the actual destination page, after its server content commits. */
export function PageReady() {
  const ready = useContext(Context)?.ready
  useLayoutEffect(() => {
    if (!ready) return
    const committedPath = location.pathname
    let active = true, first = 0, second = 0
    const timer = setTimeout(present, 1500)
    const images = [...document.querySelectorAll<HTMLImageElement>('main img[fetchpriority="high"]')]
    void Promise.allSettled([document.fonts.ready, ...images.map(image => image.decode().catch(() => {}))]).then(present)
    function present() {
      if (!active) return
      clearTimeout(timer)
      cancelAnimationFrame(first)
      first = requestAnimationFrame(() => { second = requestAnimationFrame(() => { if (active) ready?.(committedPath) }) })
    }
    return () => { active = false; clearTimeout(timer); cancelAnimationFrame(first); cancelAnimationFrame(second) }
  }, [ready])
  return null
}
