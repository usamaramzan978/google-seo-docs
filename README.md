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
1 - Essentials/                  Search Essentials, technical requirements, spam policies
2 - SEO fundamentals/            Starter guide, how Search works, helpful content, AI guidance
3 - Crawling and indexing/       Sitemaps, robots.txt, canonicalization, JavaScript, metadata,
                                 removals, AMP, site moves, crawler management
4 - Ranking and search appearance/   (planned)
5 - Monitoring and debugging/        (planned)
6 - Site-specific guides/            (planned)
```

57 documents so far. Sections 4-6 are still being filled in.

## Roadmap

- [ ] Complete sections 4-6
- [ ] Add source URL + sync date to each file's frontmatter
- [ ] Convert to installable agent skills

## Contributing

Found a doc that's out of date with the official version? Open an issue with the page URL, or a PR with the refreshed Markdown.

## License and attribution

The documentation content in this repository is authored by Google and published on
[Google Search Central](https://developers.google.com/search/docs) under the
[Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/).
It is reproduced here under those terms. See [NOTICE](NOTICE) for details.

This repository is not affiliated with, endorsed by, or sponsored by Google.
Google and Google Search are trademarks of Google LLC.

For authoritative, current guidance, always refer to the official documentation.
