# Chat-First Portfolio Step 2: Cleaned Information Architecture

## Status

Step 2 complete

## Parent Plan

[`docs/plans/active/chat-first-portfolio-ux-cleanup.md`](../plans/active/chat-first-portfolio-ux-cleanup.md)

## Accepted Input

- [`docs/design/chat-first-portfolio-step-1-removal-retention-inventory.md`](chat-first-portfolio-step-1-removal-retention-inventory.md)
- Product reconciliation accepts Step 1.
- Canonical public-file count: 108, consisting of 101 project media files and 7 root assets.
- No application source, route, narrative, metadata, or asset is authorized for deletion.
- Frontend implementation and visual design remain out of scope.

## Owner And Boundary

Owner: `DESIGNER`

Product remains the canonical routing and source-of-truth owner.

This artifact defines logical surfaces, navigation relationships, conversation scopes, addressability expectations, and return-state requirements. It does not commit new route paths, storage behavior, retrieval behavior, session lifetime, visual layout, or implementation architecture.

## Root-Cause Decision

The portfolio needs one navigable system rather than a chat product placed beside an unchanged page-first portfolio.

The system has three connected layers:

1. **Discovery and conversation** help a visitor form and refine an intent.
2. **Browse and authored project views** provide predictable non-chat access and complete narrative.
3. **Evidence and source disclosure** let a visitor inspect what supports an answer or project claim.

Chat never becomes the canonical owner of project truth. Project routes remain the complete authored presentation layer, while trusted portfolio content and evidence remain owned by the accepted canonical content hierarchy.

## Core Information-Architecture Decisions

### Root route before the first question

`/` represents the **Portfolio Discovery surface**.

Its purpose is to let a visitor:

- understand whose portfolio this is;
- ask a global portfolio question;
- choose a supported starting point;
- browse eligible projects without using chat;
- reach manifesto and contact without treating either as a primary competing action.

The root route is not an empty chat transcript and not a conventional page-section index.

### Root route after conversation starts

After the first submitted question, `/` becomes the **Global Portfolio Conversation surface** within the same root-route product context.

The discovery entry state yields to the active transcript but remains recoverable through an explicit new-conversation or discovery-return action. This is a state transition, not a committed new URL.

The global conversation:

- may connect multiple trusted projects;
- may support comparison and cross-project follow-ups;
- may reference authored project routes and qualified evidence;
- cannot become the canonical source of project facts.

### Browse without chat

Traditional browse is always reachable from the root discovery state and from global navigation.

The **Project Index** is a logical surface listing only projects Product and Data Quality have approved for public discovery. Retiring `isActive` does not authorize exposing every project.

Whether the index is:

- a root-route sub-surface;
- a dedicated `/projects` route; or
- another addressable collection

remains a Product routing decision. This artifact commits the surface, not its URL.

### Full project entry

A visitor enters a complete project by following its existing stable `/projects/{slug}` route from:

- the Project Index;
- a project reference inside a global answer;
- a project comparison result;
- a direct/shared project URL;
- another authored project view when project traversal is available.

The project route opens in authored-project mode by default, not project-chat mode.

### Global versus project conversation

Global and project-scoped conversations are separate branches:

- global scope may use any trusted portfolio source allowed by the answer contract;
- project scope may use only the selected project's trusted rows and qualified evidence;
- the authored project route remains the canonical complete narrative in both cases;
- switching scope preserves both branches rather than merging or rewriting them.

### Structurally unambiguous scope

Every conversation surface must have one machine- and visitor-readable scope identity adjacent to the conversation controls and transcript:

- `All portfolio` for global scope;
- `Project: {canonical project title}` for project scope.

Scope identity must be present in structure and accessible naming. It cannot rely on color, styling, route slug, or conversational wording alone.

### Return from a project to the originating answer

When a project is opened from a global answer, navigation carries an ephemeral **origin locator**:

- conversation/session reference when available;
- originating message reference;
- originating project-card or link reference;
- scroll position or scroll anchor;
- previous scope.

Browser Back returns to the global conversation and restores the originating answer/card position.

If a project was entered directly or from an external share, no origin is invented. Its fallback exit is the logical Project Index or root discovery surface.

The storage and lifetime of the origin locator are not defined here.

### Exit from project scope

Project-scoped conversation offers two semantically different exits:

