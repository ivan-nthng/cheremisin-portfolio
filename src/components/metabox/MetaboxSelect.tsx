'use client'

import { useEffect, useId, useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react'
import styles from './metabox-controls.module.css'

export default function MetaboxSelect<T extends string>({ label, value, options, onChange, compact = false }: {
  label: string
  value: T
  options: readonly { value: T; label: string }[]
  onChange: (value: T) => void
  compact?: boolean
}) {
  const listId = useId()
  const root = useRef<HTMLSpanElement>(null)
  const list = useRef<HTMLUListElement>(null)
  const [active, setActive] = useState<number | null>(null)
  const [placement, setPlacement] = useState<'below' | 'above'>('below')
  const selected = options.findIndex(option => option.value === value)
  const open = active !== null

  useEffect(() => {
    if (!open) return
    function dismiss(event: PointerEvent) {
      if (event.target instanceof Node && !root.current?.contains(event.target)) setActive(null)
    }
    document.addEventListener('pointerdown', dismiss)
    return () => document.removeEventListener('pointerdown', dismiss)
  }, [open])

  useLayoutEffect(() => {
    if (!open || !root.current || !list.current) return
    const bounds = root.current.getBoundingClientRect()
    const availableBelow = window.innerHeight - bounds.bottom
    setPlacement(availableBelow < list.current.offsetHeight + 8 && bounds.top > availableBelow ? 'above' : 'below')
  }, [open])

  useLayoutEffect(() => {
    if (active === null || !list.current) return
    const option = list.current.children[active] as HTMLElement | undefined
    if (!option) return
    const item = option.getBoundingClientRect()
    const visible = list.current.getBoundingClientRect()
    if (item.top < visible.top) list.current.scrollTop += item.top - visible.top
    else if (item.bottom > visible.bottom) list.current.scrollTop += item.bottom - visible.bottom
  }, [active])

  function choose(index: number) {
    const option = options[index]
    if (option) onChange(option.value)
    setActive(null)
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'Tab') {
      setActive(null)
      return
    }
    if (event.key === 'Escape' && open) {
      event.preventDefault()
      event.stopPropagation()
      setActive(null)
      return
    }
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End', 'Enter', ' '].includes(event.key)) return
    event.preventDefault()
    if (!open) {
      setActive(event.key === 'Home' ? 0 : event.key === 'End' ? options.length - 1 : Math.max(0, selected))
    } else if (event.key === 'Enter' || event.key === ' ') {
      choose(active)
    } else if (event.key === 'Home') {
      setActive(0)
    } else if (event.key === 'End') {
      setActive(options.length - 1)
    } else {
      setActive(Math.max(0, Math.min(options.length - 1, active + (event.key === 'ArrowUp' ? -1 : 1))))
    }
  }

  return <span ref={root} className={compact ? `${styles.select} ${styles.compactSelect}` : styles.select} data-placement={placement}>
    <button type="button" role="combobox" aria-label={label} aria-expanded={open} aria-haspopup="listbox"
      aria-controls={open ? listId : undefined} aria-activedescendant={open ? `${listId}-${active}` : undefined}
      disabled={options.length === 0} className={compact ? `${styles.field} ${styles.compactField}` : styles.field}
      onClick={event => {
        if (!open) event.currentTarget.focus({ preventScroll: true })
        setActive(open ? null : Math.max(0, selected))
      }} onKeyDown={onKeyDown}
      onBlur={() => setActive(null)}>
      <span>{options[selected]?.label ?? value}</span>
    </button>
    {open && <ul ref={list} id={listId} role="listbox" aria-label={label} className={styles.options}>
      {options.map((option, index) => <li key={option.value} id={`${listId}-${index}`} role="option"
        aria-selected={index === selected} data-active={index === active}
        className={styles.option} onPointerMove={() => setActive(index)}
        onMouseDown={event => event.preventDefault()} onClick={() => choose(index)}>
        <span>{option.label}</span>
        {index === selected && <span className={styles.optionMark} aria-hidden="true">✓</span>}
      </li>)}
    </ul>}
  </span>
}
