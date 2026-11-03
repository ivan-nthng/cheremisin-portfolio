# Chat-First Portfolio Step 3: Initial Discovery Hierarchy

## Status

Step 3 complete

## Parent Plan

[`docs/plans/active/chat-first-portfolio-ux-cleanup.md`](../plans/active/chat-first-portfolio-ux-cleanup.md)

## Accepted Inputs

- [`docs/design/chat-first-portfolio-step-1-removal-retention-inventory.md`](chat-first-portfolio-step-1-removal-retention-inventory.md)
- [`docs/design/chat-first-portfolio-step-2-information-architecture.md`](chat-first-portfolio-step-2-information-architecture.md)
- Product accepts Step 2.
- `/` is Initial Discovery before the first submitted question.
- The same root context becomes Global Portfolio Conversation after the first question.
- Project Index is required, but no new URL is committed.
- Existing project routes remain stable authored case studies.
- Global and project-scoped conversations remain separate branches.
- Frontend implementation and visual design remain out of scope.

## Owner And Boundary

Owner: `DESIGNER`

Product remains the canonical routing and source-of-truth owner.

This artifact defines only the content hierarchy and action hierarchy of Initial Discovery and its immediate transition into an active global conversation. It does not define later answer, streaming, error, history, or conversation-state behavior owned by Step 4.

No actual starter question, capability label, company identity, featured-project eligibility, metric, or evidence status is approved in this artifact.

## Root-Cause Decision

The initial surface cannot behave like either:

- a decorative portfolio hero with chat added below it; or
- an empty generic chatbot waiting for the visitor to invent the right question.

Before interaction, the visitor needs three things in order:

1. orientation: who Ivan is and what this portfolio helps them discover;
2. one clear action: ask a global portfolio question;
3. credible alternatives and proof: approved question starters, approved projects, shortcuts, and traditional browse.

After submission, the same modules must stop competing with the active transcript. They remain reachable through explicit discovery and browse actions rather than continuing as equal blocks in the conversation axis.

## Primary Action Decision

The single primary action is:

**Submit a question in the global portfolio input.**

Everything else is secondary:

- starter questions and shortcuts help prepare the input;
- featured/recent projects and Project Index support non-chat browse;
- manifesto and contact are secondary destinations;
- grounding explanation establishes trust but is not an action.

Selecting a starter, capability, or company shortcut does not automatically submit. It updates or prepares an editable question draft, places focus in the input, and leaves submission as the visitor's explicit primary action.

Opening a project is a direct browse action and does not rewrite the question draft.

## 1. Initial-Discovery Hierarchy

