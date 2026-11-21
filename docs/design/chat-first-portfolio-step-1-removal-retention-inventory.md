# Chat-First Portfolio Step 1: Removal And Retention Inventory

## Status

Step 1 complete

## Parent Plan

[`docs/plans/active/chat-first-portfolio-ux-cleanup.md`](../plans/active/chat-first-portfolio-ux-cleanup.md)

## Owner And Boundary

Owner: `DESIGNER`

Product remains the canonical routing and source-of-truth owner.

This artifact classifies the current presentation and its source owners. It does not authorize application-code changes, source deletion, route removal, asset removal, content rewriting, UI design, or Step 2 work.

## Classification Rules

- `RETIRE`: the pattern belongs only to the deprecated terminal, ASCII, dossier, page-first, or one-active-project presentation model.
- `PRESERVE BEHAVIOR`: the styling or metaphor may disappear, but the underlying behavior is required by the future Chat-First Portfolio.
- `PRESERVE CONTENT OR EVIDENCE`: the item contains authored narrative, project data, stable URLs, screenshots, videos, contact information, manifesto content, or another source that must survive.
- `DEFER DECISION`: classification requires a Product, Data Quality, architecture, design-system, or lifecycle decision.

`RETIRE` always means retire from the future active presentation. It never means delete the current source file.

## Root-Cause Decision

The obsolete owner is the current presentation hierarchy, not the portfolio corpus.

The future product must stop treating the portfolio as an indexed terminal dossier that visitors traverse page by page. It must retain the existing project routes and authored evidence as the deep-read and proof layer behind question-first discovery.

Several current components are mixed owners: they combine deprecated dossier styling with required navigation, media, theme, fallback, or disclosure behavior. These are classified as `PRESERVE BEHAVIOR`, with an explicit requirement to separate the behavior from the deprecated presentation before any later cleanup removes the old component family.

## Route-By-Route Coverage

| Route / source owner | Current visitor-facing purpose | Classification | Root-cause reasoning | Must survive | Dependency or risk | Future functional owner |
| --- | --- | --- | --- | --- | --- | --- |
| `/`; `src/app/page.tsx`, `src/components/layout/HomePage.tsx` | Portfolio introduction, active project, summary, about, contact | PRESERVE CONTENT OR EVIDENCE | The current section order is page-first, but the identity, authored summary/about copy, and contact content are portfolio sources | Stable home URL; Ivan identity; summary/about copy pending content validation; contact destinations | Future discovery hierarchy is not defined until Step 2; do not preserve current section order by default | Product for surface purpose; Designer for later hierarchy; Data Quality/Copy for content truth |
| `/manifesto`; `src/app/manifesto/page.tsx`, `src/components/ManifestoContent.tsx`, `src/app/manifesto/metadata.ts` | Authored principles and working beliefs with avatar and route metadata | PRESERVE CONTENT OR EVIDENCE | Dossier framing is obsolete, but the manifesto is authored content and a stable destination | `/manifesto`; all manifesto sections; avatar; route metadata subject to later metadata normalization | Text may later require Copy review, but no statement is authorized for deletion here | Product/Copy for content; Frontend for future presentation |
| `/projects/taxi-aggregator-support-workspace`; route page | Complete Taxi/VK support-workspace narrative, tabs, interactive preview, images, videos, outcome statements, contact, navigation | PRESERVE CONTENT OR EVIDENCE | This is the deepest current case study and a primary evidence source; page-first presentation does not invalidate its authored material | Stable URL; all route-local narrative; stats and outcomes pending Data Quality validation; interactive preview; all referenced `/vk/*` media; project links | VK/CityMobile identity, claims, metrics, and asset evidence status remain unresolved | Data Quality for facts/evidence; Product for publication; Frontend for later surface |
| `/projects/ds-hito`; route page and metadata | Design-system case study, semantic-token narrative, demos, gallery, code example, project metadata | PRESERVE CONTENT OR EVIDENCE | The case-study shell may change, but route content and evidence must remain available | Stable URL; narrative; demo and gallery content; `/ds-hito/*` and `/hito/*` assets; metadata | Evidence strength and exact claim-to-asset mapping require Data Quality | Data Quality/Product; Frontend later |
| `/projects/litres`; route page | Internal-tools narrative across process, results, build, gallery, video, outcomes, contact | PRESERVE CONTENT OR EVIDENCE | Tabbed page presentation is not the source-of-truth decision; authored material and media remain corpus candidates | Stable URL; all authored sections; route-local stats pending validation; `/litres/*` assets; technologies and links | Some content may be weaker than other routes; trust and completeness are Data Quality/Copy decisions | Data Quality/Copy/Product; Frontend later |
| `/projects/peruse`; route page | AI document-workspace narrative, process/results/build sections, gallery, context images, outcomes | PRESERVE CONTENT OR EVIDENCE | The route contains authored project material even though alias and claim readiness are unresolved | Stable URL; all authored sections; `/peruse/*` assets; project references and technologies | Peruse/Peruse.ml canonical identity and evidence status are unresolved | Data Quality/Product; Frontend later |
| `/projects/wrike`; route page | Shorter planning/workload case study with narrative, project images, contact, navigation | PRESERVE CONTENT OR EVIDENCE | Shorter depth does not authorize removal; it remains a route-backed authored source | Stable URL; narrative; `/wrike/*` assets; project references and technologies | Content depth and evidence readiness require Data Quality/Copy assessment | Data Quality/Copy/Product; Frontend later |

