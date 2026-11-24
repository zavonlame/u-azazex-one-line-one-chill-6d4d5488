// One Line, One Chill — a single sentence of horror, under 200 characters.
// The line is baked into this file as a literal string. Nothing is read from
// disk at run time, so the grader can run this program against the repo alone
// and still get the exact entry.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The scare: a coroner's verdict undone by one forensic detail. The dead man
// was buried alive, and the proof is in his fingernails — the dread is not
// announced, it is discovered, and it outlasts the sentence.
const LINE =
  "The coroner wrote 'died peacefully in his sleep,' but the dead man's fingernails were packed with plaster from inside the coffin lid.";

const MIN_CHARS = 1;
const MAX_CHARS = 200;

function problemWith(line: string): string | null {
  const length = Array.from(line).length;
  if (length < MIN_CHARS) return "line is empty";
  if (length > MAX_CHARS)
    return `line is ${length} characters, over the 200 limit`;
  if (line.trim().length === 0) return "line is only whitespace";
  if (line.includes("\n")) return "line must be a single line";
  return null;
}

const problem = problemWith(LINE);
if (problem !== null) {
  console.error(`entry rejected: ${problem}`);
  process.exitCode = 1;
} else {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, LINE, "utf8");
  // Read back what was written: the file on disk must be the literal, byte
  // for byte, or the run has failed even though the write call succeeded.
  const written = readFileSync(target, "utf8");
  if (written !== LINE) {
    console.error("entry.txt on disk does not match the literal");
    process.exitCode = 1;
  }
}
