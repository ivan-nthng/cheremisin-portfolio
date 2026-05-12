# ASCII Visual Foundation

## Purpose

Define one canonical ASCII-first visual system for the active runtime surface before frontend implementation changes begin.

This spec applies to:

- `/`
- `/manifesto`
- `/projects/*`

This spec does not change:

- route structure
- product logic
- content ownership
- runtime architecture

## Canonical Direction

The site should adopt one consistent direction: **ASCII dossier**.

In practical terms, that means the interface should feel like a structured text artifact rather than a soft marketing site:

- page chrome behaves like a terminal index or design notebook
- hierarchy comes from linework, labels, spacing, and text weight instead of blur, shadows, and rounded cards
- navigation feels like moving through files, sections, and records
- media is treated as attached evidence inside framed viewports, not as floating hero decoration
- motion is restrained and functional

This is not retro pixel art and not decorative fake-terminal cosplay. The goal is a disciplined, text-native system that can hold serious case-study content and future projects without bespoke redesign.

## Core Principles

1. Text leads, media supports.
2. Every major surface is framed.
3. Corners stay square.
4. Accent color is rare and informational.
5. One card grammar should scale across all projects.
6. New projects must fit by content population, not by inventing new layouts.

## System Rules

### Typography

- Use a mono-first type system for the active runtime surface.
- Default UI face: `Geist Mono`, using the already loaded mono font path.
- Do not use a separate expressive display font for headings.
- Hierarchy should come from:
  - size
  - weight
  - uppercase labels
  - spacing
  - rule placement
- Body copy may remain mono, but must be sized and spaced for readability:
  - comfortable paragraph width
  - generous line height
  - visible paragraph separation
- Suggested hierarchy:
  - route title: large mono, bold, compact leading
  - section title: medium mono, bold
  - meta label: small uppercase mono
  - body: regular mono
  - caption and helper text: small mono

### Spacing Rhythm

- Use a strict 8px base rhythm.
- Prefer spacing steps of `8 / 16 / 24 / 32 / 48 / 64`.
- Panels should use consistent internal padding rather than bespoke edge spacing.
- Vertical rhythm should feel editorial and quiet, not dense:
  - tight inside metadata rows
  - medium between heading and body
  - large between framed sections
- Avoid irregular one-off gaps that make pages feel hand-tuned per route.

### Linework And Borders

- Primary structural language: 1px rules.
- Border radius: `0`.
- No glassmorphism.
- No soft card shadows as primary separation.
- Use:
  - single rules for standard panels
  - stronger separators for major route divisions
  - optional dashed or dotted rules only for secondary metadata or debug-like details
- ASCII feeling should come from clear framing, not from literally drawing full text boxes around everything.

### Color

- Move from the current blue-forward surface treatment to a restrained ink-and-paper palette.
- Keep theme support, but simplify both themes into the same system:
  - light mode: paper background, dark ink, pale rule color, muted accent
  - dark mode: dark terminal background, light ink, muted rule color, muted accent
- Accent color should be used only for:
  - active item
  - status/state
  - focused control
  - important metadata marker
- Do not use gradients as a dominant stylistic device on active route surfaces.

### Panel Structure

Every major surface should use one of these reusable panel types:

- `Frame`: outer route or section container with border and padding
- `Header Bar`: thin top row with route label, index, or state
- `Content Block`: text-first body area
- `Media Viewport`: framed area for image or video
- `Meta Strip`: tags, role, client, year, stack, navigation state
- `Pager`: previous/index/next navigation row

Panels should feel modular and repeatable across routes.

### Navigation Feel

- Navigation should read like an index, not like floating marketing nav.
- Home nav items should feel like text commands or section anchors.
- Project nav should feel like a pager:
  - previous
  - index
  - next
- Hover states should rely on:
  - text inversion
  - underline or rule emphasis
  - symbol change such as `>` or `[]`
- Do not use scale-up hover animation for main navigation actions.

### Section Framing

- Each major section should begin with a small route/section label before the main heading.
- Use consistent section wrappers on home, manifesto, and case-study routes.
- Intro, gallery, demo, notes, footer, and project navigation should all look like members of the same family.
- Avoid isolated floating modules with unrelated background treatments.

### Interaction Tone

- Tone should feel precise, literate, and calm.
- Controls should read as deliberate tools, not playful toys.
- Replace novelty cursor behavior with clearer default interaction states unless a cursor treatment is proven necessary inside the ASCII system.
- States should be explicit:
  - current
  - hover
  - focus
  - disabled
  - empty
  - missing preview

### Motion

- Motion should be minimal and diagrammatic.
- Allowed motion language:
  - short opacity fades
  - subtle line or panel reveal
  - small directional shift
  - caret blink or status pulse if used sparingly
- Avoid:
  - spring-heavy entrances
  - large slide distances
  - floating parallax
  - ornamental blur transitions
- Motion should never be the main source of personality.

## Media In The ASCII System

Real images and videos may remain, but they must be framed so they feel native to the interface.

### Media Framing Rules

