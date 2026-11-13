'use client'

import type { CSSProperties, KeyboardEvent, SyntheticEvent } from 'react'
import { useCallback, useEffect, useId, useLayoutEffect, useReducer, useRef, useState } from 'react'
import { citymobilDemoReducer, citymobilScenarios, initialDemoState, preparedReply, scheduleDemoCall, scheduleDemoReply, scheduleDemoSuggestion, conversationModes, citymobilTeam, answerLabels, incomePrograms, composerShortcut, relatedCases, activeDemoTrip, lostNextStep, lostReplyAllowed, lostTrips, lostDemoClock, lostMessageClock, composerNextAction, lostWalkthrough, pickupNextStep, pickupWalkthrough, pickupReplyAllowed, pickupSendAllowed, incomeNextStep, incomeReplyAllowed, incomeSendAllowed, incomeCompleteAllowed, resolveLostTrackTrip } from '@/lib/portfolio/client/citymobil-demo'
import type { DemoAction, DemoAttachment, Recipient, ScenarioId, ConversationMode } from '@/lib/portfolio/client/citymobil-demo'
import { citymobilAssets as assets } from './citymobil-demo/assets'
import styles from './citymobil-demo/preview.module.css'
import RouteSummary from './citymobil-demo/RouteSummary'
import CitymobilTrack from './citymobil-demo/CitymobilTrack'
import { useComposerCaret } from './citymobil-demo/useComposerCaret'
import NativeAsset, { type AssetName } from './citymobil-demo/NativeAsset'
import CitymobilDriverInfo from './citymobil-demo/CitymobilDriverInfo'
import type { OrderTab } from './citymobil-demo/CitymobilPaymentCard'
import DemoMotion, { DemoTabContent, demoEase, demoMotionUpdate } from './citymobil-demo/DemoMotion'
import { AnimatePresence, useReducedMotion } from 'framer-motion'
import * as motion from 'framer-motion/client'
import DemoShell, { type DemoScenario } from './portfolio/demo/DemoShell'
import { caseDemoDesktopQuery } from './portfolio/case-story/case-demo-viewport'
import { demoNavigationShortcut, demoLostTrips, demoIncomeProgram, demoRequestInstant, demoDayLabel, formatDemoDate, formatDemoTime, formatDemoDateTime } from '@/lib/portfolio/client/citymobil-demo'
import { CitymobilLostTrips, CitymobilOrderDetails } from './citymobil-demo/CitymobilLostTrips'
import { Lightbox } from './Lightbox'
import { CitymobilActionGroup, CitymobilIssueActions, CitymobilSearchInput } from './citymobil-demo/CitymobilControls'

type PreviewProps = { illustratedCaret?: boolean; paletteFromBottom?: boolean; onReturn?: () => void; nativeFragment?: boolean; nativeParked?: boolean; nativeInteractive?: boolean; localBasemap?: boolean; literalDraft?: boolean }
export type CitymobilGuidedStep = 'conversation' | 'scripts' | 'trip'

const unavailable = 'Inactive in this local demo; no service is connected.'
const demoScenarios = [
  { id: 'lost', label: 'Lost item' },
  { id: 'pickup', label: 'Pickup mix-up' },
  { id: 'income', label: 'Guaranteed income' },
] satisfies readonly DemoScenario<ScenarioId>[]
const menuGroups = [
  { title: 'AI Prediction', items: ['Open Trip Track', 'Refund the Extra Charge', 'Call Driver', 'Payment Actions'] },
  { title: 'Favorite', items: ['Close order', 'Create order', 'Manage payment'] },
]

/** Every full-workspace consumer shares this entry boundary, including legacy pages.
 * Authored fragments explicitly opt in only inside their native iframe. */
