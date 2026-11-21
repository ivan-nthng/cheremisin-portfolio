# Portfolio Projects And Demonstration Materials

Owner: PRODUCT. Source assessment: 2026-10-27. Current lifecycle: PORT-14 in Portfolio Notion. This report answers which materials exist and which presentation formats are feasible; it does not design the website, approve publication, or implement a demonstration. Ivan owns the site's visual design.

## Scope And Sources

Five authored project routes/Markdown records were found in `src/lib/projects.ts`, `src/app/projects/` and `content/portfolio/projects/`: Taxi Aggregator Support Workspace, DS Hito, Litres, Peruse and Wrike. The shared record's Coming Soon placeholder is not a sixth project. Portfolio Library's 20 current records index the same project set and documentation, not additional project source collections.

Metabox is a sixth known material collection from Ivan's supplied Figma link; it does not yet have an authored route or canonical project narrative in this repository. This is all material found in the inspected repository, Portfolio Library and two supplied Figma files, not a claim to cover Ivan's complete career or every private Figma file.

The [canonical evidence manifest](../../content/portfolio/evidence-manifest.md) remains the owner of evidence identities/status/claim boundaries. This report consumes it and adds format feasibility; it must not silently promote contextual imagery into proof of authorship, shipment or impact. The [existing corpus audit](chat-first-portfolio-corpus-audit.md) supplies the earlier provenance analysis, rechecked here by local byte hashes and selected visual inspection.

## Verified Local Inventory

108 current canonical public files: 101 in project folders and seven root assets. Counts include theme variants and duplicates, not unique screens. No recovery-suffix copies remain in this current public tree; the manifest's older recovery-count paragraph is historical, not today's file count. No existing file was changed or removed.

| Project/group | Files | PNG | MOV | Empty files | Main limitation |
| --- | ---: | ---: | ---: | ---: | --- |
| Taxi / `public/vk` | 34 | 20 | 14 | 0 | Ten screenshot theme pairs and seven video theme pairs; contextual, not measured outcome proof |
| DS Hito / `public/hito` + `public/ds-hito` | 24 | 22 | 2 | 22 | Every PNG is zero bytes; video ownership conflicts with Litres |
| Litres / `public/litres` | 21 | 17 | 4 | 0 | Includes avatar and duplicate dashboard imagery; one video pair conflicts with Hito |
| Peruse / `public/peruse` | 20 | 20 | 0 | 0 | Every image duplicates Litres or Wrike bytes; not project-valid media |
| Wrike / `public/wrike` | 2 | 2 | 0 | 0 | One generic illustration and one flattened board/Gantt composite |
| Root identity/template assets | 7 | 1 | 0 | 0 | Avatar plus six SVGs, not additional projects |

All 20 MOV files expose an H.264 video stream at nominal 60 fps to ffprobe. Taxi clips range approximately 3.46–21.12 seconds. Litres library clips are approximately 32.22/42.00 seconds; its custom pair and the identical Hito pair are approximately 4.83/4.72 seconds. This is metadata/readability proof, not full playback, decoded-frame QA or approval of each video's caption.

Confirmed nonempty SHA-256 duplicate groups include: Hito var-demo ↔ Litres custom; Litres main ↔ promo ↔ all nine Peruse theme pairs; Wrike hero/forward ↔ Peruse hero/forward; root avatar ↔ Litres ivan-cover. Distinct filenames are not distinct work.

## Per-Project Presentation Matrix

Feasible means a candidate for a later bounded build, not an implemented/verified interaction. No new GIF, video, animation or frontend was produced by this inventory.

