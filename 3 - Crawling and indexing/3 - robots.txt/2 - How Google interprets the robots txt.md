---
source: https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec
synced: 2026-09-15
---

# How Google Interprets the robots.txt Specification | Google Search Central

# How Google interprets the robots.txt specification

Google's automated crawlers support the Robots Exclusion Protocol (REP). Before crawling a site,
Google's crawlers download and parse the site's robots.txt file to extract information about
which parts of the site may be crawled.

## What is a robots.txt file

A robots.txt file is a text file containing rules about crawler access. Rules can permit or deny
access to specific directories, with certain exceptions for particular crawlers like Googlebot.

## File location and validity

The robots.txt file must be placed in the top-level directory of a site. The rules listed in the
robots.txt file apply only to the host, protocol, and port number where the robots.txt file is
hosted.

Key points:

- Must use a supported protocol (HTTP, HTTPS, FTP)
- URLs are case-sensitive
- Rules don't apply to subdomains or different port numbers automatically
- IDNs are equivalent to their punycode versions

## HTTP status code handling

- **2xx (success)**: File is processed normally.
- **3xx (redirection)**: Google follows up to five redirect hops, then treats it as a 404.
- **4xx (client errors)**: Treated as if no robots.txt exists (except 429).
- **5xx (server errors)**: Initial 12-hour halt, then 30-day cache use, then Google assumes no
  restrictions.

## Caching

Google generally caches the contents of a robots.txt file for up to 24 hours, but may cache it
longer when refreshing isn't possible.

## File format

- Must be UTF-8 encoded plain text.
- Line separators: CR, CR/LF, or LF.
- Maximum size: 500 kibibytes.

## Supported fields

- `user-agent`: Identifies the target crawler.
- `allow`: Specifies crawlable paths.
- `disallow`: Specifies non-crawlable paths.
- `sitemap`: Points to the sitemap location.

## URL matching and wildcards

Google supports limited wildcards:

- `*` = zero or more characters
- `$` = end of the URL

## Rule precedence

When conflicts arise, Google uses the least restrictive rule and selects based on path length
specificity.
