import { afterEach, describe, expect, it, vi } from 'vitest'
import { citymobilDemoReducer as reduce, citymobilScenarios, initialDemoState, preparedReply, scheduleDemoCall, scheduleDemoSuggestion, composerShortcut, relatedCases, replayTimestamp, incomePrograms, citymobilTeam } from '../citymobil-demo'
import type { DemoAction, DemoState, ScenarioId } from '../citymobil-demo'

describe('scripted composer and native conversation modes', () => {
  it('reveals prepared characters only, rewinds deletions/selections and supports bounded paste advance', () => {
    let state = initialDemoState()
    state = reduce(state, { type: 'script-edit', operation: 'insert', start: 0, end: 0 })
    expect(state.draft).toBe(preparedReply(state).slice(0, 1))
    state = reduce(state, { type: 'script-edit', operation: 'insert', start: 1, end: 1, count: 16 })
    expect(state.draft).toBe(preparedReply(state).slice(0, 17))
    state = reduce(state, { type: 'script-edit', operation: 'backspace', start: 17, end: 17 })
    expect(state.draft).toHaveLength(16)
    state = reduce(state, { type: 'script-edit', operation: 'delete', start: 4, end: 10 })
    expect(state.draft).toBe(preparedReply(state).slice(0, 4))
    state = reduce(state, { type: 'script-edit', operation: 'insert', start: 2, end: 4 })
    expect(state.draft).toBe(preparedReply(state).slice(0, 3))
    expect(reduce(state, { type: 'clear-draft' }).draft).toBe('')
  })
  it('scopes palette/send/eligible Tab decisions without turning ordinary navigation into typing', () => {
    const plain = { ctrl: false, meta: false, alt: false }
    expect(composerShortcut('a', { ...plain, meta: true }, false)).toBe('actions')
    expect(composerShortcut('A', { ...plain, ctrl: true }, false)).toBe('actions')
    expect(composerShortcut('Enter', { ...plain, ctrl: true }, false)).toBe('send')
    expect(composerShortcut('Tab', plain, true)).toBe('accept')
    for (const key of ['Tab', 'ArrowUp', 'ArrowRight', 'Home', 'End', 'Escape']) expect(composerShortcut(key, plain, false)).toBeNull()
    expect(composerShortcut('a', { ...plain, alt: true, meta: true }, false)).toBeNull()
  })
  it.each(['pickup', 'lost', 'income'] as ScenarioId[])('cycles coherent alternatives for every supported mode/recipient in %s', scenario => {
    for (const recipient of scenario === 'income' ? ['driver'] as const : ['passenger', 'driver'] as const) for (const mode of ['reply', 'forward', 'note'] as const) {
      let state = reduce(reduce(initialDemoState('light', scenario), { type: 'recipient', value: recipient }), { type: 'mode', value: mode })
      const neutral = preparedReply(state)
      const oldRevision = state.revision
      state = reduce(state, { type: 'answer', direction: 1 })
      expect(preparedReply(state)).not.toBe(neutral)
      expect(state).toMatchObject({ draft: '', suggestion: scenario !== 'income' && recipient === 'driver' && mode === 'reply' ? 'idle' : 'loading' })
      expect(reduce(state, { type: 'suggestion-ready', revision: oldRevision })).toBe(state)
      state = reduce(state, { type: 'answer', direction: -1 })
      expect(preparedReply(state)).toBe(neutral)
    }
  })
  it('forwards an immutable source context plus separate comment to the chosen fictional team without outward reply', () => {
    const initial = initialDemoState()
    let state = reduce(initial, { type: 'mode', value: 'forward' })
    const context = state.context
    state = reduce(state, { type: 'team', value: 'milton' })
    state = delivered(reduce(reduce(ready(state), { type: 'accept-suggestion' }), { type: 'send' }))
    expect(state.messages).toBe(initial.messages)
    expect(state.internal).toHaveLength(1)
    expect(state.internal[0]).toMatchObject({ mode: 'forward', team: citymobilTeam[2], context: { from: citymobilScenarios.pickup.passenger, text: citymobilScenarios.pickup.complaint, origin: citymobilScenarios.pickup.origin } })
    expect(state.internal[0].context).toBe(context)
    expect(state.internal[0].comment).toContain('original message')
    expect(context?.text).toBe(initial.messages[0].text)
    expect(initial.messages).toHaveLength(1)
    expect(reduce(state, { type: 'team', value: 'unknown' })).toBe(state)
  })
  it('saves an internal note with no passenger acknowledgement or team delivery', () => {
    const initial = initialDemoState('dark', 'lost')
    let state = reduce(initial, { type: 'mode', value: 'note' })
    state = delivered(reduce(reduce(ready(state), { type: 'accept-suggestion' }), { type: 'send' }))
    expect(state.messages).toBe(initial.messages)
    expect(state.internal[0]).toMatchObject({ mode: 'note', team: null })
    expect(state.internal[0].comment).toContain('item in the car')
    expect(state.theme).toBe('dark')
  })
  it('changing mode/recipient/team cancels old loader and call tokens without editing committed content', () => {
    let state = reduce(initialDemoState(), { type: 'call-start', target: 'driver' })
    state = reduce(state, { type: 'suggest' })
    const before = state
    const changed = reduce(state, { type: 'mode', value: 'forward' })
    expect(changed).toMatchObject({ mode: 'forward', draft: '', suggestion: 'idle', call: { phase: 'idle' } })
    expect(reduce(changed, { type: 'call-connected', run: before.call.run })).toBe(changed)
    expect(reduce(changed, { type: 'suggestion-ready', revision: before.revision })).toBe(changed)
    expect(changed.messages).toBe(before.messages)
    expect(reduce(changed, { type: 'recipient', value: 'driver' })).toMatchObject({ mode: 'reply', context: null, draft: '' })
  })
  it('connects only related same-trip contexts, requires confirmation, prevents self/duplicates and unlinks safely', () => {
    const initial = initialDemoState('dark', 'pickup')
    let state = reduce(initial, { type: 'mode', value: 'connect' })
    const options = relatedCases(state)
    expect(reduce(state, { type: 'select-link', value: citymobilScenarios.pickup.id })).toBe(state)
    expect(reduce(state, { type: 'send' })).toBe(state)
    const selected = reduce(state, { type: 'select-link', value: options[0].id })
    expect(selected.links).toEqual([])
    expect(reduce(selected, { type: 'select-link', value: null }).links).toEqual([])
    state = reduce(selected, { type: 'send' })
    expect(state.links[0].context.origin).toBe(citymobilScenarios.pickup.origin)
    expect(state.links[0].context.from).toBe(citymobilScenarios.pickup.passenger)
    expect(state.messages).toBe(initial.messages)
    expect(state.internal).toEqual([])
    expect(reduce(state, { type: 'select-link', value: options[0].id })).toBe(state)
    expect(reduce(state, { type: 'send' })).toBe(state)
    expect(reduce(state, { type: 'unlink', value: options[0].id })).toMatchObject({ links: [], theme: 'dark', recipient: 'passenger' })
    expect(reduce(state, { type: 'scenario', value: 'income' })).toMatchObject({ links: [], internal: [], trackPercent: 0 })
  })
  it('bounds replay time and updates timestamps from the same case interval', () => {
    const state = reduce(initialDemoState(), { type: 'track-time', value: 50 })
    expect(reduce(state, { type: 'track-time', value: 300 / 1860 * 100 }).trackPercent).toBeCloseTo(300 / 1860 * 100, 8)
    expect(replayTimestamp('12:00', '12:30', state.trackPercent)).toBe('12:15')
    expect(replayTimestamp('23:50', '00:10', 50)).toBe('00:00')
    expect(replayTimestamp('12:00', '12:31', 0)).toBe('12:00')
    expect(replayTimestamp('12:00', '12:31', 100)).toBe('12:31')
    expect(reduce(state, { type: 'track-time', value: -8 }).trackPercent).toBe(0)
    expect(reduce(state, { type: 'track-time', value: 999 }).trackPercent).toBe(100)
    expect(reduce(state, { type: 'track-time', value: NaN })).toBe(state)
    expect(reduce(state, { type: 'scenario', value: 'lost' }).trackPercent).toBe(0)
  })
  it('keeps completed income coherent and separate from the expired program and pending loader', () => {
    let state = reduce(initialDemoState('light', 'income'), { type: 'suggest' })
    const revision = state.revision
    state = reduce(state, { type: 'income-program', value: 'completed' })
    expect(incomePrograms.completed).toMatchObject({ rides: 20, required: 20, earned: 212, guarantee: 212, status: 'Completed' })
    expect(incomePrograms.expired).toMatchObject({ rides: 19, required: 20, status: 'Time ran out' })
    expect(reduce(state, { type: 'suggestion-ready', revision })).toBe(state)
    expect(preparedReply(state)).toContain('Baixa')
    state = delivered(reduce(reduce(ready(state), { type: 'accept-suggestion' }), { type: 'send' }))
    expect(state.messages.at(-1)?.text).toContain('completed Baixa')
    expect(reduce(state, { type: 'income-program', value: 'expired' }).messages).toBe(state.messages)
  })
})

