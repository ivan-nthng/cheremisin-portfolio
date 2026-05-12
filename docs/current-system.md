# Current System

## Runtime Shape

- The system is a single Next.js 15 App Router application.
- All user-facing behavior is rendered from the `src/app` tree.
- There is no backend service layer, API route layer, database, CMS, or authenticated admin surface in the repo.
- The application is effectively a static content portfolio with interactive client-side UI behavior layered into route pages and shared components.

## Route Ownership

- `src/app/layout.tsx` owns the global HTML shell, default site metadata, global CSS, theme provider wiring, and the site-wide header used on the home route.
- `src/app/page.tsx` owns the home route entry and its route-specific metadata.
- `src/components/layout/HomePage.tsx` owns the active home-route composition path.
- `src/app/manifesto/page.tsx` owns the manifesto route.
- `src/app/projects/*/page.tsx` owns individual project case-study routes:
  - `ds-hito`
  - `litres`
  - `peruse`
  - `taxi-aggregator-support-workspace`
  - `wrike`
- Route-specific metadata exists for the home route, `manifesto`, and `projects/ds-hito`.
- Other project routes inherit the root metadata from `src/app/layout.tsx`.

## Rendering Model

- The root layout is a server component.
- The home route entry and `src/components/layout/HomePage.tsx` are server components.
- The manifesto route entry is a server component that delegates its interactive content to a client component.
- Project detail route entries are server components that delegate grid-toggle behavior to a shared client shell.
- Most shared UI components are also client components because they use:
  - `framer-motion`
  - `next-themes`
  - scroll listeners
  - intersection observers
  - local interactive state
- Client-only behavior is now pushed down into smaller islands such as:
  - `src/components/layout/Header.tsx`
  - `src/components/layout/HeroSection.tsx`
  - `src/components/layout/HomeHeroActions.tsx`
  - `src/components/ManifestoContent.tsx`
  - `src/components/ProjectPageShell.tsx`
  - project storytelling components that own their own animation, theme, or tab state

## Shared UI Ownership

### Active shell components

- `src/components/layout/Header.tsx` is the header currently mounted by the root layout.
- `src/components/layout/HomePage.tsx` is the canonical active home-shell composition path used by `src/app/page.tsx`.
- `src/components/layout/HomeHeroActions.tsx` owns the home hero CTA scrolling behavior as a small client island.
- `src/components/layout/HomeSignal.tsx` owns the restrained animated ASCII focal graphic used in the home intro.
- `src/components/ascii/Dossier.tsx` now owns the shared ASCII dossier primitives used across the home route, manifesto, and project case-study pages.
- `src/components/ascii/AsciiAssetFallback.tsx` owns the shared ASCII missing-preview state used when active media fails to load or is absent.
- `src/components/ui/*` contains reusable primitive controls such as `Button`, `Input`, `Textarea`, `Select`, `Checkbox`, and `Toggle`.

### Project-route shared components

- `src/components/ProjectHeader.tsx` is the shared top navigation for project pages and manifesto.
- `src/components/ProjectPageShell.tsx` owns the shared client-side grid-toggle shell used by manifesto and project routes.
- `src/components/ProjectHero.tsx`, `ProjectOverview.tsx`, `ProblemSection.tsx`, `DemoSection.tsx`, `GallerySection.tsx`, `ProjectNavigation.tsx`, and `ProjectFooter.tsx` are the main reusable case-study building blocks.
- `GridOverlay.tsx` is an optional debug-style overlay toggled from project-oriented headers.

### Additional component inventory currently present in the repo

- `src/components/legacy-home/*` contains the older home-shell component family retained outside the active runtime path.
- `src/components/FigmaPreview 2.tsx` is a duplicate-named component file alongside `src/components/FigmaPreview.tsx`.

## Home Route Behavior

- The home page now renders as an ASCII dossier index with:
  - a framed intro record
  - a framed canonical projects index
  - a framed about section
  - a framed contact section
- The home header now owns both:
  - internal route links such as `readme`
  - section commands for `projects`, `about`, and `contact`
- The active home shell shares one section-id contract for `projects`, `about`, and `contact`, used by both the layout header and home-route CTA buttons.
- The home route no longer depends on the older mixed card families for project listing; the active runtime uses one shared framed project-entry grammar.

## Project Content Ownership

- The canonical shared project contract now lives in `src/lib/projects.ts`.
- That module owns both:
  - the `Project` type
  - the `projects` content array
- `src/components/Projects.tsx` now owns only the rendered projects listing UI and consumes the shared data module.
- Project detail routes import the `projects` array from `src/lib/projects.ts` to:
  - resolve the current project
  - derive next/previous navigation
  - reuse technologies and shared project metadata
- Individual project routes also define substantial page-local content inline:
  - descriptions
  - metrics
  - gallery configuration
  - demo media references
  - embedded SVG logos

## Styling And Theme Behavior

- Global styles live in `src/app/globals.css`.
- Tailwind CSS is imported globally.
- The active runtime now uses one ASCII-first visual system defined by shared CSS variables and dossier primitives:
  - mono-first typography via `Geist Mono`
  - restrained paper/ink theme tokens
  - square framed panels
  - shared media viewport, meta strip, and pager patterns
- The current visual pass also includes:
  - a lighter home-shell route strip and project index treatment
  - calmer media hover and lightbox treatment
  - keyboard-aware project traversal via the shared pager
  - a scramble-based home signal prompt that rotates route and asset guidance
- `next-themes` is used to switch between light and dark modes.
- The root layout mounts `ThemeProvider` with:
  - `attribute="class"`
  - `defaultTheme="system"`
  - `enableSystem`
  - `disableTransitionOnChange`
- Many components branch on `theme` or `resolvedTheme` to choose light and dark media assets.
- The home, manifesto, and project routes now share the same active framing language rather than separate visual families.

## Assets And Media

- Static assets are served from `public/`.
- Project routes rely heavily on route-local images and videos under folders such as:
  - `public/hito`
  - `public/litres`
  - `public/vk`
  - `public/wrike`
- Theme-aware media is typically handled by naming conventions such as `*-light.*` and `*-dark.*`.
- Several components expect route-local preview images or videos to exist at hard-coded `public` paths.
- Active media surfaces now fall back to a shared ASCII missing-preview state when an image or video is absent or fails to load at runtime.

## Environment Assumptions

- The source is written in TypeScript and uses the `@/*` path alias from `tsconfig.json`.
- The intended runtime toolchain is:
  - Next.js
  - React 19
  - TypeScript
  - Tailwind CSS
  - Framer Motion
  - next-themes
- Source files also import icon and utility packages from component code, including:
  - `lucide-react`
  - `@heroicons/react/24/outline`
  - `tailwind-merge`

## System Boundaries

- The repo is currently a modular monolith with no service boundaries.
- Shared concerns are handled in-process through components, route files, and utility modules.
- Content, route composition, and presentational logic are co-located in the frontend codebase rather than separated into a dedicated content module or external data source.