| Project | Screenshots available now | Animation / GIF / video | Clickable candidate | Missing input / readiness |
| --- | --- | --- | --- | --- |
| **Taxi / CityMobil** | Existing full workspace, inbox, context, order and related PNG pairs; editable Figma states accessible | Seven existing video subjects: suggested actions, voice/chat, internal handoff, request context, draft reply, trip map, contextual widgets. Can trim/loop/convert after reviewing a chosen clip; can author source-state motion in code | Best first candidate: existing `CityMobileInteractivePreview.tsx` is mounted by the authored route. Source contains case selection, info/scripts tabs, drafts/send, workflow controls, route/payment/fullscreen state. Figma prototype or a refined code fragment are alternatives | Existing demo source is not browser-tested in this inventory and is not proven pixel-identical. Choose target Figma node, viewport and one scenario. Demonstration data is not real customer evidence; VK/CityMobil relationship remains unresolved |
| **Metabox** | Accessible Figma configurator, camera positioning/restrictions and product imagery; no local canonical public media set | Good candidate for showing position/rotation/zoom controls, switching products/cameras and restrictions from approved states. Prototype recording or code-authored sequence possible; no ready local video established | Bounded camera-settings/configurator UI can be reconstructed from Figma, or an existing prototype embedded if the selected flow/sharing works | A 3D picture in Figma does not contain a real 3D scene. True orbit/zoom requires the model/scene/renderer or an authorized live product; frame switching is only a simulation. Need source flow, authorship/publication context and selected demo scope |
| **Litres** | Usable dashboard/library/user-management PNGs; main and library screenshots visually inspected | Existing library MOV pair; custom-dashboard pair must not be attributed until Hito conflict is resolved. Charts, filters, table selection or drawer motion could be newly authored from approved states | A small reader-table/filter/details-panel or dashboard fragment is feasible, but interactions must be explicitly defined rather than inferred from one image | No Litres Figma link found in inspected sources. Need original frame(s), type/assets and state flow for high-fidelity editable reconstruction. Reject duplicated promo as a distinct screen |
| **DS Hito** | No usable local PNG; 22 placeholders are empty | Existing MOV pair is not ready because it is identical to Litres custom. A later token/theme/component-state demo is feasible from actual Hito source | A component playground could show variants, sizing, theme or semantic-token changes | Need canonical Hito Figma/library or actual component/token source and the intended interaction. Do not invent design-system behavior or relabel the disputed video |
| **Wrike** | Generic hero plus a board/Gantt composite, visually inspected | Can pan/zoom/crop the existing composite as a presentation effect, clearly distinguished from a recording of product behavior. Real drag/reorder/status animation needs source states or a recording | A narrowly recreated task card/board interaction is conditional, not available from the composite alone | Need the exact Ivan-designed surface, Figma/source assets and intended behavior; existing image is contextual and does not establish authorship/outcomes |
| **Peruse** | No project-valid images in the current repository | No valid local video/animation source. Do not animate Litres/Wrike copies as Peruse | Search/grouping/context could become a demo only after receiving actual Peruse screens and a defined scenario | Need real Peruse Figma/screens/recording and source-state context. Existing narrative is exploratory; no shipment or impact is established |

## Accessible Figma Sources

