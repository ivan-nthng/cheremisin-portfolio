'use client'

import { useId, useRef, useState, type FormEvent, type ReactNode } from 'react'
import MetaboxSelect from '../MetaboxSelect'
import controls from '../metabox-controls.module.css'
import { ProductTile } from './ProductsLibrary'
import type { RenderProduct } from './product-fixtures'
import { currentCamera, environmentName, renderFormats, renderSizes, type CameraView, type RenderFormat, type RenderSize } from './render-fixtures'
import styles from './render-settings-panel.module.css'

type RenderSettingsPanelProps = {
  cameras: readonly CameraView[]
  selected: readonly string[]
  active: string
  product: RenderProduct
  size: RenderSize
  format: RenderFormat
  onCamera: (id: string) => void
  guided?: boolean
  onSelectAll: () => void
  onProduct: () => void
  onSaveView: (name: string) => void
  onSize: (size: RenderSize) => void
  onFormat: (format: RenderFormat) => void
  onBatch: (enabled: boolean) => void
  batch: boolean
  onRender: () => void
  rendering: boolean
}

const assetBase = '/images/metabox/products/settings/'
const unavailableEnvironments = ['Gallery Studio', 'Urban Loft', 'Mountain Retreat']

const presets = [
  { name: 'Full HD PNG', size: 'full-hd', format: 'png' },
  { name: 'HD JPEG', size: 'hd', format: 'jpeg' },
] as const

function Icon({ name, className }: { name: string; className?: string }) {
  return <img src={assetBase + name + '.svg'} width={20} height={20} alt="" className={className} />
}

function Accordion({ label, icon, children, initiallyOpen = false }: {
  label: string
  icon: string
  initiallyOpen?: boolean
  children: ReactNode
}) {
  const id = useId()
  const [open, setOpen] = useState(initiallyOpen)

  return (
    <section className={styles.section}>
      <button type="button" className={styles.sectionHeading} aria-expanded={open} aria-controls={id}
        onClick={() => setOpen(!open)}>
        <Icon name={icon} />
        <span>{label}</span>
        <Icon name="chevron" className={styles.chevron} />
      </button>
      <div id={id} hidden={!open} className={styles.sectionBody}>{children}</div>
    </section>
  )
}

function CameraOption({ camera, selected, previewed, onClick }: {
  camera: CameraView
  selected: boolean
  previewed: boolean
  onClick: () => void
}) {
  const descriptionId = useId()
  const isCurrent = camera.id === currentCamera.id

  return (
    <button type="button" className={styles.camera} aria-label={camera.name} data-target={camera.id === "side" ? "guided-camera" : isCurrent ? "guided-current-camera" : undefined}
      aria-describedby={isCurrent ? descriptionId : undefined} aria-pressed={selected} data-previewed={previewed}
      onClick={onClick}>
      <img src={camera.image} alt="" width={32} height={32} className={styles.thumbnail} />
      <span className={styles.cameraLabel}>
        {camera.name}
        {isCurrent && <small id={descriptionId}>Custom Camera</small>}
      </span>
      <span className={styles.check} aria-hidden="true" />
    </button>
  )
}

