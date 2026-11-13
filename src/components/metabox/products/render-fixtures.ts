export type CameraView = { id: string; name: string; image: string }
export type RenderSize = 'full-hd' | 'hd'
export type RenderFormat = 'png' | 'jpeg'

const assetBase = '/images/metabox/products/'

export const environmentName = 'Country House'

export const currentCamera: CameraView = {
  id: 'current', name: 'Current Camera', image: assetBase + 'porsche-current-delivery.webp',
}

export const cameraViews: readonly CameraView[] = [
  { id: 'three-quarter', name: 'Front Three-Quarter', image: assetBase + 'porsche-three-quarter-delivery.webp' },
  { id: 'front', name: 'Front', image: assetBase + 'porsche-front-delivery.webp' },
  { id: 'side', name: 'Side', image: assetBase + 'porsche-side-delivery.webp' },
  { id: 'rear-three-quarter', name: 'Rear Three-Quarter', image: assetBase + 'porsche-rear-three-quarter-delivery.webp' },
  { id: 'rear', name: 'Rear', image: assetBase + 'porsche-rear-delivery.webp' },
]

export const renderSizes = [
  { value: 'full-hd', label: 'Full HD (1920 × 1080 px)', width: 1920, height: 1080 },
  { value: 'hd', label: 'HD (1280 × 720 px)', width: 1280, height: 720 },
] as const

export const renderFormats = [
  { value: 'png', label: 'PNG' },
  { value: 'jpeg', label: 'JPEG' },
] as const

export async function renderCamera(view: CameraView, size: RenderSize, format: RenderFormat): Promise<Blob> {
  const image = new Image()
  image.src = view.image
  await image.decode()

  const { width, height } = renderSizes.find(option => option.value === size)!
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Canvas is unavailable')

  const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight)
  const imageWidth = image.naturalWidth * scale
  const imageHeight = image.naturalHeight * scale
  context.fillStyle = '#121827'
  context.fillRect(0, 0, width, height)
  context.drawImage(image, (width - imageWidth) / 2, (height - imageHeight) / 2, imageWidth, imageHeight)

  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('Image export failed')), 'image/' + format, .94)
  })
}
