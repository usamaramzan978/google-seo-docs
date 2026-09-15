---
source: https://developers.google.com/crawling/docs/crawlers-fetchers/reduce-crawl-rate
synced: 2026-09-15
---

# Reduce Google's Crawl Rate | Google Search Central

# Reduce Google's crawl rate

Google's crawler infrastructure uses sophisticated algorithms to determine optimal crawl rates
for websites. The goal is to crawl as many pages as possible without overwhelming servers. In
cases where Google's crawling causes critical load or unwanted costs, you can reduce the number
of requests from Google's crawlers.

## Understand the cause of the sharp increase in crawling

Sharp increases in crawling may stem from site structure inefficiencies or other issues. Common
causes include:

- Inefficient URL configuration, typically caused by:
  - Faceted navigation or sorting and filtering functionality
  - Calendars with many URLs for specific dates
- A Dynamic Search Ad target

Google recommends checking with your hosting company and reviewing server access logs to identify
traffic sources. Then consult guides on managing faceted navigation URLs and optimizing crawling
efficiency.

## Urgently reduce crawler traffic (for emergencies)

> [!WARNING]
> Reducing Google's crawl rate has broad effects. For Search, Googlebot will discover fewer new
> pages, existing pages refresh less frequently (prices and availability take longer to update),
> and removed pages stay indexed longer. For Google Ads, campaigns may be cancelled or paused,
> and ads may not serve.

For short-term reductions (hours to 1-2 days), return `500`, `503`, or `429` HTTP status codes
instead of `200` to crawl requests. Google reduces crawl rates when encountering significant
numbers of these error codes across a hostname. The rate automatically increases as errors
decrease.

> [!WARNING]
> Avoid this approach long-term (beyond 1-2 days) as it negatively impacts site visibility in
> Google products. URLs returning these codes for multiple days may be dropped from Google's
> index.

## Exceptional requests to reduce crawl rate

If returning errors isn't feasible,
[file a special request](https://search.google.com/search-console/googlebot-report) reporting
unusually high crawl rates and specifying your optimal rate. You cannot request rate increases,
and evaluation may take several days.
