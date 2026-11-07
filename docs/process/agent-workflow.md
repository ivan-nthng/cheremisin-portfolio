# Portfolio Agent Workflow

Owner: PRODUCT. Adopted from Saavi's current operating approach on 2026-10-27 at Ivan's request. Replaces manual prompt relays without importing Saavi identities or permissions.

## One Working System

| Concern | Canonical owner |
| --- | --- |
| Desired outcome, priority, constraints, final product/design acceptance | Ivan |
| Delivery strategy, scope discipline, sequencing, specialist routing | PRODUCT, with technical owners |
| Task status, phase, executor, current handoff, latest/next action | Portfolio Notion Tasks |
| Durable specifications, project facts, rules and evidence boundaries | Repository Markdown |
| Search/navigation over documents and source material | Portfolio Notion Library |
| Code history | Git |
| Actual behavior | Source plus exercised runtime/deployment evidence |

One outcome has one Task, one stable accountable role and one current executor. Owner changes do not create new Tasks. Area is an enduring capability; Epic is a finite outcome. Prompts, receipts, retries and phases are not Tasks. Library must not hold the sole copy of an accepted rule.

## Minimal Context And Work Budget

Working-doc maintenance: current-state owns direction, current-product visitor behavior, current-system runtime ownership. Replace the owning contract when it changes; remove superseded alternatives and result-only prose. Notion owns status and routine receipts; Git preserves superseded text. Link required release/audit evidence at its existing owner; do not create another archive or mandatory pre-read for each update. Existing PORT-32 snapshots remain recoverable historical evidence, never current instructions.

Owner: PRODUCT for routing; each executor for its own context. Added at Ivan's request on 2026-10-31 to reduce token consumption.

- At task entry, load root policy once, your role card, the applicable skill and the existing Task's outcome/acceptance/current handoff. Use supplied instructions instead of fetching an identical copy. Reuse unchanged context in the same chat; reread only changed policy or disputed facts.
- Discover headings/paths with `rg` before reading. Open only named artifact sections, the affected owner and its direct consumers/tests. Do not concatenate whole current-state/current-system files, all role cards, all plans or the portable process package. Expand only to resolve a named uncertainty.
- Each Task points to one primary artifact and exact headings; load a second domain only for a named unresolved question. Inspect counts/names/diff summaries first. Narrow or paginate oversized output instead of ingesting whole histories or tool catalogues.
- For status/existence questions return only status, counts or matched names. Keep command output to the relevant excerpt; after truncation, narrow the query instead of rereading with a larger limit. Batch independent reads once; keep dependent writes/readbacks sequential. Do not poll idle roles, repeat passed checks without a changed input, or start a new process audit for an unchanged complaint already covered by accepted rules.
- `current-state.md#accepted-direction` owns direction; dated receipts are history, not a queue. `current-system.md` is a section-addressed ownership map. Read exact proof from the Task's artifact heading; do not replay prior evidence chains. Notion owns the current executor/status.
- One executor acts; other roles stay idle until a bounded question or admitted handoff. Do not broadcast continuation/status requests, poll idle roles or ask for ceremonial acknowledgements. Specialists do not repeat another owner's audit. Product joins only for decisions, changed scope, missing authority or final acceptance.
- Messages contain one Task link, the delta and one action/blocker, normally 1–3 sentences. Keep detailed evidence in one canonical artifact; do not copy logs, full reports or execution packets into each chat and document. Record material transitions only.
- Run focused checks for the changed boundary and reuse accepted unchanged proof. Expand on a failure or changed dependency, not to occupy every role. The small-change fast path below preserves its existing approval and release limits.
- Unused files do not consume model context until loaded. Do not delete authored content, historical evidence or runtime code merely to reduce tokens. Remove proven redundant generated/recovery files only through the existing hygiene rules; code removal requires reachability proof and an admitted owner boundary.

## Admission And Owner Chain

Before execution, the Task names outcome, acceptance, non-goals, accountable role, executor, affected files/contracts/environment, validation, omissions, rollback and stop conditions. Use zero or one Epic based on outcome; explain an intentionally standalone Task.

Product admits intent and owner sequence. Designer resolves hierarchy/interaction/visual direction; Ivan approves new designs before implementation. Design System owns repeated tokens/primitives when affected. Frontend/Backend implement their boundaries. QA verifies independently when admitted and does not fix code. Product returns for changed scope, a decision, missing authority or final acceptance, not every transition.

PRODUCT evaluates Ivan's proposed implementation against his desired outcome before admitting work, following [Independent Judgment](../../agents/product.agent.md#independent-judgment). Technical disagreement requires a concrete reason and one recommended alternative; routine engineering decisions stay with PRODUCT and specialists. Do not convert each suggestion into execution or ask Ivan to arbitrate routine frontend/backend choices.

