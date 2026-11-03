import { afterEach, describe, expect, it, vi } from 'vitest'
import { citymobilDemoReducer as reduce, citymobilScenarios, initialDemoState, preparedReply, pickupReplyAllowed, pickupSendAllowed, pickupWalkthrough, composerNextAction, scheduleDemoReply, type DemoState } from '../citymobil-demo'

function accept(state: DemoState) { return reduce(reduce(state, { type: 'focus-suggestion' }), { type: 'accept-suggestion' }) }
function send(state: DemoState) { return reduce(accept(state), { type: 'send' }) }
function deliver(state: DemoState) { return reduce(state, { type: 'reply-delivered', run: state.pendingReply!.run, scenario: 'pickup' }) }
function driverStage() { return deliver(send(initialDemoState('dark', 'pickup'))) }
function promoStage() { return deliver(send(reduce(driverStage(), { type: 'recipient', value: 'driver' }))) }
afterEach(() => vi.useRealTimers())

describe('approved causal Pickup walkthrough', () => {
  it.each([0, 1, 2])('completes every causal transition with tone %i and the deliberately sent €5 attachment', answer => {
    let state = { ...initialDemoState('light', 'pickup'), answer }
    expect(state.messages).toHaveLength(1)
    expect(state.messages[0].text).toBe('Hi, I’m at the main entrance, but I can’t see my driver. Could you help?')
    expect(preparedReply(state)).toContain('north entrance')
    const initial = state
    state = send(state)
    expect(state.pickup.stage).toBe('guide-rider')
    expect(state.messages.at(-1)?.role).toBe('agent')
    expect(reduce(state, { type: 'send' })).toBe(state)
    state = deliver(state)
    expect(state.pickup.stage).toBe('query-driver')
    expect(state.messages.at(-1)?.text).toBe(citymobilScenarios.pickup.response)
    state = { ...reduce(state, { type: 'recipient', value: 'driver' }), answer }
    expect(preparedReply(state)).toContain('Praça da Alegria')
    state = deliver(send(state))
    expect(state.pickup.stage).toBe('promo-rider')
    expect(state.messages.at(-1)?.text).toBe(citymobilScenarios.pickup.driverResponse)
    state = { ...reduce(state, { type: 'recipient', value: 'passenger' }), answer }
    state = accept(state)
    expect(preparedReply(state)).toContain('€5 off your next trip')
    expect(pickupSendAllowed(state)).toBe(false)
    state = reduce(state, { type: 'attach', value: { kind: 'promo', amount: 5 } })
    expect(state.pickup.stage).toBe('promo-rider')
    expect(pickupSendAllowed(state)).toBe(true)
    state = reduce(state, { type: 'send' })
    expect(state.messages.at(-1)?.attachments).toEqual([{ kind: 'promo', amount: 5 }])
    expect(reduce(state, { type: 'complete-ticket' })).toBe(state)
    const delivered = deliver(state)
    expect(delivered.messages.at(-1)?.text).toBe('Thanks, I’ve received the code. I can see Ivan now!')
    expect(delivered.pickup.stage).toBe('ready-complete')
    state = reduce(delivered, { type: 'complete-ticket' })
    expect(state.pickup.stage).toBe('completed')
    expect(pickupWalkthrough(state).every(step => step.state === 'completed')).toBe(true)
    expect(state.lost).toBe(initial.lost)
    expect(reduce(state, { type: 'call-start', target: 'driver' })).toBe(state)
  })
  it('never acknowledges wrong-recipient, arbitrary, partial or attachment-only sends', () => {
    for (const base of [initialDemoState(), driverStage(), promoStage()]) {
      const wrong = reduce(base, { type: 'recipient', value: base.pickup.stage === 'query-driver' ? 'passenger' : 'driver' })
      expect(pickupReplyAllowed(wrong)).toBe(false)
      expect(composerNextAction(wrong)).toContain('Switch to')
      expect(reduce(wrong, { type: 'focus-suggestion' })).toBe(wrong)
      for (const draft of ['arbitrary', preparedReply(wrong), preparedReply(base).slice(0, 12)]) {
        const sent = { ...wrong, draft }
        expect(reduce(sent, { type: 'send' })).toBe(sent)
      }
      expect(reduce(base, { type: 'complete-ticket' })).toBe(base)
      const attached = reduce(base, { type: 'attach', value: { kind: 'promo', amount: 5 } })
      expect(reduce(attached, { type: 'send' })).toBe(attached)
      const right = reduce(base, { type: 'recipient', value: base.pickup.stage === 'query-driver' ? 'driver' : 'passenger' })
      for (const draft of ['arbitrary', preparedReply(right).slice(0, 12)]) {
        const partial = { ...right, draft, attachments: [{ kind: 'promo' as const, amount: 5 }] }
        expect(reduce(partial, { type: 'send' })).toBe(partial)
      }
    }
  })
  it('does not claim code receipt when promo is absent, cancelled, removed or the wrong amount', () => {
    const base = accept(reduce(promoStage(), { type: 'recipient', value: 'passenger' }))
    expect(reduce(base, { type: 'send' })).toBe(base)
    for (const amount of [1, 3, 7, 10, NaN]) {
      const wrong = reduce(base, { type: 'attach', value: { kind: 'promo', amount } })
      expect(reduce(wrong, { type: 'send' })).toBe(wrong)
    }
    const attached = reduce(base, { type: 'attach', value: { kind: 'promo', amount: 5 } })
    const removed = reduce(attached, { type: 'remove-attachment', index: 0 })
    expect(reduce(removed, { type: 'send' })).toBe(removed)
    expect(removed.messages.some(message => message.text.includes('received the code'))).toBe(false)
  })
  it('keeps pending delivery on its original participant through edits/theme/map/recipient switches and rejects duplicates', () => {
    vi.useFakeTimers()
    let state = send(initialDemoState())
    const pending = state.pendingReply!
    const cleanup = scheduleDemoReply(pending, action => { state = reduce(state, action) })!
    vi.advanceTimersByTime(1000)
    state = reduce(state, { type: 'draft-edit', value: 'Local note' })
    state = reduce(state, { type: 'theme', value: 'dark' })
    state = reduce(state, { type: 'track-time', value: 45 })
    expect(state.pendingReply).toBe(pending)
    state = reduce(state, { type: 'recipient', value: 'driver' })
    vi.advanceTimersByTime(1000)
    expect(state.pickup.stage).toBe('query-driver')
    expect(state.recipient).toBe('driver')
    expect(state.messages.at(-1)?.recipient).toBe('passenger')
    expect(state.messages).toHaveLength(3)
    expect(reduce(state, { type: 'reply-delivered', run: pending.run, scenario: 'pickup' })).toBe(state)
    cleanup()
    expect(vi.getTimerCount()).toBe(0)
  })
  it('resets pending work with a new run while preserving theme and rejects stale callbacks after a new send', () => {
    const before = send(initialDemoState('dark'))
    const stale = before.pendingReply!
    const reset = reduce(before, { type: 'scenario', value: 'pickup' })
    expect(reset).toMatchObject({ theme: 'dark', pickup: { stage: 'guide-rider' }, pendingReply: null, draft: '', attachments: [] })
    const next = send(reset)
    expect(reduce(next, { type: 'reply-delivered', run: stale.run, scenario: 'pickup' })).toBe(next)
    expect(deliver(next).pickup.stage).toBe('query-driver')
    const income = reduce(before, { type: 'scenario', value: 'income' })
    expect(reduce(income, { type: 'reply-delivered', run: stale.run, scenario: 'pickup' })).toBe(income)
  })
  it('keeps checklist/stage unchanged through map inspection, notes and removed drafts', () => {
    const initial = initialDemoState()
    const view = reduce(reduce(initial, { type: 'track-time', value: 75 }), { type: 'panel', value: 'scripts' })
    expect(pickupWalkthrough(view)).toEqual(pickupWalkthrough(initial))
    const note = reduce(view, { type: 'mode', value: 'note' })
    const saved = reduce(accept(note), { type: 'send' })
    expect(saved.internal).toHaveLength(1)
    expect(saved.pickup).toBe(initial.pickup)
    expect(saved.messages).toBe(initial.messages)
  })
})
