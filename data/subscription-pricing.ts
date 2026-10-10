/**
 * Appfox Subscription pricing - the website-side mirror of the app's plan
 * registry (`subscriptions-remix/app/lib/plan-features.ts`).
 *
 * Appfox Subscription is FREE FOR NOW: the app's `APP_IS_FREE` switch unlocks
 * every feature for every new install, with no active-subscription cap and no
 * paid plan to pick. Merchants who were already on a paid plan keep it
 * unchanged, but no paid plans are offered publicly, so none are listed here.
 *
 * If paid plans return, restore the tier data from git history (the last paid
 * version listed Free / Starter / Business / Enterprise) and the components
 * that render it.
 */

/** True while Appfox Subscription is free for every new install. */
export const SUBSCRIPTION_IS_FREE = true;

/** Short label used in nav, cards and metadata. */
export const SUBSCRIPTION_PRICE_LABEL = "Free for now";

/** Everything a new install gets today, at $0. Mirrors the app's feature gates. */
export const SUBSCRIPTION_FREE_FEATURES: string[] = [
  "Unlimited active subscriptions",
  "0% transaction fees on renewals",
  "Subscription widgets & templates",
  "Recurring billing on Shopify Checkout",
  "Customer self-service portal",
  "Subscription analytics & reports",
  "Custom CSS & customer portal customization",
  "Bundles, build-a-box & add-ons",
  "Custom shipping profiles",
  "Custom email HTML & custom email domain",
  "External API & MCP server",
];