1. **Close project conversation** returns to the authored project view without changing the preserved global conversation.
2. **Switch to All portfolio** returns to the preserved global conversation branch and leaves the project branch recoverable for the current session if lifecycle support is later accepted.

Neither exit deletes the other conversation branch.

### Evidence opening and closing

Evidence opens from an answer or authored project as an **Evidence Viewer** layered over its originating surface.

The viewer:

- keeps the originating answer/project underneath in navigation state;
- identifies the associated project and evidence context;
- closes back to the exact originating trigger;
- uses Browser Back to close before leaving the underlying surface;
- never requires the visitor to navigate through an unscoped dead-end asset page.

Whether individual evidence items receive stable share URLs is deferred.

### Manifesto and contact reachability

Manifesto remains a stable secondary authored route at `/manifesto`.

Contact remains a secondary utility surface/action reachable from:

- global navigation;
- root discovery;
- authored project endings where relevant;
- contextually appropriate answer states.

Manifesto and contact do not occupy the primary question-action position.

No dedicated contact URL is committed by this artifact. Existing contact destinations and the current root contact anchor remain preserved until Product chooses the future surface.

### Insufficient-evidence routing

An insufficient-evidence answer remains inside its current conversation scope and offers only safe next actions:

- revise or narrow the question;
- return to supported starter questions for that scope;
- open a relevant public project only when the relationship is already trusted;
- inspect available qualified sources;
- switch from project scope to `All portfolio` when the limitation is project-specific;
- browse the approved Project Index.

It must not fabricate a project recommendation, expose an unapproved project, or use contact as a substitute for missing evidence.

## 1. Route-And-Surface Map

```text
/
└── Portfolio Root Context
    ├── Initial Discovery [root state, stable existing URL]
    │   ├── Start Global Conversation
    │   ├── Open Project Index [logical surface; URL not committed]
    │   ├── Open approved project [existing stable project URL]
    │   ├── Open Manifesto [existing stable URL]
    │   └── Reach Contact [logical utility surface; URL not committed]
    │
    └── Global Portfolio Conversation [root state; answer URL model unresolved]
        ├── Continue global thread
        ├── Open approved project reference [existing stable project URL]
        ├── Open Evidence Viewer [ephemeral overlay by default]
        ├── Open Project Index
        ├── Open shared answer [stable address required only if sharing ships]
        ├── Start new conversation / return to discovery
        ├── Open Manifesto
        └── Reach Contact

Project Index [logical surface; committed URL: none]
├── Open approved project [existing stable project URL]
├── Return to root discovery or global conversation
├── Open Manifesto
└── Reach Contact

/projects/{existing-slug}
└── Full Authored Project View [stable existing URL]
    ├── Read complete narrative
    ├── Open Evidence Viewer
    ├── Start Project-Scoped Conversation [logical sub-surface]
    ├── Return to originating global answer when origin exists
    ├── Return to Project Index when no origin exists
    └── Reach Contact

Project-Scoped Conversation [logical project sub-surface; committed URL: none]
├── Continue project-only branch
├── Open project evidence
├── Close to Full Authored Project View
└── Switch to preserved All-Portfolio Conversation

Evidence Viewer [ephemeral overlay by default; committed URL: none]
├── Inspect qualified image/video and source context
├── Previous/next within originating evidence set
└── Close/Back to exact originating trigger

Shareable Project State
└── Existing /projects/{slug} URL

Shareable Answer State [logical surface; committed URL: none]
├── Open answer with disclosed context if lifecycle support is accepted
├── Open cited project routes
└── Fall back honestly when live conversation state cannot be reconstructed

/manifesto
└── Authored Manifesto [stable existing URL]
    ├── Return to previous surface
    ├── Return to root
    └── Reach Contact

Contact [logical utility surface; committed URL: none]
├── Use preserved contact destination
└── Return to originating surface
```

## 2. Surface Ownership Table

