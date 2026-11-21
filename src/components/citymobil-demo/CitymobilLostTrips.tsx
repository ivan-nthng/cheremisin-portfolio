'use client'

import type { RefObject } from 'react'
import { demoLostTrips } from '@/lib/portfolio/client/citymobil-demo'
import { citymobilAssets as assets } from './assets'
import NativeAsset, { type AssetName } from './NativeAsset'
import { CitymobilDriverMetrics } from './CitymobilDriverInfo'
import CitymobilPaymentCard, { type OrderTab, type PaymentTrip } from './CitymobilPaymentCard'
import DemoMotion from './DemoMotion'
import styles from './preview.module.css'
import RouteSummary from './RouteSummary'

type ListProps = { active: string | null; selected: string | null; sessionStartedAt?: number | null; canSelect: boolean; dark: boolean; guided?: boolean; onPreview: (id: string, trigger: HTMLButtonElement) => void; onSelect: (id: string) => void }
export function CitymobilLostTrips({ active, selected, sessionStartedAt, canSelect, dark, guided, onPreview, onSelect }: ListProps) {
  const lostTrips = demoLostTrips(sessionStartedAt)
  return <div className={styles.lostTrips} data-source-node="8331:19271" aria-label="Three fictional Lisbon trips">
    <p className={styles.tripListHint}>{selected ? 'Selected trip is pinned. Previewing another trip does not change it.' : 'Latest trip is context only. Confirm it with the rider, then select it.'}</p>
    {lostTrips.map((trip, i) => <button key={trip.id} type="button" className={styles.lostTripRow} data-target={guided ? 'city-trip-' + trip.id : undefined} aria-pressed={active === trip.id} aria-label={'Open order: ' + trip.day + ', ' + trip.departure + ', ' + trip.driver} onClick={event => { onPreview(trip.id, event.currentTarget); if (canSelect && trip.id === 'latest') onSelect(trip.id) }} onKeyDown={event => { if (event.key === 'ArrowRight') { event.preventDefault(); onPreview(trip.id, event.currentTarget) } }}>
      <div className={styles.dateRow}><span>{trip.date}</span><span className={styles.completed}><NativeAsset name="workspace/imgStateCompleted" plain/>Completed</span></div>
      <div className={styles.carFare}><div><h4>{trip.car}</h4><p><NativeAsset name="workspace/imgCarFront" dark={dark}/>{trip.category}</p></div><div className={styles.fare}><NativeAsset name="workspace/imgMcSymbol" plain/><span>€</span><strong>{trip.fare.split('.')[0]}</strong><span>.{trip.fare.split('.')[1]}</span></div></div>
      <RouteSummary trip={trip} compact />
      <div className={styles.passenger}><img src={assets[trip.avatar].src} alt="" width={28} height={28}/><span>{trip.driver}</span><small>{active === trip.id ? 'Viewing' : selected === trip.id ? 'Confirmed' : i === 0 ? 'Latest' : 'View'}</small></div>
    </button>)}
    <p className={styles.tripListHint}>Click, Enter or Space opens an order. Opening the confirmed latest trip selects it; other orders are read-only. Right arrow opens details. Dates: Europe/Lisbon. All records and fares are fictional.</p>
  </div>
}

type OrderTrip = PaymentTrip & { driver: string; avatar: AssetName; plate?: string; motivation?: number; rate?: string }
type DetailsProps = { trip: OrderTrip; dark: boolean; tab: OrderTab; onTab: (value: OrderTab) => void; pending?: boolean; closeRef: RefObject<HTMLButtonElement | null>; onClose: () => void; onMap: (trigger: HTMLButtonElement) => void; onCall?: () => void; onMore: (trigger: HTMLButtonElement) => void; moreOpen: boolean }
export function CitymobilOrderDetails({ trip, dark, tab, onTab, pending, closeRef, onClose, onMap, onCall, onMore, moreOpen }: DetailsProps) {
  return <DemoMotion kind="drawer" className={styles.paymentPanel} role="complementary" aria-label="Order details" data-source-node="8361:20876" data-details-trip={trip.id} onKeyDown={event => {
    if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); onClose(); return }
  }}>
    <header className={styles.paymentHeading}><h3>Order</h3><button ref={closeRef} type="button" className={styles.inlineClose} onClick={onClose} aria-label="Close order details"><NativeAsset name="order/close" dark={dark}/></button></header>
    <div className={styles.orderDriver}><div className={styles.orderIdentity}><img src={assets[trip.avatar].src} alt="" width={44} height={44}/><div><h4>{trip.driver}</h4><p>{trip.plate ?? 'Fictional demo driver'}</p></div><button type="button" aria-label={'Call ' + trip.driver + ' from order'} aria-disabled={!onCall} onClick={onCall} title={onCall ? 'Simulated call' : 'Inactive for this viewed order; no service is connected.'}><NativeAsset name="workspace/imgCall" dark={dark}/></button><button type="button" aria-label="Order driver actions" aria-haspopup="menu" aria-expanded={moreOpen} onClick={event => onMore(event.currentTarget)}><NativeAsset name="workspace/imgMore1" dark={dark}/></button></div><CitymobilDriverMetrics motivation={trip.motivation} rate={trip.rate} dark={dark} order/></div>
    <div className={styles.paymentWell}><CitymobilPaymentCard trip={trip} dark={dark} pending={pending} tab={tab} onTab={onTab} onMap={onMap}/></div>
  </DemoMotion>
}
