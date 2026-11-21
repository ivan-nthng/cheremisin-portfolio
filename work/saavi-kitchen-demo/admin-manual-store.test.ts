import {expect,it,vi} from 'vitest';
import {createAdminStore} from './admin-store';
import {parseAdminProductionListResponse} from '@native/lib/admin/production-contract';
import {parseAdminDeliveryListResponse} from '@native/lib/admin/delivery-contract';
import {parseOperationalResponse} from '@native/lib/operations/contracts';
import {parseAccessManagementReadResponse} from '@native/lib/auth/access-management-contracts';
import {parseTablePreferenceResponse} from '@native/lib/auth/table-preference-contracts';
import {readAdminSources,reviewAdminSource} from '@native/components/admin/admin-source-client';
import {requestDeliverySchedule} from '@native/components/admin/admin-delivery-schedule-client';

const make=()=>createAdminStore('2026-11-12');
const request=(s:ReturnType<typeof make>,path:string,body:unknown)=>s.request(new URL(path,'http://localhost'),{method:'POST',body:JSON.stringify(body)});
it('native Production period/restaurant predicates preserve linked Order identities',async()=>{
  const s=make(),input={operation:'list' as const,period:{startDay:'2026-11-09',endDay:'2026-11-15'}};
  const result=parseAdminProductionListResponse(await request(s,'/api/admin/production',input),input);
  expect(result.result).toBe('Found');if(result.result!=='Found')throw Error('Native list rejected');
  expect(result.items).toHaveLength(3);expect(new Set(result.items.map(row=>row.restaurant.displayName))).toEqual(new Set(['Casa Verde','Sea Breeze']));
  for(const row of result.items){
    const detail=parseOperationalResponse(await request(s,'/api/admin/customer-orders',{operation:'read',orderId:row.orderId}),false);
    expect(detail).toMatchObject({result:'Found',order:{orderId:row.orderId,weeks:1,plans:[{planId:row.planId,plannedDate:row.promise.plannedDate,work:{assignment:{restaurantId:row.restaurant.restaurantId}}}]}});
  }
  const filter={...input,restaurantId:result.items[1].restaurant.restaurantId};
  expect(parseAdminProductionListResponse(await request(s,'/api/admin/production',filter),filter)).toMatchObject({result:'Found',items:[{restaurant:{displayName:'Sea Breeze'}}]});
  const past={...input,period:{startDay:'2026-10-01',endDay:'2026-10-07'}};
  expect(parseAdminProductionListResponse(await request(s,'/api/admin/production',past),past)).toMatchObject({result:'Found',items:[]});
});
it('native Delivery keeps dated status and Order links consistent',async()=>{
  const s=make(),input={operation:'list' as const};
  const result=parseAdminDeliveryListResponse(await request(s,'/api/admin/deliveries',input),input);
  expect(result.result).toBe('Found');if(result.result!=='Found')throw Error('Native list rejected');
  expect(result.items).toHaveLength(2);
  for(const row of result.items)expect(await request(s,'/api/admin/customer-orders',{operation:'read',orderId:row.orderId})).toMatchObject({result:'Found',order:{plans:[{sequenceIndex:row.sequenceIndex,plannedDate:row.promise.plannedDate}]}});
});
it('Team and Invitations pass native parsers, filter, and never grant local command authority',async()=>{
  const s=make();
  for(const kind of ['team','invitations','restaurants'] as const){const input={kind};expect(parseAccessManagementReadResponse(await request(s,'/api/identity/access/management',input),input).state).toBe('Found');}
  const input={kind:'team' as const,query:'Marina'};
  expect(parseAccessManagementReadResponse(await request(s,'/api/identity/access/management',input),input)).toMatchObject({state:'Found',people:[{displayName:'Marina Costa'}]});
  expect(await request(s,'/api/identity/access/management',{command:'ApplyAccessChanges'})).toEqual({state:'NotAllowed'});
  await expect(request(s,'/api/identity/invitation/send',{})).rejects.toThrow('Unimplemented local Admin request');
});
it('Review native read/approval and preference reset stay local and coherent',async()=>{
  const s=make();
  vi.stubGlobal('fetch',async(resource:string,init:RequestInit)=>Response.json(await s.request(new URL(resource,'http://localhost'),init)));
  try{
    const read=await readAdminSources({operation:'list'});expect(read.result).toBe('Found');
    if(read.result!=='Found'||read.operation!=='list')throw Error('Expected native Review list');
    const {restaurantId,dishId,submittedSourceVersionId}=read.items[0];
    const photo=read.items[0].photos[0];
    expect(photo).toMatchObject({slot:1,url:expect.stringContaining('/api/admin/submitted/photo?')});
    expect(read.items[0]).toMatchObject({restaurantName:'Casa Verde',source:{name:'Soy chicken bowl',photo1MasterAssetId:photo.assetId}});
    expect(await reviewAdminSource({restaurantId,dishId,submittedSourceVersionId,expectedVersion:0,intentId:crypto.randomUUID(),decision:'accepted'})).toMatchObject({result:'Reviewed',version:1});
    expect(await readAdminSources({operation:'list',view:{filters:{decision:['submitted']}}})).toMatchObject({result:'Found',items:[]});
    const reject={restaurantId,dishId,submittedSourceVersionId,expectedVersion:1,intentId:crypto.randomUUID(),decision:'rejected' as const,reason:'Please clarify the ingredients.'};
    expect(await reviewAdminSource(reject)).toMatchObject({result:'Reviewed',version:2,replayed:false});
    expect(await reviewAdminSource(reject)).toMatchObject({result:'Reviewed',version:2,replayed:true});
    expect(await readAdminSources({operation:'detail',restaurantId,dishId,submittedSourceVersionId})).toMatchObject({result:'Found',detail:{photos:[photo],governance:{revision:2,review:{version:2,decision:'rejected'}}}});
    const prefPath='/api/identity/preferences/table?tableKey=admin.submitted-dishes';
    const before=parseTablePreferenceResponse(await s.request(new URL(prefPath,'http://localhost')),'admin.submitted-dishes');
    expect(before.result).toBe('Found');if(before.result!=='Found')throw Error('Expected preference');
    expect(await request(s,prefPath,{tableKey:before.preference.tableKey,subjectRef:before.preference.subjectRef,schemaVersion:1,expectedVersion:0,config:{filters:{decision:['accepted']},sort:[]}})).toMatchObject({result:'Saved',preference:{version:1}});
    s.reset();
    expect(await readAdminSources({operation:'list'})).toMatchObject({result:'Found',items:[{governance:{revision:0,review:null}}]});
    expect(await s.request(new URL(prefPath,'http://localhost'))).toMatchObject({result:'Found',preference:{version:0,config:null}});
  }finally{vi.unstubAllGlobals();}
});
it('native delivery schedule saves, replays and resets without remote writes',async()=>{
  const s=make();
  vi.stubGlobal('fetch',async(resource:string,init:RequestInit)=>Response.json(await s.request(new URL(resource,'http://localhost'),init)));
  try{
    const initial=await requestDeliverySchedule({operation:'read'});
    expect(initial.result).toBe('Found');if(initial.result!=='Found'||!initial.schedule)throw Error('Expected schedule');
    const input={operation:'save' as const,expectedVersion:initial.version,intentId:crypto.randomUUID(),schedule:{...initial.schedule,tue:[]}};
    expect(await requestDeliverySchedule(input)).toMatchObject({result:'Saved',version:2,replayed:false});
    expect(await requestDeliverySchedule(input)).toMatchObject({result:'Saved',version:2,replayed:true});
    expect(await requestDeliverySchedule({operation:'read'})).toMatchObject({result:'Found',version:2,schedule:{tue:[]}});
    s.reset();expect(await requestDeliverySchedule({operation:'read'})).toEqual(initial);
  }finally{vi.unstubAllGlobals();}
});
