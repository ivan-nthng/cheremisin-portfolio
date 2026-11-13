'use client'

import { useCallback, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from 'react'
import { RepeatReveal } from '@/components/portfolio/RepeatReveal'
import editorial from '@/components/portfolio/case-story/case-editorial.module.css'
import { Maximize2 } from 'lucide-react'
import { Lightbox } from '@/components/Lightbox'
import type { SceneId } from '@/components/citymobil-features/scenes'
import { useReducedMotion } from '@/components/citymobil-features/stageshow/reduced-motion'
import styles from './process.module.css'
import caseStyles from './case.module.css'
import CaseSystem from './CaseSystem'
import CaseFeatures from './CaseFeatures'
import { CaseDetails, CaseFeatureGrid, CaseFeatureSlot } from '@/components/portfolio/case-story/CaseDetails'
import layout from '@/components/portfolio/case-story/case-draft.module.css'

// Approved Figma2967:555/643 copy, with independent paragraph poses from3354:1313/1413.
const chapters = [
  { id: 'work', title: 'Understand the work, earn the trust', paragraphs: [
    'Support demand was growing beyond the team’s capacity, and hiring in proportion was expensive. I spent several weeks working alongside operators to understand their everyday difficulties. The emotional strain of support work came with the cognitive effort of navigating a difficult interface.',
    'Someone from head office could be perceived as a supervisor, making it harder to speak openly about difficulties. Repeated conversations helped me earn trust and interpret feedback in that context.',
    'Staying in touch gave operators a continuing voice as the product evolved.',
  ] },
  { id: 'workspace', title: 'Bring the next step into context', paragraphs: [
    'My goal was more capacity and easier onboarding with the same team. I brought the conversation, trip information and relevant tools into one workspace.',
    'Scripts provided guidance for new operators; quick actions offered a direct path for experienced ones.',
    'Trip details, route inspection, communication and handoff were designed to keep the request’s context close to each decision.',
  ] },
  { id: 'system', title: 'Make the interface a system', paragraphs: [
    'The workspace uses reusable components and states to give different support tasks a shared interface language.',
    'The Citymobil component system brings those patterns together, from everyday controls to contextual panels.',
    'The intention is a consistent foundation that can evolve with the workflow.',
  ] },
] as const

const fragments: { id: SceneId; label: string; ratio: number }[] = [
  { id: 'issue', label: 'Request', ratio: 375 / 600 },
  { id: 'actions', label: 'Actions', ratio: 450 / 600 },
  { id: 'chat', label: 'Conversation', ratio: 375 / 640 },
  { id: 'details', label: 'Trip details', ratio: 375 / 640 },
  { id: 'map', label: 'Map', ratio: 375 / 600 },
]

const beforeImages = [
  { id: 'dispatch', file: 'before-01-dispatch-en.png', label: 'Dispatch and order interface', width: 1529, height: 855 },
  { id: 'playbook', file: 'before-02-playbook-en.png', label: 'Child-seat operator playbook', width: 1359, height: 861 },
  { id: 'templates', file: 'before-03-templates-en.png', label: 'Case-description templates', width: 1640, height: 1025 },
] as const
const beforeSource = (file: string) => `/images/citymobil/process/before/${file}`

function BeforeThumbnail({ item, onOpen }: { item: typeof beforeImages[number]; onOpen: (button: HTMLButtonElement) => void }) {
  const hint = useRef<HTMLSpanElement>(null)
  const gesture = useRef({ x: 0, y: 0, moved: false, scroll: 0 })
  const hide = () => { hint.current?.removeAttribute('data-hover') }
  function place(event: React.PointerEvent<HTMLButtonElement>) {
    if (event.pointerType === 'touch' || !matchMedia('(hover:hover) and (pointer:fine)').matches || !hint.current) return
    const rect = event.currentTarget.getBoundingClientRect(), size = hint.current.offsetWidth
    const right = Math.min(rect.width, innerWidth - rect.left) - 8, bottom = Math.min(rect.height, innerHeight - rect.top) - 8
    const x = event.clientX - rect.left, y = event.clientY - rect.top
    const left = Math.max(8, 8 - rect.left), top = Math.max(8, 8 - rect.top)
    hint.current.style.transform = `translate(${Math.max(left, Math.min(x + 16 + size <= right ? x + 16 : x - size - 16, right - size))}px,${Math.max(top, Math.min(y + 16 + size <= bottom ? y + 16 : y - size - 16, bottom - size))}px)`
    hint.current.setAttribute('data-hover', '')
  }
  return <button type="button" className={styles.archiveThumbnail} aria-label={`Expand ${item.label.toLowerCase()}`} onPointerEnter={place} onPointerLeave={hide} onBlur={hide}
    onPointerDown={event => { hide(); gesture.current = { x: event.clientX, y: event.clientY, moved: false, scroll: event.currentTarget.closest('[role=region]')?.scrollLeft ?? 0 } }}
    onPointerMove={event => { place(event); if (Math.hypot(event.clientX - gesture.current.x, event.clientY - gesture.current.y) > 8) gesture.current.moved = true }}
    onPointerCancel={() => { hide(); gesture.current.moved = true }}
    onClick={event => {
      const scroll = event.currentTarget.closest('[role=region]')?.scrollLeft ?? 0
      if (event.detail && (gesture.current.moved || Math.abs(scroll - gesture.current.scroll) > 2)) return
      hide(); onOpen(event.currentTarget)
    }}>
    <img src={beforeSource(item.file)} width={item.width} height={item.height} alt={`${item.label}; English translation of an archival screenshot with identifying details masked`} draggable={false}/>
    <span ref={hint} className={styles.expandHint} aria-hidden="true"><Maximize2 size={18}/></span>
  </button>
}

function BeforeGallery({ reduced, active }: { reduced: boolean; active: boolean }) {
  const [selected, setSelected] = useState<number | null>(null)
  const opener = useRef<HTMLButtonElement>(null)
  useLayoutEffect(() => { if (!active) setSelected(null) }, [active])
  const item = beforeImages[selected ?? 0]
  return <>
    <Gallery id="before" reduced={reduced} items={beforeImages.map((item, index) => ({ id: item.id, label: item.label, ratio: item.width / item.height, content: <BeforeThumbnail item={item} onOpen={button => { opener.current = button; setSelected(index) }}/> }))}/>
    <p className={styles.archiveCaption}>Translated archival material · Not current policy</p>
    <Lightbox isOpen={active && selected !== null} onClose={() => setSelected(null)} image={beforeSource(item.file)} alt={`${item.label}; translated archival screenshot with identifying details masked`} caption={`${item.label} · Translated archival material, not current policy`} gallery={{ index: selected ?? 0, count: beforeImages.length }} returnFocus={opener} hasPrevious={selected !== null && selected > 0} hasNext={selected !== null && selected < beforeImages.length - 1} onPrevious={() => setSelected(index => index === null ? null : Math.max(0, index - 1))} onNext={() => setSelected(index => index === null ? null : Math.min(beforeImages.length - 1, index + 1))}/>
  </>
}

function Chapter({ chapter, children, entry, reduced, result = false }: { result?: boolean; chapter: typeof chapters[number]; children: ReactNode; entry?: ReactNode; reduced: boolean }) {
  const track = useRef<HTMLDivElement>(null), copy = useRef<HTMLDivElement>(null)
  const [paragraph, setParagraph] = useState(0)
  const [displayed, setDisplayed] = useState(0)
  const [entrance, setEntrance] = useState(0)
  const [exiting, setExiting] = useState(false)
  const latest = useRef(paragraph); latest.current = paragraph
  useLayoutEffect(() => {
    if (reduced) { setDisplayed(paragraph); setExiting(false); return }
    if (paragraph !== displayed) setExiting(true)
  }, [paragraph, displayed, reduced])
  useLayoutEffect(() => {
    if (!exiting) return
    const current = copy.current!.querySelector<HTMLElement>('[data-active=true]')!
    // Finish the outgoing paragraph before selecting the latest requested one.
    // A reversal can arrive before the new paragraph has begun to appear.
    // Do not hold an already invisible paragraph for another full exit.
    const style = getComputedStyle(current), opacity = Number(style.opacity)
    const time = style.getPropertyValue('--paragraph-duration').trim()
    const duration = opacity === 0 ? 0 : (parseFloat(time) || 160) * (time.endsWith('s') && !time.endsWith('ms') ? 1000 : 1)
    const animation = current.animate([{ opacity }, { opacity: 0 }], { duration, easing: style.getPropertyValue('--paragraph-easing').trim(), fill: 'forwards' })
    let live = true
    animation.finished.then(() => { if (live) { setDisplayed(latest.current); setEntrance(value => value + 1); setExiting(false) } }).catch(() => {})
    return () => { live = false; animation.cancel() }
  }, [exiting])
  useLayoutEffect(() => {
    const node = track.current!, text = copy.current!
    let frame = 0, measureFrame = 0
    const read = () => {
      frame = 0
      const top = node.getBoundingClientRect().top
      // The last chapter can run out of document before its sticky track ends.
      // Divide only the reading travel that the visitor can actually reach.
      const remaining = document.documentElement.scrollHeight - innerHeight - (top + scrollY - 68)
      const travel = Math.max(1, Math.min(node.offsetHeight - text.offsetHeight, remaining))
      const offset = 68 - top
      setParagraph(Math.min(2, Math.max(0, Math.floor(offset / (travel / 3)))))
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(read) }
    const measure = () => {
      measureFrame = 0
      // Preserve a stable slot while allowing enlarged text/short screens to remain reachable.
      node.style.setProperty('--copy-height', `${text.offsetHeight}px`)
      schedule()
    }
    const observer = new ResizeObserver(() => { if (!measureFrame) measureFrame = requestAnimationFrame(measure) }); observer.observe(text); observer.observe(node)
    measure(); window.addEventListener('scroll', schedule, { passive: true }); window.addEventListener('resize', schedule)
    return () => { cancelAnimationFrame(frame); cancelAnimationFrame(measureFrame); observer.disconnect(); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule) }
  }, [reduced])
  return <section className={`${styles.chapter} ${result ? styles.resultChapter : ''}`} data-process-chapter={chapter.id} data-paragraph={paragraph + 1} aria-labelledby={`process-${chapter.id}`}>
    <div ref={track} className={styles.textTrack} hidden={result}><div ref={copy} className={styles.copy}>
      <h2 id={`process-${chapter.id}`}>{chapter.title}</h2>
      <div className={styles.paragraphs} data-exiting={exiting} aria-hidden={!reduced || undefined}>{chapter.paragraphs.map((text, index) => <p key={text + entrance} data-active={displayed === index}>{text}</p>)}</div>
      {!reduced && <div className={caseStyles.srOnly}>{chapter.paragraphs.map(text => <p key={text}>{text}</p>)}</div>}
      {entry}
    </div></div>
    <div className={styles.mediaColumn}>{children}</div>
  </section>
}

