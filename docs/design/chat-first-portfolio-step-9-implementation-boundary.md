# Chat-First Portfolio Step 9: Implementation Boundary And Acceptance Contract

## Status

Step 9 complete — Designer functional UX specification ready for Product reconciliation

## Parent Plan And Canonical Inputs

- [`Active plan`](../plans/active/chat-first-portfolio-ux-cleanup.md)
- [`Step 1 removal/retention`](chat-first-portfolio-step-1-removal-retention-inventory.md)
- [`Step 2 information architecture`](chat-first-portfolio-step-2-information-architecture.md)
- [`Step 3 initial discovery`](chat-first-portfolio-step-3-initial-discovery-hierarchy.md)
- [`Step 4 conversation states`](chat-first-portfolio-step-4-conversation-states.md)
- [`Step 5 answer/project/evidence`](chat-first-portfolio-step-5-answer-project-evidence-hierarchy.md)
- [`Step 6 project/scoped conversation`](chat-first-portfolio-step-6-project-view-scoped-conversation.md)
- [`Step 7 navigation/history/sharing`](chat-first-portfolio-step-7-navigation-history-sharing.md)
- [`Step 8 accessibility/responsive`](chat-first-portfolio-step-8-accessibility-responsive.md)

Owner: `DESIGNER`. Product remains the canonical router.

This is a functional implementation boundary, not authorization to implement. It does not define component code, framework state shape, APIs, storage, retrieval, model behavior, styling tokens, or visual design.

## Root-Cause Decision

Frontend cannot safely begin by “cleaning the old design” alone. It needs a bounded surface/state contract, approved data fields, and explicit preservation rules. Otherwise it would have to decide project publication, evidence trust, conversation lifecycle, or visual-system ownership while implementing.

## 1. Minimum Reusable Component Inventory

These are functional responsibilities, not prescribed React components or visual primitives.

| Functional owner | Required responsibility | Reuse boundary |
| --- | --- | --- |
| Global orientation/navigation | Identity, root, browse, manifesto, contact, optional history entry | Shared across root/project/manifesto without terminal framing |
| Scope indicator | Expose `All portfolio` or canonical project title in text/accessibility | Shared by transcript and composer |
| Conversation composer | Labeled multiline draft, submit, validation, pending/retry/edit behavior | One behavior family; separate branch instances |
| Transcript | Ordered questions/answers, state/status, scroll restoration | Global and project branches use the same behavior |
| Answer | Synthesis, completion/insufficiency, disclosure, actions | One anatomy across scopes |
| Project reference | Approved project relevance, authored route, scoped-entry action | One and multi-project variants |
| Comparison | Supported dimensions and missing-value disclosure | Optional; only with approved data |
| Evidence preview | Asset/status/project/caption/claim relationship | Shared between answers and authored projects |
| Evidence Viewer | Modal image/video inspection, sequence, source, close/back/focus | Reuses preserved gallery/lightbox behavior after accessibility extraction |
| Source disclosure | Answer-to-source relationships and limitations | Shared complete/partial/insufficient states |
| Discovery modules | Approved starters, project proof, browse path, shortcuts | Leave transcript axis after submission |
| Project shell | Authored narrative, contribution, outcomes, evidence, scoped-chat entry | Existing routes/content remain owner |
| Scoped conversation surface | Project identity, project branch, close/switch actions | Subordinate to project shell |
| Status/recovery notice | Loading, streaming, error, interruption, unavailable recovery | Shared accessible status semantics |
| Reversible secondary surface | Explore/history/sources/comparison where appropriate | One overlay/sheet behavior family |

Design-System gate remains required before UI implementation: reuse an existing neutral primitive, establish a small portfolio-owned repeated primitive, or assess an external system without wholesale adoption.

## 2. Minimum State Inventory

### Global product state

- current logical surface and stable route;
- current scope;
- active global branch reference;
- active project branch reference when in project scope;
- origin locator and return target when available;
- current overlay and trigger.

### Conversation state

- branch identity and scope;
- ordered message/attempt state;
- draft;
- validation state;
- request status: idle, waiting, streaming, complete, insufficient, error, interrupted;
- settled answer disclosure/source state;
- scroll-follow state and last safe anchor.

