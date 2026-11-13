# PORT-59 · Saavi demo rehearsal

## Desktop scenario tabs in the top toolbar · 2026-11-13

The opened desktop Citymobil and Saavi case demos opt into top placement in `DemoShell` and reuse the existing scenario tabs. In Chromium at 1440 × 900, both toolbars start at y=0 and occupy 32 px. Arrow/Enter and pointer selection work, and Close returns focus and scroll to the launcher. At 390 × 844 the mobile image viewer opens and Escape returns focus. Narrowing an opened demo to 1200 px closes it and focuses the image action. MetaBox's scenario tabs remain at the bottom. All six browser checks ran without console warnings or runtime errors. Captures and readbacks are in `/tmp/portfolio-top-scenarios.RPCJNi/`. Both TypeScript checks, 162 tests and workspace hygiene passed locally.

## Shared case demo layout · 2026-11-13

Citymobil and Saavi opted into top scenario tabs and mobile launch. `DemoShell` now uses its existing bottom scenario bar for every multi-scenario workspace. `CaseGuidedShowcase` always uses the poster and Lightbox at widths up to 1200 px. The existing desktop button shares one style and the full-viewport overlay. LitRes Publishing's launcher uses the existing page-motion opt-out so it opens the dialog with motion enabled.

| Check | Scenario/environment | Result | Evidence |
| --- | --- | --- | --- |
| Desktop launcher and controls | Chromium 1440 × 900, Saavi, Citymobil, MetaBox and both LitRes cases | Centered button with the same border, radius, blur and font. Theme, Restart and keyboard Close work. Close restores scroll and launcher focus | `/tmp/portfolio-demo-template.LcHw31/*-1440.json` |
| Scenario selection | Same desktop viewport | Citymobil's three scenarios, Saavi's Kitchen/Admin and MetaBox's three workspaces use the bottom 32 px of the viewport. Arrow and Enter switch the selected scenario | `citymobil-desktop.png`, `saavi-desktop.png` and readbacks in the same folder |
| Compact poster | All five cases at 390 × 844. Resize Saavi and Citymobil from desktop to 1200 px while open | Poster loads without a live workspace. Escape closes the image viewer and restores focus. Resize disposes the manual overlay and focuses the image action | `*-390.json`, `*-mobile.png` and desktop readbacks in the same folder |
| Submitted dishes | Saavi → Admin → Submitted dishes | Soy chicken bowl decodes its existing 768 px photograph. Fixture tests cover photo retention during review and rejection of a submission with both photo slots empty | `saavi-desktop.png`, `saavi-1440.json`, existing local host tests |

Portfolio and local Saavi tests passed (162 total), along with both TypeScript checks and workspace hygiene. These are local implementation checks. The separate authored story cards and native Saavi source are outside this change.

## Manual Calendar render regression · 2026-11-13

The Calendar clip adapter targeted the first `leading={<Button` in the native delivery settings module. A new loading-state header became that first match and referenced `capacityOnly` outside the editor's scope. The local adapter now matches the editor header by its title and breadcrumbs. The transformed loading component matches its native source byte for byte.

| Check | Scenario/environment | Result | Evidence |
| --- | --- | --- | --- |
| Manual Calendar | Case → Try Live Demo → Kitchen → Calendar & capacity, 1280 × 720 | Native controls render. Limit 120 → save 150 → revisit 150 → Restart → 120. Browser console showed no errors or warnings | `/tmp/port59-calendar-fix/manual-calendar.json` and saved/reset captures |
| Capacity clip | Local guided host, 640 × 550 | Limit reaches 150 with Changes saved. The full delivery schedule stays outside the clip | `/tmp/port59-calendar-fix/guided-capacity.jpg` |

The fix is in the portfolio Vite import adapter. The native Saavi source and fixture transport retain their existing behavior. Independent QA retests Calendar and the remaining manual lifecycle matrix.

## Native period controls and chart data · 2026-11-13

Local review: http://127.0.0.1:3305/projects/saavi#workflows. Delivered value and Portions sold by dish each use one native WorkspacePeriod chip. Delivered value places it immediately before Area / Line. The case introduction identifies the fictional data. Chart badges and bottom captions are removed.

