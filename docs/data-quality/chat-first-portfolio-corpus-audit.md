# Chat-First Portfolio Corpus And Evidence Audit

## Task

Build and audit the canonical Markdown grounding corpus for the accepted Chat-First Portfolio first slice.

## Stage

Data Quality slice complete. Product reconciliation is required before Architecture begins.

Application code, route code, styles, components, and public assets were not changed.

## Root Cause

The visible portfolio contains substantial authored narrative, but route files and media paths mix four different authority levels:

1. authored project statements;
2. unproven metrics, roles, and taxonomies;
3. contextual interface media;
4. empty, duplicated, or wrongly assigned assets.

Treating the existing route layer as retrieval truth would let generated answers overstate metrics, aliases, maturity, team composition, and screenshot meaning. The canonical owner is now the reviewable Markdown corpus under `content/portfolio/`; route files remain migration/presentation sources and `public/` remains asset storage.

## Created Corpus

- [`content/portfolio/README.md`](../../content/portfolio/README.md)
- [`content/portfolio/portfolio.md`](../../content/portfolio/portfolio.md)
- [`content/portfolio/manifesto.md`](../../content/portfolio/manifesto.md)
- [`content/portfolio/starter-questions.md`](../../content/portfolio/starter-questions.md)
- [`content/portfolio/evidence-manifest.md`](../../content/portfolio/evidence-manifest.md)
- [`content/portfolio/projects/taxi-aggregator-support-workspace.md`](../../content/portfolio/projects/taxi-aggregator-support-workspace.md)
- [`content/portfolio/projects/ds-hito.md`](../../content/portfolio/projects/ds-hito.md)
- [`content/portfolio/projects/litres.md`](../../content/portfolio/projects/litres.md)
- [`content/portfolio/projects/peruse.md`](../../content/portfolio/projects/peruse.md)
- [`content/portfolio/projects/wrike.md`](../../content/portfolio/projects/wrike.md)

## Evidence Inventory

Mechanically confirmed:

- 108 canonical non-recovery files under `public/`;
- 101 project-folder media files and 7 root assets;
- 82 PNG, 20 MOV, and 6 SVG files;
- 33 ` 2` recovery copies, all hashing to a canonical file;
- 61 evidence identities after intended theme variants are paired.

Evidence-identity readiness:

| Status | Identities | Files | Allowed use |
| --- | ---: | ---: | --- |
| contextual | 20 | 37 | May illustrate bounded project context; never proves an outcome. |
| not-ready | 28 | 48 | Must not appear as answer evidence. |
| missing | 12 | 22 | Zero-byte Hito PNG sources; unavailable. |
| not-evidence | 1 | 1 | Active favicon only; no project claim role. |
| Total | 61 | 108 | Every canonical file accounted for. |

No asset qualifies as verified outcome evidence in this audit.

## Demonstrated Conflicts

### DS Hito media is unavailable or ambiguous

- All 22 Hito/DS Hito PNGs are zero-byte files.
- The two Hito variable-demo videos are byte-identical to the Litres custom-dashboard videos.
- Result: DS Hito can support text answers but no current screenshot/video evidence.

### Peruse media belongs to other projects

- All 18 theme-variant Peruse screenshots are byte-identical to the Litres main dashboard pair and visibly contain Litres UI.
- Peruse hero and forward images are byte-identical to Wrike hero and forward.
- Result: all 20 Peruse media files are rejected for Peruse evidence.

### Litres has mislabeled and ambiguous media

- `promo` is byte-identical to `main` despite a different “Promotion tools” caption.
- `custom` is byte-identical to the Hito variable demo.
- `ivan-cover` is byte-identical to the root avatar.
- Unreferenced `library` and `stats` files lack reviewed context.

### Taxi metrics conflict and lack provenance

- Registered drivers: 80k in one section and 220k in another.
- Unanswered requests: 11.4k in one section and 15,600+ in the results table.
- All market, support, result, CSAT, NPS, staffing, and capacity values lack a source/date/definition.
- Team-role arrays also differ between route tabs.

### Identity and alias conflicts

- Preferred identity is `Product designer`; metadata additionally says `engineer`. The engineer title is not canonical until Product confirms it.
- `VK`, `CityMobile`, and `CityMobil` all point to the Taxi project locally, but their exact legal/brand/company relationship is not stated and remains unresolved.
- `Peruse` and `Peruse.ml` are resolved as one project because both names, the domain, and the title occur within the same stable project route/record.

## Trusted Facts

The corpus allows qualified answers about:

- Ivan's product-design identity and authored front-end capability;
- internal tools and operational workflows in Taxi and Litres;
- design-system and semantic-token intent in DS Hito;
- AI-assisted draft workflows in Taxi;
- the exploratory AI document-workspace direction in Peruse;
- qualitative board/workload/status design intent in Wrike;
- stable authored routes for all five projects;
- the manifesto and locally authored contact destinations.

