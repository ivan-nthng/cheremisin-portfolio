'use client'

import { useLayoutEffect, useRef, type PointerEvent } from 'react'
import { cameraFrames, clamp, startingCamera, type CameraSettings } from './camera-model'
import { sofaName } from './catalog-fixtures'
import s from './metabox.module.css'

export default function MetaboxViewport({ camera, fovMin, fovMax, measurements, onCamera, onReset, imageAttempt = 0, onReady, onUnavailable }: {
  imageAttempt?: number; onReady?: () => void; onUnavailable?: () => void;
  camera: CameraSettings
  fovMin: number
  fovMax: number
  measurements: boolean
  onCamera: (patch: Partial<CameraSettings>) => void
  onReset: () => void
}) {
  const drag = useRef<{ x: number; y: number; yaw: number; pitch: number } | null>(null)
  const fixed = camera.interaction === 'Fixed'
  const image = useRef<HTMLImageElement>(null)
  const depth = clamp((startingCamera.z - camera.z) / 3200, -.06, .15)
  const scale = Math.max(1, 1.035 + (55 - camera.fov) / (camera.fov > 55 ? 850 : 125) + depth)
  const maxShift = (scale - 1) * 48
  const horizontal = clamp((startingCamera.x - camera.x) / 65, -maxShift, maxShift)
  const vertical = clamp((camera.y - startingCamera.y) / 65 + camera.pitch / 4, -maxShift, maxShift)
  const activeFrame = cameraFrames.reduce((closest, frame) =>
    Math.abs(camera.yaw - frame.yaw) <= Math.abs(camera.yaw - closest.yaw) ? frame : closest)

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (fixed || event.button !== 0) return
    drag.current = { x: event.clientX, y: event.clientY, yaw: camera.yaw, pitch: camera.pitch }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    if (!drag.current || !event.currentTarget.hasPointerCapture(event.pointerId)) return
    onCamera({
      yaw: drag.current.yaw + (event.clientX - drag.current.x) / 16,
      pitch: drag.current.pitch + (event.clientY - drag.current.y) / 12,
    })
  }

  useLayoutEffect(() => {
    if (image.current?.complete) {
      if (image.current.naturalWidth) onReady?.()
      else onUnavailable?.()
    }
  }, [activeFrame, imageAttempt, onReady, onUnavailable])

  return <section className={s.viewport} aria-label="Sofa camera preview">
    <div className={s.canvas} data-fixed={fixed || undefined} onPointerDown={startDrag} onPointerMove={moveDrag}
      onLostPointerCapture={() => { drag.current = null }} tabIndex={fixed ? undefined : 0}
      role="group" aria-label={fixed ? 'Camera view' : 'Camera view. Use arrow keys to move the camera.'}
      onKeyDown={event => {
        if (fixed) return
        const patch = event.key === 'ArrowLeft' ? { yaw: camera.yaw - 1 }
          : event.key === 'ArrowRight' ? { yaw: camera.yaw + 1 }
          : event.key === 'ArrowUp' ? { pitch: camera.pitch + 1 }
          : event.key === 'ArrowDown' ? { pitch: camera.pitch - 1 } : null
        if (!patch) return
        event.preventDefault()
        onCamera(patch)
      }}>
      <div className={s.viewFrames} style={{ transform: `translate(${horizontal}%, ${vertical}%) scale(${scale})` }}>
        {cameraFrames.map((frame, index) => <img key={frame.yaw + ':' + imageAttempt} src={frame.src}
          ref={frame === activeFrame ? image : undefined} onLoad={frame === activeFrame ? onReady : undefined}
          onError={frame === activeFrame ? onUnavailable : undefined}
          className={index ? s.alternateFrame : undefined} data-visible={frame === activeFrame || undefined}
          alt={index ? '' : `${sofaName} in the studio`} aria-hidden={index > 0 || undefined}
          draggable={false} fetchPriority={frame.yaw === 0 ? 'high' : undefined} />)}
        {measurements && <div className={s.measurement} aria-label="Illustrative sofa width">
          <span>2.4 m · sample</span>
        </div>}
      </div>
    </div>
    <div className={s.viewportActions}>
      <button type="button" aria-label="Zoom in" title="Zoom in" data-target="metabox-zoom" disabled={fixed || camera.fov <= fovMin}
        onClick={() => onCamera({ fov: camera.fov - 5 })}><img src="/images/metabox/controls/plus.svg" width={16} height={16} alt="" /></button>
      <button type="button" aria-label="Zoom out" title="Zoom out" disabled={fixed || camera.fov >= fovMax}
        onClick={() => onCamera({ fov: camera.fov + 5 })}><img src="/images/metabox/controls/minus.svg" width={16} height={16} alt="" /></button>
      <button type="button" aria-label="Reset view" title="Reset view" data-target="metabox-reset-view" onClick={onReset}><img src="/images/metabox/controls/reset.svg" width={16} height={16} alt="" /></button>
    </div>
  </section>
}