| Surface | Visitor purpose | Primary action | Secondary actions | Conversation scope | Relationship to canonical content/evidence | Entry points | Exit points | Addressability expectation | State preserved on leave/return | Structural desktop/mobile implications |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Initial Discovery | Understand Ivan's portfolio and choose how to explore | Ask a global portfolio question | Browse projects; choose supported prompt; manifesto; contact | Global, no transcript required yet | Shows only trusted/approved summaries and links; owns no project truth | `/`, home/global navigation, new-conversation/discovery action | Global conversation, Project Index, project route, manifesto, contact | Stable at existing `/`; discovery substate need not have a separate URL | Unsaved root draft if lifecycle permits; no transcript required | Desktop may expose browse and question paths concurrently; mobile keeps both in one reading order. Exact layout is Step 3 |
| Global Portfolio Conversation | Explore work across projects through grounded questions | Ask or continue a global question | Open projects/evidence; browse; share if supported; new conversation; manifesto/contact | `All portfolio` | Synthesizes only from trusted corpus; cites project routes/evidence; never owns canonical facts | Submit from discovery; restore accepted session/share | Project view, evidence viewer, Project Index, discovery/new conversation, manifesto/contact | May remain at `/` during a live session; stable answer URL required only if shareable answers ship | Global transcript, draft, active message, scroll/origin locators | Desktop may keep browse aids adjacent; mobile presents a single transcript stack. Scope must remain structurally visible |
| Project Index | Browse approved public projects without chat | Open a complete project | Return to conversation/discovery; manifesto/contact | None; may retain a dormant global conversation in session | Reads approved project summaries from canonical project data; does not author new facts | Root discovery, global navigation, conversation safe action, project fallback exit | Project route, previous surface, root, manifesto/contact | Logical surface required; new URL not committed | Previous surface and global conversation remain preserved when index is opened from them | Desktop may support denser scanning; mobile remains a linear list. Publication eligibility is data, not layout |
| Full Authored Project View | Read the complete authored case study and inspect evidence | Read/continue through project narrative | Open evidence; start project conversation; return to origin/index; contact | No active chat scope by default | Existing route remains canonical authored evidence presentation; trusted corpus references it | Project Index, global answer card, comparison, project traversal, direct/shared URL | Originating answer, Project Index/root fallback, project conversation, evidence, contact | Existing stable `/projects/{slug}` | Origin locator when entered from conversation; project reading position when temporarily opening evidence/chat | Desktop/mobile must preserve narrative before optional scoped chat; no chat-first takeover of direct project entry |
| Project-Scoped Conversation | Ask follow-ups limited to one selected project | Ask a project-only question | Open project evidence; close to project; switch to All portfolio | `Project: {canonical title}` | Uses only selected-project trusted rows/evidence; authored route remains full narrative owner | Explicit action from authored project or project reference | Full project view; preserved global conversation; evidence | Logical sub-surface; no committed new URL | Project branch, project draft, project reading origin; global transcript remains untouched | Scope identity must remain adjacent to transcript/composer on all widths; exact placement is later work |
| Evidence Viewer | Inspect image/video and its source context without losing origin | Inspect the selected evidence | Previous/next; source disclosure; close | Inherits origin scope but is not itself a conversation | Displays qualified canonical asset plus project/task relationship; does not upgrade trust | Answer evidence trigger, authored project gallery/demo | Exact trigger on answer/project; Back closes viewer first | Ephemeral overlay by default; evidence deep-link URL deferred | Underlying route, transcript, scroll, selected trigger, evidence-set position | Desktop may overlay within wide viewport; mobile may use full-screen presentation. Both remain reversible |
| Shareable Project State | Let another visitor open the complete project | Read the authored project | Open evidence; browse; manifesto/contact; start scoped chat if available | None by default | Existing route and authored content are the source | Copied/shared project URL, external links | Normal browser navigation to root/index/previous page | Existing project URL is stable | No private session is required; direct entry must work independently | Same authored IA across widths |
| Shareable Answer State | Let another visitor inspect an answer with its scope and citations | Read disclosed answer state | Open cited projects/evidence; start own conversation if allowed | Must declare global or project scope | Snapshot/live answer may reference canonical sources but is not canonical truth | Shared answer link if feature is accepted | Cited projects, root discovery, previous browser location | Stable address required if feature ships; URL and lifecycle are not committed | Answer scope, answer content/version, citations required; private draft/history must not leak | Must remain understandable without the sender's surrounding private transcript |
| Manifesto | Read Ivan's authored principles | Read manifesto | Return to previous surface/root; contact | None | Preserved authored content and stable route; not evidence for project claims unless separately classified | Global navigation, discovery, project/global secondary navigation, direct URL | Browser Back, root, contact | Existing stable `/manifesto` | Previous surface and conversation state must remain preserved | Same authored reading hierarchy on all widths; no competition with primary question action |
| Contact | Reach Ivan through a preserved destination | Choose a contact method | Return to origin | None | Uses preserved contact destinations; does not own project truth | Global navigation, discovery, project ending, appropriate answer, manifesto | External contact destination or return to origin | Logical utility surface; new route not committed; external destinations remain addressable | Origin surface and conversation/project state remain preserved | Desktop/mobile differences are limited to reachability; exact CTA presentation is later work |

