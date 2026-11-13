'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import ChoiceMenu from '@/components/litres-author/ChoiceMenu'
import { choiceValues, Choices, clientTypes, ReaderIcon } from './ReaderControls'
import { photoPlacement } from './ReaderEditor'
import type { Reader } from './ReadersDemo'
import s from './readers.module.css'

export function ReaderTicket({ reader, dirty, saved, onChange, onSave, onClose }: {
  reader: Reader
  dirty: boolean
  saved: boolean
  onChange: (patch: Partial<Reader>) => void
  onSave: () => void
  onClose: () => void
}) {
  const [copied, setCopied] = useState(false)
  const { crop } = reader
  const photo = crop ? {
    width: `${photoPlacement.size * 200}%`,
    height: `${photoPlacement.size * 200}%`,
    left: `${(photoPlacement.left - crop.x) * 200}%`,
    top: `${(photoPlacement.top - crop.y) * 200}%`,
    filter: `brightness(${crop.brightness}%)`,
  } : undefined
  const clientOptions = clientTypes.map(type => ({ value: type, label: type }))
  const status = !reader.active ? 'Inactive' : reader.books || reader.minutes ? 'Active' : 'New'

  return <>
    <div className={s.panelHeading}>
      <h2>Ticket</h2>
      {saved && <span className={s.ticketSaved} role="status"><ReaderIcon name="saved" size={14} /> Saved</span>}
      <button type="button" className={s.iconButton} aria-label="Close reader" onClick={onClose}><X size={16} /></button>
    </div>
    <section className={s.ticket} aria-label="Reader account">
      <div className={s.person}>
        <span className={s.avatar} style={{ background: reader.color }}>
          {reader.photo ? <img src={reader.photoSrc} style={photo} alt="" /> : `${reader.first[0]}${reader.last[0]}`}
        </span>
        <div className={s.identity}>
          <h3>{reader.first} {reader.last}</h3>
          <p>{reader.email}</p>
          <span className="sr-only">+371 {reader.phone}</span>
        </div>
        <div className={s.accountStatus}>
          <span className={s.statusPill} data-active={reader.active}>
            {reader.active ? <ReaderIcon name="active" size={14} /> : <span className={s.statusDot} />}
            {reader.active ? 'Active' : 'Inactive'}
          </span>
          <small>Last Visit: {reader.active ? '1h' : '—'}</small>
        </div>
        <div className={s.ticketMenu} data-more>
          <ChoiceMenu label="Reader account status" alignEnd value={reader.active ? 'active' : 'inactive'}
            trigger={<ReaderIcon name="more" />}
            options={[{ value: 'active', label: 'Activate account' }, { value: 'inactive', label: 'Deactivate account' }]}
            onChange={value => onChange({ active: value === 'active' })} />
        </div>
      </div>
      <div className={s.facts}>
        <div>
          <div className={s.ticketLabel}>ID</div>
          <button type="button" className={s.copyId} aria-label={copied ? 'Reader ID copied' : 'Copy reader ID'}
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(String(reader.id))
                setCopied(true)
              } catch {
                setCopied(false)
              }
            }}>
            {reader.id}<ReaderIcon name="copy" size={20} />
          </button>
        </div>
        <div>
          <div className={s.ticketLabel}>Client Type</div>
          <div className={s.ticketMenu} data-client-type>
            <ChoiceMenu label="Client Type" value={reader.type}
              trigger={<>{reader.type}<ReaderIcon name="select" /></>} options={clientOptions}
              selectedMark={<img src="/images/litres/author/menu-check.svg" width="16" height="16" alt="" />}
              onChange={type => onChange({ type })} />
          </div>
        </div>
      </div>
    </section>
    <section className={s.stats} aria-label="Reader statistics">
      <div><b>{reader.books}</b><span className={s.ticketLabel}>Books Read</span></div>
      <div><b>{reader.minutes}</b><span className={s.ticketLabel}>Minutes/day</span></div>
      <div className={s.statStatus}><span className={s.engagement} data-status={status}>
        <ReaderIcon name="star" /> {status}
      </span><span className={s.ticketLabel}>Status</span></div>
    </section>
    <section className={s.ticketRules}>
      <h3>Readers Rules</h3>
      <Choices label="Books Available" values={choiceValues.available} value={reader.available} onChange={available => onChange({ available })} />
      <Choices label="If below required amount" values={choiceValues.below} value={reader.below} onChange={below => onChange({ below })} />
      {reader.type === 'Selfservice' && <Choices label="Cost up to" values={choiceValues.cost} value={reader.cost} onChange={cost => onChange({ cost })} />}
      <button type="button" className={s.primary} data-target="reader-save-rules" disabled={!dirty} onClick={onSave}>
        <ReaderIcon name="save" size={18} /> Save Changes
      </button>
    </section>
  </>
}
