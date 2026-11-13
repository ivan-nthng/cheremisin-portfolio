'use client'

import { useState, type ReactNode } from 'react'
import { LoaderCircle } from 'lucide-react'
import { Stage } from '@/components/citymobil-features/stageshow/stage'
import type { Act, Script } from '@/components/citymobil-features/stageshow/act'
import { useReducedMotion } from '@/components/citymobil-features/stageshow/reduced-motion'
import { CaseDemoMedia } from '@/components/portfolio/case-story/CaseDemoMedia'
import { CaseFeatureCard, CaseFeatureGrid } from '@/components/portfolio/case-story/CaseDetails'
import { ReaderIcon } from './ReaderControls'
import { defaultCrop, ReaderPhotoStep, ReaderStepFrame, type Crop } from './ReaderEditor'
import { ReaderTicket } from './ReaderTicket'
import ReadersDemo, { type GuidedReaderFilter, type Reader } from './ReadersDemo'
import s from './readers.module.css'

type Scene = { phase: 'capture' | 'crop' | 'saving' | 'profile'; crop: Crop }
const photoInitial: Scene = { phase: 'capture', crop: defaultCrop }
const photoPoster: Scene = { phase: 'profile', crop: { ...defaultCrop, x: .18, y: .12 } }
const reader: Reader = {
  id: 25941, first: 'Amelia', last: 'Parker', email: 'amelia.parker@example.com',
  phone: '25-214-705', group: '', age: 31, books: 0, minutes: 0, active: true,
  type: 'Selfservice', photo: true, photoSrc: '/images/litres/readers/reader.webp',
  crop: null, color: '#a1c1df', available: '4', below: '2', cost: '€25',
}
const ignore = () => {}
const tableInitial: GuidedReaderFilter = { open: false, status: 'All' }
const tablePoster: GuidedReaderFilter = { open: true, status: 'Active' }
type RulesScene = { available: string; cost: string; saved: boolean }
const rulesInitial: RulesScene = { available: '4', cost: '€25', saved: false }
const rulesPoster: RulesScene = { available: '5', cost: '€50', saved: true }
const cursorRest = { x: 4, y: 100 }

async function resetAfterPayoff<S extends object>(act: Act<S>, initial: S) {
  await act.wait(1800)
  act.mark('loop-reset')
  await act.wait(180)
  await act.snap(initial)
  act.place(cursorRest)
  act.mark('loop-opening')
  await act.wait(180)
}

async function showFilter(act: Act<GuidedReaderFilter>) {
  await act.wait(350)
  await act.enter('reader-filter')
  await act.click('reader-filter')
  await act.set({ open: true })
  act.mark('filter-menu')
  await act.wait(520)
  await act.click('reader-filter-active')
  await act.set(tablePoster)
  act.mark('filtered')
  await act.wait(1800)
  await act.click('reader-filter-all')
  await act.set({ ...tableInitial, open: true })
  await act.click('reader-filter')
  await act.set(tableInitial)
  await act.move(cursorRest)
}

async function showRules(act: Act<RulesScene>) {
  await act.wait(350)
  await act.enter('reader-book-limit')
  await act.click('reader-book-limit')
  await act.set({ available: rulesPoster.available })
  await act.wait(520)
  await act.click('reader-cost-cap')
  await act.set({ cost: rulesPoster.cost })
  await act.wait(520)
  await act.click('reader-save-rules')
  await act.set(rulesPoster)
  act.mark('rules-saved')
  await resetAfterPayoff(act, rulesInitial)
}

async function showPhoto(act: Act<Scene>) {
  await act.wait(400)
  await act.enter('reader-photo-capture')
  await act.click('reader-photo-capture')
  await act.set({ phase: 'crop' })
  act.mark('photo')
  await act.wait(550)

  await act.move('reader-photo-crop')
  const from = act.center('reader-photo-crop')
  const width = act.rect('reader-photo-crop').width * 2
  await act.drag({
    x: from.x + (photoPoster.crop.x - defaultCrop.x) * width,
    y: from.y + (photoPoster.crop.y - defaultCrop.y) * width,
  }, (at, origin) => act.put({ crop: {
    ...defaultCrop, x: defaultCrop.x + (at.x - origin.x) / width, y: defaultCrop.y + (at.y - origin.y) / width,
  } }), { duration: 720 })
  await act.wait(550)
  await act.click('reader-photo-next')
  await act.set({ phase: 'saving', crop: photoPoster.crop })
  await act.move({ x: 400, y: 586 }, { duration: 550 })
  await act.set(photoPoster)
  act.mark('profile')
  await resetAfterPayoff(act, photoInitial)
}