Do not introduce mandatory architecture, research or QA cycles beyond accepted risk and scope. Reproduced in-scope defects are fixed forward by the incorrect implementation owner and returned to the admitted verifier.

## Task Lifecycle

### Fast Path For Small Website Changes

Ivan explicitly requests a faster small-change workflow (2026-10-29). Do not treat every approved visual adjustment as a new discovery/design/release project. Use the smallest safe cycle:

- Clear approved spacing/color/icon/copy/component geometry: FRONTEND implements in the existing owner immediately; no new Designer proposal, chat, plan, architecture pass or approval chain. Reuse the current Task or create one only for a genuinely separate outcome.
- Validate the changed surface at desktop/mobile and its relevant interaction/focus/overflow/console boundary. Run type/build/tests only where affected or required by the actual release; reuse unchanged accepted proof instead of restarting full matrices. Hygiene and correct source/release isolation remain mandatory.
- Independent QA is risk-proportional, not a mandatory separate stage for every presentation-only delta. Loading/input/history/focus/lifecycle changes retain focused independent QA; a new effect is not proof that every route, bot agent, image format or unrelated theme needs another exhaustive run.
- Once scoped acceptance passes, proceed directly to an already-authorized isolated release and concise live smoke/readback. No additional Product relay/approval, rebuild of an already-tested candidate or duplicate deploy. Preserve the prior READY rollback.
- Keep one concise current Task checkpoint and canonical delta/evidence; no new dossier per retry, repeated unchanged status writes or long cross-role packets. A useful result is the change plus its evidence, not documentation volume.
- Never convert a known failure to a pass to go faster. Label skipped/reused checks and their coverage consequence. Expand testing only for a reproduced defect, changed risky owner or actual source/deployment departure. Report a concrete blocker immediately; do not promise a universal one-minute completion or wait for ceremonial acknowledgments.

Reuse the existing Portfolio tracker; discover its schema before writes. Current properties own present state; Lifecycle log owns attributable transitions.

1. Fetch the Task and verify identity, executor, outcome, acceptance and boundary.
2. Update Status, Phase, Owner, Latest update, Next action and Repository document consistently. Preserve unrelated fields, dependencies, acceptance and history.
3. Keep the body compact: Outcome, Acceptance, Current boundary, Canonical artifact, Current handoff, Lifecycle log. Accountable role currently lives in the body because the tracker has no such property; do not silently migrate its schema.
4. Replace Current handoff with result, unresolved boundary and one next action/owner. Append a dated log entry only for a material transition or terminal result.
5. Fetch again and verify saved fields/body/checklist/history before calling a checkpoint or handoff confirmed.

Backlog is unadmitted work; Ready has not started; In progress includes implementation, review and verification. A started Task does not return to Ready merely on handoff. Blocked requires a concrete unmet prerequisite; an ordinary queue or fixable defect is not a blocker. Done requires accepted outcome and required proof; Cancelled is withdrawal, not completion.

If Notion is unavailable, report the failed checkpoint to Product. Do not pretend a handoff succeeded, create another lifecycle store or inspect credentials. No portfolio Integration Manager is configured; Saavi's relay is not available for portfolio work.

## Direct Handoff

No-loop rule: use only the next owner already admitted in the Task, never an automatic tour of every role. A question to a specialist does not transfer execution. A passing slice advances; a failing slice returns to its implementation owner with the specific failed acceptance and focused retest. Preserve unchanged passed evidence. If the same failure returns without a new fix or new causal evidence, stop that handoff loop and ask PRODUCT to resolve the concrete dependency/ownership gap. Do not restart design, architecture or full QA. An idle role with no admitted action does nothing.

Ivan directly authorized portfolio agents to exchange task handoffs, questions, results and replies on 2026-10-27 in the PRODUCT chat, answering the explicit request for Saavi-style inter-agent communication: "Всё верно, да. Я разрешаю." This authorization is portfolio-only and does not grant access to Saavi work, new chats/forks/subagents, or expanded implementation/release authority. Reuse verified portfolio destinations without per-message approval.

The one-time role-chat bootstrap authorized on2026-10-27 is complete; use the verified registry below. Its historical PORT-12 dispatch is not a current execution instruction and grants no ongoing chat/fork/worktree creation or implementation authority.

The outgoing owner may hand the same Task to exactly one next role when scope, admitted owner sequence, risk and acceptance remain unchanged; files/runtime are released; the next boundary and rollback are clear; required evidence and Notion read-back are complete; and no approval/external authority is missing.

After read-back, send the Task ID/link and one concrete action/result/question, normally in 1–3 sentences, to the verified existing portfolio chat with Ivan's direct messaging authorization. Exact files/headings, evidence, omissions and acceptance stay in the Task/artifact, not copied into long chat messages. Do not request acknowledgement of unchanged results.

Communication does not grant implementation, design approval, schema, production, secret, destructive, paid-service or release authority. Missing destination or messaging authorization returns to Product for resolution with Ivan. Do not create a substitute chat, fork, branch, worktree or subagent to bypass it.

