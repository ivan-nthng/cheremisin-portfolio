'use client'

import { useEffect, useState, type RefObject } from 'react'

export const clamp = (value: number) => Math.max(0, Math.min(1, value))
// Case-only sine ease-in-out: gentle acceleration and zero speed at both ends.
export const easeCase = (progress: number) => (1 - Math.cos(Math.PI * progress)) / 2

export function caseShowcasePose(progress: number, viewport: number, frameHeight: number, inset: number, peek: number) {
  const rise = easeCase(clamp(progress / .68))
  const exit = easeCase(clamp(progress / .82))
  const top = Math.max(inset, (viewport - frameHeight) / 2)
  return {
    rise, top,
    shift: (viewport - peek - top) * (1 - rise),
    opacity: 1 - exit,
    headlineShift: -Math.min(180, viewport * .2) * exit,
  }
}

export function useScrollCasePhases(
  enabled: boolean,
  statistics: RefObject<HTMLElement | null>,
  metrics: RefObject<HTMLElement | null>,
  selectPhase: (after: boolean, entered: boolean) => void,
) {
  useEffect(() => {
    const track = statistics.current
    const pin = track?.firstElementChild
    const numbers = metrics.current
    if (!enabled || !track || !pin || !numbers) return
    let frame = 0
    const read = () => {
      frame = 0
      const remaining = track.getBoundingClientRect().top
      const pinnedDistance = Math.max(0, track.clientHeight - pin.clientHeight)
      const bounds = numbers.getBoundingClientRect()
      const entering = bounds.top + Math.min(bounds.height * .15, 32) < innerHeight
      selectPhase(remaining <= -pinnedDistance / 2, entering)
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(read) }
    const resize = new ResizeObserver(schedule)
    resize.observe(track)
    resize.observe(pin)
    resize.observe(numbers)
    read()
    window.addEventListener('scroll', schedule, { passive: true })
    return () => {
      resize.disconnect()
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
    }
  }, [enabled, statistics, metrics, selectPhase])
}

export function watchCaseShowcase(
  root: HTMLElement,
  frame: HTMLElement,
  render: (progress: number, distance: number, inView: boolean) => void,
  suspended = () => false,
) {
  let request = 0, start = 0, length = 1, inView = false
  const schedule = () => {
    if (request) return
    request = requestAnimationFrame(() => {
      request = 0
      render(clamp((scrollY - start) / length), start - scrollY, inView)
    })
  }
  const measure = () => {
    if (suspended()) return
    start = root.getBoundingClientRect().top + scrollY
    length = Math.max(1, root.offsetHeight - innerHeight)
    schedule()
  }
  const intersection = new IntersectionObserver(entries => {
    inView = Boolean(entries.at(-1)?.isIntersecting)
    schedule()
  })
  const resize = new ResizeObserver(measure)
  intersection.observe(root); resize.observe(root); resize.observe(frame)
  measure(); schedule()
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', measure)
  document.addEventListener('visibilitychange', schedule)
  return () => {
    cancelAnimationFrame(request); intersection.disconnect(); resize.disconnect()
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', measure)
    document.removeEventListener('visibilitychange', schedule)
  }
}

/** One reversible progress value, driven by the document and shared by case heroes. */
export function useCaseHeroExit(hero: RefObject<HTMLElement | null>, suspended = false) {
  useEffect(() => {
    const root = hero.current
    if (!root || suspended) return
    const frame = root.querySelector<HTMLElement>('[data-case-hero-interface]') ?? root
    return watchCaseShowcase(root, frame, (_progress, distance) => {
      const height = root.offsetHeight
      const range = Math.min(height, innerHeight) * .65
      if (!range) return
      const copy = easeCase(clamp((-distance - Math.max(0, height - innerHeight)) / range))
      root.style.setProperty('--case-copy-exit', String(copy))
      root.style.setProperty('--case-interface-exit', String(easeCase(clamp(-distance / range))))
    })
  }, [hero, suspended])
}

export function useCaseViewportEntry(target: RefObject<Element | null>, enabled: boolean, bottomInset?: () => number, threshold = 0.15) {
  const [entered, setEntered] = useState(false)
  useEffect(() => {
    const node = target.current
    if (!enabled || entered || !node) return
    let observer: IntersectionObserver
    const observe = () => {
      observer?.disconnect()
      observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          setEntered(true)
          observer.disconnect()
        }
      }, { threshold, rootMargin: `0px 0px -${bottomInset?.() ?? 0}px` })
      observer.observe(node)
    }
    observe()
    if (bottomInset) window.addEventListener('resize', observe)
    return () => { observer.disconnect(); window.removeEventListener('resize', observe) }
  }, [enabled, entered, target, bottomInset, threshold])
  return entered
}