Route coverage result: `/`, `/manifesto`, and all five project routes have explicit preservation boundaries. No active route is classified `RETIRE`.

## Component And Style Ownership Inventory

### Global shell, headers, and home discovery

| Pattern / current source owner | Current visitor-facing purpose | Classification | Root-cause reasoning | Must survive | Dependency or risk | Future functional owner |
| --- | --- | --- | --- | --- | --- | --- |
| Root application shell; `src/app/layout.tsx` | Global HTML, language, metadata, fonts, theme provider, home header mounting | PRESERVE BEHAVIOR | The shell is not itself the deprecated metaphor; it owns runtime-wide behavior mixed with current presentation choices | HTML shell; language; metadata ownership; global provider boundary; stable child-route rendering | Font selection is not preserved by this classification; metadata ownership is currently uneven | Architecture/Frontend |
| Home header behavior; `src/components/layout/Header.tsx` | Fixed home navigation, manifesto link, section commands, theme toggle | PRESERVE BEHAVIOR | Terminal labels and section-first hierarchy should disappear, but global navigation and theme control remain required behaviors | Reachable home/global navigation; manifesto destination; theme control if retained by Product; keyboard-operable controls | Fixed positioning may compete with future composer; exact navigation IA is Step 2 | Designer for later hierarchy; Frontend for behavior |
| Home route/index language in the global header; `[00] Index`, numbered commands | Presents the home page as a terminal index | RETIRE | This language exists only to reinforce the deprecated file/terminal metaphor | Nothing beyond the underlying destinations and actions | Must not remove links when retiring labels | Designer |
| Home section ownership; `src/lib/home-shell.ts` `HOME_SECTION_IDS`, `HOME_NAV_ITEMS` | Defines featured, summary, about, and contact anchors and smooth-scroll commands | PRESERVE BEHAVIOR | Section IDs and scrolling are functional, but using page-section commands as primary discovery is obsolete | Reachability of about, contact, projects, and manifesto; valid anchors while current UI remains active | Future IA may replace these anchors; do not delete behavior before replacement exists | Designer/Product later; Frontend implementation |
| Page-section navigation as primary discovery; `HOME_NAV_ITEMS`, header commands, `HomeHeroActions` | Makes visitors browse fixed homepage sections and one project | RETIRE | The product is now question-first with browsing as an alternative, not a sequence of terminal commands | Destinations remain preserved separately | Retirement requires an accepted replacement hierarchy; not authorized as immediate code removal | Designer |
| Home hero actions; `src/components/layout/HomeHeroActions.tsx` | Opens manifesto or scrolls to the active project | PRESERVE BEHAVIOR | The current priority is obsolete, but direct route actions and in-page navigation are reusable behaviors | Working links/buttons and focus behavior | CTA priority belongs to later hierarchy work | Designer/Product |
| One-active-project homepage framing; `src/components/Projects.tsx`, `activeProjects`, hero/status copy in `HomePage.tsx` | Shows only the Taxi project and explains that only one case study is active | RETIRE | It is an interim publication constraint that contradicts multi-project conversational discovery | The Taxi project card, project URL, summary, company link, and preview media remain preserved elsewhere | Do not infer that all projects are publication-ready; Product/Data Quality must decide future visibility | Product/Data Quality |
| Home identity, summary, about, and contact copy; `src/components/layout/HomePage.tsx` | Explains Ivan's work and provides contact paths | PRESERVE CONTENT OR EVIDENCE | These are authored portfolio/contact sources even though their placement will change | All copy and contact values until reviewed by the relevant owner | Claims remain subject to content validation | Copy/Data Quality/Product |
| Inactive home signal; `src/components/layout/HomeSignal.tsx` | ASCII face, rotating file/index state, scramble prompt and browsing instructions | RETIRE | The component is a pure expression of the deprecated ASCII terminal metaphor and is not on the canonical active home import path | No behavior is required; its textual project/manifesto destinations are already owned elsewhere | Source deletion is not authorized; confirm reachability before any future cleanup | Frontend after Product reconciliation |
| Inactive typewriter/caret prompt; `src/components/TypewriterTagBuilder.tsx` and legacy-home usage | Types focus-area phrases into a fake input with a blinking caret | RETIRE | It is decorative prompt theatre from an inactive presentation family, not a required input behavior | The phrases may only survive if separately validated as content; this audit does not promote them | Source is not active; do not mistake retirement for deletion or trusted capability data | Data Quality for phrases; Frontend for later cleanup |