- Every image or video sits inside a `Media Viewport`.
- A media viewport should include:
  - square outer border
  - consistent internal padding
  - neutral background field behind the asset
  - small caption or file-label row
- Media should not float on page background without a frame.
- Avoid rounded image masks.
- Avoid decorative overlapping image stacks as the default pattern.

### Media Caption Model

Use a consistent caption grammar:

- asset label or index
- short title
- optional note such as theme, file type, or context

Example tone:

- `[IMG 01] Dashboard states`
- `[VID 02] Token behavior demo`

### Missing Or Optional Media

- If a project has no preview image, keep the same viewport shell and render a text placeholder such as `NO PREVIEW AVAILABLE`.
- Do not create a separate visual species for text-only projects.

## Layout System For Future Projects

### Global Widths

- Keep one shared outer content frame across routes.
- Prefer readable max widths expressed as content measures, not overly wide marketing canvases.
- Recommended structure:
  - outer shell for route chrome and section frames
  - readable text column for long-form copy
  - wider media span for demos and galleries

## Home Route

The home route should become the canonical **index view**.

### Home Structure

- Intro frame
- Project index frame
- About frame
- Contact frame

### Home Listing Rule

- Replace mixed card families with one canonical project listing grammar.
- List projects in a stable vertical sequence.
- Do not use masonry or mixed-width card logic as the main home language.
- Each project row/card should include:
  - index number
  - project title
  - one-sentence description
  - company or context if present
  - technology tags
  - media viewport if available
  - clear route action

### Home Project Card Rule

- One component family only.
- Desktop may use a split text/media layout inside the same frame.
- Mobile should stack the same content vertically without changing grammar.
- Importance should not be communicated through entirely different card species such as wide, narrow, and special rounded cards.
- Variation should come from content density, not from changing the shell.

## Manifesto Route

The manifesto route should become the canonical **readme / notes view**.

### Manifesto Structure

- route header frame
- intro frame with avatar as a small media viewport
- repeated text sections using the same section-shell grammar as case-study pages

### Manifesto Rule

- Treat lists as authored notes inside framed sections.
- Keep the page text-forward.
- Do not style manifesto as a separate soft editorial article unrelated to the rest of the site.

## Project Case-Study Routes

Project routes should become the canonical **case file view**.

### Project Page Structure

- route header bar
- project intro frame
- repeated story frames
- media frames
- footer/contact frame
- pager frame

### Project Intro Rule

- Keep the current content model of title, description, role, and client context.
- Change the visual treatment:
  - no soft blue hero card
  - no large rounded corners
  - no floating overlapping mockups as the default hero language
- Use a split framed intro:
  - left: text metadata
  - right: primary media viewport
- If a second hero image is needed, place it as a subordinate framed viewport, not as a decorative overlap.

### Story Section Rule

All reusable case-study sections should inherit one shell:

- section label row
- title
- body
- optional media viewport
- optional metadata strip

This applies to existing sections such as demo, gallery, overview, context, and footer-like supporting blocks.

### Project Navigation Rule

- Use one framed pager at the bottom.
- Navigation text should feel like file traversal, not like a second marketing gallery.
- Previous and next projects should be legible as records.
- If preview images are shown, they must obey the same card shell as the home index.

## Canonical Route Direction

All three route families belong to one system.

- Home: index
- Manifesto: readme
- Project pages: case file

These are not different visual themes. They are different document modes inside the same ASCII dossier language.

## What Stays

- active route structure
- current runtime ownership
- shared project data source in `src/lib/projects.ts`
- theme support
- theme-aware media swapping
- server-first route shells where already stabilized
- shared case-study component model as the starting implementation surface
- home section-id contract for `projects`, `about`, and `contact`

## What Changes

- primary type system becomes mono-first
- blue-glass card styling is removed from active surfaces
- rounded, soft, blurred containers are replaced by square framed panels
- navigation becomes text-indexed and state-explicit
- home project listing becomes one canonical reusable card/list grammar
- manifesto adopts the same framed system as project pages
- project hero media becomes framed and ordered rather than overlapping and decorative
- motion becomes restrained and consistent
- custom cursor and playful hover behaviors should be removed unless they clearly serve the new system

## Reusable Implementation Rules

Frontend should be able to implement future projects without redesigning the shell if these rules hold:

1. Every route surface is assembled from the same small set of frame primitives.
2. Every project card accepts existing canonical project data and still renders cleanly with or without media.
3. Tags always live in a metadata strip, not as ad hoc floating pills.
4. Media always appears in a viewport shell.
5. Section headers always use the same label and title order.
6. Bottom-of-project navigation always uses the same pager grammar.
7. Empty, missing, and text-only states are styled as first-class members of the system.

## Frontend Notes

The next frontend pass should prioritize:

1. global type, color, border, and spacing tokens
2. shared frame primitives
3. home listing unification
4. project and manifesto shell restyling
5. media viewport normalization
6. motion reduction

Frontend should not change route architecture or invent new content requirements to make this direction work.
