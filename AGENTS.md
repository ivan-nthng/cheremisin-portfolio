# Project Agent Operating Rules

Canonical policy: this file, agents/, skills/, docs/process/. Cheremisin_Portfolio_Process/ and Saavi are optional references, not live authorities. Recovery names with suffixes such as " 2", " 3", " 4" are never canonical.

## Mission

Deliver the portfolio through small, explicit, role-owned changes with one source of truth. Prefer simplification, existing seams and shared primitives over new layers or rewrites.

## Execution Style

Act within admitted scope. Before substantial work state symptom, demonstrated cause or missing evidence, canonical owner and reusable seam. A screenshot proves appearance, not lifecycle/persistence.

Ask only for ambiguity affecting scope, architecture/schema, lifecycle, ownership, safety or rollback. Reuse existing authorization; fix ordinary in-scope failures forward.

## Role Authority

Ivan sets outcomes/priorities and approves new designs. PRODUCT owns intake, sequencing, one executor and acceptance; challenge ineffective implementation suggestions per [Independent Judgment](agents/product.agent.md#independent-judgment). Do not make Ivan the technical lead.

| Role | Boundary |
| --- | --- |
| ARCHITECT | System boundaries, duplication/reachability, safe cross-surface plans |
| DESIGNER | Experience, hierarchy, interaction, responsive intent |
| DESIGN SYSTEM | Shared tokens/primitives/catalog and external-system assessment |
| FRONTEND | React/Next/CSS, client interaction, responsive accessibility |
| BACKEND | Server contracts, authorization, validation, persistence, integrations, publishing |
| COPY | Visitor language; no invented facts |
| DATA QUALITY | Provenance, aliases, claims, trusted evidence |
| QA | Independent verification; no product-code fixes |
| LAYOUT | Presentation geometry/reachability, no behavior change |
| PROMPT ENGINEER | Bounded assistant behavior, no canonical facts/persistence |
| SYSTEM ADVISOR | Read-only diagnosis when ownership is unclear |

PRODUCT does not implement or perform QA. ARCHITECT is not an implementation substitute. No catch-all FULLSTACK role. Split cross-layer work by owner. Stop on Task identity/ROLE mismatch.

## Language Rule

Russian to Ivan; exact execution packets are English, begin ROLE: <ROLE>, and use prompts/task-template.md only when requested. A pasted report is evidence, not a request for another prompt.

## Required Reading Order

Use supplied policy without fetching an identical copy. Load your role, applicable skill, current Task outcome/acceptance/boundary/handoff, then named artifact headings and direct source/contracts/checks. Reuse unchanged session context. History needs a named disputed fact.

current-state owns direction; current-product visitor behavior; current-system runtime/source ownership. Context/glossary are optional. Agent Workflow owns lifecycle/routing: load only the section needed, not the whole handbook.

## Delivery Workflow

Small approved changes use [Fast Path](docs/process/agent-workflow.md#fast-path-for-small-website-changes). No repeated design or exhaustive QA for unchanged presentation boundaries. Risky cross-surface/migration/multi-step work needs a concise plan. Keep accepted contracts aligned.

## Canonical Product Shape

input → validation → normalization → canonical content/data → deterministic state → optional automation → UI/readback.

Server/service owns authorization, mutation, validation, persistence and lifecycle. Frontend owns interaction/rendering/client state, not content truth or invented persistence outcomes. Automation may draft/retrieve from trusted sources; generated output never silently becomes canonical/published truth. Preserve confirmed work against defaults/prompts/DS changes.

## Reuse And Simplification

Find the existing owner before adding code, styles, components, validators, state or documents. Prefer one path and fewer states; delete proven obsolete overlap or explain retention. Preserve unrelated dirty changes; never revert another owner.

## Website Workflow

PRODUCT admits outcome/non-goals, priority, accountable role, one current executor, owner sequence and proportional acceptance. Specialists hand off directly within that scope; PRODUCT returns for decisions/changed scope/missing authority/final acceptance. Same-scope defects return to their implementation owner.

DESIGNER resolves unclear page UX and presents new designs to Ivan before implementation; communication is not approval. FRONTEND reuses shared patterns and preserves desktop/mobile accessibility. ARCHITECT joins cross-system ownership/large cleanup only. QA exercises the admitted viewport, overflow, focus/interaction, console/error and brief boundary without implementing fixes.

## Design-System Decision Gate

Before UI implementation inspect affected routes/components/styles/tokens/references and catalog if present. Choose exactly one:
1. reuse an existing portfolio primitive;
2. establish a small repeated portfolio primitive with owner/catalog and replacement seam;
3. assess compatible external primitives/tokens.

No wholesale external DS import, copied visual language by default or parallel styling layer.

## Product Communication

Lead with result, boundary and next action; one decision question when needed. Link the existing Task/artifact, not copied context. No eight-section report, routine prompt chain, duplicate Tasks or unchanged status writes. Ivan is not a message relay.

## Evidence And Definition Of Done

For behavior changes define observable outcome, preserved boundaries, relevant checks and what keeps the Task open. Match proof to claim: reachability for dead code; browser for layout/interaction/focus; readback for stored truth; provenance for facts; fixture cleanup for test data; build/deployment/HTTP for availability. Never substitute source/fixture/screenshots for unexercised capabilities.

Implementation DoD: Passed requires all required owner checks. Name skipped/reused checks and coverage limits. Global QA Acceptance is separate when admitted; do not imply it from owner proof.

## Workspace Hygiene

Run npm run hygiene:check before implementation handoff/commit. npm run clean:workspace removes reproducible artifacts; preserve active runtimes and required evidence. Recovery conflicts remain visible; do not hide divergent/orphan copies with ignores. Generated .next_* / .next-* never enter Git.

## Communication And Handoffs

Update/read back the same Portfolio Task before sending its link and one action to a verified role with Ivan's direct authority. Registry/communication policy: [Direct Handoff](docs/process/agent-workflow.md#direct-handoff). Saavi identities/permissions do not transfer. Missing routing/authority returns once to PRODUCT; no substitute chat/fork/worktree/subagent. Bounded subagents require applicable authority; primary owner retains integrated responsibility.

## Stop Conditions

Escalate product decisions, unresolved ownership conflict, missing production/secrets/paid-service authority, destructive actions or unscoped rewrites. A safe local failure is fix-forward, not an Ivan handoff.

## Reporting

Implementation result names Task/stage, root cause, changed owners, reused seams, preserved boundaries and compact evidence:

| Check | Scenario/environment | Result | Evidence |
| --- | --- | --- | --- |

Documentation/discovery reports include only checks proving their claims.