export default function CityMobileInteractivePreview(props: PreviewProps = {}) {
  const [workspace, setWorkspace] = useState(false)
  const [imageOpen, setImageOpen] = useState(false)
  const imageEntry = useRef<HTMLButtonElement>(null)
  const wasWorkspace = useRef(false)
  useLayoutEffect(() => {
    const media = matchMedia(caseDemoDesktopQuery)
    const update = () => setWorkspace(media.matches || Boolean(props.nativeFragment && parent !== window && innerWidth >= 802))
    update(); media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [props.nativeFragment])
  useLayoutEffect(() => {
    if (wasWorkspace.current && !workspace) imageEntry.current?.focus({ preventScroll: true })
    if (workspace) setImageOpen(false)
    wasWorkspace.current = workspace
  }, [workspace])
  if (workspace) return <CitymobilWorkspace {...props}/>
  return <div className={styles.staticPreview}>
    <button ref={imageEntry} className={styles.staticImage} type="button" aria-label="View Citymobil workspace image fullscreen" onClick={() => setImageOpen(true)}>
      <img draggable={false} style={{ userSelect: 'none', WebkitUserSelect: 'none' }} src="/images/citymobil/case/poster-mobile.webp" alt="Citymobil support workspace" width={390} height={656}/>
    </button>
    <Lightbox preventMediaSelection isOpen={imageOpen} onClose={() => setImageOpen(false)} image="/images/citymobil/case/poster-mobile.webp" alt="Citymobil support workspace — static image"/>
  </div>
}

export function CitymobilWorkspace({ illustratedCaret = false, paletteFromBottom = false, nativeFragment = false, nativeParked = false, nativeInteractive = false, localBasemap = false, literalDraft = false, onReturn, guidedStep }: PreviewProps & { guidedStep?: CitymobilGuidedStep }) {
  // The outer responsive gate mounts this workspace only after hydration. Authored cards opt out.
  const [state, reduce] = useReducer(citymobilDemoReducer, undefined, () => initialDemoState('light', 'lost', nativeFragment ? null : Date.now()))
  const dispatch = useCallback((action: DemoAction) => reduce(nativeFragment ? action : { ...action, at: Date.now() }), [nativeFragment])
  const [menu, setMenu] = useState(false)
  const [query, setQuery] = useState('')
  const [selection, setSelection] = useState(0)
  const [itinerary, setItinerary] = useState(false)
  const [notice, setNotice] = useState('')
  const [toolMenu, setToolMenu] = useState<'cases' | 'reply' | 'recipient' | 'attach' | 'order-driver' | null>(null)
  const [teamQuery, setTeamQuery] = useState('')
  const scriptCaret = useRef(false)
  const [toolPosition, setToolPosition] = useState({ left: 16, top: 80 })
  const [promo, setPromo] = useState(false)
  const [payment, setPayment] = useState(false)
  const [previewTripId, setPreviewTripId] = useState<string | null>(null)
  useLayoutEffect(() => {
    if (!guidedStep) return
    dispatch({ type: 'panel', value: guidedStep === 'scripts' ? 'scripts' : 'info' })
    setPreviewTripId(guidedStep === 'trip' ? 'latest' : null)
  }, [dispatch, guidedStep])
  const [completionVisible, setCompletionVisible] = useState(false)
  const detailsClose = useRef<HTMLButtonElement>(null)
  const detailsTrigger = useRef<HTMLElement | null>(null)
  const [orderTab, setOrderTab] = useState<OrderTab>('details')
  const [trackTripId, setTrackTripId] = useState<string | null>(null)
  const [incomeTab, setIncomeTab] = useState<'rides' | 'time'>('rides')
  const toolPopup = useRef<HTMLDivElement>(null)
  const toolTrigger = useRef<HTMLElement | null>(null)
  const composerInput = useRef<HTMLTextAreaElement>(null)
  const composerModeButton = useRef<HTMLButtonElement>(null)
  const hangupButton = useRef<HTMLButtonElement>(null)
  const restoreComposerFocus = useRef(false)
  const paymentClose = useRef<HTMLButtonElement>(null)
  const paymentTrigger = useRef<HTMLElement | null>(null)
  const paletteDialog = useRef<HTMLDialogElement>(null)
  const search = useRef<HTMLInputElement>(null)
  const lastMenuTrigger = useRef<HTMLElement | null>(null)
  const tripTrackButton = useRef<HTMLButtonElement>(null)
  const itineraryBack = useRef<HTMLButtonElement>(null)
  const itineraryTrigger = useRef<HTMLElement | null>(null)
  const wasItinerary = useRef(false)
  const paletteShown = useRef(false)
  const menuRef = useRef(menu); menuRef.current = menu
  const infoScroll = useRef<HTMLDivElement>(null)
  const threadScroll = useRef<HTMLDivElement>(null)
  const conversation = useRef<HTMLElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const panelScroll = useRef({ info: 0, scripts: 0 })
  const uid = useId()
  const dark = state.theme === 'dark'
  const reducedMotion = useReducedMotion()
  const trip = activeDemoTrip(state)
  const lost = state.scenario === 'lost'
  const pickup = state.scenario === 'pickup'
  const income = state.scenario === 'income'
  const completed = lost && state.lost.stage === 'completed' || pickup && state.pickup.stage === 'completed' || income && state.income.stage === 'completed'
  const canCall = !lost || state.lost.stage === 'call-driver' && state.lost.selectedTripId === 'latest'
  const canConnect = !lost || state.lost.stage === 'connect-rider' && state.lost.consent && !state.lost.shared
  const previewTrip = demoLostTrips(state.sessionStartedAt).find(trip => trip.id === previewTripId)
  const orderOpen = lost ? Boolean(previewTrip) : payment && state.scenario === 'pickup'
  const incomeOpen = !itinerary && payment && state.scenario === 'income'
  const sameOrderDriver = !lost || Boolean(previewTrip && previewTrip.id === state.lost.selectedTripId)
  const canOrderCall = sameOrderDriver && canCall && state.call.phase === 'idle'
  const canOrderMessage = sameOrderDriver && !completed
  const canSend = !(state.mode === 'reply' && (state.pendingReply || state.localDraft)) && (state.mode === 'connect' ? !lost && Boolean(state.linkCandidate) : state.mode === 'reply' && lost ? lostReplyAllowed(state) && state.draft === preparedReply(state) : state.mode === 'reply' && pickup ? pickupSendAllowed(state) : state.mode === 'reply' && income ? incomeSendAllowed(state) : Boolean(state.draft.trim() || state.attachments.length))
  const recipientName = trip[state.recipient]
  const script = preparedReply(state)
  const composerHint = composerNextAction(state)
  // Display guidance also covers eligible steps; it must not change input eligibility.
  const composerGuidance = composerHint ?? (lost ? lostNextStep(state) : pickup ? pickupNextStep(state) : incomeNextStep(state))
  const walkthroughTitle = lost ? 'Lost item walkthrough' : 'Pickup mix-up walkthrough'
  const walkthroughSteps = lost ? lostWalkthrough(state) : pickupWalkthrough(state)
  const nextStep = lost ? lostNextStep(state) : pickup ? pickupNextStep(state) : incomeNextStep(state)
  const nativeDraft = Boolean(composerHint) || state.localDraft
  const editDraft = nativeDraft || literalDraft
  const nativeInputMode = useRef(nativeInteractive)
  nativeInputMode.current = nativeInteractive
  const hasPreparedPreview = state.suggestion === 'ready' && !nativeDraft
  const selectedTeam = citymobilTeam.find(person => person.id === state.teamId)!
  const program = demoIncomeProgram(state.incomeProgram, state.sessionStartedAt)
  const requestAt = state.sessionStartedAt == null ? null : demoRequestInstant(state.scenario, state.sessionStartedAt)
  const conversationNow = Math.max(state.sessionStartedAt ?? 0, ...state.messages.map(message => message.at ?? 0))
  const requestClock = requestAt == null ? lostDemoClock : { day: formatDemoDate(requestAt), time: formatDemoTime(requestAt), timezone: 'Europe/Lisbon' }
  const visibleMessages = state.messages.filter(message => message.recipient === state.recipient)
  const groups = lost ? [{ title: 'Trip actions', items: ['Open Trip Track', 'Call Driver', 'Payment Actions', 'Connect'] }] : menuGroups
  const filtered = groups.flatMap(group => group.items).filter(item => item.toLowerCase().includes(query.toLowerCase()))
  const icon = (name: string, plain = false) => <NativeAsset name={('workspace/' + name) as AssetName} dark={dark} plain={plain} />
  const guided = (name: string, plain = false) => <NativeAsset name={('guided/' + name) as AssetName} dark={dark} plain={plain} />

  const focusElement = useCallback((target: HTMLElement | null) => {
    const rect = target?.getBoundingClientRect()
    target?.focus({ preventScroll: nativeFragment || Boolean(rect && rect.top >= 0 && rect.bottom <= window.innerHeight) })
  }, [nativeFragment])
  const revealElement = useCallback((target: Element | null | undefined) => {
    if (!target) return
    if (!nativeFragment) { target.scrollIntoView({ block: 'nearest', inline: 'nearest' }); return }
    // Scripted fragments reveal their own panels, never iframe ancestors.
    for (let parent = target.parentElement; parent && parent !== document.body; parent = parent.parentElement) {
      const style = getComputedStyle(parent), rect = target.getBoundingClientRect(), bounds = parent.getBoundingClientRect()
      if (/(auto|scroll)/.test(style.overflowY)) parent.scrollTop += rect.top < bounds.top ? rect.top - bounds.top : Math.max(0, rect.bottom - bounds.bottom)
      if (/(auto|scroll)/.test(style.overflowX)) parent.scrollLeft += rect.left < bounds.left ? rect.left - bounds.left : Math.max(0, rect.right - bounds.right)
    }
  }, [nativeFragment])

  useEffect(() => {
    if (!nativeParked && state.suggestion === 'loading') return scheduleDemoSuggestion(state.revision, dispatch)
  }, [state.suggestion, state.revision, nativeParked, dispatch])
  useEffect(() => { if (!nativeParked) return scheduleDemoReply(state.pendingReply, dispatch) }, [state.pendingReply, nativeParked, dispatch])
  useEffect(() => { if (!nativeParked) return scheduleDemoCall({ phase: state.call.phase, run: state.call.run }, dispatch) }, [state.call.phase, state.call.run, nativeParked, dispatch])
  useEffect(() => {
    panelScroll.current = { info: 0, scripts: 0 }
    if (infoScroll.current) infoScroll.current.scrollTop = 0
    if (threadScroll.current) threadScroll.current.scrollTop = 0
  }, [state.scenario])
  useEffect(() => {
    if (!toolMenu) return
    const firstEnabled = toolPopup.current?.querySelector<HTMLButtonElement>('button:not(:disabled)')
    const initialFocus = firstEnabled ?? toolPopup.current
    initialFocus?.focus({ preventScroll: true })
    function outside(event: PointerEvent) {
      if (event.target instanceof Node && !toolPopup.current?.contains(event.target) && !toolTrigger.current?.contains(event.target)) setToolMenu(null)
    }
    document.addEventListener('pointerdown', outside)
    return () => document.removeEventListener('pointerdown', outside)
  }, [toolMenu])
  useEffect(() => {
    if (payment) focusElement(paymentClose.current)
  }, [payment, focusElement])

  useLayoutEffect(() => {
    if (!toolMenu) return
    const position = () => {
      const trigger = toolTrigger.current, popup = toolPopup.current
      if (!trigger?.isConnected || !popup) return
      const rect = trigger.getBoundingClientRect()
      const width = popup.offsetWidth, height = popup.offsetHeight
      const left = Math.max(12, Math.min(rect.left, window.innerWidth - width - 12))
      const top = Math.max(12, Math.min(window.innerHeight - height - 12, rect.bottom + height + 4 <= window.innerHeight ? rect.bottom + 4 : rect.top - height - 4))
      setToolPosition(current => current.left === left && current.top === top ? current : { left, top })
    }
    position()
    const observer = new ResizeObserver(position)
    for (const element of [toolPopup.current, toolTrigger.current, conversation.current, infoScroll.current]) if (element) observer.observe(element)
    window.addEventListener('resize', position)
    window.addEventListener('scroll', position, true)
    return () => { observer.disconnect(); window.removeEventListener('resize', position); window.removeEventListener('scroll', position, true) }
  }, [toolMenu])

  function openTool(value: typeof toolMenu, trigger: HTMLElement) {
    if (value === 'recipient') setTeamQuery('')
    toolTrigger.current = trigger
    setToolMenu(current => current === value ? null : value)
  }
  function closeTool() {
    setToolMenu(null)
    toolTrigger.current?.focus({ preventScroll: true })
  }
  function selectScenario(value: ScenarioId, restart = false) {
    if (value === state.scenario && !restart) return
    setPreviewTripId(null); setTrackTripId(null); setCompletionVisible(false)
    dispatch({ type: 'scenario', value })
    restoreComposerFocus.current = false
    setMenu(false); paletteDialog.current?.close(); setItinerary(false); setPromo(false); setPayment(value === 'pickup'); setOrderTab('details'); setIncomeTab('rides')
    closeTool()
    setNotice(citymobilScenarios[value].title)
  }
  function selectRecipient(value: Recipient) {
    dispatch({ type: 'recipient', value })
    closeTool()
    requestAnimationFrame(() => focusComposer())
  }
  function focusComposer() {
    focusElement(state.mode === 'connect' ? composerModeButton.current : composerInput.current)
  }
  function prepare() {
    if (state.mode === 'reply' && (lost && !lostReplyAllowed(state) || pickup && !pickupReplyAllowed(state) || income && !incomeReplyAllowed(state))) return
    dispatch({ type: 'suggest', explicit: true })
    composerInput.current?.focus({ preventScroll: nativeFragment })
  }
  function openOrder(id: string, trigger: HTMLElement, tab: OrderTab = 'details') {
    if (!lostTrips.some(trip => trip.id === id)) return
    detailsTrigger.current = trigger
    setPreviewTripId(id); setOrderTab(tab)
    displayTrack(id)
    requestAnimationFrame(() => focusElement(detailsClose.current))
  }
  function openPayment(trigger: HTMLElement) {
    setOrderTab('payment')
    if (lost) { openOrder(resolveLostTrackTrip({ viewed: previewTripId, displayed: trackTripId, confirmed: state.lost.selectedTripId }), trigger, 'payment'); return }
    wasItinerary.current = false
    setItinerary(false)
    paymentTrigger.current = trigger
    setPayment(true)
  }
  function closePayment() {
    setPayment(false)
    requestAnimationFrame(() => focusElement(paymentTrigger.current))
  }
  function startCall(target: Recipient) {
    if (!canCall || lost && target !== 'driver') return
    wasItinerary.current = false
    dispatch({ type: 'call-start', target })
    setItinerary(false)
  }

  useLayoutEffect(() => {
    if (scriptCaret.current && composerInput.current) {
      composerInput.current.setSelectionRange(state.draft.length, state.draft.length)
      scriptCaret.current = false
    }
  }, [state.draft, state.revision])
  const caretTools = useComposerCaret(composerInput, state.revision, state.draft, state.mode !== 'connect' && !nativeDraft && (state.suggestion !== 'idle' || Boolean(state.draft)), state.suggestion !== 'idle')
  function scriptedEdit(operation: 'insert' | 'backspace' | 'delete', count = 1) {
    const input = composerInput.current
    scriptCaret.current = true
    dispatch({ type: 'script-edit', operation, start: input?.selectionStart ?? state.draft.length, end: input?.selectionEnd ?? state.draft.length, count })
  }
  function selectMode(value: ConversationMode) {
    if (lost && value === 'connect' && !canConnect) return
    restoreComposerFocus.current = value !== state.mode && value !== 'connect'
    wasItinerary.current = false
    setItinerary(false)
    dispatch({ type: 'mode', value }); setPromo(false); closeTool()
    if (value === 'connect') { if (composerModeButton.current) openTool('recipient', composerModeButton.current); else setToolMenu('recipient') }
    else if (value === state.mode) composerInput.current?.focus({ preventScroll: nativeFragment })
  }

  function attachmentCard(attachment: DemoAttachment, index: number, removable = false) {
    const code = (state.scenario === 'pickup' ? 'A7K' : state.scenario === 'lost' ? 'B4N' : 'C8M') + String(attachment.amount ?? 5).padStart(3, '0')
    return <DemoMotion className={styles.attachmentCard} data-kind={attachment.kind} key={attachment.kind}>
      {attachment.kind === 'promo' ? <>{guided('promo-ticket')}<strong>€{attachment.amount}</strong><span>Promo Code</span><code>{code}</code><button type="button" aria-label="Copy promo code" onClick={() => {
        if (navigator.clipboard?.writeText) void navigator.clipboard.writeText(code).then(() => setNotice('Code copied'), () => setNotice(code))
        else setNotice(code)
      }}>{guided('copy')}</button></> : attachment.kind === 'media' ? <><img className={styles.fixturePhoto} src={assets[trip.avatar].src} width={44} height={44} alt={'Profile of ' + trip.driver}/><span>Driver profile photo</span></> : <>{guided('file')}<a href={trip.file} download>{trip.fileName}</a></>}
      {removable && <button type="button" aria-label={'Remove ' + attachment.kind} onClick={() => { restoreComposerFocus.current = true; dispatch({ type: 'remove-attachment', index }) }}>{guided('close')}</button>}
    </DemoMotion>
  }

  useEffect(() => {
    const el = infoScroll.current
    if (el) el.scrollTop = panelScroll.current[state.panel]
  }, [state.panel])

  useEffect(() => {
    if (state.messages.length > 1 && threadScroll.current) threadScroll.current.scrollTop = threadScroll.current.scrollHeight
    if (restoreComposerFocus.current) {
      restoreComposerFocus.current = false
      const target = state.mode === 'connect' ? composerModeButton.current : composerInput.current
      target?.focus({ preventScroll: nativeFragment })
    }
  }, [state.messages, state.internal, state.links, state.mode, state.attachments, nativeFragment])

  useEffect(() => {
    const el = paletteDialog.current
    if (!el) return
    if (menu) {
      // Inert authored frames need the real menu, but not a browser modal's
      // automatic focus/ancestor scrolling while they prepare offscreen.
      if (nativeFragment && !nativeInputMode.current) el.open = true
      else {
        if (el.open && !el.matches(':modal')) el.close()
        if (!el.open) el.showModal()
      }
      paletteShown.current = true
      search.current?.focus({ preventScroll: true })
    } else if (paletteShown.current) {
      if (nativeFragment && !nativeInputMode.current) el.open = true
      else {
        el.close()
        // Nonmodal, inert exit has no focus trap or invisible top-layer blocker.
        el.show()
      }
      if (toolMenu) toolPopup.current?.querySelector<HTMLButtonElement>('button:not(:disabled)')?.focus({ preventScroll: true })
      // A menu-started call has already moved focus to its visible phone controls.
      else if (state.call.phase !== 'calling') lastMenuTrigger.current?.focus({ preventScroll: true })
    }
  }, [menu, nativeFragment])

  // Opening the nonmodal menu exit can change focus; the new phone owns it last.
  useEffect(() => {
    if (state.call.phase === 'calling') focusElement(hangupButton.current)
  }, [state.call.phase, state.call.run, focusElement])

  useEffect(() => {
    if (itinerary) {
      wasItinerary.current = true
      focusElement(itineraryBack.current)
      // Scroll the stable panel, not the drawer while its X entrance is in flight.
      if (!nativeFragment && window.innerWidth <= 1200) conversation.current?.scrollIntoView({ block: 'start', inline: 'nearest' })
    }
    else if (wasItinerary.current) {
      wasItinerary.current = false
      const target = itineraryTrigger.current?.isConnected ? itineraryTrigger.current : itineraryTrigger.current?.tagName === 'TEXTAREA' ? composerInput.current : tripTrackButton.current
      target?.focus({ preventScroll: true })
      if (target?.closest('[data-details-trip]')) revealElement(target)
    }
  }, [itinerary, focusElement, nativeFragment, revealElement])

  function displayTrack(nextTripId: string | null) {
    if (nextTripId !== trackTripId) dispatch({ type: 'track-time', value: 0 })
    setTrackTripId(nextTripId)
  }
  function openItinerary(trigger: HTMLElement | null, viewedTripId?: string) {
    itineraryTrigger.current = trigger
    displayTrack(lost ? resolveLostTrackTrip({ explicit: viewedTripId, viewed: previewTripId, displayed: trackTripId, confirmed: state.lost.selectedTripId }) : null)
    if (!viewedTripId && state.scenario === 'income') setPayment(false)
    setToolMenu(null); setPromo(false); setItinerary(true)
  }
  function callOrderDriver() {
    if (!canOrderCall) return
    setToolMenu(null); startCall('driver')
  }
  function openMenu(trigger: HTMLElement) {
    lastMenuTrigger.current = trigger
    setToolMenu(null); setPromo(false); dispatch({ type: 'cancel-suggestion' }); setQuery(''); setSelection(0); setMenu(true)
  }
  useEffect(() => {
    if (menu) revealElement(paletteDialog.current?.querySelector('[role="option"][aria-selected="true"]'))
  }, [menu, query, selection, revealElement])
  function closeMenu() {
    paletteDialog.current?.close()
    setMenu(false)
    lastMenuTrigger.current?.focus({ preventScroll: true })
  }
  function chooseAction(item: string) {
    closeMenu()
    if (item === 'Connect') { if (canConnect) selectMode('connect'); return }
    if (item === 'Open Trip Track') { openItinerary(lastMenuTrigger.current); setNotice('Source route replay opened') }
    else if (item === 'Call Driver') startCall('driver')
    else if (item === 'Payment Actions' || item === 'Manage payment') openPayment(lastMenuTrigger.current!)
  }
  function switchPanel(value: 'info' | 'scripts') {
    if (infoScroll.current) panelScroll.current[state.panel] = infoScroll.current.scrollTop
    dispatch({ type: 'panel', value })
  }
  function tabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End']
    if (!keys.includes(event.key)) return
    event.preventDefault()
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? 1 : 1 - index
    switchPanel(next === 0 ? 'info' : 'scripts'); tabRefs.current[next]?.focus({ preventScroll: nativeFragment })
  }
  useEffect(() => { if (completed) { setMenu(false); paletteDialog.current?.close(); setToolMenu(null); setItinerary(false); setPromo(false); setCompletionVisible(true) } }, [completed])
  function closeDetails() {
    setPreviewTripId(null)
    requestAnimationFrame(() => focusElement(detailsTrigger.current?.isConnected ? detailsTrigger.current : itinerary ? itineraryBack.current : tripTrackButton.current))
  }
  return <DemoShell label="Citymobil portfolio demo" controlsId={guidedStep ? uid + '-workspace' : 'citymobil-demo'} scenarios={demoScenarios} presentation={Boolean(guidedStep)}
    style={{ '--cm-toolbar-height': 'var(--demo-toolbar-height, 44px)' } as CSSProperties}
    theme={state.theme} scenario={state.scenario} completed={completed} covered={completionVisible}
    onTheme={value => dispatch({ type: 'theme', value })} onScenario={selectScenario} onCover={setCompletionVisible} onReturn={onReturn}
    onKeyDownCapture={event => {
      // The native owner knows which surface must close before its case host.
      // CompletionCover keeps its existing modal priority.
      if (onReturn && event.key === 'Escape' && !completionVisible) {
        event.preventDefault(); event.stopPropagation()
        if (menu) closeMenu()
        else if (toolMenu) closeTool()
        else if (promo) { setPromo(false); focusComposer() }
        else if (itinerary) setItinerary(false)
        else if (previewTrip) closeDetails()
        else if (payment) closePayment()
        else onReturn()
        return
      }
      const command = demoNavigationShortcut(event.key, { ctrl: event.ctrlKey, meta: event.metaKey, alt: event.altKey, shift: event.shiftKey, composing: event.nativeEvent.isComposing }, completionVisible || menu)
      if (!command || !(event.target instanceof HTMLElement)) return
      event.preventDefault(); event.stopPropagation()
      if (command === 'track') openItinerary(event.target); else openMenu(event.target)
    }} completion={{
      label: pickup ? 'Pickup mix-up' : income ? 'Guaranteed income' : 'Lost item',
      description: income ? 'You explained the expired Rio de Mouro + Mem Martins program and its listed trip. The driver acknowledged the time-window mismatch, and you completed the support ticket. No payout decision was made.' : pickup ? 'You guided Jason, received Ivan’s confirmation and sent the €5 next-trip promo. Jason received the code and can see Ivan at the main entrance.' : 'You confirmed the trip, contacted the driver, recorded permission and shared their demo contact. The rider has arranged to collect the backpack.',
      nextScenario: pickup ? 'income' : income ? 'lost' : 'pickup',
      replayIcon: '/images/citymobil/demo/shell/replay.svg', nextIcon: '/images/citymobil/demo/shell/next.svg',
    }}><div className={styles.preview} data-theme={state.theme} id={guidedStep ? uid + '-workspace' : 'citymobil-demo'} role="region" aria-label="Citymobil fictional product UI" aria-describedby={uid + '-description'}>
      <p className={styles.visuallyHidden} id={uid + '-description'}>Interactive design demo with three fictional cases. Eligible replies reveal prepared text. While the next step is blocked, typing edits a local draft that cannot be sent. Local drafts stay in this browser session. Prepared-text deletion rewinds to the caret or selection start. Forward and notes stay internal to this local demo. Income conditions are illustrative, not official eligibility or a payout decision. Messages, calls, promo codes and payment history are simulated locally. No AI, support, upload, call or payment service is connected.</p>
      <div className={styles.workspace} data-demo-fixture={trip.id} data-guided-city={guidedStep || undefined} data-demo-session={state.sessionStartedAt ?? undefined} data-payment={Boolean(!itinerary && payment && state.scenario === 'income')} data-ticket-completed={completed || undefined}>
        <aside className={styles.rail} aria-label="Source navigation (inactive in demo)">
          <span className={styles.logo}>{icon('imgVector', true)}</span>
          {(['imgInbox', 'imgRatingS', 'imgComment', 'imgKnowledge'] as const).map((name, index) => <button key={name} type="button" aria-disabled={index !== 0 || undefined} title={index !== 0 ? unavailable : 'Choose a case'} onClick={index === 0 ? e => openTool('cases', e.currentTarget) : undefined} aria-haspopup={index === 0 ? 'menu' : undefined} aria-expanded={index === 0 ? toolMenu === 'cases' : undefined} aria-label={['Inbox — choose a case', 'Ratings', 'Conversations', 'Knowledge'][index]} data-active={index === 0}>
            {icon(name)}{index === 2 && <span className={styles.notification} />}
          </button>)}
        </aside>
        <aside className={styles.infoPanel} aria-label="Issue and trip context">
          <header className={styles.issueHeader}>
            <p className={styles.eyebrow}>Issue</p><h3>{state.scenario === 'income' ? 'Guaranteed Income' : 'Trip Issues'}</h3><button className={styles.caseSelector} type="button" aria-haspopup="menu" aria-expanded={toolMenu === 'cases'} onClick={e => openTool('cases', e.currentTarget)}>{trip.title}{icon('imgSortDown')}</button>
          </header>
          <div className={styles.prediction}><h4>AI Prediction</h4><span className={styles.beta}>beta</span></div>
          <div className={styles.quickActions}>
            <button type="button" ref={tripTrackButton} onClick={e => openItinerary(e.currentTarget)}>{icon('imgLocation1')}<span>{state.scenario === 'income' ? 'Open Drivers Logs' : 'Open Trip Track'}</span><kbd title="Source design shortcut; use the button in this browser demo.">⌘ M</kbd></button>
            <button type="button" onClick={() => startCall('driver')} disabled={state.call.phase !== 'idle' || !canCall}>{icon('imgCall')}<span>Call the Driver</span><kbd>⌘ ⌥ D</kbd></button>
            <button type="button" onClick={e => openPayment(e.currentTarget)}>{icon('imgPayment')}<span>{state.scenario === 'income' ? 'Open Guarantee Income List' : 'Payment Details'}</span><kbd>⌘ P</kbd></button>
          </div>
          <div className={styles.panelWell}>
            <div className={styles.card} data-panel={state.panel}>
              <div className={styles.tabs} role="tablist" aria-label="Trip context">
                {(['info', 'scripts'] as const).map((tab, i) => <button key={tab} type="button" role="tab" ref={el => { tabRefs.current[i] = el }} id={uid + '-' + tab} aria-controls={uid + '-panel'} data-target={guidedStep && 'city-' + tab} aria-selected={state.panel === tab} tabIndex={state.panel === tab ? 0 : -1} onClick={() => switchPanel(tab)} onKeyDown={event => tabKey(event, i)}>{tab === 'info' ? 'Info' : 'Scripts'}</button>)}
                {state.scenario === 'pickup' && <button type="button" role="tab" aria-selected="false" aria-disabled="true" tabIndex={-1} title={unavailable}>History</button>}
              </div>
              <div ref={infoScroll} className={styles.cardScroll} role="tabpanel" id={uid + '-panel'} aria-labelledby={uid + '-' + state.panel} tabIndex={0} onScroll={event => { panelScroll.current[state.panel] = event.currentTarget.scrollTop }}>
                <DemoTabContent value={state.scenario + state.panel} index={state.panel === 'info' ? 0 : 1}>
                {state.panel === 'info' && lost ? <CitymobilLostTrips guided={Boolean(guidedStep)} sessionStartedAt={state.sessionStartedAt} active={trackTripId} selected={state.lost.selectedTripId} dark={dark} canSelect={['choose-trip', 'query-driver'].includes(state.lost.stage)} onPreview={openOrder} onSelect={id => { dispatch({ type: 'select-trip', value: id }); setNotice(id === 'latest' ? 'Latest trip selected: Alex Vieira' : 'This is an older trip. Select the confirmed latest trip to continue.') }}/> : state.panel === 'scripts' && (lost || pickup) ? <div className={styles.scripts}><h4>{walkthroughTitle}</h4><ol className={styles.lostWalkthrough} aria-label={walkthroughTitle}>{walkthroughSteps.map((step, index) => <li key={step.title} data-step-state={step.state} aria-current={step.state === 'current' ? 'step' : undefined}><span className={styles.walkthroughMark} aria-hidden="true">{step.state === 'completed' ? <NativeAsset name="workspace/imgStateCompleted" plain/> : index + 1}</span><div><h4>{step.title}</h4><p>{step.state === 'current' ? composerHint ?? nextStep : step.state === 'completed' ? 'Completed' : 'Upcoming'}</p></div></li>)}</ol><p className={styles.scriptHint}>{lost ? <>Demo request: {requestClock.day}, {requestClock.time} · {requestClock.timezone}. Trip positions are historical.</> : <>Main and north are two fictional meeting points near Praça da Alegria, not verified entrances or proof of driver fault. Track positions have prepared timestamps.</>}</p>{lost && state.lost.stage === 'query-driver' && state.recipient !== 'driver' ? <button type="button" className={styles.useReply} onClick={() => selectRecipient('driver')}>Reply to selected driver</button> : lost && state.lost.stage === 'call-driver' ? <button type="button" className={styles.useReply} disabled={state.call.phase !== 'idle'} onClick={() => startCall('driver')}>Call selected driver</button> : lost && state.lost.stage === 'connect-rider' ? <button type="button" className={styles.useReply} onClick={event => openMenu(event.currentTarget)}>Open action menu → Connect</button> : <button type="button" className={styles.useReply} disabled={lost ? !lostReplyAllowed(state) || !['ask-latest', 'query-driver', 'follow-up'].includes(state.lost.stage) : !pickupReplyAllowed(state)} onClick={prepare}>Prepare reply</button>}</div> : state.panel === 'info' && state.scenario === 'income' ? <CitymobilDriverInfo avatar={assets[trip.avatar].src} name={trip.driver} car={trip.car} category={trip.category} program={incomePrograms[state.incomeProgram]} dark={dark} onProgram={openPayment}/> : state.panel === 'info' ? <div className={styles.tripInfo} data-source-node="6626:5126">
                  <div className={styles.dateRow}><span>{trip.date}</span><span className={styles.completed} data-pending={state.scenario === 'pickup'}>{state.scenario === 'lost' && icon('imgStateCompleted', true)}{trip.status}</span></div>
                  <div className={styles.carFare}><div><h4>{trip.car}</h4><p>{icon('imgCarFront')} {trip.category}</p></div><div className={styles.fare}>{icon('imgMcSymbol', true)}<span>€</span><strong>{trip.fare.split('.')[0]}</strong><span>.{trip.fare.split('.')[1]}</span></div></div>
                  
                  <RouteSummary trip={trip} />
                  <div className={styles.passenger}><img src={assets[trip.passengerAvatar].src} width={28} height={28} alt="" /><span>{trip.passenger}</span><button type="button" aria-disabled="true" title={unavailable} aria-label="Passenger actions — inactive in demo">{icon('imgMore')}</button></div>
                </div> : <div className={styles.scripts} data-source-node="6626:5139">
                  <div className={styles.scriptStep}><NativeAsset name="scripts/imgProgress" dark={dark}/><div className={styles.stepContent}><h4>Review the Trip</h4>
                    {income && <button type="button" className={styles.useReply} onClick={event => openPayment(event.currentTarget)}>Review program conditions</button>}
                    <label className={styles.choice}><input type="checkbox" checked={state.reviewed} onChange={e => dispatch({ type: 'reviewed', value: e.target.checked })}/><span>{trip.review}</span></label>
                    <p className={styles.scriptHint}><NativeAsset name="scripts/imgInfo" dark={dark}/><span>Confirm the details:</span></p>
                    <fieldset className={styles.choices} aria-label="Case details">{trip.reasons.map(reason => <label className={styles.choice} key={reason}><input type="radio" name={uid + '-reason'} checked={state.reason === reason} onChange={() => dispatch({ type: 'reason', value: reason })}/><span>{reason}</span></label>)}</fieldset>
                  </div></div>
                  <div className={styles.scriptStep}><NativeAsset name="scripts/imgProgress1" dark={dark}/><div className={styles.stepContent}><div className={styles.stepTitle}><h4>Contacting the Driver</h4><span><NativeAsset name="scripts/imgBranch" dark={dark}/>Optional</span></div>
                    <p className={styles.scriptHint}><NativeAsset name="scripts/imgInfo" dark={dark}/><span>{trip.driverCheck}</span></p>
                    <fieldset className={styles.choices} aria-label="Driver clarification">{trip.driverReasons.map(reason => <label className={styles.choice} key={reason}><input type="radio" name={uid + '-driver'} checked={state.driverReason === reason} onChange={() => dispatch({ type: 'driverReason', value: reason })}/><span>{reason}</span></label>)}</fieldset>
                  </div></div>
                  <p className={styles.scriptHint}>{nextStep}</p><button type="button" className={styles.useReply} disabled={income && !incomeReplyAllowed(state)} onClick={prepare}>Prepare reply</button>
                </div>}
                </DemoTabContent>
              </div>
            </div>
          </div>
          <CitymobilIssueActions dark={dark} completed={completed} disabled={lost ? state.lost.stage !== 'ready-complete' : pickup ? state.pickup.stage !== 'ready-complete' : !incomeCompleteAllowed(state)} label="Complete support ticket" title={nextStep} onComplete={() => dispatch({ type: 'complete-ticket' })}/>
        </aside>
        <div className={styles.workArea} data-right-panel={orderOpen || incomeOpen}>
        <section ref={conversation} className={styles.conversation} aria-label="Fictional conversation" data-track-open={itinerary || undefined}>
          <div className={styles.conversationContent} inert={itinerary || undefined} aria-hidden={itinerary || undefined}>
          <header className={styles.threadHeader}><div><h4>{recipientName}</h4><p><i/>Available</p></div><div><button type="button" onClick={e => openMenu(e.currentTarget)} aria-label="Open source action menu">{icon('imgMore')}</button><button type="button" disabled={state.call.phase !== 'idle' || !canCall || lost && state.recipient !== 'driver'} onClick={() => startCall(state.recipient)} aria-label={'Call ' + recipientName}>{icon('imgCall1')}</button></div></header>

            <div className={styles.today} title={requestAt == null ? undefined : formatDemoDateTime(requestAt) + ' · Europe/Lisbon'}>{requestAt == null ? lost ? lostDemoClock.day + ' · Support conversation' : trip.day : demoDayLabel(requestAt, conversationNow) + ' · ' + formatDemoDate(requestAt) + ' · Support conversation'}</div>
            <span className={styles.visuallyHidden} role="status" aria-live="polite" aria-atomic="true">{state.pendingReply ? state.pendingReply.name + ' is typing' : ''}</span>
            <div className={styles.thread} data-target={guidedStep && "city-conversation"} ref={threadScroll} tabIndex={0} aria-label="Conversation messages">
              <AnimatePresence initial={false}>{visibleMessages.map(message => <DemoMotion role="article" className={styles.message} key={state.scenario + message.id}><span className={styles.initials} data-agent={message.role === 'agent'}>{message.role === 'agent' ? 'CS' : recipientName.split(' ').map(word => word[0]).join('')}</span><div><h4>{message.role === 'agent' ? 'Colin Stravinsky' : recipientName}</h4>{message.text && <p>{message.text}</p>}{message.contact && <div className={styles.contactCard} data-contact-trip={message.contact.tripId}><img src={assets[message.contact.avatar as AssetName].src} alt="" width={44} height={44}/><div><strong>{message.contact.driver}</strong><p>Driver · {message.contact.masked}</p><small>Shared with permission · simulated contact</small></div></div>}{message.attachments.map((attachment, i) => attachmentCard(attachment, i))}</div><time dateTime={message.at == null ? undefined : new Date(message.at).toISOString()} title={message.at == null ? undefined : formatDemoDateTime(message.at) + ' · Europe/Lisbon'}>{message.at == null ? lost ? lostMessageClock(message.id) : message.id <= 2 ? trip.departure : 'now' : (requestAt != null && formatDemoDate(message.at) !== formatDemoDate(requestAt) ? demoDayLabel(message.at, conversationNow) + ', ' : '') + formatDemoTime(message.at)}</time></DemoMotion>)}
              {state.internal.map(entry => <DemoMotion role="article" className={styles.internalEntry} key={'internal-' + entry.id} data-kind={entry.mode}><h4>{entry.mode === 'forward' ? 'Forwarded to ' + entry.team?.name : 'Internal note'}</h4><blockquote className={styles.forwardContext}><strong>{entry.context.from}</strong><p>{entry.context.text}</p><small>{entry.context.issue} · {entry.context.date}<br/>{entry.context.origin} → {entry.context.destination}</small></blockquote><p>{entry.comment}</p>{entry.attachments.map((attachment, i) => attachmentCard(attachment, i))}</DemoMotion>)}
              {state.links.map(link => <DemoMotion role="article" className={styles.internalEntry} key={link.id}><h4>Connected · {link.title}</h4><p>{link.reference} · {link.status} · {link.context.from} · {link.context.date}</p><p>{link.context.origin} → {link.context.destination}</p><button className={styles.useReply} type="button" onClick={() => { restoreComposerFocus.current = true; dispatch({ type: 'unlink', value: link.id }) }}>Unlink</button></DemoMotion>)}</AnimatePresence>
              {state.pendingReply?.recipient === state.recipient && <div className={styles.message + ' ' + styles.typingMessage} aria-hidden="true" data-typing-recipient={state.pendingReply.recipient}><span className={styles.initials}>{state.pendingReply.name.split(' ').map(word => word[0]).join('')}</span><div><h4>{state.pendingReply.name}</h4><span className={styles.typingDots}><i/><i/><i/></span></div></div>}
            </div>
            <div className={styles.composerWrap}><div className={styles.composerStack}>
              <div className={styles.composerHintClip}><AnimatePresence initial={false}>{composerGuidance && <DemoMotion key="composer-hint" kind="attachment-top" className={styles.composerHint} data-source-node="8365:21387">
                <div className={styles.composerHintBand}><NativeAsset name="hint/info" dark/><p id={uid + '-composer-hint'}>{composerGuidance}</p></div>
              </DemoMotion>}</AnimatePresence></div>
              <form className={styles.composer} data-mode={state.mode} data-source-node="6660:19675" onSubmit={e => { e.preventDefault(); if (!canSend) return; restoreComposerFocus.current = Boolean(state.draft.trim() || state.attachments.length || state.linkCandidate); dispatch({ type: 'send' }); if (state.draft.trim() || state.attachments.length || state.linkCandidate) setNotice(state.mode === 'reply' ? 'Reply added to the conversation' : 'Internal context saved') }}>
              <div className={styles.replyHeader}><button ref={composerModeButton} type="button" aria-haspopup="menu" aria-expanded={toolMenu === 'reply'} onClick={e => openTool('reply', e.currentTarget)}>{state.mode === 'forward' ? <NativeAsset name="modes/forward" dark={dark}/> : guided('reply')}{conversationModes[state.mode]} {icon('imgSortDown')}</button>{state.mode !== 'note' && <><span>to</span><button type="button" aria-haspopup="menu" aria-expanded={toolMenu === 'recipient'} onClick={e => openTool('recipient', e.currentTarget)}>{state.mode === 'forward' ? selectedTeam.name : state.mode === 'connect' ? lost ? 'Passenger' : 'Related case' : recipientName} {icon('imgSortDown')}</button></>}</div>
              <AnimatePresence initial={false}>{state.context && state.mode === 'forward' && <DemoMotion key="forward-context" kind="fade" role="blockquote" className={styles.forwardContext}><strong>{state.context.from}</strong><p>{state.context.text}</p><small>{state.context.issue} · {state.context.date}<br/>{state.context.origin} → {state.context.destination}</small></DemoMotion>}</AnimatePresence>
              <AnimatePresence initial={false} mode="popLayout">{state.mode === 'connect' ? <DemoMotion key="connect-composer" kind="fade" className={styles.linkComposer}><button type="button" className={styles.useReply} aria-describedby={composerGuidance ? uid + '-composer-hint' : undefined} onClick={e => openTool('recipient', e.currentTarget)}>{lost ? 'Choose the rider to share the driver contact' : 'Choose a related case'}</button><AnimatePresence initial={false}>{state.linkCandidate && <DemoMotion key="link-context" kind="fade" className={styles.forwardContext}><strong>{relatedCases(state).find(c => c.id === state.linkCandidate)?.title}</strong><p>{trip.day} · {trip.origin} → {trip.destination}</p><button type="button" onClick={() => { dispatch({ type: 'select-link', value: null }); composerModeButton.current?.focus({ preventScroll: nativeFragment }) }}>Cancel</button></DemoMotion>}</AnimatePresence></DemoMotion> : <DemoMotion key="text-composer" kind="fade" className={styles.composerField} data-local-draft={nativeDraft} data-preview-ready={hasPreparedPreview} data-empty-preview={hasPreparedPreview && !state.draft}>
              <div ref={caretTools.mirrorRef} className={styles.caretMirror} aria-hidden="true"/>
              <AnimatePresence initial={false}>{!nativeDraft && <DemoMotion key="ghost" kind="fade" ref={caretTools.ghostRef} className={styles.ghostReply} id={uid + '-preview'} aria-hidden="true"><span className={styles.ghostEntered}>{state.draft}</span>{script.slice(state.draft.length)}</DemoMotion>}</AnimatePresence>
              {illustratedCaret && !nativeDraft && <span ref={caretTools.caretRef} className={styles.featureCaret} aria-hidden="true"/>}
              <textarea ref={composerInput} style={illustratedCaret ? { caretColor: 'transparent' } : undefined} aria-label={state.mode === 'note' ? 'Internal note' : state.mode === 'forward' ? 'Forwarding comment' : 'Reply to ' + recipientName} aria-describedby={uid + '-description' + (composerGuidance ? ' ' + uid + '-composer-hint' : '') + (hasPreparedPreview ? ' ' + uid + '-preview' : '')} maxLength={2000} value={state.draft} onChange={event => editDraft ? dispatch({ type: 'draft-edit', value: event.currentTarget.value, literal: literalDraft }) : scriptedEdit('insert')} onBeforeInput={event => {
                if (editDraft) return
                const input = event.nativeEvent as InputEvent
                if (input.inputType?.startsWith('insert')) { event.preventDefault(); scriptedEdit('insert') }
                if (input.inputType?.startsWith('delete')) { event.preventDefault(); scriptedEdit(input.inputType.includes('Backward') ? 'backspace' : 'delete') }
              }} onPaste={event => { if (!editDraft) { event.preventDefault(); scriptedEdit('insert', 16) } }} onDrop={event => { if (!editDraft) { event.preventDefault(); scriptedEdit('insert', 16) } }} placeholder="Use ⌘A to find an action" onFocus={() => { if (!literalDraft) dispatch({ type: 'focus-suggestion' }) }} onKeyDown={e => {
                if (e.nativeEvent.isComposing || e.shiftKey && (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'a') return
                const shortcut = composerShortcut(e.key, { ctrl: e.ctrlKey, meta: e.metaKey, alt: e.altKey }, !e.shiftKey && state.suggestion === 'ready')
                if (shortcut) { e.preventDefault(); if (shortcut === 'actions') { if (!menu) openMenu(e.currentTarget) } else if (shortcut === 'send') e.currentTarget.form?.requestSubmit(); else { scriptCaret.current = true; dispatch({ type: 'accept-suggestion' }) }; return }
                if (e.key === 'Escape') { dispatch({ type: 'cancel-suggestion' }); setPromo(false); return }
                if (editDraft) return
                if (!e.ctrlKey && !e.metaKey && !e.altKey && (e.key.length === 1 || e.key === 'Enter' || e.key === 'Backspace' || e.key === 'Delete')) {
                  e.preventDefault(); scriptedEdit(e.key === 'Backspace' ? 'backspace' : e.key === 'Delete' ? 'delete' : 'insert')
                }
              }}/>
              {(state.draft || state.suggestion !== 'idle') && <button className={styles.clearDraft} type="button" aria-label="Clear reply" onClick={() => { dispatch({ type: 'clear-draft' }); composerInput.current?.focus({ preventScroll: nativeFragment }) }}>{guided('close')}</button>}
              <AnimatePresence initial={false}>{!nativeDraft && state.suggestion !== 'idle' && <DemoMotion key="suggestion" kind="fade" ref={caretTools.toolsRef} className={styles.suggestionTools}
                // Keep textarea focus: WebKit otherwise hides this focus-within toolbar before click.
                onMouseDown={event => { if (event.button === 0) event.preventDefault() }}>
                <button id={uid + '-suggestion'} className={styles.acceptSuggestion} type="button" disabled={state.suggestion !== 'ready'} onClick={() => { scriptCaret.current = true; dispatch({ type: 'accept-suggestion' }); composerInput.current?.focus({ preventScroll: nativeFragment }) }} aria-label="Accept suggested reply">Tab</button>
                <div className={styles.answerControl} role="group" aria-label="Prepared answer variants" onKeyDown={e => { if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) { e.preventDefault(); dispatch({ type: 'answer', direction: ['ArrowUp', 'ArrowLeft'].includes(e.key) ? -1 : 1 }) } }}>
                  {state.suggestion === 'loading' ? <span className={styles.loadingSuggestion} role="status">{guided('loader', true)}<span className={styles.visuallyHidden}>Preparing reply</span></span> : <span>{state.answer + 1}/{answerLabels.length} <span className={styles.answerLabel}>{answerLabels[state.answer]}</span></span>}
                  <button type="button" className={styles.previousAnswer} aria-label="Previous answer" onClick={() => dispatch({ type: 'answer', direction: -1 })}><NativeAsset name="workspace/imgSortDown" dark={true}/></button><button type="button" aria-label="Next answer" onClick={() => dispatch({ type: 'answer', direction: 1 })}><NativeAsset name="workspace/imgSortDown" dark={true}/></button>
                </div>
              </DemoMotion>}</AnimatePresence>
              </DemoMotion>}</AnimatePresence>
              <AnimatePresence initial={false}>{state.attachments.length > 0 && <DemoMotion key="attachments" kind="fade" className={styles.attachments}><AnimatePresence initial={false}>{state.attachments.map((attachment, i) => attachmentCard(attachment, i, true))}</AnimatePresence></DemoMotion>}</AnimatePresence>
              <div className={styles.composerTools}><div><button type="button" onClick={e => openMenu(e.currentTarget)} aria-haspopup="dialog" aria-label="Open action menu">{icon('imgFlash')}</button><button type="button" aria-disabled="true" title={unavailable} aria-label="Voice message">{icon('imgUnmute')}</button><button type="button" aria-haspopup="menu" aria-expanded={toolMenu === 'attach'} onClick={e => openTool('attach', e.currentTarget)} aria-label="Add promo, media or file">{icon('imgAttach')}</button><button type="button" onClick={prepare} aria-label="Prepare suggested reply">{icon('imgMore1')}</button></div><div><button type="button" aria-disabled="true" title={unavailable} aria-label="Schedule">{icon('imgTime')}</button><button type="submit" disabled={!canSend} className={styles.send}><NativeAsset name="workspace/imgSend" dark/>{state.mode === 'note' ? 'Save Note' : state.mode === 'connect' ? 'Connect' : 'Send'}</button></div></div>
              <AnimatePresence initial={false}>{promo && <DemoMotion key="promo" kind="popover" className={styles.promoEntry} aria-label="Promo amount" onKeyDown={event => { if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); setPromo(false); focusComposer() } }}>
                {[1, 3, 5, 7, 10].map(amount => <button key={amount} type="button" aria-label={'Add €' + amount + ' promo'} onClick={() => { dispatch({ type: 'attach', value: { kind: 'promo', amount } }); setPromo(false); composerInput.current?.focus({ preventScroll: nativeFragment }) }}><small>€</small>{amount}</button>)}
                <button type="button" aria-label="Close promo amounts" onClick={() => { setPromo(false); focusComposer() }}>{guided('close')}</button>
              </DemoMotion>}</AnimatePresence>

            </form>
              <AnimatePresence initial={false}>{state.call.phase !== 'idle' && <DemoMotion key="call" kind="attachment-bottom" className={styles.callPanel} aria-label="Simulated call" data-source-node="6280:7759">
                <img className={styles.callAvatar} src={assets[state.call.target === 'driver' ? trip.avatar : trip.passengerAvatar].src} alt="" width={28} height={28}/>
                <div><h4>{trip[state.call.target]}</h4><AnimatePresence initial={false} mode="popLayout"><DemoMotion key={state.call.phase} kind="fade"><p role="status">{state.call.phase === 'calling' ? 'Calling…' : 'Connected · ' + String(Math.floor(state.call.elapsed / 60)).padStart(2, '0') + ':' + String(state.call.elapsed % 60).padStart(2, '0')}</p></DemoMotion></AnimatePresence></div>
                <button type="button" aria-label="Call options" onClick={() => setNotice('Simulated call with ' + trip[state.call.target])}>{guided('call-more', true)}</button>
                <button type="button" aria-label={state.call.muted ? 'Unmute call' : 'Mute call'} aria-pressed={state.call.muted} onClick={() => dispatch({ type: 'call-mute' })}>{guided('mute', true)}</button>
                <button ref={hangupButton} className={styles.hangup} type="button" aria-label="Hang up" onClick={() => { dispatch({ type: 'call-end' }); requestAnimationFrame(() => focusComposer()) }}>{guided('hangup', true)}</button>
              </DemoMotion>}</AnimatePresence>
            </div></div>
          </div>
          <AnimatePresence initial={false}>{itinerary && <DemoMotion key="track" kind="drawer" className={styles.mapOverlay}><CitymobilTrack key={state.scenario + (trackTripId ?? '')} scenario={state.scenario} selectedTripId={trackTripId} sessionStartedAt={state.sessionStartedAt} dark={dark} percent={state.trackPercent} onTime={value => dispatch({ type: 'track-time', value })} closeRef={itineraryBack} onClose={() => setItinerary(false)} nativeParked={nativeParked} prepareOffscreen={nativeFragment} localBasemap={localBasemap}/></DemoMotion>}</AnimatePresence>
        </section>
        <AnimatePresence initial={false}>{lost && previewTrip ? <CitymobilOrderDetails key="lost-details" trip={previewTrip} dark={dark} tab={orderTab} onTab={setOrderTab} closeRef={detailsClose} onClose={closeDetails} onMap={trigger => openItinerary(trigger, previewTrip.id)} onMore={trigger => openTool('order-driver', trigger)} moreOpen={toolMenu === 'order-driver'} onCall={canOrderCall ? callOrderDriver : undefined}/> : incomeOpen ? <DemoMotion key="income-payment" kind="drawer" role="complementary" className={styles.paymentPanel} aria-label="Guaranteed Income conditions" onKeyDown={e => { if (e.key === 'Escape') closePayment() }}>
          <header className={styles.paymentHeading}><h3>Guaranteed Income</h3><button ref={paymentClose} type="button" className={styles.inlineClose} onClick={closePayment} aria-label="Close income conditions">{guided('close')}</button></header>
          <div className={styles.paymentWell}><div className={styles.incomePrograms} aria-label="Illustrative income programs">{(['expired', 'completed'] as const).map(key => <button type="button" key={key} data-source-node={key === 'completed' ? '6530:14815' : '6332:11963'} aria-pressed={state.incomeProgram === key} onClick={() => dispatch({ type: 'income-program', value: key })}><h4>{incomePrograms[key].title}</h4><span className={styles.completed} data-pending={key === 'expired'}>{incomePrograms[key].status}</span><strong>€ {incomePrograms[key].guarantee}</strong></button>)}</div><div className={styles.card} data-source-node="6332:11963">
            <div className={styles.tabs} role="tablist" aria-label="Income progress">{(['rides', 'time'] as const).map((tab, i) => <button type="button" role="tab" key={tab} id={uid + '-income-' + tab} aria-controls={uid + '-income-body'} aria-selected={incomeTab === tab} tabIndex={incomeTab === tab ? 0 : -1} onClick={() => setIncomeTab(tab)} onKeyDown={e => { if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) { e.preventDefault(); const next = e.key === 'Home' ? 0 : e.key === 'End' ? 1 : 1-i; setIncomeTab(next ? 'time' : 'rides'); e.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('button')[next]?.focus({ preventScroll: nativeFragment }) } }}>{tab === 'rides' ? 'Rides' : 'Time'}</button>)}</div>
            <div className={styles.incomeSummary} role="tabpanel" id={uid + '-income-body'} aria-labelledby={uid + '-income-' + incomeTab} tabIndex={0}><AnimatePresence initial={false} mode="popLayout"><DemoMotion key={incomeTab + state.incomeProgram} kind="fade">
              <p>{'day' in program ? program.day : trip.day} · {program.from}–{program.to}</p><h4>{program.title} <strong>{program.rides}/{program.required}</strong></h4><p>{state.incomeProgram === 'completed' ? 'Downtown-area program · separate completed example' : 'Trips in the Rio de Mouro and Mem Martins area.'}</p>
              {incomeTab === 'rides' ? <><progress value={program.rides} max={program.required} aria-label={'Rides: ' + program.rides + ' of ' + program.required}/><div className={styles.incomeAmounts}><span>€{program.earned} earned</span><span>€{program.guarantee} guarantee</span></div><progress value={program.earned} max={program.guarantee} aria-label="Displayed earnings progress"/>{state.incomeProgram === 'expired' ? <><div className={styles.incomeWarning}><strong>No Guarantee Income</strong><p>Time ran out</p></div><h4>Listed trip</h4><p>{trip.departure}–{trip.arrival} · {trip.origin} → {trip.destination}</p><p>Outside the displayed {program.from}–{program.to} window.</p></> : <div className={styles.completedProgram}><span className={styles.completed}>Completed</span><strong>€ {program.guarantee}</strong><p>{program.rides} of {program.required} rides shown complete in this example.</p></div>}</> : <><h4>Program window</h4><p>{program.from}–{program.to}</p>{state.incomeProgram === 'expired' ? <><h4>Listed trip</h4><p>{trip.departure}–{trip.arrival}</p><div className={styles.incomeWarning}>Outside the displayed time window</div></> : <p>All {program.required} rides shown within the example window.</p>}</>}
              <h4>Conditions to review</h4><ul>{trip.reasons.map(reason => <li key={reason}>{reason}</li>)}</ul><button type="button" className={styles.useReply} disabled={!incomeReplyAllowed(state)} onClick={() => { closePayment(); switchPanel('scripts'); prepare() }}>Prepare explanation</button>
            </DemoMotion></AnimatePresence></div>
          </div></div>
        </DemoMotion> : payment && <CitymobilOrderDetails key="payment" trip={trip} dark={dark} pending={state.scenario === 'pickup'} tab={orderTab} onTab={setOrderTab} closeRef={paymentClose} onClose={closePayment} onMap={trigger => openItinerary(trigger, trip.id)} onMore={trigger => openTool('order-driver', trigger)} moreOpen={toolMenu === 'order-driver'} onCall={canOrderCall ? callOrderDriver : undefined}/>}</AnimatePresence>
        </div>
      </div>
      <AnimatePresence initial={false}>{toolMenu && <DemoMotion key="tool-menu" kind="popover" className={styles.toolPopup} style={toolPosition} data-menu={toolMenu} ref={toolPopup} role="menu" tabIndex={-1} aria-label={toolMenu === 'order-driver' ? 'Order driver actions' : toolMenu === 'cases' ? 'Choose a case' : toolMenu === 'recipient' ? 'Choose recipient' : toolMenu === 'reply' ? 'Reply mode' : 'Add to reply'} onKeyDown={e => {
        if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); closeTool() }
        if (e.target instanceof HTMLInputElement && ['Home', 'End'].includes(e.key)) return
        if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) {
          e.preventDefault()
          const buttons = Array.from(e.currentTarget.querySelectorAll<HTMLButtonElement>('button:not(:disabled)'))
          if (!buttons.length) return
          const index = buttons.indexOf(document.activeElement as HTMLButtonElement)
          const next = e.key === 'Home' ? 0 : e.key === 'End' ? buttons.length - 1 : (index + (e.key === 'ArrowDown' ? 1 : buttons.length - 1)) % buttons.length
          buttons[next]?.focus({ preventScroll: nativeFragment })
        }
      }} onBlur={e => { if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget)) setToolMenu(null) }}>
        {toolMenu === 'order-driver' ? <>
          <button type="button" role="menuitem" disabled title="Driver profile is not available in this local demo.">{icon('imgMore1')}<span>Details<small>Profile unavailable in this demo</small></span></button>
          <button type="button" role="menuitem" disabled={!canOrderCall} title={!sameOrderDriver ? 'Confirm and select this trip first.' : !canCall ? 'Wait for the driver’s call request.' : state.call.phase !== 'idle' ? 'A simulated call is already active.' : 'Start simulated call'} onClick={callOrderDriver}>{icon('imgCall')}<span>Call{!canOrderCall && <small>{!sameOrderDriver ? 'Confirm and select this trip first' : 'Call is not available at this stage'}</small>}</span></button>
          <button type="button" role="menuitem" disabled={!canOrderMessage} title={!sameOrderDriver ? 'Confirm and select this trip first.' : 'Reply to this driver'} onClick={() => { setToolMenu(null); wasItinerary.current = false; setItinerary(false); restoreComposerFocus.current = false; dispatch({ type: 'recipient', value: 'driver' }); dispatch({ type: 'mode', value: 'reply' }); requestAnimationFrame(() => focusElement(composerInput.current)) }}>{guided('reply')}<span>Message{!canOrderMessage && <small>Confirm and select this trip first</small>}</span></button>
        </> : toolMenu === 'cases' ? (Object.keys(citymobilScenarios) as ScenarioId[]).map(id => <button key={id} type="button" role="menuitemradio" aria-checked={state.scenario === id} onClick={() => selectScenario(id)}>{icon('imgInbox')}{citymobilScenarios[id].title}</button>)
          : toolMenu === 'recipient' && state.mode === 'forward' ? <><CitymobilSearchInput aria-label="Search fictional team" placeholder="Search" value={teamQuery} onChange={e => setTeamQuery(e.target.value)}/>{citymobilTeam.filter(person => person.name.toLowerCase().includes(teamQuery.toLowerCase())).map(person => <button type="button" role="menuitemradio" aria-checked={state.teamId === person.id} key={person.id} onClick={() => { dispatch({ type: 'team', value: person.id }); closeTool(); composerInput.current?.focus({ preventScroll: nativeFragment }) }}><span><strong>{person.name}</strong><small>{person.role}</small></span></button>)}</> : toolMenu === 'recipient' && state.mode === 'connect' && lost ? <button type="button" role="menuitem" disabled={!canConnect} onClick={() => { restoreComposerFocus.current = true; dispatch({ type: 'connect-rider' }); closeTool(); setNotice('Driver demo contact shared with the rider') }}><img src={assets[trip.passengerAvatar].src} alt="" width={28} height={28}/><span><strong>{trip.passenger}</strong><small>Passenger</small></span></button> : toolMenu === 'recipient' && state.mode === 'connect' ? <>{relatedCases(state).map(link => <button key={link.id} type="button" role="menuitemradio" aria-checked={state.linkCandidate === link.id} disabled={state.links.some(c => c.id === link.id)} onClick={() => { dispatch({ type: 'select-link', value: link.id }); closeTool() }}><span><strong>{link.title}</strong><small>{link.reference} · {link.status} · {link.context.from}</small></span></button>)}</> : toolMenu === 'recipient' ? (state.scenario === 'income' ? ['driver'] as const : ['passenger', 'driver'] as const).map(target => <button key={target} type="button" role="menuitemradio" aria-checked={state.recipient === target} disabled={lost && target === 'driver' && !state.lost.selectedTripId} onClick={() => selectRecipient(target)}>{guided('reply')}{pickup ? <span><strong>{trip[target]}</strong><small>{target === 'driver' ? 'Driver' : 'Passenger'}</small></span> : trip[target]}</button>)
          : toolMenu === 'reply' ? (Object.keys(conversationModes) as ConversationMode[]).map(mode => <button type="button" key={mode} role="menuitemradio" aria-checked={state.mode === mode} disabled={lost && mode === 'connect' && !canConnect} onClick={() => selectMode(mode)}>{mode === 'forward' ? <NativeAsset name="modes/forward" dark={dark}/> : guided('reply')}{conversationModes[mode]}</button>)
          : (['promo', 'media', 'file'] as const).map(kind => <button type="button" role="menuitem" key={kind} onClick={() => {
            closeTool()
            if (kind === 'promo') setPromo(true)
            else dispatch({ type: 'attach', value: { kind } })
          }}>{guided(kind === 'promo' ? 'ticket' : kind)}{kind === 'promo' ? 'Promo' : kind === 'media' ? 'Media' : 'File'}</button>)}
      </DemoMotion>}</AnimatePresence>
      <p role="status" aria-live="polite" className={styles.visuallyHidden}>{notice}</p>
      <AnimatePresence initial={false}>{menu && <DemoMotion key="palette-backdrop" kind="fade" className={styles.paletteBackdrop}/>}</AnimatePresence>
      {/* The closed pose is also SSR-rendered; reduced motion changes duration, not its initial representation. */}
      <motion.dialog ref={paletteDialog} className={styles.actionDialog} onUpdate={demoMotionUpdate} inert={!menu || undefined} aria-hidden={!menu || undefined} initial={false} animate={{ opacity: menu ? 1 : 0, transform: menu ? paletteFromBottom ? 'translateY(0%) scale(1)' : 'translateY(0px) scale(1)' : paletteFromBottom ? 'translateY(100%) scale(1)' : 'translateY(6px) scale(.98)' }} transition={{ duration: reducedMotion ? 0 : .18, ease: demoEase }} onAnimationComplete={() => { if (!menuRef.current) paletteDialog.current?.close() }} aria-label="Demo action menu" onCancel={(e: SyntheticEvent<HTMLDialogElement>) => { e.preventDefault(); e.stopPropagation(); closeMenu() }} onKeyDown={(e: KeyboardEvent<HTMLDialogElement>) => {
        // An already-open authored palette keeps its DOM and focus during takeover.
        if (e.key === 'Escape' && nativeFragment && nativeInputMode.current && !e.currentTarget.matches(':modal')) { e.preventDefault(); closeMenu() }
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); setSelection(i => (i + (e.key === 'ArrowDown' ? 1 : filtered.length - 1)) % Math.max(1, filtered.length)) }
        if (e.key === 'Enter' && e.target === search.current && filtered[selection]) { e.preventDefault(); chooseAction(filtered[selection]) }
      }}>
        <div className={styles.searchRow}><input ref={search} role="combobox" aria-expanded={menu} aria-autocomplete="list" aria-controls={uid + '-actions'} aria-activedescendant={filtered[selection] ? uid + '-action-' + selection : undefined} aria-label="Search demo actions" placeholder="Search" value={query} onChange={e => { setQuery(e.target.value); setSelection(0) }}/><button type="button" className={styles.inlineClose} onClick={closeMenu} aria-label="Close action menu">{guided('close')}</button></div>
        <div role="listbox" id={uid + '-actions'} aria-label="Available demo actions" className={styles.actionResults}>
          {groups.map(group => <CitymobilActionGroup key={group.title} title={group.title} items={group.items.filter(item => filtered.includes(item))} idFor={item => uid + '-action-' + filtered.indexOf(item)} selected={filtered[selection]} onSelect={item => setSelection(filtered.indexOf(item))} disabled={item => lost && (item === 'Connect' && !canConnect || item === 'Call Driver' && (!canCall || state.call.phase !== 'idle'))} onChoose={chooseAction}/>)}
          {!filtered.length && <p className={styles.noResults}>No matching demo action</p>}
        </div>
        <footer className={styles.actionHints}><span><NativeAsset name="menu/imgArrowComplexUp" dark={dark}/><NativeAsset name="menu/imgDown" dark={dark}/>to navigate</span><span><NativeAsset name="menu/imgEnter" dark={dark}/>to select</span><span><kbd>Esc</kbd>to close</span></footer>
      </motion.dialog>
    </div></DemoShell>
}
