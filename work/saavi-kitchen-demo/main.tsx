import React, {useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore} from 'react';
import {createRoot} from 'react-dom/client';
import {KitchenOverview} from '@native/components/kitchen/kitchen-overview';
import {KitchenMenu} from '@native/components/kitchen/kitchen-menu';
import {AdminOverview} from '@native/components/admin/admin-overview';
import {AdminProductionWorkspace} from '@native/components/admin/admin-production-workspace';
import {AdminOrderDialog} from '@native/components/admin/admin-order-dialog';
import {AdminSalesDemo} from '@native/components/admin/admin-sales-demo';
import {RestaurantDeliverySettings} from '@native/components/workspace/restaurant-delivery-settings';
import {presetRange, type PeriodChoice} from '@native/components/kitchen/overview-model';
import {defaultOverviewView} from '@native/components/kitchen/overview-view-preference';
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
const hosted = mode === 'showcase' && portfolioOrigin === location.origin;
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
  useSyncExternalStore(store.subscribe, store.getRevision);
  const [restart, setRestart] = useState(0);
  const [role,setRole]=useState(initialRole);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [period, setPeriod] = useState<PeriodChoice>(() => defaultOverviewView(store.today));
  const reset = useCallback(() => { store.reset(); adminStore.reset(); setPeriod(defaultOverviewView(store.today)); setRestart(value=>value+1); }, []);
  const [hostMode, setHostMode] = useState<'waiting' | 'guided' | 'manual'>('waiting');
  const [shareHref, setShareHref] = useState<string>();
  const lastMode = useRef(hostMode);
  const manual = hosted ? hostMode === 'manual' : !presentation;
  const guided = hosted ? hostMode === 'guided' : mode === 'guided';

  useLayoutEffect(() => {
    if (!hosted || manual) return;
    // Native focus calls run inside the iframe's own document. Modal dialogs
    // escape inherited inertness, so mark each one before showModal focuses it.
    const root = document.documentElement;
    root.inert = true;
    function keepDialogPassive(event: Event) {
      const dialog = event.target;
      if (!(dialog instanceof HTMLDialogElement) || dialog.open || dialog.inert) return;
      dialog.inert = true;
      dialog.dataset.showcasePassive = '';
    }
    document.addEventListener('beforetoggle', keepDialogPassive, true);
    return () => {
      document.removeEventListener('beforetoggle', keepDialogPassive, true);
      root.inert = false;
      for (const dialog of document.querySelectorAll<HTMLDialogElement>('dialog[data-showcase-passive]')) {
        dialog.inert = false;
        delete dialog.dataset.showcasePassive;
      }
    };
  }, [manual]);

  useEffect(() => {
    if (!hosted || !portfolioOrigin) return;
    function receive(event: MessageEvent) {
      if (event.origin !== portfolioOrigin || event.source !== parent || event.data?.type !== kitchenBridge.mode) return;
      const next = event.data.mode;
      if (next !== 'guided' && next !== 'manual' || next === lastMode.current) return;
      if (next === 'guided' && lastMode.current === 'manual') {
        setRole('kitchen');
        setTheme('light');
        reset();
      }
      lastMode.current = next;
      setShareHref(event.data.shareHref);
      setHostMode(next);
    }
    window.addEventListener('message', receive);
    parent.postMessage({type:kitchenBridge.connected}, portfolioOrigin);
    return () => window.removeEventListener('message', receive);
  }, [reset]);

  // React has disposed the authored Stage and aborted its Act before this effect.
  useEffect(() => {
    if (!portfolioOrigin || !manual) return;
    parent.postMessage({type:hosted ? kitchenBridge.manual : kitchenBridge.ready}, portfolioOrigin);
    // A native dialog or menu may disappear while Escape bubbles. Remember who
    // owned the event, then let the sidebar and other controls handle it first.
    let nestedEscape: KeyboardEvent | undefined;
    function rememberOverlay(event: KeyboardEvent) {
      if (event.key !== 'Escape') return;
      const overlays = document.querySelectorAll('dialog[open],[role="dialog"],[role="menu"],[role="listbox"]');
      nestedEscape = Array.from(overlays).some(node => node.getClientRects().length) ? event : undefined;
    }
    function escape(event: KeyboardEvent) {
      if (event.key !== 'Escape' || event.defaultPrevented || event === nestedEscape) return;
      event.preventDefault();
      returnToCase();
    }
    window.addEventListener('keydown', rememberOverlay, true);
    window.addEventListener('keydown', escape);
    return () => {
      window.removeEventListener('keydown', rememberOverlay, true);
      window.removeEventListener('keydown', escape);
    };
  }, [manual]);
  return <DemoRoleContext.Provider value={role}><div className="standalone" data-saavi-color-scheme={theme} data-presentation={!manual || undefined} data-guided={guided || undefined} style={{colorScheme:theme}}>
    <DemoShell presentation={!manual} shareHref={hosted && manual ? shareHref : undefined} label="Saavi demo" theme={theme} onTheme={setTheme} onRestart={reset} onReturn={returnToCase}
      scenarios={saaviDemoScenarios} scenario={role} onScenario={setRole}>
      {role==='admin'?<AdminOverview key={`admin-${restart}`} initialLocale="en" directory={store.directory} hubUrl={location.origin+'/'} todayDay={store.today} environment="local" expectedHubOrigin={null}/>:
      <KitchenOverview key={`kitchen-${restart}`} acceptedOverview initialLocale="en" directory={store.directory} hubUrl={location.origin + '/'}
        model={store.overview(period.range)} salesChart={store.chart(period.range)} productionReady salesReady salesDailyReady ordersReadVersion="2"
        overviewPeriod={{value:period, todayDay:store.today,pending:false,onChange:setPeriod}}
        onProfileConfirmed={store.refresh} onDishSaved={store.refresh} reminderScope="portfolio-local-demo"/>}
    </DemoShell>
    {guided && <GuidedKitchen key={role} role={role} onReset={reset} portfolioOrigin={portfolioOrigin} />}
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
