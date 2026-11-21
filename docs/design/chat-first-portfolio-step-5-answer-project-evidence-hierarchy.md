# Chat-First Portfolio Step 5: Answer, Project, And Evidence Hierarchy

## Status

Step 5 complete

## Parent Plan And Inputs

- [`Active plan`](../plans/active/chat-first-portfolio-ux-cleanup.md)
- [`Step 4 conversation states`](chat-first-portfolio-step-4-conversation-states.md)
- Steps 1–4 are accepted inputs for this Designer execution sequence.

Owner: `DESIGNER`. Product remains the canonical router.

This artifact defines answer anatomy and reusable project/evidence references. It does not approve facts, assets, aliases, prompts, publication eligibility, or retrieval behavior.

## Root-Cause Decision

A convincing generated answer can still be untrustworthy if synthesis, project references, and media are presented at the same authority level. The hierarchy must show what was synthesized, what is authored, what evidence status exists, and where deeper project truth lives.

## 1. Functional Answer Anatomy

| Order | Element | Required behavior | Eligibility |
| --- | --- | --- | --- |
| 1 | Answer status and scope | States complete/incomplete/insufficient and `All portfolio` or project scope | Always |
| 2 | Direct grounded synthesis | Answers the question concisely; does not imitate authored case-study copy | Settled answer only |
| 3 | Supported relationships | Names capabilities/companies only when canonical relationships support them | Trusted relationship required |
| 4 | Project references | Links each supported claim cluster to an approved authored project route | Approved public project and trusted surfaced fields |
| 5 | Evidence previews | Shows only qualified media with project, caption, status, and claim boundary | Data Quality status permits display |
| 6 | Source disclosure | Explains which canonical materials informed the synthesis and their disclosure level | Always at completion; may truthfully be empty/insufficient |
| 7 | Contextual follow-ups | Prepares editable supported drafts; never auto-submits | Approved coverage |
| 8 | Contact CTA | Appears only when the visitor expresses hiring/collaboration/contact intent or reaches an appropriate authored conclusion | Product-approved intent rule and destination |

The answer remains useful when optional elements are absent. Missing project or evidence references are not filled with generic cards or decorative imagery.

## 2. Authority And Disclosure Contract

| Layer | Meaning | Required disclosure |
| --- | --- | --- |
| Generated synthesis | A response assembled from approved portfolio materials | Label as portfolio-grounded synthesis; not canonical truth |
| Authored project | Ivan's complete project narrative at the stable route | Project title and route; authored-view distinction |
| Verified evidence | Qualified media supports a defined claim boundary | Evidence status, caption, project, supported claim/source |
| Contextual supporting media | Media helps understand context but is not claim proof | `Context` status and limitation |
| Not-ready media | Asset exists but trust/caption/relationship is unresolved | Must not appear as answer evidence |
| Missing evidence | No qualified asset supports the requested claim | Honest absence; no fallback pretending to be proof |

Source disclosure must be reachable from the answer without implying that opening a file automatically verifies a claim.

## 3. Reusable Project-Reference Contract

Every project reference requires:

- canonical project ID and approved display title;
- stable authored project route;
- approved concise relevance statement tied to the current answer;
- current publication/discovery eligibility;
- optional approved company and capability relationships;
- optional qualified preview with its own evidence status;
- origin locator back to the answer;
- explicit actions with distinct meanings:
  - `Open project` opens the authored route;
  - `Ask about this project` enters a clearly named project scope;
  - `Compare` appears only when comparison is supported.

### Project-reference variants

| Variant | Anatomy | Behavior |
| --- | --- | --- |
| One relevant project | One relevance statement, route action, optional scoped-chat action, optional qualified preview | Does not exaggerate completeness; opening route preserves answer origin |
| Several relevant projects | Ordered references, each with independent relevance and route | Order follows answer relevance, not decorative rank; linear access works on mobile |
| Comparison | Named supported dimensions, parallel project values, missing-value disclosure | Requires two or more approved projects and trusted comparable fields; no free-form invented score |

Project cards never author new facts. They project approved data and answer-specific relevance.

## 4. Project Comparison Contract

