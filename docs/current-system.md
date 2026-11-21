# Current System

Owner: ARCHITECT for boundaries; named specialists own implementation. Updated 2026-11-02, PORT-32. This is a source map, not evidence of a new deployment. [Current Product](current-product.md) owns visitor behavior; Notion owns task state.

## Published Production Boundary

Last documented public acceptance: PORT-23 icon-only release on www.cheremisin.co.uk, READY `dpl_BrdHJ9NXrUjeauGfnjFN4LZZAqtc`, build `WY3YLPDPqkCT4uYmd1q8D`; 211-file isolated packet, 208 preserved files. [Publication receipt](design/portfolio-figma-foundations.md#backend-transparent-icon-publication--2026-10-29) owns exact assets/readback/rollback. This identity is documentary evidence, not a fresh live check. The dirty checkout and later local cleanup are not that release. PORT-30 remains **HOLD**.

Local recovery recorded 2026-10-30: Citymobil3140 runs DEVELOPMENT from the canonical checkout; background3141 runs DEVELOPMENT from421 copied source files at `/Users/ivan/Developer/.local-previews/cheremisin-portfolio/background-current`, separate cache. Launchd jobs `com.cheremisin.portfolio.preview3140` / `preview3141` own startup. Routes and ten resources each returned200; receipt `/Users/ivan/Library/Logs/cheremisin-portfolio-preview/runtime-readback.json`. Earlier frozen snapshots became unavailable. This recovery proves availability only, not repeated functional QA; current availability is not reverified here.

## Runtime Shape

Single Next.js15 App Router / React19 / TypeScript application. Server-rendered route composition with client interaction islands; no separate application service, authenticated admin, database/CMS or durable chat-history product. Static media lives in `public/`; source aliases use `@/*`.

PORT-31 removed portfolio AI UI/state/SSE, API generation/retrieval/validation/projection, obsolete contracts/tests and exclusive OpenAI dependency. `/api/portfolio-chat` is retired in local source. [PRODUCT accepted/Done](https://app.notion.com/p/40bfe5f58cf581d9bdbbe7fbc95a4c47) on2026-11-01 after independent integrated local QA of home/project, API404 and initial Lost/Pickup simulated sends; build/types and99 tests passed. Full stories/device matrix and public retirement are not claimed. Markdown facts/provenance and Citymobil client simulation remain.

## Route Ownership

FRONTEND owns route/UI implementation:
- `src/app/layout.tsx`: HTML shell, theme provider, CSS, shared Header, default metadata.
- `src/app/page.tsx` → `components/layout/HomePage.tsx`: photographic home, career, pending projects, footer.
- `src/app/manifesto/page.tsx` → `ManifestoContent.tsx`: authored manifesto.
- `src/app/projects/page.tsx`: index; five authored `projects/*/page.tsx` routes retain narratives/media and `ProjectPageShell`.
- `src/app/preview/citymobil/page.tsx`, `preview/citymobil-background/page.tsx`: separate local studies, not publication acceptance.
- `src/lib/seo.ts`, robots/sitemap/OG/Apple routes: metadata; home-only indexing/sitemap. BACKEND owns isolated publication boundary, not route redesign.

## Shared UI Ownership

FRONTEND reuses these seams; DESIGN SYSTEM owns shared definitions:
- `layout/Header.tsx`: one contextual header, home scroll transition, native Back/home fallback.
- `layout/ContactSheet.tsx`: native modal, focus/scroll containment and return; `portfolio/ContactLinks.tsx`: shared contact rendering.
- `layout/HomePhotoHero.tsx`, `HomeEyeLoader.tsx`, `home-eye-bootstrap.ts`: photo/readiness/input/decorative lifecycle. Preserve finite busy ownership, fail-open/no-JS/reduced-motion/Back behavior; decoration must not rearm input blocking.
- `portfolio/PortfolioGrid.tsx` and shared CSS lane/tracks: home/Manifesto grid/controls, not case-route geometry.
- `portfolio/RepeatReveal.tsx`: progressive viewport motion with focus/no-JS readability.
- `EditorialProjects.tsx` / `ProjectStatusTooltip.tsx`: shared records, pending-home status versus real index links.
- Shared gallery/lightbox/storytelling components retain themed media, fallback, keyboard and focus behavior. `ProjectPageShell` supplies the main landmark and evidence notices without a second header/chat.

## Project Content Ownership

`src/lib/site-content.ts` owns identity/career/contact copy; `src/lib/projects.ts` owns project records/active subset. Route-local authored narratives remain in case pages. COPY owns wording; DATA QUALITY owns claims/provenance; neither may invent facts. Markdown under `content/portfolio/` remains readable evidence, without a live AI compiler or automatic publishing path. Active `PortfolioProjectId` contract remains for ProjectPageShell.

## Citymobil Ownership

FRONTEND owns local demo UI/state:
- `components/CityMobileInteractivePreview.tsx`: workspace orchestration.
- `components/citymobil-demo/`: shell, native assets, cards, composer caret, Track and geographic adapter.
- `lib/portfolio/client/citymobil-demo.ts`: reducer/scenarios/simulated reply/call timing.
- `lib/portfolio/client/citymobil-track.ts` and JSON fixtures: prepared journey/clock/participants.
- `citymobil-map-style.ts` / `useGeographicTrack.ts`: MapLibre/OpenFreeMap presentation and failure/Retry; prepared streets/times are not live traffic/GPS/routing.
- `components/citymobil-background/`: isolated background study.
DATA QUALITY owns fixture/media provenance. Demo type/radius/color rules remain isolated from portfolio DS. Native document-hidden verification remains deferred.

## Styling And Theme Behavior

`src/app/globals.css` owns semantic portfolio colors/type/grid/media tokens; local Citymobil CSS modules own native demo styles. ThemeProvider preserves themed media without changing the portfolio palette. Browser system-sans is used for portfolio text; do not redistribute SF Pro or introduce a parallel styling layer.

[Accepted foundations](design/portfolio-figma-foundations.md#current-scope-token-reconciliation-then-homepage) owns responsive XL/LG, ordinary14/20, Technical12/16, weight and radius contracts. Semantic heading level is independent of visual role. Approved adoption preserves the existing homepage visually; Citymobil is isolated. Existing24px home geometry is not replaced by draft spacing. Read exact owner evidence before modifying these seams.

## Historical Evidence

[Pre-compaction system snapshot](current-system-history-2026-11-02.md) retains prior source/build receipts and superseded inventories. Removed compiler/chat/terminal owners mentioned there are historical, not active instructions.

## Rendering Model

[Historical section](current-system-history-2026-11-02.md#rendering-model).

### Active shell components

[Historical section](current-system-history-2026-11-02.md#active-shell-components).

### Project-route shared components

[Historical section](current-system-history-2026-11-02.md#project-route-shared-components).

### Additional component inventory currently present in the repo

[Historical section](current-system-history-2026-11-02.md#additional-component-inventory-currently-present-in-the-repo).

## Home Route Behavior

[Historical section](current-system-history-2026-11-02.md#home-route-behavior).

### Chat-first grounding corpus

[Historical section](current-system-history-2026-11-02.md#chat-first-grounding-corpus).

### Accepted first functional architecture — Backend Slice 1 implemented

[Historical section](current-system-history-2026-11-02.md#accepted-first-functional-architecture--backend-slice-1-implemented).

## Assets And Media

[Historical section](current-system-history-2026-11-02.md#assets-and-media).

## Environment Assumptions

[Historical section](current-system-history-2026-11-02.md#environment-assumptions).

## System Boundaries

[Historical section](current-system-history-2026-11-02.md#system-boundaries).
