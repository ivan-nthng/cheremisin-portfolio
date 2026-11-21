import { describe, expect, it } from 'vitest'
import { answerLabels, citymobilDemoReducer as reduce, initialDemoState, preparedReply, composerNextAction, lostWalkthrough, type DemoState } from '../citymobil-demo'

function send(state: DemoState) { return reduce({ ...state, draft: preparedReply(state) }, { type: 'send' }) }
function deliver(state: DemoState) { return reduce(state, { type: 'reply-delivered', run: state.pendingReply!.run, scenario: state.scenario }) }
function count(state: DemoState) { return lostWalkthrough(state).filter(step => step.state === 'completed').length }
describe('bounded composer tone and Lost walkthrough', () => {
  it('has exactly three named tones, defaults to Natural, and wraps in both directions', () => {
    expect(answerLabels).toEqual(['Super Warm Answer', 'Natural Answer', 'Strict Answer'])
    const initial = initialDemoState()
    expect(initial.answer).toBe(1)
    let state = reduce(initial, { type: 'answer', direction: 1 })
    expect(state.answer).toBe(2)
    state = reduce(state, { type: 'answer', direction: 1 })
    expect(state.answer).toBe(0)
    expect(reduce(state, { type: 'answer', direction: -1 }).answer).toBe(2)
  })
  it('keeps genuine distinct wording and the same contextual facts in every eligible reply', () => {
    const lost = deliver(send(initialDemoState('light', 'lost')))
    const driver = reduce(reduce(lost, { type: 'select-trip', value: 'latest' }), { type: 'recipient', value: 'driver' })
    const follow = { ...driver, recipient: 'passenger', lost: { ...driver.lost, stage: 'follow-up', shared: true } } as DemoState
    const contexts: [DemoState, string[]][] = [
      [initialDemoState('light', 'lost'), ['most recent trip', 'car']], [driver, ['Alex Vieira', 'blue backpack', 'back seat', '10:20', 'Praça Luís de Camões']], [follow, ['Alex Vieira', 'backpack']],
      [initialDemoState(), ['Jason', 'Ivan', 'north entrance', 'main entrance']], [reduce(initialDemoState(), { type: 'recipient', value: 'driver' }), ['Ivan', 'Jason', 'main entrance', 'Praça da Alegria']],
      [initialDemoState('light', 'income'), ['19', '20', '06:00–12:00', '12:05–12:34', 'date', 'area']], [{ ...initialDemoState('light', 'income'), incomeProgram: 'completed' }, ['Baixa', '20', '€212', '06:00–12:00', 'Rio de Mouro']],
    ]
    for (const [context, facts] of contexts) {
      const texts = [0, 1, 2].map(answer => preparedReply({ ...context, answer }))
      expect(new Set(texts).size).toBe(3)
      for (const text of texts) for (const fact of facts) expect(text).toContain(fact)
    }
  })
  it('changes only the typed prefix/template and suggestion, preserving committed and pending context', () => {
    let state = send(initialDemoState())
    state = reduce(state, { type: 'call-start', target: 'driver' })
    state = reduce(state, { type: 'attach', value: { kind: 'media' } })
    state = { ...state, draft: preparedReply(state).slice(0, 17) }
    const next = reduce(state, { type: 'answer', direction: 1 })
    for (const key of ['attachments', 'call', 'pendingReply', 'lost', 'messages', 'scenario', 'recipient'] as const) expect(next[key]).toBe(state[key])
    expect(next.draft).toBe('') // Reply is waiting for its original participant.
    const editable = { ...state, pendingReply: null }
    const partial = reduce(editable, { type: 'answer', direction: 1 })
    expect(partial.draft).toBe(preparedReply(partial).slice(0, 17))
    const accepted = { ...editable, draft: preparedReply(editable) }
    const full = reduce(accepted, { type: 'answer', direction: -1 })
    expect(full.draft).toBe(preparedReply(full))
    expect(full.attachments).toBe(accepted.attachments)
    expect(full.call).toBe(accepted.call)
  })
  it('keeps blocked reply text inert in the reducer while exposing a contextual focus hint', () => {
    const confirmed = deliver(send(initialDemoState('light', 'lost')))
    expect(composerNextAction(confirmed)).toContain('Select the confirmed latest trip')
    expect(reduce(confirmed, { type: 'suggest' })).toBe(confirmed)
    expect(reduce(confirmed, { type: 'script-edit', operation: 'insert', start: 0, end: 0 })).toBe(confirmed)
    expect(reduce(confirmed, { type: 'send' })).toBe(confirmed)
    expect(composerNextAction(send(initialDemoState('light', 'lost')))).toContain('Johnston Serenity')
  })
  it('derives all seven steps from delivered responses and consent/share/complete, never manual view/tone', () => {
    let state = initialDemoState('light', 'lost')
    expect(count(state)).toBe(0)
    state = send(state); expect(count(state)).toBe(0)
    state = deliver(state); expect(count(state)).toBe(1)
    state = reduce(state, { type: 'select-trip', value: 'latest' }); expect(count(state)).toBe(2)
    const before = lostWalkthrough(state)
    expect(lostWalkthrough(reduce(state, { type: 'answer', direction: 1 }))).toEqual(before)
    state = send(reduce(state, { type: 'recipient', value: 'driver' })); expect(count(state)).toBe(2)
    state = deliver(state); expect(count(state)).toBe(3)
    state = reduce(state, { type: 'call-start', target: 'driver' })
    state = reduce(state, { type: 'call-connected', run: state.call.run }); expect(count(state)).toBe(3)
    state = reduce(state, { type: 'call-end' }); expect(count(state)).toBe(4)
    state = reduce(state, { type: 'connect-rider' }); expect(count(state)).toBe(5)
    state = send(state); expect(count(state)).toBe(5)
    state = deliver(state); expect(count(state)).toBe(6)
    state = reduce(state, { type: 'complete-ticket' }); expect(count(state)).toBe(7)
    state = reduce(state, { type: 'scenario', value: 'lost' }); expect(count(state)).toBe(0)
    expect(lostWalkthrough(state).filter(step => step.state === 'current')).toHaveLength(1)
  })
})
