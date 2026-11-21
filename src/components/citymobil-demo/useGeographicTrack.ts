'use client'

import { useEffect, useRef, useState } from 'react'
import { useIsPresent } from 'framer-motion'
import type { Map as GeographicMap, Marker, Popup, StyleSpecification } from 'maplibre-gl'
import { driverHeading, participantsAt, routeMoment, trackEvents, tripClock, vehicleAt, journeySegments, routeLabel, phaseLabel, phaseAt } from '@/lib/portfolio/client/citymobil-track'
import { citymobilMapStyle, readMapPalette } from './citymobil-map-style'
import type { Coordinate, TrackKind, PreparedTrack, JourneyPhase } from '@/lib/portfolio/client/citymobil-track'
import styles from './preview.module.css'

export const phaseColors = { history: 'var(--cm-grey)', approach: 'var(--cm-map-blue)', onboard: 'var(--cm-orange)', onward: 'var(--cm-label)', alternative: 'var(--cm-label)', traffic: 'var(--cm-map-red)' }
export type TrackParticipant = 'driver' | 'rider'
type ParticipantInteraction = {
  participants: Record<TrackParticipant, { name: string; role: string; status: string; color: string }>
  selected: TrackParticipant | null; hovered: TrackParticipant | null; focused: TrackParticipant | null
  onSelect: (person: TrackParticipant) => void
  onHover: (person: TrackParticipant | null) => void
  onFocus: (person: TrackParticipant | null) => void
}
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

