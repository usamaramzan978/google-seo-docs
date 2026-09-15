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
  '.github',
  '.DS_Store',
  '.gitignore',
]);

const UNINSTALL_WORDS = new Set(['uninstall', 'remove', 'rm', 'delete']);
const INSTALL_WORDS = new Set(['install', 'add']);

function parseArgs(argv) {
  const args = { _: [] };
  for (const raw of argv) {
    if (raw === '--help' || raw === '-h') args.help = true;
    else if (raw === '--yes' || raw === '-y') args.yes = true;
    else if (raw === '--uninstall' || raw === '-u') args.uninstall = true;
    else if (raw === '--global' || raw === '-g') args.global = true;
    else if (raw === '--agents-md') args.agentsMd = true;
    else if (raw.startsWith('--project=')) args.project = raw.slice('--project='.length);
    else if (raw === '--project') args.project = process.cwd();
    else if (raw.startsWith('--agents-md=')) { args.agentsMd = true; args.agentsMdDir = raw.slice('--agents-md='.length); }
    else if (raw.startsWith('--name=')) args.name = raw.slice('--name='.length);
    else args._.push(raw);
  }
  // Plain subcommand form: `google-seo-docs uninstall`, `google-seo-docs remove`, etc.
  const sub = args._[0]?.toLowerCase();
  if (UNINSTALL_WORDS.has(sub)) args.uninstall = true;
  else if (sub !== undefined && !INSTALL_WORDS.has(sub)) {
    console.error(`Unknown command "${args._[0]}". Expected "install" or "uninstall".\n`);
    args.help = true;
    args.helpExitCode = 1;
  }
  return args;
}

function printHelp() {
  console.log(`
Google SEO Docs — Skill Installer

Usage:
  npx github:usamaramzan978/google-seo-docs            Interactive install
  npx github:usamaramzan978/google-seo-docs uninstall  Interactive removal

  (already cloned this repo? swap the npx line for: node bin/install.js [uninstall])

Flags (non-interactive, add to either command above):
  --project[=<dir>]   Install/remove <dir>/.claude/skills/${DEFAULT_SKILL_NAME} (default dir: cwd)
  --global            Install/remove ~/.claude/skills/${DEFAULT_SKILL_NAME} (all your projects)
  --agents-md[=<dir>] Add/remove the reference in <dir>/AGENTS.md (Codex, Cursor, etc.)
  --name=<name>       Use a custom skill folder name (default: ${DEFAULT_SKILL_NAME})
  --yes, -y           Don't ask before overwriting an existing install, or before deleting
  --help, -h          Show this help

With no target flags, you'll be asked interactively which of the above you want —
you can pick more than one.

Examples:
  npx github:usamaramzan978/google-seo-docs --project --global
  npx github:usamaramzan978/google-seo-docs uninstall --global --yes
  npx github:usamaramzan978/google-seo-docs uninstall --agents-md --yes
`);
}

