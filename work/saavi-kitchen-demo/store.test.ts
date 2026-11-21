import {describe,it,expect} from 'vitest';
import {createKitchenStore} from './store';
import {parseOperationalResponse,parseKitchenProductionCommandResponse,parseKitchenProductionOutcomeResponse} from '@native/lib/operations/contracts';
import {parseKitchenSalesDetail} from '@native/lib/kitchen/overview-sales-contract';
import {isRestaurantProfile} from '@native/components/kitchen/restaurant-profile-client';
import {isSourceDish} from '@native/components/kitchen/source-dish-client';
import {presetRange} from '@native/components/kitchen/overview-model';
import {parseKitchenOverviewSummary} from '@native/lib/kitchen/overview-summary-contract';
import {parseKitchenOverviewWorkResponse} from '@native/lib/kitchen/overview-work-contract';
const restaurantId='41500000-0000-4000-8000-000000000040';
const store=()=>createKitchenStore(new Date('2026-11-12T15:00:00Z'));
const post=(s:ReturnType<typeof store>,path:string,body:unknown)=>s.request(new URL(path,'http://localhost'),{method:'POST',body:JSON.stringify(body)}) as Promise<any>;
const get=(s:ReturnType<typeof store>,path:string)=>s.request(new URL(path,'http://localhost')) as Promise<any>;
describe('native Kitchen contract integration',()=>{
 it('projects the accepted Overview from the same completed orders and current work',async()=>{
   const s=store(),range=presetRange('current-week',s.today),model=s.overview(range),summary=model.workSummary!;
   expect(s.directory.profile?.avatarUrl).toBe('/images/saavi/demo/anna-ivanova.webp');
   expect(parseKitchenOverviewSummary({result:'Found',summary},{operation:'overview',restaurantId,...range,projection:'operations-with-demand'}).result).toBe('Found');
   const sales=await get(s,'/api/kitchen/sales?'+new URLSearchParams({restaurantId,...range}));
   expect(model.salesSummary).toMatchObject(sales.salesSummary);
   expect(model.salesSummary!.estimates!.estimatedFoodProfitMinor).toBe(model.salesSummary!.deliveredFoodValue!.amountMinor-model.salesSummary!.estimates!.estimatedFoodCostMinor);
   const chart=s.chart(range);
   expect(chart.days!.reduce((total,point)=>total+(point.salesMinor??0),0)).toBe(model.salesSummary!.deliveredFoodValue!.amountMinor);
   expect(chart.days!.reduce((total,point)=>total+(point.estimatedFoodCostMinor??0),0)).toBe(model.salesSummary!.estimates!.estimatedFoodCostMinor);
   const work=await get(s,'/api/kitchen/overview/work?'+new URLSearchParams({restaurantId,kind:'not-started',observation:summary.workObservation!}));
   expect(parseKitchenOverviewWorkResponse(work,{restaurantId,kind:'not-started'}).result).toBe('Found');
   expect(work.work.reduce((total:number,row:any)=>total+row.work.assignedQuantity,0)).toBe(summary.operations!.today.notStartedPortions);
 });
 it('serves the native queue and changes only the selected work through start and ready, with replay',async()=>{
   const s=store();const queue=await post(s,'/api/kitchen/production',{operation:'list',restaurantId,view:{}});
   expect(parseOperationalResponse(queue,true).result).toBe('Found');
   const first=structuredClone(queue.work[0]),sibling=structuredClone(queue.work[1]);
   const command={operation:'start',restaurantId,fulfillmentSegmentId:first.work.fulfillmentSegmentId,intentId:crypto.randomUUID(),expectedWorkVersion:1,expectedProductionVersion:1,expectedAssignmentVersion:1};
   const started=await post(s,'/api/kitchen/production',command);
   expect(parseKitchenProductionCommandResponse(started).result).toBe('Started');
   expect((await post(s,'/api/kitchen/production',command)).replayed).toBe(true);
   const ready=await post(s,'/api/kitchen/production',{...command,operation:'ready',intentId:crypto.randomUUID(),expectedWorkVersion:2,expectedProductionVersion:2});
   expect(parseKitchenProductionCommandResponse(ready).result).toBe('Ready');
   const read=await post(s,'/api/kitchen/production',{operation:'read',restaurantId,fulfillmentSegmentId:first.work.fulfillmentSegmentId});
   expect(parseOperationalResponse(read,true).result).toBe('Found');expect(read.item.work.productionState).toBe('ready-for-pickup');
   const other=await post(s,'/api/kitchen/production',{operation:'read',restaurantId,fulfillmentSegmentId:sibling.work.fulfillmentSegmentId});expect(other.item).toEqual(sibling);
   const outcome=await post(s,'/api/kitchen/production',{...command,operation:'outcome',command:'start'});expect(parseKitchenProductionOutcomeResponse(outcome).result).toBe('Found');
 });
 it('reports an affected quantity and retains the exact report outcome',async()=>{
   const s=store(),queue=await post(s,'/api/kitchen/production',{operation:'list',restaurantId,view:{}}),first=queue.work[0];
   const report=await post(s,'/api/kitchen/production',{operation:'cannot-fulfill',restaurantId,fulfillmentSegmentId:first.work.fulfillmentSegmentId,intentId:crypto.randomUUID(),expectedWorkVersion:1,expectedProductionVersion:1,expectedAssignmentVersion:1,reasonCode:'INGREDIENTS_UNAVAILABLE',affectedQuantity:2,note:'Sesame delivery delayed'});
   expect(parseKitchenProductionCommandResponse(report).result).toBe('CannotFulfillReported');
   const read=await post(s,'/api/kitchen/production',{operation:'read',restaurantId,fulfillmentSegmentId:first.work.fulfillmentSegmentId});expect(parseOperationalResponse(read,true).result).toBe('Found');expect(read.item.work.pendingIssue.affectedQuantity).toBe(2);
 });
 it('saves Calendar and profile values, detects stale writes and resets',async()=>{
   const s=store(),url='/api/kitchen/profile?restaurantId='+restaurantId,before=await get(s,url);
   expect(isRestaurantProfile(before.profile,restaurantId)).toBe(true);
   const cmd={restaurantId,intentId:crypto.randomUUID(),expectedVersion:before.profile.restaurantVersion,changes:{dailyPortionLimit:84,deliveryOperator:'restaurant',deliverySchedule:{mon:[{start:'10:00',end:'14:00'}],tue:[],wed:[],thu:[],fri:[],sat:[],sun:[]}}};
   const saved=await post(s,'/api/kitchen/profile',cmd);expect(saved.result).toBe('Saved');expect(isRestaurantProfile(saved.profile,restaurantId)).toBe(true);
   expect((await get(s,url)).profile.dailyPortionLimit).toBe(84);
   expect((await post(s,'/api/kitchen/profile',{...cmd,intentId:crypto.randomUUID()})).result).toBe('Conflict');
   expect((await post(s,'/api/kitchen/profile',cmd)).profile.restaurantVersion).toBe(saved.profile.restaurantVersion);
   s.reset();expect((await get(s,url)).profile.dailyPortionLimit).toBe(120);
 });
 it('serves native-compatible Menu and query/filter results',async()=>{
   const s=store();const list=await get(s,'/api/kitchen/dishes?operation=list&restaurantId='+restaurantId);
   expect(list.dishes.every((dish:unknown)=>isSourceDish(dish,restaurantId))).toBe(true);
   const queue=await post(s,'/api/kitchen/production',{operation:'list',restaurantId,view:{query:'soy',filters:{productionState:['new']}}});
   expect(parseOperationalResponse(queue,true).result).toBe('Found');expect(queue.work.length).toBeGreaterThan(0);expect(queue.work.every((r:any)=>r.work.productionState==='new'&&r.items[0].title.includes('Soy'))).toBe(true);
 });
 it.each(['current-week','previous-week','current-month'] as const)('reconciles sales totals and weekly/dish breakdowns: %s',async preset=>{
   const s=store(),range=presetRange(preset,s.today),request={restaurantId,...range};
   const data=await get(s,'/api/kitchen/sales?'+new URLSearchParams(request));expect(parseKitchenSalesDetail(data,request).result).toBe('Found');
 });
 it('rejects requests outside the local store',async()=>{const s=store();await expect(get(s,'/api/admin/restaurants')).rejects.toThrow('Unimplemented local demo');expect((await post(s,'/api/kitchen/production',{operation:'list',restaurantId:crypto.randomUUID()})).result).toBe('NotAllowed');});
});

