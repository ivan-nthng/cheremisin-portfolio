'use client'

import { useEffect, useRef, useState, type ReactNode, type RefObject } from 'react'
import { useCaseDemo } from './CaseDemoOverlay'
import styles from '@/components/citymobil-case/case.module.css'

import { caseDemoDesktopQuery } from './case-demo-viewport'

export function useGuidedPlayback(frame: RefObject<HTMLDivElement | null>, card = false) {
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const node = frame.current!
    const showcase = node.closest<HTMLElement>('section')!
    const motion = matchMedia('(prefers-reduced-motion: reduce)')
    let visible = false
    const desktop = matchMedia(caseDemoDesktopQuery)
    const sync = () => setPlaying(visible && (card || showcase.dataset.pose === 'hold' && !motion.matches) && desktop.matches && document.visibilityState === 'visible')
    const threshold = card ? .01 : .65
    const intersection = new IntersectionObserver(entries => {
      // A shared deep link can scroll from the hero into the showcase within one delivery.
      visible = (entries.at(-1)?.intersectionRatio ?? 0) >= threshold
      sync()
    }, { threshold })
    const pose = new MutationObserver(sync)
    pose.observe(showcase, { attributes: true, attributeFilter: ['data-pose'] })
    intersection.observe(node)
    motion.addEventListener('change', sync)
    desktop.addEventListener('change', sync)
    document.addEventListener('visibilitychange', sync)
    return () => {
      intersection.disconnect()
      pose.disconnect()
      motion.removeEventListener('change', sync)
      desktop.removeEventListener('change', sync)
      document.removeEventListener('visibilitychange', sync)
    }
  }, [frame, card])

  return playing
}

export function GuidedPreview({ still, children, suspended = false }: { still: ReactNode; children: ReactNode; suspended?: boolean }) {
  const { active } = useCaseDemo()
  const frame = useRef<HTMLDivElement>(null)
  const playing = useGuidedPlayback(frame)

  return <div ref={frame} className={styles.guidedPreview} inert>
    {still}
    {playing && !suspended && !active && <div className={styles.guidedScene} data-guided-scene>{children}</div>}
  </div>
}
