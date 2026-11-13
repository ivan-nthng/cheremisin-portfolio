'use client'

import { useSyncExternalStore } from 'react'
import styles from './case.module.css'

const changed = 'citymobil-case-view'
const snapshot = () => location.hash === '#process' ? 'process' : 'result'
function subscribe(update: () => void) {
  window.addEventListener(changed, update)
  window.addEventListener('hashchange', update)
  window.addEventListener('popstate', update)
  return () => {
    window.removeEventListener(changed, update)
    window.removeEventListener('hashchange', update)
    window.removeEventListener('popstate', update)
  }
}
/** The existing case URL owns the view; Back/Forward and copied links agree. */
export function useCaseView() { return useSyncExternalStore(subscribe, snapshot, () => 'result') }

export function CaseNavigation() {
  const view = useCaseView()
  return <nav className={styles.navigation} aria-label="Citymobil case views">
    {(['result', 'process'] as const).map(value => <a key={value} href={`#${value}`} aria-current={view === value ? 'page' : undefined} onClick={event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return
      event.preventDefault()
      if (view === value) return
      history.pushState(history.state, '', `#${value}`)
      window.dispatchEvent(new Event(changed))
    }}>{value === 'result' ? 'Result' : 'Process'}</a>)}
  </nav>
}
