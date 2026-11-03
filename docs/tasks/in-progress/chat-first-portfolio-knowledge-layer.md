# Chat-First Portfolio Knowledge Layer

## Status

Architecture contract complete; Backend runtime foundation accepted; Frontend integration pending

## Owner / Next Role

Owner: Product
Next Role: Frontend

## Created

2026-06-28

## Last Updated

2026-07-23

## Priority

High

## Requiredness

Required

## Symptom / Root Cause

The portfolio still contains useful project descriptions, case-study narratives, screenshots, and technology tags, but the public discovery flow is narrow and page-first. Visitors can only discover what they click into, while the proposed product direction is question-first: "Where did Ivan work on SaaS?", "Which projects involved design systems?", "Show internal tools?", "Where did AI appear?", "What did Ivan actually do in this company?"

The root problem is not missing UI. The root problem is that the current content is not yet normalized as an assistant-ready evidence base:

- project facts live partly in shared project metadata and partly inline in route files
- the same company can contain multiple projects and multiple task types, and this relationship now needs to become the canonical answer hierarchy
- screenshot meaning is implied by page context, not consistently tagged for retrieval
- assets are not yet reliably tied to company, project, task, capability, and visible evidence
- answerable topics such as SaaS, AI, design systems, internal tools, or workflow operations are not yet mapped as a trusted query layer

## Expected Outcome

The project has a trustworthy knowledge layer for a future chat-first portfolio:

- existing project descriptions, case-study routes, and visual evidence are preserved
- the canonical answer hierarchy becomes:
  - company
  - project
  - task or contribution
  - asset or screenshot evidence
- project-level, task-level, and asset-level facts are inventoried
- screenshot and asset meaning is made retrieval-safe
- OpenAI API can later synthesize grounded answers and query-specific response surfaces, but it does not become the source of truth
- the site can eventually answer question-first queries in context instead of only linking to static pages
- the team can decide whether the chat shell should replace the current home flow, sit alongside it, or progressively become the main entry point

## Checklist

- [x] Confirm which current project facts, summaries, and case-study sections are still canonical
- [x] Inventory answerable project topics such as SaaS, AI, internal tools, design systems, workflows, and research
- [x] Inventory project-to-company, task-to-project, and asset-to-task relationships that are already explicit versus still implicit
- [x] Identify where screenshot or media descriptions are missing for trustworthy retrieval
- [x] Flag which routes are strong enough to support assistant answers and which are too thin
- [x] Define the minimum assistant-ready row shape needed for:
  - company level
  - project level
  - task or contribution level
  - asset or screenshot level
- [x] Define which visitor questions are in scope for version one of the chat-first experience
- [x] Define which questions must wait because the current corpus would overstate or hallucinate
- [x] Decide the smallest safe first product slice:
  - knowledge layer first
  - then chat-shell prototype
  - then response validation
- [x] Keep current case-study pages as canonical evidence until the chat experience can answer with equal or better trust
- [x] Define the canonical source-of-truth placement for the trusted knowledge layer
- [x] Sequence rollout phases for:
  - knowledge rows
  - screenshot evidence enrichment
  - bounded question-answer coverage
  - OpenAI answer-synthesis layer
  - chat-shell introduction
- [x] Define the concrete row population rules for:
  - company rows
  - project rows
  - task rows
  - asset rows
- [x] Define evidence-ref population rules and confidence handling
- [x] Create the canonical reviewable Markdown corpus under `content/portfolio/*`
- [x] Define the Architecture-owned Markdown runtime adapter, retrieval, grounding, API, and branch/origin contract
- [x] Implement the Backend-owned Markdown compiler, deterministic retrieval, grounding validator, and chat API
- [ ] Convert `src/lib/projects.ts` into a derived compatibility layer over trusted project rows
- [x] Resolve or explicitly preserve company/project alias uncertainty:
  - Peruse/Peruse.ml resolved as one project identity
  - VK/CityMobile/CityMobil preserved as unresolved relationship aliases
- [x] Populate the safest first batch:
  - company rows for the five route-backed projects
  - project rows for all five route-backed projects
  - task rows for the first high-trust capability set
  - asset rows only for captioned, evidence-bearing assets

## Data Quality Result

- Canonical corpus: `content/portfolio/`
- Audit report: `docs/data-quality/chat-first-portfolio-corpus-audit.md`
- All 108 canonical public files are represented in the evidence manifest.
- Metrics, recency, team composition, invalid Peruse media, unavailable Hito media, and unresolved VK/CityMobile identity are excluded from affirmative answer truth.

## Architecture Result

- Active implementation contract: `docs/plans/active/chat-first-portfolio-first-functional-implementation.md`
- V1 uses a strict server-only compiler over the canonical Markdown allowlist.
- Global retrieval uses the complete allowed five-project record set; project retrieval is limited to one canonical project and its allowed evidence.
- OpenAI uses the Responses API with `store: false`, no tools, and no hosted file/vector store.
- Generated candidates are not exposed until source, claim, project, evidence, and scope references pass server validation.
- Branches and origin locators are memory-only for the current tab.
- `/projects` is the accepted browse route.
- Backend Slice 1 is the next execution task; UI, `/projects`, visual direction, and cleanup remain separate downstream ownership.

## Exit Criteria

- The team has a clear inventory of what project content still exists and can be trusted
- The team knows which user questions can already be answered from the current corpus
- The team knows the highest-risk dataset gaps that would make a chat-first UI hallucinate or overstate
- The team has one bounded v1 scope for the knowledge layer and one bounded v1 scope for the chat-first shell
- The recommended first slice does not require deleting the existing case-study architecture first
- The canonical storage and ownership model for the trusted knowledge layer is agreed before population work starts
- The future OpenAI-powered answer layer is explicitly grounded in trusted rows and evidence, not used as independent truth
- The trusted row population rules are explicit enough that Data Quality can populate without inventing ad hoc semantics
- The minimal runtime seam exists before large-scale row population begins
