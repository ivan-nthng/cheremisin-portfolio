'use client'

import { useEffect, useState } from 'react'
import { Check, ChevronDown, Copy, Mail, MoreHorizontal, Plus, Share2, Star, ThumbsUp, TrendingUp } from 'lucide-react'
import readers from './readers.module.css'
import s from './library-components.module.css'
import { LibraryMetricChart, type MetricPoint } from './LibraryMetricChart'

const author = 'Madeline Cash'
const libraryValues = [1398.2, 1405.4, 1402.7, 1418.1, 1414.6, 1432.58, 1445.45]
const monthValues = [28, 30, 22, 8, 18, 16, 40]
const initialDayLabels = ['6 days ago', '5 days ago', '4 days ago', '3 days ago', '2 days ago', 'Yesterday', 'Today']
const initialMonthLabels = ['6 mo ago', '5 mo ago', '4 mo ago', '3 mo ago', '2 mo ago', 'Last month', 'This month']
const avatarPaths = [
  '/images/litres/library-components/louise.webp',
  '/images/litres/readers/reader.webp',
  '/images/litres/author/avatar.png',
  '/images/litres/author/floripa-small.webp',
]

export function relativeLabels(now: Date, count: number, unit: 'day' | 'month') {
  return Array.from({ length: count }, (_, index) => {
    if (unit === 'day') {
      const date = new Date(now)
      date.setDate(date.getDate() - (count - index - 1))
      return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date)
    }
    const date = new Date(now.getFullYear(), now.getMonth() - (count - index - 1), 1)
    return new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date)
  })
}

function Stars({ filled = 3, small = false }: { filled?: number; small?: boolean }) {
  return <span className={`${s.stars} ${small ? s.smallStars : ''}`} aria-label={`${filled} out of 5 stars`}>
    {Array.from({ length: 5 }, (_, index) => <Star key={index} aria-hidden="true" fill="currentColor" data-filled={index < filled} />)}
  </span>
}

export function ReaderProfileFragment() {
  return <div className={s.profile} data-node-id="9229:25523">
    <div className={s.profileTop}>
      <img className={s.avatar} src={avatarPaths[2]} alt="" />
      <div className={s.identity}><h3>Avery Bennett</h3><p>avery.bennett@example.com</p></div>
      <div className={s.statusBlock}><span className={s.active}><Check size={12} strokeWidth={3} />Active</span><small>Last Visit: 25m ago</small></div>
      <MoreHorizontal className={s.more} aria-hidden="true" size={18} />
    </div>
    <div className={s.profileFields}>
      <div><span className={s.fieldLabel}>ID</span><span className={s.fieldValue}>194005344 <Copy size={14} aria-hidden="true" /></span></div>
      <div><span className={s.fieldLabel}>CLIENT TYPE</span><span className={s.fieldValue}>Selfservice <ChevronDown size={14} aria-hidden="true" /></span></div>
    </div>
  </div>
}

export function ContributorFragment() {
  return <div className={s.contributor} data-node-id="9236:28999">
    <img className={s.avatar} src={avatarPaths[0]} alt="" />
    <div className={s.identity}>
      <h3>Louise Fishborn</h3>
      <p>louise.fishborn@example.com</p>
      <span className={s.contributorBadge}><Star size={14} fill="currentColor" aria-hidden="true" />Contributor</span>
    </div>
  </div>
}

export function ReaderReviewFragment() {
  return <div className={s.review} data-node-id="9224:6320">
    <div className={s.reviewContent}>
      <img className={s.avatar} src={avatarPaths[0]} alt="" />
      <div className={s.reviewBody}>
        <strong>Jordan Ellis</strong>
        <Stars />
        <p>“The availability note made it easy to know when to check back. I found the book I wanted and borrowed it in just a few minutes.”</p>
      </div>
      <ThumbsUp className={s.like} aria-hidden="true" size={16} />
    </div>
  </div>
}

export function ComposeFragment() {
  return <div className={s.compose} data-node-id="9230:25699">
    <div><h3>Are You Ready?</h3><p>Show me what you’ve got?</p></div>
    <div className={s.composeAction}><span>Forgot Number?</span><span className={s.composeButton}><Mail size={17} />Compose</span></div>
  </div>
}

export function LostLambsReviewFragment() {
  return <div className={s.bookReview} data-node-id="9224:25362">
    <img className={s.largeBook} src="/images/litres/library-components/lost-lambs.webp" alt="Lost Lambs by Madeline Cash book cover" />
    <div className={s.bookCopy}>
      <strong>Lost Lambs</strong><span>{author}</span>
      <div className={s.rating}><small>1 248</small><Stars small filled={4} /></div>
      <p>A quick-witted family novel that moves between the Flynns and the people around them, balancing humor with unexpected tenderness.</p>
      <span className={s.comment}>Comment</span>
    </div>
  </div>
}

