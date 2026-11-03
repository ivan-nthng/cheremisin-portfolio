# Chat-First Portfolio Step 8: Accessibility And Responsive Behavior

## Status

Step 8 complete

## Parent Plan And Boundary

- [`Active plan`](../plans/active/chat-first-portfolio-ux-cleanup.md)
- [`Step 3 discovery hierarchy`](chat-first-portfolio-step-3-initial-discovery-hierarchy.md)
- [`Step 4 conversation states`](chat-first-portfolio-step-4-conversation-states.md)
- [`Step 6 project/scoped conversation`](chat-first-portfolio-step-6-project-view-scoped-conversation.md)
- [`Step 7 navigation/history/sharing`](chat-first-portfolio-step-7-navigation-history-sharing.md)

Owner: `DESIGNER`. Product remains the canonical router.

This artifact defines testable structural and accessibility intent. It does not choose breakpoints, dimensions, styling tokens, component libraries, or visual direction.

## Root-Cause Decision

Responsive chat is not a desktop layout compressed to mobile. The transcript, composer, project narrative, overlays, and evidence must maintain one reading/focus order while adapting to keyboard, safe area, zoom, and constrained width. State and scope can never depend only on animation, placement, or color.

## 1. Semantic Landmark And Transcript Contract

- One skip link reaches the main surface.
- Global header/navigation, main content, and optional footer/contact are separate landmarks.
- Initial Discovery has one page heading containing Ivan's identity.
- Conversation has a named transcript region. Each user question and assistant answer is a semantic article with an accessible label/order.
- Current scope is textually present before the transcript/composer and programmatically associated with both.
- Authored project routes use the project title as the main heading; scoped conversation is a separately named region.
- Status, source disclosure, project list, evidence group, and follow-ups use headings or labels matching their hierarchy.
- Generated synthesis and authored project content are structurally distinguishable.

## 2. Keyboard And Focus Contract

- All flows work by sequential keyboard navigation; optional shortcuts cannot be required.
- Global arrow keys are not used for project traversal because they conflict with text editing, reading, and evidence controls.
- `Enter` submits from the composer; `Shift+Enter` creates a newline. Explicit submit remains available.
- Focus is never moved by streaming tokens, auto-scroll, or answer completion.
- Starter/follow-up/shortcut actions place an editable draft in the composer, move focus there, and announce the update.
- After invalid submit, focus goes to the invalid composer with associated error.
- On navigation return, focus restores to the originating semantic trigger; safe containing-answer fallback applies if missing.
- On explicit scope switch, focus moves to the new scope heading or composer after the surface exists.
- Visible focus is required for every interactive element and cannot be clipped by sticky containers.

## 3. Live-Region Contract

| Event | Announcement behavior |
| --- | --- |
| Draft prepared by shortcut | One concise polite update |
| Request accepted | One concise polite status |
| Streaming | No token announcements; optional throttled broad progress |
| Answer complete | One completion announcement |
| Insufficient evidence | One completed-answer announcement with limitation |
| Technical error/interruption | One assertive or appropriately urgent announcement |
| Scope switch | One concise new-scope announcement |
| History/share unavailable | One concise status plus visible recovery path |

The full answer remains normal readable content; it is not injected wholesale into a live region.

## 4. Dialog, Drawer, And Sheet Contract

- Evidence Viewer is a modal dialog when layered over another surface.
- Focus enters the dialog at its heading or selected evidence control, remains trapped, and returns to the exact trigger on close.
- Escape closes the topmost dismissible overlay.
- Background content is inert and does not scroll while a modal overlay is active.
- History, sources, and comparison may use dialogs/drawers/sheets only when their content and actions fit the pattern; each has a name, close control, focus trap, and restoration.
- Browser Back closes an overlay first only when the overlay participates in history as documented in Step 7.
- Full-screen mobile treatment does not convert a temporary overlay into a dead-end route.

## 5. Image, Video, And Evidence Accessibility

- Informative images have trusted alt text describing the visible content.
- Evidence captions explain project relationship, status, and bounded meaning.
- Decorative images use empty alt and are never presented as evidence.
- Videos expose controls, accessible names, captions/transcripts when speech conveys information, and no forced autoplay with sound.
- Theme variants share the same evidence identity while alt/caption reflects meaningful visual differences.
- Failed media exposes a non-ASCII text error and leaves caption/project/source access usable.
- Zooming/enlarging evidence does not remove its status or project context.

## 6. Wide, Medium, And Narrow Anatomy

