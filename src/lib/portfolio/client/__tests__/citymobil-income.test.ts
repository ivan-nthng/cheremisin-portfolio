import { describe, expect, it } from 'vitest'
import { activeDemoTrip, citymobilDemoReducer as reduce, demoIncomeProgram, incomeCompleteAllowed, incomeSendAllowed, initialDemoState, preparedReply } from '../citymobil-demo'
import type { DemoState } from '../citymobil-demo'

const anchor = Date.parse('2026-11-08T00:10:00Z')
function prepared(state = initialDemoState('light', 'income', anchor)) {
  return reduce(reduce(state, { type: 'focus-suggestion' }), { type: 'accept-suggestion' })
}
function deliver(state: DemoState) {
  return reduce(state, { type: 'reply-delivered', scenario: state.scenario, run: state.pendingReply!.run, at: anchor + 2000 })
}

describe('Guaranteed Income completion', () => {
  it.each([0, 1, 2])('requires matching explanation and driver acknowledgement for tone %s', answer => {
    const state = prepared({ ...initialDemoState('light', 'income', anchor), answer })
    const program = demoIncomeProgram('expired', anchor), trip = activeDemoTrip(state)
    expect(state.draft).toContain(program.from + '–' + program.to)
    expect(state.draft).toContain(trip.departure + '–' + trip.arrival)
    expect(state.draft).toContain('19')
    expect(incomeCompleteAllowed(state)).toBe(false)
    expect(reduce(state, { type: 'complete-ticket' })).toBe(state)
    expect(incomeSendAllowed(state)).toBe(true)
    const sent = reduce(state, { type: 'send', at: anchor })
    expect(sent.income.stage).toBe('explain')
    expect(sent.pendingReply).toMatchObject({ scenario: 'income', incomeProgram: 'expired', recipient: 'driver', expectedIncomeStage: 'explain' })
    expect(incomeCompleteAllowed(sent)).toBe(false)
    expect(reduce(sent, { type: 'complete-ticket' })).toBe(sent)
    expect(reduce(sent, { type: 'send' })).toBe(sent)
    const acknowledged = deliver(sent)
    expect(acknowledged.income.stage).toBe('ready-complete')
    expect(acknowledged.messages.at(-1)?.text).toContain('my last trip was outside the displayed window')
    expect(acknowledged.messages.at(-1)?.at).toBe(anchor + 2000)
    expect(incomeCompleteAllowed(acknowledged)).toBe(true)
    const done = reduce(acknowledged, { type: 'complete-ticket' })
    expect(done.income.stage).toBe('completed')
    expect(done.messages).toBe(acknowledged.messages)
    expect(done.sessionStartedAt).toBe(anchor)
    expect(reduce(done, { type: 'complete-ticket' })).toBe(done)
    expect(reduce(done, { type: 'send' })).toBe(done)
    expect(reduce(done, { type: 'call-start', target: 'driver' })).toBe(done)
  })

  it('does not turn arbitrary text, prefixes, attachments, local drafts, or a wrong recipient into an acknowledgement', () => {
    const base = initialDemoState('light', 'income', anchor)
    for (const state of [
      { ...base, draft: 'Please pay the guarantee.' },
      { ...base, draft: preparedReply(base).slice(0, -1) },
      { ...base, attachments: [{ kind: 'file' as const }] },
      { ...base, draft: preparedReply(base), localDraft: true },
      { ...prepared(base), recipient: 'passenger' as const },
      { ...prepared(base), incomeProgram: 'completed' as const },
    ]) {
      expect(incomeSendAllowed(state)).toBe(false)
      expect(reduce(state, { type: 'send' })).toBe(state)
      expect(reduce(state, { type: 'complete-ticket' })).toBe(state)
    }
  })

  it('keeps Baixa conversation distinct and cannot complete the expired request from it', () => {
    let state = prepared(reduce(initialDemoState('light', 'income', anchor), { type: 'income-program', value: 'completed' }))
    expect(state.draft).toContain('20 of 20')
    state = deliver(reduce(state, { type: 'send' }))
    expect(state.messages.at(-1)?.text).toContain('completed Baixa example is separate')
    expect(state.income.stage).toBe('explain')
    expect(incomeCompleteAllowed(state)).toBe(false)
    state = reduce(state, { type: 'income-program', value: 'expired' })
    expect(incomeCompleteAllowed(state)).toBe(false)
    state = deliver(reduce(prepared(state), { type: 'send' }))
    expect(incomeCompleteAllowed(state)).toBe(true)
    state = reduce(state, { type: 'income-program', value: 'completed' })
    expect(incomeCompleteAllowed(state)).toBe(false)
    state = reduce(state, { type: 'income-program', value: 'expired' })
    expect(incomeCompleteAllowed(state)).toBe(true)
  })

  it('cancels old acknowledgements across program changes, scenario changes and restart', () => {
    const sent = reduce(prepared(), { type: 'send' })
    const late = { type: 'reply-delivered' as const, scenario: 'income' as const, run: sent.pendingReply!.run }
    const comparison = reduce(sent, { type: 'income-program', value: 'completed' })
    expect(comparison.pendingReply).toBeNull()
    expect(reduce(comparison, late)).toBe(comparison)
    const returned = reduce(comparison, { type: 'income-program', value: 'expired' })
    expect(reduce(returned, late)).toBe(returned)
    expect(incomeCompleteAllowed(returned)).toBe(false)
    for (const scenario of ['income', 'lost', 'pickup'] as const) {
      const reset = reduce(sent, { type: 'scenario', value: scenario })
      expect(reset.income.stage).toBe('explain')
      expect(reset.pendingReply).toBeNull()
      expect(reset.sessionStartedAt).toBe(anchor)
      expect(reduce(reset, late)).toBe(reset)
      expect(incomeCompleteAllowed(reset)).toBe(false)
    }
  })

  it('theme and viewing controls cannot bypass the guard or cancel the matching acknowledgement', () => {
    let state = initialDemoState('light', 'income', anchor)
    for (const action of [{ type: 'theme', value: 'dark' }, { type: 'panel', value: 'scripts' }, { type: 'reviewed', value: true }, { type: 'reason', value: 'Trips outside the timeframe checked' }] as const) {
      state = reduce(state, action)
      expect(incomeCompleteAllowed(state)).toBe(false)
    }
    state = reduce(prepared(state), { type: 'send' })
    const pending = state.pendingReply
    state = reduce(state, { type: 'theme', value: 'light' })
    state = reduce(state, { type: 'income-program', value: 'expired' })
    expect(state.pendingReply).toBe(pending)
    expect(incomeCompleteAllowed(state)).toBe(false)
    expect(deliver(state).income.stage).toBe('ready-complete')
  })

  it('restart clears completion and pending work while preserving theme and the PORT-49 clock', () => {
    const done = reduce(deliver(reduce(prepared(initialDemoState('dark', 'income', anchor)), { type: 'send' })), { type: 'complete-ticket' })
    const reset = reduce(done, { type: 'scenario', value: 'income' })
    expect(reset).toMatchObject({ theme: 'dark', sessionStartedAt: anchor, incomeProgram: 'expired', income: { stage: 'explain' }, draft: '', pendingReply: null })
    expect(reset.messages).toEqual(initialDemoState('dark', 'income', anchor).messages)
    expect(incomeCompleteAllowed(reset)).toBe(false)
  })
})
