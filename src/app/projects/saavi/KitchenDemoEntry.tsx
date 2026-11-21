'use client'

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { CaseDemoArrow } from '@/components/portfolio/case-story/CaseTemplate'
import { CaseGuidedShowcase } from '@/components/portfolio/case-story/CaseGuidedShowcase'
import { useCaseDemoDesktop } from '@/components/portfolio/case-story/case-demo-viewport'
import { useSharedDemoEntry } from '@/components/portfolio/case-story/useSharedDemoEntry'
import { demoLinks, demoShortPath, type DemoLinkId } from '@/lib/portfolio/demo-links'
import { siteUrl } from '@/lib/seo'
import layout from '@/components/portfolio/case-story/case-draft.module.css'
import { KitchenSurface } from './KitchenSurface'

const shareHref = siteUrl + demoShortPath('saavi')

export default function KitchenDemoEntry({ backdrop }: { backdrop: ReactNode }) {
  const entry = useRef<HTMLButtonElement>(null)
  const desktop = useCaseDemoDesktop()
  const [open, setOpen] = useState(false)
  const active = desktop && open
  useEffect(() => { if (!desktop) setOpen(false) }, [desktop])
  const close = useCallback(() => setOpen(false), [])

  const openDemo = useCallback((_: DemoLinkId, launcher: HTMLElement) => {
    if (!(launcher instanceof HTMLButtonElement)) return
    entry.current = launcher
    setOpen(true)
  }, [])
  useSharedDemoEntry(desktop, openDemo)
  const trigger = <button type="button" className="editorial-link" aria-haspopup="dialog" data-shared-demo-entry onClick={event => openDemo('saavi', event.currentTarget)}>Try Live Demo<CaseDemoArrow /></button>
  const poster = <picture><source media="(min-width: 1360px)" srcSet="/images/saavi/case/kitchen-overview-wide-f60e418c078c.webp" />
    <img className={layout.poster} src="/images/saavi/case/kitchen-overview-desktop-1be0489481bc.webp" width={1280} height={688}
      alt="Kitchen overview with the production queue, active orders and sales." loading="lazy" draggable={false} /></picture>
  return <CaseGuidedShowcase id={demoLinks.saavi.anchor} headingId="saavi-kitchen-title" kicker="Saavi / Kitchen"
      lines={['An order arrives.', 'The kitchen gets to work.']} chrome="Saavi — Kitchen" wide className={layout.photographicShowcase}
      backdrop={backdrop} suspended={active} still={poster} desktopPreview={<KitchenSurface expanded={active} onClose={close} launcher={entry} poster={poster} shareHref={shareHref} />} entry={trigger}
      mobilePoster={{ src: '/images/saavi/case/kitchen-overview-mobile-1e814f6ceed1.webp', alt: 'Kitchen on a mobile screen.', width: 390, height: 812 }} />
}
