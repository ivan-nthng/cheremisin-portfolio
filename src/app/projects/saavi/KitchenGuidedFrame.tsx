'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { kitchenBridge, kitchenDemoPath, saaviClipCompactWidth, saaviClipFrames, type SaaviClip } from '@/lib/portfolio/client/saavi-kitchen-host'

/** A fixed-size authored scene inside a responsive workflow card. */
export function KitchenGuidedFrame({ origin, clip, compact = false }: { origin: string; clip: SaaviClip; compact?: boolean }) {
  const root = useRef<HTMLDivElement>(null)
  const frame = useRef<HTMLIFrameElement>(null)
  const [scale, setScale] = useState(1)
  const [readiness, setReadiness] = useState<{ frame: string; status: 'loading' | 'ready' | 'unavailable' }>({ frame: '', status: 'loading' })
  const dimensions = saaviClipFrames[clip]
  const width = compact ? saaviClipCompactWidth : dimensions.width
  const height = compact ? dimensions.compactHeight : dimensions.height
  const frameKey = `${clip}-${width}x${height}`
  const status = readiness.frame === frameKey ? readiness.status : 'loading'
  useLayoutEffect(() => {
    const node = root.current!
    const resize = new ResizeObserver(() => setScale(node.clientWidth / width))
    setScale(node.clientWidth / width)
    resize.observe(node)
    return () => resize.disconnect()
  }, [width])
  useEffect(() => {
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
    {status !== 'unavailable' && <iframe key={frameKey} ref={frame} title={`${clip} walkthrough`} tabIndex={-1} inert
      src={`${kitchenDemoPath}?mode=guided&clip=${clip}&portfolioOrigin=${encodeURIComponent(origin)}`}
      style={{ width, height, border: 0, transform: `scale(${scale})`, transformOrigin: 'top left', opacity: status === 'ready' ? 1 : 0, transition: 'opacity 240ms ease-out' }} />}
  </div>
}
