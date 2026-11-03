import { afterEach, describe, expect, it, vi } from 'vitest'
import { citymobilDemoReducer as reduce, initialDemoState, preparedReply, scheduleDemoReply, type DemoState } from '../citymobil-demo'

afterEach(() => vi.useRealTimers())
function send(state = initialDemoState('light', 'lost')) {
  return reduce({ ...state, draft: preparedReply(state) }, { type: 'send' })
}
function deliver(state: DemoState) {
  return reduce(state, { type: 'reply-delivered', run: state.pendingReply!.run, scenario: state.pendingReply!.scenario })
}
describe('participant reply delivery', () => {
  it('shows the operator immediately and holds dependent actions until exactly2000ms', () => {
    vi.useFakeTimers()
    let state = send()
    expect(state.messages).toHaveLength(2)
    expect(state.messages.at(-1)?.role).toBe('agent')
    expect(state).toMatchObject({ draft: '', attachments: [], lost: { stage: 'ask-latest' }, pendingReply: { recipient: 'passenger', name: 'Johnston Serenity' } })
    expect(reduce(state, { type: 'select-trip', value: 'latest' })).toBe(state)
    const cleanup = scheduleDemoReply(state.pendingReply, action => { state = reduce(state, action) })
    vi.advanceTimersByTime(1999)
    expect(state.messages).toHaveLength(2)
    vi.advanceTimersByTime(1)
    expect(state.messages).toHaveLength(3)
    expect(state).toMatchObject({ pendingReply: null, lost: { stage: 'choose-trip' } })
    expect(state.messages.at(-1)?.text).toContain('blue backpack')
    vi.advanceTimersByTime(10000)
    expect(state.messages).toHaveLength(3)
    cleanup?.()
  })
  it('delivers to the original hidden thread across recipient/mode/theme changes without a restarted timer', () => {
    vi.useFakeTimers()
    let state = send()
    const pending = state.pendingReply
    scheduleDemoReply(pending, action => { state = reduce(state, action) })
    vi.advanceTimersByTime(700)
    for (const action of [{ type: 'recipient', value: 'driver' }, { type: 'mode', value: 'note' }, { type: 'theme', value: 'dark' }, { type: 'panel', value: 'scripts' }] as const) state = reduce(state, action)
    expect(state.pendingReply).toBe(pending)
    vi.advanceTimersByTime(1300)
    expect(state).toMatchObject({ recipient: 'driver', mode: 'note', theme: 'dark', pendingReply: null, lost: { stage: 'choose-trip' } })
    expect(state.messages.at(-1)).toMatchObject({ role: 'passenger', recipient: 'passenger' })
  })
  it('rejects duplicate sends/delivery and stale callbacks after restart or another scenario', () => {
    const pending = send()
    const repeated = { ...pending, draft: preparedReply(pending) }
    expect(reduce(repeated, { type: 'send' })).toBe(repeated)
    const action = { type: 'reply-delivered', run: pending.pendingReply!.run, scenario: pending.scenario } as const
    const received = deliver(pending)
    expect(reduce(received, action)).toBe(received)
    for (const scenario of ['lost', 'pickup'] as const) {
      const fresh = reduce(pending, { type: 'scenario', value: scenario })
      expect(fresh.pendingReply).toBeNull()
      expect(reduce(fresh, action)).toBe(fresh)
      expect(reduce(send(fresh), action).pendingReply).not.toBeNull()
    }
  })
  it('cleanup cancels pending work on reset/unmount', () => {
    vi.useFakeTimers()
    const dispatch = vi.fn()
    const cleanup = scheduleDemoReply(send().pendingReply, dispatch)
    cleanup?.()
    vi.advanceTimersByTime(3000)
    expect(dispatch).not.toHaveBeenCalled()
  })
  it('waits for driver-found and final acknowledgement before call/Complete', () => {
    let state = reduce(deliver(send()), { type: 'select-trip', value: 'latest' })
    state = send(reduce(state, { type: 'recipient', value: 'driver' }))
    expect(state.lost.stage).toBe('query-driver')
    expect(reduce(state, { type: 'call-start', target: 'driver' })).toBe(state)
    state = deliver(state)
    expect(state.lost.stage).toBe('call-driver')
    state = reduce(state, { type: 'call-start', target: 'driver' })
    state = reduce(state, { type: 'call-connected', run: state.call.run })
    state = reduce(state, { type: 'call-end' })
    expect(state.pendingReply).toBeNull()
    state = reduce(state, { type: 'connect-rider' })
    expect(state.pendingReply).toBeNull()
    state = send(state)
    expect(state.lost.stage).toBe('follow-up')
    expect(reduce(state, { type: 'complete-ticket' })).toBe(state)
    expect(deliver(state).lost.stage).toBe('ready-complete')
  })
  it('saves Note and Forward immediately while leaving an original pending reply intact', () => {
    for (const mode of ['note', 'forward'] as const) {
      const pending = send()
      const saved = send(reduce(pending, { type: 'mode', value: mode }))
      expect(saved.pendingReply).toBe(pending.pendingReply)
      expect(saved.internal).toHaveLength(1)
      expect(saved.messages).toBe(pending.messages)
    }
  })
})
