import { describe, expect, it } from 'vitest'
import { citymobilDemoReducer as reduce, initialDemoState, preparedReply } from '../citymobil-demo'
import type { DemoState } from '../citymobil-demo'

const focus = (state: DemoState) => reduce(state, { type: 'focus-suggestion' })
function send(state: DemoState) {
  const pending = reduce(reduce(focus(state), { type: 'accept-suggestion' }), { type: 'send' })
  return pending.pendingReply ? reduce(pending, { type: 'reply-delivered', run: pending.pendingReply.run, scenario: pending.scenario }) : pending
}
function queried() {
  const selected = reduce(send(initialDemoState('light', 'lost')), { type: 'select-trip', value: 'latest' })
  return send(reduce(selected, { type: 'recipient', value: 'driver' }))
}

describe('immediate focus preview', () => {
  it('reveals an empty eligible reply synchronously without accepting or sending it', () => {
    const initial = initialDemoState('light', 'lost')
    const preview = focus(initial)
    expect(preview.suggestion).toBe('ready')
    expect(preview.draft).toBe('')
    expect(preview.messages).toBe(initial.messages)
    expect(reduce(preview, { type: 'send' })).toBe(preview)
    const accepted = reduce(preview, { type: 'accept-suggestion' })
    expect(accepted.draft).toBe(preparedReply(preview))
    expect(accepted.messages).toBe(initial.messages)
    expect(reduce(accepted, { type: 'send' }).pendingReply?.recipient).toBe('passenger')
  })
  it('promotes preparation and preserves a typed prefix while keeping three variants unaccepted', () => {
    let state = initialDemoState('dark', 'lost')
    const variants = new Set<string>()
    for (let i = 0; i < 3; i++) {
      state = focus(reduce(state, { type: 'answer', direction: 1 }))
      variants.add(preparedReply(state))
      expect(state).toMatchObject({ draft: '', suggestion: 'ready' })
    }
    expect(variants.size).toBe(3)
    state = reduce(state, { type: 'script-edit', operation: 'insert', start: 0, end: 0, count: 5 })
    const prefix = state.draft
    state = focus(reduce(state, { type: 'cancel-suggestion' }))
    expect(state.draft).toBe(prefix)
    expect(state.suggestion).toBe('ready')
  })
  it('does not bypass recipient, pending, local-draft, call, consent or completion guards', () => {
    const initial = initialDemoState('light', 'lost')
    const pending = reduce(reduce(focus(initial), { type: 'accept-suggestion' }), { type: 'send' })
    const blocked = send(initial)
    const local = reduce(blocked, { type: 'draft-edit', value: 'Keep my local note' })
    const calling = reduce(queried(), { type: 'call-start', target: 'driver' })
    const connected = reduce(calling, { type: 'call-connected', run: calling.call.run })
    const consent = reduce(connected, { type: 'call-end' })
    const wrong = reduce(initial, { type: 'recipient', value: 'driver' })
    for (const state of [pending, blocked, local, calling, connected, consent, wrong]) expect(focus(state)).toBe(state)
    expect(focus(calling).call).toBe(calling.call)
    expect(focus(pending).pendingReply).toBe(pending.pendingReply)
    let shared = reduce(consent, { type: 'connect-rider' })
    expect(focus(shared).suggestion).toBe('ready')
    shared = reduce(send(shared), { type: 'complete-ticket' })
    expect(shared.lost.stage).toBe('completed')
    expect(focus(shared)).toBe(shared)
  })
})
