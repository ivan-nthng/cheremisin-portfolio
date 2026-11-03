import { describe, expect, it } from 'vitest'
import { citymobilDemoReducer as reduce, initialDemoState, preparedReply, activeDemoTrip, lostTrips, lostDemoClock, lostMessageClock } from '../citymobil-demo'
import type { DemoState } from '../citymobil-demo'
import { lostGeographicTrips, participantsAt, vehicleAt, routeMoment, tripClock, preparedStop } from '../citymobil-track'

it('keeps four Lost people distinct and their portraits stable across trip and recipient changes', () => {
  const initial = initialDemoState('light', 'lost')
  const passengerAvatar = activeDemoTrip(initial).passengerAvatar
  expect(new Set([passengerAvatar, ...lostTrips.map(trip => trip.avatar)]).size).toBe(4)
  for (const trip of lostTrips) {
    for (const recipient of ['passenger', 'driver'] as const) {
      const state = { ...initial, recipient, lost: { ...initial.lost, selectedTripId: trip.id } }
      expect(activeDemoTrip(state).avatar).toBe(trip.avatar)
      expect(activeDemoTrip(state).passengerAvatar).toBe(passengerAvatar)
    }
  }
})

function accept(state: DemoState) {
  const loading = reduce(state, { type: 'suggest' })
  return reduce(reduce(loading, { type: 'suggestion-ready', revision: loading.revision }), { type: 'accept-suggestion' })
}
const send = (state: DemoState) => { const pending = reduce(accept(state), { type: 'send' }); return pending.pendingReply ? reduce(pending, { type: 'reply-delivered', run: pending.pendingReply.run, scenario: pending.scenario }) : pending }
function queried() {
  let state = send(initialDemoState('dark', 'lost'))
  state = reduce(state, { type: 'select-trip', value: 'latest' })
  return send(reduce(state, { type: 'recipient', value: 'driver' }))
}
function consented() {
  let state = reduce(queried(), { type: 'call-start', target: 'driver' })
  state = reduce(state, { type: 'call-connected', run: state.call.run })
  return reduce(state, { type: 'call-end' })
}

