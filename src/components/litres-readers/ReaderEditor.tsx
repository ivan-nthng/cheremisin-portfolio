'use client'

import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Camera, GripVertical, Mail, X } from 'lucide-react'
import s from './readers.module.css'

export function DemoField({ label, sample, phone, reduced, onComplete }: {
  label: string
  sample: string
  phone?: boolean
  reduced: boolean
  onComplete: () => void
}) {
  const [length, setLength] = useState(0)
  const [started, setStarted] = useState(false)
  const input = useRef<HTMLInputElement>(null)
  const valid = length === sample.length

  useEffect(() => {
    if (!started || valid) return
    const timer = window.setTimeout(() => {
      const next = reduced ? sample.length : length + 1
      setLength(next)
      if (next === sample.length) onComplete()
    }, reduced ? 0 : 32)
    return () => window.clearTimeout(timer)
  }, [started, valid, length, sample, reduced, onComplete])

  useEffect(() => {
    if (started && !valid && input.current === document.activeElement) {
      input.current?.setSelectionRange(length, length)
    }
  }, [length, started, valid])

  return <label className={s.fieldSlot}>
    {phone && <span className={s.choiceLabel}>Phone</span>}
    <span className={s.inputFrame} data-valid={valid || undefined} data-phone={phone || undefined}>
      {phone && <span className={s.phonePrefix}><img src="/images/litres/readers/latvia.svg" alt="Latvia" width="20" height="20" /> +371</span>}
      <input ref={input} readOnly aria-label={label} placeholder={phone ? '00-000-000' : label}
        value={sample.slice(0, length)} onClick={() => setStarted(true)}
        onKeyDown={event => {
          if (event.metaKey || event.ctrlKey || event.altKey) return
          if (event.key === 'Enter' || event.key.length === 1) {
            event.preventDefault()
            setStarted(true)
          }
        }} />
    </span>
  </label>
}

// Normalized to the source image placement in Figma's 371px crop surface.
export const photoPlacement = { left: -.2102, top: -.2075, size: 1.4501 }
export const defaultCrop = { x: .25, y: .043, brightness: 100 }
export type Crop = typeof defaultCrop

export function PhotoCrop({ src, crop, onChange, onRemove }: {
  src: string
  crop: Crop
  onChange: (crop: Crop) => void
  onRemove: () => void
}) {
  const drag = useRef<{ x: number; y: number; width: number; origin: Crop } | null>(null)
  const clamp = (value: number) => Math.max(0, Math.min(.5, value))

  function move(event: PointerEvent<HTMLDivElement>) {
    if (!drag.current || !event.currentTarget.hasPointerCapture(event.pointerId)) return
    const { x, y, width, origin } = drag.current
    onChange({ ...crop, x: clamp(origin.x + (event.clientX - x) / width), y: clamp(origin.y + (event.clientY - y) / width) })
  }

  return <div className={s.cropEditor}>
    <div className={s.cropPhoto} onPointerMove={move} onLostPointerCapture={() => { drag.current = null }}>
      <img src={src} alt="Preview of generated reader" draggable={false} style={{
        width: `${photoPlacement.size * 100}%`, height: `${photoPlacement.size * 100}%`,
        left: `${photoPlacement.left * 100}%`, top: `${photoPlacement.top * 100}%`,
        filter: `brightness(${crop.brightness}%)`,
      }} />
      <button type="button" className={s.cropArea} aria-label="Move crop with the arrow keys"
        data-target="reader-photo-crop" data-cursor="open"
        style={{ left: `${crop.x * 100}%`, top: `${crop.y * 100}%` }}
        onPointerDown={event => {
          if (event.button !== 0) return
          const surface = event.currentTarget.parentElement!
          drag.current = { x: event.clientX, y: event.clientY, width: surface.clientWidth, origin: crop }
          surface.setPointerCapture(event.pointerId)
        }}
        onKeyDown={event => {
          const offsets: Record<string, [number, number]> = { ArrowLeft: [-.02, 0], ArrowRight: [.02, 0], ArrowUp: [0, -.02], ArrowDown: [0, .02] }
          const offset = offsets[event.key]
          if (!offset) return
          event.preventDefault()
          onChange({ ...crop, x: clamp(crop.x + offset[0]), y: clamp(crop.y + offset[1]) })
        }}>
        <i /><i /><i /><i />
      </button>
      <button type="button" className={s.removePhoto} aria-label="Remove photo" onClick={onRemove}><X size={16} /></button>
    </div>
    <label className={s.brightness}>
      <span className={s.choiceLabel}>Brightness</span>
      <span className={s.brightnessTrack}>
        <input aria-label="Brightness" type="range" min="50" max="150" value={crop.brightness} onChange={event => onChange({ ...crop, brightness: Number(event.target.value) })} />
        <span className={s.brightnessFill} style={{ width: `${crop.brightness - 50}%` }} />
        <span className={s.brightnessThumb} style={{ left: `${crop.brightness - 50}%` }}><GripVertical size={14} /></span>
      </span>
    </label>
  </div>
}

export function ReaderPhotoStep({ src, crop, open, requested, busy, onCapture, onRequest, onChange, onRemove }: {
  src: string
  crop: Crop
  open: boolean
  requested?: boolean
  busy?: boolean
  onCapture: () => void
  onRequest: () => void
  onChange: (crop: Crop) => void
  onRemove: () => void
}) {
  return <>
    <h3>Add a profile photo</h3>
    <p>If the person prefers not to take photos right now, you can simply send them a link by email so they can upload their photos to their profile later at their convenience.</p>
    <fieldset className={s.photoControls} disabled={busy}>
      {open
        ? <PhotoCrop src={src} crop={crop} onChange={onChange} onRemove={onRemove} />
        : <div className={s.photoActions}>
          <button type="button" className={s.primary} data-target="reader-photo-capture" onClick={onCapture}><Camera size={16} /> Make Photo</button>
          <button type="button" className={s.secondary} onClick={onRequest}><Mail size={16} /> {requested ? 'Photo request ready' : 'Ask to add photo'}</button>
        </div>}
    </fieldset>
  </>
}

export function ReaderStepFrame({ stage, reduced, children }: {
  stage: number
  reduced: boolean
  children: ReactNode
}) {
  const content = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number>()

  useLayoutEffect(() => {
    const node = content.current
    if (!node || reduced) return
    const measure = () => setHeight(node.offsetHeight)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(node)
    return () => observer.disconnect()
  }, [reduced])

  return <div className={s.stepFrame} style={{ height: reduced ? undefined : height }}>
    <div className={s.stepContent} ref={content}>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div key={stage} className={s.step} initial={{ opacity: 0, y: reduced ? 0 : 6 }}
          animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : -5 }}
          transition={{ duration: reduced ? 0 : .22, ease: [.23, 1, .32, 1] }}>
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  </div>
}