- Comparison is an answer form, not a new canonical source.
- Product/Data Quality must approve dimensions such as role, problem type, contribution, outcome category, or evidence coverage.
- Each value links back to its project source.
- Unknown or incomparable values are shown as unavailable, not normalized into equivalence.
- Comparison does not rank projects unless a trusted ranking rule exists.
- Opening a project preserves the originating comparison row/message.

## 5. Reusable Evidence-Preview Contract

Every surfaced preview requires:

- stable asset ID and canonical asset path;
- canonical project relationship;
- media type and availability;
- trusted caption/alt text;
- disclosure status;
- supported claim boundary or contextual-use statement;
- source/provenance reference where required;
- theme-variant relationship where applicable;
- viewer action and origin locator.

| Evidence status | May appear in answer? | Presentation meaning | Allowed action |
| --- | --- | --- | --- |
| Verified evidence | Yes | Supports an explicit bounded claim | Open viewer; open project/source |
| Contextual supporting media | Yes, when useful | Illustrates context but does not prove the answer claim | Open viewer with limitation |
| Evidence not ready | No | Relationship, caption, provenance, or claim boundary is unresolved | None in answer; may remain preserved in corpus |
| Missing/insufficient | No preview | No qualified visual evidence is available | Honest text state and safe next action |

No ASCII fallback, generic thumbnail, or existing file path may be presented as evidence. A failed qualified preview receives an accessible non-evidentiary media error while the answer and project link remain usable.

## 6. Source-Disclosure States

| State | Required content |
| --- | --- |
| Sources available | Canonical project/source labels, relationship to answer, qualified evidence count/status where useful |
| Sources settling during stream | Explicit `Sources available when answer completes`; no provisional proof claims |
| Partial source support | Supported answer portion mapped to sources; unsupported portion separated |
| No sufficient source | Honest limitation and safe actions |
| Source unavailable at runtime | Technical disclosure error; answer does not silently gain authority |

Disclosure may use a reversible details surface, but the answer must remain understandable without opening it.

## 7. Answer Actions And Priority

1. Continue or refine the question.
2. Open the most relevant authored project.
3. Inspect qualified evidence.
4. Enter explicit project scope.
5. Compare supported projects.
6. Explore the portfolio.
7. Contact only when intent supports it.

Follow-up actions edit the composer. Project/evidence actions navigate or open a viewer and do not mutate the draft.

## 8. Responsive And Accessibility Contract

- Answer content follows the same semantic order on all widths.
- Wide layouts may place project/evidence references adjacent only when DOM order remains synthesis → projects → evidence → sources → follow-ups.
- Medium and narrow layouts use a linear stack; no essential item requires horizontal scrolling.
- Answer, project references, and evidence items have headings/labels suitable for screen-reader navigation.
- Status, scope, evidence class, and limitations are textually exposed and do not rely on color or imagery.
- Evidence preview alt text describes the visual; caption explains portfolio meaning; the two are not interchangeable.
- Card containers do not create nested competing click targets. Each action has an explicit accessible name.

## 9. Data Dependencies

| Required field or decision | Owner | Fallback |
| --- | --- | --- |
| Approved answer claims and source mapping | Data Quality | Insufficient-evidence response |
| Public project eligibility and relevance fields | Product + Data Quality | Omit project reference |
| Canonical company/capability relationships | Data Quality + Product | Omit relationship |
| Evidence status, caption, alt, claim boundary, provenance | Data Quality | Omit preview |
| Supported comparison dimensions | Product + Data Quality | No comparison action |
| Contact-intent rule and active destination | Product | No answer-level contact CTA |
| Source-disclosure wording | Product + Copy/Data Quality | Minimal accurate disclosure |

## Step 5 Exit Evidence

| Criterion | Result | Evidence |
| --- | --- | --- |
| One answer anatomy | Passed | Ordered functional anatomy |
| Reusable project-reference contract | Passed | Required fields and variants |
| Reusable evidence-preview contract | Passed | Fields and four-status table |
| Generated synthesis distinguished from authored/evidence truth | Passed | Authority contract |
| Multiple projects and comparison are bounded | Passed | Variant and comparison contracts |
| No file is proof merely because it exists | Passed | Eligibility and not-ready rules |
| Screenshots retain project context and disclosure | Passed | Evidence-preview contract |
| Contact is contextual, not generic | Passed | Action hierarchy and intent gate |

Step 5 is complete.