| Check | Scenario/environment | Result | Evidence |
| --- | --- | --- | --- |
| Period changes | Two inline cards at 1440 × 900 | Both change from six daily ticks to five weekly ticks, including the first partial week, with new paths and axis scales. Both return to the daily view. Delivered value still filters Casa Verde and switches Area → Line | `/tmp/port59-chart-period/paired-{week,month}.jpg`, `desktop.json`, `paired-capture-readback.json` |
| Continuity | Desktop inline | All 164 samples retained paths for both plots through period changes and resets | `desktop.json` |
| Compact layout and playback | Inline at 390 × 844 | Each card applies This month through the native Presets menu and returns to This week. Delivered value reaches Line. Both native frames remain within 342 px. No console errors or warnings in the review tab | `*-mobile-{week,month}.jpg`, `mobile.json` |
| Shared data | Local fixture | The reference day is October 31, 2026. The same fictional daily counts drive weekly totals for the selected range, and the three Casa Verde dish totals reconcile to the delivered value | `workflow-sales.test.ts` |

Both chart series are rendered by the Saavi design system. The local adapter applies the Period changes only to the case clip. The refreshed desktop and compact stills cover reduced motion and a host failure.

## Chart visibility during reset · 2026-11-12

Reproduced the pale, empty Weekly Sales frame during `cover-reset` in the inline case. The native line was still present under the opaque Stageshow mask. Chart clips now suppress the visual mask while retaining the reset cue that hides the scripted cursor. Chart data remains visible as the next state commits. The existing frame readiness and fallback stills cover loading and host failure.

At 1440 × 900, both cards played side by side inline with no expanded viewer. All 170 browser samples over approximately 22 seconds found both native plots populated, including each card's reset and the next All / Area state. Both reset screenshots show the two graphs together. The review tab reported no console errors or warnings. Evidence is in `/tmp/port59-chart-continuity/`, including `sales-reset.jpg`, `comparison-reset.jpg`, `next-cycle.jpg` and `continuity-readback.json`. These are sampled browser observations, with the prior action and compact playback evidence below.

## Inline buyers and sales charts · 2026-11-12

Local review: http://127.0.0.1:3305/projects/saavi#workflows. The card host previously required the desktop breakpoint for playback. At 390 px with motion enabled, the visible Analytics card contained only its still. The three chart cards now use the existing guided host with compact native geometry, visibility gating, and the existing reduced-motion and unavailable-frame fallback.

| Check | Scenario/environment | Result | Evidence |
| --- | --- | --- | --- |
| Weekly sales | Inline at 1440 × 900 and 390 × 844 | All / Area / R$3,840 → Casa Verde / Area / R$2,400 → Casa Verde / Line → All / Area. The SVG path changes with the filter and no viewer opens | `/tmp/port59-chart-cards/sales-*-{start,result}.jpg`, `desktop-readback.json`, `mobile-readback.json` |
| Dish comparison | Same row as weekly sales at 1440 × 900, then inline at 390 × 844 | Desktop frames both measure 628 × 540 px rounded. Three distinct series inspect first through final week and reset. Totals are 58 Soy chicken, 38 Lentil and 24 Vegetable curry portions, consistent with the Casa Verde monthly snapshot | `comparison-*-result.jpg`, same readbacks |
| Total buyers | Inline at both widths | Distinct buyer IDs accumulate from 34 to 96, with repeat buyers counted once. Native weekly inspection and reset render in the middle card | `buyers-*-in-case.jpg`, same readbacks |
| Fallback | 390 × 844, reduced motion | Uses the compact still without mounting a chart iframe. No horizontal overflow. No warnings or errors in the browser run | `buyers-reduced.jpg` |

The data is fictional. The Sales and dish comparison cards use the same four-week fixture period. The chart presentation uses the native Saavi Chart and Sales components. The six stills can be regenerated using the recorded poster URLs. No release or native application source change is part of this slice.

## Approved case story and dish editor · 2026-11-12

Local review: http://127.0.0.1:3305/projects/saavi. The case uses the approved project background, qualified 90-minutes-per-day example, workflow introduction and Design decisions. The shared case grid groups dish, capacity and order before Production and Analytics. The new dish scene uses the native Kitchen Menu and editor with the existing sourced photo. The clip presentation frames the title, description, photo and proposed price, with desktop and compact result stills.

