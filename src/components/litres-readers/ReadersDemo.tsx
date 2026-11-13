'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, Download, Filter, LoaderCircle, Plus, Search, Upload, X } from 'lucide-react'
import DemoShell from '@/components/portfolio/demo/DemoShell'
import { defaultCrop, DemoField, ReaderPhotoStep, ReaderStepFrame, type Crop } from './ReaderEditor'
import { choiceValues, Choices, clientTypes, ReaderIcon, type ClientType } from './ReaderControls'
import { ReaderTicket } from './ReaderTicket'
import ReadersTable from './ReadersTable'
import s from './readers.module.css'

export type Reader = { id: number; first: string; last: string; email: string; phone: string; group: string; age: number; books: number; minutes: number; active: boolean; type: ClientType; photo: boolean; photoSrc: string; crop: Crop | null; color: string; available: string; below: string; cost: string }
const names = [['Kyle','Lind'], ['Johanna','Ferry'], ['Ernest','Ledner'], ['Howard','Walter'], ['Carlton','Schmidt'], ['Joyce','Okuneva'], ['Louis','Casper'], ['Angelica','Mraz'], ['Jennie','Johnson'], ['Leroy','Dicki'], ['Rachael','Maggio'], ['Leslie','Hackett'], ['Faye','Heller'], ['Dwight','Brown'], ['Louise','Fishborn'], ['Amelia','Parker'], ['Oliver','Bennett'], ['Mia','Brooks']]
const groups = ['', 'Emard - Schumm', 'Batz - Lemke', 'Balistreri, Ledner…', 'Raynor, Hudson…', 'Osinski Group', 'Wilkinson Group']
const colors = ['#f0b4a2','#a1c1df','#dac5ef','#f3c977','#a4cbb4','#e3b2cc']
const portraits = ['/images/litres/readers/reader.webp','/images/litres/author/avatar.png','/images/citymobil/demo/workspace/imgAvatarS.png']
const rand = (max: number) => Math.floor(Math.random() * max)
function makeReader(index: number): Reader { const first = names[index % names.length][0]; const last = names[(index + Math.floor(index / names.length)) % names.length][1]; return {id: 10000+index*1000+rand(1000),first,last,email:`${first.toLowerCase()}.${last.toLowerCase()}${rand(90)+10}@example.com`,phone:`2${rand(10)}-${rand(900)+100}-${rand(900)+100}`,group:groups[rand(groups.length)],age:18+rand(52),books:rand(7),minutes:rand(91),active:Math.random()>.35,type:clientTypes[rand(clientTypes.length)],photo:index%3!==0,photoSrc:portraits[rand(portraits.length)],crop:null,color:colors[rand(colors.length)],available:'4',below:'2',cost:'€25'} }
function seed() { return Array.from({ length: 60 }, (_, index) => makeReader(index)) }
export type GuidedReaderFilter = { open: boolean; status: 'All' | 'Active' }
export default function ReadersDemo({ guidedSelection, guidedFilter, compact, onReturn }: {
  guidedSelection?: boolean
  guidedFilter?: GuidedReaderFilter
  compact?: boolean
  onReturn?: () => void
} = {}) {
 const [theme,setTheme]=useState<'light'|'dark'>('light'), [version,setVersion]=useState(0)
 const [readers,setReaders]=useState<Reader[]>([]), [selection,setSelected]=useState<Reader|null>(null), [draft,setDraft]=useState<Reader|null>(null)
 const selected = guidedSelection === undefined ? selection : guidedSelection ? readers[0] ?? null : null
 const [stage,setStage]=useState(-1), [filled,setFilled]=useState<string[]>([]), [manualFilter,setFilter]=useState('All'), [group,setGroup]=useState<string|null>(null), [filterOpen,setFilterOpen]=useState(false), [search,setSearch]=useState(''), [searchOpen,setSearchOpen]=useState(false), [photoOpen,setPhotoOpen]=useState(false), [crop,setCrop]=useState(defaultCrop), [ruleTab,setRuleTab]=useState<ClientType>('Selfservice')
 const filter = guidedFilter?.status ?? manualFilter
 const showFilter = guidedFilter?.open ?? filterOpen
 const [saveStatus, setSaveStatus] = useState<'idle'|'saving'|'saved'>('idle')
 const [finishing, setFinishing] = useState(false)
 const [photoRequested, setPhotoRequested] = useState(false)
 const [customGroups, setCustomGroups] = useState<string[]>([])
 const allGroups = [...groups, ...customGroups]
 const savedReader = selected && readers.find(reader => reader.id === selected.id)
 const ticketDirty = Boolean(selected && savedReader && (
   selected.active !== savedReader.active || selected.type !== savedReader.type ||
   selected.available !== savedReader.available || selected.below !== savedReader.below ||
   selected.cost !== savedReader.cost
 ))
 const reduced = useReducedMotion()
 const panel = useRef<HTMLElement>(null)
 const filterWrap = useRef<HTMLDivElement>(null)
 const fields = stage === 0 ? (['first', 'last'] as const) : (['email', 'phone'] as const)
 const ready = stage >= 0 && stage < 2 && fields.every(field => filled.includes(field))

 useEffect(() => {
   setReaders(seed())
 }, [version])

 useEffect(() => {
   if (guidedSelection === undefined && (stage >= 0 || selected) && window.matchMedia('(max-width: 850px)').matches) {
     panel.current?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: 'start' })
   }
 }, [guidedSelection, stage, selected, reduced])

 useEffect(() => {
   if (!filterOpen) return
   function outside(event: PointerEvent) {
     if (event.target instanceof Node && !filterWrap.current?.contains(event.target)) setFilterOpen(false)
   }
   function escape(event: KeyboardEvent) {
     if (event.key !== 'Escape') return
     if (onReturn) { event.preventDefault(); event.stopPropagation() }
     setFilterOpen(false)
     filterWrap.current?.querySelector('button')?.focus()
   }
   document.addEventListener('pointerdown', outside)
   document.addEventListener('keydown', escape)
   return () => {
     document.removeEventListener('pointerdown', outside)
     document.removeEventListener('keydown', escape)
   }
 }, [filterOpen, onReturn])

 useEffect(() => {
   if (!ready) return
   setSaveStatus('saving')
   const timer = window.setTimeout(() => setSaveStatus('saved'), 550)
   return () => window.clearTimeout(timer)
 }, [ready, stage])

 useEffect(() => {
   if (!finishing || !draft) return
   const timer = window.setTimeout(() => {
     const reader = { ...draft, type: ruleTab, photo: photoOpen, crop, books: 0, minutes: 0, active: true }
     setReaders(previous => [reader, ...previous])
     setSelected(reader)
     setDraft(null)
     setStage(-1)
     setFinishing(false)
     setSaveStatus('saved')
   }, 550)
   return () => window.clearTimeout(timer)
 }, [finishing, draft, ruleTab, photoOpen, crop])

 const shown = useMemo(() => readers.filter(reader =>
   (filter === 'All' || (filter === 'Active' ? reader.active : !reader.active))
   && (group === null || reader.group === group)
   && (!search || `${reader.first} ${reader.last}` === search)
 ), [readers, filter, group, search])
 const download=()=>{const rows=[['Reader ID','Status','Name','Group','Books','Age'],...shown.map(r=>[r.id,r.active?'Active':'Inactive',`${r.first} ${r.last}`,r.group,r.books,r.age])];const csv=rows.map(row=>row.map(cell=>`"${String(cell).replaceAll('"','""')}"`).join(',')).join('\n');const url=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));const a=document.createElement('a');a.href=url;a.download='readers-demo.csv';a.click();URL.revokeObjectURL(url)}
 function back() {
   setStage(-1)
   setDraft(null)
   setPhotoOpen(false)
   setPhotoRequested(false)
   setFinishing(false)
   setSaveStatus('idle')
 }

 function newReader() {
   let id = 10000 + rand(90000)
   while (readers.some(reader => reader.id === id)) id = 10000 + rand(90000)
   const sample = makeReader(15)
   setDraft({ ...sample, id, group: '', type: 'Selfservice', photoSrc: portraits[0] })
   setFilled([])
   setSelected(null)
   setRuleTab('Selfservice')
   setPhotoOpen(false)
   setPhotoRequested(false)
   setCrop(defaultCrop)
   setSaveStatus('idle')
   setFinishing(false)
   setStage(0)
 }

 const update = (key: 'available' | 'below' | 'cost' | 'group', value: string) => {
   setDraft(previous => previous ? { ...previous, [key]: value } : previous)
 }
 const fill = useCallback((field: string) => {
   setFilled(previous => previous.includes(field) ? previous : [...previous, field])
 }, [])

 function next() {
   if (stage < 2 && (!ready || saveStatus !== 'saved')) return
   if (stage < 3) {
     setStage(stage + 1)
     return
   }
   setSaveStatus('saving')
   setFinishing(true)
 }

 function openReader(id: number) {
   const reader = readers.find(entry => entry.id === id)
   if (!reader) return
   back()
   setSelected(reader)
 }

 function updateReaders(ids: readonly number[], patch: { active?: boolean; group?: string }) {
   const groupName = patch.group
   if (groupName && !allGroups.includes(groupName)) {
     setCustomGroups(previous => previous.includes(groupName) ? previous : [...previous, groupName])
   }
   setReaders(previous => previous.map(reader => ids.includes(reader.id) ? { ...reader, ...patch } : reader))
   setSelected(previous => previous && ids.includes(previous.id) ? { ...previous, ...patch } : previous)
 }

 function deleteReaders(ids: readonly number[]) {
   setReaders(previous => previous.filter(reader => !ids.includes(reader.id)))
   setSelected(previous => previous && ids.includes(previous.id) ? null : previous)
 }

 function restart() {
   back()
   setSelected(null)
   setFilter('All')
   setGroup(null)
   setFilterOpen(false)
   setSearch('')
   setSearchOpen(false)
   setCustomGroups([])
   setVersion(previous => previous + 1)
 }

 const close = onReturn ?? (() => location.assign('/projects/litres-library'))
 const workspace = <main id={guidedSelection === undefined && !onReturn ? "main-content" : undefined} className={s.app} data-theme={theme}
   data-guided-filter={guidedFilter ? '' : undefined} data-filter-compact={compact || undefined}>
   <header className={s.topbar}><img src="/images/litres/readers/logo.svg" alt="Litres" width="124" height="20"/><div className={s.topActions}><span className={s.library}><img src="/images/litres/readers/library.png" alt=""/>New York Public Library</span><button className={s.importButton} disabled title="Import LXS is unavailable in this demo"><Upload size={18} /> Import LXS</button><button className={s.primary} onClick={newReader}><Plus size={18}/> New Reader</button></div></header>
   <div className={s.workspace}><section className={s.list} aria-label="Readers"><div className={s.titleRow}><h1>Readers</h1><button className={s.download} onClick={download}><Download size={15}/> Download CSV</button></div><div className={s.tools}><div ref={filterWrap} className={s.filterWrap}>
      <button className={s.filter} data-target="reader-filter" aria-expanded={showFilter} onClick={() => setFilterOpen(!filterOpen)}>
        <Filter size={14} /> filter{(filter !== 'All' || group !== null) && <span className={s.filterCount}>{Number(filter !== 'All') + Number(group !== null)}</span>}
      </button>
      {showFilter && <div className={s.filterMenu}>
        <fieldset><legend>Status</legend>{['All', 'Active', 'Inactive'].map(value =>
          <button key={value} data-target={value === 'Active' ? 'reader-filter-active' : value === 'All' && guidedFilter ? 'reader-filter-all' : undefined}
            aria-pressed={filter === value} onClick={() => setFilter(value)}>{value === 'All' ? 'All statuses' : value}{filter === value && <Check size={13} />}</button>
        )}</fieldset>
        <fieldset><legend>Group</legend>{[null, ...allGroups].map(value =>
          <button key={value ?? 'all'} aria-pressed={group === value} onClick={() => setGroup(value)}>{value === null ? 'All groups' : value || 'No group'}{group === value && <Check size={13} />}</button>
        )}</fieldset>
      </div>}
    </div><div className={s.searchWrap}><button className={s.search} aria-expanded={searchOpen} onClick={()=>setSearchOpen(!searchOpen)}><Search size={14}/> {search||'Search'}</button>{searchOpen&&<div className={s.searchMenu}><button onClick={()=>{setSearch('');setSearchOpen(false)}}>All readers</button>{readers.map(r=><button key={r.id} onClick={()=>{setSearch(`${r.first} ${r.last}`);setSearchOpen(false)}}>{r.first} {r.last}</button>)}</div>}</div></div>
    <ReadersTable key={version} readers={shown} activeReaderId={selected?.id} groups={allGroups}
      onOpen={openReader} onUpdate={updateReaders} onDelete={deleteReaders} />
   </section><aside ref={panel} className={s.panel}><AnimatePresence mode="wait" initial={false}><motion.div className={s.panelInner} key={stage >= 0 ? 'wizard' : selected ? 'ticket' : 'empty'} initial={{opacity:0,x:reduced?0:8}} animate={{opacity:1,x:0}} exit={{opacity:0,x:reduced?0:-8}} transition={{duration:reduced?0:.18}}>
   {stage<0&&!selected&&<div className={s.empty}><img src="/images/litres/readers/empty.webp" alt=""/><h2>Choose Reader</h2><p>Or add a new one</p><button className={s.secondary} onClick={newReader}><Plus size={15}/> New Reader</button></div>}
   {stage>=0&&draft&&<><div className={s.panelHeading}><h2>New Reader</h2><button className={s.iconButton} aria-label="Close new reader" onClick={back}><X size={18}/></button></div><div className={s.card}><div className={s.progress} role="progressbar" aria-label="New reader progress" aria-valuemin={0}
      aria-valuemax={4} aria-valuenow={stage + 1}>
      {[0, 1, 2, 3].map(index => <span key={index}><i data-filled={index <= stage} /></span>)}
    </div>
    <ReaderStepFrame stage={stage} reduced={Boolean(reduced)}>
    {stage<2&&<><h3>Add Details</h3><p>Please kindly ask for an official ID before creating an account. Use the information exactly as it appears in the document to ensure everything is accurate and properly registered.</p><div className={s.fields} data-contact={stage === 1 || undefined}>
      {fields.map(field => <DemoField key={field} label={{ first: 'First Name', last: 'Second Name', email: 'Email', phone: 'Phone' }[field]}
        sample={draft[field]} phone={field === 'phone'} reduced={Boolean(reduced)} onComplete={() => fill(field)} />)}
    </div>
    {stage === 1 && <label className={s.groupCheck}><input type="checkbox" checked={Boolean(draft.group)} onChange={event => update('group', event.target.checked ? groups[1] : '')} /> Part of the group</label>}</>}
    {stage===2&&<><h3>Readers Rules</h3><p>Please kindly ask for an official ID before creating an account. Use the information exactly as it appears in the document to ensure everything is accurate and properly registered.</p><div className={s.tabs} role="group" aria-label="Reader rules">
      {clientTypes.map(type => <button key={type} type="button" aria-pressed={ruleTab === type} onClick={() => setRuleTab(type)}>
        {type}{ruleTab === type && <motion.span className={s.tabIndicator} layoutId={reduced ? undefined : 'reader-rule-tab'}
          transition={{ duration: reduced ? 0 : .22, ease: [.23, 1, .32, 1] }} />}
      </button>)}
    </div><Choices label="Books Available" values={choiceValues.available} value={draft.available} onChange={v=>update('available',v)}/><Choices label="If below required amount" values={choiceValues.below} value={draft.below} onChange={v=>update('below',v)}/>{ruleTab==='Selfservice'&&<Choices label="Cost up to" values={choiceValues.cost} value={draft.cost} onChange={v=>update('cost',v)}/>}</>}
    {stage === 3 && <ReaderPhotoStep src={draft.photoSrc} crop={crop} open={photoOpen} requested={photoRequested} busy={finishing}
      onCapture={() => { setCrop(defaultCrop); setPhotoOpen(true); setPhotoRequested(false) }}
      onRequest={() => setPhotoRequested(true)} onChange={setCrop} onRemove={() => setPhotoOpen(false)} />}
    </ReaderStepFrame></div>
    <div className={s.footer}>
      <span className={s.saved} role="status" data-saving={saveStatus === 'saving' || undefined}>
        {saveStatus === 'saving' ? <><LoaderCircle size={14} className={s.spinner} /> Saving…</>
          : saveStatus === 'saved' ? <><ReaderIcon name="saved" size={14} /> Saved</> : null}
      </span>
      <button className={s.secondary} onClick={back}>Cancel</button>
      <button className={s.primary} disabled={finishing || stage < 2 && (!ready || saveStatus !== 'saved') || stage === 3 && !photoOpen && !photoRequested} onClick={next}>
        Next <ReaderIcon name="next" size={20} />
      </button>
    </div></>}
   {stage < 0 && selected && <ReaderTicket key={selected.id} reader={selected}
     dirty={ticketDirty}
     saved={saveStatus === 'saved'}
     onChange={patch => { setSelected({ ...selected, ...patch }); setSaveStatus('idle') }}
     onSave={() => {
       setReaders(previous => previous.map(reader => reader.id === selected.id ? selected : reader))
       setSaveStatus('saved')
     }}
     onClose={() => setSelected(null)} />}
   </motion.div></AnimatePresence></aside></div>
  </main>
 return guidedSelection === undefined ? <DemoShell label="LitRes readers demo" theme={theme} onTheme={setTheme} onRestart={restart} onReturn={close}>{workspace}</DemoShell> : workspace
}
