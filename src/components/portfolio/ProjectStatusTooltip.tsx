'use client'

import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

/** Temporary homepage status. Project data and other project-list consumers
 * keep their real destinations; this control has no navigation target. */
export function ProjectStatusTooltip({ title }: { title: string }) {
  const id = useId()
  const root = useRef<HTMLSpanElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const tooltip = useRef<HTMLSpanElement>(null)
  const [state, setState] = useState({ hover: false, focus: false, pinned: false, dismissed: false })
  const open = (state.hover || state.focus || state.pinned) && !state.dismissed

  useLayoutEffect(() => {
    if (!open) return
    const update = () => {
      const button = trigger.current
      const tip = tooltip.current
      if (!button || !tip) return
      const anchor = button.getBoundingClientRect()
      const popup = tip.getBoundingClientRect()
      const gap = parseFloat(getComputedStyle(tip).getPropertyValue('--space-sm')) || 8
      const headerBottom = document.querySelector('header')?.getBoundingClientRect().bottom ?? 0
      if (anchor.bottom <= headerBottom || anchor.top >= window.innerHeight) {
        tip.style.visibility = 'hidden'
        return
      }
      const above = anchor.top - popup.height - gap
      const below = above < headerBottom + gap
      const left = Math.max(gap, Math.min(anchor.left, document.documentElement.clientWidth - popup.width - gap))
      const top = Math.max(gap, Math.min(below ? anchor.bottom + gap : above, window.innerHeight - popup.height - gap))
      tip.dataset.placement = below ? 'below' : 'above'
      tip.style.transform = `translate(${left}px, ${top}px)`
      tip.style.visibility = 'visible'
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update) }
  }, [open])

  useEffect(() => {
    if (!open) return
    const dismissOutside = (event: PointerEvent) => {
      const target = event.target as Node
      if (!root.current?.contains(target) && !tooltip.current?.contains(target)) {
        setState(previous => ({ ...previous, pinned: false, dismissed: true }))
      }
    }
    const dismissEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setState(previous => ({ ...previous, pinned: false, dismissed: true }))
    }
    document.addEventListener('pointerdown', dismissOutside)
    document.addEventListener('keydown', dismissEscape)
    return () => {
      document.removeEventListener('pointerdown', dismissOutside)
      document.removeEventListener('keydown', dismissEscape)
    }
  }, [open])

  function hover(active: boolean) {
    setState(previous => ({ ...previous, hover: active, dismissed: active ? false : previous.focus ? previous.dismissed : false }))
  }

  return <span ref={root} className="project-status"
    onPointerEnter={event => { if (event.pointerType !== 'touch') hover(true) }}
    onPointerLeave={event => { if (event.pointerType !== 'touch') hover(false) }}
    onKeyDown={event => {
      if (event.key === 'Escape' && open) {
        event.stopPropagation()
        setState(previous => ({ ...previous, pinned: false, dismissed: true }))
      }
    }}>
    <button ref={trigger} type="button" className="editorial-link project-status-trigger" aria-describedby={id}
      onFocus={() => setState(previous => ({ ...previous, focus: true, dismissed: false }))}
      onBlur={() => setState(previous => ({ ...previous, focus: false, pinned: false, dismissed: previous.hover ? previous.dismissed : false }))}
      onClick={event => {
        event.currentTarget.focus({ preventScroll: true })
        setState(previous => ({ ...previous, pinned: !previous.pinned, dismissed: previous.pinned }))
      }}>{title}</button>
    {open ? createPortal(<span ref={tooltip} id={id} role="tooltip" className="project-status-tooltip"
      onPointerEnter={event => { if (event.pointerType !== 'touch') hover(true) }}
      onPointerLeave={event => { if (event.pointerType !== 'touch') hover(false) }}>In Progress</span>, document.body)
      : <span id={id} role="tooltip" className="sr-only project-status-description">In Progress</span>}
    <noscript><span className="project-status-fallback">{title} <span className="project-status-label">In Progress</span></span></noscript>
  </span>
}