| Check | Scenario/environment | Result | Evidence |
| --- | --- | --- | --- |
| Story and card order | Desktop 1440 × 900 | Approved text and time qualification appear in the reading order. All three close-ups share one aligned row before Production and Analytics | `/tmp/port59-dish-story/{background-time,grouped-cards,design-decisions}.jpg` |
| Native editor | Expanded case card at 1440 × 900 | Menu → Soy chicken bowl, decoded 768 px photo and R$24,00 → native Close editor → Menu. Escape closes the case viewer and restores focus. Fresh review tab had no console errors or warnings | `dish-in-case.jpg`, `cycle.json` |
| Static fallback | 390 × 844 and desktop reduced motion | Mobile uses the 342 px still without horizontal overflow. Reduced motion uses the 640 px still. Neither viewer mounts a clip iframe | `dish-mobile-in-case.jpg`, `dish-reduced-in-case.jpg` |
| Regression | Portfolio and local host | 133 + 28 tests, both TypeScript checks, Vite build and workspace hygiene passed | Local checks |

Rollback is scoped to the case copy, card order and sizing, the dish query and playback branch, and its two stills and source notices. The dish clip reads the current fictional fixture and source photo. The passed capacity, order, Production and Analytics actions reuse the browser evidence below.

## Separate Production queue and order detail · 2026-11-12

The existing case grid now uses two independent authored clips. The full-width Production card mounts the native queue. Inspect an order mounts the native AdminOrderDialog for the same Casa Verde fixture order, with its own opener and slide-in. Each card has its own desktop and compact result still. Local review is at http://127.0.0.1:3305/projects/saavi#workflows.

| Check | Scenario/environment | Result | Evidence |
| --- | --- | --- | --- |
| Queue | Expanded case card at 1440 × 900 | Casa Verde and Sea Breeze → Casa Verde → both groups. The order detail stays unmounted | `/tmp/port59-production-fragments/production-in-case.jpg`, `case-cycles.json` |
| Order detail | Expanded case card at 1440 × 900 | Opener → Order 41500001 with Soy chicken bowl and Out for delivery → opener. The queue stays unmounted | `order-detail-in-case.jpg`, `case-cycles.json` |
| Viewer and stills | Desktop keyboard, 390 × 844, reduced motion | Escape returns focus to each launcher. Compact viewers load their dedicated 342 px stills and reduced motion uses the desktop still. No clip iframe in these static viewers or browser warnings during both desktop cycles | `*-mobile-in-case.jpg`, `order-detail-reduced-in-case.jpg` |

The width, Calendar and Analytics checks reuse the accepted evidence below. Rollback targets the Production scene split, the four workflow stills, and their provenance entries. The fixture and all operational code stay in their existing owners.

## Matched showcase width and isolated workflow cards · 2026-11-12

Local review: http://127.0.0.1:3305/projects/saavi#workflows. Citymobil and Saavi share the wide CaseGuidedShowcase rule. Saavi's workflow host mounts the native RestaurantDeliverySettings, AdminSalesDemo and AdminProductionWorkspace with its AdminOrderDialog. The Vite adapter selects the relevant sections and presents the native detail as a sliding sibling of the table. The full case demo uses its established native shell and top scenario control.

| Check | Scenario/environment | Result | Evidence |
| --- | --- | --- | --- |
| Showcase geometry | Citymobil and Saavi, 1440 × 900, hold | Both frames are 1152 px wide with x=144. Heights follow their respective content | `/tmp/port59-isolated-cards/width-parity.json` and matched showcase captures |
| Capacity | Native 640 × 550 clip | 120 → 150 and Changes saved → 120 | `cycles.json`, `calendar.jpg` |
| Analytics | Native 640 × 550 clip and embedded case grid | R$3,840 Area → Casa Verde R$2,400 with four Bars → R$3,840 Area | `cycles.json`, `cards-in-case.jpg` |
| Production | Native 1280 × 555 and expanded case card | Two restaurant groups → Casa Verde and Order 41500001 with items and status → two groups, detail closed. Escape in the viewer restores its launcher | `cycles.json`, `production-in-case.jpg` |
| Stills and manual smoke | Desktop reduced motion and 390 × 844 case | Static cards render without playback iframes. Compact Production shows one matching queue item above the native order detail. Full mobile demo opens in Kitchen and switches to Admin through the top toolbar | `reduced-in-case.jpg`, `mobile-in-case.jpg`, six native captures |
| Regression | Portfolio and local host | 133 + 28 tests, both TypeScript checks, Vite build and workspace hygiene passed | Local checks |

