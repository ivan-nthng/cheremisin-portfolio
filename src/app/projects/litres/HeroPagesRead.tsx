'use client'

import { useRef } from 'react'
import { PagesRead, Reviews, TopMetric } from '@/components/litres-author/LitresAuthor'
import { getRange } from '@/components/litres-author/sample'
import { useCaseDemo } from '@/components/portfolio/case-story/CaseDemoOverlay'
import { CaseHeroFlightCard, useCaseHeroFlight } from '@/components/portfolio/case-story/CaseHeroFlight'
import authorStyles from '@/components/litres-author/author.module.css'
import styles from './case.module.css'

const range = getRange(28)

export function HeroPagesRead() {
  const board = useRef<HTMLDivElement>(null)
  const { active } = useCaseDemo()
  useCaseHeroFlight(board, active)

  return <div className={`${authorStyles.app} ${styles.heroPages}`} data-litres-hero-pages inert>
    <div ref={board} className={styles.heroMosaic}>
      <div className={authorStyles.topTiles}>
        <CaseHeroFlightCard order={2}>
          <article className={`${authorStyles.tile} ${authorStyles.income}`} data-hero-income><TopMetric id="income" range={range} decorative /></article>
        </CaseHeroFlightCard>
        <CaseHeroFlightCard order={1}>
          <article className={authorStyles.tile}><TopMetric id="sold" range={range} decorative /></article>
        </CaseHeroFlightCard>
        <CaseHeroFlightCard order={0}>
          <article className={authorStyles.tile}><TopMetric id="views" range={range} decorative /></article>
        </CaseHeroFlightCard>
      </div>
      <div className={authorStyles.bottomTiles}>
        <CaseHeroFlightCard order={4}><Reviews range={range} decorative /></CaseHeroFlightCard>
        <CaseHeroFlightCard order={3}><PagesRead range={range} decorative /></CaseHeroFlightCard>
      </div>
    </div>
  </div>
}
