import { afterEach, describe, expect, it, vi } from 'vitest'
import { geographicTrip, lostGeographicTrips, participantsAt, vehicleAt, routeMoment, tripClock, clampTripTime, driverHeading, preparedStop, routesDiffer, scheduleTrackReplay, trackEvents, journeyBounds, journeySegments, timeFromPercent, percentFromTime, routeLength } from '../citymobil-track'
import type { Coordinate, TrackKind } from '../citymobil-track'

afterEach(() => vi.useRealTimers())

describe('prepared geographic trip and common time', () => {
  it('keeps both vehicle plans at the same pickup at the shared pickup timestamp', () => {
    for (const kind of ['actual', 'planned'] as const) {
      const point = vehicleAt(kind, geographicTrip.pickupSeconds)
      expect(point[0]).toBeCloseTo(geographicTrip.pickup[0], 6)
      expect(point[1]).toBeCloseTo(geographicTrip.pickup[1], 6)
    }
  })
  it('joins rider and driver only after pickup, independently of selected route kind', () => {
    const before = participantsAt(0)
    expect(before.rider).not.toEqual(before.driver)
    expect(before.riderPhase).toBe('Walking to pickup')
    for (const seconds of [300, 700, 1380]) {
      const people = participantsAt(seconds)
      expect(people.rider).toEqual(people.driver)
      expect(people.riderPhase).toBe('In the car')
    }
    expect(participantsAt(1860).riderPhase).toBe('Dropped off')
  })
  it('holds the planned estimate at destination while the actual trip continues', () => {
    expect(vehicleAt('planned', 1380)).toEqual(vehicleAt('planned', 1860))
    expect(vehicleAt('actual', 1380)).not.toEqual(vehicleAt('planned', 1380))
    expect(vehicleAt('actual', 1860)).toEqual(vehicleAt('planned', 1860))
  })
  it.each<TrackKind>(['actual', 'planned'])('maps hovered %s geometry back onto the same common timestamp', kind => {
    for (const seconds of [60, 240, 600, 900, 1200]) {
      const position = vehicleAt(kind, seconds)
      const match = routeMoment(kind, position)
      expect(match.seconds).toBeCloseTo(seconds, 0)
      expect(match.distance).toBeLessThan(0.0000001)
    }
  })
  it('does not mutate fixed geometry during hover-time projection', () => {
    const before = JSON.stringify(geographicTrip)
    for (const kind of ['actual', 'planned'] as const) for (const point of geographicTrip[kind]) routeMoment(kind, point as Coordinate)
    expect(JSON.stringify(geographicTrip)).toBe(before)
  })
  it('retains the rendered phase when inspecting coincident boundaries and extended history', () => {
    for (const trip of [geographicTrip, ...Object.values(lostGeographicTrips)]) {
      expect(routeMoment('actual', trip.pickup as Coordinate, trip, 'approach').phase).toBe('approach')
      expect(routeMoment('actual', trip.pickup as Coordinate, trip, 'onboard').phase).toBe('onboard')
      for (const [phase, time] of [['history', journeyBounds(trip).start + 25], ['onward', trip.actualSeconds + 60]] as const) {
        const hit = routeMoment('actual', vehicleAt('actual', time, trip), trip, phase)
        expect(hit.phase).toBe(phase)
        expect(hit.seconds).toBeCloseTo(time, 0)
        expect(hit.traffic).toBe(false)
      }
    }
  })
  it('clamps hostile time values and formats seconds without a replay-percentage label', () => {
    expect(clampTripTime(NaN)).toBe(0)
    expect(clampTripTime(-500)).toBe(journeyBounds().start)
    expect(clampTripTime(Infinity)).toBe(0)
    expect(tripClock(300)).toBe('12:05:00')
    expect(tripClock(1861)).toBe('12:31:01')
  })
  it('distinguishes the prepared pickup comparison from genuinely unavailable Lost alternatives', () => {
    expect(routesDiffer(geographicTrip)).toBe(true)
    for (const trip of Object.values(lostGeographicTrips)) expect(routesDiffer(trip)).toBe(false)
  })
  it('anchors A/B and the synthetic stop to the same participant timeline for every prepared trip', () => {
    for (const trip of [geographicTrip, ...Object.values(lostGeographicTrips)]) {
      const events = trackEvents(trip)
      expect(events.find(event => event.id === 'A')?.coordinate).toEqual(trip.pickup)
      expect(events.find(event => event.id === 'B')?.coordinate).toEqual(vehicleAt('actual', trip.actualSeconds, trip))
      const stop = events.find(event => event.id === 'stop')!
      expect(stop.coordinate).toEqual(participantsAt(stop.seconds, trip).driver)
      expect(participantsAt(stop.seconds, trip).driverPhase).toBe('Brief stop')
      expect(participantsAt(stop.seconds, trip).rider).toEqual(stop.coordinate)
    }
  })
  it('holds the prepared stop, then resumes along the unchanged route with a finite heading', () => {
    for (const trip of [geographicTrip, ...Object.values(lostGeographicTrips)]) {
      const stop = preparedStop(trip)
      const arrived = vehicleAt('actual', stop.arrival, trip)
      expect(vehicleAt('actual', stop.arrival + stop.dwell - 1, trip)).toEqual(arrived)
      expect(vehicleAt('actual', stop.arrival + stop.dwell + 1, trip)).not.toEqual(arrived)
      for (const time of [0, trip.pickupSeconds, stop.arrival, stop.arrival + 5, trip.actualSeconds]) {
        const heading = driverHeading(time, trip)
        expect(Number.isFinite(heading)).toBe(true)
        expect(heading).toBeGreaterThanOrEqual(0)
        expect(heading).toBeLessThan(360)
      }
    }
  })
  it('projects a stop inspection back to arrival rather than inventing another timestamp', () => {
    const stop = preparedStop()
    expect(routeMoment('actual', vehicleAt('actual', stop.arrival), geographicTrip).seconds).toBeCloseTo(stop.arrival, 0)
  })
  it('plays a reproducible shared timeline and loops without exceeding the trip bounds', () => {
    vi.useFakeTimers()
    const update = vi.fn()
    const cleanup = scheduleTrackReplay(geographicTrip, journeyBounds().start, update, () => true)
    vi.advanceTimersByTime(1000)
    expect(update).toHaveBeenCalledTimes(8)
    expect(update.mock.calls.at(-1)![0]).toBeCloseTo(1000 / 45000 * 100)
    vi.advanceTimersByTime(44000)
    expect(update.mock.calls.at(-1)![0]).toBe(0)
    expect(update.mock.calls.every(([percent]) => percent >= 0 && percent < 100)).toBe(true)
    cleanup()
    expect(vi.getTimerCount()).toBe(0)
  })
  it('extends the same clock through history, approach and onward without changing pickup/drop facts', () => {
    for (const trip of [geographicTrip, ...Object.values(lostGeographicTrips)]) {
      const { start, end } = journeyBounds(trip), ctx = trip.context!
      expect(start).toBeLessThan(ctx.acceptedSeconds)
      expect(ctx.acceptedSeconds).toBeLessThan(trip.pickupSeconds)
      expect(end).toBeGreaterThan(trip.actualSeconds)
      expect(vehicleAt('actual', start, trip)).toEqual(ctx.history[0])
      expect(vehicleAt('actual', ctx.acceptedSeconds, trip)).toEqual(ctx.approach[0])
      expect(vehicleAt('actual', trip.pickupSeconds, trip)[0]).toBeCloseTo(trip.pickup[0], 7)
      expect(vehicleAt('actual', trip.actualSeconds, trip)).toEqual(trip.actual.at(-1))
      expect(vehicleAt('actual', end, trip)).toEqual(ctx.onward.at(-1))
      for (const t of [start, ctx.acceptedSeconds, trip.pickupSeconds, trip.actualSeconds, end]) expect(timeFromPercent(percentFromTime(t, trip), trip)).toBe(t)
    }
  })
  it('keeps rider at actual drop while driver continues along the prepared road', () => {
    for (const trip of [geographicTrip, ...Object.values(lostGeographicTrips)]) {
      const drop = participantsAt(trip.actualSeconds, trip).rider
      for (const time of [trip.actualSeconds + 1, trip.actualSeconds + 60, journeyBounds(trip).end]) {
        const people = participantsAt(time, trip)
        expect(people.rider).toEqual(drop)
        expect(people.driver).not.toEqual(drop)
        expect(people.riderPhase).toBe('Dropped off')
        expect(people.driverPhase).toBe('Continuing after drop-off')
      }
    }
  })
  it('has continuous bounded road motion at every phase boundary', () => {
    for (const trip of [geographicTrip, ...Object.values(lostGeographicTrips)]) {
      const ctx = trip.context!
      for (const t of [ctx.acceptedSeconds, trip.pickupSeconds, trip.actualSeconds]) {
        const a = vehicleAt('actual', t - 1, trip), b = vehicleAt('actual', t + 1, trip)
        expect(Math.hypot((a[0] - b[0]) * .78, a[1] - b[1]) * 111195).toBeLessThan(15)
      }
    }
  })
  it('projects history and onward inspections onto that same timestamp', () => {
    for (const trip of [geographicTrip, ...Object.values(lostGeographicTrips)]) {
      const ctx = trip.context!
      for (const t of [journeyBounds(trip).start + 25, ctx.acceptedSeconds + 45, trip.actualSeconds + 60]) {
        expect(routeMoment('actual', vehicleAt('actual', t, trip), trip).seconds).toBeCloseTo(t, 0)
      }
    }
  })
  it('keeps congestion independent on actual, planned and alternative paths', () => {
    const sections = journeySegments(geographicTrip)
    for (const kind of ['actual', 'planned', 'alternative']) {
      const parts = sections.filter(s => s.kind === kind && s.phase === 'onboard')
      expect(parts.some(s => s.traffic)).toBe(true)
      expect(parts.some(s => !s.traffic)).toBe(true)
      expect(parts.every(s => routeLength(s.coordinates) > 0)).toBe(true)
      for (let i = 1; i < parts.length; i++) expect(parts[i].coordinates[0]).toEqual(parts[i - 1].coordinates.at(-1))
    }
    expect(sections.some(s => s.phase === 'approach' && s.traffic)).toBe(true)
    for (const trip of Object.values(lostGeographicTrips)) {
      expect(journeySegments(trip).some(s => s.traffic)).toBe(true)
      expect(journeySegments(trip).some(s => s.kind !== 'actual')).toBe(false)
    }
  })
  it('does not accrue elapsed replay time during an inactive interval', () => {
    vi.useFakeTimers()
    let active = true
    const update = vi.fn(), cleanup = scheduleTrackReplay(geographicTrip, journeyBounds().start, update, () => active)
    vi.advanceTimersByTime(250)
    active = false
    vi.advanceTimersByTime(10000)
    active = true
    vi.advanceTimersByTime(125)
    expect(update.mock.calls.at(-1)![0]).toBeCloseTo(375 / 45000 * 100)
    cleanup()
    expect(vi.getTimerCount()).toBe(0)
  })
  it('does not emit while hidden/offscreen/exiting and cancels before another trip begins', () => {
    vi.useFakeTimers()
    let active = true
    const oldTrip = vi.fn(), newTrip = vi.fn()
    const close = scheduleTrackReplay(geographicTrip, 300, oldTrip, () => active)
    vi.advanceTimersByTime(250)
    active = false
    const count = oldTrip.mock.calls.length
    vi.advanceTimersByTime(2000)
    expect(oldTrip).toHaveBeenCalledTimes(count)
    close()
    const end = scheduleTrackReplay(lostGeographicTrips.earlier, 0, newTrip, () => true)
    vi.advanceTimersByTime(500)
    expect(oldTrip).toHaveBeenCalledTimes(count)
    expect(newTrip).toHaveBeenCalledTimes(4)
    end()
    expect(vi.getTimerCount()).toBe(0)
  })
})