### Truth ownership rule

No surface in this table duplicates project truth:

- trusted normalized project truth belongs to the accepted canonical content layer;
- authored complete project presentation belongs to existing project routes;
- canonical asset files belong to `public/*`;
- global/project answers are ephemeral synthesis;
- Project Index and project cards are projections of approved canonical project data;
- Evidence Viewer displays qualified canonical assets and relationships but does not assign trust.

## 3. Entry/Exit Transition Map

| From | Trigger | To | Exit or reverse path | Required preserved state | Addressability note |
| --- | --- | --- | --- | --- | --- |
| Initial Discovery | Submit question | Global Conversation | New conversation/discovery return | Submitted question; root draft handling defined later | Same `/` state by default |
| Initial Discovery | Browse projects | Project Index | Back/root | Discovery position and draft if present | Project Index URL uncommitted |
| Initial Discovery | Open approved project | Full Project View | Back to discovery | Discovery position and any draft | Existing project URL |
| Global Conversation | Open project reference | Full Project View | Browser Back or explicit return to originating answer | Global transcript; message/card anchor; scroll; previous scope | Existing project URL plus ephemeral origin locator |
| Global Conversation | Open evidence | Evidence Viewer | Close, Escape, or Browser Back | Transcript; answer/card trigger; evidence-set position | Overlay by default |
| Global Conversation | Browse projects | Project Index | Back to same conversation position | Global transcript, draft, scroll | Index URL uncommitted |
| Global Conversation | Open manifesto/contact | Manifesto/Contact | Back/return to conversation | Transcript, draft, scroll | Manifesto stable; contact surface URL uncommitted |
| Project Index | Open approved project | Full Project View | Back to same index position | Filter/selection only if later accepted; scroll position | Existing project URL |
| Full Project View | Open evidence | Evidence Viewer | Close/Back to exact project trigger | Project route and reading position | Overlay by default |
| Full Project View | Ask about this project | Project-Scoped Conversation | Close to project or switch to All portfolio | Project route; reading origin; project draft/branch; global branch untouched | Scoped-chat URL uncommitted |
| Project-Scoped Conversation | Close project conversation | Full Project View | Reopen scoped branch if session lifecycle supports it | Project branch/draft; project reading position | Same project context |
| Project-Scoped Conversation | Switch to All portfolio | Global Conversation | Return to project/branch through normal navigation if supported | Both conversation branches and prior positions | Global root state by default |
| Any answer/project | Share project | Shareable Project State | Normal browser navigation | No private conversation required | Existing project URL |
| Any answer | Share answer | Shareable Answer State | Cited project/root/back | Scope, answer snapshot/version, citations; exclude private unsent state | Requires stable URL if feature ships; unresolved |
| Any conversation | Insufficient evidence | Same conversation plus safe exits | Revise, supported prompt, approved browse, qualified source, scope switch | Original question and limitation state | No new route required |
| Manifesto | Back/root/contact | Previous/root/contact | Normal reverse path | Previous conversation/project state | Existing `/manifesto` |
| Contact | Select destination or return | External destination/origin | Browser Back or explicit return | Originating surface state | Existing external destination |

## 4. Global-Versus-Project Conversation-Scope Contract

