'use client'

import type { CSSProperties } from 'react'
import s from './readers.module.css'

export const clientTypes = ['Selfservice', 'Default', 'Manual'] as const
export type ClientType = (typeof clientTypes)[number]

export const choiceValues = {
  available: ['1', '2', '3', '4', '5', '6', '∞'],
  below: ['1', '2', '3', '4', '5', '6'],
  cost: ['€5', '€10', '€25', '€50', '€75', '€100'],
}

export function ReaderIcon({ name, size = 16 }: { name: string; size?: number }) {
  return <img src={`/images/litres/readers/${name}.svg`} width={size} height={size} alt="" aria-hidden="true" />
}

export function Choices({ label, values, value, onChange }: {
  label: string
  values: readonly string[]
  value: string
  onChange: (value: string) => void
}) {
  const index = values.indexOf(value)
  const style = {
    '--choice-count': values.length,
    '--choice-offset': `${Math.max(0, index) * 100}%`,
  } as CSSProperties

  return <div className={s.choiceGroup}>
    <div className={s.choiceLabel}>{label}<ReaderIcon name="info" size={14} /></div>
    <div className={s.choiceLine}>
      <div className={s.choices} role="group" aria-label={label} style={style}>
        <span className={s.choiceSelection} data-visible={index >= 0} aria-hidden="true" />
        {values.map(option => <button key={option} type="button" aria-pressed={value === option}
          data-target={values === choiceValues.available && option === '5' ? 'reader-book-limit'
            : values === choiceValues.cost && option === '€50' ? 'reader-cost-cap' : undefined}
          onClick={() => onChange(option)}>{option}</button>)}
      </div>
      {values === choiceValues.below && <button type="button" className={s.customChoice}
        aria-pressed={value === 'Custom'} onClick={() => onChange('Custom')}>Custom</button>}
    </div>
  </div>
}
