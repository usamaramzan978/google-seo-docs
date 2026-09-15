# List of Google Crawlers and Fetchers | Google Search Central

# Overview of Google crawlers and fetchers (user agents)

Google employs crawlers and fetchers to perform actions for its products, either automatically or
triggered by user requests. A "crawler" (also called a "robot" or "spider") is a generic term for
any program used to automatically discover and scan websites. Fetchers operate like `wget` and
typically make single requests on behalf of users.

## Three categories of Google's clients

### Common crawlers

Common crawlers are used for Google's products such as Googlebot. They always respect
robots.txt rules for automatic crawls.

### Special-case crawlers

Special-case crawlers are similar to common crawlers but are used by specific products where
there's an agreement between the crawled site and Google about the crawl process. For example,
AdsBot ignores the global robots.txt user agent (`*`) with the ad publisher's permission.

### User-triggered fetchers

User-triggered fetchers are part of tools and product functions where the end user triggers a
fetch. For example, Google Site Verifier acts on user request.

## Technical properties

### Infrastructure

Google's crawlers and fetchers are designed to run simultaneously across thousands of machines.
They're distributed across datacenters worldwide to optimize bandwidth usage, so logs may show
visits from multiple IP addresses.

### Transfer protocols

Google's crawlers support HTTP/1.1 and HTTP/2. The default is HTTP/1.1. Crawling over HTTP/2 may
save computing resources but provides no Google-product specific benefit. Crawling through FTP and
FTPS is also supported but rare.

### Content encodings

Supported encodings include gzip, deflate, and Brotli (`br`), as advertised in the
`Accept-Encoding` header.

### File size limits

By default, Google crawls only the first 15MB of a file. Individual projects may set different
limits for specific crawlers or file types.

### Crawl rate and host load

Google aims to crawl as many pages as possible without overwhelming servers. Sites experiencing
issues can
[reduce their crawl rate](https://developers.google.com/crawling/docs/crawlers-fetchers/reduce-crawl-rate).
Inappropriate HTTP response codes may affect how sites appear in Google products.

### HTTP caching

Google's infrastructure supports heuristic HTTP caching via:

- **ETag and If-None-Match**: Used as defined by the HTTP caching standard.
- **Last-Modified and If-Modified-Since**: Used as defined by the HTTP caching standard, with
  these caveats:
  - Dates must follow HTTP standard format: "Weekday, DD Mon YYYY HH:MM:SS Timezone" (e.g.,
    "Fri, 4 Sep 1998 19:15:56 GMT").
  - Consider setting the `Cache-Control` `max-age` field to help crawlers determine recrawl
    timing.

Individual crawlers may or may not use caching depending on their associated product's needs. For
example, Googlebot supports caching when re-crawling for Google Search, while Storebot-Google
only supports caching in certain conditions.

## Verifying Google's crawlers and fetchers

Google's crawlers identify themselves through three methods:

1. The HTTP `user-agent` request header
2. The source IP address of the request
3. The reverse DNS hostname of the source IP

Learn how to
[verify Googlebot and other Google crawlers](https://developers.google.com/crawling/docs/crawlers-fetchers/verify-google-requests).
