# Chat-First Portfolio Knowledge Layer

> Canonical-placement update, 2026-07-23: Product reconciliation supersedes the typed-row-only `src/content/portfolio/*` decision below. Reviewable Markdown under `content/portfolio/` is now the canonical grounding source. The runtime adapter remains Architecture-owned.

## Problem

The current portfolio is still primarily page-first. A visitor can open one visible case study and manually browse routes, but cannot naturally ask:

- where Ivan worked on SaaS
- which work involved AI
- which projects were internal tools
- what Ivan actually did inside a specific company
- which screenshots prove a specific capability or task

The issue is not that the portfolio lacks content. The issue is that the content is not yet normalized into a trustworthy answer layer. Project descriptions, tasks, claims, and screenshots still live mostly inside route-local storytelling. That makes the site readable for a human willing to browse, but weak as an assistant-ready question-answering system.

## Target Outcome

Turn the portfolio into a trustworthy question-first discovery product without throwing away the existing case-study evidence.

The intended product model is:

- a chat-like entry point for discovery
- recent or suggested projects visible as shortcuts
- answers grounded in a trusted project corpus
- OpenAI API used to synthesize answers and query-specific response pages from trusted corpus evidence
- screenshots shown with explicit context, not as floating decoration
- preserved project routes as evidence until the chat experience proves equally trustworthy

## Why This Improves Trusted Dataset Quality

This direction only works if the knowledge layer becomes more explicit than the current page layer.

It should improve trusted dataset quality by forcing the team to define:

- what counts as a company
- what counts as a project within a company
- what counts as a task or contribution within a project
- what each screenshot actually proves
- which claims are clearly supported versus implied or weak

The accepted product hierarchy is now:

- company
- project
- task or contribution
- asset or screenshot evidence

The accepted canonical placement is now:

- canonical reviewable grounding content lives in `content/portfolio/*`
- case-study routes in `src/app/projects/*` remain canonical evidence presentation
- media files in `public/*` remain canonical asset storage
- `src/lib/projects.ts` remains a current runtime compatibility source until Architecture defines a derived adapter over Markdown

That turns the portfolio from a static presentation layer into a safer retrieval and recommendation corpus.

## In Scope

- project, company, task, and screenshot relationship framing
- trusted answer coverage for common portfolio questions
- screenshot context requirements
- v1 question categories and answer boundaries
- sequencing for knowledge-layer-first delivery
- defining OpenAI API as a future answer-synthesis layer, not as a truth source
- chat-first shell as a future surface, not as the first implementation step

## Non-Goals

- Do not delete current case-study pages first.
- Do not start with a full ChatGPT clone.
- Do not solve anonymous session lifetime first.
- Do not promise open-ended conversational breadth before the corpus is trusted.
- Do not let OpenAI-generated text become canonical product truth without evidence grounding.
- Do not invent backend or UI architecture in this brief.

## Acceptance Criteria

1. The team can name which companies, projects, and project tasks are canonical.
2. The team can name which screenshots or assets support which project claims.
3. The team can separate:
   - clearly answerable questions
   - partially answerable questions
   - unsafe questions
4. The team has a bounded v1 scope that starts with dataset trust, not chat theatrics.
5. The future chat shell is defined as a discovery surface grounded in evidence, not a replacement for missing content.
6. The v1 answer layer uses the hierarchy:
   - company
   - project
   - task or contribution
   - asset or screenshot evidence
7. OpenAI API is positioned as an answer-synthesis and page-composition layer that works from trusted evidence rather than inventing unsupported claims.

## Success Metrics

- The percentage of portfolio questions that can be answered from clearly supported evidence increases.
- The percentage of screenshots with explicit contextual meaning increases.
- The number of project claims that require route-only human inference decreases.
- The v1 chat-first flow can answer a bounded set of high-intent questions without unsupported statements.
- OpenAI-generated answers remain traceable to trusted project and asset evidence.

## Role Breakdown

### Product

- Define the question-first product scope.
- Set answer boundaries, non-goals, and first-slice sequencing.
- Decide what the chat shell should and should not claim in version one.
- Lock the canonical answer hierarchy and evidence rules before population work begins.
- Define what OpenAI-generated answers are allowed to do versus what must remain direct evidence presentation.

### Architect

- Validate the cross-surface ownership model once the trusted-content shape is known.
- Guard against a premature rewrite that deletes case-study evidence before the knowledge layer is proven.
- Decide where the trusted knowledge layer should live as canonical source of truth before dataset population starts.
- Define how an OpenAI answer layer should depend on the trusted corpus without becoming a parallel truth layer.

### Designer

- Define the chat-first discovery surface only after trusted content coverage is known.
- Preserve evidence hierarchy so answers feel grounded rather than cosmetic.

### Frontend III

- Implement the chosen discovery surface only after Product, Data Quality, and Designer define the bounded first slice.
- Preserve existing evidence routes while the new discovery layer is introduced.
- Render query-specific answer surfaces only after the trusted answer contract is explicit.
- Implement the accepted Architecture-owned runtime adapter over `content/portfolio/*` before the chat surface depends on it.
- Keep `src/lib/projects.ts` working as a derived compatibility layer during migration.

### Backend II

- Step in only if the chosen first slice requires a persistent answer source, search service, or other runtime support beyond static content contracts.

### QA III

- Validate that surfaced answers, screenshots, and project shortcuts stay aligned with the trusted corpus.
- Check that the discovery shell does not overstate unsupported claims.
- Validate that OpenAI-generated answers remain grounded and traceable.

### Data Quality

- Audit the corpus.
- Define trusted project, task, and screenshot readiness.
- Flag weak or ambiguous claims before the discovery layer is built.
- Populate or validate the trusted rows only after the canonical placement and ownership model is agreed.
- Populate the canonical Markdown corpus inside `content/portfolio/*` with explicit evidence refs and status handling.
- Escalate alias ambiguities such as VK/CityMobile and Peruse/Peruse.ml before treating them as canonical company identity.

## Risks / Tradeoffs

- A chat shell can feel modern while actually reducing trust if the evidence layer is weak.
- An OpenAI answer layer can sound authoritative while becoming less trustworthy if grounding rules are weak.
- A full replacement of the current site too early would remove browseable proof before the assistant layer is reliable.
- Anonymous chat history may feel useful, but it is a secondary problem compared with answer truth and evidence linking.

## Rollout Scope

Version one should be:

- trusted corpus first
- canonical company/project/task/asset hierarchy second
- bounded question coverage second
- discovery shell third

The accepted v1 knowledge-first order is:

1. trusted corpus audit
2. canonical source-of-truth placement
3. project and asset row population
4. bounded answer coverage
5. OpenAI answer-synthesis contract
6. chat-shell prototype
7. response QA against evidence

Not:

- open-ended assistant first
- evidence cleanup later

## Open Questions

- How granular should a "task" or "contribution" entity be before it becomes noisy?
- Which screenshots are strong enough to count as evidence versus decorative support?
- Should the first chat shell replace the home hero or sit alongside the current project-first entry?
- Which company aliases should collapse into one canonical company identity, especially VK/CityMobile and Peruse/Peruse.ml?

## Superseded Architecture Notes

- `content/portfolio/*` is the canonical reviewable Markdown grounding layer.
- `src/app/projects/*` remains the canonical evidence presentation layer.
- `public/*` remains the canonical asset file store.
- `src/lib/projects.ts` should become a derived compatibility layer after the Markdown adapter is accepted.
- OpenAI output is ephemeral runtime synthesis only, never canonical content.