type GalleryItem = { id: string; label: string; ratio: number; content: ReactNode }
function Gallery({ id, items, reduced, result = false, viewportRef }: { result?: boolean; id: string; items: GalleryItem[]; reduced: boolean; viewportRef?: RefObject<HTMLDivElement | null> }) {
  const localViewport = useRef<HTMLDivElement>(null)
  const viewport = viewportRef ?? localViewport
  const [position, setPosition] = useState({ index: 0, start: true, end: false })
  useLayoutEffect(() => {
    const node = viewport.current!
    let frame = 0
    const read = () => {
      frame = 0
      const left = node.getBoundingClientRect().left
      let closest = Infinity, index = 0
      const figures = [...node.querySelectorAll<HTMLElement>('[data-gallery-figure]')]
      figures.forEach((figure, i) => {
        const rect = figure.getBoundingClientRect(), distance = rect.left - left
        // Approved exit:45% outside LEFT =>35% opacity. Only the image fades.
        const opacity = reduced || result ? 1 : Math.max(0, 1 + Math.min(0, distance) / rect.width * (0.65 / 0.45))
        figure.querySelector<HTMLElement>('[data-gallery-image]')!.style.opacity = String(opacity)
        if (Math.abs(distance) < closest) { closest = Math.abs(distance); index = i }
      })
      const end = node.scrollWidth - node.clientWidth - node.scrollLeft <= 2
      if (end) index = items.length - 1
      setPosition(previous => previous.index === index && previous.start === (node.scrollLeft <= 2) && previous.end === end ? previous : { index, start: node.scrollLeft <= 2, end })
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(read) }
    const observer = new ResizeObserver(schedule); observer.observe(node)
    node.addEventListener('scroll', schedule, { passive: true }); read()
    return () => { cancelAnimationFrame(frame); observer.disconnect(); node.removeEventListener('scroll', schedule) }
  }, [items.length, reduced, result, viewport])
  function move(direction: number, immediate = false) {
    const node = viewport.current!, figures = [...node.querySelectorAll<HTMLElement>('[data-gallery-figure]')]
    const left = node.scrollLeft, max = node.scrollWidth - node.clientWidth
    const inset = parseFloat(getComputedStyle(node.firstElementChild!).paddingLeft)
    const points = figures.map(figure => Math.max(0, Math.min(max, figure.offsetLeft - inset)))
    const next = direction > 0 ? points.find(point => point > left + 2) ?? max : points.findLast(point => point < left - 2) ?? 0
    node.scrollTo({ left: next, behavior: reduced || immediate ? 'instant' : 'smooth' })
  }
  return <div className={styles.gallery} data-process-gallery={id}>
    <div ref={viewport} id={`process-gallery-${id}`} data-feature-gallery-viewport={id === 'fragments' || undefined} className={result ? styles.resultViewport : styles.viewport} tabIndex={result ? undefined : 0} role={result ? undefined : "region"} aria-label={`${id === 'fragments' ? 'Support workspace' : id === 'before' ? 'Before archive' : 'Component system'} image gallery`} onKeyDown={event => {
      if (event.target !== event.currentTarget || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1, true) }
    }}>
      <CaseFeatureGrid editorial={false} tracks={id === 'fragments' ? result : undefined} className={result ? undefined : styles.track}>{items.map((item, index) => <CaseFeatureSlot editorial={false} key={item.id} data-gallery-figure={item.id} data-case-feature={result ? item.id : undefined} span={result ? index === 0 ? 'two-thirds' : 'third' : undefined} className={result ? undefined : styles.figure} style={{ '--media-ratio': item.ratio } as CSSProperties}>
        <div className={result ? undefined : styles.image} data-gallery-image>{item.content}</div>
        <figcaption className={caseStyles.srOnly}>{item.label} · {index + 1}/{items.length}</figcaption>
      </CaseFeatureSlot>)}</CaseFeatureGrid>
    </div>
    <div className={styles.controls} hidden={result}><span className={caseStyles.srOnly} role="status" aria-live="polite">{items[position.index].label}, {position.index + 1} of {items.length}</span><div>
      <button type="button" aria-label="Previous gallery image" aria-controls={`process-gallery-${id}`} aria-disabled={position.start} onClick={() => { if (!position.start) move(-1) }}>←</button>
      <button type="button" aria-label="Next gallery image" aria-controls={`process-gallery-${id}`} aria-disabled={position.end} onClick={() => { if (!position.end) move(1) }}>→</button>
    </div></div>
  </div>
}

