export const demoPaymentMethods = { master: { suffix: '3443', expiry: '12/28' }, visa: { suffix: '4954', expiry: '09/28' } } as const
/** Stable fictional records for the single admitted Lost-item walkthrough. */
export const lostTrips = [
  { id: 'latest', invoice: 'INV-260115-03', driver: 'Alex Vieira', avatar: 'people/alex-vieira', car: 'White Tesla Model S', category: 'Comfort +', plate: 'LX-42-DE', date: '15 Jan 2026, 10:20 AM', day: '15 Jan 2026', departure: '10:20', arrival: '10:34', origin: 'Largo do Rato, Lisbon', destination: 'Praça Luís de Camões, Lisbon', fare: '9.90', base: '9.90', tolls: '0.00', discount: '0.00', card: demoPaymentMethods.master.suffix, rate: '4.83', motivation: 98, contact: '••• ••• 042' },
  { id: 'previous', invoice: 'INV-260114-02', driver: 'Martim Reis', avatar: 'lost/driver', car: 'Black Toyota Corolla', category: 'Comfort', plate: 'LX-71-DE', date: '14 Jan 2026, 6:10 PM', day: '14 Jan 2026', departure: '18:10', arrival: '18:18', origin: 'Rossio, Lisbon', destination: 'Praça do Comércio, Lisbon', fare: '5.40', base: '5.40', tolls: '0.00', discount: '0.00', card: demoPaymentMethods.master.suffix, rate: '4.91', motivation: 96, contact: '••• ••• 071' },
  { id: 'earlier', invoice: 'INV-260114-01', driver: 'Tiago Moreira', avatar: 'people/tiago-moreira', car: 'Silver Volkswagen Passat', category: 'Comfort +', plate: 'LX-83-DE', date: '14 Jan 2026, 8:30 AM', day: '14 Jan 2026', departure: '08:30', arrival: '08:36', origin: 'Jardim Botânico · Rua da Escola Politécnica, Lisbon', destination: 'Largo do Rato, Lisbon', fare: '5.00', base: '5.00', tolls: '0.00', discount: '0.00', card: demoPaymentMethods.master.suffix, rate: '4.76', motivation: 94, contact: '••• ••• 083' },
] as const
export const lostDemoClock = { date: '2026-01-15', day: '15 Jan 2026', time: '11:05', timezone: 'Europe/Lisbon' } as const
export function lostMessageClock(id: number) {
  const total = 11 * 60 + 5 + Math.floor((id - 1) / 2)
  return '11:' + String(total % 60).padStart(2, '0')
}
export type LostTrip = typeof lostTrips[number]

/** Read-only presentation context; never confirms a support-story trip. */
export function resolveLostTrackTrip(context: { explicit?: string | null; viewed?: string | null; displayed?: string | null; confirmed?: string | null }): LostTrip['id'] {
  for (const id of [context.explicit, context.viewed, context.displayed, context.confirmed]) {
    const trip = lostTrips.find(trip => trip.id === id)
    if (trip) return trip.id
  }
  return lostTrips[0].id
}

/** Local demo navigation shares the shell's existing command-key boundary. */
export function demoNavigationShortcut(key: string, modifiers: { ctrl: boolean; meta: boolean; alt: boolean; shift: boolean; composing: boolean }, blocked: boolean) {
  if (blocked || modifiers.composing || modifiers.alt || modifiers.shift || !(modifiers.ctrl || modifiers.meta)) return null
  return key.toLowerCase() === 'a' ? 'actions' : key.toLowerCase() === 'm' ? 'track' : null
}

