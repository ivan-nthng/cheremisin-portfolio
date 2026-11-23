'use client'

import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react'
import { ChartNoAxesCombined, Download } from 'lucide-react'
import Chart from './Chart'
import ChoiceMenu from './ChoiceMenu'
import ViewComparison from './ViewComparison'
import ReorderTiles, { tileNames, type TileId } from './ReorderTiles'
import { books, count, euro, getRange, income, pages, points, salesPoints, signed, sold, sum, views, type BookId, type Measure, type Metric, type Period } from './sample'
import styles from './author.module.css'

const asset = '/images/litres/author/'
const blue = 'var(--litres-series-blue, #2563eb)'
const orange = 'var(--litres-series-gold, #f5a80f)'
const red = '#ff4242'
const reviews: Measure = stats => stats.reviews
const periods: Period[] = [7, 28, 90]
const periodName = (value: Period) => value === 90 ? 'Last 3 months' : `Last ${value} days`
const periodOptions = periods.map(value => ({ value, label: periodName(value), detail: `${getRange(value).label} 2025` }))
export type Range = ReturnType<typeof getRange>

const pageSnapshot = () => location.hash
function subscribeToView(update: () => void) {
  window.addEventListener('hashchange', update)
  return () => window.removeEventListener('hashchange', update)
}

function Icon({ name, size }: { name: string; size?: number }) {
  return <img src={`${asset}${name}.svg`} width={size} height={size} alt="" draggable={false} data-litres-icon={name} />
}

function Delta({ value, format = count }: { value: number; format?: (value: number) => string }) {
  return <small className={styles.delta} aria-label={`${signed(value, format)} versus the previous period`}>{signed(value, format)}</small>
}

export function Figures({ range, measure, format = count }: { range: Range; measure: Measure; format?: (value: number) => string }) {
  return <span className={styles.figures}>
    <span>{format(measure(range.totals))}</span>
    <Delta value={measure(range.totals) - measure(range.comparison)} format={format} />
  </span>
}

export function PeriodMenu({ period, onChange, overview, preview }: { period: Period; onChange: (value: Period) => void; overview: boolean; preview?: { target: string; open: boolean } }) {
  const variant = overview ? 'overview' : 'sales'
  return <ChoiceMenu label={`Period, ${periodName(period)}`} value={period} options={periodOptions} onChange={onChange} alignEnd={overview} preview={preview}
    trigger={<><span className={styles.periodIcon}><Icon name={`${variant}-period`} /></span><span>Period</span><b>{period === 90 ? '3 months' : `${period} days`}</b><Icon name={`${variant}-down`} /></>} />
}

const salesLinks = { income: '#sales-income', sold: '#sales' }
const summary = [
  { label: 'Revenue, €', measure: income, format: euro, href: salesLinks.income },
  { label: 'Sold', measure: sold, href: salesLinks.sold },
  { label: 'Pages Read', measure: pages, href: '#pages-read' },
  { label: 'Book Card Views', measure: views, href: '#views' },
  { label: 'Reviews', measure: reviews, href: '#reviews' },
]

function Sidebar({ sales }: { sales: boolean }) {
  return <aside className={styles.sidebar}>
    <div>
      <nav className={styles.nav} aria-label="Author workspace">
        <a href="#general" aria-current={sales ? undefined : 'page'}><span className={styles.generalGlyph} aria-hidden="true" /> General</a>
        <a href={salesLinks.sold} aria-current={sales ? 'page' : undefined}><span className={styles.salesGlyph} aria-hidden="true" /> Sales statistics</a>
        {[
          ['books', 'Book management'], ['payments', 'Payments'],
          ['documents', 'Documents and reports'], ['contract', 'Contract'],
        ].map(([icon, label]) => <button key={icon} type="button" disabled title="Unavailable in the sample workspace">
          <Icon name={icon} size={20} />{label}
        </button>)}
      </nav>
      <div className={styles.notice}>
        <p>You have got unsigned documents</p>
        <button type="button" disabled title="Unavailable in the sample workspace">Sign Up</button>
      </div>
    </div>
    <div className={styles.profile}>
      <img className={styles.avatar} src={`${asset}avatar.png`} width={28} height={28} alt="" draggable={false} />
      <span>Alex McBright Jr.</span><Icon name="profile-chevron" size={16} />
    </div>
  </aside>
}

