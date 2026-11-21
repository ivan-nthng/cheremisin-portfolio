import type {ComponentProps} from 'react';
import {AdminOrderPayment as NativePayment} from '@native/components/admin/admin-order-payment';
import {demoPaymentMethod} from './store';
import {PaymentMethod} from './payment-method';
import styles from './payment-method.module.css';

type Props=ComponentProps<typeof NativePayment>;
const method=(order:Props['order'])=>order.payment?.state==='succeeded'?demoPaymentMethod(order.orderId):'Cash';
export function orderPaymentMethod(order:Props['order'],_locale:Props['locale']) {
  return <PaymentMethod method={method(order)} showLabel/>;
}
export function AdminOrderPayment(props:Props) {
  return <span className={styles.method}>
    {props.includeMethod!==false&&props.order.payment&&<PaymentMethod method={method(props.order)}/>}
    <NativePayment {...props} includeMethod={false}/>
  </span>;
}
