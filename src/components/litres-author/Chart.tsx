import { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import { count, type Point } from './sample'
import styles from './author.module.css'

type Series = { label: string; color: string }

function curve(coords: { x: number; y: number }[]) {
  return coords.map((point, index) => {
    if (!index) return `M${point.x},${point.y}`
    const before = coords[index - 1]
    const middle = (before.x + point.x) / 2
    return `C${middle},${before.y} ${middle},${point.y} ${point.x},${point.y}`
  }).join(' ')
}

export default function Chart({ label, series, data, format = count, variant = 'line', area = false, preview }: {
  label: string
  series: Series[]
  data: Point[]
  format?: (value: number) => string
  variant?: 'line' | 'sales'
  area?: boolean
  preview?: { target: string; active: number | null }
}) {
  const id = useId()
  const controls = useRef<(HTMLButtonElement | null)[]>([])
  const [cursor, setCursor] = useState(0)
  const [hover, setHover] = useState<number | null>(null)
  const [focus, setFocus] = useState<number | null>(null)
  const [pinned, setPinned] = useState<number | null>(null)
  const active = preview ? preview.active : hover ?? focus ?? pinned
  const selected = active === null ? undefined : data[active]
  const sales = variant === 'sales'
  const x = (index: number) => index * 100 / Math.max(1, data.length - 1)
  const ticks = Array.from({ length: 4 }, (_, index) => Math.round(index * (data.length - 1) / 3))
  const values = data.flatMap(point => point.values)
  const max = Math.max(1, ...values)
  const baseline = sales ? 0 : Math.min(...values) * .92
  const order = 10 ** Math.floor(Math.log10(max / 4))
  const step = Math.ceil(max / (4 * order)) * order
  const y = (value: number) => 97 - (value - baseline) / ((sales ? step * 4 : max) - baseline) * 94
  const lines = series.map((item, index) => ({
    ...item,
    id: `${id}-${index}`,
    path: curve(data.map((point, pointIndex) => ({ x: x(pointIndex) * 10, y: y(point.values[index]) }))),
  }))

  function inspect(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index
    switch (event.key) {
      case 'ArrowLeft': next = Math.max(0, index - 1); break
      case 'ArrowRight': next = Math.min(data.length - 1, index + 1); break
      case 'Home': next = 0; break
      case 'End': next = data.length - 1; break
      case 'Escape':
        if (active !== null) event.preventDefault()
        setPinned(null)
        setHover(null)
        setFocus(null)
        return
      default: return
    }
    event.preventDefault()
    setHover(null)
    controls.current[next]?.focus()
  }

  return <div className={styles.chart} data-variant={variant} role="group" aria-label={label}>
    {sales && <div className={styles.axisY} aria-hidden="true">
      {[4, 3, 2, 1, 0].map(tick => <span key={tick}>{format(step * tick)}</span>)}
    </div>}
    <div className={styles.plot} onPointerLeave={() => setHover(null)}>
      <svg viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true">
        {sales && [3, 26.5, 50, 73.5, 97].map(level =>
          <line key={level} x1="0" x2="1000" y1={level} y2={level} stroke="var(--litres-grid, #e7ecf2)" vectorEffect="non-scaling-stroke" />,
        )}
        <defs>{!sales && lines.map(item => <linearGradient key={item.id} id={item.id} x2="1000" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor={item.color} stopOpacity=".08" />
          <stop offset="1" stopColor={item.color} />
        </linearGradient>)}
          {area && lines.map(item => <linearGradient key={item.id} id={`${item.id}-area`} x2="0%" y2="100%">
            <stop stopColor={item.color} stopOpacity=".24" />
            <stop offset="1" stopColor={item.color} stopOpacity="0" />
          </linearGradient>)}
        </defs>
        {area && lines.map(item => <path key={item.id} d={`${item.path} L${x(data.length - 1) * 10},97 H0 Z`} fill={`url(#${item.id}-area)`} />)}
        {active !== null && sales && !area && <line x1={x(active) * 10} x2={x(active) * 10} y1="3" y2="97"
          stroke="var(--litres-guide, #e8ecf1)" strokeWidth="6" vectorEffect="non-scaling-stroke" />}
        {lines.map(item => <path key={item.id} d={item.path} fill="none" stroke={sales ? item.color : `url(#${item.id})`}
          strokeWidth={area ? 2.5 : sales ? 2 : 1.8} strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />)}
      </svg>
      <div className={styles.points}>
        {data.map((point, index) => <button
          key={point.label}
          type="button"
          data-target={preview && `${preview.target}-${index}`}
          ref={node => { controls.current[index] = node }}
          tabIndex={index === cursor ? 0 : -1}
          aria-pressed={index === pinned}
          aria-label={`${point.label}. ${series.map((item, i) => `${item.label}: ${format(point.values[i])}`).join('. ')}`}
          onPointerEnter={event => { if (event.pointerType !== 'touch') setHover(index) }}
          onFocus={() => { setCursor(index); setFocus(index) }}
          onBlur={() => setFocus(null)}
          onClick={() => setPinned(index === pinned ? null : index)}
          onKeyDown={event => inspect(event, index)}
        />)}
      </div>
      {selected && active !== null && <>
        {area && <span className={styles.plotGuide} aria-hidden="true" style={{ left: `${x(active)}%` }} />}
        {series.map((item, index) => <span key={item.label} className={styles.marker} aria-hidden="true"
          style={{ left: `${x(active)}%`, top: `${y(selected.values[index])}%`, borderColor: item.color }} />)}
        <div className={styles.tooltip} data-pinned={active === pinned || undefined} aria-hidden="true"
          style={{ '--point': `${x(active)}%` } as CSSProperties}>
          <strong>{selected.label}</strong>
          {series.map((item, index) => <div key={item.label}>
            <i style={{ background: item.color }} />
            <span>{item.label}</span>
            <b>{format(selected.values[index])}</b>
          </div>)}
        </div>
      </>}
    </div>
    {sales && <div className={styles.axisX} aria-hidden="true">{ticks.map((index, tick) =>
      <span key={tick} style={{ left: `${x(index)}%` }}>{data[index].axis}</span>
    )}</div>}
  </div>
}