function Trend({ range, label, measure, color = blue, preview }: {
  range: Range
  label: string
  measure: Measure
  color?: string
  preview?: { target: string; active: number | null }
}) {
  return <div className={styles.trend}>
    <div className={styles.metricLine}>
      <span>{label}</span>
      <Figures range={range} measure={measure} />
    </div>
    <Chart key={range.label} label={`${label} trend`} preview={preview} series={[{ label, color }]} data={points(range.current, [{ measure }])} />
  </div>
}

export function TopMetric({ id, range, decorative = false }: { id: TileId; range: Range; decorative?: boolean }) {
  if (id === 'income') return <>
    <a href={salesLinks.income} className={styles.incomeLink}>
      <h2>Total income</h2><Figures range={range} measure={income} format={value => `${euro(value)} €`} />
    </a>
    <Chart key={range.label} label="Total income trend" series={[{ label: 'Total income', color: '#fff' }]}
      data={points(range.current, [{ measure: income }])} format={value => `${euro(value)} €`} />
  </>
  if (id === 'sold') return <>
    <h2><a href={salesLinks.sold}>{tileNames.sold}</a></h2>
    <Figures range={range} measure={sold} />
    <Trend range={range} label="Paid books" measure={stats => stats.paid} />
    <Trend range={range} label="Free books" measure={stats => stats.free} color={orange} />
  </>
  const viewScale = Math.max(1, range.totals.signedIn, range.totals.guest, range.comparison.signedIn, range.comparison.guest)
  return <>
    <h2 id={decorative ? undefined : 'views'} tabIndex={decorative ? undefined : -1}>{tileNames.views}</h2>
    <Figures range={range} measure={views} />
    <ViewComparison label="Authorized users" current={range.totals.signedIn} previous={range.comparison.signedIn} scale={viewScale} />
    <ViewComparison label="Unknown users" current={range.totals.guest} previous={range.comparison.guest} scale={viewScale} />
  </>
}

export function PagesRead({ range, preview, decorative = false }: { range: Range; preview?: { target: string; active: number | null }; decorative?: boolean }) {
  return <article className={styles.tile}>
    <h2 id={decorative ? undefined : 'pages-read'} tabIndex={decorative ? undefined : -1}>Pages Read</h2><Figures range={range} measure={pages} />
    <Trend range={range} label="Paid books" measure={stats => stats.paidPages} preview={preview} />
    <Trend range={range} label="Free books" measure={stats => stats.freePages} color={red} />
    <Trend range={range} label="Free fragments" measure={stats => stats.fragmentPages} />
    <Trend range={range} label="Subscription" measure={stats => stats.subscriptionPages} />
  </article>
}

export function Reviews({ range, decorative = false }: { range: Range; decorative?: boolean }) {
  return <article className={styles.tile}>
    <h2 id={decorative ? undefined : 'reviews'} tabIndex={decorative ? undefined : -1}>Reviews</h2><Figures range={range} measure={reviews} />
    <div className={styles.reviewAuthor}>
      <img className={styles.avatar} src={`${asset}avatar.png`} width={44} height={44} alt="" draggable={false} />
      <span>Alex McBright Jr.</span>
      <Figures range={range} measure={reviews} />
    </div>
    {books.map(book => <div className={styles.metricLine} key={book.id}>
      <span>{book.title}</span>
      <span className={styles.figures}>{count(sum(range.current, [book.id]).reviews)}
        <Delta value={sum(range.current, [book.id]).reviews - sum(range.previous, [book.id]).reviews} />
      </span>
    </div>)}
  </article>
}