## Role Routing And Local Identities

### Figma Access Boundary

Ivan explicitly requires Figma work through the connected Figma MCP server only (2026-10-28). Use applicable Figma skills for document reads, edits, bindings, exports, motion and supported prototype operations. Do not navigate, operate or verify Figma through browser automation, native-app control, or browser internals as a substitute. If MCP cannot exercise a required capability, record that verification as unavailable and return the limitation; do not bypass this boundary or claim unexercised behavior. Earlier browser-based evidence remains historical and must not be relabeled as MCP proof. This restriction concerns Figma, not separately admitted browser QA of the portfolio website.

- Repository: /Users/ivan/Developer/cheremisin-portfolio.
- Portfolio home: https://app.notion.com/p/3e5fe5f58cf58077ad7ed8f56c0ba01f.
- Tasks: collection://3e5fe5f5-8cf5-80a7-86d9-000bfef245a1; native prefix PORT.
- Epics: collection://e9965f8a-4afe-4c04-99ca-205a450c9a82.
- Library: collection://455ee2a6-7cde-4b6d-995c-969943722ffd.
- Isolation: Portfolio Tasks, Epics and Library are separate data sources under the Portfolio parent, not linked views of Saavi. Do not write portfolio work into Saavi or create duplicate portfolio databases. The Tasks-to-Epics relation targets the Portfolio Epics source above.
- Codex project: c2c10209-7e58-4558-8b10-edd340b1014c; host: local. The following permanent chats are the canonical destinations, verified by creation and project-membership read-back on 2026-10-27. Do not substitute same-titled historical chats or subagents.

| Role | Canonical chat ID | Role card |
| --- | --- | --- |
| PRODUCT | 019f8f64-c4f9-7f83-9e12-bf473cd0e0ac | agents/product.agent.md |
| DESIGNER | 01a17d62-78ae-7bf0-923d-f8314494cf57 | agents/designer.agent.md |
| DESIGN SYSTEM | 01a17d63-2759-7ab1-8338-3d4b24b62120 | agents/design-system.agent.md |
| ARCHITECT | 01a17d63-2f0c-7d51-b45a-5c5e82eaf864 | agents/architect.agent.md |
| FRONTEND | 01a17d63-3309-73b3-8bfe-ce4666be2d8e | agents/frontend.agent.md |
| BACKEND | 01a17d63-2a06-7851-ad32-6d0da575fd29 | agents/backend.agent.md |
| DATA QUALITY | 01a17d63-362b-7db0-adc2-1daa43e21ea6 | agents/data-quality.agent.md |
| COPY | 01a17d63-34a0-7da0-bba8-09355aa8afee | agents/copy.agent.md |
| QA | 01a19460-1116-7f71-9fc6-5e969e2886ba | agents/qa.agent.md |

This registry owns destinations only; role cards own responsibility and Notion owns current admission/execution. QA is the clean replacement authorized2026-10-31. LAYOUT is covered by FRONTEND/DESIGNER; SYSTEM ADVISOR by bounded ARCHITECT work. PROMPT ENGINEER and FULLSTACK have no active role chat. New destinations require explicit authority.

The app's saved Portfolio project still advertises the former iCloud path. Specialist chats were created in local projectless bootstrap directories and then attached to this Portfolio project without accessing iCloud. Those initial chat/output folders are not repository truth: every specialist must explicitly use /Users/ivan/Developer/cheremisin-portfolio for source/file commands. Do not operate in iCloud or silently rewrite app metadata based on the stale project path.

## Adoption Boundary

Portfolio Notion isolation, schema, direct-messaging authorization and permanent role destinations are verified. Bootstrap readiness and task-start evidence are verified through the existing chat tools and recorded in PORT-13; they do not prove a completed design/implementation/QA chain. Remaining backlog reconciliation and specialist outcomes are not implicitly complete.

Keep rules in existing owners; do not copy the Saavi starter package or add a parallel framework. Historical task records remain pointers, not a second lifecycle writer. Current accepted Tasks govern cleanup; bootstrap restrictions do not override accepted PORT-31 retirement. No mass-import/reopening or tracker-schema change follows from process maintenance.

Focused documentation checks prove policy changes. Existing hygiene, owner proof, independent QA when admitted and separately authorized release boundaries remain. Reports to Ivan are concise Russian updates, not mandatory eight-section prompt packets.

## Source References

Read-only source audit: Saavi AGENTS.md; project-agent-operating-model-starter/PROJECT_PROFILE.md, docs/operating-model.md, docs/notion-task-control.md, agents/product.agent.md, agents/integration-manager.agent.md; and docs/architecture/repository-structure.md sections Progressive Loading Contract and Documentation Lifecycle. Saavi remains unchanged; this portfolio document owns the adapted rules.
