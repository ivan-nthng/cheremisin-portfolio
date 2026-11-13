'use client'

import { CitymobilWorkspace, type CitymobilGuidedStep } from '@/components/CityMobileInteractivePreview'
import { Stage } from '@/components/citymobil-features/stageshow/stage'
import type { Act } from '@/components/citymobil-features/stageshow/act'

type State = { step: CitymobilGuidedStep }
const opening: State = { step: 'conversation' }

async function walkThrough(act: Act<State>) {
  await act.enter('city-conversation')
  await act.wait(1300)
  await act.click('city-scripts')
  await act.set({ step: 'scripts' })
  await act.wait(1900)
  await act.click('city-info')
  await act.set(opening)
  await act.click('city-trip-latest')
  await act.set({ step: 'trip' })
  await act.wait(2200)
  await act.set(opening)
  await act.wait(700)
}

export default function CitymobilWorkspaceScene({ suspended = false }: { suspended?: boolean }) {
  return <Stage width={1440} height={756} initial={opening} script={suspended ? undefined : walkThrough}
    cursor={{ at: { x: 690, y: 140 }, style: 'real', idle: false }}>
    {({ step }) => <CitymobilWorkspace nativeFragment guidedStep={step} />}
  </Stage>
}