function Overview({ range, periodControl, order, onReorder, guidedPoint }: { range: Range; periodControl: ReactNode; order: TileId[]; onReorder: (next: TileId[]) => void; guidedPoint?: number | null }) {
  const Heading = guidedPoint === undefined ? 'h1' : 'h3'

  return <section className={styles.overview} aria-label="Overview">
    <div className={styles.overviewMain}>
      <div className={styles.overviewHeading}>
        <Heading tabIndex={-1}>Important April 2025</Heading>{periodControl}
      </div>
      <ReorderTiles order={order} onReorder={onReorder} renderTile={id => <TopMetric id={id} range={range} />} />
      <div className={styles.bottomTiles}>
        <Reviews range={range} />
        <PagesRead range={range} preview={guidedPoint === undefined ? undefined : { target: 'guided-pages', active: guidedPoint }} />
      </div>
    </div>
    <aside className={`${styles.tile} ${styles.popular}`} aria-label="Popular books">
      <h2>Popular books</h2>
      {books.map((book, index) => {
        const measure: Measure = stats => stats.paid
        const bookIds = [book.id]
        const current = sum(range.current, bookIds).paid
        return <article key={book.id}>
          <div className={styles.book}>
            <img src={`${asset}${book.id}-small.webp`} width={36} height={48} alt="" draggable={false} />
            <div><h3>{book.title}</h3><div className={styles.purchase}><span><b>{count(current)}</b> purchases</span>
              <Delta value={current - sum(range.previous, bookIds).paid} /></div>
            </div>
          </div>
          <Chart key={range.label} label={`${book.title} purchases trend`}
            series={[{ label: 'Purchases', color: index === 2 ? red : blue }]}
            data={points(range.current, [{ bookIds, measure }])} />
        </article>
      })}
    </aside>
  </section>
}

const columns = [
  { key: 'book', label: 'Book' }, { key: 'sold', label: 'Sold, Q' },
  { key: 'salesRoyalty', label: 'Sales royalty, €' }, { key: 'views', label: 'Views' },
  { key: 'viewsRoyalty', label: 'Views royalty, €' }, { key: 'total', label: 'Total, €' },
] as const
type Column = typeof columns[number]['key']
const bookFilters = [{ value: 'all' as const, label: 'All books' }, ...books.map(book => ({ value: book.id, label: book.title }))]

export function FilterMenu({ filter, onChange, preview }: { filter: BookId | 'all'; onChange: (value: BookId | 'all') => void; preview?: { target: string; open: boolean } }) {
  const filterTitle = books.find(book => book.id === filter)?.title
  return <ChoiceMenu label={filterTitle ? `Filter, ${filterTitle}` : 'Add Filter'} value={filter} options={bookFilters} onChange={onChange}
    preview={preview} trigger={<><Icon name="filter" size={20} /><span>{filterTitle ?? 'Add Filter'}</span></>} />
}

export function SalesPlot({ range, metric, bookIds, preview, hideMetricLabel = false }: {
  range: Range; metric: Metric; bookIds: BookId[]; preview?: { target: string; active: number | null }; hideMetricLabel?: boolean
}) {
  const visible = books.filter(book => bookIds.includes(book.id))
  const series = visible.map(book => ({
    label: book.title,
    color: `var(--litres-series-${book.id}, ${book.color})`,
  }))
  const metricLabel = metric === 'sold' ? 'Books sold' : 'Total income'
  const format = metric === 'sold' ? count : (cents: number) => `€${euro(cents)}`
  return <div className={styles.salesGraph}>
    {!hideMetricLabel && <p>{metricLabel}</p>}
    {visible.length > 0 && <ul className={styles.seriesKey} aria-label="Books in the chart">
      {series.map(item => <li key={item.label}><i style={{ background: item.color }} aria-hidden="true" /><span>{item.label}</span></li>)}
    </ul>}
    {visible.length
      ? <Chart key={`${range.label}-${metric}-${bookIds.join(',')}`} label={`${metricLabel} by book`} variant="sales" area format={format} preview={preview}
        series={series}
        data={salesPoints(range.current, visible.map(book => ({ bookIds: [book.id], measure: metric === 'sold' ? sold : income })))} />
      : <p className={styles.empty}>No books match your search and filter.</p>}
  </div>
}

