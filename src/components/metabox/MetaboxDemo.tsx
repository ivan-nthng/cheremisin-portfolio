'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Check } from 'lucide-react'
import DemoShell, { type DemoScenarioSelection } from '@/components/portfolio/demo/DemoShell'
import type { CaseDemo } from '@/components/portfolio/case-story/CaseDemoOverlay'
import MetaboxCatalog from './MetaboxCatalog'
import MetaboxCameraPanel from './MetaboxCameraPanel'
import MetaboxViewport from './MetaboxViewport'
import { sofaName } from './catalog-fixtures'
import {
  editCamera, editLimits, limitCamera, startingCamera, startingLimits,
  unrestricted, zoomFor, type CameraLimits, type CameraSettings,
} from './camera-model'
import s from './metabox.module.css'

type Screen = 'catalog' | 'camera' | 'preview'
const cameraTabs = [
  { id: 'position', label: 'Position' },
  { id: 'restrictions', label: 'Restrictions' },
] as const

export default function MetaboxDemo({ onReturn, onOpenApplications, scenarioControls, guidedFov, initialEditor, imageAttempt, onReady, onUnavailable }: {
  guidedFov?: number; initialEditor?: boolean; imageAttempt?: number; onReady?: () => void; onUnavailable?: () => void;
  onReturn?: () => void; onOpenApplications?: () => void; scenarioControls?: DemoScenarioSelection<CaseDemo>
} = {}) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [screen, setScreen] = useState<Screen>(guidedFov !== undefined || initialEditor ? 'camera' : 'catalog')
  const [tab, setTab] = useState<'position' | 'restrictions'>('position')
  const [camera, setCamera] = useState(() => editCamera(startingCamera, { fov: guidedFov ?? startingCamera.fov }))
  const [limits, setLimits] = useState(startingLimits)
  const [applied, setApplied] = useState({ camera: startingCamera, limits: startingLimits })
  const [measurements, setMeasurements] = useState(false)
  const [version, setVersion] = useState(0)
  const [notice, setNotice] = useState<{ message: string; saved: boolean; id: number } | null>(null)
  const heading = useRef<HTMLHeadingElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)
  const previousGuide = useRef(guidedFov)
  useLayoutEffect(() => {
    const resume = previousGuide.current === undefined
    previousGuide.current = guidedFov
    if (guidedFov === undefined) return
    if (resume) { restart(); setTheme('light') }
    setScreen('camera')
    setCamera(editCamera(startingCamera, { fov: guidedFov }))
  }, [guidedFov])
  useLayoutEffect(() => { if (screen === 'catalog') onReady?.() }, [screen, onReady])

  useEffect(() => {
    if (guidedFov !== undefined) return
    if (screen === 'catalog') {
      returnFocus.current?.focus({ preventScroll: true })
      returnFocus.current = null
    } else if (returnFocus.current) {
      heading.current?.focus({ preventScroll: true })
    }
  }, [screen])

  useEffect(() => {
    if (!notice?.saved) return
    const timer = window.setTimeout(() => setNotice(null), 4000)
    return () => window.clearTimeout(timer)
  }, [notice])

  function confirmSave(message: string) {
    setNotice(previous => ({ message, saved: true, id: (previous?.id ?? 0) + 1 }))
  }

  function open(next: 'camera' | 'preview', trigger: HTMLButtonElement) {
    returnFocus.current = trigger
    setCamera(applied.camera)
    setLimits(applied.limits)
    setTab('position')
    setScreen(next)
  }

  function restart() {
    returnFocus.current = null
    setScreen('catalog')
    setCamera(startingCamera)
    setLimits(startingLimits)
    setApplied({ camera: startingCamera, limits: startingLimits })
    setMeasurements(false)
    setVersion(previous => previous + 1)
    setNotice({ message: 'Demo restarted', saved: false, id: 0 })
  }

  function changeCamera(patch: Partial<CameraSettings>) {
    setCamera(previous => {
      const next = editCamera(previous, patch)
      return screen === 'preview' ? limitCamera(next, applied.limits) : next
    })
  }

  function saveCamera() {
    setApplied({ camera: limitCamera(camera, limits), limits })
    setScreen('catalog')
    confirmSave('Camera settings saved')
  }

  const preview = screen === 'preview'

  return <DemoShell presentation={guidedFov !== undefined} {...(scenarioControls ?? { scenarios: undefined })} label="Metabox camera demo" theme={theme} onTheme={setTheme} onRestart={restart}
    onReturn={onReturn ?? (() => window.location.assign('/'))}>
    <main id={onReturn || guidedFov !== undefined ? undefined : "main-content"} className={s.app} data-theme={theme} onKeyDown={event => {
      if (event.key === 'Escape' && !event.defaultPrevented && screen !== 'catalog') {
        event.preventDefault()
        setScreen('catalog')
      }
    }}>
      <div className={s.notifications} role="status" aria-atomic="true">
        {notice?.saved ? <div key={notice.id} className={s.toast}>
          <Check size={16} aria-hidden="true" />
          <span>{notice.message}</span>
        </div> : <span className="sr-only">{notice?.message}</span>}
      </div>
      <div className={s.catalogWrap} hidden={screen !== 'catalog'}>
        <MetaboxCatalog onOpenApplications={onOpenApplications} key={version} onSetCamera={trigger => open('camera', trigger)}
          onPreview={trigger => open('preview', trigger)} onSave={confirmSave}
          measurements={measurements} onMeasurementsChange={setMeasurements} />
      </div>
      {screen !== 'catalog' && <div className={s.cameraWorkspace}>
        <header className={s.cameraHeader}>
          <h1 tabIndex={-1} ref={heading}>{sofaName}</h1>
          {guidedFov !== undefined ? null : preview ? <span className={s.previewLabel}>Preview</span> :
            <nav className={s.cameraTabs} aria-label="Camera configuration">
              {cameraTabs.map(({ id, label }) => <button key={id} type="button" aria-pressed={tab === id}
                onClick={() => setTab(id)}><img src={`/images/metabox/controls/${id}.svg`} width={16} height={16} alt="" />{label}</button>)}
            </nav>}
          <button type="button" hidden={guidedFov !== undefined} className={s.closeCamera} aria-label={preview ? 'Close preview' : 'Close camera settings'}
            onClick={() => setScreen('catalog')}><img src="/images/metabox/controls/close.svg" width={16} height={16} alt="" /></button>
        </header>
        <div className={s.cameraBody} data-preview={preview || undefined}>
          <MetaboxViewport camera={camera} measurements={measurements} imageAttempt={imageAttempt} onReady={onReady} onUnavailable={onUnavailable}
            fovMin={preview ? zoomFor(applied.limits.maxZoom) : 25}
            fovMax={preview ? zoomFor(applied.limits.minZoom) : 85}
            onCamera={changeCamera} onReset={() => setCamera(preview ? applied.camera : startingCamera)} />
          {!preview && <MetaboxCameraPanel tab={tab} camera={camera} limits={limits}
            onCamera={changeCamera} onLimits={patch => setLimits(previous => editLimits(previous, patch))}
            onReset={() => setCamera(startingCamera)} onClear={() => setLimits(unrestricted)} onApply={saveCamera} />}
        </div>
      </div>}
    </main>
  </DemoShell>
}