| Region | Wide desktop | Medium desktop/tablet | Narrow/mobile |
| --- | --- | --- | --- |
| Global orientation | Compact global region plus one main axis | Same order; secondary areas may move below | Linear header/navigation without hiding primary input |
| Initial Discovery | Identity → purpose → grounding → input → approved proof/browse → shortcuts | Same DOM order; avoid cramped parallel regions | One linear order exactly as Step 3 |
| Global conversation | Scope → transcript → composer; secondary browse/history may be adjacent | One main transcript axis; secondary surfaces become reversible | One linear transcript; composer remains reachable above keyboard/safe area |
| Answer references | May use adjacent space after synthesis if DOM order remains | Prefer linear groups | Linear project/evidence groups; no essential horizontal scrolling |
| Authored project | Narrative is primary; evidence integrated | Single readable narrative axis | Linear narrative, then evidence/actions according to authored order |
| Scoped chat | Optional reversible adjacent region only with unambiguous scope | Separate region/surface, not squeezed dual pane | Full-width subordinate surface; project identity and close remain visible |
| Evidence Viewer | Modal sized to available viewport | Modal/full-height sheet as appropriate | Full-screen dialog respecting safe areas and browser controls |
| History/sources/comparison | Secondary region or dialog | Drawer/dialog | Named sheet/dialog; never permanent width competition |

Structural change is driven by content fit, not device labels. Exact breakpoints are Frontend/Design System implementation decisions.

## 7. Mobile Composer, Keyboard, And Safe Area

- Composer is never covered by the virtual keyboard or bottom browser UI.
- If sticky/fixed, it respects safe-area insets and reserves matching transcript space so the final message/actions remain reachable.
- Viewport changes caused by keyboard opening do not reset transcript scroll or close overlays.
- Multiline growth has a bounded visible region; internal scrolling does not trap the page.
- Submit, retry, stop-if-supported, and attachment-free controls meet the accepted touch-target minimum without overlap.
- Focused input and validation text remain visible under zoom.
- Returning from a project/evidence surface restores the message trigger above the composer, not behind it.

## 8. Reflow, Zoom, Touch, And Overflow

- Core content reflows at 400% zoom without loss of content or two-dimensional scrolling, except intrinsically two-dimensional evidence that receives its own accessible pan/zoom treatment.
- No fixed minimum width is required for transcript, cards, comparison, source list, or project metadata.
- Long URLs, titles, code-like IDs, captions, and visitor questions wrap safely.
- Project comparison becomes a labeled linear comparison on narrow widths rather than a clipped table.
- Touch targets meet at least 44×44 CSS pixels or the implementation's stricter accepted standard.
- Hover is never the only way to reveal an action, status, source, or caption.
- No horizontal overflow is a future QA acceptance requirement; `overflow-x: hidden` is not acceptable proof.

## 9. Loading, Error, Motion, And Contrast Expectations

- Pending states reserve stable geometry and provide text status.
- Skeletons/spinners, if later styled, are supplementary and do not obscure readable prior content.
- Error, retry, and insufficiency remain adjacent to the question/attempt they describe.
- Reduced motion removes decorative entrance, smooth-scroll, token/reveal, and overlay motion while preserving state changes instantly.
- No essential status uses motion alone.
- Focus, text, controls, links, errors, and disabled states must meet applicable WCAG contrast requirements after visual tokens are chosen.
- Theme switching, if retained, must preserve semantics, media status, focus visibility, and contrast.

## 10. Accessibility Acceptance List

- [ ] One logical heading hierarchy per surface.
- [ ] Scope is visible text and accessible description.
- [ ] Transcript items and answer state are programmatically distinguishable.
- [ ] Keyboard-only completion of discovery, ask, retry, project, evidence, scope switch, and return.
- [ ] No focus movement during streaming.
- [ ] Live regions do not announce tokens or repeat full answers.
- [ ] All dialogs trap and restore focus.
- [ ] Evidence alt, caption, project relationship, and disclosure status exist.
- [ ] Mobile keyboard does not obscure composer or final content.
- [ ] Safe-area insets are respected.
- [ ] Reflow/zoom retains all actions and content.
- [ ] Touch targets meet minimum size.
- [ ] Reduced motion preserves comprehension.
- [ ] Status/scope/evidence class does not rely only on color.
- [ ] No horizontal overflow at required test widths.

## 11. Future QA Width And Scenario Inventory

Minimum acceptance inventory:

- wide desktop;
- medium desktop/tablet;
- narrow mobile;
- narrow mobile with virtual keyboard open;
- 200% and 400% zoom/reflow;
- light/dark/system theme if retained;
- reduced motion;
- keyboard-only;
- screen-reader smoke check for landmarks, transcript, live statuses, and dialogs;
- long question/answer/title/caption;
- loading, streaming, complete, insufficient, error, retry, interrupted;
- one/multiple projects and evidence viewer;
- project scope switch and origin restoration.

## Step 8 Exit Evidence

| Criterion | Result | Evidence |
| --- | --- | --- |
| Wide, medium, and narrow anatomy defined | Passed | Anatomy table |
| Semantic landmarks/transcript explicit | Passed | Landmark contract |
| Keyboard, focus, and live regions explicit | Passed | Contracts 2–3 |
| Dialog focus trap/restoration explicit | Passed | Overlay contract |
| Evidence accessibility explicit | Passed | Media contract |
| Mobile keyboard/safe area protected | Passed | Mobile composer contract |
| Zoom, reflow, touch, and no-overflow testable | Passed | Reflow and QA inventory |
| Reduced motion retains all meaning | Passed | Loading/motion expectations |
| Scope/status never rely only on color | Passed | Acceptance list |

Step 8 is complete.
