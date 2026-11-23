'use client'

import { useCallback, useLayoutEffect, useRef, useState, type ReactNode, type RefObject } from 'react'
import { lockCaseScroll } from '@/components/citymobil-case/case-scroll-lock'
import { keepDialogTabInside, sourceTransform } from './CaseDemoOverlay'
import { useGuidedPlayback } from './GuidedPreview'
import styles from './retained-surface.module.css'

export type SurfaceStatus = 'loading' | 'guided' | 'manual' | 'unavailable'
export type RetainedEntry = {
  expanded: boolean
  onClose: () => void
  launcher: RefObject<HTMLElement | null>
  /** A separate Process launcher can disappear at the mobile breakpoint. */
  returnGallery?: RefObject<HTMLElement | null>
}

/** Promote the existing panel into the top layer without reparenting its workspace. */
export function useRetainedDemoSurface({ expanded, onClose, launcher, returnGallery }: RetainedEntry, inlineCanvas?: { width: number; height: number; compact?: { below: number; width: number; height: number } }) {
  const slot = useRef<HTMLDivElement>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const animation = useRef<Animation | null>(null)
  const closing = useRef(false)
  const playing = useGuidedPlayback(slot, Boolean(inlineCanvas?.compact))
  const [size, setSize] = useState({ width: 1280, height: 720, toolbar: 32, scale: 1, compact: false })

  useLayoutEffect(() => {
    const node = slot.current!
    const measure = () => {
      const width = innerWidth, height = innerHeight
      const toolbar = matchMedia('(pointer: coarse)').matches ? 44 : 32
      const compact = Boolean(inlineCanvas?.compact && node.clientWidth < inlineCanvas.compact.below)
      const designWidth = (compact ? inlineCanvas?.compact?.width : inlineCanvas?.width) ?? width
      setSize({ width, height, toolbar, scale: node.clientWidth / designWidth, compact })
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(node)
    window.addEventListener('resize', measure)
    return () => { observer.disconnect(); window.removeEventListener('resize', measure) }
  }, [inlineCanvas])

  const bounds = useCallback(() => {
    const target = slot.current!
    const entry = launcher.current
    return (entry?.isConnected && (returnGallery || !target.closest('section')?.contains(entry)) ? entry : target).getBoundingClientRect()
  }, [launcher, returnGallery])

  const close = useCallback(() => {
    const surface = panel.current
    if (!surface || !dialog.current?.open || closing.current) return
    closing.current = true
    surface.inert = true
    const from = getComputedStyle(surface).transform
    animation.current?.cancel()
    const motion = surface.animate([{ transform: from }, { transform: sourceTransform(bounds(), surface) }], {
      duration: matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 220,
      easing: 'cubic-bezier(.23,1,.32,1)', fill: 'both',
    })
    animation.current = motion
    motion.finished.then(onClose, () => {})
  }, [onClose, bounds])

  useLayoutEffect(() => {
    if (!expanded) return
    const host = dialog.current!, surface = panel.current!
    const entry = launcher.current, section = slot.current!.closest('section')
    const card = slot.current!.closest('[data-case-demo-media]')
    const lock = lockCaseScroll({ preserveSticky: true })
    host.showModal()
    animation.current = surface.animate([{ transform: sourceTransform(bounds(), surface) }, { transform: 'none' }], {
      duration: matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 280,
      easing: 'cubic-bezier(.23,1,.32,1)', fill: 'both',
    })
    return () => {
      animation.current?.cancel()
      closing.current = false
      surface.inert = false
      host.close()
      lock.restore()
      const restoredFocus = document.activeElement
      // Let the showcase clear the launcher's inert state after sticky scroll restoration.
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (location.href !== lock.route || document.querySelector('dialog:modal') || !section?.isConnected) return
        const focused = document.activeElement
        if (focused !== restoredFocus && focused !== document.body && focused !== section && !host.contains(focused)) return
        const control = [entry, returnGallery?.current, card?.querySelector<HTMLElement>('[data-case-fragment-entry]'), section.querySelector<HTMLElement>('[data-case-image-entry]')]
          .find(node => node?.isConnected && node.getClientRects().length)
        if (control !== focused) control?.focus({ preventScroll: true })
        if (control && control === returnGallery?.current) {
          const top = control.getBoundingClientRect().top
          if (top < 68 || top > innerHeight / 2) window.scrollBy({ top: top - 68, behavior: 'instant' })
        }
      }))
    }
  }, [expanded, launcher, bounds, returnGallery])

  const design = size.compact ? inlineCanvas?.compact : inlineCanvas
  const inlineWidth = design?.width ?? size.width
  const inlineHeight = design?.height ?? size.height - size.toolbar
  return { slot, dialog, panel, closing, close, expanded, live: playing || expanded, size, inlineWidth, inlineHeight }
}

export function RetainedDemoSurface({ host, label, loadingLabel, status, poster, onRetry, preserveOnError = false, children, ...attributes }: {
  host: ReturnType<typeof useRetainedDemoSurface>
  label: string
  loadingLabel?: string
  status: SurfaceStatus
  poster: ReactNode
  onRetry?: () => void
  preserveOnError?: boolean
  children: ReactNode
}) {
  const { size, inlineWidth, inlineHeight, expanded, live } = host
  const painted = live && (status === 'guided' || status === 'manual')
  return <div {...attributes} ref={host.slot} className={styles.slot} style={{ aspectRatio: inlineWidth + ' / ' + inlineHeight }}
    data-retained-state={live ? status : 'still'}>
    <dialog ref={host.dialog} className={styles.host} tabIndex={-1} aria-hidden={!expanded || undefined} inert={!expanded}
      data-case-demo={expanded || undefined} aria-label={label}
      onKeyDown={keepDialogTabInside}
      onCancel={event => { if (event.target === event.currentTarget && !event.defaultPrevented) { event.preventDefault(); host.close() } }}>
      <div ref={host.panel} className={styles.panel} style={{ width: expanded ? size.width : inlineWidth, height: expanded ? size.height : inlineHeight,
        transform: expanded ? undefined : 'scale(' + size.scale + ')' }}>
        {!painted && poster}
        {live && (status !== 'unavailable' || preserveOnError) && <div className={styles.content} style={{ visibility: painted ? 'visible' : 'hidden' }}
          inert={!expanded || status !== 'manual'}>{children}</div>}
        {expanded && !painted && <div className={styles.fallback}>
          <span role="status">{status === 'unavailable' ? 'The ' + label + ' is unavailable.' : loadingLabel ?? 'Loading ' + label + '…'}</span>
          {status === 'unavailable' && onRetry && <button onClick={onRetry}>Try again</button>}
          <button onClick={host.close}>Close</button>
        </div>}
      </div>
    </dialog>
  </div>
}
