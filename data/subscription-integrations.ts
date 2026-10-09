/**
 * Subscription integrations and partner apps - the "Works with" ecosystem.
 * Partnership shortlist from Subscription app partnership bot (2026-09-11).
 * Each entry describes a complementary service or native integration that
 * pairs with AppFox Subscription.
 */

export type IntegrationEntry = {
  slug: string;
  name: string;
  category: string;
  /** Merchant-facing outcome (what it unlocks) */
  description: string;
  /** "native" if built-in to AppFox, "partner" if works-with-via-Shopify */
  type: "native" | "partner";
  /** External URL only if verified and clean */
  href?: string;
  /** Path to logo image in /public/images/integrations/ */
  logoSrc?: string;
};

export const integrationCategories = [
  {
    slug: "sourcing",
    name: "Sourcing",
    description: "Product sourcing and dropshipping for subscription businesses",
  },
  {
    slug: "bundles",
    name: "Bundles",
    description: "Mix-and-match, build-a-box, and bundle deals with recurring billing",
  },
  {
    slug: "loyalty",
    name: "Loyalty",
    description: "Reward subscribers, track referrals, and build wishlists",
  },
  {
    slug: "gifting",
    name: "Gifting",
    description: "Gift subscriptions and gift cards that convert into renewals",
  },
  {
    slug: "reviews",
    name: "Reviews",
    description: "Collect photo and video reviews from replenishment deliveries",
  },
  {
    slug: "automation",
    name: "Automation",
    description: "Trigger workflows when subscriptions change status",
  },
  {
    slug: "recovery",
    name: "Recovery",
    description: "Recover failed payments and prevent subscription churn",
  },
  {
    slug: "email-sms",
    name: "Email/SMS",
    description: "Lifecycle messaging and renewal reminders for subscribers",
  },
  {
    slug: "migration",
    name: "Migration",
    description: "Bulk import and export for subscription data migrations",
  },
] as const;

