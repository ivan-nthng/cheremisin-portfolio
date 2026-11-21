import {operationalOverview, fixtureDirectory} from '@native/components/kitchen/overview.fixtures';
import {operationalActionWork, operationalFixtureId as id} from '@native/components/workspace/operational-read.fixture';
import {deliveryProfileFixture} from '@native/components/workspace/delivery-settings.fixture';
import {acceptanceFixture} from '@native/components/workspace/restaurant-acceptance.fixture';
import {adminSourceFixture} from '@native/components/admin/admin-review.fixture';
import {kitchenOrdersFixture} from '@native/components/kitchen/kitchen-orders.fixture';
import {parseKitchenOrdersRequest} from '@native/lib/kitchen/orders-contract';
import {parseKitchenProductionCommandRequest, kitchenProductionCardKey} from '@native/lib/operations/contracts';
import {emptyDishDetails} from '@native/components/kitchen/dish-details';
import type {KitchenOrder} from '@native/lib/kitchen/orders-contract';
import {presetRange} from '@native/components/kitchen/overview-model';
import type {DirectoryResponse} from '@native/lib/auth/contracts';
import type {SourceDish, RestaurantProfile} from '@native/lib/kitchen/contracts';
import type {KitchenProductionWork} from '@native/lib/operations/contracts';

