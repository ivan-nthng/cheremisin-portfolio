import {Icon, Text} from '@saavi/design-system/components';
import type {demoPaymentMethod} from './store';
import styles from './payment-method.module.css';

type Method=ReturnType<typeof demoPaymentMethod>;
const icons={Visa:'social/visa/branded',Mastercard:'social/mastercard/branded',Cash:'finance/cash'} as const;

/** Fictional method presentation only; the service's COD contract stays unchanged. */
export function PaymentMethod({method,showLabel=false}:{method:Method;showLabel?:boolean}) {
  return <span className={styles.method} title={method}>
    {method==='Apple Pay'?<img src="/images/saavi/payments/apple-pay.svg" alt={showLabel?'':method} className={styles.applePay}/>:
      <Icon name={icons[method]} size="lg" label={showLabel?undefined:method}/>}
    {showLabel&&<Text as="span" variant="body-sm">{method}</Text>}
  </span>;
}