Rollback targets the shared wide showcase variant, the clip-only local composition/import adapters and the six replaced workflow stills. The original native Saavi checkout and portfolio manual scenario state are outside that delta. Browser evidence covers sampled beats and DOM readbacks. An early embedded Analytics run lost its menu during viewport changes. After tightening the playback intersection, the inline scene reached the native Bars result. The separate full Kitchen showcase reached Production with normal page scrolling. Reading its iframe through the browser automation could move the parent scroll position, so the full status change is outside this pass's browser evidence.

## Restored top scenario controls · 2026-11-12

The shared DemoShell had moved scenario tabs below the workspace. Citymobil and Saavi now opt into the original top placement and reuse Citymobil’s compact picker. The shared showcase opens each case's manual workspace from its narrow screenshot.

| Check | Scenario/environment | Result | Evidence |
| --- | --- | --- | --- |
| Desktop switching | Local cases, 1440 × 900 | Citymobil switches to Pickup mix-up and Guaranteed income. Saavi switches Kitchen → Admin → Kitchen. Both toolbars start at y=0 | `/tmp/port59-top-scenarios/{citymobil,saavi}-desktop.jpg` |
| Compact switching | Local cases, 390 × 844 | Citymobil opens the picker and switches to the pickup fixture. Saavi opens the picker and renders native Admin. Both have 390 px content width | `/tmp/port59-top-scenarios/{citymobil,saavi}-mobile.jpg`, `saavi-mobile-admin.jpg` |
| Focus and resize | Local cases, 390 and 1440 px | Choosing returns focus to the compact trigger. Closing returns focus to Try Live Demo. Citymobil Escape closes the picker first. Widening closes the picker and preserves the active scenario. No browser console errors in the test tab | Browser state readback |
| Regression | Portfolio and local host | 133 + 28 tests, both TypeScript checks, workspace hygiene and diff check passed | Local commands |

This pass covers local manual launch and switching. The prior section records the Inside the Experience clip checks.

## Inner scenario bar and Inside the Experience · 2026-11-12

Local review: http://127.0.0.1:3305/projects/saavi#workflows. FRONTEND reused DemoShell, CaseFeatureGrid, CaseDemoMedia, the inert guided iframe, and Stageshow. Removed the sole consumer of the exterior showcase controls slot and its role-change messages. The case opens in Kitchen. Only the opened desktop demo owns Kitchen/Admin selection.

| Check | Scenario/environment | Result | Evidence |
| --- | --- | --- | --- |
| Scenario placement | Integrated desktop 1280 × 720 | Zero outer tabs. One inner bar at y=688–720. Kitchen → Admin → Kitchen renders native workspaces and Close returns focus to Try Live Demo | /tmp/port59-saavi-dialog-admin.jpg, /tmp/port59-saavi-case-no-tabs.jpg |
| Calendar | Expanded case clip | Saved 150, native Changes saved, following cycle restores 120 | /tmp/port59-workflow-clips/calendar-result.jpg |
| Production | Full grid width, expanded case clip | Casa Verde filter, Order 41500001 with items/status. Subsequent queue has three rows and no open order. Dialog closes under reset cover | /tmp/port59-workflow-clips/production-expanded.jpg |
| Analytics | Expanded case clip | Casa Verde at R$2,400 and four Bars with Demo data disclosure. Next cycle returns to All / Area at R$3,840 | /tmp/port59-workflow-clips/analytics-result.jpg |
| Stills | Native compact captures 390 × 844; integrated compact and reduced motion | Compact shows native screenshot, no clip iframes or horizontal overflow. Reduced motion expands static media without a frame | /tmp/port59-workflow-clips/case-mobile.jpg and three native mobile result captures |
| Regression | Portfolio and local host | 133 + 28 tests, both type checks, Vite build and workspace hygiene pass. Final standalone Production reset had no console errors or warnings | Vite log in /tmp/port59-workflow-clips/ |

Scoped change owners: `KitchenDemoEntry.tsx`, `KitchenGuidedFrame.tsx`, `SaaviWorkflowClips.tsx`, `workflow-clips.module.css`, Saavi `page.tsx`, `case-demo-viewport` consumers `CaseGuidedShowcase.tsx` and `CaseTemplate.tsx`, shared case CSS, `saavi-kitchen-host.ts`, and local `main.tsx`, `guided.tsx` and `admin-adapter.mjs`. Six stills and source notices are under `public/images/saavi/case/`. To revert the clip slice, restore the previous workflow detail slots and remove the optional clip query, clip routines and assets. Retain the inner scenario bar correction and existing order walkthrough. The working tree contains previous untracked demo work, so a reset to Git HEAD would discard other slices. Evidence is browser readback and sampled frames, not a continuous FPS measurement or independent QA.

