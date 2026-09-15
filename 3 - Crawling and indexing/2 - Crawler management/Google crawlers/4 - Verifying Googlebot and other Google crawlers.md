# Verify Googlebot and Other Google Crawlers | Google Search Central

# Verify Google's crawlers and fetchers

You can verify if a request to your server originates from Google by checking reverse DNS lookups
and comparing IP addresses against published ranges. This helps protect against spammers falsely
claiming to represent Google.

## Google's crawler categories

| Type | Description | Reverse DNS mask | IP ranges |
| --- | --- | --- | --- |
| Common crawlers | Used for Google products like Googlebot; respect robots.txt | `crawl-***-***-***-***.googlebot.com` or `geo-crawl-***-***-***-***.geo.googlebot.com` | [common-crawlers.json](https://developers.google.com/static/crawling/ipranges/common-crawlers.json) |
| Special-case crawlers | Perform specific functions (e.g., AdsBot); may not respect robots.txt | `rate-limited-proxy-***-***-***-***.google.com` | [special-crawlers.json](https://developers.google.com/static/crawling/ipranges/special-crawlers.json) |
| User-triggered fetchers | End-user initiated fetches; ignore robots.txt | `***-***-***-***.gae.googleusercontent.com` or `google-proxy-***-***-***-***.google.com` | [user-triggered-fetchers.json](https://developers.google.com/static/crawling/ipranges/user-triggered-fetchers.json), [user-triggered-fetchers-google.json](https://developers.google.com/static/crawling/ipranges/user-triggered-fetchers-google.json), [user-triggered-agents.json](https://developers.google.com/static/crawling/ipranges/user-triggered-agents.json) |

## Verification methods

### Manual verification using the command line

1. Run a reverse DNS lookup on the accessing IP address using the `host` command.
2. Verify the domain is `googlebot.com`, `google.com`, or `googleusercontent.com`.
3. Run a forward DNS lookup on the retrieved domain name.
4. Confirm it matches the original IP address.

Example commands:

```
host 66.249.66.1
host 35.247.243.240
host 66.249.90.77
```

### Automatic verification

Match the crawler's IP address against published JSON lists of Google IP ranges in CIDR format
for:

- Common crawlers
- Special crawlers
- User-triggered fetchers
- General [Google IP addresses](https://www.gstatic.com/ipranges/goog.json) (for services like
  Apps Script)
