'use client'

import { useId } from 'react'
import { demoPaymentMethods, formatDemoDateTime } from '@/lib/portfolio/client/citymobil-demo'
import NativeAsset from './NativeAsset'
import { DemoTabContent } from './DemoMotion'
import styles from './preview.module.css'
import RouteSummary from './RouteSummary'

export type PaymentTrip = { id: string; date: string; departure: string; arrival: string; startedAt?: number; endedAt?: number; origin: string; destination: string; invoice: string; fare: string; base: string; tolls: string; discount: string; card?: string }
export type OrderTab = 'details' | 'payment' | 'history'
type Props = { trip: PaymentTrip; dark: boolean; pending?: boolean; tab: OrderTab; onTab: (tab: OrderTab) => void; onMap?: (trigger: HTMLButtonElement) => void }

/** One native payment owner for the order drawer and each Lost-trip detail. */
export default function CitymobilPaymentCard({ trip, dark, pending = false, tab, onTab, onMap }: Props) {
  const uid = useId()
  const tabs: OrderTab[] = onMap ? ['details', 'payment', 'history'] : ['payment', 'history']
  const card = trip.card ?? demoPaymentMethods.master.suffix
  function method(brand: 'mastercard' | 'visa') {
    const master = brand === 'mastercard'
    return <div className={styles.nativePaymentMethod}><NativeAsset name={master ? 'payment/mastercard' : 'payment/visa'} plain/><div><p><span>{master ? 'MasterCard:' : 'Visa:'}</span><b>**** {master ? card : demoPaymentMethods.visa.suffix}</b></p><p><span>Exp:</span><b>{master ? demoPaymentMethods.master.expiry : demoPaymentMethods.visa.expiry}</b></p></div></div>
  }
  return <div className={styles.card + ' ' + styles.nativePaymentCard} data-source-node="6409:11274" data-payment-trip={trip.id}>
    <div className={styles.tabs} role="tablist" aria-label="Order information">{tabs.map((value, index) => <button type="button" role="tab" key={value} id={uid + '-' + value} aria-controls={uid + '-body'} aria-selected={tab === value} tabIndex={tab === value ? 0 : -1} onClick={() => onTab(value)} onKeyDown={event => { if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) { event.preventDefault(); const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length; onTab(tabs[next]); event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('button')[next]?.focus() } }}>{value === 'details' ? 'Details' : value === 'payment' ? 'Payment' : 'History'}</button>)}</div>
    <div role="tabpanel" id={uid + '-body'} aria-labelledby={uid + '-' + tab} tabIndex={0} className={styles.nativePaymentContent}><DemoTabContent value={tab} index={tabs.indexOf(tab)}>
      <div className={styles.nativeInvoice}><div><h4>{trip.date}</h4><p>{trip.invoice}</p></div><span className={styles.completed} data-pending={pending}><NativeAsset name={pending ? 'payment/pending' : 'workspace/imgStateCompleted'} dark={dark} plain/>{pending ? 'Pending' : 'Completed'}</span></div>
      {tab === 'details' ? <div className={styles.orderRoute} data-source-node="8361:21203"><p className={styles.orderReference}># {trip.invoice.replace('INV', 'CM')}</p><RouteSummary trip={trip} /><button type="button" className={styles.showOnMap} onClick={event => onMap?.(event.currentTarget)}><NativeAsset name="workspace/imgLocation1" dark={dark}/>Show On Map</button></div> : tab === 'payment' ? <>
        <div className={styles.nativePaymentSummary}><div className={styles.nativeTotal}><span>Total Price</span><strong><NativeAsset name="payment/brand" plain/>€ {trip.fare}</strong></div><dl className={styles.nativeAmounts}><dt>Base Charge</dt><dd>€ {trip.base}</dd><dt>Tolls</dt><dd>€ {trip.tolls}</dd><dt>Bonus Points Discount</dt><dd className={styles.nativeDiscount}>− € {trip.discount}</dd></dl><div className={styles.nativeSelectedMethod}>{method('mastercard')}</div></div>
        <h4 className={styles.nativeMoreMethods}>More Payment methods</h4><div className={styles.nativeSecondaryMethod}>{method('visa')}<button type="button" className={styles.nativeAddMethod} aria-disabled="true" title="Inactive in this local demo; no card collection or payment service is connected."><NativeAsset name="payment/add" dark={dark}/>Add Payment Method</button></div>
      </> : <div className={styles.paymentHistory} data-composition="fictional-history"><div><span title={trip.startedAt == null ? undefined : formatDemoDateTime(trip.startedAt)}>{trip.departure}</span><div><h4>{pending ? 'Card authorization' : 'Trip started'}</h4><p>{pending ? 'MasterCard · **** ' + card : trip.origin}</p></div><strong>{pending ? '€ ' + trip.fare : ''}</strong></div><div><span title={(pending ? trip.startedAt : trip.endedAt) == null ? undefined : formatDemoDateTime((pending ? trip.startedAt : trip.endedAt)!)}>{pending ? trip.departure : trip.arrival}</span><div><h4>{pending ? 'Pickup confirmation' : 'Trip completed · Card payment'}</h4><p>{pending ? trip.origin : trip.destination}<br/>MasterCard · **** {card}</p></div><strong>{pending ? 'Pending' : '€ ' + trip.fare}</strong></div></div>}
    </DemoTabContent></div>
  </div>
}
