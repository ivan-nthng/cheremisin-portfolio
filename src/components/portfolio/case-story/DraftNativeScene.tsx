'use client'

import ReadersDemo from '@/components/litres-readers/ReadersDemo'
import ProductsDemo from '@/components/metabox/products/ProductsDemo'
import { Stage } from '@/components/citymobil-features/stageshow/stage'
import type { Act } from '@/components/citymobil-features/stageshow/act'
import styles from './case-draft.module.css'

const opening = { selected: false }

async function showReader(act: Act<typeof opening>) {
  await act.enter('guided-reader')
  await act.click('guided-reader')
  await act.set({ selected: true })
  await act.wait(2200)
  await act.set(opening)
  await act.wait(650)
}

async function showCamera(act: Act<typeof opening>) {
  await act.enter('guided-camera')
  await act.click('guided-camera')
  await act.set({ selected: true })
  await act.wait(2200)
  await act.set(opening)
  await act.wait(650)
}

export function DraftNativeScene({ variant, suspended = false }: { variant: 'litres' | 'metabox'; suspended?: boolean }) {
  const readers = variant === 'litres'
  return <Stage width={1440} height={readers ? 868 : 900} initial={opening} poster={{ selected: true }}
    script={suspended ? undefined : readers ? showReader : showCamera} cursor={{ at: { x: 740, y: 400 }, style: 'real' }}>
    {state => <div className={styles.nativeWorkspace}>
      {readers ? <ReadersDemo guidedSelection={state.selected} />
        : <ProductsDemo guidedCamera={state.selected ? 'side' : 'current'} />}
    </div>}
  </Stage>
}
