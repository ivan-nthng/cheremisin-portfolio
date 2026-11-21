// KitchenOverview does not use routing. The unmounted CreateRestaurant branch
// imports this optional seam; it must never navigate to a real Saavi service.
export function useRouter() {
  return {refresh:()=>location.reload(),push:(href:string)=>localNavigate(href),replace:(href:string)=>localNavigate(href)};
}
function localNavigate(href:string) {
  const url=new URL(href,location.origin);
  if(url.origin!==location.origin)throw new Error('External navigation is outside the standalone demo.');
  location.assign(url);
}
