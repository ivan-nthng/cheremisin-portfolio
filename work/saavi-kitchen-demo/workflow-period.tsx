import {WorkspacePeriod, type WorkspacePeriodValue} from '@native/components/workspace/workspace-period';
import {adminSalesDemoCopy} from '@native/components/admin/admin-sales-demo-copy';
import {workflowSalesChoices, workflowSalesDay} from './workflow-sales';

export function WorkflowPeriod({value, onChange}: {value:WorkspacePeriodValue; onChange:(next:WorkspacePeriodValue)=>void}) {
  return <span data-workflow-period={value.preset ?? 'custom'}>
    <WorkspacePeriod locale="en" value={value} todayDay={workflowSalesDay} choices={workflowSalesChoices}
      copy={adminSalesDemoCopy.en} triggerPresentation="label" onChange={onChange} />
  </span>;
}
