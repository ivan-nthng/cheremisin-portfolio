export type CameraSettings = {
  interaction: 'Orbit' | 'Fixed'
  x: number
  y: number
  z: number
  yaw: number
  pitch: number
  fov: number
}

export type CameraLimits = {
  minZoom: number
  maxZoom: number
  left: number
  right: number
  top: number
  bottom: number
}

export const startingCamera: CameraSettings = {
  interaction: 'Orbit', x: -332, y: 12.34, z: -125, yaw: 0, pitch: 0, fov: 55,
}

export const startingLimits: CameraLimits = {
  minZoom: 8, maxZoom: 65, left: 90, right: 90, top: 90, bottom: 90,
}

export const unrestricted: CameraLimits = { ...startingLimits, minZoom: 5 }
// Camera studies are ordered by horizontal offset. Zero uses the Figma source.
export const cameraFrames = [
  { yaw: 0, src: '/images/metabox/sofa/reference.webp' },
  { yaw: 12, src: '/images/metabox/sofa/study-right.webp' },
] as const
export const frameRange = { min: cameraFrames[0].yaw, max: cameraFrames.at(-1)!.yaw }
export const zoomFor = (fov: number) => 90 - fov
export const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

export function editCamera(current: CameraSettings, patch: Partial<CameraSettings>): CameraSettings {
  const next = { ...current, ...patch }
  return {
    interaction: next.interaction,
    x: clamp(next.x, -9999, 9999),
    y: clamp(next.y, -9999, 9999),
    z: clamp(next.z, -9999, 9999),
    yaw: clamp(next.yaw, frameRange.min, frameRange.max),
    pitch: clamp(next.pitch, -20, 20),
    fov: clamp(next.fov, 25, 85),
  }
}

export function editLimits(current: CameraLimits, patch: Partial<CameraLimits>): CameraLimits {
  const next = { ...current, ...patch }
  const minZoom = clamp(next.minZoom, 5, 65)
  const maxZoom = clamp(next.maxZoom, 5, 65)
  return {
    minZoom: patch.maxZoom === undefined ? minZoom : Math.min(minZoom, maxZoom),
    maxZoom: patch.maxZoom === undefined ? Math.max(minZoom, maxZoom) : maxZoom,
    left: clamp(next.left, 0, 90),
    right: clamp(next.right, 0, 90),
    top: clamp(next.top, 0, 90),
    bottom: clamp(next.bottom, 0, 90),
  }
}

export function limitCamera(camera: CameraSettings, limits: CameraLimits): CameraSettings {
  return {
    ...camera,
    yaw: clamp(camera.yaw, Math.max(frameRange.min, -limits.left), Math.min(frameRange.max, limits.right)),
    pitch: clamp(camera.pitch, -limits.bottom, limits.top),
    fov: clamp(camera.fov, zoomFor(limits.maxZoom), zoomFor(limits.minZoom)),
  }
}
