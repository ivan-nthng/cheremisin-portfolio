'use client'

import { createContext, useCallback, useContext, useEffect, useRef, useState, type KeyboardEvent, type ReactNode, type RefObject } from 'react'
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
export type CardPlayback = RefObject<(() => void) | null> & { view?: CaseDemo }
export type RetainedControls = {
  cardInterrupt?: (key: CaseDemo) => CardPlayback
  expanded: boolean
  launcher: RefObject<HTMLElement | null>
  interrupt: CardPlayback
  onClose: () => void
}
const Context = createContext<{ active: boolean; open: (demo: CaseDemo, entry: HTMLElement) => void; retained?: RetainedControls; demo: CaseDemo | null; navigate: (demo: CaseDemo) => void }>({ active: false, open: () => {}, demo: null, navigate: () => {} })
export const useCaseDemo = () => useContext(Context)

export function keepDialogTabInside(event: KeyboardEvent<HTMLDialogElement>) {
  const dialog = event.currentTarget
  if (event.key !== 'Tab' || event.defaultPrevented || (event.target as HTMLElement).closest('dialog') !== dialog) return
  const controls = [...dialog.querySelectorAll<HTMLElement>('button,a[href],input,textarea,select,details > summary:first-of-type,iframe,[tabindex]')]
    .filter(node => node.tabIndex >= 0 && !node.matches(':disabled') && !node.closest('[inert],[aria-hidden=true]') && node.getClientRects().length)
  const index = controls.indexOf(document.activeElement as HTMLElement)
  if (event.shiftKey && index <= 0) { event.preventDefault(); controls.at(-1)?.focus({ preventScroll: true }) }
  else if (!event.shiftKey && (index < 0 || index === controls.length - 1)) { event.preventDefault(); controls[0]?.focus({ preventScroll: true }) }
}

export function sourceTransform(bounds: DOMRect | undefined, surface: HTMLElement) {
  return bounds && bounds.width > 0 && bounds.height > 0
    ? `translate(${bounds.x}px,${bounds.y}px) scale(${bounds.width / surface.offsetWidth},${bounds.height / surface.offsetHeight})`
    : 'scale(.96)'
}

export function CaseDemoProvider({ children, retainedDemo }: { children: ReactNode; retainedDemo: CaseDemo | readonly CaseDemo[] }) {
  const [demo, setDemo] = useState<CaseDemo | null>(null)
  const [shareEnabled, setShareEnabled] = useState(false)
  const desktop = useCaseDemoDesktop()
  const active = desktop && demo !== null
  const entry = useRef<HTMLElement>(null)
  const interrupt = useRef<(() => void) | null>(null)
  const cards = useRef(new Map<CaseDemo, CardPlayback>())
  const cardInterrupt = useCallback((key: CaseDemo): CardPlayback => {
    const ref = cards.current.get(key) ?? { current: null }
    cards.current.set(key, ref)
    return ref
  }, [])
  const closeDemo = useCallback(() => setDemo(null), [])
  const navigate = useCallback((next: CaseDemo) => setDemo(current => current === null ? null : next), [])
  useEffect(() => { if (!desktop) setDemo(null) }, [desktop])
  const open = useCallback((next: CaseDemo, launcher: HTMLElement, sharedLink = false) => {
    if (!matchMedia(caseDemoDesktopQuery).matches) return
    if (Array.isArray(retainedDemo) ? !retainedDemo.includes(next) : retainedDemo !== next) return
    const key = launcher.dataset.demoCardEntry as CaseDemo | undefined
    const playback: CardPlayback = key ? cardInterrupt(key) : interrupt
    // Ordinary clicks keep the frame on screen. A shared link names a specific destination.
    const view = sharedLink ? next : playback.view ?? next
    playback.current?.()
    entry.current = launcher
    setShareEnabled(location.pathname === demoLinks[next].path)
    setDemo(view)
  }, [retainedDemo, cardInterrupt])
  const openShared = useCallback((id: DemoLinkId, launcher: HTMLElement) => {
    if (id !== 'citymobil' && id !== 'saavi') open(id, launcher, true)
  }, [open])
  useSharedDemoEntry(desktop, openShared)
  const retained = { expanded: active, launcher: entry, interrupt, cardInterrupt, onClose: closeDemo }
  return <Context.Provider value={{ active, open, retained, demo, navigate }}>
    <DemoShareContext.Provider value={demo && active && shareEnabled ? siteUrl + demoShortPath(demo) : undefined}>{children}</DemoShareContext.Provider>
  </Context.Provider>
}