describe('causal Lost-item walkthrough', () => {
  it('starts with one complaint and no confirmed trip, found item, consent or contact', () => {
    const state = initialDemoState('light', 'lost')
    expect(state.messages).toHaveLength(1)
    expect(state.lost).toEqual({ stage: 'ask-latest', selectedTripId: null, consent: false, shared: false })
    expect(reduce(state, { type: 'select-trip', value: 'latest' })).toBe(state)
    expect(reduce(state, { type: 'call-start', target: 'driver' })).toBe(state)
    expect(reduce(state, { type: 'connect-rider' })).toBe(state)
    expect(reduce(state, { type: 'complete-ticket' })).toBe(state)
  })
  it('rejects a wrong recipient, prefix-only send and attachment-only stage advance', () => {
    const initial = initialDemoState('light', 'lost')
    const wrong = accept(reduce(initial, { type: 'recipient', value: 'driver' }))
    expect(reduce(wrong, { type: 'send' })).toBe(wrong)
    const prefix = reduce(initial, { type: 'script-edit', operation: 'insert', start: 0, end: 0 })
    expect(reduce(prefix, { type: 'send' })).toBe(prefix)
    const attachment = reduce(initial, { type: 'attach', value: { kind: 'file' } })
    expect(reduce(attachment, { type: 'send' })).toBe(attachment)
    const asked = send(initial)
    expect(asked.lost.stage).toBe('choose-trip')
    expect(asked.messages.at(-1)?.text).toContain('blue backpack')
    expect(reduce(asked, { type: 'send' })).toBe(asked)
    expect(send(asked).lost.stage).toBe('choose-trip')
  })
  it('pins identity only on selection; an older trip cannot authorize item query or call', () => {
    let state = send(initialDemoState('light', 'lost'))
    state = reduce(state, { type: 'select-trip', value: 'previous' })
    expect(activeDemoTrip(state).driver).toBe(lostTrips[1].driver)
    state = accept(reduce(state, { type: 'recipient', value: 'driver' }))
    expect(reduce(state, { type: 'send' })).toBe(state)
    expect(reduce(state, { type: 'call-start', target: 'driver' })).toBe(state)
    state = reduce(state, { type: 'select-trip', value: 'latest' })
    expect(state.draft).toBe('')
    expect(activeDemoTrip(state).driver).toBe(lostTrips[0].driver)
    expect(preparedReply(state)).toContain(lostTrips[0].driver)
    state = send(state)
    expect(state.lost.stage).toBe('call-driver')
    expect(state.messages.at(-1)?.text).toContain('give me a call')
    expect(reduce(state, { type: 'select-trip', value: 'earlier' })).toBe(state)
  })
  it('early hangup and stale callbacks never grant consent; retry connected call records it once', () => {
    let state = reduce(queried(), { type: 'call-start', target: 'driver' })
    const oldRun = state.call.run
    const count = state.messages.length
    state = reduce(state, { type: 'call-end' })
    expect(state.lost).toMatchObject({ stage: 'call-driver', consent: false })
    expect(reduce(state, { type: 'call-connected', run: oldRun })).toBe(state)
    expect(reduce(state, { type: 'connect-rider' })).toBe(state)
    expect(state.messages).toHaveLength(count)
    state = reduce(state, { type: 'call-start', target: 'driver' })
    state = reduce(state, { type: 'call-connected', run: state.call.run })
    state = reduce(state, { type: 'call-tick', run: state.call.run })
    expect(state.call.elapsed).toBe(1)
    state = reduce(state, { type: 'call-end' })
    expect(state.lost).toMatchObject({ stage: 'connect-rider', consent: true, shared: false })
    expect(state.messages.at(-1)).toMatchObject({ kind: 'call-summary', recipient: 'driver' })
    expect(state.messages.at(-1)?.text).toContain('explicitly agreed')
    expect(reduce(state, { type: 'call-end' }).messages).toHaveLength(count + 1)
  })
  it('shares exactly one selected-driver contact, returns to rider, then permits ticket completion', () => {
    let state = consented()
    const before = state.messages.length
    state = reduce(state, { type: 'mode', value: 'connect' })
    expect(state.lost.shared).toBe(false)
    expect(reduce(state, { type: 'send' })).toBe(state)
    state = reduce(state, { type: 'connect-rider' })
    expect(state).toMatchObject({ mode: 'reply', recipient: 'passenger', lost: { stage: 'follow-up', shared: true } })
    expect(state.messages).toHaveLength(before + 1)
    expect(state.messages.at(-1)?.contact).toEqual({ tripId: 'latest', driver: lostTrips[0].driver, avatar: lostTrips[0].avatar, masked: lostTrips[0].contact })
    expect(reduce(state, { type: 'connect-rider' })).toBe(state)
    expect(reduce(state, { type: 'complete-ticket' })).toBe(state)
    state = send(state)
    expect(state.lost.stage).toBe('ready-complete')
    expect(state.messages.at(-1)?.text).toContain('arranged to meet')
    const transcript = state.messages
    state = reduce(state, { type: 'complete-ticket' })
    expect(state.messages).toBe(transcript)
    expect(state.lost.stage).toBe('completed')
    for (const action of [{ type: 'complete-ticket' }, { type: 'connect-rider' }, { type: 'send' }, { type: 'call-start', target: 'driver' }] as const) expect(reduce(state, action)).toBe(state)
    expect(reduce(state, { type: 'theme', value: 'light' }).messages).toBe(transcript)
  })
  it('canceling mode or changing theme/panel cannot share or advance; restart clears all local story data', () => {
    let state = consented()
    const unchanged = state.lost
    for (const action of [{ type: 'mode', value: 'connect' }, { type: 'mode', value: 'reply' }, { type: 'theme', value: 'dark' }, { type: 'panel', value: 'scripts' }] as const) state = reduce(state, action)
    expect(state.lost).toBe(unchanged)
    state = reduce(state, { type: 'connect-rider' })
    const oldRun = state.call.run
    const restart = reduce(state, { type: 'scenario', value: 'lost' })
    expect(restart).toMatchObject({ theme: 'dark', draft: '', mode: 'reply', recipient: 'passenger', links: [], internal: [], trackPercent: 0, lost: { stage: 'ask-latest', selectedTripId: null, consent: false, shared: false } })
    expect(restart.messages).toHaveLength(1)
    expect(reduce(restart, { type: 'call-connected', run: oldRun })).toBe(restart)
    expect(reduce(state, { type: 'scenario', value: 'pickup' })).toMatchObject({ theme: 'dark', scenario: 'pickup', lost: { consent: false, shared: false } })
  })
})

