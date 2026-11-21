export type CatalogItem = {
  id: string
  name: string
  displayName: string
  asset: string
}

export const products: CatalogItem[] = [
  { id: 'sofa', name: 'SOL-310 · Sand weave', displayName: 'Sola Sofa', asset: 'sofa.webp' },
  { id: 'cabinet', name: 'COV-240 · Smoked oak', displayName: 'Cove Cabinet', asset: 'cabinet.webp' },
  { id: 'chair', name: 'ARO-120 · Walnut and leather', displayName: 'Arlo Lounge Chair', asset: 'chair.webp' },
  { id: 'tower', name: 'LIN-420 · Charcoal', displayName: 'Linea Display Tower', asset: 'tower.webp' },
  { id: 'stool', name: 'VEL-110 · Brushed brass', displayName: 'Vela Floor Lamp', asset: 'stool.webp' },
]

export const environments: CatalogItem[] = [
  { id: 'studio-one', name: 'ENV-010 · Warm daylight', displayName: 'Loft Studio', asset: 'environment-one.webp' },
  { id: 'studio-two', name: 'ENV-020 · Cool daylight', displayName: 'Blue Kitchen', asset: 'environment-two.webp' },
]

export const collections = [
  { id: 'living-room', name: 'Living Room', label: 'Living room furniture' },
  { id: 'dining-room', name: 'Dining Room', label: 'Dining room furniture' },
  { id: 'small-spaces', name: 'Small Spaces', label: 'Furniture for small spaces' },
  { id: 'studio-picks', name: 'Studio Picks', label: 'Studio furniture selection' },
]

export const catalogTitle = 'Sola Living Room'
export const profile = { name: 'Nora Linden', initials: 'NL', workspace: 'Juniper House Studio' }
export const sofaName = products[0].displayName
