import {expect,it} from 'vitest';
import {createAdminStore} from './admin-store';
import {parseRestaurantAcceptanceResponse, type RestaurantAcceptanceRequest} from '@native/lib/kitchen/order-acceptance-contracts';
import {salesDemoRanges,salesDemoSnapshot} from '@native/components/admin/admin-sales-demo-data';

const endpoint=new URL('http://localhost/api/admin/restaurants');
const store=()=>createAdminStore('2026-11-12');
const request=async(s:ReturnType<typeof store>,input:RestaurantAcceptanceRequest)=>parseRestaurantAcceptanceResponse(await s.request(endpoint,{method:'POST',body:JSON.stringify(input)}),input);

it('serves both native restaurant identities consistently with every Sales scope',async()=>{
  const result=await request(store(),{operation:'list'});
  expect(result.result).toBe('Found');if(result.result!=='Found'||!('items'in result))throw new Error('Expected native list');
  expect(result.items.map(row=>row.displayName)).toEqual(['Casa Verde','Sea Breeze']);
  const range=salesDemoRanges.month,all=salesDemoSnapshot(range,'all')!,casa=salesDemoSnapshot(range,'casa')!,sea=salesDemoSnapshot(range,'sea')!;
  expect(new Set(all.dishes.map(d=>d.restaurant))).toEqual(new Set(result.items.map(r=>r.displayName)));
  expect(casa.value+sea.value).toBe(all.value);expect(casa.portions+sea.portions).toBe(all.portions);
  for(let i=0;i<all.weeks.length;i++)expect(casa.weeks[i].value+sea.weeks[i].value).toBe(all.weeks[i].value);
});
it('applies native list search, sort and combined filters',async()=>{
  const s=store();const result=await request(s,{operation:'list',view:{query:'sea',filters:{scheduleState:['closed'],acceptingNewOrders:true},sort:[{field:'name',direction:'desc'}]}});
  expect(result).toMatchObject({result:'Found',items:[{displayName:'Sea Breeze'}],nextCursor:null});
  expect(await request(s,{operation:'list',view:{filters:{scheduleState:['unknown']}}})).toMatchObject({result:'Found',items:[]});
});
it('keeps acceptance receipt/readback/replay consistent and resets local state',async()=>{
  const s=store(),restaurantId='00000000-0000-4000-8000-000000000001';
  const input:RestaurantAcceptanceRequest={operation:'set',restaurantId,expectedVersion:3,intentId:'00000000-0000-4000-8000-000000009999',acceptingNewOrders:false};
  expect(await request(s,input)).toMatchObject({result:'Saved',restaurantVersion:4,acceptingNewOrders:false,replayed:false});
  expect(await request(s,input)).toMatchObject({result:'Saved',restaurantVersion:4,replayed:true});
  expect(await request(s,{operation:'read',restaurantId})).toMatchObject({result:'Found',restaurant:{restaurantVersion:4,acceptingNewOrders:false,legalActions:{start:true,stop:false}}});
  s.reset();expect(await request(s,{operation:'read',restaurantId})).toMatchObject({result:'Found',restaurant:{restaurantVersion:3,acceptingNewOrders:true}});
});
it('rejects unsupported Admin paths instead of reaching an operational service',async()=>{
  await expect(store().request(new URL('http://localhost/api/admin/orders'))).rejects.toThrow('Unimplemented local Admin request');
});
