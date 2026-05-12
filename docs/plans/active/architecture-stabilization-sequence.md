# Architecture Stabilization Sequence

## Objective

Stabilize the implemented portfolio so it has a trustworthy build contract, clear content ownership, and one active shell foundation before any visual unification or broad QA pass.

## Why This Plan Exists

- The implemented app is already substantial enough that multi-step work needs sequencing.
- Current failures are not only visual inconsistencies; the app currently fails build and lint validation.
- Shared UI, route ownership, and content ownership are mixed together, so changing style first would increase regression risk.

## Confirmed Baseline

- Runtime shape: single Next.js App Router frontend
- Product shape: home page, manifesto, and five project case-study routes
- Confirmed blockers:
  - build fails on unresolved imports
  - config includes an invalid Next.js option
  - several referenced media files are absent from `public/`
  - content ownership is coupled to presentational components

## Sequence

### Step 1. Restore the runtime contract

Owner: `FRONTEND`

- Reconcile imported packages with `package.json`.
- Remove or replace invalid Next.js config keys.
- Audit route media references against `public/` and either restore missing assets or update references to real files.
- Re-run build until it passes.

Exit criteria:

- `npm run build` passes
- route-level media references resolve
- dependency and config contract matches source usage

### Step 2. Separate project content from project presentation

Owner: `FRONTEND`

- Extract the canonical `Project` type and `projects` data out of `src/components/Projects.tsx`.
- Keep the listing UI consuming the shared data module.
- Update project detail routes and project navigation to consume the shared data module directly.

Exit criteria:

- project content has one canonical source
- route pages no longer import shared content from a presentational component

### Step 3. Consolidate active shell ownership

Owner: `FRONTEND`

- Decide which home-shell component family is canonical.
- Remove or quarantine overlapping shell components that are not on the runtime path.
- Align home-route section IDs, navigation ownership, and route metadata ownership with the chosen active shell.

Exit criteria:

- one canonical header/shell path for the home experience
- no ambiguous duplicate shell ownership
- route metadata ownership is explicit

### Step 4. Reduce unnecessary client surface

Owner: `FRONTEND`

- Keep interactive islands client-side.
- Convert route shells and static composition layers to server components where no client-only behavior is required.
- Preserve behavior while shrinking hydration scope.

Exit criteria:

- client rendering is limited to interactive components
- route shells are simpler and easier to reason about

### Step 5. Establish the visual foundation

Owner: `FRONTEND`

- Inventory the typography, spacing, color, and card patterns that are already in active runtime use.
- Choose one canonical visual direction from the active runtime surface instead of mixing inactive component families.
- Apply unification only after Steps 1 through 4 are complete.
- Implement against `docs/plans/active/ascii-visual-foundation.md` as the canonical Step 5 visual spec.

Exit criteria:

- one active visual language baseline
- home, manifesto, and project routes inherit the same ASCII-first system
- real media is framed consistently inside the new shell
- future project additions fit the same layout grammar without bespoke redesign
- style work is applied on top of stable system boundaries

### Step 6. Run QA after stabilization and visual unification

Owner: `QA`

- Validate all routes, theme modes, navigation flows, and project media.
- Verify there are no broken anchors, missing assets, hydration issues, or route regressions.
- Confirm build and lint expectations for the intended quality bar.

Exit criteria:

- route set is navigable end-to-end
- regression hotspots are checked after the visual pass rather than before it

## Guardrails

- Do not start with a visual redesign.
- Do not split into services or introduce a CMS.
- Do not rewrite case-study pages broadly while the runtime contract is still failing.
- Prefer extraction and consolidation over net-new abstractions.

## Next Recommended Role

`FRONTEND`

## Suggested Next Step

Run Step 6 QA across the active route set now that the shared ASCII dossier foundation is implemented.
