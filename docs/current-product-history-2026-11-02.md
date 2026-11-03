# Current Product

Owner: PRODUCT. Reconciled 2026-10-30 under [PORT-3](https://app.notion.com/p/3e5fe5f58cf58168a598cacef91f1b12). This is a concise map of implemented visitor behavior, not a task queue or a new design brief. [Current State](current-state.md) records accepted direction/evidence; [Current System](current-system.md) names source owners and exact published/local boundaries. Notion owns current executors and next actions.

## Public Website

- The public portfolio is [cheremisin.co.uk](https://www.cheremisin.co.uk/). Its isolated published packet is not the dirty development checkout. Exact deployment identity and rollback evidence live in [Published Production Boundary](current-system.md#published-production-boundary).
- Home opens with Ivan's surf photograph, 40% image-only toning, his name, `Product designer | Product builder | Film director`, a short introduction and canonical Email/LinkedIn/GitHub contacts. Ordinary scroll transitions into the compact header and editorial content.
- Work Experience includes company/role, period and summary; Projects Done preserves five project records and company attribution. Home project titles show `In Progress` instead of opening unfinished cases. Personal and All Projects/Manifesto utility links are temporarily unmounted from home, not deleted from the repository.
- The eye loading/readiness sequence and decorative circular text reuse the accepted home implementation. The later visible-but-unfocused rotation correction is not yet published; do not describe its local/staged proof as live acceptance.
- Only home is admitted for indexing; the sitemap lists home. Hidden authored pages are not promoted as newly finished or newly published through this temporary-home release. Search ranking/removal is not guaranteed by metadata.

## Working Website Sources

- The active source home is `src/app/page.tsx` → `layout/HomePage.tsx`; it renders the photographic opening, career list, pending project titles and Contact footer. It does not mount portfolio conversation surfaces.
- One shared Header supplies contextual title, canonical contacts and native-history Back with a home fallback. On home/Manifesto, mobile Contact is available through the floating dock and opens the shared fullscreen ContactSheet; other authored routes retain their header trigger.
- Home/Manifesto use the shared 12-column desktop / 2-column mobile grid recipe and optional animated overlay. The same tokens determine content geometry and overlay; the feature is not mounted on project routes.
- RepeatReveal supplies repeatable viewport entry/exit. Reduced-motion, no-JS and failure readability are retained; actual device/engine coverage is bounded by the named accepted evidence, not implied universally.
- `/projects` is a server-rendered authored project index with real case links. `/manifesto` renders the authored introduction, four groups/21 statements, decorative arrows and Contact footer.
- Five authored case routes remain: `taxi-aggregator-support-workspace`, `ds-hito`, `litres`, `peruse`, `wrike`. They preserve narratives, media, theme variants and shared gallery/lightbox behavior. Their existence is not publication-readiness or a historical-impact claim.
- These working-source improvements are not evidence that the public isolated release contains every current route/component revision.

## Accepted Local Citymobil Demo

The current common review URL is [local Citymobil](http://127.0.0.1:3140/preview/citymobil). Its earlier frozen `pt3NyoTtrQfnNQsr6DwAz` snapshot is no longer available; the restarted server uses current-source DEVELOPMENT, as recorded in [Runtime recovery](current-system.md#published-production-boundary). [Bounded earlier acceptance and exact source/runtime evidence](design/citymobil-case-study-proposal.md#product-journey-map-acceptance-and-local-handoff--2026-10-30) support the behavior summary below, not fresh functional QA of this recovery. This is not the public case page.

- A complete Lost item walkthrough supports prepared operator replies, three same-fact tones, delayed participant typing/replies, trip selection, Message, recipient switching, a simulated call, consented Connect, follow-up and completion/restart.
- A selected right Order remains through Message, recipient/mode changes and calls; desktop chat uses the remaining lane. The phone appears beneath the composer within that chat lane. An eligible prepared answer is visible immediately on empty-field focus; Tab accepts it and Send remains separate.
- Native Citymobil Light/Dark presentation, Details/Payment/History, Info/Scripts and the derived Lost checklist reuse the existing demo owners. Scenario tabs expose additional fixtures, not proof that Pickup/Income have the same completed guided-story acceptance as Lost.
- Track uses real MapLibre/OpenFreeMap streets with prepared Lisbon coordinates/times, phase-colored actual/planned paths, a separate alternative and red congestion independent of path kind. One shared clock coordinates driver/rider positions. These are fictional historical/context fixtures, not live GPS, traffic or routing.
- Provider attribution and existing failure/Retry paths are preserved. Native document-hidden verification remains explicitly deferred; accepted reduced/offscreen checks do not substitute for it. Full Global QA/public release is not claimed.
- Calls, contacts, conversations, payments, promo codes and completion are client-local simulation: no real service transaction, durable support record or production operation occurs.

## Retired Portfolio Chat Presentation

PORT-31,2026-11-01: the old portfolio AI conversation UI/provider, in-tab branches/origin restoration, client SSE parser and terminal-only presentation experiments have been removed from current source. BACKEND also removed the registered `/api/portfolio-chat` route, server generation/retrieval/validation/projection code, obsolete chat contracts/tests and exclusive OpenAI dependency. `PortfolioProjectId` remains for active ProjectPageShell. The active homepage, project pages and Citymobil demo including its simulated chat are preserved. The integrated isolated build/types and owner GET/POST404 checks passed; independent browser acceptance remains required. No production retirement/publication claim follows from local proof. Production PORT-30 remains on hold. Historical Chat-First specifications and Markdown facts/provenance remain historical content, with exact removed-source snapshots under `test-results/port31-cleanup/`.

Markdown remains the readable source for facts and provenance. `site-content.ts`, `projects.ts` and route-local authored narratives still supply current presentation; no automatic migration from raw stories or generated summaries to published truth has occurred. There is no authenticated admin, database/CMS or durable chat-history product in this implementation.
