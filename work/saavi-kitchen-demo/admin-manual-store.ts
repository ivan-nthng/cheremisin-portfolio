import {createAdminScenario} from './admin-scenario';
import {adminReviewFixtureTransport, adminSourceFixture} from '@native/components/admin/admin-review.fixture';
import {operationalFixtureId} from '@native/components/workspace/operational-read.fixture';
import type {SubmittedSourceDetail} from '@native/lib/admin/contracts';
import {productionWork, productionOrder, productionId} from '@native/components/admin/admin-production.fixture';
import {accessId, accessPersonFixture, accessInvitationFixture} from '@native/components/admin/admin-access.fixture';
import {parseAdminProductionListRequest} from '@native/lib/admin/production-contract';
import {parseAdminDeliveryListRequest, type AdminDeliveryListItem} from '@native/lib/admin/delivery-contract';
import {parseAccessManagementReadRequest, type ManagedPerson, type AccessRestaurant} from '@native/lib/auth/access-management-contracts';
import type {RestaurantAcceptance} from '@native/lib/kitchen/order-acceptance-contracts';
import type {DeliveryScheduleResponse} from '@native/lib/admin/delivery-schedule';
import {deliveryProfileFixture} from '@native/components/workspace/delivery-settings.fixture';
import {isRestaurantOperatingHours} from '@native/lib/kitchen/restaurant-operating-hours';
import {parseSaveTablePreference, type TablePreference} from '@native/lib/auth/table-preference-contracts';

export const demoProductionOrderId = (order: number) => productionWork(order).orderId.replace('41500000', `4150000${order}`);

