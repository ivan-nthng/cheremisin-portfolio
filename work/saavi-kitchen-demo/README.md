# Saavi Kitchen and Admin portfolio demos

## Published snapshot · 2026-11-13

The case at `/projects/saavi` embeds a same-origin static Vite build from
`public/saavi-kitchen-demo/index.html`. It contains the existing disposable
fictional Kitchen and Admin scenarios and scripted cursor scenes; no production
Saavi API or persistent account is used. The six fixed demo photo IDs redirect
to compressed WebP assets in the same static folder. The shared portfolio
`CaseGuidedShowcase`, `CaseDemoOverlay`, and `DemoShell` still own the entry,
poster fallback, lifecycle, toolbar, and focus return.

To regenerate the checked-in snapshot locally, run `npm run build:saavi-demo`.
This uses the sibling `../saavi` source and its installed Vite. The current
snapshot was built from Saavi HEAD `b0b3f9c` plus the local working tree on
2026-11-13; it is intentionally committed so the portfolio production build
does not depend on a sibling checkout. Review the resulting bundle and media
when changing the source, then run the portfolio build and browser checks.

The sections below record the earlier local-only implementation and checks.

Local interactive screen: http://127.0.0.1:3310/

Run from the portfolio repository:

```sh
node work/saavi-kitchen-demo/dev.mjs
```

The host imports the current `KitchenOverview` and the existing Saavi design system directly from the sibling `../saavi` checkout. Set `SAAVI_SOURCE_ROOT` to use another checkout. It uses that checkout's installed Vite; no Saavi files are modified. This remains a separate local review runtime. The development case at http://127.0.0.1:3305/projects/saavi#kitchen opens this same host inside the shared portfolio overlay; it does not copy Kitchen into Next.js.

## Owners and seams

- Native Saavi owns the screens, responsive shell, fonts/tokens, menus, calendars, editors, status actions and transitions.
- The portfolio's existing `DemoShell` supplies the same black/gold top close/theme/restart toolbar as MetaBox. In the case overlay, Close and bare Escape return to the launcher with scroll/focus restored. Standalone Close returns to the case's Kitchen anchor at port 3305. Native menus and dialogs retain first use of Escape.
- `store.ts` owns disposable fictional DTOs, local commands, version/intent replay, and matching readbacks. Restart/page reload resets local records. Browser API requests never fall through to a real Saavi service; unexpected endpoints fail closed.
- Existing public Figma dish imagery and Saavi landing assets are served by a narrow local media handler. The static build is a compilation check, not a deployable service.
- Production and Orders share their current work rows. Overview counters recalculate from those rows. A deterministic year of completed orders supplies Sales daily/weekly/dish figures, amounts and pagination. Historical item prices stay fixed after menu edits. Every date and current-day cutoff follows São Paulo time. Card brands (Visa, Mastercard, Apple Pay) are explicitly fictional presentation adapters; the actual Saavi COD-only DTO/decoder stays unchanged.

## Standalone presentation adapters

The Vite importer-specific seams adapt only this review host: `dish-dialog.tsx` opts the unchanged native DishEditor into DS modal behavior (whole-interface backdrop, focus containment and DS motion); `order-presentation.tsx`, `admin-order-payment.tsx` and the shared `payment-method.tsx` render fictional Visa/Mastercard/Apple Pay/Cash methods in native lists and details (Production forwards the same order ID, so it agrees with Sales); the native `salesDailyReady` prop enables the daily chart (last seven days). These files do not change the operational Saavi app. The modeless Main scrim is suppressed only when the native modal backdrop owns the surface, avoiding double darkening.

HMR is disabled so concurrent edits in the sibling checkout cannot reset a review session. Manual reload reads the latest source; Restart resets demo data. The host still imports the original components, not a copied application.

## Checked

