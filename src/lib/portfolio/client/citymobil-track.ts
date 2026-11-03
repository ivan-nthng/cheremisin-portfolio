import fixture from './citymobil-track-fixture.json'
import lostFixtures from './citymobil-lost-tracks.json'
import context from './citymobil-journey-context.json'

export type Coordinate = [number, number]
export type TrackKind = 'actual' | 'planned' | 'alternative'
export type JourneyPhase = 'history' | 'approach' | 'onboard' | 'onward'
type JourneyContext = { history: number[][]; approach: number[][]; onward: number[][]; acceptedSeconds: number; historySeconds: number; onwardSeconds: number; alternative?: number[][]; alternativeSeconds?: number; traffic: { kind: string; phase: string; from: number; to: number }[] }
export type PreparedTrack = Pick<typeof fixture, 'actual' | 'planned' | 'approach' | 'riderWalk' | 'pickup' | 'pickupSeconds' | 'actualSeconds' | 'plannedSeconds'> & { historical?: boolean; departureSeconds?: number; distanceMetres?: number; tripId?: string; context?: JourneyContext }
export const geographicTrip: PreparedTrack = { ...fixture, context: context.trips.pickup }
export const lostGeographicTrips = Object.fromEntries(Object.entries(lostFixtures.trips).map(([id, trip]) => [id, { ...trip, planned: trip.actual, riderWalk: trip.actual, context: context.trips[id as keyof typeof lostFixtures.trips] }])) as Record<keyof typeof lostFixtures.trips, PreparedTrack>
const distance = (a: number[], b: number[]) => Math.hypot((a[0] - b[0]) * Math.cos(38.716 * Math.PI / 180), a[1] - b[1])
export const routeLength = (line: number[][]) => line.slice(1).reduce((sum, point, i) => sum + distance(line[i], point), 0)
export const journeyBounds = (trip: PreparedTrack = geographicTrip) => ({ start: trip.context ? trip.context.acceptedSeconds - trip.context.historySeconds : 0, end: trip.actualSeconds + (trip.context?.onwardSeconds ?? 0) })
export const clampTripTime = (seconds: number, trip: PreparedTrack = geographicTrip) => { const bounds = journeyBounds(trip); return Number.isFinite(seconds) ? Math.max(bounds.start, Math.min(bounds.end, Math.round(seconds) || 0)) : 0 }
export const timeFromPercent = (percent: number, trip: PreparedTrack) => { const { start, end } = journeyBounds(trip); return clampTripTime(start + Math.max(0, Math.min(100, percent)) / 100 * (end - start), trip) }
export const percentFromTime = (seconds: number, trip: PreparedTrack) => { const { start, end } = journeyBounds(trip); return (clampTripTime(seconds, trip) - start) / (end - start) * 100 }

/** One reproducible, fictional pause; traffic styling does not invent another delay. */
export function preparedStop(trip: PreparedTrack = geographicTrip) {
  const travel = trip.actualSeconds - trip.pickupSeconds
  const dwell = Math.min(20, Math.floor(travel / 10))
  return { arrival: trip.pickupSeconds + (travel - dwell) / 2, dwell }
}
export const routesDiffer = (trip: PreparedTrack = geographicTrip) => JSON.stringify(trip.actual) !== JSON.stringify(trip.planned)
export const hasAlternative = (trip: PreparedTrack) => Boolean(trip.context?.alternative?.length)
export const routeLabel = (kind: TrackKind) => kind === 'actual' ? 'Actual route' : kind === 'planned' ? 'Planned estimate' : 'Alternative estimate'
export const phaseLabel = (phase: JourneyPhase) => ({ history: 'Before the order', approach: 'Approaching pickup', onboard: 'Rider onboard', onward: 'Driver after drop-off' })[phase]
export const phaseAt = (seconds: number, trip: PreparedTrack) => seconds < (trip.context?.acceptedSeconds ?? 0) ? 'history' : seconds < trip.pickupSeconds ? 'approach' : seconds > trip.actualSeconds ? 'onward' : 'onboard'

