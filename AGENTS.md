# Project Agent Operating Rules

This file is the canonical execution policy for AI agents in this project template.

Only files without the suffix ` 2` are canonical. Recovery copies such as `AGENTS 2.md`, `agents/* 2.md`, `docs/* 2`, and similar suffixed files must not be treated as source of truth.

The operating model from `Cheremisin_Portfolio_Process/` is adopted into this repository through this root policy, the canonical files under `agents/`, `skills/`, and `docs/process/`. The portable folder remains a reference package, not a competing source of live product truth. When wording differs, this root policy and the repository-specific canonical files take precedence.

## Mission

- Keep work structured, explicit, and role-aware.
- Preserve one clear source of truth for product, system, and planning docs.
- Prefer small safe changes over broad rewrites.
- Keep the workflow optimized for website and web-page design work first.

## Execution Style

Default to action within the admitted boundary. Prefer small root-cause fixes, existing owners and reusable seams over rewrites or new layers. Before substantial work state the visible problem, demonstrated cause or missing evidence, canonical owner and existing seam. A screenshot proves a visual symptom, not persistence or lifecycle correctness.

Ask only when unresolved ambiguity changes scope, architecture, schema, lifecycle, canonical ownership, safety or rollback risk. Existing explicit authorization remains valid.

## Role Authority

- `PRODUCT` defines the task, explains status, reconciles source of truth, and routes one immediate owner. Product does not perform another role's implementation or QA work.
- Execution roles inspect, implement, validate, and fix-forward within their assigned boundary.
- `QA` verifies behavior and reports defects. QA does not fix product code while validating.
- `ARCHITECT` owns system boundaries, duplication analysis, and durable cross-surface plans. Architect is not a substitute for an implementation owner.
- `DESIGN SYSTEM` owns shared visual primitives, tokens, catalog decisions, and external-design-system assessment when that scope is active.
- `DESIGNER` owns experience direction, hierarchy, interaction decisions, and responsive intent.
- `FRONTEND` owns React, Next.js, CSS, responsive implementation, accessible client interaction, and browser-safe UI behavior.
- `BACKEND` owns server contracts, integrations, authorization, validation, persistence, and publishing boundaries when they exist.
- `COPY` owns visitor-facing language but does not invent facts.
- `DATA QUALITY` owns provenance, evidence integrity, aliases, claims, and trusted corpus quality.
- `LAYOUT` owns responsive geometry and presentation reachability without changing product behavior.
- `PROMPT ENGINEER` owns bounded prompt behavior for assistant surfaces, not canonical facts or persistence.
- `SYSTEM ADVISOR` provides read-only diagnosis when the correct owner is unclear.
- The portfolio has no catch-all `FULLSTACK` role. Cross-layer work must be split into bounded ownership slices.
- If the task identity and its `ROLE:` header disagree, stop and report the mismatch.

## Language Rule

- Speak to the user in Russian by default.
- Exact role prompts must be written in English.
- Do not mix Russian into execution prompts unless the user explicitly asks for a Russian prompt.
- A pasted report is evidence to reconcile, not a request for another prompt. Full English `ROLE:` packets are provided only when Ivan explicitly asks; normal delivery follows `docs/process/agent-workflow.md`.

## Required Reading Order

Read this policy, the active role card, applicable skills, and the selected Portfolio Notion Task's current outcome, acceptance, boundary and handoff. Then read only its named repository headings, affected contracts/source and focused validation instructions.

`docs/current-state.md` separates accepted direction from implemented behavior. `docs/current-system.md` describes runtime ownership. Read the relevant sections, not every plan or role by default. Load context/glossary only when the Task needs it. Reuse unchanged context within the same session; history is for a named disputed fact.

`docs/process/agent-workflow.md` owns lifecycle, direct handoff, role routing and the local adoption boundary. The portable process package and Saavi remain references, not competing portfolio policies.

## Delivery Workflow

- Approved small website changes use the risk-proportional fast path in `docs/process/agent-workflow.md` (Fast Path For Small Website Changes); do not restart design or exhaustive cross-surface QA for an unchanged presentation boundary.
- Use a plan for risky, cross-surface, migration, or multi-step work.
- Small isolated edits may proceed without a new plan.
- Keep docs and plans aligned with real progress.

## Canonical Product Shape

Prefer one explicit path:

`input -> validation -> normalization -> canonical content or data -> deterministic site state -> optional automation -> UI and readback`

- Server or service layers own authorization, validation, persistence, lifecycle, and mutations.
- Frontend owns interaction, rendering, client state, and accessible feedback. It does not invent content truth, business rules, or persistence outcomes.
- Automation and OpenAI may draft, retrieve, or synthesize from bounded trusted sources. Generated output must not silently become published or canonical truth.
- Existing confirmed or published work must not be silently rewritten by a profile, default, prompt, or design-system decision.

