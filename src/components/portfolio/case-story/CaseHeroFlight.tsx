'use client'

import { useEffect, type CSSProperties, type ReactNode, type RefObject } from 'react'
import { clamp, watchCaseShowcase } from './motion'
import styles from './case-hero-flight.module.css'

export function CaseHeroFlightCard({ order, children }: { order: number; children: ReactNode }) {
  const timing = { '--case-flight-delay': `${order * 88}ms` } as CSSProperties
  return <div className={styles.card} data-case-flight-order={order} style={timing}>{children}</div>
}

export function useCaseHeroFlight(boardRef: RefObject<HTMLElement | null>, suspended: boolean) {
  useEffect(() => {
    const board = boardRef.current
    const section = board?.closest('section')
    if (!board || !section || suspended) return
    const motion = window.matchMedia('(min-width: 901px) and (prefers-reduced-motion: no-preference)')
    const cards = [...board.querySelectorAll<HTMLElement>('[data-case-flight-order]')].map(card => {
      const order = Number(card.dataset.caseFlightOrder)
      return { card, delay: order * 9, range: 225 + order * 11 }
    })
    let stop: (() => void) | undefined

    const syncMotion = () => {
      stop?.()
      if (!motion.matches) {
        for (const { card } of cards) card.style.removeProperty('--case-flight-scroll')
        return
      }
      stop = watchCaseShowcase(section, board, (_progress, distance, inView) => {
        if (!inView) return
        for (const { card, delay, range } of cards) {
          const progress = clamp((-distance - delay) / range)
          card.style.setProperty('--case-flight-scroll', String(1 - (1 - progress) ** 2))
        }
      })
    }

    syncMotion()
    motion.addEventListener('change', syncMotion)
    return () => {
      stop?.()
      motion.removeEventListener('change', syncMotion)
    }
  }, [boardRef, suspended])
}
