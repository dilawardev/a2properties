# SEO Roadmap For A2 Properties

## Goal

Build a technically strong, crawlable, indexable, fast, multilingual real-estate website that can rank for:

- branded queries
- transactional property queries
- developer and area pages
- informational blog content
- local real-estate searches

This document is written for the current codebase, not as generic SEO advice.

## Important Note

"Perfect SEO" is not a one-time state. The practical goal is:

- technically sound pages
- clean URLs and indexing rules
- strong metadata and structured data
- fast loading pages
- strong internal linking
- high-quality location and property content
- local business trust signals
- ongoing measurement and iteration

## Current Repo Snapshot

These are the main SEO gaps in the current project:

- The app is a client-rendered Vite + React SPA using `BrowserRouter`.
- High-value content like property detail pages is fetched on the client after load.
- There is no route-level SEO system for unique title, description, canonical, OG, or Twitter metadata.
- There is no `robots.txt`.
- There is no sitemap generation flow.
- There are duplicate URLs:
  - `/` and `/home`
  - `/properties/:slug` and `/property/:slug`
- Language is chosen from `localStorage` and browser detection, not from the URL.
- There is no schema markup for organization, blog posts, breadcrumbs, or property pages.

Good things already present:

- pages are wrapped in a semantic `<main>`
- major pages already have `h1` headings
- `lang` and `dir` are updated at runtime
- property and blog pages already contain real text content

## Success Criteria

The project should be considered SEO-ready when all of the following are true:

- every indexable page has a unique title and meta description
- every page has a canonical URL
- duplicate URLs are redirected or canonicalized
- blog and property detail pages can be indexed reliably from initial HTML or pre-rendered output
- `robots.txt` and sitemap files exist and are correct
- important pages include valid schema markup
- English and Arabic pages have crawlable locale-specific URLs with `hreflang`
- Core Web Vitals are in a healthy range on important landing pages
- property, area, and developer pages form a clear internal-linking system
- Search Console and Bing Webmaster are set up and monitored

## Recommended Execution Order

1. Build the metadata system.
2. Fix duplicate URLs and canonical rules.
3. Add `robots.txt` and sitemap generation.
4. Add structured data.
5. Move to URL-based multilingual SEO.
6. Pre-render or server-render SEO-critical routes.
7. Expand content architecture for areas, developers, and guides.
8. Improve Core Web Vitals.
9. Add local SEO and trust signals.
10. Put reporting and monitoring in place.

## Phase 1: Build A Site-Wide SEO System

### Objective

Make every route able to define:

- title
- meta description
- canonical URL
- robots directives
- Open Graph data
- Twitter card data
- optional schema JSON-LD

### Steps

- Install and configure `react-helmet-async`.
- Add a reusable SEO component, for example:
  - `src/components/seo/Seo.jsx`
  - `src/components/seo/StructuredData.jsx`
- Wrap the app root with `HelmetProvider`.
- Add a small helper for absolute URLs based on a new env var:
  - `VITE_SITE_URL=https://your-domain.com`
- Add default fallback metadata for:
  - site title template
  - default description
  - default OG image

### Files To Touch

- `package.json`
- `src/main.jsx`
- `src/App.jsx`
- `src/components/seo/Seo.jsx`
- `src/components/seo/StructuredData.jsx`
- `.env`
- `.env.example`

### Per-Route SEO To Add

- Home page
- About page
- AI Map page
- Contact page
- Blog listing page
- Blog detail page
- Property listing page
- Property detail page
- 404 page with `noindex`

### Definition Of Done

- every route can pass a unique title and description
- generated HTML head contains correct canonical tags
- social preview tags exist for all important pages
- 404 route outputs `noindex`

## Phase 2: Fix URL Hygiene And Duplicate Content

### Objective

Make one clean canonical URL for every page.

### Problems To Fix

- `/` vs `/home`
- `/properties/:slug` vs `/property/:slug`
- possible duplicate filtered listing URLs
- inconsistent trailing slash behavior if it appears in deployment

