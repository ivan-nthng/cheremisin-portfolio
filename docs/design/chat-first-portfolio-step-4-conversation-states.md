# Chat-First Portfolio Step 4: Conversation States And Transitions

## Status

Step 4 complete

## Parent Plan

[`docs/plans/active/chat-first-portfolio-ux-cleanup.md`](../plans/active/chat-first-portfolio-ux-cleanup.md)

## Accepted Inputs And Boundary

- [`Step 1 removal/retention inventory`](chat-first-portfolio-step-1-removal-retention-inventory.md)
- [`Step 2 information architecture`](chat-first-portfolio-step-2-information-architecture.md)
- [`Step 3 initial discovery hierarchy`](chat-first-portfolio-step-3-initial-discovery-hierarchy.md)
- Product has accepted Steps 1–3.

Owner: `DESIGNER`. Product remains the canonical router.

This artifact defines functional conversation behavior. It does not select an API, model, retrieval method, streaming transport, storage mechanism, session lifetime, cancellation capability, or visual treatment.

## Root-Cause Decision

The conversation cannot be represented as only `empty / loading / answered`. A grounded portfolio answer has distinct validation, retrieval, synthesis, disclosure, interruption, and recovery states. Collapsing them would force Frontend to invent product behavior and would make insufficient evidence look like a technical failure.

## 1. Conversation State Matrix