it('keeps Orders aligned with Production and serves native-compatible list and detail',async()=>{
  const {parseKitchenOrders}=await import('@native/lib/kitchen/orders-contract');
  const s=store();
  for(const scope of ['current','completed'] as const)for(const period of ['week','30-days'] as const){
    const request={operation:'list' as const,restaurantId,scope,period};
    const result=await get(s,'/api/kitchen/orders?'+new URLSearchParams(request));
    expect(parseKitchenOrders(result,request).result).toBe('Found');
    if(scope==='current')expect(result.orders.length).toBe(s.overview(presetRange('current-week',s.today)).activeOrders!.count);
    const read={operation:'read' as const,restaurantId,orderId:result.orders[0].orderId};
    expect(parseKitchenOrders(await get(s,'/api/kitchen/orders?'+new URLSearchParams(read)),read).result).toBe('Found');
  }
});
it('saves nested dish details and completion without breaking the native decoder',async()=>{
  const s=store(),list=await get(s,'/api/kitchen/dishes?operation=list&restaurantId='+restaurantId),dish=list.dishes[0];
  const saved=await post(s,'/api/kitchen/dishes',{command:'SaveSourceDishDraft',restaurantId,dishId:dish.dishId,expectedVersion:4,intentId:crypto.randomUUID(),changes:{description:'Updated bowl description',sourceDetails:{portionContents:{upsert:[{entryId:dish.sourceDetails.portionContents[0].entryId,name:'Chicken & rice',packageCount:2,weightG:450}]}}}});
  expect(saved.result).toBe('Saved');expect(isSourceDish(saved.dish,restaurantId)).toBe(true);expect(saved.dish.portionPackageCount).toBe(2);expect(saved.dish.completion.eligible).toBe(true);
});