### Steps

- Choose one canonical version of every duplicated route.
- Redirect `/home` to `/`.
- Redirect `/property/:slug` to `/properties/:slug`.
- Decide and enforce a trailing slash policy.
- Add canonical tags to listing pages.
- Decide which filtered listing URLs should be indexable.
- For thin filter combinations:
  - keep them crawlable if needed for UX
  - use `noindex, follow`
  - canonicalize to the base listing page or a stable SEO landing page

### Files To Touch

- `src/routes/guest_routes.jsx`
- route components that set canonical tags
- hosting config or redirect rules
- possibly `public/.htaccess` depending on deployment

### Definition Of Done

- all duplicate routes 301 redirect to one preferred URL
- canonicals match the preferred URL
- no route is available at two indexable addresses

## Phase 3: Add Robots And Sitemap Infrastructure

### Objective

Make crawling explicit and easy for search engines.

### Steps

- Add `public/robots.txt`.
- Add sitemap generation to the build process.
- Include:
  - static pages
  - blog pages
  - property detail pages
  - future area pages
  - future developer pages
- If the property catalog is large:
  - create a sitemap index
  - split sitemaps by content type

### Required Output

- `/robots.txt`
- `/sitemap.xml` or `/sitemap-index.xml`

### Recommended Build Flow

- Create `scripts/generate-sitemap.mjs`.
- Fetch current property and blog slugs during build.
- Generate XML into `public/`.
- Add a `package.json` script such as:
  - `seo:sitemap`
  - or run it automatically before `vite build`

### Files To Touch

- `public/robots.txt`
- `scripts/generate-sitemap.mjs`
- `package.json`

### Example Robots Rules

- allow all public pages
- block internal utility or non-public endpoints if any exist
- point to the sitemap URL

### Definition Of Done

- Search Console can discover the sitemap
- sitemap URLs are canonical, absolute, and return 200
- no non-public URL is accidentally submitted

## Phase 4: Add Structured Data

### Objective

Help search engines understand entities and page intent.

### Site-Wide Schema

- `Organization`
- `RealEstateAgent` or `LocalBusiness` if the business details support it
- `WebSite`

### Per-Page Schema

- Home:
  - `Organization`
  - `WebSite`
- About / Contact:
  - `Organization`
  - `LocalBusiness` or `RealEstateAgent`
- Blog detail:
  - `BlogPosting`
  - `BreadcrumbList`
- Property detail:
  - `BreadcrumbList`
  - `Residence` or a relevant schema type
  - `Offer` where pricing exists
  - `Place` / address data where available
- FAQ sections:
  - `FAQPage` only when the FAQ is fully visible on the page

### Important Rule

Only mark up data that is visibly present on the page and accurate.

### Files To Touch

- `src/components/seo/StructuredData.jsx`
- `src/pages/guest/Blog/BlogDetail.jsx`
- `src/pages/guest/Property/PropertyDetail.jsx`
- `src/pages/guest/Home/Home.jsx`
- `src/pages/guest/Contact/Contact.jsx`

### Definition Of Done

- structured data validates in schema testing tools
- markup reflects the visible page content exactly
- blog and property detail pages include page-specific JSON-LD

## Phase 5: Make Multilingual SEO URL-Based

### Objective

Move from browser/localStorage language selection to crawlable locale URLs.

### Why

Current detection uses local storage and navigator settings. That is good for UX, but not enough for SEO. Search engines need stable URLs per language.

### Target Structure

- `/en/`
- `/ar/`
- `/en/blog/...`
- `/ar/blog/...`
- `/en/properties/...`
- `/ar/properties/...`

### Steps

- Add locale prefixes to routes.
- Make the language switcher change the URL, not just runtime state.
- Add `hreflang` tags for English and Arabic.
- Add a self-referencing canonical for each locale page.
- Update sitemap generation to emit locale-specific URLs.
- Ensure Arabic pages have real translated:
  - title
  - description
  - OG data
  - visible page content

### Files To Touch

