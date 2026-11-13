'use client'

import { useEffect, useRef, useState } from 'react'
import { kitchenBridge, kitchenDemoPath, saaviClipCompactWidth, saaviClipFrames, type SaaviClip } from '@/lib/portfolio/client/saavi-kitchen-host'

/** Authored iframe shared by the showcase and workflow cards. */
export function KitchenGuidedFrame({ origin, clip, compact = false }: { origin: string; clip?: SaaviClip; compact?: boolean }) {
  const root = useRef<HTMLDivElement>(null)
  const frame = useRef<HTMLIFrameElement>(null)
  const [scale, setScale] = useState(1)
  const [status, setStatus] = useState<'loading' | 'ready' | 'unavailable'>('loading')
  const dimensions = clip && saaviClipFrames[clip]
  const width = dimensions ? compact ? saaviClipCompactWidth : dimensions.width : 1280
  const height = dimensions ? compact ? dimensions.compactHeight : dimensions.height : 720
  useEffect(() => {
    const node = root.current!
    const resize = new ResizeObserver(() => setScale(node.clientWidth / width))
    resize.observe(node)
    return () => resize.disconnect()
  }, [width])
  useEffect(() => {
    const timeout = window.setTimeout(() => setStatus(value => value === 'ready' ? value : 'unavailable'), 15000)
    const receive = (event: MessageEvent) => {
      if (event.origin !== origin || event.source !== frame.current?.contentWindow) return
      if (event.data?.type === kitchenBridge.ready) { clearTimeout(timeout); setStatus('ready') }
      if (event.data?.type === kitchenBridge.unavailable) { clearTimeout(timeout); setStatus('unavailable') }
    }
    window.addEventListener('message', receive)
    return () => { clearTimeout(timeout); window.removeEventListener('message', receive) }
  }, [origin])
  return <div ref={root} data-kitchen-guided={status} aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
    {status !== 'unavailable' && <iframe ref={frame} title={`${clip ?? 'Kitchen order'} walkthrough`} tabIndex={-1} inert
      src={`${kitchenDemoPath}?mode=guided${clip ? `&clip=${clip}` : ''}&portfolioOrigin=${encodeURIComponent(origin)}`}
      style={{ width, height, border: 0, transform: `scale(${scale})`, transformOrigin: 'top left', opacity: status === 'ready' ? 1 : 0, transition: 'opacity 240ms ease-out' }} />}
  </div>
}
