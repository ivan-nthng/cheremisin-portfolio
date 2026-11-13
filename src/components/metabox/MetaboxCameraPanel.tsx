'use client'

import { useLayoutEffect, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from 'react'
import { Camera, Crosshair, MoveHorizontal, MoveVertical, RefreshCw, Rotate3D } from 'lucide-react'
import { clamp, frameRange, unrestricted, zoomFor, type CameraLimits, type CameraSettings } from './camera-model'
import MetaboxSelect from './MetaboxSelect'
import controls from './metabox-controls.module.css'
import s from './metabox-camera-panel.module.css'

type Props = {
  tab: 'position' | 'restrictions'
  camera: CameraSettings
  limits: CameraLimits
  onCamera: (patch: Partial<CameraSettings>) => void
  onLimits: (patch: Partial<CameraLimits>) => void
  onReset: () => void
  onClear: () => void
  onApply: () => void
}

type NumberProps = {
  label: string
  value: number
  min: number
  max: number
  prefix?: ReactNode
  suffix?: string
  dragAxis?: 'horizontal' | 'vertical'
  dragStep?: number
  onChange: (value: number) => void
}

function CameraNumber({ label, value, min, max, prefix, suffix, dragAxis, dragStep = 1, onChange }: NumberProps) {
  const [draft, setDraft] = useState<string | null>(null)
  const [scrubbing, setScrubbing] = useState(false)
  const input = useRef<HTMLInputElement>(null)
  const drag = useRef<{ pointer: number; start: number; origin: number; moved: boolean } | null>(null)
  const suppressClick = useRef(false)
  const editing = draft !== null
  const display = String(Number(value.toFixed(2)))

  useLayoutEffect(() => {
    if (editing) input.current?.select()
  }, [editing])

  function commit() {
    if (draft !== null && draft.trim()) {
      const parsed = Number(draft.replace(',', '.'))
      if (Number.isFinite(parsed)) onChange(clamp(parsed, min, max))
    }
    setDraft(null)
  }

  function coordinate(event: PointerEvent<HTMLLabelElement>) {
    return dragAxis === 'vertical' ? -event.clientY : event.clientX
  }

  function startDrag(event: PointerEvent<HTMLLabelElement>) {
    if (!dragAxis || event.button !== 0 || !event.isPrimary) return
    event.preventDefault()
    suppressClick.current = false
    const typed = draft?.trim() ? Number(draft.replace(',', '.')) : NaN
    drag.current = {
      pointer: event.pointerId, start: coordinate(event),
      origin: Number.isFinite(typed) ? clamp(typed, min, max) : value, moved: false,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function moveDrag(event: PointerEvent<HTMLLabelElement>) {
    const gesture = drag.current
    if (!gesture || event.pointerId !== gesture.pointer) return
    const distance = coordinate(event) - gesture.start
    if (!gesture.moved) {
      if (Math.abs(distance) < 3) return
      gesture.moved = true
      suppressClick.current = true
      input.current?.blur()
      setScrubbing(true)
    }
    onChange(clamp(Number((gesture.origin + distance * dragStep).toFixed(2)), min, max))
  }

  function finishDrag(event: PointerEvent<HTMLLabelElement>, focusOnClick = false) {
    const gesture = drag.current
    if (!gesture || event.pointerId !== gesture.pointer) return
    drag.current = null
    setScrubbing(false)
    if (focusOnClick && !gesture.moved) input.current?.focus({ preventScroll: true })
  }

  return <label className={s.numberField} data-drag-axis={dragAxis} data-scrubbing={scrubbing || undefined}
    onPointerDown={startDrag} onPointerMove={moveDrag}
    onPointerUp={event => finishDrag(event, true)} onLostPointerCapture={finishDrag}
    onClick={event => {
      if (!suppressClick.current) return
      suppressClick.current = false
      event.preventDefault()
    }}>
    {prefix && <span className={s.numberPrefix} aria-hidden="true">{prefix}</span>}
    <input ref={input} aria-label={label} title={`${display}${suffix ?? ''}`} inputMode="decimal" value={draft ?? `${display}${suffix ?? ''}`}
      onChange={event => setDraft(event.target.value)}
      onFocus={() => setDraft(display)}
      onBlur={commit}
      onKeyDown={event => {
        if (event.key === 'Enter') {
          event.preventDefault()
          event.currentTarget.blur()
        }
        if (event.key === 'Escape') {
          event.preventDefault()
          event.stopPropagation()
          setDraft(display)
        }
      }} />
  </label>
}

const restrictionGroups = [
  { title: 'Zoom', icon: Crosshair, fields: [['minZoom', 'Min. zoom', 'minimum zoom'], ['maxZoom', 'Max. zoom', 'maximum zoom']] },
  { title: 'Horizontal Rotation', icon: MoveHorizontal, fields: [['left', 'Left', 'left rotation'], ['right', 'Right', 'right rotation']] },
  { title: 'Vertical Rotation', icon: MoveVertical, fields: [['top', 'Top', 'top rotation'], ['bottom', 'Bottom', 'bottom rotation']] },
] as const

const fovMin = zoomFor(unrestricted.maxZoom)
const fovMax = zoomFor(unrestricted.minZoom)
const interactionOptions = [
  { value: 'Orbit', label: 'Orbit' },
  { value: 'Fixed', label: 'Fixed' },
] as const

export default function MetaboxCameraPanel({
  tab, camera, limits, onCamera, onLimits, onReset, onClear, onApply,
}: Props) {
  const restrictions = tab === 'restrictions'
  const captured = {
    minZoom: zoomFor(camera.fov),
    maxZoom: zoomFor(camera.fov),
    left: Math.max(0, -camera.yaw),
    right: Math.max(0, camera.yaw),
    top: Math.max(0, camera.pitch),
    bottom: Math.max(0, -camera.pitch),
  }

  return <aside className={s.panel} aria-label={restrictions ? 'Camera restrictions' : 'Camera settings'}>
    <div className={s.body}>
      <header className={s.heading}>
        <span className={s.headingIcon}>
          {restrictions ? <Rotate3D size={16} aria-hidden="true" /> : <Camera size={14} aria-hidden="true" />}
        </span>
        <h2>{restrictions ? 'Camera Restrictions' : 'Camera Settings'}</h2>
        <button type="button" className={`${controls.button} ${controls.quiet} ${controls.compact} ${s.reset}`} onClick={restrictions ? onClear : onReset}
          aria-label={restrictions ? 'Clear camera restrictions' : 'Reset camera position'}
          title={restrictions ? 'Clear camera restrictions' : 'Reset camera position'}>
          <RefreshCw size={13} aria-hidden="true" />
          {restrictions && 'Clear'}
        </button>
      </header>

      {restrictions ? <div className={s.restrictions}>
        {restrictionGroups.map(({ title, icon: Icon, fields }) => {
          const zoom = title === 'Zoom'
          return <section key={title} className={s.card} aria-label={title}>
            <h3><Icon size={17} aria-hidden="true" /> {title}</h3>
            <div className={s.limits}>
              {fields.map(([key, label, name]) =>
                <div key={key} className={s.limit}>
                  <span className={s.limitLabel}>{label}</span>
                  <div className={s.limitControls}>
                    <CameraNumber label={name} value={limits[key]} min={zoom ? unrestricted.minZoom : 0} max={zoom ? unrestricted.maxZoom : 90}
                      suffix={zoom ? undefined : '°'} onChange={value => onLimits({ [key]: value })} />
                    <button type="button" className={`${controls.button} ${controls.secondary} ${controls.compact}`} aria-label={`Set ${name}`}
                      title={`Set ${name} from current view`} onClick={() => onLimits({ [key]: captured[key] })}>Set</button>
                  </div>
                </div>
              )}
            </div>
          </section>
        })}
      </div> : <div className={s.settings}>
        <div className={s.row}>
          <span>Interaction</span>
          <MetaboxSelect compact label="Interaction" value={camera.interaction} options={interactionOptions}
            onChange={interaction => onCamera({ interaction })} />
        </div>
        <div className={s.row}>
          <span>Position</span>
          <div className={s.position}>
            {(['x', 'y', 'z'] as const).map(axis =>
              <CameraNumber key={axis} label={`Camera ${axis} position`} value={camera[axis]} min={-9999} max={9999}
                dragAxis={axis === 'y' ? 'vertical' : 'horizontal'} dragStep={axis === 'y' ? 1 : 2}
                prefix={<span className={s.axis}>{axis}</span>} onChange={value => onCamera({ [axis]: value })} />
            )}
          </div>
        </div>
        <div className={s.row}>
          <span>Rotation</span>
          <div className={s.rotation}>
            <CameraNumber label="Horizontal camera rotation" value={camera.yaw} min={frameRange.min} max={frameRange.max} suffix="°"
              dragAxis="horizontal" dragStep={.1} prefix={<MoveHorizontal size={14} />} onChange={yaw => onCamera({ yaw })} />
            <CameraNumber label="Vertical camera rotation" value={camera.pitch} min={-20} max={20} suffix="°"
              dragAxis="vertical" dragStep={.15} prefix={<MoveVertical size={14} />} onChange={pitch => onCamera({ pitch })} />
          </div>
        </div>
        <div className={s.row}>
          <span>FOV</span>
          <div className={s.fov}>
            <input className={s.range} type="range" aria-label="Field of view"
              value={camera.fov} min={fovMin} max={fovMax}
              style={{ '--range-fill': `${(camera.fov - fovMin) / (fovMax - fovMin) * 100}%` } as CSSProperties}
              onChange={event => onCamera({ fov: event.target.valueAsNumber })} />
            <CameraNumber label="Field of view value" value={camera.fov} min={fovMin} max={fovMax}
              onChange={fov => onCamera({ fov })} />
          </div>
        </div>
      </div>}
    </div>
    <footer className={s.footer}>
      <button type="button" className={`${controls.button} ${controls.primary}`} onClick={onApply}>Apply Camera Settings</button>
    </footer>
  </aside>
}
