import {createContext, useContext} from 'react';
import {Text} from '@saavi/design-system/components';
import type {WorkspaceServices as NativeServices} from '@native/components/workspace/workspace-services';
import type {SaaviDemoRole} from '@portfolio/lib/portfolio/client/saavi-kitchen-host';

export const DemoRoleContext=createContext<SaaviDemoRole>('kitchen');

/** Show the native workspace identity. DemoShell owns scenario selection. */
export function WorkspaceServices({compact=false}:Parameters<typeof NativeServices>[0]) {
  const role=useContext(DemoRoleContext);
  const label=role==='kitchen'?'Kitchen':'Admin';
  return <div className="demo-workspace-identity" aria-label={label}>
    <img src={`/demo-role-${role}.png`} alt="" width={20} height={20} />
    {!compact && <Text as="span" variant="heading-sm">{label}</Text>}
  </div>;
}
