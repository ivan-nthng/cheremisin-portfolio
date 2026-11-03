import {
  existsSync,
  lstatSync,
  readdirSync,
  readFileSync,
  rmSync,
} from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const clean = process.argv.includes("--clean");

const excludedDirectories = new Set([
  ".git",
  "node_modules",
  "Cheremisin_Portfolio_Process",
]);

const standardGeneratedPaths = [
  ".next",
  "out",
  "coverage",
  "playwright-report",
  "test-results",
  "blob-report",
  ".vitest",
  ".turbo",
  ".cache",
  ".swc",
  ".eslintcache",
  "tsconfig.tsbuildinfo",
  ".DS_Store",
];

const unexpectedGeneratedPaths = readdirSync(root)
  .filter(
    (name) =>
      (name.startsWith(".next_") || name.startsWith(".next-")) &&
      name !== ".next",
  )
  .sort();

function sha256(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

function recoveryCanonicalPath(path) {
  const name = path.slice(path.lastIndexOf("/") + 1);
  const match = name.match(/^(.*) ([2-9][0-9]*)(\.[^/]+)?$/);
  if (!match) return undefined;
  return join(dirname(path), `${match[1]}${match[3] ?? ""}`);
}

function walk(directory, result) {
  for (const name of readdirSync(directory)) {
    if (excludedDirectories.has(name)) continue;
    const path = join(directory, name);
    const relativePath = relative(root, path);
    if (
      relativePath === ".next" ||
      relativePath.startsWith(".next_") ||
      relativePath.startsWith(".next-") ||
      relativePath === "out" ||
      relativePath === "coverage" ||
      relativePath === "playwright-report" ||
      relativePath === "test-results" ||
      relativePath === "blob-report" ||
      relativePath === ".vitest" ||
      relativePath === ".turbo" ||
      relativePath === ".cache" ||
      relativePath === ".swc"
    ) {
      continue;
    }

    const stat = lstatSync(path);
    if (stat.isDirectory()) {
      if (/ [2-9][0-9]*$/.test(name)) {
        result.recoveryDirectories.push(path);
        continue;
      }
      walk(path, result);
      continue;
    }

    if (
      name === ".DS_Store" ||
      name.endsWith(".log") ||
      name.includes(".log.") ||
      name.endsWith(".pid") ||
      name === ".eslintcache" ||
      /^npm-debug\.log/.test(name) ||
      /^yarn-(debug|error)\.log/.test(name)
    ) {
      result.logs.push(path);
    }

    const canonicalPath = recoveryCanonicalPath(path);
    if (!canonicalPath) continue;
    const canonicalExists = existsSync(canonicalPath);
    result.recoveryFiles.push({
      path,
      canonicalPath,
      status:
        canonicalExists && sha256(path) === sha256(canonicalPath)
          ? "identical"
          : canonicalExists
            ? "divergent"
            : "orphan",
    });
  }
}

const inventory = {
  logs: [],
  recoveryFiles: [],
  recoveryDirectories: [],
};
walk(root, inventory);

const generatedForCheck = unexpectedGeneratedPaths.map((path) =>
  join(root, path),
);

if (clean) {
  const generatedForClean = [
    ...standardGeneratedPaths.map((path) => join(root, path)),
    ...generatedForCheck,
    ...inventory.logs,
  ];

  for (const path of new Set(generatedForClean)) {
    if (existsSync(path)) rmSync(path, { recursive: true, force: true });
  }

  for (const recovery of inventory.recoveryFiles) {
    if (recovery.status === "identical" && existsSync(recovery.path)) {
      rmSync(recovery.path, { force: true });
    }
  }
}

const remainingRecoveryFiles = inventory.recoveryFiles.filter(
  (item) => !clean || item.status !== "identical",
);
const problems = [
  ...generatedForCheck.map((path) => ({
    kind: "generated backup",
    path,
  })),
  ...inventory.logs.map((path) => ({ kind: "log", path })),
  ...remainingRecoveryFiles.map((item) => ({
    kind: `recovery ${item.status}`,
    path: item.path,
  })),
  ...inventory.recoveryDirectories.map((path) => ({
    kind: "recovery directory",
    path,
  })),
].filter((item) => existsSync(item.path));

if (problems.length) {
  console.error("Workspace hygiene check failed:");
  for (const problem of problems) {
    console.error(`- ${problem.kind}: ${relative(root, problem.path)}`);
  }
  console.error(
    clean
      ? "Generated artifacts and identical recovery files were cleaned; resolve the remaining recovery conflicts manually."
      : "Run `npm run clean:workspace` for generated artifacts and byte-identical recovery files.",
  );
  process.exitCode = 1;
} else {
  console.log(
    clean
      ? "Workspace cache, logs, and identical recovery copies cleaned."
      : "Workspace hygiene check passed.",
  );
}