### Project/evidence state

- canonical project identity and publication eligibility;
- authored route;
- approved surfaced fields;
- evidence item identity, disclosure status, caption/alt, claim boundary;
- selected evidence and sequence;
- project reading position.

### Optional capability state

- recoverable anonymous history;
- answer sharing;
- true cancellation;
- evidence deep links;
- comparison.

Optional state must not be represented as guaranteed until Product/Architecture accepts its lifecycle.

## 3. Named Data Dependencies

| Data required by UI | Minimum fields/decision | Owner |
| --- | --- | --- |
| Identity/purpose | Approved name, descriptor, purpose, grounding wording | Product + Data Quality/Copy |
| Starter/follow-up | Stable ID, approved text, supported scope/coverage | Product + Data Quality |
| Company | Canonical ID, resolved public label/aliases, approved relationships | Data Quality + Product |
| Capability | Canonical ID/label, approved project/task relationships | Data Quality + Product |
| Project | Canonical ID/title/summary/route, publication eligibility, role/contribution/outcome fields | Data Quality + Product |
| Evidence | Asset ID/path/type, project/task relationship, status, alt, caption, claim boundary, provenance, theme variants | Data Quality |
| Source disclosure | Source ID/type/label, answer-claim relationship, availability | Data Quality + answer-layer owner |
| Comparison | Approved dimensions and project values | Product + Data Quality |
| Contact | Active destinations and contextual eligibility | Product |
| Conversation lifecycle | Branch/history/share/cancellation/recovery guarantees | Product + Architecture/Backend |

No current route text, technology tag, metric, alias, or asset becomes trusted merely because it exists.

## 4. Preserved Boundaries

Implementation must preserve:

- `/`;
- `/manifesto`;
- all five existing `/projects/*` routes and stable links;
- all current narratives, outcomes, metadata, project facts, screenshots, videos, theme variants, contact destinations, and 108 canonical non-recovery public files until owner validation authorizes a separate change;
- authored project view as the default project-route experience;
- gallery/fullscreen evidence behavior, theme-aware media behavior, and native browser history baseline;
- unrelated dirty-worktree changes;
- the distinction between trusted canonical content, authored presentation, and generated synthesis.

`RETIRE` authorizes removal from the future active presentation only after replacement behavior is demonstrated. It does not authorize deleting source files or evidence.

## 5. Frontend Functional Acceptance Criteria

### Discovery and conversation

- [ ] `/` opens with identity, purpose, grounding, one primary composer, approved project proof, browse path, and eligible shortcuts in Step 3 order.
- [ ] First accepted submit converts the same root context to Global Conversation without creating a second composer.
- [ ] Empty/invalid submit preserves draft and exposes accessible validation.
- [ ] Waiting reserves stable answer geometry.
- [ ] Streaming never moves focus or announces tokens individually.
- [ ] Complete, insufficient, technical error, and interruption are distinct.
- [ ] Retry preserves exact question; edit creates a new linked attempt.
- [ ] Follow-ups prepare editable drafts and never auto-submit.

### Answer, project, and evidence

- [ ] Answer order follows synthesis → supported relationships/projects → qualified evidence → sources → follow-ups.
- [ ] Generated synthesis, authored project, verified evidence, and contextual media are distinguishable.
- [ ] Project references open existing authored routes and preserve origin.
- [ ] Evidence appears only with approved status, project, caption/alt, and claim/context boundary.
- [ ] Failed media never becomes evidence and does not break answer/project access.
- [ ] Direct project entry opens authored narrative, not project chat.
- [ ] Project chat is explicitly scoped, separate, subordinate, and cannot silently use unrelated projects.

### Navigation and lifecycle

- [ ] Browser Back closes reversible overlays first, then follows actual route history.
- [ ] Return from project/evidence restores the originating semantic element when capability exists and falls back honestly when it does not.
- [ ] Explore portfolio preserves the active branch.
- [ ] Start new conversation creates a clean branch and never masquerades as history deletion.
- [ ] Stable project links are shareable.
- [ ] Answer/history sharing controls are absent until lifecycle guarantees are accepted.
- [ ] Every surface has a truthful exit.

### Responsive and accessibility

