import { site } from "@/lib/site";
import { competitors } from "@/data/competitors";
import { posts } from "@/data/posts";
import { SUBSCRIPTION_FREE_FEATURES } from "@/data/subscription-pricing";

/**
 * /llms.txt - a plain-text product summary for LLM crawlers and AI
 * assistants. Every fact is sourced from lib/site.ts, data/competitors.ts,
 * data/posts.ts, or data/subscription-pricing.ts; only the four allowed
 * metric claims appear.
 */
export const dynamic = "force-static";

export function GET(): Response {
  const { free, growth, pro } = site.pricing;

  const pages = [
    {
      title: "Home",
      path: "/",
      description:
        "Brand overview - all three AppFox apps for Shopify, what each does, and why merchants run them together.",
    },
    {
      title: "Apps",
      path: "/apps",
      description: "All AppFox apps for Shopify in one place - Order Editing, Subscription, and Product Bundles.",
    },
    {
      title: "AppFox Order Editing & Upsell",
      path: "/order-editing",
      description:
        "Product overview - self-service editing on the thank-you and order status pages, eligibility rules, approval queue, and in-flow upsells.",
    },
    {
      title: "AppFox Subscription",
      path: "/subscription",
      description:
        "Shopify subscription app, free for now - subscribe-and-save widgets, auto-renewal billing on native checkout, and a self-service customer portal.",
    },
    {
      title: "AppFox Product Bundles",
      path: "/product-bundles",
      description:
        "Shopify product bundles app - unlimited bundles, volume discounts, quantity breaks, BOGO offers, and mix-and-match deals with theme-friendly widgets.",
    },
    {
      title: "Features",
      path: "/features",
      description: "Feature hub for all three apps - each app's full tour on its own page.",
    },
    {
      title: "Order Editing features",
      path: "/features/order-editing",
      description:
        "Full feature tour: thank-you and order status page editing, eligibility windows, approval queues, automatic payments and refunds, and post-purchase upsells.",
    },
    {
      title: "Subscription features",
      path: "/features/subscription",
      description:
        "Full feature tour: subscribe & save widgets, recurring billing on Shopify Checkout, a self-service customer portal, subscription models, integrations, Shopify Sidekick, and MCP for developers.",
    },
    {
      title: "Product Bundles features",
      path: "/features/product-bundles",
      description:
        "Full feature tour: unlimited bundles, volume discounts, quantity breaks, BOGO offers, mix-and-match, theme-integrated Shopify 2.0 widgets, and bundle analytics.",
    },
    {
      title: "Pricing",
      path: "/pricing",
      description: "Pricing hub for all three apps - each app's plans on its own page.",
    },
    {
      title: "Order Editing pricing",
      path: "/pricing/order-editing",
      description: `Plans from $${free.price} to $${pro.price}/mo - no per-edit fees or revenue caps on paid plans.`,
    },
    {
      title: "Subscription pricing",
      path: "/pricing/subscription",
      description: "Free for now - every feature unlocked, no cap on active subscriptions, 0% transaction fees on renewals.",
    },
    {
      title: "Product Bundles pricing",
      path: "/pricing/product-bundles",
      description: "Free to install with unlimited bundles, all bundle types, and full analytics.",
    },
    {
      title: "Product Bundles comparison table",
      path: "/product-bundles/compare",
      description:
        "Multi-competitor table: AppFox Product Bundles vs Kaching, Fast Bundle, Bundler, Simple Bundles, and Shopify Bundles. Public sources, checked October 2026.",
    },
    {
      title: "Comparison hub",
      path: "/vs",
      description: `Side-by-side comparisons of ${site.name} and ${competitors.length} other Shopify order editing, upsell, subscription, and product bundle apps.`,
    },
    {
      title: "Blog",
      path: "/blog",
      description: `${posts.length} guides and playbooks on post-purchase order editing, upsells, and subscriptions for Shopify merchants.`,
    },
  ];

  const body = `# ${site.name}

> Shopify apps for the whole order journey - self-service order editing, post-purchase upsells, product bundles, and subscriptions.

${site.name} makes three Shopify apps: ${site.appName} (self-service order editing with in-flow upsells), AppFox Subscription (recurring subscriptions on Shopify's native checkout with a free plan, formerly Trust Subscriptions), and AppFox Product Bundles (product bundles, volume discounts, and BOGO offers).

${site.appName} is a Shopify app that lets customers edit their own orders right on the store's thank-you page and order status page, with post-purchase upsells in the same flow. Customers fix a shipping address, swap a variant, change quantities, add or remove items, or cancel - all within rules the merchant sets (edit windows, fulfillment cutoffs, per-action eligibility). Sensitive changes route through a merchant approval queue; everything else applies automatically. Edits happen in place through Shopify's native Order Editing API rather than cancel-and-reorder, and the edit flow doubles as an upsell surface with one-click product offers.

## Key facts

- ~80% of common edits self-served - address fixes, size swaps, quantity changes, and cancellations resolve without a support ticket.
- 5-minute setup - no theme code changes required, works on every Shopify plan.
- 1.5–2.9% Shopify Payments fees lost per cancel-and-reorder edit - the hidden cost of apps that "edit" by canceling and recreating orders. ${site.name} edits in place, so payment fees are preserved.

## Pricing

| Plan | Price | What's included |
| --- | --- | --- |
| ${free.name} | $${free.price}/mo | Up to 50 self-service edits per month |
| ${growth.name} | $${growth.price}/mo | Unlimited edits and upsells - most popular plan |
| ${pro.name} | $${pro.price}/mo | Everything in Growth, plus API access and white-label branding |

No per-edit fees or revenue caps on paid plans.

## AppFox Subscription

AppFox Subscription (formerly Trust Subscriptions) is a Shopify subscription app. Merchants add subscribe-and-save widgets to product pages, and customers pay through Shopify's native checkout with auto-renewal on the schedule they picked. A self-service customer portal handles skips, pauses, swaps, payment updates, and cancellations. Supports replenishment, subscription boxes, memberships, digital products, and bundles, with discounts, trials, and tiered pricing. Integrates with Klaviyo, PageFly, Loyalty Lion, and Shopify Flow. Shopify Sidekick (admin AI assistant) integration lets merchants ask natural-language questions about subscriptions and jump to the right page. For developers: hosted MCP (Model Context Protocol) server connects Cursor, Claude Desktop, and VS Code to read subscription data with AppFox API keys. Rated 4.2/5 on the Shopify App Store.

### Subscription pricing

AppFox Subscription is free for now. Every new install gets every feature at $0, with no plan to pick and no cap on active subscriptions:

${SUBSCRIPTION_FREE_FEATURES.map((f) => `- ${f}`).join("\n")}

## Pages

${pages.map((p) => `- [${p.title}](${site.url}${p.path}): ${p.description}`).join("\n")}

## Comparisons

${competitors
  .map((c) => `- [${site.name} vs ${c.shortName}](${site.url}/vs/${c.slug}): ${c.metaDescription}`)
  .join("\n")}

## Blog

${posts.map((p) => `- [${p.title}](${site.url}/blog/${p.slug}): ${p.metaDescription}`).join("\n")}

## Contact

- Support: ${site.supportEmail}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
