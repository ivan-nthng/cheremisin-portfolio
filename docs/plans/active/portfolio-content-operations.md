# Portfolio Content Operations

## Status

Content intake proposal retained; runtime/chat follow-through superseded by [Accepted Direction](../../current-state.md#accepted-direction). The live task-delivery contract is [Agent Workflow](../../process/agent-workflow.md); this content plan is not a second lifecycle writer.

## Owner

- Product owns scope, priority, acceptance, and the boundary between Notion and Markdown.
- Data Quality owns source-story intake, claim extraction, provenance, aliases, and evidence readiness.
- Copy may improve accepted visitor-facing language but must not invent or promote facts.
- Architecture and Frontend become owners only when accepted Markdown must change runtime behavior.

## Root-Cause Framing

### Visible problem

Portfolio work, plans, source stories, project facts, and evidence decisions are difficult to navigate as one coherent system.

### Demonstrated cause

The repository already contains a canonical Markdown corpus and substantial implementation documentation, but:

- the documentation entry point is still a generic template;
- current-state documents contain stale and conflicting presentation statements;
- raw experience stories lacked a defined Markdown intake template; PORT-4 now supplies the bounded contract below;
- company, project, contribution, and evidence relationships are not yet convenient to review as a human-readable narrative;
- Notion has only the initial operating-system records and does not yet index the canonical document set.

### Canonical owner

- Notion owns navigation, task lifecycle, planning history, short summaries, and links.
- Repository Markdown owns durable, readable product truth, plans, decisions, source stories, and the reviewed portfolio corpus.
- `public/*` owns media bytes; the evidence manifest owns their answer eligibility.
- Generated assistant output is never canonical until reviewed and written into Markdown by the responsible owner.

### Existing seam to reuse

- `docs/README.md` as the human documentation entry point;
- `docs/current-*.md` for implemented state;
- `docs/plans/active/*` for accepted or proposed execution plans;
- `content/portfolio/README.md` as the grounding-corpus entry point;
- `content/portfolio/projects/*` for reviewed project truth;
- `content/portfolio/evidence-manifest.md` for evidence status;
- Portfolio Tasks, Epics, and Library in Notion as the navigation and lifecycle layer.

## Operating Contract

### Notion stores

- Epic outcomes and acceptance conditions;
- task status, owner, priority, phase, dependencies, and next action;
- Library metadata: title, type, status, summary, owner, repository path, repository URL, related Epic, and related tasks;
- a short change note when the canonical Markdown document materially changes.

### Notion does not store

- a second full copy of canonical plans or project narratives;
- authoritative portfolio claims that do not exist in reviewed Markdown;
- generated summaries presented as accepted truth;
- asset eligibility rules independent from the evidence manifest;
- route or runtime truth independent from current-system documentation and code.

### Markdown stores

- full plans, briefs, decisions, and system documentation;
- raw source stories and interview transcripts intended for later review;
- extracted claims with provenance and review status;
- company and project narratives;
- contribution and capability statements;
- evidence descriptions, limitations, and claim boundaries;
- the accepted content consumed by the portfolio retrieval layer.

## Human Reading Path

1. Start with `docs/README.md`.
2. Read `docs/current-state.md`, `docs/current-product.md`, and `docs/current-system.md` for implemented truth.
3. Read this plan for content operations.
4. Read `content/portfolio/README.md` for trust rules and corpus navigation.
5. Read a project file under `content/portfolio/projects/` for reviewed project truth.
6. Read `content/portfolio/evidence-manifest.md` when a claim depends on screenshots or video.
7. Use Notion to find the relevant document, see its lifecycle, and navigate to the Markdown source.

## Proposed Markdown Content Model

The following additions require Data Quality acceptance before population:

- `content/portfolio/sources/` — raw long-form stories and interview transcripts; use the [source-story template](../../../content/portfolio/sources/_template.md) and PORT-4 contract below; excluded from publication and affirmative runtime retrieval;
- `content/portfolio/companies/` — reviewed company identity, period, relationship, aliases, and associated projects;
- existing `content/portfolio/projects/` — reviewed project identity, problem, contribution, outcome, limitations, and claim IDs;
- existing `content/portfolio/evidence-manifest.md` — media identity, readiness, supported claim, limitation, and canonical path.

Raw sources and draft extracted claims must not be added to the runtime allowlist merely because they are Markdown.

## Source-Story Intake — PORT-4

Established 2026-10-30 for the non-chat portfolio. DATA QUALITY owns the intake contract; PRODUCT owns acceptance and any later promotion. This does not capture Ivan’s first story or start PORT-5, normalize company records, or authorize runtime migration.

Use [the blank template](../../../content/portfolio/sources/_template.md) for an admitted capture at `content/portfolio/sources/YYYY-MM-DD-short-topic.md`; use capture date in the filename, not an inferred employment/project date. Check for an existing source before creating another. Keep the original source locator, author, capture method/date, date precision, language and review state. Unknown values stay unknown. These are readable document labels, not new compiler schema fields or Task lifecycle states.

Paste supplied text verbatim only under Verbatim Source. Preserve uncertainty and original language; place corrections, translation, extraction and conflicts in separate review notes or link a separately admitted review artifact. Mark machine transcripts as such; an unverified transcript is not exact original wording. Preserve the external original/master; later corrections are attributed annotations, never silent replacement. Do not invent a demonstration story to populate the template.

Before storage, check permission and sensitivity. Do not copy secrets, salary, signatures, private contract terms or unrelated personal material into the repository. If a source cannot be retained verbatim safely, keep the original in its permitted location and record a locator plus the excluded range/reason; label any permitted excerpt as an excerpt, never a complete transcript. Repository storage is not a privacy/access-control mechanism.

Raw source and review notes remain **Unreviewed / Excluded** for public copy and runtime. Reuse the existing trust vocabulary in [the corpus README](../../../content/portfolio/README.md#trust-rule) for individual reviewed propositions; these labels do not grant publication. Screenshots, demo fixtures, editorial imagery and measured outcomes retain their distinct evidence boundaries. An accepted claim must retain an exact source anchor, qualification and review decision in its existing canonical owner; COPY may edit wording only after fact review. Later promotion requires a separate admitted Task boundary and PRODUCT acceptance, not moving raw files onto an allowlist.

### Exclusion Proof And Focused Validation

Source inspection on 2026-10-30: `src/lib/portfolio/server/corpus.ts` → `PORTFOLIO_CORPUS_ALLOWLIST` names nine individual reviewed Markdown files; `compilePortfolioCorpus` reads only that array with `readFileSync`. Neither `sources/` nor this plan/template is listed. The project projection in `src/lib/portfolio/server/projects.ts` consumes `getPortfolioCorpus`, so it inherits that boundary. Focused search of application/source consumers found no directory-wide raw-story reader. The current website is non-chat; retained retrieval code is not an instruction to restore chat. The corpus README’s old “does not consume” status is historical, not the exclusion proof.

| Check | Result / boundary |
| --- | --- |
| Template structure | Metadata, untouched-source area, separate review/conflict notes and reviewed destinations are present; no authored story or accepted claim supplied. |
| Runtime/publication exclusion | Exact nine-file allowlist excludes sources and docs; no raw-source import or directory scan found in application consumers. Publication requires explicit reviewed extraction; filenames/review labels alone grant nothing. |
| Preservation | Only template and this existing plan changed in PORT-4; public content, runtime/compiler/schema, media, external sources and Task model unchanged. |

This is source-inspection proof of the existing boundary, not a runtime/browser or deployment test. No code changed; no application build or exhaustive corpus audit is needed. Recheck exclusion before any later loader/allowlist change. Rollback removes only this task’s template/plan delta after checking consumers; preserve unrelated work. PRODUCT receives this intake mechanism for acceptance; actual narrative capture remains separately admitted work.

## Content Intake Flow

`long-form story -> source-story Markdown -> atomic claim extraction -> company/project mapping -> provenance and contradiction review -> evidence mapping -> Product acceptance -> canonical project/company Markdown -> optional runtime allowlist change`

For every extracted claim record:

- preserve the original wording or source location;
- assign one company when known;
- assign one or more projects only when demonstrated;
- assign a period only when explicitly supplied;
- classify the contribution or capability without inferring seniority;
- link evidence only when it supports the stated claim;
- record uncertainty rather than resolving it by guesswork;
- keep unpublished, contradicted, or unsupported claims outside affirmative answers.

## Implementation Sequence

### Phase 1 — Documentation reconciliation

1. Replace the generic docs index with a portfolio-specific reading map.
2. Reconcile `current-state.md`, `current-product.md`, and `current-system.md` with implemented Chat-First behavior and the retired ASCII direction.
3. Mark obsolete active plans as superseded or completed instead of leaving contradictory plans active.

### Phase 2 — Notion Library index

1. Create one Library record per high-value canonical Markdown document.
2. Store only the summary, status, owner, repository path, and repository link in Notion.
3. Link each Library record to the Epic and tasks that change it.

### Phase 3 — Experience intake

1. Capture Ivan's first long-form experience story without rewriting it.
2. Store the full source as Markdown and index it in Notion as `Source story / Draft`.
3. Extract atomic claims into a review document without promoting them to canonical project truth.

### Phase 4 — Company and project normalization

1. Define canonical company identities and explicit aliases.
2. Map accepted claims to companies and projects.
3. Resolve or preserve uncertainty for VK, CityMobile, and CityMobil.
4. Review all five existing project files for missing context and contradictions.

### Phase 5 — Evidence and publication readiness

1. Map accepted claims to evidence identities.
2. Repair or replace invalid Peruse and DS Hito media.
3. Add reviewed captions, alt text, dates, and claim boundaries.
4. Keep unsupported metrics and outcome claims excluded until provenance exists.

### Phase 6 — Runtime and presentation follow-through

1. Convert `src/lib/projects.ts` into a compatibility projection over trusted Markdown when Architecture accepts the migration.
2. Do not continue Chat-First delivery or make chat QA a prerequisite after Ivan's withdrawal of that direction.
3. Admit the non-chat visual brief and proportional content/navigation boundaries in Portfolio Notion before replacement implementation; do not turn this historical sequence into an extra approval programme.

## Acceptance Criteria

1. A person can open `docs/README.md` and reach every canonical current-state, plan, corpus, project, and evidence document without searching the repository.
2. Notion Library contains searchable metadata and repository links, not competing document bodies.
3. Every active Notion task links to one Epic and, when applicable, one canonical Markdown document.
4. Raw stories remain readable in Markdown and distinguishable from accepted claims.
5. Each accepted claim can be traced to a source story or authored source and mapped to a company or project.
6. Evidence is not treated as proof beyond the boundary recorded in the evidence manifest.
7. Runtime retrieval continues to use only the explicit reviewed allowlist.

## Non-Goals

- Do not import all repository files into Notion.
- Do not make Notion the runtime CMS.
- Do not duplicate full Markdown documents into Library pages.
- Do not create a database row for every paragraph or sentence.
- Do not solve visual design before content ownership and readability are stable.
- Do not treat generated extraction as accepted portfolio truth.

## Conditions That Keep This Plan Open

- current documentation still contradicts implemented behavior;
- the first source story has not completed review;
- company aliases remain unresolved or undocumented;
- project claims lack provenance or evidence boundaries;
- Notion and Markdown contain competing full-text truth.
