'use client'

import { useId, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from 'react'
import s from './library-components.module.css'

export type MetricPoint = { label: string; value: number }

const width = 400
const height = 140

export function LibraryMetricChart({
  label, points, range, variant, ticks = [], format = String, extendLast = false, axisLabels,
}: {
  label: string
  points: readonly MetricPoint[]
  range: readonly [number, number]
  variant: 'dots' | 'grid'
  ticks?: readonly number[]
  format?: (value: number) => string
  extendLast?: boolean
  axisLabels?: readonly string[]
}) {
  const id = useId()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [focused, setFocused] = useState(false)
  const chartEnd = extendLast ? width * 0.42 : width
  const step = chartEnd / Math.max(1, points.length - 1)
  const valueY = (value: number) => height - (value - range[0]) / (range[1] - range[0]) * height
  const plot = points.map(({ value }, index) => ({ x: index * step, y: valueY(value) }))
  const first = plot[0]
  const last = plot.at(-1)
  if (!first || !last) return null

  const path = plot.reduce((line, point, index) => {
    if (index === 0) return `M ${point.x} ${point.y}`
    const prev = plot[index - 1]
    const mid = (prev.x + point.x) / 2
    return `${line} C ${mid} ${prev.y}, ${mid} ${point.y}, ${point.x} ${point.y}`
  }, '')
  const fill = `${path}${extendLast ? ` H ${width}` : ''} V ${height} H 0 Z`
  const current = activeIndex === null ? undefined : plot[activeIndex]
  const datum = activeIndex === null ? undefined : points[activeIndex]
  const guidePoint = current ?? (variant === 'dots' ? last : undefined)

  function inspect(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'touch') return
    const { left, width: renderedWidth } = event.currentTarget.getBoundingClientRect()
    const index = Math.round((event.clientX - left) / renderedWidth * width / step)
    setActiveIndex(Math.max(0, Math.min(points.length - 1, index)))
  }

  function inspectKey(event: KeyboardEvent<HTMLDivElement>) {
    const index = activeIndex ?? points.length - 1
    const key = event.key
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End', 'Escape'].includes(key)) return
    event.preventDefault()
    if (key === 'Escape') return setActiveIndex(null)
    const next = key === 'Home' ? 0 : key === 'End' ? points.length - 1 : index + (key === 'ArrowLeft' ? -1 : 1)
    setActiveIndex(Math.max(0, Math.min(points.length - 1, next)))
  }

  return (
    <figure className={s.chart} data-variant={variant}>
      <figcaption className={s.srOnly}>{label}. Illustrative data.</figcaption>
      {ticks.length > 0 && <div className={s.axisValues} aria-hidden="true">
        {ticks.map(tick => <span key={tick}>{tick}</span>)}
      </div>}
      <div
        className={s.plot}
        data-variant={variant}
        role="group"
        aria-label={label}
        aria-describedby={`${id}-instructions`}
        tabIndex={0}
        onPointerMove={inspect}
        onPointerLeave={() => { if (!focused) setActiveIndex(null) }}
        onFocus={() => { setFocused(true); setActiveIndex(points.length - 1) }}
        onBlur={() => { setFocused(false); setActiveIndex(null) }}
        onKeyDown={inspectKey}
      >
        <span className={s.srOnly} id={`${id}-instructions`}>Use the left and right arrow keys to inspect sample values.</span>
        <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <defs>
            <linearGradient id={`${id}-fill`} x2="0" y2="1">
              <stop className={s.areaColor} stopOpacity=".32" />
              <stop className={s.areaColor} offset="1" stopOpacity="0" />
            </linearGradient>
          </defs>
          {variant === 'grid' && <>
                {ticks.map(tick => <line key={tick} className={s.gridLine} x2={width} y1={valueY(tick)} y2={valueY(tick)} />)}
                {plot.map((point, index) => <line key={index} className={s.gridColumn} x1={point.x} x2={point.x} y2={height} />)}
              </>}
          <path d={fill} fill={`url(#${id}-fill)`} />
          <path className={s.trendLine} d={path} />
          {guidePoint && <line className={s.guide} x1={guidePoint.x} x2={guidePoint.x} y1="0" y2={height} />}
        </svg>
        {variant === 'dots' && <span className={s.finalPoint} aria-hidden="true" style={{ left: `${last.x / width * 100}%`, top: `${last.y / height * 100}%` }} />}
        {current && datum && <>
          <span className={s.chartMarker} aria-hidden="true" style={{ left: `${current.x / width * 100}%`, top: `${current.y / height * 100}%` }} />
          <span className={s.chartTooltip} aria-hidden="true" style={{ left: `clamp(57px, ${current.x / width * 100}%, calc(100% - 57px))` }}>
            {datum.label}<strong>{format(datum.value)}</strong>
          </span>
        </>}
        <span className={s.srOnly} aria-live="polite">{focused && datum ? `${datum.label}: ${format(datum.value)}` : ''}</span>
      </div>
      {variant === 'grid' && <div className={s.axisLabels} aria-hidden="true" style={{ '--label-count': axisLabels?.length ?? points.length } as CSSProperties}>
        {(axisLabels ?? points.map(point => point.label)).map((label, index) => <span key={`${label}-${index}`}>{label}</span>)}
      </div>}
    </figure>
  )
}
