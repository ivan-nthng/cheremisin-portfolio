# Current System

Scope guide,2026-10-30: [Current Product](current-product.md) is the short visitor-flow map. Published Production Boundary below identifies the isolated public release; active source ownership is not proof of publication. Dated local candidate paragraphs retained later in this document are snapshot history wherever superseded by the first current Citymobil runtime paragraph. Current executor/queue lives in Portfolio Notion, not an older pending-status sentence.

## Published Production Boundary

Local runtime recovery,2026-10-30: the old temporary pt3 and background snapshot directories were unavailable on restart. Current [Citymobil3140](http://127.0.0.1:3140/preview/citymobil) is DEVELOPMENT from the canonical checkout; [background3141](http://127.0.0.1:3141/preview/citymobil-background) is DEVELOPMENT from421 copied current-source files at `/Users/ivan/Developer/.local-previews/cheremisin-portfolio/background-current`, with a separate cache. Neither is the prior frozen accepted candidate. Owned macOS launchd jobs `com.cheremisin.portfolio.preview3140`/`preview3141` set explicit WorkingDirectory and survive the tool/chat process. Both routes/noindex and10 resources each returned HTTP200; receipt `/Users/ivan/Library/Logs/cheremisin-portfolio-preview/runtime-readback.json`. No application source/public release changed or independent functional QA rerun. Earlier exact-build/rollback availability statements are historical receipts, not current artifact availability. This local recovery does not alter the published boundary below.

PORT-23 icon-only publication now maps www to READY `dpl_BrdHJ9NXrUjeauGfnjFN4LZZAqtc` / build `WY3YLPDPqkCT4uYmd1q8D`. Exact211-file manifest78f43790 extends the accepted PORT-22 packet below with only SVG/ICO/Apple icon owners;208 files preserved. Stage/public exact assets, metadata and build readback passed; prior8d2p READY retained rollback. [Publication evidence](design/portfolio-figma-foundations.md#backend-transparent-icon-publication--2026-10-29). The historical ring-fix READY candidate remains unpromoted and must preserve these published icons before any later release.

Accepted PORT-22 release: https://www.cheremisin.co.uk/ maps to READY production `dpl_8d2pCtsVybL2qEQ44wQuBULXtAYu` / build `yEH_ydilQbBN7kiUfpNrd` on existing portfolio project `prj_87eVQkA1ehpM3rTJszSNj6dqaNDo`. Production is isolated211-file PORT-21 extension/208preserved/3delta, manifest `33dcc27d29efaafb64b63385bbb21562db7012f9b4eca987b68412551a5f78c8`, NOT the dirty checkout or a new Git publication. Existing home eye/bootstrap/grid-progress seams now provide ready center-to-grid travel, reversible first24px scroll fade and paused hidden rotation, with prior readiness/input/watchdog/Back/source/White40/contacts/SEO preserved. Baseline case/Manifesto and projects/chatAPI404 remain; home-only indexing unchanged. READY prior PORT-21 is retained rollback,unused. [Current release/QA/limits](design/portfolio-figma-foundations.md#product-grid-eye-final-acceptance--2026-10-29) own actual publication; older pending/nonpublished statements below are history. Citymobil is design-only.

PORT-22 visible-ring correction is local owner-ready, not yet published: `home-eye-bootstrap.ts` now uses opacity/document visibility/reduced-motion to pause decoration, removing document focus as a false visibility signal. Native address-bar before/after proof and scoped hidden/scroll/reduced/contact checks pass on4OL_hV9NH87EJu0nelZ-o/3138. [Owner result](design/portfolio-figma-foundations.md#frontend-visible-ring-focus-fix--2026-10-29) and one-file delta preserve all other owners; BACKEND isolated stage/SAME-build/live proof remains open. Published identity above remains current until release readback.

PORT-23 icons are published through the isolated release above: `public/favicon.svg` contains only the original48px eye path in#FFE7A3; `src/app/favicon.ico` contains six transparent raster sizes and `src/app/apple-icon.tsx` reuses the same path through existing ImageResponse/180px PNG. Existing root metadata references remain valid. [Exact source/render proof](design/portfolio-figma-foundations.md#frontend-transparent-icon-result--2026-10-29) excludes the blocked PORT-22 rotation fix and all208 unchanged release files; exact public asset/metadata/build readback passed; installed-device and native favicon-cache appearance were not exercised.

## Runtime Shape

- The system is a single Next.js 15 App Router application.
- All user-facing behavior is rendered from the `src/app` tree.
- PORT-31 has removed the old portfolio AI-chat presentation/client state and terminal-only experiments. BACKEND also removed the registered API/server generation/retrieval/validation/projection, obsolete chat contracts/tests and exclusive OpenAI dependency. The integrated isolated build/types and owner GET/POST404 checks passed; independent browser acceptance remains required. Citymobil's separate simulated chat remains active. There is still no database, CMS, authenticated admin surface, or separate backend service.
- The application is effectively a static content portfolio with interactive client-side UI behavior layered into route pages and shared components.

## Route Ownership

- `src/app/layout.tsx` owns the global HTML shell, default site metadata, global CSS, theme provider wiring, and the single contextual header used on every route.
- `src/app/page.tsx` owns the home route entry and its route-specific metadata.
- `src/components/layout/HomePage.tsx` owns the active home-route composition path.
- `src/app/projects/page.tsx` owns the server-rendered public project index.
- `src/app/manifesto/page.tsx` owns the manifesto route.
- `src/app/projects/*/page.tsx` owns individual project case-study routes:
  - `ds-hito`
  - `litres`
  - `peruse`
  - `taxi-aggregator-support-workspace`
  - `wrike`
- `src/lib/seo.ts` owns the www origin, authored identity, shared route metadata and bounded home Person/WebSite graph. Root metadataBase/icon defaults and actual server page exports produce unique route titles/descriptions/self-canonicals/OG-Twitter; home is index/follow and all seven other current local pages are noindex/follow. The previously unreachable Manifesto/Hito metadata modules are removed.
- `src/app/robots.ts` permits crawler access and names the absolute sitemap; `src/app/sitemap.ts` lists home only. `src/app/opengraph-image.tsx` and `src/app/apple-icon.tsx` generate static1200×630/180×180 PNGs with bundled Next ImageResponse and existing brand colors; existing favicon SVG/ICO are preserved. Home page renders one escaped server JSON-LD script before the unchanged HomePage.
- [SEO owner proof and baseline transfer](plans/active/portfolio-website-relaunch-mvp.md#frontend-seo-source-result--2026-10-28) separate current source from the BACKEND isolated release: baseline case renderers/layout adapters must receive metadata-only patches, not whole dirty page copies; its prior local-index404 remains outside the admitted packet.

## Rendering Model

- The root layout is a server component.
- The home route entry and `src/components/layout/HomePage.tsx` are server components.
- The manifesto route entry and `src/components/ManifestoContent.tsx` are server components. Manifesto renders its exact inline copy and semantic editorial groups/lists on the server, using the existing client `RepeatReveal` islands for progressive motion.
- Project detail route entries preserve authored content and delegate interaction to shared client components; `ProjectPageShell` supplies the main landmark without mounting a second header or chat.
- Most shared UI components are also client components because they use:
  - `framer-motion`
  - `next-themes`
  - scroll listeners
  - intersection observers
  - local interactive state
- Client-only behavior is now pushed down into smaller islands such as:
  - `src/components/layout/Header.tsx`
  - `src/components/layout/HeroSection.tsx`
  - `src/components/layout/HomeHeroActions.tsx`
  - `src/components/ProjectPageShell.tsx`
  - project storytelling components that own their own animation, theme, or tab state

## Shared UI Ownership

### Active shell components

The existing owners below remain canonical. Older PORT-20/21/22 local-only and pending-QA statements describe those recorded snapshots, not the later Published Production Boundary above; the visible-unfocused ring correction remains separately unpublished.

- PORT-22 local rendering extends existing `layout/HomeEyeLoader.tsx`/`layout/home-eye-bootstrap.ts`: selected native decode ends finite busy/input ownership immediately; separate optional decoration uses shared grid carrier,101.0068px visible envelope/local21.4966px padding,480ms measured origin-to-slot transform/160ms cover and8s ring. Native scrollY drives first24px opacity/slot-only return; fit omits short/enlarged/focused-control conflicts,hidden/dialog rings pause,interruptions and native Back settle without rearming. Published PORT-21 input-tail/3s/no-late-photo/default-readable/no-JS safeguards and Header/HomePhotoHero progress remain. This is local-only pending QA/release; [owner result](design/portfolio-figma-foundations.md#frontend-grid-eye-implementation-result--2026-10-29) owns exact evidence and isolated3-file transfer. The production boundary above remains published PORT-21.
- `src/components/layout/Header.tsx` owns the single home/context title, desktop contacts, route-appropriate mobile Contact trigger and native in-site history Back with direct-entry home fallback. PORT-20's home-only controller measures the photo-copy name anchor, moves that one name to y12 in the44px header on ordinary scroll, independently fades the photo/details and relocates desktop contacts only while invisible; focused contacts retain their current visible position. Reduced-motion/oversized-copy home uses static ordinary flow. Home/Manifesto invoke the same Contact state from their bottom dock; project/index routes retain the header trigger. `layout/ContactSheet.tsx` remains the unchanged native fullscreen modal owner for canonical links, focus containment, scoped scroll lock/return and immediate native-navigation cleanup. The accepted production packet retains its separate home-only Header wrapper and legacy case shells; this canonical working runtime is not itself a release packet.
- `src/components/portfolio/PortfolioGrid.tsx` owns the home/Manifesto-only decorative overlay and floating grid/Contact controls. The server pages use the shared `.portfolio-grid-lane`/`.portfolio-grid-tracks` CSS recipe; the controller reads that lane's actual rectangle and rendered count/gutter instead of independent viewport math. Default Off is route-local memory only. Its optional home-only `splitControls` preserves approved PORT-20 anchors: grid left24/bottom24 and mobile Contact right24/bottom24, both44px high; default Manifesto geometry is unchanged. `globals.css` maps accepted equal12/2 columns,3/9 and1/1+2 spans, safe-protected geometry, fit exceptions, contours/glass/reduced motion and derived footer reserve. Other routes do not mount this feature. [PORT-19 owner evidence](design/portfolio-layout-grid-overlay.md#frontend-implementation-checkpoint--2026-10-28) retains the independent QA boundary.
- `src/components/layout/HomePage.tsx` owns the server-rendered photographic opening, nine career records, Projects Done and Contact. `HomePhotoHero.tsx` owns decorative responsive AVIF/WebP selection, the ordinary-flow identity/introduction geometry and one no-JS H1 fallback; shared Header owns the one visible name when JS runs. Scoped CSS applies40% uniform black toning to the image only, preserving the raspberry missing-image fallback. PORT-16's temporary public-home admission still unmounts Personal and utility navigation while retaining canonical data/routes for later restoration; it selects the pending project-title presentation below.
- `src/components/ManifestoContent.tsx` owns the server-rendered Manifesto introduction, four groups/21 statements and canonical Contact footer. Its `editorial-row` now consumes the shared PORT-19 grid:3/9 desktop spans, small label/full-reading mobile spans. Homepage-only muted color remains scoped to career rows. The accepted PORT-18 statement map still renders valid list items with decorative `PortfolioArrow direction="right"`,16×20 first-line slots and8px gaps; RepeatReveal/ContactSheet sources remain unchanged. [PORT-18 copy/marker delivery](design/manifesto-editorial-proposal.md#frontend-implementation-checkpoint--2026-10-28) is the accepted baseline; current grid/runtime verification belongs to PORT-19 above.
- `src/lib/site-content.ts` owns read-only home identity/introduction and career/contact/Personal copy with provenance. PORT-20 adds the exact third identity role Film director without changing employment or SEO job titles; `src/lib/projects.ts` remains the shared project metadata owner.
- `src/components/portfolio/EditorialProjects.tsx` renders the same five project records. Its default mode keeps real case links on `/projects`; home passes `pending` to render `ProjectStatusTooltip` buttons instead of internal hrefs/arrows, preserving descriptions/roles/company links and canonical readiness data. The status owner is a small client island with hover/focus/pinned dismissal, body-portal black/warm-yellow tooltip, viewport fit and static no-JS fallback; it adds no storage/dependency or global navigation interception. [Current local proof and isolated-release boundary](plans/active/portfolio-website-relaunch-mvp.md#frontend-temporary-homepage-result--2026-10-28) distinguish this working runtime from the later BACKEND production packet.
- `src/components/portfolio/RepeatReveal.tsx` owns repeatable entry/exit motion. Its stationary track supplies observer geometry; the inner content alone animates. The optional home-first-career `clearDock` mode uses a stable bottom-edge sentinel so fitting content clears the fixed controls before entering, including fast scroll jumps; oversized units retain partial-entry reachability. Default tracks,240ms/8px reveal, readable HTML, reduced-motion and focus-within visibility are preserved.
- `src/components/ascii/Dossier.tsx` retains the existing case composition/media interfaces, with retired numbered dossier bars and a shared repeatable reveal. The historical path/name is retained to avoid a parallel component family.
- `src/components/ascii/AsciiAssetFallback.tsx` retains the existing fallback API with plain missing-preview text, without ASCII art.
- `src/components/ui/*` contains existing reusable controls.
- PORT-31 removed the prior portfolio conversation provider/surfaces/evidence/origin helpers, branch-state/client SSE parser and their client-contract test, plus unmounted HomeSignal/HomeHeroActions, numbered ProjectHeader/Projects and their home-shell navigation helper. None had an active route importer. Chat-only styles and ASCII-rule pseudo-elements are removed; existing plain Technical captions reuse `.case-caption` with identical values. The registered `/api/portfolio-chat` and server generation owners are also removed. `contracts.ts` retains only existing project identifiers/type for active ProjectPageShell.

### Project-route shared components

- Current Citymobil runtime at3140 is frozen productionpt3NyoTtrQfnNQsr6DwAz, identical to accepted3142 donor. Main/story reducer/original trip JSON remain exact8q: persistent viewed Order, desktop lane/narrow flow, composer-owned phone and guarded immediate ghost/Tab/Send stay accepted. Existing Track/model/hook now extend one prepared context timeline before/after the authored ride, separate phase/kind/congestion GeoJSON, keep rider at drop while driver continues and apply scoped CM vector materials. One replay clock, native assets, provider/glyphs, camera/Retry and intrinsic legend/card stack are reused; no runtime routing/service/store or live GPS/traffic. [Bounded map + common-URL acceptance](design/citymobil-case-study-proposal.md#product-journey-map-acceptance-and-local-handoff--2026-10-30) supersedes older runtime/overlay descriptions below, retained only as snapshot history.416-source/build/resource closure verified without rebuild;8q rollback/donor3142 retained. Actual hidden lifecycle deferred; separately admitted PORT25 resumes after local acceptance under its own isolated preview contract, with no backend/publication change.

- `CityMobileInteractivePreview.tsx` remains the single Citymobil client demo at local noindex `/preview/citymobil` and its preserved case callsite; the exact-path Header exclusion applies only to preview. The existing reducer owns scenario/selected-trip/stage/consent/message/call state; viewed-order/map IDs remain local presentation. The same reducer owns immutable pending participant replies with2000ms delivery/run guards, derived Lost checklist state and tone-only draft updates; it remains the only support-story truth. The native Order uses one Details/Payment/History card and current guarded menu aliases. `CitymobilTrack`/`useGeographicTrack` project prepared geographic fixtures with lazy MapLibre/OpenFreeMap, while `CitymobilPaymentCard` owns both order and Lost financial presentation. Native source fonts/assets/tokens and `DemoMotion` remain scoped to CM; `DemoShell` owns portfolio controls/completion outside that namespace, native inert background exclusion and pre-paint cover focus. [Prior local baseline acceptance](design/citymobil-case-study-proposal.md#product-local-integrated-acceptance--2026-10-30) records exactc8d6 closure and retained integrated Mm proof. The [current local replacement](design/citymobil-case-study-proposal.md#product-order-delivery-and-composer-acceptance--2026-10-30)06_XekYwZ5DA5NnTDYRGL passed focused independent QA and PRODUCT acceptance, and remains frozen. No backend/persistence/live GPS/payment/call service or publication is introduced; the original case narratives/media, future guided stories, separate background prototype and public routes remain outside this accepted local slice.

- Current PORT-17 refinement `InoXzIw9zVJAH-9LJOVKz` at3140 extends those same owners, pending focused independent QA. `RouteSummary` replaces three duplicated normal/compact endpoint fragments; Order is a fixed overlay with mobile inert/focus boundary, independent compact phone and measured shell-toolbar offset. Reducer `draft-edit` owns guarded local drafts without changing pending/call/story; native source8365 apron and mandatory placeholder remain presentation. Track uses existing geographic projection with one deterministic playback/inspection clock, heading/events and source-token colors; unchanged Lost fixture comparison is explicitly unavailable. Scoped observers/listeners/timers clean up on close/unmount; dropdowns follow actual trigger geometry. [Exact candidate and proof limits](design/citymobil-case-study-proposal.md#frontend-refinement-candidate--2026-10-30) retain accepted06 snapshot and PORT-25 progress; no new service/store/public release.
- Track legend/participant collision fix `D9uRKRrCHyfu0Vk2T7V24` at3140 replaces only Ino's Track markup/scoped CSS: one bottom context owns intrinsic legend and participant heights with12px separation, removing independent legend offsets.407/409 Ino sources and all state/provider/timer/fixture owners are unchanged; prior passed QA is reusable, composition-only retest pending. Actual hidden lifecycle is Ivan-deferred.
- Current410-source fast path at3140 reuses those owners: Main derives display-only composerGuidance without changing composerHint/nativeDraft/Send/reducer; obsolete transcript stageHint is removed. Scenario/selected-trip avatar metadata supplies Order/map/contact/Connect/media, with one local generated Tiago portrait and preserved native assets. Context well/card use one zero-basis flex/min-height:0/scroll recipe, removing independent500/520px constraints. [Quick correction proof](design/citymobil-case-study-proposal.md#frontend-quick-corrections-result--2026-10-30) distinguishes the served development snapshot from retained D9 production and the NEXT phase/traffic/CM-basemap map increment.
- The unmounted terminal-era `src/components/ProjectHeader.tsx` was removed in PORT-31; active routes continue using `layout/Header.tsx`.
- `src/components/ProjectPageShell.tsx` owns the shared main landmark and Hito/Peruse media-boundary notices.
- `src/components/ProjectHero.tsx`, `ProjectOverview.tsx`, `ProblemSection.tsx`, `DemoSection.tsx`, `GallerySection.tsx`, `ProjectNavigation.tsx`, and `ProjectFooter.tsx` are the main reusable case-study building blocks.
- `GridOverlay.tsx` is retained legacy source referenced by `legacy-home/Header.tsx`; it is not mounted by active home, Manifesto or project routes. PORT-19's scoped `portfolio/PortfolioGrid.tsx` is the sole active overlay owner.

### Additional component inventory currently present in the repo

- `src/components/legacy-home/*` contains the older home-shell component family retained outside the active runtime path.
- Recovery-suffixed files are noncanonical; the existing workspace hygiene policy owns their treatment.

## Home Route Behavior

PORT-20 local implementation,2026-10-29: home opens with the approved full-screen photograph and opaque white identity/introduction, centered at the approved full-desktop reference and shifted32px on approved mobile, then the existing yellow editorial/grid lane with Work Experience, five pending project titles and Contact. Roles read `Product designer | Product builder | Film director`,4px below the single visible name. A stable100svh stage grows for oversized copy; normal scrolling moves the name to y12 in the44px header, fades photo independently and leaves role/introduction in ordinary flow. Desktop's one contact group moves lower-right→header only through zero opacity; focused contacts stay visible without relocation. Reverse restores the opening. Reduced-motion, oversized-copy and no-JS modes remain readable in normal flow; image failure retains reserved geometry and raspberry background. Document height stays constant during normal compaction; native history restoration and direct-entry fallback reuse the existing navigation path. No persistence model or external service is introduced. Personal/utility navigation remains unmounted; its canonical external links are retained in data. Existing scoped copy-shift CSS uses64px below375px width,32px at width≤1039px or height≤767px, and a continuous32→0 taper over1040–1440px width on taller views; full-width desktop remains centered. This replaces the prior599/600 cutoffs and60px narrow fit. Existing Header surface progress mixes the one name white→yellow; no JS/timing/state was added. Static/reduced/no-JS copy stays white. Owner resting contrast samples now pass≥4.542:1; [Corrected responsive proof and refreshed baseline constraints](design/portfolio-figma-foundations.md#frontend-responsive-fit-correction--2026-10-29) retain independent local/global/release QA. Accepted PORT-16 production still serves the pre-photo home until a separately verified release.

## Project Content Ownership

- The canonical shared project contract now lives in `src/lib/projects.ts`.
- That module owns both:
  - the `Project` type
  - the `projects` content array
- The same module now also owns the active public subset through `activeProjects`, which exposes all five authored case destinations in the current index/pager context; the Coming Soon placeholder stays inactive.
- `src/components/Projects.tsx` now owns only the rendered projects listing UI and consumes the shared data module.
- Project detail routes import the `projects` array from `src/lib/projects.ts` to:
  - resolve the current project
  - derive next/previous navigation
  - reuse technologies and shared project metadata
- Individual project routes also define substantial page-local content inline:
  - descriptions
  - metrics
  - gallery configuration
  - demo media references
  - embedded SVG logos

### Chat-first grounding corpus

PORT-31 preserves the Markdown corpus, facts/provenance, authored project metadata and historical Chat-First documents. Portfolio conversation UI/client runtime and API/server generation are removed. Markdown source content is retained without a runtime compiler or AI publishing path. Current `/projects` still renders EditorialProjects from shared authored metadata. The architecture receipt below is historical wherever it describes removed chat/server owners.

- Reviewable canonical grounding content now lives under `content/portfolio/`.
- That corpus owns future reusable identity, project, claim, starter-question, alias, and evidence-status truth.
- `src/lib/projects.ts` and route-local content remain the current runtime inputs and migration sources; they are not the future OpenAI retrieval source of truth.
- Public media remains stored under `public/*`, but its answer eligibility is governed by `content/portfolio/evidence-manifest.md`.
- PORT-31 removed server compilation/retrieval/API and obsolete public-discovery projection; content inputs remain byte-exact. Active loader bootstrap remains server-only and its hydration test/helper are retained.
- Old PortfolioAnswer/request/SSE/grounding contracts are retired. Existing PortfolioProjectId and its identifier tuple remain for active project-page typing.
- The historical implementation contract is `docs/plans/active/chat-first-portfolio-first-functional-implementation.md`; it does not reinstate removed runtime.
- The former Markdown adapter, deterministic retrieval, OpenAI Responses adapter, grounding validation and POST /api/portfolio-chat were removed by PORT-31; receipts below describe the prior snapshot.
- The previous in-tab branches, origin locators and global/project conversation surfaces are removed from current source. Exact pre-deletion copies and reachability evidence are retained under `test-results/port31-cleanup/`; historical documents are not executable runtime. The active `/projects` index remains the authored listing described above.

### Accepted first functional architecture — Backend Slice 1 implemented

Historical accepted Chat-First contract: future-tense bullets and browser acceptance below describe that slice only. They do not override the active non-chat route owners, public packet or current acceptance limits above.

- The first server slice stays inside the Next.js modular monolith.
- A server-only corpus compiler will read only the explicit canonical Markdown allowlist under `content/portfolio/`.
- A local deterministic index will provide the complete allowed global record set or one project-only record set. Hosted vectors and OpenAI file search are not part of v1.
- The API boundary will be `POST /api/portfolio-chat`.
- OpenAI will use the Responses API server-side with `store: false`, no tools, a server-selected model, bounded context, and structured output.
- The server will validate every returned source, claim, project, and evidence ID against the retrieved allowlist before exposing an answer.
- V1 conversation branches and origin locators will exist only in memory for the current tab. Refresh, hard load, copied URLs, and new tabs will not restore chat history.
- `/projects` is the implemented traditional browse route and derives its five entries from the compiled corpus projection.
- Project-scoped chat is included in v1 and must be enforced by server-side project filtering. Direct project entry remains an authored case study.
- Anonymous history, answer/conversation sharing, true cancellation, and project comparison remain omitted from v1.
- The default Backend test suite uses fake generators and requires neither `OPENAI_API_KEY` nor network access.
- The production build and built HTTP runtime are accepted in the canonical local checkout. Browser verification covers the root, project index, manifesto, all five authored routes, global and project conversation entry behavior, route/back origin restoration, desktop/mobile overflow, keyboard focus, theme semantics, and the honest unavailable-service path.
- Live OpenAI-backed browser completion remains environment-dependent. Without `OPENAI_API_KEY`, the built runtime presents its technical-error state while deterministic tests prove accepted/complete/done SSE and project-scope insufficiency contracts.

## Styling And Theme Behavior

- Global styles live in `src/app/globals.css`.
- Tailwind CSS is imported globally.
- PORT-16 maps the approved raspberry `#3A0823`, warm yellow `#FFE7A3` and 64%-alpha secondary text to the existing semantic CSS variables. The runtime uses a browser system-sans adapter, not redistributed SF Pro binaries or Google font downloads.
- The compact home/index typography is 14/20 with an 800px desktop lane and 24px mobile insets; mobile Header control labels use an inherited20px visual row aligned to the title’s first text line independently of their44px tap areas; existing case-body layouts/narratives are preserved.
- ThemeProvider remains for existing light/dark media selection; site palette is stable in both modes.
- RepeatReveal uses threshold0 on a stationary track and viewport-clamped128px top/64px bottom bands, so entry/exit transitions remain visible and tall units remain reachable. Initial content already in the viewport stays visible through hydration; only offscreen units initialize hidden. Normal motion is240ms opacity/8px translation; reduced motion is160ms opacity with no translation. Focus is immediately opaque, and missing/failed observers or no JS leave HTML readable. Gallery rows animate individually; modal portals remain outside transformed ancestors.
- The shared lightbox preserves images/videos, captions, next/previous and Escape; keyboard entry, focus trapping/return and scroll restoration are explicit.

## Assets And Media

- Static assets are served from `public/`.
- Project routes rely heavily on route-local images and videos under folders such as:
  - `public/hito`
  - `public/litres`
  - `public/vk`
  - `public/wrike`
- Theme-aware media is typically handled by naming conventions such as `*-light.*` and `*-dark.*`.
- Several components expect route-local preview images or videos to exist at hard-coded `public` paths.
- Active media surfaces now fall back to a shared plain-text missing-preview state when an image or video is absent or fails to load at runtime.

## Environment Assumptions

- The source is written in TypeScript and uses the `@/*` path alias from `tsconfig.json`.
- The intended runtime toolchain is:
  - Next.js
  - React 19
  - TypeScript
  - Tailwind CSS
  - Framer Motion
  - next-themes
- Source files also import icon and utility packages from component code, including:
  - `lucide-react`
  - `@heroicons/react/24/outline`
  - `tailwind-merge`

## System Boundaries

- The repo is currently a modular monolith with no service boundaries.
- Shared concerns are handled in-process through components, route files, and utility modules.
- Current rendered content, route composition, and presentational logic remain co-located in the frontend codebase.
- The reviewable Markdown grounding corpus is connected only through the server-only compiler, retrieval, validation, and portfolio-chat handler path; it is not imported as mutable client truth.
