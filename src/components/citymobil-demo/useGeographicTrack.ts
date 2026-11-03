'use client'

import { useEffect, useRef, useState } from 'react'
import { useIsPresent } from 'framer-motion'
import type { Map as GeographicMap, Marker, Popup } from 'maplibre-gl'
import { driverHeading, participantsAt, routeMoment, trackEvents, tripClock, vehicleAt, journeySegments, routeLabel, phaseLabel, phaseAt } from '@/lib/portfolio/client/citymobil-track'
import { citymobilMapStyle, readMapPalette } from './citymobil-map-style'
import type { Coordinate, TrackKind, PreparedTrack, JourneyPhase } from '@/lib/portfolio/client/citymobil-track'
import styles from './preview.module.css'

export const phaseColors = { history: 'var(--cm-grey)', approach: 'var(--cm-map-blue)', onboard: 'var(--cm-orange)', onward: 'var(--cm-label)', alternative: 'var(--cm-label)', traffic: 'var(--cm-map-red)' }
const directWheelQuery = '(min-width:761px) and (hover:hover) and (pointer:fine)'

function syncGestures(map: GeographicMap, element: HTMLElement, present: boolean) {
  const direct = present && matchMedia(directWheelQuery).matches
  if (direct) { map.cooperativeGestures.disable(); map.scrollZoom.enable() }
  else { map.scrollZoom.disable(); if (present) map.cooperativeGestures.enable(); else map.cooperativeGestures.disable() }
  element.dataset.wheelMode = direct ? 'direct' : 'page-scroll'
}

function tooltip(trip: PreparedTrack, kind: TrackKind, seconds: number, phase: JourneyPhase, label?: string, traffic = false) {
  const node = document.createElement('div'); node.className = styles.trackTooltip
  const title = document.createElement('strong'); title.textContent = label ?? phaseLabel(phase)
  const detail = document.createElement('span'); detail.textContent = label ? phaseLabel(phase) + ' · ' + routeLabel(kind) : routeLabel(kind)
  const time = document.createElement('span'); time.textContent = tripClock(seconds, trip)
  node.append(title, detail, time)
  if (traffic) { const congestion = document.createElement('span'); congestion.textContent = 'Prepared congestion'; node.append(congestion) }
  node.dataset.trackKind = kind; node.dataset.trackPhase = phase
  return node
}

