# Chat-First Portfolio UX Cleanup

## Status

Superseded as future direction by Ivan's 2026-10-27 withdrawal of chat. Historical functional UX/preservation reference only; no new Chat-First execution is authorized. See [Accepted Direction](../../current-state.md#accepted-direction).

## Owner

`DESIGNER`

Product remains the canonical routing and source-of-truth owner.

## Product Reconciliation

Accepted functional scope, first-slice decisions, Markdown grounding ownership, preservation rules, and the downstream execution sequence are recorded in:

- [`docs/tasks/in-progress/chat-first-portfolio-product-reconciliation.md`](../../tasks/in-progress/chat-first-portfolio-product-reconciliation.md)

The Data Quality slice is complete:

- [`docs/data-quality/chat-first-portfolio-corpus-audit.md`](../../data-quality/chat-first-portfolio-corpus-audit.md)
- canonical grounding corpus: [`content/portfolio/README.md`](../../../content/portfolio/README.md)

Product accepted the recorded Data Quality decisions. Architecture completed the first functional implementation contract:

- [`docs/plans/active/chat-first-portfolio-first-functional-implementation.md`](chat-first-portfolio-first-functional-implementation.md)

Backend Slice 1 is next. Frontend implementation remains downstream of the server foundation and visual/design-system gate.

## Objective

Define a clean functional UX foundation for the Chat-First Portfolio before any visual design or frontend implementation begins.

The plan removes the deprecated page-first and terminal-inspired presentation model from the future product direction while preserving project narratives, routes, screenshots, videos, and other evidence.

## Root-Cause Framing

### Visible problem

The current portfolio is organized as a homepage followed by manually browsed case-study pages. Its ASCII dossier and terminal conventions make that page-first structure more prominent.

### Demonstrated cause

The new product is question-first:

- visitors should be able to ask about Ivan's work directly;
- answers should connect projects, contributions, capabilities, companies, and evidence;
- a complete project route should remain available when deeper proof is needed;
- project-scoped questions should remain distinct from the broader portfolio conversation.

The current presentation hierarchy does not own those behaviors. Retaining its terminal framing would preserve the old interaction model inside a new chat shell.

### Canonical owner

- Product owns product scope and routing.
- Designer owns the functional experience direction in this plan.
- Data Quality owns trusted claims, aliases, and evidence readiness.
- Frontend owns later implementation after the UX direction and data dependencies are accepted.

### Existing seams to reuse

- existing `/projects/*` routes;
- authored project narratives and case-study sections;
- project metadata and the future trusted-content seam;
- screenshots and videos under `public/*`;
- gallery and lightbox behavior;
- theme-aware media variants;
- manifesto and contact routes or destinations;
- browser history and route URLs.

The ASCII dossier component family is not a required reuse seam for the new product.

## Outcome

This plan is complete when the team has one implementation-ready functional UX specification that explains:

1. how visitors discover the portfolio before asking a question;
2. how global portfolio conversation works;
3. how full project views and project-scoped conversation work;
4. how visitors switch context and return without losing their place;
5. how projects and evidence appear inside answers;
6. how unsupported questions, loading, errors, history, sharing, and traditional browsing behave;
7. which current presentation patterns can be retired;
8. which routes, content, and assets must be retained;
9. which decisions remain blocked on Product or Data Quality.

## Scope

### In scope

- product-surface cleanup;
- information architecture;
- content and action hierarchy;
- end-to-end visitor journey;
- global versus project-scoped conversation;
- required states and transitions;
- navigation, back, return-position, and context-switching behavior;
- suggested questions and browse alternatives;
- project references and project comparison;
- evidence presentation and source disclosure;
- insufficient-evidence and error behavior;
- lightweight anonymous session-history expectations;
- shareable answer and project-state expectations;
- desktop and mobile functional anatomy;
- accessibility, focus, keyboard, responsive, loading, and reduced-motion expectations;
- minimum reusable component and state inventory;
- future Frontend acceptance criteria.

### Out of scope

- visual style exploration;
- color, typography, radius, shadow, icon, illustration, or motion art direction;
- high-fidelity UI;
- Figma mockups or prototypes;
- frontend implementation;
- design-system token work;
- backend, persistence, retrieval, or OpenAI architecture;
- corpus population;
- rewriting project facts or inventing metrics;
- deleting routes or assets;
- treating every existing screenshot as trusted evidence;
- production deployment or QA acceptance.

## Design Principles