- Native Calendar: portion limit save/revisit, own delivery weekdays, save, unsaved-leave dialog.
- Production: search, exact task detail, start → ready, Overview readback, Cannot fulfill quantity/reason/report.
- Menu: open dish, edit description, save and reopen; native nested-entry payload contract.
- Sales: period changes, four-week graph, keyboard point inspection, Orders list/detail contracts.
- Restaurant profile: inline name save; acceptance version conflict/re-read and local change.
- Native dish creation/save/reopen, unsaved confirmation, full backdrop click dismissal, keyboard focus containment, light/dark themes; 390px modal fits with inner scrolling.
- Toolbar styles compared against MetaBox (identical color/font/32px control geometry); theme, restart, close and native mobile navigation; 390px Overview/Calendar have no horizontal document overflow.
- Local contract tests: 15 passed (including all 365 historical dates, pagination, daily/weekly/order totals, future dates, unique IDs and clean draft creation). Standalone TypeScript and Vite build passed. Portfolio tests: 132 passed; hygiene passed.

Photo uploads, a backend and production embedding are outside this local slice. Full independent QA and Ivan's visual acceptance are separate from these FRONTEND owner checks. The later Admin addition is scoped below.

## Local case integration

Expanded mode: user-controlled interactive prototype. `src/app/projects/saavi/KitchenDemoEntry.tsx` owns the local launcher, lazy iframe and recoverable loading state. `CaseDemoOverlay` owns the unchanged full-screen motion, scroll lock and focus restoration. `src/lib/portfolio/client/saavi-kitchen-host.ts` defines the fixed local origin and readiness/close messages; both message origin and frame source are checked. The Vite host sends readiness only after the native application mounts and is disposed when the case closes it. Restart/reopening starts a fresh fictional session.

The entry renders only in development, on port 3305 at `127.0.0.1` or `localhost`. Kitchen is presented in the main orange tabletop/browser showcase, with the shared centered Try Live Demo button on desktop and the native screenshot with Lightbox at widths up to 1200 px. Production shows the capture without a local launch control and never renders a localhost iframe. Start both local servers for review; no production dependency or indexing change is introduced.

Integration evidence and reversible patch: `/tmp/port59-kitchen-integration/`. Earlier native Calendar, Dish editor and Sales checks are reused because those owners are unchanged.

Current evidence: `/tmp/saavi-kitchen-standalone/dish-modal.jpg`, `/tmp/saavi-kitchen-standalone/sales-history.jpg`; test/build logs in `/tmp/saavi-demo-{tests,build}.log`. Motion proof includes sampled intermediate transforms and settled endpoints, not a continuous FPS audit.

Reference: https://app.notion.com/p/412fe5f58cf581d5b3badcc901d449bc
Calendar Figma: https://www.figma.com/design/p4At0g5LDt1zItoCmp96kl/saavi?node-id=2972-34860

## Authored inline playback

The local case now mounts `KitchenGuidedFrame` through the existing `CaseGuidedShowcase` / `GuidedPreview` visibility, document activity, reduced-motion and suspension gates. It opens the same native host with `mode=guided`. `guided.tsx` uses the installed Stageshow Stage/Act solely for cursor/timing and a reset cover; native UI remains outside the kit CSS. The scripted loop opens Production, opens Soy chicken bowl, changes Not started to In production through the native menu and fixture command, holds, closes the dialog and resets under cover. Desktop inline playback uses 1280×720. The case uses 390×844 screenshots at compact widths, with the shared image viewer.

Without a clip, `mode=guided` and `mode=poster` reuse DemoShell's presentation mode with no toolbar or reserved toolbar height. A `clip=dish|buyers|calendar|analytics|dish-comparison|production|order-detail` query mounts the corresponding native component directly. Guided clips loop and poster clips hold the same result for a still capture. The dish clip opens Soy chicken bowl from the native Menu, holds on the sourced photo and closes the editor. The buyers clip inspects cumulative unique buyers. Analytics and dish comparison use one native Period chip each and switch from daily values for This week to weekly totals for This month. Both derive their series from the same fictional purchases. Analytics also filters to Casa Verde and switches from Area to Line. The production clip filters the native queue. The order-detail clip slides in the native panel for the same fixture order in a separate case card. Fresh clean captures are the stills for reduced motion and host failure. Only the outer browser title and centered launch button remain. Opening the manual dialog unmounts inline playback and creates a fresh host with the original controls and no script. The frame validates ready/unavailable messages and falls back to the still after a failed readiness check.

