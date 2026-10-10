# AppFox marketing site

Marketing website for **AppFox - Order Editing & Upsell**, a Shopify app that
gives customers a self-service order-edit portal with post-purchase upsells.

Built with Next.js 16 (App Router), React 19, and Tailwind CSS v4. Fully
static - every route is prerendered at build time.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all routes static)
npm run lint
```

## Where things live

| Path | What |
| --- | --- |
| `lib/site.ts` | **Single source of truth** for domain, install URL, support email, pricing. Update here at launch. |
| `lib/seo.ts` | Per-route titles, descriptions, canonicals |
| `data/competitors.ts` | Comparison-page content (order editing, subscriptions, product bundles) |
| `data/bundle-competitors.ts` | Product Bundles vs-page records and public sources |
| `app/` | Routes: `/`, `/features`, `/pricing`, `/vs`, `/vs/[slug]`, `/privacy`, `/terms`, plus `sitemap.ts`, `robots.ts`, `llms.txt`, per-route `opengraph-image.tsx` |
| `components/site/` | Navbar, Footer, CTA band, section furniture |
| `components/home/` | Home page sections, incl. the animated `PortalDemo` hero |
| `components/ui/` | Animation primitives: `Reveal`, `InView`, `DigitRoll`, `Accordion` |
| `.design/` | Design spec, copy deck, SEO plan, and the build contract the site was built from |

## Design system - "The Counter"

Violet ink on cream paper; receipts, stamps, and ledgers. Tokens are defined
as Tailwind v4 `@theme` variables in `app/globals.css`. Fonts: Fraunces
(display), Hanken Grotesk (body), Spline Sans Mono (the `.till` "ledger
voice" - always used for money and order numbers). All animation is CSS-only,
gated behind `html.js` and `prefers-reduced-motion`, so content is never
hidden from crawlers, no-JS users, or motion-sensitive users.

## Launch checklist

Search the repo for `TODO(launch)`:

- Replace `site.installUrl` with the real Shopify App Store listing URL
- Confirm `site.url` is the production domain
- Have counsel review `/privacy` and `/terms`
- Once the listing has public reviews, consider adding `aggregateRating` to
  the SoftwareApplication JSON-LD in `app/page.tsx` (kept out deliberately -
  unverifiable ratings risk a structured-data penalty)
- Submit `sitemap.xml` in Google Search Console