function visibleBooks(query: string, filter: BookId | 'all') {
  const search = query.trim().toLowerCase()
  return books.filter(book => (filter === 'all' || book.id === filter) && book.title.toLowerCase().includes(search))
}

function csvCell(value: string | number) {
  const text = String(value)
  const safe = typeof value === 'string' && (/^\s*[=+@-]/.test(text) || /^[\t\r\n]/.test(text)) ? "'" + text : text
  return `"${safe.replaceAll('"', '""')}"`
}

function Sales({ range, metric, periodControl, selectionActions }: {
  range: Range; metric: Metric; periodControl: ReactNode; selectionActions: boolean
}) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<BookId | 'all'>('all')
  const [sort, setSort] = useState<{ key: Column; ascending: boolean } | null>(null)
  const [selected, setSelected] = useState<BookId[]>([])
  const [comparing, setComparing] = useState(false)
  const selectAll = useRef<HTMLInputElement>(null)
  const compareAction = useRef<HTMLButtonElement>(null)
  const visible = visibleBooks(query, filter)
  const visibleIds = visible.map(book => book.id)
  const selectedVisible = visibleIds.filter(id => selected.includes(id))
  const selectedCount = selectedVisible.length
  const compareActive = comparing && selectedCount >= 2

  function updateSelection(next: BookId[], ids = visibleIds) {
    setSelected(next)
    if (next.filter(id => ids.includes(id)).length < 2) setComparing(false)
  }

  function changeScope(nextQuery: string, nextFilter: BookId | 'all') {
    setQuery(nextQuery)
    setFilter(nextFilter)
    if (!selectionActions) return
    const ids = visibleBooks(nextQuery, nextFilter).map(book => book.id)
    updateSelection(selected.filter(id => ids.includes(id)), ids)
  }
  const allSelected = visible.length > 0 && selectedCount === visible.length
  useEffect(() => {
    if (selectAll.current) selectAll.current.indeterminate = selectedCount > 0 && !allSelected
  }, [selectedCount, allSelected])

  const rows = visible.map(book => {
    const totals = sum(range.current, [book.id])
    return { id: book.id, book: book.title, sold: sold(totals), salesRoyalty: totals.salesRoyalty,
      views: views(totals), viewsRoyalty: totals.viewsRoyalty, total: income(totals) }
  })
  if (sort) rows.sort((a, b) => {
    const av = a[sort.key], bv = b[sort.key]
    const difference = typeof av === 'number' && typeof bv === 'number' ? av - bv : String(av).localeCompare(String(bv), 'en')
    return sort.ascending ? difference : -difference
  })
  function exportSelected() {
    const selectedRows = rows.filter(row => selectedVisible.includes(row.id))
    if (!selectedRows.length) return
    const csv = [
      columns.map(column => csvCell(column.label)).join(','),
      ...selectedRows.map(row => columns.map(({ key }) => {
        const value = row[key]
        // Currency columns are stored as cents. Keep numeric CSV cells locale-independent.
        return csvCell(typeof value === 'number' && key !== 'sold' && key !== 'views'
          ? value / 100 : value)
      }).join(',')),
    ].join('\r\n')
    const url = URL.createObjectURL(new Blob(['\uFEFF', csv], { type: 'text/csv;charset=utf-8' }))
    const download = document.createElement('a')
    download.href = url
    download.download = 'litres-sales.csv'
    document.body.append(download)
    download.click()
    download.remove()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  const totals = sum(range.current, visibleIds)
  return <section className={styles.sales} aria-label="Sales Statistics">
    <div className={styles.crumbs}>
      <a href="#general" aria-label="Back to General"><Icon name="back" size={16} /></a>
      <a href="#general"><Icon name="breadcrumb-home" size={16} /> General</a>
      <span>/</span><span>Sales Statistics</span>
    </div>
    <h1 tabIndex={-1}>Sales statistics</h1>
    <div className={styles.salesTools}>
      {periodControl}
      <FilterMenu filter={filter} onChange={value => changeScope(query, value)} />
      <label className={styles.search}><Icon name="search" size={20} />
        <input type="search" aria-label="Search book titles" placeholder="Search" value={query} onChange={event => changeScope(event.target.value, filter)} />
      </label>
    </div>
    {compareActive && <div className={styles.selection}>
      <span>Comparing {selectedCount} books</span>
      <button type="button" onClick={() => { setComparing(false); compareAction.current?.focus() }}>Show all visible books</button>
    </div>}
    <SalesPlot range={range} metric={metric} bookIds={compareActive ? selectedVisible : visibleIds} />
    {!selectionActions && selectedCount > 0 && <div className={styles.selection} role="status">{selectedCount} selected
      <button type="button" onClick={() => { setSelected([]); selectAll.current?.focus() }}>Clear selection</button>
    </div>}
    {selectionActions && <span className="sr-only" role="status">{selectedCount} selected</span>}
    <div className={styles.tableScroll} role="region" aria-label="Sales table scroll area" tabIndex={0}>
      {selectionActions && selectedCount > 0 && <div className={styles.selectionOverlay}>
          <div className={styles.selectionBar}>
            <span aria-hidden="true">{selectedCount} selected</span>
            <div className={styles.selectionActions}>
              <button type="button" onClick={exportSelected}><Download size={16} aria-hidden="true" />Export as CSV</button>
              <button ref={compareAction} type="button" disabled={selectedCount < 2} aria-pressed={compareActive}
                onClick={() => setComparing(!comparing)}><ChartNoAxesCombined size={16} aria-hidden="true" />Compare</button>
            </div>
          </div>
      </div>}
      <table aria-label="Sales by book">
        <thead><tr>
          <th scope="col"><input type="checkbox" ref={selectAll} aria-label="Select all visible books" disabled={!rows.length}
            checked={allSelected} onChange={event => updateSelection(event.target.checked
              ? [...new Set([...selected, ...visibleIds])] : selected.filter(id => !visibleIds.includes(id)))} /></th>
          {columns.map(column => <th key={column.key} scope="col"
            aria-sort={sort?.key === column.key ? sort.ascending ? 'ascending' : 'descending' : undefined}>
            <button type="button" onClick={() => setSort({ key: column.key, ascending: sort?.key === column.key ? !sort.ascending : column.key === 'book' })}>
              {column.label}<Icon name="sort" size={16} />
            </button>
          </th>)}
          <th scope="col" aria-label="Book actions" />
        </tr></thead>
        <tbody>{rows.map(row => <tr key={row.id} data-selected={selected.includes(row.id)}>
          <td><input type="checkbox" aria-label={`Select ${row.book}`} checked={selected.includes(row.id)}
            onChange={event => updateSelection(event.target.checked ? [...selected, row.id] : selected.filter(id => id !== row.id))} /></td>
          <th scope="row">{row.book}</th>
          <td>{count(row.sold)}</td><td>{euro(row.salesRoyalty)}</td><td>{count(row.views)}</td>
          <td>{euro(row.viewsRoyalty)}</td><td>{euro(row.total)}</td>
          <td><button type="button" disabled aria-label={`Account actions unavailable for ${row.book}`}><Icon name="more" size={16} /></button></td>
        </tr>)}
        {!rows.length && <tr><td colSpan={8} className={styles.empty}>No matching titles</td></tr>}
        </tbody>
        <tfoot><tr><td /><th scope="row">Total</th><td>{count(sold(totals))}</td><td>{euro(totals.salesRoyalty)}</td>
          <td>{count(views(totals))}</td><td>{euro(totals.viewsRoyalty)}</td><td>{euro(income(totals))}</td><td /></tr></tfoot>
      </table>
    </div>
  </section>
}

