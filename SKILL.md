---
name: google-seo-docs
description: Reference library covering Google's official Search Central documentation and practical SEO tactics -- Search Essentials, SEO fundamentals, crawling and indexing (sitemaps, robots.txt, canonicalization, JavaScript SEO, metadata, removals, site moves), ranking and search appearance (structured data/schema.org markup, Core Web Vitals, page experience, featured snippets, Google Discover, ranking systems and updates), monitoring and debugging (Search Console, search operators, traffic-drop diagnosis, abuse prevention), and site-specific guides (ecommerce, international/multilingual, explicit content). Use this skill whenever a task involves Google Search behavior or SEO: answering an SEO question, auditing or writing web content for search compliance, choosing or debugging schema.org/JSON-LD structured data, configuring robots.txt or sitemaps, diagnosing indexing or crawling problems, interpreting Search Console data, or explaining how a Google ranking system or algorithm update works.
license: Content mirrors Google Search Central documentation, licensed CC BY 4.0 by Google. See NOTICE and README.md for attribution terms.
---

# Google SEO Docs

A local, greppable mirror of Google's official Search Central documentation, plus a
practical tips file, organized into a browsable reference corpus. It exists so an
agent can answer SEO questions with the same guidance Google itself publishes,
without needing network access.

## How to use this skill

This corpus is too large to read in full (159 reference documents, ~2.7 MB). Do not
read every file. Instead:

1. **Start from the index below.** It is grouped by the same six top-level sections
   as the repository, mirroring Google's own documentation structure. Scan the
   section and titles closest to the user's question.
2. **Read only the specific file(s) that match the question**, using the exact
   relative path shown (paths are wrapped in `<angle brackets>` in the index because
   several contain spaces, colons, or parentheses -- strip the brackets when passing
   the path to a file-reading tool).
3. **Prefer the most specific file over a section overview** when one exists (e.g. for
   a question about `robots.txt` syntax, read `3 - Crawling and indexing/3 - robots.txt/1 - intro.md`
   directly rather than the section-1 index).
4. **For structured data / schema.org questions**, go straight to
   `4 - Ranking and search appearance/Structured data/Feature guides/` -- there is one
   file per schema type (Article, Recipe, Product, JobPosting, etc.).
5. **For quick, actionable tactics** (as opposed to Google's official reference
   docs), check [tips.md](tips.md) first -- it's a short, practical playbook (e.g.
   finding striking-distance keywords in Search Console, fixing low-CTR pages) that
   is faster to scan than the full reference docs.
6. **When advising a user**, ground recommendations in what these files actually say
   rather than general SEO folk wisdom, and note that this is a point-in-time mirror
   -- for anything time-sensitive (algorithm updates, policy changes), flag that the
   user should verify against the live docs at developers.google.com/search/docs.

## Section map

| Section                              | Covers                                                                                                                                                                                                                                   |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `1 - Essentials/`                    | Search Essentials (spam policies, technical requirements) -- the baseline rules for being eligible to appear in Google Search                                                                                                            |
| `2 - SEO fundamentals/`              | Starter guide, how Search works, helpful-content guidance, AI-generated content guidance, do-you-need-an-SEO                                                                                                                             |
| `3 - Crawling and indexing/`         | Sitemaps, crawler management incl. Googlebot, robots.txt, canonicalization, AMP, mobile-first indexing, JavaScript SEO, metadata/meta tags, removals, site moves/redirects                                                               |
| `4 - Ranking and search appearance/` | Title links, snippets, sitelinks, favicons, structured data (incl. per-type feature guides and shopping markup), page experience & Core Web Vitals, ranking systems and update history, local features, translated features, Web Stories |
| `5 - Monitoring and debugging/`      | Debugging traffic drops, Search Console usage, search operators, preventing/monitoring site abuse and malware                                                                                                                            |
| `6 - Site-specific guides/`          | Ecommerce, explicit content, international & multilingual sites                                                                                                                                                                          |

## Full index

### 1 - Essentials

- [Google Search Essentials (formerly Webmaster Guidelines)](<1 - Essentials/overview.md>)
- [Spam policies for Google web search](<1 - Essentials/spam-policies.md>)
- [Google Search Technical Requirements](<1 - Essentials/technical.md>)

### 2 - SEO fundamentals

