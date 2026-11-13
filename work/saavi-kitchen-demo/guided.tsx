import {useCallback, useEffect, useRef} from 'react';
import {Stage} from '@portfolio/components/citymobil-features/stageshow/stage';
import {Stopped, type Act} from '@portfolio/components/citymobil-features/stageshow/act';
import {isSaaviChartClip, kitchenBridge, type SaaviDemoRole, type SaaviClip} from '@portfolio/lib/portfolio/client/saavi-kitchen-host';

const initial = {covered:true};
type SceneAct = Act<typeof initial>;
const visible = (node:HTMLElement) => node.getClientRects().length > 0;

async function find(a:SceneAct, selector:string, text?:string) {
  for (let attempt=0;attempt<60;attempt++) {
    const node = [...document.querySelectorAll<HTMLElement>(selector)].find(node => visible(node) && !node.matches(':disabled,[aria-disabled=true]') && (!text || node.textContent?.trim() === text));
    if (node) return node;
    await a.wait(100);
  }
  throw new Error(`Kitchen scene target unavailable: ${text ?? selector}`);
}

/** Cursor-only Stage: native product DOM/styles/state remain outside the kit. */
export function GuidedKitchen({onReset, portfolioOrigin, role='kitchen', clip}: {
  onReset:()=>void; portfolioOrigin:string|null; role?:SaaviDemoRole; clip?:SaaviClip;
}) {
  const overlay = useRef<HTMLDivElement>(null);
  const width = innerWidth, height = innerHeight;
  const still = !!clip && new URLSearchParams(location.search).get('mode') === 'poster';
  const chartClip = !!clip && isSaaviChartClip(clip);
  const rest = {x:width-50,y:height-45};
  const promote = useCallback(() => {
    const node=overlay.current;
    if (!node) return;
    if(node.matches(':popover-open')) node.hidePopover();
    node.showPopover();
  }, []);
  useEffect(() => {promote();return () => overlay.current?.hidePopover();}, [promote]);
  const script=useCallback(async(a:SceneAct) => {
    const notify=(type:string) => { if(portfolioOrigin) parent.postMessage({type},portfolioOrigin); };
    async function press(node:HTMLElement, enter=false) {
      // Scroll the native panel, never the surrounding portfolio document.
      for(let panel=node.parentElement;panel;panel=panel.parentElement) {
        if (panel.scrollHeight <= panel.clientHeight || !/(auto|scroll)/.test(getComputedStyle(panel).overflowY)) continue;
        const item=node.getBoundingClientRect(), bounds=panel.getBoundingClientRect();
        if(item.top < bounds.top || item.bottom > bounds.bottom) panel.scrollTo({top:panel.scrollTop+item.top-bounds.top-24,behavior:'smooth'});
        break;
      }
      await a.wait(650);
      promote();
      const r=node.getBoundingClientRect();
      const point={x:r.left+r.width*.65,y:r.top+r.height*.55};
      if(enter) await a.enter(point,{duration:700}); else await a.move(point,{duration:650});
      await a.wait(160); await a.click();
      // Match pointer activation's focus before opening native dialogs.
      if (clip === 'order-detail' && node.matches('[data-order-opener]')) node.focus({preventScroll:true});
      node.click();
      await a.wait(650);
      // Native modal/sheet/popover opens in the top layer; cursor remains above it.
      promote();
    }
    try {
      a.mark('preparing');
      await document.fonts.ready;
      if (clip) {
        await playClip(a, clip, press, async () => {
          if (still) return;
          await a.set({covered:false});
          await a.wait(350);
          notify(kitchenBridge.ready);
        });
        if (still) {
          await a.set({covered:false});
          a.mark('poster');
          notify(kitchenBridge.ready);
          return;
        }
        a.mark('result');
        if (clip !== 'buyers' && clip !== 'dish-comparison') await a.move(rest, {duration:450});
        await a.wait(3100);
        if (clip === 'dish') {
          await press(await find(a, 'dialog[open] button[aria-label="Close editor"]'));
          await find(a, '[data-workflow-clip="dish"]:not(:has(dialog[open])) button[aria-label="Soy chicken bowl"]');
          a.mark('menu-return');
          await a.wait(800);
        }
        a.mark('cover-reset');
        await a.set({covered:true});
        await a.wait(400);
        if (clip === 'order-detail') {
          (await find(a, 'dialog[open] button[aria-label="Close"]')).click();
          await a.wait(400);
        }
        if (clip !== 'dish') onReset();
        await a.wait(600);
        promote();
        a.place(rest);
        a.mark('reset-ready');
        return;
      }
      if(role==='admin') {
        await find(a,'button','Casa Verde');
        await a.set({covered:false});await a.wait(350);notify(kitchenBridge.ready);
        a.mark('restaurants');await a.wait(1400);
        if(width<1024)await press(await find(a,'button[aria-label="Open Admin navigation"]'),true);
        await press(await find(a,width<1024?'[role="menuitemradio"]':'button','Analytics'),width>=1024);
        await find(a,'[data-sales-demo]');a.mark('all-restaurants');await a.wait(1500);
        for(const scope of ['casa','sea']) {
          const name=scope==='casa'?'Casa Verde':'Sea Breeze';
          if(width<640) {
            await press(await find(a,'button[aria-label="Filters"]'));
            await press(await find(a,'dialog[open] button',`Restaurants: ${scope==='casa'?'All restaurants':'Casa Verde'}`));
            await press(await find(a,'[role="button"]',name));
            await press(await find(a,'button','Apply'));
          } else {
            await press(await find(a,'button[aria-haspopup="menu"]',`Restaurants: ${scope==='casa'?'All':'Casa Verde'}`));
            await press(await find(a,`[role="menuitemradio"][data-menu-command-id="${scope}"]`));
          }
          a.mark(scope);await a.wait(2000);
        }
        a.mark('cover-reset');await a.set({covered:true});await a.wait(400);
        onReset();await a.wait(600);promote();a.place({x:width-50,y:height-45});a.mark('reset-ready');
        return;
      }
      const open=await find(a,'button','Open production');
      await a.wait(350);
      await a.set({covered:false}); await a.wait(350);
      notify(kitchenBridge.ready);
      a.mark('overview'); await a.wait(1000);
      await press(open,true);
      a.mark('production'); await a.wait(700);
      await press(await find(a,'button[aria-label="Soy chicken bowl"]'));
      a.mark('order'); await a.wait(1000);
      await press(await find(a,'dialog[open] button[aria-label="Change production status: Not started"]'));
      a.mark('status-menu'); await a.wait(650);
      await press(await find(a,'[role="menuitem"][data-menu-command-id="start"]'));
      await find(a,'dialog[open] button[aria-label="Change production status: In production"]');
      a.mark('in-production');
      await a.move({x:width-45,y:height-55},{duration:450});
      await a.wait(3000);
      a.mark('cover-reset'); await a.set({covered:true}); await a.wait(400);
      // Let the native dialog restore focus before its opener is remounted.
      (await find(a,'dialog[open] button[aria-label="Close"]')).click();
      await a.wait(500);
      onReset(); await a.wait(500); promote(); a.place({x:width-50,y:height-45});
      a.mark('reset-ready');
    } catch(error) {
      if(error instanceof Stopped || a.signal.aborted) throw error;
      notify(kitchenBridge.unavailable);
      throw error;
    }
  }, [clip,height,width,onReset,portfolioOrigin,promote,role,still]);
  return <div ref={overlay} popover="manual" className="kitchen-guided-overlay" data-guided-chart={chartClip || undefined} aria-hidden>
    <Stage width={width} height={height} initial={initial} script={script}
      prepareOffscreen={!!portfolioOrigin && (clip === 'dish' || chartClip)}
      play={still ? 'once' : 'loop'} cursor={{at:rest,style:'real'}} fidelity="realistic">
      {state=><div className="kitchen-guided-mask" data-covered={state.covered} />}
    </Stage>
  </div>;
}

