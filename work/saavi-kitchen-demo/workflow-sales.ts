import {salesDemoRanges, salesDemoSnapshot, type SalesDemoScope} from '@native/components/admin/admin-sales-demo-data';
import type {WorkspacePeriodValue} from '@native/components/workspace/workspace-period';

type Range = WorkspacePeriodValue['range'];
const month: Range = {startDay:'2026-10-01', endDay:'2026-10-31'};
const week: Range = {startDay:'2026-10-26', endDay:month.endDay};
export const workflowSalesDay = month.endDay;
export const workflowSalesInitialPeriod: WorkspacePeriodValue = {preset:'week', range:week};
export const workflowSalesChoices = [
  {id:'week', label:'This week', range:week},
  {id:'month', label:'This month', range:month},
] as const;

const nativeDishes = salesDemoSnapshot(salesDemoRanges.month, 'all')!.dishes;
const weeklyPortions = [
  [5, 8, 18, 11, 16], [4, 6, 10, 10, 10], [3, 5, 10, 10, 10],
  [2, 3, 4, 7, 8], [3, 3, 6, 6, 6], [1, 3, 4, 4, 4],
] as const;
const finalWeek = [
  [2,4,1,3,2,4], [1,3,2,0,3,1], [2,1,1,3,1,2],
  [1,0,2,2,0,3], [0,2,1,1,2,0], [1,0,1,0,1,1],
] as const;
const starts = [1, 5, 12, 19, 26];
const dayId = (day: number) => `2026-10-${String(day).padStart(2,'0')}`;
const days = Array.from({length:31}, (_, index) => {
  const day = index + 1;
  const bucket = starts.findLastIndex(start => day >= start);
  const dayInBucket = day - starts[bucket];
  const length = (starts[bucket + 1] ?? 32) - starts[bucket];
  return {
    id:dayId(day),
    bucket,
    portions:nativeDishes.map((_, dish) => {
      if (bucket === 4) return finalWeek[dish][dayInBucket];
      const total = weeklyPortions[dish][bucket];
      const rank = (dayInBucket + dish + bucket) % length;
      return Math.floor(total / length) + Number(rank < total % length);
    }),
  };
});

export function workflowSales(range: Range, scope: SalesDemoScope) {
  const inRange = days.filter(day => day.id >= range.startDay && day.id <= range.endDay);
  if (!inRange.length) return null;
  const daily = inRange.length <= 7;
  const groups = daily ? inRange.map(day => [day]) : starts.map((_, index) => inRange.filter(day => day.bucket === index)).filter(group => group.length);
  const relevant = nativeDishes.filter(dish => scope === 'all' || dish.id.startsWith(scope));
  const buckets = groups.map(group => {
    const values = Object.fromEntries(relevant.map(dish => {
      const index = nativeDishes.indexOf(dish);
      return [dish.id, group.reduce((sum, day) => sum + day.portions[index], 0)];
    }));
    const portions = Object.values(values).reduce((sum, count) => sum + count, 0);
    const value = relevant.reduce((sum, dish) => sum + values[dish.id] * (dish.value / dish.portions), 0);
    return {start:group[0].id, end:group.at(-1)!.id, values, portions, value};
  });
  return {
    daily,
    buckets,
    portions:buckets.reduce((sum, bucket) => sum + bucket.portions, 0),
    value:buckets.reduce((sum, bucket) => sum + bucket.value, 0),
    dishes:relevant.map(dish => ({...dish, portions:buckets.reduce((sum, bucket) => sum + bucket.values[dish.id],0)})),
  };
}
