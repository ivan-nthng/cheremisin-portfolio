# Case-Study Publication Slice

## Objective

Make the currently published project links feel trustworthy enough for portfolio publication without reopening architecture, routing, or visual-system work.

## Problem Statement

The active shell is now stable enough to publish, but the content depth behind the live project links is uneven.

- `/projects/taxi-aggregator-support-workspace` already reads like a real case study with problem framing, outcomes, and supporting evidence.
- `/projects/ds-hito` is concise, but coherent enough to support publication.
- `/projects/litres` tells a usable story, but still exposes placeholder notes and a weak development tab.
- `/projects/peruse` still contains explicit TODO markers and generic filler across process, gallery, and development content.
- `/projects/wrike` is the most visible credibility gap because it currently stops at the hero and pager.

As a result, the home page promises a level of project depth that the weakest linked routes do not yet deliver.

## Why This Slice First

- It closes the biggest trust gap in the current portfolio.
- It improves publication readiness without changing the architecture or visual direction.
- It keeps scope bounded to content quality on already-live routes.

## In Scope

Owner: `COPY`

1. Write a publication-ready first narrative for `Wrike`.
2. Replace placeholder and generic narrative copy in `Peruse`.
3. Remove or replace visibly placeholder copy in the `Litres` development tab.
4. Adjust only the related home project summaries if the new narratives make the current one-line descriptions misleading.

## Acceptance Criteria

1. `Wrike` has a complete baseline case-study narrative:
   - clear product context
   - problem statement
   - what changed
   - outcome or proof
   - closing CTA/supporting wrap-up
2. `Peruse` no longer contains TODO markers or obviously generic filler in the live route content.
3. `Litres` no longer exposes placeholder language such as future-facing development filler on the live route.
4. The home page does not over-promise relative to these three routes.
5. No route architecture, layout grammar, or interaction model is changed as part of this slice.

## Non-Goals

- No redesign of the home page, manifesto, or project shell.
- No metadata normalization, lint cleanup, or runtime repair follow-up.
- No new projects added to the index.
- No project reordering pass beyond keeping incomplete stories from being promoted.
- No expansion into a full long-form rewrite of already-credible projects like Taxi or DS Hito.

## Tradeoffs

- This slice prioritizes credibility over completeness.
- Some pages may remain shorter than ideal after this pass, but they must stop feeling unfinished.
- Home and manifesto polish waits until every live project link clears a basic publication bar.

## Recommended Current Order

Keep the current home ordering for now.

- Taxi Aggregator Support Workspace
- DS Hito Design System
- Litres Internal Tools
- Peruse
- Wrike

Do not spend this slice on ranking debates unless the rewritten case studies materially change the perceived strength of the bottom two projects.

## Next Recommended Role

`COPY`

## Execution Prompt For Next Role

Write the smallest publication-ready content pass that makes all currently linked project pages feel intentional.

Focus only on:

1. `Wrike`: create a real baseline case-study narrative from the existing hero-only route.
2. `Peruse`: replace TODO-driven or generic copy with authored case-study text.
3. `Litres`: remove placeholder development-tab language and replace it with concise real copy or intentionally scoped omissions.
4. `src/lib/projects.ts`: update only the one-line summaries if the rewritten route stories require it.

Do not:

- reopen visual-system work
- change layout structure
- start a manifesto rewrite
- add new projects
- broaden the pass into a portfolio-wide tone rewrite
