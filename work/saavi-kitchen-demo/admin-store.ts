import {acceptanceFixture} from '@native/components/workspace/restaurant-acceptance.fixture';
import {authoringDish, authoringId} from '@native/components/admin/admin-source-authoring.fixture';
import {salesDemoRanges, salesDemoSnapshot} from '@native/components/admin/admin-sales-demo-data';
import {parseRestaurantAcceptanceRequest, type RestaurantAcceptanceOutcome} from '@native/lib/kitchen/order-acceptance-contracts';
import {createAdminManualStore} from './admin-manual-store';

/** Local, disposable native DTOs. No request falls through to an operational service. */
export function createAdminStore(today:string) {
  const initial=()=>['Casa Verde','Sea Breeze'].map((displayName,index)=>({...acceptanceFixture(index+1),restaurantId:authoringId(index+1),displayName,
    schedule:{...acceptanceFixture(index+1).schedule,evaluatedAt:`${today}T12:00:00Z`,today:{date:today,intervals:[{start:'09:00',end:'20:00'}]}}}));
  let restaurants=initial();
  const manual=createAdminManualStore(today,()=>restaurants);
  const outcomes=new Map<string,RestaurantAcceptanceOutcome>();
  const capabilities={create:false,saveDraft:false,submit:false,photoUpload:false,disable:false,enable:false};
  const dishes=salesDemoSnapshot(salesDemoRanges.month,'all')!.dishes.map((dish,index)=>authoringDish(1,false,{
    restaurantId:authoringId(dish.restaurant==='Casa Verde'?1:2),dishId:authoringId(1000+index),name:dish.name.en,sourceLocale:'en',
    proposedPrice:{minorUnits:Math.round(dish.value/dish.portions*100),currency:'BRL',basis:'per-portion'},
  }));
  return {reset(){restaurants=initial();outcomes.clear();manual.reset();}, async request(url:URL,init?:RequestInit):Promise<unknown> {
    const body=typeof init?.body==='string'?JSON.parse(init.body):{};
    if(url.pathname==='/api/admin/restaurants') {
      const input=parseRestaurantAcceptanceRequest(body,true);
      if(!input)return{result:'NotAllowed'};
      if(input.operation==='list') {
        const view=input.view??{};
        const rows=restaurants.filter(row=>(!view.query||row.displayName.toLowerCase().includes(view.query.toLowerCase()))&&
          (view.filters?.scheduleState===undefined||view.filters.scheduleState.includes(row.schedule.state))&&
          (view.filters?.acceptingNewOrders===undefined||row.acceptingNewOrders===view.filters.acceptingNewOrders));
        if(view.sort?.length)rows.sort((a,b)=>a.displayName.localeCompare(b.displayName)*(view.sort![0].direction==='desc'?-1:1));
        return{result:'Found',items:structuredClone(rows),nextCursor:null};
      }
      const row=restaurants.find(row=>row.restaurantId===input.restaurantId);
      if(!row)return{result:'NotFound'};
      if(input.operation==='read')return{result:'Found',restaurant:structuredClone(row)};
      if(input.operation==='outcome')return outcomes.has(input.intentId)?{result:'Found',outcome:outcomes.get(input.intentId)}:{result:'Absent'};
      const prior=outcomes.get(input.intentId);if(prior)return{...prior,replayed:true};
      if(input.expectedVersion!==row.restaurantVersion)return{result:'Conflict'};
      row.acceptingNewOrders=input.acceptingNewOrders;row.restaurantVersion++;row.legalActions={start:!row.acceptingNewOrders,stop:row.acceptingNewOrders};
      const result:RestaurantAcceptanceOutcome={result:'Saved',restaurantId:row.restaurantId,restaurantVersion:row.restaurantVersion,acceptingNewOrders:row.acceptingNewOrders,replayed:false};
      outcomes.set(input.intentId,result);return result;
    }
    if(url.pathname==='/api/admin/dishes'&&init?.method!=='POST') {
      const restaurantId=url.searchParams.get('restaurantId'),dishId=url.searchParams.get('dishId');
      const rows=dishes.filter(dish=>dish.restaurantId===restaurantId);
      if(dishId){const dish=rows.find(dish=>dish.dishId===dishId);return dish?{result:'Found',dish:structuredClone(dish),capabilities}:{result:'NotFound'};}
      return{result:rows.length?'Found':'Empty',dishes:structuredClone(rows),capabilities,nextCursor:null};
    }
    return manual.request(url,init);
  }};
}
