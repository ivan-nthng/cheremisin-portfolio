# Rehearsal: independent Citymobil desktop crops

PORT-36 current direction is five independent animated crops of the SAME desktop simulator at every width >=360px. All touch/mobile UX forks are canceled. FRONTEND owns the native Motion adapter and existing Stage/native-document bridge. Direction 1 reuses Citymobil components, fixtures, guards, tokens and the unchanged vendored Stage runtime. No case integration, dependencies, Git, deployment or runtime replacement.

## Actions height adjustment

Ivan's subsequent small geometry correction replaces the accepted320px panel/180px context ratio with a476px panel and24px context inside the unchanged500px frame. Only the existing Actions presentation CSS height changes; header/footer, native keyboard/result scrolling, bottom entrance, Motion driver, Chat and original wide812×520 dialog stay unchanged. Exact packet: `test-results/port36-motion/actions-height/packet.json`.

Isolated headless Actions360/1440 loops verify the full four-item list, Payment filtering, fixed settled bounds, one-line footer, host focus, close/reset and the same percentage-based entrance. Direct native controls verify filter→clear→last item and a real seven-item scenario's internal keyboard scrolling with fixed header/footer; original wide geometry is rechecked. Fresh native375px/DPR2 Actions poster and hygiene accompany the packet. This CSS-only fast path reuses accepted TypeScript/tests and independent keyboard/Motion evidence; no new whole-matrix or independent-QA pass is claimed. Earlier continuous-display/hidden/release limitations remain.

## Current Chat / Actions correction

The prior pointer/WAAPI packet was accepted locally by PRODUCT after independent headless QA; its unchanged scene/guard/lifecycle receipts remain valid within their recorded limits. The new bounded delta is in `test-results/port36-motion/chat-tab/packet.json`.

Chat's accepted hint stayed mounted because its render condition included any draft. When the actual selection advanced14→72, `useComposerCaret` re-anchored that unnecessary hint from y488 to472 at both360/1440; field148px and textarea116px did not move. The native owner now renders the hint only while a suggestion exists, freezes its last measured anchor during the existing fade, and continues measuring the actual accepted caret. The illustration-only caret follows that real selection without requiring focus in an inert iframe; the original app retains its browser caret/focus. The existing Tab keycap receives140ms press feedback from Act, the visible arrow stays parked, and native Tab keydown/up accepts the reply. No pointer click, copied text model, new keyboard UI or coordinates masking the defect.

Actions previously stretched the native dialog over the whole500px crop. Its preview-only placement anchors the panel to the bottom; the latest height adjustment above leaves24px of native context. Entrance uses matching percentage units with the existing Motion JS driver; settled bounds stay fixed through filtering. The shared native footer uses12px technical text and a narrow-dialog container rule: arrows/navigation, Enter/select and Esc/close stay on one line. Native selection scrolls the existing result well. Original wide dialog remains812×520 at1440×900; bottom placement/scripted input remain presentation-only.

Isolated headless Chrome156 on local development3140: Chat and Actions full loops at360/1440; rAF Tab/exit/pointer/caret and palette entrance/filter bounds; original1440 actual Tab, focus, arrows/Enter/Escape; original360 footer and the compact native palette's keyboard-driven internal scroll passed.23 focused native tests, canonical-source types, changed-owner lint and hygiene are recorded in the packet. The default root TypeScript glob also includes incomplete historical snapshots under test-results and fails there; the existing source-only configuration passes without hiding canonical source errors. Fresh Chat/Actions posters are lossless native375px/DPR2 payoff captures.

Four focused contact sheets retain the generic film gate's sampling/iframe limitations; read-only rAF samples and stills do not prove every displayed frame or physical GPU performance. Failed harness attempts (short-mark polling and aria-hidden/settling assumptions) are retained beside corrected receipts. No console/hydration error suppression. Independent QA of this exact delta is still required; no new broad matrix or Global QA claim.

## Demonstrated internal flash cause

Current evidence is test-results/port36-motion/pointer/root-cause.json with raw *-panes.json. A read-only rAF addition to the provided filming helper records actual native iframe computed style, selected tab, pane geometry, scroll, fonts and camera. It does not mutate product DOM or filter errors.

The old installed Motion12.15 WAAPI driver exposes the initial inline style after canceling its animation fill and before the scheduled MotionValue DOM render. This was directly observed:
- Scripts reaches x≈60px, then at223.8ms returns to x403px while exiting Info returns from x−283px to x60px for one sample. Scripts stays selected, scroll0, fonts loaded and camera fixed. Three backward resets occurred in the bounded baseline.
- Choose a case stays present/open but opacity≈1→0 and transform returns to scale(.97)/translateY(−4px) at entry completion.
- Command-A dialog remains open but opacity1→0 with scale(.98)/translateY(6px) for two samples at entry completion.

