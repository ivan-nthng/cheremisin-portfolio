'use client'

import type { Ref } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, useIsPresent, useReducedMotion } from 'framer-motion'
import 'maplibre-gl/dist/maplibre-gl.css'
import { citymobilScenarios, lostTrips, projectDemoTrip, formatDemoDateTime } from '@/lib/portfolio/client/citymobil-demo'
import type { ScenarioId } from '@/lib/portfolio/client/citymobil-demo'
import { geographicTrip, lostGeographicTrips, participantsAt, phaseAt, routesDiffer, scheduleTrackReplay, tripClock, timeFromPercent, percentFromTime, trackEvents, hasAlternative } from '@/lib/portfolio/client/citymobil-track'
import type { TrackKind, JourneyPhase } from '@/lib/portfolio/client/citymobil-track'
import { useGeographicTrack, phaseColors } from './useGeographicTrack'
import type { TrackParticipant } from './useGeographicTrack'
import { citymobilAssets as assets } from './assets'
import NativeAsset from './NativeAsset'
import { MapAttribution } from './MapAttribution'
import DemoMotion from './DemoMotion'
import styles from './preview.module.css'

type Props = { scenario: ScenarioId; selectedTripId?: string | null; sessionStartedAt?: number | null; dark: boolean; percent: number; onTime: (value: number) => void; onClose: () => void; closeRef: Ref<HTMLButtonElement>; nativeParked?: boolean; prepareOffscreen?: boolean; localBasemap?: boolean }