export default function RenderSettingsPanel({
  cameras, selected, active, guided, product, size, format, onCamera, onSelectAll, onProduct, onSaveView, onSize, onFormat,
  onBatch, batch, onRender, rendering,
}: RenderSettingsPanelProps) {
  const groupId = useId()
  const [tab, setTab] = useState<'custom' | 'presets'>('custom')
  const [viewName, setViewName] = useState<string | null>(null)
  const restoreSaveFocus = useRef(false)
  const selectedCameras = cameras.filter(camera => selected.includes(camera.id))
  const allSelected = selectedCameras.length === cameras.length
  const cameraPresets = cameras.filter(camera => camera.id !== currentCamera.id)

  function closeName() {
    restoreSaveFocus.current = true
    setViewName(null)
  }

  function saveView(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const name = viewName?.trim()
    if (!name) return
    onSaveView(name)
    closeName()
  }

  return (
    <aside aria-label="Render configuration" className={styles.panel}>
      <div role="tablist" aria-label="Render configuration mode" className={styles.tabs}>
        {(['custom', 'presets'] as const).map(mode => (
          <button key={mode} type="button" role="tab" id={`${groupId}-${mode}`}
            aria-controls={`${groupId}-${mode}-panel`} aria-selected={tab === mode}
            tabIndex={tab === mode ? 0 : -1} onClick={() => setTab(mode)} onKeyDown={event => {
              if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
              event.preventDefault()
              const nextMode = event.key === 'Home' ? 'custom' : event.key === 'End' ? 'presets' : mode === 'custom' ? 'presets' : 'custom'
              setTab(nextMode)
              document.getElementById(`${groupId}-${nextMode}`)?.focus()
            }}>
            {mode === 'custom' ? 'Custom' : 'Presets'}
          </button>
        ))}
      </div>
      <div className={styles.settings}>
        <div role="tabpanel" id={`${groupId}-custom-panel`} aria-labelledby={`${groupId}-custom`} hidden={tab !== 'custom'}>
          <Accordion label="Render Settings" icon="size">
            <div className={styles.fieldGroup}>
              <span>Size</span>
              <MetaboxSelect<RenderSize> label="Render size" value={size} options={renderSizes} onChange={onSize} />
            </div>
            <div className={styles.fieldGroup}>
              <span>Format</span>
              <MetaboxSelect<RenderFormat> label="Image format" value={format} options={renderFormats} onChange={onFormat} />
            </div>
          </Accordion>
          <Accordion label="Camera Views" icon="camera" initiallyOpen={guided}>
            <div className={styles.cameraActions}>
              <button type="button" className={`${controls.button} ${controls.compact} ${controls.quiet}`} onClick={onSelectAll}>
                {allSelected ? 'Clear selection' : 'Select all'}
              </button>
            </div>
            <div role="group" aria-label="Select views to render">
              <CameraOption camera={currentCamera} selected={selected.includes(currentCamera.id)}
                previewed={active === currentCamera.id} onClick={() => onCamera(currentCamera.id)} />
              <div className={styles.cameraPresets}>
                {cameraPresets.map(camera => <CameraOption key={camera.id} camera={camera}
                  selected={selected.includes(camera.id)} previewed={active === camera.id} onClick={() => onCamera(camera.id)} />)}
              </div>
            </div>
            {viewName === null ? (
              <button type="button" className={`${controls.button} ${controls.compact} ${controls.quiet} ${styles.savePosition}`}
                ref={node => {
                  if (node && restoreSaveFocus.current) {
                    node.focus({ preventScroll: true })
                    restoreSaveFocus.current = false
                  }
                }}
                onClick={() => setViewName('')}>
                <Icon name="plus" />
                Save Camera Position
              </button>
            ) : (
              <form onSubmit={saveView} className={styles.nameForm} onKeyDown={event => {
                if (event.key !== 'Escape') return
                event.stopPropagation()
                closeName()
              }}>
                <input autoFocus aria-label="Camera view name" className={controls.field} placeholder="Name this view"
                  value={viewName} onChange={event => setViewName(event.currentTarget.value)} maxLength={64} />
                <button type="submit" aria-label="Save camera view" disabled={!viewName.trim()}
                  className={`${controls.button} ${controls.primary} ${styles.saveName}`}>
                  <Icon name="check" />
                </button>
                <button type="button" className={`${controls.button} ${controls.compact} ${controls.quiet} ${styles.cancelName}`}
                  onClick={closeName}>Cancel</button>
              </form>
            )}
          </Accordion>
          <Accordion label="Environment" icon="environment">
            <ul className={styles.environments} aria-label="Environments">
              <li className={styles.environment} aria-current="true">
                <img src={currentCamera.image} alt="" width={32} height={32} className={styles.thumbnail} />
                <span>{environmentName}</span>
                <span className={styles.check} aria-hidden="true" />
              </li>
              {unavailableEnvironments.map(environment => (
                <li key={environment} className={styles.environment} aria-disabled="true">
                  <span className={styles.environmentIcon}><Icon name="environment" /></span>
                  <span>{environment}</span>
                </li>
              ))}
            </ul>
          </Accordion>
          <Accordion label="Products" icon="product">
            <ProductTile product={product} onClick={onProduct} />
          </Accordion>
        </div>
        <div role="tabpanel" id={`${groupId}-presets-panel`} aria-labelledby={`${groupId}-presets`} hidden={tab !== 'presets'}>
          <div className={styles.presets}>
            {presets.map(preset => (
              <button key={preset.name} type="button" aria-pressed={size === preset.size && format === preset.format}
                className={`${controls.button} ${controls.secondary}`} onClick={() => {
                  onSize(preset.size)
                  onFormat(preset.format)
                }}>{preset.name}</button>
            ))}
          </div>
        </div>
        <div className={styles.section}>
          <button type="button" role="switch" aria-checked={batch} className={styles.sectionHeading}
            onClick={() => onBatch(!batch)}>
            <Icon name="batch" />
            <span>Batch Rendering</span>
            <span className={styles.switchTrack} aria-hidden="true" />
          </button>
        </div>
        <p className={styles.summary} aria-live="polite">
          <strong>{selectedCameras.length === 1 ? '1 camera view' : `${selectedCameras.length} camera views`}</strong>
          <span>{selectedCameras.length ? selectedCameras.map(camera => camera.name).join(', ') : 'Select a camera view to create a render.'}</span>
        </p>
      </div>
      <footer className={styles.footer}>
        <button type="button" disabled={rendering || selectedCameras.length === 0} aria-busy={rendering}
          className={`${controls.button} ${controls.primary}`} onClick={onRender}>
          {rendering ? 'Creating Render…' : 'Create Render'}
        </button>
      </footer>
    </aside>
  )
}
