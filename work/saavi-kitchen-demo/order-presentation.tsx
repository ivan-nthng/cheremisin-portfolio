import type {ComponentProps} from 'react';
import {PaymentMethod} from './payment-method';
import {OrderMethod as NativeOrderMethod} from '@native/components/kitchen/kitchen-orders-parts';
import {demoPaymentMethod} from './store';
export * from '@native/components/kitchen/kitchen-orders-parts';

// Fictional card brands belong to the demo presentation. The native service
// supports COD only; its production DTO/decoder is deliberately unchanged.
export function OrderMethod({order,locale}:ComponentProps<typeof NativeOrderMethod>) {
  const orderId='orderId' in order&&typeof order.orderId==='string'?order.orderId:null;
  return orderId?<PaymentMethod method={demoPaymentMethod(orderId)} />:<NativeOrderMethod order={order} locale={locale}/>;
}
