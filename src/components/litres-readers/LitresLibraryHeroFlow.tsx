'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { CheckCircle2, X } from 'lucide-react'
import { CaseHeroFlightCard, useCaseHeroFlight } from '@/components/portfolio/case-story/CaseHeroFlight'
import {
  ComposeFragment,
  ContributorFragment,
  LostLambsChartFragment,
  LostLambsReviewFragment,
  NyplChartFragment,
  ReaderProfileFragment,
  ReaderReviewFragment,
  ReviewerStripFragment,
  relativeLabels,
} from './LibraryComponentsPreview'
import { ReaderIcon } from './ReaderControls'
import { defaultCrop, ReaderPhotoStep } from './ReaderEditor'
import readers from './readers.module.css'
import styles from './litres-library-hero-flow.module.css'

const ignore = () => {}

function HeroCard({ name, order, children }: { name: string; order: number; children: ReactNode }) {
  return <CaseHeroFlightCard order={order}>
    <div className={styles.surface} data-flow-tile={name}>{children}</div>
  </CaseHeroFlightCard>
}

function ReaderPhotoCard() {
  return <div className={styles.photo} data-node-id="9236:29077">
    <div className={readers.panelHeading}><h2>New Reader</h2><X size={16} aria-hidden="true" /></div>
    <div className={readers.card}>
      <div className={readers.progress}>
        {[0, 1, 2, 3].map(step => <span key={step}><i data-filled="true" /></span>)}
      </div>
      <ReaderPhotoStep src="" crop={defaultCrop} open={false}
        onCapture={ignore} onRequest={ignore} onChange={ignore} onRemove={ignore} />
    </div>
    <div className={readers.footer}>
      <span className={readers.saved}><CheckCircle2 size={14} />Saved</span>
      <button type="button" className={readers.secondary}>Cancel</button>
      <button type="button" className={readers.primary} disabled>Next <ReaderIcon name="next" size={20} /></button>
    </div>
  </div>
}

export function LitresLibraryHeroFlow({ suspended }: { suspended: boolean }) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const boardRef = useRef<HTMLDivElement>(null)
  useCaseHeroFlight(boardRef, suspended)
  const [dayLabels, setDayLabels] = useState(['6 days ago', '5 days ago', '4 days ago', '3 days ago', '2 days ago', 'Yesterday', 'Today'])
  const [monthLabels, setMonthLabels] = useState(['6 mo ago', '5 mo ago', '4 mo ago', '3 mo ago', '2 mo ago', 'Last month', 'This month'])
  const [todayLabel, setTodayLabel] = useState('Today')

  useEffect(() => {
    const now = new Date()
    setDayLabels(relativeLabels(now, 7, 'day'))
    setMonthLabels(relativeLabels(now, 7, 'month'))
    setTodayLabel(new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }).format(now))
  }, [])

  useEffect(() => {
    const viewport = viewportRef.current
    const board = boardRef.current
    if (!viewport || !board) return
    const fit = () => board.style.setProperty('--board-scale', String(viewport.clientWidth / board.offsetWidth))
    const resize = new ResizeObserver(fit)
    fit()
    resize.observe(viewport)
    return () => resize.disconnect()
  }, [])

  return <div className={styles.scene} inert>
    <div ref={viewportRef} className={styles.viewport}>
      <div ref={boardRef} className={`${readers.theme} ${styles.board}`} data-theme="light" data-library-flow-board>
        <div className={styles.column}>
          <div className={styles.topCluster}>
            <HeroCard name="compose" order={2}><ComposeFragment /></HeroCard>
            <div className={styles.stack}>
              <HeroCard name="reviewers" order={1}><ReviewerStripFragment /></HeroCard>
              <HeroCard name="contributor" order={3}><ContributorFragment /></HeroCard>
            </div>
          </div>
          <HeroCard name="profile" order={4}><ReaderProfileFragment /></HeroCard>
          <HeroCard name="book" order={6}><LostLambsReviewFragment /></HeroCard>
          <HeroCard name="chart" order={7}><LostLambsChartFragment monthLabels={monthLabels} comparison /></HeroCard>
        </div>
        <div className={styles.column}>
          <HeroCard name="nypl" order={0}><NyplChartFragment dayLabels={dayLabels} todayLabel={todayLabel} /></HeroCard>
          <HeroCard name="photo" order={5}><ReaderPhotoCard /></HeroCard>
          <HeroCard name="review" order={8}><ReaderReviewFragment /></HeroCard>
        </div>
      </div>
    </div>
  </div>
}