| Order | Element | Visitor need | Information priority | Action priority | Required content/data | Eligibility rule | Before input | After conversation begins | Desktop order | Mobile order | Accessibility/focus implication |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Global orientation and identity | Know whose portfolio this is | Highest orientation | None | Approved display name; approved professional descriptor | Product-approved identity; factual descriptor must be trusted | Always present before the input | Remains in compact global orientation; full introductory copy leaves the transcript axis | 1 | 1 | Must be real text and a clear page heading; not encoded only in logo/art |
| 2 | Concise portfolio-purpose statement | Understand what can be discovered here | Highest orientation | None | One concise statement describing the supported portfolio-discovery purpose | Every capability or work-domain claim requires Product/Data Quality approval | Always present; no decorative hero expansion | Collapses or moves to optional discovery information after submission | 2 | 2 | Associated with the page heading and input context; concise enough not to delay input |
| 3 | Grounding explanation | Know this is portfolio-grounded, not a generic chatbot | High trust | Optional source-explanation disclosure only | Required semantics: answers use portfolio materials; relevant projects/evidence are linked when available; unsupported questions may receive an insufficient-evidence response; synthesis is not canonical truth | Always shown in concise form; detailed disclosure may exist only if Product approves content | Visible adjacent in meaning to the input before submission | Condenses to persistent trust/source affordance outside the transcript flow | 3 | 3 | Must be perceivable before submission and programmatically associated with the input using description/help relationship |
| 4 | Primary global question input | Ask about Ivan's work | Highest action | Primary | Visible label; scope identity `All portfolio`; editable draft; submit action; neutral guidance that does not promise unsupported topics | Always eligible; placeholder/help wording must not claim unverified coverage | Empty or restored draft; submit unavailable for invalid empty input | Becomes the global conversation composer without creating a second competing input | 4 | 4 | Earliest main-content interactive control; no forced autofocus; label cannot rely on placeholder; Enter behavior is Step 4 |
| 5 | Supported starter-question slots | Understand safe, answerable ways to begin | Medium guidance | Secondary input-assist | Approved question text; coverage status; optional category; stable question identity | Show only questions Product and Data Quality mark supported for the current public corpus; omit the group if none are approved | Selection copies approved text into the editable input and focuses it; no auto-submit | Removed from main transcript axis; recoverable through Explore portfolio or an approved prompt-help action | 5 | 5 | Each item is a button with full accessible name; draft change is announced without triggering submission |
| 6 | Featured or recent approved projects | See proof of real work before asking | High evidence | Secondary browse | Approved project ID; canonical title; approved summary; stable route; approved preview reference if available; display reason/type such as featured or recent only when Product defines it | Product approves publication/discovery; Data Quality approves surfaced fields; route remains stable; no inference from retired `isActive` | Visible as direct proof and opens authored project; does not modify input | Moves out of transcript axis into secondary portfolio exploration; projects relevant to answers are handled later, not by this initial module | 6 | 6 | Project title and purpose must be text; card/link has one clear route action; absence of preview cannot remove route access |
| 7 | Browse-all-projects path | Explore without using chat | High alternative path | Secondary browse | Label and destination for logical Project Index; approved availability state | Always present as a path even if the approved index contains few projects; no `/projects` URL assumed | Opens Project Index logical surface; preserves any input draft when lifecycle support exists | Remains reachable from global navigation or Explore portfolio, not as a competing transcript block | 7 | 7 | Must be a semantic link/action distinct from submit; accessible name must indicate browsing, not asking |
| 8 | Capability shortcut slots | Form a question around an approved capability | Medium guidance | Tertiary input-assist | Canonical capability ID; approved visitor label; supported coverage indicator or eligible project count only if trusted; draft transformation text/rule | Capability is canonical, publicly supported, and connected to at least one approved project/task with sufficient answer coverage | Selection prepares an editable capability-scoped draft and focuses input; no auto-submit | Leaves transcript axis; recoverable through Explore portfolio/prompt assistance | 8 | 8 | Must announce its effect, such as preparing a question; cannot masquerade as a navigation link if it edits the draft |
| 9 | Company shortcut slots | Form a question around an approved company context | Medium guidance | Tertiary input-assist | Canonical company ID; resolved approved display label; supported coverage indicator; draft transformation text/rule | Alias is resolved; company is public; at least one approved project/task has sufficient answer coverage | Selection prepares an editable company-scoped draft and focuses input; no auto-submit | Leaves transcript axis; recoverable through Explore portfolio/prompt assistance | 9 | 9 | Same control semantics as capability shortcuts; unresolved aliases are omitted, not shown provisionally |
| 10 | Manifesto destination | Read authored working principles | Low secondary navigation | Secondary destination | Stable `/manifesto` route and approved label | Existing stable route remains available | Reachable from global secondary navigation; not repeated as a primary CTA near input | Remains in global secondary navigation | 10 | 10 | Semantic link; must not appear before the primary input in main-content focus order unless part of global navigation |
| 11 | Contact destination | Reach Ivan intentionally | Low secondary utility | Secondary destination | Product-confirmed contact destinations; optional contact-surface label | Destination is current and Product-approved; no assumption that every preserved destination is active | Reachable from global secondary navigation or the end of discovery content | Remains reachable globally; later contextual answer CTAs are outside Step 3 | 11 | 11 | External destination behavior must be disclosed where relevant; not the default response to missing evidence |

