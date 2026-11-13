'use client'

import type { ComponentProps } from 'react'
import NativeAsset from './NativeAsset'
import styles from './preview.module.css'

/** Shared native controls: the live workspace and its component examples use one markup owner. */
export function CitymobilIssueActions({ dark = false, completed, disabled, label, title, onComplete }: { dark?: boolean; completed: boolean; disabled: boolean; label: string; title: string; onComplete: () => void }) {
  return <footer className={styles.issueFooter}>
    <button type="button" aria-disabled="true" title="Inactive in this local demo; no service is connected."><NativeAsset name="workspace/imgTimer" dark={dark}/>Wait</button>
    <button type="button" className={styles.primary} aria-label={label} disabled={disabled} title={title} onClick={onComplete}><NativeAsset name="workspace/imgCheck" dark={dark} plain/>{completed ? 'Completed' : 'Complete'}</button>
  </footer>
}

export function CitymobilSearchInput(props: ComponentProps<'input'>) {
  return <input {...props} className={styles.teamSearch}/>
}

export function CitymobilActionGroup({ title, items, selected, idFor, disabled, onSelect, onChoose }: { title: string; items: readonly string[]; selected?: string; idFor: (item: string) => string; disabled?: (item: string) => boolean; onSelect: (item: string) => void; onChoose: (item: string) => void }) {
  return <div className={styles.actionGroup}><h4>{title}{title === 'AI Prediction' && <span className={styles.beta}>beta</span>}</h4>{items.map(item => <button type="button" key={item} role="option" id={idFor(item)} onFocus={() => onSelect(item)} aria-selected={selected === item} onPointerMove={() => onSelect(item)} disabled={disabled?.(item)} onClick={() => onChoose(item)}>{item}<span>{item === 'Open Trip Track' ? '⌘ M' : item === 'Call Driver' ? '⌘ ⌥ D' : item === 'Create order' ? '⌥ O' : ''}</span></button>)}</div>
}
