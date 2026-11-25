// The Funniest Out-of-Office — make.fun bounty u-kreutzx-the-funniest-out-of-office-054815cf
// v2: a fresh one-line out-of-office auto-reply, written to /output/entry.txt
// Gate: UTF-8 text, 1-140 characters, a single non-blank line.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MIN_CHARS = 1;
const MAX_CHARS = 140;

const ENTRY_LINE =
  "Out of office — my inbox is on a silent retreat and took my passwords with it, so neither of us can reply.";

function gateCheck(line: string): void {
  if (line.length < MIN_CHARS || line.length > MAX_CHARS) {
    throw new Error(
      `gate fail: entry must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${line.length}`,
    );
  }
  if (line.trim().length === 0 || line.includes("\n") || line.includes("\r")) {
    throw new Error("gate fail: entry must be a single non-blank line");
  }
  if (line !== line.trim()) {
    throw new Error("gate fail: entry must not start or end with whitespace");
  }
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const target = join(outputDir, "entry.txt");

gateCheck(ENTRY_LINE);
mkdirSync(outputDir, { recursive: true });
writeFileSync(target, ENTRY_LINE + "\n", "utf8");

// Read back what landed on disk and confirm it is exactly the gated line.
const onDisk = readFileSync(target, "utf8");
if (onDisk !== ENTRY_LINE + "\n") {
  throw new Error("gate fail: written file does not match the gated line");
}
console.log(`wrote ${ENTRY_LINE.length} chars to ${target}`);
