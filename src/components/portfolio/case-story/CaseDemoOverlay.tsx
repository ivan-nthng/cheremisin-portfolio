'use client'

import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState, Suspense, type ReactNode, type RefObject } from 'react'
import { createPortal } from 'react-dom'
import { lockCaseScroll } from '@/components/citymobil-case/case-scroll-lock'
import styles from './case-demo-overlay.module.css'
import { caseDemoDesktopQuery, useCaseDemoDesktop } from './case-demo-viewport'
import { useSharedDemoEntry } from './useSharedDemoEntry'
import { demoLinks, demoShortPath, type DemoLinkId } from '@/lib/portfolio/demo-links'
import { siteUrl } from '@/lib/seo'
import { DemoShareContext } from '../demo/demo-share-context'

export type CaseDemo = Exclude<DemoLinkId, 'citymobil' | 'saavi'>
const destinations: Record<string, CaseDemo> = {
  '/preview/litres-readers': 'library',
  '/preview/metabox': 'metabox-camera',
  '/preview/metabox/products': 'metabox-products',
  '/preview/metabox/suite': 'metabox-suite',
  '/preview/metabox/suite/projects': 'metabox-projects',
}
export const caseDemoForHref = (href: string) => destinations[href]
const Context = createContext<{ active: boolean; open: (demo: CaseDemo, entry: HTMLElement) => void }>({ active: false, open: () => {} })
export const useCaseDemo = () => useContext(Context)

type OverlayProps = {
  entry: RefObject<HTMLElement | null>
  source?: RefObject<HTMLElement | null>
  fallback?: RefObject<HTMLElement | null>
  revealFallback?: boolean
  onClose: () => void
  label: string
  children: (close: () => void) => ReactNode
}

/** One top-layer dialog owns animation, scroll restoration and focus for all case demos. */
export function CaseDemoOverlay({ entry, source, fallback, revealFallback = false, onClose, label, children }: OverlayProps) {
  const dialog = useRef<HTMLDialogElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const backdrop = useRef<HTMLDivElement>(null)
  const animation = useRef<Animation | null>(null)
  const backdropAnimation = useRef<Animation | null>(null)
  const sourceElement = useRef<HTMLElement | null>(null)
  const origin = useRef<DOMRect | undefined>(undefined)
  const started = useRef(false)
  const closing = useRef(false)
  const complete = useRef(onClose)
  complete.current = onClose

  const close = useCallback(() => {
    if (closing.current || !panel.current) return
    closing.current = true
    // Lazy content is still preparing behind the unchanged inline preview.
    if (!started.current) { complete.current(); return }
    const node = panel.current
    const current = getComputedStyle(node).transform
    const opacity = getComputedStyle(node).opacity
    const shade = backdrop.current!
    const shadeOpacity = getComputedStyle(shade).opacity
    const bounds = sourceElement.current?.isConnected ? sourceElement.current.getBoundingClientRect() : origin.current
    animation.current?.cancel()
    backdropAnimation.current?.cancel()
    node.dataset.closing = 'true'
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    const duration = reduced ? 120 : 220
    animation.current = node.animate([
      { transform: reduced ? 'none' : current, opacity },
      // Once most of the spatial return is complete, reveal the existing inline
      // surface before disposal instead of replacing an opaque workspace.
      ...(!reduced ? [{ opacity, offset: .8 }] : []),
      { transform: reduced ? 'none' : sourceTransform(bounds, node), opacity: 0 },
    ], { duration, easing: 'cubic-bezier(.23,1,.32,1)', fill: 'both' })
    backdropAnimation.current = shade.animate([{ opacity: shadeOpacity }, { opacity: 0 }], {
      duration, easing: 'cubic-bezier(.23,1,.32,1)', fill: 'both',
    })
    animation.current.finished.then(() => complete.current(), () => {})
  }, [])

  useLayoutEffect(() => {
    const node = dialog.current!, surface = panel.current!
    const launcher = entry.current
    const imageEntry = launcher?.closest('section')?.querySelector<HTMLElement>('[data-case-image-entry]')
    sourceElement.current = source?.current ?? launcher
    origin.current = sourceElement.current?.getBoundingClientRect()
    // Keep sticky previews in their current viewport while the dialog owns input.
    const lock = lockCaseScroll({ preserveSticky: true })
    surface.style.visibility = 'hidden'
    backdrop.current!.style.opacity = '0'
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    node.showModal()
    surface.style.transform = reduced ? 'none' : sourceTransform(origin.current, surface)
    // Native lazy workspaces may mount after the top-layer dialog is opened.
    const focus = (opening = false) => {
      if (!started.current || closing.current || !opening && node.contains(document.activeElement) && document.activeElement !== node) return
      const target = node.querySelector<HTMLElement>('[data-demo-scenario-bar] [role="tab"][aria-selected="true"]')
        ?? node.querySelector<HTMLElement>('[data-hosted] button, button')
      target?.focus({ preventScroll: true })
    }
    const begin = () => {
      if (closing.current || started.current) return
      const frameReady = [...surface.querySelectorAll('iframe')].some(frame => getComputedStyle(frame).display !== 'none')
      if (surface.querySelector('[data-case-demo-loading]') || !frameReady && !surface.querySelector('[data-hosted]')) return
      started.current = true
      delete surface.dataset.preparing
      surface.style.visibility = 'visible'
      const bounds = sourceElement.current?.isConnected ? sourceElement.current.getBoundingClientRect() : origin.current
      animation.current = surface.animate([
        { transform: reduced ? 'none' : sourceTransform(bounds, surface), opacity: reduced ? 0 : 1 },
        { transform: 'none', opacity: 1 },
      ], { duration: reduced ? 120 : 280, easing: 'cubic-bezier(.23,1,.32,1)', fill: 'both' })
      backdropAnimation.current = backdrop.current!.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: reduced ? 120 : 280, easing: 'cubic-bezier(.23,1,.32,1)', fill: 'both',
      })
      focus(true)
    }
    const observer = new MutationObserver(() => { begin(); focus() })
    observer.observe(surface, { subtree: true, childList: true })
    begin()
    return () => {
      observer.disconnect()
      started.current = false
      animation.current?.cancel()
      backdropAnimation.current?.cancel()
      node.close()
      lock.restore()
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (location.href !== lock.route || document.querySelector('dialog:modal')) return
        const target = [launcher, fallback?.current, imageEntry].find(control => control?.isConnected && control.getClientRects().length)
        target?.focus({ preventScroll: true })
        if (revealFallback && target && target !== launcher) {
          const top = target.getBoundingClientRect().top
          if (top < 68 || top > innerHeight / 2) window.scrollTo({ top: scrollY + top - 68, behavior: 'instant' })
        }
      }))
    }
  }, [entry, source, fallback, revealFallback])

  return createPortal(<dialog ref={dialog} className={styles.dialog} aria-label={label} data-case-demo tabIndex={-1}
    onCancel={event => { if (event.target !== event.currentTarget) return; event.preventDefault(); close() }}
    onKeyDown={event => {
      if (event.key !== 'Tab' || event.defaultPrevented || (event.target as HTMLElement).closest('dialog') !== event.currentTarget) return
      const controls = [...event.currentTarget.querySelectorAll<HTMLElement>('button,a[href],input,textarea,select,[tabindex]')].filter(node => node.tabIndex >= 0 && !node.matches(':disabled') && !node.closest('[inert],[aria-hidden=true]') && node.getClientRects().length)
      const index = controls.indexOf(document.activeElement as HTMLElement)
      if (event.shiftKey && index <= 0) { event.preventDefault(); controls.at(-1)?.focus({ preventScroll: true }) }
      else if (!event.shiftKey && (index < 0 || index === controls.length - 1)) { event.preventDefault(); controls[0]?.focus({ preventScroll: true }) }
    }}>
    <div ref={backdrop} className={styles.backdrop} aria-hidden="true" />
    <div ref={panel} className={styles.panel} data-preparing>{children(close)}</div>
  </dialog>, document.body)
}