- `src/i18n/i18n.js`
- `src/components/system/LocaleRoot.jsx`
- route definitions
- SEO helpers
- sitemap generator

### Definition Of Done

- each locale has its own indexable URL
- `hreflang` is correct
- Arabic pages do not rely on JavaScript-only locale switching

## Phase 6: Improve Rendering Strategy For Indexability

### Objective

Ensure high-value pages are indexable from initial HTML, not only after client-side fetch.

### Current Risk

Property detail pages fetch their content after page load. Search engines can render JavaScript, but this is still weaker than serving real content and metadata immediately.

### Recommended Options

#### Option A: Pre-render

Best for:

- home
- about
- contact
- blog listing
- blog detail
- stable landing pages

#### Option B: SSR Or Edge Rendering

Best for:

- property detail pages
- area landing pages
- developer landing pages
- high-value dynamic pages with frequently changing data

### Minimum Recommendation

- pre-render all static routes
- pre-render blog pages
- SSR or pre-render the top property pages

### Additional Requirements

- real 200, 301, and 404 status handling
- correct canonical tags in initial HTML
- correct meta tags in initial HTML

### Files To Touch

- `vite.config.js`
- rendering architecture
- route/page data loading strategy
- deployment configuration

### Definition Of Done

- page source for important routes contains real SEO metadata
- property/blog pages are indexable without waiting for client fetch
- 404 routes return a real 404 where hosting allows it

## Phase 7: Build Search-Friendly Content Architecture

### Objective

Turn the site into a topical authority, not just a brochure.

### Must-Have SEO Content Types

- area pages
- developer pages
- property type pages
- market guides
- investment guides
- blog content clusters

### Recommended Landing Pages For This Business

- `/areas/dubai-marina`
- `/areas/downtown-dubai`
- `/areas/dubai-hills-estate`
- `/developers/emaar`
- `/developers/binghatti`
- `/off-plan-properties-in-dubai`
- `/luxury-villas-in-dubai`
- `/apartments-for-sale-in-dubai`
- `/dubai-property-investment-guide`

### Content Rules

- one clear primary keyword per page
- one distinct search intent per page
- no thin pages
- no duplicate or template-spun copy
- every page must add useful, specific information

### Property Detail Requirements

Every property page should include:

- unique title
- unique meta description
- unique description text
- area and developer context
- pricing details if available
- amenities
- FAQ section when useful
- related properties
- links to area and developer pages

### Blog Requirements

Every article should include:

- author
- publish date
- updated date
- category
- strong intro
- clear section headings
- internal links to relevant commercial pages
- FAQ or summary where appropriate

### Files To Touch

- existing page templates
- future area/developer page templates
- CMS or data source definitions

### Definition Of Done

- the site has dedicated landing pages for high-intent topics
- each page has enough original content to justify indexation
- content supports both transactional and informational searches

## Phase 8: Improve Internal Linking And Crawl Depth

### Objective

Make important pages easy to discover and reinforce topic relationships.

### Steps

- Add breadcrumb navigation to:
  - blog detail pages
  - property detail pages
  - future area and developer pages
- Add related links modules:
  - related properties
  - related blog posts
  - properties in the same area
  - properties by the same developer
- Expand footer links to major landing pages.
- Create hub pages that link downward to supporting pages.

### Files To Touch

- `src/Layout/GuestLayout.jsx`
- `src/components/Footer.jsx`
- `src/pages/guest/Blog/BlogDetail.jsx`
- `src/pages/guest/Property/PropertyDetail.jsx`
- future hub page components

### Definition Of Done

- high-value pages are reachable in a few clicks
- each important page has multiple contextual internal links
- breadcrumbs are visible and marked up

## Phase 9: Improve Core Web Vitals

### Objective

Make the site fast enough that performance supports rankings instead of hurting them.

### Priority Areas

- large image optimization
- video weight
- JavaScript bundle size
- route-level code splitting
- LCP on the home page
- CLS from dynamic content
- INP from heavy interactions

### Steps

