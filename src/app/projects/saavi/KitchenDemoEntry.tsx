'use client'

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { CaseDemoOverlay } from '@/components/portfolio/case-story/CaseDemoOverlay'
import { CaseDemoArrow } from '@/components/portfolio/case-story/CaseTemplate'
import { CaseGuidedShowcase } from '@/components/portfolio/case-story/CaseGuidedShowcase'
import { useCaseDemoDesktop } from '@/components/portfolio/case-story/case-demo-viewport'
import DemoShell, { DemoShare } from '@/components/portfolio/demo/DemoShell'
import { useSharedDemoEntry } from '@/components/portfolio/case-story/useSharedDemoEntry'
import { demoLinks, demoShortPath, type DemoLinkId } from '@/lib/portfolio/demo-links'
import { siteUrl } from '@/lib/seo'
import { kitchenBridge, kitchenDemoPath } from '@/lib/portfolio/client/saavi-kitchen-host'
import layout from '@/components/portfolio/case-story/case-draft.module.css'
import { KitchenGuidedFrame } from './KitchenGuidedFrame'

const shareHref = siteUrl + demoShortPath('saavi')

function KitchenFrame({ close, origin }: { close: () => void; origin: string }) {
  const frame = useRef<HTMLIFrameElement>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'unavailable'>('loading')
  const [visit, setVisit] = useState(0)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const timeout = window.setTimeout(() => setStatus(value => value === 'ready' ? value : 'unavailable'), 15000)
    const receive = (event: MessageEvent) => {
      if (event.origin !== origin || event.source !== frame.current?.contentWindow) return
      if (event.data?.type === kitchenBridge.close) close()
      if (event.data?.type === kitchenBridge.ready) {
        clearTimeout(timeout)
        setStatus('ready')
      }
    }
    window.addEventListener('message', receive)
    return () => { clearTimeout(timeout); window.removeEventListener('message', receive) }
  }, [close, origin, visit])
  useEffect(() => { if (status === 'ready') frame.current?.focus({ preventScroll: true }) }, [status])

  function retry() { setStatus('loading'); setVisit(value => value + 1) }
  return <>
    {status !== 'ready' && <DemoShell label="Saavi demo" theme={theme} onTheme={setTheme} onRestart={retry} onReturn={close} shareHref={shareHref}>
      <div className={layout.draftSlot} role="status" data-case-demo-loading={status === 'loading' ? '' : undefined}>
        <p>{status === 'loading' ? 'Loading Saavi…' : 'The Saavi demo is unavailable.'}</p>
        {status === 'unavailable' && <button type="button" className="editorial-link" onClick={retry}>Try again<CaseDemoArrow /></button>}
      </div>
    </DemoShell>}
    <iframe key={visit} ref={frame} title="Saavi — interactive demo"
      src={`${kitchenDemoPath}?portfolioOrigin=${encodeURIComponent(origin)}`}
      style={{ display: status === 'ready' ? 'block' : 'none', width: '100%', height: '100dvh', border: 0 }}
      onError={() => setStatus('unavailable')} />
    {status === 'ready' && <DemoShare href={shareHref} inFrameHost frameRef={frame} />}
  </>
}

export default function KitchenDemoEntry({ backdrop }: { backdrop: ReactNode }) {
  const entry = useRef<HTMLButtonElement>(null)
  const source = useRef<HTMLElement>(null)
  const desktop = useCaseDemoDesktop()
  const [origin, setOrigin] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const active = desktop && open
  useEffect(() => { setOrigin(location.origin) }, [])
  useEffect(() => { if (!desktop) setOpen(false) }, [desktop])

  const openDemo = useCallback((_: DemoLinkId, launcher: HTMLElement) => {
    if (!(launcher instanceof HTMLButtonElement)) return
    entry.current = launcher
    source.current = launcher.closest<HTMLElement>('[data-case-browser]')
    setOpen(true)
  }, [])
  useSharedDemoEntry(desktop && Boolean(origin), openDemo)
  const trigger = origin && <button type="button" className="editorial-link" aria-haspopup="dialog" data-shared-demo-entry onClick={event => openDemo('saavi', event.currentTarget)}>Try Live Demo<CaseDemoArrow /></button>
  const poster = <img className={layout.poster} src="/images/saavi/case/kitchen-overview-desktop-babc384fd20b.jpg" width={1280} height={720}
    alt="Kitchen overview with the production queue, active orders and sales." loading="lazy" draggable={false} />
  return <>
    <CaseGuidedShowcase id={demoLinks.saavi.anchor} headingId="saavi-kitchen-title" kicker="Saavi / Kitchen"
      lines={['An order arrives.', 'The kitchen gets to work.']} chrome="Saavi — Kitchen" wide className={layout.photographicShowcase}
      backdrop={backdrop} suspended={active} still={poster} scene={origin ? <KitchenGuidedFrame origin={origin} /> : poster} entry={trigger}
      mobilePoster={{ src: '/images/saavi/case/kitchen-overview-mobile-88c1ff5ac900.jpg', alt: 'Kitchen on a mobile screen.', width: 390, height: 844 }} />
    {active && origin && <CaseDemoOverlay entry={entry} source={source} label="Saavi demo" onClose={() => setOpen(false)}>
      {close => <KitchenFrame close={close} origin={origin} />}
    </CaseDemoOverlay>}
  </>
}
