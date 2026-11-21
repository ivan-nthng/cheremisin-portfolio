# Ivan Cheremisin — Portfolio Identity And Scope

## Canonical Identity

| Claim ID | Status | Statement | Provenance | Answer boundary |
| --- | --- | --- | --- | --- |
| identity.name | trusted-authored | The portfolio belongs to Ivan Cheremisin. | `src/components/layout/HomePage.tsx`; `src/app/layout.tsx` | Safe as portfolio identity. |
| identity.primary-role | trusted-authored | Ivan describes himself as a product designer. | `src/components/layout/HomePage.tsx` | Preferred public descriptor. |
| identity.engineer-label | contradictory | Root metadata says “product designer and engineer”, while the visible home identity says “Product designer”. | `src/app/layout.tsx`; `src/app/page.tsx`; `src/components/layout/HomePage.tsx` | Do not use “engineer” as the canonical title until Product confirms it. |
| identity.frontend-capability | trusted-authored | Ivan says he is comfortable with front-end implementation and may build front-end work to prove a product idea. | `src/components/layout/HomePage.tsx` | Describe as an authored capability, not a formal engineering title. |
| identity.focus | trusted-authored | The portfolio covers internal tools, product systems, workflow-heavy software, SaaS, AI features, and design systems. | `src/components/layout/HomePage.tsx`; `src/app/layout.tsx` | Safe as scope categories, subject to project-level qualification. |
| identity.working-style | trusted-authored | Ivan emphasizes clarity, better decisions, fewer handoffs, and calmer working software. | `src/components/layout/HomePage.tsx` | Treat as authored working preference, not measured performance. |

## Grounding Statement

Future answers must say, in substance:

> This answer is synthesized from Ivan's reviewed portfolio Markdown. Project links open the authored case studies. Screenshots are shown only with their current evidence status, and unsupported claims are left unresolved.

This statement is `verified-local` for the planned product only after the runtime is demonstrably restricted to this directory. Until then, it is an implementation requirement rather than current application behavior.

## Contact Destinations

| ID | Status | Destination | Provenance | Boundary |
| --- | --- | --- | --- | --- |
| contact.email | trusted-authored | `mailto:ivan@cheremisin.co.uk` | `src/components/layout/HomePage.tsx`; `src/components/ProjectFooter.tsx` | Address is locally authored; availability is not independently checked. |
| contact.linkedin | trusted-authored | `https://www.linkedin.com/in/icheremisin/` | same sources | Locally authored; availability/ownership not independently checked. |
| contact.github | trusted-authored | `https://github.com/ivan-nthng` | same sources | Locally authored; availability/ownership not independently checked. |
| contact.instagram | trusted-authored | `https://www.instagram.com/cheremisin.co.uk/` | `src/components/ProjectFooter.tsx` | Preserved but not present in current home contact list. |
| contact.calendly | trusted-authored | `https://calendly.com/icheremisin/30min` | home and project footer sources | Locally authored; booking availability not independently checked. |

Contact is a secondary action. It must not be used as a substitute for an insufficient-evidence response.

## Canonical Project Set

| Project ID | Canonical title | Stable route | Browse | Featured data gate | Answer surfacing |
| --- | --- | --- | --- | --- | --- |
| taxi-aggregator-support-workspace | Taxi Aggregator Support Workspace | `/projects/taxi-aggregator-support-workspace` | eligible | eligible as the only initial featured candidate, with non-metric copy and contextual media only | eligible with claim restrictions |
| ds-hito | DS Hito Design System | `/projects/ds-hito` | eligible | not eligible: current PNG evidence is empty and video ownership conflicts | text-only, claim-restricted |
| litres | Litres Internal Tools | `/projects/litres` | eligible | not eligible until duplicate/mislabeled media and metric provenance are fixed | eligible with non-metric authored claims and qualified media only |
| peruse | Peruse | `/projects/peruse` | eligible | not eligible: all current project media is assigned from Litres or Wrike content | text-only, concept/maturity qualification required |
| wrike | Wrike | `/projects/wrike` | eligible | not eligible: short narrative, no dated recency basis, and limited contextual proof | eligible with qualitative authored claims only |

No project is eligible for a `recent` label because the current corpus contains no trusted project dates or recency definition.