| # | State and entry condition | Visible hierarchy and actions | Composer and transcript | Focus, status, and preserved state | Valid transitions and recovery | Responsive note / dependency |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Empty editable input; discovery or end of transcript | Scope, label, help, composer, submit | Editable; submit unavailable while normalized value is empty | No autofocus on page load; preserve current branch and scroll | Focus, shortcut selection, valid/invalid submit | One composer on all widths |
| 2 | Input focus | Composer becomes current interaction; no unrelated module expands | Editable draft remains intact | Visible focus; no announcement for focus alone | Edit, shortcut, submit, blur | Mobile keyboard must not obscure composer |
| 3 | Approved starter selected | Draft-change status, composer | Starter text is copied as editable draft; no submit | Focus moves to composer; concise polite announcement | Edit or submit | Requires approved starter ID/text |
| 4 | Approved capability/company shortcut selected | Same as starter selection | Approved transformation prepares an editable draft; no submit | Focus composer; preserve earlier draft until replacement is explicit | Edit or submit | Requires trusted canonical identity and transformation |
| 5 | Valid submit | Submitted question, request status, stable answer region | Submitted draft becomes immutable transcript question; composer draft clears only after request acceptance | Keep focus in composer unless user navigated; announce request accepted once; preserve submitted text and branch | Waiting, recoverable error | Validation/acceptance boundary is implementation-owned |
| 6 | Empty/invalid submit | Inline validation beside composer | No transcript item created; draft preserved | Focus invalid field; assert concise error once | Edit and resubmit | Validation copy requires Product/Copy |
| 7 | Request accepted / waiting | Question then reserved answer region with textual status | Composer availability follows pending contract below | Polite status; no repeating announcements; preserve question, branch, scroll | Streaming, completed answer, insufficient evidence, error, interruption | Loading geometry must be stable |
| 8 | Streaming answer | Partial answer marked `Generating`; sources not yet ready remain explicitly pending | Partial content is readable but not complete | Never move focus to new tokens; throttled live summary, not token announcements | Complete, stop if supported, interruption/error | Transport and cancellation are unresolved capabilities |
| 9 | Completed grounded answer | Complete-state label, synthesis, qualified references/sources, follow-ups | Answer is immutable transcript output; composer ready | Announce completion once; preserve answer/source associations | Continue question, project/evidence, explore, new branch | Completion criteria require answer-layer contract |
| 10 | Completed answer with one project | Direct answer then one project reference | Composer ready | Project reference is a normal link/action; preserve origin message/card | Full project, project scope, follow-up | Project eligibility is Data Quality-gated |
| 11 | Completed answer with several projects | Direct answer then ordered project references; comparison only when dimensions are supported | Composer ready | Cards/list do not alter scope until explicit action | Open one project, compare if eligible, follow-up | No horizontal-only carousel dependency |
| 12 | Completed answer with evidence previews | Answer then qualified evidence previews and disclosure | Composer ready; viewer is not opened automatically | Each preview has project context and status; preserve trigger | Evidence Viewer, project, follow-up | Evidence contract is Step 5 |
| 13 | Contextual follow-ups available | Small set after complete/insufficient answer | Selecting prepares an editable draft; never auto-submits | Focus composer and announce draft update | Edit, submit, ignore | Questions require coverage approval |
| 14 | Insufficient evidence | Honest limitation, known boundary, safe next actions | Not a technical error; composer ready with original question visible in transcript | Announce answer completion, not failure; preserve question and any qualified sources | Narrow/rephrase, approved browse, switch scope, inspect qualified source | Requires structured insufficiency reason |
| 15 | Recoverable request/network error | Error bound to failed question, retry and edit actions | No invented answer; original question and editable recovery draft preserved | Assert error once; focus remains predictable, retry action reachable | Retry same question, edit/resubmit, continue later | Technical error is distinct from insufficiency |
| 16 | Interrupted/incomplete answer | Partial content visibly marked incomplete and non-authoritative | Composer available according to pending contract; original question preserved | Announce interruption once; partial content is not marked complete | Retry from original question, discard partial view, continue only if supported | Interruption classification requires runtime signal |
| 17 | Retry | Same question shown with new attempt status | Reuses exact failed/interrupted question unless visitor chose edit | Focus stays on activated retry; attempt relationship preserved | Waiting, stream, complete, error | Prevent parallel duplicate attempts |
| 18 | Edit and resubmit failed question | Recovery draft prefilled from original question | Earlier failed attempt remains identifiable; edited question becomes a new attempt | Focus composer with edit context; no silent transcript rewrite | Submit or cancel edit | Attempt linkage is state-model work |
| 19 | Empty conversation | Initial Discovery with no messages in current branch | Primary input only; no empty transcript chrome | Standard Step 3 focus order | Draft, submit, browse | A branch identity may exist without messages |
| 20 | Start new conversation | Explicit secondary action from active conversation | New clean discovery state; old branch is not silently erased | If recoverable, old branch remains in history; focus new input after state exists | Ask, browse, recover prior branch | Branch lifecycle/retention unresolved |
| 21 | Explore portfolio | Explicit navigation from conversation | Discovery/browse modules open without clearing transcript | Preserve transcript, draft, active message and scroll; focus exploration heading/trigger | Browse/project, return to conversation | Surface form/URL unresolved |
| 22 | Return from project/evidence | Browser Back, close, or explicit return | Originating answer/card restored | Composer and transcript unchanged; restore originating trigger and scroll anchor | Continue conversation | Requires origin locator capability |
| 23 | Session-history return | Visitor chooses an available recoverable branch | Scope and transcript restore with honest status | Restore last safe message/scroll; do not imply durable sync | Continue, new branch, unavailable fallback | Optional first-slice capability |
| 24 | End of transcript / continued question | Last answer is settled | Last answer, follow-ups if approved, composer remains next primary action | Normal tab order reaches composer; no forced focus | Ask next question, explore, project, new branch | Sticky behavior defined structurally in Step 8 |

## 2. Transition Map

```text
Initial Discovery
  -> draft prepared/focused
  -> valid submit
  -> waiting
  -> streaming (optional) -> complete grounded answer
                         \-> interrupted -> retry/edit
              \----------> complete insufficient-evidence answer
              \----------> recoverable error -> retry/edit

Complete answer
  -> follow-up draft -> valid submit
  -> project route -> Back -> originating answer
  -> evidence viewer -> Close/Back -> originating trigger
  -> Explore portfolio -> return to preserved conversation
  -> Start new conversation -> clean branch
```

Invalid input never creates a transcript item. A retry is an attempt attached to the original question, while an edited resubmission is a new question attempt and never rewrites prior history.