1. **Question first, but not question only.** Chat is the primary discovery action; traditional browsing remains visible.
2. **Evidence before theatre.** A useful answer must lead to projects, authored narratives, or qualified evidence.
3. **One visible scope at a time.** Global and project-scoped conversation must never be ambiguous.
4. **Preserve authored depth.** Chat helps visitors discover case studies; it does not flatten or replace them.
5. **No forced conversation.** Visitors can browse projects, capabilities, companies, manifesto, and contact without submitting a question.
6. **Limitations are a designed state.** Insufficient evidence is a valid answer, not an exceptional failure.
7. **Generated synthesis is not canonical truth.** The interface must distinguish synthesis from authored content and evidence.
8. **Clean the old metaphor completely.** Do not retain ASCII or terminal conventions without a new functional purpose.
9. **Design behavior before decoration.** UI styling begins only after hierarchy, state, and transition decisions are accepted.

## Work Sequence

### Step 1. Retire the deprecated product metaphor on paper

Owner: `DESIGNER`

Status: Complete

Exit evidence:

- [`docs/design/chat-first-portfolio-step-1-removal-retention-inventory.md`](../../design/chat-first-portfolio-step-1-removal-retention-inventory.md)

Define the future presentation patterns that should no longer shape the product:

- terminal commands and route labels;
- ASCII artwork and ASCII missing-preview states;
- dossier, case-file, and file-index metaphors;
- bracket-heavy numbering and `::` metadata conventions;
- mono-only hierarchy;
- page-first homepage sections as the primary discovery path;
- terminal pager behavior as the main project-navigation model;
- typewriter, scramble, command-prompt, and decorative caret behaviors;
- one-public-project framing;
- any fixed or floating navigation that competes with the conversation composer.

Also state which behaviors may survive without their current styling, such as gallery navigation, lightbox, project routes, theme-aware media, and browser history.

Required exit evidence:

- one removal and retention inventory;
- every retired pattern is tied to the obsolete product model, not only to aesthetic preference;
- no route, narrative, or asset is marked for deletion.

Keep the step open if:

- presentation cleanup would remove evidence or authored content;
- a supposedly obsolete element still owns required product behavior;
- the distinction between retirement and deletion is unclear.

### Step 2. Define the cleaned information architecture

Owner: `DESIGNER`

Status: Complete

Exit evidence:

- [`docs/design/chat-first-portfolio-step-2-information-architecture.md`](../../design/chat-first-portfolio-step-2-information-architecture.md)

Define one functional hierarchy:

1. discovery and global conversation;
2. traditional project index;
3. full project view;
4. project-scoped conversation;
5. evidence viewer;
6. shareable answer or project state;
7. manifesto and contact.

For each surface, define:

- visitor purpose;
- primary action;
- secondary actions;
- relationship to conversation scope;
- relationship to canonical project evidence;
- expected browser navigation behavior.

Required exit evidence:

- one route-and-surface map;
- no duplicated owner for project truth;
- chat, browsing, and project evidence form one navigable system.

Keep the step open if:

- a visitor can enter project scope without seeing the scope change;
- a visitor cannot browse without using chat;
- project routes are treated as disposable.

### Step 3. Define the initial discovery hierarchy

Owner: `DESIGNER`

Status: Complete

Exit evidence:

- [`docs/design/chat-first-portfolio-step-3-initial-discovery-hierarchy.md`](../../design/chat-first-portfolio-step-3-initial-discovery-hierarchy.md)

Specify the initial state before visual styling:

1. Ivan's identity and concise portfolio purpose;
2. the primary question input;
3. supported starter questions;
4. featured or recent projects;
5. capability and company shortcuts;
6. browse-all-projects path;
7. lightweight explanation of grounded answers;
8. contact and manifesto as secondary destinations.

Define how the page changes after the first submitted question so that discovery content does not compete with the conversation.

Required exit evidence:

- desktop and mobile content order;
- one unambiguous primary action;
- all secondary discovery paths remain reachable;
- no decorative hero requirement.

Keep the step open if:

- the first screen resembles a generic chatbot;
- project proof is invisible before the first question;
- the input competes with multiple equally prominent CTAs.

### Step 4. Define conversation states and transitions

Owner: `DESIGNER`

Status: Complete

Exit evidence:

- [`docs/design/chat-first-portfolio-step-4-conversation-states.md`](../../design/chat-first-portfolio-step-4-conversation-states.md)

Specify:

- input focus;
- suggested-question selection;
- submit behavior;
- loading and streaming;
- normal grounded answer;
- answer with multiple projects;
- answer with screenshots;
- contextual follow-ups;
- insufficient evidence;
- error and retry;
- empty conversation;
- new conversation;
- session-history return.

For each state, define:

- visible hierarchy;
- available actions;
- focus behavior;
- preserved draft or answer state;
- transition into the next state;
- desktop and mobile differences.

Exit evidence:

- one state matrix;
- no state depends on decorative animation for comprehension;
- retry preserves the question;
- insufficient evidence offers safe next actions.

Keep the step open if:

- loading causes layout instability;
- streaming repeatedly steals focus;
- errors destroy visitor input;
- unsupported questions look like system failure.