| Contract dimension | Global portfolio conversation | Project-scoped conversation |
| --- | --- | --- |
| Structural scope identifier | `All portfolio` | `Project: {canonical project title}` |
| Allowed corpus boundary | Any Product-approved trusted portfolio source | Trusted rows/evidence belonging to the selected project only |
| Cross-project comparison | Allowed when supported by trusted data | Not allowed without explicit switch to global scope |
| Project recommendations | Only approved public projects with trusted relevance | Current project only; unrelated projects cannot appear |
| Evidence | May cite qualified evidence across relevant projects | May cite qualified evidence from selected project only |
| Authored project narrative | Linked as complete source; not copied into canonical answer truth | Current authored route remains complete source |
| Transcript ownership | Global conversation branch | Separate per-project branch |
| Draft ownership | Global draft | Separate draft for selected project |
| Entry | Submit from root discovery or restore accepted global state | Explicit action from project context/reference |
| Exit | New conversation, discovery, browse, project, manifesto/contact | Close to authored project or switch to preserved global branch |
| Scope switch effect | Entering a project does not mutate global history | Exiting does not merge scoped messages into global history |
| Insufficient evidence | Offer broader safe browse/questions within approved portfolio | Offer project-specific revision, qualified project evidence, or explicit switch to All portfolio |
| Direct/shared entry | Must identify global scope and disclosed answer context | Must identify project scope and project; private global history is not assumed |

Scope identity is a structural contract, not a visual styling instruction.

## 5. Browser Navigation And Return-State Contract

### Navigation priority

Browser Back resolves the most local reversible state first:

1. close an open Evidence Viewer and return focus/position to its trigger;
2. reverse a project-conversation substate transition when that transition created history;
3. leave the full project route for its real browser-history origin;
4. leave Project Index, manifesto, or contact for the real previous surface;
5. follow normal browser history.

No fake originating answer is created for direct project visits.

### Required return-state envelope

When navigation begins inside the portfolio session, the product must be capable of preserving:

- previous logical surface;
- previous conversation scope;
- conversation/session reference when supported;
- originating message and trigger references;
- root or project draft;
- transcript position;
- project reading position;
- Project Index position;
- selected evidence item and evidence-set position;
- active overlay state;
- whether entry was internal, direct, or external.

This is a functional state requirement, not a storage or persistence design.

### Return cases

| Case | Expected Back/return result |
| --- | --- |
| Global answer → project | Restore global transcript to originating answer/project card |
| Global answer → evidence | Close viewer and restore answer trigger |
| Project → evidence | Close viewer and restore project reading position/trigger |
| Project → scoped conversation → close | Restore authored project reading context |
| Project scope → All portfolio | Restore global transcript; project branch remains separate if session lifecycle permits |
| Project Index → project | Restore Project Index position |
| Direct/shared project entry | Use real browser history; explicit portfolio exit falls back to Project Index/root |
| Manifesto from conversation | Back restores conversation state |
| Contact from project/conversation | Return restores originating state; external destination follows browser behavior |
| Shared answer entry | Back follows actual external/browser origin; internal actions never assume sender's private history |

### URL expectations

Must remain stable:

- `/`;
- `/manifesto`;
- all five existing `/projects/{slug}` routes.

Must receive a stable URL only if the corresponding feature ships:

- shareable answer state.

May remain ephemeral:

- initial versus active root substate during a live session;
- unsent drafts;
- project-scoped conversation substate;
- Evidence Viewer state;
- selected source disclosure;
- origin locator;
- scroll positions.

Unresolved:

- Project Index URL;
- Contact route versus root utility surface;
- evidence deep links;
- session/conversation URLs;
- project-scoped conversation URLs;
- answer snapshot URL format and lifecycle.

## 6. Preserved Existing Routes

The following routes remain addressable and are not authorized for removal or renaming:

- `/`;
- `/manifesto`;
- `/projects/taxi-aggregator-support-workspace`;
- `/projects/ds-hito`;
- `/projects/litres`;
- `/projects/peruse`;
- `/projects/wrike`.

Existing route preservation does not assert publication readiness for every project in the Project Index or global-answer discovery.

## 7. Proposed New Logical Surfaces

These are required product surfaces, not committed implementation routes:

| Logical surface | Required? | Committed new URL? | Functional note |
| --- | --- | --- | --- |
| Initial Discovery | Yes | No; uses existing `/` context | Root state before first question |
| Global Portfolio Conversation | Yes | No; uses existing `/` context by default | Root state after conversation starts |
| Project Index | Yes | No | Enables non-chat browse of approved projects |
| Project-Scoped Conversation | Yes | No | Separate project-only branch associated with a project |
| Evidence Viewer | Yes | No | Reversible viewer over originating surface |
| Shareable Project State | Yes | No new URL; existing project routes | Stable authored project share |
| Shareable Answer State | Product option in supporting behavior; contract defined | No | Requires stable address only if accepted and shipped |
| Contact utility surface | Yes | No | Existing destinations preserved; route form unresolved |

