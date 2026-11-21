# Taxi Aggregator Support Workspace

## Project Identity

| Field | Status | Value | Provenance |
| --- | --- | --- | --- |
| Project ID | verified-local | `taxi-aggregator-support-workspace` | Stable route folder and `src/lib/projects.ts` |
| Canonical title | trusted-authored | Taxi Aggregator Support Workspace | Route hero and shared project record |
| Stable route | verified-local | `/projects/taxi-aggregator-support-workspace` | `src/app/projects/taxi-aggregator-support-workspace/page.tsx` |
| Role | trusted-authored | Lead Product Designer | Route hero |
| Product context | trusted-authored | A support workspace for taxi operators intended to reduce switching, response time, stress, and guesswork. | Route hero, overview, and gallery copy |
| Maturity/date | missing | Not stated. | No dated local source |

## Alias Boundary

`VK`, `CityMobile`, and `CityMobil` are explicitly unresolved as one canonical company identity.

- `VK` is the `companyName`, external company URL, logo, and media-folder label.
- `CityMobile` is used by the interactive preview component and canonical docs.
- `CityMobil` appears in the Figma embed title.

Provenance: `src/lib/projects.ts`, the project route, `src/components/CityMobileInteractivePreview.tsx`, and the Figma embed URL.

Retrieval may treat these terms as aliases that locate this project, but an answer must not claim the exact legal, employment, acquisition, or brand relationship until Product supplies a trusted statement.

## Trusted Authored Contributions

| Claim ID | Status | Statement | Source |
| --- | --- | --- | --- |
| taxi.contribution.unified-inbox | trusted-authored | The case study describes one workspace for messages arriving from app, web, and social channels. | Project gallery item “One inbox” |
| taxi.contribution.context | trusted-authored | Operators are shown trip details, driver history, and previous interactions in the same work context. | Gallery and context section |
| taxi.contribution.suggestions | trusted-authored | The designed workflow includes suggested next actions for common support cases. | Gallery item “Suggested actions” |
| taxi.contribution.handoff | trusted-authored | The workspace supports reassignment, escalation, and annotations while preserving context. | Gallery item “Internal handoff” |
| taxi.contribution.ai-drafts | trusted-authored | The case study says AI draft replies were used to help operators respond faster. | Gallery item “Faster replies” |
| taxi.contribution.channels | trusted-authored | Calls and chat are presented together in the operator workspace. | Gallery item “Voice and chat together” |
| taxi.contribution.route-history | trusted-authored | Operators can inspect route, stops, and timing inside the case. | Gallery item “Trip history on the map” |
| taxi.contribution.contextual-ui | trusted-authored | Request type changes which tools are shown to the operator. | Gallery item “Only the tools you need”; default project change copy |
| taxi.contribution.component-system | trusted-authored | The authored route says the interface used reusable components and the Hito design system. | Project development section |

These statements describe the authored design case. They do not, by themselves, prove production deployment or measured impact.

## Owner-Confirmed Historical Statistics — 2026-11-06

