'use client'

import { useSyncExternalStore } from 'react'

export const caseDemoDesktopQuery = '(min-width: 1201px)'

function subscribe(onChange: () => void) {
  const media = matchMedia(caseDemoDesktopQuery)
  media.addEventListener('change', onChange)
  return () => media.removeEventListener('change', onChange)
}

export function useCaseDemoDesktop() {
  return useSyncExternalStore(subscribe, () => matchMedia(caseDemoDesktopQuery).matches, () => false)
}