### Hierarchy summary

```text
Orientation
├── Ivan identity
├── Portfolio purpose
└── Grounding explanation

Primary question path
├── All-portfolio input
└── Supported starter questions

Proof and non-chat browse
├── Approved featured/recent projects
└── Browse all projects

Question-refinement shortcuts
├── Approved capabilities
└── Approved companies

Secondary destinations
├── Manifesto
└── Contact
```

The order describes information and DOM priority, not styling, columns, dimensions, or visual treatment.

## 2. Primary-Versus-Secondary Action Matrix

| Action | Priority | Effect | Competes with input? | Submission behavior | Eligibility |
| --- | --- | --- | --- | --- | --- |
| Submit global portfolio question | Primary | Transitions `/` from Initial Discovery to Global Portfolio Conversation | It is the reference action; no equal primary CTA exists | Explicit submit | Valid non-empty visitor draft; detailed validation belongs to Step 4 |
| Select approved starter question | Secondary input-assist | Copies an approved question into the editable input and focuses it | No; it serves the input | Never auto-submits | Product/Data Quality-approved supported question |
| Open approved featured/recent project | Secondary browse | Opens stable authored project route | No; it is grouped as proof/browse, not inside the composer | No submission | Product-approved public discovery plus trusted surfaced fields |
| Browse all projects | Secondary browse | Opens logical Project Index | No; it is an explicit alternative path | No submission | Always reachable; index contents remain approval-gated |
| Select capability shortcut | Tertiary input-assist | Prepares an editable capability-scoped draft | No; it serves the input | Never auto-submits | Canonical and supported capability with adequate approved coverage |
| Select company shortcut | Tertiary input-assist | Prepares an editable company-scoped draft | No; it serves the input | Never auto-submits | Resolved public company identity with adequate approved coverage |
| Open grounding/source explanation | Tertiary trust action | Explains corpus grounding and limitations | No | No submission | Optional disclosure only after Product approves content |
| Open manifesto | Secondary destination | Opens stable authored manifesto route | No; held in global secondary navigation | No submission | Existing route |
| Open contact | Secondary utility | Opens approved contact surface/destination | No; held in global secondary navigation | No submission | Product-confirmed destination |
| Explore portfolio during conversation | Secondary recovery/navigation | Reveals discovery/browse modules without clearing current conversation | No; appears outside answer action hierarchy | No submission | Active conversation |
| Start new conversation | Secondary conversation action | Returns to clean Initial Discovery and prepares a new global branch | No | No immediate submission | Active conversation; lifecycle behavior requires Product decision |

## 3. Desktop Content Order

Desktop structural order:

1. Global navigation with identity/home orientation and secondary manifesto/contact access.
2. Main heading containing Ivan's approved identity.
3. Concise portfolio-purpose statement.
4. Concise grounding explanation.
5. Global scope identity and primary question input.
6. Supported starter-question group, when eligible.
7. Approved featured/recent project proof.
8. Browse-all-projects path.
9. Approved capability shortcuts, when eligible.
10. Approved company shortcuts, when eligible.
11. Secondary manifesto/contact reachability at the end of discovery as needed, without duplicating primary emphasis.

Desktop may place related secondary regions beside one another only if:

- DOM and reading order remain the sequence above;
- the input remains the first main-content action;
- project browse is clearly an alternative path rather than a second primary CTA;
- shortcut groups remain visibly and semantically attached to question preparation;
- project proof remains perceivable without requiring a submitted question.

No column count, width, spacing, or visual composition is specified here.

## 4. Mobile Content Order

Mobile uses one linear content order:

1. Global navigation.
2. Ivan identity.
3. Portfolio-purpose statement.
4. Grounding explanation.
5. `All portfolio` scope identity.
6. Primary question input and submit action.
7. Supported starter questions, when eligible.
8. Approved featured/recent projects.
9. Browse-all-projects path.
10. Approved capability shortcuts, when eligible.
11. Approved company shortcuts, when eligible.
12. Secondary manifesto and contact access.

Mobile requirements at the IA level:

- no secondary module may be moved ahead of the input;
- horizontal presentation, carousel behavior, clipping, or drawer treatment is not implied;
- all project proof and browse actions remain reachable without submitting;
- the same data eligibility rules apply as desktop;
- shortcut activation returns focus to the input without disorienting scroll changes.

## 5. Pre-Question-To-Conversation Transition Contract

### Before submission

- Root context is `Initial Discovery`.
- Conversation scope is `All portfolio`.
- Identity, purpose, grounding explanation, input, approved starters, approved project proof, browse path, approved shortcuts, manifesto, and contact are reachable.
- The question input is the only primary action.

### Immediately after valid submission

- The same `/` context changes to `Global Portfolio Conversation`.
- The submitted question enters the conversation axis.
- The primary input becomes the ongoing global composer; a duplicate input is not created.
- Full identity/purpose/discovery modules leave the conversation axis.
- The transcript becomes the main content region.
- A compact global identity, `All portfolio` scope identity, grounding/source access, Explore portfolio, new-conversation access, manifesto, contact, and Project Index access remain reachable.
- Featured/recent modules and shortcut groups do not remain between the submitted question and its answer.
- Detailed loading/streaming behavior is deferred to Step 4.

### After the first answer is available

- The transcript remains the main content region.
- Initial discovery modules stay removed from the transcript axis.
- `Explore portfolio` intentionally reveals or navigates to the preserved discovery/browse context without clearing the active conversation.
- `Start new conversation` intentionally returns to a clean Initial Discovery state for a new global branch.
- Project references that belong to the answer are governed by later answer hierarchy work, not by the initial featured/recent module.
- Detailed answer actions, follow-ups, and history behavior remain outside Step 3.

### Return-to-discovery distinction

`Explore portfolio` and `Start new conversation` are not synonyms:

- **Explore portfolio** preserves the active global branch and gives access to approved projects, shortcuts, and secondary destinations.
- **Start new conversation** prepares a clean initial state and must not silently destroy a branch that Product later decides should remain recoverable.

The retention, confirmation, and persistence mechanics of starting a new conversation are unresolved lifecycle decisions.

## 6. Visibility And Collapse Matrix

| Element | Initial Discovery | Immediately after submission | After first answer | Intentional discovery return | Start new conversation |
| --- | --- | --- | --- | --- | --- |
| Global identity/home orientation | Full orientation | Compact persistent orientation | Compact persistent orientation | Full orientation | Full orientation |
| Portfolio-purpose statement | Visible | Removed from transcript axis; optional discovery info | Collapsed/moved to discovery info | Visible | Visible |
| Grounding explanation | Concise visible statement | Compact source/grounding access remains | Compact source/grounding access remains | Concise visible statement | Concise visible statement |
| Global input/composer | Primary input | Same control role becomes ongoing composer | Ongoing composer | Active conversation remains preserved; composer availability depends on chosen discovery-return presentation | Clean primary input |
| Supported starter questions | Visible only when approved | Removed from transcript axis | Available only through Explore portfolio/prompt assistance | Visible when approved | Visible when approved |
| Featured/recent projects | Visible only when approved | Removed from transcript axis | Available through Explore portfolio/Project Index; answer-specific references are separate | Visible when approved | Visible when approved |
| Browse-all-projects path | Visible | Remains globally reachable outside transcript | Remains globally reachable | Visible | Visible |
| Capability shortcuts | Visible only when approved | Removed from transcript axis | Available through Explore portfolio/prompt assistance | Visible when approved | Visible when approved |
| Company shortcuts | Visible only when approved | Removed from transcript axis | Available through Explore portfolio/prompt assistance | Visible when approved | Visible when approved |
| Manifesto | Secondary reachable | Secondary reachable | Secondary reachable | Secondary reachable | Secondary reachable |
| Contact | Secondary reachable | Secondary reachable | Secondary reachable | Secondary reachable | Secondary reachable |
| Explore portfolio | Not required | Reachable once conversation is active | Reachable | Becomes return-to-conversation path while discovery is open | Not required until new branch becomes active |
| Start new conversation | Not required | Reachable as secondary action | Reachable as secondary action | Reachable | Current state |
| Transcript | Absent | Becomes main content region | Main content region | Preserved outside the discovery axis | Empty/new branch |

