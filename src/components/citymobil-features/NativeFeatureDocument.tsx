'use client'

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { flushSync } from 'react-dom'
import CityMobileInteractivePreview from '@/components/CityMobileInteractivePreview'
import native from '@/components/citymobil-demo/preview.module.css'
import styles from './features.module.css'
import type { SceneId } from './scenes'

const inputEvents = ['pointerdown', 'wheel', 'keydown', 'click', 'beforeinput'] as const

/** One real simulator document. Disposing unmounts its React tree before the frame is removed. */
export default function NativeFeatureDocument({ scene, width = 375, localBasemap = false }: { scene?: SceneId; width?: number; localBasemap?: boolean }) {
  const [active, setActive] = useState(true)
  const [ready, setReady] = useState(false)
  const [parked, setParked] = useState(false)
  const [mode, setMode] = useState({ armed: false, interactive: false, sequence: 0 })
  const { armed, interactive } = mode
  const control = useRef({ armed: false, interactive: false, sequence: 0, crop: { x: 0, y: 0, width: 375, height: 600 } })
  const [viewportWidth, setViewportWidth] = useState(width)
  const status = useRef({ active, ready }); status.current = { active, ready }
  useEffect(() => {
    const controls = () => {
      const crop = control.current.crop
      const root = document.querySelector('dialog[open]:not([inert])') ?? document
      return [...root.querySelectorAll<HTMLElement>('button,a[href],input,textarea,select,[tabindex]')].filter(node => {
        if (node.tabIndex < 0 || node.matches(':disabled') || node.closest('[inert],[hidden]')) return false
        const rect = node.getBoundingClientRect(), css = getComputedStyle(node)
        return css.visibility !== 'hidden' && css.display !== 'none' && rect.width > 0 && rect.height > 0 && rect.right > crop.x && rect.left < crop.x + crop.width && rect.bottom > crop.y && rect.top < crop.y + crop.height
      })
    }
    const takeOver = () => {
      const state = control.current
      if (!state.armed || state.interactive) return
      state.interactive = true
      // Same-origin, synchronous: abort the Act before the first native event reaches its target.
      parent.dispatchEvent(new CustomEvent('cm-feature-takeover', { detail: window.frameElement }))
      flushSync(() => setMode({ armed: true, interactive: true, sequence: state.sequence }))
    }
    const input = (event: Event) => {
      if (!event.isTrusted || event instanceof KeyboardEvent && ['Alt', 'Control', 'Meta', 'Shift'].includes(event.key)) return
      takeOver()
    }
    const receive = (event: MessageEvent) => {
      if (event.source !== parent || event.origin !== location.origin) return
      if (scene && event.data?.type === 'cm-feature-control') {
        const crop = event.data.crop
        if (crop && ['x','y','width','height'].every(key => Number.isFinite(crop[key]) && crop[key] >= 0 && crop[key] <= 4000)) control.current.crop = crop
        const state = control.current
        if (event.data.sequence !== state.sequence) {
          state.sequence = event.data.sequence
          state.armed = event.data.interactive === true
          state.interactive = false
          setMode({ armed: state.armed, interactive: false, sequence: state.sequence })
        }
      }
      if (event.data?.type === 'cm-feature-focus' && control.current.armed) {
        if (event.data.takeover === true) takeOver()
        const items = controls(); (event.data.last ? items.at(-1) : items[0])?.focus({ preventScroll: true })
      }
      if (event.data?.type === 'cm-feature-dispose') setActive(false)
      if (scene && event.data?.type === 'cm-feature-suspend') setParked(event.data.parked === true)
      if (scene && event.data?.type === 'cm-feature-resize' && Number.isFinite(event.data.width) && event.data.width >= 100 && event.data.width <= 3000) setViewportWidth(event.data.width)
      if (event.data?.type === 'cm-feature-connect' && status.current.ready && status.current.active) parent.postMessage({ type: 'cm-feature-ready' }, location.origin)
    }
    // Synchronous focus handoff prevents a scripted native focus from scrolling the host page.
    const focus = () => { if (parent !== window && !control.current.interactive) parent.dispatchEvent(new CustomEvent('cm-feature-focus-sync', { detail: window.frameElement })) }
    const key = (event: KeyboardEvent) => {
      if (!event.isTrusted || !control.current.armed || event.defaultPrevented) return
      if (event.key === 'Escape' && !document.querySelector('dialog[open]:not([inert]),[role="menu"]')) { event.preventDefault(); parent.postMessage({ type: 'cm-feature-exit' }, location.origin) }
      if (event.key === 'Tab') {
        const items = controls(), index = items.indexOf(document.activeElement as HTMLElement)
        if (event.shiftKey ? index <= 0 : index < 0 || index === items.length - 1) { event.preventDefault(); parent.postMessage({ type: 'cm-feature-focus-close' }, location.origin) }
        else { event.preventDefault(); items[index + (event.shiftKey ? -1 : 1)]?.focus({ preventScroll: true }) }
      }
    }
    window.addEventListener('message', receive); document.addEventListener('focusin', focus); document.addEventListener('keydown', key)
    if (scene) for (const type of inputEvents) document.addEventListener(type, input, { capture: true, passive: true })
    setReady(true)
    return () => {
      window.removeEventListener('message', receive); document.removeEventListener('focusin', focus); document.removeEventListener('keydown', key)
      if (scene) for (const type of inputEvents) document.removeEventListener(type, input, true)
    }
  }, [scene])
  useLayoutEffect(() => {
    if (!scene || parent === window) return
    // An inert iframe element alone cannot prevent its own document from taking focus
    // while a nearby fragment prepares. Release the document before acknowledging input.
    const root = document.documentElement
    const previous = root.inert
    root.inert = !armed
    parent.postMessage({ type: 'cm-feature-controlled', sequence: mode.sequence, interactive: armed }, location.origin)
    return () => { root.inert = previous }
  }, [scene, mode.sequence, armed])
  useEffect(() => { if (ready && active && parent !== window) parent.postMessage({ type: 'cm-feature-ready' }, location.origin) }, [ready, active])
  useEffect(() => {
    if (!active) parent.postMessage({ type: 'cm-feature-disposed', canvases: document.querySelectorAll('canvas').length, simulators: document.querySelectorAll('#citymobil-demo').length }, location.origin)
  }, [active])
  return <main id="main-content" data-port17-surface="native" className={`${native.standalone} ${styles.nativeDocument} ${scene ? native.featureViewport : ''}`} style={{ '--feature-width': `${viewportWidth}px` } as CSSProperties} data-native-mounted={active} data-native-ready={ready} data-native-parked={parked} data-native-armed={armed} data-native-interactive={interactive} data-feature-scene={scene}>{active && <CityMobileInteractivePreview nativeFragment={Boolean(scene)} nativeParked={parked} nativeInteractive={interactive} localBasemap={localBasemap} literalDraft={interactive && scene === 'chat'} illustratedCaret={Boolean(scene) && !interactive} paletteFromBottom={scene === 'actions'}/>}</main>
}
