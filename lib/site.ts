/**
 * Central site configuration - every external URL, brand string, and
 * verifiable claim lives here so it can be updated in one place.
 *
 * TODO(launch): confirm `url` points at the production domain.
 */
export const site = {
  name: "Appfox",
  appName: "Appfox Order Editing & Upsell",
  shortDescription:
    "Self-service order editing and post-purchase upsells for Shopify. Customers fix their own orders; you keep the revenue.",
  url: "https://getappfox.com",
  /** Live Shopify App Store listing. */
  installUrl: "https://apps.shopify.com/appfox-order-editing-upsell",
  supportEmail: "support@getappfox.com",
  twitter: undefined as string | undefined, // e.g. "@appfox"
  /**
   * No rating anywhere on the site: the app has no public App Store reviews
   * yet. TODO(launch): once real reviews exist, a rating sourced from the
   * live listing may be added to UI copy — and to JSON-LD aggregateRating
   * only then (Google requires structured-data ratings to be backed by
   * verifiable collected reviews).
   */
  pricing: {
    free: { name: "Free", price: 0 },
    growth: { name: "Growth", price: 19 },
    pro: { name: "Pro", price: 49 },
  },
} as const;

export type Site = typeof site;