### Project and manifesto shell

| Pattern / current source owner | Current visitor-facing purpose | Classification | Root-cause reasoning | Must survive | Dependency or risk | Future functional owner |
| --- | --- | --- | --- | --- | --- | --- |
| Project shell; `src/components/ProjectPageShell.tsx` | Mounts project/manifesto header and page content | PRESERVE BEHAVIOR | The shell provides shared route composition; its current visual assumptions are replaceable | Shared route shell; project and manifesto rendering; route-specific content | Future global/project context ownership is a later IA decision | Architecture/Frontend |
| Project/manifesto header behavior; `src/components/ProjectHeader.tsx` | Links home and manifesto, displays current route, switches theme | PRESERVE BEHAVIOR | Navigation and current-context communication remain necessary; `Index`, `Readme`, and `Case file` language does not | Working home/manifesto links; route-context indication; theme control if retained | Future project scope may require a different context indicator; exact behavior is Step 2+ | Designer/Frontend |
| Project header terminal labels; `[00] Index`, `[M] Readme`, `[P] Case file` | Frames routes as files in a dossier | RETIRE | These labels belong only to the deprecated metaphor | Underlying destinations and current-route meaning | Retire labels without losing orientation or accessible names | Designer |
| Fixed project tab bar; `src/components/TabSection.tsx` | Switches among Results, Process, Build and scrolls content into view | PRESERVE BEHAVIOR | Tab styling, bracket labels, fixed placement, and motion may disappear; access to authored sections is required | Section selection; hidden-tab rules; keyboard semantics; preserved content; sensible focus/scroll behavior | Current ARIA panel wiring and fixed placement need future QA; whether tabs remain the best structure is a later design decision | Designer for later structure; Frontend |
| Bracketed tab labels; `[R]`, `[P]`, `[B]` | Makes project sections feel like terminal commands | RETIRE | Decorative shorthand is not required to understand or operate the sections | Full Results, Process, and Build labels | Do not retire the content selection itself | Designer |