export function ReviewerStripFragment() {
  return <div className={s.reviewers} data-node-id="9227:25475">
    <span className={s.reviewButton}><Plus size={18} />Review</span>
    <div className={s.avatarStack} aria-label="16 reviewers">
      {avatarPaths.map((src, index) => <img key={src} src={src} alt="" style={{ zIndex: 4 - index }} />)}
      <span>+12</span>
    </div>
  </div>
}

export function NyplChartFragment({ dayLabels, todayLabel }: { dayLabels: readonly string[]; todayLabel: string }) {
  const points = libraryValues.map((value, index) => ({ label: dayLabels[index] ?? initialDayLabels[index], value }))
  const previous = libraryValues.at(-2) ?? libraryValues[0]
  const current = libraryValues.at(-1) ?? previous
  const change = current - previous
  const currency = new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  const number = new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  const percent = new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format((change / previous) * 100)

  return <div className={`${s.metricCard} ${s.nyplCard}`} data-node-id="9230:25583">
    <header className={s.metricHeader}>
      <div className={s.org}><img src="/images/litres/library-components/nypl.webp" alt="" /><span>New York Public Library</span></div>
      <div className={s.metricIcons}><MoreHorizontal size={18} aria-hidden="true" /><Share2 size={16} aria-hidden="true" /></div>
    </header>
    <div className={s.summary}>
      <strong><small>€</small>{number.format(current)}</strong>
      <span><TrendingUp size={14} fill="currentColor" /> €{currency.format(change)} ({percent}%) <time>{todayLabel}</time></span>
    </div>
    <LibraryMetricChart label="New York Public Library illustrative daily total" points={points} range={[1380, 1460]} variant="dots" extendLast />
    <div className={s.period} aria-label="Displayed period"><span>Week</span><span aria-current="true">Month</span></div>
  </div>
}

export function LostLambsChartFragment({ monthLabels, comparison = false }: { monthLabels: readonly string[]; comparison?: boolean }) {
  const points: MetricPoint[] = monthValues.map((value, index) => ({ label: monthLabels[index] ?? initialMonthLabels[index], value }))
  return <div className={`${s.metricCard} ${s.lostChart}`} data-node-id="9233:28234">
    <header className={s.lostHeader}>
      <img src="/images/litres/library-components/lost-lambs.webp" alt="" />
      <div><strong>Lost Lambs</strong><span>{author}</span></div>
      {comparison && <div className={s.chartComparison} aria-label="Displayed series"><span>Old</span><span aria-current="true">New</span></div>}
    </header>
    <LibraryMetricChart label="Lost Lambs illustrative sales by month" points={points} range={[0, 40]} variant="grid" ticks={[40, 30, 20, 10, 0]} axisLabels={monthLabels} format={String} />
  </div>
}

export default function LibraryComponentsPreview() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [dayLabels, setDayLabels] = useState(initialDayLabels)
  const [monthLabels, setMonthLabels] = useState(initialMonthLabels)
  const [todayLabel, setTodayLabel] = useState('Today')

  useEffect(() => {
    const now = new Date()
    setDayLabels(relativeLabels(now, 7, 'day'))
    setMonthLabels(relativeLabels(now, 7, 'month'))
    setTodayLabel(new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }).format(now))
  }, [])

  const fragments = [
    { name: 'Reader profile', className: s.span4, content: <ReaderProfileFragment /> },
    { name: 'Reader review', className: s.span4, content: <ReaderReviewFragment /> },
    { name: 'Compose card', className: s.span4, content: <ComposeFragment /> },
    { name: 'Book review', className: `${s.span6} ${s.tabletWide}`, content: <LostLambsReviewFragment /> },
    { name: 'Reviewer strip', className: s.span6, content: <ReviewerStripFragment /> },
    { name: 'NYPL dotted chart', className: s.span4, content: <NyplChartFragment dayLabels={dayLabels} todayLabel={todayLabel} /> },
    { name: 'Lost Lambs chart', className: s.span8, content: <LostLambsChartFragment monthLabels={monthLabels} /> },
  ]
  return <main className={`${readers.theme} ${s.page}`} data-theme={theme}>
    <div className={s.heading}>
      <div><p className={s.eyebrow}>LITRES LIBRARIES · LOCAL REVIEW</p><h1>Library interface fragments</h1><p className={s.intro}>Seven reusable views from the Readers workspace. Charts use illustrative sample data.</p></div>
      <div className={s.themePicker} aria-label="Preview theme">
        <button type="button" aria-pressed={theme === 'light'} onClick={() => setTheme('light')}>Light</button>
        <button type="button" aria-pressed={theme === 'dark'} onClick={() => setTheme('dark')}>Dark</button>
      </div>
    </div>
    <section className={s.grid} aria-label="LitRes Libraries interface fragments">
      {fragments.map(({ name, className, content }) => <article className={`${s.fragment} ${className}`} key={name}>
        <h2>{name}</h2>{content}
      </article>)}
    </section>
    <p className={s.disclaimer}>Sample interface data · No reader, library account or transaction is connected.</p>
  </main>
}
