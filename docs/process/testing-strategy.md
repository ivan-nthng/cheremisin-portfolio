# Testing Strategy

Prefer layered validation:

- lint/build
- targeted automated checks
- focused manual smoke for changed surfaces

Match evidence to the claim:

- source and reachability proof for ownership or dead code
- browser proof for layout, interaction, focus, and responsive behavior
- persistence or readback proof for stored truth
- provenance proof for project facts, claims, and assets
- cleanup proof for disposable fixtures
- build, deployment, or HTTP proof for runtime availability

Do not upgrade a claim because the required tool was unavailable. Keep the acceptance gate open and state the missing capability.

QA reporting should stay compact:

- Scope tested
- Passed
- Failed
- Repro steps
- Severity
- Cleanup candidates
- Final verdict

QA reports every required-but-not-run check with its reason and consequence. QA does not fix product code, alter production data, or pass work based only on source inspection.
