'use client'

import { useLayoutEffect, useRef, type ReactNode } from 'react'

/** HTML starts visible. Only a working observer may opt a unit into motion. */
export function RepeatReveal({ children, className = '', clearDock = false }: { children: ReactNode; className?: string; clearDock?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const edge = useRef<HTMLSpanElement>(null)
  useLayoutEffect(() => {
    const node = ref.current
    if (!node || !('IntersectionObserver' in window)) return
    let observer: IntersectionObserver | undefined
    const configure = () => {
      observer?.disconnect()
      const rect = node.getBoundingClientRect()
      const topBand = Math.min(128, window.innerHeight * .25)
      const dock = clearDock ? document.querySelector<HTMLElement>('.portfolio-floating-dock') : null
      const dockInset = dock ? Number.parseFloat(getComputedStyle(dock).bottom) || 24 : 24
      const bottomBand = clearDock
        ? dockInset + 44 + 24 + 8
        : Math.min(64, window.innerHeight * .15)
      // The first real career unit must clear the dock, including its8px
      // travel. Oversized units fall back to partial entry so they stay reachable.
      const wholeUnit = clearDock && rect.height <= window.innerHeight - topBand - bottomBand
      // Keep already-painted content visible during hydration. Only offscreen
      // units can start hidden without a visible loading flash.
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) node.dataset.reveal = 'hidden'
      else if (!node.dataset.reveal) node.dataset.reveal = 'visible'
      let initial = true
      try {
        observer = new IntersectionObserver(([entry]) => {
          if (initial) {
            initial = false
            const { top, bottom } = entry.boundingClientRect
            if (!entry.isIntersecting && bottom > 0 && top < window.innerHeight) return
          }
          node.dataset.reveal = entry.isIntersecting ? 'visible' : 'hidden'
        }, {
          threshold: 0,
          // Exit above the opaque 60px header while content is still visible.
          // Pixel bands work for tall media without unreachable area ratios.
          rootMargin: `-${topBand}px 0px -${bottomBand}px 0px`,
        })
        // Observing a ratio1 box misses fast jumps between two partial
        // intersections. The stable bottom edge crosses the entry/exit bands
        // even when the whole fitting unit skips past the viewport middle.
        observer.observe(wholeUnit && edge.current ? edge.current : node)
      } catch { delete node.dataset.reveal }
    }
    configure()
    window.addEventListener('resize', configure)
    return () => { observer?.disconnect(); window.removeEventListener('resize', configure); delete node.dataset.reveal }
  }, [clearDock])
  // Observe stable flow geometry, not the translated content: otherwise its
  // own 8px movement can cross the edge and repeatedly reverse the transition.
  return <div ref={ref} className={`repeat-reveal-track${clearDock ? ' repeat-reveal-dock' : ''}`}>
    <div className={`repeat-reveal ${className}`}>{children}</div>
    {clearDock ? <span ref={edge} className="repeat-reveal-edge" aria-hidden="true" /> : null}
  </div>
}
