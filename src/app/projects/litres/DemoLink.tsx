'use client'

import { useEffect, useRef } from 'react'
import { useCaseDemo } from '@/components/portfolio/case-story/CaseDemoOverlay'
import { CaseDemoArrow } from '@/components/portfolio/case-story/CaseTemplate'
import { PortfolioArrow } from '@/components/portfolio/PortfolioArrow'
import styles from '@/components/citymobil-case/case.module.css'

import { clearLitresEntry, litresDemoHref, readLitresEntry, type LitresEntry } from '@/components/litres-author/demo-return'

export function DemoLink({ entry }: { entry: LitresEntry }) {
  const { open } = useCaseDemo()
  const link = useRef<HTMLAnchorElement>(null)
  useEffect(() => {
    let observer: MutationObserver | undefined
    let frame = 0
    const restore = () => {
      const saved = readLitresEntry()
      const url = new URL(location.href)
      const explicit = url.searchParams.get('demo-return') === entry
      if (saved?.entry !== entry) return
      let restoredPosition = false
      const node = link.current
      if (!node) return
      const container = node.closest<HTMLElement>('[data-case-entry]')
      const showcase = container?.closest<HTMLElement>('#workspace')
      observer?.disconnect()
      const focus = () => {
        if (showcase && container) {
          const moving = showcase.dataset.motion === 'true'
          if (!moving && !matchMedia('(prefers-reduced-motion: reduce)').matches) return
          if (explicit && !restoredPosition) {
            restoredPosition = true
            window.scrollTo({ top: saved.top, behavior: 'instant' })
            schedule()
            return
          }
          const bounds = node.getBoundingClientRect()
          if (moving && (container.inert || bounds.top < 44 || bounds.bottom > innerHeight)) {
            window.scrollBy({ top: showcase.getBoundingClientRect().top + innerHeight * .86, behavior: 'instant' })
            return
          }
          if (container.inert || getComputedStyle(container).visibility !== 'visible') return
          if (!moving && (bounds.top < 44 || bounds.bottom > innerHeight)) node.scrollIntoView({ block: 'center', behavior: 'instant' })
        }
        if (!showcase && explicit) window.scrollTo({ top: saved.top, behavior: 'instant' })
        node.focus({ preventScroll: true })
        if (document.activeElement !== node) return
        observer?.disconnect()
        clearLitresEntry()
        if (explicit) {
          url.searchParams.delete('demo-return')
          history.replaceState(history.state, '', url.pathname + url.search + url.hash)
        }
      }
      const schedule = () => {
        cancelAnimationFrame(frame)
        frame = requestAnimationFrame(focus)
      }
      if (showcase) {
        observer = new MutationObserver(schedule)
        observer.observe(showcase, { attributes: true, subtree: true, attributeFilter: ['data-motion', 'data-pose', 'inert'] })
      }
      schedule()
    }
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
    if (navigation?.type === 'back_forward' || new URLSearchParams(location.search).get('demo-return') === entry) restore()
    const onShow = (event: PageTransitionEvent) => { if (event.persisted || navigation?.type === 'back_forward') restore() }
    window.addEventListener('pageshow', onShow)
    return () => {
      cancelAnimationFrame(frame)
      observer?.disconnect()
      window.removeEventListener('pageshow', onShow)
    }
  }, [entry])

  return <a ref={link} className={`editorial-link ${styles.desktopDemoEntry}`} href={litresDemoHref(entry)} aria-haspopup="dialog" data-shared-demo-entry data-no-page-motion onClick={event => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    open('publishing', event.currentTarget)
  }}>{entry === 'workspace' ? 'Try Live Demo' : 'Try the demo'} {entry === 'workspace' ? <CaseDemoArrow /> : <PortfolioArrow />}</a>
}
