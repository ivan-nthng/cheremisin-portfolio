# Project Agent Operating Rules

This file is the canonical execution policy for AI agents in this project template.

## Mission

- Keep work structured, explicit, and role-aware.
- Preserve one clear source of truth for product, system, and planning docs.
- Prefer small safe changes over broad rewrites.

## Execution Style

- Default to action.
- Ask before acting only when the decision changes architecture, schema, lifecycle, or rollback risk.
- Prefer targeted extraction and bounded fixes over redesign.
- Reuse existing patterns before inventing new ones.
- Avoid over-engineering.

## Required Reading Order

For non-trivial work read:

1. `docs/context.md`
2. `docs/glossary.md`
3. relevant current doc:
   - `docs/current-system.md`
   - `docs/current-product.md`
   - `docs/current-state.md`
4. related active plan in `docs/plans/active/`

## Delivery Workflow

- Use a plan for risky, cross-surface, migration, or multi-step work.
- Small isolated edits may proceed without a new plan.
- Keep docs and plans aligned with real progress.

## Default Output Shape

1. Root cause
2. Files changed
3. What changed
4. Validation results
5. Blockers (only if any)

## Handoff Footer

Use when continuity would otherwise be lost:

- blocked work
- gated work
- explicit role handoff
- large change stream

Exact footer:

`## 🔁 HANDOFF BLOCK (MANDATORY)`

```md
## Handoff Context

### Summary

<short summary of what was done>

### Key Decisions

- <decision 1>
- <decision 2>

### Current State

- <what is now true>

### Constraints

- <important constraints>

### Risks / Open Questions

- <risks or uncertainties>

### Next Recommended Role

<ARCHITECT / BACKEND / FRONTEND / QA / DESIGNER / DATA-QUALITY / COPY / PRODUCT>

### Suggested Next Step

<clear next action>
```
