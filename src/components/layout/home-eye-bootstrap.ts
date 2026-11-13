import 'server-only'
import { attachHomeEyeDecoration } from './home-eye-decoration'

/** Serialized into the first home HTML, before Header/hero markup. Keep this
 * function self-contained: it also works when the React chunks never load. */
function bootstrapHomeEye(decorate: typeof attachHomeEyeDecoration) {
  const page = window as Window & { __portfolioEyeEntry?: HTMLScriptElement | true }
  const root = document.documentElement
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
  if (location.pathname !== '/' || page.__portfolioEyeEntry) return
  if (navigation && new URL(navigation.name).pathname !== '/') return
  const restored = navigation?.type === 'back_forward'
  page.__portfolioEyeEntry = (document.currentScript as HTMLScriptElement | null) ?? true
  if (!window.MutationObserver || !HTMLImageElement.prototype.decode) return

  let phase: 'idle' | 'waiting' | 'done' = 'idle'
  let image: HTMLImageElement | null = null
  let prepared = false
  let frame = 0
  let deadline: ReturnType<typeof setTimeout> | undefined
  let expiresAt = 0
  let observer: MutationObserver | undefined
  const reduced = matchMedia('(prefers-reduced-motion: reduce)')

  function cleanup() {
    cancelAnimationFrame(frame)
    clearTimeout(deadline)
    observer?.disconnect()
    image?.removeEventListener('load', decode)
    image?.removeEventListener('error', error)
    for (const name of ['keydown', 'pointerdown', 'wheel', 'touchmove', 'scroll']) {
      document.removeEventListener(name, intent, true)
    }
    window.removeEventListener('pagehide', leave)
    window.removeEventListener('pageshow', restore)
  }

  function finish(fallback = false) {
    if (phase === 'done') return
    phase = 'done'
    cleanup()
    if (fallback) root.dataset.homeEye = 'fallback'
    else delete root.dataset.homeEye
  }

  function error() { finish(true) }
  function leave() { if (phase === 'waiting') finish(true); else finish() }
  function restore(event: PageTransitionEvent) { if (event.persisted) leave() }

  function consumePointerClick(pointer: PointerEvent) {
    // Touch's compatibility click can arrive in a later task than pointerup.
    // Consume only this sequence; a new pointer/key action is free immediately.
    let release: ReturnType<typeof setTimeout> | undefined
    const clear = () => {
      clearTimeout(release)
      document.removeEventListener('click', click, true)
      document.removeEventListener('pointerdown', next, true)
      document.removeEventListener('pointerup', up, true)
      document.removeEventListener('pointercancel', clear, true)
      document.removeEventListener('touchmove', clear, true)
      document.removeEventListener('keydown', clear, true)
      window.removeEventListener('pagehide', clear)
      window.removeEventListener('blur', clear)
    }
    const click = (event: MouseEvent) => {
      if (event.detail === 0) { clear(); return }
      const id = (event as PointerEvent).pointerId
      if (typeof id === 'number' && id !== pointer.pointerId) return
      event.preventDefault()
      event.stopImmediatePropagation()
      clear()
    }
    const next = (event: Event) => { if (event !== pointer) clear() }
    const up = (event: PointerEvent) => {
      if (event.pointerId !== pointer.pointerId) return
      // Expire abandoned click synthesis, without racing a delayed touch click.
      release = setTimeout(clear, 750)
    }
    document.addEventListener('click', click, true)
    document.addEventListener('pointerdown', next, true)
    document.addEventListener('pointerup', up, true)
    document.addEventListener('pointercancel', clear, true)
    document.addEventListener('touchmove', clear, { capture: true, passive: true })
    document.addEventListener('keydown', clear, true)
    window.addEventListener('pagehide', clear)
    window.addEventListener('blur', clear)
  }

  function intent(event: Event) {
    if (phase === 'done') return
    const active = phase === 'waiting'
    if (active && event.type === 'pointerdown') {
      consumePointerClick(event as PointerEvent)
      event.preventDefault()
      event.stopImmediatePropagation()
    }
    // Keyboard/scroll retain their normal browser action and current focus.
    finish(active)
  }

  function ready() {
    if (phase === 'done') return
    // A delayed promise must not reopen the photograph after the independent
    // CSS deadline, even if the JS timeout was unable to run on time.
    if (expiresAt && performance.now() >= expiresAt) { error(); return }
    prepared = true
    // Before first contentful paint the optional cover can disappear without
    // ever being shown, including a preloaded/decoded cache-ready picture.
    const painted = performance.getEntriesByType('paint').some(entry => entry.name === 'first-contentful-paint')
    const travel = phase === 'waiting' && painted && !reduced.matches
    const origin = travel ? document.querySelector('.home-eye-mark')?.getBoundingClientRect() : undefined
    // End the busy lifetime now, before any optional 480ms decorative travel.
    phase = 'done'
    cleanup()
    if (travel) root.dataset.homeEye = 'ready'
    else delete root.dataset.homeEye
    const loader = document.querySelector<HTMLElement>('.home-eye-loader')
    if (loader) decorate(loader, travel, origin)
  }

  function decode() {
    if (!image || phase === 'done') return
    const selected = image.currentSrc
    if (!selected) return
    image.decode().then(() => {
      if (phase === 'done' || !image) return
      if (image.currentSrc !== selected) { decode(); return }
      if (image.naturalWidth) ready()
      else error()
    }).catch(() => {
      if (phase === 'done' || !image) return
      if (image.currentSrc !== selected) decode()
      else error()
    })
  }

  function findFirstScreen() {
    if (phase === 'done' || image || !document.querySelector('[data-home-eye-ready]')) return
    image = document.querySelector<HTMLImageElement>('.home-photo-media img')
    if (!image) return
    observer?.disconnect()
    image.addEventListener('load', decode)
    image.addEventListener('error', error)
    if (image.complete && !image.naturalWidth) { error(); return }
    decode()
  }

  function activate() {
    if (phase === 'done' || prepared) return
    const cover = document.querySelector<HTMLElement>('.home-eye-loader')
    const painted = performance.getEntriesByType('paint').some(entry => entry.name === 'first-contentful-paint')
    if (!cover || getComputedStyle(cover).getPropertyValue('--home-eye-safe').trim() !== '1') {
      finish(); return
    }
    if (painted || scrollY > 0) {
      for (const name of ['keydown', 'pointerdown', 'wheel', 'touchmove', 'scroll']) document.removeEventListener(name, intent, true)
      return
    }
    // Install the JS deadline before arming; an independent CSS deadline also
    // releases cover/hit area and suppresses a late photograph if JS stops.
    expiresAt = performance.now() + 3000
    deadline = setTimeout(error, 3000)
    phase = 'waiting'
    root.dataset.homeEye = 'waiting'
  }

  try {
    for (const name of restored ? [] : ['keydown', 'pointerdown', 'wheel', 'touchmove', 'scroll']) {
      document.addEventListener(name, intent, { capture: true, passive: name !== 'pointerdown' })
    }
    window.addEventListener('pagehide', leave)
    window.addEventListener('pageshow', restore)
    observer = new MutationObserver(findFirstScreen)
    observer.observe(root, { childList: true, subtree: true })
    findFirstScreen()
    if (!restored) frame = requestAnimationFrame(activate)
  } catch { finish() }
}

export const homeEyeBootstrap = `(${bootstrapHomeEye.toString()})(${attachHomeEyeDecoration.toString()});`