- [SEO Starter Guide: The Basics](<2 - SEO fundamentals/1 - seo-starter-guide.md>)
- [In-Depth Guide to How Google Search Works](<2 - SEO fundamentals/2 - how-search-works.md>)
- [Creating Helpful, Reliable, People-First Content](<2 - SEO fundamentals/3 - creating-helpful-content.md>)
- [Optimizing your website for generative AI features on Google Search](<2 - SEO fundamentals/4 - ai-optimization-guide.md>)
- [Google Search's Guidance on Generative AI Content on Your Website](<2 - SEO fundamentals/5 - using-gen-ai-content.md>)
- [Technical SEO Techniques and Strategies](<2 - SEO fundamentals/6 - get-started.md>)
- [SEO Guide for Web Developers](<2 - SEO fundamentals/7 - get-started-developers.md>)
- [Do you need an SEO?](<2 - SEO fundamentals/8 - do-i-need-seo.md>)
- [Google Search's guidance on using third-party SEO tools, services, and advice](<2 - SEO fundamentals/9 - third-party-seo.md>)

### 3 - Crawling and indexing

- [Google Crawling and Indexing](<3 - Crawling and indexing/1- index.md>)
- [File Types Indexable by Google](<3 - Crawling and indexing/2 - indexable-file-types.md>)
- [URL Structure Best Practices for Google Search](<3 - Crawling and indexing/3 - url-structure.md>)
- [SEO Link Best Practices for Google](<3 - Crawling and indexing/4 - links-crawlable.md>)
- [Mobile-first Indexing Best Practices](<3 - Crawling and indexing/5 - mobile-sites-mobile-first-indexing.md>)
- **1 - sitemaps/**
  - [What Is a Sitemap](<3 - Crawling and indexing/1 - sitemaps/1 - overview.md>)
  - [Build and submit a sitemap](<3 - Crawling and indexing/1 - sitemaps/2 - build-sitemap.md>)
  - [Manage Your Sitemaps With Sitemap Index Files](<3 - Crawling and indexing/1 - sitemaps/3 - large-sitemaps.md>)
  - [Image Sitemaps](<3 - Crawling and indexing/1 - sitemaps/4 - image-sitemaps.md>)
  - [Create a News Sitemap](<3 - Crawling and indexing/1 - sitemaps/5 - news-sitemap.md>)
  - [Video sitemaps and alternatives](<3 - Crawling and indexing/1 - sitemaps/6 - video-sitemaps.md>)
  - [How to Combine Sitemap Extensions](<3 - Crawling and indexing/1 - sitemaps/7 - combine-sitemap-extensions.md>)
- **2 - Crawler management/**
  - [Ask Google to Recrawl Your Website](<3 - Crawling and indexing/2 - Crawler management/1 - ask-google-to-recrawl.md>)
  - [Troubleshoot Google Search Crawling Errors](<3 - Crawling and indexing/2 - Crawler management/2 - troubleshoot-crawling-errors.md>)
  - **Google crawlers/**
    - [List of Google Crawlers and Fetchers](<3 - Crawling and indexing/2 - Crawler management/Google crawlers/1 - List of Google crawlers.md>)
    - [What Is Googlebot](<3 - Crawling and indexing/2 - Crawler management/Google crawlers/2 - googlebot.md>)
    - [Reduce Google's Crawl Rate](<3 - Crawling and indexing/2 - Crawler management/Google crawlers/3 - Reduce the Google crawl rate.md>)
    - [Verify Googlebot and Other Google Crawlers](<3 - Crawling and indexing/2 - Crawler management/Google crawlers/4 - Verifying Googlebot and other Google crawlers.md>)
- **3 - robots.txt/**
  - [Robots.txt Introduction and Guide](<3 - Crawling and indexing/3 - robots.txt/1 - intro.md>)
  - [How Google Interprets the robots.txt Specification](<3 - Crawling and indexing/3 - robots.txt/2 - How Google interprets the robots txt.md>)
- **4 - canonicalization/**
  - [What is canonicalization](<3 - Crawling and indexing/4 - canonicalization/1 - index.md>)
  - [How to specify a canonical URL with rel="canonical" and other methods](<3 - Crawling and indexing/4 - canonicalization/2 - consolidate-duplicate-urls.md>)
  - [Fix canonicalization issues](<3 - Crawling and indexing/4 - canonicalization/3 - canonicalization-troubleshooting.md>)
- **5 - amp/**
  - [About AMP on Google Search](<3 - Crawling and indexing/5 - amp/1 - about-AMP.md>)
  - [Enhance AMP content in Google Search](<3 - Crawling and indexing/5 - amp/2 - enhance-amp.md>)
  - [Validate your AMP content](<3 - Crawling and indexing/5 - amp/3 - validate-amp.md>)
  - [Remove your AMP pages from Google Search](<3 - Crawling and indexing/5 - amp/4 - remove-amp.md>)
- **6 - javascript/**
  - [Understand JavaScript SEO Basics](<3 - Crawling and indexing/6 - javascript/1 - javascript-seo-basics.md>)
  - [Fix Search-Related JavaScript Problems](<3 - Crawling and indexing/6 - javascript/2 - fix-search-javascript.md>)
  - [Fix Lazy-Loaded Website Content](<3 - Crawling and indexing/6 - javascript/3 - lazy-loading.md>)
  - [Dynamic Rendering as a workaround](<3 - Crawling and indexing/6 - javascript/4 - dynamic-rendering.md>)
- **7 - Page and content metadata/**
  - [Valid Page Metadata for Google Search](<3 - Crawling and indexing/7 - Page and content metadata/1 - valid-page-metadata.md>)
  - **meta-tags/**
    - [Meta Tags and Attributes that Google Supports](<3 - Crawling and indexing/7 - Page and content metadata/meta-tags/1 - special-tags.md>)
    - [Robots Meta Tags Specifications](<3 - Crawling and indexing/7 - Page and content metadata/meta-tags/2 - robots-meta-tag.md>)
    - [Block Search Indexing with noindex](<3 - Crawling and indexing/7 - Page and content metadata/meta-tags/3 - block-indexing.md>)
    - [Qualify Outbound Links for SEO](<3 - Crawling and indexing/7 - Page and content metadata/meta-tags/4 - qualify-outbound-links.md>)
- **8 - removals/**
  - [Control the Content You Share on Search](<3 - Crawling and indexing/8 - removals/1 - control-what-you-share.md>)
  - [Remove Your Site Info from Google](<3 - Crawling and indexing/8 - removals/2 - remove-information.md>)
  - [Remove your own site's images from Google Search](<3 - Crawling and indexing/8 - removals/3 - prevent-images-on-your-page.md>)
  - [Keep Redacted Information out of Google](<3 - Crawling and indexing/8 - removals/4 - keep-redacted-information-out.md>)
- **9 - site-move-and-chnages/**
  - [Redirects and Google Search](<3 - Crawling and indexing/9 - site-move-and-chnages/1 - 301-redirects.md>)
  - [Changing Your Web Hosting and SEO](<3 - Crawling and indexing/9 - site-move-and-chnages/2 - site-move-no-url-changes.md>)
  - [How to move a site](<3 - Crawling and indexing/9 - site-move-and-chnages/3 - site-move-with-url-changes.md>)
  - [A/B Testing Best Practices for Search](<3 - Crawling and indexing/9 - site-move-and-chnages/4 - website-testing.md>)
  - [Temporarily Pause Or Disable Website](<3 - Crawling and indexing/9 - site-move-and-chnages/5 - pause-online-business.md>)

### 4 - Ranking and search appearance

- [Overview of Search appearance topics](<4 - Ranking and search appearance/1 - Overview.md>)
- [Site Names in Google Search](<4 - Ranking and search appearance/10 - site-names.md>)
- [Learn About What Sitelinks Are](<4 - Ranking and search appearance/11 - sitelinks.md>)
- [Control your snippets in search results](<4 - Ranking and search appearance/12 - snippet.md>)
- [Influencing Title Links in Google Search](<4 - Ranking and search appearance/13 - title-link.md>)
- [Video SEO best practices](<4 - Ranking and search appearance/14 - videos.md>)
- [Visual Elements Gallery of Google Search](<4 - Ranking and search appearance/15 - Visual Elements gallery.md>)
- [AI Features and Your Website](<4 - Ranking and search appearance/2- ai-features.md>)
- [Add a Byline Date to Google Search Results](<4 - Ranking and search appearance/3- publication-dates.md>)
- [Define a favicon to show in search results](<4 - Ranking and search appearance/4 - favicon-in-search.md>)
- [Featured Snippets and Your Website](<4 - Ranking and search appearance/5- featured-snippets.md>)
- [Flexible Sampling Guidelines](<4 - Ranking and search appearance/6 - flexible-sampling.md>)
- [Get on Discover](<4 - Ranking and search appearance/7 - google-discover.md>)
- [Image SEO Best Practices](<4 - Ranking and search appearance/8 - google-images.md>)
- [Help your readers find your site through preferred sources in Google Search](<4 - Ranking and search appearance/9 - preferred-sources.md>)
- **Early Adopters Program/**
  - [Package Tracking on Google](<4 - Ranking and search appearance/Early Adopters Program/Package tracking.md>)
- **Local features/**
  - [Add Business Details to Google](<4 - Ranking and search appearance/Local features/1 - establish-business-details.md>)
  - [Top Places List Optimization](<4 - Ranking and search appearance/Local features/2 - top-places-list.md>)
  - [Opt Out of Local Search Results and Other Google Properties](<4 - Ranking and search appearance/Local features/3 - Opting out of local search results.md>)
- **Page experience/**
  - [Understanding Google Page Experience](<4 - Ranking and search appearance/Page experience/1 - understadning.md>)
  - [Understanding Core Web Vitals and Google search results](<4 - Ranking and search appearance/Page experience/2 - core-web-vitals.md>)
  - [Interstitials and dialogs](<4 - Ranking and search appearance/Page experience/3 - avoid-intrusive-interstitials.md>)
- **Ranking Updates/**
  - [List of Google Search Ranking Updates](<4 - Ranking and search appearance/Ranking Updates/1 - list.md>)
  - [Google Search's Core Updates](<4 - Ranking and search appearance/Ranking Updates/2 - core-updates.md>)
  - [Google Search Spam Updates](<4 - Ranking and search appearance/Ranking Updates/3 - spam-updates.md>)
- **Ranking systems/**
  - [A Guide to Google Search Ranking Systems](<4 - Ranking and search appearance/Ranking systems/1- ranking-systems-guide.md>)
  - [Google Search's Reviews System](<4 - Ranking and search appearance/Ranking systems/2 - reviews-system.md>)
- **Structured data/**
  - [Intro to How Structured Data Markup Works](<4 - Ranking and search appearance/Structured data/1 - intro-structured-data.md>)
  - [General structured data guidelines](<4 - Ranking and search appearance/Structured data/2 - sd-policies.md>)
  - [Enriched and Interactive Search Results](<4 - Ranking and search appearance/Structured data/3 - enriched-search-results.md>)
  - [Generate Structured Data with JavaScript](<4 - Ranking and search appearance/Structured data/4 - generate-structured-data-with-javascript.md>)
  - **Feature guides/**
    - [Learn About Article Schema Markup](<4 - Ranking and search appearance/Structured data/Feature guides/1 - article.md>)
    - [Fact Check (ClaimReview) Markup for Search](<4 - Ranking and search appearance/Structured data/Feature guides/10 - factcheck.md>)
    - [Learn About Google Event Schema Markup](<4 - Ranking and search appearance/Structured data/Feature guides/11 - event.md>)
    - [Google Images SEO: Image Metadata](<4 - Ranking and search appearance/Structured data/Feature guides/12 - image-license-metadata.md>)
    - [Learn About Job Posting Schema Markup](<4 - Ranking and search appearance/Structured data/Feature guides/13 - job-posting.md>)
    - [Local Business (LocalBusiness) Structured Data](<4 - Ranking and search appearance/Structured data/Feature guides/14 - local-business.md>)
    - [Math solver (MathSolver) structured data](<4 - Ranking and search appearance/Structured data/Feature guides/15 - math-solvers.md>)
    - [Mark Up Movies with Structured Data](<4 - Ranking and search appearance/Structured data/Feature guides/16 - movie.md>)
    - [Organization (Organization) structured data](<4 - Ranking and search appearance/Structured data/Feature guides/17 - organization.md>)
    - [Profile Page (ProfilePage) Schema Markup](<4 - Ranking and search appearance/Structured data/Feature guides/18 - profile-page.md>)
    - [Q&A (QAPage) structured data](<4 - Ranking and search appearance/Structured data/Feature guides/19 - qapage.md>)
    - [Book Schema for Google Search](<4 - Ranking and search appearance/Structured data/Feature guides/2- book.md>)
    - [Recipe Schema Markup](<4 - Ranking and search appearance/Structured data/Feature guides/20 - recipe.md>)
    - [Review snippet (Review, AggregateRating) structured data](<4 - Ranking and search appearance/Structured data/Feature guides/21 - review-snippet.md>)
    - [Software App (SoftwareApplication) Schema](<4 - Ranking and search appearance/Structured data/Feature guides/22 - software-app.md>)
    - [Speakable (BETA) Schema Markup](<4 - Ranking and search appearance/Structured data/Feature guides/23 - speakable.md>)
    - [Subscription and Paywalled Content Markup](<4 - Ranking and search appearance/Structured data/Feature guides/24 - paywalled-content.md>)
    - [Vacation Rental Schema Markup](<4 - Ranking and search appearance/Structured data/Feature guides/25 - vacation-rental.md>)
    - [Video (VideoObject, Clip, BroadcastEvent) Schema Markup](<4 - Ranking and search appearance/Structured data/Feature guides/26 - video.md>)
    - [How To Add Breadcrumb (BreadcrumbList) Markup](<4 - Ranking and search appearance/Structured data/Feature guides/3 - breadcrumb.md>)
    - [Carousel (ItemList) Structured Data](<4 - Ranking and search appearance/Structured data/Feature guides/4 - carousel.md>)
    - [Use Schema for Course List](<4 - Ranking and search appearance/Structured data/Feature guides/5 - course.md>)
    - [Dataset Structured Data](<4 - Ranking and search appearance/Structured data/Feature guides/6 - dataset.md>)
    - [Discussion Forum (DiscussionForumPosting, SocialMediaPosting) Schema Markup](<4 - Ranking and search appearance/Structured data/Feature guides/7 - discussion-forum.md>)
    - [Education Q&A (Quiz, Question, and Answer) structured data](<4 - Ranking and search appearance/Structured data/Feature guides/8 - education-qa.md>)
    - [Employer Rating (EmployerAggregateRating) Structured Data](<4 - Ranking and search appearance/Structured data/Feature guides/9 - employer-rating.md>)
    - **shopping/**
      - [Intro to Product Structured Data on Google](<4 - Ranking and search appearance/Structured data/Feature guides/shopping/1 - product-overview.md>)
      - [How To Add Product Snippet Structured Data](<4 - Ranking and search appearance/Structured data/Feature guides/shopping/2 - product-snippet.md>)
      - [Merchant listing (Product, Offer) structured data](<4 - Ranking and search appearance/Structured data/Feature guides/shopping/3 - merchant-listing.md>)
      - [Product Variant Structured Data (ProductGroup, Product)](<4 - Ranking and search appearance/Structured data/Feature guides/shopping/4 - product-variants.md>)
      - [Loyalty Program Structured Data (MemberProgram)](<4 - Ranking and search appearance/Structured data/Feature guides/shopping/5 - loyalty-program.md>)
      - [Merchant Return Policy Structured Data (MerchantReturnPolicy)](<4 - Ranking and search appearance/Structured data/Feature guides/shopping/6 - return-policy.md>)
      - [Merchant Shipping Policy Structured Data (ShippingService)](<4 - Ranking and search appearance/Structured data/Feature guides/shopping/7 - shipping-policy.md>)
- **Translated features/**
  - [Translated Google Search Results](<4 - Ranking and search appearance/Translated features/1 - translated-results.md>)
  - [Ad Networks & Translation Search Features](<4 - Ranking and search appearance/Translated features/2 - ad-network-and-translation.md>)
- **Web Stories/**
  - [Enable Web Stories on Google](<4 - Ranking and search appearance/Web Stories/1 - Enable Web Stories.md>)
  - [Best practices for creating Web Stories](<4 - Ranking and search appearance/Web Stories/2 - Best practices for creating Web Stories.md>)
  - [Google Web Story Content Policies](<4 - Ranking and search appearance/Web Stories/3 - Web Story Content Policies.md>)

### 5 - Monitoring and debugging

- [Debug Google Search Traffic Drops](<5 - Monitoring and debugging/1 - Debugging drops in Search traffic.md>)
- [Get started with Google Trends](<5 - Monitoring and debugging/2 - Get started with Google Trends.md>)
- **Debug with search operators/**
  - [Debugging with Google Search Operators](<5 - Monitoring and debugging/Debug with search operators/1 - overview.md>)
  - [How To Use the Site Search Operator](<5 - Monitoring and debugging/Debug with search operators/2 - site: search operator.md>)
  - [Google Images Search Operators](<5 - Monitoring and debugging/Debug with search operators/3 - Google Images search operators.md>)
- **Monitor with Search Console/**
  - [How To Use Search Console](<5 - Monitoring and debugging/Monitor with Search Console/1 - Get started with Search Console.md>)
  - [How to Create a Search Console Bubble Chart](<5 - Monitoring and debugging/Monitor with Search Console/2 - mproving SEO with a Search Console bubble chart.md>)
  - [Using Search Console and Google Analytics Data for SEO](<5 - Monitoring and debugging/Monitor with Search Console/3 - Using Search Console and Google Analytics data for SEO.md>)
  - [Analyze your social and video platform content performance in Search Console](<5 - Monitoring and debugging/Monitor with Search Console/4 - Analyze your social and video platform content.md>)
- **Preventing and monitoring abuse/**
  - [Prevent Abuse on Your Site](<5 - Monitoring and debugging/Preventing and monitoring abuse/1 - overvierw.md>)
  - [Prevent User-Generated Spam on Your Site](<5 - Monitoring and debugging/Preventing and monitoring abuse/2 - Prevent user-generated spam.md>)
  - [Malware and Unwanted Software Overview](<5 - Monitoring and debugging/Preventing and monitoring abuse/3 - Malware and unwanted software.md>)
  - [How To Prevent Malware Infection](<5 - Monitoring and debugging/Preventing and monitoring abuse/4 - Preventing malware infection.md>)
  - [Social Engineering (Phishing and Deceptive Sites)](<5 - Monitoring and debugging/Preventing and monitoring abuse/5 - Social engineering (phishing and deceptive sites).md>)
  - [Google Safe Browsing Repeat Offenders Policy](<5 - Monitoring and debugging/Preventing and monitoring abuse/6 - Google Safe Browsing Repeat Offenders Policy.md>)

### 6 - Site-specific guides

- **Ecommerce/**
  - [SEO Best Practices for Ecommerce Sites](<6 - Site-specific guides/Ecommerce/1 - overview.md>)
  - [Ecommerce Product Data and Content on Google](<6 - Site-specific guides/Ecommerce/2 - What content can appear.md>)
  - [Share Your Product Data With Google](<6 - Site-specific guides/Ecommerce/3 - Share your product.md>)
  - [Structured Data for Ecommerce Sites](<6 - Site-specific guides/Ecommerce/4 - Include structured data.md>)
  - [How To Launch an Ecommerce Site on Google](<6 - Site-specific guides/Ecommerce/5 - launch a new website.md>)
  - [How To Write Reviews](<6 - Site-specific guides/Ecommerce/6 - Write high quality reviews.md>)
  - [Ecommerce URL Structure Best Practices](<6 - Site-specific guides/Ecommerce/7 - Designing a URL structure.md>)
  - [Ecommerce Website Navigation Structure](<6 - Site-specific guides/Ecommerce/8 - Ecommerce website structure.md>)
  - [Pagination Best Practices for Google](<6 - Site-specific guides/Ecommerce/9 - Pagination, incremental page loading, and their impact.md>)
- **Explicit content/**
  - [SEO Guidelines for Explicit Content](<6 - Site-specific guides/Explicit content/1 - Guidelines for sites with explicit content.md>)
  - [My Site is Incorrectly Flagged as Explicit in Google Search](<6 - Site-specific guides/Explicit content/2 - What to do if your site is incorrectly flagged as explicit.md>)
- **International & Multilingual/**
  - [Overview of International and Multilingual Site Topics](<6 - Site-specific guides/International & Multilingual/1 - overview.md>)
  - [Managing Multi-Regional and Multilingual Sites](<6 - Site-specific guides/International & Multilingual/2 - Managing multi-regional and multilingual sites.md>)
  - [Localized Versions of your Pages](<6 - Site-specific guides/International & Multilingual/3 - Tell Google about localized versions of your page.md>)
  - [How Google Crawls Locale-Adaptive Pages](<6 - Site-specific guides/International & Multilingual/4 - How Google crawls locale-adaptive pages.md>)

## Attribution

The reference documentation content is authored by Google and published under the
[Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/).
It is reproduced here under those terms -- see [NOTICE](NOTICE) and [README.md](README.md).
This skill and its source repository are not affiliated with, endorsed by, or
sponsored by Google. For authoritative, current guidance, always refer to
developers.google.com/search/docs.
