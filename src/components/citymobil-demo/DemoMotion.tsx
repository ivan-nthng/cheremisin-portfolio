'use client'

import { forwardRef, useLayoutEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, useIsPresent, usePresenceData, useReducedMotion, type HTMLMotionProps } from 'framer-motion'
import * as motion from 'framer-motion/client'

export const demoEase = [0.23, 1, 0.32, 1] as const
export const drawerEase = [0.32, 0.72, 0, 1] as const
export const demoDuration = 0.4

// The installed Motion WAAPI driver cancels its fill before the final value's
// scheduled DOM render. A native-frame sample caught transform/opacity reverting
// for one frame at completion. onUpdate selects Motion's JS driver so the same
// owner writes the final style before completion, with unchanged presets/timing.
export const demoMotionUpdate = () => {}

/** One demo-owned presentation preset. Exiting DOM loses interaction immediately. */
const DemoMotion = forwardRef<HTMLDivElement, Omit<HTMLMotionProps<'div'>, 'ref'> & { kind?: 'fade' | 'tab' | 'popover' | 'drawer' | 'item' | 'attachment-top' | 'attachment-bottom' }>(function DemoMotion({ kind = 'item', style, ...props }, ref) {
  const present = useIsPresent()
  const reduced = useReducedMotion()
  const direction = usePresenceData() === -1 ? -1 : 1
  // SSR cannot read the motion preference. Settled identity transforms must use
  // the same representation in both modes; reduced entrances still take zero time.
  if (kind === 'tab') return <motion.div ref={ref} {...props} onUpdate={demoMotionUpdate} inert={!present || undefined} aria-hidden={!present || props['aria-hidden']} data-demo-presence={present ? 'present' : 'exiting'} initial={{ opacity: 1, transform: reduced ? 'none' : `translateX(${direction * 100}%)` }} animate={{ opacity: 1, transform: 'translateX(0%)' }} exit={{ opacity: 1, transform: reduced ? 'none' : `translateX(${-direction * 100}%)` }} transition={{ duration: reduced ? 0 : .22, ease: demoEase }} style={{ ...style, ...(!present ? { pointerEvents: 'none' } : {}) }}/>
  const hidden = { opacity: 0, transform: reduced || kind === 'fade' ? 'none' : kind === 'drawer' ? 'translateX(100%)' : kind === 'popover' ? 'translateY(-4px) scale(.97)' : kind === 'attachment-top' ? 'translateY(40px)' : kind === 'attachment-bottom' ? 'translateY(100%)' : 'translateY(6px)' }
  const visibleTransform = kind === 'fade' ? 'none' : kind === 'drawer' ? 'translateX(0%)' : kind === 'popover' ? 'translateY(0px) scale(1)' : 'translateY(0px)'
  return <motion.div ref={ref} {...props} onUpdate={demoMotionUpdate} inert={!present || undefined} aria-hidden={!present || props['aria-hidden']} data-demo-presence={present ? 'present' : 'exiting'} initial={hidden} animate={{ opacity: 1, transform: visibleTransform }} exit={hidden} transition={{ duration: reduced ? 0 : demoDuration, ease: kind === 'drawer' ? drawerEase : demoEase }} style={{ ...style, ...(!present ? { pointerEvents: 'none' } : {}) }}/>
})
export default DemoMotion

/** Shared native tab handoff; only the controlled value owns the selected content. */
export function DemoTabContent({ value, index, children }: { value: string; index: number; children: ReactNode }) {
  const previous = useRef(index)
  const direction = index < previous.current ? -1 : 1
  useLayoutEffect(() => { previous.current = index }, [index])
  return <AnimatePresence initial={false} mode="popLayout" custom={direction}><DemoMotion key={value} kind="tab">{children}</DemoMotion></AnimatePresence>
}