/** Bounded, in-memory demo fixtures. These are not portfolio facts or service records. */
export const citymobilScenarios = {
  income: {
    avatar: 'geographic/driver', passengerAvatar: 'geographic/driver',
    id: 'demo-income-03', title: 'Guaranteed income not received', passenger: 'Sultani Akhmetzyanov', driver: 'Sultani Akhmetzyanov', status: 'Completed', paymentStatus: 'Completed',
    date: '16 Jan 2026, 12:23 PM', day: '16 Jan 2026', departure: '12:05', arrival: '12:34',
    origin: 'R. Gonçalves Ramos, Amadora', destination: 'Av. Gen. Humberto Delgado, Amadora', car: 'White Tesla Model S', category: 'Comfort +',
    fare: '17.00', base: '17.00', tolls: '0.00', discount: '0.00', invoice: 'DEMO-INCOME-03',
    complaint: 'I completed my trips but didn’t receive the guaranteed income. Could you explain the conditions?',
    driverMessage: 'My Rio de Mouro + Mem Martins card shows 19 of 20 rides and “Time ran out”. Why is that?',
    reply: 'Your card shows 19 of the required 20 rides in Rio de Mouro + Mem Martins, with a 06:00–12:00 window. The listed 12:05–12:34 trip falls outside that window. Please confirm the trip date and area so we can review the displayed conditions together.',
    driverReply: 'Your card shows 19 of the required 20 rides in Rio de Mouro + Mem Martins, with a 06:00–12:00 window. The listed 12:05–12:34 trip falls outside that window. Please confirm the trip date and area so we can review the displayed conditions together.',
    response: 'I see the 19 of 20 progress and the time window now. I’ll check the date and area of that last trip.',
    driverResponse: 'I see the 19 of 20 progress and the time window now. I’ll check the date and area of that last trip.',
    review: 'Open the Guaranteed Income list and review the displayed program conditions.',
    reasons: ['Required rides within the timeframe', 'Trips in the designated area', 'No trip-tracking errors', 'Earnings threshold checked', 'Trips outside the timeframe checked'],
    driverCheck: 'Clarify the driver’s trip history and payment expectations. Explain the displayed conditions; a payout decision needs a separate review.',
    driverReasons: ['Trip date and area confirmed', 'The card and time window explained'],
    file: '/images/citymobil/demo/guided/income-conditions.txt', fileName: 'Program conditions.txt',
  },
  pickup: {
    avatar: 'people/pickup-driver', passengerAvatar: 'workspace/imgAvatarS',
    id: 'demo-pickup-01', title: 'Driver arrived at the wrong pickup', passenger: 'Jason McBright', driver: 'Ivan Cheremisin', status: 'In progress', paymentStatus: 'Pending',
    date: '14 Jan 2026, 12:00 PM', day: '14 Jan 2026', departure: '12:00', arrival: '12:31',
    origin: 'Praça da Alegria, Lisbon', destination: 'Rua da Misericórdia, Lisbon', car: 'White Tesla Model S', category: 'Comfort +',
    fare: '34.44', base: '40.94', tolls: '3.50', discount: '10.00', invoice: 'INV-260114-04',
    complaint: 'Hi, I’m at the main entrance, but I can’t see my driver. Could you help?',
    driverMessage: 'I’m beside the north entrance. Is the passenger at the main entrance?',
    reply: 'Thanks for waiting, Jason. Ivan is at the north entrance. Please stay at the main entrance; I’ll ask him to meet you there.',
    driverReply: 'Hi Ivan, Jason is waiting at the main entrance on Praça da Alegria. Please meet him there and confirm.',
    response: 'I selected the main entrance when I booked. I’ve been waiting here the whole time.',
    driverResponse: 'Understood. I’m heading to the main entrance now. I’ll be there shortly.',
    review: 'Confirm the passenger’s pickup entrance and compare it with the trip details.',
    reasons: ['Main entrance confirmed', 'North entrance confirmed', 'Passenger needs pickup directions'],
    driverCheck: 'Ask Ivan to meet the passenger at the confirmed entrance.',
    driverReasons: ['Driver is moving to the main entrance', 'Driver needs another pickup landmark'],
    file: '/images/citymobil/demo/guided/pickup-directions.txt', fileName: 'Pickup directions.txt',
  },
  lost: {
    ...lostTrips[0],
    passengerAvatar: 'workspace/imgAvatarS',
    id: 'demo-lost-item-02', title: 'Passenger left an item in the car', passenger: 'Johnston Serenity', status: 'Completed', paymentStatus: 'Completed',
        complaint: 'Hi, I think I left something in a car. Could you help me find it?',
    driverMessage: 'No driver message until the operator contacts the selected trip driver.',
    reply: 'Was this your most recent trip? Please confirm what you left in the car.',
    driverReply: 'Ask the selected trip driver about the blue backpack.',
    response: 'That works for me. I’ll be by the main arch at 11:15. Thank you for helping me get my backpack back!',
    driverResponse: 'Confirmed. I have the backpack and will meet Johnston by the main arch at 11:15.',
    review: 'Confirm the trip, the blue backpack and where it was left.',
    reasons: ['Blue backpack on the back seat', 'Passenger confirmed the trip', 'Meeting point confirmed'],
    driverCheck: 'Confirm that the selected driver has the item and agree on the return meeting.',
    driverReasons: ['Driver found the backpack', 'Return at the main arch, 11:15'],
    file: '/images/citymobil/demo/guided/item-return.txt', fileName: 'Item return details.txt',
  },
} as const
export type ScenarioId = keyof typeof citymobilScenarios
export type Recipient = 'passenger' | 'driver'
export type ConversationMode = 'reply' | 'forward' | 'connect' | 'note'
export const conversationModes = { reply: 'Reply', forward: 'Forward', connect: 'Connect', note: 'Add a note' } as const
export const answerLabels = ['Super Warm Answer', 'Natural Answer', 'Strict Answer'] as const
/** Source names used only as deterministic fictional demo colleagues. */
export const citymobilTeam = [
  { id: 'emma', name: 'Emma Sprinfield', role: 'Head of CS' },
  { id: 'ivan', name: 'Ivan Cheremisin', role: 'Product Designer' },
  { id: 'milton', name: 'Milton Gomez', role: 'Linguist' },
] as const
export const incomePrograms = {
  expired: { title: 'Rio de Mouro + Mem Martins', rides: 19, required: 20, earned: 45, guarantee: 100, from: '06:00', to: '12:00', status: 'Time ran out' },
  completed: { title: 'Baixa Income Assurance', rides: 20, required: 20, earned: 212, guarantee: 212, from: '06:00', to: '12:00', status: 'Completed' },
} as const
export type LostStage = 'ask-latest' | 'choose-trip' | 'query-driver' | 'call-driver' | 'connect-rider' | 'follow-up' | 'ready-complete' | 'completed'
export type PickupStage = 'guide-rider' | 'query-driver' | 'promo-rider' | 'ready-complete' | 'completed'
export function pickupNextStep(state: Pick<DemoState, 'pickup'>) {
  return {
    'guide-rider': 'Inspect Trip Track, then ask Jason to stay at the main entrance.',
    'query-driver': 'Reply to Ivan and ask him to meet Jason at the main entrance.',
    'promo-rider': 'Reply to Jason with the €5 next-trip promo attached.',
    'ready-complete': 'Jason received the code and can see Ivan. Complete the support ticket.',
    'completed': 'This support ticket is completed.',
  }[state.pickup.stage]
}
export function pickupReplyAllowed(state: DemoState) {
  if (state.scenario !== 'pickup' || state.mode !== 'reply') return true
  if (state.pendingReply) return false
  return state.pickup.stage === 'query-driver' ? state.recipient === 'driver'
    : ['guide-rider', 'promo-rider'].includes(state.pickup.stage) && state.recipient === 'passenger'
}
export function pickupSendAllowed(state: DemoState) {
  return state.scenario === 'pickup' && state.mode === 'reply' && pickupReplyAllowed(state) && !state.localDraft
    && state.draft === preparedReply(state)
    && (state.pickup.stage !== 'promo-rider' || state.attachments.some(item => item.kind === 'promo' && item.amount === 5))
}
export function pickupWalkthrough(state: DemoState) {
  const rank = (['guide-rider', 'query-driver', 'promo-rider', 'ready-complete', 'completed'] as PickupStage[]).indexOf(state.pickup.stage)
  return ['Inspect the prepared track and guide Jason', 'Ask Ivan to meet Jason at the main entrance', 'Send Jason the €5 next-trip promo', 'Receive the meeting confirmation and complete'].map((title, i) => ({ title, state: rank > i ? 'completed' as const : rank === i ? 'current' as const : 'upcoming' as const }))
}
export function activeDemoTrip(state: Pick<DemoState, 'scenario' | 'lost'>) {
  const base = citymobilScenarios[state.scenario]
  return state.scenario === 'lost' ? { ...base, ...(lostTrips.find(trip => trip.id === state.lost.selectedTripId) ?? lostTrips[0]), title: base.title, passenger: base.passenger, status: base.status, paymentStatus: base.paymentStatus } : base
}
export function lostNextStep(state: Pick<DemoState, 'lost'>) {
  return {
    'ask-latest': 'Ask the rider whether this was their most recent trip.',
    'choose-trip': 'Select the confirmed latest trip from the trip list.',
    'query-driver': 'Reply to the selected driver and ask about the backpack.',
    'call-driver': 'The driver asked for a call. Call the selected driver, then finish the connected call.',
    'connect-rider': 'The driver agreed to share their demo contact. Open the action menu and choose Connect.',
    'follow-up': 'Ask the rider whether they reached the driver.',
    'ready-complete': 'The rider confirmed the arrangement. Complete the support ticket.',
    'completed': 'This support ticket is completed.',
  }[state.lost.stage]
}
export function lostReplyAllowed(state: DemoState) {
  if (state.mode === 'reply' && state.pendingReply) return false
  if (state.scenario !== 'lost' || state.mode !== 'reply') return true
  return state.lost.stage === 'ask-latest' && state.recipient === 'passenger'
    || state.lost.stage === 'query-driver' && state.lost.selectedTripId === 'latest' && state.recipient === 'driver'
    || state.lost.stage === 'follow-up' && state.lost.shared && state.recipient === 'passenger'
}
export type DemoAttachment = { kind: 'media' | 'file' | 'promo'; amount?: number }
export type DemoMessage = { id: number; role: Recipient | 'agent'; recipient: Recipient; text: string; attachments: DemoAttachment[]; kind?: 'call-summary'; contact?: { tripId: string; driver: string; avatar: string; masked: string } }
export type ForwardContext = { messageId: number; from: string; text: string; issue: string; date: string; origin: string; destination: string }
export type InternalEntry = { id: number; mode: 'forward' | 'note'; context: ForwardContext; team: typeof citymobilTeam[number] | null; comment: string; attachments: DemoAttachment[] }
export type RelatedContext = { id: string; title: string; reference: string; status: string; context: ForwardContext }
export function relatedCases(state: Pick<DemoState, 'scenario' | 'recipient' | 'messages'>): RelatedContext[] {
  const titles = state.scenario === 'pickup' ? ['Pickup clarification', 'Driver contact'] : state.scenario === 'lost' ? ['Item description', 'Return meeting'] : ['Program review', 'Trip timing']
  return titles.map((title, i) => ({ id: state.scenario + '-related-' + i, title, reference: 'CM-' + (18407 + i), status: 'Open', context: forwardedContext(state) }))
}
export type PendingReply = { run: number; scenario: ScenarioId; recipient: Recipient; name: string; tripId: string; text: string; expectedStage?: LostStage; nextStage?: LostStage; expectedPickupStage?: PickupStage; nextPickupStage?: PickupStage }
export type DemoState = {
  theme: 'light' | 'dark'; scenario: ScenarioId; recipient: Recipient; panel: 'info' | 'scripts'; draft: string; localDraft: boolean;
  mode: ConversationMode; answer: number; teamId: string; context: ForwardContext | null; internal: InternalEntry[];
  incomeProgram: keyof typeof incomePrograms; trackPercent: number;
  lost: { stage: LostStage; selectedTripId: string | null; consent: boolean; shared: boolean };
  pickup: { stage: PickupStage };
  links: RelatedContext[]; linkCandidate: string | null;
  messages: DemoMessage[]; attachments: DemoAttachment[]; reviewed: boolean; reason: string; driverReason: string;
  suggestion: 'idle' | 'loading' | 'ready'; revision: number;
  replyRun: number; pendingReply: PendingReply | null;
  call: { phase: 'idle' | 'calling' | 'connected'; target: Recipient; run: number; elapsed: number; muted: boolean };
}
export type DemoAction =
  | { type: 'theme'; value: DemoState['theme'] } | { type: 'panel'; value: DemoState['panel'] }
  | { type: 'scenario'; value: ScenarioId } | { type: 'recipient'; value: Recipient }
  | { type: 'mode'; value: ConversationMode } | { type: 'answer'; direction: -1 | 1 } | { type: 'team'; value: string }
  | { type: 'income-program'; value: DemoState['incomeProgram'] } | { type: 'track-time'; value: number }
  | { type: 'select-link'; value: string | null } | { type: 'unlink'; value: string }
  | { type: 'script-edit'; operation: 'insert' | 'backspace' | 'delete'; start: number; end: number; count?: number }
  | { type: 'draft-edit'; value: string }
  | { type: 'reviewed'; value: boolean } | { type: 'reason' | 'driverReason'; value: string }
  | { type: 'clear-draft' | 'accept-suggestion' | 'cancel-suggestion' | 'send' }
  | { type: 'suggest'; explicit?: boolean }
  | { type: 'focus-suggestion' }
  | { type: 'suggestion-ready'; revision: number }
  | { type: 'reply-delivered'; run: number; scenario: ScenarioId }
  | { type: 'attach'; value: DemoAttachment } | { type: 'remove-attachment'; index: number }
  | { type: 'call-start'; target: Recipient } | { type: 'call-connected' | 'call-tick'; run: number }
  | { type: 'call-end' | 'call-mute' }
  | { type: 'select-trip'; value: string } | { type: 'connect-rider' | 'complete-ticket' }

