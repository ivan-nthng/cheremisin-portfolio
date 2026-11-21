import { expect, it } from 'vitest'
import type { StyleSpecification } from 'maplibre-gl'
import { citymobilMapStyle, type MapPalette } from '@/components/citymobil-demo/citymobil-map-style'

const palette: MapPalette = { main: '#ffffff', secondary: '#f8fafc', border: '#e2e8f0', soft: '#475569', label: '#64748b', blue: '#2563eb', green: '#16a34a', orange: '#f5a80f', red: '#ef4444', history: '#94a3b8' }
it('restyles only supported provider vector materials while preserving resources and label layout', () => {
  const provider: StyleSpecification = { version: 8, glyphs: 'https://provider/fonts/{fontstack}/{range}.pbf', sprite: 'https://provider/sprite', sources: { openmaptiles: { type: 'vector', url: 'https://provider/planet' }, custom: { type: 'geojson', data: { type: 'FeatureCollection', features: [] } } }, layers: [
    { id: 'background', type: 'background', paint: { 'background-color': '#abcabc' } },
    { id: 'water', type: 'fill', source: 'openmaptiles', 'source-layer': 'water', paint: { 'fill-color': '#112233' } },
    { id: 'highway_minor', type: 'line', source: 'openmaptiles', 'source-layer': 'transportation', paint: { 'line-color': '#112233', 'line-width': 3 } },
    { id: 'highway-name-minor', type: 'symbol', source: 'openmaptiles', 'source-layer': 'transportation_name', layout: { 'text-field': ['get', 'name'], 'text-font': ['Noto Sans Regular'] }, paint: { 'text-color': '#112233' } },
    { id: 'trip-actual', type: 'line', source: 'custom', paint: { 'line-color': '#123456' } },
  ] }
  const before = JSON.stringify(provider), style = citymobilMapStyle(provider, palette)
  expect(JSON.stringify(provider)).toBe(before)
  expect(style.sources).toEqual(provider.sources)
  expect(style.glyphs).toBe(provider.glyphs)
  expect(style.sprite).toBe(provider.sprite)
  expect(style.layers[0].paint).toMatchObject({ 'background-color': palette.secondary })
  expect(style.layers[1].paint).not.toEqual(provider.layers[1].paint)
  expect(style.layers[2].paint).toMatchObject({ 'line-color': palette.main, 'line-width': 3 })
  expect(style.layers[3].layout).toEqual(provider.layers[3].layout)
  expect(style.layers[3].paint).toMatchObject({ 'text-color': palette.label, 'text-halo-color': palette.main })
  expect(style.layers[4]).toEqual(provider.layers[4])
  const dark = citymobilMapStyle(provider, { ...palette, main: '#0f172a', secondary: '#000000', border: '#1e293b', label: '#94a3b8', blue: '#60a5fa', green: '#22c55e' })
  expect(dark.layers[1].paint).not.toEqual(style.layers[1].paint)
})