## 3. Composer Behavior Contract

- One composer serves Initial Discovery and the active global conversation; project scope has its own branch and scope-bound composer.
- The composer has a persistent label, current scope, multiline editing, submit action, and status association.
- `Enter` submits when the draft is valid; `Shift+Enter` inserts a newline. On touch devices the explicit submit control remains available.
- Input is normalized for empty-value validation without silently rewriting visitor wording.
- The first accepted submit creates one question and one active attempt. Submit is unavailable for that draft while acceptance is unresolved, preventing duplicate requests.
- While waiting or streaming, the composer remains readable. It may accept a separate next draft only if implementation can guarantee it will not auto-send or become attached to the pending answer; otherwise it is temporarily disabled with an explanation. The first slice should prefer one active attempt per branch.
- `Stop` appears only if cancellation is genuinely supported. Without that capability, the interface does not fake cancellation.
- Follow-up and shortcut actions populate an editable draft and focus the composer; they never auto-submit.
- A failed request preserves the submitted question and offers `Retry` plus `Edit question`.

## 4. Loading And Streaming Contract

- The answer region is reserved immediately after request acceptance to avoid content jumps.
- Waiting uses text status and stable geometry; decorative animation is optional and never the only signal.
- Streaming is marked incomplete until a completion signal exists.
- New tokens do not take focus and are not individually announced.
- A throttled polite live region may announce broad progress; completion, interruption, or error is announced once.
- Project references, evidence, and sources appear only when their associations and disclosure status are settled. If they cannot be guaranteed during streaming, they appear at completion.
- Auto-scroll occurs only while the visitor remains at the transcript end. Manual upward scrolling disables forced following and exposes a return-to-latest action.

## 5. Grounded-Answer Completion Contract

An answer is complete only when the UI can represent:

1. the direct synthesis as completed rather than partial;
2. current scope (`All portfolio` or a named project);
3. supported project/capability/company relationships;
4. qualified evidence previews, if any;
5. source disclosure or an honest statement that no claim-level evidence is available;
6. a machine-readable completion status;
7. optional approved follow-up drafts.

Generated synthesis is labeled as an answer based on portfolio materials and never as authored project truth. Step 5 owns its detailed anatomy.

## 6. Insufficient-Evidence Contract

Insufficient evidence is a successful grounded outcome, not an error. It states:

- what part of the question cannot be supported;
- whether the limitation is current scope, corpus coverage, or evidence qualification;
- any supported portion of the answer, clearly separated;
- safe next actions: narrow/rephrase, use approved starter help, browse approved projects, inspect qualified sources, or switch from project scope to `All portfolio`.

It never invents a related project, exposes an unapproved project, sends the visitor to contact as a substitute, or claims the system is broken.

## 7. Error, Interruption, And Retry Contract

| Condition | Visitor-facing meaning | Preserved | Recovery |
| --- | --- | --- | --- |
| Validation error | The draft cannot be submitted yet | Draft and scope | Edit in place |
| Request/network error | The request did not complete technically | Exact question, scope, branch, attempt | Retry exact question or edit as new attempt |
| Interrupted stream | A partial answer exists but is not complete | Question, partial content, attempt | Retry; partial stays visibly incomplete |
| Insufficient evidence | The system completed but cannot support the claim | Question, supported portion, qualified sources | Narrow, browse, or switch scope |

Retry cannot duplicate a still-active attempt. A later successful attempt does not erase the failed one; presentation may condense prior attempt metadata but must preserve the history relationship.

## 8. Contextual-Follow-Up Contract

- Follow-ups appear only after a settled answer.
- They are relevant to the current scope and supported coverage.
- They use button semantics because they edit the composer.
- Selection populates a draft, announces the change, and focuses the composer.
- Visitors may edit or ignore them.
- No follow-up implies a fact, comparison, or project relationship that Data Quality has not approved.

## 9. Explore Portfolio Versus New Conversation