export function sourceTransform(bounds: DOMRect | undefined, surface: HTMLElement) {
  return bounds && bounds.width > 0 && bounds.height > 0
    ? `translate(${bounds.x}px,${bounds.y}px) scale(${bounds.width / surface.offsetWidth},${bounds.height / surface.offsetHeight})`
    : 'scale(.96)'
}

export function CaseDemoProvider({ children, renderDemo }: { children: ReactNode; renderDemo: (demo: CaseDemo, close: () => void, navigate: (next: CaseDemo) => void) => ReactNode }) {
  const [demo, setDemo] = useState<CaseDemo | null>(null)
  const [shareEnabled, setShareEnabled] = useState(false)
  const desktop = useCaseDemoDesktop()
  const active = desktop && demo !== null
  const entry = useRef<HTMLElement>(null)
  const source = useRef<HTMLElement>(null)
  useEffect(() => { if (!desktop) setDemo(null) }, [desktop])
  const open = useCallback((next: CaseDemo, launcher: HTMLElement) => {
    if (!matchMedia(caseDemoDesktopQuery).matches) return
    entry.current = launcher
    source.current = launcher.closest<HTMLElement>('[data-case-demo-media],[data-case-browser],li') ?? launcher
    setShareEnabled(location.pathname === demoLinks[next].path)
    setDemo(next)
  }, [])
  const openShared = useCallback((id: DemoLinkId, launcher: HTMLElement) => {
    if (id !== 'citymobil' && id !== 'saavi') open(id, launcher)
  }, [open])
  useSharedDemoEntry(desktop, openShared)
  return <Context.Provider value={{ active, open }}>
    {children}
    {desktop && demo && <CaseDemoOverlay entry={entry} source={source} onClose={() => setDemo(null)} label="Interactive product demo">
      {close => <DemoShareContext.Provider value={shareEnabled ? siteUrl + demoShortPath(demo) : undefined}><div><Suspense fallback={<div className={styles.loading}>Loading demo… <button onClick={close}>Close</button></div>}>
        {renderDemo(demo, close, setDemo)}
      </Suspense></div></DemoShareContext.Provider>}
    </CaseDemoOverlay>}
  </Context.Provider>
}