export function forwardedContext(state: Pick<DemoState, 'scenario' | 'recipient' | 'messages'> & Partial<Pick<DemoState, 'lost'>>): ForwardContext {
  const trip = state.lost ? activeDemoTrip({ scenario: state.scenario, lost: state.lost }) : citymobilScenarios[state.scenario]
  const source = state.messages.find(m => m.role === state.recipient && m.recipient === state.recipient) ?? state.messages[0]
  return { messageId: source.id, from: source.role === 'driver' ? trip.driver : trip.passenger, text: source.text, issue: trip.title, date: trip.day, origin: trip.origin, destination: trip.destination }
}
type ReplyContext = Pick<DemoState, 'scenario' | 'recipient'> & Partial<Pick<DemoState, 'mode' | 'answer' | 'incomeProgram' | 'lost' | 'pickup'>>
type ToneTexts = readonly [string, string, string]
/** One typed fixture source: warm, natural, strict; all three keep the same facts. */
function preparedTones(state: ReplyContext): ToneTexts {
  const trip = citymobilScenarios[state.scenario]
  if (state.mode === 'forward') {
    const topic = state.scenario === 'income' ? 'guaranteed-income question' : state.scenario === 'lost' ? 'lost-item request' : 'pickup request'
    return ['Could you please help review this ' + topic + '? I have included the original message and trip context below so we can confirm the next step together.', 'Please review this ' + topic + '. The original message and trip context are included below. Please help confirm the next step.', 'Review this ' + topic + ' and confirm the next step using the original message and trip context below.']
  }
  if (state.mode === 'note') {
    const finding = state.scenario === 'income' ? 'Program conditions and progress were explained; no payout decision recorded.' : 'Keep the confirmed meeting details with this conversation.'
    return ['The ' + trip.title.toLowerCase() + ' case and its displayed trip details have been reviewed carefully. ' + finding, 'Reviewed the ' + trip.title.toLowerCase() + ' case and the displayed trip details. ' + finding, 'Case review: ' + trip.title.toLowerCase() + '; displayed trip details checked. ' + finding]
  }
  if (state.scenario === 'lost' && state.lost) {
    const driver = lostTrips.find(trip => trip.id === state.lost?.selectedTripId)?.driver ?? lostTrips[0].driver
    if (state.lost.stage === 'ask-latest') return ['Of course, I’ll help you check. Was this your most recent trip, and could you tell me what you left in the car?', 'Was this your most recent trip? Please confirm what you left in the car.', 'Please confirm whether this was your most recent trip and identify the item left in the car.']
    if (state.lost.stage === 'query-driver') return ['Hi ' + driver + ', could you please check for Johnston’s blue backpack on the back seat after the 10:20 trip to Praça Luís de Camões? Have you found it?', 'Hi ' + driver + ', Johnston left a blue backpack on the back seat after the 10:20 trip to Praça Luís de Camões. Have you found it?', driver + ', please confirm whether you found Johnston’s blue backpack on the back seat after the 10:20 trip to Praça Luís de Camões.']
    if (state.lost.stage === 'follow-up') return ['Just checking in: have you been able to reach ' + driver + ' and arrange to collect your backpack?', 'Have you managed to contact ' + driver + ' about collecting your backpack?', 'Please confirm whether you contacted ' + driver + ' about collecting your backpack.']
    const hint = lostNextStep({ lost: state.lost })
    return [hint, hint, hint]
  }
  if (state.scenario === 'income') {
    if (state.incomeProgram === 'completed') return ['I’m happy to clarify the two examples. Baixa Income Assurance is marked Completed, with 20 of 20 rides in the displayed 06:00–12:00 window and €212 on its card. It is separate from the expired Rio de Mouro + Mem Martins program.', 'The Baixa Income Assurance example is marked Completed: 20 of 20 rides in the displayed 06:00–12:00 window, with €212 shown on the program card. This is separate from the expired Rio de Mouro + Mem Martins program.', 'Baixa Income Assurance: Completed, 20/20 rides, displayed window 06:00–12:00, card amount €212. Treat this separately from the expired Rio de Mouro + Mem Martins program.']
    return ['Let’s review the displayed card together. It shows 19 of 20 rides in Rio de Mouro + Mem Martins, within 06:00–12:00. The listed 12:05–12:34 trip is outside that window. Could you please confirm its date and area so we can check the conditions?', trip.reply, 'The Rio de Mouro + Mem Martins card shows 19/20 rides for 06:00–12:00. The listed 12:05–12:34 trip is outside that window. Confirm the trip date and area for review.']
  }
  if (state.scenario === 'pickup' && state.pickup?.stage === 'promo-rider') return ['I’m so sorry about the confusion and the wait, Jason. Ivan is coming to the main entrance. Here’s €5 off your next trip, with our thanks for your patience.', 'I’m sorry about the confusion and the wait, Jason. Ivan is coming to the main entrance. Here’s €5 off your next trip.', 'Jason, apologies for the confusion and wait. Ivan is coming to the main entrance. Here is €5 off your next trip.']
  if (state.scenario === 'pickup' && state.pickup && ['ready-complete', 'completed'].includes(state.pickup.stage)) {
    const hint = pickupNextStep({ pickup: state.pickup })
    return [hint, hint, hint]
  }
  if (state.recipient === 'driver') return ['Hi Ivan, could you please meet Jason at the main entrance on Praça da Alegria and confirm? He is waiting there.', trip.driverReply, 'Ivan, Jason is waiting at the main entrance on Praça da Alegria. Meet him there and confirm.']
  return ['Thanks so much for waiting, Jason. Ivan is at the north entrance. Please stay at the main entrance on Praça da Alegria; I’ll ask him to come and meet you there.', trip.reply, 'Jason, Ivan is at the north entrance. Stay at the main entrance on Praça da Alegria; I will ask him to meet you there.']
}
export function preparedReply(state: ReplyContext) {
  return preparedTones(state)[state.answer ?? 1] ?? preparedTones(state)[1]
}
export function composerNextAction(state: DemoState): string | null {
  if (state.mode !== 'reply') return null
  if (state.pendingReply) return 'Wait for ' + state.pendingReply.name + '’s reply.'
  if (state.scenario === 'pickup') {
    if (pickupReplyAllowed(state)) return null
    if (state.pickup.stage === 'completed') return 'Restart the scenario to begin again.'
    if (state.pickup.stage === 'ready-complete') return pickupNextStep(state)
    return state.pickup.stage === 'query-driver' ? 'Switch to Ivan Cheremisin to arrange the main-entrance pickup.' : 'Switch to Jason McBright to continue the pickup conversation.'
  }
  if (state.scenario !== 'lost' || lostReplyAllowed(state)) return null
  if (state.lost.stage === 'completed') return 'Restart the scenario to begin again.'
  if (state.lost.stage === 'ask-latest') return 'Reply to Johnston Serenity to confirm the most recent trip and missing item.'
  if (state.lost.stage === 'query-driver') return 'Switch to ' + activeDemoTrip(state).driver + ' to ask about the backpack.'
  if (state.lost.stage === 'follow-up') return 'Switch to Johnston Serenity to ask about collecting the backpack.'
  return lostNextStep(state)
}
export function lostWalkthrough(state: DemoState) {
  const stages: LostStage[] = ['ask-latest', 'choose-trip', 'query-driver', 'call-driver', 'connect-rider', 'follow-up', 'ready-complete', 'completed']
  const rank = stages.indexOf(state.lost.stage)
  const done = [rank >= 1, rank >= 2 && state.lost.selectedTripId === 'latest', rank >= 3, state.lost.consent, state.lost.shared, rank >= 6, rank === 7]
  const current = done.findIndex(value => !value)
  return ['Confirm the last trip and item', 'Select the confirmed trip', 'Message the driver and find the item', 'Call and record the arrangement and permission', 'Share the driver contact with the rider', 'Follow up and receive the rider’s acknowledgement', 'Complete the support ticket'].map((title, i) => ({ title, state: done[i] ? 'completed' as const : i === current ? 'current' as const : 'upcoming' as const }))
}
export function replayTimestamp(departure: string, arrival: string, percent: number) {
  const minutes = (s: string) => { const [h, m] = s.split(':').map(Number); return h * 60 + m }
  const from = minutes(departure); const to = minutes(arrival)
  const value = Math.round(from + ((to < from ? to + 1440 : to) - from) * Math.max(0, Math.min(100, percent)) / 100)
  return String(Math.floor(value / 60) % 24).padStart(2, '0') + ':' + String(value % 60).padStart(2, '0')
}
/** Only this composer handles the palette shortcut; search and browser select-all are untouched. */
export function composerShortcut(key: string, modifiers: { ctrl: boolean; meta: boolean; alt: boolean }, eligible: boolean) {
  if (modifiers.alt) return null
  if ((modifiers.ctrl || modifiers.meta) && key.toLowerCase() === 'a') return 'actions'
  if ((modifiers.ctrl || modifiers.meta) && key === 'Enter') return 'send'
  if (key === 'Tab' && !modifiers.ctrl && !modifiers.meta && eligible) return 'accept'
  return null
}
export function initialDemoState(theme: DemoState['theme'] = 'light', scenario: ScenarioId = 'pickup'): DemoState {
  const trip = citymobilScenarios[scenario]
  return { theme, scenario, recipient: scenario === 'income' ? 'driver' : 'passenger', panel: 'info', draft: '', localDraft: false, attachments: [], reviewed: false, reason: '', driverReason: '',
    mode: 'reply', answer: 1, teamId: 'emma', context: null, internal: [], incomeProgram: 'expired', trackPercent: 0, links: [], linkCandidate: null,
    lost: { stage: 'ask-latest', selectedTripId: null, consent: false, shared: false },
    pickup: { stage: 'guide-rider' },
    replyRun: 0, pendingReply: null, suggestion: 'idle', revision: 0, call: { phase: 'idle', target: 'passenger', run: 0, elapsed: 0, muted: false },
    messages: [
      { id: 1, role: 'passenger', recipient: 'passenger', text: trip.complaint, attachments: [] },
      ...(scenario === 'income' ? [{ id: 2, role: 'driver' as const, recipient: 'driver' as const, text: trip.driverMessage, attachments: [] }] : []),
    ] }
}
function changedComposer(state: DemoState) {
  return { draft: '', localDraft: false, attachments: [], suggestion: 'idle' as const, revision: state.revision + 1, linkCandidate: null, call: { ...state.call, phase: 'idle' as const, run: state.call.run + 1, elapsed: 0, muted: false } }
}
export function citymobilDemoReducer(state: DemoState, action: DemoAction): DemoState {
  if ((state.scenario === 'lost' && state.lost.stage === 'completed' || state.scenario === 'pickup' && state.pickup.stage === 'completed') && !['scenario', 'theme', 'panel', 'draft-edit', 'clear-draft', 'cancel-suggestion', 'track-time'].includes(action.type)) return state
  switch (action.type) {
    case 'theme': return { ...state, theme: action.value }
    case 'panel': return { ...state, panel: action.value }
    case 'scenario': {
      const fresh = initialDemoState(state.theme, action.value)
      return { ...fresh, replyRun: state.replyRun + 1, revision: state.revision + 1, call: { ...fresh.call, run: state.call.run + 1 } }
    }
    case 'recipient': return action.value === state.recipient ? state : { ...state, ...changedComposer(state), recipient: action.value, mode: 'reply', answer: 1, context: null }
    case 'mode': return action.value === state.mode ? state : { ...state, ...changedComposer(state), mode: action.value, answer: 1, context: action.value === 'reply' ? null : forwardedContext(state) }
    case 'team': return !citymobilTeam.some(t => t.id === action.value) ? state : { ...state, ...changedComposer(state), teamId: action.value }
    case 'answer': {
      const answer = (state.answer + action.direction + answerLabels.length) % answerLabels.length
      const eligible = !composerNextAction(state) && state.mode !== 'connect' && !state.localDraft
      const text = preparedReply({ ...state, answer })
      const draft = state.localDraft ? state.draft : !eligible ? '' : state.draft === preparedReply(state) ? text : text.slice(0, state.draft.length)
      return { ...state, answer, draft, suggestion: eligible ? 'loading' : 'idle', revision: state.revision + 1 }
    }
    case 'income-program': return { ...state, ...changedComposer(state), incomeProgram: action.value }
    case 'track-time': return Number.isFinite(action.value) ? { ...state, trackPercent: Math.max(0, Math.min(100, action.value)) } : state
    case 'select-trip': {
      if (state.pendingReply || state.scenario !== 'lost' || !['choose-trip', 'query-driver'].includes(state.lost.stage) || !lostTrips.some(trip => trip.id === action.value)) return state
      if (action.value === state.lost.selectedTripId) return state
      return { ...state, ...changedComposer(state), trackPercent: 0, lost: { stage: action.value === 'latest' ? 'query-driver' : 'choose-trip', selectedTripId: action.value, consent: false, shared: false } }
    }
    case 'connect-rider': {
      if (state.scenario !== 'lost' || state.lost.stage !== 'connect-rider' || !state.lost.consent || state.lost.shared || state.lost.selectedTripId !== 'latest') return state
      const trip = lostTrips[0]
      return { ...state, ...changedComposer(state), recipient: 'passenger', mode: 'reply', context: null, lost: { ...state.lost, stage: 'follow-up', shared: true }, messages: [...state.messages, { id: state.messages.length + 1, role: 'agent', recipient: 'passenger', text: 'With the driver’s permission, here is their demo contact for arranging the return.', attachments: [], contact: { tripId: trip.id, driver: trip.driver, avatar: trip.avatar, masked: trip.contact } }] }
    }
    case 'complete-ticket':
      if (state.scenario === 'pickup') return state.pickup.stage === 'ready-complete' && !state.pendingReply ? { ...state, ...changedComposer(state), pickup: { stage: 'completed' } } : state
      return state.scenario === 'lost' && state.lost.stage === 'ready-complete' && state.lost.consent && state.lost.shared ? { ...state, ...changedComposer(state), lost: { ...state.lost, stage: 'completed' } } : state
    case 'select-link': if (state.scenario === 'lost') return state; return action.value === null || relatedCases(state).some(c => c.id === action.value) && !state.links.some(c => c.id === action.value) ? { ...state, linkCandidate: action.value } : state
    case 'unlink': return { ...state, links: state.links.filter(link => link.id !== action.value) }
    case 'clear-draft': return { ...state, draft: '', localDraft: false, suggestion: 'idle', revision: state.revision + 1 }
    case 'draft-edit': {
      if (state.mode === 'connect' || !composerNextAction(state) && !state.localDraft) return state
      const draft = action.value.slice(0, 2000)
      return { ...state, draft, localDraft: Boolean(draft), suggestion: 'idle', revision: state.revision + 1 }
    }
    case 'script-edit': {
      if (state.mode === 'connect' || composerNextAction(state) || state.localDraft) return state
      const script = preparedReply(state)
      const start = Math.max(0, Math.min(state.draft.length, action.start))
      const end = Math.max(start, Math.min(state.draft.length, action.end))
      // Deleting a selection rewinds to its start; insertion reveals the next scripted characters.
      const length = action.operation === 'insert' ? start + Math.max(1, Math.min(32, action.count ?? 1))
        : end > start ? start : action.operation === 'backspace' ? Math.max(0, start - 1) : start
      return { ...state, draft: script.slice(0, length), suggestion: length < script.length ? 'ready' : 'idle', revision: state.revision + 1 }
    }
    case 'reviewed': return { ...state, reviewed: action.value }
    case 'reason': return { ...state, reason: action.value }
    case 'driverReason': return { ...state, driverReason: action.value }
    case 'suggest': return Boolean(composerNextAction(state)) || state.mode === 'connect' || state.suggestion !== 'idle' || state.localDraft && !action.explicit || !state.localDraft && state.draft.length >= preparedReply(state).length ? state : { ...state, ...(state.localDraft ? { draft: '', localDraft: false } : {}), suggestion: 'loading', revision: state.revision + 1 }
    case 'focus-suggestion': return composerNextAction(state) || state.mode === 'connect' || state.localDraft || state.draft.length >= preparedReply(state).length || state.suggestion === 'ready' ? state : { ...state, suggestion: 'ready', revision: state.revision + 1 }
    case 'suggestion-ready': return action.revision === state.revision && state.suggestion === 'loading' ? { ...state, suggestion: 'ready' } : state
    case 'accept-suggestion': return !composerNextAction(state) && !state.localDraft && state.suggestion === 'ready' ? { ...state, draft: preparedReply(state), suggestion: 'idle', revision: state.revision + 1 } : state
    case 'cancel-suggestion': return { ...state, suggestion: 'idle', revision: state.revision + 1 }
    case 'attach': return { ...state, attachments: [...state.attachments.filter(a => a.kind !== action.value.kind), action.value] }
    case 'remove-attachment': return { ...state, attachments: state.attachments.filter((_, i) => i !== action.index) }
    case 'send': {
      if (state.mode === 'connect') {
        if (state.scenario === 'lost') return state
        const link = relatedCases(state).find(c => c.id === state.linkCandidate)
        return !link || state.links.some(c => c.id === link.id) ? state : { ...state, ...changedComposer(state), links: [...state.links, link] }
      }
      const text = state.draft.trim()
      if (!text && !state.attachments.length) return state
      if (state.mode !== 'reply') {
        const context = state.context ?? forwardedContext(state)
        return { ...state, ...changedComposer(state), internal: [...state.internal, { id: state.internal.length + 1, mode: state.mode, context, team: state.mode === 'forward' ? citymobilTeam.find(t => t.id === state.teamId)! : null, comment: text, attachments: state.attachments }] }
      }
      if (state.pendingReply || state.localDraft) return state
      if (state.scenario === 'pickup') {
        if (!pickupSendAllowed(state)) return state
        const stage = state.pickup.stage
        const response = stage === 'guide-rider' ? citymobilScenarios.pickup.response
          : stage === 'query-driver' ? citymobilScenarios.pickup.driverResponse
          : 'Thanks, I’ve received the code. I can see Ivan now!'
        const next: PickupStage = stage === 'guide-rider' ? 'query-driver' : stage === 'query-driver' ? 'promo-rider' : 'ready-complete'
        return queueParticipantReply(state, text, response, undefined, next)
      }
      if (state.scenario === 'lost') {
        if (!lostReplyAllowed(state) || text !== preparedReply(state)) return state
        const stage = state.lost.stage
        const response = stage === 'ask-latest' ? 'Yes, it was my latest trip, today at 10:20 from Largo do Rato to Praça Luís de Camões. I left a blue backpack on the back seat.'
          : stage === 'query-driver' ? 'Yes, I found the blue backpack. I’m driving at the moment—could you give me a call to arrange the return?'
          : 'Yes, we spoke and arranged to meet by the main arch at Praça do Comércio at 11:15. Thank you for helping me get it back!'
        const next: LostStage = stage === 'ask-latest' ? 'choose-trip' : stage === 'query-driver' ? 'call-driver' : 'ready-complete'
        return queueParticipantReply(state, text, response, next)
      }
      const trip = citymobilScenarios[state.scenario]
      const response = state.scenario === 'income' && state.incomeProgram === 'completed' ? 'I understand. The completed Baixa example is separate from the expired program. Thank you for explaining the card.' : state.recipient === 'driver' ? trip.driverResponse : trip.response
      return queueParticipantReply(state, text, response)
    }
    case 'reply-delivered': {
      const pending = state.pendingReply
      if (!pending || pending.run !== action.run || pending.scenario !== action.scenario || state.scenario !== pending.scenario) return state
      const advance = pending.nextStage && state.lost.stage === pending.expectedStage && activeDemoTrip(state).id === pending.tripId
      const pickupAdvance = state.scenario === 'pickup' && pending.nextPickupStage && state.pickup.stage === pending.expectedPickupStage && activeDemoTrip(state).id === pending.tripId
      return { ...state, pendingReply: null, lost: advance ? { ...state.lost, stage: pending.nextStage! } : state.lost, pickup: pickupAdvance ? { stage: pending.nextPickupStage! } : state.pickup, messages: [...state.messages, { id: state.messages.length + 1, role: pending.recipient, recipient: pending.recipient, text: pending.text, attachments: [] }] }
    }
    case 'call-start': if (state.scenario === 'lost' && (state.lost.stage !== 'call-driver' || action.target !== 'driver' || state.lost.selectedTripId !== 'latest')) return state; return state.call.phase !== 'idle' ? state : { ...state, call: { phase: 'calling', target: action.target, run: state.call.run + 1, elapsed: 0, muted: false } }
    case 'call-connected': return state.call.phase === 'calling' && action.run === state.call.run ? { ...state, call: { ...state.call, phase: 'connected' } } : state
    case 'call-tick': return state.call.phase === 'connected' && action.run === state.call.run ? { ...state, call: { ...state.call, elapsed: state.call.elapsed + 1 } } : state
    case 'call-end': {
      const consent = state.scenario === 'lost' && state.lost.stage === 'call-driver' && state.lost.selectedTripId === 'latest' && state.call.phase === 'connected' && state.call.target === 'driver'
      return { ...state, call: { ...state.call, phase: 'idle', run: state.call.run + 1, elapsed: 0, muted: false }, ...(consent ? { lost: { ...state.lost, stage: 'connect-rider' as const, consent: true }, messages: [...state.messages, { id: state.messages.length + 1, role: 'agent' as const, recipient: 'driver' as const, kind: 'call-summary' as const, text: 'Simulated call summary: ' + lostTrips[0].driver + ' will return the backpack at the main arch on Praça do Comércio at 11:15 and explicitly agreed to share this demo contact with Johnston.', attachments: [] }] } : {}) }
    }
    case 'call-mute': return state.call.phase === 'idle' ? state : { ...state, call: { ...state.call, muted: !state.call.muted } }
  }
}

