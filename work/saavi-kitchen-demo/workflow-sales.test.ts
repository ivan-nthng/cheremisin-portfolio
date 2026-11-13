import {describe, expect, it} from 'vitest';
import {workflowSales, workflowSalesChoices} from './workflow-sales';

describe('Saavi case chart fixture', () => {
  it('aggregates the same purchases by day and by week', () => {
    const [week, month] = workflowSalesChoices;
    const daily = workflowSales(week.range, 'casa')!;
    const weekly = workflowSales(month.range, 'casa')!;

    expect(daily.daily).toBe(true);
    expect(weekly.daily).toBe(false);
    expect(daily.buckets).toHaveLength(6);
    expect(weekly.buckets).toHaveLength(5);
    expect(weekly.buckets.at(-1)).toMatchObject({portions:daily.portions, value:daily.value});
    expect(daily.dishes.map(dish => dish.portions)).toEqual([16, 10, 8]);
    expect(weekly.dishes.map(dish => dish.portions)).toEqual([58, 38, 24]);
    expect(weekly.value).toBe(2400);
    expect(workflowSales(month.range, 'all')?.value).toBe(3840);
  });
});
