'use client'

import { useRef, type RefObject } from 'react'
import styles from './shell.module.css'

export type DemoScenario<Id extends string> = { id: Id; label: string; note?: string }

/** Shared portfolio scenario controls, independent of the native workspace UI. */
export function DemoScenarioTabs<Id extends string>({ scenarios, scenario, onScenario, controlsId, buttonRefs, label = 'Demo scenario' }: {
  scenarios: readonly DemoScenario<Id>[]
  scenario: Id
  onScenario: (scenario: Id) => void
  controlsId?: string
  buttonRefs?: RefObject<(HTMLButtonElement | null)[]>
  label?: string
}) {
  const localRefs = useRef<(HTMLButtonElement | null)[]>([])
  const tabs = buttonRefs ?? localRefs
  return <div className={styles.scenarios} role="tablist" aria-label={label}>
    {scenarios.map((item, index) => <button type="button" role="tab" key={item.id} ref={node => { tabs.current[index] = node }}
      aria-selected={scenario === item.id} aria-controls={controlsId} tabIndex={scenario === item.id ? 0 : -1} title={item.note}
      onClick={() => onScenario(item.id)} onKeyDown={event => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
        event.preventDefault()
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? scenarios.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : scenarios.length - 1)) % scenarios.length
        tabs.current[next]?.focus({ preventScroll: true })
      }}><span>{item.label}</span></button>)}
  </div>
}