function ready(state: DemoState) {
  const loading = reduce(state, { type: 'suggest' })
  return reduce(loading, { type: 'suggestion-ready', revision: loading.revision })
}

describe('bounded Citymobil scenarios', () => {
  it.each(['pickup', 'income'] as ScenarioId[])('delivers the first %s prepared reply and coherent acknowledgement', scenario => {
    const initial = initialDemoState('light', scenario)
    const accepted = reduce(ready(initial), { type: 'accept-suggestion' })
    expect(accepted.draft).toBe(citymobilScenarios[scenario].reply)
    const sent = delivered(reduce(accepted, { type: 'send' }))
    expect(sent.messages.filter(m => m.recipient === initial.recipient).map(m => m.text)).toEqual(scenario === 'income' ? [citymobilScenarios.income.driverMessage, citymobilScenarios.income.driverReply, citymobilScenarios.income.driverResponse] : [citymobilScenarios[scenario].complaint, citymobilScenarios[scenario].reply, citymobilScenarios[scenario].response])
    expect(sent.draft).toBe('')
    expect(initial.messages).toHaveLength(scenario === 'pickup' ? 1 : 2)
  })
  it('preserves conversation, edit, checklist and suggestion context across theme and Info/Scripts', () => {
    const state = { ...ready(initialDemoState()), reviewed: true, reason: 'Main entrance confirmed' }
    const result = reduce(reduce(state, { type: 'panel', value: 'scripts' }), { type: 'theme', value: 'dark' })
    expect(result).toEqual({ ...state, panel: 'scripts', theme: 'dark' })
    expect(result.messages).toBe(state.messages)
  })
  it('scripted advance invalidates loading and never accepts the stale callback', () => {
    const loading = reduce(initialDemoState(), { type: 'suggest' })
    const edited = reduce(loading, { type: 'script-edit', operation: 'insert', start: 0, end: 0, count: 4 })
    expect(reduce(edited, { type: 'suggestion-ready', revision: loading.revision })).toBe(edited)
    expect(edited.draft).toBe(preparedReply(edited).slice(0, 4))
    expect(reduce(edited, { type: 'accept-suggestion' }).draft).toBe(preparedReply(edited))
  })
  it('Escape cancellation invalidates the old job even when a new job starts', () => {
    const old = reduce(initialDemoState(), { type: 'suggest' })
    const next = reduce(reduce(old, { type: 'cancel-suggestion' }), { type: 'suggest' })
    expect(reduce(next, { type: 'suggestion-ready', revision: old.revision })).toBe(next)
    expect(reduce(next, { type: 'suggestion-ready', revision: next.revision }).suggestion).toBe('ready')
  })
  it('switches recipient context without mixing passenger and driver replies', () => {
    const confirmed = delivered(reduce({ ...initialDemoState(), draft: preparedReply(initialDemoState()) }, { type: 'send' }))
    const driver = reduce(confirmed, { type: 'recipient', value: 'driver' })
    const sent = delivered(reduce(reduce(ready(driver), { type: 'accept-suggestion' }), { type: 'send' }))
    expect(preparedReply(driver)).toBe(citymobilScenarios.pickup.driverReply)
    expect(sent.messages.at(-1)?.text).toBe(citymobilScenarios.pickup.driverResponse)
    expect(sent.messages.at(-1)?.recipient).toBe('driver')
    expect(sent.messages.filter(m => m.recipient === 'passenger')).toHaveLength(3)
  })
  it('clears transient work on case change while preserving theme and rejecting old callbacks', () => {
    let state = reduce(initialDemoState('dark'), { type: 'call-start', target: 'driver' })
    state = reduce(state, { type: 'attach', value: { kind: 'file' } })
    state = reduce(state, { type: 'suggest' })
    const changed = reduce(state, { type: 'scenario', value: 'lost' })
    expect(changed).toMatchObject({ scenario: 'lost', theme: 'dark', draft: '', attachments: [], recipient: 'passenger', panel: 'info', suggestion: 'idle', call: { phase: 'idle', elapsed: 0 } })
    expect(changed.messages[0].text).toBe(citymobilScenarios.lost.complaint)
    expect(reduce(changed, { type: 'suggestion-ready', revision: state.revision })).toBe(changed)
    expect(reduce(changed, { type: 'call-connected', run: state.call.run })).toBe(changed)
  })
  it('removes attachments and sends fixture references only with the matching Income explanation', () => {
    const added = reduce(reduce(initialDemoState('light', 'income'), { type: 'attach', value: { kind: 'file' } }), { type: 'attach', value: { kind: 'media' } })
    const removed = reduce(added, { type: 'remove-attachment', index: 0 })
    expect(removed.attachments).toEqual([{ kind: 'media' }])
    expect(reduce(removed, { type: 'send' })).toBe(removed)
    const sent = reduce(reduce(ready(removed), { type: 'accept-suggestion' }), { type: 'send' })
    expect(sent.messages.at(-1)?.attachments).toEqual([{ kind: 'media' }])
    expect(sent.attachments).toEqual([])
    expect(added.attachments).toHaveLength(2)
  })
  it('replaces a promo selection rather than accumulating duplicate cards', () => {
    const state = reduce(reduce(initialDemoState(), { type: 'attach', value: { kind: 'promo', amount: 3 } }), { type: 'attach', value: { kind: 'promo', amount: 5 } })
    expect(state.attachments).toEqual([{ kind: 'promo', amount: 5 }])
  })
  it('bounds scripted advances and ignores empty sends', () => {
    const state = { ...initialDemoState(), draft: '   ' }
    expect(reduce(state, { type: 'send' })).toBe(state)
    expect(reduce(initialDemoState(), { type: 'script-edit', operation: 'insert', start: 0, end: 0, count: 2100 }).draft).toHaveLength(32)
  })
  it('keeps every fixture fare arithmetically consistent', () => {
    for (const trip of Object.values(citymobilScenarios)) {
      const cents = (value: string) => Math.round(Number(value) * 100)
      expect(cents(trip.base) + cents(trip.tolls) - cents(trip.discount)).toBe(cents(trip.fare))
    }
  })
})

