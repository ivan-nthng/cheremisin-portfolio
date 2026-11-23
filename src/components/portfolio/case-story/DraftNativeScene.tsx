'use client'

import { Suspense, useCallback, useLayoutEffect, useState, type ReactNode } from 'react'
import SuiteDemo from '@/components/metabox/suite/SuiteDemo'
import MetaboxDemo from '@/components/metabox/MetaboxDemo'
import ProductsDemo from '@/components/metabox/products/ProductsDemo'
import { projectStart, projectEnd, showProjects, cameraStart, cameraEnd, showCamera as showCardCamera, type MetaboxCardKind, cardCursor, productStart, productEnd, showProducts } from '@/components/metabox/MetaboxCardScene'
import cardStyles from '@/components/metabox/metabox-card-scene.module.css'
import { RetainedDemoSurface, useRetainedDemoSurface } from './RetainedDemoSurface'
import { useCaseDemo, type RetainedControls } from './CaseDemoOverlay'
import { metaboxScenarios, renderMetaboxDemo } from './DraftDemoProvider'
import { Stage } from '@/components/citymobil-features/stageshow/stage'
import type { Act } from '@/components/citymobil-features/stageshow/act'
import styles from './case-draft.module.css'

const projectsCanvas = { width: 900, height: 440, compact: { below: 660, width: 390, height: 490 } }
const cameraCanvas = { width: 900, height: 360, compact: { below: 660, width: 390, height: 550 } }
const mainCanvas = { width: 1440, height: 900 }
const cardCanvas = { width: 900, height: 520, compact: { below: 660, width: 390, height: 720 } }

async function showCamera(act: Act<typeof productStart>) {
  await act.enter('guided-camera')
  await act.click('guided-camera')
  await act.set(productEnd)
  await act.wait(2200)
  await act.set(productStart)
  await act.wait(650)
}

export function MetaboxSurface({ poster, interrupt, card = false, kind = 'metabox-products', suspended, ...entry }: RetainedControls & {
  poster: ReactNode; card?: boolean; kind?: MetaboxCardKind; suspended?: boolean
}) {
  const host = useRetainedDemoSurface(entry, kind === 'metabox-projects' ? projectsCanvas : kind === 'metabox-camera' ? cameraCanvas : card ? cardCanvas : mainCanvas)
  const { demo, navigate } = useCaseDemo()
  const live = host.live && !suspended
  const [readiness, setReadiness] = useState<'loading' | 'ready' | 'unavailable'>('loading')
  const [imageAttempt, setImageAttempt] = useState(0)
  const prepared = useCallback(() => setReadiness('ready'), [])
  const unavailable = useCallback(() => setReadiness('unavailable'), [])
  useLayoutEffect(() => { if (!live) setReadiness('loading') }, [live])
  const manual = host.expanded
  const status = readiness === 'ready' ? manual ? 'manual' : 'guided' : readiness
  useLayoutEffect(() => {
    const dialog = host.dialog.current
    if (!manual || status !== 'manual' || !dialog?.open || host.closing.current) return
    const focusScenario = (onEntry = false) => {
      const focused = document.activeElement
      // showModal can focus the first tab even when it is outside the tab order.
      const inactiveTab = onEntry && focused?.matches('[data-demo-scenario-bar] [role="tab"][aria-selected="false"]')
      if (focused !== dialog && dialog.contains(focused) && !inactiveTab) return
      dialog.querySelector<HTMLElement>('[data-demo-scenario-bar] [role="tab"][aria-selected="true"]')?.focus({ preventScroll: true })
    }
    focusScenario(true)
    const observer = new MutationObserver(() => focusScenario())
    observer.observe(dialog, { subtree: true, childList: true })
    return () => observer.disconnect()
  }, [manual, status, demo, host.dialog, host.closing])
  const stage = { className: styles.retainedStage, width: manual ? host.size.width : host.inlineWidth,
    height: manual ? host.size.height : host.inlineHeight, manual: manual || readiness !== 'ready', nativeStyles: manual, interrupt }
  const controls = { imageAttempt, onReady: prepared, onUnavailable: unavailable, onReturn: host.close,
    onOpenApplications: () => navigate('metabox-suite'),
    scenarioControls: { scenarios: metaboxScenarios, scenario: kind, onScenario: navigate } }
  const suite = kind === 'metabox-projects'
  function workspace(native: ReactNode) {
    return <div className={manual ? undefined : card ? cardStyles.stage : styles.nativeWorkspace}
      data-products-card={card && kind === 'metabox-products' && !manual || undefined}
      data-projects-card={suite && !manual || undefined} data-compact={suite && !manual && host.size.compact || undefined}
      data-camera-card={kind === 'metabox-camera' && !manual || undefined}
      data-guided-compact={card && !manual && host.size.compact || undefined}>
      <Suspense fallback={<button onClick={host.close}>Close</button>}>
        {manual && demo && demo !== kind && !(suite && demo === 'metabox-suite') ? renderMetaboxDemo(demo, host.close, navigate) : native}
      </Suspense>
    </div>
  }
  return <RetainedDemoSurface host={{...host, live}} status={status} poster={poster} label="Metabox demo"
    preserveOnError onRetry={() => { setImageAttempt(attempt => attempt + 1); setReadiness('loading') }}>
    {suite
      ? <Stage {...stage} initial={projectStart} poster={projectEnd} script={showProjects} cursor={cardCursor}>
          {state => workspace(<SuiteDemo {...controls} close={host.close} navigate={navigate} playback={interrupt}
            guided={!manual} projects={manual ? demo === 'metabox-projects' : state.projects} />)}
        </Stage>
      : kind === 'metabox-camera'
      ? <Stage {...stage} initial={cameraStart} poster={cameraEnd} script={showCardCamera} cursor={cardCursor}>
          {state => workspace(<MetaboxDemo {...controls} initialEditor guidedFov={manual ? undefined : state.fov} />)}
        </Stage>
      : <Stage {...stage} initial={productStart} poster={productEnd} script={card ? showProducts : showCamera}
          cursor={card ? cardCursor : { at: { x: 740, y: 400 }, style: 'real' }}>
          {state => workspace(<ProductsDemo {...controls} guidedCamera={manual ? undefined : state.camera}
            onOpenConfigurator={() => navigate('metabox-camera')} />)}
        </Stage>}
  </RetainedDemoSurface>
}
