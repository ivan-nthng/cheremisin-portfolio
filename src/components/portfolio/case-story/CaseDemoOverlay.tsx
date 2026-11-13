'use client'

import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState, Suspense, type ReactNode, type RefObject } from 'react'
import { createPortal } from 'react-dom'
import { lockCaseScroll } from '@/components/citymobil-case/case-scroll-lock'
import styles from './case-demo-overlay.module.css'
import { caseDemoDesktopQuery, useCaseDemoDesktop } from './case-demo-viewport'

export type CaseDemo = 'publishing' | 'library' | 'metabox-products' | 'metabox-camera' | 'metabox-suite' | 'metabox-projects'
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
  const animation = useRef<Animation | null>(null)
  const origin = useRef('')
  const closing = useRef(false)
  const complete = useRef(onClose)
  complete.current = onClose

  const close = useCallback(() => {
    if (closing.current || !panel.current) return
    closing.current = true
    const node = panel.current
    const current = getComputedStyle(node).transform
    animation.current?.cancel()
    node.dataset.closing = 'true'
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    animation.current = node.animate([
      { transform: current, borderRadius: getComputedStyle(node).borderRadius },
      { transform: origin.current, borderRadius: '8px' },
    ], { duration: reduced ? 0 : 280, easing: 'cubic-bezier(.23,1,.32,1)', fill: 'both' })
    animation.current.finished.then(() => complete.current(), () => {})
  }, [])

  useLayoutEffect(() => {
    const node = dialog.current!, surface = panel.current!
    const launcher = entry.current
    const imageEntry = launcher?.closest('section')?.querySelector<HTMLElement>('[data-case-image-entry]')
    const bounds = (source?.current ?? launcher)?.getBoundingClientRect()
    origin.current = bounds ? `translate(${bounds.x}px,${bounds.y}px) scale(${bounds.width / innerWidth},${bounds.height / innerHeight})` : 'scale(.96)'
    const lock = lockCaseScroll()
    node.showModal()
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    animation.current = surface.animate([
      { transform: origin.current, borderRadius: '8px' },
      { transform: 'none', borderRadius: '0px' },
    ], { duration: reduced ? 0 : 420, easing: 'cubic-bezier(.23,1,.32,1)', fill: 'both' })
    // Native lazy workspaces may mount after the top-layer dialog is opened.
    const focus = (opening = false) => {
      if (closing.current || !opening && node.contains(document.activeElement) && document.activeElement !== node) return
      const target = node.querySelector<HTMLElement>('[data-demo-scenario-bar] [role="tab"][aria-selected="true"]')
        ?? node.querySelector<HTMLElement>('[data-hosted] button, button')
      target?.focus({ preventScroll: true })
    }
    const observer = new MutationObserver(() => focus())
    observer.observe(surface, { subtree: true, childList: true })
    focus(true)
    return () => {
      observer.disconnect()
      animation.current?.cancel()
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
    <div ref={panel} className={styles.panel}>{children(close)}</div>
  </dialog>, document.body)
}

export function CaseDemoProvider({ children, renderDemo }: { children: ReactNode; renderDemo: (demo: CaseDemo, close: () => void, navigate: (next: CaseDemo) => void) => ReactNode }) {
  const [demo, setDemo] = useState<CaseDemo | null>(null)
  const desktop = useCaseDemoDesktop()
  const active = desktop && demo !== null
  const entry = useRef<HTMLElement>(null)
  const source = useRef<HTMLElement>(null)
  useEffect(() => { if (!desktop) setDemo(null) }, [desktop])
  const open = useCallback((next: CaseDemo, launcher: HTMLElement) => {
    if (!matchMedia(caseDemoDesktopQuery).matches) return
    entry.current = launcher
    source.current = launcher.closest<HTMLElement>('[data-case-demo-media],[data-case-browser],li') ?? launcher
    setDemo(next)
  }, [])
  return <Context.Provider value={{ active, open }}>
    {children}
    {desktop && demo && <CaseDemoOverlay entry={entry} source={source} onClose={() => setDemo(null)} label="Interactive product demo">
      {close => <div><Suspense fallback={<div className={styles.loading}>Loading demo… <button onClick={close}>Close</button></div>}>
        {renderDemo(demo, close, setDemo)}
      </Suspense></div>}
    </CaseDemoOverlay>}
  </Context.Provider>
}
