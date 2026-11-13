import { cameraViews } from './render-fixtures'

export type RenderProduct = {
  id: string
  name: string
  image?: string
}

const art = '/images/metabox/products/library/'

export const porsche: RenderProduct = {
  id: 'porsche-911',
  name: 'Porsche 911 Carrera',
  image: cameraViews[0].image,
}

export const renderProducts: RenderProduct[] = [
  { id: 'axis-office-chair', name: 'Axis Office Chair', image: `${art}office-chair-delivery.webp` },
  { id: 'oak-dining-table', name: 'Cove Oak Dining Table' },
  { id: 'rose-lounge-chair', name: 'Fable Lounge Chair', image: `${art}rose-chair-delivery.webp` },
  { id: 'velvet-sofa', name: 'Moss Velvet Sofa', image: `${art}velvet-sofa-delivery.webp` },
  { id: 'linen-floor-lamp', name: 'Vela Linen Floor Lamp' },
  { id: 'cove-sideboard', name: 'Linea Sideboard' },
  porsche,
  { id: 'milo-side-table', name: 'Milo Side Table' },
  { id: 'axis-task-chair', name: 'Axis Task Chair', image: `${art}office-chair-delivery.webp` },
  { id: 'porcelain-tea-set', name: 'Sable Porcelain Set', image: `${art}tea-set-delivery.webp` },
]

export const collectionProductIds: Record<string, readonly string[]> = {
  'living-room': ['rose-lounge-chair', 'velvet-sofa', 'linen-floor-lamp', 'milo-side-table'],
  'dining-room': ['oak-dining-table', 'cove-sideboard', 'porcelain-tea-set'],
  'small-spaces': ['axis-office-chair', 'linen-floor-lamp', 'milo-side-table', 'axis-task-chair'],
  'studio-picks': ['rose-lounge-chair', 'velvet-sofa', porsche.id, 'porcelain-tea-set'],
}