### ASCII dossier primitives and framing

| Pattern / current source owner | Current visitor-facing purpose | Classification | Root-cause reasoning | Must survive | Dependency or risk | Future functional owner |
| --- | --- | --- | --- | --- | --- | --- |
| Dossier framing family; `DossierPage`, `DossierFrame`, `DossierBar` in `src/components/ascii/Dossier.tsx` | Gives every route and section file/case-record framing | RETIRE | These primitives exist specifically to express the deprecated dossier model | No framing contract; child content and behaviors remain owned by their callers | Many callers mix content with these wrappers; future removal must extract children safely | Designer specifies boundary; Frontend later |
| Dossier section headings; `DossierSectionHeading` | Provides label, title, description, and optional actions | PRESERVE BEHAVIOR | The dossier styling is obsolete, but a reusable semantic section-heading relationship is still necessary | Heading hierarchy; description association; optional actions | Future markup must keep correct heading levels | Design System/Frontend |
| Dossier metadata strip; `DossierMetaStrip` | Presents role, client, stats, and other metadata in a repeated structure | PRESERVE BEHAVIOR | Dashed terminal styling can disappear; labeled metadata relationships are required | Labels and values; project role/client/stat content pending validation | Some values are claims and require Data Quality | Data Quality for values; Design System/Frontend for structure |
| Dossier media viewport; `DossierMediaViewport` | Frames image/video with label, title, and note | PRESERVE BEHAVIOR | Case-file styling is obsolete, but evidence needs media, caption/context, and disclosure slots | Media rendering slot; title/caption/note semantics; predictable evidence grouping | Existing labels do not establish trust; future evidence status comes from Data Quality | Data Quality + Designer; Frontend |
| Dossier tag list; `DossierTagList` | Displays technologies in bracketed terminal form | PRESERVE BEHAVIOR | Brackets are obsolete; grouped capabilities/technologies remain functionally useful when trusted | The tag list relationship and source values pending validation | Technologies are not automatically trusted capabilities | Data Quality; Design System/Frontend |
| ASCII asset artwork and fallback copy; `src/components/ascii/AsciiAssetFallback.tsx` | Replaces missing/broken media with ASCII face and `:: kind / label` text | RETIRE | The face and terminal copy are pure deprecated presentation | Nothing from the artwork or syntax | The existence of a non-broken empty/error state is preserved separately | Designer |
| Missing-media fallback behavior; callers in `Projects`, `ProjectHero`, `DemoSection`, `ContextImageSection`, `GalleryItem`, `ImageContainer` | Prevents broken media from appearing as an empty browser failure | PRESERVE BEHAVIOR | Graceful failure is required even though ASCII treatment is not | Detect absent/failed media; show accessible non-ASCII fallback; keep layout stable; do not fabricate evidence | Fallback must distinguish missing source from unverified evidence | Frontend; Data Quality for evidence status |
| Decorative route/section indexes, brackets, `::`, dashed metadata separators; `DossierBar`, `DossierTagList`, `AsciiAssetFallback`, headers, `terminal-*` CSS | Reinforces terminal/document hierarchy | RETIRE | These marks communicate the old metaphor rather than necessary product state | Semantic labels and relationships only | Ensure status is still perceivable without decorative syntax | Designer |

### Case-study composition and authored material