Installed primary source NativeAnimation.mjs updates its MotionValue then cancels WAAPI; NativeAnimationExtended defers DOM commit; supports/waapi.mjs selects JS animation when the public onUpdate callback is present. The existing native DemoMotion owner and native dialog now use a deliberately empty onUpdate callback for that selection. The JS driver writes the final value through the same render owner before completion. No dependency patch or warning suppression. Bounded A/B: old overlay run1 menu dip/1 dialog dip/1 tab reset; same real-control opening/1100ms hold/closing recipe with JS driver0/0/0. Issue-only driver sample also has0 backward resets. Raw browser states are not physical display/GPU traces.

The provisional160ms single-pane replacement and pre-paint scroll restoration were rejected as unproved hypotheses and are NOT shipped. Original220ms directional tab/popLayout,400ms other presets,180ms dialog, easing and scroll behavior remain. No further height/overlay patch hides the flash.

## One desktop path

Issue uses Scripts/current checklist/Info. Chat uses actual guarded typing/selection, native Tab accept, Send, native2s rider dots/reply and hidden fresh restart. Actions uses native Command-A from the real composer, types Payment, shows its match and closes. Details uses the same Payment/Details tabs. Map plays to actual pickup, pauses, demonstrates native driver-card hover/selection and passenger-marker selection, then uses native pickup-point inspection and Before-order reset. Participant selection persists as the native timeline resets. One arrow/normal desktop pointer path at every width, idle:false and ripple:false. No touch state/media query/message/input prop, Use reply label or touch hitbox remains. Actions' bottom placement is the same desktop palette presentation at all widths, not a mobile command model. Native keyboard hints remain visible.

Narrow differences are framing only:375px maximum, Issue/Map600px, Chat/Details640px, Actions500px. Native viewports stay in desktop layout at1:1, without shrinking the whole simulator or changing fonts/controls. No outer card/ground/padding; interface edge/shadow/8px radius. Adjacent Map provider links and stacked people remain; compact Map Esc/I helpers stay outside the crop. Deterministic illustrated caret uses the existing real textarea mirror identically at every width.

## Verification and limits

The packet contains exact delta/rollback/protection, focused narrow/wide loop films, raw A/B styles and source mechanism. Prior approved/ packet preserves accepted composer/payment/search geometry,95 guard tests, hydration/capture analysis and separate QA native receipts; reuse only where source behavior is unchanged. New owner types/tests/hygiene accompany this packet.

A native Chrome360 screenshot burst records25 actual frames over6.5s, with Info→Scripts→hold→Info→Scripts and no sampled reflash. It used the provisional candidate before final driver diagnosis, so is contextual evidence, NOT final-driver continuous acceptance. Source-native Scripts/Light-Dark snapshots from that candidate are similarly attributed. Final-driver browser-state proof is the raw rAF A/B and final films; no claim that contact sheets prove uninterrupted motion.

Playing fragments have always been inert illustrations driven by Act. Pause disposes them and shows an actual static poster; no new interaction was disabled. The opening A/B uses real native controls with a1100ms idle hold: the opacity/transform dip occurs inside that hold, while menu presence/dialog open and selected tab do not change. It therefore does not require an authored reset/close to reproduce. Ordinary original native has no Act owner. Final-source manual original/paused/playing comparison and remaining lifecycle verification go directly to existing QA; do not relabel older receipts as fresh proof.

Film sampling can remain inconclusive, generic geometry detection is iframe-blind and Map retains three provider shield-filter warnings. Capture helper retains caret:'initial' and all diagnostics; no SSR disabling/suppression. No physical Safari/iPhone, displayFPS/GPU or production claim. Current PORT-36 lifecycle and acceptance are owned by its Notion Task.

## Track participant binding

