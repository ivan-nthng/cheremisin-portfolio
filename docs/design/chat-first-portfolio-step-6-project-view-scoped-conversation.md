# Chat-First Portfolio Step 6: Project View And Scoped Conversation

## Status

Step 6 complete

## Parent Plan And Inputs

- [`Active plan`](../plans/active/chat-first-portfolio-ux-cleanup.md)
- [`Step 2 information architecture`](chat-first-portfolio-step-2-information-architecture.md)
- [`Step 4 conversation states`](chat-first-portfolio-step-4-conversation-states.md)
- [`Step 5 answer/project/evidence hierarchy`](chat-first-portfolio-step-5-answer-project-evidence-hierarchy.md)

Owner: `DESIGNER`. Product remains the canonical router.

## Root-Cause Decision

Chat should improve entry into project depth, not replace the authored case study. A project route must remain understandable from a direct link, while project questions must be visibly constrained to one trusted project corpus and remain a separate branch from global conversation.

## 1. Full Authored Project Anatomy

| Order | Region | Purpose | Required boundary |
| --- | --- | --- | --- |
| 1 | Global/project orientation | Identify Ivan, route, project, and return path | Stable route and origin-aware return; no dossier language |
| 2 | Project identity and approved summary | Explain what the project is and Ivan's role/context | Data Quality-approved fields; no generated replacement |
| 3 | Project scope entry | Offer `Ask about this project` as subordinate action | Explicit project title/scope; authored view stays visible/default |
| 4 | Overview and contribution | Present authored problem, role, contribution, constraints | Preserve route narrative pending validation |
| 5 | Outcomes | Present approved outcomes and limitations | Claims/metrics remain trust-gated |
| 6 | Narrative sections | Preserve the complete authored sequence | Current tabs/sections may change later; no content deletion |
| 7 | Evidence gallery | Inspect qualified or contextual project media | Disclosure status per item; unqualified assets stay out of evidence UI |
| 8 | Related navigation | Return to origin, browse approved projects, optional project traversal | Native links and stable URLs |
| 9 | Contact | Offer approved contact action at an appropriate authored conclusion | Secondary; Product confirms destination |

Direct project entry always opens this authored anatomy, not an empty or active chat transcript.

## 2. Project-Scoped Conversation Anatomy

1. Persistent scope identity: `Project: {canonical project title}`.
2. Explicit link/close action back to the authored project.
3. Project-only transcript branch.
4. Project-scoped composer with scope in its accessible name/description.
5. Qualified project references/evidence governed by Step 5.
6. Safe insufficient-evidence response that may offer `Switch to All portfolio`.
7. Explicit `Switch to All portfolio` action that restores the separate global branch.

The authored project remains the primary surface. Project chat may be a subordinate region or reversible sub-surface, but it never replaces route content by default and never makes the route dependent on a conversation session.

## 3. Scope Contract

| Property | Global branch | Project branch |
| --- | --- | --- |
| Scope identity | `All portfolio` | `Project: {canonical title}` |
| Allowed trusted sources | Any approved public portfolio source permitted by answer contract | Only selected project's trusted rows and qualified evidence |
| Draft | One global draft | One draft per project branch if lifecycle supports it |
| Transcript | Global cross-project thread | Separate per-project thread |
| Authored truth owner | Stable project routes/content corpus | Same; chat owns no truth |
| Insufficient scope action | Narrow/browse | Narrow or switch explicitly to `All portfolio` |
| Cross-project answer | Allowed when supported | Forbidden; must offer scope switch |

Scope must be exposed in text and accessible naming next to the composer/transcript. Route slug, color, or prior conversational wording is insufficient.

## 4. Entry And Exit Rules

| Entry/exit | Required behavior | Preserved state |
| --- | --- | --- |
| Open project from global answer | Open authored route and carry ephemeral origin locator | Global branch, originating message/card, scroll anchor, global draft |
| Open direct/shared project URL | Open authored route with no invented conversation origin | No private/global session required |
| Ask about this project | Explicitly enter/reveal selected project branch | Project route/reading position, global branch unchanged |
| Close project conversation | Return to authored project at its prior reading position | Project branch/draft if lifecycle supports recovery |
| Switch to All portfolio | Restore global branch and its last position | Project branch retained only to accepted session limit |
| Browser Back from project route | Return to actual origin when present; otherwise normal browser destination | Origin message/card and scroll when locator exists |
| Browser Back from scoped-chat sub-surface | Close scoped chat before leaving project when represented as a history entry | Project reading position and project branch |
| Open/close evidence | Overlay current project/chat origin | Exact trigger and scroll |