| Pattern / current source owner | Current visitor-facing purpose | Classification | Root-cause reasoning | Must survive | Dependency or risk | Future functional owner |
| --- | --- | --- | --- | --- | --- | --- |
| Project hero behavior; `src/components/ProjectHero.tsx` | Shows project title, description, role/client metadata, paired theme-aware previews | PRESERVE BEHAVIOR | Dossier intro styling is obsolete, but project identity, metadata, and primary evidence remain necessary | Title/description; role/client relationship; primary media; theme-aware selection; error handling | Values and images require trust classification; overlapping presentation and content must be separated | Data Quality + Designer; Frontend |
| Shared narrative sections; `ProjectOverview`, `ProblemSection`, `OptimizationSection`, `ProjectBento`, `ContextImageSection`, `DemoSection`, `CodeSnippet`, `UIDemo`, `FigmaPreview`, `CityMobileInteractivePreview` | Renders project context, problems, contributions, outcomes, demonstrations, and supporting media | PRESERVE CONTENT OR EVIDENCE | These components host authored route content and demonstrations even when their current wrappers and motion are deprecated | All passed narrative, stats, item lists, demonstrations, media references, and links pending owner validation | Mixed owners: presentation wrappers and motion are not preservation requirements; claims/evidence require audit | Data Quality/Copy for content; Frontend for later rendering |
| Project footer behavior and content; `src/components/ProjectFooter.tsx` | Shows team roles, technologies, email/social links, and booking CTA | PRESERVE CONTENT OR EVIDENCE | The dossier footer styling may disappear, but team/technology sources and contact destinations must survive | Team roles and technologies pending validation; email; LinkedIn; GitHub; Instagram; Calendly | Contact availability and correctness should be confirmed by Product; technologies are evidence claims | Product/Data Quality |
| Project metadata records; `src/lib/projects.ts` `Project` and `projects` | Provides titles, summaries, media paths, technologies, URLs, company data, publication flags | PRESERVE CONTENT OR EVIDENCE | This is a current project-data source and compatibility seam, not merely presentation | All records and fields until migrated or validated; stable project URLs; company destinations; preview refs | Product later established `content/portfolio/*` as canonical Markdown grounding; runtime adaptation remains Architecture-owned | Data Quality/Architecture |
| `isActive` and `activeProjects` publication filter; `src/lib/projects.ts`, `src/components/Projects.tsx` | Restricts home and pager to one project | RETIRE | The filter encodes the one-active-project presentation model, not the future discovery model | The underlying project records and routes | Product must decide future publication readiness; do not expose all projects merely because the filter is retired conceptually | Product/Data Quality |
| Route-local authored narratives, outcomes, stats, team arrays, technologies, gallery descriptions | Supplies the actual case-study stories and claims | PRESERVE CONTENT OR EVIDENCE | Presentation cleanup cannot discard corpus candidates | Every authored string and structured fact until Data Quality/Copy review | Preservation does not mean every claim is trusted or publishable | Data Quality/Copy |
| Route and social metadata; root, home, manifesto, DS Hito metadata owners | Provides document titles, descriptions, social previews, favicon references | PRESERVE CONTENT OR EVIDENCE | Stable discovery metadata and preview assets are content-bearing sources | Existing metadata and media references until owner review | Metadata coverage is inconsistent across routes; normalization is not Step 1 | Product/Architecture/Data Quality |

### Media, gallery, theme, and navigation behavior