function along(line: number[][], fraction: number): Coordinate {
  let remaining = routeLength(line) * Math.max(0, Math.min(1, fraction))
  for (let i = 1; i < line.length; i++) {
    const length = distance(line[i - 1], line[i])
    if (remaining <= length && length > 0) {
      const t = remaining / length
      return [line[i - 1][0] + (line[i][0] - line[i - 1][0]) * t, line[i - 1][1] + (line[i][1] - line[i - 1][1]) * t]
    }
    remaining -= length
  }
  return [...line[line.length - 1]] as Coordinate
}
function onboardLine(kind: TrackKind, trip: PreparedTrack) { return kind === 'alternative' ? trip.context?.alternative ?? trip.actual.slice(trip.approach.length - 1) : trip[kind].slice(trip.approach.length - 1) }
function durationFor(kind: TrackKind, trip: PreparedTrack) { return kind === 'actual' ? trip.actualSeconds : kind === 'planned' ? trip.plannedSeconds : trip.context?.alternativeSeconds ?? trip.plannedSeconds }
function onboardFraction(kind: TrackKind, time: number, trip: PreparedTrack) {
  const duration = durationFor(kind, trip)
  if (kind !== 'actual') return (time - trip.pickupSeconds) / (duration - trip.pickupSeconds)
  const stop = preparedStop(trip), moving = duration - trip.pickupSeconds - stop.dwell
  return time < stop.arrival ? (time - trip.pickupSeconds) / moving : time <= stop.arrival + stop.dwell ? .5 : (time - trip.pickupSeconds - stop.dwell) / moving
}
function onboardTime(kind: TrackKind, fraction: number, trip: PreparedTrack) {
  const duration = durationFor(kind, trip), stop = preparedStop(trip)
  return trip.pickupSeconds + fraction * (duration - trip.pickupSeconds - (kind === 'actual' ? stop.dwell : 0)) + (kind === 'actual' && fraction > .5 + 1e-9 ? stop.dwell : 0)
}
export function vehicleAt(kind: TrackKind, seconds: number, trip: PreparedTrack = geographicTrip): Coordinate {
  const time = clampTripTime(seconds, trip), ctx = trip.context
  const accepted = ctx?.acceptedSeconds ?? 0
  if (ctx && time < accepted) return along(ctx.history, (time - journeyBounds(trip).start) / ctx.historySeconds)
  if (time < trip.pickupSeconds) return along(ctx?.approach ?? trip.approach, (time - accepted) / (trip.pickupSeconds - accepted || 1))
  if (kind === 'actual' && ctx && time > trip.actualSeconds) return along(ctx.onward, (time - trip.actualSeconds) / ctx.onwardSeconds)
  return along(onboardLine(kind, trip), onboardFraction(kind, Math.min(time, durationFor(kind, trip)), trip))
}
export function participantsAt(seconds: number, trip: PreparedTrack = geographicTrip) {
  const time = clampTripTime(seconds, trip), stop = preparedStop(trip)
  const rider = time < trip.pickupSeconds ? along(trip.riderWalk, Math.max(0, time) / (trip.pickupSeconds || 1)) : time >= trip.actualSeconds ? [...trip.actual.at(-1)!] as Coordinate : vehicleAt('actual', time, trip)
  return { driver: vehicleAt('actual', time, trip), rider, driverPhase: time < (trip.context?.acceptedSeconds ?? 0) ? 'Before the order' : time < trip.pickupSeconds ? 'Approaching pickup' : time > trip.actualSeconds ? 'Continuing after drop-off' : time === trip.actualSeconds ? 'At destination' : time >= stop.arrival && time <= stop.arrival + stop.dwell ? 'Brief stop' : 'Rider onboard', riderPhase: time < trip.pickupSeconds ? trip.pickupSeconds ? 'Walking to pickup' : 'Waiting at pickup' : time >= trip.actualSeconds ? 'Dropped off' : 'In the car' }
}
export function driverHeading(seconds: number, trip: PreparedTrack = geographicTrip) {
  const stop = preparedStop(trip), bounds = journeyBounds(trip)
  const time = seconds >= stop.arrival && seconds <= stop.arrival + stop.dwell ? stop.arrival + stop.dwell : seconds
  const a = vehicleAt('actual', Math.max(bounds.start, time - 1), trip), b = vehicleAt('actual', Math.min(bounds.end, time + 1), trip)
  return (Math.atan2((b[0] - a[0]) * Math.cos(a[1] * Math.PI / 180), b[1] - a[1]) * 180 / Math.PI + 360) % 360
}
export function trackEvents(trip: PreparedTrack = geographicTrip) {
  const stop = preparedStop(trip), ctx = trip.context
  return [
    ...(ctx ? [{ id: 'history', label: 'Before order', seconds: journeyBounds(trip).start, kind: 'actual' as TrackKind }, { id: 'start', label: 'Order accepted', seconds: ctx.acceptedSeconds, kind: 'actual' as TrackKind }] : []),
    { id: 'A', label: 'Pickup', seconds: trip.pickupSeconds, kind: 'actual' as TrackKind },
    { id: 'stop', label: 'Brief stop', seconds: Math.round(stop.arrival), kind: 'actual' as TrackKind },
    ...(routesDiffer(trip) ? [{ id: 'P', label: 'Planned drop-off', seconds: trip.plannedSeconds, kind: 'planned' as TrackKind }] : []),
    { id: 'B', label: 'Actual drop-off', seconds: trip.actualSeconds, kind: 'actual' as TrackKind },
    ...(ctx ? [{ id: 'onward', label: 'Driver continues', seconds: journeyBounds(trip).end, kind: 'actual' as TrackKind }] : []),
  ].map(event => ({ ...event, coordinate: event.id === 'A' ? [...trip.pickup] as Coordinate : vehicleAt(event.kind, event.seconds, trip) }))
}
/** Slice only the prepared road polyline. Interpolated boundaries remain on its segments. */
function sliceLine(line: number[][], from: number, to: number) {
  const total = routeLength(line); let travelled = 0
  const result: number[][] = [along(line, from)]
  for (let i = 1; i < line.length - 1; i++) { travelled += distance(line[i - 1], line[i]); if (travelled > from * total && travelled < to * total) result.push(line[i]) }
  result.push(along(line, to)); return result
}
export function journeySegments(trip: PreparedTrack) {
  const ctx = trip.context
  const sections: { kind: TrackKind; phase: JourneyPhase; coordinates: number[][] }[] = [
    ...(ctx ? [{ kind: 'actual' as const, phase: 'history' as const, coordinates: ctx.history }] : []),
    { kind: 'actual', phase: 'approach', coordinates: ctx?.approach ?? trip.approach },
    ...(['actual', ...(routesDiffer(trip) ? ['planned'] : []), ...(hasAlternative(trip) ? ['alternative'] : [])] as TrackKind[]).map(kind => ({ kind, phase: 'onboard' as const, coordinates: onboardLine(kind, trip) })),
    ...(ctx ? [{ kind: 'actual' as const, phase: 'onward' as const, coordinates: ctx.onward }] : []),
  ]
  return sections.filter(s => s.coordinates.length > 1).flatMap(section => {
    const traffic = ctx?.traffic.filter(t => t.kind === section.kind && t.phase === section.phase) ?? []
    const stops = [...new Set([0, 1, ...traffic.flatMap(t => [t.from, t.to])])].sort((a, b) => a - b)
    return stops.slice(1).map((end, i) => ({ ...section, traffic: traffic.some(t => stops[i] >= t.from && end <= t.to), coordinates: sliceLine(section.coordinates, stops[i], end) }))
  })
}
/** One accelerated local clock. Paused intervals do not accrue catch-up time. */
export function scheduleTrackReplay(trip: PreparedTrack, initialSeconds: number, update: (percent: number) => void, active: () => boolean) {
  let last = Date.now(), elapsed = 0
  const { start, end } = journeyBounds(trip), span = end - start
  const timer = setInterval(() => {
    const now = Date.now(), delta = now - last; last = now
    if (!active()) return
    elapsed += delta
    const seconds = start + ((clampTripTime(initialSeconds, trip) - start + elapsed / 45000 * span) % span)
    update((seconds - start) / span * 100)
  }, 125)
  return () => clearInterval(timer)
}
function project(line: number[][], coordinate: Coordinate) {
  let best = Infinity, travelled = 0, selected = 0
  for (let i = 1; i < line.length; i++) {
    const a = line[i - 1], b = line[i], dx = b[0] - a[0], dy = b[1] - a[1]
    const t = Math.max(0, Math.min(1, ((coordinate[0] - a[0]) * dx + (coordinate[1] - a[1]) * dy) / (dx * dx + dy * dy || 1)))
    const point = [a[0] + dx * t, a[1] + dy * t], delta = distance(coordinate, point), length = distance(a, b)
    if (delta < best) { best = delta; selected = travelled + t * length }
    travelled += length
  }
  return { distance: best, fraction: travelled ? selected / travelled : 0 }
}
/** Project onto prepared geometry only; never computes a road route. */
export function routeMoment(kind: TrackKind, coordinate: Coordinate, trip: PreparedTrack = geographicTrip, phase?: JourneyPhase) {
  const ctx = trip.context, accepted = ctx?.acceptedSeconds ?? 0
  const candidates = [
    ...(ctx ? [{ ...project(ctx.history, coordinate), phase: 'history' as JourneyPhase, start: journeyBounds(trip).start, end: accepted }] : []),
    { ...project(ctx?.approach ?? trip.approach, coordinate), phase: 'approach' as JourneyPhase, start: accepted, end: trip.pickupSeconds },
    ...(kind === 'actual' && ctx ? [{ ...project(ctx.onward, coordinate), phase: 'onward' as JourneyPhase, start: trip.actualSeconds, end: journeyBounds(trip).end }] : []),
  ].map(p => ({ distance: p.distance, phase: p.phase, seconds: p.start + p.fraction * (p.end - p.start) }))
  const onboard = project(onboardLine(kind, trip), coordinate)
  candidates.push({ distance: onboard.distance, phase: 'onboard', seconds: onboardTime(kind, onboard.fraction, trip) })
  const matching = phase ? candidates.filter(candidate => candidate.phase === phase) : candidates
  const best = (matching.length ? matching : candidates).sort((a, b) => a.distance - b.distance)[0]
  const section = journeySegments(trip).filter(section => section.kind === kind && section.phase === best.phase)
    .map(section => ({ traffic: section.traffic, distance: project(section.coordinates, coordinate).distance })).sort((a, b) => a.distance - b.distance)[0]
  return { seconds: clampTripTime(best.seconds, trip), distance: best.distance, phase: best.phase, traffic: section?.traffic ?? false }
}
export function tripClock(seconds: number, trip: PreparedTrack = geographicTrip) {
  const total = (trip.departureSeconds ?? 12 * 3600) + clampTripTime(seconds, trip)
  return [Math.floor(total / 3600), Math.floor(total / 60) % 60, total % 60].map(n => String(n).padStart(2, '0')).join(':')
}
