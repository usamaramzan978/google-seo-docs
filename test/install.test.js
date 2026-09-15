'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const {
  copySkill,
  removeSkill,
  appendAgentsMd,
  removeAgentsMdReference,
  EXCLUDE,
} = require('../bin/install.js');

function tmpDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'google-seo-docs-test-'));
}

test('copySkill: fresh install copies content, excludes installer plumbing', () => {
  const base = tmpDir();
  const dest = path.join(base, '.claude', 'skills', 'google-seo-docs');
  const res = copySkill(dest, false);

  assert.equal(res.status, 'installed');
  assert.ok(fs.existsSync(path.join(dest, 'SKILL.md')));
  assert.ok(fs.existsSync(path.join(dest, '1 - Essentials')));
  for (const excluded of EXCLUDE) {
    assert.ok(!fs.existsSync(path.join(dest, excluded)), `${excluded} should not be copied`);
  }

  fs.rmSync(base, { recursive: true, force: true });
});

test('copySkill: skips an existing install when update is false', () => {
  const base = tmpDir();
  const dest = path.join(base, '.claude', 'skills', 'google-seo-docs');
  copySkill(dest, false);
  fs.writeFileSync(path.join(dest, 'MARKER.md'), 'user content');

  const res = copySkill(dest, false);

  assert.equal(res.status, 'skipped');
  assert.ok(fs.existsSync(path.join(dest, 'MARKER.md')), 'existing install must be left untouched');

  fs.rmSync(base, { recursive: true, force: true });
});

test('copySkill: update replaces the install and drops stale files', () => {
  const base = tmpDir();
  const dest = path.join(base, '.claude', 'skills', 'google-seo-docs');
  copySkill(dest, false);
  fs.writeFileSync(path.join(dest, 'STALE.md'), 'no longer shipped upstream');

  const res = copySkill(dest, true);

  assert.equal(res.status, 'updated');
  assert.ok(!fs.existsSync(path.join(dest, 'STALE.md')), 'update must not merge, only replace');
  assert.ok(fs.existsSync(path.join(dest, 'SKILL.md')));

  fs.rmSync(base, { recursive: true, force: true });
});

test('removeSkill: removes an existing install, no-ops on a missing one', () => {
  const base = tmpDir();
  const dest = path.join(base, '.claude', 'skills', 'google-seo-docs');
  copySkill(dest, false);

  const res1 = removeSkill(dest);
  assert.equal(res1.removed, true);
  assert.ok(!fs.existsSync(dest));

  const res2 = removeSkill(dest);
  assert.equal(res2.removed, false);

  fs.rmSync(base, { recursive: true, force: true });
});

test('appendAgentsMd: creates AGENTS.md and is idempotent', () => {
  const base = tmpDir();
  const skillMd = path.join(base, 'SKILL.md');

  const res1 = appendAgentsMd(base, skillMd);
  assert.equal(res1.updated, true);
  const contents1 = fs.readFileSync(res1.agentsPath, 'utf8');
  assert.match(contents1, /Google SEO Docs skill/);

  const res2 = appendAgentsMd(base, skillMd);
  assert.equal(res2.updated, false);
  const contents2 = fs.readFileSync(res2.agentsPath, 'utf8');
  assert.equal(contents1, contents2, 're-running must not duplicate the line');

  fs.rmSync(base, { recursive: true, force: true });
});

test('appendAgentsMd: preserves existing AGENTS.md content', () => {
  const base = tmpDir();
  const agentsPath = path.join(base, 'AGENTS.md');
  fs.writeFileSync(agentsPath, '# Project instructions\n\nUse strict mode.\n');

  appendAgentsMd(base, path.join(base, 'SKILL.md'));

  const contents = fs.readFileSync(agentsPath, 'utf8');
  assert.match(contents, /Use strict mode\./);
  assert.match(contents, /Google SEO Docs skill/);

  fs.rmSync(base, { recursive: true, force: true });
});

test('removeAgentsMdReference: deletes the file if the reference was its only content', () => {
  const base = tmpDir();
  appendAgentsMd(base, path.join(base, 'SKILL.md'));

  const res = removeAgentsMdReference(base);

  assert.equal(res.removed, true);
  assert.equal(res.deletedFile, true);
  assert.ok(!fs.existsSync(path.join(base, 'AGENTS.md')));

  fs.rmSync(base, { recursive: true, force: true });
});

test('removeAgentsMdReference: preserves surrounding content otherwise', () => {
  const base = tmpDir();
  const agentsPath = path.join(base, 'AGENTS.md');
  fs.writeFileSync(agentsPath, '# Project instructions\n\nUse strict mode.\n');
  appendAgentsMd(base, path.join(base, 'SKILL.md'));

  const res = removeAgentsMdReference(base);

  assert.equal(res.removed, true);
  assert.equal(res.deletedFile, false);
  const contents = fs.readFileSync(agentsPath, 'utf8');
  assert.match(contents, /Use strict mode\./);
  assert.doesNotMatch(contents, /Google SEO Docs skill/);

  fs.rmSync(base, { recursive: true, force: true });
});

test('removeAgentsMdReference: reports missing file / absent reference without throwing', () => {
  const base = tmpDir();

  const res1 = removeAgentsMdReference(base);
  assert.equal(res1.removed, false);
  assert.equal(res1.reason, 'no AGENTS.md found');

  fs.writeFileSync(path.join(base, 'AGENTS.md'), 'unrelated content\n');
  const res2 = removeAgentsMdReference(base);
  assert.equal(res2.removed, false);
  assert.equal(res2.reason, 'not referenced');

  fs.rmSync(base, { recursive: true, force: true });
});
