'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { CaseDemoOverlay } from '@/components/portfolio/case-story/CaseDemoOverlay'
import { CaseDemoArrow } from '@/components/portfolio/case-story/CaseTemplate'
import { CaseGuidedShowcase } from '@/components/portfolio/case-story/CaseGuidedShowcase'
import { useCaseDemoDesktop } from '@/components/portfolio/case-story/case-demo-viewport'
import DemoShell from '@/components/portfolio/demo/DemoShell'
import { isKitchenCaseOrigin, kitchenBridge, kitchenDemoOrigin } from '@/lib/portfolio/client/saavi-kitchen-host'
import layout from '@/components/portfolio/case-story/case-draft.module.css'
import { KitchenGuidedFrame } from './KitchenGuidedFrame'

function KitchenFrame({ close, origin }: { close: () => void; origin: string }) {
  const frame = useRef<HTMLIFrameElement>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'unavailable'>('loading')
  const [visit, setVisit] = useState(0)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const timeout = window.setTimeout(() => setStatus(value => value === 'ready' ? value : 'unavailable'), 15000)
    const receive = (event: MessageEvent) => {
      if (event.origin !== kitchenDemoOrigin || event.source !== frame.current?.contentWindow) return
      if (event.data?.type === kitchenBridge.close) close()
      if (event.data?.type === kitchenBridge.ready) {
        clearTimeout(timeout)
        setStatus('ready')
      }
    }
    window.addEventListener('message', receive)
    return () => { clearTimeout(timeout); window.removeEventListener('message', receive) }
  }, [close, visit])
  useEffect(() => { if (status === 'ready') frame.current?.focus({ preventScroll: true }) }, [status])

  function retry() { setStatus('loading'); setVisit(value => value + 1) }
  return <>
    {status !== 'ready' && <DemoShell label="Saavi demo" theme={theme} onTheme={setTheme} onRestart={retry} onReturn={close}>
      <div className={layout.draftSlot} role="status">
        <p>{status === 'loading' ? 'Loading Saavi…' : 'The local Saavi demo is unavailable.'}</p>
        {status === 'unavailable' && <button type="button" className="editorial-link" onClick={retry}>Try again<CaseDemoArrow /></button>}
      </div>
    </DemoShell>}
    <iframe key={visit} ref={frame} title="Saavi — interactive demo"
      src={`${kitchenDemoOrigin}/?portfolioOrigin=${encodeURIComponent(origin)}`}
      style={{ display: status === 'ready' ? 'block' : 'none', width: '100%', height: '100dvh', border: 0 }}
      onError={() => setStatus('unavailable')} />
  </>
}

export default function KitchenDemoEntry({ backdrop, available }: { backdrop: ReactNode; available: boolean }) {
  const entry = useRef<HTMLButtonElement>(null)
  const source = useRef<HTMLElement>(null)
  const desktop = useCaseDemoDesktop()
  const [origin, setOrigin] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const active = desktop && open
  useEffect(() => { if (available && isKitchenCaseOrigin(location.origin)) setOrigin(location.origin) }, [available])
  useEffect(() => { if (!desktop) setOpen(false) }, [desktop])

  const trigger = origin && <button type="button" className="editorial-link" aria-haspopup="dialog" onClick={event => {
    entry.current = event.currentTarget
    source.current = event.currentTarget.closest<HTMLElement>('[data-case-browser]')
    setOpen(true)
  }}>Try Live Demo<CaseDemoArrow /></button>
  const poster = <img className={layout.poster} src="/images/saavi/case/kitchen-desktop.jpg" width={1280} height={720}
    alt="Kitchen overview with the production queue, active orders and sales." loading="lazy" draggable={false} />
  return <>
    <CaseGuidedShowcase id="kitchen" headingId="saavi-kitchen-title" kicker="Saavi / Kitchen"
      lines={['An order arrives.', 'The kitchen gets to work.']} chrome="Saavi — Kitchen" wide className={layout.photographicShowcase}
      backdrop={backdrop} suspended={active} still={poster} scene={origin ? <KitchenGuidedFrame origin={origin} /> : poster} entry={trigger}
      mobilePoster={{ src: '/images/saavi/case/kitchen-mobile.jpg', alt: 'Kitchen on a mobile screen.', width: 390, height: 844 }} />
    {active && origin && <CaseDemoOverlay entry={entry} source={source} label="Saavi demo" onClose={() => setOpen(false)}>
      {close => <KitchenFrame close={close} origin={origin} />}
    </CaseDemoOverlay>}
  </>
}