/** Feature-local timers return cleanup for edits, case changes, hangup and unmount. */
export function scheduleDemoSuggestion(revision: number, ready: (action: DemoAction) => void) {
  const timer = setTimeout(() => ready({ type: 'suggestion-ready', revision }), 600)
  return () => clearTimeout(timer)
}
export function scheduleDemoCall(call: Pick<DemoState['call'], 'phase' | 'run'>, dispatch: (action: DemoAction) => void) {
  if (call.phase === 'calling') {
    const timer = setTimeout(() => dispatch({ type: 'call-connected', run: call.run }), 1200)
    return () => clearTimeout(timer)
  }
  if (call.phase === 'connected') {
    const timer = setInterval(() => dispatch({ type: 'call-tick', run: call.run }), 1000)
    return () => clearInterval(timer)
  }
}

function queueParticipantReply(state: DemoState, text: string, response: string, nextStage?: LostStage, nextPickupStage?: PickupStage): DemoState {
  const trip = activeDemoTrip(state)
  const run = state.replyRun + 1
  return { ...state, draft: '', attachments: [], suggestion: 'idle', revision: state.revision + 1, replyRun: run,
    pendingReply: { run, scenario: state.scenario, recipient: state.recipient, name: trip[state.recipient], tripId: trip.id, text: response, ...(nextStage ? { expectedStage: state.lost.stage, nextStage } : {}), ...(nextPickupStage ? { expectedPickupStage: state.pickup.stage, nextPickupStage } : {}) },
    messages: [...state.messages, { id: state.messages.length + 1, role: 'agent', recipient: state.recipient, text, attachments: state.attachments }] }
}

/** Independent of composer edits/focus; cleanup owns scenario reset and unmount. */
export function scheduleDemoReply(pending: PendingReply | null, dispatch: (action: DemoAction) => void) {
  if (!pending) return
  const timer = setTimeout(() => dispatch({ type: 'reply-delivered', run: pending.run, scenario: pending.scenario }), 2000)
  return () => clearTimeout(timer)
}