| Action | Active branch | Transcript/draft | Destination purpose |
| --- | --- | --- | --- |
| Explore portfolio | Preserved | Preserved exactly | Browse projects, supported starters, capabilities, companies, manifesto, contact |
| Start new conversation | New clean branch | Old branch retained only if lifecycle supports recovery; never silently deleted | Return to Initial Discovery and ask independently |
| Clear history | No UX commitment in this step | Requires explicit destructive confirmation and defined lifecycle | Separate optional history-management action |

## 10. Session Return And Unavailable Recovery

- Session history is optional to the first slice and must work without an account if shipped.
- An available entry discloses scope, a safe title/first question, and recency only when those values are supported.
- Restoring a branch restores settled messages, current scope, recoverable draft, and a safe scroll position.
- If recovery is unavailable or expired, the product says so plainly, opens clean Initial Discovery, and offers approved browse paths. It never reconstructs an answer from partial client state or implies that a lost branch still exists.

## 11. Desktop/Mobile Structural Behavior

| Area | Wide/medium desktop | Narrow/mobile |
| --- | --- | --- |
| Scope and transcript | Scope precedes one main transcript axis | Same linear order; scope remains before transcript |
| Composer | Associated with transcript and continuously reachable | Remains reachable above safe area; viewport adjusts for keyboard |
| Pending answer | Stable region in transcript | Same; no viewport-filling loader |
| Project/evidence references | May use adjacent space while DOM order follows answer | Linear stack; no required horizontal scrolling |
| Explore/history | May use secondary region or reversible surface | May use sheet/drawer only with correct focus and close behavior |
| Long answer | Reading position respected; return-to-latest when needed | No forced scroll; composer never covers final content |

## 12. Accessibility, Keyboard, Focus, And Live Regions

- Transcript is a named region with ordered question/answer articles and semantic headings where needed.
- Scope and answer status are textually and programmatically exposed; neither relies on color.
- Focus remains where the visitor acted during submit and streaming.
- Completion, failure, and interruption are announced once. Token-by-token output is not.
- `Enter` submit and `Shift+Enter` newline are documented near the composer where keyboard guidance is useful.
- All actions remain operable without shortcuts; global arrow keys are not assigned to conversation navigation.
- Opening an evidence dialog traps focus; closing restores the exact trigger.
- Reduced motion preserves every state transition and status without animated dependence.

## 13. Unresolved Lifecycle And Capability Dependencies

| Dependency | Required owner | Safe fallback |
| --- | --- | --- |
| Streaming transport and completion signal | Architecture/Backend | Non-streaming waiting then complete answer |
| True request cancellation | Architecture/Backend | Do not show Stop |
| Branch/session identity and lifetime | Product + Architecture | One in-memory active branch |
| Anonymous history retention and clear behavior | Product + Architecture | Omit history UI |
| Origin locator and scroll restoration lifetime | Architecture/Frontend | Native Back plus honest top-of-answer fallback |
| Supported prompts/follow-ups | Product + Data Quality | Omit suggestion groups |
| Evidence/source readiness timing | Data Quality + answer-layer owner | Show disclosures only at completion |
| Answer sharing lifecycle | Product + Architecture | Share project URLs only |
| Validation and error wording | Product + Copy | Accurate neutral copy |

## Step 4 Exit Evidence

| Criterion | Result | Evidence |
| --- | --- | --- |
| Required states have hierarchy, actions, focus, preservation, transitions, recovery, and responsive behavior | Passed | 24-row state matrix |
| No state depends on decorative animation | Passed | Loading/streaming and accessibility contracts |
| Loading remains stable and streaming does not steal focus | Passed | Loading contract |
| Retry preserves the question and errors preserve input | Passed | Composer and retry contracts |
| Insufficient evidence is distinct and offers safe actions | Passed | Insufficient-evidence contract |
| Explore and new conversation differ | Passed | Comparison table |
| Unavailable history recovery is honest | Passed | Session-return contract |
| Architecture/lifecycle decisions are not invented | Passed | Dependency table and explicit fallbacks |

Step 4 is complete.
