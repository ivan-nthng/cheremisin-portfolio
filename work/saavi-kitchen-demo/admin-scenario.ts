import {adminMoneyFixture} from '@native/components/admin/admin-money.fixture';
import {adminUsersFixture} from '@native/components/admin/admin-users.fixture';
import {attentionOverview} from '@native/components/admin/admin-attention.fixture';
import {knownOverviewCount as count} from '@native/components/admin/admin-operations.fixture';
import {adminOfferFixture,adminReviewFixtureTransport,acceptedAdminSource} from '@native/components/admin/admin-review.fixture';
import {productionId as id} from '@native/components/admin/admin-production.fixture';
import {parseAdminMoneyRequest} from '@native/lib/admin/monetary-contract';
import {parseAdminOrdersRequest,type AdminCustomerOrder} from '@native/lib/operations/contracts';
import {parseAttentionOrdersRequest,parseProductionIssuesRequest,type AttentionOrder,type ProductionIssue} from '@native/lib/admin/attention-contract';
import type {AdminProductionWork} from '@native/lib/admin/production-contract';
import type {AdminOffer,AdminOfferOrderSaved} from '@native/lib/admin/contracts';

/** One local scenario owns the read models shared by Overview, Offers and Orders.
 * Native codecs remain the boundary. No operational source or storage is used. */