describe('fixed Lisbon trip and historical-map consistency', () => {
  it('orders three short trips before the complaint and reconciles fictional payment totals', () => {
    const request = Date.parse(lostDemoClock.date + 'T' + lostDemoClock.time + ':00Z')
    let previousStart = Infinity
    for (const trip of lostTrips) {
      const date = trip.id === 'latest' ? '2026-01-15' : '2026-01-14'
      const start = Date.parse(date + 'T' + trip.departure + ':00Z')
      const end = Date.parse(date + 'T' + trip.arrival + ':00Z')
      const track = lostGeographicTrips[trip.id]
      expect(start).toBeLessThan(previousStart); previousStart = start
      expect(end).toBeLessThan(request)
      expect((end - start) / 1000).toBe(track.actualSeconds)
      expect(tripClock(0, track).slice(0, 5)).toBe(trip.departure)
      expect(tripClock(track.actualSeconds, track).slice(0, 5)).toBe(trip.arrival)
      expect(Number(trip.base) + Number(trip.tolls) - Number(trip.discount)).toBeCloseTo(Number(trip.fare), 2)
      expect(track.distanceMetres).toBeGreaterThan(300)
      expect(track.distanceMetres).toBeLessThan(2000)
      expect((track.distanceMetres! / track.actualSeconds) * 3.6).toBeGreaterThan(3)
      expect((track.distanceMetres! / track.actualSeconds) * 3.6).toBeLessThan(20)
    }
    expect(lostMessageClock(1)).toBe('11:05')
    expect(lostMessageClock(10)).toBe('11:09')
  })
  it.each(lostTrips)('keeps $id map, identity and common rider/driver clock on its own immutable route', trip => {
    const track = lostGeographicTrips[trip.id]
    const before = JSON.stringify(track)
    let state = send(initialDemoState('light', 'lost'))
    state = reduce(state, { type: 'select-trip', value: trip.id })
    expect(activeDemoTrip(state)).toMatchObject({ id: trip.id, driver: trip.driver, fare: trip.fare, origin: trip.origin, destination: trip.destination })
    for (const time of [0, Math.floor(track.actualSeconds / 2), track.actualSeconds]) {
      const people = participantsAt(time, track)
      expect(people.rider).toEqual(people.driver)
      const stop = preparedStop(track)
      // One geographic stop position spans a dwell; inspection selects its arrival.
      const inspected = time >= stop.arrival && time <= stop.arrival + stop.dwell ? stop.arrival : time
      expect(routeMoment('actual', vehicleAt('actual', time, track), track).seconds).toBeCloseTo(inspected, 0)
      expect(people.driver.every(Number.isFinite)).toBe(true)
    }
    expect(participantsAt(track.actualSeconds, track).riderPhase).toBe('Dropped off')
    expect(track.tripId).toBe(trip.id)
    expect(JSON.stringify(track)).toBe(before)
    for (const other of lostTrips.filter(other => other.id !== trip.id)) expect(track.actual).not.toEqual(lostGeographicTrips[other.id].actual)
  })
})