export const restaurantId = id(40);
const timeZone = 'America/Sao_Paulo';
const dayPlus = (day:string, n:number) => new Date(Date.parse(`${day}T12:00:00Z`) + n*86400000).toISOString().slice(0,10);
const money = (amountMinor:number) => ({amountMinor,currency:'BRL' as const});
const demoId = (n:number) => `${((Math.imul(n+701, 2654435761)) >>> 0).toString(16).padStart(8,'0')}-6b42-4000-8000-${String(n).padStart(12,'0')}`;
const coverage = {attribution:true, quantity:true, price:true, dishIdentity:true};
const capabilities = {create:true,saveDraft:true,submit:true,photoUpload:false,disable:true,enable:true,portionContents:true};
const names = ['Soy chicken bowl','Roasted pumpkin & lentils','Baked fish & vegetables','Herb chicken & vegetables','Mushroom risotto','Tomato & basil pasta'];
const descriptions = [
  'Soy-glazed chicken with brown rice, broccoli and sesame. Prepared by our kitchen, quickly frozen and ready to heat at home.',
  'Roasted pumpkin, tender lentils and seasonal greens with lemon and olive oil. A satisfying plant-based lunch.',
  'Oven-baked fish with seasonal vegetables, lemon and a light herb dressing.',
  'Chicken roasted with fresh herbs, served with sweet potato and seasonal vegetables.',
  'Creamy rice with roasted mushrooms, parmesan and fresh herbs.',
  'Pasta tossed in slow-cooked tomato sauce with fresh basil and parmesan.'
];
// Apply the native entry-patch wire format to this disposable in-memory copy.
export const demoPaymentMethod=(orderId:string)=>(['Visa','Mastercard','Apple Pay','Cash'] as const)[parseInt(orderId.slice(0,8),16)%4];
function mergeDetails(before:any, patch:any):any {
  if(patch===null)return null;
  if(patch && typeof patch==='object' && ('upsert' in patch || 'remove' in patch)) {
    const key=(row:any)=>row.entryId??row.fieldId??row.tagId;
    const values=(before??[]).filter((row:any)=>!patch.remove?.includes(key(row)));
    for(const row of patch.upsert??[]){const index=values.findIndex((old:any)=>key(old)===key(row));if(index<0)values.push(row);else values[index]=row;}
    return values;
  }
  if(patch && typeof patch==='object' && !Array.isArray(patch)){const result={...before};for(const [key,value] of Object.entries(patch))result[key]=mergeDetails(before?.[key],value);return result;}
  return patch;
}
export function createKitchenStore(clock = new Date()) {
  const today = new Intl.DateTimeFormat('en-CA',{timeZone,year:'numeric',month:'2-digit',day:'2-digit'}).format(clock);
  const now = clock.toISOString();
  let revision = 0;
  const listeners = new Set<()=>void>();
  const outcomes = new Map<string, any>();
  const refresh = () => { revision++; listeners.forEach(fn=>fn()); };
  let profile:RestaurantProfile;
  let dishes:SourceDish[];
  let rows:KitchenProductionWork[];
  let history:KitchenOrder[] = [];
  let accepting = true;
  let tags:Array<{tagId:string;label:string}> = [];
  let personal = {subjectRef:'a'.repeat(64),version:1,givenName:'Anna',familyName:'Ivanova',personalPhone:'+5548999991234',displayName:'Anna Ivanova',savedLocale:'en',email:'anna@casaverde.example',avatar:null};
  let directory:DirectoryResponse = {...structuredClone(fixtureDirectory),profile:{displayName:personal.displayName,savedLocale:'en',avatarUrl:null},destinations: [{serviceId:'kitchen',entry:'open',publicPath:'/'}, {serviceId:'admin',entry:'in-development',publicPath:null},{serviceId:'client',entry:'in-development',publicPath:null}]};
  function updateCompletion() {
    const paths={phone:['phone'],address:['address.street','address.city','address.uf','address.number','pickupInstructions'],operatingDays:['operatingDays']};
    const present={phone:!!profile.phone,address:!!(profile.address.street&&profile.address.city&&profile.address.uf&&profile.address.number&&profile.pickupInstructions),operatingDays:!!profile.operatingDays?.length};
    const completed=(Object.keys(paths) as Array<keyof typeof paths>).filter(key=>present[key]);
    profile.completion={state:'known',count:completed.length,total:3,completed,missing:(Object.keys(paths) as Array<keyof typeof paths>).filter(key=>!present[key]).map(key=>({id:key,fieldPaths:paths[key]})),complete:completed.length===3,restaurantId,restaurantVersion:profile.restaurantVersion,sourceVersionId:profile.sourceVersionId,sourceVersion:profile.sourceVersion};
  }
  function dishCompletion(dish:SourceDish) {
    const values:Record<import('@native/lib/kitchen/contracts').DishRequirement,[boolean,string[]]>={
      name:[!!dish.name,['name']],description:[!!dish.description,['description']],photograph:[!!(dish.photo1MasterAssetId||dish.photo2MasterAssetId),['photo1MasterAssetId','photo2MasterAssetId']],
      salePrice:[!!dish.proposedPrice,['proposedPrice']],estimatedCost:[!!dish.estimatedCost,['estimatedCost']],ingredients:[dish.ingredientDeclaration.status==='declared'&&!!dish.ingredientDeclaration.text,['ingredientDeclaration']],
      portionWeight:[!!dish.portionWeightG,['portionWeightG']],energy:[dish.nutrition?.some(n=>n.code==='energy'&&n.value!==null)??false,['nutrition.energy']],
      protein:[dish.nutrition?.some(n=>n.code==='protein'&&n.value!==null)??false,['nutrition.protein']],carbohydrate:[dish.nutrition?.some(n=>n.code==='carbohydrate'&&n.value!==null)??false,['nutrition.carbohydrate']],
      fat:[dish.nutrition?.some(n=>n.code==='fat'&&n.value!==null)??false,['nutrition.fat']],sodium:[dish.nutrition?.some(n=>n.code==='sodium'&&n.value!==null)??false,['nutrition.sodium']],
      portionContents:[!!dish.sourceDetails.portionContents?.length&&dish.sourceDetails.portionContents.every(row=>!!(row.name&&row.packageCount&&row.weightG)),['sourceDetails.portionContents']]};
    const keys=Object.keys(values) as Array<keyof typeof values>,completed=keys.filter(key=>values[key][0]);
    dish.completion={state:'known',restaurantId,dishId:dish.dishId,sourceVersionId:dish.sourceVersionId,sourceVersion:dish.version,count:completed.length,total:13,eligible:completed.length===13,completed,missing:keys.filter(key=>!values[key][0]).map(key=>({id:key,fieldPaths:values[key][1]}))};
    dish.portionPackageCount=dish.sourceDetails.portionContents?.reduce((sum,row)=>sum+(row.packageCount??0),0)??null;
    return dish;
  }

  function reset() {
    outcomes.clear(); accepting=true; tags=[];
    personal={subjectRef:'a'.repeat(64),version:1,givenName:'Anna',familyName:'Ivanova',personalPhone:'+5548999991234',displayName:'Anna Ivanova',savedLocale:'en',email:'anna@casaverde.example',avatar:null};
    directory={...directory,profile:{displayName:personal.displayName,savedLocale:'en',avatarUrl:null}};
    profile = {...deliveryProfileFixture('saavi'),dailyPortionLimit:120,restaurantId,displayName:'Casa Verde',phone:'+5548999991234',email:'kitchen@casaverde.example',
      address:{cep:'88048403',street:'Rua das Flores',number:'120',complement:'Kitchen entrance',neighbourhood:'Rio Tavares',city:'Florianópolis',uf:'SC'},pickupInstructions:'Use the side entrance. Please ask for Anna at the kitchen counter.'};
    updateCompletion();
    dishes = names.map((name,i)=>{
      const sourceVersionId=id(200+i), version=4;
      return {...structuredClone(adminSourceFixture.source),restaurantId,dishId:demoId(100+i),sourceVersionId,submittedSourceVersionId:sourceVersionId,version,name,description:descriptions[i],sourceLocale:'en',
        photo1MasterAssetId:id(300+i),proposedPrice:{minorUnits:2400+i*200,currency:'BRL',basis:'per-portion'},estimatedCost:{minorUnits:1400+i*100,currency:'BRL',basis:'per-portion'},
        ingredientDeclaration:{status:'declared',text:i===0?'Chicken, brown rice, broccoli, soy sauce, sesame':'Seasonal vegetables, rice, olive oil, herbs'},
        nutrition:[{code:'energy',value:510,unit:'kcal'},{code:'protein',value:32,unit:'g'},{code:'carbohydrate',value:55,unit:'g'},{code:'fat',value:16,unit:'g'},{code:'sodium',value:640,unit:'mg'}],
        portionPackageCount:1,sourceDetails:{...structuredClone(adminSourceFixture.source.sourceDetails),preparationLeadTimeMinutes:2880,portionContents:[{entryId:id(500+i),name,packageCount:1,weightG:450}]},
        menuContext:{state:'known',asOf:now,aggregateVersion:version,currentSourceVersionId:sourceVersionId,status:'Approved',statusSourceVersionId:sourceVersionId,sourceActorId:id(9),sourceAt:now,latestSubmittedSourceVersionId:sourceVersionId,
          readiness:{eventId:id(400+i),sourceVersionId,aggregateVersion:version,state:'available',reason:null,origin:'baseline',actorId:id(9),at:now},review:null,publishedOffers:[],publicationHasMore:false},
        estimatedProfit:{minorUnits:1000+i*100,currency:'BRL',basis:'per-portion',sourceVersionId,actorId:id(9)}};
    });
    dishes.forEach(dishCompletion);
    rows = Array.from({length:12},(_,i)=>{
      const value=operationalActionWork(i+1,restaurantId), dish=dishes[i%6], day=dayPlus(today,Math.floor(i/4)), quantity=[8,12,6,10][i%4];
      const state = i%4===2?'in-production':i%4===3?'ready-for-pickup':'new';
      return {...value,orderId:demoId(600+i),orderConfirmedAt:`${dayPlus(today,-1-i%3)}T${String(9+i).padStart(2,'0')}:20:00Z`,plannedDate:day,productionDate:null,startsAt:`${day}T15:00:00Z`,endsAt:`${day}T19:00:00Z`,
        items:[{...value.items[0],offerId:id(700+i%6),offerVersionId:id(710+i%6),title:dish.name,titleEn:dish.name,titlePt:dish.name,quantity,cataloguePhoto:{offerVersionId:id(710+i%6),assetId:id(300+i%6)}}],
        work:{...value.work,assignedQuantity:quantity,productionState:state,assignment:{restaurantId,restaurantName:profile.displayName,version:1}},legalActions:{start:state==='new',ready:state==='in-production',cannotFulfill:state!=='ready-for-pickup'},
        orderFacts:{scope:'whole-order',amount:money(quantity*dish.proposedPrice!.minorUnits),payment:{method:'cod',state:'succeeded'},progress:{total:1,delivered:0,issues:0,complete:false}}};
    });
    // A year of deterministic, disposable deliveries. All monetary readbacks use
    // these same orders and their captured item prices, never independent totals.
    history = [];
    for(let offset=365;offset>=0;offset--) {
      const day=dayPlus(today,-offset), ordinal=Math.floor(Date.parse(day)/86400000);
      const count=8+Math.round((Math.sin(ordinal*.43)+1)*3);
      for(let n=0;n<count;n++) {
        const completedAt=`${day}T${String(12+Math.floor(n/2)).padStart(2,'0')}:${String(12+n%2*22).padStart(2,'0')}:00Z`;
        if(Date.parse(completedAt)>clock.getTime())continue;
        const seed=100000+ordinal*100+n, orderId=demoId(seed), confirmedAt=`${dayPlus(day,-2-n%3)}T10:24:00Z`;
        const ownWork=Array.from({length:1+n%2},(_,j)=>{
          const dishIndex=(ordinal+n+j*2)%6,dish=dishes[dishIndex],quantity=3+(ordinal+n*3+j)%4;
          const base=operationalActionWork(seed*3+j,restaurantId);
          const deliveryProgress={taskId:base.work.deliveryTaskId,state:'delivered' as const,version:2};
          return {...base,orderId,orderConfirmedAt:confirmedAt,sequenceIndex:j+1,plannedDate:day,productionDate:null,startsAt:`${day}T12:00:00Z`,endsAt:`${day}T20:00:00Z`,
            items:[{...base.items[0],offerId:id(700+dishIndex),offerVersionId:id(710+dishIndex),title:dish.name,titleEn:dish.name,titlePt:dish.name,quantity,cataloguePhoto:{offerVersionId:id(710+dishIndex),assetId:id(300+dishIndex)}}],
            deliveryProgress,work:{...base.work,assignedQuantity:quantity,productionState:'ready-for-pickup' as const,productionVersion:3,deliveryProgress,currentPhase:{domain:'delivery' as const,state:'delivered' as const},phaseConflict:false,assignment:{restaurantId,restaurantName:profile.displayName,version:1}},
            legalActions:{start:false,ready:false,cannotFulfill:false}};
        });
        const amountMinor=ownWork.reduce((sum,w)=>sum+w.items.reduce((total,item)=>total+item.quantity*(2400+(Number(item.offerId.slice(-12))-700)*200),0),0);
        history.push({orderId,confirmedAt,completedAt,scope:'whole-order',amount:money(amountMinor),payment:{method:'cod',state:'succeeded'},progress:{total:ownWork.length,delivered:ownWork.length,issues:0,complete:true},exception:null,ownWork,classification:'completed',overdue:false});
      }
    }
    if(typeof sessionStorage!=='undefined') for(const key of Object.keys(sessionStorage)) if(key.includes(restaurantId)||key.startsWith('saavi:setup-reminder:v1:portfolio-local-demo:'))sessionStorage.removeItem(key);
    refresh();
  }
  reset();
  function sales(range:{startDay:string;endDay:string;grain?:'day'}):Extract<import('@native/lib/kitchen/overview-sales-contract').KitchenSalesDetailResponse,{result:'Found'}> {
    const orders=history.filter(order=>order.completedAt!.slice(0,10)>=range.startDay&&order.completedAt!.slice(0,10)<=range.endDay);
    const figures=(values:KitchenOrder[])=>({deliveredPortions:values.reduce((sum,o)=>sum+o.ownWork.reduce((subtotal,w)=>subtotal+w.items.reduce((n,item)=>n+item.quantity,0),0),0),deliveredFoodValue:money(values.reduce((sum,o)=>sum+o.amount!.amountMinor,0)),coverage});
    const total=figures(orders), weeks=[];
    for(let start=range.startDay;start<=range.endDay;) {
      const end=[presetRange('current-week',start).endDay,range.endDay].sort()[0];
      weeks.push({startDay:start,endDay:end,...figures(orders.filter(o=>o.completedAt!.slice(0,10)>=start&&o.completedAt!.slice(0,10)<=end))});
      start=dayPlus(end,1);
    }
    const breakdown=names.map((name,i)=>{
      const quantity=orders.reduce((sum,o)=>sum+o.ownWork.reduce((subtotal,w)=>subtotal+w.items.filter(item=>item.offerId===id(700+i)).reduce((n,item)=>n+item.quantity,0),0),0);
      return{dishId:demoId(100+i),name,deliveredPortions:quantity,deliveredFoodValue:money(quantity*(2400+i*200)),coverage};
    });
    const days=[];
    const lastObservedDay=new Intl.DateTimeFormat('en-CA',{timeZone,year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(clock.getTime()-1));
    if(range.grain==='day')for(let day=range.startDay;day<=range.endDay;day=dayPlus(day,1))days.push({day,...(day<=lastObservedDay?figures(orders.filter(o=>o.completedAt!.slice(0,10)===day)):{deliveredPortions:null,deliveredFoodValue:null,coverage:{attribution:false,quantity:false,price:false,dishIdentity:false}})});
    return {result:'Found',coverage,salesSummary:{restaurantId,startDay:range.startDay,endDay:range.endDay,timeZone,asOf:now,deliveredPortions:total.deliveredPortions,deliveredFoodValue:total.deliveredFoodValue},weeks,dishes:breakdown.sort((a,b)=>a.dishId.localeCompare(b.dishId)),...(range.grain==='day'?{days}:{})};
  }

  function overview(range:{startDay:string;endDay:string}):Extract<import('@native/lib/kitchen/contracts').KitchenOverviewResponse,{state:'overview'}> {
    const model = operationalOverview();
    const selected = rows.filter(r=>r.plannedDate>=range.startDay&&r.plannedDate<=range.endDay);
    const quantity = (state:string) => selected.filter(r=>r.work.productionState===state).reduce((sum,r)=>sum+r.work.assignedQuantity!,0);
    const next=selected.find(r=>r.work.productionState==='new');
    return {...model,restaurant:{id:restaurantId,displayName:profile.displayName,sourceVersionId:profile.sourceVersionId,sourceVersion:profile.sourceVersion},observedAt:now,
      deliveryReadiness:profile.deliveryReadiness,completion:{profile:profile.completion!,dish:dishes[0].completion!},
      assignedWork:{items:rows,nextCursor:null},activeOrders:{restaurantId,count:new Set(selected.map(r=>r.orderId)).size,asOf:now},
      workSummary:{restaurantId,...range,timeZone,asOf:now,production:{new:quantity('new'),inProduction:quantity('in-production'),readyForPickup:quantity('ready-for-pickup')},outForDelivery:0,
        nextDelivery:next?{plannedDate:next.plannedDate,startsAt:next.startsAt,endsAt:next.endsAt,timeZone,assignedQuantity:next.work.assignedQuantity!}:null},salesSummary:sales(range).salesSummary};
  }
  function production(input:any) {
    if(input.operation==='list') {
      const view=input.view??{}, filters=view.filters??{};
      let work=rows.filter(row=>(!view.query||`${row.orderId} ${row.items.map(i=>i.title).join(' ')}`.toLowerCase().includes(view.query.toLowerCase()))
        &&(!filters.productionState?.length||filters.productionState.includes(row.work.productionState))
        &&(!filters.deliveryState?.length||filters.deliveryState.includes(row.deliveryProgress?.state))
        &&(!filters.startsAtFrom||row.startsAt>=filters.startsAtFrom)&&(!filters.startsAtBefore||row.startsAt<filters.startsAtBefore)
        &&(!filters.endsAtFrom||row.endsAt>=filters.endsAtFrom)&&(!filters.endsAtBefore||row.endsAt<filters.endsAtBefore));
      work=[...work].sort((a,b)=>{for(const sort of view.sort??[]){const difference=String(a[sort.field as keyof KitchenProductionWork]).localeCompare(String(b[sort.field as keyof KitchenProductionWork]));if(difference)return difference*(sort.direction==='desc'?-1:1);}return a.startsAt.localeCompare(b.startsAt);});
      const days=[...new Set(work.map(r=>r.plannedDate))].map(plannedDate=>{const group=work.filter(r=>r.plannedDate===plannedDate);return{plannedDate,portions:group.reduce((s,r)=>s+r.work.assignedQuantity!,0),dishCount:new Set(group.map(kitchenProductionCardKey)).size,cardCount:new Set(group.map(kitchenProductionCardKey)).size,taskCount:group.length};});
      const cards=days.flatMap(day=>[...new Set(work.filter(r=>r.plannedDate===day.plannedDate).map(kitchenProductionCardKey))].map(key=>{const group=work.filter(r=>r.plannedDate===day.plannedDate&&kitchenProductionCardKey(r)===key);return{plannedDate:day.plannedDate,key,portions:group.reduce((s,r)=>s+r.work.assignedQuantity!,0),taskCount:group.length};}));
      return {result:'Found',work,nextCursor:null,queueGroups:{days,cards}};
    }
    const row=rows.find(r=>r.work.fulfillmentSegmentId===input.fulfillmentSegmentId);
    if(!row)return{result:'NotFound'};
    if(input.operation==='read')return{result:'Found',item:row};
    if(input.operation==='outcome')return outcomes.has(input.intentId)?{result:'Found',outcome:outcomes.get(input.intentId)}:{result:'Absent'};
    if(outcomes.has(input.intentId))return{...outcomes.get(input.intentId),replayed:true};
    if(!parseKitchenProductionCommandRequest(input))return{result:'ValidationFailed',field:'request',code:'invalid'};
    const command=input.operation as 'start'|'ready'|'cannot-fulfill';
    if(!row.legalActions?.[command==='cannot-fulfill'?'cannotFulfill':command])return{result:'NotAllowed'};
    const versions={restaurantId,fulfillmentSegmentId:row.work.fulfillmentSegmentId,intentId:input.intentId,command,productionState:row.work.productionState,workVersion:row.work.workVersion,productionVersion:row.work.productionVersion,assignmentVersion:row.work.assignment!.version,replayed:false};
    if(input.expectedWorkVersion!==row.work.workVersion||input.expectedProductionVersion!==row.work.productionVersion||input.expectedAssignmentVersion!==row.work.assignment!.version)return{result:'Conflict',...versions};
    row.work.workVersion!++;
    if(command==='cannot-fulfill')row.work.pendingIssue={incidentId:crypto.randomUUID(),reportId:crypto.randomUUID(),incidentVersion:1,state:'open',reasonCode:input.reasonCode,affectedQuantity:input.affectedQuantity,unit:'portion',note:input.note};
    else {row.work.productionVersion++;row.work.productionState=command==='start'?'in-production':'ready-for-pickup';}
    row.legalActions={start:false,ready:command==='start',cannotFulfill:command==='start'};
    const outcome={...versions,result:command==='start'?'Started':command==='ready'?'Ready':'CannotFulfillReported',productionState:row.work.productionState,workVersion:row.work.workVersion,productionVersion:row.work.productionVersion,...(row.work.pendingIssue?{incidentId:row.work.pendingIssue.incidentId,reportId:row.work.pendingIssue.reportId}:{})};
    outcomes.set(input.intentId,structuredClone(outcome));refresh();return outcome;
  }
  async function request(url:URL, init?:RequestInit) {
    const body=typeof init?.body==='string'?JSON.parse(init.body):{};
    const query=Object.fromEntries(url.searchParams), path=url.pathname;
    const input=init?.method==='POST'?body:query;
    if((query.restaurantId&&query.restaurantId!==restaurantId)||(body.restaurantId&&body.restaurantId!==restaurantId))return{result:'NotAllowed'};
    if(path==='/api/kitchen/production')return production(input);
    if(path==='/api/kitchen/profile'){
      if(init?.method!=='POST')return{result:'Found',profile,capabilities:{saveDraft:true,cepLookup:true,logoUpload:false}};
      if(outcomes.has(input.intentId))return outcomes.get(input.intentId);
      if(input.expectedVersion!==profile.restaurantVersion)return{result:'Conflict'};
      profile={...profile,...input.changes,address:{...profile.address,...input.changes.address},restaurantVersion:profile.restaurantVersion+1,sourceVersion:profile.sourceVersion+1};
      if(profile.deliveryOperator==='saavi')profile.deliverySchedule=null;
      profile.deliveryReadiness={state:'configured',timeZone,missing:[]};updateCompletion();
      const result={result:'Saved',replayed:false,profile:structuredClone(profile)};outcomes.set(input.intentId,result);refresh();return result;
    }
    if(path==='/api/kitchen/profile/cep')return{result:'Found',restaurantId,cep:query.cep,address:{street:'Rua das Flores',neighbourhood:'Rio Tavares',city:'Florianópolis',uf:'SC'}};
    if(path==='/api/kitchen/acceptance'){
      if(input.operation==='outcome')return outcomes.has(input.intentId)?{result:'Found',outcome:outcomes.get(input.intentId)}:{result:'Absent'};
      if(input.operation==='set'){
        if(outcomes.has(input.intentId))return outcomes.get(input.intentId);
        if(input.expectedVersion!==profile.restaurantVersion)return{result:'Conflict'};
        accepting=input.acceptingNewOrders;profile.restaurantVersion++;updateCompletion();
        const result={result:'Saved',restaurantId,restaurantVersion:profile.restaurantVersion,acceptingNewOrders:accepting,replayed:false};outcomes.set(input.intentId,result);refresh();return result;
      }
      return{result:'Found',restaurant:{...acceptanceFixture(),restaurantId,displayName:profile.displayName,restaurantVersion:profile.restaurantVersion,acceptingNewOrders:accepting,legalActions:{start:!accepting,stop:accepting},schedule:{state:'open',timeZone,evaluatedAt:now,today:{date:today,intervals:[{start:'08:00',end:'20:00'}]}}}};
    }
    if(path==='/api/kitchen/sales')return sales({startDay:query.startDay,endDay:query.endDay,...(query.grain==='day'?{grain:'day'}:{})});
    if(path==='/api/kitchen/orders'){
      const request=parseKitchenOrdersRequest(url.searchParams);if(!request)return{result:'ValidationFailed',field:'request',code:'invalid'};
      const currentOrders=rows.map(row=>{
        const {orderFacts, ...ownWork}=structuredClone(row);
        return{orderId:row.orderId,confirmedAt:row.orderConfirmedAt!,scope:'whole-order' as const,amount:orderFacts!.amount,payment:orderFacts!.payment,progress:{total:1,delivered:0,issues:0,complete:false},completedAt:null,exception:null,ownWork:[ownWork],classification:'current' as const,overdue:false};
      });
      const list=[...currentOrders,...history];
      if(request.operation==='read') {
        const order=list.find(o=>o.orderId===request.orderId);
        return order?{...kitchenOrdersFixture(request,[order]),asOf:now}:{result:'NotFound'};
      }
      const nativeWeek=presetRange('current-week',today);
      const span=request.period==='30-days'?{startDay:dayPlus(today,-15),endDay:dayPlus(today,14)}:request.period==='last-7-days'?{startDay:dayPlus(today,-6),endDay:today}:request.readVersion?nativeWeek:{startDay:dayPlus(today,-7),endDay:dayPlus(today,7)};
      let selected=list.filter(o=>o.classification===request.scope);
      if(request.scope==='completed'){if(request.completionFrom||!request.readVersion)selected=selected.filter(o=>o.completedAt!.slice(0,10)>=(request.completionFrom??span.startDay)&&o.completedAt!.slice(0,10)<=(request.completionTo??span.endDay));}
      else selected=selected.filter(o=>o.ownWork.some(w=>w.plannedDate>=span.startDay&&w.plannedDate<=span.endDay));
      selected.sort((a,b)=>{
        for(const sort of request.sort??[]){const av=sort.field==='amountMinor'?a.amount!.amountMinor:sort.field==='paymentState'?a.payment!.state:sort.field==='method'?demoPaymentMethod(a.orderId):a.confirmedAt;const bv=sort.field==='amountMinor'?b.amount!.amountMinor:sort.field==='paymentState'?b.payment!.state:sort.field==='method'?demoPaymentMethod(b.orderId):b.confirmedAt;const compare=typeof av==='number'?av-Number(bv):av.localeCompare(String(bv));if(compare)return compare*(sort.direction==='desc'?-1:1);}
        return (b.completedAt??b.confirmedAt).localeCompare(a.completedAt??a.confirmedAt)||a.orderId.localeCompare(b.orderId);
      });
      const limit=request.limit??20,offset=request.cursor?Number(atob(request.cursor)):0;
      if(!Number.isSafeInteger(offset)||offset<0)return{result:'ValidationFailed',field:'cursor',code:'invalid'};
      const result=kitchenOrdersFixture(request,selected.slice(offset,offset+limit));
      if(result.result==='Found'&&'orders' in result){result.asOf=now;result.period={preset:request.period,today,...span};result.nextCursor=offset+limit<selected.length?btoa(String(offset+limit)):null;}
      return result;
    }
    if(path==='/api/kitchen/dishes'){
      if(input.operation==='outcome')return outcomes.get(input.intentId)??{result:'Absent'};
      if(input.operation==='list'){
        const view=query.view?JSON.parse(query.view):{},filters=view.filters??{};
        let values=dishes.filter(d=>(!view.query||d.name.toLowerCase().includes(view.query.toLowerCase()))&&(!filters.status?.length||filters.status.includes(d.menuContext?.state==='known'?d.menuContext.status:'unknown'))&&(!filters.readiness?.length||filters.readiness.includes(d.availability)));
        for(const sort of [...(view.sort??[])].reverse()) values=[...values].sort((a,b)=>{const field=sort.field;const av=field==='name'?a.name:field==='price'?a.proposedPrice?.minorUnits??0:a.estimatedProfit?.minorUnits??0;const bv=field==='name'?b.name:field==='price'?b.proposedPrice?.minorUnits??0:b.estimatedProfit?.minorUnits??0;return(typeof av==='string'?av.localeCompare(String(bv)):Number(av)-Number(bv))*(sort.direction==='desc'?-1:1);});
        return{result:values.length?'Found':'Empty',dishes:values,nextCursor:null,capabilities};
      }
      let dish=dishes.find(d=>d.dishId===input.dishId);
      if(input.operation==='read')return dish?{result:'Found',dish,capabilities}:{result:'NotFound'};
      if(outcomes.has(input.intentId))return outcomes.get(input.intentId);
      if(input.command==='CreateSourceDish'){dish={...structuredClone(dishes[0]),name:'',description:null,proposedPrice:null,estimatedCost:null,ingredientDeclaration:{status:'unknown',text:null},nutrition:null,portionWeightG:null,portionPackageCount:null,sourceDetails:emptyDishDetails(),...input.initial,dishId:crypto.randomUUID(),version:1,sourceVersionId:crypto.randomUUID(),submittedSourceVersionId:null,state:'draft',photo1MasterAssetId:null,photo2MasterAssetId:null,menuContext:undefined,estimatedProfit:null}; if(input.initial.sourceDetails)dish!.sourceDetails=mergeDetails(emptyDishDetails(),input.initial.sourceDetails);const current=dish!;
        current.menuContext={state:'known',asOf:now,aggregateVersion:1,currentSourceVersionId:current.sourceVersionId,status:'Draft',statusSourceVersionId:current.sourceVersionId,sourceActorId:id(9),sourceAt:now,latestSubmittedSourceVersionId:null,readiness:{eventId:crypto.randomUUID(),sourceVersionId:current.sourceVersionId,aggregateVersion:1,state:'available',reason:null,origin:'baseline',actorId:id(9),at:now},review:null,publishedOffers:[],publicationHasMore:false};
        dishes.push(current);}
      else {
        if(!dish)return{result:'NotFound'};
        const version=dish.menuContext?.state==='known'?dish.menuContext.aggregateVersion:dish.version;
        if(input.expectedVersion!==version)return{result:'Conflict'};
        if(input.command==='SubmitSourceDish'&&!dish.photo1MasterAssetId&&!dish.photo2MasterAssetId){
          return {result:'ValidationFailed',field:'photo1MasterAssetId',code:'required'};
        }
        if(input.command==='DisableSourceDish'||input.command==='EnableSourceDish'){
          const disabled=input.command==='DisableSourceDish';const readiness={eventId:crypto.randomUUID(),sourceVersionId:dish.sourceVersionId,aggregateVersion:version+1,state:disabled?'disabled':'available',reason:disabled?input.reason:null,origin:'restaurant',actorId:id(9),at:now};
          dish.availability=readiness.state as 'available'|'disabled';if(dish.menuContext?.state==='known')dish.menuContext={...dish.menuContext,aggregateVersion:version+1,readiness:readiness as any};
          const result={result:disabled?'Disabled':'Enabled',restaurantId,dishId:dish.dishId,version:version+1,readiness,incidentId:disabled?crypto.randomUUID():null,replayed:false};outcomes.set(input.intentId,result);refresh();return result;
        }
        const changes={...input.changes};
        if(changes.sourceDetails)changes.sourceDetails=mergeDetails(dish.sourceDetails,changes.sourceDetails);
        Object.assign(dish,changes,{version:version+1,sourceVersionId:crypto.randomUUID()});
        const submitted=input.command==='SubmitSourceDish';dish.state=submitted?'submitted':'draft';dish.submittedSourceVersionId=submitted?dish.sourceVersionId:null;
        if(dish.menuContext?.state==='known')dish.menuContext={...dish.menuContext,status:submitted?'Submitted':'Draft',aggregateVersion:version+1,currentSourceVersionId:dish.sourceVersionId,statusSourceVersionId:dish.sourceVersionId};
        if(dish.estimatedProfit)dish.estimatedProfit={...dish.estimatedProfit,sourceVersionId:dish.sourceVersionId};
      }
      dishCompletion(dish!);
      const result={result:input.command==='CreateSourceDish'?'Created':input.command==='SubmitSourceDish'?'Submitted':'Saved',dish:structuredClone(dish),replayed:false};outcomes.set(input.intentId,result);refresh();return result;
    }
    if(path==='/api/kitchen/tags'){
      if(init?.method==='POST'){const tag={tagId:crypto.randomUUID(),label:input.label};tags.push(tag);return{result:'Created',restaurantId,tag,replayed:false};}
      return{result:tags.length?'Found':'Empty',restaurantId,tags:tags.filter(t=>t.label.toLowerCase().includes((query.query??'').toLowerCase())),nextCursor:null,exactMatch:tags.find(t=>t.label===query.query)??null};
    }
    if(path==='/api/identity/directory')return directory;
    if(path==='/api/identity/preferences/locale'){personal.savedLocale=input.locale;directory={...directory,profile:{...directory.profile!,savedLocale:input.locale}};return{state:'Saved',savedLocale:input.locale,replayed:false};}
    if(path==='/api/identity/profile'){
      if(init?.method==='POST'){if(input.expectedVersion!==personal.version)return{result:'Conflict',currentVersion:personal.version};personal={...personal,...input.changes,version:personal.version+1};personal.displayName=[personal.givenName,personal.familyName].filter(Boolean).join(' ');return{result:'Saved',savedVersion:personal.version,replayed:false};}
      return{result:'Found',profile:personal};
    }
    if(path==='/auth/signout')return{redirectTo:url.origin+'/'};
    throw new Error(`Unimplemented local demo request: ${init?.method??'GET'} ${path}`);
  }
  return {today,get directory(){return directory;},overview,request,reset,refresh,subscribe:(fn:()=>void)=>{listeners.add(fn);return()=>{listeners.delete(fn);};},getRevision:()=>revision};
}
export function installLocalTransport(store:{request:(url:URL,init?:RequestInit)=>Promise<unknown>}) {
  const original=globalThis.fetch.bind(globalThis);
  const local:typeof fetch=async(resource,init)=>{
    const url=new URL(typeof resource==='string'?resource:resource instanceof URL?resource.href:resource.url,location.origin);
    if(url.origin!==location.origin)throw new Error('The Saavi demo only uses local data.');
    if(!url.pathname.startsWith('/api/')&&url.pathname!=='/auth/signout')return original(resource,init);
    if(init?.signal?.aborted)throw new DOMException('Aborted','AbortError');
    const value=await store.request(url,init);
    return Response.json(value);
  };
  globalThis.fetch=local;
  return()=>{if(globalThis.fetch===local)globalThis.fetch=original;};
}