it('creates a genuinely empty draft and reads it back without copying another dish',async()=>{
 const s=store(),command={command:'CreateSourceDish',restaurantId,intentId:crypto.randomUUID(),initial:{name:'Lemon herb salmon'}};
 const created=await post(s,'/api/kitchen/dishes',command);
 expect(isSourceDish(created.dish,restaurantId)).toBe(true);
 expect(created.dish.completion.completed).toEqual(['name']);
 expect(created.dish.menuContext.status).toBe('Draft');
 expect(created.dish.nutrition).toBeNull();expect(created.dish.photo2MasterAssetId).toBeNull();
 expect(await post(s,'/api/kitchen/dishes',{
   command:'SubmitSourceDish',restaurantId,dishId:created.dish.dishId,expectedVersion:1,intentId:crypto.randomUUID(),
 })).toEqual({result:'ValidationFailed',field:'photo1MasterAssetId',code:'required'});
 const read=await get(s,'/api/kitchen/dishes?operation=read&restaurantId='+restaurantId+'&dishId='+created.dish.dishId);
 expect(read.dish).toEqual(created.dish);
});
it('paginates a year of completed orders and reconciles every day, item and total',async()=>{
 const {parseKitchenOrders}=await import('@native/lib/kitchen/orders-contract');
 const s=store(),startDay='2025-11-12',endDay='2026-11-11';
 const base={operation:'list' as const,restaurantId,scope:'completed' as const,period:'30-days' as const,readVersion:'2' as const,completionFrom:startDay,completionTo:endDay,limit:'50'};
 const orders:any[]=[];let cursor:string|null=null;
 do{const request={...base,...(cursor?{cursor}:{})};const result=await get(s,'/api/kitchen/orders?'+new URLSearchParams(request));expect(parseKitchenOrders(result,{...request,limit:50}).result).toBe('Found');orders.push(...result.orders);cursor=result.nextCursor;}while(cursor);
 expect(new Set(orders.map(o=>o.orderId)).size).toBe(orders.length);
 expect(new Set(orders.map(o=>o.orderId.slice(0,8))).size).toBe(orders.length);
 const days=new Set(orders.map(o=>o.completedAt.slice(0,10)));expect(days.size).toBe(365);
 const data=await get(s,'/api/kitchen/sales?'+new URLSearchParams({restaurantId,startDay,endDay}));
 expect(data.salesSummary.deliveredFoodValue.amountMinor).toBe(orders.reduce((sum,o)=>sum+o.amount.amountMinor,0));
 expect(data.salesSummary.deliveredPortions).toBe(orders.reduce((sum,o)=>sum+o.ownWork.reduce((s:number,w:any)=>s+w.items.reduce((n:number,i:any)=>n+i.quantity,0),0),0));
 expect(parseKitchenSalesDetail(data,{restaurantId,startDay,endDay}).result).toBe('Found');
 const {demoPaymentMethod}=await import('./store');expect(new Set(orders.map(o=>demoPaymentMethod(o.orderId)))).toEqual(new Set(['Visa','Mastercard','Apple Pay','Cash']));
});
it('honors completion date and amount sorting, and resets the same fixture history',async()=>{
 const s=store(),query='/api/kitchen/orders?'+new URLSearchParams({operation:'list',restaurantId,scope:'completed',period:'week',readVersion:'2',completionFrom:'2026-11-08',completionTo:'2026-11-08',sort:JSON.stringify([{field:'amountMinor',direction:'desc'}])});
 const before=await get(s,query);expect(before.orders.length).toBeGreaterThan(1);
 expect(before.orders.every((o:any)=>o.completedAt.startsWith('2026-11-08'))).toBe(true);
 const amounts=before.orders.map((o:any)=>o.amount.amountMinor);expect(amounts).toEqual([...amounts].sort((a:number,b:number)=>b-a));
 s.reset();expect(await get(s,query)).toEqual(before);
});

