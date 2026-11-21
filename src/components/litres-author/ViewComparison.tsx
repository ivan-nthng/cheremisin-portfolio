import { count, signed } from './sample'
import styles from './author.module.css'

export default function ViewComparison({ label, current, previous, scale }: {
  label: string
  current: number
  previous: number
  scale: number
}) {
  const change = current - previous
  const delta = change === 0 ? '0' : signed(change)
  const width = (value: number) => `${value / scale * 100}%`

  return <div className={styles.comparison}>
    <div className={styles.metricLine} aria-hidden="true">
      <span>{label}</span>
      <span className={styles.figures}>{count(current)}<small className={styles.delta}>{delta}</small></span>
    </div>
    <div className={styles.comparisonTrack} role="img"
      aria-label={`${label}. Current period: ${count(current)}. Previous period: ${count(previous)}. Change: ${delta}.`}>
      <span className={styles.comparisonCurrent} style={{ width: width(Math.min(current, previous)) }} />
      {change > 0 && <span className={styles.comparisonIncrease} style={{ width: width(change) }} />}
      {change < 0 && <span className={styles.comparisonDecrease} style={{ width: width(-change) }} />}
    </div>
  </div>
}