export const subscriptionIntegrations: IntegrationEntry[] = [
  // Sourcing
  {
    slug: "fiidom",
    name: "Fiidom AI Dropshipping",
    category: "sourcing",
    description:
      "Find winning AliExpress products, import them instantly, optimize with AI, and automate fulfillment - all in one place.",
    type: "partner",
    href: "https://apps.shopify.com/fiidomds?utm_medium=appfox-website&utm_source=fiidomds-partnership&utm_campaign=fiidomds",
    logoSrc: "/images/integrations/fiidom.png",
  },

  // Bundles
  {
    slug: "bogos",
    name: "BOGOS",
    category: "bundles",
    description:
      "Free gifts, BOGO, and buy X get Y promotions at checkout - pair recurring subscriptions with gift-with-purchase offers to boost order value.",
    type: "partner",
    href: "https://apps.shopify.com/freegifts",
    logoSrc: "/images/integrations/bogos.png",
  },
  {
    slug: "push-bundle",
    name: "Push Bundle",
    category: "bundles",
    description:
      "Build-a-box / mix-and-match bundles with volume discounts and free gifts — pairs with AppFox selling plans for BYOB + subscribe & save.",
    type: "partner",
    href: "https://apps.shopify.com/push-bundle?utm_medium=appfox-website&utm_source=push-bundle-partnership&utm_campaign=push-bundle",
    logoSrc: "/images/integrations/push-bundle.png",
  },
  {
    slug: "easify-product-options",
    name: "Easify Custom Product Options",
    category: "bundles",
    description:
      "Product options and add-ons with subscribe & save - customizable text fields, file uploads, and price add-ons for subscription products.",
    type: "partner",
    href: "https://apps.shopify.com/easify-product-options",
    logoSrc: "/images/integrations/easify-product-options.png",
  },
  {
    slug: "appfox-bundles",
    name: "AppFox Product Bundles",
    category: "bundles",
    description:
      "Combine subscriptions with product bundles - let subscribers save more when they bundle recurring items together.",
    type: "native",
    href: "/product-bundles",
    logoSrc: "/images/brand/bundles-512.png",
  },
  {
    slug: "appfox-order-editing",
    name: "AppFox Order Editing & Upsell",
    category: "bundles",
    description:
      "Let subscribers edit upcoming orders or add one-time items to a renewal - self-service upsells inside the customer portal.",
    type: "native",
    href: "/order-editing",
    logoSrc: "/images/brand/order-editing-512.png",
  },

  // Loyalty
  {
    slug: "flits",
    name: "Flits",
    category: "loyalty",
    description:
      "Loyalty points, wishlist, and store credit - reward subscribers with points on every renewal and let them track favorites for future orders.",
    type: "partner",
    href: "https://apps.shopify.com/flits",
    logoSrc: "/images/integrations/flits.png",
  },
  {
    slug: "loyaltylion",
    name: "LoyaltyLion",
    category: "loyalty",
    description:
      "Reward subscribers with loyalty points on every renewal - subscriptions earn more, customers stay longer.",
    type: "native",
    href: "https://loyaltylion.com",
  },
  {
    slug: "partnero",
    name: "Partnero",
    category: "loyalty",
    description:
      "Affiliate and referral programs for subscriptions - let customers and influencers earn commissions on recurring revenue.",
    type: "partner",
    href: "https://apps.shopify.com/partnero-affiliate-management",
    logoSrc: "/images/integrations/partnero.png",
  },
  {
    slug: "wishlist-guru",
    name: "Wishlist Guru",
    category: "loyalty",
    description:
      "Wishlist to subscribe - let customers save products and convert wishlists into subscriptions with back-in-stock and price-drop alerts.",
    type: "partner",
    href: "https://apps.shopify.com/wishlist-guru",
    logoSrc: "/images/integrations/wishlist-guru.png",
  },

  // Gifting
  {
    slug: "givy",
    name: "Givy",
    category: "gifting",
    description:
      "Gift cards and subscription gifting - let customers buy subscriptions as gifts, recipients activate and become subscribers automatically.",
    type: "partner",
    href: "https://apps.shopify.com/givy",
    logoSrc: "/images/integrations/givy.png",
  },

  // Reviews
  {
    slug: "loox",
    name: "Loox",
    category: "reviews",
    description:
      "Photo and video reviews on replenishment deliveries - collect visual social proof from subscribers and display it on product pages.",
    type: "partner",
    href: "https://apps.shopify.com/loox",
    logoSrc: "/images/integrations/loox.png",
  },

  // Automation
  {
    slug: "shopify-flow",
    name: "Shopify Flow",
    category: "automation",
    description:
      "Trigger custom workflows when a subscription is created, renewed, paused, or cancelled - connect to your 3PL, Slack, or anything else.",
    type: "native",
    logoSrc: "/images/integrations/shopify-flow.svg",
  },
  {
    slug: "mechanic",
    name: "Mechanic",
    category: "automation",
    description:
      "Build advanced subscription automations - tag customers, create metafields, or send webhooks when subscription status changes.",
    type: "partner",
    href: "https://apps.shopify.com/mechanic",
    logoSrc: "/images/integrations/mechanic.png",
  },
  {
    slug: "zapier",
    name: "Zapier",
    category: "automation",
    description:
      "Push subscription events to 5,000+ apps - CRMs, spreadsheets, Slack, or your internal tools.",
    type: "native",
  },

  // Recovery
  {
    slug: "churn-buster",
    name: "Churn Buster",
    category: "recovery",
    description:
      "Failed-payment recovery and cancel-save flows - adaptive dunning campaigns that recover subscriptions before they churn.",
    type: "partner",
    href: "https://churnbuster.io/",
  },

  // Email/SMS
  {
    slug: "klaviyo",
    name: "Klaviyo",
    category: "email-sms",
    description:
      "Sync subscription events to Klaviyo profiles - send renewal reminders, win-back campaigns, and lifecycle emails that turn into recurring revenue.",
    type: "native",
    href: "https://www.klaviyo.com",
  },
  {
    slug: "cordial",
    name: "Cordial",
    category: "email-sms",
    description:
      "Connect subscription data to Cordial for multi-channel campaigns, SMS reminders, and churn-prevention flows.",
    type: "native",
  },
  {
    slug: "lifecycle-messaging",
    name: "Lifecycle Messaging",
    category: "email-sms",
    description:
      "Works with OneSignal, Postscript, and Omnisend - send SMS and email reminders when renewals are coming up or subscriptions need attention.",
    type: "partner",
    logoSrc: "/images/integrations/lifecycle-messaging.svg",
  },

  // Migration
  {
    slug: "matrixify",
    name: "Matrixify",
    category: "migration",
    description:
      "Bulk import and export for subscription migrations - move subscriber data from another platform or back up your subscription catalog.",
    type: "partner",
    href: "https://apps.shopify.com/excel-export-import",
    logoSrc: "/images/integrations/matrixify.png",
  },
];

export function getIntegrationsByCategory(categorySlug: string): IntegrationEntry[] {
  return subscriptionIntegrations.filter((i) => i.category === categorySlug);
}