## 5. Branch, Draft, And Scroll Rules

- Global and project branches never merge implicitly.
- Entering project scope does not copy the global transcript into it. The triggering question/project reference may be shown as context, not as project-branch history.
- Each branch owns its own draft. Switching branches preserves drafts only within the accepted session lifecycle; unsupported persistence is never promised.
- A project-scoped answer cannot silently broaden to other projects. It returns insufficient evidence and offers an explicit scope switch.
- Opening evidence preserves current branch, active message/section, selected item, and scroll.
- Opening a project from an answer records the originating message/card. Return restores that anchor; if exact pixel restoration is unsafe, focus and scroll restore to the originating element.
- Direct entry and expired origins fall back honestly to Project Index or root discovery; no false `Back to answer` action appears.

## 6. Authored Content And Evidence Boundaries

- Existing `/projects/*` routes, narratives, outcomes, metadata, screenshots, videos, and theme variants remain preserved.
- Preservation does not mean publication or trust approval.
- Generated answers may summarize approved project data but cannot overwrite or become route copy.
- Evidence gallery includes only items with an allowed Step 5 disclosure status.
- Unqualified assets remain stored and auditable but do not appear as evidence.
- If a qualified asset fails to load, the project narrative and caption remain reachable with a non-evidentiary error state.

## 7. Desktop, Medium, And Mobile Structure

| Width | Authored project | Scoped conversation |
| --- | --- | --- |
| Wide | Narrative is main reading axis; optional scoped-chat entry is subordinate | May occupy a reversible adjacent region only if narrative and scope remain clear |
| Medium | Narrative remains first; scoped chat opens as an explicit subordinate region/surface | No squeezed dual-pane requirement; one clear active reading axis |
| Mobile | Linear authored narrative with reachable project-chat entry | Full-width scoped surface/region with persistent project identity and safe-area composer; close returns to reading position |

No width may hide the authored narrative behind an automatic chat takeover.

## 8. Accessibility Contract

- Project title is the route's main heading; scoped chat has its own named region.
- `Ask about this project`, `Close project conversation`, `Switch to All portfolio`, and `Return to answer` have distinct accessible names.
- Scope changes are announced once and move focus to the new region heading or composer only after explicit visitor action.
- Evidence viewer follows dialog focus trap/restoration rules.
- Browser Back never depends on a pointer-only control.
- Project content remains readable and navigable when scripts, session recovery, or chat capability is unavailable.

## 9. Dependencies And Safe Fallbacks

| Decision | Owner | Safe fallback |
| --- | --- | --- |
| Project publication readiness and approved fields | Product + Data Quality | Preserve route; omit from discovery/chat references |
| Project-scoped retrieval enforcement | Architecture/Backend/Prompt Engineer | Do not ship scoped chat |
| Branch/draft lifetime | Product + Architecture | Preserve only in current in-memory navigation |
| Origin locator implementation/lifetime | Architecture/Frontend | Native Back and no false return promise |
| Tabs versus long-form sections | Product + Designer later visual/layout pass | Preserve all authored sections in current reachable order |
| Contact priority/destination | Product | Omit project-level CTA |

## Step 6 Exit Evidence

| Criterion | Result | Evidence |
| --- | --- | --- |
| Full-project anatomy defined | Passed | Nine-region anatomy |
| Scoped-chat anatomy defined and subordinate | Passed | Seven-part anatomy and direct-entry rule |
| Global/project scope distinction is explicit | Passed | Scope table |
| Route, transcript, draft, and scroll-return rules exist | Passed | Entry/exit and branch rules |
| Scoped answers cannot use unrelated projects silently | Passed | Project-only source contract |
| Exiting does not destroy another branch | Passed | Branch/exit rules |
| Browser Back restores origin when available | Passed | Origin locator and honest fallback |

Step 6 is complete.