async function playClip(a: SceneAct, clip: SaaviClip, press: (node: HTMLElement, enter?: boolean) => Promise<void>, reveal: () => Promise<void>) {
  if (clip === 'dish') {
    const bowl = await find(a, 'button[aria-label="Soy chicken bowl"]');
    await reveal();
    a.mark('menu');
    await a.wait(850);
    bowl.focus({preventScroll:true});
    await press(bowl, true);
    await find(a, 'dialog[open] h2', 'Soy chicken bowl');
    await find(a, 'dialog[open] [role="group"] img[src*="/api/kitchen/dishes/photo"]:not([data-pending])');
    return;
  }
  if (clip === 'calendar') {
    const limit = await find(a, 'input[aria-label="Daily portion limit"]') as HTMLInputElement;
    await reveal();
    a.mark('calendar');
    await a.wait(850);
    await press(limit, true);
    limit.focus({preventScroll:true});
    limit.select();
    const setValue = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!;
    setValue.call(limit, '150');
    limit.dispatchEvent(new Event('input', {bubbles:true}));
    limit.blur();
    a.mark('limit-150');
    await a.wait(550);
    await press(await find(a, 'button', 'Save changes'));
    await find(a, '[role="status"]', 'Changes saved');
    return;
  }
  if (clip === 'production') {
    await find(a, '[data-order-opener]');
    await reveal();
    a.mark('queue');
    await a.wait(1000);
    await press(await find(a, 'button[aria-label="Filters"]'), true);
    if (innerWidth < 640) {
      await press(await find(a, '[role="button"]', 'Add a new filter'));
      await press(await find(a, '[role="button"]', 'Restaurant'));
    }
    await press(await find(a, '[role="button"]', 'Casa Verde'));
    if (innerWidth < 640) await press(await find(a, 'button', 'Apply'));
    await find(a, '[data-order-opener][aria-label="Open Order: 41500001"]');
    a.mark('filtered');
    return;
  }
  if (clip === 'order-detail') {
    const order = await find(a, '[data-order-opener]');
    await reveal();
    a.mark('order-entry');
    await a.wait(850);
    await press(order, true);
    await find(a, 'dialog[open] [aria-label="Delivery 1"]');
    return;
  }
  async function selectMonth() {
    await press(await find(a, '[data-workflow-period="week"] button[aria-label^="Open date range picker"]'), true);
    a.mark('period-menu');
    if (innerWidth < 640) await press(await find(a, 'button[aria-label^="Presets:"]'));
    await press(await find(a, 'button', 'This month'));
    await press(await find(a, 'button', 'Apply range'));
    await find(a, '[data-workflow-period="month"] button[aria-label^="Open date range picker"]');
  }
  if (clip === 'buyers' || clip === 'dish-comparison') {
    const plot = await find(a, '[data-workflow-metric] [data-chart-plot]');
    await reveal();
    a.mark('chart-start');
    await a.wait(850);
    if (clip === 'dish-comparison') {
      a.mark('week');
      await a.wait(700);
      await selectMonth();
      a.mark('month');
      await a.wait(1100);
    }
    for (const [index, fraction] of [0.02, 0.34, 0.67, 0.98].entries()) {
      const bounds = plot.getBoundingClientRect();
      const point = {x:bounds.left + bounds.width * fraction, y:bounds.top + bounds.height * (clip === 'buyers' ? .25 : .38)};
      if (index === 0) await a.enter(point, {duration:680}); else await a.move(point, {duration:520});
      plot.dispatchEvent(new PointerEvent('pointermove', {bubbles:true, pointerType:'mouse', isPrimary:true, clientX:point.x, clientY:point.y}));
      await find(a, '[data-workflow-metric] [data-chart-readout]');
      a.mark(`week-${index + 1}`);
      await a.wait(620);
    }
    return;
  }
  await find(a, '[data-sales-demo] [data-chart-line]');
  await reveal();
  a.mark('all-restaurants');
  await a.wait(1000);
  a.mark('week');
  await a.wait(650);
  await selectMonth();
  a.mark('month');
  await a.wait(900);
  if (innerWidth < 640) {
    await press(await find(a, 'button[aria-label="Filters"]'), true);
    await press(await find(a, 'dialog[open] button', 'Restaurants: All restaurants'));
    await press(await find(a, '[role="button"]', 'Casa Verde'));
    await press(await find(a, 'button', 'Apply'));
  } else {
    await press(await find(a, 'button[aria-haspopup="menu"]', 'Restaurants: All'), true);
    await press(await find(a, '[role="menuitemradio"][data-menu-command-id="casa"]'));
  }
  await find(a, '[data-sales-demo] span', '2,400.00');
  a.mark('casa-verde');
  await a.wait(900);
  await press(await find(a, '[role="combobox"][aria-label="Chart presentation"]', 'Area'));
  await press(await find(a, '[role="option"]', 'Line'));
  await find(a, '[role="combobox"][aria-label="Chart presentation"]', 'Line');
}
