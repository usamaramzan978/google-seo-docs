#!/usr/bin/env node
"use strict";

// Keeps SKILL.md's index honest as content files are added, renamed, or removed.
// Run with `npm run check-links` after editing the docs.

const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const SKILL_MD = path.join(ROOT, "SKILL.md");

const CONTENT_SECTIONS = [
  "1 - Essentials",
  "2 - SEO fundamentals",
  "3 - Crawling and indexing",
  "4 - Ranking and search appearance",
  "5 - Monitoring and debugging",
  "6 - Site-specific guides",
];

function findAllMdFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...findAllMdFiles(full));
    else if (entry.name.endsWith(".md")) out.push(path.relative(ROOT, full));
  }
  return out;
}

function main() {
  const skillMd = fs.readFileSync(SKILL_MD, "utf8");
  const linked = new Set(
    Array.from(skillMd.matchAll(/\(<([^>]+)>\)/g)).map((m) => m[1]),
  );

  const onDisk = new Set();
  for (const section of CONTENT_SECTIONS) {
    const dir = path.join(ROOT, section);
    if (!fs.existsSync(dir)) continue;
    for (const f of findAllMdFiles(dir)) onDisk.add(f);
  }

  const broken = [...linked].filter((l) => !onDisk.has(l)).sort();
  const orphaned = [...onDisk].filter((f) => !linked.has(f)).sort();

  if (broken.length) {
    console.log(
      `Broken links in SKILL.md (${broken.length}) — file no longer exists:`,
    );
    broken.forEach((f) => console.log("  " + f));
  }
  if (orphaned.length) {
    console.log(
      `\nFiles not indexed in SKILL.md (${orphaned.length}) — add them to the index:`,
    );
    orphaned.forEach((f) => console.log("  " + f));
  }

  if (!broken.length && !orphaned.length) {
    console.log(
      `OK — SKILL.md indexes all ${onDisk.size} content files, no broken links.`,
    );
    return;
  }
  process.exitCode = 1;
}

main();
