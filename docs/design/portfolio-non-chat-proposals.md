# PORT-12 — Non-chat portfolio proposals

Status: Historical, unapproved exploration. Ivan withdrew agent-led site design on 2026-10-27 and will design the site himself; PORT-12 is Cancelled. Do not ask him to choose a board or continue this document's former next steps. Artifacts are retained, not accepted or implementation-ready.

Owner: DESIGNER. 2026-10-27. Exploration, not accepted specification. Lifecycle: Portfolio Notion PORT-12. Brief: ../tasks/product-briefs/portfolio-design-first-relaunch.md. No implementation or handoff authorized. Existing dirty files preserved.

## Visual artifacts

Local review directory: `/Users/ivan/Documents/Codex/2026-10-27/portfolio-designer/outputs/port-12/`.

1. `01-quiet-editorial.png`: serif-led introduction; identity and project side by side; restrained olive. Newsreader display + Geist Sans comparison.
2. `02-evidence-first.png`: project image first; compact identity; case chapter navigation; single Sans family, cobalt action.
3. `03-personal-index.png`: personal introduction rail alongside work index; warm neutral and terracotta; single Sans family.

Built-in ImageGen created each independent board using the actual Figma screenshot inputs. These are raster composition studies, not precise type specimens, approved copy, executable states or complete final case-study designs. Generated text/image alterations are not canonical facts. In particular: discard invented end-to-end role wording in board 2, discard the unrequested 2025 label in board 3, and keep Metabox research inset outside public site. Board 1's mobile accordion suggestion is rejected: case content remains open. Mobile home in board 3 needs its featured project made visible in the next iteration. No board is ready for implementation.

## Problem, evidence and reuse decision

Source confirms globals.css maps sans and body to Geist Mono while portfolio-surface overrides Sans. Terminal separators, global zero radius and Dossier media coexist with portfolio controls. HomePage composes PortfolioChatSurface; ProjectPageShell injects project conversation. This is shared presentation/experience ownership fragmentation, not a demonstrated framework failure. No current portfolio browser audit was performed: no active portfolio server was identified. The existing 6006 preview is an unrelated catalog and was not used as portfolio evidence.

Decision proposal: small portfolio-owned replacements, not external-system adoption. DESIGN SYSTEM owns shared contracts; FRONTEND later implements. Reuse globals.css semantic token seam and src/components/ui control location. Consolidate ui/Button and portfolio-button variants into one action family; replace Dossier presentation around existing media with media-frame/caption/fallback; unify project references across home/index. Retain ProjectPageShell composition, stable routes, media variants, gallery order and Lightbox behavior subject to later accessibility verification. Do not unify or delete unproven legacy components. No dependency, catalog service or wholesale Hito import.

## Proposed information architecture

- `/`: identity and discipline, authored focus, one evidence-led featured project, other project links, about/working approach, contact. Work links to `/projects`; About scrolls to home section; Contact is mailto plus LinkedIn. Do not invent employer timeline or years.
- `/projects`: all five stable routes; support-workspace gets contextual media; others remain text-only until their media readiness improves. No dates/recent badges or unsupported quantitative results.
- Existing project URLs: title, authored role, short overview, designed problem/context, contributions, sequenced evidence, limitations, next project and contact. No conversation required.
- `/manifesto` stays reachable from about/footer as secondary reading; it is not the primary recruitment path. No URL migration.
- Representative case: Taxi Aggregator Support Workspace. Sections: Overview, One inbox, Context at hand, Internal handoff. Distinguish designed behavior from measured impact. A complete selected-direction case layout follows Ivan's composition choice.

## Typography proposal

Baseline recommendation for further refinement: existing Geist Sans, weights 400/500/600, no Mono in visitor prose. Editorial alternative adds Newsreader only for English identity/display/headings. Exact rendered family cannot be proven by raster generation. Geist and Newsreader upstream repositories list OFL-1.1: https://github.com/vercel/geist-font and https://github.com/productiontype/Newsreader. No purchase needed. Newsreader is not installed/adopted. Existing next/font configuration loads Geist + Mono, Latin subset only; this does not establish Cyrillic coverage in the delivered font files.

| Role | Desktop px / line-height | Mobile px / line-height | Measure / weight |
| --- | --- | --- | --- |
| Identity/display | 72 / 76 | 40 / 44 | 12–18ch; 500 Sans or 400 serif |
| Case title | 56 / 60 | 36 / 40 | 20ch; 500 |
| Section title | 32 / 40 | 28 / 36 | 32ch; 500 |
| Prose | 18 / 29 | 17 / 27 | 60–65ch; 400 |
| Caption/metadata | 14 / 21 | 14 / 21 | 65ch; 400 |
| Navigation/control | 16 / 24 | 16 / 24 | 500; 44px minimum hit area |