export function useGeographicTrack(trip: PreparedTrack | null, dark: boolean, seconds: number, kind: TrackKind, select: (kind: TrackKind, seconds: number, eventId?: string, phase?: JourneyPhase) => void, inspecting: boolean, selectedEvent: string | null, selectedPhase: JourneyPhase | null) {
  const container = useRef<HTMLDivElement>(null)
  const mapRef = useRef<GeographicMap | null>(null)
  const markers = useRef<Marker[]>([])
  const eventMarkers = useRef<Marker[]>([])
  const popup = useRef<Popup | null>(null)
  const camera = useRef<{ center: Coordinate; zoom: number } | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [retry, setRetry] = useState(0)
  const [zoom, setZoom] = useState(15)
  const present = useIsPresent()
  const latest = useRef({ select, present }); latest.current = { select, present }
  useEffect(() => {
    if (!trip || !container.current) return
    let disposed = false
    let map: GeographicMap | null = null
    let resize: ResizeObserver | null = null
    const pointer = matchMedia(directWheelQuery)
    const updateGestures = () => { if (map && container.current) syncGestures(map, container.current, latest.current.present) }
    pointer.addEventListener('change', updateGestures)
    const initialCamera = camera.current
    const abort = new AbortController()
    setStatus('loading')
    const timeout = window.setTimeout(() => { if (!disposed) setStatus(value => value === 'loading' ? 'error' : value) }, 15000)
    void Promise.all([import('maplibre-gl'), fetch('https://tiles.openfreemap.org/styles/positron', { signal: abort.signal }).then(response => { if (!response.ok) throw new Error('Map style unavailable'); return response.json() })]).then(([lib, provider]) => {
      if (disposed || !container.current) return
      try {
        lib.setWorkerUrl('/images/citymobil/demo/geographic/maplibre-gl-worker.mjs')
        const colors = readMapPalette(getComputedStyle(container.current))
        const style = citymobilMapStyle(provider, colors)
        container.current.dataset.basemapPalette = JSON.stringify(colors)
        container.current.dataset.basemapLayers = String(style.layers.length)
        container.current.dataset.styleTheme = dark ? 'dark' : 'light'
        map = new lib.Map({ container: container.current, style, center: camera.current?.center ?? [-9.1453, 38.7157], zoom: camera.current?.zoom ?? 15.5, attributionControl: false, dragRotate: false, pitchWithRotate: false, touchPitch: false, renderWorldCopies: false, cooperativeGestures: true })
        mapRef.current = map
        resize = new ResizeObserver(() => { map?.resize(); updateGestures() })
        resize.observe(container.current)
        updateGestures()
        map.on('error', () => { if (!disposed) setStatus('error') })
        map.on('load', () => {
          if (disposed || !map) return
          window.clearTimeout(timeout)
          container.current!.dataset.basemapMaterials = JSON.stringify(map.getStyle().layers.filter(layer => ['background', 'water', 'building', 'highway_minor', 'highway-name-minor'].includes(layer.id)).map(layer => ({ id: layer.id, type: layer.type, paint: layer.paint })))
          const segments = journeySegments(trip)
          const features = segments.filter(s => s.phase !== 'history').map(s => ({ type: 'Feature' as const, properties: { kind: s.kind, phase: s.phase, traffic: s.traffic }, geometry: { type: 'LineString' as const, coordinates: s.coordinates } }))
          map.addSource('prepared-trip', { type: 'geojson', data: { type: 'FeatureCollection', features } })
          const history = segments.find(s => s.phase === 'history')
          if (history) {
            map.addSource('prepared-history', { type: 'geojson', lineMetrics: true, data: { type: 'Feature', properties: { kind: 'actual', phase: 'history', traffic: false }, geometry: { type: 'LineString', coordinates: history.coordinates } } })
            map.addLayer({ id: 'trip-history-casing', type: 'line', source: 'prepared-history', layout: { 'line-join': 'round', 'line-cap': 'round' }, paint: { 'line-width': 9, 'line-color': colors.main, 'line-opacity': .75 } })
            map.addLayer({ id: 'trip-history', type: 'line', source: 'prepared-history', layout: { 'line-join': 'round', 'line-cap': 'round' }, paint: { 'line-width': 5, 'line-gradient': ['interpolate', ['linear'], ['line-progress'], 0, colors.history + '40', .65, colors.history, 1, colors.history] } })
          }
          for (const type of ['alternative', 'planned', 'actual'] as const) {
            if (!features.some(f => f.properties.kind === type)) continue
            map.addLayer({ id: 'trip-' + type + '-casing', type: 'line', source: 'prepared-trip', filter: ['==', ['get', 'kind'], type], layout: { 'line-join': 'round', 'line-cap': 'round' }, paint: { 'line-color': colors.main, 'line-width': type === 'actual' ? 10 : 8, 'line-opacity': .85 } })
            map.addLayer({ id: 'trip-' + type, type: 'line', source: 'prepared-trip', filter: ['==', ['get', 'kind'], type], layout: { 'line-join': 'round', 'line-cap': 'round' }, paint: { 'line-color': ['case', ['get', 'traffic'], colors.red, ['==', ['get', 'phase'], 'approach'], colors.blue, ['==', ['get', 'phase'], 'onward'], colors.label, type === 'alternative' ? colors.label : colors.orange], 'line-width': type === 'actual' ? 6 : 4, ...(type === 'planned' ? { 'line-dasharray': [2, 1] } : {}) } })
          }
          container.current!.dataset.routeStyles = JSON.stringify({ colors, sections: segments.map(({ coordinates, ...properties }) => ({ ...properties, points: coordinates.length })), actualWidth: 6, plannedWidth: 4, plannedDash: [2, 1] })
          for (const role of ['driver', 'rider']) {
            const element = document.createElement('span'); element.className = styles.mapParticipant; element.dataset.participant = role; element.setAttribute('role', 'img'); element.setAttribute('aria-label', role === 'driver' ? 'Driver position' : 'Rider position')
            if (role === 'driver') { const arrow = document.createElement('i'); arrow.className = styles.vehicleArrow; element.append(arrow) }
            markers.current.push(new lib.Marker({ element, draggable: false }).setLngLat(trip.pickup as Coordinate).addTo(map))
          }
          popup.current = new lib.Popup({ closeButton: false, closeOnClick: false, offset: 18, padding: { top: 12, bottom: 12, left: 12, right: 12 }, className: styles.mapPopup })
          const clearPopup = () => { popup.current?.remove(); if (map) map.getCanvas().style.cursor = '' }
          const bindPoint = (element: HTMLButtonElement, coordinate: Coordinate, time: number, type: TrackKind, phase: JourneyPhase, label: string, eventId?: string, traffic = false) => {
            const show = () => { if (map && latest.current.present) popup.current?.setDOMContent(tooltip(trip, type, time, phase, label, traffic)).setLngLat(coordinate).addTo(map) }
            element.addEventListener('mouseenter', show); element.addEventListener('focus', show)
            element.addEventListener('mouseleave', clearPopup); element.addEventListener('blur', clearPopup)
            element.addEventListener('click', event => { event.stopPropagation(); if (latest.current.present) { latest.current.select(type, time, eventId, phase); show() } })
          }
          for (const event of trackEvents(trip)) {
            const element = document.createElement('button'); element.type = 'button'; element.className = styles.mapEvent; element.dataset.event = event.id
            element.setAttribute('aria-label', event.label + ' at ' + tripClock(event.seconds, trip)); element.setAttribute('aria-pressed', 'false')
            const mark = document.createElement('span'); mark.setAttribute('aria-hidden', 'true'); element.append(mark)
            bindPoint(element, event.coordinate, event.seconds, event.kind, phaseAt(event.seconds, trip), event.label, event.id)
            eventMarkers.current.push(new lib.Marker({ element, draggable: false }).setLngLat(event.coordinate).addTo(map))
          }
          const congestion = segments.find(s => s.kind === 'actual' && s.traffic && s.phase === 'onboard')
          if (congestion) {
            const element = document.createElement('button'); element.type = 'button'; element.className = styles.trafficWarning
            element.setAttribute('aria-label', 'Prepared congestion on actual route')
            const image = document.createElement('img'); image.src = '/images/citymobil/demo/journey/traffic-warning.svg'; image.width = 25; image.height = 27; image.alt = ''; element.append(image)
            const point = congestion.coordinates[Math.floor(congestion.coordinates.length / 2)] as Coordinate
            const moment = routeMoment('actual', point, trip, 'onboard')
            bindPoint(element, point, moment.seconds, 'actual', 'onboard', 'Congestion', undefined, true)
            eventMarkers.current.push(new lib.Marker({ element, draggable: false }).setLngLat(point).addTo(map))
          }
          if (!initialCamera) {
            const bounds = new lib.LngLatBounds(); segments.flatMap(s => s.coordinates).forEach(point => bounds.extend(point as Coordinate))
            const bottom = container.current?.parentElement?.querySelector<HTMLElement>('[data-track-bottom]')?.getBoundingClientRect().height ?? 188
            const padding = { top: 90, bottom: bottom + 20, left: 40, right: 56 }
            container.current!.dataset.fitPadding = JSON.stringify(padding)
            map.fitBounds(bounds, { padding, duration: 0 })
          }
          setZoom(map.getZoom()); setStatus('ready')
          const inspect = (event: { point: { x: number; y: number }; lngLat: { lng: number; lat: number }; originalEvent?: MouseEvent }) => {
            if (!map || !latest.current.present) return
            if (event.originalEvent?.target instanceof Element && event.originalEvent.target.closest('button')) return
            const { x, y } = event.point
            const layers = ['trip-actual', 'trip-planned', 'trip-alternative', 'trip-history'].filter(id => map!.getLayer(id))
            const hits = map.queryRenderedFeatures([[x - 8, y - 8], [x + 8, y + 8]], { layers })
            map.getCanvas().style.cursor = hits.length ? 'crosshair' : ''
            if (!hits.length) { clearPopup(); return }
            const candidates = hits.map(feature => { const type = (feature.properties.kind ?? 'actual') as TrackKind; return { type, ...routeMoment(type, [event.lngLat.lng, event.lngLat.lat], trip, feature.properties.phase as JourneyPhase) } }).sort((a, b) => a.distance - b.distance)
            latest.current.select(candidates[0].type, candidates[0].seconds, undefined, candidates[0].phase)
          }
          map.on('mousemove', inspect); map.on('click', inspect)
          map.getCanvas().addEventListener('mouseleave', clearPopup)
        })
        map.on('moveend', () => { if (map && !disposed) { camera.current = { center: map.getCenter().toArray() as Coordinate, zoom: map.getZoom() }; if (container.current) container.current.dataset.camera = JSON.stringify(camera.current); setZoom(map.getZoom()) } })
      } catch { if (!disposed) setStatus('error') }
    }).catch(() => { if (!disposed) setStatus('error') })
    return () => {
      disposed = true; abort.abort(); window.clearTimeout(timeout)
      resize?.disconnect(); pointer.removeEventListener('change', updateGestures)
      if (map) camera.current = { center: map.getCenter().toArray() as Coordinate, zoom: map.getZoom() }
      markers.current.forEach(marker => marker.remove()); markers.current = []
      eventMarkers.current.forEach(marker => marker.remove()); eventMarkers.current = []
      popup.current?.remove(); popup.current = null
      map?.remove(); mapRef.current = null
    }
  }, [trip, dark, retry])
  useEffect(() => {
    const map = mapRef.current
    if (!map || status !== 'ready' || !trip) return
    const people = participantsAt(seconds, trip!)
    const points = [people.driver, people.rider]
    markers.current.forEach((marker, i) => { marker.setLngLat(points[i]); marker.getElement().dataset.coordinate = points[i].map(v => v.toFixed(7)).join(','); marker.getElement().dataset.time = tripClock(seconds, trip!) })
    const heading = driverHeading(seconds, trip)
    const arrow = markers.current[0]?.getElement().querySelector('i')
    if (arrow) { arrow.style.transform = 'rotate(' + (heading + 90) + 'deg)'; arrow.dataset.heading = heading.toFixed(2) }
    eventMarkers.current.forEach(marker => marker.getElement().setAttribute('aria-pressed', String(marker.getElement().dataset.event === selectedEvent)))
    if (!inspecting) { popup.current?.remove(); return }
    const phase = selectedPhase ?? phaseAt(seconds, trip)
    const moment = routeMoment(kind, vehicleAt(kind, seconds, trip), trip, phase)
    const node = tooltip(trip, kind, seconds, phase, selectedEvent ? trackEvents(trip).find(event => event.id === selectedEvent)?.label : undefined, moment.traffic)
    popup.current?.setDOMContent(node).setLngLat(vehicleAt(kind, seconds, trip!)).addTo(map)
  }, [seconds, kind, status, trip, inspecting, selectedEvent, selectedPhase])
  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    for (const handler of [map.dragPan, map.boxZoom, map.doubleClickZoom, map.touchZoomRotate, map.keyboard]) { if (present) handler.enable(); else handler.disable() }
    if (container.current) syncGestures(map, container.current, present)
  }, [present, status])
  return { container, status, zoom, retry: () => setRetry(value => value + 1), changeZoom: (delta: number, reduced: boolean) => mapRef.current?.zoomTo(Math.max(10, Math.min(19, zoom + delta)), { duration: reduced ? 0 : 180 }) }
}
