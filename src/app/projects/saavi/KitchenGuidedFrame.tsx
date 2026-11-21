'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { kitchenBridge, kitchenDemoPath, saaviClipCompactWidth, saaviClipFrames, type SaaviClip } from '@/lib/portfolio/client/saavi-kitchen-host'

/** Authored iframe shared by the showcase and workflow cards. */
export function KitchenGuidedFrame({ origin, clip, compact = false }: { origin: string; clip?: SaaviClip; compact?: boolean }) {
  const root = useRef<HTMLDivElement>(null)
  const frame = useRef<HTMLIFrameElement>(null)
  const [scale, setScale] = useState(1)
  const [resizing, setResizing] = useState(false)
  const [readiness, setReadiness] = useState<{ frame: string; status: 'loading' | 'ready' | 'unavailable' }>({ frame: '', status: 'loading' })
  const [viewport, setViewport] = useState<{ width: number; height: number } | null>(null)
  const dimensions = clip && saaviClipFrames[clip]
  const width = dimensions ? compact ? saaviClipCompactWidth : dimensions.width : viewport?.width ?? 1280
  const height = dimensions ? compact ? dimensions.compactHeight : dimensions.height : viewport?.height ?? 688
  const frameKey = viewport || dimensions ? `${width}x${height}` : ''
  const status = resizing || readiness.frame !== frameKey ? 'loading' : readiness.status
  useEffect(() => {
    if (clip) return
    // The manual demo reserves its 32px toolbar. Match the remaining native
    // AppShell viewport, and commit one new iframe only after resize settles.
    const measure = () => setViewport({ width: window.innerWidth, height: Math.max(1, window.innerHeight - 32) })
    measure()
    let timer: ReturnType<typeof setTimeout> | undefined
    const onResize = () => {
      setResizing(true)
      clearTimeout(timer)
      timer = setTimeout(() => { measure(); setResizing(false) }, 180)
    }
    window.addEventListener('resize', onResize)
    return () => { clearTimeout(timer); window.removeEventListener('resize', onResize) }
  }, [clip])
  useLayoutEffect(() => {
    const node = root.current!
    const resize = new ResizeObserver(() => setScale(node.clientWidth / width))
    setScale(node.clientWidth / width)
    resize.observe(node)
    return () => resize.disconnect()
  }, [width])
  useEffect(() => {
    if (!frameKey) return
    const currentFrame = frame.current
    const timeout = window.setTimeout(() => setReadiness(value => value.frame === frameKey && value.status === 'ready' ? value : { frame: frameKey, status: 'unavailable' }), 15000)
    const receive = (event: MessageEvent) => {
      if (event.origin !== origin || event.source !== currentFrame?.contentWindow) return
      if (event.data?.type === kitchenBridge.ready) { clearTimeout(timeout); setReadiness({ frame: frameKey, status: 'ready' }) }
      if (event.data?.type === kitchenBridge.unavailable) { clearTimeout(timeout); setReadiness({ frame: frameKey, status: 'unavailable' }) }
    }
    window.addEventListener('message', receive)
    return () => { clearTimeout(timeout); window.removeEventListener('message', receive) }
  }, [frameKey, origin])
  return <div ref={root} data-kitchen-guided={status} aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
    {status !== 'unavailable' && (dimensions || viewport) && <iframe key={`${width}x${height}`} ref={frame} title={`${clip ?? 'Kitchen order'} walkthrough`} tabIndex={-1} inert
      src={`${kitchenDemoPath}?mode=guided${clip ? `&clip=${clip}` : ''}&portfolioOrigin=${encodeURIComponent(origin)}`}
      style={{ width, height, border: 0, transform: `scale(${scale})`, transformOrigin: 'top left', opacity: status === 'ready' ? 1 : 0, transition: 'opacity 240ms ease-out' }} />}
  </div>
}
