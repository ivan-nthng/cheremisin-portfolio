'use client'

import { useId, useState } from 'react'
import { CitymobilActionGroup, CitymobilIssueActions, CitymobilSearchInput } from '@/components/citymobil-demo/CitymobilControls'
import native from '@/components/citymobil-demo/preview.module.css'
import styles from './process.module.css'

const actions = ['Open Trip Track', 'Call Driver', 'Payment Actions', 'Connect']

export default function CaseSystem({ example }: { example: 'buttons' | 'inputs' | 'actions' }) {
  const uid = useId()
  const [completed, setCompleted] = useState(false)
  const [selected, setSelected] = useState(actions[0])
  return <div className={`${native.preview} ${styles.systemExample}`} data-native-controls={example} data-theme="light">
    {example === 'buttons' ? <>
      <CitymobilIssueActions completed={completed} disabled={false} label="Try completion button" title="Toggle the local component example" onComplete={() => setCompleted(value => !value)}/>
      <CitymobilIssueActions completed={false} disabled label="Disabled completion button" title="Disabled native button state" onComplete={() => {}}/>
      <CitymobilIssueActions completed disabled label="Completed button state" title="Completed native button state" onComplete={() => {}}/>
    </> : example === 'inputs' ? <>
      <CitymobilSearchInput aria-label="Try native search input" placeholder="Search"/>
      <CitymobilSearchInput aria-label="Filled native search input" defaultValue="Johnston Serenity"/>
      <CitymobilSearchInput aria-label="Disabled native search input" placeholder="Search" disabled/>
    </> : <div role="listbox" aria-label="Native action examples" className={styles.systemActions} onKeyDown={event => {
      if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return
      event.preventDefault(); event.stopPropagation()
      const index = actions.indexOf(selected)
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? actions.length - 1 : (index + (event.key === 'ArrowDown' ? 1 : actions.length - 1)) % actions.length
      document.getElementById(`${uid}-${next}`)?.focus({ preventScroll: true })
    }}><CitymobilActionGroup title="Trip actions" items={actions} selected={selected} idFor={item => `${uid}-${actions.indexOf(item)}`} onSelect={setSelected} onChoose={setSelected}/></div>}
  </div>
}
