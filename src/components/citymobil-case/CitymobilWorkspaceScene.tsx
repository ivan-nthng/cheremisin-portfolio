'use client'

import { CitymobilWorkspace, type CitymobilGuidedStep } from '@/components/CityMobileInteractivePreview'
import { Stage } from '@/components/citymobil-features/stageshow/stage'
import type { Act } from '@/components/citymobil-features/stageshow/act'
import type { ReactNode } from 'react'
import type { RetainedControls } from '@/components/portfolio/case-story/CaseDemoOverlay'
import { RetainedDemoSurface, useRetainedDemoSurface, type RetainedEntry } from '@/components/portfolio/case-story/RetainedDemoSurface'
import styles from '@/components/citymobil-demo/preview.module.css'

type State = { step: CitymobilGuidedStep }
const opening: State = { step: 'conversation' }
const canvas = { width: 1440, height: 756 }

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

export default function CitymobilWorkspaceScene({ interrupt, poster, shareHref, ...entry }: RetainedControls & RetainedEntry & { poster: ReactNode; shareHref?: string }) {
  const host = useRetainedDemoSurface(entry, canvas)
  return <RetainedDemoSurface host={host} label="Interactive Citymobil demo" status={host.expanded ? 'manual' : 'guided'} poster={poster}>
    <Stage width={host.expanded ? host.size.width : canvas.width} height={host.expanded ? host.size.height : canvas.height}
      nativeStyles={host.expanded} manual={host.expanded} interrupt={interrupt} initial={opening} script={walkThrough}
      cursor={{ at: { x: 690, y: 140 }, style: 'real', idle: false }}>
      {({ step }) => <div className={host.expanded ? styles.standalone : undefined}>
        <CitymobilWorkspace guidedStep={host.expanded ? undefined : step} onReturn={host.close} shareHref={shareHref} />
      </div>}
    </Stage>
  </RetainedDemoSurface>
}