### Step 5. Define answer, project, and evidence hierarchy

Owner: `DESIGNER`

Status: Complete

Exit evidence:

- [`docs/design/chat-first-portfolio-step-5-answer-project-evidence-hierarchy.md`](../../design/chat-first-portfolio-step-5-answer-project-evidence-hierarchy.md)

Define the functional anatomy of an answer:

1. direct grounded synthesis;
2. relevant capabilities or companies when supported;
3. project references;
4. optional evidence previews;
5. source disclosure;
6. contextual follow-up actions;
7. relevant contact CTA only when visitor intent supports it.

Define project-card behavior for:

- one relevant project;
- several relevant projects;
- project comparison;
- opening the complete project;
- entering project scope.

Define screenshot behavior for:

- verified evidence;
- contextual supporting media;
- evidence not ready for claims;
- missing or insufficient evidence.

Exit evidence:

- one answer anatomy;
- one reusable project-reference contract;
- one reusable evidence-preview contract;
- no asset is treated as proof only because the file exists.

Keep the step open if:

- generated synthesis cannot be distinguished from authored evidence;
- project cards invent facts;
- screenshots lack project context or disclosure status.

### Step 6. Define project view and scoped conversation

Owner: `DESIGNER`

Status: Complete

Exit evidence:

- [`docs/design/chat-first-portfolio-step-6-project-view-scoped-conversation.md`](../../design/chat-first-portfolio-step-6-project-view-scoped-conversation.md)

Preserve the complete project narrative while defining:

- project overview;
- contribution;
- outcomes;
- narrative sections;
- evidence gallery;
- entry into project-scoped conversation;
- visible project-scope indicator;
- per-project draft and conversation branch;
- exit back to all-project context;
- return to the originating global answer.

The project conversation must remain subordinate to the authored project view. Opening a project must not automatically replace the narrative with chat.

Exit evidence:

- one full-project anatomy;
- one scoped-chat anatomy;
- clear global/project scope distinction;
- route, transcript, draft, and scroll-return rules.

Keep the step open if:

- scoped answers can silently use unrelated projects;
- exiting scope destroys the project branch;
- browser Back loses the originating conversation position.

### Step 7. Define navigation, history, sharing, and back behavior

Owner: `DESIGNER`

Status: Complete

Exit evidence:

- [`docs/design/chat-first-portfolio-step-7-navigation-history-sharing.md`](../../design/chat-first-portfolio-step-7-navigation-history-sharing.md)

Specify:

- browser Back priority for overlays, project routes, and conversation state;
- restoration of the originating message and scroll position;
- lightweight local session history without an account;
- new-conversation and clear-history actions;
- shareable project states;
- shareable answer-state expectations and limitations;
- behavior when an ephemeral answer cannot be reconstructed.

Exit evidence:

- navigation transition table;
- no dead-end surface;
- shared states preserve or honestly disclose their context;
- local history is optional to the first slice and does not block core discovery.

Keep the step open if:

- Back behavior depends on hidden or surprising rules;
- sharing implies durable answer truth that the product cannot guarantee;
- local history requirements begin to define backend architecture.

### Step 8. Define accessibility and responsive behavior

Owner: `DESIGNER`

Status: Complete

Exit evidence:

- [`docs/design/chat-first-portfolio-step-8-accessibility-responsive.md`](../../design/chat-first-portfolio-step-8-accessibility-responsive.md)

Specify:

- semantic landmarks and transcript structure;
- keyboard order and shortcuts;
- visible focus;
- live-region behavior during streaming;
- dialog focus trap and restoration;
- image alternative text and captions;
- minimum touch targets;
- zoom and reflow;
- sticky mobile composer and safe-area behavior;
- drawers or sheets for history, sources, and comparison;
- loading geometry;
- error recovery;
- reduced-motion behavior.

Exit evidence:

- desktop anatomy at wide and medium widths;
- mobile anatomy at narrow widths;
- accessibility acceptance list;
- no horizontal overflow is part of future QA acceptance.

Keep the step open if:

- scope or status relies only on color;
- streaming creates excessive announcements;
- mobile keyboard can obscure the composer;
- overlays do not restore focus.

### Step 9. Produce the implementation boundary and acceptance contract

Owner: `DESIGNER`

Status: Complete

Exit evidence:

- [`docs/design/chat-first-portfolio-step-9-implementation-boundary.md`](../../design/chat-first-portfolio-step-9-implementation-boundary.md)

Deliver:

- minimum reusable component inventory;
- minimum state inventory;
- named data dependencies;
- preserved route and evidence boundaries;
- implementation acceptance criteria;
- conditions that keep Frontend implementation open;
- explicit items requiring Product or Data Quality decisions.

Do not define implementation mechanics, API contracts, storage choices, or styling tokens.

Exit evidence:

- Frontend can estimate and implement the chosen flow without inventing UX behavior;
- Data Quality can identify the evidence fields the UI needs;
- Product can route exactly one immediate owner;
- UI exploration is clearly separated into a later plan.

Keep the step open if:

- Frontend must make product-scope decisions;
- the component inventory implies a visual system;
- unverified evidence can enter answers without disclosure.

## Required Functional States

The final UX specification must cover:

- initial discovery;
- input focus;
- suggested-question selection;
- streaming or loading answer;
- normal grounded answer;
- answer containing multiple projects;
- answer containing screenshots;
- insufficient-evidence response;
- error and retry;
- full project view;
- project-scoped conversation;
- switching back to all-project context;
- desktop behavior;
- mobile behavior.

## Removal Inventory

The future active presentation should retire:

- ASCII art and ASCII fallbacks;
- terminal and command-line language;
- dossier and case-file framing;
- route indexes used as decoration;
- mono-only presentation;
- bracket-heavy labels and metadata separators;
- decorative typewriter, scramble, caret, and command motion;
- terminal pager conventions;
- the current one-active-project homepage statement;
- page-section navigation as the main discovery model;
- generic assistant chrome not required by portfolio discovery.

Retirement means removal from the future active presentation path. It does not authorize deleting source files, routes, narratives, or assets.

## Retention Inventory

The redesign must preserve:

- all existing project routes;
- project titles, narratives, contributions, and outcomes pending content validation;
- screenshots, videos, and light/dark variants;
- the manifesto;
- contact destinations;
- gallery and fullscreen evidence behavior;
- stable project URLs;
- authored case-study depth;
- the distinction between trusted content and generated synthesis;
- unrelated dirty-worktree changes.

## Data Dependencies

Designer can define the required fields but cannot resolve their truth.

The UX remains dependent on:

- trusted company, project, task, and asset rows;
- supported starter-question coverage;
- company alias decisions, including VK/CityMobile;
- product alias decisions, including Peruse/Peruse.ml;
- evidence status for individual screenshots and videos;
- trusted captions and claim boundaries;
- supported project-comparison dimensions;
- answer and source-disclosure constraints;
- shareable answer-state lifecycle decisions;
- local anonymous-history expectations.

## Risks

- Cleaning only the visual styling would leave the old page-first hierarchy intact.
- Adding chat before evidence readiness would create confident but weak answers.
- Removing existing routes too early would reduce trust and browseability.
- Over-specifying session persistence would pull Designer into backend ownership.
- Treating every asset as evidence would make source disclosure misleading.
- Designing a high-fidelity chat shell now would conceal unresolved product and data decisions.

## Designer Definition Of Done

Designer work is complete only when:

1. the old presentation metaphor has a documented retirement boundary;
2. all retained content, routes, and evidence have a documented preservation boundary;
3. one information architecture covers chat, browse, project, evidence, manifesto, and contact;
4. global and project-scoped conversation are behaviorally distinct;
5. every required state has desktop and mobile anatomy;
6. input, answer, project card, evidence, context switch, follow-up, navigation, sharing, history, and Back behavior are explicit;
7. accessibility and reduced-motion expectations are explicit;
8. the minimum component and state inventory is defined without implementation mechanics;
9. Data Quality and Product dependencies are named rather than guessed;
10. future Frontend acceptance criteria are testable;
11. no UI styling or implementation work is required to understand how the product works.

## Validation

| Check | Scenario / environment | Required result | Evidence |
| --- | --- | --- | --- |
| Canonical alignment | Product brief and current system docs | UX preserves routes and evidence while making conversation primary | Source reconciliation |
| Scope boundary | Designer role | No UI styling, frontend, backend, OpenAI architecture, or fact invention | Plan review |
| State coverage | Required design states | Every named state has behavior and desktop/mobile anatomy | State matrix |
| Context integrity | Global and project conversation | Scope, drafts, history, and return behavior are unambiguous | Transition map |
| Evidence integrity | Answer screenshots and project references | Every surfaced item requires project context and disclosure status | Evidence contract |
| Cleanup integrity | Deprecated presentation | Presentation is retired without deleting content or assets | Removal/retention inventory |
| Accessibility | Keyboard, focus, responsive, loading, errors, reduced motion | Expectations are testable by future Frontend and QA | Acceptance checklist |

## Stop Conditions

Stop and return to Product instead of guessing if the work requires:

- choosing unsupported project facts;
- deciding canonical company or project aliases;
- defining answer persistence or backend lifecycle;
- deleting routes, narratives, or assets;
- selecting a visual style or external design system;
- changing the canonical trusted-content architecture;
- resolving a cross-owner disagreement.

## Advisory Next Role

Data Quality and Architecture are complete. The recommended next role is `BACKEND` for Slice 1 of the accepted first functional implementation contract.