## Demo presentation correction · 2026-11-12

FRONTEND owner checks for Ivan’s correction. Reused CaseShowcase/CaseDemoOverlay/DemoShell; extracted its existing scenario buttons into DemoScenarioTabs and removed the above-frame role-picker host. Shared case heading sizes/line heights now come from CaseShowcase. Native payment rows use Saavi Icon (Visa/Mastercard/Cash) and the unchanged official Apple Pay mark, with a single local method renderer for Kitchen and Admin.

| Check | Scenario/environment | Result | Evidence |
| --- | --- | --- | --- |
| Presentation | Case at 1280×720 and 390×844 | Lower scenario tabs, centered bordered/blurred launcher, clean chrome; heading tokens 90/96 and 40/44; no horizontal overflow | desktop.jpg, mobile.jpg; browser DOM readback |
| Selection / return | Real pointer input in compact case; Kitchen↔Admin; open and close selected manual workspace | Role switch and close preserved 2010.5px scroll and case URL; launcher focus restored, manual iframe removed. Keyboard ArrowLeft + Enter selected Kitchen | Browser observations; lifecycle.json |
| Reduced motion | Compact still, switch to Admin | No guided iframe; role-specific still updates and scroll stays fixed | Browser observations |
| Payment presentation | Kitchen desktop list, Production + Apple Pay detail; Admin compact cards + Visa detail | All four marks render; detail agrees with row; pending Admin orders retain Cash/Pending | payments-kitchen.jpg, payments-production.jpg, payment-detail-mobile.jpg |
| Contracts / compilation | Local demo contracts; shared motion/token tests; portfolio + host TypeScript; Vite build | 28 + 15 tests pass; both type checks and build pass | contracts.log, shared-tests.log, types.log, host-types.log, build.log |
| Console / hygiene | Integrated page, local fixtures | No runtime errors; only dev Fast Refresh reload warnings during editing. Hygiene passes | browser-errors.json, hygiene.log |

Evidence: `/tmp/port59-demo-consistency/`. The complete native workflows, guided loop timing, host-unavailable behavior and Escape routing reuse previous accepted evidence; this correction adds focused selection/close/icon checks, not a new full regression or independent QA. The source Saavi checkout and production boundary are unchanged. No deployment.


## Overview, Offers, Orders and weekly cards · 2026-11-12

FRONTEND reused the native screens and SalesBreakdown component. Manual Admin now starts at Overview; guided/poster mode still starts at Restaurants and retains its existing scene. `admin-scenario.ts` shares 15 orders and six offers across native read models, preserves exact purchased/source snapshots after retail edits, and derives period summaries and attention cohorts from those records. No native Saavi source was edited.

| Check | Scenario / environment | Result / evidence |
| --- | --- | --- |
| Native navigation | Overview, Offers, Orders; desktop 1280×720 and compact 390×844 | Populated native views; no horizontal document overflow; overview/offers/orders desktop/mobile captures |
| Attention and details | All five Overview attention links; awaiting Order → purchased item → back; native Offer → source dish | Expected destinations/data; focus returns to originating Overview trigger; attention.json |
| Manual updates | Offer price 28 → 30 and native Saved readback; Orders Pending filter; Restart | Four pending orders; offer reset to 28; manual Restart returns to Overview |
| Weekly cards | Native SalesBreakdown; All/Casa/Sea filters; dark/light; 390px | Casa 520/640/560/680, Sea 360 per week; compact two-column grid; weekly desktop/mobile captures |
| Reported dark seam | Invitations and Team, standalone desktop/compact; Invitations inside case; theme toggle and Kitchen smoke | Not reproduced before or after implementation. Native AppShell paints rgb(14,12,15) for the full canvas; no speculative CSS change. canvas.json and invitations case/desktop/mobile captures. Original screenshot remains unconfirmed |
| Native contracts | Summaries, attention lists/details, source/purchased snapshots, Order filters/totals, offer save/reset plus earlier suites | 28 tests passed; contracts.log |
| Types/build/hygiene | Host and portfolio TypeScript, Vite, hygiene | Passed; host-types.log, types.log, build.log, hygiene.log. Existing Vite chunk-size and esbuild/oxc advisories remain |
| Boundary / preservation | Native manual paths, photo loading, guided Admin smoke, integrated role switch, Kitchen | No standalone/guided console warnings/errors; observed network is data SVG only; six photos load from localhost. network.json, browser-errors.json, guided-smoke.txt |

