'use client'

import { useLayoutEffect, useState, type CSSProperties, type MouseEvent, type RefObject } from 'react'
import { Columns2 } from 'lucide-react'

interface PortfolioGridProps {
  splitControls?: boolean
  contactTrigger: RefObject<HTMLButtonElement | null>
  contactOpen: boolean
  onContact: (event: MouseEvent<HTMLButtonElement>) => void
}

/** The reading lane and its CSS tracks own geometry. The fixed decoration only
 * reads their actual available-width rectangle, including scrollbar/safe insets. */
export function PortfolioGrid({ contactTrigger, contactOpen, onContact, splitControls = false }: PortfolioGridProps) {
  const [geometry, setGeometry] = useState<{ left: number; width: number; columns: number; gutter: string } | null>(null)
  const [grid, setGrid] = useState({ shown: false, instant: false })

  useLayoutEffect(() => {
    const lane = document.querySelector<HTMLElement>('.portfolio-grid-page')
    const tracks = lane?.querySelector<HTMLElement>('.portfolio-grid-tracks')
    if (!lane || !tracks) return
    const update = () => {
      const { left, width } = lane.getBoundingClientRect()
      const style = getComputedStyle(tracks)
      const next = { left, width, columns: Number(style.getPropertyValue('--grid-columns')), gutter: style.columnGap }
      setGeometry(previous => previous?.left === next.left && previous.width === next.width && previous.columns === next.columns && previous.gutter === next.gutter ? previous : next)
    }
    update()
    let observer: ResizeObserver | undefined
    try {
      observer = new ResizeObserver(update)
      observer.observe(lane)
      observer.observe(document.documentElement)
    } catch { observer?.disconnect() }
    window.addEventListener('resize', update)
    return () => { observer?.disconnect(); window.removeEventListener('resize', update) }
  }, [])

  return <>
    <div id="portfolio-layout-grid" aria-hidden="true" className="portfolio-layout-overlay"
      data-shown={grid.shown} data-instant={grid.instant}
      style={geometry ? { left: geometry.left, width: geometry.width, '--grid-columns': geometry.columns, '--grid-gutter': geometry.gutter } as CSSProperties : undefined}>
      <div className="portfolio-grid-tracks portfolio-overlay-columns">
        {Array.from({ length: geometry?.columns ?? 0 }, (_, index) => <span key={index} />)}
      </div>
    </div>
    <div className="portfolio-floating-dock" data-layout={splitControls ? 'split' : undefined} hidden={!geometry}>
      <button type="button" className="portfolio-grid-toggle" aria-label="Show layout grid" aria-pressed={grid.shown}
        aria-controls="portfolio-layout-grid" onClick={event => setGrid(previous => ({ shown: !previous.shown, instant: event.detail === 0 }))}>
        <Columns2 size={16} aria-hidden="true" />
      </button>
      <button ref={contactTrigger} type="button" className="portfolio-dock-contact" aria-haspopup="dialog"
        aria-expanded={contactOpen} aria-controls={contactOpen ? 'mobile-contact-sheet' : undefined} onClick={onContact}>Contact</button>
    </div>
  </>
}
