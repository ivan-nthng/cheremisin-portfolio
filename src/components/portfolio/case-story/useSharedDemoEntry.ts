'use client'

import { useEffect } from 'react'
import { demoLinks, type DemoLinkId } from '@/lib/portfolio/demo-links'

/** Open the existing launcher from a shared URL; ordinary case visits never auto-open. */
export function useSharedDemoEntry(enabled: boolean, open: (id: DemoLinkId, launcher: HTMLElement) => void) {
  useEffect(() => {
    if (!enabled) return
    const url = new URL(location.href)
    const requested = url.searchParams.get('demo')
    if (!requested || !Object.hasOwn(demoLinks, requested)) return
    const id = requested as DemoLinkId
    const { path, anchor } = demoLinks[id]
    if (url.pathname !== path) return

    let frame = 0
    const pending = new AbortController()
    let deadline = 0
    const enter = () => {
      const section = document.getElementById(anchor)
      const launcher = section?.querySelector<HTMLElement>('[data-shared-demo-entry]')
      // The server's static layout can have a different scroll destination from the hydrated sticky showcase.
      if (section && section.dataset.caseMotionReady !== 'false' && launcher?.getClientRects().length) {
        const guided = section.dataset.motion === 'true'
        const travel = Math.max(0, section.offsetHeight - innerHeight)
        const desired = window.scrollY + section.getBoundingClientRect().top + (guided ? travel * .9 : -56)
        const maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight
        const target = Math.max(0, Math.min(desired, maxScroll))
        // Fragment restoration can move the page again after our first scroll.
        if (Math.abs(window.scrollY - target) > 1) {
          window.scrollTo({ top: target, behavior: 'instant' })
        } else if (!launcher.closest('[inert]') && getComputedStyle(launcher).visibility === 'visible') {
          pending.abort()
          url.searchParams.delete('demo')
          history.replaceState(history.state, '', url.pathname + url.search + url.hash)
          open(id, launcher)
          return
        }
      }
      if (performance.now() < deadline) frame = requestAnimationFrame(enter)
      else pending.abort()
    }
    const start = () => {
      deadline = performance.now() + 3000
      frame = requestAnimationFrame(enter)
    }
    const cancel = () => { pending.abort(); cancelAnimationFrame(frame) }
    // A visitor who starts navigating the case owns its scroll and focus.
    for (const event of ['wheel', 'touchstart', 'pointerdown', 'keydown']) {
      window.addEventListener(event, cancel, { capture: true, passive: true, signal: pending.signal })
    }
    // WebKit can still restore the URL fragment when the initial document finishes loading.
    if (url.hash && document.readyState !== 'complete') window.addEventListener('load', start, { once: true, signal: pending.signal })
    else start()
    return cancel
  }, [enabled, open])
}
