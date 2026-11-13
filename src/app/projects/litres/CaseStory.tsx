'use client'

import { useEffect, useRef, type ReactNode, type ComponentProps } from 'react'
import AuthorWorkspaceScene from '@/components/litres-author/AuthorWorkspaceScene'
import { CaseStatistics, CaseTemplate } from '@/components/portfolio/case-story/CaseTemplate'
import { useCaseHeroExit } from '@/components/portfolio/case-story/motion'
import { PublishingDemoProvider } from './PublishingDemoProvider'
import { useCaseDemo } from '@/components/portfolio/case-story/CaseDemoOverlay'
import { CaseGuidedShowcase } from '@/components/portfolio/case-story/CaseGuidedShowcase'
import { RepeatReveal } from '@/components/portfolio/RepeatReveal'
import styles from './case.module.css'

function CaseStoryContent({ hero, intro, outcome, context, entry, details, further, caseFooter }: {
  hero: ReactNode
  intro: ReactNode
  details: ReactNode
  outcome: ReactNode
  context: ReactNode
  entry: ReactNode
  further: ReactNode
  caseFooter: ReactNode
}) {
  const { active } = useCaseDemo()
  const heroRegion = useRef<HTMLDivElement>(null)
  const statistics = useRef<HTMLElement>(null)
  useCaseHeroExit(heroRegion, active)

  useEffect(() => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
    if (location.hash !== '#details' || navigation?.type === 'back_forward') return
    const frame = requestAnimationFrame(() => document.getElementById('details')?.scrollIntoView({ behavior: 'instant' }))
    return () => cancelAnimationFrame(frame)
  }, [])

  return <><CaseTemplate className={styles.page} data-port17-surface="litres" data-restored-case hero={<div ref={heroRegion}>{hero}</div>}
    statistics={<CaseStatistics sectionRef={statistics} className={styles.stats} pinClassName={styles.statsLayout}
      aria-label="LitRes workspace design">
      <RepeatReveal className={styles.statsIntro}>{intro}</RepeatReveal>
      <RepeatReveal>{outcome}</RepeatReveal>
      <RepeatReveal>{context}</RepeatReveal>
    </CaseStatistics>}
    showcase={<CaseGuidedShowcase
      id="workspace" className={styles.workspace} pinClassName={styles.inkBackdrop}
      headingId="workspace-title" kicker="LitRes / Author & publisher workspace" lines={['See what happens', 'after you publish.']}
      chrome="LitRes — author workspace" still={<div className={styles.workspaceStill}><AuthorWorkspaceScene still /></div>}
      scene={<AuthorWorkspaceScene />} entry={entry}
      mobilePoster={{ src: '/images/litres/case/workspace-mobile.jpg', alt: 'LitRes author workspace on a mobile screen', width: 1560, height: 2100 }}
    />}
    details={details} further={further} footer={caseFooter} />
  </>
}

export function CaseStory(props: ComponentProps<typeof CaseStoryContent>) {
  return <PublishingDemoProvider><CaseStoryContent {...props} /></PublishingDemoProvider>
}
