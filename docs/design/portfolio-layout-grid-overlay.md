# Portfolio Layout Grid And Animated Overlay

Status: approved home/Manifesto grid and bottom controls implemented; FRONTEND owner checks and independent local QA passed on ugT19m6ZMO_fHeD2iAwil. PRODUCT reviewed QA evidence/screenshots; ready for Ivan's local review. Project pages remain outside implementation; no publication authorized.
Date: 2026-10-28.
Task: [PORT-19](https://app.notion.com/p/407fe5f58cf5815aa369c1abe1c25137), created/read back as Ready / Discovery / DESIGN SYSTEM.
Accountable PRODUCT. Foundation owner DESIGN SYSTEM; composed study owner DESIGNER; admitted sequence DESIGN SYSTEM → DESIGNER → PRODUCT/Ivan review. Current executor/lifecycle belongs in the Task.

## Current Direction Correction — Equal Modular Columns

### Current Implementation Admission — Home And Manifesto

Ivan's latest explicit “давай реализовывай” supersedes the earlier mockups-only limit for the accepted grid/controls and Manifesto, not for Citymobil or other project pages. Approved reference: same board2599:1131 and Final State Contours Result. Current executor FRONTEND; admitted continuation FRONTEND → independent QA → PRODUCT. DESIGNER has released this feature's Figma writer and separately owns Citymobil proposal revisions; frontend reads approved Figma definitions through MCP only and does not mutate the file.

Observable outcome: `/` and `/manifesto` use the approved shared12-column desktop3/9 and2-column mobile recipe, with one bottom-right toggle and mobile horizontal grid-left/Contact-right dock. Grid content and overlay consume one shared token/derived-geometry owner, not independently matching constants. Off has dark16% contour, On warm existing semantic contour, distinct Focus;44px targets,12px dock gap,24px protected edge baseline plus safe insets, actual translucent raspberry/background blur/shadow and readable fallback. DefaultOff; no new storage/lifecycle/analytics. Reuse existing Header/Contact native dialog, semantic variables, PortfolioArrow/icon seam, editorial row and viewport-motion patterns after inspecting their live owners. Adopt minimal portfolio-owned grid primitive (direction2), not an external library/parallel style layer. Existing home full/compact header behavior, native Back, exact Manifesto21 statements/arrows, career/project facts and all media remain preserved. Do not redesign project routes or port Citymobil storytelling under this Task; shared changes must not regress those routes.

Root cause: current runtime editorial rails and top/header utility placement are not the accepted equal-grid/bottom-dock design. The owner is shared responsive layout/control geometry, not route-local patches or portfolio content. Inspect the canonical live owner before adding code; remove only proven-obsolete replaced overlap and preserve unrelated dirty changes. Treat implementation as open until actual runtime proof exists; Figma renders or old player checks cannot substitute.

Bounded plan:
1. FRONTEND reads AGENTS, own card, current state/system relevant route/shared/style sections, this admission and Final State Contours Result, plus applicable frontend/design-to-code/motion/mobile skills. Inspect source/dirty state; bind implementation to approved definitions without Figma mutations or generated evidence entering Git.
2. Implement the single shared grid/overlay/dock on home and Manifesto, preserve current site content/header/dialog/Back and project routes. Overlay is decorative, nonblocking and has no reflow; shared available-width origin accounts for scrollbars/safe areas/fractions. Mobile Contact uses existing dialog behavior with focus return to the actual dock trigger, not a removed header control. Do not create competing mobile triggers. Keep final footer/links reachable above dock; reserve derives from current44px row plus protected bottom inset, not historical100px stack.
3. FRONTEND validates targeted tests/type/build/hygiene and relevant HTTP/browser owner checks; fix forward within this boundary. Exercise actual Off/On/rapid reversal, scroll alignment, Contact open/close/Escape/focus/scroll lock, safe/mobile/short-height/end-of-content, blur fallback/reduced motion and preserved no-JS/failure readability. Use375/390/599/600/848/1440 as focused responsive transitions; no horizontal overflow. Figma MCP-only restriction does not prohibit browser QA of the portfolio runtime.
4. After update/read-back, FRONTEND releases files/runtime to existing QA chat01a17d63-3788-7230-a3d0-3ac0f5c88de2 for independent desktop/mobile/focus/overflow/console/no-JS/route/Back acceptance; include read-only project-route regression, not their redesign. QA reports/fixes route back to FRONTEND, never changes code itself. Final local acceptance returns to PRODUCT; no commit/push/deploy or external release.

Rollback: record exact changed owners/diff and restore only this feature's own changes after checking dependencies; never reset the dirty repository. Stop for architecture/lifecycle/schema changes or conflicting user edits. Missing Figma click execution is a disclosed design limitation, not a prerequisite that prevents the newly authorized runtime implementation/tests. Do not mark overall DoD passed until required checks and independent acceptance are obtained; omissions need their precise coverage consequence.

### Current Review Feedback — Bottom Floating Controls

Ivan likes the equal-r2 proposal and asks to move the grid control to the bottom. The12/2 equal-column foundation, desktop3/9 spans, mobile1/2 spans and existing overlay/motion direction are accepted; this is not permission to implement the website. Revise the existing isolated study, not a new page or design system.

- Visible issue: the upper utility control is not in the desired thumb-reachable position. Demonstrated cause: the r2 study places it in the desktop upper outset and a mobile row beneath the header. Canonical owner: the shared controls/placement study, not grid math or website Header. Reuse the current local icon, control states, contact destinations/dialog, type/color/spacing and approved equal-grid definitions.
- Mobile latest correction: a single HORIZONTAL floating row at the lower right, grid icon LEFT and Contact RIGHT, vertically centered. Ivan's clarifying “в ряд сначала слева … колонки, а потом Contact” supersedes the previous grid-above/Contact-below study. Contact remains primary and nearest the right thumb; preserve fully rounded shapes, existing targets,12px separation and protected24px edge insets. Contact retains its label and existing contact behavior; no new destination/state model. Keep one mobile Contact trigger in the isolated study, not competing header/dock triggers; do not change original source headers/runtime.
- Latest accepted state correction: Ivan approves the horizontal composition but now explicitly wants an outline when grid is ON and a dark outline when OFF. This supersedes the borderless resting/On proposal. Reuse a visible warm-yellow On contour and a dark16%-opacity Off contour within the existing control family; keep the52px Focus indicator independent,44px target/overall geometry unchanged, and preserve current icon/material/blur/shadow. Apply consistent states to desktop and mobile consumers; no new variant family or board clone.
- Secondary grid control: raspberry/background-colored, slightly translucent fill with background blur and a soft shadow; fully rounded silhouette, existing warm-yellow icon. Reuse existing tokens/effects where compatible. Any needed minimal effect/radius belongs to the local reusable control owner, not a palette/collection rebuild. Show actual background blur if supported, not a blurred screenshot; document unsupported rendering and a readable opaque fallback.
- Confirmed device mapping: Ivan explicitly answered “Да, именно так” to PRODUCT's clarification: mobile has two floating controls (Contact and grid); desktop has only the grid control fixed bottom-right. Desktop Email/LinkedIn/GitHub remain unchanged. Device ambiguity is resolved; final control composition/material still returns for review before implementation.
- Preserve44px-minimum reachable targets, Off/On/Focus and pressed intent, contrast over text/photo/grid, right/bottom safe-inset allowance and separation. Demonstrate375/390 mobile, desktop1440 and short-height behavior. Keep final content/footer reachable and visible above the dock when scrolled to the end; do not permanently cover text or inflate the minimal header. Contact/evidence dialogs remain above the dock/grid, with a visible Close and return to the invoking trigger; grid remains decorative/nonblocking. Specify keyboard/reduced-motion/browser-inset intent without claiming Figma proves runtime semantics.
- Verify revised resting states and supported native grid/Contact open-close paths; preserve unchanged content geometry and all unrelated source roots/user edits. Existing motion is reused, not re-engineered. Scope evidence to the changed placement/material/paths and keep unsupported native/continuous-interruption/OS/runtime limits explicit. No new global settings, persistence, analytics, code, publication or token migration. Avoid duplicating the whole933-node study merely to move controls; record exact changed/created IDs and a bounded rollback.

Next: DESIGNER updates the same review board, saves bounded proof, updates/read-backs PORT-19, releases Figma and returns to PRODUCT/Ivan for approval of the final controls. This correction supersedes r2's top-toggle placement only; historical evidence below remains attributable to that earlier state.

Horizontal-row revision check: recompute dock width/height, coordinates and scroll-end reserve for375/390 and short-height samples. Do not retain obsolete100px vertical-dock height/128px tail as though still required, nor shrink a44px target to fit. Verify final links remain reachable with safe-inset intent; original content/grid/motion geometry and MCP-only interaction limits stay unchanged. Edit the existing dock/control owners in place, recording exact changes rather than duplicating the board. Earlier vertical-placement measurements are history, not current proof.

Execution constraint from Ivan: all current/future Figma work is MCP-only under `docs/process/agent-workflow.md` → Figma Access Boundary. No Figma browser navigation/automation or browser-based prototype verification. Use supported MCP reads/writes/exports; disclose missing MCP interaction capability instead of falling back. Earlier native-player/browser checks below are historical, not MCP verification of this revision. Portfolio runtime browser QA is a separate boundary.

Latest scope clarification: Ivan initially mentioned coding, then explicitly corrected himself to “только в макетах нам нужно работать”. The final clarification governs: no frontend work on home, Manifesto or project pages, no automatic implementation handoff. He requests updating his manually authored component and keeping the image he likes, with art direction postponed until he returns home. PRODUCT asked whether the component is the known Citymobil `Case / Project overview`2516:15; target confirmation is pending. Do not mutate that protected master, its54px gap, media or project narrative under this grid-control Task. Route the confirmed component update under its existing project-design owner after resolving the exact requested change; preserve all live user edits.

PRODUCT relayed Ivan's correction on 2026-10-28: the canonical proposal must use **12 equal desktop columns**, with small blocks spanning **3** and large blocks **9**, and **2 equal mobile columns**, with block spans **1 / 2**. This does not require all mobile prose to sit side by side. This instruction supersedes the asymmetric 160/24/residual recommendation and its rejection of equal columns below. Historical calculations, tokens and partial consumers are preserved for an explicit DESIGN SYSTEM revision; they are not the accepted foundation and must not be silently normalized or deleted.

DESIGNER stopped the asymmetric construction, then resumed only after DESIGN SYSTEM handed back the corrected equal-column foundation on this same Task. The completed corrected study is recorded under Equal r2 DESIGNER Result below. Original homepage, Manifesto, Citymobil and Ivan's live overview edits, including its 54px gap, remain preserved; no active frontend adoption.

For container width C, column count N and structural gutter G: `column = (C - (N-1)*G)/N`; `span(S) = S*column + (S-1)*G`. With the provisional existing desktop C800/G24, twelve equal columns give a 182px span3 and 594px span9, separated by24px. This is not a 200/600 percentage split. At mobile C342/G24, two columns are159px each; at C327 they are151.5px. Full-span reading blocks retain342/327px. The completed r2 register at the end of this document verifies gutter/intermediate/wide/content-fit behavior through18 native-grid Figma samples. This is Figma foundation proof, not runtime or completed control/motion approval.

### Preserved Partial DESIGNER Study

All objects below remain on isolated page `2569:2`; they demonstrate the superseded asymmetric proposal only. No existing grid variable, source component, source frame or website code was changed by DESIGNER. The shared token/recipe revision belongs to DESIGN SYSTEM.

| Artifact | Exact IDs / saved proof | Current boundary |
| --- | --- | --- |
| Real-content state section | `2580:305`; desktop Off/On/Focus `2580:311`, `2580:398`, `2580:485`; mobile `2580:573`, `2580:646`, `2580:719` | Editable partial composition; final integrated geometry/binding audit incomplete |
| Grid icon / controls | Local Lucide Columns2 icon `2580:122`; toggle set `2580:142` | 44px Off/On/Focus targets; icon SVG fill correction saved, native toggle paths not exercised |
| Full-bleed / wide sample | `2580:821`; photo `2580:822`; content `2580:824`; overlay `2580:830` | Reuses the existing generated Citymobil photo; original source remains untouched |
| Motion study | Frame `2580:842`, overlay `2580:899`; `motion-readback.json` | Native manual translation/opacity tracks written and video export completed. Native control/scroll/Contact paths, interruption and reduced-motion playback not exercised |
| Contact sheet | `2580:797` | Static editable study; opening/closing and modal stacking not exercised |
| Creation / mutation receipt | `work/port19/build-result.json`, `work/port19/visual-fix.json`, `work/port19/suspended-state.json` | Exact owned IDs retained; no deletion or old-token migration |
| Exported study | `outputs/port19/grid-states.png`, `grid-desktop-on.png`, `grid-mobile-on.png`, `grid-wide-on.png`, `grid-upward-fade.mp4`, `motion-01.png` through `motion-05.png` | Exports exist; post-correction final visual acceptance is incomplete and obsolete geometry is not approved |

Paths in this receipt are relative to `/Users/ivan/Documents/Codex/2026-10-28/portfolio-designer/`. Before-source snapshots for all seven named roots are saved in `work/port19/before-{home,manifesto,city}.json`; a matching final after-source comparison was not completed before the stop. Motion source readback/export is narrower evidence than an exercised interactive toggle or website behavior. The study is not a completed design delivery or Global QA acceptance.

Recovery must use the exact owned node IDs in the ledgers and coordinate later consumers. Do not delete page `2569:2`, DESIGN SYSTEM's 17 grid variables, its calibration masters or any shared collection to clear this partial study. PRODUCT returns the same Task to DESIGN SYSTEM for the equal-column foundation; DESIGNER has no further Figma writes in this boundary.

## Outcome And Root Cause

Calculate a small consistent desktop/mobile layout system and demonstrate a public icon toggle with an animated column overlay in the existing Figma file. Content and overlay must consume the same grid tokens. Ivan explicitly confirms a bottom-up entrance with fade and asks to determine the design before coding.

Are we fixing the root cause, or only a visible symptom?

- Problem: the first proposal preserved asymmetric rails, while Ivan wants equal modular columns and explicit desktop3/9 spans. Content must be recomposed to the grid, not merely decorated with12 bars.
- Demonstrated gap: current runtime/Figma use a centered800px editorial lane,160px metadata rail and24px gap, but earlier Foundations treat those dimensions as geometry constants. There is no verified common grid recipe or overlay consumer. Current values must be read live rather than inferred from a screenshot.
- Canonical owner: this grid contract, the minimal grid-only Figma token namespace and one review study. Existing homepage, Manifesto and Citymobil remain their own accepted/pending owners until adoption is approved.
- Reuse: existing Portfolio spacing/color/type/icon primitives, editorial rows, compact Header and Contact intent. Do not import an external system or rebuild the existing136-variable/19-style Foundations.

Design-system direction **2: establish one small portfolio-owned grid primitive**, reusing existing compatible tokens and patterns. No parallel visual system.

## Plan And Writer Boundary

1. DESIGN SYSTEM inspects focused live code/Figma geometry; calculates one recommended responsive recipe, span/exception map and minimal semantic tokens. Equal-column r2 revision completed: see Equal-Column r2 Foundation and Equal r2 Saved Artifact. The first asymmetric calculation is historical; all existing values/IDs/consumers stay preserved.
2. After Notion update/read-back and releasing Figma, DESIGN SYSTEM directly hands the same Task to existing DESIGNER `01a17d62-78ae-7bf0-923d-f8314494cf57`. DESIGNER builds the desktop/mobile toggle/overlay study using those exact definitions and representative real content. Complete: corrected section `2599:1131`, native equal content rows, existing grid control instances and shared overlay masters. Suspended r1 objects remain unchanged.
3. DESIGNER verifies bindings, geometric equality, visual states and supported motion; updates/read-backs the Task and returns to PRODUCT/Ivan. Design verification complete: native desktop/mobile toggles, mobile scroll/Contact/project paths, ordinary and opacity-only motion exports, zero span-edge findings and 30 matching protected-root signatures. Keyboard/OS preference/runtime and continuous interruption limits remain explicit below. No FRONTEND handoff before Ivan approves.

Use one clearly named dedicated grid-study page/section in existing file `qnmQs8GxVjZQFKbGU4tR08`; coordinate exact IDs between owners and use one Figma writer at a time. Do not mutate approved homepage/Manifesto, live user-edited Citymobil components, current source files or an active role's runtime work. Isolated study copies may show proposed normalization; record it rather than silently retrofit other pages.

## Calculation Contract — DESIGN SYSTEM

Read actual content/frame bounds, container insets/maxima, metadata/detail widths, gaps, alignment and wrapping in the named samples. Separate structural column gutters from component icon/text gaps and vertical rhythm: they can alias the same spacing foundation without being the same semantic role.

Document each desktop/mobile/narrow-desktop sample with viewport width, content width, outer margins, column definition, gutter, valid spans and actual start/end coordinates. Use375/390 mobile,600 transition and1440 desktop as minimum calculation samples; inspect599 and848 container/breakpoint behavior where relevant. Show the formula and fractional-pixel/rounding policy so columns always total the container width with no accumulated drift.

The formula's width reference is the available layout/frame width, not an OS window/screen width. Record scrollbar/safe-inset assumptions; future fixed overlay and content must share the same containing-width reference, not independently use `100vw` versus `%`. Preserve fractional derived widths rather than rounding every track separately. Figma geometry proof does not claim physical-browser scrollbar/safe-area testing.

- Generic equal-column formula: `C = min(maxContent, V - 2P)`; `W = (C - (N-1)G) / N`. Do not pick N solely to make the overlay decorative.
- Historical source baseline: desktop editorial rails `A=160`, `G=24`, `B=C-A-G`; at `C=800`, B=616. The corrected proposal deliberately changes this to equal desktop columns and3/9 spans. Quantify that difference without mutating original consumers. Mobile uses two equal columns; prose may span both. Do not create negative/tiny tracks on narrow screens.
- Equal columns are now Ivan's explicit direction, not an optional alternative. Preserve fractional widths and calculate valid spans, wide/media exceptions and readable stacking at intermediate widths; no independent decorative grid or automatic adoption by current pages.
- Cover the current home/Manifesto editorial lane, a Citymobil wide/full-viewport scene and their headers/contacts. Full-bleed media may intentionally break the content lane; captions/narrative still need explicit alignment. Back/toggle utility outsets must be named exceptions, not unexplained misalignment.
- Report actual code/Figma differences, including implicit wrap thresholds versus runtime breakpoints; recommend one coherent rule without changing active consumers. A diagram/grid cannot certify existing pages have already migrated.

Token inventory stays minimal: content max/insets, structural rail/column count or weights, column gutter, breakpoint/mode rules, any wide/full-bleed variant and overlay visual ingredients. Reuse existing semantic spacing and palette aliases. Add no unrelated responsive typography/theme matrix. A grid-only responsive collection or explicit structural variants are permitted if needed; do not change existing collections' modes/defaults.

Bind actual study container/rail/gap and overlay geometry to the SAME variable IDs/derived layout recipe, not two matching-looking hardcoded sets. Prefer FILL/auto-layout for derived widths. If a native Figma layout-grid property cannot bind through the supported API, use a supported token-bound overlay representation and disclose the limit; annotations alone are not binding proof. Record any proposed WEB variable mapping as planned, not already adopted runtime CSS. Preserve existing shared definitions and user-edited54px Citymobil vertical gap.

## Toggle And Motion Study — DESIGNER

- One small recognizable grid-icon control, Off by default, with Off/On/Focus states and a44px accessible target. Use a supplied local icon if suitable; no new icon library or floating toolbar. Show a recommended desktop/mobile placement that does not crowd the name, Back or Contact, cover reading content or create overflow.
- Semi-transparent column/rail overlay sits above content with a separate stacking layer. It does not change document geometry, push text, intercept clicks, steal focus or block scrolling. Toggle stays usable above the overlay; Contact dialogs/evidence viewers remain above it. Represent `pointer-events:none`/noninteractive-overlay intent explicitly.
- Show both enabled and disabled states over representative real content at desktop/mobile widths. Existing text/links remain readable. Do not recolor the underlying site or put labels on every content item. Overlay paints/opacity use existing palette ingredients through a small semantic role, not a parallel palette.
- Entrance is a modest upward translation from below plus fade; exit reverses smoothly and supports interruption. Use existing motion language, normally160–240ms, no bounce, perpetual movement, scrolljacking or animated layout dimensions. Reduced-motion intent removes translation and retains a gentle opacity change. These are proposals until verified/approved.
- Build a supported native Figma toggle/transition prototype where feasible. Load applicable `figma-use`, `figma-generate-design` and motion skills; obey availability gates. If a motion API is unsupported, stop those calls and report the limitation, retaining static states/timing as unverified intent rather than claiming playback. A resting screenshot proves only the resting state.
- Grid pattern can be viewport-fixed while the document scrolls; show/annotate clipping/scroll behavior and no reflow. Do not claim browser z-index, keyboard, focus, responsive or persistence behavior from static Figma frames. Toggle semantics should map to a future named `aria-pressed` button; overlay is decorative/hidden from assistive technology.
- Do not add storage, route-history, preference persistence, server state or analytics. Those lifecycle decisions are not part of this design admission.

## Named Inputs And Preservation

- `docs/design/portfolio-figma-foundations.md` → `Reconciled Foundations — Current Consumer Contract`, `Token And Component Consumers`, current geometry/row notes and exact local IDs. Live values supersede historical specimen dimensions; preserve shared style/alias/property identities.
- `src/app/globals.css` → PORT-16 semantic/editorial/Header rules; `src/components/layout/Header.tsx`, `HomePage.tsx`, `portfolio/PortfolioArrow.tsx`, `src/lib/site-content.ts`: focused read-only geometry/content/icon references. No source facts or current CSS change.
- Figma Foundations2459:2; homepage2469:2, desktop2469:4/mobile2469:5; Manifesto2530:62/2530:63 with current markers; Citymobil r2 desktop2539:444/mobile2539:593, user-edited overview2516:15. Inspect source identities before use; preserve original frames/masters and all live user edits.
- PORT-18 is independently implementing the approved Manifesto with the current800px/24px editorial geometry. This grid proposal must not alter its dependencies or authorize FRONTEND to adopt unapproved tokens/layout changes.
- Screenshot supplied earlier is a visual reference for overlay intention, not authority for red tint, exact widths or active-page mutation. Ivan's later explicit instruction supplies the12-desktop/2-mobile column counts and3/9 desktop spans.

## Acceptance And Open Conditions

- A concise reproducible desktop/mobile calculation table/formula, source-based recommended grid, explicit spans/nested gaps/wide-media/utility exceptions and any proposed geometry differences.
- One named grid owner and minimal reusable token mapping; actual content/overlay study consumers share IDs/derived geometry. Existing unrelated definitions/consumers unchanged; all mutation IDs and bounded rollback recorded.
- Editable desktop/mobile Off/On/Focus review examples with the same content geometry in both states, useful control placement, full reading/click/scroll/dialog intent, readable overlay and no clipping/overflow.
- Supported animated toggle playback checked when available; saved keyframes/reactions and actual exercised proof identified separately from storyboard annotations. Unsupported motion remains an explicit open gate.
- Scoped structural/binding/geometry checks plus inspected screenshots; no app build or unrelated QA padded into this Figma-only outcome. Exact before/after/source/mutation evidence lives outside Git; no generated caches/logs/assets committed.
- Each owner updates/fetches the same Task before direct handoff. Final executor PRODUCT/Ivan reviews the recommendation before any website implementation/token migration. Task stays open for unresolved grid/adoption decisions, missing required proof or an unsupported motion capability.

## Result

Equal-grid, horizontal composition and final state contours are accepted. Ivan's Current Implementation Admission above supersedes the earlier mockups-only limit for home/Manifesto. The implementation checkpoint below supplies current portfolio-runtime proof; saved Figma-only limits and earlier studies remain attributable to their original phases.

## FRONTEND Implementation Checkpoint — 2026-10-28

PORT-19 implements the approved shared feature on [home](http://127.0.0.1:3100/) and [Manifesto](http://127.0.0.1:3100/manifesto), final production build **`ugT19m6ZMO_fHeD2iAwil`**. The source cause was the active160/616 editorial row and header-positioned mobile utility, with no active equal-grid/overlay owner. The fix belongs to shared layout/control geometry, not portfolio facts or project storytelling. The representative Figma study supplies the grid/control contract; the full homepage retains all nine career records, five projects, Personal and its existing opening/compact header.

### Owners, Reuse And One Geometry Recipe

Design-system direction **2: a minimal portfolio-owned grid primitive**. `src/app/globals.css` owns `--grid-*`, `.portfolio-grid-lane` and `.portfolio-grid-tracks`, mapped to the approved neutral/equal definitions. Existing content maximum800,24px spacing,8px compact spacing, primary/background/border roles, typography and curve are reused. `PortfolioGrid.tsx` is the only active overlay/dock controller. `Header.tsx` admits it only on `/` and `/manifesto`, retains the same Contact state/native `ContactSheet`, and points its existing return-focus ref at the actual dock button. On those routes the competing mobile header button is removed. Project/index routes retain their existing header trigger and have no grid/dock DOM.

The lane uses the body's available inline width after scrollbar reservation, additive24px+safe-left/right protection and the existing800px maximum. Header and main consume the same lane class. Native CSS GRID computes12 equal desktop columns with3/9 spans, or2 mobile columns with1/1 compact career blocks and full-span reading copy. At1440: lane320–1120, small182, main594 beginning526. At390: lane24–366, two159px tracks at24/207. Manifesto labels use the small span and its unchanged statement list the reading span. Full introduction/header/project/footer blocks retain full-reading intent; the introduction now consumes the approved whole lane.

The fixed overlay reads the main's actual rectangle and the rendered track count/gutter through one observer/resize seam. It does not recompute columns from100vw, screen width or separately rounded arithmetic. Content and overlay use the same native track class; fractions remain native layout units. Desktop fit queries stack reading blocks below the documented464px content threshold and select the same2-column fallback when12 gutters cannot fit. A600px viewport with injected150px safe protection per side exercised252px available content, full-span reading blocks, matching2-column overlay and wrapped in-lane Header. Normal599/600/848 transitions preserve the accepted baseline. The original asymmetric active row CSS was removed after both consumers migrated. Historical `GridOverlay.tsx` remains referenced only by quarantined `legacy-home/Header.tsx`; deleting that retained family is outside this feature, and it is not a second active overlay.

The horizontal mobile dock is158×44 (grid44 + gap12 + Contact102), with24px protected right/bottom baselines plus safe insets. Desktop retains the44px grid control only. Its background is actual72% raspberry with backdrop blur and one0/4/12 black22% shadow; opaque `@supports` fallback retains readability. CSS blur8px is the high-fidelity context's translation of the native Figma BACKGROUND_BLUR16 effect. OFF has black16% inset contour/icon64%, ON uses the existing warm64% border role/icon100%, and keyboard Focus adds a separate52px indicator without replacing pressed state. Installed `Columns2 size={16}` is the exact Lucide source identified in Figma2580:122; existing `PortfolioArrow` SVGs/geometry remain unchanged.

The reserve derives from44px row +24px bottom baseline + safe-bottom, rounded up to the existing8px rhythm (72px baseline), with the study's32px content tail. Native375×600 end views show36px final-link clearance on both pages; simulated34px safe-bottom gives34px clearance. The overlay is permanently decorative/aria-hidden, clipped to the viewport, pointer-events none and below Header/dock/native dialog. Off is the default on each route mount; state is memory-only. No new storage, lifecycle service, context provider, dependency or analytics was introduced.

Changed runtime owners: `src/components/portfolio/PortfolioGrid.tsx` (new), `src/components/layout/Header.tsx`, `src/components/layout/HomePage.tsx`, `src/components/ManifestoContent.tsx`, `src/app/globals.css`. Home/Manifesto remain server compositions with existing small client islands. `ContactSheet`, `RepeatReveal`, arrows, route entries, canonical career/contact/Personal/project data, Manifesto's exact array/corpus, all project route sources, assets/package files and separate Citymobil Figma work are preserved. Eighteen of22 named intake sources are byte-identical; the other four are precisely the admitted existing owners above.

### Runtime Verification

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Production build/type/HTTP | Next15.5.18, final local build above | Passed: production compile and validity-of-types;200 on home, Manifesto, project index and five cases; served CSS equals final build bytes | `test-results/port19-grid/build.log`, `runtime.json` |
| Shared grid and spans | IAB375/390/599/600/848/1440, both routes:12 cases | Passed: correct2/12 counts,3/9 or1/1+2, same lane/overlay origins and widths, native fractions, no horizontal overflow; Header lane matches | `browser-owner-checks.json`, `recorded-checks-result.json` |
| Exact content / assets / semantics | DOM vs canonical career/Manifesto snapshots; source hashes | Passed: nine exact career records, four ordered groups/21 statements,21 loaded16px markers in20px slots/y2, valid ul/li and primary Manifesto color;16px grid icon | `expected-site-copy.json`, `source-integrity.json`, final marker readback |
| States / material / keyboard | Actual Off, On and focus-visible states | Passed:44px target; actual72% fill, blur/shadow, black16% Off and warm64% On contour; independent1px/3px-offset Focus; keyboard toggle immediate | `off-on-focus-material-keyboard` in browser evidence |
| Toggle / rapid reversal / reduced | Native pointer events;91 sampled frames per mode | Passed: four alternating activations retarget from intermediate opacity/8px values and settle Off; reduced mode has partial opacity with transform none. Document height remains1444 throughout; toggle creates no reflow | `regular-rapid-reversal`, `reduced-rapid-reversal` |
| Native Contact reuse |375×600; pointer Close, Tab cycle, Escape,600px resize | Passed: Close→Email→LinkedIn→GitHub cycle; Escape/pointer return to actual dock trigger and exact844px scroll; resize closes/unlocks and focuses visible desktop Email | Contact checks in browser evidence |
| Footer / safe / scrollbar / fit |375×600 end views, injected left20/bottom34, actual17px reserved scrollbar, narrowed desktop fit | Passed:36px baseline final-link clearance on both pages, safe-adjusted geometry/clearance, same available358px root and310px lane with scrollbar; no drift or overflow | Same evidence; [home end](/Users/ivan/Documents/Codex/2026-10-27/portfolio-frontend/outputs/port19/home-mobile-scroll-end.jpg), [Manifesto end](/Users/ivan/Documents/Codex/2026-10-27/portfolio-frontend/outputs/port19/manifesto-mobile-scroll-end.jpg) |
| Click-through / Header / native return | Active grid, desktop1440×900 and mobile390×812; mobile Back from open dialog | Passed: underlying Manifesto link receives native pointer hit; exact home1588→1588 desktop and2240→2240 mobile;44px compact header and existing full/compact flow reservation retained, modal lock removed | Native-Back records |
| Progressive readability | Both routes no-JS; controlled IO and lane RO failure; native scrolling/focus | Passed: all content visible/no overflow, hidden inactive dock and three fallback contact links;21 Manifesto items remain readable; resize fallback aligns overlay. Existing repeat entry/exit,160ms reduced opacity-only reveal and44px outlined focused footer remain usable | No-JS/failure/reveal/keyboard records |
| Opaque fallback | Documented fallback declarations forced in supporting browser | Passed for opaque material/readability; the actual unsupported-backdrop engine branch is source-verified, not an engine compatibility claim | `forced-opaque-fallback` |
| Project preservation | Index + five cases at390/1440; native project Header Contact | Passed: zero grid/dock mounts and no horizontal overflow; original header trigger/focus/unlock retained. Narrative/media/gallery behavior was not redesigned |12 read-only route snapshots and source hashes |
| Console / cleanup / hygiene | Scoped tests and fresh uninjected load/toggle/Contact/Escape | Passed: no console/page warnings/errors; all temporary probes/inset/media/scrollbar overrides removed, viewport reset; hygiene and whitespace exit0 | Browser records; final hygiene/whitespace checkpoint |

Final screenshots are native IAB JPEG captures, visually inspected at desktop/mobile and scroll end: [home desktop](/Users/ivan/Documents/Codex/2026-10-27/portfolio-frontend/outputs/port19/home-desktop-on.jpg), [home mobile](/Users/ivan/Documents/Codex/2026-10-27/portfolio-frontend/outputs/port19/home-mobile-on.jpg), [Manifesto desktop](/Users/ivan/Documents/Codex/2026-10-27/portfolio-frontend/outputs/port19/manifesto-desktop-on.jpg). Earlier clipped CDP captures are quarantined under ignored `capture-preflight/` and are not delivery proof. This is capture QA only; no stopped color/profile diagnosis or global browser setting change was resumed.

Evidence: `/Users/ivan/Developer/cheremisin-portfolio/test-results/port19-grid/`; outputs: `/Users/ivan/Documents/Codex/2026-10-27/portfolio-frontend/outputs/port19/`. Figma reads used session `59576818-17bc-4436-9552-ce7d6f7d0d6f`, board2599:1131 plus full desktop1137/mobile1506/Focus2616:1781 contexts/screenshots. No Figma mutation or Figma browser/native fallback was used. The independent formula check uses `w=(C−(N−1)G)/N`, `span(s)=s*w+(s−1)G`; native browser layout-unit tolerance is0.05px, with no code-side rounding.

### Motion And React Owner Review

| Before | After | Why |
| --- | --- | --- |
| A new press transition could also animate a keyboard activation | Focus-visible controls have no press transition; keyboard grid events switch immediately. Pointer press120ms/release100ms use the existing curve | Keep keyboard response immediate and make pointer release snappier; no layout-property animation |

**Motion owner review: Approve.** Occasional grid entry/exit has the admitted200ms opacity/8px purpose, strong existing ease-out, CSS retargeting, reduced opacity-only mode and no delayed keyboard response. Source: [overlay transitions](/Users/ivan/Developer/cheremisin-portfolio/src/app/globals.css:432), [press/focus behavior](/Users/ivan/Developer/cheremisin-portfolio/src/app/globals.css:446), [keyboard modality](/Users/ivan/Developer/cheremisin-portfolio/src/components/portfolio/PortfolioGrid.tsx:48). React review found no remaining issue in the scoped diff: server copy ownership retained, no fetching/storage/context, functional toggle updates, shared modal ref, observer/listener cleanup, stable route-key reset and accessible button/list semantics.

**Implementation DoD: Passed. Global QA Acceptance: Open.** Release files/runtime to the existing QA owner on this exact served build; QA verifies the admitted feature independently and returns defects directly to FRONTEND, passed evidence to PRODUCT/Ivan local review. PORT-19 remains open for required QA failure, a source/design departure or missing acceptance. Physical-phone Safari/touch/real safe-area/browser-chrome behavior and an actual unsupported-backdrop engine were not exercised; simulated inputs/forced fallback do not prove hardware support. Existing build configuration skips lint and retains its multiple-lockfile warning; no lint-clean or broader backend/corpus/release claim is made. Figma's missing prototype-click capability remains a historical design limit, while actual runtime interactions above are now exercised.

Rollback is only `runtime-intake.diff` plus the new `PortfolioGrid.tsx`, after checking later consumers and restoring callsites before removing their owner. Intake backups are `.txt`, outside compilation. Never reset the dirty tree, alter original Figma definitions or revert other owners' work. No project migration, commit, push or deployment occurred.

## Calculated Grid Proposal — DESIGN SYSTEM

**Superseded r1 — historical evidence only.** This isolated asymmetric proposal did not migrate PORT-16/18/17 consumers. Its rejection of equal columns no longer applies: Ivan's equal-column correction above is authoritative for the revision.

### Live Source Findings

- Homepage `2469:4` has 800px Content `2470:9` at x320 in 1440px; mobile `2469:5` has 342px Content `2470:78` at x24 in 390px. Employment main `2476:95` and desktop `2476:113` use 160px fixed period, 24px gap and 616px FILL details with minWidth342. Mobile `2476:123` overrides the gap to8 and wraps the same family. Project main `2470:2` is a full-width vertical block, not a two-column employment row: do not force every project into the rail.
- Manifesto `2530:62` / `2530:63` use 800px /342px lanes at x320 /24, beneath44px chrome. Desktop groups `2531:41`, `2531:56`, `2531:69`, `2531:82` use160/24/616. Mobile groups stack. Decorative statement arrows16px and their8px text gap are nested component geometry, not structural columns.
- Citymobil r2 `2539:444` uses1440×900 full-viewport scenes; header/narrative envelope1280 at x80. `2539:492` is320+32+928, alternating narrative/media direction in later scenes. Mobile `2539:593` uses390×844 scenes and342px inner envelope at x24. Original evidence can be narrower inside its media track (e.g.768px centered within928px); preserve aspect/contain/caption intent. Source overview `2516:15` retains its user-edited54px vertical gap.
- Source Header contacts are250px wide (57+24+77+24+68). Homepage Figma identity minimum227 plus gap24 and contacts250 gives implicit minimum501px content /549px viewport; employment min342 gives160+24+342=526px content /574px viewport. Mobile employment's8px override would change that implicit threshold to558px. These are not the runtime599/600 breakpoint.
- Current CSS `--content-width:800px`; `.editorial-page` uses `width:calc(100% - 48px)`. Rows are160px +24px + `minmax(0,1fr)`, switching to one column/gap8 only at max599px. Thus runtime at599px is stacked while an unmodified Figma main could remain paired. Header uses Contact sheet below600 instead of the older Figma homepage's inline contact wrap.
- Runtime project-header lane at848–1039 additionally has24px internal padding; its outer800px lane then exposes752px inner content at x48 rather than main content x24 at848. Back becomes inline below1040; at wider sizes it sits54px wide,24px left of the editorial lane. This is an explicit existing header exception, not proof of a common grid. Recommend a shared outer lane in the isolated study, with Back/controls treated as named utility slots; do not retrofit current CSS or force context titles to the editorial start when Back is inline.

### Recommended Recipe And Exact Coordinates

Let viewport V, minimum inset P=24, editorial maximum E=800. `C=min(E,V-2P)`, `M=(V-C)/2`. If V<600, one lane `[M,M+C]`; metadata/details stack with8px vertical separation and both use the full C. If V≥600: A=160, structural gutter G=24, B=C−A−G. Rails are A `[M,M+160]` and B `[M+184,M+C]`. Header/footer/full narrative/project blocks may span the full C rather than pretending to be a third column.

| V | C | M left/right | Mode | A start–end | Detail start–end | B width |
| --- | --- | --- | --- | --- | --- | --- |
| 375 | 327 | 24 | stack | 24–351 | 24–351 | 327 |
| 390 | 342 | 24 | stack | 24–366 | 24–366 | 342 |
| 599 | 551 | 24 | stack | 24–575 | 24–575 | 551 |
| 600 | 552 | 24 | rails | 24–184 | 208–576 | 368 |
| 847 | 799 | 24 | rails | 24–184 | 208–823 | 615 |
| 847.5 | 799.5 | 24 | rails | 24–184 | 208–823.5 | 615.5 |
| 848 | 800 | 24 | rails | 24–184 | 208–824 | 616 |
| 1440 | 800 | 320 | rails | 320–480 | 504–1120 | 616 |

At600, B=368px remains above the source342px detail minimum. At375 the327px full lane is intentionally permitted in the study: source employment min342 would overflow at375 if simply resized; normalization requires removing that inherited minWidth only in isolated study copies. This is a proposed responsive correction, not an edit to the source master.

Wide envelope: `Cw=min(1280,V−48)`, `Mw=(V−Cw)/2`. Pair only once `Cw≥800` (the editorial max reused as the pair threshold, equivalent V≥848); use Aw=320, Gw=32, Bw=Cw−352. Below that, narrative/media stack in Cw with32px separation. This defines the previously unapproved intermediate wide state conservatively; no tiny media track at600. At1440: Mw80, A80–400, gutter400–432, B432–1360 (928). At848: Mw24, A24–344, gutter344–376, B376–824 (448). At847: Cw799 and one stacked lane24–823. At600: one552px lane24–576; at390/375 same342/327px lanes as editorial. A reversed media/narrative scene mirrors the same widths rather than inventing another grid. Full-bleed photograph/veil spans0–V with captions/narrative in the named envelope.

Utility slots: keep the current≥1040px outset eligibility rule. At1440 editorial Back is242–296, gap296–320; content remains320–1120. A44px toggle could use1144–1188 in the right outset (24px gap), but placement is DESIGNER's decision and must respect other controls. Below1040 utilities are in-flow slots/rows; never reserve an invisible extra grid column or overflow the24px safety inset. Contact44px targets and icon/text4px gaps remain component semantics. Overlay is not a hit target or document-layout child.

Rounding: do not separately round each column. Layout is derived by FILL residual width, preserving all fractions until rendering. AtV847.5, C799.5, B615.5 and the final edge823.5 is exact. AtV849, C800 and M24.5 (fractional shared margins) are permitted. Any raster boundary snapping is applied to common edges only, never by accumulating N rounded columns. Formula sums must close with tolerance0.01px. Native equal-width Figma layout grids cannot represent the asymmetric pair; use a supported overlay auto-layout copy of the exact rail recipe, not a fake12-column grid.

### Width Reference, Scrollbar And Safe Insets

The existing Figma calibration inputs V are the exact containing frame's available inline width. They assume no scrollbar reservation, no safe-area inset and no browser zoom/visual-viewport offset. They are design-coordinate inputs, not claims about a physical device or `100vw`.

For any later website proposal, content and fixed overlay must read one authoritative grid-root rectangle/available layout inline width, after any reserved scrollbar space. Both must share its left origin, width, padding and recipe selection. Do not calculate content from its percentage-based parent but independently calculate overlay from `100vw`, screen width, a separate viewport API or its own rounded tracks. A viewport-fixed visual layer can use the shared root's measured left/width; being fixed does not authorize a different horizontal reference. Browser measurement choice, scrollbar-gutter policy and visual-viewport handling need verification in a later admitted implementation; this task implements none of them.

Generalized math: V is that single available width; `L=24+safeLeft`, `R=24+safeRight`, `U=max(0,V-L-R)`. The24px reading inset is additive to safe-area protection, not applied twice. For maximum K, `C=min(K,U)` and `X=L+(U-C)/2`; the content right edge is `X+C`. Editorial K800; wide K1280. Asymmetric safe areas therefore need not yield equal outer margins. Content, overlay, Header/Contact and utility safety calculations must use the same L/R and coordinate origin. If the viewport becomes too narrow even for the combined protected insets, stop pretending a usable lane exists; define/verify the overflow fallback in implementation instead of creating negative tracks.

Default editorial stacking remains V<600, with a content-fit safeguard: do not keep the pair if `C<160+24+342=526` under large safe insets or embedding. In that exceptional case stack both tracks into C rather than retain the source342px minimum. Wide pairs require actual `Cw>=800`; the shorthand V>=848 is valid only for the zero-safe-inset24px-per-side baseline. These rules do not add a responsive Figma collection or mutate a breakpoint in the current website.

Examples, calculated only (not new browser/Figma exercise): a1440px outer window with15px classic scrollbar reservation gives shared available V1425, editorial C800, X312.5. A mismatched1440-based overlay would use X320 and drift7.5px. With V390, safeLeft20 and safeRight0, L44/R24, C322 and X44; both stacked content/overlay span44–366. Existing390px Figma samples remain the zero-safe case24–366, C342 and are not silently reinterpreted. Fractional boundaries and residual widths remain shared until paint; no independent track or margin rounding.

### Wide Profile At Narrow And Intermediate Widths

The proposed intermediate wide states below are explicit calculations. Only wide V600/848/1440 have Figma geometry-pair proof in this foundation phase; other rows extend the same formula without claiming new visual/browser validation.

| Available V | Cw | Outer insets | Proposed structure | Narrative/media coordinates | Naive paired detail avoided |
| --- | --- | --- | --- | --- | --- |
| 320 | 272 | 24 | stack; both span full lane | 24–296 each, separate vertical blocks | -80px |
| 375 | 327 | 24 | stack; both span full lane | 24–351 each, separate vertical blocks | -25px |
| 390 | 342 | 24 | stack; both span full lane | 24–366 each, separate vertical blocks | -10px |
| 599 | 551 | 24 | stack; both span full lane | 24–575 each, separate vertical blocks | 199px |
| 600 | 552 | 24 | stack; both span full lane | 24–576 each, separate vertical blocks | 200px |
| 741 | 693 | 24 | stack; both span full lane | 24–717 each, separate vertical blocks | 341px |
| 742 | 694 | 24 | stack; both span full lane | 24–718 each, separate vertical blocks | 342px |
| 800 | 752 | 24 | stack; both span full lane | 24–776 each, separate vertical blocks | 400px |
| 847 | 799 | 24 | stack; both span full lane | 24–823 each, separate vertical blocks | 447px |
| 848 | 800 | 24 | 320 + 32 + residual | 24–344; 376–824 | not applicable |
| 1024 | 976 | 24 | 320 + 32 + residual | 24–344; 376–1000 | not applicable |
| 1280 | 1232 | 24 | 320 + 32 + residual | 24–344; 376–1256 | not applicable |
| 1440 | 1280 | 80 | 320 + 32 + residual | 80–400; 432–1360 | not applicable |

At320 the wide/full editorial lane is272px and metadata, prose, captions and contact controls must wrap/stack inside it; do not transplant the source342px minimum. At600 the552px stacked lane avoids an unusable200px detail track. Even at742, where a naive pair would just reach342px detail, the recommendation remains stacked until the shared800px wide-pair condition; this conservative unapproved intermediate rule avoids a second arbitrary fit threshold. At848 the first pair is320/32/448. Existing Citymobil only supplies the inspected1440 and390 source endpoints; no intermediate source design is presented as already approved.

Spans remain contextual: full-bleed media/veil0–V; narrative/captions/header within their named wide envelope; contained original evidence may be narrower inside its media track; reversed scenes exchange track positions using the same widths. Editorial project blocks/intro/contact may span the whole editorial C. Back/toggle utility slots remain named exceptions and must satisfy protected L/R; they are not extra structural columns. User-edited54px vertical spacing and completed PORT-18 geometry remain unchanged. DESIGNER must demonstrate these distinctions in the isolated study; website adoption remains unapproved.

### Locked Foundation Slice

Create one isolated grid-study page, a grid-prefixed namespace added to the existing one-mode local collection (no changes to any existing value/mode), and a tiny three-recipe calibration family (Editorial rails / Stacked lane / Wide rails). Content and overlay use the same local calibration main, max-width/inset/rail/gutter IDs and FILL residual derivation. Technical sample viewport widths are explicit test inputs, not breakpoint modes. Reuse current palette/type/spacing. Only new geometric facts800/160/1280/320 and structural thresholds600/1040 need local raw definitions; wide pair minimum aliases800. Overlay opacity/travel/duration are isolated study ingredients. No native motion/control states are built in this calculation phase. DESIGNER owns those.

## Foundation Artifact And Direct Handoff

[Grid study page](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2569-2) `2569:2` named `Layout Grid · PORT-19`; [calculation board](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2570-2) `2570:2` at1504×2180. This is one isolated new page (14→15), not an edit to any accepted surface. Figma session: `d6a5c1fa-34d0-4ddb-9db9-530f5d724add`.

Seventeen `grid/*` definitions were added to the existing collection `VariableCollectionId:2459:3` / Default `2459:0`. No pre-existing value, style, collection mode/default, component or subscription was changed. Reused palette/type/spacing come from existing Portfolio Foundations. Library discovery found no applicable structural editorial recipe; unrelated Hito variable-label documentation is not a layout foundation and was not imported. No Code Connect files were found for this scope.

### Exact Grid Token Register

All WEB mappings are planned metadata only, not adopted CSS. Hidden raw dimension/threshold facts are admitted only in this grid namespace; compatible insets/gutters/control sizes alias existing spacing IDs.

| Token | Exact ID | Value / alias | Scope |
| --- | --- | --- | --- |
| `grid/content-max` | `VariableID:2569:3` | `800` | WIDTH_HEIGHT |
| `grid/inset` | `VariableID:2569:4` | `alias VariableID:2465:78` | GAP |
| `grid/editorial-rail` | `VariableID:2569:5` | `160` | WIDTH_HEIGHT |
| `grid/gutter` | `VariableID:2569:6` | `alias VariableID:2465:78` | GAP |
| `grid/stack-gap` | `VariableID:2569:7` | `alias VariableID:2465:73` | GAP |
| `grid/stack-below` | `VariableID:2569:8` | `600` | hidden technical ingredient |
| `grid/wide-max` | `VariableID:2569:9` | `1280` | WIDTH_HEIGHT |
| `grid/wide-rail` | `VariableID:2569:10` | `320` | WIDTH_HEIGHT |
| `grid/wide-gutter` | `VariableID:2569:11` | `alias VariableID:2465:80` | GAP |
| `grid/wide-pair-min-content` | `VariableID:2569:12` | `alias VariableID:2569:3` | WIDTH_HEIGHT |
| `grid/utility-outset-min-viewport` | `VariableID:2569:13` | `1040` | hidden technical ingredient |
| `grid/utility-gap` | `VariableID:2569:14` | `alias VariableID:2465:78` | GAP |
| `grid/control-target` | `VariableID:2569:15` | `alias VariableID:2465:83` | WIDTH_HEIGHT |
| `grid/overlay/color` | `VariableID:2569:16` | `alias VariableID:2459:5` | FRAME_FILL, SHAPE_FILL |
| `grid/overlay/opacity` | `VariableID:2569:17` | `8` | OPACITY |
| `grid/overlay/travel` | `VariableID:2569:18` | `alias VariableID:2465:73` | WIDTH_HEIGHT |
| `grid/overlay/duration-ms` | `VariableID:2569:19` | `200` | hidden technical ingredient |

Opacity adapter: Figma's bound OPACITY number is a percent; saved `grid/overlay/opacity=8` resolves to actual node alpha0.08. Future WEB adapter must convert to0.08 rather than use8 as a CSS opacity. Motion ingredients are200ms and8px upward travel; they are preparation for DESIGNER, not saved/exercised animation. Only the new overlay instance subtree uses reduced opacity; actual source text/content does not.

### Shared-Recipe Binding Proof

Calibration component set `2569:35` owns only three structural recipes: Editorial rails `2569:20`, Stacked lane `2569:25`, Wide rails `2569:30`. Property `Show calibration labels#2569:0` hides explanatory copy in overlay instances. These80px-high calibration blocks are a geometry test fixture, not a universal product row; Designer must not copy their labels/heights as real visitor content. Main components are outside the calculation board.

Both CONTENT and OVERLAY in each specimen instance the exact same recipe main. Their containing viewport/layer bind left/right padding to `grid/inset`; both instances bind maxWidth to `grid/content-max` or `grid/wide-max`. Pair recipes bind the metadata width to editorial/wide rail and itemSpacing to structural gutter; details use FILL residual. Stacked tracks both FILL one lane and use `grid/stack-gap`. No overlay x/width/column widths are independently hand-tuned. Overlay wrapper is ABSOLUTE, with STRETCH constraints and the same viewport input; it does not participate in content flow. Pointer/assistive/scroll intent remains a future product contract, not a Figma hit-testing claim.

Explicit recipe selection is by the documented viewport/envelope rule at construction time. Figma does not automatically evaluate a media query when a frame is resized: Designer must select the correct structural recipe after changing widths. The numeric threshold variables record the same rule, but do not pretend to implement conditional layout. Native equal-column layout-grid properties are not used because they cannot express these asymmetric rails; supported token-bound auto-layout overlays provide actual binding evidence.

| Family / V | CONTENT ID | OVERLAY ID | Shared main | C / left margin |
| --- | --- | --- | --- | --- |
| editorial / 1440 | `2570:8` | `2570:14` | `2569:20` | 800 / 320 |
| editorial / 375 | `2570:22` | `2570:28` | `2569:25` | 327 / 24 |
| editorial / 390 | `2570:36` | `2570:42` | `2569:25` | 342 / 24 |
| editorial / 599 | `2570:50` | `2570:56` | `2569:25` | 551 / 24 |
| editorial / 600 | `2570:64` | `2570:70` | `2569:20` | 552 / 24 |
| editorial / 847 | `2570:78` | `2570:84` | `2569:20` | 799 / 24 |
| editorial / 847.5 | `2570:92` | `2570:98` | `2569:20` | 799.5 / 24 |
| editorial / 848 | `2570:106` | `2570:112` | `2569:20` | 800 / 24 |
| editorial / 849 | `2570:120` | `2570:126` | `2569:20` | 800 / 24.5 |
| wide / 1440 | `2570:134` | `2570:140` | `2569:30` | 1280 / 80 |
| wide / 600 | `2570:148` | `2570:154` | `2569:25` | 552 / 24 |
| wide / 848 | `2570:162` | `2570:168` | `2569:30` | 800 / 24 |

Complete shared max/inset/gutter/rail binding bundles and measured track coordinates: `/tmp/port19-geometry.json`; formulas match all12 saved specimens with0.01px tolerance and zero accumulated residual drift. Fractional examples preserve799.5/615.5px widths at847.5 and24.5px centered margins at849.

### Preservation, Visual Evidence And Recovery

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Source geometry | Exact homepage, Manifesto, Citymobil r2 and overview before/after signatures | Pass: all7 unchanged | `/tmp/port19-source-{home,manifesto,city}.json`, matching `/tmp/port19-after-*.json` |
| Math and shared geometry | 9 editorial +3 wide calibration samples, actual Figma coordinates | Pass: content/overlay x/width/track equality and formula closure;327px at375 through1280px wide | `/tmp/port19-geometry.json` |
| Definition/editability | 17 new grid variables,1 existing collection mode,3 recipes,24 local instances;SF Pro shared styles | Pass: no new palette/type/style family or remote component; no full-UI raster | `/tmp/port19-final-audit.json` |
| Visual | Calculation board screenshot1504×2180 | Pass: readable labels, subtle8% rail tint, clear gutters, no observed clipping/overlap | `/Users/ivan/Documents/Codex/2026-10-27/portfolio-design-system/outputs/port19-grid-calculation.png` |
| Source overview | User-edited `2516:15` and its descendants | Pass: exact hash `2badd231`;54px vertical gap unchanged | Same before/after source snapshot |
| Scope | Source code, current website, PORT-18 geometry/dependencies, Savi | No writes or adoption | Only grid page/new namespace and this task document changed by DESIGN SYSTEM |

Preservation fingerprints: homepage desktop `fc79392b`, mobile `ccb945dd`; Manifesto desktop `d58b8ebf`, mobile `25958f77`; Citymobil r2 desktop `ddc6954b`, mobile `8dfa5475`. Fingerprints include names/visible flags, positions/sizing, wrap/gap/padding/min/max, text/font/style and paint/binding values. They establish unchanged named sources, not runtime parity or a migrated grid.

State ledger `/tmp/design-system-state-port19.json` holds all exact creation IDs, recipes/tokens/sample mappings and pending study gates. Rollback only the new page `2569:2` and the17 exact new variable IDs above after checking later consumers; existing collection and all pre-existing variables/styles/pages/components are preserved. After Designer starts, coordinate rollback with its exact added consumers rather than delete the page wholesale. No broad name-based deletion. Source facts/assets/code remain read-only.

### Released Boundary For DESIGNER

DESIGN SYSTEM releases Figma writes after this readback. Continue the same PORT-19 on page `2569:2`, placing the new real-content Off/On/Focus desktop/mobile study in clear canvas space beyond the calculation board and calibration masters. Use the exact grid definitions/derived geometry; no second grid namespace. Existing control target44, utility gap24, travel8 and duration200 are study ingredients, not placement approval. Validate overlay/content equality again on the real content and retain source geometry54px and live source edits.

Use actual representative portfolio text/source instances only on isolated copies. If using employment copies at375, remove their342px details minimum only in those study copies and follow the explicit below600 stack rule; never modify the original shared Employment row. Editorial full-lane spans (project blocks, introduction, header/contact) and Citymobil wide/full-bleed exceptions must be shown rather than forced into decorative equal columns.

Then implement the admitted Off/On/Focus control study and supported upward/fade native animation, verify actual playback where possible and reduced-motion intent, and return the same Task to PRODUCT/Ivan review. Static geometry here does not close animation, native click/scroll/focus, public icon placement or adoption gates. No FRONTEND handoff or website change.

## Equal-Column r2 Foundation — Current Calculation

This section is the current foundation; the asymmetric r1 sections/fixtures remain preserved historical evidence. Ivan's12-desktop/2-mobile equal-column direction governs r2. The preserved r1 partial state, exports and motion ledgers are not migrated by changing their variable values. DESIGN SYSTEM owns only isolated r2 additions on the same page before handing back to DESIGNER.

### Locked Recipe, Spans And Fit

Use the same available-width reference and protected inset assumptions stated above: baseline V is the Figma frame's available inline width, no scrollbar reservation or safe area; `C=min(K,V−48)`, `X=(V−C)/2`. In later browser work, both content and fixed overlay must use one available layout-root width/origin after scrollbar reservation, not independent100vw versus percentage references. With safe areas use L24+safeLeft, R24+safeRight, U=max(0,V−L−R), C=min(K,U), X=L+(U−C)/2. Fractions are retained; no independent rounding.

Desktop V≥600 uses N12 equal FLEX tracks; mobile V<600 uses N2. Editorial K800/G24; wide K1280/G32. Distinct existing gutters are preserved as profile parameters of ONE formula: `w=(C−(N−1)G)/N`, `span(s)=s*w+(s−1)G`, `start(i)=X+i*(w+G)`. Gaps inside a span are included in that span; a3/9 pair has just ONE structural gutter between blocks. It is not25%/75% of C or of C−G.

Default desktop small/main spans3/9 start at columns1/4. Desktop full-reading/header/contact/project blocks may span12; mobile compact blocks span1 and reading prose spans2. Mobile span1/2 describes allowed block spans, not two unequal side-by-side tracks. Date/context labels may wrap; source342px minWidth and160px metadata widths must not be transplanted to revised isolated content. All source masters remain unchanged.

| Profile / V | C | G | N | Equal column w | Small span | Main/reading span | Left margin |
| --- | --- | --- | --- | --- | --- | --- | --- |
| editorial / 320 | 272 | 24 | 2 | 124.000000 | 124.000000 (1) | 272.000000 (2) | 24 |
| editorial / 375 | 327 | 24 | 2 | 151.500000 | 151.500000 (1) | 327.000000 (2) | 24 |
| editorial / 390 | 342 | 24 | 2 | 159.000000 | 159.000000 (1) | 342.000000 (2) | 24 |
| editorial / 599 | 551 | 24 | 2 | 263.500000 | 263.500000 (1) | 551.000000 (2) | 24 |
| editorial / 600 | 552 | 24 | 12 | 24.000000 | 120.000000 (3) | 408.000000 (9) | 24 |
| editorial / 800 | 752 | 24 | 12 | 40.666667 | 170.000000 (3) | 558.000000 (9) | 24 |
| editorial / 847 | 799 | 24 | 12 | 44.583333 | 181.750000 (3) | 593.250000 (9) | 24 |
| editorial / 847.5 | 799.5 | 24 | 12 | 44.625000 | 181.875000 (3) | 593.625000 (9) | 24 |
| editorial / 848 | 800 | 24 | 12 | 44.666667 | 182.000000 (3) | 594.000000 (9) | 24 |
| editorial / 849 | 800 | 24 | 12 | 44.666667 | 182.000000 (3) | 594.000000 (9) | 24.5 |
| editorial / 1440 | 800 | 24 | 12 | 44.666667 | 182.000000 (3) | 594.000000 (9) | 320 |
| wide / 390 | 342 | 24 | 2 | 159.000000 | 159.000000 (1) | 342.000000 (2) | 24 |
| wide / 600 | 552 | 32 | 12 | 16.666667 | 114.000000 (3) | 406.000000 (9) | 24 |
| wide / 847 | 799 | 32 | 12 | 37.250000 | 175.750000 (3) | 591.250000 (9) | 24 |
| wide / 848 | 800 | 32 | 12 | 37.333333 | 176.000000 (3) | 592.000000 (9) | 24 |
| wide / 1440 | 1280 | 32 | 12 | 77.333333 | 296.000000 (3) | 952.000000 (9) | 80 |

At desktop C800/G24, width3=182 and width9=594, so the revision is +22/−22px relative to source160/616. At V1440, X320: small320–502, gutter502–526, main526–1120. At V600, C552: small24–144, gutter144–168, main168–576 (408px). At V847.5, C799.5, column44.625, span3=181.875 and span9=593.625; the last edge is823.5 exactly. At V849, the shared X24.5 is retained.

Wide at V1440 retains envelope1280/X80 and G32, but spans are296/952, deliberately −24/+24px versus source320/928. Small80–376, gutter376–408, main408–1360. At V848 wide spans176/592; at V600 they are114/406. Thus unlike r1's fixed320px rail, the corrected main span does not collapse to200px at600. Long narrative belongs in span9 or full12; span3 holds short context/metadata, never a forced copy of lengthy source sidebar prose. Full-bleed photo/veil remains0–V, captions/narrative align to the envelope and contained evidence retains aspect-ratio/contain behavior. Mobile wide uses the same24px gutter/two-column recipe as editorial; short blocks may span1, prose2.

Content-fit safety: the source342px detail minimum is a readability check, not a forced min-width on the study. Span9=(3C−G)/4: a paired editorial main reaches342 at C464; wide reaches342 at C466⅔. Baseline V600 gives552px content, so normal desktop pair fits both. For unusual embedding/large safe insets below those fit thresholds, use separate full-span12 rows on the same12-column grid rather than squeezing prose into a tiny span9. If `(N−1)G≥C`,12-track geometry is not usable; select the mobile two-column structural recipe in an explicitly labelled available-width exception, never negative tracks. These exceptions do not change any current consumer or claim physical browser validation.

Header/contact can use full spans with internal44px control targets. Back/toggle outsets retain their separately documented safety condition; they are utility exceptions, not extra columns. At desktop1440 the proposed small/main boundary moves22px; source headers/Manifesto/homepage have NOT migrated. Native GRID supplies12/2 equal tracks and actual span attributes for r2; the r1 statement that native equal grids are unsuitable applies only to obsolete asymmetric rails.

### Supersession Boundary

Reuse unchanged neutral r1 IDs: content/inset/gutter/stack-gap/stack-below/wide-max/wide-gutter/utility/control/overlay ingredients. `grid/editorial-rail`160, `grid/wide-rail`320, `grid/wide-pair-min-content`800 and calibration set2569:35 are r1-only semantics; preserve them and their consumers/partial study untouched. The corrected equal-grid recipe pairs normally at600; it does NOT inherit r1's800px wide-pair threshold. New `grid/equal/*` count/span/fit definitions extend the same collection without another library or mode. Any visual reuse of r1 controls/motion must rebind only exact new/copied study consumers during DESIGNER's next boundary, not silently rewrite originals.

### Equal r2 Saved Artifact

[Current equal r2 calculation board](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2594-728): `2594:728`, 1504×3624, at x5600/y80 on the SAME page `2569:2`. Seven equal r2 masters sit at x7200, outside the board and all protected r1 objects. No page was added (15 total unchanged). Existing session `d6a5c1fa-34d0-4ddb-9db9-530f5d724add`.

| Native recipe master | Exact ID | Structure |
| --- | --- | --- |
| Grid / Equal r2 / Desktop spans | `2588:2114` | GRID, 12 equal FLEX1 tracks, gutter 24 |
| Grid / Equal r2 / Wide spans | `2593:744` | GRID, 12 equal FLEX1 tracks, gutter 32 |
| Grid / Equal r2 / Mobile spans | `2593:749` | GRID, 2 equal FLEX1 tracks, gutter 24 |
| Grid / Equal r2 / Full-span fit exception | `2593:756` | GRID, 12 equal FLEX1 tracks, gutter 24 |
| Grid / Equal r2 / Overlay12 · gutter24 | `2593:761` | GRID, 12 equal FLEX1 tracks, gutter 24 |
| Grid / Equal r2 / Overlay12 · gutter32 | `2593:774` | GRID, 12 equal FLEX1 tracks, gutter 32 |
| Grid / Equal r2 / Overlay2 · gutter24 | `2593:787` | GRID, 2 equal FLEX1 tracks, gutter 24 |

Native grid children MUST use horizontal/vertical FILL; otherwise Figma preserves the child's default100px geometry even when its span attribute is correct. This was verified and corrected on the new r2 primitive before composing samples. Both content and overlay masters use the same native GRID configuration function and profile parameters; native FLEX layout derives widths on resize, not independent pixel-span arithmetic.

| Added equal-only definition | Exact ID | Value |
| --- | --- | --- |
| `grid/equal/desktop-columns` | `VariableID:2593:735` | 12 |
| `grid/equal/mobile-columns` | `VariableID:2593:736` | 2 |
| `grid/equal/desktop-small-span` | `VariableID:2593:737` | 3 |
| `grid/equal/desktop-main-span` | `VariableID:2593:738` | 9 |
| `grid/equal/mobile-unit-span` | `VariableID:2593:739` | 1 |
| `grid/equal/mobile-reading-span` | `VariableID:2593:740` | 2 |
| `grid/equal/min-readable-main` | `VariableID:2593:741` | 342 |

Only these7 definitions were added to collection `VariableCollectionId:2459:3`; its sole Default mode `2459:0` is unchanged. Counts/spans/fit threshold are construction-recipe inputs with restricted/hidden scopes and planned WEB syntax. Native `gridColumnCount` and `gridColumnSpan` do not support `setBoundVariable` in this API: resolve the integer tokens when constructing/selecting the structural recipe, then verify saved count/span attributes. Do not claim a live variable binding for those fields. Gutter is live-bound through `gridColumnGap`; max-width and both outer insets are live-bound to shared neutral IDs. All FLEX tracks have value1. Counts/spans in the native fields match the exact equal tokens. No typography, palette or responsive-mode catalogue was added.

Neutral shared IDs remain: editorial max `VariableID:2569:3`, inset `:2569:4`, gutter `:2569:6`, mobile/stack gap `:2569:7`,600 boundary `:2569:8`, wide max `:2569:9`, wide gutter `:2569:11`; use the full `VariableID` prefix when resolving abbreviated IDs here. Overlay color `VariableID:2569:16`, opacity `:2569:17` (Figma8→alpha0.08), travel `:2569:18`, duration `:2569:19` remain unchanged. Utility/control definitions retain their existing IDs.

### Equal r2 Geometry Evidence

All18 samples use actual native GRID content span attributes versus native equal-column overlay cells. Their gutter bindings and max-width IDs match; each content block's saved start/end equals the first/last overlay columns it spans. Shared viewport/padding and ABSOLUTE/STRETCH overlay wrapper preserve one width reference; no content relayout is triggered by overlay participation. The safeLeft102 example is an explicitly technical input derived into both wrapper paddings by the same builder, not a new production inset token.

| Profile / available V | C / X | Native count / gutter | Saved CONTENT / OVERLAY | Fit |
| --- | --- | --- | --- | --- |
| editorial / 1440 | 800.000 / 320.000 | 12 / 24 | `2594:734` / `2594:740` | default spans |
| editorial / 320 | 272.000 / 24.000 | 2 / 24 | `2594:756` / `2594:764` | default spans |
| editorial / 375 | 327.000 / 24.000 | 2 / 24 | `2594:770` / `2594:778` | default spans |
| editorial / 390 | 342.000 / 24.000 | 2 / 24 | `2594:784` / `2594:792` | default spans |
| editorial / 599 | 551.000 / 24.000 | 2 / 24 | `2594:798` / `2594:806` | default spans |
| editorial / 600 | 552.000 / 24.000 | 12 / 24 | `2594:812` / `2594:818` | default spans |
| editorial / 800 | 752.000 / 24.000 | 12 / 24 | `2594:834` / `2594:840` | default spans |
| editorial / 847 | 799.000 / 24.000 | 12 / 24 | `2594:856` / `2594:862` | default spans |
| editorial / 847.5 | 799.500 / 24.000 | 12 / 24 | `2594:878` / `2594:884` | default spans |
| editorial / 848 | 800.000 / 24.000 | 12 / 24 | `2594:900` / `2594:906` | default spans |
| editorial / 849 | 800.000 / 24.500 | 12 / 24 | `2594:922` / `2594:928` | default spans |
| editorial / 1425 | 800.000 / 312.500 | 12 / 24 | `2594:944` / `2594:950` | default spans |
| wide / 390 | 342.000 / 24.000 | 2 / 24 | `2594:966` / `2594:974` | default spans |
| wide / 600 | 552.000 / 24.000 | 12 / 32 | `2594:980` / `2594:986` | default spans |
| wide / 847 | 799.000 / 24.000 | 12 / 32 | `2594:1002` / `2594:1008` | default spans |
| wide / 848 | 800.000 / 24.000 | 12 / 32 | `2594:1024` / `2594:1030` | default spans |
| wide / 1440 | 1280.000 / 80.000 | 12 / 32 | `2594:1046` / `2594:1052` | default spans |
| editorial / 600 | 450.000 / 126.000 | 12 / 24 | `2594:1068` / `2594:1074` | full-span12 rows |

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Equal tracks and real spans | All18 saved samples incl375/390/599/600, fractional847.5/849, wide600/848/1440 | Pass: equal1fr columns;3/9,1/2 and declared full-span fit; zero width/edge/sum findings at0.01px tolerance | `/tmp/port19-equal-geometry.json` |
| Local editable foundation | 7 masters,7 variables; shared SF Pro text styles/palette; no full-UI raster | Pass: zero font/style/component/paint/gutter findings | `/tmp/port19-equal-final.json` |
| Visual review | Current r2 board1504×3624 | Pass: equal column overlays, clear gutters and spanning blocks, wrapped mobile prose, visible full-span fit example; no observed clipping/overlap | `/Users/ivan/Documents/Codex/2026-10-27/portfolio-design-system/outputs/port19-equal-grid-r2.png` |
| Original source preservation | 7 named home/Manifesto/Citymobil/overview roots | Pass: all before/after signatures match; overview54px untouched | `/tmp/port19-equal-{home,manifesto,city}-{before,after}.json` |
| r1 partial preservation | 15 r1 fixture/partial roots plus4 original Designer receipt files | Pass: all15 signatures and4 SHA-256 file hashes match | `/tmp/port19-equal-r1-{before,after}.json`, `/tmp/port19-equal-preserved-ledgers.json` |

The old r1 rejection of equal grids, fixed160/320 rails,800px wide-pair gate and partial exports must not guide the resumed study. Their values/IDs/consumers are unchanged for recovery; they remain visibly separate from the current r2 board. No old root was renamed, moved, detached or deleted; no current consumer was silently rebound. No website code or active PORT-18 dependency changed.

Exact r2 creation IDs and recovery are recorded under `equalRevision` in `/tmp/design-system-state-port19.json`; the full prior state remains copied to `/tmp/port19-r1-state-preserved.json`. Bounded rollback removes only the exact7 new variables and exact new r2 roots/descendants (after checking later consumers); do not remove page2569:2, r1 controls/calibration/motion, original collections, source pages or user edits. The previously probed r2 primitive `2588:2114` and its children are integrated in the new master register, not abandoned scratch nodes.

### Corrected Direct Handoff To DESIGNER

DESIGN SYSTEM releases Figma mutation ownership after saved-state/read-back. Resume the SAME PORT-19 using the r2 register above and exact neutral/equal IDs. Prefer a separate corrected section in clear canvas space; preserve the exact suspended r1 objects/receipts. If copying source/r1 real-content elements, normalize only those new copies to native equal-grid spans; no shared source-master change. Reuse existing local toggle/icon/motion assets only with explicitly recorded copied/new consumers and corrected geometry.

The corrected study must show12 actual equal desktop columns and2 equal mobile columns,3/9 small/main blocks,1/2 mobile blocks with full-width prose as appropriate, and declared header/contact/wide/full-bleed/utility exceptions. Do not substitute percentage rails or12 decorative bars over160/616 content. Re-run content/overlay boundary equality on the actual Off/On/Focus content and preserve the safe-width/rounding contract. Then exercise supported toggle/motion/scroll/contact paths, interruption and reduced-motion where feasible; r1 motion export alone is not proof for corrected geometry. Return the same Task to PRODUCT/Ivan review. No FRONTEND adoption or website change.

## Equal r2 DESIGNER Result

Historical checkpoint before the bottom-control feedback: its grid/motion proof remains applicable, while its upper control placements and browser interaction screenshots do not verify the current floating controls. Use the latest result below.

Task PORT-19 / design verification. The demonstrated cause was the r1 asymmetric recipe retaining160/616 rails while Ivan requested equal modular columns. DESIGN SYSTEM corrected the shared foundation; DESIGNER recomposed only new real-content consumers to native equal GRID and verified their actual span edges against its overlay instances. The old composition is preserved separately. This result is a reviewable design proposal, pending Ivan's approval.

### Current Review Targets

| Artifact | Exact IDs | Geometry / purpose |
| --- | --- | --- |
| [Corrected state board](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2599-1131) | `2599:1131`, page `2569:2`, x5600/y4200 | Three desktop1440×1000 and three mobile390×844 viewport states |
| Desktop Off / On / Focus | `2599:1137` / `2599:1234` / `2599:1331` | Same content master `2599:991`;12 equal columns, native3/9 career blocks |
| Mobile Off / On / Focus | `2599:1429` / `2599:1506` / `2599:1583` | Same content master `2599:1066`;2 equal columns, compact1/1 blocks and reading2 below |
| Real-content career masters | `2599:976` / `2599:983` | Derived from DS native GRID configuration; live gutter/max, token-resolved count/span fields; content-driven HUG rows |
| Wide / full-bleed On and Off | `2599:1689` / `2599:1720` | Photo0–1440; envelope1280 at x80; native span3=296, gutter32, span9=952; narrative at scene bottom |
| Native upward/fade timeline | `2599:1755`, overlay `2599:1812` | 8px translation and opacity over200ms; reverse exit; existing2s timeline retained |
| Reduced-motion timeline | `2603:1785`, overlay `2603:1787` | Separate native opacity-only version; no translation track |
| Contact dialog | `2599:1665` |390×160 intrinsic dialog, real OVERLAY/CLOSE actions, displayed above active grid |
| Interaction notes | `2599:1850` | Editable contract and remaining runtime boundaries |

The study reuses existing SF Pro14/20 styles, raspberry/warm-yellow palette and primary/secondary tones, local links/arrows/contacts, Columns2 icon `2580:122` and Off/On/Focus control components `2580:126/131/136`. No new icon dependency, variable, collection, style or shared source definition was added by DESIGNER. The graphic is the exact installed Lucide Columns2 source already inspected for r1; controls remain44×44 with the existing52×52 focus outline.

Content is representative source material, not a full homepage replacement: the existing introduction, Saavi/independent/VK–Citymobil career entries, one project and contact destinations. Employment dates and the approximate Saavi start-month disclosure retain their source meaning. The wide scene reuses the already requested AI concept photo hash `1c10757c155e4e45cde861763fb95725e88cc5fd` and existing reading veil; it does not promote that image to historical evidence.

### Shared Geometry And Placement

All six states use native equal FLEX columns. At desktop1440 the columns span x320–1120, each44⅔px with24px gutters; actual career blocks span x320–502 and526–1120. Mobile390 uses columns24–183 and207–366; compact metadata/company blocks each span159px, while summaries span342px. All18 real career rows across the six states match the corresponding first/last overlay column edges within0.01px; no body copy/geometry changes between Off/On/Focus. Full-span introduction/project/footer and header are deliberate exceptions within the same envelope.

Overlay nodes instance exact DS masters `2593:761`, `2593:787`, `2593:774`. Both content and overlay use existing shared max/inset/gutter IDs; count/span integers are resolved from the seven `grid/equal/*` definitions into native attributes, not claimed as live bindings. Native FLEX computes the column widths; no percentage-rail substitute or independently rounded overlay bars. Settled tint is8% from the existing bound opacity token. The noninteractive wrapper fades0→1 over already8%-alpha columns.

The44px desktop toggle occupies x1144–1188,24px after the editorial envelope; mobile reserves a44px utility row below the44px header, with control x322/y44. Wide uses an explicit in-envelope utility position x1316/y44. Overlay/header/control are the last three fixed children in prototype frames. Header and control stay above the decorative overlay; the Contact dialog appears above both. Future DOM behavior still requires `aria-pressed`, an accessible name, `aria-hidden` overlay and `pointer-events:none`; Figma hit testing does not implement those browser semantics.

### Motion And Native Interaction Evidence

Both MP4 exports are768×534 at10fps. The regular overlay holds Off through0.2s, enters to y0/alpha1 by0.4s, holds through1s and exits to y8/alpha0 by1.2s. The visible column alpha is multiplied by its existing0.08 token binding. Five sampled frames at0.1/0.3/0.5/1.1/1.3s verify Off, partial entry, settled On, partial exit and Off again. The reduced-motion copy retains the opacity track and has no translation track; its sampled frames show the same fade phases without vertical travel. This is actual native timeline export evidence for corrected geometry, separate from the click prototype's Smart Animate reactions.

Native Figma player checks exercised desktop Off→On→Off; mobile Off→On→Off; mobile scrolling to the lower project/footer while grid/header/control remain fixed; Contact OVERLAY open above grid and CLOSE return; and the project click through an active grid to wide scene `2599:1689`. A rapid two-click pair took156ms and eventually settled back to Off; intermediate continuity was not frame-measured, so seamless interruption remains a future implementation contract. The player reported missing-font replacement and briefly redrew text during transitions; exact type appearance is assessed from saved SF Pro bindings and Figma composition exports, not claimed from the web player.

The initial844px-high centered Contact overlay clipped its heading/Close in the720px-high player. The demonstrated owner was the new isolated dialog geometry. Reusing the existing padding/gap and HUG pattern yielded390×160, after which native open/Close passed. Original Contact components and source pages were untouched.

### Verification, Preservation And Handoff

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Equal geometry / state invariance |6 states,18 actual career rows, wide3/9 | Pass: zero span-edge findings; identical per-family content geometry and main IDs | `final-geometry.json`, `geometry-first.json` |
| Editability / type | Corrected state board | Pass:154 FRAME,158 TEXT,126 INSTANCE,45 VECTOR,44 RECTANGLE; no complete-UI raster; all text SF Pro, main14px | Same audit; inspected `grid-states.png` and its scene crops |
| Visual / viewport exceptions | Desktop/mobile and wide photograph | Pass: recognizable icon, subtle columns, readable copy, visible focus state; intentional mobile vertical viewport clipping, original photo is the only wide image | `grid-desktop-on.png`, `grid-mobile-on.png`, `grid-wide-on.png` |
| Native actions / scroll | Figma IAB1280×720 | Pass for stated desktop/mobile toggle, scroll, Contact and project-link paths; typography fallback limit above | `native-*.png`, `state.json` |
| Native animation | Ordinary and reduced-motion exports | Pass: source tracks plus5 sampled phases each; existing timeline not shortened | `motion-readback.json`, `dialog-and-reduced-motion.json`, both MP4s and sampled frames |
| Preserved sources |7 home/Manifesto/Citymobil/overview roots | Pass: matching before/after signatures, including overview gap54px | `before-{home,manifesto,city}.json`, `after-*.json` |
| Preserved earlier studies / foundation |23 r1 and equal-r2 protected roots | Pass: all signatures unchanged | `before-study.json`, `after-study.json` |
| Website / keyboard / OS preference / wide click | No website implementation admission | Not exercised: DOM behavior, focus traversal, OS reduced-motion selection and continuous retargeting; wide Off/On destinations source-verified but wide control click not exercised in the cropped player | Scope boundary; no runtime or Global QA claim |

All evidence paths above are under `/Users/ivan/Documents/Codex/2026-10-28/portfolio-designer/work/port19-r2/` or `outputs/port19-r2/`. Scene PNGs are exact crops of the full-board export, not additional design renders. `state.json` records all **933** exact created node IDs, later motion/dialog/page-flow mutations, reused masters, source checks and limits. `build-result.json` and `dialog-and-reduced-motion.json` retain the returned creation receipts. No r1 original/receipt, existing DS master/token, source fact, active implementation or application file was changed. All four original flow starts are preserved; corrected starts are separately named Equal r2.

Rollback is limited to those933 newly owned IDs after checking later consumers and coordinating the current writer. Preserve page2569:2, all r1 objects, DS equal masters/tokens, shared collections and original source pages. Do not perform broad name-based or page deletion. PRODUCT/Ivan reviews the [corrected state board](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2599-1131) and motion before any FRONTEND adoption. DESIGNER releases Figma mutation ownership on this handoff; PORT-19 stays open for approval and stated runtime boundaries.

Final checkpoint fetched back **In progress / Acceptance / PRODUCT**, with all five design checks, current handoff and lifecycle entry saved. Repository hygiene and focused Markdown whitespace checks passed. DESIGNER writer is released; the next action is Ivan's review of this concrete corrected design.

## Bottom Floating Controls Result — Superseded Vertical Review

<a id="bottom-floating-controls-result--current-review"></a>

Historical vertical composition. Its100px dock/128px reserve and On outline are superseded by Horizontal Row Result below. Later live readback also found that the background color alias resolved the intended72% paint alpha to100%; the current revision fixes that at the shared background-layer owner. The earlier material-alpha claim is not current verified proof.

PORT-19 / bounded DESIGNER revision. Ivan confirmed mobile Contact plus grid and desktop grid only at bottom-right; desktop contact links stay unchanged. The earlier upper placement caused the reachability mismatch. Changed owners are the local floating-control family, viewport dock and study-only header Contact visibility. The accepted equal-grid/body/motion owners remain unchanged.

The [same board2599:1131](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2599-1131) is revised in place. Existing six Off/On/Focus frame IDs are retained.287 bounded additions cover shared controls/docks, two375×600 specimens, a375px Contact wrapper and one static scroll-end view; the933-node study was not cloned.

| Current artifact | IDs / geometry |
| --- | --- |
| Floating grid family / Contact | Set `2616:1787`; primary component `2616:1788`; existing Columns2 icon `2580:122`, SF Pro14/20, warm-yellow/raspberry and44px target reused |
| Desktop1440×1000 | Grid44×44 at1372/932,24px from right/bottom; wide1440×900 uses1372/832. Header contacts unchanged |
| Mobile390×844 | Contact102×44 at264/776; grid44×44 at322/720;12px vertical gap,24px right/bottom. One102×100 auto-layout dock; header remains44px and owned header trigger `2599:1128` is hidden |
| Mobile375×600 | Off `2616:1834`, On `2616:1913`; Contact249/532, grid307/476; same targets/gap/insets and327px lane with two151.5px columns |
| Static scroll end | [2628:1927](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2628-1927); calculated final position only, not an exercised scroll |
| Contact dialogs | Existing390×160 `2599:1665`; new375×160 `2616:1812`; same contact destinations, OVERLAY and44px CLOSE |

Both controls are fully rounded. Contact is solid warm yellow with raspberry text; secondary grid uses72% raspberry fill, full-opacity warm-yellow icon and an On outline. Focus retains its52px outline with rounded geometry. New local effect style `S:ecebe164b919580779dcc9693f66494ecfd0a9a6,` contains actual BACKGROUND_BLUR16 plus shadow0/4/12, black22%; primary style `S:6b2911226e861401e5790495e270489adfced801,` reuses the shadow. No compatible effect/radius owner existed. These two effects belong to the repeated local control family; no variable, palette/collection, external dependency or text-style family was added. Radius9999 is a fully rounded shape cap. The old flat controls remain used by preserved r1/history.

Opaque fallback: retain raspberry at100% fill when backdrop filtering is unavailable; icon/outline/elevation stay readable. This is future implementation intent. Source-color contrast calculations give13.89:1 for primary Contact text and5.85:1 for the grid icon over a white backdrop after72% raspberry compositing; these are sRGB calculations, not browser measurements.

Each interactive mobile specimen adds a128px scroll-tail sibling after the unchanged body. The reserve covers the100px dock plus24px inset rounded to8px rhythm; it does not enlarge the header.390×844 has calculated max scroll400 and footer links ending684,36px above dock720.375×600 has body1136, max scroll664 and links ending440,36px above dock476. The explicit static end view shows the same geometry. Content can pass behind floating controls during scrolling; the final links have clear space above them. Future right/bottom offsets add safeRight/safeBottom to24, and the scroll reserve must grow, e.g. `ceil((dockHeight + 24 + safeBottom)/8)*8`. Figma baselines have zero physical safe area.

The absolute MAX/MAX dock sits above the decorative grid; overlay/header/dock are the three fixed children in the scrolling specimens. Saved grid reactions retain paired Off/On destinations; Contact uses matching OVERLAY and CLOSE. Those are source contracts, not proof of hit testing, focus return or current modal behavior.

**MCP-only limit:** after Ivan's instruction browser Figma work stopped immediately. The available MCP exposes source/reaction readback, screenshots and timeline exports, but no prototype click/scroll executor. The moved controls have not been clicked, actual footer scrolling and focus return have not been exercised. Earlier browser evidence remains historical and is not relabelled as current MCP proof. The current controls acceptance stays open for this limitation and Ivan's final review; no implementation handoff.

Regular and reduced-motion manual tracks are unchanged. A fresh MCP video export of `2599:1755` includes the current bottom control with the existing8px/200ms animation:768×534,10fps,2.1s; start/settled/end inspected. This is export/render proof, not an interactive click. Continuous interruption, keyboard semantics, OS reduced-motion selection, runtime safe areas and backdrop fallback remain future implementation checks.

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Placement / states / material |12 dock placements;375/390/1440; native blur/shadow fields and MCP renders | Pass:44px targets,24px insets,12px gap, rounded Off/On/Focus and confirmed device mapping | `geometry-material.json`, board/mobile/wide PNGs |
| Body / shared grid / motion |8 existing bodies, original overlay tracks,375 span edges | Pass: body/track signatures unchanged; zero span-edge findings; shared max/inset/gutter roles | `before-owned.json`, `geometry-material.json`, `final-audit.json` |
| Editability / font | Final board | Pass:237 FRAME/233 TEXT/180 INSTANCE/63 VECTOR/50 RECTANGLE; SF Pro; no complete-UI raster | `final-audit.json` |
| Footer / short height | Calculated end + static375×600 view | Geometry pass:36px clearance at375/390. Actual scrolling unexercised | `refinement.json`, `floating-mobile375-end.png` |
| Saved paths | MCP action/destination readback | Source pass: paired states, matching dialogs and44px CLOSE. Execution unavailable | `geometry-material.json`, `state.json` |
| Current exported animation | Same tracks with bottom control | Pass for exported rendering; reduced-motion source unchanged | `floating-grid-motion.mp4`, source track comparison |
| Protected sources |7 original +23 earlier fixture/foundation roots | Pass: all30 before/after signatures match; overview gap54 intact | `before-*.json`, `after-*.json` |
| Current interactive acceptance | Click/scroll/focus/modal execution | **Open/unavailable through MCP**; no current native interaction or Global QA acceptance claim | MCP-only capability boundary |

Receipts: `/Users/ivan/Documents/Codex/2026-10-28/portfolio-designer/work/port19-controls/`; exports: `outputs/port19-controls/`. `state.json` records287 exact created node IDs,23 existing changed IDs and2 effect-style IDs; `build-result.json`, `refinement.json` and `before-owned.json` retain mutation/rollback receipts. Scene PNGs are crops of the final MCP export, not flattened UI placed in Figma.

Rollback only those exact added IDs/styles after checking consumers, restoring prior control mains/parents/coordinates/reactions and header-trigger visibility from `before-owned.json`. Preserve page2569:2, accepted definitions, source pages, r1/history and other owners. No website code, adoption, destination, publication, persistence/analytics, commit or deployment changed. Return to PRODUCT/Ivan controls review with the current interaction gate open.

Final checkpoint fetched back **In progress / Acceptance / PRODUCT** with the current controls checkbox deliberately open, MCP interaction limitation and lifecycle entry saved. Hygiene and focused Markdown whitespace checks passed. DESIGNER Figma writer is released; the next action is Ivan's final controls/material review.

## Horizontal Row Result — Accepted Composition, Earlier Contours

<a id="horizontal-row-result--current-review"></a>

Its row, material-alpha and footer proof remains applicable. The borderless state direction is superseded by the accepted On/Off correction in Final State Contours Result below.

PORT-19 / bounded DESIGNER revision, Figma MCP only. Ivan's explicit correction supersedes the vertical interpretation: mobile is one horizontal row, grid LEFT and Contact RIGHT; desktop remains grid-only bottom-right. The demonstrated owners were the existing dock's VERTICAL layout and the bright stroke on the shared On variant. Both are corrected in place; no board, view, component family, style or variable was duplicated.

The [same review board2599:1131](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2599-1131), six original states,375×600 samples `2616:1834/1913` and static footer `2628:1927` retain their IDs. Existing Contact102×44, grid44×44,12px gap,24px right/bottom and existing icon/type/palette/material/contact owners are reused. Main content, accepted grid and ordinary/reduced-motion tracks are preserved.

| View | Horizontal row / targets | Recomputed end geometry |
| --- | --- | --- |
|390×844, Off/On/Focus |158×44 at208/776; grid208/776, Contact264/776 | Tail72; calculated max scroll344; footer ends740; dock top776;36px clear |
|375×600, Off/On |158×44 at193/532; grid193/532, Contact249/532 | Tail72; max scroll608; footer ends496; dock top532;36px clear |
|375×600 static end | Same row at193/532; body translated to y−608 | Explicit static geometry preview, not an exercised scroll |
| Desktop / wide | Existing bottom-right44px position unchanged | Only shared secondary material changes; header contacts unchanged |

The reserve is recalculated as `ceil((44 + 24)/8)*8 =72`, replacing the obsolete128. Future safe-bottom adds inside that formula; right/bottom remain24 plus the relevant safe inset. No44px target was shrunk. Contact remains at its prior rightmost coordinates; grid moves left into the row. The10 existing body-instance signatures and overlay/manual tracks match before/after.

### Borderless States And Actual Translucency

Resting/On component strokes are empty; the optional dark contour was unnecessary. Off icon is64% opacity, On100%; Focus keeps the existing visible52px ring `2616:1783`. No resting/On bright ring remains. This same existing family propagates to desktop and wide/photo consumers.

A live source check exposed a material root cause: binding the RGBA background color reset the intended paint opacity to1. Three background rectangles `2644:1994/1995/1996` were added inside the existing variants, with the same color token and existing glass effect style. Their separate **node opacity reads0.72**, preserving actual translucency independently of the token's alpha. The existing BACKGROUND_BLUR16/shadow effect moves to that background layer; icons stay crisp. Readback confirms all13 linked consumers inherit the layer and have empty outer strokes, while Focus alone retains its indicator.

Existing `opacity/text-secondary` stores normalized0.64; Figma OPACITY variable binding interprets percent and would produce0.0064. Off therefore resolves that existing value into the normalized node field without claiming a live binding. On/Focus remain1. No opacity token or parallel palette was added. Opaque fallback remains future intent: set the background layer to1 when backdrop filtering is unavailable.

### Scoped Proof And Open Boundary

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Row / footer | Six mobile docks including static end;375/390/short height | Pass: HORIZONTAL158×44, grid then Contact,12px gap,24px protected baseline,72px reserve and36px footer clearance | `build-result.json`, `final-audit.json`, MCP renders |
| Material / states | Three existing masters and13 consumers | Pass: no resting/On outer stroke;64%/100% icons, preserved Focus; actual0.72 background node opacity with existing effect style | `opacity-propagation.json`, current mobile/photo/Focus exports |
| Content / motion |10 existing bodies; regular/reduced-motion source tracks | Pass: signatures/tracks unchanged; current MCP timeline export inspected at Off/On/Off | `before-owned.json`, `final-audit.json`, `motion.mp4` |
| Source preservation |7 original roots +23 earlier fixture/foundation roots | Pass: all30 before/after fingerprints match; overview gap54 unchanged | `before-*.json`, `after-*.json` |
| Editability / font | Same board, no complete-UI raster | Pass:237 FRAME/233 TEXT/180 INSTANCE/63 VECTOR/59 RECTANGLE; SF Pro | `final-audit.json`, `board.png` |
| Current interactions | Saved paired grid/Contact OVERLAY/CLOSE contracts | Source only. Click/scroll/focus/modal execution unavailable through MCP; no browser fallback or current native interaction claim | Existing reaction readback; MCP access boundary |

Evidence lives under `/Users/ivan/Documents/Codex/2026-10-28/portfolio-designer/work/port19-row/` and `outputs/port19-row/`. `state.json` records19 existing mutations and16 new IDs: only3 authored background layers plus13 inherited component descendants. There are no new dock/view clones, styles, variables, routes, source claims, code or website adoption. The fresh MCP animation uses the unchanged regular timeline with current subdued material; it is export proof, not click execution.

Rollback restores captured variant material/glyph opacity, dock layout/coordinates, prior128px reserves from the vertical receipt and static-end y from `before-owned.json`. Remove only the3 authored backgrounds from their masters, allowing inherited descendants to disappear; do not delete linked instance children individually. Preserve accepted grid definitions, existing controls/contact owners, source pages, r1/history and other owners' work. Return this same Task to PRODUCT/Ivan review with current interaction acceptance open and no FRONTEND handoff.

Final Task readback confirms **In progress / Acceptance / PRODUCT**, saved horizontal-row handoff/lifecycle and the current interactive checkbox still open. Hygiene and focused Markdown checks passed. DESIGNER Figma writer is released for Ivan's controls review.

## Final State Contours Result — Current Review

PORT-19 / state-only DESIGNER correction through Figma MCP. Ivan approved the horizontal composition and explicitly replaced the prior borderless direction: ON outlined, OFF dark-contoured. The canonical owner is the existing three-state family `2616:1787`; same masters/consumers remain. No board, view, family, style, variable, target size or motion was added or rebuilt.

- OFF `2616:1771`: new authored contour `2652:2007`,44×44,1px INSIDE, existing black role `VariableID:344:127`; its separate node opacity reads0.16. Keeping alpha on the contour node avoids RGBA alias alpha overriding it. Four linked OFF consumers inherit it.
- ON `2616:1776`:1px INSIDE warm-yellow contour through existing semantic `color/border`, `VariableID:2465:67`; actual alpha reads0.64. Existing border width `VariableID:2466:75` remains1.
- Focus `2616:1781`: same ON contour plus the independent unchanged52×52 ring `2616:1783`. Its position, visibility, full-alpha focus paint and1px width match the baseline exactly; focus is not used as a substitute for pressed state.

Shared icon tones,0.72 background nodes, blur/shadow/effect ownership and44px geometry are unchanged. All13 existing consumer contracts (coordinates, main IDs, targets and reactions),11 body snapshots including static footer, and ordinary/reduced-motion tracks match before/after. Horizontal158×44 rows,12px gap,24px insets,72px reserve and36px footer clearance remain current. The correction propagates to the existing desktop, mobile, short-height, wide and timeline consumers.

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| State source / actual alpha | Three masters,4 linked OFF and selected ON consumers | Pass: dark16% OFF, warm64% ON, existing1px role | `build-result.json`, `propagation.json` |
| Independent Focus / material | Exact before/after source comparison | Pass:52px ring and material/icon snapshots unchanged | `before-owned.json`, `after-owned.json` |
| Geometry / actions / body / motion |13 existing consumers,11 body snapshots, manual tracks | Pass: zero comparison findings; no layout or behavior-contract change | Same baseline/readback |
| Visual | Current full-board/wide MCP renders and exact Off/On/Focus crops | Pass: states distinguishable, ON contour visible, subdued OFF contour, independent Focus | `board.png`, `wide.png`, `*-detail.png` |
| Protected source |7 home/Manifesto/Citymobil/overview roots | Pass: all fingerprints unchanged, overview gap54 intact | `before-*.json`, `after-*.json` |
| Current interaction execution | MCP has no prototype click/scroll executor | Unavailable/unexercised; source/render proof only, no browser fallback | Existing MCP-only boundary |

Receipts: `/Users/ivan/Documents/Codex/2026-10-28/portfolio-designer/work/port19-state/`; exports: `outputs/port19-state/`. `state.json` records1 authored node plus4 inherited IDs, the3 existing master mutations and one reconciled note, roles and rollback. Remove only authored contour2652:2007 to remove its inherited copies, then restore captured master strokes/descriptions and note text from `before-owned.json`/`notes.json`; do not delete linked instance descendants individually.

The final human clarification is mockups ONLY. No home/Manifesto/project code, frontend handoff or release was performed or authorized. The separately mentioned manually authored component remains unconfirmed; protected Citymobil master2516:15, its54px gap, project narrative and imagery were not changed. Art direction stays deferred. Return the same Task to PRODUCT/Ivan state review with current interaction acceptance open.

Final readback: **In progress / Acceptance / PRODUCT**, current state result/handoff/lifecycle saved, interactive checkbox still open. Hygiene and focused Markdown checks passed. DESIGNER writer is released for Ivan's state review.

PRODUCT inspected the saved desktop,390px mobile and375px static scroll-end composition exports for this review. Confirmed requested device mapping and final-link clearance are visible in those exports; this is composition readback only, not independent interaction QA or Ivan's final approval. Present the same board for final design review, retaining the open MCP interaction limitation.

## QA Independent Runtime Acceptance — 2026-10-28

PORT-19 / Verification: **Passed for the admitted home/Manifesto shared grid, overlay and bottom dock feature** on production build `ugT19m6ZMO_fHeD2iAwil`. All8 fresh public HTTP200 responses contain exact `.next/BUILD_ID`. Canonical Developer checkout; built-in IAB runtime verification only, no Figma access/write or stopped Chrome/profile diagnosis. Evidence: ignored `test-results/port19-qa/`. No QA product-code/package/runtime/data changes, fixtures, commit/push/deploy.

### Validation Coverage And Required Behavior Proof

| Check | Independent scenario | Result / evidence |
| --- | --- | --- |
| Shared geometry / responsive |Home+Manifesto ×375/390/599/600/848/1440|Pass:12 samples;2 mobile/12 desktop tracks; overlay left/width delta0 to main lane; Header lane matches; no overflow.375 tracks151.5+24+151.5,390 tracks159+24+159;1440 lane800 with3/9 spans≈182/594. Native layout units retained; same-track recipe/source confirmed. `grid-geometry.json`, On screenshots |
| Default / states / material |390px Off→pointer On→keyboard Off/Focus|Pass:defaultOff, pressed semantics, black0.16 inset Off contour/icon0.64; warm0.64 On contour/icon1; independent1px focus+3px offset.44px target; actual0.72 raspberry/blur8px/shadow0/4/12 black0.22. Keyboard sets instant and switches opacity immediately. `states.json` |
| Rapid normal / reduced motion |4 trusted CDP native-pointer activations per mode with live frame sampling|Pass:71/70 recorded frames,43 intermediate opacity samples/mode; normal8px transform retargets, reduced transform always none; finalOff/opacity0. Document height1424 unchanged throughout. `rapid-motion.json` |
| Dock layout / footer reachability |375×600 end views on both routes|Pass:158×44 horizontal grid-left/Contact-right row,12px gap,24px right/bottom; footer link clearance≈36px. Desktop grid-only44px. Inspected mobile On and Manifesto end views. `footer-safe-fit.json`, end PNGs |
| Simulated safe / fit / scrollbar |Tab-only left20/bottom34;600px with150px protections; forced17px reserved scrollbar|Pass:34px footer clearance, dock bottom58px incl safe baseline; narrow252px lane falls back to2 matching tracks without overflow. Actual375→358px available root yields310px lane/overlay at same24px origin; zero drift. These are simulated inputs/forced CSS, not phone proof. `footer-safe-fit.json`, `forced-material-scrollbar.json` |
| Opaque declarations |Forced fallback declarations in supporting IAB|Pass:computed opaque raspberry and no blur remain readable. Actual unsupported-backdrop engine remains unexercised; source @supports fallback reviewed. Temporary style removed |
| Dock Contact / focus / lock |Native pointer open at y844, Tab cycle/Escape; reopen600px resize|Pass:Close initial focus, Close/Email/LinkedIn/GitHub loop; Escape returns actual `.portfolio-dock-contact`, y844 and original styles. Resize closes/unlocks and focuses visible desktop Email. No competing mobile header trigger on admitted routes. `contact-native-return.json` |
| Overlay hit-testing / native return |GridOn home→Manifesto via observed native pointer; desktop Header Back/mobile browser Back with open sheet|Pass:underlying link receives hit through decorative pointer-events:none overlay; desktop y1588/top752 and mobile y2152/top752 restore exactly; dialog removed/body unlocked. Grid defaultsOff after route return. `contact-native-return.json` |
| No-JS / observer failure |Both pages no-JS; scoped IO constructor and lane-only RO observe failure on Manifesto mount|Pass:all content opaque/readable, inactive dock hidden, direct fallback contacts remain;21 Manifesto items. Lane RO failure retains aligned overlay after resize via fallback;327px lane/overlay and zero overflow. Probes restored. `fallback.json` |
| Exact copy / preservation |DOM vs canonical intake snapshots;22 named before hashes|Pass:9 career records/Personal exact,5 case destinations unchanged; Manifesto intro/groups/all21 strings exact,21 markers.18 protected files byte-identical; only4 admitted existing owners differ plus new PortfolioGrid. `copy.json`, `integrity-lineage.json` |
| Read-only projects/index |375px index and all5 case hard loads, source/hash integrity|Pass:one existing Header, zero grid/dock DOM, existing context/Contact and zero overflow; project sources/data/assets retained. This is focused preservation proof, not a project redesign/media acceptance. `project-preservation.json` |
| Clean smoke / errors / lineage |Fresh uninjected IAB home toggle/Contact/Escape→Manifesto toggle|Pass:no warnings/errors. Instrumented run also has empty log. `clean-console.json`, `instrumented-console.json`, `clean-smoke.png`, all8 HTTP/build markers |

### Bounded Motion Review

| Before | After | Why |
| --- | --- | --- |
| No active overlay/dock motion owner |200ms explicit opacity/8px transform with existing custom ease-out, `globals.css:432` |Occasional requested reveal, no document reflow; actual frames prove intermediate retargeting |
| Pointer transition could affect keyboard |`data-instant` at `PortfolioGrid.tsx:48`, focus-visible transition:none at `globals.css:448` |Keyboard response immediate; independent visible focus retained |
| Spatial motion for reduced preference |Opacity-only override at `globals.css:478` |Gentle effect preserved with no translation; actual reduced frames confirm |

Bounded source/feel review verdict: **Approve**. Explicit compositor properties,200ms duration/custom curve, reversible transitions,120ms press/100ms release and independent keyboard/reduced behavior meet the admitted standard. Shared RepeatReveal/ContactSheet/arrows are checksum-preserved; earlier independent repeat/focus contracts remain applicable to unchanged owners. No unrelated Header animation/performance or browser-engine certification claimed.

### Limits, Cleanup And Next Owner

No reproducible in-scope defect remains. Temporary media/IO/RO/safe/scrollbar/fallback declarations and sampling probes were removed/restored; viewport reset and both QA-created tabs closed. No fixtures/users/data created. Exact Manifesto comparison uses parsed object equality (an initial JS stringify comparison differed only in serialized key order; canonical strings/groups are equal). No content repair or global browser setting was needed.

Physical-phone Safari/touch/real safe-area/browser-chrome and a truly unsupported-backdrop engine remain unexercised; simulated declarations/inputs do not prove those capabilities. Existing build skips lint; QA read FRONTEND type/build/tests/hygiene evidence rather than rerun unchanged tests. External mail/social delivery remains href-only. Known Hito/Peruse media provenance limitations are not repaired/promoted. Figma stayed entirely untouched; the historical MCP-only prototype interaction checkbox is not relabelled as executed Figma proof.

Return this same Task to PRODUCT for Ivan's local review/acceptance. Current runtime independent QA gate is satisfied; Product acceptance and publication are separate. No project migration, Figma mutation, stopped diagnostics, commit/push/deploy authorized.

### Product Readback — Local Delivery Ready

PRODUCT reconciled the independent QA report against the admitted scope and inspected390px home,1440px Manifesto and375px Manifesto scroll-end screenshots. The shared equal-grid/dock, requested control order/state distinction, exact Manifesto hierarchy/arrows and final-link clearance are represented in the verified local build. No in-scope defect is reported by either execution owner. Runtime proof belongs to the FRONTEND/QA checks above; this readback is not another independent QA run. Ivan can review `/` and `/manifesto` at127.0.0.1:3100; Task stays PRODUCT / Acceptance pending his local feedback. Physical-device/unsupported-engine/lint/media/external-delivery limits remain disclosed, not blockers silently removed; no release or project implementation is implied.