function ReaderScene<S extends object>({ name, title, caption, initial, poster, script, suspended, expanded, onExpand, onClose, width = 390, height, compact, children }: {
  name: string
  title: string
  caption: string
  initial: S
  poster: S
  script: Script<S>
  suspended: boolean
  expanded: boolean
  onExpand: () => void
  onClose: () => void
  width?: number
  height: number
  compact?: { below: number; width: number; height: number }
  children: (state: S, layout: 'wide' | 'compact') => ReactNode
}) {
  return <CaseFeatureCard listItem span={name === 'filter' ? 'full' : 'half'} title={title} description={caption}>
    <CaseDemoMedia title={title} expanded={expanded} onExpand={onExpand} onClose={onClose} className={s.readerSceneFrame}>
      <div data-reader-scene={name}><Stage fill width={width} height={height} compact={compact} initial={initial} poster={poster}
        script={suspended ? undefined : script}
        cursor={{ at: cursorRest, style: 'real', ripple: true }}>
        {(state, _rect, layout) => children(state, layout)}
      </Stage></div>
    </CaseDemoMedia>
  </CaseFeatureCard>
}

export default function ReaderDemoGallery({ suspended }: { suspended: boolean }) {
  const reduced = useReducedMotion()
  const [expanded, setExpanded] = useState<string | null>(null)
  const presentation = (name: string) => ({
    expanded: expanded === name,
    suspended: suspended || expanded !== null && expanded !== name,
    onExpand: () => setExpanded(name),
    onClose: () => setExpanded(null),
  })
  return <CaseFeatureGrid variant="tracks">
    <ReaderScene name="filter" title="Find a reader" caption="Filter the reader list by status or group."
      initial={tableInitial} poster={tablePoster} script={showFilter} {...presentation('filter')}
      width={1120} height={460} compact={{ below: 720, width: 390, height: 460 }}>
      {(state, layout) => <ReadersDemo guidedSelection={false} guidedFilter={state} compact={layout === 'compact'} />}
    </ReaderScene>
    <ReaderScene name="rules" title="Set the rules" caption="Set book limits and a self-service purchase cap."
      initial={rulesInitial} poster={rulesPoster} script={showRules} {...presentation('rules')} height={704}>
      {({ available, cost, saved }) => <div className={s.app} data-theme="light">
        <aside className={s.panel}><div className={s.panelInner}>
          <ReaderTicket reader={{ ...reader, available, cost, books: 3, minutes: 24 }} saved={saved}
            dirty={!saved && (available !== rulesInitial.available || cost !== rulesInitial.cost)}
            onChange={ignore} onSave={ignore} onClose={ignore} />
        </div></aside>
      </div>}
    </ReaderScene>
    <ReaderScene name="photo" title="Add a photo" caption="Take a profile photo now, or prepare an email request."
      initial={photoInitial} poster={photoPoster} script={showPhoto} {...presentation('photo')} height={704}>
        {({ phase, crop }) => <div className={s.app} data-theme="light">
          <aside className={s.panel}><div className={s.panelInner}>
            <ReaderStepFrame stage={phase === 'profile' ? 4 : 3} reduced={reduced}>
              {phase === 'profile'
                ? <ReaderTicket reader={{ ...reader, crop }} dirty={false} saved onChange={ignore} onSave={ignore} onClose={ignore} />
                : <>
                  <div className={s.panelHeading}><h2>New Reader</h2></div>
                  <div className={s.card}>
                    <ReaderPhotoStep src={reader.photoSrc} crop={crop} open={phase !== 'capture'} busy={phase === 'saving'}
                      onCapture={ignore} onChange={ignore} onRemove={ignore} onRequest={ignore} />
                  </div>
                  <div className={s.footer}>
                    {phase === 'saving' && <span className={s.saved} data-saving><LoaderCircle size={14} className={s.spinner} /> Saving…</span>}
                    <button type="button" className={s.primary} data-target="reader-photo-next" disabled={phase !== 'crop'}>
                      Next <ReaderIcon name="next" size={20} />
                    </button>
                  </div>
                </>}
            </ReaderStepFrame>
          </div></aside>
        </div>}
    </ReaderScene>
  </CaseFeatureGrid>
}
