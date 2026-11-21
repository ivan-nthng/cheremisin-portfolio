import {expect,it,vi} from 'vitest';
import {createAdminStore} from './admin-store';
import {parseAdminMoneyResponse} from '@native/lib/admin/monetary-contract';
import {parseAdminUsersResponse} from '@native/lib/admin/users-contract';
import {parseAdminOperationsResponse} from '@native/lib/admin/operations-contract';
import {parseOperationalResponse,type AdminCustomerOrder} from '@native/lib/operations/contracts';
import {parseAttentionOrdersResponse,parseProductionIssuesResponse} from '@native/lib/admin/attention-contract';
import {adminEditorialDraft,adminOfferOrder,readAdminSources} from '@native/components/admin/admin-source-client';
const make=()=>createAdminStore('2026-11-12');
const request=(s:ReturnType<typeof make>,path:string,body:unknown)=>s.request(new URL(path,'http://localhost'),{method:'POST',body:JSON.stringify(body)});
async function orders(s:ReturnType<typeof make>){const result=parseOperationalResponse(await request(s,'/api/admin/customer-orders',{operation:'list'}),false);expect(result.result).toBe('Found');if(result.result!=='Found'||!('orders'in result))throw Error('Native orders rejected');return result.orders as AdminCustomerOrder[];}
it('Overview money and counts reconcile to the same dated Orders and complete native summaries',async()=>{
  const s=make(),range={startDay:'2026-11-06',endDay:'2026-11-12'},rows=await orders(s),cohort=rows.filter(row=>row.confirmedAt.slice(0,10)>=range.startDay);
  expect(rows).toHaveLength(15);expect(rows.filter(row=>row.deliveryProgress?.complete)).toHaveLength(10);
  const money=parseAdminMoneyResponse(await request(s,'/api/admin/overview',range),range);
  expect(money).toMatchObject({result:'Found',summary:{currencies:[{confirmedOrderValueMinor:cohort.reduce((sum,row)=>sum+row.amountMinor,0),unpaidCohortMinor:cohort.filter(row=>row.payment.state==='pending').reduce((sum,row)=>sum+row.amountMinor,0)}]}});
  expect(parseAdminUsersResponse(await request(s,'/api/admin/overview/users',range),range)).toMatchObject({result:'Found',summary:{total:248,series:{state:'ready',partialDay:'2026-11-12'}}});
  expect(parseAdminOperationsResponse(await request(s,'/api/admin/overview/operations',range),range)).toMatchObject({result:'Found',summary:{activity:{newOrders:{value:cohort.length}},attention:{'orders-awaiting-assignment':{count:{value:2}},'cash-attention':{count:{value:4}},'production-problems':{count:{value:1}},'late-deliveries':{count:{value:1}}}}});
});
it('Overview attention destinations return native sorted cohorts, Order readbacks and linked incidents',async()=>{
  const s=make();
  for(const attention of ['orders-awaiting-assignment','cash-attention'] as const){
    const input={operation:'list' as const,attention};const result=parseAttentionOrdersResponse(await request(s,'/api/admin/attention/orders',input),input);
    expect(result.result).toBe('Found');if(result.result!=='Found'||!('orders'in result))throw Error('Attention rejected');
    expect(result.orders.length).toBe(attention==='cash-attention'?4:2);
    for(const order of result.orders){const read={operation:'read' as const,orderId:order.orderId};expect(parseAttentionOrdersResponse(await request(s,'/api/admin/attention/orders',read),read)).toMatchObject({result:'Found',order:{orderId:order.orderId,amountMinor:order.amountMinor}});}
  }
  const input={operation:'list' as const};expect(parseProductionIssuesResponse(await request(s,'/api/admin/production/issues',input),input)).toMatchObject({result:'Found',incidents:[{links:[{restaurant:{displayName:'Casa Verde'}}]}]});
});
it('native Orders filter and sort keep detail totals and exact purchased offers coherent',async()=>{
  const s=make();vi.stubGlobal('fetch',async(resource:string,init:RequestInit)=>Response.json(await s.request(new URL(resource,'http://localhost'),init)));
  try{
    const rows=await orders(s);
    for(const row of rows){
      const detail=parseOperationalResponse(await request(s,'/api/admin/customer-orders',{operation:'read',orderId:row.orderId}),false);expect(detail).toMatchObject({result:'Found',order:{amountMinor:row.amountMinor}});
      let amount=0;for(const item of row.plans.flatMap(plan=>plan.items)){
        const found=await adminEditorialDraft({operation:'read',offerId:item.offerId,offerVersionId:item.offerVersionId});expect(found.result).toBe('Found');if(found.result!=='Found')throw Error('Purchased offer rejected');
        expect(found.offer.title).toBe(item.title);amount+=item.quantity*found.offer.retailPrice!.minorUnits;
      }expect(amount).toBe(row.amountMinor);
    }
    const filtered=await request(s,'/api/admin/customer-orders',{operation:'list',view:{filters:{paymentState:['succeeded'],deliveryComplete:true},sort:[{field:'amountMinor',direction:'desc'}]}}) as {orders:AdminCustomerOrder[]};
    expect(filtered.orders).toHaveLength(10);expect(filtered.orders.map(row=>row.amountMinor)).toEqual(filtered.orders.map(row=>row.amountMinor).sort((a,b)=>b-a));
  }finally{vi.unstubAllGlobals();}
});
it('native Offers read/save and restart keep publication versions immutable',async()=>{
  const s=make();vi.stubGlobal('fetch',async(resource:string,init:RequestInit)=>Response.json(await s.request(new URL(resource,'http://localhost'),init)));
  try{
    const list=await adminOfferOrder({operation:'read'});expect(list.result).toBe('Found');if(list.result!=='Found'||!('items'in list))throw Error('Order rejected');
    expect(list.items).toHaveLength(6);expect(new Set(list.items.map(item=>item.restaurantName))).toEqual(new Set(['Casa Verde','Sea Breeze']));
    for(const item of list.items){const binding=item.offer.composition[0];expect(await readAdminSources({operation:'detail',restaurantId:binding.restaurantId,dishId:binding.dishId,submittedSourceVersionId:binding.submittedSourceVersionId})).toMatchObject({result:'Found',detail:{source:{name:item.offer.title}}});}
    const offer=list.items[0].offer;
    const saved=await adminEditorialDraft({operation:'save',offerId:offer.offerId,expectedVersion:offer.version,intentId:crypto.randomUUID(),changes:{retailPrice:{minorUnits:2600,currency:'BRL',quantity:1,unit:'portion'}}});
    expect(saved.result).toBe('Saved');
    const binding=offer.composition[0];
    expect(await readAdminSources({operation:'detail',restaurantId:binding.restaurantId,dishId:binding.dishId,submittedSourceVersionId:binding.submittedSourceVersionId})).toMatchObject({result:'Found',detail:{source:{proposedPrice:{minorUnits:2400}}}});
    expect(await adminEditorialDraft({operation:'read',offerId:offer.offerId,offerVersionId:offer.offerVersionId})).toMatchObject({result:'Found',offer:{title:offer.title}});
    s.reset();expect(await adminOfferOrder({operation:'read'})).toEqual(list);
  }finally{vi.unstubAllGlobals();}
});
