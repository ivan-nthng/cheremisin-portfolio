import styles from './preview.module.css'

type RouteTrip = { departure: string; arrival: string; origin: string; destination: string }

export default function RouteSummary({ trip, compact = false }: { trip: RouteTrip; compact?: boolean }) {
  return <div className={styles.routeSummary} data-compact={compact}>
    {[[trip.departure, trip.origin], [trip.arrival, trip.destination]].map(([time, address], index) =>
      <div key={index} className={styles.routeEndpoint}>
        <span className={styles.routeTime}>{time}</span>
        <span className={styles.routeMarker} aria-hidden="true"><i /></span>
        <span className={styles.routeAddress}>{address}</span>
      </div>)}
  </div>
}