`Removed from transcript axis` means the module no longer competes with the active question and answer. It does not authorize deleting its data or making it unreachable.

## 7. Data Dependency And Eligibility Table

| Element/data slot | Required fields | Eligibility gate | Fallback when no eligible data | Required owner |
| --- | --- | --- | --- | --- |
| Ivan identity | Approved display name; approved professional descriptor | Product approves; factual descriptor is trusted | Show approved name only; do not invent descriptor | Product + Data Quality/Copy |
| Portfolio-purpose statement | Approved concise statement; supported discovery boundary | Every work-domain claim is trusted and current | Use a narrower Product-approved purpose statement | Product + Data Quality/Copy |
| Input guidance | Label; global scope identity; neutral help; validation copy later | Must not promise unsupported coverage | Use generic action guidance limited to asking about portfolio materials | Product + Data Quality |
| Grounding explanation | Corpus-grounding statement; source-link behavior statement; insufficient-evidence expectation; synthesis disclaimer | Product accepts wording and Data Quality confirms truth boundary | Show only minimal accurate statement that answers use approved portfolio materials | Product + Data Quality |
| Starter-question slot | Stable ID; approved question text; supported coverage class; optional category | Product approves usefulness; Data Quality confirms answerability from public trusted corpus | Omit group; input and browse remain fully functional | Product + Data Quality |
| Featured project slot | Project ID; canonical title; approved summary; stable route; display reason; optional qualified preview | Product approves featured/recent status and publication; Data Quality approves surfaced fields | Omit featured group; keep Browse all projects visible | Product + Data Quality |
| Recent project slot | Project ID; canonical title; approved summary; stable route; recency field/definition | Product defines “recent”; Data Quality validates date/status and surfaced fields | Do not label any project recent; featured or browse path may remain | Product + Data Quality |
| Project preview evidence | Asset ID; project relationship; approved preview role; alt/caption; media availability | Data Quality qualifies use; file exists; project is approved for discovery | Text-only project route entry; never ASCII or fabricated preview | Data Quality |
| Browse-all-projects path | Logical Project Index destination and availability | Product confirms surface entry; URL remains uncommitted | Keep a browse action that resolves to the accepted logical surface when implemented | Product + Architecture |
| Capability shortcut | Canonical capability ID; approved label; supported coverage; draft-transformation rule | Trusted capability connected to at least one approved public project/task with sufficient coverage | Omit unsupported shortcut; never infer from loose technology tags | Data Quality + Product |
| Company shortcut | Canonical company ID; resolved public label; supported coverage; draft-transformation rule | Alias resolved; company public; sufficient approved project/task coverage | Omit unresolved/unsupported company | Data Quality + Product |
| Manifesto | Stable route; approved label | Existing route remains public | Keep stable `/manifesto` link | Product |
| Contact | Approved destination ID; label; address; external behavior | Product confirms destination is active and appropriate | Omit unconfirmed destination while keeping other approved contact paths | Product |

### Eligibility invariants

- Empty groups disappear cleanly without placeholder promises.
- A project route remaining preserved does not make it eligible for featured/recent discovery.
- A technology tag does not automatically qualify as a capability shortcut.
- A company name in current source does not qualify until aliases and public identity are resolved.
- A source asset does not qualify as preview evidence merely because it exists.
- Starter questions are absent rather than speculative when coverage is unknown.

