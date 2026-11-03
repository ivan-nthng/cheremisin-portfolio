# Manifesto — Simple Editorial Design

Status: delivered and accepted for the admitted local scope; FRONTEND checks, independent QA and PRODUCT review passed on `g3zmNETA_hVPsoPDuYLhg`. No publication claimed.
Date: 2026-10-28.
Accountable role: PRODUCT. DESIGNER → FRONTEND → QA → PRODUCT delivery is complete for this local outcome.
Task: [PORT-18](https://app.notion.com/p/407fe5f58cf5816c9e59db586ba8503d), created/read back as Ready / Discovery / DESIGNER.

## Outcome And Root Cause

### Current Revision — Arrow Markers And Conditional Implementation Approval

Ivan answered PRODUCT's explicit question whether to approve Manifesto and hand it to implementation: “Да, насчёт манифеста нормально, только нужно сделать какие-то прикольные буллеты, стрелочками, например, или чем-нибудь для каждого пункта.” Record this as approval of the existing simple direction **with the requested list-marker addition**, not approval of unrelated redesign or release.

The missing feature is per-statement visual list identification, not a defect in the color/type system. Existing proposal-local Statement component `2531:2` is the first design owner; the future runtime owner remains `ManifestoContent.tsx`. Reuse existing supplied right-arrow vectors, Portfolio colors/type/semantic spacing and the accepted editorial layout (design-system direction1).

Current executor sequence on this same PORT-18: **DESIGNER → FRONTEND → QA → PRODUCT**. No new Task, chat, library or manual prompt relay. Design first: DESIGNER updates/verifies the requested markers in Figma, then may directly hand off this exact accepted delta and existing composition to FRONTEND after Task update/read-back. If an additional design decision or material departure is needed, return to PRODUCT rather than silently expand the approval. No commit, push or deployment is authorized.

#### DESIGNER Marker Delta

- Add one small right-pointing arrow marker to **each of the21 statements**, in both existing frames `2530:62` / `2530:63` (42 placements through the one Statement owner). Prefer the existing local vector/icon component, not a literal terminal `>` character or a hand-drawn substitute. Inspect the actual icon and preserve its provenance.
- Marker uses the same full-opacity primary yellow as the text, no extra color, background, motion, hover or click affordance. This is a decorative list marker, not a navigation link or button.
- Reuse the existing16px icon geometry where suitable, a first-text-line-height slot and an existing semantic compact gap (prefer8px if present). Align optically with the first14/20 text line. Long statements hang-align to the text column, not underneath the marker.
- Extend `Manifesto / Statement` once; preserve the existing TEXT property, exact statement strings, instance overrides and all42 consumers. Keep four groups, introduction, grid, labels, header, footer, fonts and shared Foundations unchanged. Auto-layout may grow frames as wrapping requires; do not shrink text or clip to retain old heights.
- Verify21 markers per view, no marker on group labels/introduction, exact copy order, shared color/type/spacing bindings, narrow-screen wrapping, editable component structure and screenshots. No runtime interaction/animation proof is claimed by Figma verification.
- After saving a compact result/source mapping here and Notion read-back, release Figma and send the same Task directly to verified FRONTEND chat `01a17d63-3309-73b3-8bfe-ce4666be2d8e` under this admitted scope. Do not require Ivan to copy a prompt or reapprove the unchanged base design.

#### Admitted FRONTEND Boundary

Implement the reviewed Figma Manifesto plus requested arrow markers on the existing `/manifesto` route, reusing the homepage's editorial patterns, semantic tokens, shared contextual Header/Contact sheet, `PortfolioArrow` where it matches the approved vector and existing `RepeatReveal` behavior. Load the applicable Figma design-to-code/frontend skills and inspect the saved final design/source before editing.

- Replace Manifesto's active Dossier/avatar/terminal presentation only. Preserve exact introduction, four group labels, all21 statement strings/order, route URL, canonical corpus/assets and contact destinations. Do not delete shared Dossier owners still used by project routes or repair unrelated case/media issues.
- Match the accepted800px desktop lane,24px mobile gutters, compact14/20 typography, one primary text color and reviewed spacing. Use genuine list/group semantics; expose a programmatic page heading and section hierarchy without a redundant decorative hero. Each marker is decorative (`aria-hidden`, no focus/tab stop/href); preserve readable text on wrapped lines.
- Reuse one list/statement rendering seam, not21 copied implementations or another design system. Do not mutate global token values, shared Header behavior, homepage/projects, source facts, Backend/chat contracts or the stopped Chrome/IAB investigation.
- Retain approved repeatable entry/exit as progressive enhancement through the existing shared reveal owner, reduced-motion, focused-content and no-JS/failure readability. Do not add a new animation recipe or invalid list markup around reveal wrappers.
- Keep the dirty worktree and user-authored Figma edits. No broad refactor, new dependency or content source. A minimal shared CSS extraction is allowed only if necessary and its other consumers are preserved; prefer existing editorial seams.

Implementation proof: hygiene/whitespace, proportional type/production-build/HTTP checks, source-copy comparison and browser proof at375/390/1440 (including wrapped long statements,21 markers and no overflow). Verify bullets are not links or focus targets, all text/markers use the same primary color, the global header/Back/mobile Contact/native return remain usable, and no-JS/reduced/focus content stays readable. Build/browser evidence must identify the final served build; static Figma/source inspection is not runtime acceptance.

FRONTEND updates/read-backs this same Task, releases files/runtime and directly hands to existing QA `01a17d63-3788-7230-a3d0-3ac0f5c88de2`. QA independently checks the scoped desktop/mobile visual/semantic/content/keyboard/overflow/motion/header/return regression and console/page errors without fixing code. Same-scope defects return directly to FRONTEND; passed evidence returns to PRODUCT for Ivan's local review. Known native Codex capture/color-management limitations do not authorize new diagnostics or global changes. Task remains open if required owner/build/browser/QA checks fail or the implementation departs from the accepted brief.

Ivan requests `/manifesto` in the same minimal editorial language as the current homepage, with no embellishments. All visible text, headings, section labels and links use one primary text color through existing tokens. Design comes first; Ivan reviews it before implementation.

Are we fixing the root cause, or only a visible symptom?

- Symptom reported by Ivan: Manifesto looks inconsistent with the homepage and is over-decorated.
- Demonstrated intake source cause: `ManifestoContent.tsx` composed `DossierPage`, `DossierFrame`, `DossierBar`, `DossierMediaViewport` and duplicated section label/title treatments. It contained an avatar, route/section indexes, `>` markers, dashed rules and `text-muted` lists. The retained legacy presentation owner caused the mismatch; no new design system was needed.
- Canonical runtime owner remains `src/components/ManifestoContent.tsx`, reached by the unchanged `src/app/manifesto/page.tsx`. The Figma phase preserved both; the admitted FRONTEND phase now replaces the component's presentation as recorded below.
- Reuse seam: homepage editorial content lane, spacing/type scale, existing local color variables, arrows/links, shared contextual Header and Contact sheet intent.

## Bounded Plan And Queue

1. DESIGNER reads this contract, inspects the existing homepage/Foundation consumers and current Manifesto content/presentation. Complete: route and trusted corpus compared, exact introduction/21 statements captured, current browser presentation and homepage Figma composition inspected. Existing Portfolio primitives selected; no applicable external whole-page composite or Code Connect source.
2. Prepare one clear desktop and mobile proposal in the existing Figma file; no visual-direction exploration is needed. Complete: dedicated page `2530:61`, desktop `2530:62`, mobile `2530:63`.
3. Verify exact content, primary-color/token/style bindings, editability, wrapping and screenshot composition; update/read back the same Task and return to PRODUCT/Ivan review. Complete: verified result saved; Notion fetched back as In progress / Acceptance / PRODUCT with all design-delivery checks recorded and current handoff/history preserved. Writer released for Ivan's review.
4. Ivan accepted the base direction with arrow markers. DESIGNER saved/verified that delta and handed it directly to FRONTEND. Implementation and owner checks are complete below; independent QA → PRODUCT remains open on the same Task.

Do not interrupt or mutate the active PORT-17 Citymobil work. Queue this design after its current writer is released, keeping each Task's artifacts/status separate. Citymobil is not cancelled or merged into this outcome.

## Design Contract

Direction **1: reuse existing portfolio primitives and patterns**.

- Same raspberry background and primary warm-yellow text as the homepage. Every visible textual element on Manifesto consumes `color/text-primary` (runtime seam `--foreground`); link text consumes the existing `color/link` alias with the same resolved color. Do not use secondary/muted alpha or whole-node opacity for resting text. Do not change shared token values or flatten the homepage's existing color hierarchy.
- Hierarchy comes from existing type roles/emphasis, alignment and spacing, not added colors, gradients, cards, borders, badges or ornament.
- Reuse the compact contextual header: Manifesto context, Back and existing contacts; desktop common baseline/44px compact header, mobile Contact sheet intent. No second header family or oversized hero.
- Outer content lane follows the homepage's 800px maximum and 24px mobile gutters. Prefer the same label/content relationship as existing editorial rows where useful; mobile stacks label then content. Do not introduce sticky section navigation, animations or novel interactions to solve this simple page.
- Preserve an accessible page-title/section hierarchy without redundant visible label/title/route bars. A short existing introduction is sufficient; no decorative avatar or illustrative hero.
- Four plain text groups, in existing order: Principles; How I work; Mindset; Professional. Display all 21 existing statements verbatim, preserving their grouping and sequence. No rewriting, merging, new principles or invented biographical claims.
- One statement per paragraph/list row with readable wrapping and quiet spacing. No terminal `>` bullets, numbered dossier indexes, dashed separators, framed panels or decorative quotation marks.
- Existing header/footer links and focus treatment may be reused where appropriate; no new CTA or contact destination. Links may remain legible through existing underline/arrow/focus patterns without a different text color.
- Motion is not a Figma deliverable here. Any later implementation retains the site's approved repeatable reveal, reduced-motion and fail-open readability contracts; do not hide unreviewed copy in the design or claim runtime animation proof.

## Named Sources And Target

- `src/components/ManifestoContent.tsx`: exact current visitor-facing introduction, four group labels and 21 statements; copy preservation owner for this visual-only Task.
- `content/portfolio/manifesto.md`: trusted authored corpus reference, read-only. Its normalized wording/headings do not authorize silently rewriting the route's copy; any difference remains outside this Task.
- `src/components/layout/HomePage.tsx` and `src/app/globals.css` → `PORT-16: accepted Portfolio Foundations mapped onto existing semantic seams`: current editorial geometry/type and runtime semantic tokens; read-only.
- `src/components/layout/Header.tsx` and `ContactSheet.tsx`: current compact contextual/header contact behavior; read-only.
- `docs/design/portfolio-figma-foundations.md` → `Reconciled Foundations — Current Consumer Contract`, `Typography Consumer Register`, `Token And Component Consumers`: reuse existing SF Pro styles, semantic spacing aliases, primary text/background colors and local links/arrows. No new library/token collection/style family.
- Figma target: https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk . Foundations `2459:2`, existing homepage `2469:2`, desktop `2469:4`, mobile `2469:5`. Add a dedicated Manifesto proposal section/page without editing those accepted sources or the separate Citymobil proposal.
- Current local route `http://127.0.0.1:3100/manifesto` is inspection-only, not an implementation target in this Task. Source review alone is not browser layout proof.

Load the applicable Figma skills before file operations. Inspect current local consumers before creating nodes; reuse component instances/styles/variables, not a flattened screenshot of the proposed page. No ImageGen, external design system or paid-credit generation is required for a plain-text page.

## Acceptance And Preserved Boundaries

- One simple desktop and mobile Figma proposal that visibly belongs to the homepage family; no avatar, Dossier/ASCII decoration, cards, ornamental dividers or oversized title treatment.
- Exact introduction, four groups and all 21 route statements preserved; record a content comparison. Preserve original files/assets/corpus without edits.
- All visible text/headers/labels/links use the same resolved primary text color through existing token/style/component bindings. Check descendants and instance overrides, not only the top-level frame; a faded static label is a failure.
- Read back actual typography family/roles, semantic spacing/color bindings and reused instances; surrounding UI is editable, with proper grouping/auto-layout, not a full-page raster.
- Inspect desktop/mobile composition screenshots for wrapping, clipping, overlap, readable measure and footer/header alignment; record exact page/frame IDs and any Figma-only limitations here.
- Do not mutate application code, shared Foundations, homepage, project routes, existing facts, original assets or other owners' dirty changes. No commit, push, publish, deployment or implementation handoff before Ivan's approval.
- Notion fields/body read back after the design checkpoint; release writer to PRODUCT for Ivan's review. Task stays open until design approval; implementation/QA, if later admitted, remain separate stages of this same outcome.

## Result

### PRODUCT Local Delivery Acceptance — 2026-10-28

PRODUCT reconciled the accepted Figma/source contract, FRONTEND owner evidence and independent QA on `g3zmNETA_hVPsoPDuYLhg`, and reviewed supplied desktop/mobile renders plus the complete readable no-JS mobile composition. The requested21 decorative markers, exact authored content, one primary color and editorial geometry are delivered at [local Manifesto](http://127.0.0.1:3100/manifesto). Normal full-page images retain offscreen reveal states; those are not treated as missing content or resting-color defects.

All admitted acceptance checks are complete and no required in-scope work remains. PORT-18 may be Done for local delivery; Ivan can give further visual feedback normally. Physical-phone/external-delivery coverage and publication are not claimed. Separate PORT-19 grid design and PORT-17 review remain unchanged; no stopped Chrome/color investigation was reopened.

### FRONTEND Implementation Checkpoint — 2026-10-28

The accepted desktop `2530:62` / mobile `2530:63` and marker revision are implemented at [local `/manifesto`](http://127.0.0.1:3100/manifesto), production build **`g3zmNETA_hVPsoPDuYLhg`**. This is owner-level implementation proof, not independent QA or release acceptance. The observable result is one compact editorial page with the exact introduction, four ordered groups and21 decorative right-arrow statements, followed by canonical Contact links.

`src/components/ManifestoContent.tsx` now renders the server-owned main/h1/group h2/list structure. Its original statement array remains byte-identical. The route-local avatar, duplicate title/section bars, Dossier wrappers, terminal characters and dashed rules were removed from this composition. Shared Dossier owners remain reachable from cases and were not deleted. Each genuine `ul > li` contains one existing `RepeatReveal` unit; labels, introduction and footer use separate units without nested competing reveals.

Design-system direction **1: reuse existing portfolio patterns**. Reused `editorial-page`, `editorial-intro`, `editorial-section`, `editorial-footer-contacts`, `editorial-link`, semantic spacing and existing system-font14/20 adapter. `PortfolioArrow direction="right"` reuses the supplied16px SVG mapped to Figma2459:61, with empty alt/aria-hidden. The16×20 first-line slot, centered y2px icon and8px gap give x24px hanging text. `globals.css` extracts the existing career-row geometry into the neutral `editorial-row` selector while retaining career-only muted color; both share their existing mobile stack. This small extraction prevents another layout recipe while keeping the homepage's160/616 grid and color hierarchy unchanged. New Manifesto classes only arrange the repeated statement/marker and scope the accepted primary-color introduction/footer gap. Global token values, Header, ContactSheet, RepeatReveal and PortfolioArrow sources remain unchanged.

Changed runtime owners: `src/components/ManifestoContent.tsx`, `src/app/globals.css`. Documentation reconciliation: this artifact, `docs/current-state.md`, `docs/current-system.md`. Preserved boundaries: route entry/URL, exact copy/order, corpus, assets/contact destinations, homepage/projects/case/media/backend contracts, separate PORT-17 Figma work and unrelated dirty changes. No dependency, font binary, new content source or state model was added.

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Exact source and preservation | Intake snapshot / DESIGNER source-copy / named shared-source hashes | Passed: exact intro and21 statements in6/5/5/5 order; only the two admitted runtime files changed among nine intake owners | `test-results/port18-manifesto/source-integrity.json`, `manifesto-intake.diff`, `styles-intake.diff` |
| Build/type/hygiene/whitespace | Next15.5.18 production build; repository owner checks | Passed: build and validity-of-types checks, `npm run hygiene:check`, `git diff --check` | `test-results/port18-manifesto/build.log`; final checkpoint exit0 |
| Served runtime and assets | `127.0.0.1:3100`, final build above | Passed:200 on Manifesto/home/projects/right SVG; served CSS bytes equal final build; HTML already contains four lists/21 markers | `runtime.json`, `served-asset-integrity.json`, `served-manifesto.html` in the same evidence directory |
| Layout / content / semantics | IAB375/390/1440 widths; full compositions inspected against final Figma | Passed:800px desktop lane,24px mobile gutters,14/20 text,21 loaded decorative markers, valid direct list children, h1/h2 hierarchy, exact DOM copy, no horizontal overflow. Desktop content ends at1152px,390px mobile at1384px;375px grows to1404px without clipping | `browser-owner-checks.json`; [desktop](/Users/ivan/Documents/Codex/2026-10-27/portfolio-frontend/outputs/port18/manifesto-desktop-1440.png), [390px](/Users/ivan/Documents/Codex/2026-10-27/portfolio-frontend/outputs/port18/manifesto-mobile-390.png), [375px](/Users/ivan/Documents/Codex/2026-10-27/portfolio-frontend/outputs/port18/manifesto-mobile-375.png) |
| Primary color / marker geometry | All page text/header controls and21 statement rows | Passed: same computed primary `rgb(255,231,163)` at rest; SVG paints#FFE7A3;16px icon /20px slot /8px gap /x24 hanging text, no marker href/tab stop | Browser and served-asset evidence above |
| Repeat/reduced/failure readability | Native scrolling at390×812, tab-scoped reduced emulation, no-JS hard reload, controlled observer-constructor failure on route mount | Passed: intermediate240ms opacity/8px entry values and repeated exit/re-entry; reduced160ms opacity with transform none; no-JS/failure retain21 items at opacity1; mobile no-JS contacts remain links. All temporary probes/emulation restored | `browser-owner-checks.json`; [no-JS](/Users/ivan/Documents/Codex/2026-10-27/portfolio-frontend/outputs/port18/manifesto-no-js.png) |
| Keyboard / Contact |390×812, native Tab/Return/Escape | Passed: skip → Back → Contact → footer links; modal focuses Close, cycles Email/LinkedIn/GitHub/Close, Escape returns focus/unlocks scroll; focused footer stays opacity1 with visible outline and44px target | Same browser evidence; [sheet](/Users/ivan/Documents/Codex/2026-10-27/portfolio-frontend/outputs/port18/manifesto-contact-sheet.png) |
| Header / native return / extraction regression | Home → Manifesto → Header Back at1440×900; browser Back with open mobile sheet at390×812; direct-entry fallback | Passed:44px compact header, inline desktop contacts/mobile trigger; exact home return1568→1568 desktop and2356→2356 mobile, modal lock removed; direct-entry Back reaches home. Home career columns/color remain160/616 and muted | Same browser evidence |
| Console / page errors | Fresh uninjected IAB tab: load, scroll, Contact open/Escape close | Passed: no warnings/errors. Earlier temporary sampler teardown produced one debug-only callback error; retained and attributed in evidence, then rerun in a clean tab without probes | `instrumentation` and `clean-uninjected-smoke-console` in browser evidence |

Evidence directory: `/Users/ivan/Developer/cheremisin-portfolio/test-results/port18-manifesto/` (ignored); screenshots: `/Users/ivan/Documents/Codex/2026-10-27/portfolio-frontend/outputs/port18/`. Read-only Figma context session `04324ee0-d621-4443-9937-203c9b3839ca` supplied both full contexts/screenshots; no Figma write was made. Before snapshots use `.txt` suffixes so they cannot enter TypeScript compilation. Rollback is the bounded component/CSS intake delta only; never reset the dirty tree or shared/other-owner work.

**Implementation DoD: Passed. Global QA Acceptance: Open.** FRONTEND files/runtime are released for independent QA on this final served build. QA checks the admitted visual/content/semantic/keyboard/overflow/motion/Header/native-return boundary and returns same-scope defects directly to FRONTEND; passed evidence goes to PRODUCT for Ivan's local review. Required failures, a design departure or missing QA keep PORT-18 open. Repository-wide lint is not a pass claim: the existing build configuration skips lint and historical repo lint issues remain outside this slice. Physical-phone/Safari/touch/safe-area, external mail/social delivery and deployment were not exercised; this proof covers local IAB behavior only. No stopped Chrome/color diagnostics were resumed, and no global browser setting, commit, push or deployment occurred.

### Current Marker Revision — Verified For FRONTEND

The requested per-item identification is now supplied by the existing **Manifesto / Statement** owner `2531:2`. No route code was edited by DESIGNER. [Final desktop](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2530-62) is **1440 × 1152**; [final mobile](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2530-63) is **390 × 1384**. Mobile grew 40px as the narrower text measure wraps; no text size or fixed-height clipping was used to retain its earlier height.

One existing **Portfolio / Icon / basic/right** component `2459:61` (glyph `2459:60`) appears before each statement, **21 per view / 42 placements**. Its actual supplied vector was inspected. Runtime provenance already maps this same source in `src/components/portfolio/PortfolioArrow.tsx` to `public/icons/portfolio/arrow-right.svg`; use the existing helper with `direction="right"` and retain its decorative empty-alt/aria-hidden treatment.

The source marker instance is `2558:105` inside first-line slot `2558:104`. Icon geometry is **16 × 16**, slot **16 × 20**, with the icon centered at **y=2px** against the existing 14/20 text line. The root Statement is now horizontal with **8px → `layout/space/sm` (`VariableID:2466:70`)**. Text begins at **x=24px**, uses FILL width (**592px desktop / 318px mobile**) and grows vertically, so wrapped lines hang-align under the first text line. Group labels and introduction have no markers.

Marker and text use the same full-opacity primary yellow; no background, badge, new color, hover/click reaction or navigation behavior was added. The source TEXT node `2531:3`, property `Statement#2531:0`, all 42 instance IDs/overrides and exact authored strings remain intact. Shared font/color/spacing definitions, group/grid/header/footer/contact owners and separate Citymobil/Foundation work were preserved. The one source component replaces 42 independent marker constructions.

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Exact content and groups | Source route snapshot vs desktop/mobile | Pass: exact introduction, four ordered groups, all 21 statements; markers are vectors, no character prefix added | `source-copy.json`, `verification.json` |
| Marker source/count/interaction | Existing right-arrow source and all Statement consumers | Pass: 21 per view; 16px supplied vector, no slot/icon reactions; TEXT property and all 42 consumer IDs retained | `build-result.json`, `final-source.json`, `verification.json` |
| Color/type/spacing | Text and marker descendants | Pass: existing SF Pro14/20 and primary/link color, full opacity; bound 8px semantic gap and zero slot padding; no findings | `verification.json` |
| First-line alignment / wrapping | Desktop616px / mobile342px Statement lanes | Pass: x24 hanging indent, 16×20 slot/y2 icon; no root overflow or clipping. Full compositions visually inspected | [Desktop screenshot](/Users/ivan/Documents/Codex/2026-10-28/portfolio-designer/outputs/port18-markers/manifesto-markers-desktop.png), [mobile screenshot](/Users/ivan/Documents/Codex/2026-10-28/portfolio-designer/outputs/port18-markers/manifesto-markers-mobile.png) |
| Editable structure | Desktop / mobile | 162 / 149 descendants; 35 / 33 TEXT, 58 / 52 INSTANCE, 28 / 25 VECTOR, 41 / 39 FRAME. No full-page raster | `verification.json` |
| Handoff hygiene | `npm run hygiene:check` | Passed | Command exit0 |
| Runtime/build/browser/QA | DESIGNER Figma stage | Pending admitted FRONTEND/QA checks above; no runtime, keyboard, no-JS or animation proof claimed | Current implementation boundary |

Work/audit directory: `/Users/ivan/Documents/Codex/2026-10-28/portfolio-designer/work/port18-markers/`; export directory: `/Users/ivan/Documents/Codex/2026-10-28/portfolio-designer/outputs/port18-markers/`. [State/source/rollback ledger](/Users/ivan/Documents/Codex/2026-10-28/portfolio-designer/work/port18-markers/state.json) records exact added/modified IDs, 331 current page IDs, source mapping, retained consumers and limits. The marker-only rollback is removal of slot `2558:104` plus restoration of the recorded Statement layout/gap; never restore other owners or earlier visual snapshots.

Ivan's base-direction approval with this exact addition is recorded in the current revision. DESIGNER verification is complete; the same Task is fetched back **In progress / Implementation / FRONTEND**, with the first two marker-design checks complete and runtime/QA checks still open. The Figma writer is released. FRONTEND owns the already admitted `/manifesto` implementation and direct **QA → PRODUCT** acceptance chain. No additional redesign/approval relay, new dependency, Chrome/IAB investigation, commit, push or deployment is authorized.

### Verified Base Design — Before Marker Addition

PORT-18 / DESIGNER verification is complete. [Desktop proposal](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2530-62), `2530:62`, **1440 × 1152**; [mobile proposal](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2530-63), `2530:63`, **390 × 1344**. Both are on the new **Manifesto · PORT-18** page `2530:61` in the existing file. One direction was requested and produced; no alternative visual system is proposed.

The demonstrated cause is the retained Dossier composition in `ManifestoContent.tsx`, reached by `/manifesto`; browser inspection also showed the avatar, duplicated labels/titles, dashed rules and muted list text. This proposal removes those presentation patterns from the design. Runtime still belongs to that component and remains unchanged until an approved FRONTEND stage.

The single visible Manifesto context title sits in the 44px contextual header. The exact short introduction leads directly to **Principles → How I work → Mindset → Professional**, followed by the existing contact destinations. There is no avatar, image, large hero, terminal marker, index, framed panel, ornament, divider or new CTA. Future runtime retains a programmatic main h1 and section h2/list semantics without another visible title bar.

Desktop uses the homepage's 800px lane: 160px group label, 24px gap and 616px statement lane. Mobile uses 342px content with 24px gutters and places each label above its statements. Typography remains compact **SF Pro 14/20**: Body/SM for copy, Emphasis for context/group/contact labels and Link for contact/Back. An 8px statement gap and existing 32px spacing aliases produce quiet group separation; hierarchy comes from alignment, weight and space.

### Reused Owners And Exact Copy

Design-system direction **1** was applied: existing local Portfolio patterns. Reused plain link `2459:162`, left arrow `2459:56`, shared contact component `2487:306`, current contextual-header composition, Body/SM / Emphasis / Link styles, semantic background/primary/link colors and `layout/space/*` aliases. Library discovery/search found no applicable Manifesto composite; no external system or Code Connect mapping was introduced.

Every text descendant in both compositions uses **`color/text-primary` (`VariableID:2459:8`)** or the existing **`color/link` (`VariableID:2465:66`)** alias, both resolving to **#FFE7A3**, with text-paint alpha 1 and whole-node/inherited opacity 1. Background remains `color/background` → #3A0823. Shared styles/selected variable definitions read back byte-for-byte equal to the intake snapshot; homepage color hierarchy and all global values remain unchanged.

The only new repeated module is proposal-local **Manifesto / Statement**, component `2531:2`, editable text `2531:3`, TEXT property `Statement#2531:0`. Its 42 placed instances replace duplicate paragraph construction across desktop/mobile. Auto-layout groups preserve one statement per row and its original ordering. The module is owned by DESIGNER on this proposal page; no library was published. Header/content/section/continuation frames group existing primitives without creating another global header family.

[Exact copy snapshot](/Users/ivan/Documents/Codex/2026-10-28/portfolio-designer/work/port18/source-copy.json) captures the route introduction and groups **6 / 5 / 5 / 5**. [Saved comparison](/Users/ivan/Documents/Codex/2026-10-28/portfolio-designer/work/port18/verification.json) confirms both proposals contain the same introduction, four labels and **all 21 statements verbatim and in order**. Corpus-normalized headings/wording were not substituted. The seven named source files, including route, corpus, current Header/ContactSheet/HomePage and CSS, retain their intake SHA-256 hashes.

### Verification And Review Gate

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Exact content | Route snapshot against each Figma composition | Pass: exact introduction, four labels and all 21 ordered statements on both | `source-copy.json`, `verification.json` |
| Primary color and actual fonts | Every text descendant, including nested contacts; additional master/note text checked | Pass: SF Pro only, existing shared styles, primary/link bindings with the same full-opacity resolved color; no findings | `verification.json`, `shared-readback.json` |
| Editability and layout | 1440 desktop / 390 mobile; all nonzero auto-layout spacing | Pass: 99 / 86 descendants, 35 / 33 TEXT, 37 / 31 INSTANCE nodes; no image-filled nodes, unbound nonzero spacing or root overflow | `build-result.json`, `verification.json` |
| Visual composition | Full desktop/mobile screenshots compared with homepage family and current route | Inspected: compact hierarchy, readable wrapping, no clipping/overlap, aligned header and contact continuation | [Desktop image](/Users/ivan/Documents/Codex/2026-10-28/portfolio-designer/outputs/port18/manifesto-desktop.png), [mobile image](/Users/ivan/Documents/Codex/2026-10-28/portfolio-designer/outputs/port18/manifesto-mobile.png); `runtime-before.png`, `homepage-reference.png` |
| Source/shared preservation | Seven source hashes and selected shared style/variable snapshots before/after | Pass: identical; all mutation IDs belong to the dedicated proposal page | `source-integrity.json`, `dependencies.json`, `shared-readback.json`, `state.json` |
| Workspace hygiene | `npm run hygiene:check` at PORT-18 checkpoint | Passed | Command exit 0 |
| Runtime and interaction coverage | Static Figma-only proposal | Not exercised: sticky header, Back/history, Contact sheet, focus/Escape, motion and intermediate runtime breakpoints. Build/runtime tests are outside this design-only scope | Notes `2531:199`; reuse existing approved runtime contracts when implementation is admitted |

Work/evidence directory: `/Users/ivan/Documents/Codex/2026-10-28/portfolio-designer/work/port18/`. Export directory: `/Users/ivan/Documents/Codex/2026-10-28/portfolio-designer/outputs/port18/`. [State/rollback ledger](/Users/ivan/Documents/Codex/2026-10-28/portfolio-designer/work/port18/state.json) records session `1ed32d40-3c0b-4018-a918-24098bea0914`, all **202 active owned IDs**, exact group/header/footer/module IDs, before/after page identities and limits.

Only this proposal page was added (13 → 14 pages). PORT-17 was released before this writer started and remains a separate review outcome. Foundations, homepage, Citymobil, source/corpus/assets and unrelated dirty work were preserved. No application edit, commit, push, publication, deployment or FRONTEND handoff was performed. If rollback is later authorized, remove only page `2530:61` after checking for later consumers; never reset shared primitives/tokens/styles or another page.

**Current open condition:** Ivan's conditional approval and the admitted implementation/QA sequence above supersede the original design-only gate. The Task stays open through FRONTEND → QA → PRODUCT local acceptance. This baseline Figma evidence is not runtime or Global QA acceptance.

### QA Independent Acceptance — 2026-10-28

PORT-18 / Verification: **Passed for the admitted local Manifesto/21 decorative-arrow scope** on production build `g3zmNETA_hVPsoPDuYLhg`. PRODUCT/Ivan visual acceptance remains next; no publication claim. Fresh Manifesto/home/projects HTTP200 responses contain exact `.next/BUILD_ID`; supplied right-arrow SVG200 paints#FFE7A3. Built-in IAB, canonical Developer checkout; no product-code/package/runtime/data changes by QA. Evidence: ignored `test-results/port18-qa/`.

| Check | Independent scenario / environment | Result / evidence |
| --- | --- | --- |
| Exact copy / hierarchy |375/390/1440 DOM vs DESIGNER source-copy snapshot|Pass:exact intro and all21 strings/order; groups6/5/5/5; one programmatic h1 and h2 sections; real ul with direct li children. `geometry-content.json` |
| Decorative markers |All21 items at each width|Pass:21 loaded existing right SVGs, empty alt/aria-hidden on image and enclosing slot, no href/button/tab target. No markers on intro/group labels.16×16 icons in16×20 slots,y2px;8px gap yields24px hanging text. `geometry-content.json`, `http.json` |
| Geometry / wrapping / primary text |375/390/1440, scoped visual inspection|Pass:desktop800px lane, mobile24px gutters;14/20 text, all text computed rgb(255,231,163); zero horizontal overflow, wrapped statements align to text column. Legacy avatar/Dossier/image decoration absent. Final content bounds1404/1384/1152px respectively. Normal viewport screenshots and complete no-JS mobile inspected |
| Screenshot evidence |Normal mobile/desktop plus readable no-JS full composition|`mobile-top.png`, `manifesto-375/390/1440.png`, `nojs-top-390.png`. Full-page normal captures intentionally retain offscreen reveal visibility states, so they are not evidence of missing copy; no-JS full capture proves complete composition |
| Keyboard / focus / modal |390×812, native Tab/Return/Escape|Pass:skip focuses main; sequence skip→Back→Contact→footer Email/LinkedIn/GitHub only, no decorative marker stops. Sheet Close→Email→LinkedIn→GitHub→Close loop; Escape returns Contact, removes dialog/unlocks styles. Focused footer opacity1, outlined44px target. `keyboard.json` |
| Repeat/reduced/fallback |390×812 scoped repeat motion, reduced emulation, disabledJS and throwing observer route mount|Pass:early item exit/reentry repeated twice with28–29 intermediate frames while bottom110px remains visible; ends0/1, no once-only state. Reduced160ms opacity/transform none; no-JS and observer failure leave all21 opaque/readable. `motion-early.json`, `fallback.json`, `failure-native-return.json` |
| Native return / Header / Contact |Home→Manifesto→Header Back desktop1440; browser Back with open sheet mobile390; direct hard-entry Back|Pass:home y1568/top792 desktop and2268/top792 mobile restored exactly; mobile dialog/inline lock removed; direct entry returns home. Existing44px context header and contact destinations preserved. `failure-native-return.json` |
| Shared extraction regression |Home after return at1440/390|Pass:career columns160/616 desktop, stacked342 mobile, rgba yellow0.64 muted color unchanged.800px/24px contract checked independently of PORT-19. No separate geometry work admitted |
| Runtime/console / assets |Final build HTTP plus clean uninjected browser|Pass:served final build marker and SVG200; clean console has no warning/error. `http.json`, `clean-console.json` |

No reproducible in-scope defect remains. An initial motion sample targeted a late item whose requested exit was clamped by maximum page scroll; `motion.json` is retained as a coverage-limited sample, not exit proof. The valid early-row repeated trial in `motion-early.json` resolves that gap without changing source or shared motion. Source/color/Chrome diagnosis was not reopened.

All tab-scoped observer/JS/reduced probes restored; viewport reset and both QA-created IAB tabs closed. No fixture/user/data created. FRONTEND type/build/hygiene evidence was read as owner proof, not rerun by QA; repo-wide lint remains unclaimed. Physical-phone/Safari/touch/safe-area and external mail/social delivery are unexercised; no stopped Chrome/color investigation, global profile/settings changes, Figma write, commit/push or deployment. Unchanged case/media/backend/corpus and separate PORT-19 retain their boundaries.

Return same Task to PRODUCT for Ivan's local visual review. This checkpoint closes independent local QA for PORT-18; it does not accept unrelated tasks or authorize publication.
