'use client'

import { Stage } from '@/components/citymobil-features/stageshow/stage'
import type { Act } from '@/components/citymobil-features/stageshow/act'
import { editCamera, startingCamera, startingLimits } from './camera-model'
import { sofaName } from './catalog-fixtures'
import MetaboxCameraPanel from './MetaboxCameraPanel'
import MetaboxViewport from './MetaboxViewport'
import ProductsDemo from './products/ProductsDemo'
import MetaboxProjectsGrid from './suite/MetaboxProjectsGrid'
import MetaboxSuite, { MetaboxSuiteLayout } from './suite/MetaboxSuite'
import shell from './metabox.module.css'
import s from './metabox-card-scene.module.css'

export type MetaboxCardKind = 'metabox-products' | 'metabox-camera' | 'metabox-projects'
const cursorHome = { x: 0, y: 26 }
const cursor = { at: cursorHome, style: 'real', ripple: true } as const
const ignore = () => {}

type ProductScene = { camera: 'current' | 'side' }
const productStart: ProductScene = { camera: 'current' }
const productEnd: ProductScene = { camera: 'side' }

async function showProducts(act: Act<ProductScene>) {
  await act.wait(380)
  await act.enter('guided-camera')
  await act.click('guided-camera')
  await act.set(productEnd)
  act.mark('side-view')
  await act.wait(2200)
  await act.click('guided-current-camera')
  await act.set(productStart)
  act.mark('camera-reset')
  await act.move(cursorHome)
}

const cameraStart = { fov: startingCamera.fov }
const cameraEnd = { fov: startingCamera.fov - 10 }
async function showCamera(act: Act<typeof cameraStart>) {
  await act.wait(850)
  await act.enter('metabox-zoom')
  await act.click('metabox-zoom')
  await act.set({ fov: startingCamera.fov - 5 })
  await act.wait(430)
  await act.click('metabox-zoom')
  await act.set(cameraEnd)
  act.mark('camera-zoom')
  await act.wait(2200)
  await act.click('metabox-reset-view')
  await act.set(cameraStart)
  act.mark('view-reset')
  await act.move(cursorHome)
}

const projectStart = { projects: false }
const projectEnd = { projects: true }
async function showProjects(act: Act<typeof projectStart>) {
  await act.wait(1350)
  await act.enter('metabox-open-projects')
  await act.click('metabox-open-projects')
  await act.set(projectEnd)
  act.mark('projects-open')
  await act.wait(430)
  await act.move('metabox-tuuci-project')
  act.mark('tuuci-highlight')
  await act.wait(2200)
  await act.click('metabox-open-applications')
  await act.set(projectStart)
  act.mark('projects-reset')
  await act.move(cursorHome)
}

export default function MetaboxCardScene({ kind, suspended }: { kind: MetaboxCardKind; suspended: boolean }) {
  if (kind === 'metabox-products') return <Stage fill width={900} height={520} compact={{ below: 660, width: 390, height: 720 }}
    initial={productStart} poster={productEnd} script={suspended ? undefined : showProducts} cursor={cursor}>
    {(state, _rect, layout) => <div className={s.stage} data-products-card data-guided-compact={layout === 'compact' || undefined}>
      <ProductsDemo guidedCamera={state.camera} />
    </div>}
  </Stage>

  if (kind === 'metabox-camera') return <Stage fill width={900} height={360} compact={{ below: 660, width: 390, height: 550 }}
    initial={cameraStart} poster={cameraEnd} script={suspended ? undefined : showCamera} cursor={cursor}>
    {({ fov }, _rect, layout) => {
      const camera = editCamera(startingCamera, { fov })
      return <div className={`${shell.app} ${s.camera}`} data-theme="light" data-compact={layout === 'compact' || undefined}>
        <header className={shell.cameraHeader}><h1>{sofaName}</h1></header>
        <div className={shell.cameraBody}>
          <MetaboxViewport camera={camera} fovMin={25} fovMax={85} measurements={false} onCamera={ignore} onReset={ignore} />
          <MetaboxCameraPanel tab="position" camera={camera} limits={startingLimits}
            onCamera={ignore} onLimits={ignore} onReset={ignore} onClear={ignore} onApply={ignore} />
        </div>
      </div>
    }}
  </Stage>

  return <Stage fill width={900} height={440} compact={{ below: 660, width: 390, height: 490 }}
    initial={projectStart} poster={projectEnd} script={suspended ? undefined : showProjects} cursor={cursor}>
    {({ projects }, _rect, layout) => <div className={s.stage} data-projects-card data-compact={layout === 'compact' || undefined}>
      {projects
        ? <MetaboxSuiteLayout hosted title="Projects" onOpenApplications={ignore}><MetaboxProjectsGrid /></MetaboxSuiteLayout>
        : <MetaboxSuite hosted onLaunch={ignore} />}
    </div>}
  </Stage>
}
