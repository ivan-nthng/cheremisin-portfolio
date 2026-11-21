import { useLayoutEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react'
import styles from './author.module.css'

export const tileNames = { income: 'Total income', sold: 'Books sold', views: 'Views', pages: 'Pages read' }
export type TileId = keyof typeof tileNames
type Corner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
export type TileHandle = { id: TileId; corner: Corner; hidden?: boolean }
export type TileLift = { id: TileId; x: number; y: number }

export function moveTile(order: TileId[], from: TileId, to: TileId) {
  const next = [...order]
  next.splice(next.indexOf(from), 1)
  next.splice(order.indexOf(to), 0, from)
  return next
}

export default function ReorderTiles({ order, onReorder, renderTile, preview }: {
  order: TileId[]
  onReorder?: (order: TileId[]) => void
  renderTile: (id: TileId) => ReactNode
  preview?: { handle: TileHandle | null; lift: TileLift | null }
}) {
  const grid = useRef<HTMLDivElement>(null)
  const tiles = useRef<Partial<Record<TileId, HTMLElement>>>({})
  const previous = useRef<{ order: TileId[]; lifted: boolean; positions: Partial<Record<TileId, { x: number; y: number }>> } | null>(null)
  const pointer = useRef<{ id: TileId; pointerId: number; x: number; y: number } | null>(null)
  const [handle, setHandle] = useState<TileHandle | null>(null)
  const [lift, setLift] = useState<TileLift | null>(null)
  const [status, setStatus] = useState('')
  const visibleHandle = preview ? preview.handle : handle
  const lifted = preview ? preview.lift : lift

  useLayoutEffect(() => {
    const before = previous.current
    const root = grid.current!
    const parent = root.getBoundingClientRect()
    const positions: Partial<Record<TileId, { x: number; y: number }>> = {}
    const settled = before && (before.order !== order || before.lifted && !lifted)
    for (const id of order) {
      const node = tiles.current[id]!
      const rect = node.getBoundingClientRect()
      const now = positions[id] = { x: rect.x - parent.x, y: rect.y - parent.y }
      const old = before?.positions[id]
      if (!settled || !old || matchMedia('(prefers-reduced-motion: reduce)').matches) continue
      const scale = rect.width / node.offsetWidth || 1
      const x = (old.x - now.x) / scale, y = (old.y - now.y) / scale
      if (Math.hypot(x, y) < 1) continue
      const animation = node.animate([{ transform: `translate(${x}px, ${y}px)` }, { transform: 'none' }], {
        duration: 250,
        easing: 'cubic-bezier(.2,.65,.3,1)',
      })
      animation.id = 'litres-tile-settle'
    }
    previous.current = { order, lifted: Boolean(lifted), positions }
  })

  function move(id: TileId, to: TileId) {
    if (id === to) return
    const next = moveTile(order, id, to)
    onReorder?.(next)
    setStatus(`${tileNames[id]} moved to position ${next.indexOf(id) + 1} of ${order.length}.`)
  }

  function finish(event: PointerEvent<HTMLButtonElement>, commit: boolean) {
    const drag = pointer.current
    if (!drag || drag.pointerId !== event.pointerId) return
    pointer.current = null
    setLift(null)
    if (!commit) return
    if (event.pointerType === 'touch') setHandle(handle => handle && { ...handle, hidden: true })
    const destination = order.find(id => {
      if (id === drag.id) return false
      const box = tiles.current[id]?.getBoundingClientRect()
      return box && event.clientX >= box.left && event.clientX <= box.right
        && event.clientY >= box.top && event.clientY <= box.bottom
    })
    if (destination) move(drag.id, destination)
  }

  return <div className={styles.topTiles} ref={grid}>
    {order.map((id, index) => {
      const active = lifted?.id === id
      const corner = visibleHandle?.id === id ? visibleHandle.corner : 'top-left'
      return <article key={id} ref={(node: HTMLDivElement | null) => { if (node) tiles.current[id] = node; else delete tiles.current[id] }}
        className={`${styles.tile} ${id === 'income' ? styles.income : ''}`}
        style={active ? { transform: `translate(${lifted.x}px, ${lifted.y}px)` } : undefined}
        data-target={preview && `tile-${id}`} data-metric-tile={id} data-lifted={active || undefined}
        data-handle={visibleHandle?.id === id && !visibleHandle.hidden || undefined}
        onPointerMove={(event: PointerEvent<HTMLDivElement>) => {
          if (pointer.current || event.pointerType === 'touch' || (event.target as HTMLElement).closest('button[data-corner]')) return
          const box = event.currentTarget.getBoundingClientRect()
          const side = event.clientX < box.left + box.width / 2 ? 'left' : 'right'
          const edge = event.clientY < box.top + box.height / 2 ? 'top' : 'bottom'
          const nearest = `${edge}-${side}` as Corner
          if (handle?.id !== id || handle.corner !== nearest || handle.hidden) setHandle({ id, corner: nearest })
        }}
        onPointerLeave={() => { if (!pointer.current) setHandle(value => value && { ...value, hidden: true }) }}>
        {renderTile(id)}
        <button type="button" className={styles.dragHandle} data-corner={corner} data-target={preview && `handle-${id}`}
          aria-label={`Move ${tileNames[id]}`} title={`Drag to reorder ${tileNames[id]}`}
          onPointerDown={event => {
            if (event.button !== 0 || pointer.current) return
            tiles.current[id]?.getAnimations().filter(animation => animation.id === 'litres-tile-settle').forEach(animation => animation.cancel())
            pointer.current = { id, pointerId: event.pointerId, x: event.clientX, y: event.clientY }
            event.currentTarget.setPointerCapture(event.pointerId)
            setHandle({ id, corner })
            setLift({ id, x: 0, y: 0 })
          }}
          onPointerMove={event => {
            const drag = pointer.current
            if (drag?.id === id && drag.pointerId === event.pointerId) setLift({ id, x: event.clientX - drag.x, y: event.clientY - drag.y })
          }}
          onPointerUp={event => finish(event, true)}
          onPointerCancel={event => finish(event, false)}
          onLostPointerCapture={event => finish(event, false)}
          onClick={event => { if (event.detail === 0) move(id, order[index + 1] ?? order[index - 1]) }}
          onKeyDown={event => {
            if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return
            event.preventDefault()
            const offset = event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 1
            const target = order[index + offset]
            if (target) move(id, target)
          }}>
          <span aria-hidden="true" />
        </button>
      </article>
    })}
    <span className={styles.reorderStatus} role="status">{status}</span>
  </div>
}