| Pattern / current source owner | Current visitor-facing purpose | Classification | Root-cause reasoning | Must survive | Dependency or risk | Future functional owner |
| --- | --- | --- | --- | --- | --- | --- |
| Canonical media files; `public/ds-hito/*`, `public/hito/*`, `public/litres/*`, `public/peruse/*`, `public/vk/*`, `public/wrike/*`, `public/avatar-256.png` | Screenshots, demonstrations, videos, primary project previews, avatar | PRESERVE CONTENT OR EVIDENCE | Files are portfolio sources even when their evidence value is unknown | All canonical non-` 2` images and videos; no deletion authorized | File existence is not proof; captions, project/task mapping, and evidence status require Data Quality | Data Quality for status; Frontend for rendering |
| Theme-aware media selection; `ProjectHero`, `ProblemSection`, `DemoSection`, `ContextImageSection`, `GalleryItem`, project routes | Selects light/dark asset variants for the active theme | PRESERVE BEHAVIOR | The paired media may show real theme states; the selection behavior is independent of dossier styling | Correct light/dark pairing; fallback when one variant is unavailable | Some pairs are incomplete or differently named; asset mapping needs validation | Frontend + Data Quality |
| Gallery sequencing; `src/components/GallerySection.tsx`, `GalleryItem.tsx` | Lists evidence items, opens a selected item, and moves previous/next | PRESERVE BEHAVIOR | Sequential evidence inspection remains useful; dossier framing and decorative entrances do not | Item order; open/close; previous/next; captions/descriptions; image/video rendering | Current state is duplicated per item and should not be treated as a future architecture decision | Designer later; Frontend |
| Fullscreen evidence viewer; `src/components/Lightbox.tsx` | Enlarges images/videos, locks background scroll, supports Escape and arrow navigation | PRESERVE BEHAVIOR | Fullscreen inspection is required evidence behavior, not terminal presentation | Dialog semantics; open/close; scroll containment; Escape; previous/next; captions; image/video support | Focus trap and focus restoration are not demonstrated in current source; future accessibility acceptance required | Frontend; QA later |
| Project pager behavior; `src/components/ProjectNavigation.tsx` | Links previous/next project and home; supports left/right arrow navigation | PRESERVE BEHAVIOR | Project traversal and keyboard access remain useful, but file-navigation framing and active-only filtering are obsolete | Stable project links; explicit previous/next choices if retained; home return; typing-surface keyboard guard | Global arrow shortcuts may conflict with future chat input and browser expectations; later Designer decision required | Designer/Product later; Frontend |
| Terminal-style pager presentation; `DossierBar index="99"`, “record” cards, file traversal language | Makes projects feel like adjacent dossier files | RETIRE | This is presentation-only terminal/case-file language | Underlying project traversal behavior and links | Must not remove browser-reachable project alternatives with the framing | Designer |
| Stable project URLs and framework navigation; route folders, `Link`, `router.push` | Makes project and manifesto states addressable and supports browser history | PRESERVE BEHAVIOR | Stable routes are required for evidence, sharing, and future return-to-conversation behavior | Every existing route path; normal link semantics; browser Back compatibility | Exact conversation return-state lifecycle is Step 7 and is not resolved here | Product/Architecture/Frontend |
| Current browser Back behavior | Returns according to the Next.js/browser history created by links and router pushes | PRESERVE BEHAVIOR | Native history semantics are required even though future contextual restoration is not yet designed | Do not replace route navigation with non-addressable panels; preserve normal Back baseline | Exact scroll/transcript restoration is deferred to later plan steps | Designer later; Frontend |
| Theme switching; `ThemeProvider`, global and project header toggles | Follows system theme and lets visitors switch light/dark | PRESERVE BEHAVIOR | Theme switching is independent of the terminal metaphor and currently controls both UI and media variants | System default; explicit toggle; no-transition-on-change behavior unless later reviewed; media synchronization | Product may later decide theme scope; accessibility and persistence require later verification | Product/Design System/Frontend |

### Global styling and motion

