# Google SEO Docs

Google Search Central documentation, mirrored as clean Markdown. Organized by topic and ready to feed into AI agents, RAG pipelines, or your own SEO skills.

Source: [developers.google.com/search/docs](https://developers.google.com/search/docs)

## Why this exists

Google's SEO documentation is excellent but lives behind a web UI — hard to grep, hard to diff, hard to hand to an LLM as context. This repo keeps the same content as plain Markdown so you can:

- Search the whole corpus with `grep` or `ripgrep`
- Load it as context for AI coding agents (Claude Code, Cursor, etc.)
- Index it into a RAG pipeline or vector store
- Track what changed between syncs with `git diff`

## Structure

```
1 - Essentials/                      Search Essentials, technical requirements, spam policies
2 - SEO fundamentals/                Starter guide, how Search works, helpful content, AI guidance
3 - Crawling and indexing/           Sitemaps, robots.txt, canonicalization, JavaScript, metadata,
                                     removals, AMP, site moves, crawler management
4 - Ranking and search appearance/   Structured data, page experience, ranking systems and updates,
                                     local/translated features, Web Stories, search appearance
5 - Monitoring and debugging.md/     Search Console, search operators, traffic-drop debugging,
                                     abuse prevention
6 - Site-specific guides/            Ecommerce, explicit content, international & multilingual
```

159 documents. See [SKILL.md](SKILL.md) for a full per-file index.

## Use it as an agent skill

This repo doubles as an installable [Agent Skill](https://code.claude.com/docs/en/skills):
[SKILL.md](SKILL.md) is a router that indexes every file below by topic, so an agent
reads only the specific doc it needs instead of the whole corpus.

### Install — Claude Code

1. Push this repo to GitHub if you haven't yet (`git push`) — needed for step 2's
   `npx github:` form. Already have it cloned locally? Skip to step 3.
2. Run the installer without cloning:
   ```bash
   npx github:usamaramzan978/google-seo-docs
   ```
3. Or, from inside a local clone of this repo:
   ```bash
   node bin/install.js
   ```
4. Answer the prompt:
   ```
   Where do you want to install the "google-seo-docs" skill?

     1) This project only     -> .claude/skills/google-seo-docs   (Claude Code)
     2) All your projects     -> ~/.claude/skills/google-seo-docs (Claude Code, global)
     3) AGENTS.md reference    -> for Codex, Cursor, Windsurf, or any agent without a skills folder
     4) All of the above

   Choose one or more, comma-separated [1]:
   ```
   - Type `1` for just the current project, `2` for every project on your machine,
     `3` if you're targeting a non-Claude-Code agent, or `4` for all of them.
     Comma-separate to pick more than one, e.g. `1,3`.
   - If you picked an option involving a project (`1` or `3`), it then asks which
     project directory — press Enter to use the current directory, or type a path.
5. Restart Claude Code (or start a new session). The skill now shows up automatically
   — nothing else to configure.

Re-running the installer later is safe: it skips anything already installed
instead of overwriting it.

**Scripting it instead of answering prompts** (CI, dotfiles, etc.):
```bash
node bin/install.js --project              # this project, current directory
node bin/install.js --global                # ~/.claude/skills, all projects
node bin/install.js --agents-md             # append reference to ./AGENTS.md
node bin/install.js --project=../my-app --global --yes   # combine, skip confirmations
node bin/install.js --help                  # full flag reference
```

### Install — Claude.ai / Claude Desktop

These don't read your local filesystem, so you upload a zip instead:

1. From inside this repo, zip it (SKILL.md must end up at the zip root):
   ```bash
   zip -r ../google-seo-docs.zip . -x '.git/*' -x 'node_modules/*'
   ```
2. In Claude.ai or Claude Desktop, go to **Settings → Capabilities → Skills → Upload skill**.
3. Upload `google-seo-docs.zip`.

### Install — Codex, Cursor, or any other AGENTS.md-based agent

These don't have Claude's skills-folder mechanism, so instead the index gets
loaded as plain project context:

1. Run the installer (see above) and choose option `3` (or `4`) at the prompt —
   this appends a line pointing at `SKILL.md` to that project's `AGENTS.md`
   (creating the file if it doesn't exist).
2. That's it — the agent reads `AGENTS.md` automatically on every session, so the
   index is already in context. No separate trigger step.

### Using it once installed

- **Claude Code / Claude.ai / Desktop**: you usually don't have to ask — Claude
  reads every installed skill's description up front and invokes this one on its
  own when your prompt is SEO-shaped (robots.txt, schema markup, Core Web Vitals,
  Search Console, ranking, indexing, etc.). To force it: type `/google-seo-docs`
  as a slash command in Claude Code, or say "use the google-seo-docs skill".
- **Codex / Cursor / other AGENTS.md agents**: just ask the SEO question directly;
  if it doesn't check the docs on its own, point it at `SKILL.md` explicitly.

### Uninstall

Same installer, same menu, with `--uninstall` added. Interactively:

```bash
node bin/install.js --uninstall
```

```
Where do you want to remove the "google-seo-docs" skill from?

  1) This project only     -> .claude/skills/google-seo-docs   (Claude Code)
  2) All your projects     -> ~/.claude/skills/google-seo-docs (Claude Code, global)
  3) AGENTS.md reference    -> for Codex, Cursor, Windsurf, or any agent without a skills folder
  4) All of the above

Choose one or more, comma-separated [1]:
```

It asks you to confirm each deletion before it happens. Removing the `AGENTS.md`
reference only deletes the one line it added — any other content in that file is
left untouched (and the file itself is only deleted if that line was the entire
contents).

Non-interactively (skips confirmation):

```bash
node bin/install.js --uninstall --project --yes      # this project, current directory
node bin/install.js --uninstall --global --yes        # ~/.claude/skills, all projects
node bin/install.js --uninstall --agents-md --yes     # drop the AGENTS.md reference
node bin/install.js --uninstall --project --global --agents-md --yes   # remove everywhere
```

**Claude.ai / Claude Desktop**: Settings → Capabilities → Skills → find
"google-seo-docs" → remove it. There's no file to clean up locally since it was
uploaded as a zip.

## Roadmap

- [ ] Complete sections 4-6
- [ ] Add source URL + sync date to each file's frontmatter
- [x] Convert to installable agent skills

## Contributing

Found a doc that's out of date with the official version? Open an issue with the page URL, or a PR with the refreshed Markdown.

Adding, renaming, or removing a `.md` file under any of the six numbered
sections? Update [SKILL.md](SKILL.md)'s index to match, then run:

```bash
npm run check-links
```

It flags any link in `SKILL.md` pointing at a file that no longer exists, and
any content file that isn't indexed yet. CI doesn't run this automatically —
run it yourself before opening a PR.

## License and attribution

The documentation content in this repository is authored by Google and published on
[Google Search Central](https://developers.google.com/search/docs) under the
[Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/).
It is reproduced here under those terms. See [NOTICE](NOTICE) for details.

This repository is not affiliated with, endorsed by, or sponsored by Google.
Google and Google Search are trademarks of Google LLC.

For authoritative, current guidance, always refer to the official documentation.