Status: `trusted-authored`. Ivan explicitly confirmed the two supplied 21:53 screenshots as real historical Citymobil figures and confirmed the same-team full-demand-coverage/spare-capacity outcome in PRODUCT chat `019f8f64-c4f9-7f83-9e12-bf473cd0e0ac`, recorded in [PORT-17](https://app.notion.com/p/407fe5f58cf5810897e9c27580e74256) and `docs/design/citymobil-case-study-proposal.md` → Reported Outcome And Statistics Reconciliation — 2026-11-06. This is owner-confirmed historical data, not independently audited telemetry. The reporting period remains unspecified; confirmation date is not a measurement or launch date.

| Claim ID | Status | Statement | Source |
| --- | --- | --- | --- |
| taxi.scale.potential-users | trusted-authored | Potential audience: 14,000,000 users; not actual active users. | Screenshot 1 Overview + Ivan confirmation |
| taxi.scale.registered-drivers | trusted-authored | 80,000 registered drivers. | Screenshot 1 Overview + Ivan confirmation |
| taxi.scale.daily-drivers | trusted-authored | 16,000 daily drivers. | Screenshot 1 Overview + Ivan confirmation |
| taxi.scale.daily-rides | trusted-authored | 220,000 rides per day; not registered drivers. | Screenshot 1 Overview + Ivan's admitted label correction |
| taxi.before.requests | trusted-authored | Before: 15,000 incoming support requests per day. | Screenshot 1 Problem + Ivan confirmation |
| taxi.before.operators | trusted-authored | Before: 50 support operators. | Screenshot 1 Problem + Ivan confirmation |
| taxi.before.capacity | trusted-authored | Before: total team capacity of 3,600 requests per day. | Screenshot 1 Problem + Ivan confirmation; team total, not per operator |
| taxi.before.capacity-gap | trusted-authored | Daily capacity gap: 11,400 requests, calculated as 15,000 minus 3,600. | Screenshot 1 + admitted correction: gap, not proof of permanently unanswered tickets |
| taxi.requests.ride-cost | trusted-authored | Ride-cost disputes: 35% of requests. | Screenshot 2 + Ivan confirmation |
| taxi.requests.cancelled-trip-compensation | trusted-authored | Driver compensation for cancelled trips: 25% of requests. | Screenshot 2 + Ivan confirmation |
| taxi.requests.payment-method | trusted-authored | Payment-method issues: 20% of requests. | Screenshot 2 + Ivan confirmation |
| taxi.requests.guaranteed-income | trusted-authored | Guaranteed Income inquiries: 10% of requests. | Screenshot 2 + Ivan confirmation |
| taxi.requests.prioritization | trusted-authored | These four categories account for 90% of requests and were the optimization priority. | Screenshot 2 + 35+25+20+10=90; not the Lost-item/Pickup demonstration mix |
| taxi.after.same-team | trusted-authored | The same support team of 50 covered all demand with capacity to spare, without additional operator expansion. | Ivan's explicit qualitative outcome confirmation in PORT-17; no numeric After capacity or headroom supplied |

### Approved Four-Metric Local Comparison

Ivan approved this comparison in the PORT-17 follow-up and withdrew the figurative 10× claim. The [reconciliation contract](../../docs/design/citymobil-case-study-proposal.md#reported-outcome-and-statistics-reconciliation--2026-11-06) records the approval and its limits.

| Metric | Before | After | Provenance and interpretation |
| --- | ---: | ---: | --- |
| Team capacity per day | 3.6K | 15K+ | Before comes from the confirmed screenshot. After is an approved lower bound derived from coverage of the 15,000 requests/day baseline and reported spare capacity. Exact throughput and headroom are unspecified. |
| Daily capacity gap | 11.4K | 0 | Before is baseline demand minus capacity. After means zero capacity shortfall against that same baseline under the reported full coverage. Unanswered tickets and backlog were not measured by this comparison. |
| Support operators | 50 | 50 | Ivan confirmed the same team covered demand. |
| Average handling time per request | ≈6:00 | ≈1:30 | Ivan recalls approximately 360 seconds before and 90 seconds after. These are approximate recollections, with no telemetry, reporting window or capacity derivation supplied. |

Baseline demand remains 15,000 requests per day. Before capacity covers 24% of that baseline (3,600 ÷ 15,000). The reported spare capacity is room to support more customers with the existing team. The number of additional customers supported, realized growth and any growth forecast remain unspecified. Handling time supplies no estimate of After capacity.

### Source Preservation And Corrections

Original supplied files: `Screenshot 2026-11-06 at 21.53.26.png` in temporary source directory `NSIRD_screencaptureui_ro1qBS`, and `Screenshot 2026-11-06 at 21.53.35.png` in `NSIRD_screencaptureui_qq0DJy`, under the TemporaryItems path recorded in the PORT-17 owning contract. Byte-preserving local evidence copies (not public assets): `test-results/port17-case/confirmed-statistics/source-1.png` and `source-2.png`. SHA-256 respectively `70ac31135d15aedc05fe2e3f32068ea6ea855a7eb820330a6d5dfc962996f617` and `dc10bbbd835dc37399b635d12e3f988eeebb37f95d2e8140228232c9893b3c52`. Both images were visually inspected; original screenshots remain unedited. No screenshot publication is authorized by this normalization.

The first screenshot's Problem card incorrectly labels 220K as registered drivers; Overview and the confirmed contract resolve this as rides/day, with 80K registered drivers. Its “Unanswered Requests” label is normalized to capacity gap; the source label is preserved here for traceability, not used as a distinct measured outcome.

Optional calculations, not additional measured results: 15,000/220,000 ≈ 6.8% requests-to-rides ratio; not the proportion of unique rides with an incident. Before average is 3,600/50 = 72 requests/operator/day. At that average, 15,000/72 ≈ 209 operators is a counterfactual staffing estimate, not an actual team size, measured avoided hiring count or recruiting/training cost. The approved zero shortfall applies only against baseline demand. Actual After throughput and the size of the spare capacity remain unspecified. “Full demand coverage” must not be converted into a measured zero unanswered/backlog figure.

This confirmed series supersedes the illustrative Before/After model for live content only; historical tests/receipts are retained. No 9,000/6,000 After values are approved. FRONTEND owns the approved local current and legacy comparison using the existing English contract. No schema, runtime implementation or other project facts change in this source step.

## Claims Not Approved For Grounded Answers

Only the confirmed series above is newly admitted. The following legacy assertions remain excluded; screenshot/user confirmation does not approve unrelated results.

| Claim group | Local values | Quality issue |
| --- | --- | --- |
| Unsupported After | 9,000 daily requests; 180 per operator; illustrative 6,000 gap | Legacy/unverified figures or superseded model; no confirmed numeric After throughput/gap/headroom. |
| Other results | 28%→6% failed requests; 15,600+→under 1,000 unanswered; ~200→50 operators; +35% resolution; +21% CSAT; +23 NPS | No source/date/definition. Same-team confirmation is not measured staffing reduction; 209 estimate is counterfactual only. |
| Financial, retention and causal percentages | Cost/revenue savings, retention rates or numerical causal effect | Not supplied by the confirmed series; no invented benefit or attribution. |
| Team composition | Design/FE/BE/BA/UXR in some tabs; QA/FE/BE/BA/PM in another | Contradictory page-local arrays; not a reliable project-team statement. |
| Technologies | Figma, Design Systems, User Testing, User flows, Next.js, TypeScript, Tailwind CSS | Authored tags only; not proof of Ivan's role or production stack. |

## Evidence Boundary

Allowed contextual media IDs are listed under `taxi.*` in the evidence manifest. They may illustrate interface states but do not independently prove statistical or outcome claims. The confirmed series above derives from the supplied screenshots plus Ivan’s explicit confirmation, not demo media.

`src/components/CityMobileInteractivePreview.tsx` is a portfolio demonstration. Its ticket numbers, names, locations, fares, messages, scripts, and case records are demonstration data and are not project facts or user evidence.

## Discovery Eligibility

- Browse: eligible.
- Featured: eligible as the initial candidate only with the canonical title, non-metric summary, stable route, and contextual preview disclosure.
- Recent: not eligible; no date.
- Answer surfacing: eligible for the trusted-authored contributions above.
- Project-scoped chat: allowed only against this file and allowed `taxi.*` evidence rows.

