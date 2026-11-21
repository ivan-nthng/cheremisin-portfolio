# Testing Strategy

Select validation from the admitted change boundary and the [small-change fast path](agent-workflow.md#fast-path-for-small-website-changes). Build/lint, automated tests and browser checks are available layers, not a mandatory complete sequence for every edit. Documentation-only changes need focused meaning/link/preservation checks; presentation-only changes need affected desktop/mobile interaction proof. Reuse unchanged accepted evidence; expand only for a changed risk or reproduced defect. Hygiene remains required. A skipped or unavailable lint is not a pass.

Match evidence to the claim:

- source and reachability proof for ownership or dead code
- browser proof for layout, interaction, focus, and responsive behavior
- persistence or readback proof for stored truth
- provenance proof for project facts, claims, and assets
- cleanup proof for disposable fixtures
- build, deployment, or HTTP proof for runtime availability

Do not upgrade a claim because the required tool was unavailable. Keep the acceptance gate open and state the missing capability.

Keep one compact Task result: scope, evidence/verdict and actionable defects. Add repro/severity only for defects; no mandatory report-section shell or duplicate report document. Update the existing canonical contract only for a durable change.

QA reports every required-but-not-run check with its reason and consequence. QA does not fix product code, alter production data, or pass work based only on source inspection.
