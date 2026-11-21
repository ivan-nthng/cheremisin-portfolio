import styles from './preview.module.css'
import { formatDemoDateTime } from '@/lib/portfolio/client/citymobil-demo'

type RouteTrip = { departure: string; arrival: string; startedAt?: number; endedAt?: number; origin: string; destination: string }

export default function RouteSummary({ trip, compact = false }: { trip: RouteTrip; compact?: boolean }) {
  return <div className={styles.routeSummary} data-compact={compact}>
    {[[trip.departure, trip.origin], [trip.arrival, trip.destination]].map(([time, address], index) =>
      <div key={index} className={styles.routeEndpoint}>
        <span className={styles.routeTime} title={(index ? trip.endedAt : trip.startedAt) == null ? undefined : formatDemoDateTime((index ? trip.endedAt : trip.startedAt)!)}>{time}</span>
        <span className={styles.routeMarker} aria-hidden="true"><i /></span>
        <span className={styles.routeAddress}>{address}</span>
      </div>)}
  </div>
}