Manifesto and full project views are preserved existing routes, not new logical-route proposals.

## 8. Dependency And Unresolved-Decision Table

| Decision or dependency | Why Step 2 cannot resolve it | Required owner | IA boundary meanwhile |
| --- | --- | --- | --- |
| Which projects appear in Project Index, featured/recent groups, answers, or comparison | Retiring `isActive` does not establish publication readiness | Product + Data Quality | Surface shows only explicitly approved projects |
| Project Index URL | Commits route architecture and navigation ownership | Product; Architecture advises | Treat as logical addressable-capable surface |
| Contact route versus root utility surface | Commits product routing and CTA lifecycle | Product | Preserve existing anchor/destinations; no new URL |
| Stable conversation/session URL | Depends on lifecycle and persistence | Product + Architecture; Backend only if needed | Live global state may remain ephemeral at `/` |
| Shareable answer snapshot/live model and expiry | Requires product, privacy, versioning, and persistence decisions | Product + Architecture + Backend if needed | A shipped share feature must disclose scope and citations |
| Evidence deep-link URL | Requires asset identity and lifecycle decisions | Product + Architecture + Data Quality | Evidence Viewer remains reversible overlay |
| Project-scoped conversation URL | Requires session and route-state decision | Product + Architecture | Treat as logical sub-surface only |
| Conversation/history retention | Requires lifecycle, privacy, and storage decisions | Product + Architecture; Backend if needed | IA requires branch separation, not durable persistence |
| Origin-locator implementation/lifetime | Requires route/session mechanics | Architecture | IA defines required return result only |
| Project and company aliases | Canonical identity is unresolved | Data Quality + Product | Use only accepted canonical display identity when available |
| Evidence trust and claim-to-asset mapping | File presence and route use are not trust proof | Data Quality | Viewer and answers surface only qualified evidence |
| Supported starter questions and insufficient-evidence alternatives | Depend on trusted answer coverage | Data Quality + Product | IA provides slots/actions without inventing questions |
| Project comparison dimensions | Requires trusted comparable fields | Data Quality + Product | Comparison remains a global-scope capability only |
| Canonical metadata ownership | Current route coverage is inconsistent | Architecture + Data Quality | Preserve existing metadata and routes |
| Theme behavior, tokens, typography, motion, or visual layout | Visual design remains out of scope | Designer/Design System in later accepted work | No visual choice is implied by this IA |
| Whether project section tabs remain | Requires later project-view hierarchy work | Designer in later plan step | All authored sections remain reachable |
| Contact destination availability and CTA priority | Requires current owner confirmation and product intent | Product | Preserve destinations without elevating contact above question flow |

## 9. Step 2 Exit-Evidence Validation

| Active-plan exit criterion | Result | Evidence |
| --- | --- | --- |
| One route-and-surface map | Passed | Route-And-Surface Map |
| No duplicated owner for project truth | Passed | Truth ownership rule and Surface Ownership Table |
| Chat, browsing, and project evidence form one navigable system | Passed | Route map and Entry/Exit Transition Map |
| Visitor cannot enter project scope without seeing scope change | Passed | Scope identifier and scope contract |
| Visitor can browse without chat | Passed | Initial Discovery → Project Index path |
| Project routes are not treated as disposable | Passed | Preserved Existing Routes and Full Authored Project View |
| Every surface has purpose, actions, scope, evidence relationship, entry, exit, URL, Back, and return state | Passed | Surface Ownership Table |
| Browser Back and return-state expectations are explicit | Passed | Browser Navigation And Return-State Contract |
| New logical surfaces are not falsely committed as routes | Passed | Proposed New Logical Surfaces |
| Lifecycle and data questions are routed, not guessed | Passed | Dependency And Unresolved-Decision Table |
| No project is exposed merely because `isActive` is retired | Passed | Project Index eligibility boundary |
| Manifesto and contact remain reachable without competing with primary question flow | Passed | Root decisions, route map, surface table |
| Insufficient-evidence state has safe exits | Passed | Insufficient-evidence routing and transition map |

Step 2 is complete. Steps 3–9 were subsequently completed and accepted through Product reconciliation.
