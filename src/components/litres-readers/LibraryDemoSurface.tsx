'use client'

import { useCallback, useLayoutEffect, useState, type ReactNode } from 'react'
import { Stage } from '@/components/citymobil-features/stageshow/stage'
import type { Act } from '@/components/citymobil-features/stageshow/act'
import type { RetainedControls } from '@/components/portfolio/case-story/CaseDemoOverlay'
import { RetainedDemoSurface, useRetainedDemoSurface } from '@/components/portfolio/case-story/RetainedDemoSurface'
import ReadersDemo from './ReadersDemo'
import styles from './readers.module.css'

const opening = { selected: false }
async function showReader(act: Act<typeof opening>) {
  await act.enter('guided-reader')
  await act.click('guided-reader')
  await act.set({ selected: true })
  await act.wait(2200)
  await act.set(opening)
  await act.wait(650)
}

export function LibraryDemoSurface({ poster, interrupt, ...entry }: RetainedControls & { poster: ReactNode }) {
  const host = useRetainedDemoSurface(entry)
  const [ready, setReady] = useState(false)
  const prepared = useCallback(() => setReady(true), [])
  useLayoutEffect(() => { if (!host.live) setReady(false) }, [host.live])
  const manual = host.expanded
  const status = ready ? manual ? 'manual' : 'guided' : 'loading'
  useLayoutEffect(() => {
    const dialog = host.dialog.current
    if (!manual || !ready || !dialog?.open || host.closing.current) return
    if (document.activeElement === dialog || !dialog.contains(document.activeElement)) {
      dialog.querySelector<HTMLElement>('[role="switch"]')?.focus({ preventScroll: true })
    }
  }, [manual, ready, host.dialog, host.closing])
  return <RetainedDemoSurface host={host} status={status} poster={poster} label="LitRes readers demo">
    <Stage className={styles.retainedStage} width={host.size.width} height={manual ? host.size.height : host.inlineHeight}
      manual={manual} interrupt={interrupt} initial={opening} script={showReader}
      cursor={{ at: { x: 740, y: 400 }, style: 'real' }}>
      {state => <ReadersDemo guidedSelection={manual ? undefined : state.selected} onReady={prepared} onReturn={host.close} />}
    </Stage>
  </RetainedDemoSurface>
}
