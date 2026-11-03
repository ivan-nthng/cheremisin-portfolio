import type { CSSProperties } from 'react'
import { citymobilAssets as assets } from './assets'
import styles from './preview.module.css'

export type AssetName = keyof typeof assets

export default function NativeAsset({ name, dark = false, plain = false }: { name: AssetName; dark?: boolean; plain?: boolean }) {
  const alternate = ('dark-info/' + (name.endsWith('/imgStateCompleted') ? 'imgStatusIndicator' : name.split('/')[1])) as AssetName
  const hasDark = dark && alternate in assets
  const asset = assets[hasDark ? alternate : name]
  const mask = dark && !hasDark && !plain
  const size = { width: asset.width, height: asset.height } as CSSProperties
  return mask
    ? <span aria-hidden="true" className={styles.nativeMask} data-native-asset={asset.src} style={{ ...size, maskImage: 'url("' + asset.src + '")', WebkitMaskImage: 'url("' + asset.src + '")' }} />
    : <img className={styles.nativeAsset} data-native-asset={asset.src} src={asset.src} width={asset.width} height={asset.height} alt="" draggable={false} />
}