| Pattern / current source owner | Current visitor-facing purpose | Classification | Root-cause reasoning | Must survive | Dependency or risk | Future functional owner |
| --- | --- | --- | --- | --- | --- | --- |
| Mono-only hierarchy; `src/app/globals.css` maps both `--font-sans` and `--font-mono` to Geist Mono; body uses mono | Makes every interface and narrative surface read like a terminal document | RETIRE | Mono-only treatment is a presentation convention of the deprecated model, not a functional requirement | Text hierarchy, readability, semantic headings, and code-specific mono usage where genuinely needed | No replacement typography is selected in Step 1 | Design System/Designer later |
| Terminal CSS helpers; `.terminal-rule`, `.terminal-divider`, ASCII-like generated content | Adds hyphen rules and `//` separators | RETIRE | The helpers exist only to reinforce terminal language | Semantic separation between sections/labels | Source deletion awaits later implementation plan | Design System/Frontend |
| Square-frame, dashed-border, uppercase-tracking grammar embedded in components and global styles | Unifies routes as dossier records | RETIRE | This grammar is the active visual expression of the deprecated dossier system | Functional grouping and status relationships, not their current styling | Exact replacement styling is explicitly out of scope | Designer/Design System later |
| Global theme/color tokens; `src/app/globals.css` background, foreground, surface, border, accent, muted variables | Supplies current light/dark presentation and component dependencies | DEFER DECISION | Tokens are presentation infrastructure, but Step 1 cannot choose whether names/values survive the future design system | Current runtime must keep working until replacement; no token deletion authorized | Requires later Design System assessment after functional hierarchy is accepted | Design System |
| Global layout safety; box sizing, minimum body height, `overflow-x: hidden`, form font inheritance, selection styling | Provides baseline rendering behavior | PRESERVE BEHAVIOR | These rules are not intrinsically terminal, although individual implementations may need review | Predictable box sizing; readable form inheritance; selection support; no unintended overflow | `overflow-x: hidden` can conceal layout defects and is not proof of responsiveness | Frontend/QA later |
| Active generic entrance/reveal motion; headers and project sections using Framer Motion and intersection observers | Fades/slides sections into view | DEFER DECISION | It is not inherently terminal, but whether it serves the future interaction model cannot be decided in a removal-only step | Current content reachability without motion; future reduced-motion compliance | No motion style may be selected here; some observers add client complexity | Designer later; Frontend |
| Typewriter, scramble, decorative caret, command-prompt motion; inactive `HomeSignal`, `TypewriterTagBuilder`, legacy home family | Creates simulated terminal/input activity | RETIRE | These patterns are direct terminal theatre and do not communicate required state | Nothing beyond separately validated text values | Do not confuse a future real streaming/input caret with these decorative simulations | Designer |

## Mixed Presentation-And-Behavior Owners

These owners must not be removed as whole units until their required behavior or content has been extracted:

| Owner | Deprecated presentation inside owner | Required behavior or source inside owner |
| --- | --- | --- |
| `src/components/layout/Header.tsx` | Numbered index/command labels, fixed terminal header treatment | Global navigation, manifesto link, section reachability, theme toggle |
| `src/components/ProjectHeader.tsx` | Index/readme/case-file language and bracketed route state | Home/manifesto navigation, current-route orientation, theme toggle |
| `src/lib/home-shell.ts` | Numbered page-first command model | Stable section IDs and current scroll reachability |
| `src/components/ProjectNavigation.tsx` | Dossier pager, file traversal language, active-only list | Stable project links, previous/next traversal, home return, typing-surface guard |
| `src/components/ascii/Dossier.tsx` heading/meta/media/tag primitives | Dossier bars, brackets, dashed framing, terminal syntax | Heading relationships, labeled metadata, media context, grouped tags |
| `AsciiAssetFallback` callers | ASCII face and terminal error copy | Graceful absent/failed-media handling and layout stability |
| `ProjectHero`, `ProblemSection`, `DemoSection`, `ContextImageSection`, `GalleryItem` | Dossier wrappers and decorative motion | Authored content, theme-aware media, fallback, enlargement, captions |
| `GallerySection` and `Lightbox` | Dossier wrapping and current animation treatment | Evidence ordering, open/close, image/video viewing, keyboard navigation, scroll containment |
| `TabSection` | Bracket labels, fixed terminal control, entrance motion | Access to authored Results/Process/Build content and tab semantics |
| `ProjectFooter` | Dossier/contact-record styling and bracketed tags | Team/technology sources and contact destinations |
| `src/app/globals.css` | Mono-only mapping and terminal helper classes | Theme variables and baseline rendering rules used by the live runtime |

## Canonical Public Asset Preservation Boundary

Product reconciliation establishes the canonical public-file count as 108:

- 101 project media files;
- 7 root assets.

All of these files are preserved as source assets by this audit. Preservation does not assign evidence status and does not assert that every root SVG belongs in the future product.

## Contact Preservation Boundary

The following current destinations are explicitly preserved:

