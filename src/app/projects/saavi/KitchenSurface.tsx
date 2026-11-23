'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { kitchenBridge, kitchenDemoPath } from '@/lib/portfolio/client/saavi-kitchen-host'
import { RetainedDemoSurface, useRetainedDemoSurface, type RetainedEntry, type SurfaceStatus } from '@/components/portfolio/case-story/RetainedDemoSurface'

/** The iframe owns Kitchen playback readiness and acknowledges manual takeover. */
export function KitchenSurface({ poster, shareHref, ...entry }: RetainedEntry & { poster: ReactNode; shareHref: string }) {
  const host = useRetainedDemoSurface(entry)
  const { expanded, close } = host
  const frame = useRef<HTMLIFrameElement>(null)
  const [status, setStatus] = useState<SurfaceStatus>('loading')
  const [attempt, setAttempt] = useState(0)
  const [origin, setOrigin] = useState('')
  useLayoutEffect(() => setOrigin(location.origin), [])
  const live = Boolean(origin) && host.live
  const interactive = expanded && status === 'manual'

  const requestMode = useCallback(() => {
    if (origin) frame.current?.contentWindow?.postMessage({
      type: kitchenBridge.mode, mode: expanded ? 'manual' : 'guided', shareHref,
    }, origin)
  }, [expanded, origin, shareHref])

  useLayoutEffect(() => {
    if (!live) { setStatus('loading'); return }
    const receive = (event: MessageEvent) => {
      if (event.origin !== origin || event.source !== frame.current?.contentWindow) return
      switch (event.data?.type) {
        case kitchenBridge.connected: requestMode(); break
        case kitchenBridge.ready: if (!expanded) setStatus('guided'); break
        case kitchenBridge.manual: if (expanded) setStatus('manual'); break
        case kitchenBridge.close: if (expanded) close(); break
        case kitchenBridge.unavailable: setStatus('unavailable'); break
      }
    }
    window.addEventListener('message', receive)
    requestMode()
    return () => window.removeEventListener('message', receive)
  }, [attempt, live, origin, expanded, close, requestMode])

  useEffect(() => {
    if (!live || status === (expanded ? 'manual' : 'guided') || status === 'unavailable') return
    const timer = window.setTimeout(() => setStatus('unavailable'), 15000)
    return () => clearTimeout(timer)
  }, [live, status, expanded, attempt])

  useEffect(() => {
    if (interactive && !host.closing.current) frame.current?.focus({ preventScroll: true })
  }, [interactive, host.closing])

  return <RetainedDemoSurface host={host} status={status} label="Saavi demo" loadingLabel="Loading Saavi…" poster={poster}
    data-kitchen-guided={status === 'guided' ? 'ready' : status}
    onRetry={() => { setStatus('loading'); setAttempt(i => i + 1) }}>
    {origin && <iframe ref={frame} key={attempt} inert={!interactive} tabIndex={interactive ? 0 : -1}
      title="Saavi Kitchen workspace" src={kitchenDemoPath + '?mode=showcase&portfolioOrigin=' + encodeURIComponent(origin)}
      onLoad={requestMode} onError={() => setStatus('unavailable')} />}
  </RetainedDemoSurface>
}
