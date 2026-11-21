'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode, type RefObject } from 'react'
import { lockCaseScroll } from '@/components/citymobil-case/case-scroll-lock'
import { sourceTransform } from '@/components/portfolio/case-story/CaseDemoOverlay'
import { useGuidedPlayback } from '@/components/portfolio/case-story/GuidedPreview'
import { kitchenBridge, kitchenDemoPath } from '@/lib/portfolio/client/saavi-kitchen-host'
import styles from './kitchen-surface.module.css'

type Status = 'loading' | 'guided' | 'manual' | 'unavailable'

/** This slot keeps its inline dimensions while its own dialog enters the top layer. */
export function KitchenSurface({ expanded, onClose, launcher, poster, shareHref }: {
  expanded: boolean; onClose: () => void; launcher: RefObject<HTMLButtonElement | null>; poster: ReactNode; shareHref: string
}) {
  const slot = useRef<HTMLDivElement>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const frame = useRef<HTMLIFrameElement>(null)
  const animation = useRef<Animation | null>(null)
  const closing = useRef(false)
  const playing = useGuidedPlayback(slot)
  const [size, setSize] = useState({ width: 1280, height: 720, toolbar: 32, scale: 1 })
  const [status, setStatus] = useState<Status>('loading')
  const [attempt, setAttempt] = useState(0)
  const [origin, setOrigin] = useState('')
  const live = Boolean(origin) && (playing || expanded)
  const painted = live && (status === 'guided' || status === 'manual')
  const interactive = expanded && status === 'manual'
  const inlineHeight = size.height - size.toolbar

  useLayoutEffect(() => {
    const node = slot.current!
    const measure = () => {
      const width = innerWidth, height = innerHeight
      const toolbar = matchMedia('(pointer: coarse)').matches ? 44 : 32
      setSize({ width, height, toolbar, scale: node.clientWidth / width })
    }
    setOrigin(location.origin)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(node)
    window.addEventListener('resize', measure)
    return () => { observer.disconnect(); window.removeEventListener('resize', measure) }
  }, [])

  const requestMode = useCallback(() => {
    if (origin) frame.current?.contentWindow?.postMessage({
      type: kitchenBridge.mode, mode: expanded ? 'manual' : 'guided', shareHref,
    }, origin)
  }, [expanded, origin, shareHref])

  const close = useCallback(() => {
    const surface = panel.current, target = slot.current
    if (!surface || !target || !dialog.current?.open || closing.current) return
    closing.current = true
    surface.inert = true
    const from = getComputedStyle(surface).transform
    animation.current?.cancel()
    const end = sourceTransform(target.getBoundingClientRect(), surface)
    const motion = surface.animate([{ transform: from }, { transform: end }], {
      duration: matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 220,
      easing: 'cubic-bezier(.23,1,.32,1)', fill: 'both',
    })
    animation.current = motion
    motion.finished.then(onClose, () => {})
  }, [onClose])

  useLayoutEffect(() => {
    if (!expanded) return
    const host = dialog.current!, surface = panel.current!, target = slot.current!
    const entry = launcher.current
    const section = target.closest('section')
    const lock = lockCaseScroll({ preserveSticky: true })
    host.showModal()
    const start = sourceTransform(target.getBoundingClientRect(), surface)
    animation.current = surface.animate([{ transform: start }, { transform: 'none' }], {
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
      // The showcase updates the launcher's inert state after scroll restoration.
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (location.href !== lock.route || document.querySelector('dialog:modal') || !section?.isConnected) return
        const focused = document.activeElement
        if (focused !== restoredFocus && focused !== document.body && focused !== section) return
        const control = entry?.isConnected ? entry : section.querySelector<HTMLElement>('[data-case-image-entry]')
        if (control !== focused) control?.focus({ preventScroll: true })
      }))
    }
  }, [expanded, launcher])

  useLayoutEffect(() => {
    if (!live) { setStatus('loading'); return }
    const receive = (event: MessageEvent) => {
      if (event.origin !== origin || event.source !== frame.current?.contentWindow) return
      switch (event.data?.type) {
        case kitchenBridge.connected: requestMode(); break
        case kitchenBridge.ready: if (!expanded) setStatus('guided'); break
        case kitchenBridge.manual: if (expanded) setStatus('manual'); break
        case kitchenBridge.close: if (expanded) close(); break
        case kitchenBridge.unavailable: setStatus('unavailable'); break
      }
    }
    window.addEventListener('message', receive)
    requestMode()
    return () => window.removeEventListener('message', receive)
  }, [attempt, live, origin, expanded, close, requestMode])

  useEffect(() => {
    if (!live || status === (expanded ? 'manual' : 'guided') || status === 'unavailable') return
    const timer = window.setTimeout(() => setStatus('unavailable'), 15000)
    return () => clearTimeout(timer)
  }, [live, status, expanded, attempt])

  useEffect(() => {
    if (interactive && !closing.current) frame.current?.focus({ preventScroll: true })
  }, [interactive])

  return <div ref={slot} className={styles.slot} style={{ aspectRatio: size.width + ' / ' + inlineHeight }}
    data-kitchen-guided={status === 'guided' ? 'ready' : status}>
    <dialog ref={dialog} className={styles.host} tabIndex={-1} aria-hidden={!expanded || undefined}
      data-case-demo={expanded || undefined} aria-label="Saavi demo"
      onCancel={event => { event.preventDefault(); close() }}>
      <div ref={panel} className={styles.panel} style={{ width: size.width, height: expanded ? size.height : inlineHeight,
        transform: expanded ? undefined : 'scale(' + size.scale + ')' }}>
        {!painted && poster}
        {live && status !== 'unavailable' && <iframe ref={frame} key={attempt} inert={!interactive} tabIndex={interactive ? 0 : -1}
          className={styles.frame} style={{ visibility: painted ? 'visible' : 'hidden' }}
          title="Saavi Kitchen workspace" src={kitchenDemoPath + '?mode=showcase&portfolioOrigin=' + encodeURIComponent(origin)}
          onLoad={requestMode} onError={() => setStatus('unavailable')} />}
        {expanded && !painted && <div className={styles.fallback}>
          <span role="status">{status === 'unavailable' ? 'The Saavi demo is unavailable.' : 'Loading Saavi…'}</span>
          {status === 'unavailable' && <button onClick={() => { setStatus('loading'); setAttempt(i => i + 1) }}>Try again</button>}
          <button onClick={close}>Close</button>
        </div>}
      </div>
    </dialog>
  </div>
}
