#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const readline = require('node:readline/promises');
const { stdin, stdout } = require('node:process');

const SOURCE_ROOT = path.resolve(__dirname, '..');
const DEFAULT_SKILL_NAME = 'google-seo-docs';

// Files/dirs at the repo root that are installer plumbing, not skill content.
const EXCLUDE = new Set([
  '.git',
  'node_modules',
  'bin',
  'package.json',
  'package-lock.json',
  '.DS_Store',
  '.gitignore',
]);

function parseArgs(argv) {
  const args = { _: [] };
  for (const raw of argv) {
    if (raw === '--help' || raw === '-h') args.help = true;
    else if (raw === '--yes' || raw === '-y') args.yes = true;
    else if (raw === '--global' || raw === '-g') args.global = true;
    else if (raw === '--agents-md') args.agentsMd = true;
    else if (raw.startsWith('--project=')) args.project = raw.slice('--project='.length);
    else if (raw === '--project') args.project = process.cwd();
    else if (raw.startsWith('--agents-md=')) { args.agentsMd = true; args.agentsMdDir = raw.slice('--agents-md='.length); }
    else if (raw.startsWith('--name=')) args.name = raw.slice('--name='.length);
    else args._.push(raw);
  }
  return args;
}

function printHelp() {
  console.log(`
Google SEO Docs — Skill Installer

Usage:
  node bin/install.js                      Interactive mode (asks project vs global)
  npx github:usamaramzan978/google-seo-docs Interactive mode, no clone needed

Flags (non-interactive):
  --project[=<dir>]   Install into <dir>/.claude/skills/${DEFAULT_SKILL_NAME} (default dir: cwd)
  --global            Install into ~/.claude/skills/${DEFAULT_SKILL_NAME} (all your projects)
  --agents-md[=<dir>] Append a reference to <dir>/AGENTS.md instead (for Codex, Cursor, etc.)
  --name=<name>       Use a custom skill folder name (default: ${DEFAULT_SKILL_NAME})
  --yes, -y           Don't ask before overwriting an existing install
  --help, -h          Show this help

With no flags, you'll be asked interactively which of the above you want —
you can pick more than one.
`);
}

function copySkill(destDir, { yes }) {
  if (fs.existsSync(destDir)) {
    return { skipped: true, destDir };
  }
  fs.mkdirSync(path.dirname(destDir), { recursive: true });
  fs.cpSync(SOURCE_ROOT, destDir, {
    recursive: true,
    filter: (src) => {
      const rel = path.relative(SOURCE_ROOT, src);
      if (rel === '') return true;
      const top = rel.split(path.sep)[0];
      return !EXCLUDE.has(top);
    },
  });
  return { skipped: false, destDir };
}

function appendAgentsMd(projectDir, skillMdPath) {
  const agentsPath = path.join(projectDir, 'AGENTS.md');
  const line = `See [Google SEO Docs skill](${skillMdPath}) for Google Search Central / SEO reference documentation (crawling, indexing, structured data, ranking, Search Console, etc.) — read it before answering SEO questions.`;
  const marker = 'Google SEO Docs skill';
  let existing = fs.existsSync(agentsPath) ? fs.readFileSync(agentsPath, 'utf8') : '';
  if (existing.includes(marker)) {
    return { updated: false, agentsPath };
  }
  const sep = existing.length > 0 && !existing.endsWith('\n') ? '\n\n' : existing.length > 0 ? '\n' : '';
  fs.writeFileSync(agentsPath, existing + sep + line + '\n');
  return { updated: true, agentsPath };
}

async function promptMenu(rl) {
  console.log(`
Where do you want to install the "${DEFAULT_SKILL_NAME}" skill?

  1) This project only     -> .claude/skills/${DEFAULT_SKILL_NAME}   (Claude Code)
  2) All your projects     -> ~/.claude/skills/${DEFAULT_SKILL_NAME} (Claude Code, global)
  3) AGENTS.md reference    -> for Codex, Cursor, Windsurf, or any agent without a skills folder
  4) All of the above
`);
  const answer = (await rl.question('Choose one or more, comma-separated [1]: ')).trim() || '1';
  const picked = new Set(
    answer
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
  );
  const targets = new Set();
  if (picked.has('4')) {
    targets.add('project');
    targets.add('global');
    targets.add('agents');
  }
  if (picked.has('1')) targets.add('project');
  if (picked.has('2')) targets.add('global');
  if (picked.has('3')) targets.add('agents');
  if (targets.size === 0) targets.add('project');
  return targets;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const skillName = args.name || DEFAULT_SKILL_NAME;
  const targets = new Set();
  let projectDir = args.project;
  let agentsDir = args.agentsMdDir || args.project;

  const hasExplicitFlags = args.project !== undefined || args.global || args.agentsMd;

  if (hasExplicitFlags) {
    if (args.project !== undefined) targets.add('project');
    if (args.global) targets.add('global');
    if (args.agentsMd) targets.add('agents');
  } else {
    if (!stdin.isTTY) {
      console.error('No install target specified and no interactive terminal detected.');
      printHelp();
      process.exitCode = 1;
      return;
    }
    const rl = readline.createInterface({ input: stdin, output: stdout });
    try {
      const chosen = await promptMenu(rl);
      chosen.forEach((t) => targets.add(t));
      if (targets.has('project') && !projectDir) {
        const answer = (await rl.question(`Project directory [${process.cwd()}]: `)).trim();
        projectDir = answer || process.cwd();
      }
      if (targets.has('agents') && !agentsDir) {
        agentsDir = projectDir || (await rl.question(`Project directory for AGENTS.md [${process.cwd()}]: `)).trim() || process.cwd();
      }
    } finally {
      rl.close();
    }
  }

  projectDir = path.resolve(projectDir || process.cwd());
  agentsDir = path.resolve(agentsDir || projectDir);

  const results = [];

  if (targets.has('project')) {
    const dest = path.join(projectDir, '.claude', 'skills', skillName);
    const res = copySkill(dest, args);
    results.push(`  ${res.skipped ? '(already installed, skipped)' : 'installed'} -> ${dest}`);
  }

  if (targets.has('global')) {
    const dest = path.join(os.homedir(), '.claude', 'skills', skillName);
    const res = copySkill(dest, args);
    results.push(`  ${res.skipped ? '(already installed, skipped)' : 'installed'} -> ${dest}`);
  }

  if (targets.has('agents')) {
    const projectSkillMd = path.join(projectDir, '.claude', 'skills', skillName, 'SKILL.md');
    const skillMdPath = fs.existsSync(projectSkillMd) ? projectSkillMd : path.join(SOURCE_ROOT, 'SKILL.md');
    const res = appendAgentsMd(agentsDir, skillMdPath);
    results.push(`  ${res.updated ? 'added reference to' : '(already referenced in)'} -> ${res.agentsPath}`);
  }

  console.log('\nDone:\n' + results.join('\n'));
  if (targets.has('project') || targets.has('global')) {
    console.log('\nRestart Claude Code (or start a new session) to pick it up.');
  }
}

main().catch((err) => {
  console.error(err.stack || err.message || err);
  process.exitCode = 1;
});