- [ ] Wide, medium, and narrow layouts preserve the same semantic order.
- [ ] No essential content/action requires horizontal scrolling.
- [ ] Mobile keyboard and safe areas do not obscure composer/final content.
- [ ] Keyboard-only use covers ask, retry, project, evidence, scope switch, and return.
- [ ] Scope/status/evidence class never rely on color alone.
- [ ] Dialogs trap and restore focus.
- [ ] Live regions announce state changes once, not whole streaming answers.
- [ ] Zoom/reflow, long content, reduced motion, touch targets, and no-horizontal-overflow checks pass.

### Preservation and cleanup

- [ ] Old ASCII/terminal/dossier presentation is absent from the new active path.
- [ ] Mixed owners retain required navigation, fallback, gallery, theme, evidence, and history behavior.
- [ ] No preserved route/content/asset/contact source is deleted without a separately approved owner decision.
- [ ] Any new repeated primitive has one named owner and reuse location.

## 6. Relevant Test Inventory

| Check | Scenario | Required proof |
| --- | --- | --- |
| Source ownership | Active routes/components and old presentation owners | Reachability/dead-code evidence; preserved sources intact |
| Conversation behavior | Every Step 4 settled/pending/recovery state | Browser interaction, accessible status, state preservation |
| Scope integrity | Global vs each project scope | Retrieval/answer boundary evidence plus visible accessible scope |
| Evidence integrity | Verified/contextual/not-ready/missing media | Provenance/status mapping and browser disclosure |
| Navigation | Project/evidence/explore/new/back/direct entry | Browser history, focus and scroll restoration |
| Responsive | Wide, medium, narrow, keyboard-open mobile, zoom | Screenshots plus interaction and no-overflow evidence |
| Accessibility | Keyboard, screen-reader landmarks/live state, dialogs, reduced motion | Browser/accessibility-tree evidence |
| Runtime | Build, console, route hard loads | Build/HTTP/browser proof |

## 7. Conditions Keeping Implementation Open

Frontend implementation remains open, not complete, while any of these hold:

- Frontend must invent a project/publication, evidence-trust, alias, prompt-coverage, comparison, or contact-intent decision.
- A required answer state cannot be distinguished programmatically.
- Project scope is not enforced by the answer/retrieval owner.
- Old mixed owners are deleted before required behavior is extracted.
- Browser Back, overlay close, focus restoration, or mobile keyboard behavior is unverified.
- Unqualified evidence can surface as proof.
- Optional history/sharing/cancellation is represented without accepted lifecycle support.
- Any preserved route, narrative, asset, or contact destination becomes unreachable unintentionally.
- Required wide/medium/mobile, accessibility, build, route, and console checks have not passed.

## 8. Explicit Product And Data-Quality Decisions Before Implementation

Product must reconcile:

- publication eligibility and initial featured/recent project set;
- identity, purpose, grounding, contact, and limitation wording;
- Project Index destination;
- whether theme switching remains in the first slice;
- first-slice inclusion of history, sharing, cancellation, comparison, and project-scoped chat;
- branch/recovery expectations that require Architecture;
- sequencing between Data Quality, Architecture/Backend, visual direction, and Frontend.

Data Quality must provide:

- canonical company/project identities and aliases;
- trusted project, contribution, outcome, and capability rows;
- approved starter/follow-up coverage;
- per-asset evidence status, caption, alt text, claim boundary, and provenance;
- supported comparison dimensions;
- source disclosure mappings.

## Step 9 Exit Evidence

| Criterion | Result | Evidence |
| --- | --- | --- |
| Frontend can estimate without inventing UX behavior | Passed | Component/state inventory and acceptance criteria |
| Data Quality can identify required evidence fields | Passed | Named dependency table |
| Product can route one immediate owner | Passed | Explicit decision and dependency lists |
| Preserved routes/evidence have boundaries | Passed | Preservation contract |
| Implementation-open conditions are explicit | Passed | Ten conditions |
| Visual exploration is separated | Passed | No tokens/style mechanics; Design-System gate remains future work |
| Unverified evidence cannot enter answers silently | Passed | Eligibility and acceptance criteria |

Step 9 is complete. Product accepted the Designer functional UX specification on 2026-07-23. Data Quality is the next active owner; the plan remains unarchived.
