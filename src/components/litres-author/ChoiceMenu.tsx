import { useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import styles from './author.module.css'

export default function ChoiceMenu<T extends string | number>({ label, trigger, options, value, onChange, alignEnd = false, preview, selectedMark = '✓' }: {
  label: string
  trigger: ReactNode
  options: { value: T; label: string; detail?: string }[]
  value: T
  onChange: (value: T) => void
  alignEnd?: boolean
  selectedMark?: ReactNode
  preview?: { target: string; open: boolean }
}) {
  const id = useId()
  const [open, setOpen] = useState(false)
  const scriptedOpen = preview?.open
  const shown = scriptedOpen ?? open
  const root = useRef<HTMLDivElement>(null)
  const button = useRef<HTMLButtonElement>(null)

  useLayoutEffect(() => {
    if (scriptedOpen !== undefined) setOpen(scriptedOpen)
  }, [scriptedOpen])

  useEffect(() => {
    if (!open || scriptedOpen !== undefined) return
    const element = root.current
    element?.querySelector<HTMLButtonElement>('[aria-checked="true"]')?.focus({ preventScroll: true })
    function dismiss(event: PointerEvent) {
      if (event.target instanceof Node && !element?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', dismiss)
    return () => document.removeEventListener('pointerdown', dismiss)
  }, [open, scriptedOpen])

  function close() {
    setOpen(false)
    button.current?.focus()
  }

  return <div ref={root} className={styles.choice} data-align-end={alignEnd}
    onBlur={event => {
      if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) setOpen(false)
    }}
    onKeyDown={event => {
      if (!open && event.target === button.current && event.key === 'ArrowDown') {
        event.preventDefault()
        setOpen(true)
      } else if (open && event.key === 'Escape') {
        event.preventDefault()
        event.stopPropagation()
        close()
      } else if (open && event.key === 'Tab') {
        close()
      } else if (open && ['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) {
        event.preventDefault()
        const items = Array.from(root.current?.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]') ?? [])
        const index = items.indexOf(document.activeElement as HTMLButtonElement)
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1
          : (index + (event.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length
        items[next]?.focus()
      }
    }}>
    <button ref={button} type="button" className={styles.control} aria-label={label} aria-haspopup="menu"
      data-target={preview?.target} aria-expanded={shown} aria-controls={shown ? id : undefined} onClick={() => setOpen(!open)}>
      {trigger}
    </button>
    {shown && <div id={id} role="menu" aria-label={label} className={styles.menu}>
      {options.map(option => <button type="button" role="menuitemradio" tabIndex={-1} aria-checked={option.value === value} key={option.value}
        data-target={preview && `${preview.target}-${option.value}`}
        onClick={() => { onChange(option.value); close() }}>
        <span>{option.label}{option.detail && <small>{option.detail}</small>}</span>
        {option.value === value && <span aria-hidden="true">{selectedMark}</span>}
      </button>)}
    </div>}
  </div>
}