export default function CaseProcess({ view, review, suspended, onDemo, launch, galleryEntry }: { view: string; review: boolean; suspended: boolean; onDemo: () => void; launch: RefObject<HTMLButtonElement | null>; galleryEntry: RefObject<HTMLDivElement | null> }) {
  const result = view === 'result'
  const root = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const [expanded, setExpanded] = useState<SceneId | null>(null)
  const [preparation, setPreparation] = useState<Partial<Record<SceneId, 'ready' | 'failed'>>>({})
  const nextPreparation = reduced ? undefined : fragments.find(item => !preparation[item.id])?.id
  const settlePreparation = useCallback((scene: SceneId, state: 'ready' | 'failed') => {
    setPreparation(current => current[scene] === state ? current : { ...current, [scene]: state })
  }, [])
  useLayoutEffect(() => { setExpanded(null) }, [view, suspended])
  useLayoutEffect(() => {
    let frame = 0
    const measure = () => { frame = 0; root.current?.style.setProperty('--process-viewport', `${document.documentElement.clientWidth}px`) }
    const observer = new ResizeObserver(() => { if (!frame) frame = requestAnimationFrame(measure) }); observer.observe(document.documentElement); measure()
    return () => { observer.disconnect(); cancelAnimationFrame(frame) }
  }, [])
  return <CaseDetails editorial={result} ref={root} className={result ? layout.trackSection : styles.page} data-persistent-scenes data-layout={view} data-reduced={reduced}>
    <div hidden={result}><h1 className={caseStyles.srOnly}>Citymobil · Process</h1>
    <Chapter chapter={chapters[0]} reduced={reduced}><BeforeGallery reduced={reduced} active={!result && !suspended}/></Chapter></div>
    {result &&
      <RepeatReveal className={editorial.detailsIntro}><h2 className={editorial.sectionTitle}>Interactive demos</h2></RepeatReveal>
    }
    <Chapter chapter={chapters[1]} reduced={reduced} result={result} entry={
      <button ref={launch} type="button" className={styles.desktopEntry} onClick={onDemo}>Try the interactive demo ↗</button>
    }>
      <Gallery id="fragments" viewportRef={galleryEntry} reduced={reduced} result={result} items={fragments.map(item => ({ ...item, content: <CaseFeatures scene={item.id} gallery={!result} reduced={reduced} suspended={suspended || expanded !== null && expanded !== item.id} expanded={expanded === item.id} prepare={preparation[item.id] === 'ready' || preparation[item.id] === 'failed' || nextPreparation === item.id} preparing={nextPreparation === item.id} prepared={preparation[item.id] === 'ready'} preparationFailed={preparation[item.id] === 'failed'} onPrepared={() => settlePreparation(item.id, 'ready')} onPreparationFailed={() => settlePreparation(item.id, 'failed')} onExpand={() => setExpanded(item.id)} onClose={() => setExpanded(null)}/> }))}/>
    </Chapter>
    <div hidden={result}><Chapter chapter={chapters[2]} reduced={reduced} entry={<a className={styles.sourceLink} href="https://www.figma.com/design/a1FIpM2QJ0y79EO170WQDG/CityMobil-Preview" target="_blank" rel="noreferrer">CityMobil component library ↗</a>}>
      <Gallery id="system" reduced={reduced} items={[
        { id: 'buttons', label: 'Native button states', ratio: 375 / 600, content: <CaseSystem example="buttons"/> },
        { id: 'inputs', label: 'Native input states', ratio: 375 / 600, content: <CaseSystem example="inputs"/> },
        { id: 'menu', label: 'Native action selection', ratio: 450 / 600, content: <CaseSystem example="actions"/> },
      ]}/>
    </Chapter>
    {review && <footer className={styles.reviewScope}><p>Local preview · Process uses fictional native demonstrations and source component renders.</p></footer>}</div>
  </CaseDetails>
}
