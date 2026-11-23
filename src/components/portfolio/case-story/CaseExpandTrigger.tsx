'use client'

import { useCallback, useEffect, useRef, type PointerEvent as ReactPointerEvent } from 'react'
import { Maximize2 } from 'lucide-react'
import styles from '@/components/citymobil-features/features.module.css'

export function CaseExpandTrigger({ title, hidden, disabled, available = true, touchHint, onExpand }: {
  title: string
  hidden?: boolean
  disabled?: boolean
  available?: boolean
  touchHint?: boolean
  onExpand: (entry: HTMLButtonElement) => void
}) {
  const expandHint = useRef<HTMLSpanElement>(null)
  const gesture = useRef({ x: 0, y: 0, moved: false, scroll: 0 })
  const pointer = useRef({ x: NaN, y: NaN, moved: false })
  const hideExpandHint = useCallback(() => {
    pointer.current.moved = false
    const hint = expandHint.current
    if (hint) { hint.removeAttribute('data-hover'); hint.setAttribute('data-dismissed', '') }
  }, [])
  function placeExpandHint(event: ReactPointerEvent<HTMLButtonElement>) {
    const hint = expandHint.current, button = event.currentTarget
    if (!hint || event.pointerType === 'touch' || button.disabled || button.getAttribute('aria-disabled') === 'true' || !matchMedia('(hover: hover) and (pointer: fine)').matches) return
    // WebKit sends a stationary pointermove after wheel scrolling.
    const moved = pointer.current.moved || pointer.current.x !== event.clientX || pointer.current.y !== event.clientY
    if (hint.hasAttribute('data-dismissed') && !moved) return
    const rect = button.getBoundingClientRect(), size = hint.offsetWidth, gap = 16, inset = 8
    const x = event.clientX - rect.left, y = event.clientY - rect.top
    const right = Math.min(rect.width, document.documentElement.clientWidth - rect.left) - inset
    const bottom = Math.min(rect.height, innerHeight - rect.top) - inset
    const left = Math.max(inset, inset - rect.left), top = Math.max(inset, inset - rect.top)
    const hintX = Math.max(left, Math.min(x + gap + size <= right ? x + gap : x - size - gap, right - size))
    const hintY = Math.max(top, Math.min(y + gap + size <= bottom ? y + gap : y - size - gap, bottom - size))
    hint.style.transform = `translate3d(${hintX}px, ${hintY}px, 0)`
    hint.removeAttribute('data-dismissed'); hint.setAttribute('data-hover', '')
  }
  useEffect(() => {
    const fine = matchMedia('(hover: hover) and (pointer: fine)')
    const trackPointer = (event: PointerEvent) => {
      const moved = event.clientX !== pointer.current.x || event.clientY !== pointer.current.y
      pointer.current = { x: event.clientX, y: event.clientY, moved }
    }
    const wheel = (event: WheelEvent) => {
      pointer.current = { x: event.clientX, y: event.clientY, moved: false }
      hideExpandHint()
    }
    // Authored iframe focus also blurs window, while the page keeps focus.
    const blur = () => { if (!document.hasFocus()) hideExpandHint() }
    window.addEventListener('blur', blur)
    window.addEventListener('pointermove', trackPointer, { capture: true, passive: true })
    window.addEventListener('wheel', wheel, { capture: true, passive: true })
    window.addEventListener('resize', hideExpandHint)
    window.addEventListener('scroll', hideExpandHint, { capture: true, passive: true })
    fine.addEventListener('change', hideExpandHint)
    return () => {
      window.removeEventListener('blur', blur)
      window.removeEventListener('pointermove', trackPointer, true)
      window.removeEventListener('wheel', wheel, true)
      window.removeEventListener('resize', hideExpandHint)
      window.removeEventListener('scroll', hideExpandHint, true)
      fine.removeEventListener('change', hideExpandHint)
    }
  }, [hideExpandHint])
  return <button hidden={hidden} type="button" className={styles.expand} aria-label={`Expand ${title} fragment`} disabled={disabled} aria-disabled={!available || undefined} data-case-fragment-entry data-touch-hint={touchHint || undefined}
        onPointerEnter={placeExpandHint} onPointerLeave={hideExpandHint} onPointerCancel={hideExpandHint} onBlur={hideExpandHint}
        onFocus={() => { hideExpandHint(); expandHint.current?.removeAttribute('data-dismissed') }}
        onPointerDown={event => { hideExpandHint(); gesture.current = { x: event.clientX, y: event.clientY, moved: false, scroll: event.currentTarget.closest('[data-feature-gallery-viewport]')?.scrollLeft ?? 0 } }}
        onPointerMove={event => { placeExpandHint(event); if (Math.hypot(event.clientX - gesture.current.x, event.clientY - gesture.current.y) > 8) gesture.current.moved = true }}
        onClick={event => { if (!available) return; const scroll = event.currentTarget.closest('[data-feature-gallery-viewport]')?.scrollLeft ?? 0; if (event.detail && (gesture.current.moved || Math.abs(scroll - gesture.current.scroll) > 2)) return; hideExpandHint(); onExpand(event.currentTarget) }}><span ref={expandHint} className={styles.expandHint} aria-hidden="true"><Maximize2 size={18}/></span></button>
}
