'use client'

import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { Stage } from '@/components/citymobil-features/stageshow/stage'
import { createPlaybackClock, type Act } from '@/components/citymobil-features/stageshow/act'
import CaseFragmentViewer from '@/components/citymobil-case/CaseFragmentViewer'
import { useCaseDemo } from '@/components/portfolio/case-story/CaseDemoOverlay'
import { CaseExpandTrigger } from '@/components/portfolio/case-story/CaseExpandTrigger'
import { CaseDetails, CaseFeatureCard, CaseFeatureGrid } from '@/components/portfolio/case-story/CaseDetails'
import { CaseDemoMedia } from '@/components/portfolio/case-story/CaseDemoMedia'
import { FilterMenu, PagesRead, PeriodMenu, SalesPlot, TopMetric } from './LitresAuthor'
import ReorderTiles, { moveTile, type TileHandle, type TileId, type TileLift } from './ReorderTiles'
import { allBooks, getRange, type BookId, type Period } from './sample'
import styles from './author.module.css'
import editorial from '@/components/portfolio/case-story/case-editorial.module.css'
import layout from '@/components/portfolio/case-story/case-draft.module.css'
import { RepeatReveal } from '@/components/portfolio/RepeatReveal'

const openingRange = getRange(28)
const longRange = getRange(90)
const ignore = () => {}
const cursorHome = { x: 20, y: 16 }

type ReorderState = { order: TileId[]; handle: TileHandle | null; lift: TileLift | null }
const reorderStart: ReorderState = { order: ['sold', 'views'], handle: null, lift: null }

async function reorder(a: Act<ReorderState>) {
  let order = reorderStart.order
  const partner = 'views'
  await a.enter({ x: 24, y: 20 })
  for (let pass = 0; pass < 2; pass++) {
    const tile = a.rect('tile-sold')
    const corner = pass === 0 ? 'top-left' : 'bottom-right'
    await a.move(pass === 0 ? { x: tile.x + 14, y: tile.y + 14 } : { x: tile.x + tile.width - 14, y: tile.y + tile.height - 14 })
    await a.set({ handle: { id: 'sold', corner } })
    a.mark('handle')
    await a.move('handle-sold')
    await a.cursor('open')
    await a.wait(370)
    const from = a.rect('tile-sold')
    const to = a.rect(`tile-${partner}`)
    const grip = a.center('handle-sold')
    a.mark('lift')
    await a.drag({ x: grip.x + to.x - from.x, y: grip.y + to.y - from.y }, (at, start) => {
      a.put({ lift: { id: 'sold', x: at.x - start.x, y: at.y - start.y } })
    }, {
      duration: 720,
      path: (progress, start, end) => ({ x: start.x, y: start.y + (end.y - start.y) * progress }),
    })
    order = moveTile(order, 'sold', partner)
    await a.set({ order, handle: { id: 'sold', corner, hidden: true }, lift: null })
    a.mark(order[0] === partner ? 'swapped' : 'restored')
    await a.cursor('pointer')
    await a.wait(1500)
  }
  await a.set(reorderStart)
  await a.move(cursorHome)
}

type HoverState = { active: number | null }
const hoverStart: HoverState = { active: null }
async function inspectPoints(a: Act<HoverState>, target: string, stops: number[]) {
  await a.enter(`${target}-${stops[0]}`)
  for (const active of stops) {
    await a.move(`${target}-${active}`)
    await a.set({ active })
    a.mark(`${target}-point-${active}`)
    await a.wait(1450)
  }
  await a.move(cursorHome)
  await a.set(hoverStart)
  await a.wait(1100)
}

const inspectPages = (a: Act<HoverState>) => inspectPoints(a, 'pages', [2, 4, 5])
type SalesState = { period: Period; filter: BookId | 'all'; menu: 'period' | 'filter' | null; active: number | null }
const salesStart: SalesState = { period: 28, filter: 'all', menu: null, active: null }

