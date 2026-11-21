import { describe, expect, it } from 'vitest'
import { citymobilDemoReducer as reduce, demoNavigationShortcut, initialDemoState, lostReplyAllowed, lostTrips, resolveLostTrackTrip } from '../citymobil-demo'

describe('read-only Lost trip context', () => {
  it('opens each viewed historical trip before any story confirmation', () => {
    const state = initialDemoState('light', 'lost')
    for (const trip of lostTrips) {
      expect(resolveLostTrackTrip({ viewed: trip.id, confirmed: state.lost.selectedTripId })).toBe(trip.id)
      expect(state.lost).toMatchObject({ stage: 'ask-latest', selectedTripId: null, consent: false, shared: false })
      expect(reduce(state, { type: 'select-trip', value: trip.id })).toBe(state)
      expect(reduce(state, { type: 'call-start', target: 'driver' })).toBe(state)
      expect(reduce(state, { type: 'connect-rider' })).toBe(state)
    }
  })
  it('prefers explicit and viewed records over displayed and confirmed records', () => {
    expect(resolveLostTrackTrip({ explicit: 'previous', viewed: 'earlier', displayed: 'latest', confirmed: 'latest' })).toBe('previous')
    expect(resolveLostTrackTrip({ viewed: 'earlier', displayed: 'previous', confirmed: 'latest' })).toBe('earlier')
    expect(resolveLostTrackTrip({ displayed: 'previous', confirmed: 'latest' })).toBe('previous')
    expect(resolveLostTrackTrip({ confirmed: 'latest' })).toBe('latest')
  })
  it('keeps a displayed context after Order closes and defaults missing or invalid context to the canonical latest record', () => {
    expect(resolveLostTrackTrip({ viewed: null, displayed: 'earlier', confirmed: null })).toBe('earlier')
    expect(resolveLostTrackTrip({ explicit: 'unknown', viewed: 'previous' })).toBe('previous')
    expect(resolveLostTrackTrip({ explicit: 'unknown', viewed: '', displayed: 'demo-income-03', confirmed: null })).toBe(lostTrips[0].id)
    expect(resolveLostTrackTrip({})).toBe(lostTrips[0].id)
  })
  it('preserves draft, pending reply and story guards while only the displayed trip clock changes', () => {
    const initial = initialDemoState('dark', 'lost')
    const accepted = reduce(reduce(initial, { type: 'focus-suggestion' }), { type: 'accept-suggestion' })
    const pending = reduce(accepted, { type: 'send' })
    expect(pending.pendingReply).not.toBeNull()
    const confirmed = reduce(pending, { type: 'reply-delivered', run: pending.pendingReply!.run, scenario: pending.pendingReply!.scenario })
    const draft = reduce(confirmed, { type: 'draft-edit', value: 'Local note' })
    expect(draft.draft).toBe('Local note')
    for (const state of [draft, pending]) {
      for (const trip of lostTrips) {
        expect(resolveLostTrackTrip({ viewed: trip.id })).toBe(trip.id)
        const viewed = reduce(state, { type: 'track-time', value: 0 })
        expect(viewed.draft).toBe(state.draft)
        expect(viewed.pendingReply).toBe(state.pendingReply)
        expect(viewed.lost).toBe(state.lost)
        expect(viewed.messages).toBe(state.messages)
        expect(lostReplyAllowed(viewed)).toBe(lostReplyAllowed(state))
      }
    }
  })
})

describe('shared demo map-entry shortcut', () => {
  const plain = { ctrl: false, meta: false, alt: false, shift: false, composing: false }
  it('routes command/control M to the map and preserves command/control A', () => {
    for (const modifier of ['ctrl', 'meta'] as const) {
      expect(demoNavigationShortcut('m', { ...plain, [modifier]: true }, false)).toBe('track')
      expect(demoNavigationShortcut('M', { ...plain, [modifier]: true }, false)).toBe('track')
      expect(demoNavigationShortcut('a', { ...plain, [modifier]: true }, false)).toBe('actions')
    }
  })
  it('does not intercept plain text, modified chords, composing input or modal/cover input', () => {
    expect(demoNavigationShortcut('m', plain, false)).toBeNull()
    for (const flag of ['alt', 'shift', 'composing'] as const) expect(demoNavigationShortcut('m', { ...plain, meta: true, [flag]: true }, false)).toBeNull()
    expect(demoNavigationShortcut('m', { ...plain, meta: true }, true)).toBeNull()
    expect(demoNavigationShortcut('Enter', { ...plain, ctrl: true }, false)).toBeNull()
  })
})
