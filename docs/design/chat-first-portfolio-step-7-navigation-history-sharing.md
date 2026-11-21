# Chat-First Portfolio Step 7: Navigation, History, Sharing, And Back

## Status

Step 7 complete

## Parent Plan And Boundary

- [`Active plan`](../plans/active/chat-first-portfolio-ux-cleanup.md)
- [`Step 2 information architecture`](chat-first-portfolio-step-2-information-architecture.md)
- [`Step 6 project/scoped conversation`](chat-first-portfolio-step-6-project-view-scoped-conversation.md)

Owner: `DESIGNER`. Product remains the canonical router.

This artifact defines visitor expectations. It does not select routing APIs, URL formats, storage, expiry, identity, sync, or backend architecture.

## Root-Cause Decision

Chat, authored routes, and overlays create multiple kinds of return. Hidden custom rules would make Browser Back destructive or surprising. Native route history is the baseline; reversible overlays close first; exact conversation restoration is promised only when an origin/session capability exists.

## 1. Navigation Transition Table

| Current surface | Visitor action | Destination | Browser Back priority | Required restoration | Honest fallback |
| --- | --- | --- | --- | --- | --- |
| Initial Discovery | Submit question | Global conversation at `/` context | Return behavior follows accepted branch/history model | Submitted question and branch | Clean discovery if branch cannot recover |
| Discovery/conversation | Open Project Index | Logical index surface | Return to actual prior surface | Draft/transcript and scroll | Root discovery |
| Global answer | Open project | Stable `/projects/{slug}` | Return to originating answer | Message/card focus, scroll, transcript, draft | Normal browser origin; no fake return |
| Project Index | Open project | Stable project route | Return to index | Index scroll/filter if supported | Index start |
| Direct/shared URL | Open project | Stable project route | Browser's external/prior history | No private state assumed | Project Index/root explicit exit |
| Project route | Enter scoped chat | Project sub-surface/region | Close scoped chat first only if it created a history entry | Project reading position | Authored project top/entry |
| Any answer/project | Open Evidence Viewer | Reversible overlay | Close viewer before leaving underlying surface | Exact trigger, evidence index, underlying scroll | Underlying surface start with focus notice |
| Evidence Viewer | Next/previous | Same overlay set | Back returns according to chosen overlay-entry contract, not through every image unless URLs are intentionally committed | Current set/item | Close to origin |
| Project scope | Switch to All portfolio | Preserved global branch | Return follows actual navigation entry | Both branches, relevant scroll | Global discovery if branch unavailable |
| Conversation | Explore portfolio | Discovery/browse context | Return to active conversation | Branch, draft, scroll | Clean discovery with recovery notice |
| Active branch | Start new conversation | New clean discovery branch | Prior branch reachable only if history capability is accepted | No silent deletion | New branch only, with honest non-recovery |
| Manifesto/contact | Back/return | Actual origin | Native Back | Origin conversation/project state when session supports it | Root |

## 2. Browser Back Priority

1. Close the topmost evidence/source/history/comparison dialog or sheet that created a reversible history state.
2. Close project-scoped chat if it was entered as a distinct history state.
3. Leave the project route to its real origin.
4. Follow normal browser history.

Escape closes the topmost dismissible overlay but does not substitute for Browser Back across routes. A control labeled `Back to answer` appears only when a valid origin locator exists.

## 3. Origin Restoration Contract

An origin locator may contain:

- branch/session reference;
- originating message reference;
- originating action/card reference;
- previous scope;
- scroll anchor or safe position;
- route/index origin.

Restoration order:

1. restore the correct branch and settled transcript;
2. restore scope and draft;
3. locate the originating semantic element;
4. scroll it into view without animation when reduced motion applies;
5. restore focus to that element;
6. if the exact element no longer exists, return to the containing answer and disclose the fallback.

The locator's storage and expiry are Architecture decisions. UX does not promise exact restoration after expiry.

## 4. Lightweight Anonymous History

History is optional to the first slice and, if shipped:

- requires no account;
- contains only recoverable visitor branches, not canonical portfolio truth;
- identifies global/project scope, a safe label or first question, and truthful recency;
- opens a branch without auto-submitting;
- distinguishes active, incomplete, unavailable, and expired entries;
- exposes clear/remove actions only with explicit scope and confirmation;
- never suggests cloud sync, cross-device recovery, or durable retention unless implemented.

If history is omitted, core discovery, answers, projects, evidence, and native Back must still work.

## 5. New Conversation And Clear History

- `Start new conversation` creates a clean branch; it is not a delete action.
- If prior branches are recoverable, they remain in history until their accepted lifecycle ends.
- If recovery is unsupported, the action warns only when the visitor would otherwise reasonably expect recovery; it never says history was saved.
- `Clear history` is a separate destructive action, names what will be removed, asks for confirmation, and does not delete authored project data, assets, or canonical sources.
- Clearing history cannot retract already shared answer states if a separate durable sharing capability exists; that relationship must be disclosed by Product/Architecture.

## 6. Sharing Contract

| Shared item | Commitment | Required context | Limitation |
| --- | --- | --- | --- |
| Project | Existing stable project URL is shareable | Authored project identity and public content | Publication readiness remains Product/Data Quality-gated |
| Evidence | No stable share URL committed | Project, status, caption, source relationship | Default is an ephemeral viewer |
| Answer | Optional future capability only | Answer scope, content/version, citations, generated-synthesis disclosure, availability state | Must not imply canonical or permanently current truth |
| Conversation | Not committed | Would require privacy, lifecycle, and redaction decisions | Omit from first slice unless explicitly accepted |

When an answer link cannot be reconstructed, show an unavailable-state explanation, any safe non-sensitive metadata, links to still-public cited projects when known, and a path to start a new question. Never generate a fresh answer and present it as the shared historical answer.

## 7. No-Dead-End Contract

Every logical surface provides at least one truthful exit:

- Evidence Viewer → exact origin.
- Project route → origin when valid, otherwise Project Index/root.
- Scoped chat → authored project or `All portfolio`.
- Project Index → previous/root.
- Manifesto/contact → previous/root.
- Unavailable history/share → clean discovery and approved browse.
- Insufficient answer → edit/narrow, browse, or explicit scope switch.

## 8. Dependencies

| Decision | Owner | First-slice fallback |
| --- | --- | --- |
| Project Index URL | Product + Architecture | Logical surface without committed public URL |
| Origin-locator storage and expiry | Architecture | Native Back, semantic fallback |
| Anonymous history retention | Product + Architecture | Omit history |
| Answer snapshot/live-link model | Product + Architecture/Backend | Share project URLs only |
| Clear-history semantics | Product + Architecture | Omit clear/history controls |
| Evidence deep links | Product + Architecture | Ephemeral viewer |
| Privacy/redaction for shared conversation | Product + Architecture | Do not share conversations |

## Step 7 Exit Evidence

| Criterion | Result | Evidence |
| --- | --- | --- |
| Navigation transition table exists | Passed | Twelve transition rows |
| No dead-end surface | Passed | Explicit exit contract |
| Back follows visible, non-surprising priority | Passed | Four-step priority |
| Origin restoration is explicit and honest | Passed | Locator and fallback contract |
| Project sharing uses stable routes | Passed | Sharing table |
| Answer sharing does not imply durable truth | Passed | Optional capability and unavailable state |
| History remains optional and architecture-neutral | Passed | Anonymous-history contract and dependencies |

Step 7 is complete.