async function inspectSales(a: Act<SalesState>) {
  await a.enter('period')
  await a.click('period')
  await a.set({ menu: 'period' })
  a.mark('period-menu')
  await a.wait(480)
  await a.click('period-90')
  await a.set({ period: 90, menu: null })
  a.mark('three-months')
  await a.wait(780)
  await a.move('sales-7')
  await a.set({ active: 7 })
  a.mark('sales-point')
  await a.wait(1600)
  await a.move('filter')
  await a.set({ active: null })
  await a.click('filter')
  await a.set({ menu: 'filter' })
  a.mark('filter-menu')
  await a.wait(480)
  await a.click('filter-floripa')
  await a.set({ filter: 'floripa', menu: null })
  a.mark('filtered')
  await a.move('sales-9')
  await a.set({ active: 9 })
  await a.wait(1800)
  await a.move('filter')
  await a.set({ active: null })
  await a.click('filter')
  await a.set({ menu: 'filter' })
  await a.click('filter-all')
  await a.set({ filter: 'all', menu: null })
  await a.click('period')
  await a.set({ menu: 'period' })
  await a.click('period-28')
  await a.set(salesStart)
  a.mark('sales-restored')
  await a.move(cursorHome)
  await a.wait(850)
}

const cursor = { at: cursorHome, style: 'real' as const, idle: false as const }

function SalesStage({ width: salesWidth, inCase, wideHeight = 392, clock }: {
  width: number; inCase: boolean; wideHeight?: number; clock?: ReturnType<typeof createPlaybackClock>
}) {
  // The book legend wraps on the narrowest case spans, pushing the tooltip down.
  const compactHeight = inCase && salesWidth < 320 ? 500 : 470
  return salesWidth ? <Stage width={salesWidth} height={wideHeight} compact={{ below: 600, width: salesWidth, height: compactHeight }} cursor={cursor}
      initial={salesStart} poster={{ ...salesStart, active: 13 }} script={inspectSales} playbackClock={clock}>
      {state => {
        const range = state.period === 90 ? longRange : openingRange
        return <div className={`${styles.sceneSurface} ${styles.salesScene} ${inCase ? styles.app : ''}`} inert>
          {!inCase && <h3>Sales statistics</h3>}
          <div className={styles.salesTools}>
            <PeriodMenu overview={false} period={state.period} onChange={ignore} preview={{ target: 'period', open: state.menu === 'period' }} />
            <FilterMenu filter={state.filter} onChange={ignore} preview={{ target: 'filter', open: state.menu === 'filter' }} />
          </div>
          <p className={styles.sceneRange}>{!inCase && `${range.label} 2025 · `}Fictional sample</p>
          <SalesPlot hideMetricLabel={inCase} range={range} metric="sold" bookIds={state.filter === 'all' ? allBooks : [state.filter]}
            preview={{ target: 'sales', active: state.active }} />
        </div>
      }}
    </Stage> : <div className={styles.salesPlaceholder} aria-hidden="true" />
}

