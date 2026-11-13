'use client'

import { Stage, type Play } from '@/components/citymobil-features/stageshow/stage'
import type { Act } from '@/components/citymobil-features/stageshow/act'
import LitresAuthor, { type AuthorGuidedState } from './LitresAuthor'

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

async function compactWalkthrough(act: Act<AuthorGuidedState>) {
  await changePeriod(act)
  await act.set(opening)
  await act.wait(1100)
}

export default function AuthorWorkspaceScene({ compact = false, still = false, play }: { compact?: boolean; still?: boolean; play?: Play }) {
  return <Stage width={compact ? 390 : 1440} height={compact ? 660 : 825}
    initial={opening} script={still ? undefined : compact ? compactWalkthrough : walkthrough} play={play}
    cursor={still ? undefined : { at: { x: 240, y: 120 }, style: 'real', idle: false }}>
    {guided => <LitresAuthor hosted guided={guided} />}
  </Stage>
}