function copySkill(destDir) {
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

function removeSkill(destDir) {
  if (!fs.existsSync(destDir)) {
    return { removed: false, destDir };
  }
  fs.rmSync(destDir, { recursive: true, force: true });
  return { removed: true, destDir };
}

const AGENTS_MD_MARKER = 'Google SEO Docs skill';

function appendAgentsMd(projectDir, skillMdPath) {
  const agentsPath = path.join(projectDir, 'AGENTS.md');
  const line = `See [Google SEO Docs skill](${skillMdPath}) for Google Search Central / SEO reference documentation (crawling, indexing, structured data, ranking, Search Console, etc.) — read it before answering SEO questions.`;
  let existing = fs.existsSync(agentsPath) ? fs.readFileSync(agentsPath, 'utf8') : '';
  if (existing.includes(AGENTS_MD_MARKER)) {
    return { updated: false, agentsPath };
  }
  const sep = existing.length > 0 && !existing.endsWith('\n') ? '\n\n' : existing.length > 0 ? '\n' : '';
  fs.writeFileSync(agentsPath, existing + sep + line + '\n');
  return { updated: true, agentsPath };
}

function removeAgentsMdReference(projectDir) {
  const agentsPath = path.join(projectDir, 'AGENTS.md');
  if (!fs.existsSync(agentsPath)) {
    return { removed: false, agentsPath, reason: 'no AGENTS.md found' };
  }
  const original = fs.readFileSync(agentsPath, 'utf8');
  if (!original.includes(AGENTS_MD_MARKER)) {
    return { removed: false, agentsPath, reason: 'not referenced' };
  }

  const kept = original.split('\n').filter((line) => !line.includes(AGENTS_MD_MARKER));
  // Collapse runs of blank lines left behind, and trim leading/trailing blanks.
  const collapsed = [];
  for (const line of kept) {
    if (line.trim() === '' && collapsed[collapsed.length - 1]?.trim() === '') continue;
    collapsed.push(line);
  }
  while (collapsed.length && collapsed[0].trim() === '') collapsed.shift();
  while (collapsed.length && collapsed[collapsed.length - 1].trim() === '') collapsed.pop();

  if (collapsed.length === 0) {
    fs.unlinkSync(agentsPath);
    return { removed: true, agentsPath, deletedFile: true };
  }
  fs.writeFileSync(agentsPath, collapsed.join('\n') + '\n');
  return { removed: true, agentsPath, deletedFile: false };
}

async function confirm(rl, message) {
  const answer = (await rl.question(`${message} [y/N]: `)).trim().toLowerCase();
  return answer === 'y' || answer === 'yes';
}

async function promptTargetMenu(rl, action) {
  const verb = action === 'uninstall' ? 'remove' : 'install';
  const preposition = action === 'uninstall' ? ' from' : '';
  console.log(`
Where do you want to ${verb} the "${DEFAULT_SKILL_NAME}" skill${preposition}?

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
    if (args.helpExitCode) process.exitCode = args.helpExitCode;
    return;
  }

  const action = args.uninstall ? 'uninstall' : 'install';
  const skillName = args.name || DEFAULT_SKILL_NAME;
  const targets = new Set();
  let projectDir = args.project;
  let agentsDir = args.agentsMdDir || args.project;

  const hasExplicitFlags = args.project !== undefined || args.global || args.agentsMd;
  const needsInteractiveMenu = !hasExplicitFlags;
  const needsConfirmPrompts = action === 'uninstall' && !args.yes;

  let rl = null;
  if (needsInteractiveMenu || needsConfirmPrompts) {
    if (!stdin.isTTY) {
      if (needsInteractiveMenu) {
        console.error('No install target specified and no interactive terminal detected.');
        printHelp();
      } else {
        console.error('--uninstall needs --yes when run non-interactively.');
      }
      process.exitCode = 1;
      return;
    }
    rl = readline.createInterface({ input: stdin, output: stdout });
  }

  try {
    if (hasExplicitFlags) {
      if (args.project !== undefined) targets.add('project');
      if (args.global) targets.add('global');
      if (args.agentsMd) targets.add('agents');
    } else {
      const chosen = await promptTargetMenu(rl, action);
      chosen.forEach((t) => targets.add(t));
      if (targets.has('project') && !projectDir) {
        const answer = (await rl.question(`Project directory [${process.cwd()}]: `)).trim();
        projectDir = answer || process.cwd();
      }
      if (targets.has('agents') && !agentsDir) {
        agentsDir = projectDir || (await rl.question(`Project directory for AGENTS.md [${process.cwd()}]: `)).trim() || process.cwd();
      }
    }

    projectDir = path.resolve(projectDir || process.cwd());
    agentsDir = path.resolve(agentsDir || projectDir);

    const results = [];

    async function removeWithConfirm(dest) {
      if (!fs.existsSync(dest)) {
        results.push(`  (not installed) -> ${dest}`);
        return;
      }
      if (!args.yes && rl && !(await confirm(rl, `Remove ${dest}?`))) {
        results.push(`  (skipped) -> ${dest}`);
        return;
      }
      removeSkill(dest);
      results.push(`  removed -> ${dest}`);
    }

    if (targets.has('project')) {
      const dest = path.join(projectDir, '.claude', 'skills', skillName);
      if (action === 'uninstall') {
        await removeWithConfirm(dest);
      } else {
        const res = copySkill(dest);
        results.push(`  ${res.skipped ? '(already installed, skipped)' : 'installed'} -> ${dest}`);
      }
    }

    if (targets.has('global')) {
      const dest = path.join(os.homedir(), '.claude', 'skills', skillName);
      if (action === 'uninstall') {
        await removeWithConfirm(dest);
      } else {
        const res = copySkill(dest);
        results.push(`  ${res.skipped ? '(already installed, skipped)' : 'installed'} -> ${dest}`);
      }
    }

    if (targets.has('agents')) {
      if (action === 'uninstall') {
        if (!args.yes && rl && !(await confirm(rl, `Remove the skill reference from ${path.join(agentsDir, 'AGENTS.md')}?`))) {
          results.push(`  (skipped) -> ${path.join(agentsDir, 'AGENTS.md')}`);
        } else {
          const res = removeAgentsMdReference(agentsDir);
          results.push(`  ${res.removed ? 'removed reference from' : `(${res.reason})`} -> ${res.agentsPath}`);
        }
      } else {
        const projectSkillMd = path.join(projectDir, '.claude', 'skills', skillName, 'SKILL.md');
        const skillMdPath = fs.existsSync(projectSkillMd) ? projectSkillMd : path.join(SOURCE_ROOT, 'SKILL.md');
        const res = appendAgentsMd(agentsDir, skillMdPath);
        results.push(`  ${res.updated ? 'added reference to' : '(already referenced in)'} -> ${res.agentsPath}`);
      }
    }

    console.log('\nDone:\n' + results.join('\n'));
    if (targets.has('project') || targets.has('global')) {
      console.log('\nRestart Claude Code (or start a new session) for the change to take effect.');
    }
  } finally {
    if (rl) rl.close();
  }
}

main().catch((err) => {
  console.error(err.stack || err.message || err);
  process.exitCode = 1;
});