it('keeps All dates unbounded by the current-week picker in the native v2 Orders view',async()=>{
 const s=store(),request={operation:'list',restaurantId,scope:'completed',period:'week',readVersion:'2',sort:JSON.stringify([{field:'confirmedAt',direction:'asc'}])};
 const oldest=await get(s,'/api/kitchen/orders?'+new URLSearchParams(request));
 expect(oldest.orders[0].completedAt.slice(0,10)).toBe('2025-11-12');expect(oldest.nextCursor).not.toBeNull();
});

it('supplies daily native chart points from deliveries and leaves future days unmeasured',async()=>{
 const s=store(),request={restaurantId,startDay:'2026-11-06',endDay:'2026-11-15',grain:'day' as const};
 const data=await get(s,'/api/kitchen/sales?'+new URLSearchParams(request));
 expect(parseKitchenSalesDetail(data,request).result).toBe('Found');expect(data.days).toHaveLength(10);
 expect(data.days.filter((d:any)=>d.day<s.today).every((d:any)=>d.deliveredPortions>0)).toBe(true);
 expect(data.days.filter((d:any)=>d.day>s.today).every((d:any)=>d.deliveredPortions===null)).toBe(true);
 expect(data.days.reduce((sum:number,d:any)=>sum+(d.deliveredFoodValue?.amountMinor??0),0)).toBe(data.salesSummary.deliveredFoodValue.amountMinor);
});
