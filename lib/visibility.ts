/**
 * Apps taken off the public site for now.
 *
 * To bring Order Editing back, remove `"order-editing"` from this list
 * (an empty list publishes every app). Pages, nav, footer, blog posts,
 * comparisons, sitemap, robots, and llms.txt all read this list. The
 * content stays in the repo.
 */
export const HIDDEN_APP_SLUGS = ["order-editing"] as const;

export type CatalogAppSlug = "order-editing" | "subscription" | "product-bundles";

export function isAppHidden(slug: string): boolean {
  return (HIDDEN_APP_SLUGS as readonly string[]).includes(slug);
}

export function isAppPublic(slug: string): boolean {
  return !isAppHidden(slug);
}

/**
 * Posts written about Order Editing. They drop out of the blog, sitemap,
 * and llms.txt while that app is hidden, and their URLs 307 to the homepage.
 * `shopify-native-bundle-cart-transform-order-edit` is filed here because the
 * article is about order edits, even though it also discusses bundles.
 */
export const ORDER_EDITING_POST_SLUGS = [
  "how-to-launch-self-service-order-editing-on-shopify",
  "how-to-evaluate-a-shopify-order-editing-app-before-you-install-it",
  "let-shopify-customers-edit-their-orders",
  "reduce-can-i-change-my-order-tickets",
  "post-purchase-upsells-that-convert",
  "shopify-order-editing-roi-support-ticket-deflection",
  "how-long-should-your-shopify-order-edit-window-be",
  "which-order-edits-should-auto-approve",
  "shopify-native-bundle-cart-transform-order-edit",
] as const;

const BUNDLE_POST_SLUGS = [
  "how-to-create-mix-and-match-bundles-on-shopify",
  "how-to-bundle-products-into-a-shopify-subscription-box",
] as const;

export function isOrderEditingPost(slug: string): boolean {
  return (ORDER_EDITING_POST_SLUGS as readonly string[]).includes(slug);
}

/** Which app a published post is selling. Used for CTAs once Order Editing is hidden. */
export function productForPost(slug: string): CatalogAppSlug {
  if (isOrderEditingPost(slug)) return "order-editing";
  if ((BUNDLE_POST_SLUGS as readonly string[]).includes(slug)) return "product-bundles";
  return "subscription";
}

const COUNT_WORDS = ["zero", "one", "two", "three", "four", "five", "six"];

export function countWord(n: number, titleCase = false): string {
  const word = COUNT_WORDS[n] ?? String(n);
  return titleCase ? word.charAt(0).toUpperCase() + word.slice(1) : word;
}