PORT-36 FRONTEND implementation: approved [8447:13789](https://www.figma.com/design/a1FIpM2QJ0y79EO170WQDG/CityMobil-Preview?node-id=8447-13789) is one card's normal/hover pair, not two Alex/Driver records. MCP design context and screenshot were inspected. Direction1 extends `CitymobilTrack.trackPeople`, existing native assets/fonts/surface/border/shadow patterns and `useGeographicTrack`; no library, token family or map engine is introduced. The exact approved light hover border is #bc99ff; dark uses the existing native accent and floating shadow treatment. Dynamic avatars remain fixture-supplied. Cards are287×38px where space permits, otherwise constrained to the existing map column with full accessible labels,12px names/status,9px role and28px avatars.

Root cause: passive participant divs and span markers had no shared interaction owner. Track now owns selected/hovered/focused participant IDs; native button semantics implement Enter/Space and adapter listeners forward marker hover/focus/click to that owner. Selected state persists after mouseleave and timeline changes; transient state clears on leave/blur and map cleanup. Status text still comes from `participantsAt`; driver colors follow phase colors, with green at the prepared stop/destination, and passenger colors follow pickup/onboard/drop-off. Cards and markers share these values. Both markers stay reachable when coordinates coincide through ±14px presentation offsets; actual coordinates, route kind, replay time, speed and camera remain unchanged by participant actions. AbortController removes detached participant listeners; scenario/trip-key remount clears selection.

Focused native verification also exposed a pre-existing visibility race: one IntersectionObserver delivery contained ratio0/false followed by ratio.0173167/true at the same timestamp. Destructuring only the first record left Track paused despite being visible. The same owner now consumes the last record; no timer or playback policy was changed. Failed attempts and the before receipt remain under `intersection-before/`; temporary diagnostic markup was removed. The first test attempt also addressed a harness selector error: theme has role=switch, not button.

Map remains an inert authored illustration. Its existing Act pointer drives real card hover/click, then passenger marker click and the existing route-point inspection. It has no second participant state or manual interactive mode. Other four scene branches, native typing/WAAPI/Actions fixes, providers/attribution and fixture corpus remain unchanged. The Map poster is a fresh750×1200 lossless actual native selection capture, not reconstructed UI.

Evidence/rollback: `test-results/port36-motion/track-participants/packet.json`, `frontend.patch`, `source-proof.json`, `before/` and `final/`. No commit, deployment, new packages/processes, user-browser control or disposable persisted data.

| Check | Scenario / environment | Result | Evidence in track-participants/ |
| --- | --- | --- | --- |
| Native interaction | Headless Chrome156, original1440 and native360px map crop; real mouse,Tab,Enter,Space; Light/Dark | Passed: both directions, persistent selection, phase/color identity, coincident controls, unchanged camera/time, live replay stays running | native1440.json;native-compact360.json; light/dark PNGs |
| Authored Map | Host360/1440, full opening→pickup→card hover/select→marker select→inspection→reset, Pause/Play/Replay | Passed; native state and camera/time checks at each mark; cleanup0canvas/0simulator and host focus | map-360.json;map-1440.json;summary-clip.json |
| Fixtures/static | Older Martim trip and Pickup Ivan/Jason; native reduced selection; cold reduced360/1440 | Passed; correct real local avatars, reset selection on scenario change; poster750×1200,0iframe/0Stage,3credits | supplement.json;reduced.json;posters.json |
| Source | Canonical-source TypeScript, affected Track/map-style tests, changed-source lint,hygiene, protected hashes/reverse patch | Passed:21 tests,0 TypeScript/lint errors; native img advisory retained | types.log;tests.log;lint.log;hygiene.log;source-proof.json |

Diagnostics retain provider shield-filter warnings and expected aborted map-style requests during StrictMode/cleanup; no zero-network-warning claim. Lint retains the native img advisory. Source-only TypeScript excludes historical incomplete snapshot files; no full repository build/global QA/physical display or Safari claim. Existing unchanged other-scene evidence is reused. Independent focused QA is the next acceptance gate; source is released with the exact packet.

## Cold reduced-motion hydration

PORT-36 bounded FRONTEND follow-up after independent Track functional QA passed. QA's clean original reduced starts reproduced hydration errors2/2: SSR settled translateX(0%)/translateY(0px) versus client none in `DemoMotion`, plus the always-mounted action dialog's SSR closed6px/.98 versus reduced client's0px/1. Both owners were unchanged by Track; historical onset is unproved.

The minimal fix normalizes `DemoMotion`'s settled identity transform independently of preference and makes the dialog's closed pose depend only on its open state. Existing reduced entrances/exits and zero durations remain; normal presets/easing/durations and both onUpdate JS-driver bindings are unchanged. No new hook/state/system, CSS or dependency change, suppression, SSR disabling or warning filtering. Track/map implementation is frozen; its accepted independent proof is reused. Only these two source owners and this report change.

| Check | Scenario / environment | Result | Evidence in test-results/port36-motion/reduced-hydration/ |
| --- | --- | --- | --- |
| Cold hydration | Two fresh Chrome156 headless original1440 reduced contexts; no initScript/actions/screenshots | Passed:0 hydration/JS errors in both, versus QA2/2 errors before; expected reduced preference notice retained | qa-before.json;reduced-diagnostic.json;cold.cjs |
| Existing openers | Original normal and reduced; Scripts,case dropdown,Command-A; rAF readback of visible transforms/opacity and1100ms holds | Passed: normal movement remains, final poses stable; reduced77/71/71 visible samples all identity transforms; dialog812×520 and Escape focus | normal.json;reduced.json;verification-summary.json |
| Shared reduced smoke | Original native Track open/select/close plus cold360 Map poster | Passed: native remains paused, participant selected; static750px image,0iframe/0Stage,no overflow | reduced.json |
| Source | Canonical-source types,8 focus/composer tests,lint,hygiene,exact delta | Passed;0 type/lint errors,6 lint advisories outside edited lines retained | types.log;tests.log;lint.log;hygiene.log;source-proof.json |

Exact rollback/after hashes and acceptance boundary live in `reduced-hydration/packet.json`; before/final snapshots and reverse-checkable patch preserve unrelated changes. The initial normal harness accidentally included deliberate close frames in its held-open assertion; it was corrected to label closing separately and only normal was rerun. Passing reduced checks were reused. No product fix was made for that harness error. All owned contexts closed. This fixes the named hydration diagnostic; broader existing physical-display/hidden/Safari/release limits remain. Direct independent QA is limited to this diagnostic and changed shared seam.