Evidence and isolated delta: `/tmp/port59-admin-overview/`. The unchanged full guided loop, case close/focus lifecycle, reduced motion and unavailable-host behavior reuse previous accepted proof; the immediate case-close snapshot here was taken before the transition settled and is not a new lifecycle pass. Native Analytics remains its separate fixed Oct 5–Nov 1 illustrative series, while manual Overview/Orders follow the session date. Local native access mutations/invitation sending stay unavailable. Admission Office remains unidentified. These are FRONTEND owner checks, not independent QA or final visual acceptance. No release, live service traffic or operational persistence.

## Manual Admin navigation · 2026-11-12

FRONTEND restored only the confirmed native manual sections. Review is labelled **Submitted dishes** in current native code. Admission Office remains unidentified and awaits PRODUCT/Ivan; Delivery/Team/Invitations have native layouts but no corresponding approved frames in the Figma map. Existing inline Restaurants/Sales and Kitchen remain unchanged. No operational source edits or production release.

| Check | Scenario / environment | Result / evidence |
| --- | --- | --- |
| Navigation | Submitted dishes, Production, Delivery, Team, Invitations; 1280×720 and 390×844 | Each opens its actual native view with local data. Desktop/mobile captures; mobile.json records width 390, no document overflow |
| Native paths | Review detail → Approve; Production restaurant filter → Order → purchased item; Delivery schedule edit/save; Restart | Passed browser readbacks. Review becomes Approved; Sea Breeze filter and Order agree; schedule reports Changes saved; Restart returns to Restaurants |
| Keyboard / errors | Native Team button activated by Enter; changed mobile paths | Focus moves to native workspace. No console warnings/errors in the fresh run |
| Data boundary | All five mobile sections after Network observation began | Only data SVGs and one local native icon request; no operational request. network.json is untruncated. Contract tests also reject unsupported requests and access mutations |
| Native contracts | List parsers, dates, restaurant filtering, linked Order identity; Review repeat/readback/replay/reset; table preference reset; Delivery schedule save/readback/replay/reset; Team/Invitations filtering | 24 tests pass; contracts.log |
| Types / build / hygiene | Host and portfolio TypeScript; Vite build; workspace hygiene | Passed; host-types.log, types.log, build.log, hygiene.log. Existing chunk-size and esbuild/oxc advisories remain |

Evidence resolves under `/tmp/port59-admin-tabs/`. The unchanged case overlay/role lifecycle, reduced motion, host failure and complete Kitchen/Admin playback reuse prior accepted evidence below; this slice adds a guided-mode smoke, not a new animation audit. Existing native limitations are preserved: Production search/sort/summary are unavailable, Local Team/Invitations cannot grant access or send invitations, and Offers/Orders are not added as standalone tabs. Purchased-detail fixtures contain title/description without generated imagery. This is implementation-owner verification, not independent QA or final visual acceptance. No tests or live calls against operational Saavi were run.

## Admin / role-switch owner verification

Local FRONTEND checks, 2026-11-12. Evidence: `/tmp/port59-admin/`. This is owner evidence; independent QA and PRODUCT acceptance are separate.

| Check | Scenario | Result / evidence |
| --- | --- | --- |
| Native reuse | Restaurants; Analytics/Sales; native ServiceSwitcher and restaurant filter | Actual sibling components imported read-only; local DTO/fixture adapter only |
| Playback | Desktop 1280×720 and compact 390×844, complete All → Casa → Sea → hidden reset | Passed; desktop-cycle.json, mobile-cycle.json. R$3,840 → R$2,400 → R$1,440; mobile loop approximately 30 seconds; no horizontal overflow |
| Case switch | Above-frame native picker, pointer and keyboard selection, menu pause, outside dismissal | Selected role only, URL unchanged; mobile scroll 1835 px, desktop 2902.5 px. Menu removes guided iframe while open |
| Manual | Admin filters, restart; Admin → Kitchen; actual order Not started → In production; theme; reopen | Passed; manual-casa.jpg and manual-sea.jpg; fresh manual state, no authored script |
| Return | Escape closes native details first, then demo; launcher remains focused through resumed playback | Passed; return-focus.json records 16 seconds at unchanged 2902.5 px |
| Fallback | Reduced motion and deliberately blocked local host | Selected Admin still; reduced mode mounts no guided frame; timeout removes failed iframe. reduced-admin.jpg, unavailable-admin.jpg. Network emulation removed afterward |
| Checks | Native contracts, existing motion/SEO, portfolio/host types, local compilation | 19 + 16 tests passed; types.log, host-types.log, contracts.log, regression.log, build.log |

