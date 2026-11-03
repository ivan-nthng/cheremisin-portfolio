import 'server-only'

/** Serialized into the first home HTML, before Header/hero markup. Keep this
 * function self-contained: it also works when the React chunks never load. */
function bootstrapHomeEye() {
  const page = window as Window & { __portfolioEyeEntry?: boolean }
  const root = document.documentElement
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
  if (location.pathname !== '/' || page.__portfolioEyeEntry) return
  if (navigation && new URL(navigation.name).pathname !== '/') return
  const restored = navigation?.type === 'back_forward'
  page.__portfolioEyeEntry = true
  if (!window.MutationObserver || !HTMLImageElement.prototype.decode) return

  let phase: 'idle' | 'waiting' | 'done' = 'idle'
  let image: HTMLImageElement | null = null
  let prepared = false
  let frame = 0
  let deadline: ReturnType<typeof setTimeout> | undefined
  let expiresAt = 0
  let observer: MutationObserver | undefined
  const reduced = matchMedia('(prefers-reduced-motion: reduce)')

  // This lifetime owns decoration only: readiness/input ownership has ended.
  // It reads the existing home lane, authored-copy fit and native scroll seam.
  function decorate(travel: boolean, origin?: DOMRect) {
    const loader = document.querySelector<HTMLElement>('.home-eye-loader')
    const grid = loader?.querySelector<HTMLElement>('.home-eye-grid')
    const slot = loader?.querySelector<HTMLElement>('.home-eye-slot')
    const mark = loader?.querySelector<HTMLElement>('.home-eye-mark')
    const ring = loader?.querySelector<HTMLElement>('.home-eye-ring')
    const hero = document.querySelector<HTMLElement>('.home-photo-hero')
    const copy = hero?.querySelector<HTMLElement>('.home-hero-copy')
    if (!loader || !grid || !slot || !mark || !ring || !hero || !copy) return
    let flying = false
    let fit = false
    let tick = 0
    let resize: ResizeObserver | undefined
    let disconnected: MutationObserver | undefined
    const hideCover = () => { delete root.dataset.homeEye }
    const releaseIntent = () => {
      document.removeEventListener('pointerdown', settle)
      document.removeEventListener('keydown', settle)
      document.removeEventListener('animationend', ended)
    }
    const update = () => {
      if (location.pathname !== '/' || !loader.isConnected) { dispose(); return }
      const opacity = fit && !document.querySelector('#mobile-contact-sheet[open]')
        ? Math.min(1, Math.max(0, 1 - scrollY / 24)) : 0
      // The parser controller owns inherited document parameters. Keep the
      // server-rendered decoration's attributes stable through hydration.
      root.style.setProperty('--home-eye-opacity', String(opacity))
      // Window/omnibox blur does not hide visible artwork.
      root.style.setProperty('--home-eye-play-state', opacity > 0 && !document.hidden && !reduced.matches ? 'running' : 'paused')
    }
    function settle() {
      flying = false
      root.dataset.homeSignature = 'slot'
      hideCover()
      releaseIntent()
      update()
    }
    function ended(event: AnimationEvent) {
      if (event.animationName === 'home-eye-cover-out') {
        hideCover()
        if (!flying) releaseIntent()
      }
      if (event.animationName === 'home-eye-flight') settle()
    }
    const sizeKey = () => [innerWidth, innerHeight, hero.offsetHeight, copy.offsetWidth, copy.offsetHeight].join(':')
    let measured = ''
    const measure = () => {
      if (flying) settle()
      const style = getComputedStyle(grid)
      const columns = style.gridTemplateColumns.split(' ').length
      const gap = Number.parseFloat(style.columnGap) || 0
      const track = (grid.getBoundingClientRect().width - gap * (columns - 1)) / columns
      const diameter = 101.00682295509156
      root.style.setProperty('--home-eye-columns', String(Math.min(columns, Math.max(1, Math.ceil((diameter + gap) / (track + gap))))))
      const box = slot.getBoundingClientRect()
      const bottom = box.top + diameter
      fit = hero.offsetHeight <= innerHeight + 1 && box.left >= 0 && box.left + diameter <= innerWidth
        && bottom + 24 <= copy.getBoundingClientRect().top + scrollY
      for (const control of document.querySelectorAll<HTMLElement>('a[href="#main-content"], .context-contacts a, .context-contact-fallback, .portfolio-floating-dock button')) {
        const rect = control.getBoundingClientRect()
        if (rect.width && rect.height && rect.left < box.left + diameter && rect.right > box.left
          && rect.top < bottom && rect.bottom > box.top) fit = false
      }
      measured = sizeKey()
      update()
    }
    const scroll = () => {
      if (flying || root.dataset.homeEye === 'ready') settle()
      cancelAnimationFrame(tick)
      tick = requestAnimationFrame(update)
    }
    const blur = () => { settle() }
    const focusOut = () => { cancelAnimationFrame(tick); tick = requestAnimationFrame(measure) }
    const leaveDecoration = () => { settle(); root.style.setProperty('--home-eye-play-state', 'paused') }
    const restoreDecoration = () => { measure() }
    const changeMotion = () => { settle(); measure() }
    function dispose() {
      cancelAnimationFrame(tick)
      releaseIntent()
      resize?.disconnect()
      disconnected?.disconnect()
      window.removeEventListener('scroll', scroll)
      window.removeEventListener('resize', measure)
      window.removeEventListener('blur', blur)
      window.removeEventListener('pagehide', leaveDecoration)
      window.removeEventListener('pageshow', restoreDecoration)
      document.removeEventListener('visibilitychange', update)
      document.removeEventListener('focusin', measure)
      document.removeEventListener('focusout', focusOut)
      reduced.removeEventListener('change', changeMotion)
      delete root.dataset.homeSignature
      for (const name of ['opacity', 'play-state', 'columns', 'flight-x', 'flight-y']) root.style.removeProperty(`--home-eye-${name}`)
      hideCover()
    }
    try {
      root.dataset.homeSignature = 'slot'
      measure()
      flying = travel && !!origin && fit && scrollY === 0 && !reduced.matches
      if (flying && origin) {
        const destination = mark.getBoundingClientRect()
        root.style.setProperty('--home-eye-flight-x', `${origin.left - destination.left}px`)
        root.style.setProperty('--home-eye-flight-y', `${origin.top - destination.top}px`)
        root.dataset.homeSignature = 'flight'
      }
      if (root.dataset.homeEye === 'ready') {
        // Passive observers settle decoration; every normal action proceeds.
        document.addEventListener('pointerdown', settle, { passive: true })
        document.addEventListener('keydown', settle, { passive: true })
        document.addEventListener('animationend', ended)
      }
      resize = new ResizeObserver(() => { if (sizeKey() !== measured) measure() })
      resize.observe(hero)
      resize.observe(copy)
      disconnected = new MutationObserver(() => { if (!loader.isConnected) dispose(); else update() })
      disconnected.observe(loader.parentElement!, { childList: true })
      window.addEventListener('scroll', scroll, { passive: true })
      window.addEventListener('resize', measure)
      window.addEventListener('blur', blur)
      window.addEventListener('pagehide', leaveDecoration)
      window.addEventListener('pageshow', restoreDecoration)
      document.addEventListener('visibilitychange', update)
      document.addEventListener('focusin', measure)
      document.addEventListener('focusout', focusOut)
      reduced.addEventListener('change', changeMotion)
    } catch { dispose() }
  }

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
    decorate(travel, origin)
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

export const homeEyeBootstrap = `(${bootstrapHomeEye.toString()})();`
