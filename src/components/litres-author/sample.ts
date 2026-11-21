export const books = [
  { id: 'floripa', title: 'Nights in Floripa', color: '#2563eb', royalty: 699 },
  { id: 'something', title: 'Something can be not so good as it seems to be', color: '#f5a80f', royalty: 449 },
  { id: 'booker', title: 'Benjamin Booker’s story', color: '#00ced1', royalty: 329 },
] as const

export type BookId = typeof books[number]['id']
export type Period = 7 | 28 | 90
export type Metric = 'sold' | 'income'

const fields = [
  'paid', 'free', 'signedIn', 'guest', 'paidPages', 'freePages', 'fragmentPages',
  'subscriptionPages', 'reviews', 'salesRoyalty', 'viewsRoyalty',
] as const
type Field = typeof fields[number]
type Stats = Record<Field, number>
type Day = { time: number; byBook: Record<BookId, Stats> }
export type Point = { label: string; axis: string; values: number[] }

const dayMs = 86_400_000
const anchor = Date.UTC(2025, 3, 28)
const formatDate = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' })
const number = new Intl.NumberFormat('en-GB')
const decimal = new Intl.NumberFormat('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
export const count = (value: number) => number.format(value)
export const euro = (cents: number) => decimal.format(cents / 100)
export const signed = (value: number, format = count) => `${value < 0 ? '−' : '+'}${format(Math.abs(value))}`

const salesProfiles = [
  { base: 16, slope: .13, pickup: .02, paidShare: .47, phase: .4 },
  { base: 13, slope: .065, pickup: .015, paidShare: .36, phase: 2.1 },
  { base: 10, slope: .04, pickup: .26, paidShare: .29, phase: 4.3 },
]

function sampleDay(index: number): Day {
  const time = anchor - (55 - index) * dayMs
  const elapsed = index + 124
  // Keep the original sample cadence for fields that do not depend on sales.
  if (index < 0) index = (index + 180) % 47
  const byBook = Object.fromEntries(books.map((book, rank) => {
    const { base, slope, pickup, paidShare, phase } = salesProfiles[rank]
    const weekly = 2.2 * Math.sin(elapsed * 2 * Math.PI / 7 + phase)
    const variation = 2.8 * Math.sin(elapsed / (5 + rank * 2) + phase)
    const volume = Math.max(0, Math.round(base + slope * elapsed
      + pickup * Math.max(0, elapsed - 120) + weekly + variation))
    const paid = Math.round(volume * paidShare)
    const free = volume - paid
    const signedIn = 2 + (index + rank) % 4 + Math.floor(index / 28)
    const guest = 1 + (index * 2 + rank) % 3
    const paidPages = paid * (32 + (index + rank) % 23)
    const freePages = free * (42 + (index * 2 + rank) % 43)
    const fragmentPages = 7 * guest + index % 8
    const subscriptionPages = 12 * signedIn + index % 16
    const reviews = (index + rank * 2) % 5 < 2 ? 1 + index % 2 : 0
    const salesRoyalty = paid * book.royalty
    const viewsRoyalty = 16 * signedIn + 8 * guest + 2 * subscriptionPages
    return [book.id, { paid, free, signedIn, guest, paidPages, freePages, fragmentPages, subscriptionPages, reviews, salesRoyalty, viewsRoyalty }]
  })) as Record<BookId, Stats>
  return { time, byBook }
}

const sample = Array.from({ length: 180 }, (_, index) => sampleDay(index - 124))
export const allBooks = books.map(book => book.id)

export function sum(days: Day[], bookIds: readonly BookId[] = allBooks): Stats {
  const totals = Object.fromEntries(fields.map(field => [field, 0])) as Stats
  for (const { byBook } of days) {
    for (const id of bookIds) {
      for (const field of fields) totals[field] += byBook[id][field]
    }
  }
  return totals
}

export const sold = (stats: Stats) => stats.paid + stats.free
export const income = (stats: Stats) => stats.salesRoyalty + stats.viewsRoyalty
export const views = (stats: Stats) => stats.signedIn + stats.guest
export const pages = (stats: Stats) => stats.paidPages + stats.freePages + stats.fragmentPages + stats.subscriptionPages
export type Measure = (stats: Stats) => number

export function getRange(period: Period) {
  const current = sample.slice(-period)
  const previous = sample.slice(-period * 2, -period)
  return { current, previous, totals: sum(current), comparison: sum(previous), label: bounds(current) }
}

function bounds(days: Day[]) {
  const first = formatDate.format(days[0].time)
  const last = formatDate.format(days[days.length - 1].time)
  return first === last ? first : `${first} – ${last}`
}

type PointSeries = { bookIds?: BookId[]; measure: Measure }

export function points(days: Day[], series: PointSeries[], size = days.length === 90 ? 7 : days.length / 7): Point[] {
  return Array.from({ length: Math.ceil(days.length / size) }, (_, index) => {
    const bucket = days.slice(index * size, (index + 1) * size)
    return {
      label: `${bounds(bucket)} 2025`,
      axis: formatDate.format(bucket[0].time),
      values: series.map(({ bookIds, measure }) => measure(sum(bucket, bookIds))),
    }
  })
}

export function salesPoints(days: Day[], series: PointSeries[]): Point[] {
  const result = points(days, series, days.length === 90 ? 7 : 1)
  result[result.length - 1].axis = formatDate.format(days[days.length - 1].time)
  return result
}