- compress and resize hero images and gallery images
- ensure images use dimensions or stable containers
- lazy-load below-the-fold sections
- code-split large route components
- audit heavy sections like:
  - maps
  - globe/3D sections
  - video reels
  - sliders
- defer non-essential scripts
- preload only truly critical assets
- keep the preloader if desired, but do not let it hide slow page architecture

### Pages To Benchmark

- home page
- property listing page
- property detail page
- blog detail page

### Metrics To Target

- LCP under 2.5s on strong pages
- CLS under 0.1
- INP under 200ms where practical

### Definition Of Done

- Lighthouse and real-user metrics improve on important templates
- media-heavy sections no longer dominate initial load

## Phase 10: Strengthen Local SEO And Trust Signals

### Objective

Support local search visibility and conversion trust.

### Steps Outside The Codebase

- set up and optimize Google Business Profile
- set up Bing Places
- keep NAP consistent across the site and external listings
- add office address, phone, and business details clearly on the contact page
- add agent or company trust signals:
  - licenses
  - awards
  - review snippets
  - testimonials
- create location-specific content for target markets

### Site Content To Add

- business/about information
- office contact details
- trust badges where accurate
- neighborhood and area expertise pages

### Definition Of Done

- business details are consistent across site and directories
- brand trust is visible to both users and search engines

## Phase 11: Analytics, Search Console, And Monitoring

### Objective

Measure what changes are actually helping.

### Steps

- set up Google Search Console
- set up Bing Webmaster Tools
- submit sitemap
- track index coverage
- track page performance by template
- track impressions, clicks, CTR, and average position
- review crawl errors regularly
- monitor schema errors

### Suggested Reporting Cadence

- weekly:
  - index coverage
  - crawl errors
  - top query changes
- monthly:
  - Core Web Vitals
  - top landing page growth
  - blog performance
  - property page organic sessions

### Definition Of Done

- SEO changes are tied to metrics, not guesses
- low-performing pages are easy to identify and improve

## Phase 12: Quality Control Checklist Before Launch

- titles are unique
- descriptions are unique
- canonicals are correct
- noindex pages are intentional
- `robots.txt` is live
- sitemap is live and valid
- redirects work
- 404 route works
- OG and Twitter previews are correct
- schema validates
- locale URLs are correct
- `hreflang` is correct
- important pages are accessible without thin loading states
- images have useful alt text
- pages render with one clear `h1`
- internal links work
- page speed is acceptable

## Repo-Level Implementation Checklist

### P0: Do First

- Add `react-helmet-async`
- Build reusable SEO component
- Add `VITE_SITE_URL`
- Add per-route metadata
- Redirect duplicate routes
- Add `robots.txt`
- Add sitemap generator
- Add Organization and Breadcrumb schema

### P1: Do Next

- Add BlogPosting schema
- Add property schema
- move language SEO to URL-based locale routing
- add `hreflang`
- pre-render static and blog pages
- improve property page indexability

### P2: Growth Layer

- create area pages
- create developer pages
- build hub pages
- expand internal linking
- improve Core Web Vitals further
- expand local SEO footprint

## Suggested New Files

- `src/components/seo/Seo.jsx`
- `src/components/seo/StructuredData.jsx`
- `src/components/seo/Breadcrumbs.jsx`
- `src/lib/seo.js`
- `scripts/generate-sitemap.mjs`
- `public/robots.txt`

## Suggested New Env Vars

- `VITE_SITE_URL`
- `VITE_DEFAULT_OG_IMAGE`
- `VITE_DEFAULT_LOCALE`

## Final Recommendation

If you want the biggest SEO impact with the least wasted effort, implement in this exact order:

1. unique metadata on every route
2. canonical and redirect cleanup
3. sitemap and robots
4. structured data
5. locale URLs with `hreflang`
6. pre-render or SSR for SEO-critical pages
7. area/developer/content expansion
8. performance and ongoing monitoring

Once these are in place, the site will move from "search engines can probably crawl it" to "search engines can confidently understand, index, and rank it."