- `mailto:ivan@cheremisin.co.uk`;
- `https://www.linkedin.com/in/icheremisin/`;
- `https://github.com/ivan-nthng`;
- `https://www.instagram.com/cheremisin.co.uk/`;
- `https://calendly.com/icheremisin/30min`;
- project-specific company destinations currently stored in `src/lib/projects.ts`.

This audit does not validate availability, ownership, accuracy, or future CTA priority.

## Deletion Authorization

No route, narrative, project fact, screenshot, video, theme variant, avatar, manifesto statement, project/company URL, social destination, email address, booking destination, or route metadata is authorized for deletion.

No component or CSS file is authorized for deletion by this artifact. Items classified `RETIRE` may leave the future active presentation only through a later Product-routed implementation and cleanup task that demonstrates replacement behavior, source reachability, and preservation of content/evidence.

## Unresolved Ownership Questions

| Question | Why it cannot be resolved in Step 1 | Required owner |
| --- | --- | --- |
| Which projects are publication-ready for featured/recent discovery? | `isActive` is obsolete as a presentation model, but readiness is a product/evidence decision | Product + Data Quality |
| Should system/light/dark theme switching remain a permanent product capability? | Current behavior exists, but future theme scope is not part of removal inventory | Product; Design System advises |
| Which current color/token names and values survive? | Selecting or replacing visual tokens is explicitly out of scope | Design System |
| Which generic fade/reveal motions remain useful? | Requires future interaction and reduced-motion direction | Designer in a later step; Frontend implements |
| Are VK and CityMobile one canonical company/context identity? | Existing routes/assets and copy use different framing | Data Quality + Product |
| Are Peruse and Peruse.ml one canonical identity? | Current route title and shared project record differ | Data Quality + Product |
| Which project stats, outcomes, team roles, technologies, and summaries are trusted? | Source presence is not provenance proof | Data Quality; Copy for wording |
| Which screenshots/videos are verified evidence versus contextual media? | File and route association alone cannot establish evidentiary meaning | Data Quality |
| Which currently unreferenced assets should ever surface? | Preservation does not determine reachability or evidence value | Data Quality + Product |
| Should Results/Process/Build remain tabs, become sections, or map to future scoped answers? | This is later information-architecture work | Designer in Step 2 or later |
| Should global arrow-key project navigation survive? | It may conflict with future input and evidence-viewer shortcuts | Designer later; QA validates |
| What state should browser Back restore after entering a project from a conversation? | Conversation lifecycle and scroll restoration belong to later plan steps | Product + Designer + Architecture |
| What is the lifecycle of a shared answer or anonymous history? | Requires product and persistence decisions outside Step 1 | Product + Architecture/Backend if needed |
| Which contact destinations remain active and where CTAs appear? | Current values are preserved, but availability and priority require owner confirmation | Product |
| Which route metadata becomes canonical after trusted-content migration? | Metadata ownership is currently inconsistent and future content seam is not implemented | Architecture + Data Quality |

## Step 1 Exit Evidence

| Required evidence | Result | Evidence in this artifact |
| --- | --- | --- |
| One removal and retention inventory | Passed | Route, component/style, asset, contact, and unresolved-question inventories |
| Every retired pattern tied to obsolete model, not aesthetic preference | Passed | Root-cause reasoning is stated for every `RETIRE` item |
| No route, narrative, or asset marked for deletion | Passed | Route coverage, asset boundary, and deletion authorization |
| Mixed presentation-and-behavior owners identified | Passed | Dedicated mixed-owner table |
| Retirement distinguished from source deletion | Passed | Classification rules and deletion authorization |
| Every requested explicit pattern covered | Passed | Home, manifesto, all projects, headers, navigation, dossier, fallback, media, gallery, theme, motion, Back, metadata, contact |
| Unresolved decisions routed rather than guessed | Passed | Unresolved ownership questions table |

Step 1 is complete. Steps 2–9 were subsequently completed and accepted through Product reconciliation.
