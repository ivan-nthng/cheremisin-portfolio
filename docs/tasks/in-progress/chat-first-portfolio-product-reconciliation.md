# Chat-First Portfolio Product Reconciliation

## Status

Backend Slice 1 complete; Product reconciliation pending

## Date

2026-07-23

## Root Cause

The obsolete product model is the page-first presentation hierarchy reinforced by ASCII, terminal, dossier, and case-file conventions. The portfolio corpus, stable project routes, authored narratives, and evidence assets are not the problem and must remain available.

## Accepted Functional UX

Product accepts the nine-step functional UX specification in:

- `docs/design/chat-first-portfolio-step-1-removal-retention-inventory.md`
- `docs/design/chat-first-portfolio-step-2-information-architecture.md`
- `docs/design/chat-first-portfolio-step-3-initial-discovery-hierarchy.md`
- `docs/design/chat-first-portfolio-step-4-conversation-states.md`
- `docs/design/chat-first-portfolio-step-5-answer-project-evidence-hierarchy.md`
- `docs/design/chat-first-portfolio-step-6-project-view-scoped-conversation.md`
- `docs/design/chat-first-portfolio-step-7-navigation-history-sharing.md`
- `docs/design/chat-first-portfolio-step-8-accessibility-responsive.md`
- `docs/design/chat-first-portfolio-step-9-implementation-boundary.md`

The accepted first-slice product model is:

- chat is the primary discovery action;
- traditional browsing remains independently available;
- `/projects` is the intended Project Index destination;
- direct project routes continue to open authored project narratives;
- project-scoped conversation is included and remains explicitly subordinate to the authored project;
- existing stable project URLs remain the supported shareable unit;
- theme-aware media behavior is preserved until a later visual/design-system decision;
- all five project routes remain preserved and browsable, while featured/recent and answer-surfacing eligibility remain evidence-gated.

## Deferred From The First Slice

The first slice does not include:

- anonymous conversation history;
- answer or conversation sharing;
- true request cancellation;
- project comparison.

These capabilities may return only after Product and Architecture accept their lifecycle and Data Quality confirms their content requirements.

## Canonical Grounding Decision

The user's current direction supersedes the earlier typed-row-only placement:

- canonical answer grounding must live in reviewable Markdown files;
- OpenAI output is generated synthesis and never canonical truth;
- route files remain authored presentation and migration sources, not the future retrieval source of truth;
- public media remains canonical asset storage;
- every reusable fact and evidence relationship requires a status and source provenance;
- unreviewed screenshots, route metadata, technology tags, aliases, and metrics do not become trusted merely because they exist.

The exact runtime adapter over Markdown remains an Architecture decision.

## Preservation Boundary

No current route, narrative, project fact, contact destination, screenshot, video, theme variant, or unrelated worktree change is authorized for deletion in this phase. Removing retired presentation from the future active path is separate from deleting source files.

## Immediate Owner

`PRODUCT`

Architecture completed the first functional implementation contract in:

- [`docs/plans/active/chat-first-portfolio-first-functional-implementation.md`](../../plans/active/chat-first-portfolio-first-functional-implementation.md)

Backend completed Slice 1: canonical Markdown compilation, deterministic scope filtering, evidence resolution, the Responses API boundary, server-side grounding validation, SSE lifecycle, and isolated tests.

## Data Quality Reconciliation

Accepted on 2026-07-23:

- `content/portfolio/` is the canonical reviewable grounding corpus;
- `Product designer` is the canonical public role; `engineer` is not an approved title;
- all five stable project routes remain browseable;
- Taxi Aggregator Support Workspace is the only initial featured candidate and must not be labeled `recent`;
- no project receives a `recent` label until a trusted date and recency rule exist;
- all current metrics, team-composition claims, production-status claims, and technology-derived capability assumptions are excluded from affirmative answers;
- Peruse and Peruse.ml are one project identity;
- VK, CityMobile, and CityMobil remain search aliases for the Taxi project, but their exact company/legal relationship must not be asserted;
- Peruse media and DS Hito media are not answer-ready;
- qualified Taxi, Litres, and Wrike media may be shown only as contextual interface evidence, never as proof of outcomes;
- the CityMobile interactive preview is demonstration content and never a factual source.

Canonical audit:

- [`docs/data-quality/chat-first-portfolio-corpus-audit.md`](../../data-quality/chat-first-portfolio-corpus-audit.md)

Architecture may proceed using the safe fallbacks above. Missing publication-quality evidence is not a blocker for the first functional slice.

## Downstream Sequence

1. Data Quality: canonical Markdown corpus and evidence audit. Complete.
2. Product: reconcile material content conflicts and publication decisions. Complete.
3. Architecture: retrieval, OpenAI grounding, branch, and route contract. Complete.
4. Backend: implement the server-only corpus, retrieval, grounding, and API foundation. Complete.
5. Designer/Design System: visual language and shared-primitive decision gate.
6. Frontend: `/projects`, discovery/chat, scoped conversation, and presentation migration.
7. QA: independent functional, responsive, accessibility, evidence, and runtime validation.