/** The same closed native fixtures used by Saavi's component stories, dated for this local session. */
export function createAdminManualStore(today:string, restaurants:()=>RestaurantAcceptance[]) {
  const day=(offset:number)=>new Date(Date.parse(`${today}T12:00:00Z`)+offset*86400000).toISOString().slice(0,10);
  const asOf=`${today}T12:00:00Z`;
  const restaurantRefs=():AccessRestaurant[]=>restaurants().map(({restaurantId,displayName})=>({restaurantId,displayName,logoUrl:null}));
  const production=()=>[1,2,3].map((n,index)=>{
    const row=productionWork(n), restaurant=restaurants()[index%2], plannedDate=day(index-1);
    return {...row,orderId:demoProductionOrderId(n),sequenceIndex:1, restaurant:{...row.restaurant,restaurantId:restaurant.restaurantId,displayName:restaurant.displayName,version:restaurant.restaurantVersion,acceptingNewOrders:restaurant.acceptingNewOrders},
      promise:{...row.promise,plannedDate,startsAt:`${plannedDate}T15:00:00.000000Z`,endsAt:`${plannedDate}T19:00:00.000000Z`},
      items:row.items.map((item,i)=>({...item,offerId:productionId(2000+n*10+i),offerVersionId:productionId(3000+n*10+i),photo:null,title:index===1?'Baked fish & vegetables':i===1?'Tomato & basil pasta':item.title})),
    };
  });
  const orders=()=>{
    const value=productionOrder(), rows=production();
    return value.plans.slice(0,rows.length).map((plan,index)=>{
      const row=rows[index];
      return {...value,orderId:row.orderId,weeks:1,amountMinor:row.items.reduce((total,item)=>total+item.quantity*2400,0),confirmedAt:`${day(-4)}T14:30:00Z`,plans:[{...plan,...row.promise,timeZone:row.promise.timeZone!,sequenceIndex:1,
        items:row.items.map(item=>({itemId:item.itemId,offerId:item.offerId,offerVersionId:item.offerVersionId,title:item.title!,titlePt:null,titleEn:null,quantity:item.quantity,unit:'portion' as const,portionPackageCount:item.portionPackageCount})),work:plan.work?{...plan.work,
        assignment:{...plan.work.assignment!,restaurantId:row.restaurant.restaurantId,restaurantName:row.restaurant.displayName}}:null}]};
    });
  };
  const scenario=createAdminScenario(today,production,orders);
  const people=():ManagedPerson[]=>['Marina Costa','Rafael Mendes','Sofia Almeida','Lucas Ferreira','Clara Thompson','João Silva'].map((displayName,index)=>{
    const userId=accessId(index+1),restaurant=restaurantRefs()[index%2];
    return {...structuredClone(accessPersonFixture),userId,displayName,email:`${['marina','rafael','sofia','lucas','clara','joao'][index]}@example.invalid`,grantVersion:1,
      grants:[{grantId:accessId(100+index),roleCode:index===0?'platform-admin':index===5?'delivery-executor':'restaurant-user',scopeKind:index===0||index===5?'platform':'restaurant',
        scopeId:index===0||index===5?null:restaurant.restaurantId,version:1,editable:true,restaurant:index===0||index===5?null:restaurant}]};
  });
  const invitations=()=>['beatriz','pedro','camila'].map((name,index)=>{
    const restaurant=restaurantRefs()[index%2];
    return {...accessInvitationFixture(`${day(7-index)}T23:59:00Z`),invitationId:accessId(50+index),recipientEmail:`${name}@example.invalid`,issuedAt:`${day(-index-1)}T10:30:00Z`,
      status: index===1?'accepted' as const:index===2?'revoked' as const:'pending' as const,
      proposals:[{roleCode:'restaurant-user',scopeKind:'restaurant',scopeId:restaurant.restaurantId,restaurant}]};
  });

  // Translate only fixture identities/copy; retain the native Review transport and its state machine.
  const fixtureRestaurantId=adminSourceFixture.restaurantId;
  const fixtureValues:Record<string,string>={
    [fixtureRestaurantId]:restaurants()[0].restaurantId,
    'Synthetic restaurant':'Casa Verde','Chicken bowl':'Soy chicken bowl',
    'Restaurant-authored description':'Roasted chicken, steamed rice and broccoli with a light soy and ginger sauce.',
    '2026-10-14T12:00:00.123456Z':`${day(-1)}T12:00:00.123456Z`,
    '2026-10-14T13:00:00Z':asOf,
  };
  const translate=(value:unknown):unknown=>typeof value==='string'?(fixtureValues[value]??value):Array.isArray(value)?value.map(translate):
    value&&typeof value==='object'?Object.fromEntries(Object.entries(value).map(([key,item])=>[key,translate(item)])):value;
  function withReviewPhoto(detail: SubmittedSourceDetail): SubmittedSourceDetail {
    const { restaurantId, dishId, submittedSourceVersionId } = detail;
    const assetId = operationalFixtureId(300);
    const query = new URLSearchParams({
      restaurantId: fixtureValues[restaurantId] ?? restaurantId, dishId, submittedSourceVersionId, assetId,
    });
    return {
      ...detail,
      source: { ...detail.source, photo1MasterAssetId: assetId },
      photos: [{ slot: 1, assetId, url: `/api/admin/submitted/photo?${query}` }],
    };
  }
  const newReview = () => adminReviewFixtureTransport(1, undefined, withReviewPhoto(adminSourceFixture));
  let review=newReview();
  const reviewOutcomes=new Map<string,unknown>();
  const initialPreference=():TablePreference=>({tableKey:'admin.submitted-dishes',subjectRef:'1'.repeat(64),schemaVersion:1,version:0,config:null});
  let preference=initialPreference();
  const reviewPaths=new Set(['/api/admin/submitted/read','/api/admin/submitted/review']);
  const initialSchedule=()=>({result:'Found' as const,id:productionId(900),version:1,timeZone:'America/Sao_Paulo' as const,schedule:structuredClone(deliveryProfileFixture().deliverySchedule!)});
  let schedule=initialSchedule();
  const scheduleOutcomes=new Map<string,DeliveryScheduleResponse>();

  return {reset(){scenario.reset();review=newReview();reviewOutcomes.clear();preference=initialPreference();schedule=initialSchedule();scheduleOutcomes.clear();},async request(url:URL,init?:RequestInit):Promise<unknown>{
    const body=typeof init?.body==='string'?JSON.parse(init.body):{};
    if(url.pathname==='/api/identity/preferences/table'){
      if(init?.method!=='POST')return url.searchParams.get('tableKey')===preference.tableKey?{result:'Found',preference:structuredClone(preference)}:{result:'NotAllowed'};
      const input=parseSaveTablePreference(body);
      if(!input||input.tableKey!==preference.tableKey||input.subjectRef!==preference.subjectRef)return{result:'NotAllowed'};
      if(input.expectedVersion!==preference.version)return{result:'Conflict',currentVersion:preference.version};
      preference={...preference,version:preference.version+1,config:input.config};return{result:'Saved',preference:structuredClone(preference)};
    }
    if(reviewPaths.has(url.pathname)){
      const source=url.pathname==='/api/admin/submitted/read'?scenario.source(body):undefined;
      if(source)return{result:'Found',operation:'detail',detail:source};
      const input={...body,...(body.restaurantId===restaurants()[0].restaurantId?{restaurantId:fixtureRestaurantId}:{})};
      if(url.pathname==='/api/admin/submitted/review'){
        const previous=reviewOutcomes.get(body.intentId);if(previous)return previous;
        const current=await(await review('/api/admin/submitted/read',{body:JSON.stringify({operation:'detail'})})).json();
        if(input.expectedVersion!==current.detail.governance.revision)return{result:'Conflict'};
      }
      const result=await(await review(url.pathname,{...init,body:JSON.stringify(input)})).json();
      if(url.pathname==='/api/admin/submitted/review'&&result.result==='Reviewed'){
        // The native story resets the review clock to one. Keep repeated local review/readback coherent.
        const {detail}=await(await review('/api/admin/submitted/read',{body:JSON.stringify({operation:'detail'})})).json();
        const {offer}=await(await review('/api/admin/offers/draft',{body:JSON.stringify({operation:'read'})})).json();
        detail.governance.revision=result.version;detail.governance.review.version=result.version;
        review=adminReviewFixtureTransport(1,offer,withReviewPhoto(detail));
        reviewOutcomes.set(body.intentId,translate({...result,replayed:true}));
      }
      const value=translate(result) as typeof result;
      if(value.result==='Reviewed'&&value.offer)scenario.upsert({offer:value.offer,restaurantName:'Casa Verde'});
      if(url.pathname==='/api/admin/submitted/read'&&body.operation==='list'){
        const query=body.view?.query?.toLowerCase();
        if(query)value.items=value.items.filter((item:{source:{name:string};restaurantName:string})=>`${item.source.name} ${item.restaurantName}`.toLowerCase().includes(query));
        const decisions=body.view?.filters?.decision;
        if(decisions?.length)value.items=value.items.filter((item:{governance:{review:{decision:string}|null}})=>decisions.includes(item.governance.review?.decision??'submitted'));
      }
      return value;
    }
    if(url.pathname==='/api/admin/production'){
      const input=parseAdminProductionListRequest(body);if(!input)return{result:'NotAllowed'};
      const items=production().filter(row=>(!input.restaurantId||row.restaurant.restaurantId===input.restaurantId)&&
        (!input.period||row.promise.plannedDate>=input.period.startDay&&row.promise.plannedDate<=input.period.endDay));
      return{result:'Found',items:items.slice(0,input.limit??20),nextCursor:null,asOf};
    }
    if(url.pathname==='/api/admin/deliveries'){
      const input=parseAdminDeliveryListRequest(body);if(!input)return{result:'NotAllowed'};
      const items:AdminDeliveryListItem[]=production().flatMap(row=>row.delivery?[{
        deliveryId:row.delivery.taskId,deliveryVersion:row.delivery.version,orderId:row.orderId,sequenceIndex:row.sequenceIndex,
        restaurant:{restaurantId:row.restaurant.restaurantId,displayName:row.restaurant.displayName,logoUrl:null},promise:row.promise,
        deliveryState:row.delivery.state,late:row.promise.plannedDate<today,
        courier:row.delivery.state==='out-for-delivery'?{state:'known' as const,identity:{userId:accessId(6),displayName:'João Silva',avatarUrl:null}}:{state:'unassigned' as const,identity:null},
        destinations:row.destinations,
      }]:[]).filter(row=>!input.lateOnly||row.late);
      return{result:'Found',items:items.slice(0,input.limit??20),nextCursor:null,asOf,...(input.lateOnly?{coverage:{state:'complete',reason:null}}:{})};
    }
    if(url.pathname==='/api/identity/access/management'){
      const input=parseAccessManagementReadRequest(body);if(!input)return{state:'NotAllowed'};
      if(input.kind==='person'){const person=people().find(row=>row.userId===input.id);return person?{state:'Found',kind:input.kind,person,asOf}:{state:'NotFound'};}
      if(input.kind==='invitation'){const invitation=invitations().find(row=>row.invitationId===input.id);return invitation?{state:'Found',kind:input.kind,invitation,asOf}:{state:'NotFound'};}
      const query=input.query?.toLowerCase()??'', key=input.kind==='team'?'people':input.kind;
      const rows=input.kind==='team'?people().filter(row=>`${row.displayName} ${row.email}`.toLowerCase().includes(query)):
        input.kind==='restaurants'?restaurantRefs().filter(row=>row.displayName?.toLowerCase().includes(query)):
        invitations().filter(row=>row.recipientEmail.includes(query)&&(input.kind!=='invitations'||!input.status||row.status===input.status));
      return{state:'Found',kind:input.kind,[key]:rows.slice(0,input.limit??20),nextCursor:null,asOf};
    }
    if(url.pathname==='/api/admin/delivery-schedule'){
      if(body.operation==='read')return structuredClone(schedule);
      if(body.operation!=='save'||!isRestaurantOperatingHours(body.schedule))return{result:'ValidationFailed',field:'schedule',code:'invalid'};
      const prior=scheduleOutcomes.get(body.intentId);if(prior)return{...prior,replayed:true};
      if(!('version'in schedule)||body.expectedVersion!==schedule.version)return{result:'Conflict'};
      schedule={...schedule,result:'Found',version:schedule.version+1,schedule:structuredClone(body.schedule)};
      const saved={...schedule,result:'Saved' as const,replayed:false};scheduleOutcomes.set(body.intentId,saved);return saved;
    }
    const reviewRead=await(await review('/api/admin/submitted/read',{body:JSON.stringify({operation:'detail'})})).json();
    const value=await scenario.request(url.pathname,body,reviewRead.detail.governance.review?0:1);
    if(value!==undefined)return value;
    throw new Error(`Unimplemented local Admin request: ${init?.method??'GET'} ${url.pathname}`);
  }};
}
