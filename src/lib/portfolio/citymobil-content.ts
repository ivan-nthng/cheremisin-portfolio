/** Display projection of content/portfolio/projects/taxi-aggregator-support-workspace.md
 * → Owner-Confirmed Historical Statistics / Approved Four-Metric Local Comparison.
 * English wording follows PORT-17's current reconciliation contract.
 * The confirmation date is not a reporting period.
 * Consumed by the current case and legacy project; native demo data is separate. */
export type CitymobilMetric = { value: number; label: string; accessible: string; format?: 'compact' | 'lower-bound' | 'duration' }

export function formatCitymobilNumber(value: number, format?: CitymobilMetric['format']) {
  if (format === 'duration') return `${Math.floor(value / 60)}:${String(value % 60).padStart(2, '0')}`
  if (format === 'compact' || format === 'lower-bound') return `${Number((value / 1000).toFixed(1))}K${format === 'lower-bound' ? '+' : ''}`
  return value.toLocaleString('en-US')
}
const operators = 50
const demand = { value: 15000, format: 'compact', label: 'Requests per day', accessible: '15,000 support requests per day' } satisfies CitymobilMetric
const before = [
  { value: 3600, format: 'compact', label: 'Team capacity per day', accessible: '3,600 requests per day across the team' },
  { value: 11400, format: 'compact', label: 'Daily capacity gap', accessible: '11,400 requests per day; incoming demand minus team capacity' },
  { value: operators, label: 'Support operators', accessible: '50 support operators' },
  { value: 360, format: 'duration', label: 'Average handling time', accessible: 'Approximately 6 minutes per request; owner recollection' },
] satisfies CitymobilMetric[]

export const citymobilContent = {
  service: [
    { value: '14M', label: 'Potential users' },
    { value: '80K', label: 'Registered drivers' },
    { value: '16K', label: 'Daily drivers' },
    { value: '220K', label: 'Rides per day' },
  ],
  serviceContext: 'Citymobil had a potential audience of 14 million people, with 80,000 registered drivers, 16,000 daily drivers and 220,000 rides a day.',
  beforeTitle: 'Growing demand. Limited capacity.',
  beforeDescription: 'The team received 15,000 support requests a day. With 50 operators and capacity for 3,600, it covered 24% of demand, leaving a daily capacity gap of 11,400. Handling times are approximate.',
  before,
  // Preserve the original Problem cards while the comparison uses four paired metrics.
  problem: [demand, before[2], before[0], before[1]],
  priorityTitle: 'Focus on the requests that make up 90%.',
  priorityDescription: 'Ride-cost disputes (35%), driver compensation for cancelled trips (25%), payment-method issues (20%) and Guaranteed Income inquiries (10%) accounted for 90% of requests. These four categories were the optimization priority.',
  requests: [
    { title: 'Ride-cost disputes', share: 35 },
    { title: 'Driver compensation for cancelled trips', share: 25 },
    { title: 'Payment-method issues', share: 20 },
    { title: 'Guaranteed Income inquiries', share: 10 },
  ],
  afterTitle: 'Demand covered, with capacity to spare.',
  afterDescription: 'The same 50 operators covered the baseline demand, with capacity to support more customers without expanding the team.',
  comparisonNote: '15K+ is a lower bound against 15,000 requests per day. Zero is the capacity shortfall, not a count of unanswered tickets. Handling times are approximate.',
  after: [
    { value: 15000, format: 'lower-bound', label: 'Team capacity per day', accessible: 'At least 15,000 requests per day against baseline demand; a lower bound, not measured throughput or spare capacity' },
    { value: 0, label: 'Daily capacity gap', accessible: 'Zero capacity shortfall against the baseline of 15,000 requests per day; not a count of unanswered tickets or backlog' },
    { value: operators, label: 'Support operators', accessible: 'The same 50 support operators' },
    { value: 90, format: 'duration', label: 'Average handling time', accessible: 'Approximately 1 minute 30 seconds per request; owner recollection, not a capacity calculation' },
  ] satisfies CitymobilMetric[],
}
