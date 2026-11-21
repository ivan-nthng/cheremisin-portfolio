/** Shared by the first-document bootstrap and the client-side Home mount.
 * Keep this function self-contained: the parser can run it before React loads. */
export function attachHomeEyeDecoration(loader: HTMLElement, travel = false, origin?: DOMRect) {
  const page = window as Window & { __portfolioEyeOwner?: HTMLElement }
  const root = document.documentElement
  const reduced = matchMedia('(prefers-reduced-motion: reduce)')
  const grid = loader.querySelector<HTMLElement>('.home-eye-grid')
  const slot = loader.querySelector<HTMLElement>('.home-eye-slot')
  const mark = loader.querySelector<HTMLElement>('.home-eye-mark')
  const ring = loader.querySelector<HTMLElement>('.home-eye-ring')
  const hero = document.querySelector<HTMLElement>('.home-photo-hero')
  const copy = hero?.querySelector<HTMLElement>('.home-hero-copy')
  if (!grid || !slot || !mark || !ring || !hero || !copy || page.__portfolioEyeOwner === loader) return
  page.__portfolioEyeOwner = loader
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
    if (location.pathname !== '/' || !loader.isConnected || page.__portfolioEyeOwner !== loader) { dispose(); return }
    const opacity = fit && !document.querySelector('#mobile-contact-sheet[open]')
      ? Math.min(1, Math.max(0, 1 - scrollY / 24)) : 0
    // The decoration controller owns inherited document parameters. Keep the
    // server-rendered decoration's attributes stable through hydration.
    root.style.setProperty('--home-eye-opacity', String(opacity))
    // Window/omnibox blur does not hide visible artwork.
    root.style.setProperty('--home-eye-play-state', opacity > 0 && !document.hidden && !reduced.matches ? 'running' : 'paused')
  }
  function settle() {
    if (page.__portfolioEyeOwner !== loader) return
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
    if (page.__portfolioEyeOwner !== loader) return
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
  const leaveDecoration = () => {
    if (page.__portfolioEyeOwner !== loader) return
    settle()
    root.style.setProperty('--home-eye-play-state', 'paused')
  }
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
    if (page.__portfolioEyeOwner !== loader) return
    delete page.__portfolioEyeOwner
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
  } catch { dispose(); return }
  return dispose
}
