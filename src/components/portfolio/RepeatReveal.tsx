'use client'

import { useLayoutEffect, useRef, type ReactNode, type RefObject } from 'react'

/** HTML starts visible. Only a working observer may opt a unit into motion. */
export function useRepeatReveal(ref: RefObject<HTMLElement | null>, enabled: boolean, clearDock = false, edge?: RefObject<HTMLElement | null>, bottomInset?: () => number) {
  useLayoutEffect(() => {
    const node = ref.current
    if (!enabled || !node || !('IntersectionObserver' in window)) return
    let observer: IntersectionObserver | undefined
    const configure = () => {
      observer?.disconnect()
      const rect = node.getBoundingClientRect()
      const topBand = Math.min(128, window.innerHeight * .25)
      const dock = clearDock ? document.querySelector<HTMLElement>('.portfolio-floating-dock') : null
      const dockInset = dock ? Number.parseFloat(getComputedStyle(dock).bottom) || 24 : 24
      const overlayInset = bottomInset?.() ?? 0
      const viewportBottom = window.innerHeight - overlayInset
      const bottomBand = Math.max(overlayInset, clearDock
        ? dockInset + 44 + 24 + 8
        : Math.min(64, window.innerHeight * .15))
      // The first real career unit must clear the dock, including its 8px
      // travel. Oversized units fall back to partial entry so they stay reachable.
      const wholeUnit = clearDock && rect.height <= window.innerHeight - topBand - bottomBand
      // Keep already-painted content visible during hydration. Only offscreen
      // units can start hidden without a visible loading flash.
      if (rect.bottom <= 0 || rect.top >= viewportBottom) node.dataset.reveal = 'hidden'
      else if (!node.dataset.reveal) node.dataset.reveal = 'visible'
      let initial = true
      try {
        observer = new IntersectionObserver(([entry]) => {
          if (initial) {
            initial = false
            const { top, bottom } = entry.boundingClientRect
            if (!entry.isIntersecting && bottom > 0 && top < viewportBottom) return
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
        observer.observe(wholeUnit && edge?.current ? edge.current : node)
      } catch { delete node.dataset.reveal }
    }
    configure()
    window.addEventListener('resize', configure)
    return () => { observer?.disconnect(); window.removeEventListener('resize', configure); delete node.dataset.reveal }
  }, [ref, enabled, clearDock, edge, bottomInset])
}

export function RepeatReveal({ children, className = '', trackClassName = '', clearDock = false, active, bottomInset }: { children: ReactNode; className?: string; trackClassName?: string; clearDock?: boolean; active?: boolean; bottomInset?: () => number }) {
  const ref = useRef<HTMLDivElement>(null)
  const edge = useRef<HTMLSpanElement>(null)
  useRepeatReveal(ref, active === undefined, clearDock, edge, bottomInset)
  // Observe stable flow geometry, not the translated content: otherwise its
  // own 8px movement can cross the edge and repeatedly reverse the transition.
  // The observer only owns data-reveal. Its cleanup cannot remove a React phase.
  return <div ref={ref} className={`repeat-reveal-track${clearDock ? ' repeat-reveal-dock' : ''} ${trackClassName}`} data-reveal-active={active}>
    <div className={`repeat-reveal ${className}`} inert={active === false || undefined}>{children}</div>
    {clearDock ? <span ref={edge} className="repeat-reveal-edge" aria-hidden="true" /> : null}
  </div>
}
