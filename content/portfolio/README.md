# Portfolio Grounding Corpus

## Status

Canonical reviewable Markdown source for future portfolio retrieval.

The application does not consume this directory yet. The runtime adapter is owned by Architecture.

## Trust Rule

OpenAI may synthesize answers from rows marked `trusted-authored` or `verified-local`. Generated text is never canonical truth.

Status vocabulary:

- `verified-local`: mechanically demonstrated in this repository, such as a route or file existing.
- `trusted-authored`: explicitly stated in Ivan's current authored portfolio source; suitable for a qualified portfolio answer, but not independently verified.
- `inferred`: plausible from local context, but not safe to state as fact.
- `missing`: required provenance or content is absent.
- `contradictory`: local sources or file contents conflict.
- `obsolete`: retained source that belongs to the retired presentation or starter-template layer.

Evidence readiness:

- `contextual`: may illustrate a project with its limitation disclosed; it does not prove an outcome.
- `not-ready`: must not appear as answer evidence.
- `missing`: expected evidence is empty, unavailable, or absent.
- `not-evidence`: UI/brand/template material with no project-claim role.

## Files

- [Portfolio identity and scope](portfolio.md)
- [Manifesto](manifesto.md)
- [Starter-question coverage](starter-questions.md)
- [Evidence manifest](evidence-manifest.md)
- [Taxi Aggregator Support Workspace](projects/taxi-aggregator-support-workspace.md)
- [DS Hito Design System](projects/ds-hito.md)
- [Litres Internal Tools](projects/litres.md)
- [Peruse](projects/peruse.md)
- [Wrike](projects/wrike.md)

## Retrieval Boundary

- Use claim IDs so an answer can disclose its source.
- Preserve the wording and qualification attached to each claim.
- Do not use rows marked `inferred`, `missing`, `contradictory`, or `obsolete` as affirmative answer facts.
- `trusted-authored` means “stated by the portfolio author”, not “externally verified”.
- A file path is not evidence by itself. Use the evidence manifest readiness and claim boundary.
- Project-scoped answers may use only the selected project file and its allowed evidence rows.
- Route files remain authored presentation and migration sources. They are not the future retrieval source of truth.
- Public files remain canonical asset storage. Recovery files containing ` 2` are excluded.