export type AuthorGuidedState = { period: Period; periodOpen: boolean; point: number | null }

export default function LitresAuthor({ theme, selectionActions = false, hosted = false, guided }: { theme?: 'light' | 'dark'; selectionActions?: boolean; hosted?: boolean; guided?: AuthorGuidedState }) {
  const routeHash = useSyncExternalStore(subscribeToView, pageSnapshot, () => '')
  const [hostedHash, setHostedHash] = useState('')
  const presenting = guided !== undefined
  const hash = presenting ? '' : hosted ? hostedHash : routeHash
  const root = useRef<HTMLElement>(null)
  const previousHash = useRef(hash)
  const [order, setOrder] = useState<TileId[]>(['income', 'sold', 'views'])
  const [period, setPeriod] = useState<Period>(28)
  const activePeriod = guided?.period ?? period
  const scriptedPeriod = guided?.period
  useLayoutEffect(() => {
    if (scriptedPeriod !== undefined) setPeriod(scriptedPeriod)
  }, [scriptedPeriod])
  useLayoutEffect(() => {
    if (presenting) {
      setHostedHash('')
      setOrder(['income', 'sold', 'views'])
    }
  }, [presenting])
  const range = getRange(activePeriod)
  const sales = hash === salesLinks.income || hash === salesLinks.sold
  const metric: Metric = hash === salesLinks.income ? 'income' : 'sold'

  useEffect(() => {
    if (previousHash.current === hash) return
    previousHash.current = hash
    if (presenting) return
    const section = root.current?.querySelector<HTMLElement>(hash ? `[id='${CSS.escape(hash.slice(1))}']` : 'h1')
    if (section?.matches('h2') && root.current?.contains(section)) {
      section.focus({ preventScroll: true })
      section.scrollIntoView({ block: 'start', behavior: 'instant' })
      return
    }
    root.current?.querySelector('h1')?.focus({ preventScroll: true })
    if (hosted) root.current?.closest('[data-hosted] > div')?.scrollTo({ top: 0, behavior: 'instant' })
    else window.scrollTo({ top: 0, behavior: 'instant' })
  }, [hash, hosted, presenting])
  const periodControl = <PeriodMenu period={activePeriod} onChange={setPeriod} overview={!sales}
    preview={guided && { target: 'guided-period', open: guided.periodOpen }} />
  const Root = hosted ? 'div' : 'main'
  return <Root role={hosted && !presenting ? 'main' : undefined} id={hosted ? undefined : 'main-content'} ref={node => { root.current = node }} onClickCapture={event => {
    if (!hosted || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !(event.target instanceof Element)) return
    const href = event.target.closest('a[href^="#"]')?.getAttribute('href')
    if (href) { event.preventDefault(); setHostedHash(href) }
  }} className={styles.app} data-litres-author="" data-author-guided={guided ? true : undefined} data-theme={theme}>
    <header className={styles.topBar}>
      <img src={`${asset}${theme === 'dark' ? 'brand-dark.svg' : 'brand.svg'}`} width={124} height={20} alt="LitRes" draggable={false} />
      <nav className={styles.summary} aria-label="Dashboard metrics">{summary.map(({ label, measure, format, href }) => <a href={href} key={label}>
        <span>{label}</span><Figures range={range} measure={measure} format={format} />
      </a>)}</nav>
    </header>
    <div className={styles.frame}>
      <Sidebar sales={sales} />
      {sales ? <Sales range={range} metric={metric} periodControl={periodControl} selectionActions={selectionActions} />
        : <Overview range={range} periodControl={periodControl} order={order} onReorder={setOrder} guidedPoint={guided?.point} />}
    </div>
    <footer className={styles.sample}><span>Fictional sample data</span>{!hosted && <> · <a href="/preview/litres-author/scenes">Watch three mini demos ↗</a></>}</footer>
  </Root>
}