`trusted-authored` means explicitly stated by the portfolio author. It is not external verification.

## Rejected Assumptions

Generated answers must not assume:

- that any current metric is verified;
- that route existence means featured or recent eligibility;
- that every technology tag is Ivan's demonstrated capability;
- that page-local team arrays establish real team composition;
- that the Taxi project proves the exact VK/CityMobile corporate relationship;
- that Peruse screenshots show Peruse;
- that DS Hito PNG evidence is available;
- that any project shipped, launched, or is recent without an explicit source;
- that a screenshot proves an outcome;
- that the CityMobile interactive preview's names, tickets, messages, routes, or fares are real project data.

## Discovery And Answer Eligibility

| Project | Browse | Featured/recent | Answer surface | Evidence |
| --- | --- | --- | --- | --- |
| Taxi Aggregator Support Workspace | yes | only initial featured candidate; never `recent` | trusted-authored non-metric contributions | 11 contextual identities |
| DS Hito Design System | yes | no | text-only semantic-token/component claims | none ready |
| Litres Internal Tools | yes | no until media/provenance repair | non-metric workflow contributions | 6 contextual identities |
| Peruse | yes | no | exploratory text-only claims with maturity limitation | none ready |
| Wrike | yes | no | qualitative design-direction claims | 2 contextual identities |

All five routes remain browsable because Product explicitly preserved them. Data quality eligibility does not imply equal publication strength.

No project is eligible for a `recent` label because there are no trusted project dates.

## Starter Coverage

Eight starter questions are approved or approved with explicit limitations. The corpus can safely answer about:

- internal tools and workflows;
- design systems;
- bounded AI-assisted workflows;
- each project's authored problem/contribution;
- the five browsable case studies.

Metrics, recency, comparison/ranking, production maturity, exact team composition, and screenshot-to-outcome proof must return an insufficient-evidence response.

## Downstream Contract

### Architecture / Backend / Prompt Engineer

- Read canonical facts only from `content/portfolio/`.
- Enforce claim statuses; never promote inferred/missing/contradictory/obsolete rows.
- Enforce project scope by selecting one project file plus allowed evidence rows.
- Preserve claim IDs and evidence IDs through retrieval so the answer can disclose sources.
- Treat `trusted-authored` as authored portfolio testimony, not external verification.
- Do not ingest route source, raw public files, technology arrays, interactive-preview data, or recovery copies directly into answer truth.
- Runtime must fail closed to an insufficient-evidence response when a requested claim lacks an allowed row.
- The exact Markdown adapter, validation schema, OpenAI boundary, streaming, branch state, and route contract remain Architecture-owned.

### Copy / Designer

- Copy may improve clarity but cannot change claim status or invent provenance.
- Use `Product designer` as the primary descriptor unless Product resolves the engineer title.
- Do not label any project recent.
- Do not expose VK/CityMobile as one resolved company shortcut.
- Peruse must be text-first until correct media is supplied.
- DS Hito must have missing-media behavior until usable assets exist.
- Contextual images require project context and a limitation; they cannot be styled as verified proof.

## Blockers

Architecture can begin using the safe fallbacks above. Publication-quality evidence remains blocked on:

- Product confirmation of the Ivan title and VK/CityMobile relationship;
- source documents for every metric intended for publication;
- correct Peruse media;
- non-empty, provenance-resolved Hito media;
- reviewed alt text/captions/video descriptions;
- project dates if `recent` discovery is desired;
- confirmation of active contact destinations.

## Recommended Next Owner

`ARCHITECT`

Architecture should define the Markdown-to-runtime contract, strict status filtering, project-scope enforcement, OpenAI grounding boundary, `/projects` index ownership, and the minimal branch/origin state required by the accepted first slice. It must not rewrite corpus truth or begin UI styling.

## Validation

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Canonical file count | `public/` excluding ` 2` | Passed | 108 files: 101 project + 7 root |
| Recovery exclusion | `public/` names containing ` 2` | Passed | 33 copies; all hash-match a canonical file |
| Manifest coverage | Evidence manifest versus canonical paths | Passed | Every canonical path appears once in one evidence identity |
| Empty-file audit | Canonical assets | Passed | 22 zero-byte Hito PNGs classified `missing` |
| Duplicate audit | SHA-256 across canonical assets | Passed | Cross-project and within-project conflicts recorded |
| Corpus links | Local Markdown links | Passed | No missing linked file |
| Route preservation | Five current routes | Passed | All routes retained and represented in project files |
| Source boundary | Application and assets | Passed | No application code, route code, style, component, or asset edit |
| Whitespace | Documentation changes | Passed | `git diff --check` |