- [CityMobil file](https://www.figma.com/design/a1FIpM2QJ0y79EO170WQDG/CityMobil-Preview?node-id=6235-8760): page list rechecked. Dedicated design, prototype, scenarios, snapshots, details, presentation and component/foundation pages exist. Selected screenshot `6235:9223` was re-exported and visually inspected. Prior targeted inspection found native prototype links and two 300 ms Smart Animate transitions on the design page; this is not a complete executable-flow audit.
- [Metabox file](https://www.figma.com/design/r8M3IrfO3CQ3GPCouXLwZP/Metabox--Copy-?node-id=3489-18592): page list rechecked. CTA, thumbnails, loader, custom camera, multiple cameras, studio/workspaces and platform material exist across WIP/prototype/presentation/FE pages. FE restrictions frame `8193:9566` was re-exported and visually inspected. Not every page/flow is inspected, approved or publication-ready.
- No source Figma link for Litres, Hito, Peruse or Wrike was found in the inspected repository/Library records. Their external product websites are not substitutes for Ivan's design source.

## What Can Be Produced

| Format | What we can do | Boundary |
| --- | --- | --- |
| Static export | Export Figma screens/details as PNG/JPG/SVG where appropriate; preserve original source and create presentation crops when selected | A screenshot is a fixed state, not behavior or impact evidence |
| Animated GIF | Convert an existing recording or a deliberately authored state sequence; trim, crop, loop and optimize | GIF does not infer missing intermediate design or make a wrong-project asset valid |
| MP4 / WebM | Convert/edit recordings; add controlled cursor/transition/callout presentation; record a later coded demo | Original recorded interaction versus reconstruction must remain explicit. Container conversion is not a fidelity check |
| Code animation | Animate real UI elements/state changes with the current browser/React motion seams; a bounded fragment can be both clickable and recordable | Interaction rules, source geometry/fonts/assets and reduced-motion behavior must be defined. No production backend is needed for a clearly labelled local demonstration, but that is not production-functionality proof |
| Embedded Figma prototype | Embed the actual selected prototype when its prototype links and viewer access support the scenario | Preserves Figma-rendered states but inherits its player, sizing, access and interaction limitations. Prototype accessibility must be tested; embedding a design canvas is not the same as a prototype |
| Rebuilt interactive fragment | Read frames/assets and implement a scoped HTML/React fragment, with actual buttons, tabs, inputs and agreed simulated state | Not one-click Figma-to-working-product export. Fidelity is established by matching screenshots at a fixed viewport, then exercising the chosen flow; exact identity is not promised before comparison |

The available Figma video-export tool supports **MP4 for native timeline-owned frames**, not direct GIF export and not automatic export of every Smart Animate/click-through prototype. No complete timeline inventory is claimed here. A GIF can instead be made from a downloaded/recorded video with the installed local toolchain. ffmpeg, ffprobe and ImageMagick are installed; no new dependency or paid tool was added.

For faithful reconstruction, choose one source node/viewport, acquire the original fonts/assets, name visible states and interaction outcomes, implement the fragment separately from site redesign, and compare the rendered result with the source. Prototype view, image hotspots, a DOM UI and a true 3D scene are different fidelity/behavior promises.

## Practical Starting Point

Start with Taxi: one support scenario, e.g. open trip context → switch to scripts → prepare/send a demonstration reply. It has editable Figma, existing recordings and an existing source-level interactive owner, so it requires less invention than another project. First review the current preview against the exact Figma frame; do not rebuild or call it identical without that check. Metabox camera settings is the next strong candidate if the UI-only versus real-3D boundary is chosen explicitly.

This is a recommendation for Ivan's selection, not a new implementation task. Site design and typography selection remain Ivan's work. When he supplies designs/references, agents can later formalize variables/tokens and necessary components without inventing the visual direction.

## Evidence And Limits

| Check | Result | Coverage limit |
| --- | --- | --- |
| Project/Library discovery | Five authored routes/records plus supplied Metabox; 20 Library records queried | Not all career history, private files, devices or connected workspaces |
| Local asset scan | 108 files; 22 zero-byte PNGs; nonempty hashes compared | Does not repair provenance, approve publication or inspect every pixel |
| Video metadata | All 20 MOVs expose H.264 streams/duration/resolution | No full playback/frame QA or new export performed |
| Selected image review | CityMobil/Metabox Figma renders, Litres main/library and Wrike composite inspected | Not a complete gallery/frame audit |
| Existing interactive preview | Source owner and route reachability confirmed | Browser behavior, keyboard/focus and pixel fidelity not exercised |
| Figma access | Both files/page lists and selected screenshots accessible via MCP | Not every prototype flow or native timeline verified; no Figma mutations |

No application code, assets, source Figma, canonical claims or evidence statuses changed. No media/demos were newly produced. Documentation checks do not replace runtime/browser/provenance acceptance for later work.
