'use client'

import type { Ref } from 'react'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, useIsPresent, useReducedMotion } from 'framer-motion'
import 'maplibre-gl/dist/maplibre-gl.css'
import { citymobilScenarios, lostTrips } from '@/lib/portfolio/client/citymobil-demo'
import type { ScenarioId } from '@/lib/portfolio/client/citymobil-demo'
import { geographicTrip, lostGeographicTrips, participantsAt, routesDiffer, scheduleTrackReplay, tripClock, timeFromPercent, percentFromTime, trackEvents, hasAlternative } from '@/lib/portfolio/client/citymobil-track'
import type { TrackKind, JourneyPhase } from '@/lib/portfolio/client/citymobil-track'
import { useGeographicTrack, phaseColors } from './useGeographicTrack'
import { citymobilAssets as assets } from './assets'
import NativeAsset from './NativeAsset'
import DemoMotion from './DemoMotion'
import styles from './preview.module.css'

type Props = { scenario: ScenarioId; selectedTripId?: string | null; dark: boolean; percent: number; onTime: (value: number) => void; onClose: () => void; closeRef: Ref<HTMLButtonElement> }

export default function CitymobilTrack({ scenario, selectedTripId, dark, percent, onTime, onClose, closeRef }: Props) {
  const selectedTrip = lostTrips.find(trip => trip.id === selectedTripId)
  const trip = scenario === 'lost' ? { ...citymobilScenarios.lost, ...(selectedTrip ?? lostTrips[0]) } : citymobilScenarios[scenario]
  const track = scenario === 'pickup' ? geographicTrip : scenario === 'lost' && selectedTrip ? lostGeographicTrips[selectedTrip.id] : null
  const data = track ?? geographicTrip
  const seconds = timeFromPercent(percent, data)
  const people = participantsAt(seconds, data)
  const [kind, setKind] = useState<TrackKind>('actual')
  const [legend, setLegend] = useState(false)
  const [paused, setPaused] = useState(false)
  const [inspecting, setInspecting] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)
  const [selectedPhase, setSelectedPhase] = useState<JourneyPhase | null>(null)
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
  const map = useGeographicTrack(track, dark, seconds, kind, inspect, inspecting, selectedEvent, selectedPhase)
  const running = Boolean(track && map.status === 'ready' && !paused && !reduced && present && visible && inView)
  playing.current = running
  useEffect(() => {
    const update = () => setVisible(document.visibilityState === 'visible')
    update()
    document.addEventListener('visibilitychange', update)
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio > 0), { threshold: .01 })
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
      <div className={styles.trackPlayback}><div><h3>Trip Track</h3><output aria-label="Selected trip time">{tripClock(seconds, data)}</output></div><button type="button" aria-pressed={paused || Boolean(reduced)} disabled={Boolean(reduced)} onClick={() => { playing.current = false; setPaused(value => !value); setInspecting(false); setSelectedEvent(null); setSelectedPhase(null) }}>{reduced ? 'Motion paused' : paused ? 'Resume trip' : 'Pause trip'}</button></div>
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
        <div className={styles.passenger}><img src={assets[trip.avatar].src} alt="" width={28} height={28}/><div><strong>{trip.driver}</strong><span>{people.driverPhase}</span></div></div>
        <div className={styles.passenger}><img src={assets[trip.passengerAvatar].src} alt="" width={28} height={28}/><div><strong>{trip.passenger}</strong><span>{people.riderPhase}</span></div></div>
      </div>
      </div>
      <div className={styles.mapZoom}><button type="button" aria-label="Zoom in" disabled={map.status !== 'ready' || map.zoom >= 19} onClick={() => map.changeZoom(1, Boolean(reduced))}><NativeAsset name="geographic/plus" dark={dark}/></button><button type="button" aria-label="Zoom out" disabled={map.status !== 'ready' || map.zoom <= 10} onClick={() => map.changeZoom(-1, Boolean(reduced))}><NativeAsset name="geographic/minus" dark={dark}/></button><output aria-label="Map zoom">{map.zoom.toFixed(1)}</output></div>
      </div>}
    <footer className={styles.trackFooter}><button type="button" onClick={onClose}><kbd>Esc</kbd> to close</button><button type="button" aria-expanded={prepared && legend} disabled={!prepared} onClick={() => setLegend(value => !value)}><kbd>I</kbd> index</button><span className={styles.mapAttribution}><a href="https://openfreemap.org/" target="_blank" rel="noreferrer">OpenFreeMap</a> · <a href="https://www.openmaptiles.org/" target="_blank" rel="noreferrer">© OpenMapTiles</a> · <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a></span></footer>
    </div>
  </section>
}
