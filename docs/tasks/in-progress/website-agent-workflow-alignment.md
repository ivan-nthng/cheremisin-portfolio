# Website Agent Workflow Alignment

## Status

Historical pre-Notion workflow record, superseded by [Agent Workflow](../../process/agent-workflow.md). Its mandatory prompt/report rules are retired; current lifecycle belongs to Portfolio Notion, not this checklist.

## Owner / Next Role

Owner: Product
Next Role: QA

## Created

2026-06-28

## Last Updated

2026-06-28

## Priority

High

## Requiredness

Required

## Symptom / Root Cause

The project is a website and page-design-first workflow, but the canonical agent docs were still too generic and partially optimized for broader product-engine routing. That created ambiguity around who routes page work, when Designer vs Frontend vs QA should be used, and how prompts and validation should be structured. Recovery-copy files with the suffix ` 2` also made it too easy to treat non-canonical files as live policy.

## Expected Outcome

The project has one compact, website-first workflow where:

- Product is the default router and source-of-truth owner
- Product explains status in Russian and writes exact execution prompts in English
- Designer owns unclear visual hierarchy and page-direction work
- Frontend owns implementation with shared patterns and design-system reuse
- QA owns browser and responsive validation without fixing issues
- execution prompts are single-owner, self-contained, and start with `ROLE: <ROLE>`
- Product no longer uses a mandatory handoff footer by default

## Checklist

- [x] Audit the canonical workflow and role files
- [x] Update `AGENTS.md` with website-first routing and validation rules
- [x] Update Product, Designer, Frontend, and QA role files
- [x] Narrow Prompt Engineer so it is not the default website router
- [x] Add compact project skills for handoff, design audit, frontend reuse, QA, and copy passes
- [x] Add language-rule and Product response-shell alignment from the local workflow guide
- [x] Run consistency scans for routing, reuse, and QA rules
- [x] Run `git diff --check` for touched docs
- [x] Resolve QA-found minor wording ambiguity around advisory role suggestions and design-audit prompt wording

## Exit Criteria

- Canonical files consistently state that Product is the router for ordinary website work
- Canonical files consistently require exactly one next-role prompt starting with `ROLE: <ROLE>`
- Canonical files consistently require design-system reuse before one-off implementation
- Canonical files consistently require QA to validate desktop/mobile, overflow, screenshots, and console/page errors without fixing issues
- The workflow is compact and does not introduce duplicate policy sources
