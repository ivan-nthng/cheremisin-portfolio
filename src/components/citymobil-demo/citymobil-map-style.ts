import type { StyleSpecification } from 'maplibre-gl'

export type MapPalette = { main: string; secondary: string; border: string; soft: string; label: string; blue: string; green: string; orange: string; red: string; history: string }
export function readMapPalette(tokens: CSSStyleDeclaration): MapPalette {
  const names = { main: '--cm-main', secondary: '--cm-secondary', border: '--cm-border', soft: '--cm-soft', label: '--cm-label', blue: '--cm-map-blue', green: '--cm-map-green', orange: '--cm-orange', red: '--cm-map-red', history: '--cm-grey' }
  return Object.fromEntries(Object.entries(names).map(([name, token]) => [name, tokens.getPropertyValue(token).trim()])) as MapPalette
}
function blend(a: string, b: string, amount: number) {
  const rgb = (color: string) => { const value = color.slice(1); const full = value.length === 3 ? value.split('').map(c => c + c).join('') : value; return [0, 2, 4].map(i => parseInt(full.slice(i, i + 2), 16)) }
  const first = rgb(a), second = rgb(b)
  return '#' + first.map((v, i) => Math.round(v + (second[i] - v) * amount).toString(16).padStart(2, '0')).join('')
}
/** Scoped OpenMapTiles vector recipe. Data, glyphs, sprites and layout stay provider-owned. */
export function citymobilMapStyle(provider: StyleSpecification, palette: MapPalette): StyleSpecification {
  const style = structuredClone(provider)
  style.layers = style.layers.filter(layer => layer.type !== 'raster')
  for (const layer of style.layers) {
    if (layer.type === 'background') { layer.paint = { ...layer.paint, 'background-color': palette.secondary }; continue }
    if (!('source' in layer) || layer.source !== 'openmaptiles') continue
    const source = layer['source-layer']
    if (layer.type === 'fill') {
      const color = source === 'water' ? blend(palette.main, palette.blue, .14)
        : source === 'park' || source === 'landcover' ? blend(palette.main, palette.green, .1)
        : source === 'building' ? blend(palette.main, palette.border, .65)
        : source === 'landuse' || source === 'aeroway' || source === 'transportation' ? palette.secondary : null
      if (color) layer.paint = { ...layer.paint, 'fill-color': color, ...(source === 'building' ? { 'fill-outline-color': palette.border } : {}) }
    } else if (layer.type === 'line') {
      const color = source === 'waterway' ? blend(palette.main, palette.blue, .3)
        : source === 'boundary' ? palette.label
        : source === 'transportation' || source === 'aeroway' ? /casing|railway|subtle/.test(layer.id) ? palette.border : palette.main : null
      if (color) layer.paint = { ...layer.paint, 'line-color': color }
    } else if (layer.type === 'symbol' && layer.layout?.['text-field'] && ['transportation_name', 'place', 'water_name', 'waterway', 'poi', 'aerodrome_label'].includes(source ?? '')) {
      layer.paint = { ...layer.paint, 'text-color': source === 'place' ? palette.soft : palette.label, 'text-halo-color': palette.main, 'text-halo-width': 1.5 }
    }
  }
  return style
}
