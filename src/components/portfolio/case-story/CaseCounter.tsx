'use client'

import { useLayoutEffect, useRef } from 'react'
import { clamp, easeCase } from './motion'

export function CaseCounter({ value, entered, reduced, format, className, staticBeforeHydration = false }: {
  value: number
  entered: boolean
  reduced: boolean
  format: (value: number) => string
  className?: string
  staticBeforeHydration?: boolean
}) {
  const number = useRef<HTMLSpanElement>(null)
  const current = useRef(0)
  // Keep React's text seed stable: the counter owns this node through retargets.
  const initial = useRef(format(reduced || staticBeforeHydration ? value : 0))
  useLayoutEffect(() => {
    const node = number.current!
    let frame = 0
    const target = entered ? value : 0
    if (reduced || !entered) { current.current = target; node.textContent = format(target); return }
    const from = current.current, start = performance.now()
    node.textContent = format(Math.round(from))
    if (from === target) return
    const tick = (now: number) => {
      const progress = clamp((now - start) / 900)
      current.current = from + (target - from) * easeCase(progress)
      node.textContent = format(Math.round(current.current))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [value, entered, reduced, format])
  return <span ref={number} className={className} aria-hidden="true" data-case-counter>{initial.current}</span>
}