describe('local call and suggestion lifecycle', () => {
  afterEach(() => { vi.useRealTimers() })
  it('cancels suggestion timeout on cleanup and commits only after the bounded delay', () => {
    vi.useFakeTimers()
    const dispatch = vi.fn()
    const cleanup = scheduleDemoSuggestion(1, dispatch)
    vi.advanceTimersByTime(599)
    expect(dispatch).not.toHaveBeenCalled()
    cleanup()
    vi.advanceTimersByTime(1000)
    expect(dispatch).not.toHaveBeenCalled()
    scheduleDemoSuggestion(2, dispatch)
    vi.advanceTimersByTime(600)
    expect(dispatch).toHaveBeenCalledExactlyOnceWith({ type: 'suggestion-ready', revision: 2 })
    expect(vi.getTimerCount()).toBe(0)
  })
  it('connects once, counts elapsed seconds and stops every timer on cleanup', () => {
    vi.useFakeTimers()
    let state = reduce(initialDemoState(), { type: 'call-start', target: 'driver' })
    const dispatch = (action: DemoAction) => { state = reduce(state, action) }
    const cleanupCalling = scheduleDemoCall(state.call, dispatch)!
    vi.advanceTimersByTime(1199)
    expect(state.call.phase).toBe('calling')
    vi.advanceTimersByTime(1)
    expect(state.call.phase).toBe('connected')
    cleanupCalling()
    const cleanupConnected = scheduleDemoCall(state.call, dispatch)!
    vi.advanceTimersByTime(3000)
    expect(state.call.elapsed).toBe(3)
    cleanupConnected()
    dispatch({ type: 'call-end' })
    vi.advanceTimersByTime(5000)
    expect(state.call).toMatchObject({ phase: 'idle', elapsed: 0 })
    expect(vi.getTimerCount()).toBe(0)
  })
  it('rejects repeated start, late connect/ticks and changes call context safely', () => {
    const calling = reduce(initialDemoState(), { type: 'call-start', target: 'driver' })
    expect(reduce(calling, { type: 'call-start', target: 'passenger' })).toBe(calling)
    const ended = reduce(calling, { type: 'call-end' })
    const restarted = reduce(ended, { type: 'call-start', target: 'passenger' })
    expect(reduce(restarted, { type: 'call-connected', run: calling.call.run })).toBe(restarted)
    expect(reduce(ended, { type: 'call-tick', run: calling.call.run })).toBe(ended)
    const switched = reduce(calling, { type: 'recipient', value: 'driver' })
    expect(switched.call.phase).toBe('idle')
    expect(switched.recipient).toBe('driver')
  })
  it('cancels an early hangup before any connect callback', () => {
    vi.useFakeTimers()
    const dispatch = vi.fn()
    const state = reduce(initialDemoState(), { type: 'call-start', target: 'driver' })
    const cleanup = scheduleDemoCall(state.call, dispatch)!
    cleanup()
    vi.advanceTimersByTime(2000)
    expect(dispatch).not.toHaveBeenCalled()
    expect(vi.getTimerCount()).toBe(0)
  })
})

function delivered(state: DemoState) {
  return state.pendingReply ? reduce(state, { type: 'reply-delivered', run: state.pendingReply.run, scenario: state.scenario }) : state
}
