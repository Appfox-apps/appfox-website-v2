/**
 * The AppFox app catalog - one entry per Shopify app we ship. Navbar,
 * Footer, /apps, and llms.txt all render from this list, so adding an app
 * here is the single step that makes the site aware of it.
 */
export type AppSlug = "order-editing" | "subscription" | "product-bundles";

export type AppEntry = {
  slug: AppSlug;
  /** Full App Store listing name. */
  name: string;
  /** Short name used in nav, footer, and cross-links. */
  shortName: string;
  /** One-line positioning, sentence case. */
  tagline: string;
  /** 1-2 sentence description for cards and meta copy. */
  description: string;
  /** Landing page on this site. */
  href: string;
  /** Live Shopify App Store listing. */
  installUrl: string;
  /** Plain-text pricing summary for cards and llms.txt. */
  pricingLine: string;
  /** 3-4 scannable proof points for app cards. */
  highlights: string[];
};

export const apps: AppEntry[] = [
  {
    slug: "order-editing",
    name: "AppFox Order Editing & Upsell",
    shortName: "Order Editing",
    tagline: "Customers fix their own orders - on rules you set",
    description:
      "Self-service order editing on the thank-you and order status pages, plus one-click upsells in the same flow. ~80% of edits handle themselves.",
    href: "/order-editing",
    installUrl: "https://apps.shopify.com/appfox-order-editing-upsell",
    pricingLine: "Free plan · paid plans from $19/mo",
    highlights: [
      "In-place edits - payment fees preserved",
      "Approval queue or auto-apply, per edit type",
      "Post-purchase upsells inside the edit flow",
      "5-minute setup, no code",
    ],
  },
  {
    slug: "subscription",
    name: "AppFox Subscription",
    shortName: "Subscription",
    tagline: "Turn one-time buyers into subscribers",
    description:
      "Recurring payments, subscribe-and-save, and subscription boxes on Shopify's native checkout - with a customer portal that runs itself. Free for now, with every feature included.",
    href: "/subscription",
    installUrl: "https://apps.shopify.com/appfox-subscriptions",
    pricingLine: "Free for now · every feature included",
    highlights: [
      "Subscription widgets in your branding",
      "Auto-renewal & recurring billing on Shopify Checkout",
      "Customer portal - skip, pause, or swap without a ticket",
      "Subscribe & save discounts and bundles",
    ],
  },
  {
    slug: "product-bundles",
    name: "AppFox Product Bundles",
    shortName: "Product Bundles",
    tagline: "Boost AOV with bundles and volume discounts",
    description:
      "Product bundles, volume discounts, quantity breaks, BOGO, and mix-and-match offers with theme-friendly widgets. Easy setup, unlimited bundles. Free plan available.",
    href: "/product-bundles",
    installUrl: "https://apps.shopify.com/trust-bundles",
    pricingLine: "Free to start",
    highlights: [
      "Unlimited product bundles with custom discounts",
      "Volume discounts, quantity breaks, BOGO & mix-and-match",
      "Responsive widgets integrated with Shopify 2.0 themes",
      "Bundle analytics and performance tracking",
    ],
  },
];

export function getApp(slug: string): AppEntry | undefined {
  return apps.find((a) => a.slug === slug);
}
