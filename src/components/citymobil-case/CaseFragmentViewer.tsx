'use client'

import { useId, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { lockCaseScroll } from './case-scroll-lock'
import styles from './features.module.css'

type Geometry = { width: number; height: number; mediaWidth: number; mediaHeight: number }

/** The scene never leaves this DOM branch: expansion changes presentation only. */
export default function CaseFragmentViewer({ expanded, title, onExpand, onClose, authored = false, children }: { expanded: boolean; title: string; onExpand: () => void; onClose: () => void; authored?: boolean; children: (expand: (entry: HTMLButtonElement) => void) => ReactNode }) {
  const id = useId()
  const wrapper = useRef<HTMLDivElement>(null), surface = useRef<HTMLDivElement>(null), canvas = useRef<HTMLDivElement>(null), close = useRef<HTMLButtonElement>(null)
  const entry = useRef<HTMLElement | null>(null), callback = useRef(onClose)
  callback.current = onClose
  const [geometry, setGeometry] = useState<Geometry | null>(null)
  function expand(trigger: HTMLButtonElement) {
    const node = canvas.current!, media = node.querySelector<HTMLElement>('[data-native-feature]')!
    entry.current = trigger
    setGeometry({ width: node.clientWidth, height: node.clientHeight, mediaWidth: media.clientWidth, mediaHeight: media.clientHeight })
    onExpand()
  }
  useLayoutEffect(() => {
    if (!expanded) return
    const node = surface.current!, content = canvas.current!, scrollLock = lockCaseScroll()
    const blocked: [HTMLElement, boolean][] = []
    // Make siblings inert along the existing ancestry; never move the iframe.
    for (let child: HTMLElement = node; child.parentElement; child = child.parentElement) {
      for (const sibling of child.parentElement.children) if (sibling !== child && sibling instanceof HTMLElement) { blocked.push([sibling, sibling.inert]); sibling.inert = true }
    }
    const fit = () => {
      const viewport = window.visualViewport
      const width = viewport?.width ?? innerWidth, height = viewport?.height ?? innerHeight
      node.style.setProperty('--viewer-left', `${viewport?.offsetLeft ?? 0}px`)
      node.style.setProperty('--viewer-top', `${viewport?.offsetTop ?? 0}px`)
      node.style.setProperty('--viewer-width', `${width}px`)
      node.style.setProperty('--viewer-height', `${height}px`)
      const css = getComputedStyle(node)
      const horizontal = parseFloat(css.paddingLeft) + parseFloat(css.paddingRight)
      const vertical = parseFloat(css.paddingTop) + parseFloat(css.paddingBottom)
      node.style.setProperty('--viewer-center-x', `${parseFloat(css.paddingLeft) + (width - horizontal) / 2}px`)
      node.style.setProperty('--viewer-center-y', `${parseFloat(css.paddingTop) + (height - vertical) / 2}px`)
      node.style.setProperty('--viewer-scale', String(Math.min((width - horizontal) / content.clientWidth, (height - vertical) / content.clientHeight)))
    }
    const focusFrame = (last: boolean, takeover: boolean) => {
      const frame = node.querySelector<HTMLIFrameElement>('iframe')
      if (!frame || frame.inert) { close.current?.focus({ preventScroll: true }); return }
      frame.focus({ preventScroll: true })
      frame.contentWindow?.postMessage({ type: 'cm-feature-focus', last, takeover }, location.origin)
    }
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); callback.current(); return }
      if (event.key === 'Tab') { event.preventDefault(); focusFrame(event.shiftKey, event.isTrusted) }
    }
    const receive = (event: MessageEvent) => {
      const frame = node.querySelector<HTMLIFrameElement>('iframe')
      if (event.source !== frame?.contentWindow || event.origin !== location.origin) return
      if (event.data?.type === 'cm-feature-exit') callback.current()
      if (event.data?.type === 'cm-feature-focus-close') close.current?.focus({ preventScroll: true })
    }
    fit(); close.current?.focus({ preventScroll: true })
    const observer = new ResizeObserver(fit); observer.observe(content)
    window.addEventListener('resize', fit); window.visualViewport?.addEventListener('resize', fit); window.visualViewport?.addEventListener('scroll', fit)
    node.addEventListener('keydown', key); window.addEventListener('message', receive)
    return () => {
      observer.disconnect(); window.removeEventListener('resize', fit); window.visualViewport?.removeEventListener('resize', fit); window.visualViewport?.removeEventListener('scroll', fit)
      node.removeEventListener('keydown', key); window.removeEventListener('message', receive)
      blocked.forEach(([element, inert]) => { element.inert = inert })
      scrollLock.restore()
      requestAnimationFrame(() => { if (location.href === scrollLock.route && entry.current?.isConnected) entry.current.focus({ preventScroll: true }) })
    }
  }, [expanded])
  const dimensions = expanded && geometry ? { '--viewer-canvas-width': `${geometry.width}px`, '--viewer-canvas-height': `${geometry.height}px`, '--viewer-media-width': `${geometry.mediaWidth}px`, '--viewer-media-height': `${geometry.mediaHeight}px` } as CSSProperties : undefined
  return <div ref={wrapper} className={styles.viewerSlot} style={expanded && geometry ? { height: geometry.height } : undefined}>
    <div ref={surface} id={id} className={styles.viewer} data-fragment-open={expanded} role={expanded ? 'dialog' : undefined} aria-modal={expanded || undefined} aria-label={expanded ? `${title} ${authored ? 'animated' : 'interactive'} fragment` : undefined} style={dimensions}>
      {expanded && <div className={styles.viewerBackdrop} aria-hidden="true" onClick={onClose}/>}
      <div ref={canvas} className={styles.viewerCanvas}>{children(expand)}</div>
      {expanded && <button ref={close} type="button" className={styles.viewerClose} onClick={onClose} aria-label={`Close ${title} fragment`}><X size={22} aria-hidden="true"/></button>}
    </div>
  </div>
}