## Reuse And Simplification

- Search for the existing owner before adding code, CSS, a component, a state model, a validator, a document, or a content source.
- Prefer deletion over another abstraction, one path over compatibility branches, and fewer states over configurable machinery.
- Extend a canonical seam instead of creating route-local truth or a parallel component family.
- After adding code, remove proven-obsolete overlap or state exactly why it must remain.
- Preserve unrelated dirty-worktree changes. Never revert another owner's work.

## Website Workflow

Product admits outcome, priority, non-goals, one accountable role/current executor and proportional acceptance. Use the existing role boundaries above; Product is not a routine relay. Designer resolves unclear hierarchy/interaction and obtains Ivan's explicit approval for new designs before implementation. Communication is not design approval.

Frontend reuses shared tokens/components/layout patterns and preserves desktop/mobile accessibility. State the reused seam in the result. Architect joins only for cross-system ownership or large cleanup. QA independently verifies when admitted and never fixes product code: exercise relevant desktop/mobile, overflow, focus/interaction, console/errors and brief fidelity. Same-scope defects return directly to the incorrect implementation owner.

## Design-System Decision Gate

Before UI implementation, inspect the current routes, components, styles, tokens, visual references, and live catalog if one exists.

Choose and document exactly one direction:

1. reuse an existing portfolio primitive or pattern;
2. establish a small portfolio-owned primitive because the pattern repeats; or
3. assess an external system such as Hito DS for compatible primitives and tokens.

Do not import an external design system wholesale, imitate its visual language by default, or add a parallel styling layer. A new primitive must replace repeated local behavior and have a named owner and reuse or catalog location.

## Product Communication

Lead with result, boundary and next action; ask one concrete question only when Ivan must decide. Link the Task and canonical artifact instead of repeating them. The eight-section report and routine next-role prompts are retired. Do not create duplicate Tasks or unchanged status writes. Full English ROLE: packets use `prompts/task-template.md` only when Ivan explicitly requests them.

## Evidence And Definition Of Done

For implementation, debugging, or behavior-changing work, define:

1. the observable result;
2. the preserved boundaries;
3. the relevant test inventory; and
4. the condition that keeps the task open.

Match evidence to the claim:

- source and reachability proof for ownership and dead code
- browser proof for layout, interaction, focus, and responsive behavior
- persistence or readback proof for stored truth
- provenance proof for portfolio facts and evidence
- cleanup proof for disposable test data
- build, deployment, or HTTP proof for runtime availability

Do not represent source inspection, mouse interaction, a fixture, or a screenshot as proof of a capability that was not exercised.

## Workspace Hygiene

- Run `npm run hygiene:check` before implementation handoff and before commit.
- Use `npm run clean:workspace` for reproducible caches, logs, and byte-identical recovery files.
- Files or directories with recovery suffixes such as ` 2`, ` 3`, or ` 4` are never canonical.
- Do not hide recovery conflicts with ignore rules; divergent or orphan copies must stay visible until resolved.
- Renamed `.next_*` or `.next-*` directories are generated artifacts and must not enter Git.

`Implementation DoD: Passed` requires every required owner-level check to pass. List skipped checks with their reason and coverage consequence. Broader browser, cross-route, deployment, or release testing is a separate `Global QA Acceptance` gate when the task requires it.

## Communication And Handoffs

- Normal handoffs update/read back the existing Portfolio Task, then send its ID/link and one action to the verified existing portfolio role chat when directly authorized by Ivan. Adoption of another project's workflow does not import its communication authorization or chat IDs.
- Missing routing or messaging authority is reported once to Ivan; never hide the gap with a copy-paste prompt, substitute subagent, new chat, fork or worktree. Creation needs explicit authorization.
- Do not make the user carry an implementation-to-QA prompt chain between agents.
- The primary execution owner may use bounded independent subagents when allowed and remains responsible for the integrated evidence.

## Stop Conditions

Stop and escalate instead of guessing when work requires:

- a product decision
- production access or secrets
- a paid external service
- destructive or non-reversible operations
- a broad rewrite without accepted scope
- an unresolved cross-owner conflict

A local failure inside the same safe owner boundary is a fix-forward reason, not a user handoff.

## Reporting

Implementation reports must name the task, stage, demonstrated root cause, changed owners, reused seams, preserved boundaries, and a compact validation table:

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |

Documentation-only or discovery work uses only the checks needed to prove its claim. Never pad a report with unrelated build or test output.
