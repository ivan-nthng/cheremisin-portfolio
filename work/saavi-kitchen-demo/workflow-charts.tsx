import {useId, useState} from 'react';
import {Card, CardHeader, Chart, Text, type ChartSelection, type ChartSeries} from '@saavi/design-system/components';
import {salesDemoRanges, salesDemoSnapshot} from '@native/components/admin/admin-sales-demo-data';
import {adminSalesDemoCopy} from '@native/components/admin/admin-sales-demo-copy';
import {WorkflowPeriod} from './workflow-period';
import {workflowSales, workflowSalesInitialPeriod} from './workflow-sales';

const weeks = salesDemoSnapshot(salesDemoRanges.month, 'all')!.weeks;
const formatDay = new Intl.DateTimeFormat('en-US', {month:'short', day:'numeric', timeZone:'UTC'});
const day = (value: string) => formatDay.format(new Date(`${value}T12:00:00Z`));

// Each entry is a fictional buyer with a completed purchase in that week.
// Overlapping ranges deliberately include repeat customers.
const buyerRanges = [[1, 34], [16, 56], [38, 73], [52, 96]] as const;
const seen = new Set<number>();
const buyers = buyerRanges.map(([first, last]) => {
  for (let id = first; id <= last; id++) seen.add(id);
  return seen.size;
});

const dishPaint = {
  'casa-chicken': {tone:'info', stroke:'solid'},
  'casa-lentil': {tone:'success', stroke:'dashed'},
  'casa-curry': {tone:'accent', stroke:'solid'},
} satisfies Record<string, Pick<ChartSeries,'tone' | 'stroke'>>;
const buyerSeries: ChartSeries[] = [{id:'buyers', label:'Unique buyers', tone:'info'}];
const weeklyBucket = (week: typeof weeks[number]) => ({id:week.start, label:day(week.start), dateLabel:`${day(week.start)}–${day(week.end)}`});
const buyerBuckets = weeks.map((week, index) => ({...weeklyBucket(week), values:{buyers:buyers[index]}}));

export function WorkflowChart({kind}: {kind: 'buyers' | 'dish-comparison'}) {
  const titleId = useId();
  const [selection, setSelection] = useState<ChartSelection | null>(null);
  const [period, setPeriod] = useState(workflowSalesInitialPeriod);
  const isBuyers = kind === 'buyers';
  const title = isBuyers ? 'Total buyers' : 'Portions sold by dish';
  const unit = isBuyers ? 'buyers' : 'portions';
  const sales = isBuyers ? null : workflowSales(period.range, 'casa');
  const series = isBuyers ? buyerSeries : (sales?.dishes ?? []).map(dish => ({
    id:dish.id, label:`${dish.name.en} · ${dish.portions}`, ...dishPaint[dish.id as keyof typeof dishPaint],
  }));
  const [visible, setVisible] = useState(() => isBuyers ? ['buyers'] : Object.keys(dishPaint));
  const max = isBuyers ? 100 : sales?.daily ? 4 : 20;
  const selectedBuyers = buyerBuckets.find(bucket => bucket.id === selection?.bucketId)?.values.buyers;
  const buckets = isBuyers ? buyerBuckets : (sales?.buckets ?? []).map(bucket => ({...weeklyBucket(bucket), values:bucket.values}));

  return <Card as="section" size="compact" layout="responsive" elevation="raised" data-workflow-metric={kind}>
    <div className="workflow-metric-heading"><CardHeader title={title} titleId={titleId} />
      {!isBuyers && <WorkflowPeriod value={period} onChange={value => {setPeriod(value); setSelection(null);}} />}
    </div>
    {isBuyers && <Text variant="heading-xl">{selectedBuyers ?? buyers.at(-1)}</Text>}
    <Chart externalTitleId={titleId} title={title} unit={unit} variant={isBuyers ? 'basic' : 'compare'} plot="line"
      buckets={buckets} series={series} domain={[0,max]} grid="horizontal" showUnit={false}
      formatValue={value => `${value} ${unit}`} valueLabels={[0,max/4,max/2,max*3/4,max].map(value => ({value,label:String(value)}))}
      labels={adminSalesDemoCopy.en.chart} visibleSeriesIds={visible} onVisibleSeriesChange={setVisible}
      selection={selection} onSelectionChange={setSelection} />
  </Card>;
}
