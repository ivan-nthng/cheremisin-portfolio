'use client'

import { useEffect, useId, useLayoutEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import { createPortal } from 'react-dom'
import shared from './readers.module.css'
import styles from './readers-table.module.css'

type TableReader = {
  id: number
  first: string
  last: string
  group: string
  age: number
  books: number
  active: boolean
}

type ReaderPatch = { active?: boolean; group?: string }
type Props = {
  readers: readonly TableReader[]
  activeReaderId: number | null | undefined
  groups: readonly string[]
  onOpen: (id: number) => void
  onUpdate: (ids: readonly number[], patch: ReaderPatch) => void
  onDelete: (ids: readonly number[]) => void
}

type RowMenu = { reader: TableReader; anchor: HTMLButtonElement }
type DialogAction = { kind: 'new' | 'assign' | 'delete'; ids: readonly number[]; anchor: HTMLElement }
type SortKey = 'id' | 'active' | 'name' | 'added' | 'group' | 'books' | 'age'
const columns: readonly { key: SortKey; label: string }[] = [
  { key: 'id', label: 'ID' },
  { key: 'active', label: 'Status' },
  { key: 'name', label: 'Name' },
  { key: 'added', label: 'Added' },
  { key: 'group', label: 'Group' },
  { key: 'books', label: 'Books' },
  { key: 'age', label: 'Age' },
]
const dateFormat = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
const added = (id: number) => Date.UTC(2025, 2, 1 + id % 220)

function sortValue(reader: TableReader, key: SortKey) {
  if (key === 'name') return `${reader.first} ${reader.last}`
  if (key === 'added') return added(reader.id)
  if (key === 'active') return Number(reader.active)
  return reader[key]
}

function Icon({ name }: { name: 'group' | 'block' | 'delete' | 'sort' | 'more' }) {
  return <img className={styles.icon} src={`/images/litres/readers/table/${name}.svg`} width={16} height={16} alt="" />
}

export default function ReadersTable({ readers, activeReaderId, groups, onOpen, onUpdate, onDelete }: Props) {
  const [selected, setSelected] = useState<Set<number>>(() => new Set())
  const [sort, setSort] = useState<{ key: SortKey; descending: boolean } | null>(null)
  const [menu, setMenu] = useState<RowMenu | null>(null)
  const [dialog, setDialog] = useState<DialogAction | null>(null)
  const [groupValue, setGroupValue] = useState('')
  const selectAll = useRef<HTMLInputElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const menuId = useId()
  const titleId = useId()
  const selectedReaders = readers.filter(reader => selected.has(reader.id))
  const selectedIds = selectedReaders.map(reader => reader.id)
  const allSelected = selectedIds.length > 0 && selectedIds.length === readers.length
  const someSelected = selectedIds.length > 0 && !allSelected
  const rows = sort ? [...readers].sort((left, right) => {
    const a = sortValue(left, sort.key)
    const b = sortValue(right, sort.key)
    const order = typeof a === 'number' && typeof b === 'number' ? a - b : String(a).localeCompare(String(b))
    return sort.descending ? -order : order
  }) : readers
  const availableGroups = groups.filter(Boolean)

  useLayoutEffect(() => {
    if (selectAll.current) selectAll.current.indeterminate = someSelected
  }, [someSelected])

  useLayoutEffect(() => {
    if (!menu || !menuRef.current) return
    const popup = menuRef.current
    const bounds = menu.anchor.getBoundingClientRect()
    const left = Math.max(8, Math.min(bounds.right - popup.offsetWidth, window.innerWidth - popup.offsetWidth - 8))
    const below = bounds.bottom + 4
    const top = below + popup.offsetHeight + 8 <= window.innerHeight ? below : Math.max(8, bounds.top - popup.offsetHeight - 4)
    popup.style.left = `${left}px`
    popup.style.top = `${top}px`
    popup.querySelector('button')?.focus({ preventScroll: true })
  }, [menu])

  useEffect(() => {
    if (!menu) return
    const closeMenu = () => setMenu(null)
    function dismiss(event: PointerEvent) {
      const target = event.target
      if (target instanceof Node && !menuRef.current?.contains(target) && !menu?.anchor.contains(target)) closeMenu()
    }
    const dismissOnScroll = (event: Event) => {
      if (event.target instanceof Node && menuRef.current?.contains(event.target)) return
      closeMenu()
    }
    document.addEventListener('pointerdown', dismiss)
    window.addEventListener('resize', closeMenu)
    window.addEventListener('scroll', dismissOnScroll, true)
    return () => {
      document.removeEventListener('pointerdown', dismiss)
      window.removeEventListener('resize', closeMenu)
      window.removeEventListener('scroll', dismissOnScroll, true)
    }
  }, [menu])

  useLayoutEffect(() => {
    const element = dialogRef.current
    if (dialog && element && !element.open) element.showModal()
  }, [dialog])

  function toggle(id: number) {
    setSelected(previous => {
      const next = new Set(previous)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleAll() {
    setSelected(previous => {
      const next = new Set(previous)
      readers.forEach(reader => allSelected ? next.delete(reader.id) : next.add(reader.id))
      return next
    })
  }

  function dismissMenu(restoreFocus = false) {
    setMenu(null)
    if (restoreFocus) menu?.anchor.focus({ preventScroll: true })
  }

  function onMenuKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      event.preventDefault()
      event.stopPropagation()
      dismissMenu(true)
      return
    }
    const items = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('button:not(:disabled)'))
    const index = items.indexOf(document.activeElement as HTMLButtonElement)
    const next = {
      ArrowDown: (index + 1) % items.length,
      ArrowUp: (index - 1 + items.length) % items.length,
      Home: 0,
      End: items.length - 1,
    }[event.key]
    if (next === undefined) return
    event.preventDefault()
    items[next]?.focus({ preventScroll: true })
  }

  function openDialog(kind: DialogAction['kind'], ids: readonly number[], anchor: HTMLElement) {
    setMenu(null)
    setGroupValue('')
    setDialog({ kind, ids, anchor })
  }

  function closeDialog() {
    if (dialog?.anchor.isConnected) dialog.anchor.focus({ preventScroll: true })
    else selectAll.current?.focus({ preventScroll: true })
    setDialog(null)
  }

  function applyDialog(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!dialog) return
    if (dialog.kind === 'delete') {
      onDelete(dialog.ids)
      setSelected(previous => new Set([...previous].filter(id => !dialog.ids.includes(id))))
    } else {
      const group = groupValue.trim()
      if (!group) return
      onUpdate(dialog.ids, { group: availableGroups.find(value => value.toLowerCase() === group.toLowerCase()) ?? group })
    }
    dialogRef.current?.close()
  }

  return <>
    <div className={`${shared.tableScroll} ${styles.scroller}`}>
      <table className={styles.table} aria-label="Readers">
        <colgroup>
          <col className={styles.controlColumn} />
          {columns.map(column => <col key={column.key} className={styles[column.key]} />)}
          <col className={styles.controlColumn} />
        </colgroup>
        <thead>
          <tr>
            <th scope="col" className={styles.selectionCell}>
              <label className={styles.checkTarget}>
                <input ref={selectAll} type="checkbox" checked={allSelected} disabled={readers.length === 0}
                  aria-label="Select all visible readers" onChange={toggleAll} />
              </label>
              {selectedIds.length > 0 && <div className={styles.bulk} aria-label="Selected reader actions" role="group">
                <span className={styles.count} role="status">{selectedIds.length} selected</span>
                <div className={styles.bulkButtons}>
                  <button type="button" onClick={event => openDialog('new', selectedIds, event.currentTarget)}>
                    <Icon name="group" /><span>New Group</span>
                  </button>
                  <button type="button" disabled={selectedReaders.every(reader => !reader.active)}
                    onClick={() => onUpdate(selectedIds, { active: false })}>
                    <Icon name="block" /><span>Block Users</span>
                  </button>
                  <button type="button" onClick={event => openDialog('delete', selectedIds, event.currentTarget)}>
                    <Icon name="delete" /><span>Delete Users</span>
                  </button>
                </div>
              </div>}
            </th>
            {columns.map(column => <th scope="col" key={column.key} data-sort-key={column.key}
              aria-sort={sort?.key === column.key ? sort.descending ? 'descending' : 'ascending' : undefined}>
              <button className={styles.columnLabel} type="button" onClick={() => setSort(previous => ({
                key: column.key, descending: previous?.key === column.key && !previous.descending,
              }))}>
                <span>{column.label}</span><Icon name="sort" />
              </button>
            </th>)}
            <th scope="col" aria-label="Reader actions" />
          </tr>
        </thead>
        <tbody>
          {rows.map((reader, index) => {
            const fullName = `${reader.first} ${reader.last}`
            const checked = selected.has(reader.id)
            const opened = menu?.reader.id === reader.id
            return <tr key={reader.id} data-checked={checked || undefined}
              className={activeReaderId === reader.id ? shared.selectedRow : undefined} onClick={() => onOpen(reader.id)}>
              <td>
                <label className={styles.checkTarget} onClick={event => event.stopPropagation()}>
                  <input type="checkbox" checked={checked} aria-label={`Select ${fullName}`} onChange={() => toggle(reader.id)} />
                </label>
              </td>
              <td>{reader.id}</td>
              <td><span className={styles.readerStatus} data-active={reader.active || undefined}>{reader.active ? 'Active' : 'Inactive'}</span></td>
              <td><button type="button" className={shared.rowButton} data-target={index === 0 ? "guided-reader" : undefined}>{fullName}</button></td>
              <td>{dateFormat.format(added(reader.id)).toLowerCase()}</td>
              <td title={reader.group}>{reader.group}</td>
              <td>{reader.books}</td>
              <td>{reader.age}</td>
              <td>
                <button type="button" className={styles.rowAction} aria-label={`Actions for ${fullName}`}
                  aria-haspopup="menu" aria-expanded={opened} aria-controls={opened ? menuId : undefined}
                  onClick={event => {
                    event.stopPropagation()
                    setMenu(opened ? null : { reader, anchor: event.currentTarget })
                  }}>
                  <Icon name="more" />
                </button>
              </td>
            </tr>
          })}
          {!rows.length && <tr className={styles.noRows}><td colSpan={9}>No readers match your filters.</td></tr>}
        </tbody>
      </table>
    </div>

    {menu && createPortal(<div ref={menuRef} className={styles.menu} id={menuId} role="menu"
      aria-label={`Actions for ${menu.reader.first} ${menu.reader.last}`} onKeyDown={onMenuKey}
      onBlur={event => {
        if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) dismissMenu()
      }}>
      <button type="button" role="menuitem" tabIndex={-1} onClick={() => { onOpen(menu.reader.id); dismissMenu(true) }}>Open Reader</button>
      <button type="button" role="menuitem" tabIndex={-1} disabled={!availableGroups.length} onClick={() => openDialog('assign', [menu.reader.id], menu.anchor)}>
        <Icon name="group" /> Add to Group
      </button>
      <button type="button" role="menuitem" tabIndex={-1} onClick={() => openDialog('new', [menu.reader.id], menu.anchor)}>
        <Icon name="group" /> New Group
      </button>
      <button type="button" role="menuitem" tabIndex={-1} onClick={() => {
        onUpdate([menu.reader.id], { active: !menu.reader.active })
        dismissMenu(true)
      }}>
        <Icon name="block" /> {menu.reader.active ? 'Deactivate Account' : 'Activate Account'}
      </button>
      <button type="button" role="menuitem" tabIndex={-1} onClick={() => openDialog('delete', [menu.reader.id], menu.anchor)}>
        <Icon name="delete" /> Delete Reader
      </button>
    </div>, menu.anchor.closest('main') ?? document.body)}

    {dialog && <dialog ref={dialogRef} className={styles.dialog} aria-labelledby={titleId} onClose={closeDialog}>
      <form onSubmit={applyDialog}>
        <h2 id={titleId}>{dialog.kind === 'delete' ? 'Delete readers' : dialog.kind === 'new' ? 'New Group' : 'Add to Group'}</h2>
        {dialog.kind === 'delete' ? <p>Delete {dialog.ids.length} {dialog.ids.length === 1 ? 'reader' : 'readers'} from this demo?</p>
          : <label>Group name {dialog.kind === 'new'
            ? <input autoFocus value={groupValue} onChange={event => setGroupValue(event.target.value)} maxLength={60} required />
            : <select autoFocus required value={groupValue} onChange={event => setGroupValue(event.target.value)}>
              <option value="" disabled>Choose a group</option>
              {availableGroups.map(group => <option value={group} key={group}>{group}</option>)}
            </select>}
          </label>}
        <div className={styles.dialogActions}>
          <button type="button" className={shared.secondary} autoFocus={dialog.kind === 'delete'} onClick={() => dialogRef.current?.close()}>Cancel</button>
          <button type="submit" className={shared.primary} disabled={dialog.kind !== 'delete' && !groupValue.trim()}>
            {dialog.kind === 'delete' ? 'Delete' : dialog.kind === 'new' ? 'Create Group' : 'Add to Group'}
          </button>
        </div>
      </form>
    </dialog>}
  </>
}