export default function CitymobilTrack({ scenario, selectedTripId, sessionStartedAt, dark, percent, onTime, onClose, closeRef, nativeParked = false, prepareOffscreen = false, localBasemap = false }: Props) {
  const selectedTrip = lostTrips.find(trip => trip.id === selectedTripId)
  const trip = projectDemoTrip(scenario === 'lost' ? { ...citymobilScenarios.lost, ...(selectedTrip ?? lostTrips[0]) } : citymobilScenarios[scenario], scenario, sessionStartedAt)
  const baseTrack = scenario === 'pickup' ? geographicTrip : scenario === 'lost' && selectedTrip ? lostGeographicTrips[selectedTrip.id] : null
  // Keep the projected track identity stable: map/replay lifetime depends on it.
  const track = useMemo(() => baseTrack && trip.startedAt != null ? { ...baseTrack, startedAt: trip.startedAt } : baseTrack, [baseTrack, trip.startedAt])
  const data = track ?? geographicTrip
  const seconds = timeFromPercent(percent, data)
  const people = participantsAt(seconds, data)
  const [kind, setKind] = useState<TrackKind>('actual')
  const [legend, setLegend] = useState(false)
  const [paused, setPaused] = useState(false)
  const [inspecting, setInspecting] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)
  const [selectedPhase, setSelectedPhase] = useState<JourneyPhase | null>(null)
  const [selectedPerson, setSelectedPerson] = useState<TrackParticipant | null>(null)
  const [hoveredPerson, setHoveredPerson] = useState<TrackParticipant | null>(null)
  const [focusedPerson, setFocusedPerson] = useState<TrackParticipant | null>(null)
  const [visible, setVisible] = useState(false)
  const [inView, setInView] = useState(false)
  const section = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const present = useIsPresent()
  const latest = useRef({ onTime, seconds }); latest.current = { onTime, seconds }
  const playing = useRef(false)
  const inspect = (type: TrackKind, time: number, eventId?: string, phase?: JourneyPhase) => {
    playing.current = false
    setPaused(true); setInspecting(true); setKind(type); setSelectedEvent(eventId ?? null); setSelectedPhase(phase ?? null)
    onTime(percentFromTime(time, data))
  }
  const participants = {
    driver: { name: trip.driver, role: 'Driver', avatar: trip.avatar, status: people.driverPhase, color: people.driverPhase === 'Brief stop' || people.driverPhase === 'At destination' ? 'var(--cm-map-green)' : phaseColors[phaseAt(seconds, data)] },
    rider: { name: trip.passenger, role: 'Passenger', avatar: trip.passengerAvatar, status: people.riderPhase, color: people.riderPhase === 'Dropped off' ? 'var(--cm-map-green)' : people.riderPhase === 'In the car' ? phaseColors.onboard : phaseColors.approach },
  }
  const interaction = { participants, selected: selectedPerson, hovered: hoveredPerson, focused: focusedPerson, onSelect: setSelectedPerson, onHover: setHoveredPerson, onFocus: setFocusedPerson }
  const map = useGeographicTrack(track, dark, seconds, kind, inspect, inspecting, selectedEvent, selectedPhase, interaction, prepareOffscreen, localBasemap)
  const running = Boolean(track && map.status === 'ready' && !nativeParked && !paused && !reduced && present && visible && inView)
  playing.current = running
  useEffect(() => {
    const update = () => setVisible(document.visibilityState === 'visible')
    update()
    document.addEventListener('visibilitychange', update)
    const observer = new IntersectionObserver(entries => {
      // A drawer entrance can deliver offscreen and visible records together.
      const entry = entries.at(-1)
      if (entry) setInView(entry.isIntersecting && entry.intersectionRatio > 0)
    }, { threshold: .01 })
    if (section.current) observer.observe(section.current)
    return () => { document.removeEventListener('visibilitychange', update); observer.disconnect() }
  }, [])
  useEffect(() => {
    if (!running || !track) return
    return scheduleTrackReplay(track, latest.current.seconds, value => latest.current.onTime(value), () => playing.current && document.visibilityState === 'visible')
  }, [running, track])
  const prepared = Boolean(track)
  return <section ref={section} className={styles.trackPanel} aria-label="Geographic trip track" data-source-node="6756:16587" data-map-state={prepared ? map.status : 'not-prepared'} data-track-time={tripClock(seconds, data)} data-track-trip={selectedTripId ?? scenario} data-playback={running ? 'playing' : 'paused'} data-inspecting={inspecting} data-selected-event={selectedEvent ?? undefined} onKeyDown={event => {
    if (event.nativeEvent.isComposing || event.ctrlKey || event.metaKey || event.altKey) return
    if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); onClose() }
    if (event.target instanceof HTMLElement && (event.target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName))) return
    if (prepared && event.key.toLowerCase() === 'i' && !event.repeat) { event.preventDefault(); setLegend(value => !value) }
  }}>
    {prepared && <div className={styles.geographicMap} ref={map.container} role="region" aria-label="Lisbon street map. Pan with arrow keys; zoom with plus or minus. Touch uses two fingers."/>}
    <button ref={closeRef} className={styles.mapClose} type="button" onClick={onClose} aria-label="Close trip track"><NativeAsset name="geographic/close" dark={dark}/></button>
    {prepared ? <>
      <div className={styles.trackPlayback}><div><h3>Trip Track</h3><output aria-label="Selected trip time" title={data.startedAt == null ? undefined : formatDemoDateTime(data.startedAt + seconds * 1000)}>{tripClock(seconds, data)}</output></div><button type="button" aria-label={paused ? 'Play trip' : 'Pause trip'} aria-pressed={paused || Boolean(reduced)} disabled={Boolean(reduced)} onClick={() => { playing.current = false; setPaused(value => !value); setInspecting(false); setSelectedEvent(null); setSelectedPhase(null) }}>{reduced ? 'Motion paused' : paused ? 'Play' : 'Pause'}</button></div>
      <AnimatePresence initial={false}>{map.status !== 'ready' && <DemoMotion kind="fade" key="map-status" className={styles.mapStatus} role="status">{map.status === 'loading' ? 'Loading street map…' : <>Street map unavailable. Check the connection or WebGL support.<button type="button" onClick={event => { map.retry(); event.currentTarget.closest('section')?.querySelector<HTMLButtonElement>('[aria-label="Close trip track"]')?.focus() }}>Retry map</button></>}</DemoMotion>}</AnimatePresence>
    </> : <div className={styles.trackUnavailable} role="status"><h3>Trip Track</h3><p>Track is not prepared for this case.</p><p>{trip.origin} → {trip.destination}</p></div>}
    <div className={styles.trackBottom} data-track-bottom>
      {prepared && <div className={styles.trackAboveFooter}>
      <div className={styles.trackContext}>
      <AnimatePresence initial={false}>{legend && <DemoMotion key="legend" kind="popover" className={styles.trackIndex} role="region" aria-label="Route legend" tabIndex={0}>
        <p><span style={{ background: phaseColors.history }}/>Before the order · faded</p>
        <p><span style={{ background: phaseColors.approach }}/>Approaching pickup</p>
        <p><span style={{ background: phaseColors.onboard }}/>Rider onboard</p>
        <p><span style={{ background: phaseColors.onward }}/>Driver after drop-off</p>
        <p><span style={{ background: phaseColors.traffic }}/>Congestion · independent of route</p>
        <p><span style={{ background: phaseColors.onboard }}/>Actual · solid</p>
        {routesDiffer(data) ? <p><span className={styles.plannedLegend} style={{ borderColor: phaseColors.onboard }}/>Planned estimate · dashed</p> : <p>Planned comparison unavailable.</p>}
        {hasAlternative(data) && <p><span style={{ background: phaseColors.alternative }}/>Alternative estimate · grey</p>}
        <div className={styles.trackEvents} aria-label="Inspect prepared events">{trackEvents(data).map(event => <button key={event.id} type="button" aria-pressed={selectedEvent === event.id} onClick={() => inspect(event.kind, event.seconds, event.id)}><span>{event.label}</span><time>{tripClock(event.seconds, data)}</time></button>)}</div>
        <small>Prepared fictional replay and congestion. No live traffic. Stop is illustrative.{routesDiffer(data) && ' Planned and actual drop-off share a location; inspect each timestamp.'}</small>
      </DemoMotion>}</AnimatePresence>
      <div className={styles.trackPeople} aria-label="Trip participants">
        {(['driver', 'rider'] as const).map(id => {
          const person = participants[id]
          return <button key={id} type="button" className={styles.trackPerson} data-person={id} data-highlighted={selectedPerson === id || hoveredPerson === id || focusedPerson === id} aria-pressed={selectedPerson === id} aria-label={`${person.name}, ${person.role}: ${person.status}`} onMouseEnter={() => setHoveredPerson(id)} onMouseLeave={() => setHoveredPerson(null)} onFocus={() => setFocusedPerson(id)} onBlur={() => setFocusedPerson(null)} onClick={() => setSelectedPerson(id)}>
            <img src={assets[person.avatar].src} alt="" width={28} height={28}/>
            <span className={styles.trackIdentity}><strong title={person.name}>{person.name}</strong><small>{person.role}</small></span>
            <span className={styles.trackPersonStatus} title={person.status}><i style={{ background: person.color }} aria-hidden="true"/><span>{person.status}</span></span>
          </button>
        })}
      </div>
      </div>
      <div className={styles.mapZoom}><button type="button" aria-label="Zoom in" disabled={map.status !== 'ready' || map.zoom >= 19} onClick={() => map.changeZoom(1, Boolean(reduced))}><NativeAsset name="geographic/plus" dark={dark}/></button><button type="button" aria-label="Zoom out" disabled={map.status !== 'ready' || map.zoom <= map.minZoom + (localBasemap ? 0.0001 : 0)} onClick={() => map.changeZoom(-1, Boolean(reduced))}><NativeAsset name="geographic/minus" dark={dark}/></button><output aria-label="Map zoom">{map.zoom.toFixed(1)}</output></div>
      </div>}
    <footer className={styles.trackFooter}><button type="button" onClick={onClose}><kbd>Esc</kbd> to close</button><button type="button" aria-expanded={prepared && legend} disabled={!prepared} onClick={() => setLegend(value => !value)}><kbd>I</kbd> index</button>{!localBasemap && <span className={styles.mapAttribution}><MapAttribution/></span>}</footer>
    </div>
  </section>
}
