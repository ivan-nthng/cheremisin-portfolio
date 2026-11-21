import { describe, expect, it } from 'vitest'
import { activeDemoTrip, citymobilDemoReducer as reduce, citymobilScenarios, demoDayLabel, demoIncomeProgram, demoInstant, demoLostTrips, demoRequestInstant, formatDemoDate, formatDemoTime, initialDemoState, lostTrips, preparedReply } from '../citymobil-demo'
import type { DemoState } from '../citymobil-demo'
import { geographicTrip, journeyBounds, lostGeographicTrips, tripClock } from '../citymobil-track'

function send(state: DemoState, at: number) {
  const focused = reduce(state, { type: 'focus-suggestion' })
  const pending = reduce(reduce(focused, { type: 'accept-suggestion' }), { type: 'send', at })
  expect(pending.pendingReply).not.toBeNull()
  return reduce(pending, { type: 'reply-delivered', run: pending.pendingReply!.run, scenario: pending.scenario, at: at + 2000 })
}

describe('full-workspace session clock', () => {
  it.each(['2026-11-07T17:00:31Z', '2026-11-08T00:10:00Z', '2026-03-29T01:10:00Z', '2026-10-25T01:10:00Z'])('keeps trip/request order and actual route duration at %s', iso => {
    const anchor = Date.parse(iso)
    const request = demoRequestInstant('lost', anchor)
    let previous = Infinity
    for (const trip of demoLostTrips(anchor)) {
      const route = { ...lostGeographicTrips[trip.id], startedAt: trip.startedAt }
      expect(trip.startedAt).toBeLessThan(previous); previous = trip.startedAt!
      expect(trip.endedAt).toBeLessThan(request)
      expect(trip.endedAt! - trip.startedAt!).toBe(route.actualSeconds * 1000)
      expect(tripClock(0, route)).toBe(formatDemoTime(trip.startedAt!, true))
      expect(tripClock(route.actualSeconds, route)).toContain(formatDemoTime(trip.endedAt!, true))
      expect(tripClock(journeyBounds(route).end, route)).toContain(formatDemoTime(trip.startedAt! + journeyBounds(route).end * 1000, true))
      expect(trip.date).toContain(formatDemoDate(trip.startedAt!))
      expect(trip.invoice).toBe(lostTrips.find(item => item.id === trip.id)!.invoice)
    }
    const pickup = activeDemoTrip(initialDemoState('light', 'pickup', anchor))
    expect(pickup.endedAt! - pickup.startedAt!).toBe(geographicTrip.actualSeconds * 1000)
    expect(pickup.startedAt).toBeLessThan(demoRequestInstant('pickup', anchor))
    expect(pickup.startedAt! + journeyBounds(geographicTrip).end * 1000).toBeLessThan(anchor)
  })

  it('uses Lisbon calendar days across midnight and both DST boundaries', () => {
    expect(formatDemoTime(Date.parse('2026-03-29T00:50:00Z'))).toBe('00:50')
    expect(formatDemoTime(Date.parse('2026-03-29T01:10:00Z'))).toBe('02:10')
    expect(formatDemoTime(Date.parse('2026-10-25T00:50:00Z'))).toBe('01:50')
    expect(formatDemoTime(Date.parse('2026-10-25T01:10:00Z'))).toBe('01:10')
    expect(demoDayLabel(Date.parse('2026-03-28T23:50:00Z'), Date.parse('2026-03-29T01:10:00Z'))).toBe('Yesterday')
    expect(demoDayLabel(Date.parse('2026-10-24T23:30:00Z'), Date.parse('2026-10-25T23:50:00Z'))).toBe('Today')
    const anchor = Date.parse('2026-11-08T00:10:00Z')
    const state = send(initialDemoState('light', 'lost', anchor), anchor)
    expect(state.messages.at(-1)?.text).toContain('yesterday at 23:23')
    const crossing = demoLostTrips(Date.parse('2026-11-08T00:40:00Z'))[0]
    expect(tripClock(840, { ...lostGeographicTrips.latest, startedAt: crossing.startedAt })).toBe('8 Nov 2026, 00:07:00')
  })

  it('timestamps sent/received/call/contact messages at their actual events and keeps the load anchor', () => {
    const anchor = Date.parse('2026-11-07T23:59:00Z'), event = anchor + 120000
    let state = send(initialDemoState('light', 'lost', anchor), event)
    expect(state.messages[0].at).toBe(anchor - 120000)
    expect(state.messages[1].at).toBe(event)
    expect(state.messages[2].at).toBe(event + 2000)
    expect(state.messages[2].text).toContain('yesterday at 23:12')
    state = reduce(state, { type: 'select-trip', value: 'latest' })
    state = reduce(state, { type: 'recipient', value: 'driver' })
    for (let tone = 0; tone < 3; tone++) expect(preparedReply({ ...state, answer: tone })).toContain('23:12')
    state = send(state, event + 10000)
    state = reduce(state, { type: 'call-start', target: 'driver' })
    state = reduce(state, { type: 'call-connected', run: state.call.run })
    state = reduce(state, { type: 'call-end', at: event + 20000 })
    expect(state.messages.at(-1)?.at).toBe(event + 20000)
    expect(state.messages.at(-1)?.text).toContain('00:07')
    state = reduce(state, { type: 'connect-rider', at: event + 21000 })
    expect(state.messages.at(-1)?.at).toBe(event + 21000)
    state = send(state, event + 30000)
    expect(state.messages.at(-1)?.text).toContain('00:07')
    expect(reduce(state, { type: 'complete-ticket' }).lost.stage).toBe('completed')
    for (const scenario of ['pickup', 'income', 'lost'] as const) {
      state = reduce(state, { type: 'theme', value: 'dark' })
      state = reduce(state, { type: 'scenario', value: scenario })
      expect(state.sessionStartedAt).toBe(anchor)
      expect(state.messages[0].at).toBe(demoRequestInstant(scenario, anchor))
      expect(state.theme).toBe('dark')
    }
  })

  it('projects income windows and every prepared tone without changing eligibility or elapsed hours', () => {
    const anchor = Date.parse('2026-03-29T02:00:00Z')
    const state = initialDemoState('light', 'income', anchor)
    const trip = activeDemoTrip(state), program = demoIncomeProgram('expired', anchor)
    const from = demoInstant('income', anchor, citymobilScenarios.income.day, '06:00')
    const to = demoInstant('income', anchor, citymobilScenarios.income.day, '12:00')
    expect(to - from).toBe(6 * 3600000)
    expect(to).toBeLessThan(trip.startedAt!)
    expect(trip.endedAt! - trip.startedAt!).toBe(29 * 60000)
    expect(program.from).toBe(formatDemoTime(from)); expect(program.to).toBe(formatDemoTime(to))
    for (let answer = 0; answer < 3; answer++) {
      const text = preparedReply({ ...state, answer })
      expect(text).toContain(program.from + '–' + program.to)
      expect(text).toContain(trip.departure + '–' + trip.arrival)
    }
    expect(send(state, anchor).messages.at(-1)?.at).toBe(anchor + 2000)
  })

  it('keeps authored cards deterministic and their fixtures untouched', () => {
    const fixture = JSON.stringify({ lostTrips, citymobilScenarios, lostGeographicTrips, geographicTrip })
    const first = initialDemoState('light', 'lost')
    expect(first.sessionStartedAt).toBeNull()
    expect(first.messages[0]).not.toHaveProperty('at')
    expect(activeDemoTrip(first).date).toBe(lostTrips[0].date)
    expect(tripClock(0, lostGeographicTrips.latest)).toBe('10:20:00')
    const historical = send(first, Date.parse('2027-01-01T00:00Z'))
    expect(historical.messages.at(-1)?.text).toContain('today at 10:20')
    expect(historical.messages.at(-1)).not.toHaveProperty('at')
    demoLostTrips(Date.now()); demoIncomeProgram('expired', Date.now())
    expect(JSON.stringify({ lostTrips, citymobilScenarios, lostGeographicTrips, geographicTrip })).toBe(fixture)
  })
})
