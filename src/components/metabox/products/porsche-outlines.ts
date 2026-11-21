import { currentPorscheOutline } from './porsche-current-outline'
import { porschePresetOutlines } from './porsche-preset-outlines'

export function getPorscheOutline(source: string | undefined) {
  const name = source?.match(/\/([^/]+)\.webp$/)?.[1]?.replace(/-delivery$/, '')
  if (name === 'porsche-current') return currentPorscheOutline

  const path = name && porschePresetOutlines[name]
  return path ? { width: 1672, height: 941, path } : undefined
}