export function createAdminScenario(today:string, production:()=>AdminProductionWork[], currentOrders:()=>AdminCustomerOrder[]) {
  const day=(offset:number)=>new Date(Date.parse(`${today}T12:00:00Z`)+offset*86400000).toISOString().slice(0,10);
  const asOf=`${today}T12:00:00.000000Z`;
  const dates=(offset:number)=>({plannedDate:day(offset),startsAt:`${day(offset)}T15:00:00.000000Z`,endsAt:`${day(offset)}T19:00:00.000000Z`});
  const recipe=(title:string|null)=>{
    if(title?.includes('fish'))return{description:'Baked white fish with roasted potatoes, broccoli and a lemon-herb dressing.',ingredients:'White fish, potatoes, broccoli, lemon, olive oil',photo:2};
    if(title?.includes('pasta'))return{description:'Durum wheat pasta in a slow-cooked tomato sauce with fresh basil and parmesan.',ingredients:'Wheat pasta, tomatoes, basil, parmesan, olive oil',photo:5};
    if(title?.includes('risotto'))return{description:'Creamy arborio rice with roasted mushrooms, vegetable stock and parmesan.',ingredients:'Arborio rice, mushrooms, vegetable stock, parmesan',photo:4};
    if(title?.includes('lentils'))return{description:'Roasted pumpkin and green lentils with seasonal greens and a citrus dressing.',ingredients:'Pumpkin, green lentils, spinach, lemon, olive oil',photo:1};
    return{description:'Tender chicken with steamed rice, broccoli and a light soy-ginger sauce.',ingredients:'Chicken, rice, broccoli, soy sauce, ginger',photo:title?.includes('rice')?3:0};
  };
  const initialOffers=()=>production().flatMap(row=>row.items.map(item=>({
    restaurantName:row.restaurant.displayName,
    offer:{...adminOfferFixture('published'),restaurantId:row.restaurant.restaurantId,offerId:item.offerId,offerVersionId:item.offerVersionId,publishedOfferVersionId:item.offerVersionId,
      title:item.title,titleEn:item.title,titlePt:null,description:recipe(item.title).description,descriptionEn:recipe(item.title).description,descriptionPt:null,
      serviceZoneVersionId:id(9700),deliveryConfigVersionId:id(9701),retailPrice:{minorUnits:2400,currency:'BRL',quantity:1,unit:'portion'},composition:[],portionPackageCount:item.portionPackageCount,
      photos:[{assetId:id(300+recipe(item.title).photo),offerVersionId:item.offerVersionId,url:`/api/admin/offers/media?offerId=${item.offerId}&offerVersionId=${item.offerVersionId}&assetId=${id(300+recipe(item.title).photo)}`}],
    } as AdminOffer,
  })));
  type OfferEntry={offer:AdminOffer;restaurantName:string|null};
  let offers=new Map<string,OfferEntry>(), transports=new Map<string,ReturnType<typeof adminReviewFixtureTransport>>(), order:string[]=[], revision=1;
  const sourceOffers=new Map<string,OfferEntry>();
  const purchasedOffers=new Map<string,AdminOffer>();
  const reorderOutcomes=new Map<string,AdminOfferOrderSaved>();
  function upsert(entry:OfferEntry){if(!offers.has(entry.offer.offerId))order.push(entry.offer.offerId);offers.set(entry.offer.offerId,structuredClone(entry));transports.set(entry.offer.offerId,adminReviewFixtureTransport(1,entry.offer));}
  function reset(){
    offers.clear();transports.clear();sourceOffers.clear();purchasedOffers.clear();order=[];revision=1;reorderOutcomes.clear();
    for(const entry of initialOffers())upsert(entry);
    for(const [i,title] of ['Mushroom risotto','Roasted pumpkin & lentils'].entries()){
      const first=initialOffers()[0],offerId=id(2100+i),offerVersionId=id(3100+i),assetId=id(304-i*3);
      upsert({restaurantName:'Casa Verde',offer:{...first.offer,offerId,offerVersionId,publishedOfferVersionId:null,state:'draft',title,titleEn:title,description:recipe(title).description,descriptionEn:recipe(title).description,retailPrice:{minorUnits:2800+i*400,currency:'BRL',quantity:1,unit:'portion'},
        photos:[{assetId,offerVersionId,url:`/api/admin/offers/media?offerId=${offerId}&offerVersionId=${offerVersionId}&assetId=${assetId}`} ]}});
    }
    for(const [index,entry] of [...offers.values()].entries()){
      entry.offer.composition=[{restaurantId:entry.offer.restaurantId,dishId:id(10000+index),submittedSourceVersionId:id(10100+index),reviewId:id(10200+index),agreedTermId:id(10300+index),quantity:1,unit:'portion'}];
      upsert(entry);sourceOffers.set(entry.offer.offerId,structuredClone(entry));
      if(entry.offer.publishedOfferVersionId)purchasedOffers.set(entry.offer.offerVersionId,structuredClone(entry.offer));
    }
  }
  reset();
  function orders():AdminCustomerOrder[]{
    const active=currentOrders().map((row,index)=>({...row,confirmedAt:`${day(-4-index)}T10:30:00.000000Z`,payment:{...row.payment,paymentId:id(8000+index),state:index===1?'succeeded' as const:'pending' as const},
      deliveryProgress:{total:1,delivered:0,issues:0,complete:false}}));
    // Ten delivered orders, one per day; two newly confirmed orders awaiting work.
    const history=Array.from({length:12},(_,index)=>{
      const base=structuredClone(active[index%active.length]),pending=index>=10,offset=pending?index-9:-index-1;
      const orderId=id(9000+index).replace('41500000',(0x8a73c100+index*71).toString(16)),planId=id(9100+index),work=base.plans[0].work!;
      return {...base,orderId,confirmedAt:`${day(pending?0:offset-2)}T09:${String(index+10).padStart(2,'0')}:00.000000Z`,payment:{...base.payment,paymentId:id(9200+index),state:pending?'pending' as const:'succeeded' as const},
        deliveryProgress:{total:1,delivered:pending?0:1,issues:0,complete:!pending},plans:[{...base.plans[0],...dates(offset),planId,
          pendingReason:pending?'WorkNotMaterialized' as const:null,work:pending?null:{...work,fulfillmentSegmentId:id(9300+index),productionSegmentId:id(9400+index),deliveryTaskId:id(9500+index),productionState:'ready-for-pickup' as const,pendingIssue:null,
            deliveryProgress:{taskId:id(9500+index),version:1,state:'delivered' as const},currentPhase:{domain:'delivery' as const,state:'delivered' as const},phaseConflict:false}}]};
    });
    return [...active,...history].sort((a,b)=>b.confirmedAt.localeCompare(a.confirmedAt)||b.orderId.localeCompare(a.orderId));
  }
  const awaiting=(row:AdminCustomerOrder)=>row.plans.some(plan=>!plan.work?.assignment);
  const cash=(row:AdminCustomerOrder)=>row.payment.state!=='succeeded';
  const attentionOrder=(row:AdminCustomerOrder):AttentionOrder=>({...row,paymentTerms:'cod',deliveryProgress:row.deliveryProgress??null,plans:row.plans.map(plan=>({...plan,
    items:plan.items.map(({titlePt:_pt,titleEn:_en,cataloguePhoto:_photo,...item})=>({...item,canOpenPurchased:true,photo:null})),
    work:plan.work?{...plan.work,pendingIssue:plan.work.pendingIssue?(({note:_note,...issue})=>issue)(plan.work.pendingIssue):null}:null}))});
  const incidents=():ProductionIssue[]=>production().flatMap(row=>row.pendingIssue?[{incidentId:row.pendingIssue.incidentId,version:row.pendingIssue.incidentVersion,state:'open',createdAt:asOf,
    links:[{reportId:row.pendingIssue.reportId,reportedAt:asOf,reasonCode:row.pendingIssue.reasonCode,affectedQuantity:row.pendingIssue.affectedQuantity,unit:'portion',orderId:row.orderId,fulfillmentSegmentId:row.fulfillmentSegmentId,
      restaurant:{restaurantId:row.restaurant.restaurantId,displayName:row.restaurant.displayName,logoUrl:null},promise:row.promise}]}]:[]);
  return {reset,upsert,source(body:{operation?:string;dishId?:string;submittedSourceVersionId?:string}){
    if(body.operation!=='detail')return;
    const entry=[...sourceOffers.values()].find(entry=>entry.offer.composition.some(binding=>binding.dishId===body.dishId&&binding.submittedSourceVersionId===body.submittedSourceVersionId));
    if(!entry||!body.dishId?.startsWith('41500000'))return;
    const source=acceptedAdminSource(),offer=entry.offer,binding=offer.composition[0];
    const identity={restaurantId:offer.restaurantId,dishId:binding.dishId,submittedSourceVersionId:binding.submittedSourceVersionId};
    return{...source,...identity,restaurantName:entry.restaurantName,submittedAt:`${day(-22)}T12:00:00.000000Z`,source:{...source.source,...identity,sourceVersionId:binding.submittedSourceVersionId,name:offer.title!,description:offer.description,sourceLocale:'en',portionPackageCount:offer.portionPackageCount,
      ingredientDeclaration:{status:'declared',text:recipe(offer.title).ingredients},
      proposedPrice:{minorUnits:offer.retailPrice!.minorUnits,currency:'BRL',basis:'per-portion'}},
      governance:{...source.governance,review:{...source.governance.review!,reviewId:binding.reviewId},agreedTerms:{...source.governance.agreedTerms!,agreedTermId:binding.agreedTermId,reviewId:binding.reviewId},effectiveReceipt:{...source.governance.effectiveReceipt!,agreedTermId:binding.agreedTermId,reviewId:binding.reviewId}}};
  },async request(path:string,body:any,pendingReviews:number):Promise<unknown|undefined>{
    if(path.startsWith('/api/admin/overview')){
      const range=parseAdminMoneyRequest(body);if(!range)return{result:'NotAllowed'};
      const all=orders(),cohort=all.filter(row=>row.confirmedAt.slice(0,10)>=range.startDay&&row.confirmedAt.slice(0,10)<=range.endDay);
      if(path==='/api/admin/overview')return{result:'Found',summary:{...adminMoneyFixture(range),asOf,currencies:[{currency:'BRL',confirmedOrderValueMinor:cohort.reduce((sum,row)=>sum+row.amountMinor,0),
        cashReceivedMinor:cohort.filter(row=>!cash(row)).reduce((sum,row)=>sum+row.amountMinor,0),unpaidCohortMinor:cohort.filter(cash).reduce((sum,row)=>sum+row.amountMinor,0)}]}};
      if(path==='/api/admin/overview/users'){
        const first=Date.parse(`${range.startDay}T12:00:00Z`),through=range.endDay<today?range.endDay:today,days=Math.max(0,Math.round((Date.parse(`${through}T12:00:00Z`)-first)/86400000)+1);
        let total=0;const points=Array.from({length:days},(_,i)=>{const date=new Date(first+i*86400000).toISOString().slice(0,10);total+=date>=day(-30)?2+new Date(first+i*86400000).getUTCDay()%4:0;return{day:date,value:total};});
        return{result:'Found',summary:{...adminUsersFixture(range),asOf,total:248,newRegistrations:total,series:{state:'ready',metric:'registration-additions',points,partialDay:range.startDay<=today&&range.endDay>=today?today:null}}};
      }
      if(path==='/api/admin/overview/operations'){
        const summary=attentionOverview(range);summary.asOf=asOf;
        summary.activity={buyersTotal:count(all.length),newBuyers:count(cohort.length),newOrders:count(cohort.length),completedOrders:count(cohort.filter(row=>row.deliveryProgress?.complete).length),inProgress:count(all.filter(row=>!row.deliveryProgress?.complete).length)};
        const values={'submitted-pending':pendingReviews,'orders-awaiting-assignment':all.filter(awaiting).length,'cash-attention':all.filter(cash).length,'production-problems':incidents().length,'late-deliveries':production().filter(row=>row.delivery&&row.promise.plannedDate<today).length};
        for(const key of Object.keys(values) as (keyof typeof values)[])summary.attention[key].count=count(values[key]);
        return{result:'Found',summary};
      }
    }
    if(path==='/api/admin/customer-orders'){
      const input=parseAdminOrdersRequest(body);if(!input)return{result:'NotAllowed'};
      if(input.operation==='read'){const order=orders().find(row=>row.orderId===input.orderId);return order?{result:'Found',order}:{result:'NotFound'};}
      const view=input.view,filters=view?.filters;
      let rows=orders().filter(row=>(!view?.query||row.orderId.includes(view.query.toLowerCase()))&&(!filters?.paymentState?.length||filters.paymentState.includes(row.payment.state))&&
        (filters?.deliveryComplete===undefined||row.deliveryProgress?.complete===filters.deliveryComplete)&&(filters?.hasDeliveryIssues===undefined||!!row.deliveryProgress?.issues===filters.hasDeliveryIssues)&&(filters?.deliveryKnown===undefined||!!row.deliveryProgress===filters.deliveryKnown));
      if(view?.sort?.length)rows.sort((a,b)=>{for(const {field,direction}of view.sort!){const result=field==='amountMinor'?a[field]-b[field]:a[field].localeCompare(b[field]);if(result)return direction==='desc'?-result:result;}return b.orderId.localeCompare(a.orderId);});
      return{result:'Found',orders:rows.slice(0,input.limit??20),nextCursor:null};
    }
    if(path==='/api/admin/attention/orders'){
      const input=parseAttentionOrdersRequest(body);if(!input)return{result:'NotAllowed'};
      if(input.operation==='read'){const row=orders().find(row=>row.orderId===input.orderId);return row?{result:'Found',order:attentionOrder(row),asOf}:{result:'NotFound'};}
      return{result:'Found',orders:orders().filter(input.attention==='cash-attention'?cash:awaiting).slice(0,input.limit??20).map(attentionOrder),nextCursor:null,asOf,coverage:input.attention==='cash-attention'?{state:'complete',reason:null}:{state:'partial',reason:'work-materialization-missing'}};
    }
    if(path==='/api/admin/production/issues'){
      const input=parseProductionIssuesRequest(body);if(!input)return{result:'NotAllowed'};
      if(input.operation==='read'){const incident=incidents().find(row=>row.incidentId===input.incidentId);return incident?{result:'Found',incident,asOf}:{result:'NotFound'};}
      return{result:'Found',incidents:incidents(),nextCursor:null,asOf};
    }
    if(path==='/api/admin/offers/order'){
      if(body.operation==='read')return{result:'Found',revision,items:order.map(key=>({...offers.get(key)!,createdAt:`${day(-21)}T12:00:00.000000Z`}))};
      if(body.operation==='outcome'){const outcome=reorderOutcomes.get(body.intentId);return outcome?{result:'Found',outcome:{...outcome,replayed:true}}:{result:'Absent'};}
      const previous=reorderOutcomes.get(body.intentId);if(previous)return{...previous,replayed:true};
      if(body.expectedRevision!==revision)return{result:'Conflict'};
      if(!Array.isArray(body.offerIds)||body.offerIds.length!==order.length||new Set(body.offerIds).size!==order.length||body.offerIds.some((key:string)=>!offers.has(key)))return{result:'ValidationFailed',field:'input',code:'invalid'};
      if(body.offerIds.every((key:string,index:number)=>key===order[index]))return{result:'Unchanged',revision,offerIds:order};
      order=[...body.offerIds];revision++;const result:AdminOfferOrderSaved={result:'Saved',revision,offerIds:order,replayed:false};reorderOutcomes.set(body.intentId,result);return result;
    }
    if(path==='/api/admin/offers/list')return{result:'Found',items:order.map(key=>({...offers.get(key)!,createdAt:`${day(-21)}T12:00:00.000000Z`})),cursor:null};
    if(['/api/admin/offers/draft','/api/admin/offers/publish','/api/admin/offers/review'].includes(path)){
      const entry=offers.get(body.offerId);if(!entry)return{result:'NotFound'};
      if(body.operation==='read'&&body.offerVersionId){const original=purchasedOffers.get(body.offerVersionId);return original?.offerId===body.offerId?{result:'Found',offer:structuredClone(original)}:{result:'NotFound'};}
      if(body.operation!=='read'&&body.expectedVersion!==entry.offer.version)return{result:'Conflict'};
      const transport=transports.get(body.offerId)!,result=await(await transport(path,{method:'POST',body:JSON.stringify(body)})).json();
      const updated=await(await transport('/api/admin/offers/draft',{body:JSON.stringify({operation:'read',offerId:body.offerId})})).json();
      offers.set(body.offerId,{...entry,offer:updated.offer});return result;
    }
  }};
}
