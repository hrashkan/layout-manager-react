/**
 * Removes CSS side-effect imports from the emitted declaration files.
 *
 * Components import their own stylesheets, and `tsc` copies those imports into
 * the `.d.ts` output verbatim. Vite extracts all CSS into a single
 * `dist/style.css`, so the per-component paths do not exist in the published
 * package and TypeScript reports an unresolvable import for every one of them
 * in any consumer that does not set `skipLibCheck`.
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DIST = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "dist"
);

const CSS_IMPORT = /^\s*import\s+["'][^"']+\.css["'];?\s*$\n?/gm;

async function* declarationFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* declarationFiles(full);
    } else if (entry.name.endsWith(".d.ts")) {
      yield full;
    }
  }
}

let changed = 0;

for await (const file of declarationFiles(DIST)) {
  const original = await readFile(file, "utf8");
  const stripped = original.replace(CSS_IMPORT, "");
  if (stripped !== original) {
    await writeFile(file, stripped, "utf8");
    changed += 1;
  }
}

console.log(`stripped css imports from ${changed} declaration file(s)`);
