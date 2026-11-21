# Workspace Hygiene

## Objective

Keep generated caches, logs, and iCloud conflict copies out of Git without hiding unresolved source conflicts.

## Commands

- `npm run hygiene:check` reports renamed `.next` backups, logs, and files or directories with recovery suffixes such as ` 2`, ` 3`, or ` 4`.
- `npm run clean:workspace` removes reproducible Next.js, Turborepo, Vitest, Playwright, compiler, coverage, and log artifacts plus recovery files that are byte-identical to their canonical sibling.

The clean command does not delete divergent or orphan recovery material. Those files remain visible and make the check fail until a human resolves them.

## Git Enforcement

The repository uses `.githooks/pre-commit` to run the hygiene check before a commit.

Enable it once per clone:

```sh
git config core.hooksPath .githooks
```

## Policy

- Only unsuffixed files are canonical.
- Renamed `.next_*` and `.next-*` directories are disposable build artifacts.
- Logs and TypeScript build-info files are disposable.
- Do not add recovery suffixes to `.gitignore`; hidden conflicts are more dangerous than a failed check.
- Preserve uncertain divergent recovery files until their canonical owner is confirmed.
- Run `npm run hygiene:check` before implementation handoff and before commit.
