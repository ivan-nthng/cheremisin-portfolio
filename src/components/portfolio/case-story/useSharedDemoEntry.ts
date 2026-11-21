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
    let scrolled = false
    const deadline = performance.now() + 3000
    const enter = () => {
      const section = document.getElementById(anchor)
      const launcher = section?.querySelector<HTMLElement>('[data-shared-demo-entry]')
      if (section && launcher?.getClientRects().length) {
        if (!scrolled) {
          const guided = section.dataset.motion === 'true'
          const travel = Math.max(0, section.offsetHeight - innerHeight)
          window.scrollBy({ top: section.getBoundingClientRect().top + (guided ? travel * .9 : -56), behavior: 'instant' })
          scrolled = true
        } else if (!launcher.closest('[inert]') && getComputedStyle(launcher).visibility === 'visible') {
          url.searchParams.delete('demo')
          history.replaceState(history.state, '', url.pathname + url.search + url.hash)
          open(id, launcher)
          return
        }
      }
      if (performance.now() < deadline) frame = requestAnimationFrame(enter)
    }
    frame = requestAnimationFrame(enter)
    return () => cancelAnimationFrame(frame)
  }, [enabled, open])
}