The local importer applies preventScroll only to native focus calls in KitchenOverview, Menu and modal focus-scope when `mode=guided`; manual focus behavior is unchanged. Actor scrolling targets the native scroll panel only. Guided-only focus outlines are hidden because the cursor represents mouse input; manual keyboard outlines remain. The inline iframe is inert and receives no user input.

Owner playback evidence and rollback delta: `/tmp/port59-kitchen-playback/`. See `REHEARSAL.md` for checks and limits. No operational Saavi source or release scope changed.

## Admin and role selection

Kitchen remains first/default; Admin is second. The submitted Soy chicken bowl fixture uses the existing Kitchen photo in the native list and detail, including after a review or restart. The local Kitchen store rejects submissions with both photo slots empty. In the opened desktop case demo, the shared top toolbar in `DemoShell` switches Kitchen and Admin and holds theme, Restart and Close. The standalone host uses the bottom scenario bar. `roles.tsx` renders the native header identity. The case preview always shows Kitchen. Each interactive launch starts in Kitchen and the selection lives inside the opened workspace.

`admin-adapter.mjs` adapts native imports locally: initial Overview in manual mode, initial Restaurants and Restaurants/Analytics in authored playback, the existing Sales demo contract and disabled out-of-scope Product Analytics. Manual mode enables Overview, Offers, Orders, Submitted dishes (the native counterpart of Figma Review), Production, Delivery, Team and Invitations. `admin-store.ts` serves native DTOs for fictional Casa Verde/Sea Breeze, acceptance commands and dish details; `admin-manual-store.ts` adds the native Review fixture transport, current-session dated work/Order details, Delivery schedule, Team/Invitations reads and disposable table preferences. `admin-scenario.ts` owns the shared manual read model: 15 orders (10 delivered, three current work rows, two awaiting work), six offers with local photographs and immutable purchased/source snapshots, period-relative Overview summaries and all five attention destinations. Manual filters and native offer price/order changes are disposable; Restart returns Admin to Overview. The native SalesBreakdown card grid replaces only the Sales demo money table through the existing import adapter. Unknown endpoints fail closed. The native Sales fixture retains its fixed Oct 5–Nov 1, 2026 period and coherent All/Casa Verde/Sea Breeze totals (R$3,840/R$2,400/R$1,440). Authentication, access mutations, invitation sending and operational persistence remain excluded; native Local access controls remain disabled.

Manual navigation mapping: Figma Admin page `6:6`, Review table `1506:460` → `AdminSubmittedWorkspace`; Production → `AdminProductionWorkspace`; Delivery → `AdminDeliveriesWorkspace`; Team/Invitations → `AdminAccessWorkspace`. The design map explicitly marks Delivery, User management and Invitations layouts missing, so these reuse the admitted native implementation without a Figma-parity claim. **Admission Office has no matching label in the Admin page or source navigation.** PRODUCT/Ivan identification remains open; it is not silently mapped to Offers or Orders. No replacement layout was invented. Manual-tab evidence and isolated rollback delta: `/tmp/port59-admin-tabs/`.

The Admin cursor loop shows Restaurants → Analytics/Sales → All → Casa Verde → Sea Breeze → hidden reset. Compact playback uses the native navigation menu and Filters sheet. Manual mode has no script; Restart resets both fixture stores and the selected role's initial screen, while reopening from the case starts a fresh Kitchen session. Theme resets to light on reopening. Only the selected guided product instance runs.

Clean Admin stills cover reduced motion and host failure. `KitchenGuidedFrame` also preserves parent focus when native authored menus focus their inert iframe; manual native focus is unchanged. The shared `CaseGuidedShowcase` uses the same desktop launcher and compact image viewer across the portfolio. Case copy, orange imagery, company/role metadata and production static/noindex policy remain unchanged.

Admin owner evidence and isolated rollback patch: `/tmp/port59-admin/`. See `REHEARSAL.md`. Local entry remains http://127.0.0.1:3305/projects/saavi#kitchen; standalone Admin can be reviewed at http://127.0.0.1:3310/?role=admin. No Saavi operational source edits or deployment.

Payment marks: Visa, Mastercard and Cash use the native Saavi Icon catalog. Apple Pay uses unchanged official Apple artwork in `public/images/saavi/payments/`, with provenance beside it. The pending Admin methods remain Cash, preserving their original payment state; these are local presentation labels, not new service payment types.