export default function LitresScenes({ inCase = false }: { inCase?: boolean }) {
  const { active } = useCaseDemo()
  const [clock] = useState(createPlaybackClock)
  const [paused, setPaused] = useState(false)
  const [expanded, setExpanded] = useState<'reorder' | 'pages' | 'sales' | null>(null)
  const firstCard = useRef<HTMLDivElement>(null)
  const [cardWidth, setCardWidth] = useState(0)
  const salesCard = useRef<HTMLDivElement>(null)
  const [salesWidth, setSalesWidth] = useState(0)

  useLayoutEffect(() => {
    const card = salesCard.current!
    const measure = () => {
      setSalesWidth(inCase ? card.clientWidth : Math.max(320, Math.min(960, card.clientWidth)))
      if (inCase) setCardWidth(firstCard.current!.clientWidth)
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(card)
    if (inCase) observer.observe(firstCard.current!)
    return () => observer.disconnect()
  }, [inCase])

  useLayoutEffect(() => {
    const sync = () => clock.setPaused(paused || active || inCase && document.hidden)
    sync()
    if (!inCase) return
    document.addEventListener('visibilitychange', sync)
    return () => document.removeEventListener('visibilitychange', sync)
  }, [clock, paused, active, inCase])

  function toggle() { setPaused(value => !value) }

  const firstWidth = inCase ? cardWidth : 460
  const firstHeight = inCase ? 380 : 396
  const firstCompact = inCase ? undefined : { below: 460, width: 328, height: 396 }

  const reorderScene = <div ref={firstCard} className={inCase ? styles.caseStage : undefined}>
    {firstWidth > 0 && <Stage width={firstWidth} height={firstHeight} compact={firstCompact} cursor={cursor}
      initial={reorderStart} poster={reorderStart}
      script={reorder} playbackClock={clock}>
      {state => <div className={`${styles.sceneSurface} ${styles.reorderScene} ${inCase ? styles.app : ''}`} inert>
        <ReorderTiles order={state.order} preview={state} renderTile={id => <TopMetric id={id} range={openingRange} />} />
      </div>}
    </Stage>}
  </div>
  const pagesScene = <>
    {inCase && !firstWidth && <div className={styles.caseStage} aria-hidden="true" />}
    {firstWidth > 0 && <Stage width={firstWidth} height={firstHeight} compact={firstCompact} cursor={cursor}
      initial={hoverStart} poster={{ active: 4 }} script={inspectPages} playbackClock={clock}>
      {state => <div className={`${styles.sceneSurface} ${styles.pagesScene} ${inCase ? styles.app : ''}`} inert>
        <PagesRead range={openingRange} preview={{ target: 'pages', active: state.active }} decorative />
      </div>}
    </Stage>}
  </>
  const salesScene = <div ref={salesCard} className={inCase ? styles.caseStage : undefined}>
    <SalesStage width={salesWidth} inCase={inCase} clock={clock} />
  </div>

  function fragment(id: 'reorder' | 'pages' | 'sales', title: string, scene: ReactNode) {
    const open = expanded === id
    return <CaseFragmentViewer authored title={title} expanded={open} onExpand={() => setExpanded(id)} onClose={() => setExpanded(null)}>
      {expand => <div className={styles.caseMedia} data-native-feature>
        {scene}
        <CaseExpandTrigger title={title} hidden={open} touchHint onExpand={expand} />
      </div>}
    </CaseFragmentViewer>
  }

  function feature(id: 'reorder' | 'pages' | 'sales', eyebrow: string, title: string, description: string, scene: ReactNode) {
    return <CaseFeatureCard listItem span={id === 'sales' ? 'full' : 'half'} id={`${id}-title`}
      eyebrow={eyebrow} title={title} description={description}>
      <CaseDemoMedia title={title} className={styles.caseMedia} expanded={expanded === id}
        onExpand={() => setExpanded(id)} onClose={() => setExpanded(null)}>
        {scene}
      </CaseDemoMedia>
    </CaseFeatureCard>
  }

  if (inCase) return <CaseDetails id="details" className={layout.trackSection} data-litres-case-scenes aria-labelledby="publishing-demos-title">
    <RepeatReveal className={editorial.detailsIntro}><h2 id="publishing-demos-title" className={editorial.sectionTitle}>Interactive demos</h2></RepeatReveal>
    <CaseFeatureGrid variant="tracks">
      {feature('reorder', 'Overview', 'Reorder your overview', 'Drag Books Sold or Views by the corner handle.', reorderScene)}
      {feature('pages', 'Overview', 'Inspect Pages Read', 'Hover over the chart to see the date and number of pages read.', <div className={styles.caseStage}>{pagesScene}</div>)}
      {feature('sales', 'Sales', 'Explore Sales Statistics', 'Switch periods, inspect sales and filter by book.', salesScene)}
    </CaseFeatureGrid>
  </CaseDetails>

  return <main id="main-content" className={`${styles.app} ${styles.scenes}`}>
    <header className={styles.sceneHeader}>
      <div><a href="/preview/litres-author">‹ Author workspace</a><h1>LitRes mini demos</h1><p>Fictional sample data</p></div>
      <button type="button" className={styles.control} onClick={toggle} aria-pressed={paused}>Pause animations</button>
    </header>
    <div className={styles.sceneGrid}>
      <section className={styles.sceneCard} aria-labelledby="reorder-title">
        <h2 id="reorder-title">Reorder the overview</h2><p>Grab a corner handle and move Books Sold above or below Views.</p>{fragment('reorder', 'Reorder the overview', reorderScene)}
      </section>
      <section className={styles.sceneCard} aria-labelledby="pages-title">
        <h2 id="pages-title">Inspect Pages Read</h2><p>Move along the graph to see the period and value at each point.</p>{fragment('pages', 'Inspect Pages Read', pagesScene)}
      </section>
      <section className={`${styles.sceneCard} ${styles.wideScene}`} aria-labelledby="sales-title">
        <h2 id="sales-title">Explore Sales Statistics</h2><p>Change the period, inspect a point and filter by book.</p>{fragment('sales', 'Explore Sales Statistics', salesScene)}
      </section>
    </div>
  </main>
}
