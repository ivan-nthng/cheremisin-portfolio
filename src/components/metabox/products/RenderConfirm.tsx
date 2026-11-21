'use client'

import { useEffect, useRef } from 'react'
import MetaboxSelect from '../MetaboxSelect'
import controls from '../metabox-controls.module.css'
import { environmentName, renderFormats, renderSizes, type CameraView, type RenderFormat, type RenderSize } from './render-fixtures'
import s from './products-demo.module.css'

export default function RenderConfirm({ open, onClose, onRender, views, size, format, onSize, onFormat, productName, rendering, error }: {
  open: boolean
  onClose: () => void
  onRender: () => void
  views: readonly CameraView[]
  size: RenderSize
  format: RenderFormat
  onSize: (size: RenderSize) => void
  onFormat: (format: RenderFormat) => void
  productName: string
  rendering: boolean
  error: string
}) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = ref.current
    if (open && dialog && !dialog.open) dialog.showModal()
    else if (!open && dialog?.open) dialog.close()
  }, [open])

  const first = views[0]

  return <dialog ref={ref} className={s.confirm} aria-labelledby="metabox-render-dialog-title" onCancel={event => {
    event.preventDefault()
    if (!rendering) onClose()
  }}>
    <form onSubmit={event => { event.preventDefault(); onRender() }}>
      <header className={s.confirmHeader}>
        <h2 id="metabox-render-dialog-title">Render</h2>
        <button type="button" className={controls.button + ' ' + controls.quiet + ' ' + controls.compact + ' ' + s.iconButton}
          aria-label="Close render dialog" disabled={rendering} onClick={onClose}>
          <img src="/images/metabox/products/editor/close.svg" width={16} height={16} alt="" />
        </button>
      </header>
      <div className={s.confirmBody}>
        <div className={s.confirmPreview}>{first && <img src={first.image} alt={productName + ' · ' + first.name} />}</div>
        <div className={s.confirmOptions}>
          <fieldset disabled={rendering}>
            <div className={s.formField}>
              <span>Preset</span>
              <MetaboxSelect label="Output preset" value={size} options={renderSizes} onChange={onSize} />
            </div>
            <div className={s.formField}>
              <span>Format</span>
              <MetaboxSelect label="Output format" value={format} options={renderFormats} onChange={onFormat} />
            </div>
          </fieldset>
          <div className={s.confirmBackground}>Background <span>{environmentName}</span></div>
          <h3>Camera views</h3>
          <ul className={s.confirmViews}>
            {views.map(view => <li key={view.id}><img src={view.image} width={32} height={32} alt="" />{view.name}</li>)}
          </ul>
          {error && <p className={s.error} role="alert">{error}</p>}
        </div>
      </div>
      <footer className={s.confirmActions}>
        <button type="button" className={controls.button + ' ' + controls.secondary} disabled={rendering} onClick={onClose}>Cancel</button>
        <button type="submit" className={controls.button + ' ' + controls.primary} disabled={rendering || !views.length}>
          {rendering ? 'Creating renders…' : 'Render ' + views.length + (views.length === 1 ? ' Image' : ' Images')}
        </button>
      </footer>
    </form>
  </dialog>
}
