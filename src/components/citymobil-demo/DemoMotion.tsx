'use client'

import { forwardRef } from 'react'
import type { HTMLAttributes } from 'react'
import { useIsPresent, useReducedMotion } from 'framer-motion'
import * as motion from 'framer-motion/client'

export const demoEase = [0.23, 1, 0.32, 1] as const
export const drawerEase = [0.32, 0.72, 0, 1] as const
export const demoDuration = 0.4

/** One demo-owned presentation preset. Exiting DOM loses interaction immediately. */
const DemoMotion = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { kind?: 'fade' | 'popover' | 'drawer' | 'item' | 'attachment-top' | 'attachment-bottom' }>(function DemoMotion({ kind = 'item', style, ...props }, ref) {
  const present = useIsPresent()
  const reduced = useReducedMotion()
  const hidden = { opacity: 0, transform: reduced || kind === 'fade' ? 'none' : kind === 'drawer' ? 'translateX(100%)' : kind === 'popover' ? 'translateY(-4px) scale(.97)' : kind === 'attachment-top' ? 'translateY(40px)' : kind === 'attachment-bottom' ? 'translateY(100%)' : 'translateY(6px)' }
  const visibleTransform = reduced || kind === 'fade' ? 'none' : kind === 'drawer' ? 'translateX(0%)' : kind === 'popover' ? 'translateY(0px) scale(1)' : 'translateY(0px)'
  return <motion.div ref={ref} {...props} inert={!present || undefined} aria-hidden={!present || props['aria-hidden']} data-demo-presence={present ? 'present' : 'exiting'} initial={hidden} animate={{ opacity: 1, transform: visibleTransform }} exit={hidden} transition={{ duration: reduced ? 0 : demoDuration, ease: kind === 'drawer' ? drawerEase : demoEase }} style={{ ...style, ...(!present ? { pointerEvents: 'none' } : {}) }}/>
})
export default DemoMotion
