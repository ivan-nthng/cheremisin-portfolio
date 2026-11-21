---
name: website-frontend-design-system
description: Use for website page implementation, layout changes, responsive UI, CSS, components, design tokens, and design-system reuse.
---

# Website Frontend Design System

Before editing UI:

1. Inspect nearby page patterns.
2. Inspect shared components.
3. Inspect tokens, classes, and styles.
4. Reuse first.
5. Only add custom CSS when no existing pattern fits.

Trace the issue to the shared primitive, route state, view model, or lifecycle that owns it. Fix the first incorrect UI owner instead of applying route-local CSS over a shared defect.

Implementation rules:

- keep responsive behavior explicit
- avoid one-off wrappers
- avoid duplicated card or grid systems
- use shared typography and spacing
- preserve accessibility
- preserve keyboard, focus, loading, empty, error, and reduced-motion behavior when affected
- remove replaced local styles, components, or state paths when safe
- validate desktop and mobile

Final report must name:

- DS or components reused
- custom code added, if any
- validation run
- browser proof
- skipped checks and their coverage consequence
