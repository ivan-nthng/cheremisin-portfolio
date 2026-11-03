# Portfolio Figma Foundations

Owner: DESIGN SYSTEM for shared foundations; DESIGNER for homepage composition. Product scope admitted on 2026-10-28 from Ivan's direct requests. Current execution/acceptance belongs in Portfolio Notion; append actual artifact identities and durable rules here after construction, not a tool diary. The later scope below supersedes the original preparation-only restriction for the named Figma homepage, not for application code.

## Current Scope: Token Reconciliation Then Homepage

### Current Admission — Approved Code Adoption With Unchanged Homepage

PRODUCT local acceptance (2026-10-31): exact CSS/document packet e6d2c6d9d46ceaaec689bb4d3c5877e25fd89ab1fc38597cc1aa9767489a9d69 is accepted after clean replacement QA's full scoped report. Six homepage profiles retain199-node computed equality under same-environment original-rule replay; owner before/after pixel proof is explicitly reused (0 differences outside rotating-eye envelope, footer0). Actual responsive roles/aliases, compact headings, media corners/aspect, Contact focus/locks, fresh hydration/Back and224-node Citymobil isolation pass;41 aliases resolve,144 protected source/config files exact, complete diagnostics0 warnings/errors/exceptions and hygiene pass. Evidence/report remain in PORT-26 and test-results/port26-qa/, not the corrupted predecessor. No required defect remains. This closes local code adoption, not production release, Figma library publication, full-story/device/build or cross-environment pixel-universality claims.

2026-10-31: Ivan explicitly approves implementing the reviewed portfolio DS in code: tokens, typography and radii, while preserving the current homepage visually and using XL/LG only for optional accents. Same PORT-26 now implementation outcome, PRODUCT accountable, FRONTEND one executor → existing QA focused shared-CSS/nonregression checks → PRODUCT. Figma review3022:257 is approved reference for this code boundary; no library publishing or Figma migration required. DESIGN SYSTEM retains definition ownership, FRONTEND owns current CSS/components implementation. Reuse direction1: existing globals.css semantic seams, portfolio layout/grid/type/link/media classes; no external DS or parallel CSS framework/component family.

Approved type contract: XL90/96 Desktop→40/44 Mobile, LG48/52→28/32, Medium500; ordinary14/20 Regular400 with independent Medium500/Bold700 emphasis, Technical12/16 Regular400 for deliberate short captions/notes. Keep semantic h1/h2/h3/h4/h5 independent of visual role, compact14/20 where used; never globally map HTMLh1 to XL orh2 to LG or add fictitious heading nesting. Preserve actual homepage headings/identity/body/metadata/contacts/hero geometry, fonts/weights/spacing/photo40percent/loader/animations/SEO. Do not apply Technical to ordinary homepage descriptions or turn existing home titles into accents.

Token contract: invariant numeric primitives reused/added minimally for the exact semantic roles, colors and independent weights; semantic aliases point to primitives, with responsive CSS media-query overrides corresponding to Figma Mobile/Desktop. Reuse existing portfolio breakpoints/grid ownership and explain exact mapping; no viewport JS/provider or mode state. Base radius2 both modes, media8 Desktop/4 Mobile; semantic role consumers, not universal* corner selectors. Preserve intentional circles/pills/plain-text links and image aspect. Existing homepage media/photo/control corner treatments remain unchanged under the stronger no-visual-change boundary; apply newly approved radii only to appropriate portfolio-owned media/rectangular components outside that baseline or expose explicit reusable opt-in roles for future case sections. Native Citymobil UI/radii/type/tokens remain isolated. Reviewed responsive spacing aliases can be exposed/reconciled but must NOT replace existing homepage24px insets/grid gutters/section spacing with draft16px/other values. Document any intentionally unused future role rather than silently redesign or add compatibility machinery.

Plan/proof: (1) capture current source identity and exact homepage computed geometry/type/corners plus native desktop/mobile baseline before edits; inspect direct type/media consumers and retain unrelated dirty work, (2) map approved primitives→semantic CSS/type utility classes in current owner, consolidate duplicated same-role literals only when proven equivalent; update existing portfolio non-home consumers narrowly, add no accent to live pages without a chosen accent use, (3) focused token/alias/type/responsive checks, affected type/test closure, hygiene/diff and native desktop/mobile375/390 Light/Dark; compare same homepage at same settled scroll/viewport, mask only nondeterministic loader/photo motion if genuinely needed and retain computed proof. Verify compact semantic headers, existing focus/Contact sheet/native browser navigation, no overflow, current loader hydration clean on fresh/hard load. Native scoped accent/Technical examples or component fixtures must prove token roles without a new public catalog route. Check relevant non-home media radius responsive/aspect and shared CSS does not leak into Citymobil (protected namespace/source hashes and native smoke). (4) exact delta/roles/consumers/omissions and native evidence/readback; direct same Task QA focused these boundaries, not repeated full Citymobil/story/build matrix. QA defects return FRONTEND; pass PRODUCT.

Keep open for homepage visual/computed drift, blanket heading/tag/radius changes, unresolved aliases, mismatched mobile values, token leakage into Citymobil, loader/contact/focus regression or missing native proof. Independent QA verifies changed shared layer and same-home nonregression, reusing accepted PORT-28/Citymobil evidence where unchanged. No production/Git/deploy/runtime replacement, new packages, content/facts rewrite, retained chat cleanup, 3141 or Figma/source-page mutation. Rollback only exact task patch after later-writer check. Current reviewed typography/radius replaces superseded proposals below; source-preservation constraints remain.

#### Code Mapping — Local PORT-26 Adoption

`src/app/globals.css` implements invariant `--primitive-size-*`, `--primitive-weight-*`, palette and existing system-font primitives through semantic `--type-*`, `--radius-*`, `--space-*` and color aliases. Mobile maps to the existing portfolio grid/contact breakpoint, max-width599px; Desktop is600px and above. No viewport JavaScript or new component family. Current execution, source hashes and native proof remain in PORT-26.

| Role | Desktop → Mobile | Current code consumers |
| --- | --- | --- |
| Ordinary / compact |14/20 both; Regular400 / Medium500 | Existing body, compact editorial headings, identity, links and ContactSheet; `portfolio-type-body` / `portfolio-type-compact` opt-in classes |
| Independent emphasis |400 /500 /700, invariant | `portfolio-weight-regular`, `portfolio-weight-medium`, `portfolio-weight-bold`; visual size remains independent |
| Optional XL / LG |90/96→40/44 and48/52→28/32, Medium500 | Explicit `portfolio-type-xl` / `portfolio-type-lg`; intentionally no live page opts in without a chosen accent use |
| Technical |12/16 Regular400, invariant | Existing short `.case-caption` Project/Role/Client captions (plain caption seam renamed in PORT-31); `portfolio-type-technical`; no ordinary home description migration |
| Base / media corners |2→2 and8→4 | Existing portfolio lightbox buttons/media; explicit `portfolio-radius-base` / `portfolio-radius-media` for future appropriate sections |
| Reviewed future section spacing |Inset24→16, gap32→24 | `--layout-inset` / `--layout-gap` exposed without live consumers; existing homepage `--space-section`24 and `--space-inset`32 retain their uses |

Semantic heading tags remain unchanged and independent of optional visual roles; no h4/h5 insertion or global accent mapping. Homepage geometry/type/corners, intentional Contact/grid pills, plain links, image aspect and PORT-28 loader rules are preserved. Citymobil keeps its own namespace/type/radii. Historical Tailwind configuration and retained legacy/chat owners are outside this adoption; no external DS, Figma mutation or publication.

### Current Token Trial — Base2 And Media8/4 Radius

2026-10-31: Ivan requests a review trial: ordinary rectangular portfolio elements use semantic base-radius2px on both modes rather than sharp0; media-radius Desktop8px/Mobile4px (supersedes draft16/8). Reuse invariant2/8/4 and existing semantic alias/mode system, no duplicate primitives. Apply only to current PORT-26 review-owned samples/instances via scoped bindings; preserve intentional circles/pill Contact/grid shapes, source masters/pages and Citymobil's independent native DS. Avoid rounding text-only links or introducing filled rectangles around plain text controls. Technical12/16 and bounded obsolete-type-study cleanup continue with same DESIGNER, one current review3022:257, MCP only. Record trial alias values and show native desktop/mobile media corners plus applicable rectangular-control example; keep other typography/spacing bindings unchanged. This is a design trial, not code/global adoption; return one link/readback/protection/hygiene proof PRODUCT/Ivan.

#### Unified Review Cleanup, Technical And Radius — Result

2026-10-31 · PORT-26 / DESIGNER → PRODUCT/Ivan review. [Same current unified entry3022:257](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=3022-257). The obsolete A/B/C study remained visible alongside the current system; it is now retired after exact-target/consumer/recovery checks. Reuse direction1: current primitive→semantic Mobile/Desktop aliases, SF Pro styles, native metadata-left/specimen-right rows and existing review media. Changes are confined to the admitted review/obsolete study and isolated draft dependencies; no code/global adoption.

| Removed | Proof / retained owner |
| --- | --- |
| Superseded A/B/C section3008:61,390 recorded nodes including profiles3008:67/205/334 | All390 IDs read back absent;15-page outside prototype/flow scan clear before deletion; no component masters inside |
| Draft Strong14–20 stylea86ef2… and Title16–24 style50ae29… | All16 prior style consumers were inside A/B/C; zero after deletion. Only these two unused study styles removed |
| Retained | Accepted Foundations/link/icon/note roots2459:198,2460:8,2460:209,2460:263 remain exact; all15 pages, source flows, shared masters and all153 linked current-review instances preserved |

Technical is an explicit small-role exception:12/16 SF Pro Regular400, same both modes, for short captions/technical annotations only. The ninth Typography row3092:553 retains left272/gap64/right736; actual sample3092:559 uses new draft style4f8b0d… with semantic variables3092:548/549/550 aliasing existing invariant12/16/400. Ordinary prose/descriptions and the compact homepage remain14/20. Existing XL/LG and all eight earlier type samples remain unchanged. No original Caption/Label/UI12px Medium style was repurposed; they remain used/accepted definitions.

Radius trial uses new semanticbase-radius3092:551→invariant2 in both modes, applied only to two review mode cards3048:662/667, availability tooltip3022:489 and the new static rectangular Action sample3092:568 (144×44). Existingmedia-radius3037:11 now aliases8 Desktop /4 Mobile, affecting current review images3022:916/964/1012. Source image hashes/aspects stay intact. Intentional Contact pills/circular grid controls/plain links and the photographic home reference stay exact; no boxes added around text-only actions. Source pages/masters and Citymobil's native DS are untouched. Current metadata notes expose Technical and the radius trial without shrinking existing descriptions.

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Recovery / retirement |390-node snapshot, exact IDs, old native PNG saved BEFORE deletion;15 pages scanned | No outside target references/flow starts; all390 IDs absent; two study styles unused at removal. One current unified review remains alongside accepted foundations | before.json;deletionProof |
| Real alias/mode execution | Same Technical sample, rectangular control and project media; Desktop→Mobile→Desktop | Technical12/16/400, base2→2→2 and media8→4→8; same IDs/style/image aspect1.572687, Desktop restored.18 semantics/36 FLOAT alias edges resolve without cycles | modeProof;variableAudit |
| Native composition | Full current-review scan, focused Typography/base control, desktop and375 media | Inspected;958 nodes:396 TEXT,296 FRAME,153 INSTANCE,65 VECTOR,47 RECTANGLE plus SECTION;0 overflow/unstyled/unbound/wrong-family/missing-font findings after exact-axis load | after.audit;native PNGs |
| Protected content / controls |379 old text/style/font/metric/binding bundles, five link/pill/grid state subtrees | Exact; only seven declared review notes changed. Existing prose stays14/20; no source-page visual change | proof.text;proof.controls |
| Definitions / source owners |38 surviving old style definitions;194 original variables except declared media values; accepted330-node Foundations and four source pages | Exact style definitions/normalized variable hash; Home13/1501,Citymobil40/1096,Manifesto4/330,Grid39/2641 roots/flows exact. Totals39 styles/198 variables after one new Technical style/four semantics | proof.styles/sources/foundations;variableAudit |
| Workspace / receipt | Canonical checkout and bounded cleanup evidence | Hygiene, diff whitespace and focused retirement/recovery/type/radius/source/document checks passed. App tests/build skipped for Figma/document-only scope | Command exit0 |

Evidence: `/Users/ivan/Documents/Codex/2026-10-31/portfolio-designer/work/port26-retire-technical-radius/before.json`, `after.json`, `build.js`; native before/current/focused PNGs in sibling `outputs/port26-retire-technical-radius/`. Before snapshot records all390 native nodes, component-main references and removed style definitions. Recovery is manual native reconstruction; deleted original IDs are not guaranteed restorable. Restore only this removed study/style pair if requested, restore recordedmedia-radius values/base-card bindings and seven old notes, then remove only unused new row/trial/style/aliases after later-consumer checks. Do not reset accepted/source owners. No variable purge, new page/catalog/master, app/runtime/browser test, publication or global adoption. Exact proposed metrics and radius trial remain for Ivan's review.

### Current Revision — Retire Superseded Type Studies And Restore Technical12

2026-10-31: Ivan confirms PORT-26 unified review3022:257 as the single current presentation and asks to remove obsolete typography layouts. DESIGNER owns bounded Figma MCP cleanup: identify exact superseded review/study roots (including prior A/B/C3008:61 if now obsolete), inspect component/style/variable/prototype consumers, record recovery snapshot/IDs, then remove only proven superseded typography study layouts and exclusively unused draft dependencies. Earlier A/B/C-preservation instruction is superseded ONLY for these now-obsolete study artifacts. Preserve current unified review/its typography metadata-left/specimen-right, accepted Foundations, real homepage/project/Grid/Citymobil pages, shared masters, used style/token definitions and source flows. This is NOT permission to delete all other Figma pages or historical authored repository evidence. If a target has live outside consumers or unclear status, preserve it and report exact dependency rather than deleting broadly. No wholesale variable/library purge or code change.

Ivan also explicitly restores a small Technical role:12px for short media captions/technical annotations/supporting microcopy, separate from ordinary14/20 prose/descriptions. Reuse invariant12/16 and current draft semantics/modes, propose Technical12/16 Regular (same Mobile/Desktop unless readability demands a specifically reported alternative); bind actual role style/size/line/weight and show left metadata/right actual-size sample alongside current XL/LG and14px roles. XL90/96↔40/44, LG48/52↔28/32, base14/20 and independent weights remain proposed unchanged; no blanket shrink of current descriptions or homepage. This explicit instruction supersedes prior default-no-Technical12 restriction only for this named role.

Acceptance: one obvious current review entry, no obsolete competing typography studies left among identified cleanup targets; exact removal/retention inventory and recovery, no dangling references or changed protected consumers. Native focused typography plus overall current-review scan, actual12/16/modes/alias readback, unchanged source/global proof and hygiene. Return same PORT-26 link with concise removed/kept summary and Technical sample, directly PRODUCT/Ivan. No library publication/site/global adoption/other-project mutation. Stop only for a material ambiguous/shared destructive target; otherwise finish admitted small cleanup and type addition without new design/QA chain.

### Current Presentation Delta — Typography Metadata Left, Actual Specimen Right

2026-10-31: Ivan asks DESIGNER to make typography easier to scan: each row's LEFT column contains style name, semantic/use role and numeric size/line/weight (with Mobile/Desktop values clearly labelled); RIGHT column contains the editable specimen rendered at its actual role size. Use consistent metadata/specimen columns and clearly separated Desktop/Mobile rows or groups; DESIGNER chooses the clearest spacing while avoiding scaled-down large samples or clipped text. Same Typography block3048:676 and one-entry3022:257, MCP only. This changes review composition only: XL90/96↔40/44, LG48/52↔28/32 and ordinary14/20/weights remain proposals, not approved adoption. Preserve actual styles/aliases/modes, other review blocks/examples, compact homepage and source owners. Readback/native focused typography proof plus protection/hygiene; return same link PRODUCT/Ivan, no code/global changes or duplicated catalog.

#### Typography Columns — Native Result

2026-10-31 · PORT-26 / DESIGNER → PRODUCT/Ivan review. [Same entry3022:257](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=3022-257), only Typography3048:676 recomposed. Previously metadata sat above samples and device variants sat side by side, making size/role comparison harder. The canonical owner is this block's document layout. Reuse direction1: existing native samples, current draft styles/semantic mode bindings and auto-layout patterns; no style/token value change.

One aligned comparison3087:548 has eight rows: XL Desktop/Mobile, LG Desktop/Mobile, Body/supporting Regular and compact Regular/Medium/Bold (ordinary rows explicitly Desktop + Mobile). Left column272px holds name, purpose/device and numeric size/line/weight;64px document gap; right column736px holds the editable actual-size sample. Mobile accents use a343px specimen lane within that column. Text widths wrap naturally; fonts are not scaled. All rows share x0 metadata/x336 specimen origins. Current XL90/96↔40/44, LG48/52↔28/32 and ordinary14/20/400–500–700 remain unchanged proposals.

All eight existing sample IDs survive:3048:687/690 XL,3033:597/3062:553 LG,3033:594 Body and3033:584/587/590 compact weights. Exact characters, style IDs, actual font/size/line and bindings match the prior state. Explicit mode selection moves to each right-column wrapper. Existing chapter header and semantic hierarchy note remain.49 native layout/metadata nodes replace31 obsolete typography wrappers/labels after checking zero outside prototype consumers; no component master, new style, variable, page or parallel catalog. Typography is now1072×1528 with27 FRAME/36 TEXT; whole review940 nodes. Necessary outer section height follows the auto-layout change; later blocks move vertically without internal edits.

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Native composition | Focused1072×1528 Typography PNG | Inspected: consistent two columns, explicit device rows, real-size editable samples;0 overflow/clipping/unstyled/unbound/missing-font findings after exact-axis font loading | typography.png;audit |
| Sample / definition preservation | Eight old sample nodes;40 styles/194 variables/all collection modes | Exact sample text/style/font/metric/binding comparison passes; complete style/variable/collection definition hashes unchanged | proof;before/after hashes |
| Other review owners | Cover, Primitives, Semantic modes, Components, Examples and boundary | All six normalized subtree fingerprints exact; only automatic root-level vertical displacement excluded | proof.protected |
| Workspace / receipt | Canonical checkout; focused source/document/native PNG checks | Hygiene, diff whitespace and columns/sample/definition/protection/document/PNG checks passed. App tests/build skipped for design-only presentation scope | Command exit0 |

Evidence: `/Users/ivan/Documents/Codex/2026-10-31/portfolio-designer/work/port26-type-columns/receipt.json` and `build.js`; focused native PNG in sibling `outputs/port26-type-columns/typography.png`. Scoped recovery reconstructs recorded old review-only wrappers/labels and restores eight recorded sample parents/order/widths, removing only new layout nodes after later-consumer checks; deleted IDs are not guaranteed recoverable. Preserve all definitions, other review blocks and source owners. Prior mode execution/protection proof remains valid; no repeat runtime, browser, app test/build, adoption or release claim for this presentation-only change. Exact metric approval remains open.

### Current Revision — Two Accent Headings And One Compact Text Size

Ivan's follow-up: the actual homepage must not change visually. Define one compact14/20 heading presentation shared by semantic h2/h3/h4/h5 when such levels are genuinely needed; preserve current weight/intensity/spacing. Existing home already hash1/h2/h3; do not insert h4/h5 just to fill a catalog or claim an SEO benefit. The current compact page identityh1 also remains unchanged. Choose HTML heading level by meaningful nesting/accessibility, not visual size; optional XL/LG require explicit visual-style application, never a blanket h1/h2 selector mapping. Update system semantic examples/mapping accordingly; no automatic homepage relayout, font-scale rollout or arbitrary tag replacement is admitted. Any future tag-only code correction must be justified by an actual hierarchy defect and preserve rendered appearance.

2026-10-31: Ivan refines the system after the separated-block presentation. Preserve the homepage's largely uniform compact language: ordinary Body, emphasis, link/control and supporting text around14px, no separate enlarged Label family. Exactly TWO optional contrasting visual heading roles: Heading XL around90px desktop (supersedes112px proposal) and a smaller Heading LG; both much smaller on mobile via the SAME primitive→semantic Mobile/Desktop bindings. DESIGNER proposes exact XL/LG size/line/weight/mobile values, with strong contrast to normal14px text; ~90 is intent, not an instruction to make every h1 huge. Previous16px Label and dedicated12px Technical proposals are superseded as default roles: supporting text returns14px unless Ivan explicitly approves a genuine exception. Weight variants stay independent of size; Body defaultRegular, emphasis/link/current headings may retain existingMedium/Bold where appropriate.

Source check: Header emits page identityh1; HomePage usesh2 for Work Experience/Projects Done/Contact andh3 for career entries, EditorialProjects project titles useh3. Active editorial CSS rendersh1/h2/h3 at14/20 Medium; Body14/20 Regular. This confirms good semantic hierarchy can share visual size. Preserve it: no deletion ofh2/h3 for SEO, no CSS h1→XL blanket mapping or automatic LG on every section title. XL/LG are explicitly chosen accent styles; unchanged compact home remains the main approved reference, not a replacement giant-name homepage proposal.

Same PORT-26 / DESIGNER→PRODUCT/Ivan, existing readable five-block review3022:257, Figma MCP only. Update typography/token maps and examples coherently, preserving primitives/mode architecture and approved masters. Use current homepage as unchanged compact example plus isolated XL/LG accent specimens/applications; existing review chapter headers may use XL as document presentation, not a website typography mandate. Remove or relabel obsolete review-only competing roles after consumer checks; no new catalog or duplicate per-device style family. Show one native desktop/mobile comparison with legible long-title wraps, actual aliases/weights and clear semantic-versus-visual distinction. Preserve palette/components/spacing review and all source pages/runtime. Exact token sizes/weights and global/code adoption remain approval-pending; scoped readback/protection/hygiene proof, one link and concise revised role table back to PRODUCT/Ivan.

#### Two Accent Headings — Native Review Result

2026-10-31 · PORT-26 / DESIGNER → PRODUCT/Ivan review. [Same five-block entry3022:257](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=3022-257). The prior four-role proposal incorrectly expanded ordinary labels to16px and supporting text into a separate12px role. The canonical owner is this isolated review's draft styles/semantic aliases and applied examples. Reuse direction1: existing SF Pro, primitive→semantic Mobile/Desktop bindings, linked controls, palette, media and five-block composition. Source homepage and runtime remain visually unchanged.

| Visual role | Desktop proposal | Mobile proposal | Use / semantic contract |
| --- | --- | --- | --- |
| Heading XL, Medium500 |90/96 |40/44 | Optional selected accent; not a blanket h1 rule or homepage-name change |
| Heading LG, Medium500 |48/52 |28/32 | Optional smaller accent; not every section title |
| All ordinary text |14/20 |14/20 | Body/support Regular400, emphasis/compact headings/links Medium500; independent Bold700 specimen |

Preserve current compacth1 and meaningfulh2/h3/h4/h5 only where content is genuinely nested, all visually14/20. Tags encode document structure; XL/LG are independently selected visual styles, including non-heading accents. No extra h4/h5 samples or secondh1 were invented. The current home excerpts now contain only14/20 text with baseline24px insets; the rejected giant-name/proposed-caption treatment is removed from the review. The actual Homepage page, photo, motion and code were not edited. Project excerpts are explicitly isolated accent applications: XL on the selected long title, LG on one narrative heading, other text14/20. Desktop LG receives the full800px lane to avoid word splitting in the182px sidebar. Existing source text/media and top Back are retained.

Current Typography frame3048:676 presents XL, LG, ordinary text and independent weights. Existing XL styleff9583… is reused, former Technical style7fea37… is repurposed as LG after all ordinary consumers move to Body; Medium/Bold reuse5b4c3e…/cadd42…, Bodyf13450…. One redundant unused Label Regular styleca0be8… is removed. No new style or component master was created. Heading aliases3037:12–14 are renamedtype/heading-xl/*;3037:23–25 becomeheading-lg/*; Body3037:15–17 stays14/20/400 and independent text weights3037:20/22 remain500/700. Duplicate label size/line/regular aliases3037:18/19/21 and unused112 primitive3037:7 are removed after node/style/alias and source-page consumer checks. New invariant90/96 variables3062:548/549 join the same draft collection; existing28/40/44 are reused. Totals:40 styles,194 variables; original35 style IDs/metrics/bindings and174 variable IDs retained, plus five current draft styles and20 isolated draft variables (six constants,14 semantics). A/B/C and their historical styles remain protected history.

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Native composition / wrapping | Same five blocks; desktop and375/390 home/project; actual source media | Inspected final native overview/crops.922 nodes,378 editable TEXT,153 linked INSTANCE;0 overflow/unstyled/unbound/wrong-family/missing-font/placeholder findings after exact font-axis loading.362 ordinary text nodes are14/20 | receipt.audit; native PNGs |
| Mode execution / aliases | SAME project3022:876, XL3022:902, LG3022:913 and media3022:916 | Desktop→Mobile→Desktop exercised: XL90/96→40/44→90/96; LG48/52→28/32→48/52. Same style/IDs; padding24↔16,gap32↔24,radius16↔8 and source aspect1.572687 retained, Desktop restored.14 semantics/28 alias edges resolve without cycles | receipt.proof;variables.graph |
| Source preservation / copy | Original Foundations/A–B–C, Home13/1501, Citymobil40/1096, Grid39/2641 roots/flows | Exact root fingerprints/flows retained; all125 surviving applied-example text strings match their prior IDs/copy.35 pre-existing style metrics/bindings match historical snapshot | sourceProtection;copyProof;styleProtection |
| Scope / cleanup | Current review only |20 new native document nodes; nine obsolete caption nodes, one unused draft style and four unused draft variables removed. Shared masters, source images/routes/runtime untouched | build/refinement consumer ledgers |
| Workspace / receipt | Canonical checkout and scoped evidence | Hygiene, diff whitespace and focused token/mode/copy/protection/receipt/document checks passed. App tests/build skipped for Figma/document-only boundary | Command exit0 |

Evidence: `/Users/ivan/Documents/Codex/2026-10-31/portfolio-designer/work/port26-two-headings/receipt.json`, `build.js`, `refine.js`, `mode-proof.js`; native PNGs in sibling `outputs/port26-two-headings/`. Initial fixed attribution-label widths wrapped after supporting text returned14px; six existing labels now hug their actual text, with final desktop/mobile fit verified. A historical shared style name reads`Portfolio/Heading/XL` instead of`Portfolio / Heading / XL`; its ID/font metrics/bindings match and this task did not write that owner. No rollback of unrelated naming. Native counts/render do not prove browser semantics/focus/platform fonts/runtime. No app tests/build for design-only scope; exact final metric/weight approval remains open before adoption/code.

Scoped recovery restores recorded current-review style/alias definitions, text styles/copy, moved LG parent and home inset/label-width properties, then removes only new nodes/unused new numbers after later-consumer checks. Restore removed draft dependencies only if reverting this revision; deleted IDs are not guaranteed recoverable. Preserve globals/A–B–C/source pages and all other owners. Earlier four-role/112px/16px Label/default12px Technical results below are historical where superseded; primitive/mode architecture and five-block document geometry remain current.

### Current Presentation Revision — Clearly Separated System Blocks

2026-10-31: Ivan reports that the unified review feels cramped and asks DESIGNER to present it as clearly separated blocks, each prominently introduced by the current huge Display/H1 style. Same PORT-26, same file and single review entry3022:257, MCP only. DESIGNER owns presentation composition and may choose a more usable arrangement, whitespace, chunking and scanning order; no further visual-direction permission is needed for this bounded review-layout revision. This is not approval of proposed token metrics or code adoption.

Required understandable progression: first invariant primitives (color swatches and numeric scale), then semantic tokens/aliases with real Mobile/Desktop mappings, then four typography roles/weights, then components/states, then applied responsive examples. Shared chrome/grid/spacing can form their own clearly labelled blocks where helpful. Every major block gets the existing draft Display/H1 visual style, not another arbitrary title size. This is a design-document section label, not advice to emit multiple HTMLh1 on a portfolio page. Expose the dependency primitive→semantic→component without duplicating token truth or making all sections one dense table. Keep one entry link, one review surface and use native sections/frames as needed; make it easy for Ivan to distinguish what he is looking at at normal zoom. Avoid a microscopic everything-at-once poster: visibly generous separation and readable focused groups with logical native layer names. DESIGNER chooses the best presentation, not merely additional labels on unchanged cramped layout.

Preserve proposed metrics and actual modes/aliases/bindings, component variants, real text/media, original globals/A–B–C/source pages/flows. Reuse semantic spacing and existing styles; any document-only composition gaps are not a silent change to website spacing tokens. Relayout only current review-owned nodes (check later consumers before restructuring), remove proven-obsolete review clutter rather than making another parallel catalog. Native full overview plus representative focused block views must show unmistakable group boundaries, legible Display headers, no overlapping/clipped layers and complete content; mode/alias readback and protected-owner/hygiene proof remain required. Return same link with short block map to PRODUCT/Ivan. No code/site/DS adoption/publication or Citymobil change.

#### Separated System Blocks — Presentation Result

2026-10-31 · PORT-26 / DESIGNER → PRODUCT/Ivan review. [Same review entry3022:257](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=3022-257). The cramped presentation came from wide, dense tables and side-by-side full-page specimens. The canonical owner is this review's document layout; reuse direction1 retains current styles, aliases, linked components and all six applied specimens. No website token or application behavior changes.

The native board3022:258 is now one1200px vertical spine with64px document padding and128px between chapters. Those composition gaps are document-only. Every chapter uses the current Display112/112 Medium500 style in explicit Desktop mode:

| Block | Native frame | Presentation |
| --- | --- | --- |
| Primitives |3048:558 | Large color swatches, original photo material, individual invariant numeric bars and weights |
| Semantic modes |3048:646 | Primitive→semantic→consumer chain and separate bound Desktop/Mobile cards |
| Typography |3048:676 | Same Display style in both modes; Body, genuine Label weights and Technical specimens |
| Components |3048:701 | Readable paired state cards, existing top-Back/header/Contact patterns, spacing cards and native grid diagrams |
| Examples |3048:728 | Existing home/project desktop above390/375 mobile pairs, moved intact |

Dense duplicate tables and wrappers were removed after checking that no outside prototype consumer targeted the review subtree. All153 linked instances remain. This revision creates207 document nodes, mutates133 recorded nodes and removes152 review-owned nodes;35 moved roots and their original positions/parents plus property/deletion snapshots are recorded in the scoped receipt. Current inventory is911 nodes:374 TEXT,275 FRAME,153 INSTANCE,65 VECTOR,43 RECTANGLE and one SECTION. The previous856-node composition below is historical; its metric/mode/alias contract remains current.

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Native composition | Full overview and five focused blocks, including component/example crops | Inspected; clear block separation, large Display headings;0 overflow/unstyled text/placeholders,0 missing-font flags after exact font-axis load | Native PNGs; audit |
| Metrics and modes | Six existing specimen subtrees;17 semantic definitions;41 styles/196 variable IDs | Exact normalized subtree fingerprints and semantic definitions unchanged; explicit desktop112/112,padding24,gap32 and mobile48/52,padding16,gap24 read back | audit;modeReadback |
| Protected owners | Original Foundations/A–B–C, Home13/1501, Citymobil40/1096, Grid39/2641 roots/nodes and flows;35 original styles | Exact fingerprints/flows/definitions retained | audit;protection |
| Navigation boundary | Four existing Citymobil Result/Process desktop/mobile frames | Read-only confirmation: visible Back in original top header, native BACK action; no Sections. Prior rollback remains current | navigationNoOp;Top Back Restoration in Citymobil artifact |
| Workspace / receipt | Canonical checkout; scoped JSON, script and document | Hygiene, diff whitespace and focused receipt/document checks passed; app tests/build skipped for Figma/document-only scope | Command exit0 |

Evidence: `/Users/ivan/Documents/Codex/2026-10-31/portfolio-designer/work/port26-separated-blocks/receipt.json` and `build.js`; native PNGs in sibling `outputs/port26-separated-blocks/`. Scoped recovery restores recorded review-owned parents/order/properties and removes only new document nodes after checking later consumers; deleted IDs are not guaranteed recoverable. Preserve accepted globals, source pages and the underlying draft alias/style definitions. Real D→M→D mode execution below remains unchanged evidence; this presentation step reads final modes rather than repeating the same switch. No browser/HTML/focus/runtime/publication claim. Final numeric/Label-weight review remains open before adoption or implementation.

### Current Addition — Primitive Aliases And Responsive Modes

2026-10-31: Ivan explicitly approves the token STRUCTURE for the in-flight four-role review: invariant numeric primitives (2,4,6,8 and the useful existing larger steps) → semantic aliases with Mobile/Desktop modes → consuming components. One semantic token such as page-padding, media-radius or display-size can point to different primitives per mode; primitives themselves do not change with viewport. Example values16/32,8/16,48/96 discussed in chat were illustrative, not approved metrics. Existing four-role typography request and one-entry review3022:257 remain current. Same DESIGNER executor, DESIGN SYSTEM owns eventual accepted definitions; return draft proposals to PRODUCT/Ivan before global adoption/Frontend.

Root gap is an explicit reusable responsive alias contract, not permission for duplicated per-device components or per-frame pixel patches. Inspect current collections first, reuse invariant primitives and compatible aliases; add only minimal clearly isolated adoption-pending draft numeric primitives/semantic variables needed to demonstrate REAL Mobile/Desktop mode switching in the existing Figma file through MCP. This is an explicit narrow exception to prior no-new-mode/collection wording for this review only; no competing production collection, mass migration or accepted-value edits. Show desktop/mobile padding,gap,radius and four-role type size/line-height/independent real weight bindings; same semantic names in both modes. Modes may share a value where adaptation is unnecessary. Keep safe areas env/runtime guidance, not invented fixed primitives. Do not imply Figma switches modes automatically by viewport; frames explicitly select the mode, future code uses breakpoints.

Proof/next action: one compact primitive→semantic→Mobile/Desktop→component/CSS mapping table, actual bound examples with explicit modes, native desktop/375/390 and long-title checks, alias/readback audit (no unresolved/cyclic/wrong-type bindings), protected masters/globals unchanged, scoped recovery and hygiene. Preserve the whole unified review's palette/components/HTML semantics and the new huge Display; show exact final proposed metrics for Ivan approval. No code/site/library publication or Citymobil changes; implementation follows only after review approval. Extend current result rather than create another review board/Task/chat.

#### Responsive Semantic Modes — Final Review Result

2026-10-31 · DESIGNER → PRODUCT/Ivan review. [Same single entry3022:257](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=3022-257). Ivan approved the STRUCTURE, not these exact metrics: invariant numeric primitives → semantic aliases with Mobile/Desktop modes → the same role styles and consumers. This extends the four-role result below and supersedes its separate endpoint-style dependencies and earlier no-new-collection wording only within this isolated review.

Root cause: fixed per-viewport draft styles demonstrated sizes but lacked a reusable mode contract. The review now uses one Display style at every size. Type size/line/weight, frame padding/stack gap and media corners are real variable bindings. Existing compositions consume them through auto layout; no per-device component family, resize callback or second board was created. DESIGN SYSTEM retains eventual accepted-definition ownership; all final values await Ivan's review.

| Semantic token / role | Mobile proposal | Desktop proposal | Consumer |
| --- | --- | --- | --- |
| type/display/{size,line,weight} |48/52, Medium500 |112/112, Medium500 | Same Display style and heading nodes |
| type/body/{size,line,weight} |14/20, Regular400 |14/20, Regular400 | Same draft Body style; accepted Body definition unchanged |
| type/label/{size,line,weight} |16/24, Medium500 default | Same | Independent Regular400 / Medium500 / Bold700 aliases/styles |
| type/technical/{size,line,weight} |12/16, Regular400 | Same | Metadata and captions |
| page-padding |16 |24 | Four padding fields on the existing example frames |
| block-gap |24 |32 | itemSpacing on the same page stacks |
| media-radius |8 |16 | Four corners of the same source-image rectangles; aspect locked |

Explicit draft collections: `Draft / PORT-26 / Invariant numbers`3037:2 has one Invariant mode and only five missing constants6/48/52/112/700 (variables3037:4–8). Existing invariant2/4/8/12/14/16/20/24/32/400/500 are reused. No primitive value changes by viewport. `Draft / PORT-26 / Responsive semantics`3037:3 has Mobile3037:1 and Desktop3037:2, with17 FLOAT semantic variables3037:9–25. Every one of its34 mode values is an alias to an invariant number; no unresolved/cyclic/wrong-type path. Family SF Pro and tracking0 remain existing bindings. WEB code syntax uses draft semantic names, shared by both modes.

All six home/project frames explicitly select Mobile or Desktop; Figma does not detect viewport width automatically. Home/project mobile390/375 now has358/343px lanes from the proposed16px inset; desktop1440 endpoint remains an800px reading crop with24px inset. Existing24px grid gutters, safe-area guidance and other baseline values remain a reference, not silently changed globals. One note labels the baseline versus draft proposal without changing its geometry. Future code must implement approved breakpoints/fluid Display behavior and env safe areas separately.

Actual switching was exercised on the SAME project frame3022:876, heading3022:902 and media3022:916: Desktop → Mobile → Desktop. Only its explicit semantic mode changed during those measurements. Font size/line changed112/112 →48/52 →112/112; padding24→16→24, gap32→24→32 and radius16→8→16 followed automatically. The Display style ID stayed identical. Source-media aspect remained1.572687 throughout. Desktop was restored afterward.

Five r2 draft role styles were rebound, one semantic Body style was added, and the unused old mobile-Display style plus all nine obsolete endpoint variables3032:548–556 were removed after consumer checks. There is one Display style rather than a compatibility pair; the accepted Foundations collection is back to its original160 variables. Current totals are41 styles/196 variables: original35/174 retained, plus six draft role styles and22 draft numeric/semantic variables. Original collection modes and definitions were not edited.

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Alias graph / primitives |16 reused/new numeric constants;17 semantic aliases ×2 modes | All invariant, FLOAT-compatible and resolved;34 valid edges,0 cycles/unresolved paths | receipt.json audit |
| Real mode change | Same project frame, heading, image; only setExplicitVariableModeForCollection | Passed Desktop→Mobile→Desktop for type/padding/gap/radius; same style/IDs, aspect retained | proof.sequence |
| Native viewport / long title | Full review, desktop home,375 home and390/375 project | Inspected native PNGs; three-line project title at both mobile sizes, readable labels/technical text;0 child overflow | outputs/port26-responsive-modes/ |
| Fonts / bindings |353 editable TEXT, same Display style across six frames |0 unbound text; exact font names including axes loaded,0 missing-font flags, actual400/500/700 | audit;fontProof |
| Protected owners | Original Foundations/A–B–C, Home, Citymobil and Grid roots/flows;35 pre-existing styles | Passed exact source fingerprints/style definitions; palette/controls/chrome exact, spacing exact apart from declared note text | protection/audit |
| Scoped inventory | Same entry, no new component master/page/file/library |856 nodes:353 TEXT,254 FRAME,153 INSTANCE,65 VECTOR,30 RECTANGLE plus SECTION;1904×6029.7 | audit |
| Workspace / limits | Figma/docs only | Hygiene/diff/focused receipt checks passed. No browser/HTML/focus/CSS/site/global adoption or release claim | Command exit0;explicit scope |

Evidence: `/Users/ivan/Documents/Codex/2026-10-31/portfolio-designer/work/port26-responsive-modes/receipt.json` with exact definitions, property recovery, source protection and switch sequence; native full/focused PNGs in sibling `outputs/port26-responsive-modes/`. Font flags queried without per-call exact font loading initially reported unloaded-context fonts; the final check loads all three actual named/axis fonts and returns0 missing. This is native Figma proof, not browser/platform-font verification.

Scoped recovery restores recorded local review style/layout bindings/modes and text note, then restores the prior draft dependency snapshot only if reverting this addition. Remove only unused task-owned semantic/numeric collections/variables/styles after later-consumer checks. Do not reset accepted collections, globals, A/B/C or source pages; native deleted IDs are not guaranteed recoverable. No code, Citymobil demo, new Task/board/chat, publication or implementation handoff. PRODUCT/Ivan reviews proposed metrics and Label weight before adoption.

### Current Revision — Responsive Display And Four Text Roles

2026-10-31: Ivan changes the compact-only constraint: add a VERY large Display/H1 accent style, responsive via tokens, plus one normal main/body role, one slightly larger label/heading role with selectable real weights, and technical text12px. Same PORT-26, DESIGNER current executor → PRODUCT/Ivan review, Figma MCP only in the existing unified review3022:257. This supersedes the prior no-display restriction for THIS isolated review revision; A/B/C remain historical proposals, none selected. Preserve accepted global definitions/other pages/runtime.

Show four coherent roles together and applied to identical real home/project content at desktop and375/390 mobile. DESIGNER proposes explicit desktop/mobile display font-size AND line-height token values with a genuinely large visual step, not only a16px title; demonstrate long/wrapping title safety. Body stays normal/Regular and consistent site-wide; label/heading slightly larger than body, with Regular/Medium/Bold specimens using actual available weights; technical is12px with a readable proposed line-height. Display accents may be non-heading text: distinguish visual Display from semantic h1/h2/h3, one page-levelh1 by document hierarchy, never choose heading rank for font size. Existing links/actions retain their semantic contract and44px target irrespective of text size.

Use current font/palette/spacing and native variable-bound styles; expose family,size,line-height,weight aliases and desktop/mobile mappings in one short token table. Reuse compatible existing definitions; any necessary new role/size/weight aliases are isolated draft-only, explicitly named adoption-pending, not edits to accepted shared values or a parallel global system. Show real variable bindings and verify actual font weights, not faux bold. Do not resize every existing heading or redesign home/hero; apply new display deliberately as proposed accent usage in the isolated examples. Update the unified review rather than creating another entry/file/library; preserve other groups and source roots, log exact scoped delta/recovery.

Acceptance: four-role inventory complete, dramatic responsive Display visible at both sizes, body Regular/label weight variants/technical12px read back correctly, all specimen text bound/editable with no overflow/clipping and no missing fonts; semantic/token mapping explicit; native full review and focused desktop/mobile captures plus protected-owner/hygiene proof. Return one updated link and proposed metrics to PRODUCT/Ivan. No site/code/global adoption/library publication or Citymobil-demo mutation before review approval.

### Current Admission — One Unified Portfolio System Review

2026-10-31: Ivan requests DESIGNER to present the whole minimal portfolio system together before site-wide implementation: semantic typography, links/buttons and responsive padding, using the homepage language. Same PORT-26 expanded outcome, PRODUCT accountable, DESIGNER sole current executor returning to PRODUCT/Ivan. DESIGN SYSTEM retains canonical shared-foundation ownership; this is assembly/review of existing primitives plus isolated draft proposals, not authority to mutate accepted global masters or publish a library. Use only MCP and the EXISTING portfolio Figma file qnmQs8GxVjZQFKbGU4tR08; one clearly named review page/section with one entry link, not a new file, scattered task boards or competing library. Keep A/B/C3008:61 and original approved roots intact. B remains recommended, not chosen by Ivan.

Root-cause framing: semantic headings already exist; same-looking type is not an SEO defect. The missing artifact is a unified practical role/component/responsive contract. Reuse direction1: current local tokens/type/color/grid/header/link/icon/button patterns and actual home content. Reconcile current design/code values before proposing variants. No foreign design language, large-display scale, source font redistribution, Citymobil-native DS changes or speculative search-ranking claims.

One review surface must show: (1) palette/background/primary-secondary intensity, contrast and over-photo treatment; (2) small typography role→style/token→size/line-height/weight→intended HTML map, allowing identical visual styles with distinct h1/h2/h3 semantics, p/list/time/figcaption and semantic landmarks; no arbitrary H4–H6 inventory or heading-level selection for font size; (3) destination links/internal/external/email versus action buttons/icon controls, with native semantics/names/hover/keyboard-focus/disabled or pending treatment and44px tap area independent of small label; (4) Header initial/scrolled/project-title with existing top Back, contacts/mobile Contact sheet, Section/text/metadata/list-arrow/media-caption patterns and existing footer, without reviving rejected contents navigation; (5) responsive spacing tokens/aliases and desktop/mobile pairings for page inset, max-width,12-column3/9 vs mobile2-column grid/gutter, section/block/inline gaps, component padding, safe-area/dock reserve. Reuse actual existing values; mark only demonstrated missing variants as proposals instead of introducing a new spacing scale.

Apply these to one small identical-content home excerpt and one project-content excerpt at desktop and375/390 mobile, using existing real copy/media where needed; no new page art direction, fabricated portfolio facts or full case redesign. Keep text editable and bound, shared instances linked; reuse current photo/raspberry surfaces and existing primitives. Label approved/current versus proposed clearly, including unselected typography candidates. Show what varies by viewport and what remains stable, and a compact future Figma→CSS role mapping. HTML recommendations are implementation contracts, not proof of browser semantics/SEO indexing/ranking.

Plan/acceptance: inspect named current foundations/home/code patterns → assemble one coherent native review page → verify token/style/component bindings and desktop/mobile legibility/spacing/overflow/states → native composition exports/readback/protected-root proof and hygiene → same Task directly PRODUCT/Ivan. Canonical result here records current entry link, final inventory/role/spacing map, pending decisions and exact scoped changes/rollback. No Frontend/site implementation or mass global adoption before Ivan approves the assembled system. Keep open if detached/unbound styles, inconsistent spacing, semantic mislabels, clipped content or scattered review entry points remain. No code/runtime/Git/release/Citymobil/PORT-17/3141 mutation.

#### Responsive Display And Four Roles — r2 Result

Initial endpoint-only r2 snapshot. The final semantic-mode result above supersedes its separate Desktop/Mobile Display styles, nine endpoint variables, fixed24px mobile insets and828-node/183-variable counts. Four-role visual direction and protected-source boundaries remain current.

2026-10-31 · DESIGNER → PRODUCT/Ivan review. [The same unified review3022:257](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=3022-257) now shows the admitted four-role direction. Only its typography group, applied home/project text, legends and resulting auto-layout height changed. Palette, states, chrome and spacing groups retain their exact internal fingerprints; the original A/B/C is preserved as unselected history. This replaces the r1 compact-only typography proposal, not accepted site typography.

The demonstrated missing artifact was a dramatic responsive accent with four coherent role contracts. Canonical owner remains DESIGN SYSTEM for any later adoption; DESIGNER owns this isolated review. Reuse direction1: current SF Pro, Body/SM, color/spacing/grid and font-family/weight/tracking variables. Six new adoption-pending styles and nine narrowly scoped variables were necessary for the missing Display endpoints, Label Bold700 and role aliases. Existing shared definitions were not rewritten.

Proposed metrics below are font-size/line-height in pixels:

| Visual role | Desktop1440 endpoint | Mobile375/390 | Actual font / weight | Size / line / weight bindings |
| --- | --- | --- | --- | --- |
| Display accent |112/112 |48/52 | SF Pro Medium500 | Desktop3032:548/549; mobile3032:550/551; existing5002465:86 |
| Body |14/20 |14/20 | SF Pro Regular400 | Existing Body/SM2465:117/118;4002465:84 |
| Label / Heading |16/24 |16/24 | SF Pro Regular400 / Medium500 / Bold700 | Draft3032:552/553 alias existing body/base16/24; Bold3032:554; Regular/Medium reuse existing weights |
| Technical |12/16 |12/16 | SF Pro Regular400 | Draft3032:555/556 alias existing label/sm12/16;4002465:84 |

All roles bind existing family2459:11 and tracking02465:90; existing text-color bindings remain. Draft names are `Draft/PORT-26/r2/*` variables and `Draft / PORT-26 / r2 / ...` styles, explicitly ADOPTION PENDING. Variables use FONT_SIZE/LINE_HEIGHT/FONT_WEIGHT scopes and draft WEB code syntax. Body reuses the accepted style directly. Regular400, Medium500 and Bold700 were available, loaded and read back as genuine named fonts/axes; no synthetic bold. Medium Label is illustrated in the applied examples, not selected by Ivan.

Responsive intent:≤599px uses48/52,1440px and above112/112, with continuous interpolation of both pairs across600–1440. Two Figma endpoint styles show this mapping without adding collection modes. It is a future CSS contract, not implemented fluid behavior. Desktop specimens are800px reading crops of the1440 endpoint; their848px outer frame is not a claim that an848px viewport already uses112px text.

Display is a visual role independent of HTML rank: page h1 may use it, while a non-heading accent may be p with the same style. Section/item h2/h3 use Label; compact header context remains p. Existing destinations/actions keep their semantic contract and minimum44px target; other control/header samples retain their current14/20 styles pending component adoption. No automatic heading-wide resize or photo-hero redesign occurred.

The same three home and project specimens retain identical real copy. Display applies deliberately to the page name/project title, Label to hierarchy, Body Regular to prose and technical12/16 to metadata/captions. Current source pages/media remain read-only. Natural wrapping is visible: long project title is three lines at800/342/327px; home name uses one line on desktop/390 and two on375, with automatic content height and no clipping. Existing source-correct top Back remains in the header.

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Four-role metrics / bindings | Six applied excerpts plus role/weight and long-title catalog | Passed actual112/112,48/52,14/20 Regular,16/24 weights400/500/700 and12/16 Regular; all text editable and bound | receipt.json dependencies/build/audit |
| Native composition / wrapping | Full review; desktop home;375 home/project;390/375 catalog | Inspected native exports;0 child overflow/unbound text; natural1–3-line wrapping, no fixed-height clipping | unified-review.png;home-desktop.png;home-mobile375.png;project-mobile375.png;roles-and-weights.png |
| Other review groups | Palette, controls, chrome, spacing | Exact internal fingerprints retained; outer vertical positions follow auto-layout | audit.protectedGroups |
| Accepted owner protection | Original Foundations5/720 incl A/B/C, Home13/1501, Citymobil40/1096, Grid39/2641;35 original style definitions | Passed exact fingerprints/flows/style definitions. No accepted-variable write; only9 new draft variables, collection modes unchanged | receipt.json before/stylesBefore/protection/audit |
| Scoped final inventory | Same review entry |828 nodes:331 TEXT,248 FRAME,153 INSTANCE,65 VECTOR,30 RECTANGLE plus SECTION;41 total styles/183 variables after scoped additions | audit;dependency receipt |
| Workspace / runtime boundary | Figma/docs only | Hygiene, diff and focused receipt/document checks passed; no browser/HTML/focus/fluid CSS/SEO/runtime or release claim | Command exit0;explicit limits |

Evidence: `/Users/ivan/Documents/Codex/2026-10-31/portfolio-designer/work/port26-display-r2/` contains receipt.json, dependencies.js and review-update.js; native PNGs are in sibling `outputs/port26-display-r2/`. Exact delta:65 new typography-catalog nodes,62 obsolete r1 catalog nodes removed,111 existing review IDs updated; nine draft variables3032:548–556 and six draft styles are listed in the receipt. No new page/section/collection/component master/file/library or accepted definition edit. The same entry now measures1904×5881.7.

Recovery restores only recorded review text/style assignments and legends and reconstructs the captured r1 catalog at3022:305, then removes only unused r2 styles/variables after checking later consumers. The property ledger is not a native backup and cannot guarantee deleted child IDs. Never reset A/B/C, globals, source pages or unrelated work. Pending Ivan's four-role metrics/Label-weight review; no FRONTEND/global adoption, app code, Citymobil demo, Git or release work.

### Unified Minimal System Review — PORT-26 Result

Historical r1 snapshot. Its compact typography/caption-selection wording and825-node/35-style/174-variable totals are superseded by the r2 result above; the same entry, other review groups and original-owner protection remain current.

2026-10-31 · DESIGNER → PRODUCT/Ivan decision. [One unified editable review3022:257](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=3022-257) is the single entry in existing Foundations2459:2. One additive section contains palette/material, semantic type, controls/states, shared chrome, responsive geometry and paired home/project excerpts. Original A/B/C3008:61 and all accepted masters remain intact. No candidate is adopted; DESIGN SYSTEM retains shared-definition ownership.

The demonstrated gap was a missing unified practical role/component/responsive contract, not absent HTML headings. Active HomePage/Header/EditorialProjects and globals.css already use h1/h2/h3 with compact14/20 typography. Reuse direction1: current portfolio text/color/spacing/grid aliases, linked Link/arrows/Header/Contact/grid-control primitives, exact A-control home copy, and existing case media as read-only source. No compatible whole-view portfolio composite was found in the subscribed Hito library; nothing was imported. No Code Connect files exist for the inspected patterns.

The seven review groups are palette3022:272, type3022:305, controls3022:367, chrome3022:492, spacing3022:594, home3022:676 and project3022:870. Review geometry is1904×5097.7; the full native export includes the surrounding section bounds. All headings remain compact. Native UI surrounds four discrete reused content images; no full-page screenshot was imported as the deliverable.

| Role / intended HTML | Current reusable style / metrics | Review boundary |
| --- | --- | --- |
| Page h1; section h2; item h3 | Portfolio / Emphasis,14/20 Medium500 | Semantic rank is independent of font size; repeated chrome context is p, not another h1 |
| Role, prose, lists | Portfolio / Body / SM,14/20 Regular400 | Existing primary/secondary color aliases |
| Metadata / exact dates | Body / SM,14/20 Regular400 | time only with a valid machine-readable source date |
| Caption / figure | Portfolio / Caption,12/16 Medium500 | Existing project role; home A/B study's14/20 caption is a separate proposed role, explicitly exposed as a pending choice |
| Destination a; action button | Portfolio / Link,14/20 Medium500 | Internal/external/mailto versus Contact/dialog/grid actions;44px target,16px icon |
| B / C samples | Existing PORT-26 Strong14–20 / Title16–24 drafts | B14/20 Semibold; C16/24 title and12/16 metadata. Neither selected or globally applied |

Palette reuses background#3A0823, primary#FFE7A3 and yellow64% secondary. Flat-sRGB primary/background13.89:1 and composited secondary/background6.22:1 are calculated color pairs, not a new over-photo contrast pass. The material crop retains the current photo hash,40% black toning and editable white identity; the original home photo/crop/motion stays untouched. Header variants and the current top-Back case instance remain linked. Current plain project Contact and filled home dock Contact are both shown, with the existing Off/On/Focus grid instances. Current footer repeats Contact destinations only.

Default/hover/focus link instances, pressed-state guidance, semantic names and44px hit areas are shown. Existing In Progress project availability is distinguished from asynchronous loading. Disabled/pending buttons are labelled isolated conditional proposals; no real action is made asynchronous or disabled. Static Figma specimens are not evidence of browser keyboard/focus/dialog execution. There is no rail/Sections/contents navigation.

| Responsive owner / alias | Current value and future CSS mapping |
| --- | --- |
| grid/inset; grid/gutter |24px → --grid-inset/--grid-gutter; left/right safe areas remain env values |
| grid/content-max |800px → --grid-max:var(--content-width); desktop3/9 spans182/594 with24px gutter |
| grid/equal/* |12 tracks/3–9 desktop;2 tracks/1–2 below600px, with existing narrow-desktop fit fallback |
| layout/space/xs,sm,section,inset |4/8/24/32px; current site section separation composes32px margin +32px padding |
| grid/control-target |44px with20px label and12px vertical clearance; current icon16px |
| Dock/safe area | Current reserve72px at safe=0, rounded to8px where supported; page bottom32px + reserve |
| Existing wide project pattern | Figma1280px/32px versus editorial site800px/24px; the review's800/24 project application is an isolated proposal |

Home specimens3022:682/740/797 use848/390/375px outer widths and800/342/327px lanes. All27 text strings match, including authored intro, Saavi entry, pending project and appended current Contact footer. They are labelled text-only excerpts, not a replacement photo-home. Project specimens3022:876/938/986 apply the same real copy/media at desktop and390/375, preserving the source image aspect; desktop narrative/media use182/594, mobile media spans the full lane. The project excerpt is proposed cross-page spacing, not an alteration of PORT-17. Current code/Figma Contact-sheet padding differences (16+safe versus32px vertical) are exposed rather than silently reconciled.

Pending decisions: choose A/B/C; confirm the conditional state contract and caption role; keep intentional wide project media or adopt the narrower editorial application. Recommendation B remains a recommendation. No FRONTEND/global adoption follows before Ivan's selection of the assembled system.

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Native editability / bindings | Final single review | Passed825 nodes:334 TEXT,242 FRAME,153 INSTANCE,65 VECTOR,30 RECTANGLE plus SECTION; zero unstyled/unbound text, only SF Pro | receipt.json finalAudit |
| Responsive copy / geometry | Home and project desktop/390/375; compact controls/header/sheet | Identical body copy; no child overflow. Native full composition and one scoped post-refinement export inspected | unified-system-review.png; final-* crops |
| Existing owner protection | Foundations5 roots/720 nodes incl A/B/C; Home13/1501; Citymobil40/1096; Grid39/2641 | Passed original root fingerprints and existing flow starts; no source-page mutation | receipt.json before/protection/finalAudit |
| Shared definitions |35 text styles and174 variables | Exact ID inventories retained; zero new style/variable/component master/page/collection or accepted-definition writes | Scoped mutation receipt/inventory |
| Runtime / release | Figma-only review | Not exercised or changed; HTML/focus/scroll/motion/safe-area hardware/SEO claims remain contracts, not runtime proof | Explicit limits above |
| Workspace / docs | Canonical review checkpoint | Hygiene, diff whitespace and focused receipt/document checks passed | Command exit0 |

Evidence: `/Users/ivan/Documents/Codex/2026-10-31/portfolio-designer/work/port26-unified-system/receipt.json` and build.js; native PNGs in sibling `outputs/port26-unified-system/`. Pre-refinement export is retained for trace; final PNG includes current left-arrow/top Back, actual home Contact dock and the explicit caption choice. Recovery removes only new section3022:257 after checking later consumers; all task-created IDs are recorded. No global rollback, old A/B/C deletion, new file/library, application code, Citymobil demo/source, PORT-17/3141, Git or release mutation. DESIGNER releases the writer to PRODUCT/Ivan decision.

### Current Typography Study — Compact Homepage Baseline

Historical artifact only: this A/B/C study and its two exclusively used draft styles were retired on2026-10-31 by the bounded cleanup above. Its former Figma node links are historical; unified3022:257 is the only current PORT-26 review. The earlier evidence below remains retained, not a current selection gate.

Ivan requests small, homepage-like typography rather than the proposed24/32 page-title scale: a page title can stay small; hierarchy may use a slight size step, a smaller secondary role, genuine Semibold and existing intensity/spacing. This admits an isolated Figma-only typography comparison, not replacement of accepted shared values or live pages. PRODUCT is accountable; DESIGN SYSTEM is the one current executor, returning specimens to PRODUCT/Ivan for selection. PORT-15 stays Done; the new follow-up Task owns this outcome.

Root-cause framing: HTML H1/H2/H3 already exist in active home source, while editorial CSS intentionally presents them at14/20. The missing product artifact is a clear compact role catalog and comparable applied examples, not absent semantic tags or proven indexing failure. Canonical design owners are existing Foundations page2459:2 and current approved homepage context in file `qnmQs8GxVjZQFKbGU4tR08` (inspect live current roots; current photo-home section2920:781 is a discovery pointer, not permission to overwrite it). Reuse direction1: current SF Pro family/available real weights, local typography variables/text styles, primary/secondary color roles, spacing/grid, local link/icon and Header patterns. Do not import a foreign system or reset token architecture.

Deliver exactly one compact editable comparison section in the existing Foundations area, using real homepage content and three intentionally restrained candidate profiles:

1. **A / Current:** capture the actual current homepage role metrics and use them as the unchanged control. Main text is currently14/20; read actual Figma/code values before asserting the complete role map.
2. **B / Weight-led:** retain the current sizes/line-height where possible; use genuine Medium/Semibold for a small set of page/section/item titles, Regular for prose, with existing primary/secondary intensity. No faux bold or substitute font.
3. **C / Small steps:** keep body14/20, allow the page title only a modest16/24 step and selected metadata/caption12/16; section/item/UI roles remain compact around14/20 with selective weight. These are review candidates, not chosen production values. No24–48px display headings, new palette, decorative headline or global font replacement.

For every profile show the same semantic inventory: page title/name; section heading; company/project/block heading; role/subtitle; body/introduction; secondary description; date/metadata; media caption/technical note; link/navigation/control label. Several semantic roles may deliberately share one visual style. Document recommended H1/H2/H3/p/list/figcaption/link/button use independently of pixel size; Figma labels are not browser/SEO proof. Avoid unused H4–H6 and arbitrary extra sizes.

Apply each candidate to a SMALL identical homepage excerpt at desktop reading width and mobile390px: name/role/contact context, the actual introduction, Work Experience heading and one real career entry/date/description, Projects Done heading and one real pending project/company attribution. Add one short media-caption specimen because home has no genuine project-evidence caption; label that specimen as a proposed role rather than fabricated project content. Keep the same copy, widths, grid/insets and existing spacing across candidates so typography is the variable. Use source `site-content.ts`/`HomePage.tsx`/`EditorialProjects.tsx` and current rendered styling, not a stale old homepage hero. Respect existing photo-white versus raspberry/yellow surface treatments if photo context is shown. No need to clone the whole long homepage, rebuild photography/eye/motion or create three complete site designs.

Keep candidate styles/tokens clearly experimental and isolated. Reuse existing compatible styles/aliases first; if a missing candidate role genuinely needs a style/token, add only a scoped draft dependency with correct bindings/scope/code-syntax and an explicit adoption-pending label, without editing accepted global values. No library publication, mass rename, new foundation collection family or wholesale cleanup. Return a concise role→size/line-height/weight/style/token map and a small future inventory of already-present shared patterns (Header, navigation, section/text, links/buttons/media), not a new component build queue.

Acceptance: live discovery identifies actual font/weights/current roles and clear reuse; all three candidates cover the inventory and share content; saved text remains editable and bound to the current/scoped candidate foundations; native desktop/mobile composition is legible at100%, with no clipping/baseline collision or broken link/icon/contact layout. Read back metrics/styles/aliases and inspect one coherent comparison composition, plus one targeted post-fix export only when needed. Preserve original homepage/Foundation/global masters/Citymobil/manual54px/navigation draft and code/runtime/SEO. Save exact changed IDs/scoped recovery evidence and direct current Figma links here, update/read back the same follow-up Task, then release to PRODUCT/Ivan. User selection is required before adopting any candidate into shared globals or handing to FRONTEND. Do not resume the deferred left navigation or change Citymobil demo typography.

#### Compact Typography Comparison — PORT-26 Result

2026-10-31 · DESIGN SYSTEM → PRODUCT/Ivan selection. [Editable A/B/C comparison3008:61](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Portfolio?node-id=3008-61) is one additive section on existing Foundations2459:2. [A Current3008:67](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Portfolio?node-id=3008-67), [B Weight-led3008:205](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Portfolio?node-id=3008-205), [C Small steps3008:334](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Portfolio?node-id=3008-334). Current Task: [PORT-26](https://app.notion.com/p/40afe5f58cf581aa8a57fb35cb939782); PORT-15 stays closed. Recommendation: B gives stronger compact hierarchy with unchanged14/20 sizes; this is a recommendation, not Ivan's selection.

Root-cause check: are we fixing the root cause, or only a visible symptom? Current home deliberately renders heading roles at14/20; semantic H1/H2/H3 already exist in source. The missing decision artifact was an applied compact role comparison. Canonical owner is DESIGN SYSTEM for this isolated Foundations study; global adoption remains pending PRODUCT/Ivan. Reuse direction1: current SF Pro and existing typography/color/spacing/grid aliases, Header contacts2487:306, local external-link2459:186 and arrow masters. No external library was imported: subscribed Hito search returned unrelated SaaS primitives, not a compatible portfolio-home composite. No Code Connect files were found for these patterns.

Actual control evidence: current photo-home2920:784 has SF Pro Regular400 at14/20 for subtitle/intro and Medium500 at14/20 for name/links. Existing homepage employment/project masters2476:95/2470:2 use the same body/emphasis/link styles and primary/secondary color roles; active CSS confirms headings14/20 Medium, prose14/20 Regular, contacts44px and pending project button semantics. Figma font discovery/load confirms genuine Regular, Medium and Semibold600. Browser/platform font substitution is not exercised or implied by these native SF Pro specimens.

| Semantic role | A Current | B Weight-led | C Small steps | Intended HTML use |
| --- | --- | --- | --- | --- |
| Page title/name |14/20 Medium500 |14/20 Semibold600 |16/24 Semibold600 | One h1 |
| Section heading |14/20 Medium500 |14/20 Semibold600 |14/20 Semibold600 | h2 |
| Company/project heading |14/20 Medium500 |14/20 Semibold600 |14/20 Medium500 | h3 |
| Role/subtitle |14/20 Regular400 | Same | Same | p |
| Body/introduction |14/20 Regular400 | Same | Same | p/list |
| Secondary description |14/20 Regular400, secondary | Same | Same | p |
| Date/metadata specimen |14/20 Regular400, secondary | Same |12/16 Medium500, secondary | p/time |
| Proposed media caption |14/20 Regular400, secondary | Same |12/16 Medium500, secondary | figcaption with real media |
| Link/navigation/control |14/20 Medium500 | Same | Same | a for destination; button for action |

The pending project's title is also an h3 role, so B uses the heading's Semibold on that button label; ordinary contact/company links remain Medium in all candidates. Company attribution and project-role descriptions stay14/20 Regular, with the actual company link Medium. Caption specimens are explicitly proposed roles, not invented project evidence. No H4–H6 inventory was added; semantic rank is independent of pixel size and Figma labels are not browser/SEO proof.

Two scoped experimental text styles were necessary; no variables or collections were added:
- `Draft / PORT-26 / Strong 14–20` → `S:a86ef2911dc15581bfbcacc51cd2215157c8bb06,`.
- `Draft / PORT-26 / Title 16–24` → `S:50ae29e813763c75961d2c75df2440b1690bebb5,`.

Both are explicitly adoption-pending and bind existing SF Pro family2459:11, weight6002465:88 and tracking02465:90. Strong reuses body/sm size2465:117→14 and line2465:118→20; Title reuses body/base size2465:122→16 and line2465:123→24. The semantic choice is isolated in the draft style, not a rewrite of the existing Body roles. Existing reused styles: Body/SM `S:7f144e1c5b37835b91a353bb4abdaf213ed3e2cc,`; Emphasis `S:d534063a3797fbe77249d275f73dd8430f2a75fe,`; Link `S:fdd0625e15d2ef4f6b07a8fdd82f58d413c9c2a7,`; Caption `S:a7e07934105953ee0a9c4f6e6f04636019838341,`. C's12/16 uses existing Caption/label-sm size2465:137, line2465:138, weight2465:140. Palette uses existing background2459:7→raspberry#3A0823, primary2459:8→yellow#FFE7A3, secondary2459:9→yellow64%; no new intensity values.

Applied excerpts share exact copy: Ivan's name/roles, all three contacts, both actual introduction paragraphs, Work Experience note plus the Saavi career entry/date/summary, Projects Done note plus Taxi Aggregator Support Workspace pending-button title/description/project role/VK–Citymobil attribution. No full homepage or photo/motion reconstruction. The hero copy is deliberately transposed to the content surface for a text-only comparison; approved over-photo white text and photo artwork remain untouched in their original owner. This is not a replacement home layout.

| Candidate | Desktop excerpt | Mobile390 | Geometry |
| --- | --- | --- | --- |
| A |3008:71 |3008:138 |848px specimen /800px lane;390px specimen /342px lane |
| B |3008:209 |3008:267 | Same |
| C |3008:338 |3008:396 | Same; text height changes follow candidate metrics |

All use24px insets, desktop182/24/594px career rail/gutter/reading span and mobile159/24/159px two-track row with full-width342px summary; intro desktop reading width594px. Contacts reuse the existing44px targets; VK remains an editable local external-link instance with44px minimum target and adjacent arrow. Existing semantic spacing tokens own4/8/24/32px gaps. The same specimen geometry/copy is used across candidates; natural C text-height differences are intentional.

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Native editability/font | Six excerpts plus role catalogs | Passed:186 TEXT,124 FRAME,54 INSTANCE,24 VECTOR descendants; zero IMAGE nodes, unstyled text or non-SF-Pro text | receipt.json final audit |
| Copy/role coverage | A/B/C × desktop/mobile | Exact name→text arrays match across all six; nine-role inventory and semantic guidance complete | Per-specimen audit |
| Font/style/token readback | Regular400/Medium500/Semibold600;12/16,14/20,16/24 | Actual weights/metrics and bound style IDs saved; two isolated styles only | Style and role receipts |
| Composition/reachability | Native full comparison at normal scale; final targeted attribution fix | No child overflow, clipped text or baseline collision; native contact/icon/company geometry inspected | compact-homepage-typography.png; pre-fix export retained for trace |
| Accepted-owner protection | Original4 Foundations roots/330 nodes and13 Homepage roots/1,501 nodes | Exact original fingerprints unchanged: e41d96f2 /2f9d405a; no source/global style edit | before/after protection receipts |
| Shared definitions |33 original text styles,174 variables, existing collections/modes | All original style definitions and variable/collection inventories unchanged; only2 draft styles appended | Definition comparison |
| Runtime/SEO/interaction | Browser, production, platform fonts, actual focus/tooltips | Not exercised; no code/runtime/SEO or frontend handoff in this study | Figma-only boundary |
| Hygiene/diff | Canonical repository documentation handoff | Passed; unrelated dirty work preserved | npm run hygiene:check; git diff --check |

Small future inventory is existing Header/context/contacts, section/text stacks, career/project rows, local link/button/arrow/focus patterns, and media/caption semantics; it is not a new component build queue. All new geometry fixes were confined to the comparison section. Source homepage, manual54px/navigation draft, Citymobil, accepted foundation masters/styles/tokens, app source and release state remain unchanged.

Saved evidence: `/Users/ivan/Documents/Codex/2026-10-27/portfolio-design-system/outputs/port26/` contains the final native PNG, pre-fix PNG and full receipt.json with created IDs, two style IDs, protected roots/fingerprints and final metrics. Working ledgers: `/tmp/design-system-state-port26-{typography,styles,build}.json`. Scoped rollback removes only section3008:61 after checking later consumers, then the two listed draft styles only if unused; never delete/reset accepted Foundation or Homepage roots. No new page, collection, variable or component master was created. DESIGN SYSTEM releases its writer to PRODUCT/Ivan selection; no candidate is adopted and no FRONTEND handoff is authorized before selection.

### Approved Transparent Favicon — 2026-10-29

[Current icon Task](https://app.notion.com/p/408fe5f58cf581cb8886dbafbb07d80a). Ivan confirms: transparent background, only the existing eye in portfolio warm yellow `#FFE7A3`. No `IC`, circular lettering, white backing circle, rectangle, rounded corners, shadow or redesign. Reuse direction1: exact existing eye path/proportions/cutouts from `public/favicon.svg` / approved loader eye; deterministic exports, not image generation or Figma work. The demonstrated mismatch is split icon ownership: legacy black/white rounded SVG and independently generated `IC` Apple PNG.

FRONTEND owns only SVG favicon, ICO fallback, Apple PNG generator and strictly necessary existing metadata references. Verify actual raster alpha/corners, exact geometry/color, small-size render and correct dimensions/MIME/references; affected build/types/hygiene and minimal closure, reusing unchanged page/SEO/loader proof. OS-owned Apple masking/background and browser favicon cache are not authored content or guaranteed refreshed by a source check. No native-lock workaround or unsupported installed-device claim.

Fast path: FRONTEND → BACKEND icon-only isolated release → PRODUCT readback, without a new design/QA role loop. Preserve the current READY rollback; extend only the freshly verified accepted live packet with exact icon closure, never full dirty source. Do not bundle the blocked PORT-22 rotation fix, alter loader/ring artwork or lifecycle, pages/copy/social cards/SEO policy/config/Git/DNS/environment, or reopen its native gate. Done requires verified changed artifacts and, when publication is claimed, actual served assets/metadata/build identity; missing proof remains explicit. Native access is not needed to prove file alpha or HTTP readback.

#### FRONTEND Transparent Icon Result — 2026-10-29

PORT-23 / Implementation DoD: Passed. Root-cause check: the mismatch came from separate legacy owners—a black/white backed SVG and an independently generated raspberry `IC` Apple icon. Corrected those canonical icon owners rather than masking presentation. Reuse direction1: exact existing48px favicon eye path, proportions/cutouts and warm yellow#FFE7A3. SVG contains one path only; ICO deterministically rasterizes that SVG at16/32/48/64/128/256px; existing Next ImageResponse Apple generator renders the identical path at180px with transparent background. No new dependency, primitive, metadata reference, loader artwork or page/CSS change.

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Source geometry / raster | Original SVG path vs new SVG/Apple; six ICO PNG frames | Exact path SHAe5a5b3e36a1de935c50ce4e456d9cf9797d0dfa3ba14310f2709cd60312e11ff, one yellow path/no backing; all ICO frames equal SVG raster | test-results/port23-icons/source-render-checks.json |
| Alpha / visual render |16/32/48px and actual served Apple180px over white/raspberry/dark | Transparent corners and internal cutouts, only#FFE7A3 opaque pixels; Apple180×180 RGBA/visible y30–149, no rectangle/IC | apple-alpha-checks.json; render-sheet.png; apple-render-sheet.png |
| Runtime metadata / assets | Local isolated production YwIz57nHcbUORmygwjBbn at3139 | Home/three icons200, correct MIME, SVG+ICO byte-identical; existing SVG/ICO16px/Apple180px references valid | http-checks.json |
| Build / types / hygiene | Exact211-file accepted release plus icon delta | Production build/full tsc/hygiene/diff Passed; no new unit suite for a deterministic asset-only change | build.log; typecheck.log; check-results.json |
| Source isolation |248 intake and accepted PORT-22 manifest33dcc packet |245 intake unchanged, prior211 intact; new211/208preserved/three icon files; blocked ring fix explicitly excluded | release-delta.json; source-manifest.json |

Exact source manifest `78f43790f3147479ad2310e214e5b14270bf231f30f311054cf7986b8987fbe9`. Delta: `public/favicon.svg` SHA99f454dbed160680ea1e359827ec5cca64edf2ec213b198d3d519ebc1b0d3828; `src/app/favicon.ico` SHA1fabdf24be2fcc3bee19862d722bc04b5145bcdb8e5f8b4e750d6e58b34e3dad; `src/app/apple-icon.tsx` SHAd3c1bb064fa47d8493c2928e8bbdbbf1ce513583ea47c247dcf6251eef131a6c. The owner snapshot contains published ring bootstrap59c63cfae9c848ad73498b86c21f7aae72d11b3df44c5d033167ed48118b7c28; working-tree blocked fix80045a59 remains protected outside this release. Snapshot path in owner-build-path.txt;3139 retained for focused comparison, source writer released.

Direct BACKEND next: freshly verify actual accepted live target/READY rollback, isolate ONLY these three icon files over that packet, stage/serve exact assets and alpha/metadata/build readback, then SAME tested-build publication under existing authority. All other208 release files—including layout/loader/ring/copy/routes/social image/SEO/config—are preserved. Reuse unchanged site evidence; no new design/QA/network matrix. Native browser-tab cache refresh and installed Apple appearance were not exercised because native access is locked; no bypass, cache-clear or device guarantee. Authored alpha/render and HTTP proof require no native access. Done/publication remains open until actual public exact assets/metadata/build readback.

#### BACKEND Transparent Icon Publication — 2026-10-29

PORT-23 / Release DoD: Passed; PRODUCT acceptance next. Existing separate SVG/ICO/Apple owners caused the mismatch; reuse direction1 preserves original eye geometry and existing metadata/export seams. Only the three admitted icon files changed over freshly verified accepted live33dcc; isolated211 files/208preserved manifest78f43790f3147479ad2310e214e5b14270bf231f30f311054cf7986b8987fbe9. All211 source hashes rechecked after build. Blocked focus fix80045a59 excluded; published ring remains59c63cfa.

READY stage `dpl_BrdHJ9NXrUjeauGfnjFN4LZZAqtc` / build `WY3YLPDPqkCT4uYmd1q8D` at https://portfolio-dswlwixzp-ivans-projects-133d4a2e.vercel.app was tested, then promoted without rebuild to https://www.cheremisin.co.uk/. Provider actual-host lookup and all promote aliases completed. Fresh prior READY `dpl_8d2pCtsVybL2qEQ44wQuBULXtAYu` retained rollback, unused. Original project/team unchanged; no Git/config/DNS/env/page/copy/SEO/loader mutation.

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Source/build | Exact isolated211-file packet, remote production compile/types/prerender | Passed;208 unchanged, three icon files only; hygiene Passed | test-results/port23-release/isolation.json, source-manifest.json, deploy.log |
| Stage assets/metadata | READY candidate, buildWY3YLPDPqkCT4uYmd1q8D | Home/three icons200, exact owner hashes/MIME/existing metadata references | stage-http.json |
| Public SAME build/assets | www after promotion, provider host and alias readback | Same build; home/SVG/ICO/Apple200; all three byte-identical to tested stage/owner; Apple180px alpha inherited by exact bytes | public-http.json, public-headers.txt |

Evidence directory `test-results/port23-release/`. Initial pre-READY HTTP wait-page probe was discarded; urllib public403 was not a pass, ordinary curl public readback returned200 and exact identity. Unchanged site/31-test proof reused through208 preserved files; no full browser matrix, native favicon cache refresh or installed Apple appearance claim. No native-lock bypass. PORT-22 remains separate/open: its older READY ring candidate must incorporate this now-published three-icon closure before any later promotion to avoid reverting icons; it is not the new accepted live baseline.

### New Design Study — Opening Corner Eye Signature

Current Task: [top-left eye handoff proposal](https://app.notion.com/p/408fe5f58cf581c688a6f6d4b78b6b2e), PORT-22. PRODUCT accountable; Notion owns current executor. New visual outcome after completed PORT-21, not reopening its accepted release/readiness checks. Ivan initially said top-right, then explicitly corrected to TOP-LEFT and asked that the central loader mark smoothly move there. The latest correction owns direction. Home route only; Citymobil/Manifesto/project headers are not in scope.

2026-10-29 approval: Ivan explicitly accepted the current r2 grid-aligned placement and instructed implementation and deployment: “согласованным. Давай реализовывать и деплоить.” The approved artifact is Current Revision — Grid-Aligned Top Eye Slot / Grid-Aligned Top Slot Result — PORT-22 r2, SECTION2920:781. This approval supersedes the earlier design-only/no-code/no-release holds below for this exact packet. PRODUCT admits the FRONTEND → QA → BACKEND sequence on the same Task; DESIGNER releases the artifact and does not implement application code. Preserve the published PORT-21 readiness/input/watchdog/no-JS/Back guarantees and isolate the release from unrelated dirty-workspace changes. Browser verification and same-build deployment/readback remain required implementation/release evidence; native Figma clips do not supply that proof.

Observable proposal: preserve the existing exact eye and circular `Ivan Cheremisin · Product designer ·` with current stationary-eye/8s ring rhythm. After critical readiness, the same perceived mark travels from loading-center to safe top-left while the prepared home is revealed. It remains a noninteractive decorative signature at the opening, fades promptly when downward scroll begins, and restores in the CORNER on reverse-to-top without replaying the center-loading sequence. Cache-ready entry skips the central cover and shows the corner directly; do not force artificial loading/hold to display the travel. Ready mark-out80ms is superseded only for this new visual proposal;3s/error/input watchdog/no-late-photo/no-JS/bootstrap-failure/Back/focus/scroll guarantees remain preserved. Movement must not delay readiness or block the now-ready page. Define early-scroll/input interruptions, reduced/static and restored nonzero Back behavior; no new busy status, persistence, triggerable cover, input capture, focus trap or scroll lock.

Canonical missing feature is a post-readiness decorative identity/handoff, not a networking defect. Reuse `public/images/home/loader-eye.svg` and `loader-ring.svg`, current HomeEyeLoader/home progress/Header seams and portfolio palette/type/grid. Later implementation must not reuse a loading-status controller as a second long-lived busy flag. DESIGNER owns corner placement/size, motion and clear threshold/reversal intent; test actual desktop/mobile/short compositions against contact targets, existing one-name/header baseline and over-photo legibility. No new graphic/logo/color system, altered White40 photograph/copy/geometry, added header height or global chrome change. Keep a single perceived mark during travel, no visible center/corner duplicate. Hidden ring should not consume perpetual animation work; reduced motion remains static with immediate position/nonmoving hide intent.

Plan: inspect the current approved loader/home owners through MCP and exact runtime artwork; create one small owned proposal on the existing homepage page, not a full-home clone/new file/library. Show loading→ready travel→corner, early-scroll hidden and reverse/static variants at desktop/mobile plus representative short height, with actual existing contacts/copy. Save supported native exports/readback/bindings/IDs and scoped protection/rollback, distinguishing timed illustration from actual browser scroll/first-paint/readiness/Back execution. Update/read back same Task and release to PRODUCT/Ivan for visual/interaction approval before any frontend or publication. No website, loader lifecycle, source-logo/favicon, Citymobil or deployment mutation now.


#### Implementation And Release Admission — Grid Eye

Expedited finish,2026-10-29: Ivan explicitly requests faster delivery. Local independent acceptance and isolated stage are already complete; do not reopen design or add new regression permutations. Current QA finishes changed hosted readiness/one-mark/grid/scroll/input/fail-open checks, reusing accepted unchanged source/route/SEO/image-format evidence through exact candidate/asset hashes. Record omitted/reused scope honestly. Then directly return the SAME candidate to BACKEND for authorized promotion and focused live smoke/readback, without another Product approval, rebuild or repeated full matrix. Known required defects still fix forward; this is prioritization/proportional evidence, not a waiver or false pass. Apply the canonical Fast Path For Small Website Changes for later minor edits.

Ivan's explicit r2 implementation AND deploy approval was verified by PRODUCT reading the actual newer human turn in DESIGNER chat. PORT-22 now proceeds FRONTEND → QA local → BACKEND isolated stage → QA hosted → BACKEND SAME-build promotion → QA live → PRODUCT. FRONTEND is sole current executor; no further visual/deploy approval for this exact packet. This supersedes earlier proposal-only holds, not the finite acceptance gates or preserved completed PORT-21 history.

Implement Grid-Aligned Top Slot Result r2 using existing HomeEyeLoader/bootstrap/Header/home-progress and shared lane/type/motion seams (reuse direction1). Keep exact source SVGs144px/40px and stable101.00682296px full-turn visible envelope; normalize the21.49658852px transparent padding locally, not by modifying assets or chasing glyphs. Visible slot follows actual home text/grid leading edge, token-bound top24px plus existing safe insets; desktop320px is a1440px fixture, NOT a universal hardcoded left. Preserve source/copy/White40/contacts/grid/44px header geometry and short/enlarged-text fit omission guard. No new global controller/provider/animation dependency or duplicate visible mark.

On actual selected-image readiness: release busy/input ownership and reveal cover in160ms while the same mark completes480ms center→grid-slot travel with existing easing;8s ring continues, eye unrotated. Movement never creates a minimum wait, extends3s deadline or blocks the ready page. Scroll opacity=clamp(1−scrollY/24,0,1), reverse restores slot only; cached-ready and restored top show slot directly, no center-cover replay. Hidden ring pauses/resumes phase; reduced changes resolve immediately/static. Early pointer/key/scroll/resize/pagehide must settle/cancel only decoration safely, preserving PORT-21 initiating-pointer compatibility-click guard while genuinely waiting, finite orphan tail, fallback/no-late-photo, no-JS/bootstrap/controller failure, native Back/focus/scroll and default-readable document. No body hide/inert/trap/scroll lock or second loading status after readiness.

Owner evidence: scoped source closure/protected hashes, type/build/tests/hygiene and actual cold/warm/readiness/flight/grid/scroll/reverse/interrupt/fit/reduced/native input checks. Independent QA must exercise before-paint/selected decode, actual one-mark travel and release of input at ready, native first/second taps and keyboard while waiting versus during/after travel, failure/watchdog/no-JS/native Back and resize/short/enlarged-fit guard. Measure grid/visible envelope through several rotation phases at mobile375/390, narrow/short/landscape, tablet boundaries and desktop/wide; no clipping/overflow/copy/control movement. Preserve PORT-21 body contrast≥4.5 and existing SEO/routes; decorative repeated aria-hidden artwork is separately assessed for readable noninteractive contrast, not misclassified as canonical body copy. Reuse unchanged valid proof proportionally; design exports are not actual runtime proof. Required failures fix forward with their implementation owner; no false DoD or promotion.

Publication authorized only on original portfolio `prj_87eVQkA1ehpM3rTJszSNj6dqaNDo`, team `team_jK6pcC3dgzpQAcgEwx05ozx4`, www.cheremisin.co.uk. BACKEND revalidates actual live/rollback and extends the accepted211-file PORT-21 packet/manifesta674875ec6dc1967a83759055e42bb6be902405a8adb39596ec045d9154b4ae6 with only approved grid-eye closure. Expected current READY rollback is `dpl_AAzBzUJAxFftvP723LDjjHBWvsFR` / `yfCtwVlNR35ns-vzxM3QB`, subject to fresh readback. Hosted QA precedes SAME tested-build promotion; independent live HTTP/identity/readiness/scroll/input/SEO follows, with material-regression rollback to verified prior live authorized. No whole dirty checkout/Git commit/push/Citymobil/glass-header/project/Manifesto/chat/API/favicon/source-logo/DNS/env/schema/security/paid-service expansion. Same-Task readback/direct verified role handoffs, then Product final acceptance; no Ivan prompt relay.

#### Fast Fix — Visible Ring Not Rotating

Ivan reports the live circular lettering is not rotating and explicitly requests immediate FRONTEND correction/publication (2026-10-29). Reopen same PORT-22 for this existing-outcome regression; no new design/Task/approval chain. Current source sets animationPlayState from opacity AND document focus/visibility/reduced-motion; source inspection identifies a possible unnecessary visible-but-unfocused pause, not yet proof of Ivan's exact browser state. FRONTEND must reproduce actual live computed animation/transform over time and fix the first demonstrated canonical pause/animation cause, preserving exact artwork/name/grid/eye-still/8s and all readiness/guard/history/source/SEO boundaries. Do not edit user OS/browser motion settings or invent a content-name change from spoken transcription.

Use the small-change fast path: real before/after visible rotation at scroll0, one early-scroll hidden/pause/reverse/resume and appropriate reduced-motion/visibility/input smoke, affected owner type/build/hygiene/source closure only. No Figma, new style proposal or full network/SEO/image matrix. Hand the isolated fix directly to BACKEND for staged focused smoke/SAME-build promotion and concise live timed rotation proof/readback on existing approved target, with current READY deployment retained rollback; no repeat approval, whole dirty checkout/Git/config/Citymobil changes or false pass. Root policy/readability/source baselines remain; previous final acceptance is historical while this reported defect is open.

#### BACKEND Ring Fix Stage And Native Access Gate — 2026-10-29

Isolated one-file correction is READY: `dpl_4bene69ArjA7kxx8r6qBaDKDjXNM`, https://portfolio-p72fv05pu-ivans-projects-133d4a2e.vercel.app/, production/skip-domain,build `Gj9t1-u5Bv2ShS07U-Evj`. NEW211-file packet preserves210 accepted PORT-22 files;only bootstrap SHA256 `80045a595b175eb845700ec7f9e178e78596ca3e04e95033f1c5df9b9c2f1ed9` changed via exact approved patch. Manifest SHA256 `e4f1365f1286cae29b5dc328d60e3f62ee4762d66bf6d503303338382967902f`. Local isolated compile/types and remote build pass;post-build211 hashes exact,hygiene passed. Authenticated www still original READY PORT-22 `dpl_8d2pCtsVybL2qEQ44wQuBULXtAYu`,retained rollback;no promotion.

Evidence `test-results/port22-ring-release/`: stage HTTP200/exact build,serialized bootstrap lacks document-focus gate;unique-stage HTTP noindex remains expected. Supported Chrome/CDP ordinary visible-focused sample advances native animation clock1223.358ms over1227.6ms with changed ring matrix,stationary40×40 eye/transform none,slot/opacity1. This is explicitly NOT native address-bar-focus evidence. Initial cold fallback is not used as a rotation pass;ordinary warm reload supplied the visible sample. Read-only Playwright mirror lacked getAnimations,so supported CDP read-only DOM inspection measured the actual CSS animation;no app change/probe/settings override.

**Concrete remaining gate:** native CUA Google Chrome access reported Mac locked/automatic unlock failed. FRONTEND independently hit the same block. No retry/unlock workaround or delegation bypass;Ivan was asked to unlock. No human unlock confirmation received. Existing real native live-before/local-after proof remains valid but cannot be relabelled hosted/native proof. Stage native visible-unfocused/hidden-return gate and subsequent public timed proof remain open;publication not attempted. Own stage Chrome tab retained only as handoff context;other tabs untouched. Resume on actual permitted native access,finish short exact stage pair,then SAME-deployment promotion/public timed identity proof under existing authority. No new matrix/reapproval/QA relay. Unchanged accepted proof/contrast/hardware limits retained.

#### FRONTEND Visible Ring Focus Fix — 2026-10-29

PORT-22 / Implementation: owner DoD Passed; isolated release and public timed proof remain open. Root-cause question: are we correcting the canonical cause or only the visible symptom? Actual public Chrome at scroll0, visibility=visible, reduced=false, focus in the native address bar reproduces a paused ring: currentTime28650.644ms and transform unchanged across1.249s. The canonical decoration owner in `src/components/layout/home-eye-bootstrap.ts` incorrectly required document focus as well as visibility. This demonstrates the visible-unfocused defect; Ivan's exact original window state is not claimed.

Removed only that focus gate and its redundant state/listener. Visibility/opacity/reduced-motion still govern rotation; window blur still settles decorative travel. Reuse direction1: existing HomeEyeLoader/bootstrap/CSS animation/grid/contact seams, no new primitive, CSS, dependency, artwork or lifecycle owner. Exact eye stays stationary;8s ring/name/grid/assets/480ms flight/160ms reveal/readiness/input-tail/3s/no-late-photo/Back/SEO and user settings are preserved.

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Actual before/after | Native Chrome address-bar focus, visible scroll0; live yEH_ydilQbBN7kiUfpNrd → local4OL_hV9NH87EJu0nelZ-o/3138 | Before paused/no advance; after running +1276.91ms and changed matrix; eye40×40/transform none unchanged | test-results/port22-ring-fix/live-before.json; local-after.json; paired screenshots |
| Hidden/return/early scroll | Actual own-tab switch, native wheel0→32→0 | Hidden and opacity0 pause with0ms advance; return/reverse resumes +516.934ms, no center replay | hidden-scroll-smoke.json |
| Reduced/input/mobile | Scoped reduced-motion emulation then reset;390×844 Contact first action/Escape | Reduced static; modal ring paused; Close focused; Escape returns Contact, ring running/body unlocked/no overflow | reduced-input-smoke.json; mobile-contact-return.png |
| Owner checks | Clean canonical248-file snapshot; Next production build/full tsc/hygiene | Passed, build4OL_hV9NH87EJu0nelZ-o,3138; warning/error logs empty | build.log; typecheck.log; hygiene.log; console.json |
| Exact source boundary |248 intake files and accepted211-file packet |247 intake unchanged; old211/manifest33dcc intact; one bootstrap delta only, expected new211/210preserved | source-closure.json; release-delta.json; release.patch |

Evidence root: `test-results/port22-ring-fix/`; screenshots: `/Users/ivan/Documents/Codex/2026-10-29/portfolio-frontend/outputs/port22-ring-fix/`. Canonical snapshot path is recorded in owner-build-path.txt and stays available at3138. Release delta bootstrap SHA256 `80045a595b175eb845700ec7f9e178e78596ca3e04e95033f1c5df9b9c2f1ed9`; before matches accepted live packet exactly. Do not publish full dirty checkout or full canonical snapshot. BACKEND extends existing PORT-22 packet only, freshly verifies current READY PORT-22 rollback/target, performs focused stage timed visible-unfocused/hidden-return smoke, promotes SAME tested candidate and proves actual public rotation/build. No QA relay or renewed approval.

Unchanged full network/SEO/image/geometry/first-paint/readiness/native input matrices and31-test proof are reused from accepted PORT-22 via preserved210 release files; not rerun or newly certified. No hardware/Safari/AT/performance or universal contrast/timing claim. Existing body4.542/separate decorative sampled2.905DPR2/2.984DPR1 limits remain. The task stays open until isolated hosted/live correction is verified; prior Done checkpoint below is historical for this reopened defect.

#### PRODUCT Grid Eye Final Acceptance — 2026-10-29

PORT-22 Done. Approved r2 grid-eye handoff is published; independent local/hosted and focused live acceptance below pass with proportionally reused unchanged proof. Fresh PRODUCT authenticated www readback confirms exact READY `dpl_8d2pCtsVybL2qEQ44wQuBULXtAYu` on original portfolio project, live build `yEH_ydilQbBN7kiUfpNrd`. No reproduced required defect or remaining release action. Existing HomeEyeLoader/bootstrap/grid/Header/progress/contact/artwork seams reused; no global redesign.

Deploy result: https://www.cheremisin.co.uk/ · production · READY · Next.js · build25.675s · isolated211-file packet/208preserved/3delta, manifest `33dcc27d29efaafb64b63385bbb21562db7012f9b4eca987b68412551a5f78c8`, not a new Git commit or dirty-checkout publication. SAME tested build promoted without rebuild; READY PORT-21 `dpl_AAzBzUJAxFftvP723LDjjHBWvsFR` retained rollback, unused.

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Required changed behavior | Independent local/hosted plus focused public slot/scroll/input/focus/overflow/error checks | Passed finite scope; unchanged proof reused, no new matrices | QA receipts below |
| Published target | Fresh PRODUCT authenticated www/READY/project; independent exact public build | Passed exact SAME candidate | Provider readback/live smoke |
| Preserved boundary | Source closure/asset bridge,body/SEO/routes/readiness/controls | Accepted; no unrelated source/Git/Citymobil/config change |211-file/3-delta receipts |

Body minimum4.542 and separate decorative sampled2.905DPR2/2.984DPR1 remain explicit; no artwork3:1/4.5 or universal accessibility/timing certification. Hardware/Safari/AT/performance/search/external-delivery limits retained. Public browser logs clean; no extra server-hour log/drain audit or monitoring setup claimed. Product hygiene/diff checks and final Task readback close acceptance. Completed PORT-21 remains history/rollback, Citymobil stays design-only; later small changes use the canonical fast path.

#### QA Grid Eye Live Smoke —2026-10-29

PORT-22 / focused live Verification: Passed on https://www.cheremisin.co.uk/, SAME dpl_8d2pCtsVybL2qEQ44wQuBULXtAYu / yEH_ydilQbBN7kiUfpNrd. Existing HomeEyeLoader/grid-lane/Contact seams reused; no QA product-code changes. Approved readiness-to-slot ownership is verified; no reproduced required defect.

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Identity / headers | Independent public HTTP | 200, exact build, no HTTP noindex | test-results/port22-qa-live/http.json |
| Slot / scroll | IAB desktop, scroll 0→48→0 | One mark; slot retained; ring running→paused→running | Focused live DOM observations; hosted 24px opacity proof reused |
| Ready input / focus | IAB 375×812 Contact Enter / Escape | First action opens sheet, Close focused; Escape restores Contact; ring pauses behind sheet | Focused live AX observations |
| Geometry / disposal | IAB 375×812 | Slot24/24, no overflow, signature slot, status none, surface pointer-events none, body unlocked | Focused live DOM observations |
| Errors / cleanup | Own live tab | Empty warn/error logs; viewport restored, tab closed; hygiene Passed | npm run hygiene:check |

Owner live bootstrap/two SVG/CSS byte receipts reused with exact candidate manifest33dcc27d29efaafb64b63385bbb21562db7012f9b4eca987b68412551a5f78c8; all211/208-preserved/3-delta source closure unchanged. Fresh public HTML is not byte-identical to the earlier owner HTML; full-document equality is not claimed. Exact build plus owner asset-byte bridge is the identity claim. Local/hosted native cold/decode/input/failure/Back/reduced/fit/full-turn and unchanged routes/assets/SEO proof reused; no new matrices. Body minimum4.542; decorative sampled2.905 DPR2/2.984 DPR1 retained separately, no artwork3:1/4.5 certification. Hardware/Safari/AT/performance/universal timing coverage not added. READY PORT-21 rollback retained, not used. No Git/deployment/config/Figma/source changes by QA. PRODUCT final reconciliation next; only a reproduced scoped defect would reopen QA.

#### BACKEND Grid Eye Same-Build Promotion — 2026-10-29

PORT-22 expedited path: freshly reverified actual www READY PORT-21 rollback `dpl_AAzBzUJAxFftvP723LDjjHBWvsFR`,candidate READY production,original project/team and verified www/apex/apex308 ownership. Promoted ONLY scoped-hosted-accepted **`dpl_8d2pCtsVybL2qEQ44wQuBULXtAYu` / `yEH_ydilQbBN7kiUfpNrd`**,without rebuild,reapproval or Product relay. Post-promotion authenticated www resolves to SAME candidate;www/apex/project aliases completed.211-file manifest `33dcc27d29efaafb64b63385bbb21562db7012f9b4eca987b68412551a5f78c8` and208-preserved/three-file bridge unchanged. No source/Git/config/DNS/env/schema/security/Figma/source-logo or unrelated changes;no rollback needed/executed.

Focused owner live smoke passed: public www200/exact build/NO HTTP noindex;actual bootstrap byte-identical to tested stage,two SVGs and emitted CSS200/MIME/byte-identical;apex308→www. IAB1280 settled slot x240/y24,fit true/opacity1,one mark,aria-hidden decoration,ready surface nonintercepting,body unlocked/no overflow/empty warning-error logs. Own tab closed,hygiene passed,3137 untouched. Evidence `test-results/port22-release/live/` (`smoke.json`,`home-headers.json`,`apex.headers`,`browser-home.json`,`console.json`,`promotion-readback.json`). Existing unchanged assets/routes/SEO/body4.542 and separately decorative2.905DPR2/375DPR1 2.984 evidence reused through exact hashes;no additional matrix or numeric artwork3:1/4.5 claim.

Next executor QA: focused live SAME-build identity/readiness/input/early-scroll-slot/assets/header smoke under expedited instruction;no ceremonial wait or new permutations. On reproduced required live failure return directly BACKEND for admitted PORT-21 rollback/readback;otherwise SAME Task PRODUCT final reconciliation. Owner settled smoke is not fresh native/cold/full-turn/contrast acceptance. Live/Done remains open;existing hardware/Safari/AT/performance/universal timing/contrast limits retained.

#### QA Grid Eye Hosted Acceptance — 2026-10-29

PORT-22 / **Scoped hosted QA Passed**, exact `dpl_8d2pCtsVybL2qEQ44wQuBULXtAYu` / `yEH_ydilQbBN7kiUfpNrd`;211-file manifest `33dcc27d29efaafb64b63385bbb21562db7012f9b4eca987b68412551a5f78c8`. Apply the current expedited fast path: BACKEND may proceed directly with authorized SAME-deployment promotion after target/rollback revalidation,then focused live smoke. No rebuild,reapproval or new permutations. Live/Done remains open.

| Check | Result / evidence |
| --- | --- |
| Changed readiness/one-mark/input |Passed native waiting FCP/natural0→decode→one160ms cover/480ms flight/8s ring;waiting390/375 first-touch dismiss-only/second opens;actual flight first touch/mouse acts immediately,status/surface released;ready Tab normal. `cold-*`,`waiting-touch-*`,`ready-*` |
| Grid/scroll/fit |Passed12 actual grid sizes,375/1440 fixed-scroll On/Off,early24px fade/reverse slot only,phase pause/resume,native full turn9143ms,resize/enlarged omission+restore. `geometry.json`,`native-grid-on-off.json`,`scroll-phase.json`,`full-turn.json`,`enlarged-fit.json` |
| Finite escape/history |Passed3s/error/CSS-only stopped-controller/bootstrap failure,no late photo/signature;prepaint direct slot/ordinary warm/Back top+y48/reduced/noJS. Real CSS requests and selected-image responses paused/read unchanged for deterministic native decode;no delivery-speed claim. Named runtime JSONs |
| Exact isolation/reuse |Passed211 files/208 preserved/three exact approved hashes,154 gates/baseline intact;six existing served-byte receipts match packet hashes. Existing completed HTTP/SEO proof retained,stage noindex expected. `integrity.json`,`http/` |
| Errors/cleanup |Passed empty logs/complete nontruncated exception window,hygiene;all own tabs/probes/overrides incl focus cleared,3137 untouched. `cleanup.json`,`clean-errors.json`,console logs |

No reproduced required changed-surface failure. Unchanged source/assets/routes/SEO and local body contrast4.542/decorative2.905DPR2/375DPR1 2.984 are reused by exact hashes;no fresh hosted contrast/theme/bot/image matrix added after expedited instruction,no numeric artwork3:1/4.5 claim. Physical phone/Safari/AT/performance/universal timing/contrast remain unclaimed. Full evidence already in ignored `test-results/port22-qa-hosted/`;QA changed no app/provider state. Authenticated www still READY PORT-21 rollback `dpl_AAzBzUJAxFftvP723LDjjHBWvsFR`;BACKEND freshly revalidates then promotes only this tested candidate and returns focused live identity/readiness/input/scroll/assets/header smoke.

#### BACKEND Grid Eye Isolated Stage — 2026-10-29

PORT-22 / exact r2 isolated stage **`dpl_8d2pCtsVybL2qEQ44wQuBULXtAYu`**, [unique URL](https://portfolio-ll2zl19t6-ivans-projects-133d4a2e.vercel.app/), READY production/skip-domain,build **`yEH_ydilQbBN7kiUfpNrd`**. Fresh authenticated www before AND after stage remains READY PORT-21 **`dpl_AAzBzUJAxFftvP723LDjjHBWvsFR`**,retained rollback. Original project/team verified: `prj_87eVQkA1ehpM3rTJszSNj6dqaNDo`/`team_jK6pcC3dgzpQAcgEwx05ozx4`;www/apex ownership/apex308 unchanged. No custom-domain promotion;provider normal project alias assigned during staging.

Packet/evidence: ignored `test-results/port22-release/`. **211-file manifest SHA256 `33dcc27d29efaafb64b63385bbb21562db7012f9b4eca987b68412551a5f78c8`**;208 prior files byte-identical,only globals.css/HomeEyeLoader/home-eye-bootstrap changed,no new file/deletion. NEW accepted PORT-21 packet copy used ONLY final source-closure/release-delta.patch/three files;all resulting hashes exact,prior211 hashes/manifest intact. Waiting consumePointerClick bytes,pre-loader CSS prefix/all154 gates,Header/null-off-home,legacy case/Manifesto/fonts/viewport/SEO/homeProjects/data/contact/grid/assets/favicon/package/config and projects/chatAPI404 preserved. Existing obsolete mark-out/unblock removed by approved delta. `prepare.py`/`packet-delta.patch` record construction;no canonical application edit/dirty snapshot/prototype/Git/config/DNS/env/schema/security/Figma/source-logo/unrelated change.

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Isolation/bridge | NEW accepted211-file copy + final3-file patch |Passed211 hashes/208 preserved/three exact delta files,post-build stability;waiting guard and154 gates intact |`source-manifest.json`,`prepare.py`,`packet-delta.patch` |
| Build/types |Local isolated production build;remote production Node22 build |Passed compile/type/prerender;remote19s. Existing lint skip retained |`local-build.log`,`deploy.log` |
| Served resources/HTTP |Six SVG/photo URLs;seven pages×four agents |All six200/MIME/SHA256 exact;28 app SEO/schema/canonical/build assertions pass,home-only loader,crawl/OG/icons/CSS200;baseline404 retained. Unique-stage noindex observed28 times,not live indexability proof |`served-assets.json`,`http-check-output.json`,`hosted/` |
| Owner ordinary browser |IAB1280×720 first document and separate warm new document |First observed readable fallback/no signature,excluded from slot/contrast claims. Warm actual2560AVIF visible,slot x240/y24,fit true/opacity1,one mark,nominal8s ring,aria-hidden artwork,nonintercepting surface,unlocked body/no overflow;empty logs |`browser-first-fallback.json`,`browser-warm.json`,PNGs,console files |
| Hygiene/cleanup |Canonical workspace/own tabs |Passed;both own tabs closed,no server started;3137 and other existing servers untouched |hygiene output |

Root cause/seams: readiness lifetime now hands the same decorative mark to actual shared grid without extending busy/input ownership. Reused approved HomeEyeLoader/bootstrap/CSS/grid/hero seams;no new visual direction. Preparation verifier initially looked for a comment replaced by the approved patch;corrected to verify the exact unchanged pre-loader prefix,with no application change.

**Next executor QA:** independently verify THIS SAME stage's actual cold/decode/160ms/480ms/one-mark/8s/disposal/native waiting-vs-ready input/scroll phase/full-turn/grid-fit/failure/Back/reduced/noJS/SEO/isolation gates before any SAME-deployment promotion. Owner ordinary smoke is not native/timing/contrast acceptance. Current r2 distinguishes canonical body minimum4.542 from separate decorative artwork minimum2.905 DPR2/375DPR1 2.984;no artwork3:1/4.5 or universal accessibility/readability certification,compensation or body-gate waiver. Preserve those limits and hardware/Safari/AT/performance/universal timing/contrast constraints. After hosted pass return exact candidate to BACKEND for fresh target/rollback revalidation,SAME promotion and independent live www/apex/build/assets/noHTTPnoindex-home proof. Overall hosted/live/Product/Done remain open;same-scope defects FRONTEND.

#### QA Grid Eye Local Acceptance — 2026-10-29

PORT-22 / **Independent LOCAL QA: Passed within current r2 admission** on exact production-mode build `nf-MVvtgzdEY_gkTr2fFp`, http://127.0.0.1:3137/. Next sole executor BACKEND for fresh live/rollback revalidation and isolated stage,then hosted QA/SAME-build promotion/live QA/PRODUCT. This is not hosted/public/Done acceptance;3136 prototype must not stage.

Root cause/scope: approved center→grid-slot decoration must follow actual readiness without extending busy/input ownership;SVG transparent padding alone cannot prove visible alignment. Canonical owners are existing HomeEyeLoader/bootstrap/CSS with actual shared portfolio-grid-lane/tracks,Header/HomePhotoHero geometry,ContactSheet/PortfolioGrid and unchanged SVGs. Direction1 reuse confirmed. Only three admitted existing files changed,245 intake and all211 accepted PORT-21 packet files preserved. QA changed reports/evidence only. Existing obsolete80ms mark-out/240ms unblock CSS is removed rather than retained as parallel behaviour.

Browser preflight: primary IAB opens exact3137 and exercises375 grid/Contact/focus;native Chrome supplies request controls,trusted touch/mouse/Back,lossless/DPR and active-rotation evidence under the known IAB screenshot limitation. Only own tabs/overrides used. Real CSS/selected-image requests held;React chunks blocked for pre-hydration cases. Native decode/listener/deadline audit is observational;animation pause and28/40px enlarged-copy fixture are labelled and restored. Paint snapshot t is callback time,not a latency/FCP-start measurement;no numeric FCP latency claim is made. Resource-held paint states/native screenshots,selected decode/native animation elapsed establish the relevant ordering.

| Before | After | Why |
| --- | --- | --- |
| Ready reveal formerly disposed the mark |Same mark moves into actual grid lane |Matches approved r2 without new identity/source assets |
| Decorative travel could be confused with loading |Busy deadline/input/status released before actual flight |Ready actions must remain available throughout480ms |
| Viewport/SVG-frame alignment could mislead |Native grid/visible-envelope/full-turn and fixed-scroll On/Off proof |Measures real layout/paint,not transparent padding or an unmatched scroll position |

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Cold waiting/decode/flight |390×844 and1440×900;held real CSS/image,React blocked |Passed waiting first-paint/FCP observer state with natural0;native decode before flight;busy3s timer cleared before decoration. One mark/ring/eye,one8s ring start/identity through60 samples each;native cover elapsed160ms/flight480ms,eye transform none |`cold-390.json`,`cold-1440.json`,waiting/slot PNGs |
| Waiting versus ready input |Native touch390/375,mouse,Tab |Passed waiting first action dismiss-only/second opens,late image/signature absent. During actual moved flight,first touch/mouse opens Contact;surface/status already none,guard absent;ring hidden/paused behind modal,Escape restores focus/body/slot. Ready Tab settles safely,hides slot at focused skip-link collision,then restores at grid focus |`waiting-touch-*`,`waiting-mouse.json`,`ready-touch.json`,`ready-mouse.json`,`keyboard-*`, `primary-browser.json` |
| Native scroll/fade/phase |Ready-flight native gesture195px/pointercancel;0/6/12/18/24/48/reverse |Passed settles to slot without consuming scroll;opacity1/.75/.5/.25/0;reverse slot only. Hidden ring native clock remains1159.768ms over240ms,then resumes same object/phase |`scroll-phase.json` |
| Full turn/visible envelope |Nine lossless native frames over9226.422ms active rotation |Passed slot x24/top24 fixed,unrotated eye40×40,one ring identity. Sampled painted-yellow bounds stay within source101.0068 envelope;no clipping/overflow seen. Exact SVGs/intrinsic144/40 sizes retained |`full-turn.json`,`full-turn-ink.json`,nine native PNGs |
| Grid/fit/copy preservation |12 sizes incl375/390/320,599/600,768,1039/1040,1440/1920,812×320;native On/Off375+1440 |Passed actual lane-leading24/119.5/120/320/560,top24,minimal measured span1/2/3,overflow0. Native fixed-scroll On/Off keeps copy/slot/control geometry;short landscape omits/pauses. Source inset21.49658852 maps within.02px native quantization |`geometry.json`,`native-grid-fixed-scroll.json`,`native-fixed-*-grid-*.png` |
| Enlarged/interruption |Declared28/40px copy fixture320×480;actual flight resize/reduced/scoped blur |Passed enlarged hero760 hides/pauses without overflow;removal restores slot. Resize to short-fit omits,restore returns slot;reduced/actual trusted scoped Chrome blur settle immediately and pause,focus restore slot. Physical OS-window blur not claimed |`enlarged-fit.json`,`interrupt-resize.json`,`interrupt-reduced.json`,`interrupt-blur.json` |
| Decode-ready/warm/Back |Native preload-ready before CSS release;ordinary warm reload;actual native Back |Passed first observed paint direct slot/no cover/no flight;ordinary cache-pending behaviour separately recorded,no universal HTTP-cache bypass claim. Clean actual flight→pagehide→BFCache Back same document/top slot;Back y48 hidden/reverse slot only |`prepaint-ready.json`,`warm-native.json`,`native-back-clean-flight.json`,`native-back.json` |
| Finite failure/controller/no-JS |3s/real error/lost JS deadline/stopped scripts/bootstrap failure;script-disabled/reduced entry |Passed readable fallback,no signature/no late successful photo. CSS deadline alone releases hit area to Contact despite waiting attribute;late resolve stays fallback. Bootstrap never arms;no-JS one white H1/reserved844/cover+signature off;reduced entry static slot/no flight |`timeout-late.json`,`image-error.json`,`lost-timer.json`,`controller-stopped.json`,`bootstrap-failure.json`,`no-js.json`,`reduced-entry.json` |
| Canonical body contrast |Six fresh native PNG pairs/24 text regions,actual1600/2560AVIF,DPR1/2 |Passed required≥4.5 with minimum4.542;outside body/art rows max channel delta≤1/255. Existing white/40%/type/copy/source preserved;finite margin remains narrow |`contrast-geometry.json`,`contrast.json`,`contrast.py`,`pair-quality.json`,PNG pairs |
| Separate decorative artwork |Same six real pairs,exact source yellow/aria-hidden repeated noninteractive signature |Measured minimum2.905 DPR2,median3.421 there;375 DPR1 minimum2.984 at sampled angle. Current admission distinguishes this decorative repeated artwork from canonical body/UI;no numeric artwork3:1/4.5 or universal accessibility/readability pass is claimed,no source/color compensation or required body-gate waiver |`contrast.json` artwork rows,native fixed-grid/full-turn/accepted screenshots |
| HTTP/SEO/assets |Seven routes×four agents=28;original SVG/photo/favicon responses |Passed exact build,seven unique title/description pairs,www canonical/schema/home-only indexing/robots/sitemap/social/icon/CSS. Original artwork/favicon/photo bytes/MIME exact. Local full-source routes are not production projects/API404 proof;isolated baseline retains that boundary |`http-summary.json`,`http/`,`source-integrity.json` |
| Source/release bridge |248 intake/snapshot;accepted211 PORT-21 packet |Passed245 protected,snapshot exact,waiting initiating-pointer guard byte-identical,pre-loader CSS prefix exact,no new files. All211 accepted packet hashes/manifesta674875ec6dc1967a83759055e42bb6be902405a8adb39596ec045d9154b4ae6 unchanged;refreshed3-file delta→NEW211/208 preserved;154 existing home gates retained |`source-integrity.json`,owner `final/source-closure.json`,`release-delta/` |
| Errors/cleanup/hygiene |Ordinary uninstrumented reload/complete exception window;canonical workspace |Passed empty warning/error logs,no Runtime exceptions/nontruncated;one intended8s decorative animation,one mark/ring/eye,slot,no busy status/surface interception/body lock/dialog/probe. All own tabs incl visual rechecks closed,interception/cache/touch/media/script/metrics/focus overrides restored;3137 retained,no other server started/restarted/stopped;hygiene passed |`clean-errors.json`,`chrome-console.json`,`iab-console.json`,`cleanup.json` |

Evidence root: ignored `test-results/port22-qa/`. Accepted mobile and native375/1440 grid On/Off PNGs visually inspected. IAB scaled/cropped screenshot excluded from visual evidence;its DOM/input proof remains valid. One early native keyboard capture had unmatched viewport positions and is not used as no-shift proof;fixed-scroll native pointer pairs independently pass. First history attempt retained test CSS interception;it was cleared and clean flight Back repeated. A read-only IAB helper lacked getAnimations;CSS properties and native Chrome APIs supplied the intended evidence,no app error inferred. These diagnostics are recorded rather than treated as product failures or acceptance evidence.

Valid PORT-21 independent orphan-tail/long-hold/jitter safety proof is reused through exact guard bytes plus fresh current waiting/ready/native gesture contexts. Owner production build,separate typecheck,31 tests/5files support exact snapshot;QA did not rerun build/unit/type/lint after evidence/docs-only work. Physical phone/Safari/AT/real safe-area/OS blur/all-history-engine/performance/universal timing or contrast/external delivery are unclaimed. Native elapsed times certify nominal CSS,not exact wall-time delivery under audit. Decorative2.905/375-DPR1 2.984 observations remain explicit limits;no new design approval or silent gate waiver.

**Verdict/next gate:** no reproduced required local defect in admitted r2. BACKEND must freshly reverify actual live/project/team/rollback,expected READY PORT-21 `dpl_AAzBzUJAxFftvP723LDjjHBWvsFR`/`yfCtwVlNR35ns-vzxM3QB`. Extend a NEW copy of accepted211-file packet using ONLY `test-results/port22-eye/final/source-closure.json`, `release-delta.patch` and three `release-delta/` files;expected211 files/208 preserved. Never prototype3136/full dirty Header/globals/checkout. Preserve baseline home-only Header/null-off-home,legacy case/Manifesto/Geist/viewport/renderers/SEO/homeProjects/contact/grid/source/favicon and production projects/chatAPI404. Stage without custom-domain reassignment,record exact manifest/diff/build/deployment and return directly to QA before SAME-deployment promotion/live/Product gates. No Git/DNS/env/schema/security/secrets/paid-service/Figma/source-logo/unrelated route/API/media/SEO expansion. Current Task stays open for those required gates;same-scope defects return FRONTEND.

#### FRONTEND Grid Eye Implementation Result — 2026-10-29

PORT-22 / FRONTEND implementation writer released to independent QA. **Implementation DoD: Passed within the owner checks below; Global QA Acceptance and release remain open.** Exact production-mode local build `nf-MVvtgzdEY_gkTr2fFp` runs at http://127.0.0.1:3137/ from the clean full-source snapshot in `test-results/port22-eye/final/owner-build-path.txt`. This is a local verification build, not the isolated deployment packet. No Git publication/deployment or change to the accepted PORT-21 packet occurred. Earlier3136/`qLkaBMDg8DDs0hKv9tcIJ` is a superseded prototype, stopped after checking its own cwd.

Are we fixing the root cause, or only a visible symptom? Approved r2 requires a post-readiness handoff into the real text grid; viewport positioning and the SVG's transparent padding do not establish visible alignment. Canonical owners are existing HomeEyeLoader/bootstrap and their CSS. Reuse direction1 keeps the exact144/40 SVGs, palette/system type, portfolio-grid-lane/tracks, native image/decode readiness, Header/HomePhotoHero progress/fit geometry and ContactSheet/PortfolioGrid. No new dependency/provider/global loading framework, duplicate mark or source graphic. The local slot normalizes only21.49658852px padding around the101.00682296px full-turn envelope; final leading edge comes from the actual shared lane, not a desktop320px constant. One measured origin→destination transform supplies480ms cubic(.23,1,.32,1) flight; native160ms linear cover reveal follows the current Figma motion. The illustrative Figma0.8s readiness clock is not implemented.

Readiness now ends before decoration starts: private busy phase becomes done, input/decode/3s JS ownership is disposed immediately, concise status disappears and the surface stops intercepting. Separate optional flight/slot poses never become busy truth. The original independent CSS3s cover fail-open remains, and preparation does not restart it. Passive post-ready pointer/key and scroll/resize/reduced/blur/pagehide interruptions settle remaining cover/flight without consuming normal actions. Existing initiating-pointer compatibility-click guard is byte-identical and applies only while genuinely waiting; failure/cancelled entries have no signature or later photo. Hidden native decode in a controlled background target remains pending without arming a cover; once target visibility resumes, the measured readiness path shows slot without a forced hold. No body hiding/inert/trap/autofocus/storage/scroll lock/security change.

Changed files: HomeEyeLoader adds only the shared-grid carrier/local slot around the same mark and a waiting-only status class; home-eye-bootstrap separates finite readiness from scoped decoration/cleanup; globals.css replaces obsolete mark-out80ms/unblock240ms rules with the approved slot/480ms/160ms/scroll visibility behavior. Header/HomePhotoHero/source assets/copy/SEO/config are unchanged. Corner opacity reads native scrollY as clamp(1−y/24,0,1); hidden ring pauses and resumes its phase. Fit reads existing authored-copy/hero geometry, chooses the minimum actual grid-column span, and omits the optional signature for short/enlarged copy or focused-control collisions. No row/header reservation or text movement. Owner testing found skip-link overlap and an occluded Contact ring; the fit guard now hides around the focused skip link and pauses behind the native dialog, returning only to the slot.

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Exact source / scoped transfer |248 intake files,clean snapshot,accepted211-file PORT-21 packet | Passed:3 existing files changed/245 protected unchanged; waiting pointer guard/pre-loader CSS prefix exact; all211 accepted files/manifest unchanged. Refreshed3-file delta expects211-file new packet/208 baseline unchanged | `source-closure.json`, `release-delta/`, `release-delta.patch`, `verify-source.py` |
| Before-hydration first paint / one-mark travel | Native Chrome390×844/1440×900,real CSS/image hold,React blocked | Passed waiting FCP76/64ms with native image natural0; actual decode499.9/322.5ms before ready.53/60 native frames; one ring starts once through waiting→slot; native animation elapsed.16/.48s, one unrotated eye/same mark | `cold-mobile.json`, `cold-desktop.json`, native JPEG sequences |
| Waiting versus ready input | Native touch390/375,mouse,Tab; actual ready-flight state | Passed waiting first tap/click dismiss-only/second opens,late photo/signature stay off. During actual flight first touch/mouse opens Contact immediately; surface/status already none. Tab preserves skip focus with safe signature omission; Escape focus/body return and ring pause behind dialog pass | `waiting-touch-*`, `waiting-mouse.json`, `waiting-keyboard.json`, `ready-touch.json`, `ready-mouse.json`, `ready-keyboard.json` |
| Scroll / phase continuity / interruption | Native touch scroll/cancel,exact early scroll probes,resize,reduced setting,scoped Chrome focus emulation | Passed native ready gesture181px settles/hides;0/6/12/18/24px gives1/.75/.5/.25/0,reverse slot only. Hidden ring clock unchanged for180ms then resumes. Resize/short-fit/reduced/trusted emulated blur settle immediately; no center replay | `scroll-phase.json`, `resize-interrupt.json`, `reduced-interrupt.json`, `focus-emulation.json` |
| Grid / fit / full turn |11 sizes incl375/390/320,599/600,tablet/wide/812×320; enlarged fixture;9 real rotation samples | Passed lane-leading x24/120/320/560,top24,minimum fitting span,no horizontal overflow/copy shift. Short landscape and320×480 enlarged760px hero omit/pause; restoration shows slot.9361.688ms active native rotation keeps eye40px and position fixed; wrappers overflow visible,exact assets unscaled | `geometry.json`, `full-turn.json`, `enlarged-small-fit.json`, clean DOM receipt, native PNGs |
| Warm / prepaint / Back / no-JS / reduced entry | Native preload-ready,CSS-controlled before first paint;ordinary revalidation;actual BFCache Back at48 and0;script-disabled reload | Passed decode266.3<FCP292ms direct slot/no flight. Ordinary warm recorded separately; HTTP cache alone is not decode-ready. Back restores same document/y48 hidden or top slot,reverse slot only. No-JS readable/one visible H1/default cover+signature off;static reduced ready no flight | `prepaint-ready.json`, `warm-native.json`, `native-back.json`, `no-js.json`, `reduced-entry.json` |
| Failure /3s / stopped controller | Real request failure/delay,lost JS deadline,script execution stopped after arming,bootstrap observer failure | Passed readable fallback/no signature/no late photo. Independent CSS hides/offsites cover/hit area by its deadline even with waiting JS attribute,actual hit test reaches Contact; late successful decode cannot reopen. Bootstrap failure never arms | `timeout-late.json`, `image-error.json`, `lost-timer.json`, `controller-stopped.json`, `bootstrap-failure.json` |
| Body and separate artwork contrast | Six fresh native PNG pairs,24 body regions,actual AVIF1600/warm2560,DPR1/2 | Canonical white body passes≥4.542; narrow margin retained. Decorative repeated aria-hidden artwork is separate: DPR1 minima3.024–3.150; actual DPR2 narrow minimum2.905/390 warm2.984. No graphic4.5 claim,source/color compensation or universal accessibility certification | `contrast-geometry.json`, `contrast.json`, `contrast.py`, foreground/backdrop PNGs |
| Source HTTP / routing / assets | Seven local routes/two SVG responses | Passed exact build/200/self-www canonical/robots; bootstrap,readiness marker and one mark only home. Exact original SVG bytes/MIME. Local full-source route inventory is not production404 proof; accepted packet/legacy/Header/scoping gates retained in delta | `http-source.json`, `source-closure.json` |
| Build / type / tests / hygiene / cleanup | Final clean full-source build/canonical tests;unmodified reload | Passed production build,separate tsc noEmit,31 tests/5 files,hygiene/diff;empty complete warning/error/Runtime exception window,one mark/ring/eye/Header,no probe/dialog/body lock/overflow. Own tabs closed;interception/cache/touch/media/script/metrics/focus overrides cleared;3137 retained | Logs, `clean-errors.json`, `browser-cleanup.json`, `runtime-cleanup.json` |

Evidence root: ignored `test-results/port22-eye/final/`; native images `/Users/ivan/Documents/Codex/2026-10-29/portfolio-frontend/outputs/port22-eye/final/`. Current mobile/desktop/short and phase PNGs inspected against the r2 exports. Source geometry values are exact; this engine's layout quantization yields frame offset−21.484375 versus declared−21.4966, a~.0122px envelope difference, without changing assets. Real glyph contours vary inside the stable full-turn envelope. Captured animation elapsed values establish nominal CSS timing; heavy raster/style sampling affects wall delivery and is not a smoothness/performance or universal480ms guarantee.

Physical phone/Safari/AT/real safe-area/OS-window blur/external delivery/all-history-engine coverage remain unclaimed; blur used trusted scoped Chrome focus emulation, not the failed attempt to elicit blur through a background comparison tab. That3135 comparison endpoint was unavailable and was not restarted; no baseline-color conclusion is claimed from it. Enlarged text is a declared temporary CSS fixture, removed; no copy or OS setting changed. Prior PORT-21 independent orphan-tail/long-hold/jitter evidence is proportionally reused through exact guard bytes plus fresh waiting/ready native context checks, not relabeled as newly exhaustive testing. Separate lint was not run; existing build skips lint, so no lint-pass claim.

Next executor QA: independently verify exact3137 build against approved r2 and finish admitted local grid/first-paint/decode/input/interrupt/Back/failure/reduced/fit/body+decorative contrast/SEO acceptance. Same-scope defects return directly to FRONTEND. After local pass, hand same Task to BACKEND for fresh actual live/rollback revalidation and extension of a NEW copy of accepted PORT-21 packet using ONLY this3-file delta, then hosted QA/SAME-build promotion/live QA/PRODUCT acceptance. Do not stage the prototype,whole dirty canonical Header/globals/checkout or unrelated routes/content. Accepted211-file baseline/manifesta674875ec6dc1967a83759055e42bb6be902405a8adb39596ec045d9154b4ae6 and expected prior READY `dpl_AAzBzUJAxFftvP723LDjjHBWvsFR`/`yfCtwVlNR35ns-vzxM3QB` remain reference inputs subject to BACKEND fresh readback. No repeat visual/deploy approval or Ivan prompt relay. PORT-22 stays open until required independent staged/SAME-build/live/Product gates pass.

#### Current Revision — Grid-Aligned Top Eye Slot

Ivan likes the style/motion but reports that the mobile corner mark is not visually aligned with the text. He asks to put it into the content grid at the top with a top-edge gap, rather than leave it as an independently anchored corner overlay. Same PORT-22; DESIGNER updates the existing owned proposal, no new Task/page/whole-home clone. Style, exact eye/ring,480ms center-to-final travel,8s rotation, early-scroll disappearance/corner-only reverse and preserved readiness lifecycle stay accepted intent; only placement/grid integration is revised before implementation approval.

Root-cause framing: current frame is positioned at viewport24px, but equal SVG frame coordinates do not prove equal visible-artwork edges because its144px viewport includes internal transparent space. Verify actual grid-lane origin and visible/rotated artwork envelope before declaring a cause. Canonical correction owner is the optional mark's grid SLOT/rendering bounds, not an arbitrary shift of the authored text or shared page grid. Reuse the actual existing home content-lane/column/inset/top-spacing tokens on desktop/mobile. Anchor the new top slot to the same leading grid edge as identity/introduction (desktop reading-lane edge, mobile24px protected inset), with a restrained existing top gap, initially the24px section/inset value plus applicable safe area. Do not insert a left-only viewport constant that diverges from content on wide screens.

Inspect both frame and visible-ink alignment through a full ring turn. If transparent SVG padding is the demonstrated mismatch, normalize only the local slot/rendering offset using a stable full-turn envelope; never chase each rotating glyph, trim visible rays/letters, redraw/alter public SVGs, shrink typography or move the page copy to hide it. Keep exact ring/eye relationship and transform origin. The grid slot may use the minimum existing column span needed, not a new grid system or header row; preserve authored copy/White40 geometry/controls and do not add a blank header-height reservation. If a genuine layout/fit conflict requires moving content, show that explicit proposal rather than silently changing accepted composition. Very short/enlarged-text fit may omit optional signature under the existing guard.

Update current desktop/mobile375/390/short/cache/reduced/interrupted specimens and center-travel end/reverse poses in place through MCP only. Show grid On proof with actual text/grid/visible artwork edges and top gap, plus clean grid-Off views; measure normalized frame/ink bounds and safe clearances at several ring phases. Preserve source photo/type/palette/contacts, one perceived moving mark, published PORT-21 error/cache/input/3s/no-JS/Back behavior and all unrelated Figma/runtime owners. Save changed IDs/old-new geometry/tracks/rollback/current exports/protected-source proof; same-Task readback/release to PRODUCT/Ivan for placement review. No frontend/code/release dispatch yet; timed exports remain design evidence, not runtime scroll/readiness proof.


##### Grid-Aligned Top Slot Result — PORT-22 r2, 2026-10-29

DESIGNER placement revision complete for PRODUCT/Ivan review on the same SECTION2920:781 and same seven specimen roots. The demonstrated mismatch had two causes: the desktop mark used viewportx24 instead of the actual content-lane x320, and the144px SVG has roughly21.497px transparent inset around its full-turn visible artwork. Mobile equal framex24 therefore put phase0 visible ink at46.140px while the text begins24px. No authored-copy/grid/source-artwork change is needed to resolve it.

Measured the exact unchanged `loader-ring.svg` outline analytically:790 linear/cubic boundary segments, solving extrema of squared radial distance around72/72 (polynomial degree≤5), with independent axis extrema at eight45° phases. Full-turn radius50.50341148px, diameter101.00682296px, local viewport inset21.49658852px. The40px eye's bounding-square radius≤28.285px fits well inside the same envelope. This stable full-turn envelope is used once; no per-frame glyph chasing, cropping, path rewrite or typography scaling. At the eight sampled phases, current visible left/top edges range only0.192–2.995px inside that stable envelope; individual letter contours naturally vary during rotation.

Existing owned mark frames now sit inside native GRID carriers that reuse the actual home lane: max800, inset24, gutter24,12desktop/2mobile columns. These values were resolved from existing variables `grid/content-max`2569:3, `grid/inset`2569:4, `grid/gutter`2569:6 and equal-column variables2593:735/736, and checked against the actual name's leading edge before applying. Carrier top padding binds `space/section`2459:18 at24; gutter binds2569:6. Safe-area intent adds the same home-lane safe insets/top safe area; pictured Figma specimens use zero simulated safe inset. No independent desktop left24 constant remains.

The leading slot takes the minimum equal-column span that fits the101.007px visible envelope:2desktop columns (113.333px) or1mobile column (159px at390;151.5px at375). It creates no header row/content-flow reservation. Six existing mark containers are reparented under these slots with local x/y−21.496588px; original144×144 viewport,40×40 eye at52/52, transform origin72/72, palette/artwork and ring phase/tracks remain unchanged. Render/carrier/slot clipping is disabled so travel is not clipped outside the slot. Copy, name, photo, controls and all original homepage owners remain exactly where they were.

| View | Shared lane leading edge / width | Current stable ink envelope | Render-frame top-left | Clearance to unchanged name |
| --- | --- | --- | --- | --- |
| Desktop1440×900 |320 /800|x320,y24;101.007²|x298.503,y2.503|256.993px to namey382 |
| Mobile390×844 |24 /342|x24,y24;101.007²|x2.503,y2.503|240.993px to namey366 |
| Cache375×812 |24 /327|x24,y24;101.007²|x2.503,y2.503|224.993px to namey350 |
| Short/reduced390×640 |24 /342|x24,y24;101.007²|x2.503,y2.503|138.993px to namey264 |

The render frame's transparent margin is not the visible top gap. Phase0 visible ink begins at laneLeft+0.643px/top24.328px; the continuous full-turn envelope itself begins exactly at laneLeft/top24. Main native travel starts remain centered: delta349.4966/375.4966 desktop and120.4966/347.4966 mobile relative to the new final render pose. Only the initial translation values changed; final translation remains0. Readiness illustration0.8s,480ms travel/easing,160ms reveal,8s ring, first24px fade, hidden pause and slot-only reverse restoration remain unchanged. Cache/reduced/interrupted poses use the same slot; fallback remains signature-free.

Persistent current delta:12 new carrier/slot nodes `2926:844–855`; eight existing owners changed — mark containers `2920:820/897/973/1001/1032/1060` and technical notes `2920:1086/1091`. Current section has225nodes. No new screen/page/full-home clone, shared component, global token or website change. Source bindings/actual values, exact old/new geometry/tracks and IDs are retained in `placement-update.json` / `before.json`.

Grid-On proof temporarily applied each existing native grid-toggle `State=On` on desktop,390mobile,375cache and short views, plus the existing24px-gap columns using `grid/overlay/color`2569:16 and opacity2569:17. Leading-edge/top guides and a full-turn reference circle are diagnostic only. Current Grid-On/Off PNGs show the same actual copy/columns and measured top gap. All34 diagnostic nodes were removed and all four toggles restored to Off; final body fingerprints exactly match before, so the clean exports remain current. This is source/state/render proof, not an exercised prototype click.

Fresh native desktop/mobile5s clips and cache8s clip cover the revised end poses, complete centered start, fade/hidden/reverse and eight45° phases plus the completed turn. The cache phase strip shows every ray/letter contained with no clipping, and one unrotated eye; artwork/ring captured-property fingerprints and mark fade tracks match before. Source counts/bindings confirm one perceived mark, not a center/corner duplicate. The prior readiness/cache/error/input/3s/no-JS/Back/focus contract remains the same design boundary; no runtime gesture/readiness proof is claimed.

Evidence: `/Users/ivan/Documents/Codex/2026-10-29/portfolio-designer/work/port22-grid-slot/` contains exact before-state, analytic source/phase bounds, token resolutions, mutation/proof/cleanup source, IDs and final readback. Sibling `outputs/port22-grid-slot/` contains clean seven-state PNGs, grid-On/Off board and focused proof PNGs, refreshed desktop/mobile/cache MP4s, native phase strips and codec metadata. Earlier PORT-22 exports remain historical. No SVG or runtime source file was changed; all seven recorded hashes still match.

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Proven cause / stable SVG bounds | Exact source outline; complete radial extrema; eight sampled phases | Pass:21.4966px viewport padding explains mobile offset; full-turn101.0068px envelope normalized locally | measure-envelope.py; full-turn-envelope.json |
| Actual grid / top slot / fit |1440desktop,390mobile,375cache,390×640short; On/Off native renders | Pass: slot starts at actual copy/grid edge,24px visible top gap, minimum2/1 spans, no copy/control conflict | placement-update.json; *-on/off.png |
| Accepted motion / no clipping | Updated native5s/8s exports, travel/reverse and45° phase samples | Inspected: center preserved, final grid pose, same480ms/8s/fade; no clipped glyphs or duplicate mark | MP4s; phase strips; final.json |
| Source / authored content / cleanup |12 original roots,7 prepared-content roots,12 artwork/track subtrees;34 proof nodes removed | Pass: all captured properties unchanged; mark fade tracks unchanged, toggles Off,225 current nodes; seven runtime/artwork hashes identical | final.json; source-unchanged.json |
| Hygiene / focused syntax | Canonical local repository | Pass: npm hygiene, UTF-8, whitespace/conflict-marker scan | validation.json |
| Actual scroll/readiness/Back/input/focus/fit guards | Design-only revision | Unexercised; accepted published PORT-21 stays unchanged and later runtime gates remain required | Same Task/boundary |

Bounded rollback: first reparent the six preserved mark containers back to their recorded original specimen roots, restoring oldx24/y24 and initial translation tracks from `before.json`; then delete the12 new carriers/slots. Deleting wrappers before extracting the existing marks would delete their descendants and is not the rollback. Restore only the two technical-note texts with the normal font-load recipe. Do not restore body text/photo/grid/master/runtime snapshots or any unrelated edits. DESIGNER releases the same Task for grid-slot placement approval; style/motion remain accepted intent, no frontend/code/release handoff.


#### Opening Corner Eye Proposal Result — PORT-22, 2026-10-29

DESIGNER proposal complete for PRODUCT/Ivan visual and lifecycle review. The missing outcome is a post-readiness decorative identity handoff; this is not a change to image networking or a reopening of the accepted PORT-21 release. Canonical future seam is the existing home-only mark/readiness disposal and Header scroll-progress owner. Design-system direction1: reuse exact runtime artwork, existing palette/type, White40 first-screen content and controls. Scoped Code Connect search found no local mapping; the subscribed Hito search returned generic eye/social icons, which do not match this source identity and were not imported. No external graphic, new component family, global style or palette.

Current isolated [SECTION2920:781](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2920-781) is on existing homepage2469:2 and contains213 editable nodes. Original12 homepage roots, including PORT-20/PORT-21 studies and header/contact masters, match immediate preconstruction/final captured-property fingerprints. Created/mutated IDs:213 new under that section, zero existing mutations. Citymobil/Manifesto/project pages were not written. Runtime/bootstrap/Header/HomePhotoHero/CSS and both public artwork files match their before SHA256; no app code, asset replacement or publication.

| Specimen | Current node | Purpose |
| --- | --- | --- |
| Desktop1440×900 |2920:784|Loaded corner resting PNG; native loading→ready travel→early-scroll fade→corner return |
| Mobile390×844 |2920:875|Same continuous handoff with actual prepared copy/grid/Contact |
| Short390×640 |2920:952|Loaded corner fit without changing authored content/control placement |
| Cache375×812 |2920:980|Immediate corner, no loading cover or center trip; native8s ring-only cycle |
| Reduced390×640 |2920:1011|Immediate static corner, zero manual tracks |
| Interrupted / scroll24 |2920:1039|Signature hidden, prepared content at existing early-scroll progress, no cover/travel |
| Pre-ready error /3s |2920:1067|Existing readable raspberry fallback, no optional mark or loading surface |

Visual: one144×144 mark atx24/y24, plus the existing safe-left/top insets when relevant. Keeping its intrinsic size avoids an extra size/typography animation. Eye40×40 remains at52/52 inside the mark and has no local transform tracks; only the ring rotates clockwise45°/s, an8s turn. The mark itself translates. Exact imported native-vector SVGs are `public/images/home/loader-eye.svg` (821bytes, SHA256 `8647d5b49d2eae21f51b06bcb307487df054fae90a9676568e37f48fa5ce4312`) and `loader-ring.svg` (28,396bytes, SHA256 `687bbbe5ca021cdd2105b1e39c2c35dc26ea39d7ecaa1dc704724e5c4ae4505f`). Each has one outlined vector path; original geometry/circular wording/current embedded `#FFE7A3` are retained, not redrawn or substituted with a font. Their literal asset color is retained rather than inheriting the over-photo White40 body-text override. Cover uses existing `color/background`2459:7; cloned page text keeps existing SF Pro14/20 styles/white treatment and controls. No source/favicon/logo rewrite.

Normal success: the SAME mark travels from the viewport center to the top-left over480ms with existing cubic(.23,1,.32,1), without a second visible center/corner copy or phase reset. The cover fades160ms starting at readiness; it is a visual reveal, not a new minimum wait or reason to hold input/status. This intentionally replaces the old80ms mark-out only in the proposal. Native illustrative readiness is0.8s, travel ends1.28s and the cover is gone0.96s; actual readiness still belongs to selected critical picture decode/necessary first-screen preparation. Ring rotation continues through the flight, pauses while fully hidden, and resumes from the held angle. The prepared page is already available during the decorative completion.

Early scroll uses the current home progress seam, not a new readiness trigger: signature opacity = clamp(1−scrollY/24,0,1). It starts fading with the first downward travel and is absent at24px. Reverse restores only its corner pose/opacity; the cover stays gone and translation never returns to the center. Native desktop/mobile clips illustrate24px forward/reverse movement of the existing name/intro plus photo opacity1−scrollY/(nameRestY−12); contacts stay in their existing early-progress placement. Hidden intervals pause ring angle, not a continuing invisible rotation.

Corner footprint ends at168px; vertical clearance before the name is214px desktop,198px mobile390,182px cache375 and96px short640. Actual existing grid/Contact remain at the bottom; no target overlaps. Short/cache previews reuse the same4:3 photograph/44% mobile focal position/40% toning at their true viewport heights; this is responsive preview adaptation inside the new study, not a change to existing hero/source nodes. Optional fit guard: if cornerBottom+24 exceeds the first authored-copy top or intersects a control, omit the signature rather than move content/add header height. This also covers very short/enlarged-text flow beyond the pictured640px state.

| Entry / interruption | Required intent after approval |
| --- | --- |
| Waiting first entry | Keep published optional-arm/selected-image decode/current readiness source. Existing concise loading status only while waiting; no artificial minimum, all-image/global-font/network-idle gate or percentage. |
| Prepared success while cover visible | Settle readiness once and release its input/busy ownership; one decorative mark completes480ms travel. Never extend/restart the3s safety deadline to wait for the movement or a ring turn. |
| Cache-ready / prepared before cover paint | Skip center/cover entirely. Show corner directly when at top and fit permits;8s ring is decoration, not busy/progress. |
| Post-ready pointer/key during travel | Finish remaining cover/position immediately at the appropriate corner/hidden pose before normal action, preserving focus. Keep the accepted pre-ready initiating-pointer compatibility-click guard; no synthetic forwarding or new input capture. |
| Early scroll during travel | Cancel remaining flight/cover; resolve directly to corner with opacity from current scroll (hidden by24px). Do not let the mark continue crossing moving page content. |
| Reverse / restored native Back | Reverse-to-top restores corner only; no loading replay. Back at restored y≥24 starts hidden, Back at top can show corner only. Preserve current no-replay/per-document/no persistent flag and native history/focus/scroll guarantees. |
| Pre-ready input/error/3s timeout | Preserve existing fail-open and no-late-photo suppression; optional signature remains off on that cancelled/fallback entry. No retry or new error claim. |
| Reduced motion / OS change | Immediate static corner, no translation/rotation; nonmoving scroll-opacity/static disappearance. A mid-flight setting change cancels travel immediately, with current focus/page state intact. |
| Resize/blur/pagehide | Cancel/retarget only optional decoration; preserve ring phase if reused, apply fit/scroll result, no readiness rearming or page lock. Hidden ring performs no perpetual animation work. |
| No JS / bootstrap/controller failure | Existing default-visible page and fail-open remain authoritative; optional new decoration/cover stay off. No inert/hidden body, focus trap/autofocus, scroll lock or second status controller. |

Rendered legibility sampling uses exact SVG alpha-core masks at the24px corner over native prepared backdrops: minimum artwork contrast3.518 desktop,3.107 mobile390,3.150 cache375 and3.024 short640. This is the decorative repeated-identity artwork, with canonical name/copy unchanged; it is not a claim of4.5:1 body-text contrast or browser accessibility acceptance. Current full-size PNGs show legible graphics without a backplate, photo retouch, shadow, blur, new color or type treatment.

Evidence outside Git: `/Users/ivan/Documents/Codex/2026-10-29/portfolio-designer/{work,outputs}/port22-corner-eye/`. Work retains runtime hashes, discovery/baseline, full construction source including exact SVG input, current213-node ledger/readback/tracks and scoped rollback. Outputs retain native board/individual states, desktop/mobile5s MP4s (5.1s/51frames at10fps), cache8s MP4 (8.2s/41frames at5fps, encoder pads odd375px width to376), extracted phases/fully-hidden3.0s frames, source-mask contrast and stationary-eye pixel checks. Native section PNG includes40px export padding on each side; state crops account for it. Five cache phases0/2/4/6/8s show a complete clockwise ring turn with fixed eye; eye-core mean absolute pixel difference stays≤0.224/255, alongside the exact no-eye-track readback.

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Exact artwork / rhythm / single mark | Runtime SVG hashes, native vector dimensions/counts/tracks, cache8s phases | Pass: one ring/eye per applicable screen, eye has no local tracks, ring45°/s and phase pause/resume | runtime-source.json; final-readback.json; cache phase strip/pixel check |
| Handoff / fade / reverse | Two native5s clips; selected0/.8/.9/1.1/1.3/2.6/3.0/3.7/4.9s phases | Inspected: one continuous center→corner, fully hidden interval, corner-only return; no reload cover on reverse | MP4s; phase sheets; hidden3s PNGs |
| Responsive fit / actual copy / static intent |1440×900,390×844,375×812,390×640, reduced/interrupt/fallback | Pass for shown compositions; existing copy/controls intact and nonoverlapping; reduced/fallback no motion | Seven state PNGs; bounds/tracks readback |
| Original ownership / source preservation |12 original homepage roots; seven runtime/artwork files | Pass: zero original Figma mutation; exact fingerprints and file hashes retained | construction.json; final-readback.json; source-unchanged.json |
| Hygiene / focused document syntax | Canonical local repository | Pass: npm hygiene, UTF-8, whitespace/conflict-marker scan | validation.json |
| Actual readiness/input/cache/Back/first paint/scroll/focus | Designer-only proposal | Not exercised; published PORT-21 proof remains baseline, later revised-runtime acceptance required | Same Task/current boundary |

Rollback removes only SECTION2920:781 and its recorded subtree (213nodes including the section) after checking later edits/references; restore no old homepage, loader, token or runtime snapshot. DESIGNER releases the same Task to PRODUCT/Ivan for visual/lifecycle approval. No FRONTEND/QA runtime dispatch, code, commit, deployment or release is authorized by this design delivery.


### New Design Study — Eye Loader And First-Screen Reveal

Current Task: [eye/circular-type loading proposal](https://app.notion.com/p/408fe5f58cf5811890ccf87bb441236e). New independently verifiable outcome, not a new phase of PORT-20. PRODUCT accountable; DESIGNER sole current executor, then PRODUCT/Ivan visual/lifecycle review before implementation. PORT-20 hosted QA/release continues unchanged; do not add loader code to its already-staged packet or hold its promotion for this new idea.

Ivan requests a small rotating circular loader with his eye logo and circular `Ivan Cheremisin · Product designer ·` text so the opening appears prepared rather than the photograph arriving later. Visible symptom is piecemeal loading; actual network/first-paint readiness cause has not yet been demonstrated. Existing HomePhotoHero uses native eager/high-priority responsive picture with async decode; an overlay is a readiness presentation, not proof of faster loading. Reuse the exact eye path from `public/favicon.svg` without its white rounded-square wrapper, not legacy LogoHolder's IC mark; source/favicon unchanged. One proposed composition: stationary centered eye, circular text rotating linearly around it, existing raspberry/yellow tokens and shared type family. DESIGNER chooses a restrained measured size/rhythm and shows desktop/mobile plus static reduced-motion and loading→ready/error intent, through Figma MCP only on a small isolated existing-homepage study, no new page/library/whole-home clone or generated branding.

Proposed lifecycle for approval: only first homepage document entry waits for the selected critical hero image to decode and necessary first-screen text/layout readiness; never every image on the site, arbitrary network-idle or a made-up percentage. No artificial minimum delay on a cache hit. Define bounded waiting/error/timeout with a readable stable fallback, no-JS/script-failure fail-open, and no indefinite hidden/inert document or scroll lock. Do not replay on viewport fades, ordinary scroll or restored native Back; no new persistent storage. Keep page content/SEO accessible, stable hero dimensions/White40 handoff/controls/history and source/copy intact. If timeout behavior would show a later unexpected image, describe that tradeoff explicitly instead of claiming the whole page is guaranteed loaded. FRONTEND owns actual lifecycle/initial-flash/decode/cache/font/error handling after approval; timed Figma exports do not prove that behavior.

Deliver one current design/motion proposal with exact borrowed logo source, token/style bindings, supported native export and explicit exercise limits, finite readiness/fallback intent, scoped IDs/rollback/protected-source proof. Use figma-use/figma-generate-design/figma-use-motion and emil-design-eng; no website/source-asset/SEO/release mutation, packages or service. Update/read back the same Task and release to PRODUCT/Ivan. Acceptance is visual/lifecycle approval now, not implementation or release completion; later owner/QA gates must exercise cold/warm/slow/failed/no-JS/reduced/Back/focus/first-paint behavior before a separately admitted scoped delivery.

#### Eye Loader Implementation And Release Admission — 2026-10-29

Ivan explicitly approves the shown visual AND finite lifecycle and requests implementation/publication. This supersedes this Task's prior proposal-only/no-code/no-release restrictions. Same PORT-21; sole current executor FRONTEND. No additional design approval is needed for the exact stationary-eye/circular-type/8s rotation/80+160ms reveal/3s fallback variant. PORT-20 is now Done/live and becomes the preserved release baseline, not an in-flight packet to mutate.

Fix the demonstrated first-screen presentation seam, not a fictitious network-speed defect: inspect actual cold/warm first-paint/decode ordering at existing HomePhotoHero/Header, then implement the approved readiness presentation there. Reuse existing home-only CSS/progress/type/palette and the exact eye path; one bounded frontend owner for optional cover readiness/disposal, no global loading framework, added library, external font, persistent replay flag or duplicate Header. Follow the lifecycle table in the approved result below: only selected critical picture decode and necessary first-screen readiness; cache-ready-before-cover bypass; no all-image/network-idle/global-font gate/artificial hold; ready80ms mark-out then160ms cover-out;3s activation deadline/error/input intent releases readable raspberry fallback and suppresses late picture for this document entry; reduced static/immediate; no-JS/bootstrap failure/native Back stays visible/bypasses. Do not hide/inert the document, trap/autofocus, lock body scroll, forward an overlay click to an unseen action or leave an armed cover after controller failure. Safely arm only after fail-open is installed. Do not weaken CSP/security to implement a bootstrap. Preserve exact published White40 contrast/layout/4px/Film director/motion/Contact/grid/history/SEO and all non-home routes/source assets/favicon.

Admitted chain: FRONTEND → QA local → BACKEND isolated stage → QA hosted → BACKEND SAME-build promotion → QA live → PRODUCT final acceptance, direct same-Task handoffs/readback to verified portfolio chats. Same-scope defects return to their implementation owner without another Ivan prompt/approval. Owner checks: type/build/tests/hygiene, source closure/preservation, exact logo/type/motion and actual cold/warm/failed/timeout readiness. Independent QA must capture real before-hydration/first-paint sequence on uncached slow image versus warm-ready, show critical picture decoded before normal reveal and no mark/copy overlap, finite timeout/error and no late photo after dismissal, script-disabled/bootstrap-handler failure fail-open, input/keyboard/reduced/native Back/re-entry/no replay, short/mobile/desktop no overflow/scroll/focus/control regression, SEO/content accessibility and unchanged PORT-20 resting contrast/source baseline. Use network control and actual browser timeline/frames, not a Figma clip or DOM-source assertion as proof of first-paint behavior. No false Implementation DoD/acceptance across required failures; report omitted platforms/hardware explicitly.

Publication is authorized only for this approved home-loader delta on existing portfolio project `prj_87eVQkA1ehpM3rTJszSNj6dqaNDo`, team `team_jK6pcC3dgzpQAcgEwx05ozx4`, www.cheremisin.co.uk. BACKEND must revalidate current live/rollback and extend the accepted PORT-20 isolated207-file source packet/manifest0728f196152c42666c5d4152e928bb6d6b942afa8c6b4c31478bee9b3debfa0b with only approved loader dependency closure, never the whole dirty checkout. Expected prior READY live/rollback is `dpl_3NdLChRvs6A3x3DPTJm66pQ6ajF4` / build `wT3hr2GoR7lngwc1MKm9f`; do not assume it without fresh readback. Stage production without custom-domain reassignment, hosted QA before SAME tested-build promotion, then live identity/HTTP/browser/readiness/SEO proof. Material post-promotion regression permits rollback to verified prior live under this bounded authority. No Git commit/push, DNS/env/schema/security/paid-service change, source/logo/favicon mutation or unrelated Citymobil/Manifesto/project/chat/API/SEO expansion. Preserve PORT-20 completion/history; close PORT-21 only after required live acceptance.

#### PRODUCT Eye Loader Final Release Acceptance — 2026-10-29

PORT-21 is complete. PRODUCT reconciles Ivan's approved eye/circular-type visual and finite readiness lifecycle with corrected owner, independent local/hosted/SAME-build and live acceptance below. Fresh authenticated www readback confirms READY production `dpl_AAzBzUJAxFftvP723LDjjHBWvsFR`, build `yfCtwVlNR35ns-vzxM3QB`, on the admitted original portfolio project. PRODUCT inspected fresh public cold-waiting and accepted-mobile evidence. No reproduced required release failure or remaining executor/action exists; PORT-20 remains completed history and Citymobil PORT-17 design is independent.

Deploy result: https://www.cheremisin.co.uk/ · production · READY · Next.js · provider build duration27.793s. Source is the isolated211-file loader-only extension of accepted PORT-20, manifest SHA256 `a674875ec6dc1967a83759055e42bb6be902405a8adb39596ec045d9154b4ae6`, not the dirty checkout or a new Git publication. SAME hosted-tested deployment promoted without rebuild. Prior PORT-20 `dpl_3NdLChRvs6A3x3DPTJm66pQ6ajF4` remains authenticated READY rollback; no rollback trigger or execution occurred.

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Approved loader/readiness and fail-open | Corrected owner plus independent local/hosted/public paint,input/cache/fallback/Back checks | Passed finite required cases; no artificial hold, infinite cover or late photo after fallback | QA Eye Loader Live Acceptance and linked supporting receipts |
| Publication identity | Fresh PRODUCT authenticated www/project/READY readback; independent exact build/assets bridge | Passed SAME tested deployment; no rebuild | Provider readback and QA deployments/integrity |
| Protected White40/controls/SEO/routes | Fresh live geometry,contrast,Contact/grid,28 heads and source/assets checks | Passed within disclosed measured scope; existing home primitives reused | Live QA report |
| Documentation/workspace | PRODUCT final artifact/current sources | Hygiene/diff checks required before final Task readback | Local validation |

Canonical owners reused: HomeEyeLoader/bootstrap plus existing HomePhotoHero/Header/progress/ContactSheet/PortfolioGrid/CSS/SEO, original eye geometry and shared palette/type. Source logo/favicon/photos, published White40/copy/facts, home-only indexing, baseline case/Manifesto and projects/chatAPI404 remain preserved. No whole-dirty-tree/Git/DNS/env/schema/security/paid-service/Figma/Citymobil/unrelated source mutation was released. Narrow4.542 contrast, scheduling-dependent reveal timing, finite browser/source cases, physical-phone/Safari/AT/real-safe-area/performance/external-delivery/unsupported engines/universal timing/contrast and search indexing/ranking remain unclaimed. Public browser errors are clean; PRODUCT did not perform a separate server last-hour log scan/drain audit or configure continuous monitoring, and does not represent those as done. No additional implementation/verification is required inside the accepted finite scope.

#### QA Eye Loader Live Acceptance — 2026-10-29

PORT-21 / **Independent LIVE QA: Passed** at https://www.cheremisin.co.uk/ for SAME hosted-accepted deployment `dpl_AAzBzUJAxFftvP723LDjjHBWvsFR`, build `yfCtwVlNR35ns-vzxM3QB`.211-file manifest `a674875ec6dc1967a83759055e42bb6be902405a8adb39596ec045d9154b4ae6` unchanged. Independent authenticated www resolves to this exact READY production candidate/original project;PORT-20 `dpl_3NdLChRvs6A3x3DPTJm66pQ6ajF4` remains READY rollback. No rollback was needed or exercised. Next sole executor PRODUCT for final acceptance/status reconciliation;QA does not claim Product Done.

Root cause/ownership: staged acceptance cannot prove public-domain readiness,delivery/indexability or alias identity. BACKEND promoted the exact isolated candidate without rebuild;QA independently exercises public endpoint. Existing HomeEyeLoader/bootstrap/HomePhotoHero/Header/progress/ContactSheet/PortfolioGrid/CSS/SEO owners remain. Exact bootstrap and compiled CSS bytes bridge stage→public;all six derivative/SVG hashes remain accepted. Reuse direction1 and completed PORT-20 boundaries retained. QA changes reports/evidence only,no public data/source/provider mutation.

Browser preflight: primary IAB public375 Contact/grid/non-home checks;dedicated temporary Chrome for native trusted touch/Back/lossless paint and DPR controls under the earlier IAB PNG limitation. Real Stylesheet/Image request holds and React-chunk blocks are scoped to own tab. Audit observes native decode/listener timing;controlled omission of one compatibility click is labelled and separate from real first-tap proof. No original user tabs/native app/global color diagnostics were touched.

| Before | After | Why |
| --- | --- | --- |
| Hosted candidate accepted with unique-stage noindex |Actual www exact-build/readiness/indexability acceptance |Public custom-domain gate is independent |
| Historical first-touch defect fixed locally/staged |Fresh trusted first/second taps pass390/375 on live |Confirms public guard lifecycle and later actions |
| Rollback named by release owner |Independent authenticated READY readback |Proves retained candidate,not rollback execution |

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| SAME target/rollback |Authenticated www and prior PORT-20 |Passed exact dpl_AAzBzUJAxFftvP723LDjjHBWvsFR/original project/READY production,rollback READY;manifest unchanged |`deployments.json`,`integrity.json` |
| Public cold paint/decode/reveal |390×844,real CSS/image holds,React chunks blocked |Passed waiting FCP10116/natural0;native selected decode10611.7 before ready10611.9,cover disposed11081.1;native80ms mark/160ms cover,no sampled mark/copy overlap. Scheduling/audit-inclusive469.2ms is not a universal240ms wall-time/performance claim |`cold-ready.json`,`cold-waiting.png` |
| Public first/second touch |390×844 and375×812 actual trusted native touch on waiting cover over Contact |Passed first dismiss-only/no dialog/body lock,guard0 after compatibility click;second opens immediately/Escape returns;late successful photo hidden |`native-first-second.json` |
| Finite orphan guard |Controlled omitted compatibility click |Passed tail1→0 around750ms and next tap opens. Local/staged long-hold/scroll/cancel/jitter/mouse/keyboard/immediate-next-input proof retained via identical bootstrap |`orphan-cleanup.json` |
| Warm/timeout/late picture |Ordinary unheld warm reload;selected image held beyond3s at390×640 |Passed warm settled cover off/visible native cache hit transfer0;no universal zero-visible-cover claim.3s fallback releases,late native decoded photo natural853 stays hidden;fresh document retries visible photo |`warm-native.json`,`timeout-late.json`,`fresh-entry.json` |
| Error/bootstrap/reduced/no-JS |Actual failed image;observer constructor failure;reduced waiting/ready;scripts disabled |Passed immediate fallback/natural0;bootstrap never arms/readable photo;ring animation/transform none and immediate reduced exit;no-JS one white H1/y366/reserved844/cover off/no overflow/body lock |`image-error.json`,`bootstrap-failure.json`,`reduced.json`,`no-js.json` |
| Native Back |Real route navigation→native Back after fallback |Passed BFCache same timeOrigin/y169/name197,cover off/no replay,then fresh entry restores photograph |`native-back.json`,`fresh-entry.json` |
| Hero geometry/controls |Five sizes/25 hydrated states incl exact375/short/narrow;IAB375 Contact/grid |Passed approved H1 y382/366/350/264,narrow206,gap4,compact12/photo0/yellow,reverse white/photo1,all mode=scroll,stable doc/one Header/name/no overflow. Contact autofocus/Escape focus+body restore,grid true→off |`geometry.json`,`iab-smoke.json` |
| Public resting contrast |Four fresh actual1600/2560AVIF,DPR1/2/system14px opaque-white PNG pairs |Passed desktop5.656/5.829,3754.952/5.251,narrow24.811/4.881,mobile24.542/5.025;outside-text deltas≤1/255. Prior broader finite PORT-20 matrix retained,narrow4.542 minimum explicit |`contrast.json`,`contrast-geometry.json`,`pair-quality.json`,PNG pairs |
| Public HTTP/SEO/assets |Seven routes×four browser/bot agents=28;robots/sitemap/social/icon/CSS;six SVG/photo paths |Passed28×200/exact build,seven unique titles/descriptions,www canonical/schema,home index/follow AND NO HTTP noindex,other routes noindex/follow,no stage/local leak;home-only sitemap,Allow:/,exact asset200/MIME/hashes |`http-summary.json`,`http/`,`integrity.json` |
| Stage/live bridge/isolation |Actual bootstrap/compiled CSS bytes;apex;projects/API;IAB Manifesto/Wrike375 |Passed bootstrap/CSS byte-identical to accepted stage,home-only bootstrap/marker all seven routes,apex308→www,projects/chatAPI404;one non-home Header/Geist Mono/no loader/hero/no overflow |`integrity.json`,`iab-smoke.json`,non-home screenshots |
| Errors/cleanup/hygiene |Ordinary final reload/complete event window;canonical workspace |Passed empty warning/error logs,no Runtime exceptions/nontruncated;no audit/guard/probe/animation/body lock/dialog/media override;all own tabs closed,interception/cache/script/touch/media/metrics cleared;3135/3134/3132 untouched;hygiene passed |`clean-errors.json`,`chrome-console.json`,`iab-console.json`,`cleanup.json` |

Evidence root: ignored `test-results/port21-qa-live/`;accepted mobile screenshot visually inspected. Proportional reuse: independent local/hosted native preload-ready-before-FCP,CSS-only controller/lost-timer escape and extended input/source/geometry ranges remain valid through SAME deployment and byte-identical public bootstrap/CSS/assets. Those complete matrices were not all rerun live;fresh public checks above exercise changed delivery/readiness/input/domain gates. Build/types/unit/lint were not rerun after documentation-only QA;owner build/types and31 local tests support lineage. Physical phone/Safari/AT/real safe-area/performance/external delivery/unsupported engines/universal timing/contrast and search-engine indexing/ranking remain unclaimed.

**Verdict:** required corrected-local,hosted,SAME-deployment and independent public live gates pass within finite scope. No reproduced required release defect or rollback trigger remains. PRODUCT reconciles final PORT-21 acceptance on the same Task,preserving narrow4.542/browser/hardware/timing limits and completed PORT-20 history. No dirty checkout/Git/DNS/env/schema/security/secrets/paid-service/Figma/favicon/source-logo/unrelated route/API/media/SEO work by QA.

#### BACKEND Eye Loader Same-Build Live Promotion — 2026-10-29

PORT-21: promoted ONLY hosted-accepted **`dpl_AAzBzUJAxFftvP723LDjjHBWvsFR` / `yfCtwVlNR35ns-vzxM3QB`** to https://www.cheremisin.co.uk/ through authenticated MCP,no rebuild. Immediately before action actual www resolved to READY PORT-20 **`dpl_3NdLChRvs6A3x3DPTJm66pQ6ajF4`**,retained rollback. Verified candidate/project/team/www/apex ownership/redirect matched admission. Post-action authenticated www maps to exact tested candidate;alias readback shows completed www/apex/project mappings.211-file manifest `a674875ec6dc1967a83759055e42bb6be902405a8adb39596ec045d9154b4ae6` and loader-only204-preserved/seven-file bridge unchanged. No source/Git/config/DNS/env/schema/security/secret/paid-service/Figma/favicon/source-logo or unrelated mutation.

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Promotion/identity/rollback | Authenticated pre/post www/candidate/domain/alias reads |Passed SAME deployment,correct original target,READY PORT-20 rollback retained;no rebuild |`live/promotion-readback.json` |
| Live HTTP/SEO |Seven public routes ×browser/Google/Twitter/Facebook |Passed28×200/exact build/metadata/schema;home index/follow and NO HTTP noindex;hidden routes noindex/follow,crawl/OG/icons/CSS200/MIME/dimensions/home-only sitemap preserved |`live/head-matrix.json`,`check-output.json`,`assets.json`,raw HTML |
| Served code/assets |Actual public home bootstrap vs accepted unique stage;two SVG/four photos |Bootstrap text byte-identical;all six live200/MIME/SHA256 match tested stage |`live/bootstrap-bridge.json`,`six-assets.json` |
| Apex/baseline reachability |Public apex and /projects/chatAPI |Apex308→www;both baseline404 retained |`live/apex.headers`;owner HTTP checks |
| Owner ordinary browser |IAB1280×720 live home |Bootstrap present,root loader state absent/cover display:none,decoded2560AVIF visible,body unlocked,one Header/no overflow;empty warning/error logs;own tab closed |`live/browser-home.json`,`console.json`,saved settled PNG |
| Hygiene |Canonical workspace |Passed;3135/3134/3132 untouched |hygiene output |

Ignored evidence root `test-results/port21-release/`. Owner ordinary settled smoke does not certify cold paint/decode timings or native first-touch on the public alias. Independent hosted native-input/cold/warm/finite/fallback/White40 proof remains supporting evidence through SAME deployment and exact bootstrap/resource hashes; independent public lifecycle/native-input acceptance is still required. No rollback needed/executed in owner checks;retained rollback is the admitted conditional failure path,not an exercised rollback claim.

**Next executor QA:** verify SAME live www build/public readiness/native first-touch/finite guard and failure/Back behavior,assets/SEO/no-HTTP-noindex-home/apex and preserved White40/isolation within existing finite gates. On failed live acceptance return directly BACKEND for admitted PORT-20 rollback/readback;otherwise SAME Task to PRODUCT acceptance. Overall live/Product/Done remain open. Narrow4.542/physical-phone/Safari/AT/performance/unsupported-engine/universal timing/contrast/search limits remain;no restarted investigations or unrelated testing.

#### QA Eye Loader Hosted Acceptance — 2026-10-29

PORT-21 / **Independent Hosted QA: Passed** for SAME corrected deployment `dpl_AAzBzUJAxFftvP723LDjjHBWvsFR`, https://portfolio-3b2uqud9y-ivans-projects-133d4a2e.vercel.app/, build `yfCtwVlNR35ns-vzxM3QB`.211-file manifest `a674875ec6dc1967a83759055e42bb6be902405a8adb39596ec045d9154b4ae6`. Next executor BACKEND for current-target/rollback revalidation and SAME-deployment promotion,then independent live QA/PRODUCT. No public-live or Task Done claim.

Root cause/seams: local guard correction does not prove deployment integration or actual hosted network/decode/input. QA independently exercises the isolated candidate; existing HomeEyeLoader/bootstrap/HomePhotoHero/Header/progress/ContactSheet/PortfolioGrid/CSS/source owners remain. Exact refreshed seven-file closure and204 preserved baseline files establish the boundary. QA changed evidence/docs only;no application/design/provider mutation. Reuse direction1 and PORT-20 finite contrast/route/source constraints retained.

Browser preflight: primary IAB opens exact candidate and exercises375 Contact/non-home routes. Dedicated temporary Chrome supplies native trusted touch/Back,resource controls and lossless DPR pairs under the documented prior IAB PNG limitation. Real CSS/image requests controlled by explicit resource types;React chunks blocked only for pre-hydration proof. Controlled decode-ready preload and one omitted compatibility click are labelled;actual ordinary warm/native tap streams are separate. Own tabs/overrides only.

| Before | After | Why |
| --- | --- | --- |
| Corrected local acceptance |Actual hosted pre-hydration/native-input/deadline/Back proof |Confirms deployed integration rather than inferring from source |
| One ordinary cold photo exceeded3s |Correct fallback/late-photo suppression,excluded from photo contrast |Timeout state must not become a false photo-contrast pass |
| Early390px sample before hydration |Separate confirmed data-hero-motion=scroll retest passes |Static first-paint availability is not proof of hydrated scroll |

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Cold native paint/decode/reveal |390×844,real CSS/selected-image hold,React blocked |Passed waiting FCP10128/natural0;decode11300.5 before ready11300.6,cover off11562.4;native80ms mark/160ms cover elapsed,no sampled mark/copy overlap |`cold-ready.json`,`cold-ready-later.json`,`cold-waiting.png` |
| Decode-ready/warm |Native selected-image preload while CSS paused;separate ordinary warm reload |Passed actual hero decode11733.2 before FCP11760 with no armed cover;ordinary warm early waiting→off,300-byte revalidation/FCP104ms. No universal cache-zero-cover or exact wall-time claim |`prepaint-ready.json`,`warm-native.json` |
| Native first/second touch |390×844 and375×812;trusted pointerdown at waiting surface |Passed first dismiss-only/body unlocked/no dialog/guard0 after click;second opens,Escape returns;late successful photo hidden.390 earliest DOM read preceded CSS completion,but actual trusted pointerdown/FCP both record waiting;acceptance uses that trace |`native-first-second.json`,first-tap PNGs |
| Finite guard cleanup |Controlled omission of one native compatibility click |Passed tail1→0 around750ms;next tap opens. Normal untouched trusted streams above prove first-tap isolation. Local long-hold/scroll/cancel/jitter/mouse/Tab/immediate-new-input proof retained through exact deployed source bridge |`orphan-cleanup.json`;local `port21-qa-fix/` |
| Timeout/error/bootstrap |390×640 selected image held past3s;real request error;observer constructor failure |Passed3s fallback,late successful natural853 remains hidden;error releases;bootstrap failure never arms and readable visible photo remains. Prior independent CSS-only/lost-controller proof retained via unchanged CSS/controller boundary |`timeout-late.json`,`image-error.json`,`bootstrap-failure.json` |
| Reduced/no-JS/history |Reduced waiting/ready;JS disabled;actual route→native Back |Passed ring animation/transform none,immediate ready exit;no-JS one white H1/y366/reserved844/cover off/no overflow;BFCache same origin/y169/name197/cover off,no replay |`reduced.json`,`no-js.json`,`native-back.json` |
| Geometry/reverse |Seven sizes/35 accepted states incl375/short/narrow/landscape |Passed exact approved382/366/350/264,narrow206,resting4px,compact12/photo0,yellow handoff/restored white,stable doc/one Header/name/no overflow. Early390 static/no-hydration sample excluded and replaced by confirmed scroll-mode retest |`geometry.json`,`geometry-390-hydrated.json`,`geometry-early-excluded.json` |
| Resting photo contrast |Four fresh native raster pairs,actual1600/2560AVIF,DPR1/2/system14px/opaque white |Passed desktop5.656/5.829,3754.952/5.251,narrow24.811/4.881,mobile24.542/5.025. Outside-text deltas≤1/255. One late-photo fallback excluded;separate warm visible-photo documents used for remaining pairs |`contrast.json`,`contrast-geometry.json`,`pair-quality.json`,`contrast-exclusions.json`,PNGs |
| HTTP/SEO/source assets |Seven routes×four browser/bot agents=28;home-only bootstrap/marker;six SVG/photo URLs |Passed exact build,seven unique titles/descriptions,www canonical/schema/home-only indexing/robots/sitemap/OG/icon/CSS;expected stage HTTP noindex all28;exact200/MIME/hashes for six assets;projects/chatAPI404 |`http-summary.json`,`http/`,`integrity.json` |
| Isolation/browser accessibility |IAB375 Contact Enter/Escape,Manifesto/Wrike |Passed Close focus/body lock only for dialog,Escape Contact/body unlock;one non-home Header/Geist Mono,no hero/loader/no overflow |`iab-smoke.json`,non-home screenshots |
| Packet/target |211 files vs accepted207 PORT-20;authenticated target readback |Passed204 preserved/seven byte-exact refreshed delta,no deletion,all154 prior CSS gates/null-off-home Header;accepted207 packet unchanged. www remains READY PORT-20 dpl_3NdLChRvs6A3x3DPTJm66pQ6ajF4,stage READY original project |`integrity.json`,`deployments.json` |
| Errors/cleanup/hygiene |Ordinary clean reload/complete exception window;canonical workspace |Passed empty Chrome/IAB warnings/errors,no Runtime exceptions/nontruncated;no probe/audit/guard/animation/body lock/dialog/source-media override;all own tabs incl hydration recheck closed,interception/cache/script/touch/media/metrics cleared;3135/3134/3132 untouched;hygiene passed |`clean-errors.json`,`chrome-console.json`,`iab-console.json`,`cleanup.json` |

Evidence root: ignored `test-results/port21-qa-hosted/`;accepted mobile screenshot visually inspected. One responsive batch was interrupted by browser-managed document resolution and resumed after navigation settled;no repeated/partial states counted. Initial390 pre-hydration static sample and ordinary late-photo fallback remain explicit excluded diagnostics. Their corrected/relevant runtime states are independently evidenced rather than masked by a source change.

No fresh hosted exhaustive long-hold/scroll/cancel/orphan-new-input/mouse/keyboard matrix or lost-controller proof is claimed: valid independent corrected-local proof is reused proportionally through exact seven-file deployed closure/native first-tap/cleanup and unchanged primitives. Build/types/unit/lint were not rerun by QA after documentation-only work;owner isolated build/types and local31 tests support lineage. Physical phone/Safari/AT/real safe-area/performance/external delivery/unsupported engines/universal timing/contrast/search indexing remain unclaimed. Minimum4.542 is narrow;stage noindex is not live indexability proof.

**BACKEND next:** freshly revalidate actual www/apex/project/team and READY PORT-20 rollback `dpl_3NdLChRvs6A3x3DPTJm66pQ6ajF4`,then promote exactly `dpl_AAzBzUJAxFftvP723LDjjHBWvsFR` without rebuilding or changing211-file manifest. Return actual www/apex mapping/build/readiness/native-input/assets/SEO/no-HTTP-noindex-home and rollback readback directly to QA for independent live acceptance. No rejected3134/dirty checkout/Git/DNS/env/schema/security/secrets/paid-service/Figma/favicon/source-logo/unrelated route/API/media/SEO work. No reproduced required hosted defect remains;live/Product gates stay open,same-scope defects return FRONTEND.

#### BACKEND Corrected Eye Loader Isolated Stage — 2026-10-29

PORT-21 / corrected loader-only stage **`dpl_AAzBzUJAxFftvP723LDjjHBWvsFR`**, [unique URL](https://portfolio-3b2uqud9y-ivans-projects-133d4a2e.vercel.app/), READY production/skip-domain, hosted build **`yfCtwVlNR35ns-vzxM3QB`**. Reverified actual www/project/team/domains before build; www before AND after staging remains accepted PORT-20 **`dpl_3NdLChRvs6A3x3DPTJm66pQ6ajF4`**, retained READY rollback. Original portfolio target `prj_87eVQkA1ehpM3rTJszSNj6dqaNDo`/`team_jK6pcC3dgzpQAcgEwx05ozx4`; verified www/apex/apex308 mapping unchanged. No custom-domain promotion yet; normal provider project alias was assigned by skip-domain staging.

Root cause/seam: initiating touch guard is corrected in the accepted native-input implementation; production still lacks that loader. Backend reused the exact refreshed touch-fix seven-file patch, bootstrap and existing home-only Header/hero/CSS seams. No rejected3134 source or full dirty checkout was copied. New isolated packet/evidence `test-results/port21-release/`; **211-file manifest SHA256 `a674875ec6dc1967a83759055e42bb6be902405a8adb39596ec045d9154b4ae6`**,204 prior PORT-20 files preserved, exactly three existing files/four new files changed, no deletion. All seven resulting files byte-match refreshed release-delta hashes. Prior207-file manifest verified intact; all old CSS bytes/154 gates and null-off-home Header preserved, only import/render appended and readiness marker added. Baseline routes/case/Manifesto/Geist/viewport/data/SEO/homeProjects/contact/grid/photo/favicon/package-lock/config and /projects/API404 retained. `prepare.py` and `packet-delta.patch` record the exact bridge; no canonical application source edit or Git/config/DNS/env/security/secrets/paid service/Figma/unrelated expansion.

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Isolation/hash bridge | New PORT-20 packet copy + corrected touch-fix patch | Passed211 hashes/204 preserved/seven exact delta files,post-build hashes stable;154 CSS gates and home-only wrapper retained | `source-manifest.json`, `prepare.py`, `packet-delta.patch` |
| Isolated/remote build | Local compile/type/prerender; remote production Node22 build | Passed; baseline lint skip unchanged; no package/config change | `local-build.log`, `deploy.log` |
| Served resources | Two SVG +four approved photo URLs |200/correct MIME/all six SHA256 exact, favicon unchanged in packet | `served-assets.json` |
| Raw SEO/bootstrap scope | Seven routes ×four browser/bot agents |28 app metadata/schema/canonical/build checks pass; bootstrap and marker only home. Unique-stage HTTP noindex observed28 times,not public-indexability acceptance; crawl/OG/icons/CSS200,baseline404 preserved | `http-check-output.json`, `hosted/`, `home-only-bootstrap.json` |
| Owner browser smoke | IAB1280×720 ordinary settled home | Bootstrap/marker present; cover display:none/root state absent,decoded2560AVIF visible,body style absent,one Header/no overflow; empty warning/error logs | `browser-home.json`, `owner-settled.png`, `console.json` |
| Hygiene/cleanup | Canonical workspace/own tab | Passed; own tab closed,no own server started;3135/3134/3132 untouched | hygiene output |

**Next executor QA:** independently accept THIS SAME deployment's cold/prepaint/warm/decode/80+160/3s/error/bootstrap/input/native first-touch/cleanup/reduced/no-JS/Back and preserved White40/SEO/isolation gates before any promotion. Ordinary owner settled smoke does NOT establish timing,first-touch or contrast acceptance. Prior corrected local proof remains supporting evidence,including4.542 narrow minimum and finite hardware/engine/timing limits. Return same Task/candidate to BACKEND after hosted pass for fresh current-target/rollback revalidation,SAME-deployment promotion,independent live www/apex/build/assets/readiness/no-HTTP-noindex-home proof. Overall hosted/live/Done remain open; same-scope defects FRONTEND. No physical-phone/Safari/AT/performance/universal timing/contrast/search claims.

#### QA Eye Loader Corrected Local Acceptance — 2026-10-29

PORT-21 / **Independent local QA: Passed** on corrected production-mode build `6l6AVG3rsTo7vaZjvtW1L` at http://127.0.0.1:3135/. Initial3134/5YNsxN8nMtLmGFm5J1Cq1 remains the rejected historical touch candidate and must not stage. One next executor BACKEND for fresh live/rollback revalidation and loader-only isolated stage,then hosted QA/SAME-deployment promotion/live QA/PRODUCT acceptance. Local acceptance does not certify those later gates or Task Done.

Root cause corrected: initiating touch's compatibility click arrived after zero-delay guard removal and activated unseen Contact. Canonical owner remains `home-eye-bootstrap.ts` consumePointerClick. Independent source bridge confirms only that function and its call differ from initial owner,with240 other source/content/assets/config files identical. FRONTEND retains initiating pointer through its click and clears on new input/movement/cancel/lifecycle exit,with finite750ms orphan tail. QA changes reports/evidence only. Design-system direction1 reuses HomeEyeLoader/Header/HomePhotoHero/ContactSheet/PortfolioGrid/progress/palette/type/White40/photo/SEO owners; no new visual or controller direction.

Browser preflight: primary IAB loads exact3135 and independently exercises375 Contact Enter/Escape/focus/body restoration. Dedicated temporary Chrome provides native trusted touch/mouse/Back,controlled CSS/image requests and lossless paint/DPR evidence under the prior IAB PNG limitation. Request controls target Stylesheet/Image only; pre-hydration tests block React chunks without rewriting Document responses. Audit wrappers observe native decode/listener lifetimes; controlled omitted-click tests are explicitly separate from untouched trusted first-tap streams. All overrides/probes are transient and cleared.

| Before | After | Why |
| --- | --- | --- |
| First tap opened Contact on390/375 |First native tap dismisses only;next immediately opens |Existing input-sequence seam now consumes its initiating click |
| Zero-delay cleanup raced touch synthesis |Guard survives through click,clears after it,or expires around750ms if omitted |Bounded tail without blocking a new action |
| Remaining local lifecycle gates open |Fresh warm/prepaint/bootstrap/Back/fallback/geometry/contrast/SEO proof |Pass is based on runtime scope rather than owner report alone |

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Native first/second tap |390×844 and375×812;real opaque waiting cover/native trusted touch |Passed first dismiss-only/no dialog/body lock;guard0 after compatibility click;second opens immediately/Escape restores Contact focus. Successful late image remains hidden |`native-first-second.json`,waiting/first PNGs |
| Held/moving/cancel input |1.2s hold,native scroll,explicit cancel,3px/10px finger jitter |Passed held first tap dismiss-only/next opens;scroll y195 with pointercancel/guard0;cancel frees next tap;jitter never opens hidden Contact |`long-touch.json`,`touch-scroll.json`,`touch-cancel.json`,`touch-jitter.json` |
| Finite guard/new input |Controlled omission of exactly one compatibility click |Passed remaining tail1→0 around750ms;separate next native tap opens within168.9ms while tail was active. Omission proves cleanup/new-input availability,not original first-tap acceptance |`orphan-cleanup.json`,`orphan-next-immediate.json` |
| Mouse/keyboard |Native mouse pair/Tab while waiting;IAB375 Contact |Passed mouse first dismiss/second opens;Tab retains Skip-link focus,no loader trap/lock/autofocus. IAB Enter opens Close-focused dialog,Escape returns focus/body |`mouse.json`,`keyboard.json`,`iab-contact.json` |
| Cold paint/decode/motion |Desktop1440×900 actual CSS/image holds with React blocked |Passed waiting FCP10100/natural0;selected native decode10255.3 before ready10255.5;disposal10546.1ms. Actual80ms mark/160ms cover elapsed;no sampled mark/copy overlap. Scheduling-inclusive290.6ms is not universal240ms wall time |`cold-ready.json`;prior independent mobile/pre-hydration PNG/motion proof retained through guard-only diff |
| Prepaint-ready/cache-pending |Native same-selected-image preload/decode while CSS paused;separate ordinary warm revalidation |Passed actual hero decode10129.9 before FCP10168,cover never armed/no animation;ordinary warm early waiting then cover off,photo visible,FCP76ms/resource300-byte revalidation. HTTP cache does not imply already-decoded picture;no artificial minimum hold |`prepaint-ready.json`,`warm-native-settled.json`;native warm frames supporting only |
| Failure/finite escape |Observer constructor throws before bootstrap;actual failed request;390×640 selected image held beyond3s |Passed bootstrap never arms;error releases fallback;timeout releases readable cover and late successful photo remains hidden. Prior independently exercised lost-JS-timer/controller-stopped CSS deadline is reused through exact guard-only source diff |`bootstrap-failure.json`,`image-error.json`,`timeout-late.json`;`test-results/port21-qa/lost-deadline.json`,`controller-stopped.json` |
| Reduced/no-JS/history |Reduced while waiting/ready,scripts disabled,actual route→native Back,fresh reload |Passed ring name/transform none,immediate reduced exit;no-JS one visible white H1/reserved844/no overflow/cover off;BFCache same timeOrigin/y169/name197/fallback/no replay;fresh document retries visible decoded photo |`reduced.json`,`reduced-ring.json`,`no-js.json`,`native-back.json`,`fresh-entry.json` |
| Resting geometry |Seven sizes/49 scroll-color-reverse states incl exact375,short/landscape/narrow |Passed approved382/366/350/264,narrow206,resting gap4px,compact12/photo0/yellow,reverse white/photo1;one Header/name,no overflow,stable document height,brightness(.6),unchanged docks |`geometry.json`,seven resting PNGs |
| Resting contrast |Four fresh actual1600/2560AVIF,DPR1/2 PNG pairs incl prior narrow minimum |Passed desktop5.656/5.829,3754.952/5.251,narrow24.811/4.881,mobile24.542/5.025. Pair differences outside text rows≤1/255. Valid broader PORT-20 finite matrix retained through unchanged image/style owners;no universal contrast claim |`contrast-geometry.json`,`contrast.json`,`contrast.py`,`pair-quality.json`,PNG pairs |
| HTTP/SEO/assets/isolation |Seven routes×four browser/bot agents=28;home-only bootstrap/marker;six served local assets |Passed exact new build,seven unique title/description pairs,www canonical/schema/home-only indexing/robots/sitemap/social/icon/CSS;bootstrap+marker only home;two SVG/four photo bytes+MIME exact |`http-summary.json`,`http/`,`source-integrity.json` |
| Source/release bridge |Exact snapshot/current intake/original owner/accepted207-file PORT-20 |Passed234 protected intake,240 initial-owner files unchanged,all207 baseline/manifest intact;seven exact delta files extend NEW packet to211 with204 baseline unchanged;null-off-home Header and existing scoped CSS retained;favicon unchanged |`source-integrity.json`,owner `touch-fix/source-closure.json` and `release-delta/` |
| Errors/cleanup/hygiene |Clean final ordinary reload/complete event window;canonical workspace |Passed empty Chrome/IAB warning/error logs,no exceptions/nontruncated complete window;no audit/guard/probe/animation/body lock/dialog/source media override;all own tabs closed,interception/cache/touch/script/media/metrics cleared;3135/3134/3132 retained;hygiene passed |`clean-errors.json`,`chrome-console.json`,`iab-console.json`,`cleanup.json` |

Evidence root: ignored `test-results/port21-qa-fix/`. First-tap and accepted-resting screenshots visually inspected. Initial failed QA/source proof remains historical; unchanged independent mobile first-paint/motion/lost-controller checks are explicitly reused after exact guard-only bridge,not relabelled as fresh captures. Owner production build/separate typecheck/31 tests in5 files support the exact snapshot;QA did not rerun build/unit/type/lint after changing reports only. Physical phone/Safari/AT/real safe-area/performance/external delivery/unsupported engines and universal timing/contrast remain unclaimed. No reproduced required local defect remains.

**BACKEND transfer:** use only refreshed `test-results/port21-loader/touch-fix/source-closure.json`, `release-delta.patch` and seven files under `release-delta/`. Reverify actual current www target/project/team and retained READY rollback;expected completed PORT-20 is `dpl_3NdLChRvs6A3x3DPTJm66pQ6ajF4`/`wT3hr2GoR7lngwc1MKm9f`,baseline207-file manifest `0728f196152c42666c5d4152e928bb6d6b942afa8c6b4c31478bee9b3debfa0b`. Extend a NEW isolated copy only,expected211/204 preserved;never whole dirty Header/globals/checkout or rejected3134 candidate. Preserve production home-only Header/null off home,all existing154 scoped CSS gates,legacy case/Manifesto/Geist/viewport/renderers,SEO/homeProjects/contact/grid and projects/chatAPI404. Stage production-configured without custom-domain reassignment,record exact manifest/diff/build/deployment and return candidate directly to QA before SAME-deployment promotion/live proof. No Git/DNS/env/schema/security/secret/paid-service/Figma/favicon/source-logo/unrelated route/API/media/SEO mutation. Task stays open through hosted/SAME/live/Product gates;same-scope defects return FRONTEND.

#### FRONTEND Eye Loader Native Touch Correction — 2026-10-29

PORT-21 / same-scope FRONTEND correction → independent QA. Corrected production-mode local build **`6l6AVG3rsTo7vaZjvtW1L`** at http://127.0.0.1:3135/; clean snapshot path in `test-results/port21-loader/touch-fix/owner-build-path.txt`. **Corrected owner Implementation DoD: Passed; independent local acceptance remains pending.** Initial `5YNsxN8nMtLmGFm5J1Cq1`/3134 is the independently rejected touch build and must not stage. QA's failure receipt remains valid historical evidence; this owner receipt does not supersede independent acceptance.

Are we fixing the root cause, or only a visible symptom? QA demonstrated that zero-delay cleanup ran after pointerup but before the trusted touch compatibility click retargeted to the now-visible Contact. Canonical owner is the existing home-eye-bootstrap consumePointerClick seam. The correction changes only that guard and its existing call argument; no new input controller, component, design direction or lifecycle phase. The other240 source/content/assets and all build configuration match the initial owner snapshot.

The guard now retains the initiating pointer ID through its compatibility click, then consumes that click and cleans up. Matching pointerup starts a750ms upper bound for an orphaned click tail. This is not a750ms input lock: a separate pointerdown or key action clears the old guard immediately, keyboard clicks stay available, and different pointer IDs are not consumed. Touch movement/cancel, blur and pagehide also clean up. It remains active through a held gesture until up/cancel/new input/lifecycle exit, so a long first tap still only dismisses. Existing immediate fallback/late-photo suppression is unchanged. Design-system direction1 and existing HomeEyeLoader/Header/HomePhotoHero/ContactSheet/PortfolioGrid/palette/type/motion/SEO seams are retained.

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Trusted first/second tap | Native Chrome CDP touchStart/touchEnd; actual opaque waiting cover,390×844 and375×812 | Passed: first only dismisses,body unlocked/no dialog; separate next tap opens immediately,Escape returns Contact focus.390 pointerup345.1/click350.0/guard removal350.2ms;375277.7/279.9/280.0ms. Guard returns to pre-existing listener baseline | `native-touch-390.json`, `native-touch-375.json`, waiting/first PNGs |
| Long hold/scroll/cancel | Native1.2s touch hold, native touch scroll gesture, explicit touchCancel | Passed first long tap dismiss-only/next opens; actual scroll y182 with trusted pointercancel; explicit cancel clears guard/next tap opens. Successful late picture remains hidden | `long-touch.json`, `touch-scroll.json`, `touch-cancel.json` |
| Finite orphan cleanup | Actual native touch with test-only earlier listener omitting one compatibility click | Passed: remaining guard removed751.4ms after pointerup; next tap opens. Controlled omission proves cleanup only, not first-tap acceptance; unmodified trusted streams above prove first taps | `abandoned-click-expiry.json` |
| Mouse/keyboard | Native mouse click pair and Tab while waiting | Passed mouse first dismiss/second opens; Tab retains Skip-link focus; no added keyboard guard | `mouse-click.json`, `keyboard-tab.json` |
| Back/reduced/no-JS | Actual route→native Back; reduced media; scripts disabled before reload | Passed same BFCache document/y169/name197/cover off,late photo still hidden; reduced static ring/immediate ready; no-JS readable document/one visible H1/cover off/no overflow | `native-back.json`, `reduced-ready.json`, `no-js.json` |
| Ready/error/timeout | Actual held selected image,native decode/request failure,3s deadline at390×640 | Passed waiting FCP88ms,decode352.6 before ready352.7 then disposal641.3;error/3s release fallback and suppress later successful photo | `ready-regression.json`, `image-error.json`, `timeout-late.json` |
| Build/type/tests/hygiene | Corrected clean full-source snapshot/canonical existing test suite | Passed production build,separate tsc noEmit,31 tests/5 files,hygiene/diff checks | `build.log`, `typecheck.log`, `tests.log`, `hygiene.log`, `diff-check.log` |
| Source/isolated transfer/HTTP | Current snapshot,original237-file intake,accepted207-file PORT-20 packet,seven routes/two SVGs | Passed only guard/call differs from initial owner;234 protected intake/all207 accepted packet files and manifest unchanged. Refreshed7-file release-delta preserves home-only Header/null off home/all scoped CSS; new isolated packet expected211 files/204 baseline unchanged. Seven200/exact new build/canonical/robots,home-only bootstrap/marker,exact assets pass | `source-closure.json`, `release-delta/`, `release-delta.patch`, `http-source.json`, `verify-source.py` |
| Errors/cleanup | Clean final uninstrumented load | Passed no warnings/errors,complete nontruncated exception window,no remaining animations/probe/body lock/dialog/overflow. Own tab closed; interception/cache/touch/media/script/metrics restored;3134/3132 retained | `clean-errors.json`, `browser-cleanup.json` |

Ignored evidence: `test-results/port21-loader/touch-fix/`; native PNGs `/Users/ivan/Documents/Codex/2026-10-29/portfolio-frontend/outputs/port21-loader/touch-fix/`. First-tap screenshots inspected. The browser audit sees one pre-existing document click-capture listener before the task guard; the task guard adds one and returns to that same baseline, not zero total application listeners. No native DOM `.click()` substitutes for touch proof.

Prior independent pre-hydration/motion/3s/controller-stopped/lost-timer/source checks remain supporting through the exact one-seam source diff; they are not newly claimed as full QA of this build. Full independent warm/prepaint/bootstrap/reduced/no-JS/Back/touch/responsive/resting contrast/SEO acceptance still belongs to QA. No new exhaustive contrast matrix,lint,physical phone/Safari/AT/real safe-area/universal timing/performance or external-delivery claim. Existing native parsed8s/80+160ms/cubic and White40/source/favicon/4px/copy/SEO boundaries are unchanged; no Figma/provider/Git/deployment mutation.

Next executor QA: independently retest the corrected native sequence on3135 and finish the remaining admitted local gates; return same-scope defects directly to FRONTEND. After pass, hand the same Task to BACKEND for fresh live/rollback revalidation and isolated stage using this refreshed delta, then hosted QA/SAME-build promotion/live QA/PRODUCT acceptance. Never stage3134 or copy the dirty canonical Header/globals/checkout over the accepted packet. Published PORT-20 remains unchanged; release/Done stay open. FRONTEND writer released.

#### QA Eye Loader Native Touch Return — 2026-10-29

PORT-21 / independent local QA on production-mode build `5YNsxN8nMtLmGFm5J1Cq1`, http://127.0.0.1:3134/. **Verdict: Failed.** Required first-input isolation fails for actual native touch. Same-scope direct return to FRONTEND, not another design decision or Ivan relay. No BACKEND staging/promotion/release clearance; published/completed PORT-20 remains untouched.

**[P2] First native tap activates unseen Contact while dismissing the loader.** Actual waiting cover is opaque. At390×844 tap315,798 (or375×812 tap300,766, centre of existing underlying Contact). First touch produces `pointerdown` on `.home-eye-surface` in waiting, followed by fallback and trusted touch-click on `.portfolio-dock-contact`; Contact opens, Close receives focus and body is locked. Expected first sequence only dismisses the loader; a separate second action may open Contact. Reproduced in initial test plus independently repeated390/375 cases, with screenshots and trusted event logs. These are native Chrome CDP touch events, not DOM `.click()` or mouse-only proof; physical hardware remains untested.

Demonstrated root cause/canonical owner: `src/components/layout/home-eye-bootstrap.ts` → `consumePointerClick`, specifically `pointerup` schedules `setTimeout(clear,0)`. Browser listener instrumentation shows guard added10232.5ms, pointerup10251.0, guard removed10251.2, trusted touch click10252.6 on Contact. The guard expires before the native touch compatibility click after the cover disappears. The existing finite input seam is the owner; no new controller, redesign or global click blocker is authorized. FRONTEND corrects sequence lifetime/cleanup while preserving ordinary touch scroll/cancel, keyboard/pointer behaviour and later real activation. QA made no app fix.

Browser path: primary IAB loaded exact3134. Dedicated temporary Chrome supplied native touch/lossless paint controls because prior IAB lossless capture was unsuitable. Controlled real stylesheet/selected-image requests paused with explicit resource types; React chunks blocked only in pre-hydration test. CSS pause allows instrumentation before bootstrap, then actual browser paint/decode recorded. No Document response rewrite, provider config, Figma/native app/global color inspection or source mutation. Controlled time before CSS release is not the loader deadline; three seconds begins at actual arming.

| Before | After | Why |
| --- | --- | --- |
| Owner mouse/pointer acceptance; native touch unclaimed |Trusted native first tap opens unseen Contact at390/375 |Required input-isolation gate fails |
| Source suggests zero-delay guard disposal |Observed removal precedes touch click by1.4ms |Directs bounded fix to existing input owner |
| Some finite lifecycle gates independently pass |Local acceptance remains Failed |Passing failure escapes cannot waive a reproduced required input defect |

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Native touch input |390×844 and375×812; actual opaque waiting cover,one tap over Contact |**Failed:** first tap both dismisses and opens Contact; repeated twice beyond initial case |`native-touch-tap.json`,`native-touch-reproductions.json`,`touch-guard-lifetime.json`,waiting/after-first PNGs |
| Pre-hydration cold paint/ready |Real CSS/image hold,React chunks blocked,390×844 |Passed observed waiting FCP with natural0/no hydrated mode,eye transform none/ring8s; native selected decode precedes ready; cover disposal follows native80ms mark/160ms cover animation; no sampled mark/copy overlap |`cold-prehydration.json`,`cold-waiting.png` |
| Timeout/error/late picture |Short390×640 real delayed image; real request failure |Passed fallback,late successfully decoded photo remains hidden; image error releases immediately |`timeout-late.json`,`image-error.json` |
| Independent deadline |Lost3s JS callback; script execution disabled after waiting |Passed CSS hides/offsites cover and late photo despite waiting JS phase; late decode resolves to fallback; no reopening |`lost-deadline.json`,`controller-stopped.json`,PNG |
| Keyboard |Native Tab while waiting |Passed fallback with focus retained on Skip link/y0; no trap/autofocus/scroll lock |`keyboard.json` |
| Source/lineage |Exact snapshot,current intake,accepted PORT-20 packet |Passed234 protected intake,207 baseline files/manifest unchanged; exact7-file release delta; hero differs only hidden marker,CSS prefix/source favicon preserved |`source-integrity.json` |
| Clean errors/cleanup/hygiene |Final ordinary uninstrumented reload;canonical workspace |Passed empty nontruncated Runtime exception window,IAB warnings/errors empty;all own tabs closed,interception/blockedURLs/cache/touch/script/media/metrics cleared;probe/listener wrappers removed by reload,body unlocked/no dialog,3134+3132 retained;hygiene passed |`clean-errors.json`,`cleanup.json`,`iab-console.json` |

Evidence root: ignored `test-results/port21-qa/`. Screenshots visually inspected. Normal instrumented cold ready→disposal301.7ms including scheduling; actual native animation elapsed80/160ms is evidence of nominal CSS, not universal wall-time/performance assurance. Paint occurred with React blocked; no hydration prerequisite is inferred.

Coverage kept open for corrected build: native touch scroll/cancel and mouse comparison,prepaint-ready/cache-pending warm distinction,bootstrap failure,reduced/no-JS,native Back/fresh-entry,full responsive/resting/contrast/SEO changed-surface acceptance. These were not independently completed after the reproduced input failure; owner evidence remains supporting, not QA pass. No new exhaustive contrast/build/type/unit/lint/hardware/Safari/AT/performance or external delivery claim. Valid PORT-20 finite4.542 baseline proof is preserved through unchanged owners, but current PORT-21 local/hosted/release/Done gates remain open.

FRONTEND next: fix only first-input sequence consumption/cleanup, refresh exact build/snapshot/closure/release delta, exercise native first tap (no dialog),second tap (dialog),touch scroll/cancel,mouse/keyboard and existing deadline/Back/no-JS/reduced gates,then return same Task directly to QA. Preserve stationary eye/8s/80+160/3s/source/type/White40/SEO/home-only release boundaries. Do not stage dirty checkout or mutate accepted PORT-20 packet. No new approval,chat,subagent,worktree or publication is requested.

#### FRONTEND Eye Loader Implementation Result — 2026-10-29

Historical initial owner receipt: independent QA subsequently rejected this3134 build for native touch. The current correction and exact replacement build are recorded above; this receipt is not current release clearance.

PORT-21 / FRONTEND implementation writer released to independent QA. **Implementation DoD: Passed within the owner checks below; Global QA Acceptance and release remain open.** Exact production-mode local build `5YNsxN8nMtLmGFm5J1Cq1` runs at http://127.0.0.1:3134/ from the clean full-source snapshot recorded in `test-results/port21-loader/final/owner-build-path.txt`. This is a local verification build, not a deployment or the isolated production packet. Published PORT-20 remains unchanged.

Are we fixing the root cause, or only a visible symptom? Controlled baseline3132 native browser proof showed first-screen name/copy painted while the held selected hero still had naturalWidth0. The demonstrated cause is independent native picture loading/decode versus already rendered first-screen content; no live network-speed defect is claimed. FRONTEND owns optional first-document readiness presentation at Header/HomePhotoHero, not image delivery or new content truth. Design-system direction1 reuses existing palette/system type, native picture/White40 hero, Header/progress, ContactSheet, PortfolioGrid and ordinary-flow/reduced/history patterns. The new bounded cover controller has no earlier equivalent to replace; it adds no global loading framework, new font/library/package or competing Header.

Changed owners: Header adds a home-only HomeEyeLoader before its own markup; HomePhotoHero adds one hidden end-of-first-screen readiness marker; globals.css appends only the PORT-21 rules. New HomeEyeLoader and self-contained serialized home-eye-bootstrap own default-off decoration and parser-time finite lifecycle. Two local SVGs are exact Figma MCP exports at144×144 and40×40. Native TEXT_PATH codegen was explicitly unsupported, so the approved native ring was exported as glyph outlines through a read-only Figma export, without approximating the lettering or adding a font download. Eye is the approved source geometry without its white wrapper/backing. Original favicon SHA256 remains `2ff98a383e2400cea26181a53009152fc357e26f80f527d0ebafe1a472aebe1d`; both exports total29,217 uncompressed bytes.

The parser bootstrap does not depend on React hydration. It installs input/cleanup/JS deadline before arming, observes the existing hero marker/selected image, and waits for actual native decode. It can arm only before first contentful paint, at scrollY0, with the stylesheet sentinel available; ready-before-paint bypasses. Normal ready uses stationary eye,8s linear ring and80ms mark-out followed by160ms cover-out after80ms, cubic(.23,1,.32,1). Image error/3s activation deadline/input removes cover and suppresses late photo for this document; fresh entry retries. A separate CSS deadline moves the hit area offscreen, hides cover and suppresses late photo even when the JS controller stops. The absolute JS deadline prevents a delayed decode reopening the photo when its timeout callback is lost. Reduced ring is static and readiness exits immediately. Default inline display:none, bootstrap catch and native Back bypass keep the document available. No body hiding/inert/focus trap/autofocus/scroll lock/storage/CSP change.

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Build/type/existing tests | Final clean full-source snapshot; canonical test suite | Passed production build, separate tsc noEmit,31 tests/5 files; snapshot matches all241 current source/assets | `final/build.log`, `typecheck.log`, `tests.log`, `source-closure.json` |
| First actual paint/decode | Native Chrome390×844 and1440×900; cache disabled, real CSS/image requests held, React chunks blocked for pre-hydration cases | Before bootstrap no paint; actual FCP shows waiting cover with undecoded photo and no hydrated Header. Decode resolves before ready.100/97 native frames; eye transform stays none, ring8s, no sampled mark/copy overlap | `cold-ready-prehydration.json`, `desktop-ready.json`, native JPEG sequences and waiting PNGs |
| Ready motion/disposal | Actual browser-parsed CSS, hydrated mobile, lightweight desktop timeline | Native CSS confirms80ms/160ms/80ms delay/exact curve. Mobile pre-hydration ready→disposal248.9ms; lightweight desktop290.8ms including frame scheduling, final animations empty. Heavy desktop screencast/style audit delayed wall events683.3ms; not represented as a universal240ms wall-time or smoothness claim | `native-css-rules.json`, `desktop-lite-timeline.json`, `browser-analysis.json` |
| Ready-before-paint/warm | Native preload-ready picture while CSS paused; separate ordinary cache/revalidation reload at y0 | Decode609.9ms precedes FCP616ms with cover off. Actual warm reload FCP28ms/revalidation300 transfer bytes shows brief cover while decode is pending, then prepared photo; no artificial minimum hold. HTTP cache hit alone does not imply decode-ready, so universal zero-cover warm loading is not claimed | `warm-prepaint.json`, `warm-native.json`, native filmstrip/contact sheet |
| Finite failure/late photo | Real failed image,3s timeout, short390×640, lost JS timeout callback, script execution stopped after arming, bootstrap observer constructor failure | Passed immediate/error or bounded fallback. Successful late photo stays hidden. With scripts stopped, JS phase can remain waiting while independent CSS releases cover/hit area and suppresses photo; no later visible pop. Bootstrap failure never arms | Named failure JSON/frames; `browser-analysis.json` |
| Input/reduced/no-JS | Native pointer, Tab, scroll gesture; reduced media; scripts disabled before reload | First pointer dismisses without opening Contact; second opens; Escape returns focus/unlocks. Tab retains skip-link focus; scroll continues. Static ring/immediate reduced ready. No-JS has one visible H1/readable copy/controls/reserved height/cover off | `pointer-verified*`, `keyboard-dismiss.json`, `scroll-dismiss.json`, `reduced-ready.json`, `no-js.json` |
| Back/new entry/controls | Actual route navigation→native Back; fresh reload after fallback; Contact/grid/scroll/reverse | BFCache restores same timeOrigin/y211/name155 with cover off; original navigation type correctly stays reload. New document retries photo. Contact focus/body return,grid toggle,compact name12/photo0 and reverse name366/photo1 pass | `native-back.json`, `fresh-entry-retry.json`, `controls-scroll.json` |
| PORT-20 resting geometry/source/SEO | Seven desktop/mobile/short/edge sizes,seven HTTP routes,two local exports | Approved name positions382/366/350/264 and narrow206; stable hero heights/no horizontal overflow/brightness(.6)/one Header. Seven200/exact build/www canonical/robots, loader bootstrap/marker only home. Existing photo/text/contrast owners unchanged | `geometry.json`, resting PNGs, `http-source.json`, `source-closure.json` |
| Source/isolation/reuse |237 intake files; accepted PORT-20 packet | Exactly3 existing files changed,4 new files;234 protected intake files unchanged. All207 accepted packet files/manifest remain byte-identical. Isolated dependency delta preserves home-only Header wrapper/null off home and all prior scoped CSS | `source-closure.json`, `release-delta/`, `release-delta.patch`, `verify-source.py` |
| Errors/checklist/hygiene | Clean final production-mode load; changed TSX/finite CSS controller | Empty warning/error log and complete nontruncated Runtime exception window. Focused React checklist: static bounded JSX/no new hooks/state waterfalls, native decorative alt/ARIA/status, passive scroll events and disposal. Hygiene/diff checks pass; browser overrides cleared | `clean-errors.json`, `browser-cleanup.json`, `hygiene.log`, `diff-check.log` |

Evidence: ignored `test-results/port21-loader/final/`; lossless/native frames under `/Users/ivan/Documents/Codex/2026-10-29/portfolio-frontend/outputs/port21-loader/final/`. Earlier parent-directory prototype builds and incomplete `warm-audited`/heavy `motion-native` diagnostic captures are not acceptance evidence. Native first-paint screenshots/filmstrip were visually inspected; no Figma timer or DOM-only fixture substitutes for network/decode proof. Controlled CSS/image scheduling is disclosed. Owner did not run a new exhaustive contrast raster matrix: unchanged PORT-20 style prefix/assets/geometry preserve its finite accepted proof, including narrow4.542 minimum; independent QA decides proportional repeat. Lint is skipped by existing build configuration and was not separately run; lint coverage is unclaimed. Physical phone/Safari/AT/real safe-area/native touch/performance/universal timing/contrast/external delivery are unclaimed. No source, Figma or provider configuration was changed by browser probes.

**Next executor QA:** independently verify this exact local build and the admitted lifecycle, especially real first-paint/decode/prepaint-ready versus cache-pending, script/controller failure, touch/input/reduced/Back, short geometry and unchanged resting PORT-20. Same-scope defects return directly to FRONTEND. After local acceptance hand the same Task to BACKEND: extend a NEW isolated copy of the accepted207-file PORT-20 packet using only the7-file release-delta (expected211 total,204 baseline files unchanged). Never replace scoped globals or the home-only Header with whole dirty canonical files. Preserve legacy case/Manifesto/fonts, current SEO/contacts/grid, and production projects/chatAPI404. BACKEND revalidates actual live/rollback before staging; hosted QA precedes SAME-build promotion/live QA/Product final acceptance under existing authority. No commit/push/deployment, source/logo mutation, unrelated route expansion or repeat visual approval was performed here. PORT-21 stays open until those gates pass.

#### Eye Loader Proposal Result — 2026-10-29

PORT-21 / DESIGNER → PRODUCT/Ivan visual and lifecycle review. Are we fixing the root cause, or only a visible symptom? The observed symptom is a photograph appearing after other first-screen content; network/decode/first-paint cause is not yet measured. This proposal owns presentation/readiness intent, not a speed claim. Future runtime owner is FRONTEND at the existing HomePhotoHero/Header first-screen seam after approval. Design-system direction1: reuse current palette, SF Pro type, exact source eye and existing first-screen/control compositions; no new library/component family or parallel state/timing system.

One isolated [study SECTION2871:828](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2871-828) on existing homepage2469:2 contains131 editable nodes. [Desktop1440×900](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2871-832), [mobile390×844](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2871-928), [static reduced-motion390×640](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2871-989), [error/timeout fallback390×640](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2871-1042), plus a320px detail timeline2871:1077 and four technical notes. These are first-screen specimens, not another full homepage. Existing PORT-20 study and all ten other original homepage roots match immediate before/after/final fingerprints; no original Figma node was changed.

Visual: stationary40×40 eye box inside144×144 mark footprint; exact black eye path from `public/favicon.svg`, source SHA256 `2ff98a383e2400cea26181a53009152fc357e26f80f527d0ebafe1a472aebe1d`, path SHA256 `e5a5b3e36a1de935c50ce4e456d9cf9797d0dfa3ba14310f2709cd60312e11ff`. White rounded square and white circular backing are excluded; source file is unchanged. Palette uses existing background2459:7 and text-primary2459:8 (raspberry/yellow), solid contrast13.892:1. The exact circular `Ivan Cheremisin · Product designer ·` is editable native TEXT_PATH at the existing SF Pro Regular14px. Baseline radius50px; calculated tracking2.087757px fills the circumference from the measured239px untracked copy. Only its container rotates clockwise45°/s, an8s revolution; eye has no rotation/position tracks. Circle lettering is decorative, not a new type scale or additional role copy.

Native TEXT_PATH in this MCP runtime rejects font-variable binding and has no lineHeight setter. Its font values are copied from the existing bound SF Pro14/20 regular source; paint remains semantically bound. Normal text/technical notes/borrowed hero text retain existing text/token references. This is a disclosed Figma API limit, not a new unbound typography family; later implementation inherits existing CSS typography. Library discovery returned generic ui/refresh/complete assets, with no exact branded eye-and-circular-copy composition; no external asset/library was imported.

Ready reveal: mark fades out80ms, then the cover fades160ms with cubic(.23,1,.32,1), total240ms. Prepared photograph, identity, copy and controls reveal together under the cover; no loader lettering crosses page copy. No scale/blur/stagger/percentage or requirement to complete a turn. Demo readiness occurs at1.8s only to show the transition; it is not a minimum waiting policy. New native desktop/mobile clips are2.6s with0.1s endpoint padding in MP4 (2.7s); detail is8.2s native/8.3s MP4. Five ring phases and six mobile/four desktop phases were inspected after fixing text-path parentage and the initial logo/copy crossfade overlap. Eye stays centered and ring returns to its start after one turn. Earlier diagnostic exports are retained only under work/, not current outputs.

Proposed finite lifecycle, requiring Ivan approval before implementation:

| Entry / event | Proposed result |
| --- | --- |
| First homepage document entry, critical picture not ready | Optional cover arms before its first visible paint only if bootstrap/fail-open is safely installed. Wait for the selected hero image to decode and necessary first-screen text/layout readiness; existing system type adds no font-download gate. No all-image, global fonts.ready, network-idle or percentage condition. Actual initial-flash handling remains FRONTEND proof. |
| Cache-ready before cover paints | Skip cover/rotation entirely. No minimum hold, enforced spin or intro delay. |
| Readiness arrives while cover is visible | Run80ms mark-out then160ms cover-out once, showing the already prepared screen together. Cancel the decorative rotation on disposal. |
| Image error or proposed3s deadline from activation | Reveal existing readable raspberry fallback, stable hero height/identity/controls. Suppress a later photo for this entry so it does not suddenly arrive after dismissal; normal next document load can try again. The explicit tradeoff is that a slow successful photo can be withheld for the current entry. No automatic retry or whole-page loading guarantee. |
| Keyboard/pointer/scroll intent while waiting | Dismiss cover immediately to a readable document/fallback; retain focus and ordinary scroll. No focus trap/autofocus, body hidden/inert or scroll lock. Avoid forwarding an overlay click into an unseen underlying action. |
| Reduced motion | Static eye/ring, immediate ready/fallback reveal; no rotation or staged fade. |
| No JS, bootstrap failure or restored native Back | Server content remains visible by default; optional decoration stays off. Independent visual fail-open must release an armed cover if its handler fails. Do not replay on scroll/viewport reveals, native Back or persisted storage. Scheduling/first-paint/failure guarantees must be exercised later, not inferred from the timeout number. |

Accessibility intent: one concise loading status, decorative eye/circular letters hidden from assistive text reading; no per-character announcements or focus movement. Keep canonical page content/SEO present, existing white40→yellow/header/control/history behavior and source/copy intact. Fallback is normal page content without a decorative photograph, not a new error modal or invented visitor-facing failure claim.

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Exact borrowed logo / type / palette | Source SVG hash/path, Figma type and token readback | Passed within disclosed native-path font-binding limit | logo-source.json; final-readback.json; ring-parent-repair.json |
| Rotation / stationary eye / clean exit | Native8s loop and desktop/mobile ready clips, selected phases | Inspected; eye has zero transform tracks; mark hidden before cover reveals copy | MP4s; sequence PNGs; exit-fix.json; validation.json |
| Reduced / fallback / solid contrast | Static specimens, source tracks and solid palette calculation | Passed proposal checks; reduced has no manual tracks,13.892:1 mark contrast | reduced.png; failure.png; validation.json |
| Scoped ownership / preservation |131 exact new IDs,11 original root fingerprints, source SVG rehash | Passed; no source/favicon/page/library/master/runtime/release mutation | construction.json; final-readback.json; validation.json |
| Documentation / hygiene | Focused UTF-8/whitespace/conflict scan and npm run hygiene:check | Passed | validation.json |
| Network/cache/decode/font/focus/no-JS/Back/first paint | DESIGNER proposal boundary | Not exercised; future owner acceptance required after visual/lifecycle approval | Same Task and lifecycle table |

Current evidence: `/Users/ivan/Documents/Codex/2026-10-29/portfolio-designer/outputs/port21-eye-loader/` — detail/mobile/desktop/reduced/failure PNGs, three native MP4s and phase sheets. Exact construction/repaired-parent receipts, current131-node ledger, source/tracks/protection, extraction and validation are in sibling `work/port21-eye-loader/`. Bounded rollback removes only SECTION2871:828 and its recorded descendants after checking later edits; restore no original homepage or PORT-20 node. DESIGNER releases the writer and the same Task to PRODUCT/Ivan for this one visual/lifecycle approval. No FRONTEND/code/release admission follows automatically, and PORT-20 staged QA/promotion continues independently.

### New Design Study — Personal Photograph Homepage Hero

Current Task: [personal-photo hero design](https://app.notion.com/p/408fe5f58cf581848257d407474871d1). Completed PORT-15 is not reopened.

Ivan asks the permanent DESIGNER to propose a new photographic opening for his own homepage using the exact supplied personal surf photograph. This is a new bounded design outcome after completed PORT-15, tracked separately from the in-flight PORT-16 temporary homepage/SEO production release and Citymobil PORT-17. Accountable PRODUCT; sole executor DESIGNER → PRODUCT/Ivan review. No homepage code, metadata/card replacement, release-packet change or automatic frontend handoff is admitted. The temporary release continues without waiting for this study.

Source: `/Users/ivan/Desktop/dji_fly_20250119_073546_562_1737283375016_photo_optimized.jpg`. Read-only metadata preflight: JPEG RGB/sRGB IEC61966-2.1,2789×2092,2696010 bytes. Preserve the original file/bytes and authored monochrome/grain, people and coastline. Optimization is deterministic resize/encoding/metadata stripping for web, not generative editing, retouching, denoising, colorization or a new photograph. Maximum delivery width2560px, no upscale; preserve aspect for the master (approximately2560×1920). “2560px screen” is a width cap, not permission to arbitrarily crop away the subject.

Root cause/owner: the current text-only opening has no photographic stage or defined identity-to-compact-header handoff. Canonical seams are the existing homepage identity/Header/intro/contact/grid compositions and this isolated hero study, not another typography system or a rewrite of the accepted career/projects section. Reuse Portfolio compact SF Pro14/20, existing emphasis/secondary roles, palette/grid/links/icons/control definitions; no giant decorative headings, new font/color/DS or copied reference biography. Use current authored English identity/role/introduction/contact text exactly; do not treat spoken “blah blah” as replacement copy. Preserve the current release's Personal/utility hiding/project In Progress intent in any following-content sample; do not reintroduce pending navigation as though approved.

Design outcome:
- Large edge-to-edge photographic first screen, square corners. Latest spoken preference is the identity/role/introduction GROUP vertically centered rather than bottom; recommend this as the main composition, using the shared reading/grid alignment rather than stretching paragraphs across the photo. Keep name, product-designer role and existing short intro as editable text. Desktop Email/LinkedIn/GitHub sit at lower right with safe insets/reachable targets.
- On normal scroll the identity travels toward its existing compact-header anchor. Define one continuous handoff: as it reaches the top/header position, the PHOTO layer gradually fades to the existing raspberry page surface and the normal content continues. Explicitly show start/mid/handoff/after states and geometry/progress ranges; avoid duplicated visible names/contacts, jumping text, sudden layout collapse, or a separate competing header. Reverse scroll restores the hero. No wheel takeover, snap lock, forced carousel, autoplay-on-load animation claim or unrelated background/parallax effect.
- Keep current approved compact header and below-hero content geometry; demonstrate with a short real Work Experience continuation, not another full-career-page clone. Existing grid and contact access must remain usable above the hero without hiding controls. On mobile show375/390 widths and a reasonable short-height state; choose/annotate one legible contact placement compatible with the existing grid-left/Contact-right dock, no competing contact trigger or accidental overlap. If compact Contact replaces the three inline links on mobile, make that responsive proposal explicit for Ivan review rather than silently claiming he requested it.
- Protect contrast over bright grey sky/water. Use a minimal editable presentation veil/surface only if needed with the current yellow foreground; never bake a veil into the source photo or recolor the whole site. Preserve image atmosphere and check actual composites. Full frame dimensions and object-position/crop must keep the meaningful surfers/coastline. Figma crop masks are presentation, separate from optimized source derivatives.
- Mobile uses stable first-screen/safe-area intent (normally100svh-equivalent), ordinary page flow and no trapped long text; no runtime/hardware claim from frame sizes. Reduced-motion/static/no-JS future intent keeps all identity/copy/contacts readable, omits scroll-linked movement/fade where needed and uses normal-flow handoff. Photo loading/failure must not hide copy, collapse the reserved hero or remove navigation.

Plan and deliverables:
1. Read the source with view_image and inspect current LIVE Figma homepage/header/grid/contact owners through MCP only. Current accepted desktop2469:4/mobile2469:5, Foundations2459:2, grid/control study2569:2 and Citymobil/manual overview stay unchanged. Build one clearly labelled compact hero study SECTION on the existing homepage page2469:2, not a new file/page, another whole homepage or parallel library. Use shared instances and exact safe mutations/creation receipt; one Figma writer.
2. Prepare a small web-ready derivative pack outside Git, reusing configured local image tooling (e.g. installed Sharp/ImageMagick) for deterministic resize/encode. Inspect source→output at full view/detail for grain, edges, tones and decode orientation. Compare WebP/AVIF if tooling already supports them, choose a practical small deliverable set (max2560 plus1600/800 widths where useful, no size/format explosion), plus compatible fallback only if justified. Aim roughly200–450KB for the2560 derivative and≤150–200KB for the small mobile asset, but report actual size/quality tradeoff rather than remove intentional grain merely to hit an arbitrary budget. Normalize orientation/sRGB as needed and strip private EXIF/GPS while preserving correct rendered color. Never overwrite Desktop source; no public/asset/Git bulk or new package installation solely for this design study without a demonstrated need.
3. Save exact source hash, dimensions/bytes, chosen codec/quality/resize/crop/color metadata, output hashes/actual weights, derivative paths and recommended future srcset/object-position/loading policy. Import a supported optimized derivative into Figma through MCP for the study; no browser Figma. Show desktop/mobile first screen, compact handoff/after, legibility/crop samples and a supported native motion export/storyboard using figma-use-motion. Unsupported scroll/click execution remains an explicit limitation, not a reason for browser fallback or to label a timed export working scroll.
4. Verify text/style/token bindings, proposed crop/contrast/bounds/control placement, before/after source/current-page preservation and actual image file/decode/weight proof. Save exact owned node IDs and bounded rollback outside Git, update/read back the same new photo-hero Task, release Figma and return actual study/assets/motion links to PRODUCT/Ivan for design approval. Run proportional documentation/hygiene checks; no Next/build/website QA needed for this design-only study. If compression cannot meet proposed budget at acceptable grain quality, present actual results and recommendation; do not pretend “optimized” from a filename.

This study is an unapproved future visual direction. PORT-15 remains completed, PORT-16 SEO/release continues on its accepted text-only home, and Citymobil media/case facts/manual edits remain separate. No photo/icon/OG/source fact replacement or production action is implied.

#### Current Approval — White40 Scoped Implementation (2026-10-29)

Ivan explicitly approves the presented minimal alternative and says to implement it. Current executor FRONTEND on the same PORT-20 Task; no further design approval is needed for this exact variant. Implement the existing white primitive at100% on the OVER-PHOTO name/roles/introduction, keep40% uniform photo toning, retain desktop group centering, and offset the complete mobile hero text group down32px from its previous centered position. Preserve4px name-role gap, `Product designer | Product builder | Film director`, all other copy/type/width/crop/source/controls, ordinary page flow and independent photo fade. Compact header and following-page text remain the existing yellow design. The approved static source is `outputs/port20-fixed40-text/minimal-alternative/` (desktop/mobile/375/short), not the centered yellow diagnostic main-study state; the latter is historical, not an instruction to implement yellow hero text.

Reuse existing HomePhotoHero/Header progress and foreground owners for white-to-yellow compact-header handoff and the additional32px mobile name travel. No duplicated header, new timing system, forced scrolling, fixed-pixel crop hack, backplate/shadow/additional veil or global palette change. This is a scoped fix to the demonstrated contrast conflict, not a rewrite or reset of prior passing functional/source proof. Refresh the release closure/snapshot, run owner type/build/tests/hygiene and actual responsive-asset composites, then hand directly to QA on the same Task. QA verifies revised resting contrast≥4.5:1 on desktop/mobile/short with real selected assets/fonts, geometry/no overflow, white→yellow handoff and reverse, controls/focus, reduced/failure/no-JS and changed-surface regression; reuse valid unchanged evidence instead of repeating the entire project. A static Figma pass is not runtime proof; unresolved required failures stay open.

Responsive edge clarification: the four approved specimens retain their exact white40/desktop-center/mobile+32px geometry. Newly exercised320×568 and812×375 states have no separately approved pixel-exact placement; their remaining contrast failures are bounded responsive-fit work, not an automatic new design decision. FRONTEND may adapt the existing shared hero-copy-shift/progress geometry only for narrow/short/landscape edge conditions, choosing the smallest measured text-group placement correction while preserving the four approved specimens,40%/white100/type/copy/4px/crop/control/source invariants and ordinary flow. No extra veil/panel/shadow, font reduction, source retouch, one-off fixed-screenshot positioning or parallel header state. Use one existing seam with proportional validation of the affected breakpoints and reverse/fallback geometry; if no safe correction meets the target within this boundary, return one precise minimal alternative and evidence. Do not repeatedly ask Ivan to reapprove responsive implementation inside this accepted intent.

After local acceptance, continue the previously authorized isolated BACKEND stage → hosted QA → same-build promotion → live QA → PRODUCT chain under Current Admission — 40 Percent Hero And Website Delivery. No whole-dirty-checkout publish, unrelated case/Manifesto/chat/API work, Git publication, SEO expansion or favicon. The approved white/mobile+32 choice resolves the design decision, not the runtime or release gate. No extra prompt relay through Ivan.

#### PRODUCT White40 Final Release Acceptance — 2026-10-29

PORT-20 is complete. PRODUCT reconciles Ivan's approved40%/white100/name-role4px/Film director/mobile-offset intent with corrected owner proof and independent local, hosted, SAME-build and public live acceptance below. Fresh authenticated www readback resolves to READY production `dpl_3NdLChRvs6A3x3DPTJm66pQ6ajF4` on `prj_87eVQkA1ehpM3rTJszSNj6dqaNDo`; actual public build is `wT3hr2GoR7lngwc1MKm9f`. PRODUCT inspected the independent accepted-mobile composition. No reproduced required failure or pending release action remains. PORT-21 eye-loader is a separate design proposal, not included here; PORT-15/16 remain completed history.

Deploy result: https://www.cheremisin.co.uk/ · production · READY · Next.js · provider build duration28.659s. Source is the isolated207-file PORT-16→PORT-20 packet, manifest SHA256 `0728f196152c42666c5d4152e928bb6d6b942afa8c6b4c31478bee9b3debfa0b`, not Git HEAD or the dirty checkout. No Git commit/push was performed; tested staged build was promoted without rebuild. Previous live PORT-16 `dpl_DkVzWoxf61A9deL8QQYKiwn1LUKd` is retained READY rollback; no rollback trigger or execution occurred.

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Approved visual/behavior scope | Corrected owner and independent local/hosted/live browser proof | Passed within measured scope; existing hero/header/progress/grid/Contact/reveal primitives reused | Named receipts below |
| Published identity | Fresh PRODUCT authenticated www readback and independent live build/asset checks | READY exact tested deployment/project; no rebuild | Provider readback; QA deployments/integrity |
| Readability and responsive fit | Actual selected AVIF/WebP/fonts/DPR and approved/edge sizes | Required recorded cases pass; minimum4.542:1 remains a narrow margin, not universal certification | QA White40 Live Acceptance |
| SEO/isolation | Public28-head matrix,assets/apex and unchanged non-home baseline | Passed; home-only indexing, projects/chatAPI404, case/Manifesto isolation retained | Independent live receipt |
| Workspace | Product documentation and canonical workspace | Hygiene and diff checks required before final status readback | Local validation |

Preserved: exact source/approved derivatives, portfolio facts/employment roles, temporary-home In Progress/Personal/utility gating, contacts, home-only SEO and baseline case/Manifesto rendering. Citymobil/demo/chat/API/favicon/config/DNS/env/security work and unrelated dirty files were not published. Existing local/static/failure/native-input proof is reused proportionally for the identical deployment; physical-phone/Safari/AT/real-safe-area/performance/external-delivery/unsupported-engine/universal contrast and search indexing/ranking remain unclaimed. Post-deploy browser console/page-error checks are clean; an additional server last-hour log scan, log-drain audit and continuous monitoring setup were not performed by PRODUCT and are not represented as done. PORT-20 needs no further executor; do not reopen it for the new loader outcome.

#### QA White40 Live Acceptance — 2026-10-29

PORT-20 / **Independent live QA: Passed** at https://www.cheremisin.co.uk/ on SAME hosted-accepted deployment `dpl_3NdLChRvs6A3x3DPTJm66pQ6ajF4`, build `wT3hr2GoR7lngwc1MKm9f`. Authenticated independent www readback resolves to that exact deployment/project and READY PORT-16 rollback `dpl_DkVzWoxf61A9deL8QQYKiwn1LUKd` remains available. No rollback was needed or exercised. One next executor PRODUCT for final acceptance/status reconciliation on the same Task; QA does not mark product acceptance Done.

Root cause/ownership: accepted local/staged hero could not establish custom-domain publication/indexability. BACKEND promoted the exact isolated accepted candidate; QA independently verifies actual public rendering/headers/assets. Canonical seams remain HomePhotoHero/Header/progress/CSS/RepeatReveal/PortfolioGrid/ContactSheet and isolated release packet. QA changed no application source, public data, provider config or deployment. Reuse direction1 retains existing primitives and all admitted40%/white100/type/copy/4px/source/crop/controls/SEO boundaries.

Browser preflight: primary IAB loaded the public home, then native Chrome supplied exact lossless/DPR controls under the prior demonstrated IAB PNG limitation. Actual photo decode/fonts.ready,currentSrc and exact build recorded before fresh pairs. Only owned temporary tabs used/closed. No stopped native-app/color investigation was resumed.

| Before | After | Why |
| --- | --- | --- |
| Unique-stage acceptance with expected HTTP noindex |Public www exact-build acceptance with no HTTP noindex |Custom-domain indexability must be verified separately |
| Hosted finite contrast/input/isolation proof |10 fresh public pairs/35 scroll states plus public Contact/SEO/assets/isolation |Checks the actual promoted endpoint without resetting valid unchanged coverage |
| Rollback named by release owner |Independent authenticated READY rollback readback |Proves retained candidate, without claiming rollback execution |

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| SAME deployment/rollback |Authenticated www and PORT-16 rollback readbacks |Passed expected candidate/project/production READY, rollback READY;207-file manifest unchanged0728f196152c42666c5d4152e928bb6d6b942afa8c6b4c31478bee9b3debfa0b |`deployments.json`,`integrity.json` |
| Live contrast/actual fonts/sources |10 fresh native PNG pairs:four approved views,600x844,812x600,320x480DPR2,390x844DPR2,trueWebP and warm2560 narrow |Passed≥4.542. Actual1600AVIF previous defects6.385/5.329,6.484/5.572,4.811/4.881. Narrow390x844DPR2 actual2560 primary4.542 remains disclosed. Nine pairs identical outside text rows,one max1/255; real system font14px,opaque white,brightness(.6) |`contrast-geometry.json`,`contrast.json`,`contrast.py`,`pair-quality.json`,PNG pairs |
| Live geometry/reverse |Five widths/heights including exact375;35 states |Passed approved H1 y382/366/350/264,narrow206,resting4px gap,compact y12/photo0/yellow,reverse white/photo1;stable doc height/one name/header/no overflow;dock unchanged |`geometry.json` |
| Live interaction |320 Contact Enter/four Tabs/Escape,grid;IAB375 In Progress Enter/Escape |Passed autofocus/trap/body unlock/focus Contact/exact y100/name106 restore;grid aria-pressed true then off;In Progress no navigation. Reduced320 at y120 remains ordinary white/photo1/details1/no overflow |`interactions.json`,`isolation-browser.json`,`reduced.json` |
| Public SEO/crawl/assets |Seven routes×browser/Google/Twitter/Facebook=28;robots/sitemap/icon/social/CSS |Passed28×200/exact build,seven unique titles/descriptions,www canonical/schema,home index/follow meta and NO HTTP noindex;other pages noindex/follow;no stage/local leak,home-only sitemap,Allow:/,OG1200x630/Apple180x180 |`http-summary.json`,`http/` |
| Assets/apex/isolation |Four www photo URLs;apex;projects/API;IAB Manifesto/Wrike375 |Passed200/MIME/exact approved hashes,apex308→www,projects/chatAPI404,non-home one Header/Geist Mono/no hero/no overflow;no unrelated route expansion |`integrity.json`,`isolation-browser.json`,case screenshots |
| Errors/cleanup/hygiene |Clean final load,Chrome+IAB;canonical workspace |Passed empty warnings/errors and complete nontruncated Runtime exception window;probe/source media/emulated-media/cache/metrics restored,body unlocked/no dialog,owned tabs closed,3132 untouched;hygiene passed |`clean-exceptions.json`,`chrome-console.json`,`iab-console.json`,`cleanup.json` |

Evidence root: ignored `test-results/port20-qa-live/`; `accepted-mobile.png` visually inspected. Independent hosted28-pair/63-state/native touch/focus/static/no-JS/oversized/photo-failure/source-bridge proof is proportionally reused for SAME deployment,byte-identical assets and unchanged owners; those exhaustive fallbacks/native touch were not all repeated on live. No new build/type/lint/unit run because QA made no app-source change; build/type/unit owner proof remains supporting. Initial asset requests with Python default agent received403; the ordinary browser-agent check completed normally without security/config changes. Physical phone/Safari/real safe-area/AT/performance/external delivery/unsupported engines/universal contrast and search-engine indexing/ranking are unclaimed.

**Verdict:** required local,hosted,SAME-deployment and independent public live gates pass within the finite scope above. No reproduced release defect or rollback trigger remains. PRODUCT now reconciles final acceptance on the same Task, preserving narrow contrast/hardware/search limits and completed PORT-15/16 history. No Git publication, dirty-checkout release or unrelated Figma/favicon/config/DNS/secret/API/media/SEO work was performed by QA.

#### BACKEND White40 Same-Build Live Promotion — 2026-10-29

PORT-20: promoted ONLY hosted-accepted **`dpl_3NdLChRvs6A3x3DPTJm66pQ6ajF4` / `wT3hr2GoR7lngwc1MKm9f`** to https://www.cheremisin.co.uk/ through authenticated MCP, without rebuild or source changes. Immediately before promotion authenticated www resolved to READY PORT-16 **`dpl_DkVzWoxf61A9deL8QQYKiwn1LUKd`**, retained rollback. Candidate project/team/READY production status and verified www/apex/apex308 ownership matched admission. Post-promotion www resolves to the exact tested candidate; promote-alias readback reports completed www/apex/project alias mappings. Manifest207/hash `0728f196152c42666c5d4152e928bb6d6b942afa8c6b4c31478bee9b3debfa0b` and isolated PORT-16→PORT-20 lineage unchanged. No Git/config/DNS/env/security/secret/Figma/favicon or unrelated source mutation.

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Identity/promotion/rollback | Authenticated pre/post www/candidate/domains/alias readback | Passed SAME deployment, original target, retained READY PORT-16 rollback; no rebuild | `live/promotion-readback.json` |
| Live head/indexability | Seven www routes × browser/Google/Twitter/Facebook | Passed28×200/exact build/metadata/schema; home index/follow and NO HTTP noindex, hidden pages noindex/follow; no stage/local URL leak | `live/head-matrix.json`, `live/check-output.json`,28 raw HTMLs |
| Live crawl/icons/social/CSS | Actual www public URLs, ordinary browser agent |200/MIME/OG1200×630/Apple180×180, Allow:/ and home-only sitemap preserved | `live/assets.json` |
| Live derivatives | All four www image paths |200/MIME/exact final-pack SHA256, no image substitution | `live/photo-assets.json` |
| Apex | Public non-www home |308→https://www.cheremisin.co.uk/ | `live/apex.headers` |
| Live owner browser | IAB1280×720 normal homepage | Decoded actual2560AVIF/brightness(.6), opaque white/system font/approved roles, one header/no overflow; empty warning/error logs; own tab closed | `live/browser-home.json`, `live/console.json`, saved live PNG |
| Hygiene | Canonical workspace | Passed | hygiene output |

Evidence root: ignored `test-results/port20-release/`. Live HTTP checker uses explicit ordinary browser agent for asset checks and tests actual local/stage leakage rather than treating expected www canonical as a leak; no security workaround. Unique-stage noindex remains historical provider evidence, distinct from now-confirmed public home headers. Owner checks passed; no rollback needed. Rollback execution is not claimed—candidate is retained for the admitted failure path.

**Next executor QA:** independent live acceptance on SAME www build with actual assets/currentSrc/fonts/hero/scroll/reverse/controls/copy/SEO/apex/no-HTTP-noindex-home and existing scoped finite contrast gate. Preserve hosted28 raster-pair/63-state proof, narrow4.542 limit and unmodified packet boundaries; owner smoke is not new hardware/universal contrast certification. On live defect return directly to BACKEND for admitted rollback to recorded PORT-16/readback; otherwise same Task to PRODUCT final acceptance. Task not Done; physical-phone/Safari/AT/performance/external delivery/search-engine limits retained. Existing3132 runtime untouched.

#### QA White40 Hosted Acceptance — 2026-10-29

PORT-20 / independent **Hosted QA: Passed** for SAME deployment `dpl_3NdLChRvs6A3x3DPTJm66pQ6ajF4`, https://portfolio-8j8e0rbdk-ivans-projects-133d4a2e.vercel.app/, build `wT3hr2GoR7lngwc1MKm9f`. One next executor BACKEND for already-admitted target/rollback revalidation and SAME-deployment promotion, followed by independent live QA. This verdict does not claim publication, live indexability, rollback execution or Task Done.

Visible problem/root cause: production still has the pre-hero homepage; accepted local geometry cannot establish hosted rendering or isolation. Canonical owners remain the approved HomePhotoHero/Header/CSS/reveal/data seams and BACKEND isolated release packet. QA changed no application source. Reuse direction1 preserves existing primitives, ordinary scroll and all approved styling/source/copy boundaries; no visual compensation.

Browser preflight: primary IAB successfully loaded the exact hosted build and observed decoded AVIF/system-font text. Dedicated temporary Chrome supplied lossless PNG/DPR controls and native input because prior IAB lossless geometry was unreliable. Only own tabs were used. No original tabs/native app/global color settings were inspected or changed. Photo-image decode and document.fonts.ready preceded raster captures; system font family,14px type,opaque white and brightness(.6) recorded. Manifesto/Wrike retain Geist Mono and one own Header, no hero.

| Before | After | Why |
| --- | --- | --- |
| Local-only contrast/source proof |28 fresh hosted PNG pairs with actual currentSrc/DPR/fonts, minimum4.542:1 |Deployed bytes/rendering are independently exercised |
| Staged owner smoke and packet claims |Independent207-file bridge/196 preserved files,63 geometry states, input/fallback/SEO/isolation checks |Release gate must cover actual admitted delta |
| Unpublished candidate |SAME deployment returned to BACKEND |No rebuild or different deployment may substitute for the tested candidate |

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Packet/served bytes |207 files vs accepted PORT-16; all final closure owners/helpers |Passed196 unchanged/11 exact allowed changes, no deletion; exact home-only Header and154 gate retargets+CSS helper; four hosted200/MIME/SHA256 assets match; projects/API404 |`integrity.json` |
| Resting contrast |28 fresh native PNG pairs, actual1600/2560AVIF, true WebP,warm2560,DPR1/2; approved views, prior defects and fit neighbours |Passed all≥4.542. Former defects600x844=6.385/5.329,812x600=6.484/5.572,320x480/DPR2/1600=4.811/4.881;390x844/DPR2/2560 primary4.542 is narrow minimum. All pairs identical outside text rows |`contrast-geometry.json`,`contrast.json`,`contrast.py`,`pair-quality.json`,PNG pairs |
| Geometry/color/reverse |Nine sizes incl1440/390/375/short/600/landscape/320/1160/height768;63 states |Passed four approved H1 y382/366/350/264,compact y12/photo0,yellow handoff/body,white/photo1 reverse; constant document height,one name/header,no overflow. Name-role gap4px and dock positions preserved |`geometry.json`,`cleanup.json` |
| Interaction |320px Contact Enter/four Tabs/Escape; grid toggle; In Progress Enter/Escape;600px focused Email scroll |Passed Close autofocus/trap,body lock/restore,exact y100/name106/focus Contact; no route change; dock/grid accessible; focused Email opacity1/lower-right stable |`interactions.json` |
| Native input |Chrome touch forward/reverse at320x480 |Passed y15→135 then120→0 with continuous name/photo and restored opening |`native-touch.json` |
| Fallbacks |Reduced320x480,oversized320x320,no-JS320x480,blocked photo600x844 |Passed normal flow/opaque copy,no overflow; one visible no-JS H1 y206/gap4/five statuses/dead dock hidden; blocked image natural0 reserves844px/name386/details1 |`fallbacks.json` |
| SEO/isolation |Seven routes×four browser/bot agents=28;robots/sitemap/social/icon/CSS;IAB Manifesto/Wrike incl375 case |Passed exact build,seven unique title/description pairs,www canonicals,home index/follow meta only,other routes noindex/follow,Person+WebSite unchanged; expected stage HTTP noindex all28. One non-home Header/Geist Mono/no hero/no overflow |`http-summary.json`,`http/`, `isolation-browser.json`,case screenshots |
| Errors/cleanup/hygiene |Chrome/IAB logs,clean final reload event window;canonical workspace |Passed empty warning/error logs,no Runtime exceptions/window nontruncated; own tabs closed,source media/probe/script/touch/network/cache/media/viewport overrides cleared,body unlocked/no dialog; local3132 untouched;hygiene passed |`chrome-console.json`,`iab-console.json`,`clean-exceptions.json`,`cleanup.json` |

Evidence root: ignored `test-results/port20-qa-hosted/`. Accepted screenshot `accepted-mobile.png` was inspected. Reuse unchanged prior independent local Reveal/history/provenance/grid proof within exact closure boundaries; do not reset completed QA. BACKEND build/type evidence is supporting, not a fresh QA build. Lint/build/unit rerun omitted because QA changed no app source; physical phone/Safari/real safe-area/AT/performance/external delivery/unsupported engines and universal viewport/codec contrast are unclaimed. Probe setup mistakes were corrected before measurement; no app exception is inferred from those, final clean window is independently empty.

**Release condition:** BACKEND must revalidate actual current www target and rollback/project/team, then promote exactly `dpl_3NdLChRvs6A3x3DPTJm66pQ6ajF4` without rebuilding. Return actual www/apex mapping/build/asset/SEO/no-HTTP-noindex-home and rollback readback to QA for live acceptance. Prior PORT-16 rollback is `dpl_DkVzWoxf61A9deL8QQYKiwn1LUKd`, subject to revalidation. No unrelated dirty source/Git/config/DNS/secrets/Figma/favicon/API/media/SEO expansion. Task remains open until required SAME-deployment/live/rollback evidence is complete; same-scope future defects return FRONTEND.

#### BACKEND Isolated White40 Stage — 2026-10-29

PORT-20 / replacement production-configured no-domain stage **`dpl_3NdLChRvs6A3x3DPTJm66pQ6ajF4`**, [unique URL](https://portfolio-8j8e0rbdk-ivans-projects-133d4a2e.vercel.app/), READY, hosted build **`wT3hr2GoR7lngwc1MKm9f`**. Verified original portfolio team/project (`team_jK6pcC3dgzpQAcgEwx05ozx4` / `prj_87eVQkA1ehpM3rTJszSNj6dqaNDo`). Authenticated www before AND after stage still resolves to accepted PORT-16 `dpl_DkVzWoxf61A9deL8QQYKiwn1LUKd`, retained rollback candidate. Verified www/apex ownership/apex308; no promotion performed. Provider assigns its normal project `.vercel.app` alias during skip-domain staging; custom domains stay prior build.

Root cause/seams: production has the pre-hero homepage; the approved hero relies on scoped Header/CSS/reveal/data owners. Extend the accepted PORT-16 isolated202-file artifact, not dirty canonical source or owner snapshot. Packet/evidence: ignored `test-results/port20-release/`; **207-file source-manifest SHA256 `0728f196152c42666c5d4152e928bb6d6b942afa8c6b4c31478bee9b3debfa0b`**.196 prior files byte-identical, exactly six changed sources/one new source/four approved assets. Original prior manifest and all final hero closure hashes verified. `packet-delta.patch` records the precise bridge; `prepare.py` records construction. No canonical app source changed.

Integration follows final helpers exactly: null-off-home `backend-home-only-header.txt` differs from canonical Header only by wrapper; all154 old CSS gates retarget to `html:has(main.home-photo-page)` and exact `home-hero-css.css` appended. Only approved homeIdentity inserted, all prior site-content bytes retained. Baseline render bodies/case/Manifesto, Geist/viewport, projects/homeProjects/SEO aliases, package-lock/build config and /projects/chatAPI404 preserved. No raw original photo, unapproved derivatives, favicon, local index/API/project/demo/Figma/Git/config/DNS/secret changes. React review confirmed existing ref/RAF/passive-scroll/observer cleanup seams; no speculative implementation correction.

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Isolation/hash bridge | Accepted PORT-16 packet + final hero closure/helpers | Passed207 hashes,196 preserved/11 exact admitted changed-new files; all154 gate retargets; post-build manifest stable | `source-manifest.json`, `packet-delta.patch`, `prepare.py` |
| Build/types | Isolated local production build; remote Node22 production build | Passed compile/types/prerender; remote23s. Existing lint skip unchanged | `local-build.log`, `deploy.log` |
| Served derivative bytes | Four actual unique-host URLs |200/correct MIME/exact SHA256; sizes56364/225650/407068AVIF and566942WebP | `served-photo-assets.json` |
| SEO/runtime HTTP | Seven pages × four browser/bot agents; crawl/assets/404 gates | All28 app metadata/schema/canonical/build assertions pass; seven unique titles; robots/home-only sitemap/OG/icons/CSS200. /projects/API404 retained. Unique-stage HTTP noindex observed28 times, NOT a public-indexability pass | `hosted/head-matrix.json`, `http-check-output.json`, `hosted/assets.json`, `baseline-404.json` |
| Owner browser smoke | IAB1280×720 normal resting hero | Actual2560AVIF decoded, brightness(.6), opaque white name/system font, approved third role, one header/no overflow; empty warning/error logs | `browser-home.json`, `owner-hero.png`, `console.json` |
| Hygiene/cleanup | Canonical workspace | Passed; own tab closed, no own local server started; original3132 runtime untouched | hygiene output |

**Next executor QA:** independently verify this SAME staged deployment,207-file bridge, actual bytes/currentSrc/fonts and required finite contrast/geometry/input/static/SEO matrix before promotion. Owner smoke is not fresh raster-contrast certification; prior local29/48 samples and narrow4.542 margin remain explicit supporting evidence only. Preserve baseline case/Manifesto isolation and home-only indexing. Return same Task/deployment to BACKEND after hosted acceptance for target/rollback revalidation, SAME-build promotion and independent live www/apex/assets/build/no-HTTP-noindex-home proof. No live/Done or universal contrast/hardware/search claim; same-scope defects return FRONTEND. Physical-device/Safari/AT/performance/media/external-delivery/engine limits remain.

#### QA Corrected White40 Local Acceptance — 2026-10-29

PORT-20 / independent **local QA Passed** for corrected final build **`n2BiSK8Pby-eWrwjSaLOp`**, `http://127.0.0.1:3132/`. Previous3130/VI9 and preliminary fit2 builds remain historical. The three same-scope contrast defects are resolved in actual uncached1600AVIF cases, while approved geometry/40%/white/type/copy/crop/control invariants remain. One next executor BACKEND for the already-admitted isolated production-configured no-domain stage → independent hosted QA → SAME-build promotion → live QA → PRODUCT chain; no new design approval or Ivan relay. This is local acceptance only, not deployment/live/Task Done.

Root cause addressed by FRONTEND through the existing CSS copy-shift owner: hard cutoffs at599/600 exposed brighter photo pixels, and a cached2560 sample did not cover uncached1600 narrow DPR2. The corrected compact32px fit and continuous1040–1440 taper, plus narrow64px step, reuse Header's existing measured travel without JS/timing/dependency changes. Only globals.css differs from current intake;236 other files remain byte-identical. Full hero closure remains six changed sources/one new source/four approved derivative assets, preserving prior220-source and provenance proof.

| Prior reproduced failure | Fresh independent corrected primary / secondary | Result |
| --- | --- | --- |
|600×844,DPR1,actual1600AVIF name4.353|6.385 /5.329|Passed|
|812×600,DPR1,actual1600AVIF roles4.174|6.484 /5.572|Passed|
|320×480,DPR2,actual1600AVIF name4.478|4.811 /4.881|Passed|

**Fresh contrast:**29 native Chrome lossless normal/backdrop PNG pairs all pass≥4.5; minimum **4.542:1** is390×844/DPR2/2560AVIF primary, independently reproduced and explicitly a narrow margin. Coverage includes the four approved views,599/600/601 widths,1039/1040/1041 and1160/1200/1366 taper points,1439/1441 endpoint neighbours,1440×767/768/769 height boundary,374/375 DPR2, three real WebP selections and three warm2560AVIF former-defect variants. Actual WebP currentSrc is confirmed after a post-hydration AVIF-media exclusion; it is native fallback rendering, not a physical AVIF-unsupported engine claim.24 backdrop pairs are byte-identical outside text rows; five differ at most1/255. Alpha-aware sRGB fitted glyph cores coverage.85–1.15/residual≤6/255 use physical coordinates at actual DPR2. All raw source/field/core counts are saved; these are finite raster estimates, not universal viewport/hardware/AT certification.

| Before | After | Why |
| --- | --- | --- |
| Abrupt fit cutoffs and narrow60px placement missed actual responsive composites | Same shared CSS fit32/taper and narrow64px correction; approved four openings unchanged | Actual failed asset/viewport combinations now meet retained4.5:1 without toning/font/crop compensation or parallel state |

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Exact build/source/assets | Canonical source vs final full-source snapshot/closure and current intake | Passed build/source hashes; CSS-only revision/236 preserved files. Four image HTTP200/MIME/byte hashes match approved pack, no source-photo/proxy publication | `integrity.json`; refreshed final closure |
| Current contrast/real codecs |29 independent native Chrome PNG pairs, actual uncached/warm AVIF and WebP,DPR1/2 | Passed all samples≥4.542, three old defects resolved; selected actual URLs/geometry recorded | `contrast.json`, `contrast.py`, `contrast-geometry.json`, `pair-quality.json`,29 PNG pairs |
| Geometry/color/continuation/reverse |63 IAB states across nine approved/former-defect/taper/height-boundary views | Passed four exact starts y382/366/350/264, y12 yellow compact name, restored white start, yellow following body, one header/name,4px gap, stable height/no overflow/fixed grid anchors | `geometry.json`, `assertions.json` |
| Contact/grid/status/focus |320×480 keyboard Contact at y100;600×844 focused desktop Email | Passed Close autofocus/four-Tab/Escape actual Contact/y100/name106/body unlock; active272px lane/overlay match; In Progress Enter/Escape/no navigation; focused inline nav remains hero-position/opacity1 through scroll | `interactions.json` |
| Native input/reverse |Actual Chrome touch at320×480 | Passed ordinary forward y15→135/photo.923→.304, native reverse returns0/name206/photo1 without scripted return | `native-touch.json` |
| Reduced/oversized/no-JS/failure |320×480 reduced/no-JS;320×320 oversized;600×844 blocked image | Passed static ordinary flow/white full-opacity; one no-JS white H1 at206/4px/five statuses and hidden dead dock. Oversized copy bottom232<dock252 at y120, no overflow. Blocked photo keeps844px hero/raspberry/name386/details1 | `fallbacks.json` |
| SEO/facts boundary |Home/Manifesto/Wrike × four browser/bot agents =12 raw responses | Passed current build and canonical/home-only indexing/robots/home-only sitemap/schema/OG/icon; no Film director SEO job-title or fact rewrite | `head-matrix.json`, raw HTMLs, `assets.json` |
| Errors/hygiene/cleanup |Instrumented native Chrome plus clean final reload exception window; IAB | Passed empty warning/error logs, no Runtime exceptions/nontruncated complete window; hygiene passed. All QA tabs closed, probe/media/source/script/touch/cache/network/viewport/metrics overrides cleared, body unlocked/no dialog;3132 owner server retained | `chrome-console.json`, `clean-exceptions.json`, `iab-console.json`, `cleanup.json` |

Evidence root: ignored `test-results/port20-qa-fit2/`; accepted local view `accepted-mobile.png`. Primary browser IAB for behavior, dedicated Chrome for exact PNG/native-input/failure controls because prior IAB lossless capture was geometrically unreliable. No original user tabs/native apps/global color controls or Figma were touched. Prior independent Reveal/first-career/native Back/grid/provenance proof in `port20-qa/` is reused through unchanged owners; no reset of completed work. Owner full snapshot build/tsc/31 tests are supporting checks, not a new QA rebuild. Lint remains skipped; root ignored-packet tsconfig limitation retained.

**BACKEND transfer:** use authoritative `test-results/port20-fit2/final/hero-source-closure.json`, `hero-intake-delta.patch`, `home-hero-css.css`, compatible `backend-home-only-header.txt` and four exact assets. Reverify actual current portfolio production/rollback first; extend accepted PORT-16 isolated202-file packet, not canonical globals/whole dirty checkout or this owner snapshot. Preserve null-off-home Header,154 exact old home CSS gate retargets to html:has(main.home-photo-page), baseline case/Manifesto CSS/Geist/viewport/renderers, homeProjects aliases/SEO and project-index/API404; append only approved homeIdentity. Record exact new manifest/diff/build/deployment, stage production-configured without domains and return SAME candidate to QA before promotion. Hosted/live must verify actual final source bytes/rendered contrast/behavior/assets/headers/SEO and same-deployment domain/rollback readback; local pass does not waive those gates.

Limitations: physical-phone Safari/real safe-area/hardware touch/AT/performance/external delivery and unsupported-image engines are not certified. No universal contrast/codec/viewport or search-ranking claim follows from29 samples, especially minimum4.542. Hosted/SAME-build/live/rollback execution remain next-owner gates. No Git publication, secret/config/DNS/service/Figma/favicon or unrelated-route/API/media expansion. No remaining reproduced local defect in the admitted recheck; same-scope future defects return to FRONTEND.

#### FRONTEND Responsive Fit Correction — 2026-10-29

PORT-20 / FRONTEND corrects the same-scope QA return below. Final build `n2BiSK8Pby-eWrwjSaLOp` is served at `http://127.0.0.1:3132/`; snapshot path and authoritative evidence are in `test-results/port20-fit2/final/`. **Implementation DoD: Passed for the owner checks below; independent local/global/hosted/release acceptance is pending.** Previous3130/VI9 and the parent fit2/LYdN3GhihyXLj4sOR890h candidate remain historical comparison evidence. No deployment, Figma write, BACKEND packet mutation or Git publication.

Demonstrated cause: mobile/short CSS stopped supplying the copy shift at600px width/height, and the prior narrow DPR2 proof sampled cached2560AVIF instead of the actual uncached1600AVIF. Canonical owner is existing hero-copy-shift CSS; Header measurement/progress, ordinary photo flow and all JS remain unchanged. Reuse direction1 retains HomePhotoHero/Header/RepeatReveal/PortfolioGrid/ContactSheet and existing type/lane/control tokens. The correction changes only globals.css;236 other current intake files and220 original protected files remain identical. Full hero closure is still six changed sources, one new source and four byte-identical approved photograph assets.

Compact fit now uses the existing header width range≤1039px or short height≤767px at32px. At width≥1040px/height≥768px the same parameter tapers continuously from32px to0 across1040–1440px (`clamp(0px,(1440px - 100vw)*.08,32px)`); full desktop stays centered. A broader range check caught two further0px failures at1160/1200px, which justified this taper instead of another cutoff. Width<375px uses64px, the next4px step after60, and now passes the actual1600AVIF/DPR2 case. Old599/600 cutoffs and60px assignment were replaced. Four approved positions stay exactly y382/366/350/264, with4px name-role gap and y12 compact landing. Source/crop/40%/opaque white/type/copy/controls, yellow compact/following page and independent photo fade remain fixed; no new state/timing, extra veil/backplate/shadow/font reduction or image-position hack.

| Corrected actual case | Before primary / secondary | Final primary / secondary | Proof |
| --- | --- | --- | --- |
|600×844,DPR1,uncached1600AVIF|4.353 / passed|6.385 /5.329|w600; repeat600|
|812×600,DPR1,uncached1600AVIF|passed /4.174|6.484 /5.572|h600; repeatHeight600|
|320×480,DPR2,uncached1600AVIF|4.478 / passed|4.811 /4.881|narrow; repeatNarrow2|
|1160×844,DPR1,uncached1600AVIF|4.478 /5.099 in preliminary fit2|6.484 /5.490|range1160|
|1200×844,DPR1,uncached1600AVIF|4.478 /5.490 in preliminary fit2|6.193 /5.409|range1200|

All48 final native Chrome PNG-pair combinations pass≥4.542:1. Coverage includes approved four views,599/600/601 width/height neighbours,1039/1040/1041 and767/768/769 neighbours,374/375 DPR2, intermediate widths1080–1366,1439/1440/1441 taper endpoint, three explicit defect repeats, actual uncached800/1600/2560AVIF, warm cached2560 variants, and three confirmed WebP fallback selections. WebP was selected by temporarily excluding the AVIF source through its media attribute after hydration; actual currentSrc ends.webp in all three records and the original source was restored by reload. This is native fallback rendering proof, not a claim of testing a physical browser lacking AVIF support.

Raster method is unchanged: alpha-aware sRGB fitted glyph cores, coverage.85–1.15/residual≤6/255, CSS geometry converted to physical DPR coordinates.43 backdrop pairs have identical channels outside text rows; the other five differ at most1/255. Per-field counts/currentSrc/DPR, repeated captures and pair quality are saved. Minimum4.542 is the unchanged390×844/DPR2 case and remains a narrow margin requiring independent fresh QA. These are finite raster estimates, not hardware/AT or universal viewport certification. Preliminary parent captures are excluded from final acceptance.

| Check | Scenario / environment | Result | Evidence under test-results/port20-fit2/final/ |
| --- | --- | --- | --- |
| Build/type/tests/hygiene | Clean full-source Next15.5.18 snapshot, full tsc,31 tests/5 files, canonical hygiene |Passed|build.log; typecheck.log; tests.log; hygiene.log|
| Required contrast / real assets |48 native PNG pairs, cached/uncached/DPR1/2/AVIF/WebP and repeated defects |Passed owner sampled gate≥4.542|contrast.json; contrast-geometry.json; pair-quality.json|
| Approved geometry / handoff / reverse |96 states across12 viewports |Passed exact four openings, one name, y12/yellow compact, restored white start, constant height/no overflow/control anchors|geometry.json; validation-summary.json|
| Contact / touch / focused nav |Narrow keyboard Contact/four-Tab/Escape; native touch144→0;600px focused contacts through scroll |Passed y100/name106/focus/body unlock; desktop nav stays visible/in place|interactions.json|
| Static / no-JS / image failure |Reduced/oversized flow;320×480/DPR2 no-JS; blocked photo600×844 |Passed one no-JS white H1/y206/4px/five labels; reserved844px photo/raspberry/y386, no overflow|interactions.json; no-js.png; image-failure.png|
| Source / SEO / facts |CSS-only correction and refreshed full closure;12 raw route/bot heads,7 assets |Passed preserved source/data/job-title/SEO/baseline boundary|hero-source-closure.json; fit2-delta.patch; head-matrix.json; assets.json|
| Errors / cleanup |Instrumented log plus fresh unmodified final reload; all scoped probes/overrides restored, owned Chrome closed |Empty warning/error logs and nontruncated clean event window|instrumented-console.json; clean-events.json; interactions.json|

Visuals: `/Users/ivan/Documents/Codex/2026-10-29/portfolio-frontend/outputs/port20-fit2/final/`. `validate-recorded-evidence.py` validates saved evidence; it is not a substitute browser test. Reuse valid previous independent Reveal/first-career/history/grid/source/provenance checks; no unchanged work was reset. Physical-phone/Safari/real safe-area/AT/performance/external delivery, hosted/SAME-build/live/rollback remain unrun. Existing skipped lint/root nested-packet build limits remain disclosed; only the clean full-source snapshot build is claimed.

Same Task returns directly to QA on this exact build, then the already-admitted isolated BACKEND chain after required acceptance. Refreshed `hero-source-closure.json`, `hero-intake-delta.patch`, `home-hero-css.css` and compatible `backend-home-only-header.txt` replace previous helper hashes; retain actual current/rollback revalidation,154 exact home CSS gate retargets, null-off-home Header, accepted case/Manifesto/font/viewport/renderers, project-index/API404, homeProjects aliases and metadata. No whole canonical globals/dirty checkout copy or unrelated publication. Same-scope defects return to FRONTEND without another PRODUCT design loop or Ivan prompt relay.

#### QA White40 Responsive Fit Recheck — 2026-10-29

PORT-20 / independent local QA **FAILED required responsive contrast** on exact final build **`VI9acYzouPAoA2xlkzAYC`**, `http://127.0.0.1:3130/`. The four approved specimens pass fresh resting contrast and their exact geometry/handoff checks, but three additional actual asset/viewport combinations fail. **Same-scope return to FRONTEND**, within Current Approval's already-admitted responsive-fit seam; no repeated design approval or Ivan relay. No BACKEND stage/promotion, production change, source fix, new veil/crop/font/backplate or acceptance waiver.

| Reproduced case | Actual source | Failing field/minimum estimate | Required4.5:1 |
| --- | --- | --- | --- |
|600×844, DPR1, uncached|1600AVIF|Name4.353,173 fitted cores,1.2% below threshold|Failed twice|
|812×600, DPR1, uncached|1600AVIF|Role line4.174,392 cores,.3% below threshold|Failed twice|
|320×480, DPR2, uncached|1600AVIF|Name4.478,983 cores,.1% below threshold|Failed twice; narrow raster margin|

Reproduction: open the exact3130 build in a dedicated Chrome tab; set the named viewport/DPR, disable cache for that tab and reload; await the actual image decode and settled scroll0; verify white100%, photo/details opacity1 and brightness(.6). Capture native lossless normal/backdrop PNG pair with a visibility-only text probe, restore the probe immediately, and run `contrast.py`. `contrast-geometry.json` records actual currentSrc and CSS-space bounds; measurement uses physical raster coordinates at DPR2. Original and independently repeated captures yield identical minima. The two CSS-boundary pairs are byte-identical outside text rows. The first narrow DPR2 pair differs by≤1/255 in192 non-text channels; its repeat reproduces4.478. The two stronger failures independently keep the gate failed even without treating the narrow one as a sufficient standalone margin.

Demonstrated cause/owner: the CSS fit conditions stop at width599/mobile and height599/short-wide, so600×844 and812×600 use shift0px and place particular white glyphs over brighter photograph pixels. The admitted narrow320×480 state uses60px shift but uncached DPR2 actually selects1600AVIF, whereas owner's27-sample narrow-short DPR2 record used2560AVIF. The latter passed4.542; it does not prove the different responsive derivative also passes. FRONTEND owns correction through existing shared hero-copy-shift/Header measured travel, preserving all four approved specimens and40%/white100/type/copy/4px/crop/control/source invariants. QA did not choose a new offset or redesign.

Fresh independent passed comparison views:1440×900/1600AVIF5.656 primary5.829 secondary;390×8444.881/5.174;375×8124.952/5.251;390×6404.881/5.329.390×844/DPR2/2560AVIF independently reproduces4.542/5.025.599×844 passes6.897/5.572 while600×844 fails;812×599 passes6.484/5.572 while812×600 fails.374×667/DPR2 and375×667/DPR2 pass5.572/4.952 and4.742/4.811 respectively. These are actual sampled raster estimates, not hardware/AT/universal-viewport certification.

| Before | After / required disposition | Why |
| --- | --- | --- |
| Current fixed copy-shift cutoffs and responsive-asset sample coverage | FRONTEND applies the smallest measured correction through the already approved shared fit seam, then supplies a refreshed exact build/closure | The same required4.5:1 gate fails at two CSS boundaries and a real uncached derivative choice; approval of four specimens remains intact |

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Build/source preflight | Canonical source and final owner snapshot | Passed exact build/closure hashes; only globals.css changed vs White40 intake,236 other files unchanged; four approved asset bytes/HTTP/MIME match | `integrity.json` |
| Fresh responsive contrast |19 native PNG pairs:15 distinct actual viewport/DPR/asset combinations, three explicit repeat pairs and one duplicate AVIF probe | **Failed three combinations**, repeated. Primary/secondary measured at resting scroll0 with opaque white/40% and actual fonts/images; no owner minima inherited | `contrast.json`, `contrast.py`, `contrast-geometry.json`, PNG pairs, `pair-quality.json` |
| Geometry/color/handoff/reverse |35 IAB samples across four approved and three failure views | Passed exact opening y382/366/350/264 for approved specimens; all land y12 and restore white start, compact name existing yellow, following-page yellow. One header/name,4px gap, no horizontal overflow/constant height and fixed control geometry retained | `geometry.json` |
| Asset/SEO/facts boundary | Four current image endpoints;12 raw heads home/Manifesto/Wrike × four agents | Passed exact image hashes/MIME; home-only indexing/canonical/schema/robots/sitemap/social/icon unchanged, no Film director SEO job-title expansion | `integrity.json`, `head-matrix.json`, raw HTMLs and `assets.json` |
| Runtime errors | Instrumented Chrome vs separate fresh clean Chrome control; IAB | IAB log empty. Instrumented tab contains one React418 during the DOM-source-removal probe window; clean reload exception window and a separate unmodified tab/reload have no errors/exceptions, nontruncated. Not claimed as a reproduced product defect or hidden as a clean full instrumented log | `chrome-console.json`, `exceptions.json`, `fresh-clean-console.json`, `fresh-clean-exceptions.json`, `iab-console.json` |
| Hygiene/cleanup | Canonical workspace and owned browser tabs | Passed hygiene. Cache/probe/source selection/metrics restored by reload, viewport reset, all QA tabs closed, body unlocked/no dialog; no test users/data or source fixes,3130 owner server retained | `cleanup.json`; hygiene output |

Evidence root: ignored `test-results/port20-qa-white40/`. The sample named `webp` actually retained AVIF after an attempted DOM fallback probe; it is explicitly NOT WebP contrast proof and is counted only as an AVIF duplicate. No claim of a fresh independent WebP pass follows. Parent/probe FRONTEND artifacts are not used as the final source; `test-results/port20-white40/final/` and its current closure remain the tested owner inputs.

Remaining coverage: fresh White40 Contact/focus/reduced/oversized/no-JS/photo-failure acceptance is not fully rerun because this candidate already fails required contrast; complete changed-surface regression after correction. Valid prior independent `port20-qa/` Reveal/first-career/native-touch/focused-contact/history/provenance/route proof remains preserved and supported by236 unchanged sources. Owner final build/tsc/31 tests are supporting evidence, not a new QA rebuild. Root nested-archive build limitation and skipped lint remain. Hosted/SAME-build/live/rollback not exercised due failed local gate. Physical-phone/Safari/real safe-area/AT/performance/external delivery and universal viewport/codec claims remain excluded.

**Next FRONTEND:** correct these exact responsive combinations inside the existing admitted fit boundary without changing the four approved views; remeasure actual cached/uncached AVIF choices/DPR1/2 and true WebP fallback, affected neighbouring ranges and forward/reverse/static/failure/control geometry. Supply new exact build/refreshed final closure and hand the SAME Task directly back to QA. Do not send this to PRODUCT for another visual approval, silently compensate toning/type/crop, or advance BACKEND release across the unresolved required contrast gate.

#### FRONTEND White40 Scoped Result — 2026-10-29

PORT-20 / FRONTEND implements the approved white100/mobile+32px alternative and admitted responsive fit. **Implementation DoD: Passed for the owner checks below; independent local/global/hosted/release acceptance remains pending.** Final build `VI9acYzouPAoA2xlkzAYC` runs at `http://127.0.0.1:3130/`; clean full-source snapshot path is in `test-results/port20-white40/final/owner-build-path.txt`. No deployment, commit/push, Figma write or BACKEND packet mutation occurred. Earlier yellow-hero contrast failures remain historical evidence, not the current implementation result.

Root cause:64%-alpha secondary foreground over variable water failed contrast. Reuse direction1 extends existing hero CSS, HomePhotoHero flow and Header's measured name travel/`--hero-surface-opacity`, with unchanged Reveal/Grid/ContactSheet/tooltip ownership. Only `src/app/globals.css` changed in this revision;236 other source/content/public intake files are identical. No Header JS, timing, observer, persistence, dependency or parallel state was added. Full PORT-20 closure remains six changed sources, one new source and four unchanged approved assets. Opaque white name/roles/intro return to existing yellow compact name through the current surface progress; following page and controls remain yellow. Reduced/oversized/no-JS flow stays white with the photograph.

Four approved opening name positions remain exact: desktop y382;390×844 y366;375×812 y350;390×640 y264. All reach y12 in the44px header;4px name-role gap and reverse restoration are preserved. PRODUCT admitted bounded responsive geometry for the new edge conditions: existing `--hero-copy-shift` is60px below375px width and32px at width≥600px/height≤599px; ordinary mobile stays32px and other desktop0. Earlier4px/48px/52px probes and lower-offset translated-mask predictions failed some bounded range/DPR2 samples. Final offsets pass actual320/360/374 portrait and667/740/812/844/932/1024 short-wide captures. Source/crop/40%/white100/type/copy/control invariants stay fixed. No image-position workaround, extra veil/panel/shadow or font reduction was introduced; oversized copy still grows in ordinary flow.

Actual final resting contrast minima (name / roles-intro):

| Scenario | Primary | Secondary |4.5:1 |
| --- | --- | --- | --- |
|1440×900,2560AVIF,DPR1|5.251|5.742|Passed|
|390×844,uncached1600AVIF,DPR1|4.881|5.174|Passed|
|375×812,uncached1600AVIF,DPR1|4.952|5.251|Passed|
|390×640,uncached1600AVIF,DPR1|4.881|5.329|Passed|
|320×568,uncached800AVIF,DPR1|5.174|5.572|Passed|
|812×375,2560AVIF,DPR1|6.385|5.174|Passed|
|390×844,2560AVIF,DPR2|4.542|5.025|Passed; narrow margin|
|320×480,2560AVIF,DPR2|4.542|4.742|Passed; narrow margin|
|390×640,2560WebP,DPR1|4.881|5.099|Passed|

All27 combinations pass, minimum4.542:1. Native Chrome lossless PNG pairs use restored visibility-only probes and alpha-aware sRGB glyph cores (coverage.85–1.15, residual≤6/255; physical raster coordinates at DPR2).24 pairs have identical channels outside text rows; three differ by at most1/255 in3–309 channels. Exact currentSrc/DPR/field/core counts and pair quality are saved. These are sampled raster estimates; the narrow DPR2 margin requires independent QA and does not certify hardware/AT or every unsampled viewport. Parent/probe evidence and build0CvGD8xCfw8eJHSmifY78 are preliminary; `final/` is authoritative.

| Check | Scenario / environment | Result | Evidence under test-results/port20-white40/final/ |
| --- | --- | --- | --- |
| Build/type/tests/hygiene | Clean full-source Next15.5.18 snapshot; full tsc;31 tests/5 files; canonical hygiene |Passed|build.log; typecheck.log; tests.log; hygiene.log|
| Geometry/color/reverse |80 states across10 sizes, including fit boundaries |Passed; one name, y12 landing, exact restored white start, yellow body, constant height/no overflow|scroll-matrix.json; validation-summary.json|
| Responsive contrast/codecs |27 cached/uncached/DPR1/DPR2/AVIF800/1600/2560/WebP combinations |Owner raster gate passed≥4.542|contrast.json; contrast-geometry.json; contrast-pair-quality.json|
| Contact/native touch |Enter, four-Tab cycle, Escape; native forward181→reverse0 |Passed; trigger/y160/name206/body unlock restored|interaction-fallback.json|
| Reduced/oversized/no-JS/photo failure |Static readable flow;320×320 copy bottom234<dock252 at y120; no-JS one white H1/4px/five labels; failed photo reserves844px/raspberry |Passed|interaction-fallback.json; no-js.png; image-failure.png|
| Source/copy/SEO |CSS-only revision; unchanged original hero closure/assets;12 route/bot responses and7 metadata/CSS assets |Passed; facts/job titles/SEO preserved|hero-source-closure.json; white40-delta.patch; head-matrix.json; assets.json|
| Clean runtime/cleanup |Fresh uninstrumented reload; scoped overrides/probes restored; owned Chrome closed |No recorded warning/error/exception; nontruncated clean exception window|clean-console.json; clean-exceptions.json; interaction-fallback.json|

Native visuals: `/Users/ivan/Documents/Codex/2026-10-29/portfolio-frontend/outputs/port20-white40/final/`. Reuse valid independent `test-results/port20-qa/` proof for unchanged Reveal/first-career reachability, desktop focused contacts/grid, settled native/in-app Back, route/source/provenance contracts. An arbitrary late body sample can correctly hide a career unit leaving the header band; the new matrix proves changed geometry/color/reverse, not replacement Reveal acceptance. Physical-phone/Safari/real safe-area/AT/performance/external delivery remain unexercised. Existing build config skips lint; root broad-tsconfig nested-packet limitation remains, so root build/lint success is not claimed. Hosted/SAME-build/live/rollback checks remain next-owner gates.

BACKEND after independent local acceptance uses refreshed `final/hero-source-closure.json`, `hero-intake-delta.patch`, `home-hero-css.css` and unchanged compatible `backend-home-only-header.txt`. Old yellow CSS/hashes are historical. Reverify accepted PORT-16 current/rollback identity; preserve the154 home CSS gate adaptations, null-off-home Header, baseline case/Manifesto/font/viewport/renderers, project-index/API404, homeProjects aliases and metadata. Never copy canonical globals or dirty checkout wholesale. Same Task goes directly to QA on this exact build, then conditional isolated stage→hosted QA→same-build promotion→live QA→PRODUCT, with no new design approval or Ivan prompt relay.

#### Current Decision — Fixed40 Text Readability Proposal (2026-10-29)

After PRODUCT explained the confirmed runtime contrast failure and recommended keeping40% while letting DESIGNER improve only text readability without backplates or changing the rest of the page, Ivan replied yes and reaffirmed40%. Forty percent is fixed, not a waiver of the4.5:1 requirement or permission to publish the known failing version. Same Task returns to DESIGNER for one bounded MCP-only proposal, then PRODUCT/Ivan visual approval before changed text styling goes to FRONTEND. No repeated approval of the already accepted40%/4px/Film director itself.

Root cause is demonstrated by independent Chrome composites below: current foreground/64%-alpha secondary text over the40%-toned variable photograph fails at rest. Reuse the existing owned hero text fields, portfolio foreground tokens/type styles and shared grid; assess text color/opacity/weight treatment before inventing new primitives. Preserve source/crop/40% veil, name-role4px gap, all authored copy including Film director, shared type scale, group centering, controls and motion. No darkening increase, local panel/gradient, shadow, source retouch, new typeface, duplicate page or runtime mutation. Test actual proposed text against desktop/mobile/short backgrounds and report honest measurements. If text-only treatment cannot meet the retained target in that fixed composition, present one smallest necessary alternative for Ivan's decision rather than silently expanding layout or claiming a pass.

Deliver one current proposal and focused current exports/contrast/protected-owner readback under this heading. Record exact changed IDs/bounded rollback, update/read back PORT-20 and release to PRODUCT/Ivan. Existing local implementation/functional proof remains preserved; only changed presentation will need scoped reimplementation/reverification after approval. FRONTEND/QA are not asked to redo unchanged work now. BACKEND stage/promotion remains held pending the approved fix and required acceptance; completed PORT-16 live site remains unchanged.

Fixed40 decision result — DESIGNER, 2026-10-29. The demonstrated cause is the 64%-alpha secondary paint over variable water luminance; no type-size or alignment change is needed to explain the failure. Reused existing `color/text-primary` VariableID:2459:8 at 100% on the study's 27 Discipline/Focus/Working approach fields. Name, weights, SF Pro14/20, copy, 4px gap, centering, photo/crop/40%, controls and every native track remain unchanged. This is the current centered diagnostic trial, not approved changed styling for the website. No palette/token/master or runtime change.

Fresh MCP lossless PNG pairs show that opaque yellow passes the sampled desktop text but still fails mobile. A read-only upper-bound calculation on the independent QA backdrop/glyph masks also rules out a single uniform foreground color for the current short-state name: white reaches only4.174:1, black3.140:1; intermediate luminance cannot exceed the better endpoint across that measured range. Across all short-state copy, opaque white reaches only4.116:1. White also leaves the375px current composition below4.5:1. The existing dark raspberry/black treatments fail on the dark water. Weight does not change the nominal foreground/background contrast at the retained14px size; no heavier type or font reflow was applied to hide the failure. These calculations reuse existing QA pixels and are not new browser acceptance.

**One minimal alternative for Ivan's decision:** existing white primitive VariableID:344:126 at 100% for the over-photo name/roles/introduction; desktop stays centered, mobile375/390/short shifts the complete group down32px onto darker water. No photo, toning, width, type, weight, copy, gap, control or following-section change. Proposed name y: desktop382,390×844366,375×812350,390×640264. Compact-header and following-page yellow remain the existing design; if this alternative is selected, the changed text-color handoff and additional32px mobile name travel need scoped design/implementation/readback using the existing progress owner. No new animation timing, controls or full functional-QA restart is admitted by this proposal alone.

This alternative was temporarily rendered through MCP in the same four owned start specimens, exported, and immediately restored. Exact four-root fingerprints match the centered yellow100 trial after restoration. **Its geometry is not applied to the main study or website.** [Desktop preview](/Users/ivan/Documents/Codex/2026-10-29/portfolio-designer/outputs/port20-fixed40-text/minimal-alternative/desktop.png), [390px preview](/Users/ivan/Documents/Codex/2026-10-29/portfolio-designer/outputs/port20-fixed40-text/minimal-alternative/mobile.png), [375px preview](/Users/ivan/Documents/Codex/2026-10-29/portfolio-designer/outputs/port20-fixed40-text/minimal-alternative/375.png), [short preview](/Users/ivan/Documents/Codex/2026-10-29/portfolio-designer/outputs/port20-fixed40-text/minimal-alternative/short.png). This is one responsive alternative, not permission to choose another unmeasured layout.

| Viewport | Centered yellow100 name / roles-intro | Alternative white100 name / roles-intro | Current evidence |
| --- | --- | --- | --- |
|1440×900|4.850 /4.999|5.918 /6.100| Desktop position retained |
|390×844|3.831 /3.831|5.174 /5.329| Alternative group+32px |
|375×812|3.776 /3.776|5.099 /5.656| Alternative group+32px |
|390×640|3.568 /3.469|5.174 /5.742| Alternative group+32px |

All numbers are alpha-aware sRGB detected-glyph-core minima from fresh current Figma PNG pairs (coverage0.8–1.15, RGB residual≤3/255). The static alternative clears4.5:1 in these four sampled views, minimum5.099:1. Translating the existing independent QA masks over their own unchanged backdrops predicts minimum4.881:1 for the same alternative; that is analytical supporting evidence, not an exercised revised runtime. Actual responsive-font/codec/scroll/fallback contrast and the changed name/style handoff remain required after approval. No Implementation DoD, local/global QA or release pass follows from these design exports.

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Text-only trial |27 owned fields, existing primary paint at100%; nine specimens | Completed; desktop sampled contrast passes, mobile fails | text-write.json; current PNGs; contrast.json |
| Color/opacity/weight limit | Existing yellow/white/black/raspberry over independent QA masks | Text-only cannot satisfy retained fixed composition | candidates.py; text-only-candidates.json |
| One minimal alternative | Fresh four-view MCP static exports | Sampled glyph contrast passes,≥5.099; visual decision pending | minimal-alternative PNGs; minimal-alt-contrast.json |
| Geometry/source/type/motion/protection | Main-study invariant; temporary-preview restoration;12 protected roots | Passed; original geometry restored, native tracks/JPEG unchanged,346 nodes | text-write.json; minimal-alt-restoration.json; final-readback.json; motion-source-proof.json |
| Documentation/workspace | Focused UTF-8/whitespace/conflict scan; hygiene | Passed | validation.json |
| Revised runtime/release | DESIGNER proposal boundary | Not exercised or handed off; previous functional proof preserved | Same Task/current decision |

Evidence root: `/Users/ivan/Documents/Codex/2026-10-29/portfolio-designer/outputs/port20-fixed40-text/`; exact before-paints/bindings/technical notes, temporary22-property preview receipt/restoration, reproducible measurements and final nine-state readback are in sibling `work/port20-fixed40-text/`. The live Figma study remains centered yellow100 with an explicit decision note. To roll back this trial after checking later edits, restore only the27 recorded before-fills and the two technical-note texts from `text-write.json`; no geometry, native tracks, protected masters, source asset, code or deployment restoration is needed. DESIGNER releases the writer to PRODUCT/Ivan on the same Task for the new white/mobile+32px decision. Forty percent,4px and Film director remain accepted; changed text styling/placement is not yet approved. Publication remains held until approval, scoped reimplementation and required actual acceptance.

#### Current Admission — 40 Percent Hero And Website Delivery (2026-10-29)

Ivan selects40% uniform black presentation toning, requests a smaller name-to-role gap, adds `Film director` as a third public identity role, and explicitly requests updating the website. This supersedes the design-only/no-code/no-publication restrictions above for PORT-20's homepage delta only. Existing source photo, centered composition, separate photo fade, aligned forward/reverse continuation and controls remain approved. Do not reopen the visual direction or require Ivan to relay another prompt.

DESIGNER first updates the same owned desktop/mobile/short specimens through MCP:40% veil; name-to-role gap uses existing spacing/xs4px instead of the previous larger gap; identity role copy is `Product designer | Product builder | Film director`, naturally wrapping on small screens rather than forcing three lines or overflowing. This is Ivan-authored identity copy, not permission to invent film credits, change historical employment roles or expand biography/SEO job titles. Preserve the no-local-backplate rule, all other text/type/colors/grid/control geometry, source/proxy/crop and existing motion semantics. Record exact properties/IDs and current exports, including fresh40% contrast evidence. These exact requested changes are approved for implementation; no additional design-review loop for unchanged scope.

Admitted owner chain on the same Task: DESIGNER → FRONTEND → QA local → BACKEND isolated stage → QA hosted → BACKEND same-build promotion → QA live → PRODUCT final acceptance. Current executor is DESIGNER until scoped writer release and Task readback. Subsequent routine handoffs are direct to the verified portfolio role chats. FRONTEND reuses `src/components/layout/HomePage.tsx`, `src/components/layout/Header.tsx`, existing RepeatReveal/PortfolioGrid/ContactSheet seams, shared tokens and canonical identity copy ownership; choose existing portfolio primitives (design-system gate direction1), not a parallel styling system. Implement normal-scroll photo/header handoff and reverse, preserve the existing shared compact header, browser history, Contact focus/lock/return, fixed controls, reduced-motion and no-JS/photo-failure readable fallbacks. Use the measured web derivative pack/source provenance; ship only justified responsive assets, never the large Figma PNG proxy or Desktop original. Preserve all current temporary-home hiding/In Progress behavior and home-only SEO/indexing.

Owner checks: type/build/tests/hygiene and exact copy/40%/4px/source closure. Independent QA:375/390/short/desktop widths, no overflow, start/mid/compact/continuation/reverse at multiple scroll positions, baseline alignment, repeated/reduced motion, no duplicate header/Contact, keyboard/focus/modal return, image loading/failure/no-JS, asset payload and clean console. Measure/report actual40% primary/secondary contrast; do not inherit20/30/70% measurements or claim4.5:1 if it fails. A demonstrated unresolved acceptance failure returns to the incorrect owner, or PRODUCT if the fixed40%/unchanged-text decision itself conflicts with readability; no silent heavy veil/recolor and no false DoD pass or promotion across an unresolved required gate.

Publication is authorized for this scoped homepage update on existing `portfolio` Vercel project `prj_87eVQkA1ehpM3rTJszSNj6dqaNDo`, team `team_jK6pcC3dgzpQAcgEwx05ozx4`, www.cheremisin.co.uk. BACKEND revalidates actual current deployment/rollback first and extends the accepted isolated PORT-16 source packet with only approved hero/identity/assets dependencies. Never deploy the whole dirty checkout or admit new Citymobil/project/Manifesto/chat/API code. Preserve metadata/canonical/robots/sitemap/home-only indexing and existing live route baseline. Hosted QA must precede promotion of the same tested build; live HTTP/build/alias/SEO and browser checks follow. On a material release regression, use the verified previous live deployment as rollback under this bounded release authority. No Git commit/push, DNS/environment/schema/paid-service change or favicon work. Exact release/rollback evidence and limitations belong in this Task/artifact; PORT-16 remains completed history.

#### Approved40 Result And FRONTEND Handoff (2026-10-29)

PORT-20 / DESIGNER completed the exact approved Figma delta in the same SECTION2811:558 through MCP only. The repeated name/role geometry is owned by the study's existing identity and normal-flow auto-layout containers; no route-local styling system or new shared primitive was needed. Uniform veil nodes2842:739–747 now read0.400000006, have no own tracks and remain children of the independently fading photographs. All nine role fields read `Product designer | Product builder | Film director` at SF Pro14/20. The4px name-role gap is `details.paddingTop`, bound to existing `layout/space/xs` VariableID:2466:69. Natural role width322px fits the375/390 specimens on one line; a272px text-box probe wraps to two20px lines without font shrink or forced three-line formatting.

The complete identity/introduction group stays centered: desktop height136px, name y382 and compact threshold370px;390×844 height176px, name y334 and threshold322px;375×812 name y318/threshold306px;640px-short name y232/threshold220px. The compact name still lands at y12. Updated translation distances follow these2px-centered adjustments; native keyframe times/easing, photo opacity, hidden-only desktop contact relocation and Work Experience8px/240ms reveal stay unchanged. Roles/introduction remain ordinary flow; grid/Contact placement and visibility are unchanged. No local backplate, source retouch, text recolor, employment/SEO fact change or additional Figma node was introduced. Study count remains346;12 protected homepage/career roots match immediate before/after and final fingerprints.

Control-position clarification for FRONTEND: Ivan's final “leave it as-is” preserves the approved study geometry throughout the PORT-20 homepage states. Grid is fixed at x24, y=viewport height−68,44×44 on desktop and mobile. Mobile Contact stays fixed24px from the right on the same baseline,102×44: x264 at390px and x249 at375px. Both stay available without a new scroll-dependent appearance rule. Preserve the existing desktop inline-contact handoff described above. Reuse PortfolioGrid/ContactSheet behavior and focus/state ownership through the existing home-layout seam; the PORT-20 homepage matches these approved separate left/right anchors. This clarification does not change unrelated route dock geometry or require a new Figma revision.

Fresh40% raster contrast, measured against isolated current backdrops with alpha-aware sRGB glyph-core detection:

| Viewport | Primary minimum | Secondary minimum |4.5:1 result |
| --- | --- | --- | --- |
| Desktop1440×900 |4.850:1|3.071:1| Primary passes; secondary fails |
| Mobile390×844 |3.831:1|2.524:1| Both fail |
| Short390×640 |3.568:1|2.348:1| Both fail |

These are current design-raster measurements, not runtime certification. **Required readability acceptance remains open.** Exact40%/4px/copy implementation is approved and handed directly to FRONTEND; this evidence is not an accessibility waiver. PRODUCT owns the conflict between fixed40%/unchanged text and readability. No silent additional toning/recolor, false owner/QA pass or promotion across an unresolved required gate. FRONTEND/QA must measure actual runtime composites and route this decision conflict to PRODUCT.

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Exact approved properties / wrapping | Nine MCP specimens;375/390 and272px probe | Passed;40%, bound4px, exact third role | approved-write.json; final-readback.json |
| Centering / controls / forward-reverse | Fresh native desktop/mobile exports and six phases each | Inspected; no visible overlap, original composition restored | desktop/mobile-scroll.mp4; sequence PNGs |
| Focused collision model |8501 samples per8.5s clip, visible name/intro/continuation versus fixed controls |0 intersections; mobile continuation/dock minimum26.548px | motion-geometry.json; geometry-check.json |
| Current40% contrast | Current desktop/mobile/short PNGs versus isolated backdrop | Required failure remains open as above | measure-contrast.py; contrast.json |
| Protected owners / image |12 fingerprints; nine image hashes/control readbacks | Passed; proxy3790958a… unchanged | final-readback.json |
| Documentation / workspace hygiene | UTF-8, whitespace/conflict scan and npm run hygiene:check | Passed | validation.json |
| Runtime / release | DESIGNER boundary | Not exercised; admitted next-owner chain applies | Same Task / current admission above |

Current evidence: `/Users/ivan/Documents/Codex/2026-10-29/portfolio-designer/outputs/port20-approved40/`; reproducible measurements, exact67 mutated IDs/before-state, final note update, protection and geometry are in sibling `work/port20-approved40/`. [Desktop](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2811-559) and [mobile](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2811-746) now show the approved40% delta. Native timelines are8.5s;10fps MP4s include endpoint padding to8.6s. Timed exports and mathematical geometry are not actual swipe, keyboard, scroll or hardware proof.

FRONTEND reuses existing HomePage/Header/RepeatReveal/PortfolioGrid/ContactSheet, identity copy ownership and shared tokens. Web assets remain the measured AVIF/WebP pack at `/Users/ivan/Documents/Codex/2026-10-28/portfolio-designer/outputs/port20-photo-hero/manifest.json`; never ship the Figma PNG proxy or Desktop JPEG. Preserve accepted photo/crop, ordinary Work Experience/following sections, fixed controls, reverse/fallback/history/focus behavior and temporary-home/SEO boundary. Same Task remains In progress / Implementation; writer released to FRONTEND after readback, with PRODUCT notified of the required contrast conflict. No Designer application-code or release change.

Bounded rollback after checking subsequent edits restores only the recorded owned opacity/name/role geometry and copy, details padding/binding, strip/name translation values, frame label and technical-note text. Original keyframe IDs/times/easing were preserved; full prior tracks are in `work/port20-alignment/motion-geometry.json`. Restore no protected homepage/master, source photograph or unrelated workspace change. The following20/30/zero/70% checkpoints are historical trials, not the current selected design or delivery authority.

#### FRONTEND Hero Implementation Preflight — 2026-10-29

PORT-20 local implementation admitted after current Task readback and DESIGNER release. Are we fixing the root cause, or only a visible symptom? HomePage lacks the photographic stage; Header owns a short64px text-compaction model rather than the approved name-to-header geometry. Reuse direction1: extend HomePage/Header plus existing portfolio lane/tokens, RepeatReveal, PortfolioGrid and ContactSheet, with one home-only photo composition. No new design system, scroll takeover, second visible name/contact group, photo retouch or SEO/job-title expansion.

Observable result: current approved40% uniform veil,4px name-role gap, exact third role and centered introductory group; natural scroll to the44px header with reversible independent photo fade and hidden-only desktop-contact relocation. Preserve canonical career/project/contact copy, temporary pending navigation, existing live/case/SEO baseline and unrelated dirty source. Required owner proof covers exact assets/hashes/payload/crop, viewport/handoff/reverse/interruption/focus/Contact/grid/fallback/native-history geometry, actual resting contrast, type/build/tests/hygiene. Independent QA then the isolated release chain remains required. Any actual40% contrast failure is a PRODUCT decision gate, not permission to compensate or claim Passed. No deployment or baseline-packet mutation by FRONTEND.

#### QA Independent Local Hero Verification — 2026-10-29

PORT-20 / independent local verification **FAILED the required contrast gate** on exact build **`In1HrUqXaYuNiul6REKsW`**, `http://127.0.0.1:3120/`, served from the released clean owner snapshot. **Functional checks exercised below Passed; Implementation DoD and local/global/release acceptance are NOT Passed.** One next executor PRODUCT for the fixed40%/unchanged-text readability decision. No BACKEND stage/promotion handoff, waiver, extra veil/recolor/backplate, code fix or deployment.

Root-cause framing: are we fixing the root cause, or only a visible symptom? The visible failure is insufficient contrast over the current photograph at rest. Fresh native raster pairs demonstrate the fixed40% image toning plus unchanged14px yellow/64%-alpha secondary text cannot meet the required4.5:1 gate in these current views. The implementation matches the admitted40%/4px/copy; this is the explicit fixed-design/readability conflict owned by PRODUCT, not permission for QA or FRONTEND to silently compensate. Runtime seams remain HomePhotoHero/HomePage for flow/photo/copy, Header for one measured name/contact handoff, existing PortfolioGrid/ContactSheet/RepeatReveal/status and canonical homeIdentity.

**Fresh independent contrast estimates (not copied from owner values):**

| Actual Chrome viewport | Primary minimum | Secondary minimum | Required4.5:1 |
| --- | --- | --- | --- |
|1440×900|4.304|2.937|Failed|
|390×844|3.831|2.446|Failed|
|375×812|3.670|2.372|Failed|
|390×640|3.421|2.301|Failed|

Four freshly captured DPR1 native Chrome lossless PNG pairs at actual scroll0/photo opacity1/details opacity1/brightness(.6); temporary visibility-only backdrop probe restored after every pair. Alpha-aware sRGB expected paint and fitted glyph cores coverage.85–1.15/residual≤6/255; primary178 cores/view, secondary396–881 cores/field. Zero changed channels outside text rows for every pair confirms stable backdrops. Desktop actually selected2560AVIF; mobile views selected1600AVIF. Desktop estimates differ from owner's sampled desktop responsive selection and are recorded with actual currentSrc rather than presented as identical. All four views materially fail secondary; all sampled primary minima also fall below4.5. These are raster estimates, not physical-display/AT certification or a general WCAG audit.

| Before | After / disposition | Why |
| --- | --- | --- |
| Fixed40% photograph with unchanged primary/secondary text; required contrast gate open | Exact selected design preserved, fresh failure returned to PRODUCT; no compensating UI change | Matching requested appearance does not satisfy the explicitly retained4.5:1 gate |

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Browser/build preflight | IAB primary; independent snapshot/source/HTTP | Passed exact build/closure on3120. IAB normal capture is JPEG; its attempted lossless PNG is scaled/cropped against DOM geometry and rejected for contrast. Dedicated Chrome only supplies valid PNG/native touch/failure-input fallback; no original user tab/native-app/global color controls | `integrity.json`, `iab-start.png`, rejected `iab-lossless-probe.png`; `contrast-geometry.json` |
| Scroll/continuation/reverse |48 samples, six views1440×900/390×844/375×812/390×640/320×568/812×375;10 further reverse steps | Passed one header/name,4px padding gap/exact identity, zero overflow, constant document height per viewport; name reaches y12 and exact opening restoration. Photo/details fade independently; desktop nav relocates inside opacity0 band | `scroll-matrix.json`, `reverse-lead.json`, `assertions.json` |
| Career/control geometry | Six direct fast-jump entry probes | Passed first fitting career lead visible/opacity1 and clear of dock; oversized flow remains reachable. Grid x24/y=H−68/44×44, mobile Contact right24/102×44 same baseline at every sampled position | `reverse-lead.json`, `assertions.json` |
| Actual input/repeated motion | Dedicated Chrome native touch forward/reverse plus30-frame inertia trace | Passed ordinary scrolling, forward y25→185/photo.922→.425, native reverse returns actual0/photo1/name334; no forced snap or script return used for this result. No frame-rate/performance certification claimed | `native-touch-steps.json`, `native-touch.json` |
| Focus/Contact/grid/status | Desktop focused Email held in lower-right while scrolling;390×844 Contact at y160 | Passed focus keeps current contact group visible/in place; Close autofocus/four-Tab cycle/Escape restores actual Contact/name174/y160/body unlock. Active grid lane matches overlay; existing In Progress Enter/Escape fits/no routing | `interaction.json` |
| Native history | Fresh settled source, desktop180 and mobile160→Wrike→browser Back | Passed180→180/name202 and160→160/name158. Earlier desktop probe source target was not established (actual1794 rather than180), so its52px observation is excluded from defect/pass claims; clean source-position controls are authoritative | `history-settled.json`; excluded initial `history.json` |
| Reduced/oversized/no-JS/failure | IAB reduced at0/250,320×320; Chrome JS-disabled and blocked photo | Passed static ordinary-flow modes, photo/details opacity1, natural role wrapping40px at272px width; one visible no-JS H1/five static statuses/no overflow. Resting blocked-image naturalWidth0 keeps844px hero/raspberry/details1/name334; restored photo same844px geometry | `fallbacks.json`, `image-resting.json`, `image-failure.png` |
| Required contrast | Four valid current Chrome PNG pairs | **FAILED** primary/secondary resting gate; exact40% retained. No resting-readability or DoD pass follows from fallback/functionality | `contrast.py`, `contrast.json`, `contrast-pair-quality.json`, four PNG pairs |
| Source/provenance/payload | Six changed/one new source/four assets vs snapshot;226 intake records | Passed all scoped hashes,220 protected files unchanged/original JPEG hash preserved. Removing only inserted homeIdentity restores prior site-content bytes; career/contacts/Personal and SEO owners unchanged. Four approved derivatives return200/correct MIME/decode sRGB and match hashes:56,364/225,650/407,068B AVIF and566,942B WebP. No original/proxy published | `integrity.json`; source closure/provenance |
| Focused SEO/copy boundary | Home/Manifesto/Wrike × four ordinary/bot agents=12 raw responses | Passed exact build/metadata, home index/follow/other routes noindex/follow, sitemap home-only/Allow:/, unchanged bounded Product Designer schema/card/icon and asset paths. Film director remains identity only | `head-matrix.json`, raw HTMLs, `assets.json` |
| Console/hygiene/cleanup | Chrome instrumented and fresh uninjected IAB reload | Passed recorded warning/error logs empty; hygiene passed. All QA tabs closed, viewport/metrics/touch/media/script/cache/network blocks/probe removed, body unlocked/no modal. No fixtures/users/test data or source fixes;3120 owner server remains available | `chrome-instrumented-console.json`, `clean-console.json`, `cleanup.json` |

Evidence root: ignored `test-results/port20-qa/`. Valid contrast screenshots `desktop.png`, `mobile.png`, `375.png`, `short.png` and corresponding backdrop pairs. Figma was untouched (MCP-only boundary preserved); previous accepted PORT-16 production and release packet remain unchanged.

Coverage limits: owner31 tests/full snapshot build/types reused, no unrelated QA rebuild/test rerun; root broad-tsconfig nested-packet build limitation and skipped lint retained. In-app Back's prior settled owner proof is supporting history; independent QA exercised native Back, not that same in-app path. No physical-phone Safari/real safe-area/browser chrome/AT speech/external delivery/performance profile/unsupported-backdrop claim. Hosted stage/SAME-build promotion/live SEO/rollback execution were NOT run because the required local contrast gate failed. Reduced/no-JS textual reachability does not certify unchanged photo-text contrast. Original metadata stripping is supported by byte identity with the measured Designer pack; no new private-metadata audit is claimed.

**Next PRODUCT:** reconcile the exact40%/unchanged-text decision with the retained required4.5:1 gate on this same Task. Record a bounded decision before revised implementation/validation or any conditional BACKEND release. Same-scope functional checks exercised here found no reproducible defect requiring a FRONTEND fix. Do not treat prior user design selection as an accessibility waiver or advance publication across this unresolved gate.

#### FRONTEND Hero Local Result — 2026-10-29

PORT-20 / FRONTEND local implementation is ready for independent QA on build `In1HrUqXaYuNiul6REKsW` at `http://127.0.0.1:3120/`. **Required contrast fails; Implementation DoD is not Passed and release cannot advance across that unresolved gate.** The exact approved40%/4px/Film director result is implemented without silent compensation. PRODUCT owns the fixed40%/unchanged-text readability conflict after independent QA confirms the actual runtime result. No deployment, commit/push or accepted release-packet mutation occurred.

Demonstrated cause and owners: HomePage had no photographic stage, while Header's old64px text-compaction progress could not express the approved measured name-to-header distance. HomePage/HomePhotoHero now own static picture/copy flow; Header owns one visible name, measured scroll progress and existing contact/history behavior. Design-system direction1 reuses the portfolio lane, tokens, Header, PortfolioGrid, ContactSheet, RepeatReveal and pending ProjectStatusTooltip. No parallel style system or dependency was added. Proven-obsolete roles/spacer code/styles were removed. A fitting first career unit initially missed entry on fast jumps because whole-box intersection ratios need not cross1 between observations; the optional existing Reveal seam now observes a stable bottom edge, with original partial-entry behavior retained for oversized content. Other tracks and route dock geometry retain their defaults.

Ordinary scroll preserves document height: source-aligned opening name y382 desktop,334 at390×844,318 at375×812 and232 at390×640 reaches y12 in the44px header. The name-role gap is4px. Photo opacity is independent from the ordinary-flow role/introduction fade. Desktop contacts use one group and relocate only while invisible; keyboard focus keeps their current position visible. Reverse restores the opening; reduced-motion or oversized-copy uses static ordinary flow. The home grid remains x24/y=height−68/44×44; mobile Contact stays right24 on that baseline,102×44. No scroll-dependent control appearance was introduced.

`site-content.ts` owns the new `homeIdentity`; its two intro paragraphs moved unchanged from HomePage. Career/contact/Personal values are semantically equal to intake, including Saavi Jun2026–Present and empty qualifier. Film director is identity copy only: employment, project facts, SEO job titles/card/schema remain unchanged. Personal/utility home navigation remains unmounted and all five In Progress presentations retain existing behavior. Six existing sources changed, one HomePhotoHero source and four photograph assets were added;220 other application intake files remain unchanged, and all scoped source/assets match the tested snapshot. Exact hashes and bounded intake delta are in `test-results/port20-hero/hero-source-closure.json` and `hero-intake-delta.patch`; this is not a whole-worktree diff.

Web assets were copied byte-identically from DESIGNER's measured manifest:800AVIF56,364B;1600AVIF225,650B;2560AVIF407,068B;2560WebP566,942B. All four decode, return correct image MIME/HTTP200 and have no private EXIF/IPTC/XMP. The original Desktop JPEG SHA256 `bf4fdcc16dc25ec87da2eda414cca129ddccdb1c51d9675233eb24f57d0f23c9` remains unchanged. The native picture accounts for cover height: tested DPR1 views select1600AVIF, DPR2 mobile selects2560AVIF to retain grain;56KB is not a universal mobile-payload claim. No Figma proxy or Desktop original is shipped. Image-only brightness(.6) implements uniform40% black toning without darkening the missing-photo raspberry fallback. Desktop crop is50%/50%, mobile44%/50%, matching the approved study.

Actual resting contrast from current Chrome lossless PNG pairs:

| Viewport | Primary minimum estimate | Secondary minimum estimate | Required4.5:1 gate |
| --- | --- | --- | --- |
|1440×900|4.636|2.970| Fails secondary |
|390×844|3.831|2.446| Fails both |
|375×812|3.670|2.372| Fails both |
|390×640|3.421|2.301| Fails both |

`contrast.json` / `measure-contrast.py` record alpha-aware sRGB expected paint against temporarily hidden-text backdrops, fitted glyph cores≥.8 coverage and≤6/255 RGB residual. These are raster estimates, not physical-display/assistive-technology certification. The secondary failure is material. Incomplete IAB captures were rejected and explicitly excluded in `contrast-unusable-iab.json`; only the final native Chrome PNG pairs support this result. This task did not reopen the stopped Chrome/color investigation or touch the original user tab/settings/native Codex surface.

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Build / type / tests | Clean full-source owner snapshot; Next15.5.18, full tsc,31 tests/5 files | Passed | build.log; typecheck.log; tests.log |
| Scroll / reveal / controls |54 samples across1440×900,390×844,375×812,390×640,320×568,812×375; fast jump/compact/body/reverse | Passed; one name,4px gap, y12 landing, stable height, no overflow; first career reachable | final-chrome-scroll.json; assert-proof.py |
| Native input / history |60-frame touch trace, Contact touch/keyboard/focus/lock/return, grid/tooltip; four browser Back trials and URL-confirmed in-app Back | Passed; in-app160→160 and four exact native returns | native-touch-contact-grid.json; history-keyboard.json; in-app-back-settled.json; density-focus.json |
| Readable fallbacks | Reduced motion, oversized320×320 copy, no JS, blocked photograph | Passed; static readable flow, single no-JS H1, reserved photo geometry, no overflow | fallbacks.json; no-js.png; image-failure.png |
| Copy / HTTP / SEO / assets |32 raw-head route/user-agent samples,24 existing assets, four image endpoints, semantic copy comparison | Passed; home-only indexing/sitemap, existing schema/card/job titles preserved | http-seo-proof.json; asset-http-decode.json; copy-preservation.json |
| Required resting contrast | Four actual Chrome PNG pairs at40%, current build | **Failed; PRODUCT decision remains required** | contrast.json; chrome-contrast-geometry.json; chrome-*.png |
| Browser errors / cleanup | Owned Chrome tab and final fresh IAB; overrides/probe/modal/lock cleared | No recorded console/page exceptions; Chrome tab closed, IAB preview retained | chrome-console-all.json; iab-final-console.json; iab-final-smoke.json |
| Hygiene / source boundary | Canonical checkout; six-source/one-source/four-asset closure against intake/snapshot | Passed;220 protected intake sources unchanged | hygiene.log; hero-source-closure.json |

Evidence root: `/Users/ivan/Developer/cheremisin-portfolio/test-results/port20-hero/`; native visuals: `/Users/ivan/Documents/Codex/2026-10-29/portfolio-frontend/outputs/port20-hero/`. Owner snapshot path is recorded in `owner-build-path.txt` and remains served on3120 for QA. The canonical root build still includes ignored nested BACKEND packet archives through broad tsconfig reachability; no root-build success is claimed. The clean snapshot builds the full current source, not a production packet. Lint was skipped by existing build configuration; no lint-clean claim. Physical-phone/hardware, independent local QA, hosted/SAME-build/live acceptance and rollback execution remain unexercised by FRONTEND. Native touch reverse ended at2px after the particular gesture; controlled return to actual0 restores exactly. The unsettled initial in-app navigation trial is excluded; the URL-confirmed160→160 result is authoritative.

Conditional BACKEND integration after required gates: reverify actual current production/rollback; accepted PORT-16 base is deployment `dpl_DkVzWoxf61A9deL8QQYKiwn1LUKd`, build `JJVJdLJrsFRMxLgkIrZvA`,202-file manifest SHA256 `1ad015ee184c557864b958b84807630ae8ab065169f195b33b14a0a416a330b0`. Extend that isolated packet, never the dirty checkout. Its Header must remain null off home: `backend-home-only-header.txt` supplies the compatible wrapper. Its154 exact `html:has(main.portfolio-grid-page)` CSS gates must retarget to `html:has(main.home-photo-page)` before appending `home-hero-css.css`; preserve baseline case CSS/fonts/viewport rather than copying canonical globals wholesale. Append only homeIdentity to accepted site-content and retain existing homeProjects aliases in EditorialProjects/SEO. Copy the scoped HomePage/Reveal/Grid delta, new HomePhotoHero and four assets; preserve legacy case/Manifesto bodies and release-packet project-index/API404. Package/lock/config and metadata sources are unchanged. These constraints are recorded in `hero-source-closure.json`; no BACKEND packet was edited.

Same-Task next owner is QA for independent local verification of this exact build, including fresh contrast. A confirmed fixed40% readability failure returns to PRODUCT for a concrete decision before BACKEND staging or promotion. Same-scope functional defects return to FRONTEND. The admitted hosted/SAME-build/live chain remains conditional on all required gates; no automatic acceptance or waiver follows from matching the selected visual.

#### Historical Revision — Light Photograph Toning (2026-10-29)

Ivan reviewed the unshaded trial and now requests slight darkening. DESIGNER resumes the same PORT-20 study through MCP only: try a uniform black presentation veil starting at20%, compare30% if useful, and recommend the lightest convincing result rather than restoring70%. Preserve source/crop, current yellow text/tokens/copy, control geometry, aligned handoff/reverse and the independent scroll-driven photo fade. No local backplate, shadow, recoloring, source edit or new page.

Present fresh desktop/mobile and short-state views with actual chosen opacity and newly measured primary/secondary contrast. A light trial is not automatically a4.5:1 pass: if readability still fails, show the tradeoff and leave that decision open instead of silently increasing to heavy shading. Save focused IDs/rollback/protection and update/read back the same Task before returning to PRODUCT/Ivan. Design only; no frontend, SEO or release.

Historical light-toning result — DESIGNER,2026-10-29: compared uniform20% and30% black presentation layers on the same nine specimens. **Selection at that checkpoint was20%**, the lighter visual interpretation of Ivan's request; this was an aesthetic trial recommendation, not a readability approval.30% improved separation further but still did not meet the text-contrast target, so no heavy-shading compensation was applied. The approved40% result above supersedes this trial.

New owned rectangles2842:739–747 reuse the existing black variable344:127, full-photo geometry and square corners; actual current node opacity reads0.200000003. They sit inside the existing photograph owners, so the independent scroll-driven fade still affects the image and its light toning together. They have no animation tracks of their own. Visitor copy, typography/tokens, image/crop, controls and every existing motion track compare unchanged after creation;12 protected homepage/career roots match. The study now has346 nodes. Two technical notes record the comparison,20% selection and remaining failure. No local text panel, gradient, shadow, recoloring or new component/page was introduced.

Fresh desktop/mobile/short views were rendered at each opacity. [Current20% desktop PNG](/Users/ivan/Documents/Codex/2026-10-29/portfolio-designer/outputs/port20-light-toning/20/desktop.png), [20% mobile PNG](/Users/ivan/Documents/Codex/2026-10-29/portfolio-designer/outputs/port20-light-toning/20/mobile.png), [20% short PNG](/Users/ivan/Documents/Codex/2026-10-29/portfolio-designer/outputs/port20-light-toning/20/short.png) and [desktop comparison,20% left /30% right](/Users/ivan/Documents/Codex/2026-10-29/portfolio-designer/outputs/port20-light-toning/desktop-20-left-30-right.png) support the visible choice. The live [desktop](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2811-559) and [mobile](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2811-746) remain at20%.

Fresh detected-glyph contrast minima, using the same alpha-aware sRGB/current-render versus isolated-backdrop method as the unshaded trial:

| Viewport |20% primary |20% secondary |30% primary |30% secondary |
| --- | --- | --- | --- | --- |
| Desktop1440×900 |2.984:1|2.126:1|3.723:1|2.498:1|
| Mobile390×844 |2.306:1|1.752:1|2.867:1|2.105:1|
| Short mobile390×640 |2.169:1|1.664:1|2.756:1|2.007:1|

**Both opacities still fail4.5:1 for the unchanged14px text.** The20% choice preserves the requested light photographic appearance; readable-text acceptance remains open. The trial was not intensified to force a pass. Per-text bounds, glyph-core counts/medians/proportions and the reproducible PNG measurement script are saved; these are design-raster measurements, not runtime certification.

Fresh current20% [desktop motion](/Users/ivan/Documents/Codex/2026-10-29/portfolio-designer/outputs/port20-light-toning/desktop-scroll.mp4) and [mobile motion](/Users/ivan/Documents/Codex/2026-10-29/portfolio-designer/outputs/port20-light-toning/mobile-scroll.mp4) retain the8.5s native timelines (10fps MP4 containers8.6s). Six phases per clip, including Work Experience and settled reverse return, were inspected. Actual swipe/phone/browser behavior remains unexercised.

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Light20/30 comparison | Desktop/mobile/short MCP exports | Completed;20% selected as lightest visual trial;30% preserved for comparison |20/30 PNG sets and paired sheets |
| Actual selected opacity / independent fade | Nine layer readbacks; photo-track readback | Passed;20% static layers, no layer tracks; photo1→0→1 retained | final-readback.json |
| Copy/style/crop/geometry/protection | Immediate surviving-property and12-root fingerprint checks | Passed unchanged | creation-and-protection.json |
| Fresh primary/secondary contrast | Both opacity sets, current PNG glyph cores | **Failed for both**, reported above | contrast-20.json /contrast-30.json |
| Forward / reverse | Fresh selected20% native exports, six phases each | Inspected; aligned handoff/reveal/control behavior retained | MP4s /sequence PNGs |
| Hygiene / focused document check | Repository | Passed | Local checks |
| Runtime / code / release | Design-only boundary | Not exercised | No source-asset/frontend/SEO/production mutation |

Evidence: `/Users/ivan/Documents/Codex/2026-10-29/portfolio-designer/outputs/port20-light-toning/`; exact created IDs/parents/bounds/paints, technical-note before-state, protection comparisons, measurements and final readback are in sibling `work/port20-light-toning/`. Rollback to the preceding unshaded trial removes only2842:739–747 and restores the two recorded technical notes after checking later edits. It restores no old70% layers, source assets or shared masters. Requested light-toning trial is complete; readability and Ivan's visual choice remain open. Writer released to PRODUCT/Ivan after same-Task readback; no automatic implementation or release handoff.

#### Current Revision — Unshaded Photograph Trial (2026-10-29)

This is the historical zero-toning comparison. The approved40% result above owns the current exposure and three-role copy; the source/crop and aligned motion remain preserved.

Ivan likes the aligned result and asks to try the photograph without darkening. PRODUCT admits a bounded DESIGNER revision of the same PORT-20 study through Figma MCP only: remove or disable the uniform70% presentation veil in the existing owned specimens, preserving the underlying photo/proxy, crop, text/tokens, current copy, grid/Contact geometry, aligned handoff and forward/reverse timing. This supersedes the prior toning choice for this trial, not the established absence of a local text backplate. Keep the separate scroll-driven photo fade to the raspberry page; removing static darkening must not remove the agreed transition.

Show fresh desktop/mobile opening and relevant transition/return exports. Measure actual primary/secondary text contrast over the unshaded image, including the short mobile state. Do not claim the previous shaded contrast result applies. If readability fails, present the unshaded result and focused evidence to Ivan; do not silently restore a veil, local panel, text shadow, new color or changed composition. Preserve source assets/shared masters and record exact changed IDs/bounded rollback. Same Task returns to PRODUCT/Ivan for review; no frontend, metadata or production action is authorized.

Trial result — DESIGNER,2026-10-29: the same nine specimens now show the unshaded photograph. Deleted only the nine static70% veil rectangles2811:563,612,658,704,750,783,816,849,882; no hidden veil, panel, shadow, replacement gradient or text recoloring was added. The study has337 nodes. Two owned technical notes identify the trial and its failed readability measurement; visitor copy, fonts/tokens, image hash/crop, source files, control placement/visibility and every surviving animation track compare unchanged. Twelve protected homepage/career roots match immediate before/after fingerprints.

[Desktop opening](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2811-559), [mobile opening](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2811-746) and [short mobile](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2811-812) were freshly rendered and inspected. New [desktop movie](/Users/ivan/Documents/Codex/2026-10-29/portfolio-designer/outputs/port20-unshaded/desktop-scroll.mp4) / [mobile movie](/Users/ivan/Documents/Codex/2026-10-29/portfolio-designer/outputs/port20-unshaded/mobile-scroll.mp4),from unchanged8.5s native timelines at10fps (MP4 containers measure8.6s), preserve the independent photo fade to raspberry and aligned forward/reverse/Work Experience reveals. Six phases each, including the fully restored bright photograph, were inspected. Actual swipe/runtime behavior remains unexercised.

Fresh resting contrast results **fail the4.5:1 target** for the unchanged14px warm-yellow text:

| Unshaded viewport | Primary minimum | Secondary minimum | Result |
| --- | --- | --- | --- |
| Desktop1440×900 |1.949:1|1.596:1|Readability fails |
| Mobile390×844 |1.460:1|1.297:1|Readability fails |
| Short mobile390×640 |1.371:1|1.235:1|Readability fails |

These are minimum alpha-aware sRGB paint/background ratios at detected glyph-core pixels in fresh MCP PNGs, not reuse of the shaded measurements. Full renders were compared with isolated unshaded-photo backdrops; core detection requires≥80% fitted glyph coverage and RGB residual≤3/255. Per-text conservative bounding minima, core medians, sample counts and low-contrast proportions are also saved. Most intro glyph samples fall below the target; this is a visible sustained readability problem rather than a claim based only on a blank text-box pixel. The mobile Contact button is excluded from photo-text measurement because its retained yellow control surface is its actual background. This is raster design evidence, not runtime accessibility certification.

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Requested unshaded trial | Nine existing specimens / MCP | Completed;9 static veils removed,0 remaining photo-toning/local-gradient rectangles | removal-and-protection.json |
| Preserved design and independent fade | Surviving property/track comparison | Passed; visitor text, source image/crop, geometry, grid/Contact and all motion unchanged | Same receipt comparison guard; native exports |
| Protected sources |12 homepage/career roots / immediate fingerprint readback | Passed unchanged; original and optimized photo files not rewritten | Same receipt |
| Fresh primary/secondary contrast | Desktop/mobile/short, current PNGs | **Failed**, as quantified above; trial left unshaded for review | contrast.json, measure-contrast.py, PNGs |
| Transition / return | Two native movies, six phases each | Inspected; separate scroll fade and aligned reverse path retained | Sequence PNGs / MP4s |
| Hygiene / focused document scan | Repository | Passed | Local checks |
| Browser/phone/code/release | Design-only trial | Not exercised; outside scope | No runtime or production claim |

Evidence: `/Users/ivan/Documents/Codex/2026-10-29/portfolio-designer/outputs/port20-unshaded/`; exact deleted-node geometry/fills/parents/order, technical-note before-state, protection guards and contrast method are in sibling `work/port20-unshaded/`. A bounded rollback can recreate only those nine recorded static rectangles at their original parent/order with new IDs and restore the two technical notes after checking subsequent edits; no older homepage/master or source asset should be restored. No compensation was applied after the failed contrast check. Requested trial work is complete, but readability and Ivan's choice remain open; the writer is released to PRODUCT/Ivan review with same-Task readback, not to FRONTEND or release.

#### Current Copy Reconciliation — Saavi Period Label (2026-10-29)

PORT-20 / DESIGNER fix-forward. PRODUCT found the stale `Approx. start month` display note in the study. Current `src/lib/site-content.ts` has Saavi period `Jun 2026 – Present` and an empty note; the explicit PORT-16 copy admission in `docs/plans/active/portfolio-website-relaunch-mvp.md` confirms Ivan removed only that qualifier. There is no conflicting date instruction: source-register confidence about the inferred month remains provenance, not a requirement to restore the retired display label.

Changed only nine inherited period-text overrides inside SECTION2811:558 to `Jun 2026 – Present`. The existing career masters2599:976/983 remain byte-for-property identical in the recorded fingerprints; no shared career component, dates, role, summary, source record or application code was edited. The date text and its auto-sized period wrapper shrink from two lines40px to one20px; outer rows/continuations, every other text/paint, controls, photo, no-backplate composition and all motion tracks compare unchanged before/after. No stale qualifier remains anywhere in the owned study.

Current focused [desktop continuation](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2811-700) and [mobile continuation](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2811-878) were exported and inspected. Fresh [desktop movie](/Users/ivan/Documents/Codex/2026-10-29/portfolio-designer/outputs/port20-copy-sync/desktop-scroll.mp4) and [mobile movie](/Users/ivan/Documents/Codex/2026-10-29/portfolio-designer/outputs/port20-copy-sync/mobile-scroll.mp4) retain the exact8.5s alignment/reveal/reverse behavior; continuation at4.6s and restored hero at8.2s were inspected in each. These replace earlier movie files for current-copy presentation; the previous alignment proof remains applicable to the unchanged geometry. Actual swipe/runtime proof remains unclaimed.

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Canonical display copy | Current site-content and explicit PORT-16 admission | Confirmed; same period, empty qualifier, no provenance/date rewrite | Named source headings and current local source |
| Owned label overrides | Nine study instances, Figma MCP | Passed;9 exact replacements,0 stale notes remain | label-reconciliation.json |
| Protected masters / remaining design | Immediate before/after readback | Passed; masters, all other text, outer geometry/paints and motion identical | Same receipt fingerprints and comparison guards |
| Current continuation / return | Desktop/mobile MCP PNGs and native MP4 samples | Inspected; one-line period and unchanged restored hero | outputs/port20-copy-sync |
| Hygiene / documentation | Repository hygiene and focused canonical Markdown scan | Passed | Local checks |
| Code, browser swipe or release | Design-copy boundary | Not run; outside this correction | No code/asset/source/release mutation |

Exact nine affected IDs and before/after text/height are saved outside Git at `/Users/ivan/Documents/Codex/2026-10-29/portfolio-designer/work/port20-copy-sync/label-reconciliation.json`; outputs are in the sibling `outputs/port20-copy-sync/`. Recovery is limited to those owned instance overrides after checking subsequent edits; never restore the retired qualifier into current site-content or alter protected masters. Figma writer released to PRODUCT with same-Task readback and the fresh presentation evidence.

#### Current Revision — Alignment And Reversible Continuation (2026-10-29)

The geometry/motion proof below remains current. For current Saavi copy and presentation movies, use the copy-reconciliation checkpoint above; the earlier exports still contain the superseded display qualifier.

PORT-20 / DESIGNER. Ivan reports confusing overlaps, asks to align the composition, keep ordinary Work Experience/following content and repeat animation behavior, and restore the same hero when returning upward. His final control decision is to leave grid placement/visibility unchanged. This bounded revision supersedes earlier hero-container/contact-flight/continuation timing below; it does not reopen typography, source assets, full-home content or release scope.

Demonstrated cause: a140/180px sticky identity frame also contained the fading introduction; its desktop name text occupied800px while contacts began at870 within the same800px lane. Contacts independently travelled diagonally. The first continuation was visible while its lower rows passed behind mobile controls. The existing document strip, compact header geometry and RepeatReveal pattern are the canonical seams.

Changed in the same nine specimens:
- Only the single20px name line sticks. Role/intro are reparented into each existing normal document strip and continue scrolling naturally. Initial visual positions and the full-group centering remain unchanged.
- Desktop name uses the existing compact-header526px allocation, leaving24px before contacts. The role line uses its existing227px text width; type remains SF Pro14/20 and the original primary/secondary paints.
- Desktop contact targets share a24px right/bottom inset and44px baseline. The same instance fades out at the lower right, changes location only at zero opacity, then fades into the aligned header. The reverse path is symmetric; there is no diagonal flight, duplicate name or duplicate contact group.
- The first Work Experience unit starts its existing8px/240ms reveal only after clearing the fixed dock by24px, including its8px travel. The authored sample thresholds are368px desktop and344px mobile; the name still reaches its header at368/320px on desktop/mobile390. Further page content retains ordinary repeat reveal behavior; reduced-motion intent uses the existing160ms opacity-only treatment, with static/no-JS content readable in normal flow and focus-within visibility retained.
- Every existing grid and mobile Contact coordinate,44px target, opacity, visibility and absence of motion tracks is unchanged. No delayed grid appearance or relocation was introduced.

The current [desktop2811:559](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2811-559) and [mobile2811:746](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2811-746) use the same SECTION2811:558 and346 owned nodes; no new frame/component/library or parallel page was created. Opaque-body geometry, shared3/9 and2-column row seams, source photograph/hash, uniform70% toning and absence of a local backplate are retained.

[Desktop motion](/Users/ivan/Documents/Codex/2026-10-29/portfolio-designer/outputs/port20-alignment/desktop-scroll.mp4) / [mobile motion](/Users/ivan/Documents/Codex/2026-10-29/portfolio-designer/outputs/port20-alignment/mobile-scroll.mp4) are fresh MCP exports at10fps, with8s forward/held-body/reverse mapping plus0.5s holding the fully restored hero. Six distinct phases per movie were inspected, including the settled return. They illustrate the proposed scroll path; real finger/wheel, interruption, keyboard, phone/safe-area and runtime behavior remain unexercised. No Figma browser access, application code or production action occurred.

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Alignment / ownership | Nine live specimens, MCP loaded homepage context | Passed; name-only20px sticky line, intro in strip, existing14/20 and image hash | final-audit.json |
| Fixed controls | All nine viewport states | Passed; exact grid/mobile Contact coordinates and visibility retained; no motion tracks | final-audit.json |
| Overlap geometry | Actual read-back tracks sampled8501 times per native clip; monotonic reveal easing included | No sampled intersections between visible name/intro/continuation and controls; mobile dock clearance≥24.641px. Contact relocations occur at opacity0 | motion-geometry.json, geometry-check.json |
| Forward / reverse visuals | Two native exports; six distinct phases each including settled return | Passed for the illustrated path; no observed visible collision, restored hero inspected | MP4s, sequence/restored PNGs |
| Original home owners / source | Ten protected-home fingerprints; scoped write receipts | Passed unchanged; no shared-master/asset mutation | final-audit.json and before/write receipts |
| Hygiene / canonical document | Repository hygiene plus direct UTF-8/whitespace/conflict scan | Passed | Local checks |
| Actual scroll / site behavior | MCP-only design boundary | Not exercised; no runtime acceptance claim | Explicit export limitation |

Current evidence: `/Users/ivan/Documents/Codex/2026-10-29/portfolio-designer/outputs/port20-alignment/`; exact before-state, affected IDs, read-back tracks and geometry audit are in sibling `work/port20-alignment/`. Geometry sampling is authored-track evidence and complements the inspected movie phases; it does not prove browser hit testing or runtime behavior. Prior resting contrast evidence is retained because the text paints/glyph positions/photo composition did not change; no new blanket contrast measurement is claimed.

Bounded rollback restores only recorded name/role widths and sizing, identity heights, introduction parents/indices/coordinates, continuation opacity/tracks, desktop-contact coordinates/tracks, two technical notes and the added timeline hold after checking later edits. Original8s timing is recorded in the preceding checkpoint; shorten a timeline only under an explicit rollback instruction. No original homepage or shared master snapshot should be restored. DESIGNER releases the writer to PRODUCT for the current alignment review; previous no-backplate approval is not substituted for this newer outcome, and no automatic FRONTEND/SEO/release handoff is authorized.

#### Current Revision — No Local Text Backplate (2026-10-29)

This checkpoint records local-backplate removal and the former uniform photo-toning choice. The unshaded trial above supersedes static70% toning; the alignment revision supersedes its contact/identity-container/continuation timing.

Ivan approves the photographic direction and asks to remove the text backplate, inspect the swipe transition and update the design. DESIGNER updated the same SECTION2811:558 and the same nine viewport specimens through MCP. This result supersedes the initial study's local-gradient composition, contrast numbers and motion exports below; photo assets, copy, type scale, crop and identity/header geometry are retained.

Visible cause: the distinct dark horizontal band was nine local62% reading-gradient rectangles, not part of the source photograph. Deleted IDs:2811:571,620,666,712,758,791,824,857,890. No hidden replacement remains. The existing whole-photo neutral veil now has uniform70% node opacity instead of40%: removing the local gradient alone left resting secondary text at2.30–2.87:1 in the tested viewports. Uniform toning restores legibility without a local panel, text shadow, new color or typography change. It is an editable Figma presentation layer; the supplied photo and optimized files are unchanged.

Current [desktop](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2811-559) and [mobile](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2811-746) retain the same continuous one-name handoff to the44px header. Native8s forward/after/reverse timelines were re-exported and six phases each inspected: [desktop transition](/Users/ivan/Documents/Codex/2026-10-29/portfolio-designer/outputs/port20-no-backplate/desktop-swipe.mp4), [mobile transition](/Users/ivan/Documents/Codex/2026-10-29/portfolio-designer/outputs/port20-no-backplate/mobile-swipe.mp4). These illustrate scroll/swipe intent; actual finger/wheel interaction was not exercised by MCP. No drag-to-next-frame carousel or browser Figma fallback was introduced.

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Backplate removal | All nine existing hero specimens | Passed; nine rectangles deleted, zero local reading gradients;346 owned nodes remain | removal.json, final-audit.json |
| Compact type / composition / source | MCP loaded homepage context | Passed; same1440/375/390/short/failure frame geometry, one name each, all portfolio text SF Pro14; same photo hash3790958a… | final-audit.json |
| Resting text contrast | Isolated backdrop pixels, actual primary/64% secondary paints, entire text bounds | Passed: desktop≥4.979:1, mobile390≥4.763:1, short390×640≥4.604:1 | contrast.json; PNGs |
| Transition | Two native5fps MP4s, six sampled phases each | Passed for illustrated start/mid/header/after/reverse; timeline geometry and control seams reused | desktop/mobile-sequence.png and MP4s |
| Protected homepage / bounded owner | Ten original homepage roots and exact mutated/deleted IDs | Preserved; revision writes are confined to PORT-20 study | preservation.json; scoped receipts |
| Workspace / documentation | Hygiene and canonical UTF-8/whitespace/conflict scan | Passed | Local check results |
| Actual swipe, phone, browser/runtime or release | MCP-only design boundary | Unexercised; no implementation or release claim | Explicit native-timeline limitation |

Current outputs: `/Users/ivan/Documents/Codex/2026-10-29/portfolio-designer/outputs/port20-no-backplate/`. Exact removal/toning before-state, current IDs/tracks, contrast and protected-home evidence are in sibling `work/port20-no-backplate/`. Same-scope rollback recreates only the nine recorded gradient rectangles under their recorded parents/indices (new IDs), restores the nine uniform veils from70% to recorded40% and restores the two updated technical notes; it does not restore any older homepage or shared master. No new frame, component, asset or variable family was added. DESIGNER releases the writer to PRODUCT to reconcile Ivan's approval and this completed bounded change; no automatic FRONTEND/code/SEO/release handoff.

#### Personal-Photo Hero Result — 2026-10-29

Initial study evidence below is historical for its local gradient, contrast measurements and first motion exports; the current no-backplate revision above owns those fields.

PORT-20 / DESIGNER → PRODUCT/Ivan design review. The text-only opening lacked a photographic stage and a defined identity-to-header transition. This isolated study resolves that design boundary; approval and all website implementation remain open. One new SECTION on the existing homepage page owns the proposal. No shared master or accepted homepage was replaced.

| Review artifact | Figma node / link | Geometry |
| --- | --- | --- |
| Complete bounded study | [Study](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2811-558),2811:558 | Nine viewport specimens and four technical notes; no full-home clone |
| Desktop opening + native timeline | [Desktop](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2811-559),2811:559 | 1440×900 |
| Desktop mid / handoff / after | 2811:608 /2811:654 /2811:700 | Scroll184 /368 /900px |
| Mobile opening + native timeline | [Mobile390](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2811-746),2811:746 | 390×844 |
| Responsive / failure / continuation | 2811:779 /2811:812 /2811:845 /2811:878 | 375×812 /390×640 /375×640 /390×844 |
| Editable contract notes | 2812:835, texts2812:836–839 | Scope, scroll geometry, fallback and limitations |

Reuse decision: existing portfolio primitives. Authored identity, role and both intro paragraphs are unchanged SF Pro14/20; the four designer notes alone use the existing12/16 Caption style. The800px reading lane,24px mobile insets,3/9 desktop and2-column mobile career recipe, contacts2487:306, career2599:976/983 and floating controls2616:1771/1788 are reused. No new component family, text scale, variable collection or external library. The subscribed Hito search produced generic controls/headings without a suitable photographic composite; the applicable local owners remain canonical.

The desktop identity group is140px high, centered at y380–520; mobile390 is180px high at y332–512. The one name travels naturally to the existing line-box anchor x320/y12 desktop or x24/y12 mobile, within44px chrome. Thresholds are368px /320px; mobile375 uses304px, short390 uses218px. The document strip moves by minus scroll; identity stops at the anchor. Photo opacity is1 minus clamped progress. Role/intro fade from30–100% progress. The same desktop contact instance moves from screen lower-right x1158/y824 to the existing header x870/y0; there is no second name/contact group. Work Experience remains in normal flow at hero height+68 and reaches y68 after one viewport scroll. One real Saavi record is a continuation sample, not the entire career page.

Mobile replaces three inline links with the existing single Contact dock action, explicitly a responsive proposal for Ivan. Grid stays left, Contact right; all target heights are44px with24px viewport inset, plus future safe-area insets. Frames represent the usable viewport; header y12 is relative to its safe top. The future hero uses stable100svh-equivalent minimum height and must grow in ordinary flow when text/safe areas do not fit. Reduced/static/no-JS intent keeps the photo and all copy opaque in normal flow, without identity morph/fade/contact travel. Loading/failure retains reserved geometry, raspberry background, copy and controls. No snap lock or scroll takeover.

The image remains monochrome with its authored grain. Desktop uses cover; portrait frames use a proportional4:3 image clipped at object-position44%/50%, retaining the foreground surfer and a coastline fragment rather than claiming the entire landscape fits. A neutral40% black node veil plus a soft additional62% reading-gradient plateau are editable presentation layers. They are absent from every source derivative. Conservative sampling of isolated MCP background exports over every resting text bounding box gives secondary intro≥5.474:1 and name≥9.181:1 for desktop/mobile390. Intermediate fading copy intentionally loses opacity; the static/reduced fallback keeps readable copy opaque. This is raster composite evidence for those resting states, not a blanket runtime contrast claim.

Source original:2789×2092 JPEG,2696010B, SHA-256 `bf4fdcc16dc25ec87da2eda414cca129ddccdb1c51d9675233eb24f57d0f23c9`. Final source readback matches exactly. Deterministic auto-orientation/sRGB interpretation, Lanczos resize to2560×1920 and metadata stripping only; no crop, retouch, denoise or tonal adjustment. Web delivery pack:

| File | Dimensions / encoding | Actual bytes | Recommendation |
| --- | --- | --- | --- |
| surf-2560.avif | 2560×1920, quality60, speed6 | 407068 | Large delivery source;84.90% smaller than original |
| surf-1600.avif | 1600×1200, quality60 | 225650 | Smaller source; grain-preserving choice exceeds the rough200KB target |
| surf-800.avif | 800×600, quality60 | 56364 | Small preview / low-density use |
| surf-2560.webp | 2560×1920, quality80, method6 | 566942 | Compatible web fallback; above450KB to preserve grain |

Source/output hashes, exact paths/settings and design-proxy record: [manifest](/Users/ivan/Documents/Codex/2026-10-28/portfolio-designer/outputs/port20-photo-hero/manifest.json). The output directory is outside Git/public assets. Native-size detail comparison showed more flattened grain/water in WebP70 (431620B); WebP80 and AVIF60 retain a closer texture. Full AVIF decode and source/reference/detail views were inspected. Output metadata checks find no profile/EXIF/XMP sections; decoded dimensions/orientation/color are recorded in the work ledger. Original private metadata was never copied to deliverables.

For later source selection, account for cover rendering: effective CSS image width is the larger of viewport width and hero height×4/3, multiplied by DPR and capped at2560. A390×844 portrait needs about2251 source pixels at2×;800 is therefore not its default high-DPR asset. Prefer the AVIF width set, WebP fallback, reserve image/hero dimensions, and load the first-screen image eagerly at appropriate priority after implementation approval. The2560 cap limits density on larger/high-DPR screens; do not upscale and claim extra detail.

MCP accepted the WebP upload but could not read its dimensions or render it. The Figma study therefore uses the same lossless resized PNG reference,2616560B, hash `3790958a2ff84654eb1dd7ec340494eeaac091b0`; it is a design-only proxy, not the proposed web payload. This failure and the correction are recorded honestly.

Evidence directory: `/Users/ivan/Documents/Codex/2026-10-28/portfolio-designer/outputs/port20-photo-hero/` contains desktop/mobile375/390/short/failure/after PNGs, responsive contact sheet and [desktop motion](/Users/ivan/Documents/Codex/2026-10-28/portfolio-designer/outputs/port20-photo-hero/desktop-scroll.mp4) / [mobile motion](/Users/ivan/Documents/Codex/2026-10-28/portfolio-designer/outputs/port20-photo-hero/mobile-scroll.mp4). Both are8s,5fps native MCP exports with forward, held-after and reverse progress; six sampled phases per export were inspected. These are timed illustrations of scroll mapping, not executed scrolling. Actual Figma prototype scroll/click/focus, Contact/grid interaction, browser decoding, phone safe areas, no-JS/slow-load behavior and runtime accessibility remain unexercised. No browser Figma fallback was used.

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Source and derivative integrity | Local file/decode/readback | Passed; original SHA unchanged, four web outputs≤2560, stripped metadata | manifest.json, metadata-check.json, source/detail views |
| Compact type and editable ownership | MCP loaded homepage context, all nine specimens | Passed; all98 portfolio text nodes SF Pro14/20, one visible name each; four technical notes12/16 | final-audit.json |
| Desktop/mobile/failure geometry | MCP exports1440/375/390/640px-height | Passed for shown states; centered groups, retained crop,44px targets, no observed clipped intro | PNGs, responsive-states.png |
| Resting photo contrast | Isolated backdrop pixels + actual text paints | Passed for desktop/mobile390; conservative minima above4.5 | contrast.json |
| Motion intent | Native exports + six samples each | Passed for illustrated forward/after/reverse path | MP4s/contact sheets; no actual-scroll claim |
| Protected owners | Before/after observed-property fingerprints, loaded page context where needed | Passed: ten existing homepage roots, Foundations, grid, Manifesto, Citymobil roots and manual overview unchanged | before.json, preservation.json |
| Workspace hygiene / document scan | Repository hygiene and direct canonical Markdown scan | Passed | hygiene check and UTF-8/whitespace/conflict scan |
| Runtime / release | Figma-only boundary | Not run; outside scope | No code, metadata/OG, deployment or FRONTEND handoff |

Exact355 owned IDs, construction and motion receipts are outside Git in the sibling `work/port20-photo-hero/` directory. Rollback removes only SECTION2811:558 and its recorded descendants after checking later user edits; it restores no older homepage/master snapshot. Unreferenced uploaded hashes may remain in the Figma asset store. Initial unloaded-page fingerprint differences were resolved by rereading homepage/Foundations in their own page contexts; they were not treated as source mutations. The writer is released to PRODUCT/Ivan for review; PORT-20 remains In progress / Acceptance and requires design approval.


Ivan explicitly requested complete portfolio typography bound to design tokens, reuse of Savi's token approach for consistency, and then a reference-based homepage using his own data. This is a scope extension of PORT-15, not a revival of cancelled PORT-12. One sequential writer: DESIGN SYSTEM → DESIGNER → PRODUCT/Ivan. No site code or FRONTEND handoff.

### Current Revision: External Company Links In Project Metadata

On 2026-10-28 Ivan requested external links on the company/client attribution in Projects Done. This is a bounded DESIGNER delta on the same PORT-15 and existing desktop/mobile views, not a change to the project-title destinations or nine career entries. The final explicitly supplied Peruse URL supersedes the preceding spoken no-link wording for Peruse; Hito remains a personal-project label without an external company link.

| Existing project metadata | Clickable label | Accepted external destination | Source / boundary |
| --- | --- | --- | --- |
| Wrike | Wrike | `https://www.wrike.com/` | Ivan's instruction to use Wrike's site plus the existing `src/lib/projects.ts` URL. |
| LitRes | LitRes | `https://www.litres.ru/` | Ivan explicitly named litres.ru; supersedes the older litres.com metadata for this design intent. Do not edit runtime metadata in this Figma-only delta. |
| Taxi / VK / Citymobil | VK only | `https://vk.com/` | Ivan's instruction plus existing project URL. Preserve `/ Citymobil` as plain context, not a separately invented destination or a legal-identity claim. |
| Peruse | Peruse | `https://www.peruse.ml/` | Ivan's final explicit supplied URL. Preserve the authored concept summary; the current company landing page does not rewrite the historical case or prove deployment. |
| Hito | Personal project (plain text) | None | Preserve Ivan's personal-project clarification. Its title still points to the authored portfolio case, not an external company. |

Company links are independent secondary external destinations; project-title links remain authored internal case navigation with unchanged titles/routes, summaries and contribution roles. Prefix/context text is noninteractive. Preserve the five project relationships and all nine career entries; do not turn every career company into a link during this scope. Use existing external-link/arrow/hover/focus primitives and semantic tokens, extending the canonical project-row metadata seam or one minimal local metadata composition rather than creating per-company component families or route-local styling.

Keep company URL actions on the exact owned target/instance, not the generic shared external-link master, so header/contact links and case navigation remain unaffected. Distinguish external-company ↗ from internal-case →. Verify no nested/overlapping competing click targets, no clipped focus outline (including wrapper ancestors), and desktop/mobile text wrapping and target geometry. No new token/style collection, palette or font changes, employment records, case page/route or Figma page/file.

Product destination preflight fetched Peruse and Wrike. The browsing tool returned 403 for LitRes and could not fetch VK; these are tool/environment verification limits, not proof of broken destinations. Preserve the accepted explicit addresses; do not bypass access controls, log in, replace destinations or mark reachability passed. Saved URL/action readback is required in both views; external site availability and future website behavior are separate claims. Native prototype click proof may be collected where supported but must be identified as Figma, not runtime/browser application acceptance.

Closure for the delta: four company-link targets per view (eight total), two plain nonlinked Hito personal labels, unchanged five internal case destinations, career/source/header preservation, saved action URLs/bindings and inspected composition evidence. Return actual Figma links and exact limitations for review. No website code, `src/lib/projects.ts` mutation, runtime corpus/profile update, publishing or FRONTEND handoff. Before-state and exact IDs/actions support rollback of this metadata delta only; preserve unrelated user edits.

### Current Revision: Contextual And Scroll Header

On 2026-10-28 Ivan explicitly said he likes the current design, accepting the populated visual/content baseline, and requested contextual header behavior. This approval is not website-code or release authority. The immediate executor is DESIGNER on the same PORT-15; the existing career/source records, palette and Foundations are frozen for this delta.

Observable design result: three clear header states, shown for desktop and mobile and applied/referenced coherently from the existing homepage views:

1. **Home / initial:** retain the accepted opening header position/composition with Ivan Cheremisin, the existing role line and Email, LinkedIn, GitHub. Do not silently change the public role/headline because Ivan referred colloquially to Product Designer/Product Builder.
2. **Home / scrolled:** a persistent compact header keeps only Ivan Cheremisin and Email, LinkedIn, GitHub. The role line and introductory content scroll away; the header does not disappear with scroll direction. Returning to the opening position restores the initial presentation. Use a content-based transition boundary (opening identity/role area leaving its initial position/view), not an invented product promise about exact runtime scroll pixels. Designer records the chosen geometry/threshold intent for future Frontend.
3. **Project context:** replace the Ivan identity/role area with the current authored project title plus a clearly labelled Back control. Email, LinkedIn and GitHub remain available. Keep this project identity while scrolling inside the project; do not revert to Ivan's name halfway through the case. Use one existing long-title project, e.g. Taxi Aggregator Support Workspace, as the header-only review specimen, not a fabricated full case study.

DESIGNER owns this page-chrome interaction/composition, reusing existing Foundation text/link/icon instances and semantic tokens. Prefer one small reusable header composition/state family, analogous to the existing page-owned employment/project-row compositions; no separate per-route or per-device component families, new palette/type scale, token/style collection, DS migration or unrelated UI. If a genuine missing shared primitive/token blocks the result, name it and route that bounded gap to DESIGN SYSTEM rather than invent a parallel layer.

Preserve the exact nine career records, five project contexts, contact destinations, existing full-page views `2469:4` / `2469:5`, page `2469:2`, authored routes and construction masters. Build a compact state/review area on the SAME existing Figma page, away from current content; no new file/page or copies of the entire career page per header state. Apply the header owner to the current homepage if safe without redesigning approved content. Header specimen and any project-context frame must be clearly labelled as a header/interaction study, not an approved full project page.

Responsive/accessibility intent: all four compact-home identity/contact elements stay available, but mobile may wrap contacts onto a second row rather than shrink typography or truncate controls. Project titles wrap within available space; Back and contacts remain visible and reachable. Solid token-backed header surface prevents text from showing through scrolled content; reserve enough content offset so sticky chrome does not obscure headings/focused controls. Reuse focus states/local left-arrow icon; no new decorative animation, auto-focus, duplicate visible header, typewriter or terminal language. Keep reduced-motion intent nonessential/instant.

Navigation intent for the design: Back returns to the originating portfolio view; show/preserve originating scroll context in the Figma flow when supported. A direct-entry project has a home/portfolio fallback. This is a UX intent for later implementation, not permission to create a new browser-history/persistence engine or claim actual URL/scroll restoration works. Existing routes and browser baseline are untouched.

Demonstrate the opening/scrolled/project states and navigation using native Figma prototype capabilities where supported. Read back the actual fixed/scroll/reaction settings and exercise the supported prototype path if available. If automatic scroll-triggered variant switching or exact Back restoration cannot be represented/exercised through the available MCP surface, state that concrete limit and show an honest state board/transition specification; do not label a click simulation, static screenshot or annotation as working scroll behavior. No website, browser runtime or source-code changes are admitted by this Task.

Acceptance: source/before-state ledger and exact header/instance IDs; token/style/local-dependency preservation; desktop/mobile long-title/contact/focus geometry and no clipping/overlap; inspected state-board screenshot; supported prototype reaction/fixed-position settings and truthfully separated exercised/unverified behavior. The already accepted baseline remains preserved; the new header interaction deliverable returns to PRODUCT/Ivan review, not FRONTEND. Rollback restores only exact header changes/new task-owned nodes after checking later consumers; never delete the page, source facts or Foundations.

### Current Revision: Employment History And Projects Done

Ivan confirmed that the homepage must separate career history from delivered work: `Work Experience` first, `Projects Done` below. This supersedes the earlier single neutral Projects block, not the existing Foundations or Figma-only boundary. DESIGNER updates existing desktop/mobile frames `2469:4` and `2469:5` in place; preserve the page, reference-led composition, palette, styles, icons and shared links.

Latest direct clarification from Ivan in PRODUCT on 2026-10-28 resolves the last two project-context fields: **DS Hito is his self-initiated/personal project; Peruse was done for Peruse.** DATA QUALITY updates the existing source register with this direct-user provenance, then hands the same Task to DESIGNER for the two fields in both existing views. Use `Personal project` for Hito (not a fictitious company/client); use `Company / client · Peruse` or the equivalent concise `For Peruse` for Peruse. These statements do not add employment records, project dates, launch/maturity or legal/IP claims; Peruse's existing concept qualification stays unchanged. No new classification/filter architecture, route or page is admitted. All nine career records and other project facts remain unchanged. Remove the now-obsolete confirmation-pending labels for these two relationships, verify exact text/bindings/reflow and return for design review, not frontend implementation.

#### Recovered Resume Source: Current Content Intake

Ivan pointed Product to the resume prepared in another chat. The earlier source search covered only repository/Portfolio Library indexes and was incomplete. The professional source has now been located: Codex chat `01a17ece-4909-7331-a4a0-02fa519e0719`, title `Обновить описания позиций в LinkedIn`, and readable resume `/Users/ivan/Documents/ChatGPT/local/output/resume-2026/Ivan_Cheremisin_Wellfound.txt`. It contains nine experience entries with roles and month/year periods. Do not repeat the request for the entire CV or treat all dates as absent.

Current sequential boundary: DATA QUALITY reconciles this source → DESIGNER populates the existing frames → PRODUCT/Ivan reviews. DATA QUALITY owns `docs/data-quality/portfolio-career-and-project-source-register.md` as the bounded Figma fact/provenance register outside the runtime corpus. This task does not authorize inserting new files into `content/portfolio/`, changing the live retrieval corpus, publishing website copy or changing a schema/API. Preserve external resume files and the source chat; read only the professional evidence relevant here. No messages or edits to that other chat/account/profile.

Named primary discussion anchors in that source chat: `01a17eda-127a-7c31-a0de-eb938c70cf18` (3D Source offer report, start 2 June 2025, Ivan's March 2026 end-month account); `01a17ee7-c434-7531-add8-93c823501ee5` (Ivan authorizes adding the 3D Source/Metabox entry and role); `01a17ee2-c6c9-7610-b0a6-ef59225d7264` (Ivan describes Figma/system work, manually coded components and AI brand-variable assembly); `01a17efa-2349-7621-bf40-f8a82e9de303` and `01a17f03-d284-7522-b22b-8ae363701941` (VK/Citymobil wording and approval); `01a17f09-ea16-7272-86e6-85fee9d27969` and `01a17f11-9bde-7501-b165-2bbf91fa0b13` (Wrike role/period and approved qualitative work); `01a17f14-33e8-7843-93b8-5c1f5732be05` (Ivan's LitRes scope); `01a17f1c-a009-7fa2-b777-6b8b6e7d3feb` (Saavi founder work, approximate four-month origin), subsequent entry/readback and resume (June 2026). Use named facts/anchors rather than rereading unrelated applications, services, subscriptions or personal content.

DATA QUALITY must separate original profile dates, direct user approvals, generated resume phrasing and genuine remaining conflicts. Do not promote resume metrics to proven outcomes or silently replace the site's current identity headline. Retain employment versus project-role differences, concurrent founder/independent roles and month-level precision. Document evidence confidence rather than requiring an employer certificate for every authored career fact. Any contract reference is private date/title provenance only; do not copy salary, signatures or other contract data into Figma/docs.

After the compact register is checked, DATA QUALITY hands the same PORT-15 directly to the verified portfolio DESIGNER. DESIGNER replaces the pending employment specimen with the reviewed career entries and short non-metric summaries, updates only supported company/client relationships for current projects, and removes obsolete blanket pending labels. Specific unresolved project mappings (for example DS Hito or Peruse if still not documented) stay isolated; do not block use of the recovered career history or ask Ivan to re-dictate everything. Metabox belongs under the documented 3D Source work, not as a fictional employer; do not invent a published Metabox detail route or legal/IP ownership. Project list/route expansion or complete case-page design is not required by this correction.

Reuse the existing palette, 136 variables, 19 styles, icons, links, employment/project components, frame/page IDs and authored detail routes. Verify both full-page compositions after content reflow: exact accepted fields, style/token bindings, local consumers, wrapping, bounds and screenshots. Return any narrow unresolved fact for Ivan only after the named source is consumed. Keep PORT-15 open for actual design acceptance; no FRONTEND handoff, publishing or app code.

- Employment entries represent an actual workplace: company, employment role, start/end month and year (or confirmed Present), brief responsibilities. Project dates, company branding, a company URL or a project-level role are not proof of employment or employment dates. Do not infer workplaces from the five projects or create one job per project. One confirmed employment entry may relate to several projects.
- Project entries represent the work: existing title, source-grounded summary, company/client or personal relationship, Ivan's contribution/role, and an authored detail-route destination. Client, employer and product owner are separate facts; do not imply legal/IP ownership from branding. Only show supplied ownership language or flag it for confirmation. Do not resolve VK/CityMobil/CityMobile or Peruse identities by guessing.
- Each project still leads to a separately scoped full case with narrative, images and other evidence. This revision does not authorize designing every case page, importing unknown media or implementing routes/code.
- Product's initial bounded check found no chronology in the repository corpus or 21 Portfolio Library records, but the resume/source chat named above now supplies professional history outside those indexes. Known project roles remain project-level facts. Consume that recovered source first; request only a specific relationship/conflict that remains absent after review. The blanket CV request is obsolete.
- Safe independent design work may proceed now: add the two distinct sections and a reusable employment-row composition, and expose the project company/client metadata field. If no employment record is verified, use one clearly labelled draft/content-pending specimen (not a fabricated employer or a pretend chronological list). Missing dates/client/owner details may appear only as explicit confirmation-needed draft fields/annotations, never invented values or a claim that real content is complete. Do not repeat unsourced employers across the portfolio or write these placeholders into canonical project facts.
- Keep fixed shared typography and token-bound spacing/paint; allow desktop date/meta column and mobile stacked reflow using the same components. Verify saved text/source boundaries, component bindings, wrapping, bounds and screenshots for both frames. Record actual changed IDs and before-state for bounded rollback; preserve unrelated user edits.
- Return the structurally updated draft for Ivan's review and state exactly which facts remain missing. PORT-15 stays open until verified employment chronology and project relationships are supplied, applied and accepted. No FRONTEND handoff, publishing, code, Savi change, new Figma file/page or broad redesign.

### Foundation Contract

- Extend the existing foundations page `2459:2`, collection and styles; do not create a competing library. Rename the page to `Design Foundations` if compatible with existing naming; preserve its identity and the 23 local icons/link family.
- Read-only Savi reference: `/Users/ivan/Developer/saavi/docs/design-system/design-system-contract.md`, headings `Design Sources`, `Token Contract`, `UI Typography Emphasis`; executable registry under `packages/design-system/tokens/`: `reference-spacing.mjs`, `reference-font-weights.mjs`, `reference-tracking.mjs`, `semantic-font-families.mjs`, `semantic-typography.mjs`. Savi Figma DS: `Db0Fo7D5e5eP6yTGgwJREx`. Inspect if needed through Figma MCP only; no Savi mutations or messages.
- Reuse the compatible primitive → semantic → component model, metric coordinates, emphasis and purpose naming locally. Numeric sizes/line-heights alias `space/*` primitives, not a second raw numeric scale. Document the exact imported subset and intentional differences; this is local portfolio ownership, not a live cross-project dependency or wholesale Savi import.
- Lock a complete practical portfolio type inventory before mutation: heading tiers, body tiers, short labels/metadata, UI/link roles and any display roles actually needed by the brief. No role-by-weight Cartesian explosion or irrelevant data/technical/widget catalogue. Reuse Savi metrics rather than silently retaining the earlier one-size 14/22 model; fixed scales only, no breakpoint modes. For responsive Savi display roles, either omit unused roles or explicitly document one fixed reference-mode mapping.
- Retain the already inspected system-sans/SF Pro Figma mapping unless Ivan changes the font direction. Savi's Instrument Sans/Poppins/Fira Mono are not automatically adopted. Bind supported family/style or weight, size, line-height and tracking through local variables and text styles; disclose actual font-axis mapping. No font binaries or website licensing/adoption.
- Create one portfolio palette candidate: deep raspberry background, warm yellow foreground, and a quieter secondary foreground based on the same yellow hue. Use semantic background/text-primary/text-secondary/link/focus/border tokens over local primitives/opacity tokens. Avoid reducing whole-node opacity; calculate composited secondary-text contrast, keep ordinary text at least 4.5:1. Exact colors are a reviewable Figma proposal, not a production decision. No theme matrix or large palette exploration.
- Update the existing icon/link bindings and specimen to the new semantic tokens. Verify no unbound in-scope typography/paints/spacing except documented fixed icon geometry and intentional technical constants. Preserve source pages, original remote icons and provenance.

### Homepage Design Contract

- After foundations pass saved-state and visual checks, DESIGN SYSTEM updates/read-backs PORT-15 and directly hands it to the verified portfolio DESIGNER chat. Release Figma mutation ownership first; no parallel writers. Designer must use the same token/style/component IDs, not recreate them.
- Build one new Figma page with editable desktop and mobile homepage frames, reusing a single fixed type system. Follow nunocoelho.me's restrained CV/editorial composition, compact type, left-aligned lists, quiet secondary text and arrow links; no generic oversized hero/card-grid substitute. Use the raspberry/yellow candidate from Foundations. This is an adaptation, not a copy of the reference author's content.
- Show Ivan Cheremisin, Product designer, concise source-grounded introduction, authored project/work entries and contact links. Evidence sources: `content/portfolio/portfolio.md` sections `Canonical Identity`, `Contact Destinations`, `Canonical Project Set`; project-specific Markdown; `docs/data-quality/portfolio-project-materials-inventory.md`; `src/lib/projects.ts` only where facts do not conflict with corpus boundaries. Source-check each visible claim. Do not invent work dates, employers, metrics, recent labels or personal/commercial classification; omit unresolved fields rather than publish guesses. No copied reference biography, talks, products or side projects.
- Project links indicate navigation to authored detail pages with images/descriptions; no full case pages in this slice. Work/Personal grouping remains provisional; do not fabricate an empty Personal category or classify work just to match the reference. Use a neutral Projects section if classification is unproven. Contact destinations must use authored targets.
- Repeated rows/links use shared instances or a minimal necessary local repeated-row component with an explicit owner. Every visitor-facing text role uses a shared style; colors and shared spacing remain token-bound. No flattened full-page screenshot as the deliverable, no fabricated project evidence, no decorative media or signature-feature implementation.
- Validate editable structure, exact font usage/bindings, desktop/mobile clipping/overlap/legibility and reference fidelity with screenshots. Record token-to-consumer mappings and exact new IDs. Show Ivan the actual Figma frames. Stop at design review; no implementation, publishing, commit or deployment without separate approval.

### Preservation And Closure

Application routes, runtime, corpus, assets, Savi sources and unrelated user edits stay unchanged. Before in-place foundation edits, retain a before-state ledger for exact changed IDs/values/bindings; rollback restores only those properties and removes only exact task-created IDs after checking later consumers. The task stays open while required typography is unbound, the homepage bypasses the foundations, content is unsupported, saved-state or screenshots are missing, or Ivan's design acceptance is pending. A known unrelated `.DS_Store` hygiene failure is not permission for cleanup or a false repository-wide pass.

## Original Scope: First Preparation Pass

- Target existing file: [Cheremisin.co.uk](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2457-2973), file key `qnmQs8GxVjZQFKbGU4tR08`.
- Supplied page `2457:2973` is `v3.0`; icon sheet `2457:2998` is [Arrows](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2457-2998). Both were read successfully before mutation.
- Reference: [nunocoelho.me](https://nunocoelho.me/). Adopt its restrained typographic/link approach as preparation for Ivan's design, not its biography, employer claims, product descriptions or entire information architecture.
- Create one new self-contained foundations page in this file. Preserve source pages and icons. New working copies of supplied icons become editable local main components; new links reference these local icons. Do not mass-detach existing user content or remove file-wide library subscriptions.
- Prepare a small type-role set with usable styles and family/size/line-height variables where supported, plus minimal semantic color/spacing values needed by links and icons. Keep one fixed scale: no screen-size modes or duplicate responsive component families.
- Prepare plain/internal/external text-link behavior with editable label, local icon swap and essential default/hover/focus states. Use a compact variant model, not one variant per icon. Show a specimen/review frame made from instances; keep construction masters separate.
- Build only the supplied icon set/family needed by this request and the reusable link family. Do not add forms, dashboards, a full site mockup, a new Figma file, Code Connect or a published external library.

## Source Observation, Not A Font Prescription

Product inspected the live reference in the in-app browser on 2026-10-28. In the observed dark presentation, h1/h2/body/navigation were 14px with 22px line-height and a system stack: `-apple-system, system-ui, Helvetica Neue, Helvetica, Arial, sans-serif`. Prose was weight 400 and emphasized labels/links computed to 475; hierarchy depended on emphasis, color and spacing rather than a large display scale.

Discover actual Figma fonts/styles rather than inventing support for weight 475. Use a real available source-equivalent and disclose any mapping. Keep the output modest; the legacy runtime's Geist/Mono and terminal tokens do not override Ivan's newly selected reference for this Figma preparation. No website font/token adoption happens here.

## Multi-Page Intent And Open Decisions

The portfolio will not be only one page. Project links must support authored detail pages with images, descriptions and narrative. `Work` / `Personal` are provisional category labels inferred from Ivan's wording, not an accepted assignment of any current project to a category. Do not create a production schema, replace URLs, or classify projects without Ivan's decision.

Ivan still owns the site's actual visual design. This task authorizes the requested shared foundations and editable components only. An optional signature feature can be proposed separately; it is not a prerequisite or an instruction to implement novelty.

## Preservation And Recovery

No application code, routes, existing assets, canonical portfolio facts, unrelated dirty changes, source-project Figma designs, provider settings or library publishing may change. No paid font/service, dependency, commit, push or deployment is authorized.

Detach only exact task-owned cloned working nodes. New local icons/links must have no remote component, style or variable dependency in their subtrees; preserved source sheets may retain their original references. Preserve known source/license attribution: detachment is not relicensing.

Track all newly created/mutated IDs and source-to-local mappings in the Figma state ledger. Rollback targets only exact new IDs; do not delete by broad name patterns or overwrite the source page. Before retrying a partial failure, inspect what was actually created.

## Evidence Required

- Exact new-page, collection, style, component-set and icon IDs with source mapping.
- Variable scopes, bindings, relevant code syntax and real font availability checked.
- New library local-dependency inspection, rather than only calling detach on its outer wrapper.
- Review instances with editable short/long labels and local arrow swaps; no overlaps, clipped text or invisible glyphs at ordinary scale.
- Screenshot inspection of the completed review frame/page and targeted fixes when needed.
- Re-read saved Figma and Task status before calling this complete. Report unverified behavior honestly; a Figma component state is not a tested browser interaction.

Implementation remains open while the new components are remotely dependent, the page/specimen is broken, required typography/icons are missing, or structural/visual evidence is absent. A successful Figma preparation does not authorize frontend implementation or accept an entire site design.

## Artifact Register

Figma task session: `a6eab5db-0178-4453-a43e-308274c52679`. Creation IDs, final page URL and durable token/component decisions are to be recorded here by DESIGN SYSTEM after the requested build and verification. No Figma mutation was performed by Product's admission pass.

## Constructed Foundations — Historical First Pass

Built on 2026-10-28 for PORT-15. Owner: DESIGN SYSTEM. Reuse decision: create a small portfolio-owned typography/link family and consolidate the supplied arrow instances into local working masters. Existing Poppins/Inter styles and remote library links were preserved; they are not this reference-based fixed-scale contract.

- [Foundations page](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2459-2): `2459:2`, named `Portfolio / Foundations · PORT-15`. Exactly one page added (10 → 11).
- [Review specimen](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2460-8): `2460:8`, 880 × 1164. Component examples are instances; no main components inside the review frame. Short/long labels, local swaps and Latin/Cyrillic/Portuguese glyph specimens are visible.
- Local icon master frame: `2460:209`; link component set: `2459:198`; construction note: `2460:263`. Masters are outside the review frame.
- Collection: `VariableCollectionId:2459:3`, `Portfolio / Foundations`, single `Default` mode `2459:0`. No responsive or theme-mode families.

### Fixed Typography And Token Contract

SF Pro is the available Figma specimen mapping for the reference system font stack, not an adopted or distributable website font. Regular reads back as `wght=400`; Medium reads back as `wght=510`, approximating the reference's observed 475 emphasis. No font binaries were copied. Webfont licensing and the website runtime stack remain outside this task. All five local text styles bind family, style, size and line-height to local variables. Body, Emphasis, Link and Caption remain 14px/22px; Link Hover adds underline.

Colors are Figma preparation values: background `#171717`, text/focus `#f5f5f5`, muted `#a3a3a3`. Semantic values alias local hidden primitives; these do not replace runtime tokens. WEB code syntax uses proposed `var(--portfolio-...)` names only.

| Variable | ID | Scope | Value / alias |
| --- | --- | --- | --- |
| `primitive/ink` | `VariableID:2459:4` | hidden primitive | `{"r": 0.09019608050584793, "g": 0.09019608050584793, "b": 0.09019608050584793, "a": 1}` |
| `primitive/paper` | `VariableID:2459:5` | hidden primitive | `{"r": 0.9607843160629272, "g": 0.9607843160629272, "b": 0.9607843160629272, "a": 1}` |
| `primitive/secondary` | `VariableID:2459:6` | hidden primitive | `{"r": 0.6392157077789307, "g": 0.6392157077789307, "b": 0.6392157077789307, "a": 1}` |
| `color/background` | `VariableID:2459:7` | FRAME_FILL, SHAPE_FILL | `{"type": "VARIABLE_ALIAS", "id": "VariableID:2459:4"}` |
| `color/text` | `VariableID:2459:8` | SHAPE_FILL, TEXT_FILL, STROKE_COLOR | `{"type": "VARIABLE_ALIAS", "id": "VariableID:2459:5"}` |
| `color/muted` | `VariableID:2459:9` | TEXT_FILL | `{"type": "VARIABLE_ALIAS", "id": "VariableID:2459:6"}` |
| `color/focus` | `VariableID:2459:10` | STROKE_COLOR | `{"type": "VARIABLE_ALIAS", "id": "VariableID:2459:5"}` |
| `type/family` | `VariableID:2459:11` | FONT_FAMILY | `"SF Pro"` |
| `type/size` | `VariableID:2459:12` | FONT_SIZE | `14` |
| `type/line-height` | `VariableID:2459:13` | LINE_HEIGHT | `22` |
| `type/regular` | `VariableID:2459:14` | FONT_STYLE | `"Regular"` |
| `type/medium` | `VariableID:2459:15` | FONT_STYLE | `"Medium"` |
| `space/icon-gap` | `VariableID:2459:16` | GAP | `4` |
| `space/row` | `VariableID:2459:17` | GAP | `8` |
| `space/section` | `VariableID:2459:18` | GAP | `24` |
| `space/inset` | `VariableID:2459:19` | GAP | `32` |
| `space/focus-block` | `VariableID:2460:265` | GAP | `2` |

| Text style | ID |
| --- | --- |
| Portfolio / Body | `S:7f144e1c5b37835b91a353bb4abdaf213ed3e2cc,` |
| Portfolio / Emphasis | `S:d534063a3797fbe77249d275f73dd8430f2a75fe,` |
| Portfolio / Link | `S:fdd0625e15d2ef4f6b07a8fdd82f58d413c9c2a7,` |
| Portfolio / Caption | `S:a7e07934105953ee0a9c4f6e6f04636019838341,` |
| Portfolio / Link Hover | `S:7fb26d49d27023b2bdd3033282bb019b62f0b5e8,` |

### Local Link Contract

One set, nine variants: `Kind=Plain/Internal/External` × `State=Default/Hover/Focus`. Properties: `Label#2459:0`, `Internal icon#2460:0`, `External icon#2460:10`. Separate icon properties preserve internal/right and external/up-right defaults while allowing any of the 23 local arrows to be swapped without icon variants. Plain variants contain no icon layer. Labels hug content; long unbroken examples fit the specimen, but this is not a browser wrapping/responsive test.

Default→Hover reactions are wired within each Kind and use instant CHANGE_TO. Hover has a bound shared underlined text style; Focus has a 1px outside outline and local padding variables. Focus is a visual specification, not a tested keyboard interaction. Destinations are intentionally unset: internal links represent authored project detail navigation, external links represent outside destinations. Work/Personal remains provisional and no project was classified.

| Variant | ID |
| --- | --- |
| Kind=Plain, State=Default | `2459:162` |
| Kind=Plain, State=Hover | `2459:166` |
| Kind=Plain, State=Focus | `2459:170` |
| Kind=Internal, State=Default | `2459:174` |
| Kind=Internal, State=Hover | `2459:178` |
| Kind=Internal, State=Focus | `2459:182` |
| Kind=External, State=Default | `2459:186` |
| Kind=External, State=Hover | `2459:190` |
| Kind=External, State=Focus | `2459:194` |

### Supplied Arrow Mapping

Only task-owned cloned working copies were detached. Vector geometry, 16 × 16 size and source identity were retained; fills now bind to the local text color. Original source instances stay remote and the source sheet and subscriptions remain intact. Remote component keys are preserved in each local component description and the state ledger; detachment is not relicensing.

| Supplied source instance | Local main component | Name |
| --- | --- | --- |
| `2457:3002` | `2459:51` | Glyph/arrows/basic/down |
| `2457:3007` | `2459:56` | Glyph/arrows/basic/left |
| `2457:3012` | `2459:61` | Glyph/arrows/basic/right |
| `2457:3017` | `2459:66` | Glyph/arrows/basic/up |
| `2457:3022` | `2459:71` | Glyph/arrows/compact/down |
| `2457:3027` | `2459:76` | Glyph/arrows/compact/left |
| `2457:3033` | `2459:81` | Glyph/arrows/compact/left-right |
| `2457:3038` | `2459:86` | Glyph/arrows/compact/right |
| `2457:3043` | `2459:91` | Glyph/arrows/compact/up |
| `2457:3048` | `2459:96` | Glyph/arrows/compact/up-down |
| `2457:3053` | `2459:101` | Glyph/arrows/complex/down |
| `2457:3058` | `2459:106` | Glyph/arrows/complex/down-left |
| `2457:3064` | `2459:111` | Glyph/arrows/complex/down-right |
| `2457:3069` | `2459:116` | Glyph/arrows/complex/left |
| `2457:3074` | `2459:121` | Glyph/arrows/complex/right |
| `2457:3079` | `2459:126` | Glyph/arrows/complex/up |
| `2457:3084` | `2459:131` | Glyph/arrows/complex/up-left |
| `2457:3089` | `2459:136` | Glyph/arrows/complex/up-right |
| `2457:3095` | `2459:141` | Glyph/arrows/sorting |
| `2457:3100` | `2459:146` | Glyph/arrows/stroke/down |
| `2457:3105` | `2459:151` | Glyph/arrows/stroke/left |
| `2457:3110` | `2459:156` | Glyph/arrows/stroke/right |
| `2457:3115` | `2459:161` | Glyph/arrows/stroke/up |

### Validation And Recovery

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Saved structure | Figma Plugin API, whole new page including hidden descendants | Pass: 23 local icons, 9 variants, 5 local text styles, 17 variables, 1 mode | Exact IDs above; 314 saved nodes |
| Local dependencies | Recursive component/style/variable references and aliases | Pass: no remote dependency found in new library | Full new subtree audit; original 23 source instances remain remote |
| Fonts and bindings | Exact SF Pro Regular/Medium loaded before readback | Pass: 91 text nodes, no missing-font flags; family/style/size/line-height bindings verified | Font availability and saved style readback; actual Medium axis 510 |
| Visual review | Full new-page screenshot at 1760 × 1164 | Pass: specimen, masters, glyphs and long labels visible; no observed clipping/overlap | `/Users/ivan/Documents/Codex/2026-10-27/portfolio-design-system/outputs/port15-foundations.png` |
| Interaction contract | Saved variant reactions/properties | Pass for structure only | 3 default→hover reactions; static focus specimens; no browser/prototype interaction claim |
| Repository hygiene | `npm run hygiene:check` | Fails on unrelated `.DS_Store` | No cleanup or unrelated work modified; no code/release handoff |

Build/type/browser tests were not run: no application code changed. No Figma library publishing, runtime adoption or FRONTEND handoff occurred. Final acceptance stays with Ivan/PRODUCT.

Exact-ID rollback: first remove page `2459:2` only, which owns all 314 task-created saved nodes; then remove the five exact style IDs above and collection `VariableCollectionId:2459:3` (17 variables) only after confirming no later user-created consumers exist. Preserve source `2457:2998`, page `2457:2973`, all prior styles/collections and library subscriptions. Do not delete by name prefix. Full creation/transient/deleted-working-node identities and source keys are in `/tmp/design-system-state-port15.json` and its phase ledger files. Inspect saved state before retry or rollback.

## Reconciliation Inventory Lock — 2026-10-28

Scope: reconcile existing page/collection/style/component identities in place before releasing the file to DESIGNER. Before-state: `/tmp/design-system-state-port15-r2-before.json` (314 saved nodes, 17 local variables, 5 local styles). The first-pass section above is historical once this reconciliation is verified.

Locked metric roles from Savi's executable fixed registry: Heading SM/Base/MD/LG/XL (20/24, 24/32, 28/36, 32/36, 40/44); Body SM/Base/MD/LG (14/20, 16/24, 20/28, 24/36); Label SM/Base/LG (12/16, 14/20, 16/24); UI SM/MD/LG (12/16, 14/20, 16/24). Existing Link, Link Hover and Emphasis styles use UI/MD; existing Caption uses Label/SM; existing Body style becomes Body/SM without changing its ID. No role × weight Cartesian styles. No technical/data/widget roles. Expressive display hero/section/subtitle/eyebrow are unused by the compact editorial brief and omitted; no responsive modes or fixed display-mode substitute is introduced.

Primitive → semantic → component aliases remain local portfolio ownership. Numeric metric roles alias the selected `space/*` primitive coordinates directly; semantic tracking aliases Savi normal (0) or slightly-tight (-0.01em = -1% in Figma). Family remains SF Pro. Canonical 400/500/600 emphasis identity is retained with an explicit Figma-family adapter if necessary; exact actual axes are read back after binding. Existing compatibility variables are rebound aliases, not a second raw size/line-height scale.

Palette candidate: raspberry `#3a0823`, warm yellow `#ffe7a3`, secondary paint uses the same yellow at 64% alpha over raspberry. Semantic background/text-primary/text-secondary/link/focus/border roles; no whole-node opacity reduction or theme matrix. Exact composited contrast and final IDs are recorded after saved-state verification. Code syntax is proposed Figma metadata only; no runtime adoption.

## Reconciled Foundations — Current Consumer Contract

Verified on 2026-10-28. This section supersedes the first-pass one-size 14/22 and neutral palette above. DESIGN SYSTEM foundation mutation ownership is released to DESIGNER for the admitted homepage; do not run simultaneous writers. Page identity `2459:2` is unchanged and its name is now `Design Foundations`. The collection `VariableCollectionId:2459:3` and its single Default mode `2459:0`, original five style IDs, 23 local icon IDs and link set `2459:198` are preserved. No new competing page/library was created.

[Open Design Foundations](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2459-2) · [review specimen](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2460-8).

### Imported Subset And Adapter Differences

Read-only sources: Savi `design-system-contract.md` headings Design Sources, Token Contract and UI Typography Emphasis; executable `reference-spacing.mjs`, `reference-font-weights.mjs`, `reference-tracking.mjs`, `semantic-font-families.mjs`, `semantic-typography.mjs` in `/Users/ivan/Developer/saavi/packages/design-system/tokens/`. No Savi file or Figma state was changed. No Savi font family, component, library dependency, data/technical catalogue or responsive mode was imported.

- Space coordinates reused locally: 0, px, 0.5, 1, 2, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, resolving to 0, 1, 2, 4, 8, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44px. Figma rejects decimal points in variable names, so registry `space/0.5` and `space/3.5` map to local `space/0-5` and `space/3-5`; coordinates and values are unchanged.
- All 15 fixed metric roles locked above are imported exactly; numeric size and line-height semantic roles alias those space primitives. Existing link compatibility size/line-height IDs were renamed to `component/link/*` and now alias UI/MD. Existing `space/icon-gap`, row, section, inset and focus-block variables alias the same primitive coordinate system. No separate raw font-size/line-height scale remains.
- Regular/Medium/Strong emphasis aliases numeric 400/500/600 primitives. Styles bind `fontWeight`, not the first pass's named fontStyle adapter; saved SF Pro variable axes read back exactly 400/500/600. All styles also bind family, size, line-height and letter-spacing. The original hidden Regular/Medium string variables remain adapter metadata for recovery, with no active style consumers; they do not define weight identity.
- Tracking uses normal 0 and slightly-tight −0.01em. Bound Figma letterSpacing resolves in pixels; assigning PERCENT clears the binding. Five fixed local adapters therefore resolve heading SM/Base/MD/LG/XL to −0.20/−0.24/−0.28/−0.32/−0.40px. These are exact fixed-role conversions of −1%, not a new typography metric scale. Other roles use bound zero tracking.
- Family remains SF Pro as the Figma system-sans specimen; Savi Instrument Sans/Poppins/Fira Mono are deliberately excluded. No font binaries, website licence or runtime font-stack decision follows from this artifact.
- Palette is one review candidate: background `#3A0823`, primary/link/focus `#FFE7A3`, secondary/border the same yellow with 64% alpha. `opacity/text-secondary=0.64` records the ingredient; Figma cannot alias a color's alpha channel independently, so `palette/yellow-secondary` stores that derived RGBA. Consumers bind semantic colors, never whole-node opacity. Recompute this derived color when changing the ingredient.
- Fixed technical constants excluded from binding audit: icon/vector geometry (16 × 16) and component-set/canvas catalogue positioning/size. Frame padding/gaps including zero and actual content paints are bound. No responsive catalogue or role-by-weight Cartesian family was added.

### Typography Consumer Register

15 practical metric roles plus the four preserved Emphasis/Link/Link Hover/Caption conveniences. The original Body ID now names Body/SM. Heading tiers are available for case content; the homepage should retain the reference's compact hierarchy rather than automatically using Heading/XL as a hero. Body/SM (14/20), Label/Base (14/20), UI/MD and Link (14/20) provide the compact reference lane.

| Style | Stable style ID | Size / line-height | Weight | Tracking px |
| --- | --- | --- | --- | --- |
| Portfolio / Body / SM | `S:7f144e1c5b37835b91a353bb4abdaf213ed3e2cc,` | 14 / 20 | 400 | 0.00 |
| Portfolio / Emphasis | `S:d534063a3797fbe77249d275f73dd8430f2a75fe,` | 14 / 20 | 500 | 0.00 |
| Portfolio / Link | `S:fdd0625e15d2ef4f6b07a8fdd82f58d413c9c2a7,` | 14 / 20 | 500 | 0.00 |
| Portfolio / Caption | `S:a7e07934105953ee0a9c4f6e6f04636019838341,` | 12 / 16 | 500 | 0.00 |
| Portfolio / Link Hover | `S:7fb26d49d27023b2bdd3033282bb019b62f0b5e8,` | 14 / 20 | 500 | 0.00 |
| Portfolio / Heading / SM | `S:3033d3934d5281212b3ff5badcdca37cfd848b49,` | 20 / 24 | 600 | -0.20 |
| Portfolio / Heading / Base | `S:5637313871fca5bf91a49d885daf155597a36a8d,` | 24 / 32 | 600 | -0.24 |
| Portfolio / Heading / MD | `S:9de6e0725e2129aa07956bcad4352894b1a18acd,` | 28 / 36 | 600 | -0.28 |
| Portfolio / Heading / LG | `S:f81cdbe35cdc393976c2203e4adf60151326de52,` | 32 / 36 | 600 | -0.32 |
| Portfolio / Heading / XL | `S:cde7c1b09ef001e36ee04655171e7794683a678e,` | 40 / 44 | 600 | -0.40 |
| Portfolio / Body / Base | `S:bb02fa77fb7b6c1dbfcbdbd5b5fd916b9f028150,` | 16 / 24 | 400 | 0.00 |
| Portfolio / Body / MD | `S:ded1205b8943b8b826163b6ab8a737dc7bba402c,` | 20 / 28 | 400 | 0.00 |
| Portfolio / Body / LG | `S:a1a401bb0c4700adb90d6d828d3d8aa815275fc9,` | 24 / 36 | 400 | 0.00 |
| Portfolio / Label / SM | `S:e093aeff548b6bb7b9396706a791ea0e14762dd7,` | 12 / 16 | 500 | 0.00 |
| Portfolio / Label / Base | `S:2e6ce2ccbd4dce48fdac5d321dff5e57867746ea,` | 14 / 20 | 500 | 0.00 |
| Portfolio / Label / LG | `S:1f8e06de7ee35e1f0c9405c8422f84cefb620ddf,` | 16 / 24 | 500 | 0.00 |
| Portfolio / UI / SM | `S:f1d0ba4a3504d6ebd01a584e56e387676e7251aa,` | 12 / 16 | 500 | 0.00 |
| Portfolio / UI / MD | `S:1a6feab376e40d482c1a01aa3158afb16da78db7,` | 14 / 20 | 500 | 0.00 |
| Portfolio / UI / LG | `S:43be467bad0a98a92dfc6e40ea8cd7b10e2a8a02,` | 16 / 24 | 500 | 0.00 |

### Token And Component Consumers

- All shared text styles bind family, numeric weight, size, line-height and tracking. Every saved text node consumes a shared local style.
- `color/background` paints the review and construction surfaces. `color/text-primary` paints catalogue text and local icon vectors; `color/text-secondary` paints notes/metadata. Link master label fills use `color/link`; focus outlines use `color/focus` plus bound `border/width`. `color/border` is available for Designer's necessary separators.
- `layout/space/*` provides semantic padding/gaps for the new homepage. Do not consume raw `space/*` directly in a new product frame; use or narrowly extend these semantic aliases. The existing link uses component typography aliases; preserve Label, Internal icon and External icon property keys and existing local arrow IDs from the first-pass register.
- Preview is still review frame `2460:8`; the added fixed-role catalogue is `2466:76`, and palette note is `2466:92`. Construction masters remain outside it. No other file page is changed.

| Token | Exact variable ID | Value / alias |
| --- | --- | --- |
| `palette/raspberry` | `VariableID:2459:4` | `{"r":0.22745098173618317,"g":0.0313725508749485,"b":0.13725490868091583,"a":1}` |
| `palette/yellow` | `VariableID:2459:5` | `{"r":1,"g":0.9058823585510254,"b":0.6392157077789307,"a":1}` |
| `palette/yellow-secondary` | `VariableID:2459:6` | `{"r":1,"g":0.9058823585510254,"b":0.6392157077789307,"a":0.6399999856948853}` |
| `color/background` | `VariableID:2459:7` | `→ palette/raspberry` |
| `color/text-primary` | `VariableID:2459:8` | `→ palette/yellow` |
| `color/text-secondary` | `VariableID:2459:9` | `→ palette/yellow-secondary` |
| `color/focus` | `VariableID:2459:10` | `→ palette/yellow` |
| `font/family/base` | `VariableID:2459:11` | `"SF Pro"` |
| `component/link/font-size` | `VariableID:2459:12` | `→ typography/ui/md/font-size` |
| `component/link/line-height` | `VariableID:2459:13` | `→ typography/ui/md/line-height` |
| `font/style/regular` | `VariableID:2459:14` | `"Regular"` |
| `font/style/medium` | `VariableID:2459:15` | `"Medium"` |
| `space/icon-gap` | `VariableID:2459:16` | `→ space/1` |
| `space/row` | `VariableID:2459:17` | `→ space/2` |
| `space/section` | `VariableID:2459:18` | `→ space/6` |
| `space/inset` | `VariableID:2459:19` | `→ space/8` |
| `space/focus-block` | `VariableID:2460:265` | `→ space/0-5` |
| `color/link` | `VariableID:2465:66` | `→ palette/yellow` |
| `color/border` | `VariableID:2465:67` | `→ palette/yellow-secondary` |
| `opacity/text-secondary` | `VariableID:2465:68` | `0.6399999856948853` |
| `space/0` | `VariableID:2465:69` | `0` |
| `space/px` | `VariableID:2465:70` | `1` |
| `space/0-5` | `VariableID:2465:71` | `2` |
| `space/1` | `VariableID:2465:72` | `4` |
| `space/2` | `VariableID:2465:73` | `8` |
| `space/3` | `VariableID:2465:74` | `12` |
| `space/3-5` | `VariableID:2465:75` | `14` |
| `space/4` | `VariableID:2465:76` | `16` |
| `space/5` | `VariableID:2465:77` | `20` |
| `space/6` | `VariableID:2465:78` | `24` |
| `space/7` | `VariableID:2465:79` | `28` |
| `space/8` | `VariableID:2465:80` | `32` |
| `space/9` | `VariableID:2465:81` | `36` |
| `space/10` | `VariableID:2465:82` | `40` |
| `space/11` | `VariableID:2465:83` | `44` |
| `font/weight/400` | `VariableID:2465:84` | `400` |
| `typography/emphasis/regular` | `VariableID:2465:85` | `→ font/weight/400` |
| `font/weight/500` | `VariableID:2465:86` | `500` |
| `typography/emphasis/medium` | `VariableID:2465:87` | `→ font/weight/500` |
| `font/weight/600` | `VariableID:2465:88` | `600` |
| `typography/emphasis/strong` | `VariableID:2465:89` | `→ font/weight/600` |
| `font/tracking/normal` | `VariableID:2465:90` | `0` |
| `font/tracking/slightly-tight` | `VariableID:2465:91` | `-0.009999999776482582` |
| `typography/heading/sm/font-size` | `VariableID:2465:92` | `→ space/5` |
| `typography/heading/sm/line-height` | `VariableID:2465:93` | `→ space/6` |
| `typography/heading/sm/tracking` | `VariableID:2465:94` | `→ adapter/tracking/heading-sm-px` |
| `typography/heading/sm/font-weight` | `VariableID:2465:95` | `→ typography/emphasis/strong` |
| `typography/heading/sm/font-family` | `VariableID:2465:96` | `→ font/family/base` |
| `typography/heading/base/font-size` | `VariableID:2465:97` | `→ space/6` |
| `typography/heading/base/line-height` | `VariableID:2465:98` | `→ space/8` |
| `typography/heading/base/tracking` | `VariableID:2465:99` | `→ adapter/tracking/heading-base-px` |
| `typography/heading/base/font-weight` | `VariableID:2465:100` | `→ typography/emphasis/strong` |
| `typography/heading/base/font-family` | `VariableID:2465:101` | `→ font/family/base` |
| `typography/heading/md/font-size` | `VariableID:2465:102` | `→ space/7` |
| `typography/heading/md/line-height` | `VariableID:2465:103` | `→ space/9` |
| `typography/heading/md/tracking` | `VariableID:2465:104` | `→ adapter/tracking/heading-md-px` |
| `typography/heading/md/font-weight` | `VariableID:2465:105` | `→ typography/emphasis/strong` |
| `typography/heading/md/font-family` | `VariableID:2465:106` | `→ font/family/base` |
| `typography/heading/lg/font-size` | `VariableID:2465:107` | `→ space/8` |
| `typography/heading/lg/line-height` | `VariableID:2465:108` | `→ space/9` |
| `typography/heading/lg/tracking` | `VariableID:2465:109` | `→ adapter/tracking/heading-lg-px` |
| `typography/heading/lg/font-weight` | `VariableID:2465:110` | `→ typography/emphasis/strong` |
| `typography/heading/lg/font-family` | `VariableID:2465:111` | `→ font/family/base` |
| `typography/heading/xl/font-size` | `VariableID:2465:112` | `→ space/10` |
| `typography/heading/xl/line-height` | `VariableID:2465:113` | `→ space/11` |
| `typography/heading/xl/tracking` | `VariableID:2465:114` | `→ adapter/tracking/heading-xl-px` |
| `typography/heading/xl/font-weight` | `VariableID:2465:115` | `→ typography/emphasis/strong` |
| `typography/heading/xl/font-family` | `VariableID:2465:116` | `→ font/family/base` |
| `typography/body/sm/font-size` | `VariableID:2465:117` | `→ space/3-5` |
| `typography/body/sm/line-height` | `VariableID:2465:118` | `→ space/5` |
| `typography/body/sm/tracking` | `VariableID:2465:119` | `→ font/tracking/normal` |
| `typography/body/sm/font-weight` | `VariableID:2465:120` | `→ typography/emphasis/regular` |
| `typography/body/sm/font-family` | `VariableID:2465:121` | `→ font/family/base` |
| `typography/body/base/font-size` | `VariableID:2465:122` | `→ space/4` |
| `typography/body/base/line-height` | `VariableID:2465:123` | `→ space/6` |
| `typography/body/base/tracking` | `VariableID:2465:124` | `→ font/tracking/normal` |
| `typography/body/base/font-weight` | `VariableID:2465:125` | `→ typography/emphasis/regular` |
| `typography/body/base/font-family` | `VariableID:2465:126` | `→ font/family/base` |
| `typography/body/md/font-size` | `VariableID:2465:127` | `→ space/5` |
| `typography/body/md/line-height` | `VariableID:2465:128` | `→ space/7` |
| `typography/body/md/tracking` | `VariableID:2465:129` | `→ font/tracking/normal` |
| `typography/body/md/font-weight` | `VariableID:2465:130` | `→ typography/emphasis/regular` |
| `typography/body/md/font-family` | `VariableID:2465:131` | `→ font/family/base` |
| `typography/body/lg/font-size` | `VariableID:2465:132` | `→ space/6` |
| `typography/body/lg/line-height` | `VariableID:2465:133` | `→ space/9` |
| `typography/body/lg/tracking` | `VariableID:2465:134` | `→ font/tracking/normal` |
| `typography/body/lg/font-weight` | `VariableID:2465:135` | `→ typography/emphasis/regular` |
| `typography/body/lg/font-family` | `VariableID:2465:136` | `→ font/family/base` |
| `typography/label/sm/font-size` | `VariableID:2465:137` | `→ space/3` |
| `typography/label/sm/line-height` | `VariableID:2465:138` | `→ space/4` |
| `typography/label/sm/tracking` | `VariableID:2465:139` | `→ font/tracking/normal` |
| `typography/label/sm/font-weight` | `VariableID:2465:140` | `→ typography/emphasis/medium` |
| `typography/label/sm/font-family` | `VariableID:2465:141` | `→ font/family/base` |
| `typography/label/base/font-size` | `VariableID:2465:142` | `→ space/3-5` |
| `typography/label/base/line-height` | `VariableID:2465:143` | `→ space/5` |
| `typography/label/base/tracking` | `VariableID:2465:144` | `→ font/tracking/normal` |
| `typography/label/base/font-weight` | `VariableID:2465:145` | `→ typography/emphasis/medium` |
| `typography/label/base/font-family` | `VariableID:2465:146` | `→ font/family/base` |
| `typography/label/lg/font-size` | `VariableID:2465:147` | `→ space/4` |
| `typography/label/lg/line-height` | `VariableID:2465:148` | `→ space/6` |
| `typography/label/lg/tracking` | `VariableID:2465:149` | `→ font/tracking/normal` |
| `typography/label/lg/font-weight` | `VariableID:2465:150` | `→ typography/emphasis/medium` |
| `typography/label/lg/font-family` | `VariableID:2465:151` | `→ font/family/base` |
| `typography/ui/sm/font-size` | `VariableID:2465:152` | `→ space/3` |
| `typography/ui/sm/line-height` | `VariableID:2465:153` | `→ space/4` |
| `typography/ui/sm/tracking` | `VariableID:2465:154` | `→ font/tracking/normal` |
| `typography/ui/sm/font-weight` | `VariableID:2465:155` | `→ typography/emphasis/medium` |
| `typography/ui/sm/font-family` | `VariableID:2465:156` | `→ font/family/base` |
| `typography/ui/md/font-size` | `VariableID:2465:157` | `→ space/3-5` |
| `typography/ui/md/line-height` | `VariableID:2465:158` | `→ space/5` |
| `typography/ui/md/tracking` | `VariableID:2465:159` | `→ font/tracking/normal` |
| `typography/ui/md/font-weight` | `VariableID:2465:160` | `→ typography/emphasis/medium` |
| `typography/ui/md/font-family` | `VariableID:2465:161` | `→ font/family/base` |
| `typography/ui/lg/font-size` | `VariableID:2465:162` | `→ space/4` |
| `typography/ui/lg/line-height` | `VariableID:2465:163` | `→ space/6` |
| `typography/ui/lg/tracking` | `VariableID:2465:164` | `→ font/tracking/normal` |
| `typography/ui/lg/font-weight` | `VariableID:2465:165` | `→ typography/emphasis/medium` |
| `typography/ui/lg/font-family` | `VariableID:2465:166` | `→ font/family/base` |
| `component/link/font-weight` | `VariableID:2465:167` | `→ typography/ui/md/font-weight` |
| `component/link/font-family` | `VariableID:2465:168` | `→ typography/ui/md/font-family` |
| `component/link/tracking` | `VariableID:2465:169` | `→ typography/ui/md/tracking` |
| `adapter/tracking/heading-sm-px` | `VariableID:2466:61` | `-0.20000000298023224` |
| `adapter/tracking/heading-base-px` | `VariableID:2466:62` | `-0.23999999463558197` |
| `adapter/tracking/heading-md-px` | `VariableID:2466:63` | `-0.2800000011920929` |
| `adapter/tracking/heading-lg-px` | `VariableID:2466:64` | `-0.3199999928474426` |
| `adapter/tracking/heading-xl-px` | `VariableID:2466:65` | `-0.4000000059604645` |
| `layout/space/none` | `VariableID:2466:66` | `→ space/0` |
| `layout/space/hairline` | `VariableID:2466:67` | `→ space/px` |
| `layout/space/xxs` | `VariableID:2466:68` | `→ space/0-5` |
| `layout/space/xs` | `VariableID:2466:69` | `→ space/1` |
| `layout/space/sm` | `VariableID:2466:70` | `→ space/2` |
| `layout/space/md` | `VariableID:2466:71` | `→ space/3` |
| `layout/space/base` | `VariableID:2466:72` | `→ space/4` |
| `layout/space/section` | `VariableID:2466:73` | `→ space/6` |
| `layout/space/inset` | `VariableID:2466:74` | `→ space/8` |
| `border/width` | `VariableID:2466:75` | `→ space/px` |

### Reconciliation Evidence And Bounded Recovery

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Saved bindings/local dependencies | Full page including hidden descendants; local aliases/styles/components | Pass: 331 nodes, 107 text nodes, 136 variables, 19 styles, 23 icons, 9 link variants; zero missing binding/local-dependency findings | `/tmp/design-system-state-port15-r2-final.json`; detailed alias/style snapshot in `...-r2-audit.json` |
| Typography | Exact SF Pro fonts loaded; numeric weights and px tracking adapter | Pass: 400/500/600 and all 15 registry metric pairs; 5 bound style properties | Style register above, saved readback |
| Paint and spacing | Every in-scope solid paint and auto-layout gap/padding, including zero | Pass; no whole-node opacity reductions | Recursive saved-state audit; fixed geometry/canvas constants excluded as declared |
| Contrast | Saved linear-sRGB luminance after secondary alpha compositing over saved background | Primary/link/focus 13.892:1; secondary 6.219:1 | Above 4.5:1 for normal text; no screenshot-only contrast claim |
| Visual | Entire new page, 1760 × 1640 screenshot, reviewed at ordinary scale | Pass: full catalogue, long labels, local swaps, glyphs and states visible without observed clipping/overlap | `/Users/ivan/Documents/Codex/2026-10-27/portfolio-design-system/outputs/port15-foundations-reconciled.png` |
| Preservation | Original Arrows sheet and local component identities | Pass: 23 original remote instances retained; same 23 local IDs and same link set | Saved-state readback; Savi read-only sources untouched |

Figma hover/focus remains an artifact contract, not exercised browser interaction. No application test/build or runtime adoption is claimed. Known unrelated `.DS_Store` hygiene failure remains outside this scope; no cleanup authority is inferred.

In-place rollback is property restoration, not deletion of the existing page: `/tmp/design-system-state-port15-r2-before.json` stores prior page name, all exact IDs, original 17 variable values/names/scopes/syntax, original 5 style properties/bindings, standalone specimen copy and frame geometry/padding/gaps/bindings. `/tmp/design-system-state-port15.json` → reconciliation records exact 119 added variable IDs, 14 added style IDs and 17 added node IDs. Restore the captured old properties and remove only these exact additions after checking later consumers; preserve original source icons and other pages. Do not use the earlier whole-page rollback after Designer adds consumers.

DESIGNER receives one released foundations boundary and owns the next Figma mutation: create the separately admitted editable desktop/mobile homepage using these same IDs and authored content. No FRONTEND handoff or new runtime work. Ivan's review remains pending.

## Applied Homepage — Review Artifact

Built by DESIGNER on 2026-10-28 under PORT-15's admitted extension. This is the reference-based Figma homepage requested after foundations, not a revival or acceptance of PORT-12. Design acceptance remains Ivan's decision. Figma writer is released at this checkpoint; application implementation is not handed off.

### Exact Artifact And Consumer IDs

- New page: `2469:2`, `Homepage · PORT-15` — [open page](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2469-2).
- Review composition: `2469:3`, `Homepage review · Desktop + Mobile`, 1910 × 1024 — [both views](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2469-3).
- [Desktop](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2469-4): `2469:4`, 1440 × 1024, centered 800px content lane.
- [Mobile](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2469-5): `2469:5`, 390 × 1020, 342px content lane / 24px side margins. Content height follows reflow; this is a full-page design, not a fixed device screenshot.
- One minimal DESIGNER-owned composition component: `2470:2`, `Portfolio / Homepage project row`, outside review frames. Description property `Description#2470:0`; nested title instances retain Foundations `Label#2459:0`. The description uses HEIGHT text auto-resize + horizontal FILL so the same main component works at both widths. No separate mobile component family.

| Stable route | Desktop row instance | Mobile row instance |
| --- | --- | --- |
| `/projects/taxi-aggregator-support-workspace` | `2470:40` | `2470:108` |
| `/projects/ds-hito` | `2470:46` | `2470:114` |
| `/projects/litres` | `2470:52` | `2470:120` |
| `/projects/peruse` | `2470:58` | `2470:126` |
| `/projects/wrike` | `2470:64` | `2470:132` |

Internal title instances communicate authored-detail navigation with the local right arrow; the exact intended relative route is recorded in the instance name and table above. No detail-page Figma frames or live-site URL availability were fabricated. External contacts have saved ON_CLICK URL actions preserving the existing hover reaction: `mailto:ivan@cheremisin.co.uk`, `https://www.linkedin.com/in/icheremisin/`, `https://github.com/ivan-nthng`. These reactions were read back, not exercised as a browser test. Figma keyboard/focus behavior and production touch targets are not verified by this artifact.

### Composition And Sources

The selected live reference nunocoelho.me was visually inspected in the in-app browser. Retained: compact identity/contact row, small system-sans text, left-aligned introduction and list, restrained secondary text and substantial whitespace between sections. The reference biography, employers, dates, side projects and availability were not copied. Desktop contacts align beside identity; mobile contacts sit below it. Neutral Projects avoids inventing Work/Personal classification.

Identity, discipline, focus, working preference and contact destinations come from `content/portfolio/portfolio.md`, Canonical Identity / Contact Destinations / Canonical Project Set. Five titles/routes and short qualitative descriptions consume the respective project Markdown Project Identity/Product context; Taxi's previous-interaction context is also sourced in its authored contributions. Peruse remains explicitly a concept. No metrics, work dates, employer relationship, recency, deployment or measured outcomes are asserted. No unreviewed project image is needed for this compact homepage; evidence and narrative belong on separately scoped detail pages.

### Foundations Consumed, Not Recreated

No variables, styles, icon masters or link variants were added or changed. Existing Foundations page `2459:2`, collection `VariableCollectionId:2459:3`, 136 variables, 19 styles, 23 arrow masters and link set `2459:198` remain the shared owners.

- All 40 text nodes use `Portfolio / Body / SM`, `Portfolio / Emphasis` or `Portfolio / Link`, 14/20, SF Pro numeric weights 400 or 500, zero tracking. All five supported typography properties remain governed by their shared style bindings. Heading/XL is deliberately unused for fidelity to the compact reference.
- `color/background` (`VariableID:2459:7`) paints the two screens; primary/secondary (`2459:8`, `2459:9`) paint identity, prose and metadata; `color/link` (`2465:66`) governs link labels/icons through the existing masters.
- Semantic `layout/space/none`, xs, sm, section and inset (`VariableID:2466:66`, `:69`, `:70`, `:73`, `:74`) govern zero and nonzero auto-layout padding/gaps. Product frames do not consume raw `space/*`. Fixed canvas-board spacing, review dimensions and content-lane widths are geometry constants rather than a second token scale.
- Shared link Default/Hover/Focus states and local arrow swaps are preserved. One new row main component plus ten instances provide the only missing repeated composition primitive; no unrelated component catalogue or remote library was introduced.

### Scoped Verification

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Editability | Saved Figma review subtree | Pass: 122 descendants: 18 frames, 40 texts, 46 instances, 18 vectors; zero image-filled nodes or flattened UI | `work/port15/final-audit.json` in Designer's task directory; exact frame IDs above |
| Typography/tokens/local ownership | All review descendants plus shared style lookup | Pass: every text has a local style; exact SF Pro 400/500; zero missing typography, solid-paint or auto-layout-spacing binding findings; no remote main component consumer | Same saved audit; `contrast.json` contains exact font metrics/style IDs |
| Contrast | Saved semantic palette, secondary RGBA composited over saved background | Pass: primary 13.892:1, secondary 6.219:1; no whole-node opacity reduction | `contrast.json`; original foundation color IDs retained |
| Geometry and visual fidelity | Desktop 1440 and mobile 390 full-page composition | Pass after shared-row FILL correction: zero descendants outside parent bounds; screenshot inspected for readable copy, wrapping, alignment, clipping and overlap | `/Users/ivan/Documents/Codex/2026-10-27/portfolio-designer/outputs/port15/homepage-desktop-mobile.png`, 1910 × 1024 |
| Content | Every distinct visible statement against authored corpus | Pass within trusted-authored boundaries; no added dates, metrics, company identity resolution or Personal grouping | Source mapping above; final saved audit includes every text string |
| Preservation | Existing pages/Foundations identities | Pass: prior 11 pages retained; one new homepage page (12 total), no foundation values/styles changed | Initial wrapper state and final readback |

No application code/build, browser implementation test, publishing or runtime font adoption was performed. This Figma slice is ready for Ivan's design review; PORT-15 remains open until acceptance. Repository-wide hygiene is not claimed; the earlier unrelated `.DS_Store` failure was not changed in this scope.

### Bounded Recovery

Task ledger: `/Users/ivan/Documents/Codex/2026-10-27/portfolio-designer/work/port15/state.json`, exact created IDs in `build-result.json`, saved audit in `final-audit.json`. Remove only this task's exact new page `2469:2` (containing board `2469:3`, views `2469:4`/`:5`, row main `2470:2` and their exact descendants) after checking for later consumers of the row master. No existing foundation object requires restoration. Never roll back by deleting `2459:2` or broad name patterns.

## Revised Homepage — Employment And Projects Structural Draft

DESIGNER revised the existing page `2469:2` and views `2469:4` / `2469:5` in place on 2026-10-28. This section supersedes the earlier single Projects composition and its dimensions, not the shared Foundations. Current hierarchy: Identity and contact → Introduction → Work Experience → Projects Done → Contact. [Desktop](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2469-4) is now 1440 × 1352; [mobile](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2469-5) is 390 × 1572. Both full-page views hug their longer content.

### Content-Pending Boundary

No verified employment record was supplied during this revision. Work Experience therefore has ONE specimen per viewport with the explicit text `Content pending · structural specimen, not an employment record.` Its employer, employment role, period and responsibility values are plainly pending. This is a reusable layout, not a fictitious job or an accepted timeline. Project roles are labelled `Project role`; they are not employment claims. Each project has `Company / client · confirmation pending`. Projects Done includes the note `Authored case studies, including concept work.` Peruse remains a concept; the heading does not establish shipment of every project.

Visible project titles, summaries and detail-route mappings remain the authored values from the previous consumer register. Four project roles are Lead Product Designer; Wrike is Senior Product Designer, sourced only as project-level roles from the respective Markdown Project Identity sections. No employer, month/year, client relationship, owner or legal/IP claim was inferred. These draft fields are in Figma only; canonical project facts are unchanged.

### New And Changed Consumers

- Employment main component: `2476:95`, `Portfolio / Employment row · content pending`, outside the review wrapper on the SAME page. Fields: `Period#2476:2`, `Employer#2476:3`, `Employment role#2478:0`, `Responsibilities#2476:4`. Main child text IDs: period `2476:96`, employer `2476:106`, role `2478:109`, responsibilities `2476:107`; detail group `2476:105`.
- Work Experience sections: desktop `2476:109`, mobile `2476:119`. Employment specimen instances: desktop `2476:113`, mobile `2476:123`. Disclosure labels: `2476:112` / `2476:122`.
- One shared horizontal wrapping employment component, not desktop/mobile variants. Date lane is 140px, details minimum width is the 342px mobile content lane; desktop fits side by side, mobile wraps details underneath. Wrapped gap uses existing `layout/space/sm` (`VariableID:2466:70`). These lane widths are geometry constants. Screenshot inspection caught unsupported instance-direction behavior; the shared main component now owns WRAP, and saved mobile coordinates place the details at x=0, y=28 below the period.
- Existing project main `2470:2` gains two editable text properties: `Project role#2476:0` (`2476:81`) and `Company or client#2476:1` (`2476:86`). All ten existing row instance IDs and authored detail-route mappings are preserved.
- Existing Projects sections `2470:37` / `2470:105` and headings `2470:38` / `2470:106` now read Projects Done. Scope-note texts are `2476:108` / `2476:118`.
- Existing palette, 136 variables, 19 text styles, Foundations page, local arrows and link family are unchanged. Every new text consumes Body/SM or Emphasis and semantic primary/secondary colors; shared padding, gap and wrapped gap bind existing semantic layout aliases.

### Exact Missing Inputs For Content Completion

1. A CV or explicit employment chronology: actual employer name, employment role, start/end MONTH and YEAR (or confirmed Present), concise responsibilities. Clarify simultaneous roles/contract work where relevant; project roles cannot supply this data.
2. For EACH existing project, confirm the company/client relationship and which employment entry, if any, it relates to. A commercial/client, employee, independent/personal or other relationship must be supplied rather than inferred. Taxi additionally needs the canonical VK / CityMobil / CityMobile relationship resolved by Ivan. Peruse needs confirmed client/personal/concept context; no delivery status is assumed.
3. Any public product-owner or legal/IP ownership wording Ivan wants displayed must be explicitly supplied and distinguished from employer/client branding. It may be omitted if unnecessary. Confirm any delivery/launch claims before adding them; none is supplied by this draft.

### Revision Verification And Recovery

Final saved review subtree: 164 descendants — 24 frames, 74 editable texts, 48 instances, 18 vectors; zero image-filled nodes. Exact SF Pro shared styles, five typography bindings, semantic solid-paint/padding/gap bindings, local component dependencies and both frame bounds pass with zero findings. Desktop section order and mobile stacked employment reflow were read back; final composition screenshot was inspected for readable disclosure, text wrapping, alignment, clipping and overlap. Palette is unchanged from the recomputed 13.892:1 primary and 6.219:1 secondary contrast check. This verifies the structural draft, not the absent employment/client facts or browser behavior.

Final screenshot: `/Users/ivan/Documents/Codex/2026-10-27/portfolio-designer/outputs/port15/homepage-work-experience-projects-draft.png`. Exact before-state: Designer task directory `work/port15/r3-before.json`; primary creation/mutation register: `r3-changes.json`; final saved audit: `r3-complete-audit.json`; revision ledger: `r3-state.json`. Initial `r3-final-audit.json` is an intermediate readback, not the final result.

Rollback of THIS revision preserves the page and original views. Remove only the exact new Work Experience sections/specimens, scope notes and employment master; remove the two exact new project-main text nodes/properties after checking later consumers, then restore the two Projects heading texts/names and desktop FIXED 1440 × 1024 / mobile HUG geometry from `r3-before.json`. Restore prior Content child order recorded there. Do not use the earlier whole-new-page removal recipe to roll back this in-place revision, do not delete Foundations, and preserve later unrelated edits.

Figma mutation ownership is released with this structural checkpoint. PRODUCT receives the actual frames and exact missing inputs; PORT-15 stays open until the verified content is applied and Ivan accepts it. No new page, case-page design, code, source-project/Savi change, FRONTEND handoff or publishing occurred.

## Populated Homepage — Reviewed Career Content

DESIGNER applied the DATA QUALITY register on 2026-10-28 to the SAME page `2469:2` and views `2469:4` / `2469:5`. This supersedes the blanket employment-pending state above. The sole bounded content/provenance owner for this revision is [Portfolio Career And Project Source Register](../data-quality/portfolio-career-and-project-source-register.md); runtime corpus, external resume/chat, profile, routes and project assets remain unchanged. Ivan's design acceptance is pending.

[Desktop](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2469-4) is now 1440 × 2128; [mobile](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2469-5) is 390 × 2712. The same components retain desktop date/details columns and stacked mobile reflow. Work Experience remains above Projects Done; identity/headline, intro, existing five project titles/descriptions/roles, detail-route mappings and authored contact destinations are preserved.

### Career And Relationship Application

All nine register entries E1–E9 are present once per view, in register order. Company/display role/month-year period and permitted non-metric summary were applied exactly. Existing first employment instances were reused for E1; eight instances per view were added from the SAME main component `2476:95`, now named `Portfolio / Employment row`. Its properties and shared typography/paint/spacing remain unchanged. Date-lane geometry widened from 140 to 160px so month-level ranges remain legible; this is not a new type or spacing scale.

- Concurrent founder/independent work is retained. The section note now reads `Founder, independent, and team roles; some periods overlap.` The obsolete blanket employment/CV-pending disclosure is gone.
- E1 retains `Jun 2026 – Present` plus the explicit second line `Approx. start month`; it is not an exact founding/incorporation claim. Source confidence for every row remains in the register and row layer name; E4/E5/E9 remain résumé-supported rather than independently certified employment. No new source certainty is asserted.
- Employment versus project-role differences remain: VK / Citymobil employment Senior Product Designer versus Taxi project Lead Product Designer; LitRes employment UI Designer versus Litres project Lead Product Designer. No date was assigned to a project from its employment range.
- Six project-row consumers now display the three supported labels: Taxi `VK / Citymobil`, Litres `LitRes`, Wrike `Wrike`, each in desktop and mobile. Only DS Hito and Peruse retain `Company / client · confirmation pending`. The former is not assigned to VK, Veritonic or 3D Source by inference; Peruse remains a concept with unresolved relationship. Display attribution does not establish legal/IP ownership or corporate equivalence.
- Metabox appears only within the source-supported 3D Source summary; it is neither a new employer nor a sixth project route. Saavi and independent work remain career entries, without project-list expansion. No metrics, private contract details, education, language proficiency, job-search/personal details, headline replacement, individual Metabox coding or launch/reliability claims were imported.

| Register record | Desktop instance | Mobile instance |
| --- | --- | --- |
| E1 | `2476:113` | `2476:123` |
| E2 | `2480:111` | `2480:159` |
| E3 | `2480:117` | `2480:165` |
| E4 | `2480:123` | `2480:171` |
| E5 | `2480:129` | `2480:177` |
| E6 | `2480:135` | `2480:183` |
| E7 | `2480:141` | `2480:189` |
| E8 | `2480:147` | `2480:195` |
| E9 | `2480:153` | `2480:201` |

Updated supported project-row IDs: Taxi `2470:40` / `2470:108`; Litres `2470:52` / `2470:120`; Wrike `2470:64` / `2470:132`. All ten original project-row IDs remain. Row layer names identify source-register record/confidence rather than embedding a new source-of-truth table in Figma.

### Verification And Recovery

| Check | Result / limit | Evidence |
| --- | --- | --- |
| Exact reviewed content | Pass: all four career fields match E1–E9 in both views (18 instances); E1 has only the declared approximate-start note; six supported relationship updates match register; four unresolved labels remain only on Hito/Peruse | `work/port15/r4-final-audit.json` in Designer's task directory; register is canonical evidence |
| Editability, typography and layout | Pass: 260 descendants — 40 frames, 138 texts, 64 instances, 18 vectors; zero image fills; zero local-style/font/metric/paint/spacing/wrap-gap or parent-bounds findings | Saved API audit; no browser behavior claim |
| Foundation preservation | Pass: identical before/after fingerprint `9adf7f3f` over names/IDs/scopes/values of 136 variables and font/metric/binding properties of 19 styles; page count stays 12 | `r4-before.json` and `r4-final-audit.json`; typography remains SF Pro 14/20 |
| Visual composition | Pass after relocating the task-owned project master clear of the enlarged review: full desktop/mobile screenshot inspected; employment month ranges, role wrapping and full-page flow visible, no sibling overlap | Final `/Users/ivan/Documents/Codex/2026-10-27/portfolio-designer/outputs/port15/homepage-career-populated.png`, 1910 × 2712 |

The previously verified palette remains unchanged (primary 13.892:1 / secondary 6.219:1); the fingerprint verifies no color-variable change in this content pass. No app build, runtime retrieval/profile update, live-contact/keyboard/browser test, publishing or FRONTEND handoff occurred.

Exact before-state and changes: Designer task directory `work/port15/r4-before.json`, `r4-changes.json`, `r4-final-audit.json`, `r4-state.json`. Rollback restores only the two original E1/specimen instance properties/names and old disclosure/relationship values captured in the before-state, removes the exact sixteen newly added E2–E9 instance roots after checking later consumers, and restores period-master width 140px plus prior employment-master name/description. Project main `2470:2` was moved from canvas x=160/y=1800 to x=2230/y=308 to avoid sibling overlap with the taller review; its earlier position can be restored only if the view is also rolled back to the earlier height. Do not delete the page, original frames, masters, shared styles/variables or unrelated edits.

Figma writer is released. PRODUCT/Ivan receives the populated design for acceptance. The only remaining relationship inputs are DS Hito and Peruse if those metadata fields are to be populated; optional legal/IP wording can stay omitted. No renewed blanket CV request is needed.

## Confirmed Hito And Peruse Labels — Four-Text Delta

On 2026-10-28 DESIGNER applied Ivan's two direct-user context clarifications from the DATA QUALITY source register, evidence U. This supersedes only the remaining Hito/Peruse relationship-pending statements above. There is no relationship question left for this slice; design acceptance remains open.

| Existing consumer | Metadata after clarification | Text node |
| --- | --- | --- |
| Desktop Hito `2470:46` | Personal project | `I2470:46;2476:86` |
| Mobile Hito `2470:114` | Personal project | `I2470:114;2476:86` |
| Desktop Peruse `2470:58` | Company / client · Peruse | `I2470:58;2476:86` |
| Mobile Peruse `2470:126` | Company / client · Peruse | `I2470:126;2476:86` |

Only the four `Company or client#2476:1` instance-property values changed; no new nodes/page/style/token or component family. Saved texts match exactly, retain Body/SM 14/20 SF Pro and the same semantic secondary-color binding. All 18 career instances (nine per view) are unchanged before/after (snapshot fingerprint `af3e24d5`); Peruse's authored concept summary is identical in both views. No employment, period, launch/maturity, product ownership or legal/IP inference follows from these labels.

Saved full-view bounds/reflow checks pass with zero findings, no remaining confirmation-pending label and no overlapping construction sibling. Existing frames remain desktop `2469:4` 1440 × 2128 and mobile `2469:5` 390 × 2712, 260 descendants total, on page `2469:2` (12 file pages unchanged). Final full composition screenshot visually inspected: `/Users/ivan/Documents/Codex/2026-10-27/portfolio-designer/outputs/port15/homepage-project-labels-confirmed.png`.

Exact four-value before/after and validation: Designer task directory `work/port15/r5-labels-audit.json`. Bounded rollback restores only these four instance-property values from that before-state, after checking later edits; no deletion or broad restoration. Existing career records, routes, foundations, runtime corpus/profile/code and sources are preserved. Figma writer released to PRODUCT/Ivan review; no FRONTEND or publishing handoff.

## Contextual Header — Reviewable Interaction Study

PORT-15, 2026-10-28, DESIGNER → PRODUCT/Ivan acceptance. Ivan accepted the populated baseline before this delta; the new header interaction still needs his review. The demonstrated design gap was a single opening identity/contact composition with no reusable scrolled-home or project-context owner. DESIGNER now owns one page-chrome family on the existing page. Decision gate: reuse existing Portfolio primitives and semantic tokens, with one small repeating header composition; no external system or new styling/token layer.

[Header state board](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2486-191), [desktop native specimen](https://www.figma.com/proto/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2489-393&starting-point-node-id=2489%3A393&scaling=min-zoom), [mobile native specimen](https://www.figma.com/proto/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2489-474&starting-point-node-id=2489%3A474&scaling=min-zoom). These are labelled header studies, not full case pages.

### Saved Owners And Responsive Intent

- Same page `2469:2`; state board `2486:191` at x3190/y160, 1926 × 912. Header component set `2487:394` has only State=Home initial `2487:328`, Home compact `2487:348`, Project `2487:367`; shared contacts main `2487:306`. Editable set properties are `Role#2487:8` and `Project title#2487:12`.
- Desktop/mobile review instances: initial `2487:401` / `2487:424`; compact `2487:448` / `2487:470`; project `2487:493` / `2487:524`. The same family wraps at the 342px mobile lane rather than adding device variants. Project specimen uses the existing Taxi Aggregator Support Workspace title.
- Existing homepage views `2469:4` / `2469:5` now consume initial instances `2487:563` / `2487:583`, inserted first in existing Content parents `2470:9` / `2470:78`. Source headers `2470:10` / `2470:79` are hidden, intact rollback backups; only one header is visible per view. Desktop remains 1440px wide, now 2132px high; mobile remains 390px wide, now 2736px high. The +4/+24px changes come from 44px contact targets, not content edits.
- Preserve each actual before-state role verbatim: desktop `Product designer | Product builder`; mobile `Product designer`. No headline normalization is implied by this interaction task.
- Opening header content is 44px desktop / 108px mobile. Persistent solid chrome is 60px desktop, 88px mobile compact, 112px mobile project, including 8px top/bottom padding; desktop content lane is centered at 800px, mobile has 24px side insets. Native study bodies reserve the measured chrome height plus the existing 24px section gap before their first heading. Future implementation must also keep focused/anchored content clear of sticky chrome.
- Home compaction uses the opening identity/role area leaving its initial position as the content boundary; returning to the opening restores the initial state. No arbitrary runtime pixel threshold, direction-based hiding or decorative motion is specified. Project identity persists throughout case scroll.
- All three authored contact actions live on their 44px-high target frames `2487:307`, `2487:314`, `2487:321` (57/77/68px wide). Project Back action lives on target `2487:369`, 44px high (54px default / 62px focus). Nested links retain local hover/focus styling and local left-arrow icon `2459:56`; duplicate nested click actions were removed. Focus examples are explicit visual states, not proof of keyboard focus traversal. No auto-focus.
- Reused: existing Body/SM, Emphasis and Link styles, local internal/external/focus link variants, arrow components and semantic background/text/link/layout aliases. Foundations remain 136 variables / 19 Portfolio text styles; the file also retains 14 unrelated pre-existing text styles. No shared variable/style values were edited.

### Native Prototype Evidence And Limits

Desktop frames Home `2489:393` → Project `2489:428`; mobile `2489:474` → `2489:509`, each 640px tall. All four save `overflowDirection=VERTICAL`, `numberOfFixedChildren=1`, with the solid header as the last absolute-positioned child. Chrome IDs: desktop `2489:396` / `2489:431`, mobile `2489:477` / `2489:512`. Original Flow 1 at `2469:3` remains; four named study starts were appended.

Native source-case links `2489:422` / `2489:503` save ON_CLICK → NODE/NAVIGATE to their project frames, `transition=null`. Project Back target instances inherit ON_CLICK → BACK. Explicit study fallback links `2489:462` / `2489:543` navigate to their corresponding compact-home specimen. No preserve/reset-scroll setting was accepted or saved by this MCP action surface; optional reset flags were rejected, so no such field is claimed.

The actual Figma web player was exercised on desktop and mobile: scroll the compact-home specimen, open the project, scroll the project, then click Back. The fixed name/contact or project-title/contact header stayed visible; Back returned to the originating compact-home frame with the same visible origin marker and scrolled context. A mobile Back click above its text line also worked inside the expanded target. The explicit mobile fallback navigation was exercised. This does not establish pixel-exact scroll restoration, automatic direct-entry detection or website browser-history behavior. The player inherited scroll position when entering a project in this study; project-entry-at-top remains an implementation intent rather than a verified prototype setting.

Automatic opening → compact scroll-triggered switching is not encoded: the available reaction Trigger API has no scroll trigger. Initial/compact states and the return-to-top rule are shown in the state board; the native specimens intentionally start compact. The web player reported “Some missing fonts were replaced”; its screenshots demonstrate interaction/context, while the inspected Figma state-board screenshot and saved SF Pro style bindings own typography/layout evidence. No font substitution was written into the file.

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Source preservation | Same nine career records and five project contexts in both existing views | Pass: 28 instance ID/name/property records retain before/after fingerprint `ab0eb844`; routes and contacts unchanged | `header-skeleton.json`, `header-final-readback.json` |
| Shared dependencies and geometry | Six saved header states, desktop 800px/mobile 342px content lanes | Pass: no recorded style/paint/spacing/local-dependency/bounds findings; long title, contacts and focus remain visible | `header-audit.json`; `contextual-header-states.png` inspected |
| Native saved settings | Four 640px scroll specimens | Pass: vertical overflow, one fixed solid header, native NAVIGATE/BACK and URL targets read back | `header-final-readback.json`, `header-target-actions.json` |
| Native player interaction | Desktop 1440px/mobile 390px Figma frames | Pass for fixed chrome, source-case navigation and Back with visible origin context; mobile target padding and explicit fallback exercised | `prototype-desktop-home-scrolled.png`, `prototype-desktop-project-scrolled.png`, `prototype-desktop-back.png`; corresponding mobile captures |
| Scroll switching and exact restoration | Available Figma MCP/player | Declared limit: automatic switching unsupported; pixel-exact restoration, direct-entry detection and website behavior not established | State-board transition specification and native action read-back |
| Keyboard/runtime/release | Figma-only design scope | Not run: keyboard traversal, browser app implementation, build, deployment and Global QA Acceptance are outside this design checkpoint | No runtime/release claim |
| Workspace/document hygiene | Existing shared dirty checkout | `hygiene:check` fails on pre-existing root `.DS_Store`; unrelated generated state was preserved. Added Markdown has no trailing whitespace | Hygiene command output; focused document check. No global Implementation DoD pass claimed |

### Bounded Recovery And Handoff

Designer task root: `/Users/ivan/Documents/Codex/2026-10-27/portfolio-designer/`. Exact before-state is `work/port15/header-before.json`; skeleton and complete creation registers are `header-skeleton.json`, `header-created.json`, `header-prototype-created.json`. Final target-action correction and saved audit are `header-target-actions.json`, `header-final-readback.json`; consolidated ownership/recovery ledger is `header-state.json`. Review screenshot: `outputs/port15/contextual-header-states.png`. Prototype captures share that output directory.

Rollback only this header delta, after checking later consumers/edits: remove the two exact applied initial instances, restore the original headers' recorded visibility and parent order, and let the existing auto-layout reflow. Remove the exact task-owned study/prototype roots and unused header/contact masters; restore the recorded original flow array only after preserving later additions. Do not delete the page, original full views, career/project instances, Foundations or unrelated changes. Old hidden headers remain specifically for this bounded recovery.

DESIGNER releases the Figma writer to PRODUCT/Ivan review. PORT-15 remains In progress / Acceptance / PRODUCT until Ivan accepts or requests a bounded header revision. No FRONTEND, case-page, source fact, runtime corpus, website code, publishing or release handoff is admitted.

### Focus-Outline Correction After PRODUCT Review

PRODUCT identified a same-scope defect in the first state-board screenshot: Back focus on desktop/mobile and the separate Email focus sample showed top/bottom strokes only. Saved-state inspection confirmed the existing link focus masters use a 1px OUTSIDE outline; new same-width target wrappers had `clipsContent=true`, and the project Context identity wrapper also clipped the left edge. The earlier bounds check did not inspect outline render bounds, so its broad focus-visibility claim was incomplete.

DESIGNER changed only `clipsContent` from true to false on header-owned frames `2487:307`, `2487:314`, `2487:321`, `2487:369`, `2487:368` and the standalone focus target `2487:556`. Component consumers inherit the correction. No new node, dimension, spacing, text, action, shared focus master/style/token, page or route was changed.

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Focus render bounds | Desktop/mobile Back and standalone Email in saved Figma state | Pass: both side outsets are 1px; zero clipping ancestors. Back link 62 × 24 renders 64 × 26; Email 65 × 24 renders 67 × 26 | `header-focus-audit.json` |
| Visual outline | Existing project review row and Email focus row | Pass: all four outline sides visible in fresh screenshots; final state board inspected | `contextual-header-project-focus.png`, `contextual-header-email-focus.png`, `contextual-header-focus-fixed.png` |
| Target and shared-style preservation | Six changed wrapper frames, existing focus masters `2459:182` / `2459:194` | Pass: all hit targets remain 44px high, widths/actions unchanged; existing OUTSIDE stroke weight/paint/binding and master geometry identical | `header-focus-before.json`, `header-focus-fix.json`, `header-focus-audit.json` |
| Content/native settings | Existing full views and four prototype frames | Pass: same 28-record fingerprint `ab0eb844`, frame/chrome sizes, fixed/overflow settings and flows. Prior interaction evidence still applies; no actions changed | `header-focus-audit.json` |
| Workspace hygiene | Shared checkout before return to review | Still fails only on the existing root `.DS_Store`; no unrelated cleanup or global DoD pass claimed | Repeated required `hygiene:check` |

The current `contextual-header-states.png` now contains the corrected screenshot; the prior image is retained only in `work/port15/header-focus-before.png`. Exact correction before-state/change/audit files and the consolidated `header-state.json` extend the existing recovery ledger (439 created IDs unchanged; 23 unique modified IDs). To roll back this correction alone, restore only those six recorded clipping flags after checking later edits. The Figma writer returns to PRODUCT/Ivan review; the original scroll-switching/font/exact-restoration limits and Figma-only boundary remain.

## External Company Links — Project Metadata Delta

PORT-15, 2026-10-28, DESIGNER → PRODUCT/Ivan review. The existing company attribution was one plain text field, so it had no independently owned external destination. DESIGNER extended the existing project-row seam `2470:2`, reusing the local external-link/arrow/hover/focus family and semantic tokens. No new component family, page, library, palette or runtime owner was introduced.

The same [desktop Projects Done](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2470-37) and [mobile Projects Done](https://www.figma.com/design/qnmQs8GxVjZQFKbGU4tR08/Cheremisin.co.uk?node-id=2470-105) now contain four company links each:

| Clickable label | Exact saved URL | Desktop target | Mobile target |
| --- | --- | --- | --- |
| VK | `https://vk.com/` | `I2470:40;2500:494` | `I2470:108;2500:494` |
| LitRes | `https://www.litres.ru/` | `I2470:52;2500:494` | `I2470:120;2500:494` |
| Peruse | `https://www.peruse.ml/` | `I2470:58;2500:494` | `I2470:126;2500:494` |
| Wrike | `https://www.wrike.com/` | `I2470:64;2500:494` | `I2470:132;2500:494` |

Only VK is linked within its attribution; `/ Citymobil` stays plain. Both Hito rows retain plain `Personal project`, without a visible external target or URL. Peruse's concept summary and all existing project titles, descriptions and contribution roles remain unchanged.

### Canonical Seam And Geometry

New wrapping metadata frame `2500:493` reuses the original company text `2476:86` as a prefix or complete plain relationship. It contains optional target `2500:494`, existing external-link instance `2500:495`, and plain suffix text `2500:513`. Row property `Show external company#2500:0` defaults false; `Company context#2500:1` defaults empty. The existing `Company or client#2476:1` property remains the owner of prefix/plain text; a linked label uses the nested link's existing Label property. The eight URL reactions are overrides on the exact target instances, not the generic external-link or row master. The source target is hidden and has no URL action.

Targets save ON_CLICK → URL with `openInNewTab=true`, one action each. Default target sizes are VK 44 × 44, LitRes 62 × 44, Peruse 67 × 44 and Wrike 59 × 44. Metadata uses existing 4px semantic gaps and supports wrapping in the same 800px desktop / 342px mobile lane; prefix/suffix remain noninteractive. Target/lane clipping is false to preserve the existing 1px OUTSIDE focus stroke.

Four linked metadata rows per view increase their row height by 24px; Hito's height is unchanged. Existing full views remain `2469:4` / `2469:5`, now 1440 × 2228 / 390 × 2832 (+96px each). Projects sections are 800 × 772 / 342 × 872. Header chrome, career geometry/content above Projects Done and the twelve-page file structure are preserved.

### Verification And Honest Limits

| Check | Scenario / environment | Result | Evidence |
| --- | --- | --- | --- |
| Exact URLs and isolation | Eight saved targets across existing views | Pass: exact accepted URL and one native URL action per target; no nested click action, source-target URL or shared-master change; Hito plain twice | `company-links-final-audit.json` |
| Project facts and case intent | Ten existing project rows | Pass: all title trees and five route mappings in row layer names unchanged, plus all descriptions/roles; company context represented as prefix + linked label + plain suffix | Before/final comparison |
| Career/header/foundation preservation | Same page and previously completed header study | Pass: identical career `c3a2baa9`, header `1060dc8c`, foundation `ff02d51b`, external-master `9a7ebd1a` fingerprints; same 18 career instances, 136 variables and 19 Portfolio styles | Before/final fingerprints use this delta's documented snapshots |
| Focus geometry | All eight company instances temporarily set to existing Focus variant | Pass: complete 1px side outsets, zero clipping ancestors or title-target overlap; targets ≥44 × 44. All instances restored to Default after captures | `company-links-focus-audit.json`; desktop/mobile focus screenshots inspected |
| Default composition | Desktop 800px / mobile 342px Projects sections | Pass: zero recorded metadata bounds findings; default and focus screenshots inspected for reflow/outline visibility | `company-links-desktop.png`, `company-links-mobile.png`, corresponding `-focus.png` captures |
| Prototype/reachability boundary | Figma saved state; Product's destination preflight | Company URL clicks were not exercised in the native player. Existing internal case routes remain layer-name design intent, with no ON_CLICK case-page action in these full views before/after. Wrike/Peruse fetched in Product preflight; LitRes tool403 / VK tool block remain availability limits, not broken-link findings or permission to substitute URLs | Current revision contract; saved title/action readback |
| Workspace hygiene | Shared checkout before return to review | Existing root `.DS_Store` still fails `hygiene:check`; no unrelated cleanup, build/runtime/release or global DoD claim | Required hygiene command; focused Markdown whitespace check |

Exact local task evidence under `/Users/ivan/Documents/Codex/2026-10-27/portfolio-designer/work/port15/`: `company-links-before.json`, `company-links-created.json`, `company-links-layout-correction.json`, `company-links-focus-audit.json`, `company-links-final-audit.json`, `company-links-state.json`; the accepted construction script includes the final text-auto-sizing correction. Screenshots are under the corresponding `outputs/port15/` directory.

Rollback only this delta after checking later consumers: restore the eight original company-property values from before-state; move original metadata text `2476:86` back to its recorded direct row-child position and sizing/reference settings; remove the exact new metadata frame and its added children plus the two new row properties. Their inherited target overrides disappear with that source seam. Preserve original project rows/title nodes, Hito, career/source facts, headers/prototypes, focus correction, Foundations, current file/page and unrelated user changes. No `src/lib/projects.ts`, source corpus/profile, website copy, publishing or FRONTEND handoff occurred. Figma writer released; Ivan's design review keeps PORT-15 open.