## 8. Accessibility And Focus-Order Contract

### Initial-state semantic order

1. Skip-to-main mechanism.
2. Global navigation and secondary destinations.
3. Main page heading containing Ivan's identity.
4. Portfolio-purpose statement.
5. Grounding/help description.
6. Global scope identity.
7. Labeled primary question input.
8. Submit action.
9. Supported starter-question controls.
10. Approved project route links.
11. Browse-all-projects action.
12. Capability shortcut controls.
13. Company shortcut controls.
14. Secondary manifesto/contact access where repeated.

### Focus rules

- The page does not autofocus the input on load; visitors begin at the document start and may use normal keyboard navigation.
- The input has a persistent visible label. Placeholder text cannot be its label or the only description of scope.
- `All portfolio` is programmatically associated with the input.
- Grounding/help text is programmatically associated with the input without making every focus announcement excessively long.
- Starter questions and shortcuts use button semantics because they modify a draft.
- Project, manifesto, and stable destination navigation use link semantics.
- Selecting a starter or shortcut updates the draft, moves focus to the input, and announces the draft change through concise status text.
- Selection never submits automatically and never opens a project unexpectedly.
- Submitting does not move focus into an unknown future answer state; detailed submit/loading focus behavior belongs to Step 4.
- When the transcript region appears, the structural page heading and scope remain understandable; the change is announced without replaying all discovery content.
- Returning through `Explore portfolio` moves focus to the discovery region heading or the control that opened it, according to the accepted navigation form.
- Starting a new conversation moves focus to the clean global input only after the new initial state exists.
- Collapsed discovery modules remain excluded from focus order while not visible.
- Desktop reflow cannot change the logical focus order from the documented DOM order.
- Mobile shortcut activation must avoid hidden focus or unexpected scroll jumps.

## 9. Step 3 Exit-Evidence Validation

| Active-plan / task criterion | Result | Evidence |
| --- | --- | --- |
| One initial-discovery hierarchy | Passed | Initial-Discovery Hierarchy table and hierarchy summary |
| One unambiguous primary action | Passed | Primary Action Decision and action matrix |
| Identity and purpose understandable before interaction | Passed | Hierarchy items 1–2 |
| Input owns discovery hierarchy | Passed | Priority/order tables and action matrix |
| Project proof visible before first question | Passed | Approved featured/recent projects before shortcuts and secondary destinations |
| Browse works without chat | Passed | Browse-all-projects path and direct approved project routes |
| Starter questions cannot pretend unsupported coverage | Passed | Approval gates and omit-group fallback |
| Featured/recent projects remain approval-gated | Passed | Data dependency and eligibility table |
| Capability/company shortcuts communicate draft effect | Passed | Shortcut behavior and button semantics |
| Grounded portfolio answers distinguished from generic chatbot | Passed | Required grounding semantics and input association |
| Manifesto/contact remain reachable but secondary | Passed | Hierarchy, action matrix, desktop/mobile order |
| Desktop content order explicit | Passed | Desktop Content Order |
| Mobile content order explicit | Passed | Mobile Content Order |
| Discovery stops competing after submission | Passed | Transition contract and visibility/collapse matrix |
| Intentional discovery return and new conversation are distinct | Passed | Return-to-discovery distinction |
| Accessibility and focus hierarchy explicit | Passed | Accessibility And Focus-Order Contract |
| No decorative hero requirement | Passed | Orientation remains concise and input precedes proof/shortcuts |
| Frontend would not need to invent initial hierarchy | Passed | Element, action, order, transition, eligibility, and focus contracts |
| No visual design, implementation, or Step 4 behavior introduced | Passed | Owner/boundary and deferred detailed conversation states |

Step 3 is complete. Steps 4–9 were subsequently completed and accepted through Product reconciliation.
