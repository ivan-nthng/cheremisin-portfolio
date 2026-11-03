---
name: website-qa-browser-regression
description: Use for browser validation of website pages, responsive checks, visual proof, screenshots, route smoke, and console/pageerror checks.
---

# Website Browser QA

Browser Path Preflight:

- use the built-in browser first if available
- confirm local or dev server state if relevant
- use fallback browser only if the primary path fails
- establish that the runtime, route, build lineage, and fixture boundary are suitable for testing

Validate:

- desktop viewport
- mobile viewport, including 375px when relevant
- no horizontal overflow
- screenshots saved
- console warnings or errors
- page errors
- visible text and CTA states
- navigation and interactive states
- keyboard and focus behavior
- clipping, dismissal, and reduced motion when affected
- relevant requests and assets

Report:

- Validation Coverage
- Required Behavior Proof
- Issues Found
- Screenshot Evidence
- Coverage Gaps
- Verdict: Passed or Failed

Report every required check that was not run, its reason, and its consequence. Distinguish runtime proof from source inspection or fixture evidence. QA does not fix product code.