export function useGeographicTrack(trip: PreparedTrack | null, dark: boolean, seconds: number, kind: TrackKind, select: (kind: TrackKind, seconds: number, eventId?: string, phase?: JourneyPhase) => void, inspecting: boolean, selectedEvent: string | null, selectedPhase: JourneyPhase | null, interaction: ParticipantInteraction, prepareOffscreen = false, localBasemap = false) {
  const container = useRef<HTMLDivElement>(null)
  const mapRef = useRef<GeographicMap | null>(null)
  const markers = useRef<Marker[]>([])
  const eventMarkers = useRef<Marker[]>([])
  const popup = useRef<Popup | null>(null)
  const camera = useRef<{ center: Coordinate; zoom: number } | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [retry, setRetry] = useState(0)
  const [{ zoom, minZoom }, setZoom] = useState({ zoom: 15, minZoom: 10 })
  const present = useIsPresent()
  const latest = useRef({ select, present, interaction }); latest.current = { select, present, interaction }
  useEffect(() => {
    if (!trip || !container.current) return
    let disposed = false
    let map: GeographicMap | null = null
    let preparationPaint = 0, preparing = prepareOffscreen
    const paintPreparation = () => {
      if (!preparing || disposed || preparationPaint) return
      // WebKit defers an offscreen iframe's RAF. Data-driven synchronous paints
      // finish genuine map initialization without a polling/render loop.
      preparationPaint = window.setTimeout(() => {
        preparationPaint = 0
        if (preparing && !disposed) map?.redraw()
      }, 0)
    }
    let resize: ResizeObserver | null = null
    const pointer = matchMedia(directWheelQuery)
    const updateGestures = () => { if (map && container.current) syncGestures(map, container.current, latest.current.present) }
    pointer.addEventListener('change', updateGestures)
    const initialCamera = camera.current
    const abort = new AbortController()
    setStatus('loading')
    const timeout = window.setTimeout(() => { if (!disposed) setStatus(value => value === 'loading' ? 'error' : value) }, 15000)
    const styleUrl = 'https://tiles.openfreemap.org/styles/positron'
    const localStyleUrl = '/images/citymobil/demo/geographic/inline-map-' + (dark ? 'dark' : 'light') + '.json'
    void Promise.all([import('maplibre-gl'), prepareOffscreen || localBasemap ? Promise.resolve(null) : fetch(styleUrl, { signal: abort.signal }).then(response => { if (!response.ok) throw new Error('Map style unavailable'); return response.json() as Promise<StyleSpecification> })]).then(([lib, provider]) => {
      if (disposed || !container.current) return
      try {
        lib.setWorkerUrl('/images/citymobil/demo/geographic/maplibre-gl-worker.mjs')
        const colors = readMapPalette(getComputedStyle(container.current))
        const prepareStyle = (provider: StyleSpecification) => {
          const style = citymobilMapStyle(provider, colors)
          if (prepareOffscreen) {
            // The recipe removes raster layers. Their unused inline sources
            // otherwise wait for another throttled iframe frame before load.
            const used = new Set(style.layers.flatMap(layer => 'source' in layer ? [layer.source] : []))
            if (style.terrain) used.add(style.terrain.source)
            for (const id of Object.keys(style.sources)) if (!used.has(id)) delete style.sources[id]
          }
          if (container.current) container.current.dataset.basemapLayers = String(style.layers.length)
          return style
        }
        const style = localBasemap ? localStyleUrl : provider ? prepareStyle(provider) : styleUrl
        container.current.dataset.basemapPalette = JSON.stringify(colors)
        container.current.dataset.styleTheme = dark ? 'dark' : 'light'
        // URL loading + the public style transform avoid loadJSON's iframe RAF
        // gate. Ordinary interactive maps keep their existing object-style path.
        map = new lib.Map({ container: container.current, style, ...(!localBasemap && prepareOffscreen ? { transformStyle: (_previous, provider) => prepareStyle(provider) } : {}), center: camera.current?.center ?? [-9.1453, 38.7157], zoom: camera.current?.zoom ?? 15.5, attributionControl: false, dragRotate: false, pitchWithRotate: false, touchPitch: false, renderWorldCopies: false, cooperativeGestures: true, ...(localBasemap ? { maxZoom: 19, maxPitch: 0 } : {}) })
        mapRef.current = map
        container.current.dataset.basemapMode = localBasemap ? 'local' : 'live'
        if (localBasemap) {
          map.keyboard.disableRotation()
          map.touchZoomRotate.disableRotation()
        }
        const readZoom = () => {
          if (map) setZoom({ zoom: map.getZoom(), minZoom: localBasemap ? map.getMinZoom(true) : 10 })
        }
        if (prepareOffscreen) { map.on('data', paintPreparation); paintPreparation() }
        resize = new ResizeObserver(() => { map?.resize(); updateGestures(); if (localBasemap) readZoom() })
        resize.observe(container.current)
        updateGestures()
        map.on('error', () => { if (!disposed) setStatus('error') })
        map.on('load', () => {
          if (disposed || !map || !container.current) return
          preparing = false; window.clearTimeout(preparationPaint); preparationPaint = 0
          map.off('data', paintPreparation)
          window.clearTimeout(timeout)
          container.current!.dataset.basemapMaterials = JSON.stringify(map.getStyle().layers.filter(layer => ['background', 'water', 'building', 'highway_minor', 'highway-name-minor'].includes(layer.id)).map(layer => ({ id: layer.id, type: layer.type, paint: layer.paint })))
          if (localBasemap) {
            const source = map.getStyle().sources['inline-basemap']
            if (source?.type !== 'image') { setStatus('error'); return }
            // Constrain the whole viewport to the georeferenced image. Inset
            // the edges slightly so texture sampling stays inside the capture.
            const [northWest, , southEast] = source.coordinates
            const inset = 0.00002
            map.setMaxBounds([[northWest[0] + inset, southEast[1] + inset], [southEast[0] - inset, northWest[1] - inset]])
          }
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
          for (const role of ['driver', 'rider'] as const) {
            const element = document.createElement('button'); element.type = 'button'; element.className = styles.mapParticipant; element.dataset.participant = role
            const mark = document.createElement('i'); mark.className = role === 'driver' ? styles.vehicleArrow : styles.riderPosition; mark.setAttribute('aria-hidden', 'true'); element.append(mark)
            const options = { signal: abort.signal }
            element.addEventListener('mouseenter', () => { if (latest.current.present) latest.current.interaction.onHover(role) }, options)
            element.addEventListener('mouseleave', () => latest.current.interaction.onHover(null), options)
            element.addEventListener('focus', () => { if (latest.current.present) latest.current.interaction.onFocus(role) }, options)
            element.addEventListener('blur', () => latest.current.interaction.onFocus(null), options)
            element.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') event.stopPropagation() }, options)
            element.addEventListener('keyup', event => { if (event.key === 'Enter' || event.key === ' ') event.stopPropagation() }, options)
            element.addEventListener('click', event => { event.stopPropagation(); if (latest.current.present) latest.current.interaction.onSelect(role) }, options)
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
          readZoom(); setStatus('ready')
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
        map.on('moveend', () => { if (map && !disposed) { camera.current = { center: map.getCenter().toArray() as Coordinate, zoom: map.getZoom() }; if (container.current) container.current.dataset.camera = JSON.stringify(camera.current); readZoom() } })
      } catch { if (!disposed) setStatus('error') }
    }).catch(() => { if (!disposed) setStatus('error') })
    return () => {
      disposed = true; abort.abort(); window.clearTimeout(timeout)
      window.clearTimeout(preparationPaint)
      latest.current.interaction.onHover(null); latest.current.interaction.onFocus(null)
      resize?.disconnect(); pointer.removeEventListener('change', updateGestures)
      if (map) camera.current = { center: map.getCenter().toArray() as Coordinate, zoom: map.getZoom() }
      markers.current.forEach(marker => marker.remove()); markers.current = []
      eventMarkers.current.forEach(marker => marker.remove()); eventMarkers.current = []
      popup.current?.remove(); popup.current = null
      map?.remove(); mapRef.current = null
    }
  }, [trip, dark, retry, prepareOffscreen, localBasemap])
  useEffect(() => {
    markers.current.forEach(marker => {
      const element = marker.getElement(), role = element.dataset.participant as TrackParticipant
      const person = interaction.participants[role]
      element.setAttribute('aria-label', `${person.name}, ${person.role} position: ${person.status}`)
      element.setAttribute('aria-pressed', String(interaction.selected === role))
      element.dataset.highlighted = String(interaction.selected === role || interaction.hovered === role || interaction.focused === role)
      element.style.setProperty('--participant-color', person.color)
      element.tabIndex = present ? 0 : -1
    })
  }, [interaction, status, present])
  useEffect(() => {
    const map = mapRef.current
    if (!map || status !== 'ready' || !trip) return
    const people = participantsAt(seconds, trip!)
    const points = [people.driver, people.rider]
    const together = points[0][0] === points[1][0] && points[0][1] === points[1][1]
    // Keep both controls reachable at the shared onboard coordinate; never change the GPS fixture or camera.
    markers.current.forEach((marker, i) => { marker.setLngLat(points[i]).setOffset(together ? [i ? 14 : -14, 0] : [0, 0]); marker.getElement().dataset.coordinate = points[i].map(v => v.toFixed(7)).join(','); marker.getElement().dataset.time = tripClock(seconds, trip!) })
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
  return { container, status, zoom, minZoom, retry: () => setRetry(value => value + 1), changeZoom: (delta: number, reduced: boolean) => mapRef.current?.zoomTo(Math.max(minZoom, Math.min(19, zoom + delta)), { duration: reduced ? 0 : 180 }) }
}