Earlier unchanged Kitchen Calendar/Dish/Profile and complete Kitchen loop proof below is reused. Browser iframe-locator input occasionally failed with provider focus-root/target errors; direct pointer input and native keyboard input were then used. An initial End key before menu focus scrolled the page; menu-row keyboard selection and final return checks use established focus. Case playback is inert, so full cycle readbacks were captured in the identical standalone guided host, with separate parent-scroll observation in the case. Motion evidence is sampled frames/DOM, not continuous FPS or a Stageshow film CLI gate. Existing Vite bundle-size and test-runner esbuild/oxc advisories remain. No production build, release or independent QA claim.

## Previous Kitchen verification

Local FRONTEND owner verification, 2026-11-12. Entry: http://127.0.0.1:3305/projects/saavi#kitchen; host: http://127.0.0.1:3310/.

The native Kitchen Overview opens Production, then the Soy chicken bowl order, then its native status menu; the existing fixture command changes Not started to In production. A cursor hold shows the payoff. An opaque local cover hides dialog close and fixture reset before the next Overview. Stage/Act supplies cursor and timing only; native product markup, tokens and transitions remain in their current owners.

| Check | Scenario | Result / evidence |
| --- | --- | --- |
| Script | 1280×720, repeated order/menu/payoff/reset | Passed; desktop-cycle.json and desktop-in-production.jpg |
| Case playback | Actual main orange frame and centered CTA, full cycle | Passed; inline-desktop.jpg and inline-scroll.json |
| Compact | Native 390×844 layout; full cycle, status and cursor, no document overflow | Passed; mobile-fixed-13.jpg, mobile-cycle.json |
| Scroll | Whole mobile loop after guided-only native focus adapter | Stable at 1892.5 px; mobile-cycle.json |
| Manual handoff | One fresh iframe, original toolbar, Overview 60/18/30, no script query | Passed; manual-desktop.jpg; native manual actions reuse earlier integration proof |
| Return / reduced motion | Keyboard Close restores Try Live Demo and scroll 1813 px; reduced motion mounts no inline iframe | Passed browser readback; reduced-mobile.jpg |
| Failure recovery | Blocked only the local host request, waited through readiness deadline; removed block and reloaded | Clean still with unavailable state and no iframe; then ready again. No persistent network emulation remains |
| Still assets | Fresh mode=poster capture, no toolbar/44px reservation | 1280×720 and 390×844 JPEGs; source-notices.json |
| Template metadata | Home Company/client anchors; Saavi role and company in hero | Browser readback; company-links.json; earlier template screenshots reused |
| Contracts | Native fixture suite | 15 passed; contracts.log |
| Regression | Existing motion policy and SEO | 16 passed; regression.log |
| Types/build/hygiene | Portfolio/host types; local Vite build; hygiene | Passed; types.log, host-types.log, build.log, hygiene.log |

Evidence names resolve under /tmp/port59-kitchen-playback/. The existing large local Vite chunk advisory remains. No production build or deployment was performed. Prior Calendar, Dish, Sales, toolbar theme/restart, local transport and manual order checks were reused because these behaviors are unchanged.

Motion evidence is sampled browser frames and repeated state readbacks, not a continuous FPS audit or the Stageshow film CLI gate. An early iframe-locator inspection itself scrolled the parent; final inline scroll checks use only parent DOM reads and screenshots. Guided native focus also needed preventScroll on mobile; the final run verifies that correction. The close-before-reset change removed the repeated native focus-return warning; earlier warnings remain only in historical logs. Expected blocked-request errors belong to the deliberate host-failure check.

No operational Saavi files, data, Admin, case metadata/backdrop, indexing or publication changed. Ivan's visual acceptance and independent QA remain separate.
