import React, {useCallback, useEffect, useRef, useState, useSyncExternalStore} from 'react';
import {createRoot} from 'react-dom/client';
import {KitchenOverview} from '@native/components/kitchen/kitchen-overview';
import {KitchenMenu} from '@native/components/kitchen/kitchen-menu';
import {AdminOverview} from '@native/components/admin/admin-overview';
import {AdminProductionWorkspace} from '@native/components/admin/admin-production-workspace';
import {AdminOrderDialog} from '@native/components/admin/admin-order-dialog';
import {AdminSalesDemo} from '@native/components/admin/admin-sales-demo';
import {RestaurantDeliverySettings} from '@native/components/workspace/restaurant-delivery-settings';
import {presetRange, type PeriodChoice} from '@native/components/kitchen/overview-model';
import {Button} from '@saavi/design-system/components';
import DemoShell from '@portfolio/components/portfolio/demo/DemoShell';
import '@saavi/design-system/tokens.css';
import '@saavi/design-system/base.css';
import './standalone.css';
import {createKitchenStore, installLocalTransport, restaurantId} from './store';
import {isKitchenCaseOrigin, kitchenBridge, kitchenCasePath, isSaaviDemoRole, isSaaviClip, saaviDemoScenarios, type SaaviDemoRole} from '@portfolio/lib/portfolio/client/saavi-kitchen-host';
import {GuidedKitchen} from './guided';
import {createAdminStore} from './admin-store';
import {demoProductionOrderId} from './admin-manual-store';
import {DemoRoleContext} from './roles';
import {WorkflowChart} from './workflow-charts';

const store = createKitchenStore();
const adminStore=createAdminStore(store.today);
installLocalTransport({request:(url,init)=>url.pathname.startsWith('/api/admin/')||['/api/identity/access/management','/api/identity/preferences/table'].includes(url.pathname)?adminStore.request(url,init):store.request(url,init)});
const requestedOrigin = new URLSearchParams(location.search).get('portfolioOrigin');
const portfolioOrigin = requestedOrigin && isKitchenCaseOrigin(requestedOrigin, location.origin) && window.parent !== window ? requestedOrigin : null;
const mode = new URLSearchParams(location.search).get('mode');
const presentation = mode === 'guided' || mode === 'poster';
const requestedRole=new URLSearchParams(location.search).get('role');
const requestedClip = new URLSearchParams(location.search).get('clip');
const clip = presentation && isSaaviClip(requestedClip) ? requestedClip : undefined;
const initialRole: SaaviDemoRole = isSaaviDemoRole(requestedRole) ? requestedRole : 'kitchen';
function returnToCase() {
  if (portfolioOrigin) window.parent.postMessage({type:kitchenBridge.close}, portfolioOrigin);
  else location.assign(location.origin + kitchenCasePath);
}
function Demo() {
  useEffect(() => {
    if (!portfolioOrigin || presentation) return;
    window.parent.postMessage({type:kitchenBridge.ready}, portfolioOrigin);
    // Native popovers/dialogs consume Escape first; only a bare Escape exits the demo.
    const escape = (event:KeyboardEvent) => {
      if (event.key !== 'Escape' || event.defaultPrevented) return;
      const overlayOpen = [...document.querySelectorAll('dialog[open],[role="dialog"],[role="menu"],[role="listbox"]')].some(node => node.getClientRects().length > 0);
      if (!overlayOpen) returnToCase();
    };
    window.addEventListener('keydown',escape);
    return () => window.removeEventListener('keydown',escape);
  }, []);
  useSyncExternalStore(store.subscribe, store.getRevision);
  const [restart, setRestart] = useState(0);
  const [role,setRole]=useState(initialRole);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [period, setPeriod] = useState<PeriodChoice>({preset:'current-week', range:presetRange('current-week', store.today)});
  const reset = useCallback(() => { store.reset(); adminStore.reset(); setPeriod({preset:'current-week', range:presetRange('current-week', store.today)}); setRestart(value=>value+1); }, []);
  return <DemoRoleContext.Provider value={role}><div className="standalone" data-saavi-color-scheme={theme} data-presentation={presentation || undefined} data-guided={mode === 'guided' || undefined} style={{colorScheme:theme}}>
    <DemoShell presentation={presentation} label="Saavi demo" theme={theme} onTheme={setTheme} onRestart={reset} onReturn={returnToCase}
      scenarios={saaviDemoScenarios} scenario={role} onScenario={setRole}>
      {role==='admin'?<AdminOverview key={`admin-${restart}`} initialLocale="en" directory={store.directory} hubUrl={location.origin+'/'} todayDay={store.today} environment="local" expectedHubOrigin={null}/>:
      <KitchenOverview key={`kitchen-${restart}`} initialLocale="en" directory={store.directory} hubUrl={location.origin + '/'}
        model={store.overview(period.range)} productionReady salesReady salesDailyReady ordersReadVersion="2"
        overviewPeriod={{value:period, todayDay:store.today,pending:false,onChange:setPeriod}}
        onProfileConfirmed={store.refresh} onDishSaved={store.refresh} reminderScope="portfolio-local-demo"/>}
    </DemoShell>
    {mode === 'guided' && <GuidedKitchen key={role} role={role} onReset={reset} portfolioOrigin={portfolioOrigin} />}
  </div></DemoRoleContext.Provider>;
}

const detailOrder = demoProductionOrderId(1);
const ignoreDenied = () => {};

function OrderDetailClip({mobile}: {mobile: boolean}) {
  const [open, setOpen] = useState(false);
  const opener = useRef<HTMLButtonElement>(null);
  return <>
    <Button ref={opener} variant="soft" intent="neutral" trailingIcon="arrows/compact/right" aria-haspopup="dialog"
      data-order-opener="" onClick={() => setOpen(true)}>Order {detailOrder.slice(0, 8)}</Button>
    {open && <AdminOrderDialog orderId={detailOrder} locale="en" mobile={mobile} purchasedDetails
      returnFocusRef={opener} onClose={() => setOpen(false)} onDenied={ignoreDenied} />}
  </>;
}

function WorkflowClip({name}: {name: NonNullable<typeof clip>}) {
  const [visit, setVisit] = useState(0);
  const reset = useCallback(() => {
    if (name === 'calendar') store.reset();
    setVisit(value => value + 1);
  }, [name]);
  const mobile = innerWidth < 640;
  return <div className="standalone" data-saavi-color-scheme="light" data-guided data-workflow-clip={name} data-workflow-poster={mode === 'poster' || undefined} style={{colorScheme:'light'}}>
    <div className="workflow-clip-content" key={visit}>
      {name === 'dish' && <KitchenMenu restaurantId={restaurantId} restaurantName="Casa Verde" locale="en" active />}
      {name === 'calendar' && <RestaurantDeliverySettings restaurantId={restaurantId} locale="en" surface="kitchen" mobile={mobile} onBack={() => {}} />}
      {name === 'analytics' && <AdminSalesDemo locale="en" mobile={mobile} embedded />}
      {(name === 'buyers' || name === 'dish-comparison') && <WorkflowChart kind={name} />}
      {name === 'production' && <AdminProductionWorkspace locale="en" mobile={mobile} todayDay={store.today} />}
      {name === 'order-detail' && <OrderDetailClip mobile={mobile} />}
    </div>
    <GuidedKitchen clip={name} onReset={reset} portfolioOrigin={portfolioOrigin} />
  </div>;
}

createRoot(document.getElementById('root')!).render(clip ? <WorkflowClip name={clip} /> : <Demo />);
