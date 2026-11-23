'use client'

import type { ReactNode } from 'react'
import { Stage } from '@/components/citymobil-features/stageshow/stage'
import type { Act } from '@/components/citymobil-features/stageshow/act'
import type { RetainedControls } from '@/components/portfolio/case-story/CaseDemoOverlay'
import { RetainedDemoSurface, useRetainedDemoSurface } from '@/components/portfolio/case-story/RetainedDemoSurface'
import type { AuthorGuidedState } from './LitresAuthor'
import LitresDemo from './LitresDemo'
import styles from './author.module.css'

const canvas = { width: 1440, height: 825 }
const opening: AuthorGuidedState = { period: 28, periodOpen: false, point: null }

async function changePeriod(act: Act<AuthorGuidedState>) {
  await act.enter('guided-period')
  await act.click('guided-period')
  await act.set({ periodOpen: true })
  await act.wait(650)
  await act.click('guided-period-90')
  await act.set({ period: 90, periodOpen: false })
  await act.wait(1300)
}

async function walkthrough(act: Act<AuthorGuidedState>) {
  await changePeriod(act)
  for (const point of [2, 4]) {
    await act.move(`guided-pages-${point}`)
    await act.set({ point })
    await act.wait(1050)
  }
  await act.set(opening)
  await act.wait(850)
}

export function PublishingDemoSurface({ interrupt, poster, ...entry }: RetainedControls & { poster: ReactNode }) {
  const host = useRetainedDemoSurface(entry, canvas)
  return <RetainedDemoSurface host={host} status={host.expanded ? 'manual' : 'guided'} poster={poster} label="LitRes publishing demo">
    <Stage className={styles.retainedStage} width={host.expanded ? host.size.width : canvas.width}
      height={host.expanded ? host.size.height : canvas.height} manual={host.expanded} nativeStyles={host.expanded} interrupt={interrupt}
      initial={opening} script={walkthrough} cursor={{ at: { x: 240, y: 120 }, style: 'real', idle: false }}>
      {guided => <LitresDemo onReturn={host.close} guided={host.expanded ? undefined : guided} />}
    </Stage>
  </RetainedDemoSurface>
}
