/** Local review bridge only; the native Kitchen stays in its separate Vite host. */
export const kitchenDemoOrigin = 'http://127.0.0.1:3310'
export const kitchenCasePath = '/projects/saavi#kitchen'
export const kitchenBridge = { ready: 'saavi-kitchen:ready', close: 'saavi-kitchen:close', unavailable: 'saavi-kitchen:unavailable' } as const
export type SaaviDemoRole = 'kitchen' | 'admin'
export const saaviDemoScenarios = [{ id: 'kitchen', label: 'Kitchen' }, { id: 'admin', label: 'Admin' }] as const
export const isSaaviDemoRole = (value: unknown): value is SaaviDemoRole => value === 'kitchen' || value === 'admin'
export const saaviClipFrames = {
  dish: { width: 640, height: 550, compactHeight: 620 },
  buyers: { width: 640, height: 550, compactHeight: 448 },
  calendar: { width: 640, height: 550, compactHeight: 340 },
  analytics: { width: 640, height: 550, compactHeight: 600 },
  'dish-comparison': { width: 640, height: 550, compactHeight: 600 },
  production: { width: 1280, height: 555, compactHeight: 420 },
  'order-detail': { width: 640, height: 550, compactHeight: 540 },
} as const
export const saaviClipCompactWidth = 342
export const saaviClipCompactQuery = '(width < 640px)'
export type SaaviClip = keyof typeof saaviClipFrames

export function isSaaviClip(value: unknown): value is SaaviClip {
  return typeof value === 'string' && Object.hasOwn(saaviClipFrames, value)
}

export function isSaaviChartClip(clip: SaaviClip) {
  return clip === 'buyers' || clip === 'analytics' || clip === 'dish-comparison'
}

export function isKitchenCaseOrigin(origin: string) {
  return origin === 'http://127.0.0.1:3305' || origin === 'http://localhost:3305'
}