Real copy specimens: Ivan Cheremisin; Product designer; Internal tools, AI features, design systems, and workflow-heavy software.; Taxi Aggregator Support Workspace; Messages, trip details, and previous interactions in one work context.; Interface design · contextual evidence.

Before adoption: pin exact font/version/license with redistribution text, inspect binary glyph coverage for English, Cyrillic, Portuguese accents, £/€/arrows/numerals and punctuation. Test sample `Иван Черемисин · São Paulo · ação · £ € → 0123456789`; route unsupported script through a verified Sans fallback rather than assuming Newsreader coverage. Test 200% zoom, fallback metrics and font-blocked rendering. Target one variable Sans roman file per required script subset; optional single serif roman subset only if selected. No italic asset without visible need. Retire unnecessary Mono preload only in authorized implementation. Actual byte budget/request count/CLS remain unmeasured; record them before font adoption, do not claim zero cost.

## Minimal shared foundations

Semantic roles: page, surface, surface-muted, foreground, muted, border, accent, focus. Candidate palette depends on selected board; proposed values are art direction only, contrast not yet verified. Example Sans direction: page #FAFAF9, text #171919, muted #575D65, accent/focus #254CE4, border #D9DDE1. Check normal text 4.5:1, large text/UI boundaries 3:1 in all supported themes. Light and dark source-media pairing remains explicit; dark palette needs selected-direction review.

Spacing: 4/8/12/16/24/32/48/64/96; page gutters 64 desktop, 24 tablet, 20 mobile; content max 1280, prose 680; 12-column desktop, 4-column mobile. Below 768 single-column, no sticky side rail; long titles wrap without truncation. Radius: 0 for page/sections, 4 controls, 8 media only if selected; hairline dividers, no default elevation, viewer overlay only. Borders separate data where spacing cannot. No custom cursor dependency.

Minimum primitives: navigation, action/link, project reference, case section, media/caption, evidence viewer. States: default, hover underline/tint, active/current, focus-visible 2px offset ring; disabled only where meaningful. No hover-only information. Caption and full-screen action independent of image readability.

Viewer contract: contain-fit original; Close/Previous/Next 44px; caption remains visible; Escape closes; arrows navigate; initial focus to Close, trap focus, return to trigger, scroll lock. At boundaries disable unavailable previous/next, announce position. Source Lightbox has Escape/arrows/scroll lock but source inspection did not demonstrate focus trap/return. Media loading reserves ratio; missing/error has honest text, no fake fallback art. Video paused with poster by default, user-controlled play/pause; reduced motion removes transitions/auto movement. New illustrative motion labelled demonstration, never recording/result evidence.

## Source media curation

| Source | Placement / crop / sequence | Caption / alt | Claim boundary |
| --- | --- | --- | --- |
| CityMobil file a1FIpM2QJ0y79EO170WQDG, node 6235:9223 under 6235:8760 | Case overview first; full original ratio in viewer, preview contain preferred; optional context detail crop alongside original | Caption: Interface design · contextual evidence. Alt: Support workspace showing trip details beside a customer conversation and suggested actions. | Design state only; identities/trip values are source-screen content, no production or outcome proof; CityMobil/VK identity unresolved |
| Metabox file r8M3IrfO3CQ3GPCouXLwZP, FE page 3528:6183, node 8193:9566 | Research reference only, not project index/public case | Camera restrictions alongside a furniture preview | Access and FE page label do not establish shipment, authorship scope or publication permission |
| Existing taxi.* entries in content/portfolio/evidence-manifest.md | Later sequence: inbox, contextual details, handoff; exact source files/captions to be reconciled in selected case | Preserve reviewed authored captions; write specific alt per selected frame | Contextual only; never use unsourced numerical claims |

Figma selected nodes re-fetched and screenshots visually inspected. Metabox top-level inventory includes prototype/presentation/FE pages; the FE camera frame was inspected, not every prototype/presentation flow. No recorded interaction was exercised or new motion authored. Support chat inside case imagery is project content, not visitor chat.

## Review and remaining work

Ivan chooses/refines a composition first. Then DESIGNER prepares a complete representative case and exact desktop/mobile/state/type specimens in the selected direction, reconciles evidence sequence and missing browser/font checks, and requests explicit design/minimal-system approval. Selection of an exploratory board alone is not approval to implement. PORT-12 remains open with DESIGNER. No FRONTEND handoff, commits, pushes, deployment, source-Figma changes, dependency or website-code edits.
