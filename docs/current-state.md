# Current State

## Status

Active, stable enough for content work, but not publication-ready

## Last Updated

2026-05-11

## Where We Are Now

- The implemented product is a single Next.js portfolio app with:
  - one home route
  - one manifesto route
  - five project case-study routes
- The repo contains a meaningful shared component library for project storytelling, but the runtime surface is uneven:
  - the home route now uses one explicit active shell path through `src/components/layout/HomePage.tsx`
  - the older home-shell family has been quarantined under `src/components/legacy-home/`
  - shared project content now lives in a dedicated non-presentational module consumed by both routes and listing UI
  - the active runtime now uses shared ASCII dossier primitives for shell, section, pager, and media framing
- The system is architecturally still a modular monolith, but responsibility boundaries are blurry in a few important places:
  - metadata ownership is still inconsistent across some non-home routes
  - some route-local content and metadata still live inline in project pages

## Confirmed Current Behavior

- The root layout mounts a global theme provider and a layout-specific header.
- The home route uses `src/app/page.tsx` plus `src/components/layout/HomePage.tsx` as its canonical shell path.
- Home navigation and CTA scrolling share one section-id contract for `projects`, `about`, and `contact`.
- The home shell now also exposes direct internal route actions for `readme` and project case files instead of only section jumps.
- The home route shell now renders on the server, with small client islands for header motion and CTA scrolling.
- The manifesto and project routes now use server route entries with client shells only where grid toggling, motion, tabs, or theme-aware media require it.
- Project and manifesto pages mount a separate project-oriented header.
- Project detail routes use a shared project array from `src/lib/projects.ts` to drive navigation context.
- The `Projects` listing component consumes the same shared project contract without owning it.
- Case-study pages inline most of their own narrative content and media mappings.
- Home, manifesto, and project routes now share one ASCII-first framing system with reusable route bars, frames, media viewports, and pager patterns.
- Project pager traversal now supports arrow-key navigation while keeping client-only behavior scoped to the pager island.

## Confirmed Structural Problems

- `npm run lint` still fails with a large set of correctness and hygiene issues, including:
  - unresolved JSX escaping errors
  - unused imports and dead state
  - explicit `any` usage
  - stale ref cleanup warnings
- Route metadata ownership is still inconsistent across some project routes.
- `npm run lint` still fails after the stabilization and visual pass, so repo-wide cleanup remains deferred.

## Architectural Risk

- Media references are hard-coded across route files, so asset drift is easy to introduce and hard to validate manually.
- Some shared storytelling components are still client-rendered because they own animation, theme, or tab behavior, so hydration scope can be reduced further only with more targeted component-level simplification.
- Route metadata ownership is still only partially normalized even though the active shell and visual language are now explicit.

## What Is Stable

- The route map and overall product intent are clear.
- The repo already has reusable building blocks for case-study pages.
- Theme-aware media conventions are consistent enough to preserve during stabilization.

## What Is Active

- Architectural mapping is complete enough to guide a safe stabilization stream.
- Canonical docs are being backfilled from implemented code instead of template placeholders.
- The runtime contract is stabilized enough to continue with boundary cleanup work.
- Shared project content now has one canonical non-presentational source.
- The home shell now has one explicit active runtime path and the older shell family is quarantined.
- Route shells are now server-first wherever client-only behavior was not required.
- The canonical ASCII-first visual foundation for Step 5 is now defined in `docs/plans/active/ascii-visual-foundation.md`.
- Step 5 is now implemented on the active runtime path using one ASCII dossier visual grammar.
- The active ASCII system has now been softened into a calmer document language with a home signal animation, lighter framing, and cleaner media presentation.
- Active media surfaces now degrade to a shared ASCII fallback state instead of rendering broken previews when an asset is missing at runtime.
- QA re-check passed for hard loads, active home navigation, manifesto/project traversal, and arrow-key pager behavior on the built runtime.
- No fresh React `#418`, React `#300`, hydration mismatch, or hook-order errors were reproduced during the latest QA re-check.

## What Is Next

- The next workstream is content quality, not another runtime repair pass.
- Priority one is to bring the weakest published project narratives up to a publication-ready baseline.
- Home and manifesto polish should follow only after every live project link opens to a credible case-study narrative.

## Working Plans Now

- `docs/plans/active/architecture-stabilization-sequence.md`
- `docs/plans/active/ascii-visual-foundation.md`
- `docs/plans/active/case-study-publication-slice.md`
- Recommended next role after PRODUCT: `COPY`
