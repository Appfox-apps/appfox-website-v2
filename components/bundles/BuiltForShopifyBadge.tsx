/**
 * Built for Shopify badge for Appfox Product Bundles only.
 *
 * Shopify's Partner media kit is not a public download. This is the badge
 * Shopify renders on App Store listings, checked 13 November 2026: the bag
 * paths and fills are copied unaltered from apps.shopify.com, the label is
 * the exact words "Built for Shopify", and the field is rgb(224, 240, 255)
 * with black text. Nothing here is recolored, shadowed, rotated, or animated.
 * The link is the Product Bundles listing. It does not say Shopify endorses
 * the Appfox brand.
 */
const LISTING_URL = "https://apps.shopify.com/trust-bundles";

function ShopifyBag() {
  return (
    <svg viewBox="0 0 16 14" fill="none" aria-hidden="true">
      <path d="m13 0-1 5-4 9 8-9.5L13 0ZM3 0l1 5 4 9-8-9.5L3 0Z" fill="#1495CC" />
      <path d="m3 0 1 5 4 9 4-9 1-5H3Z" fill="#58B7DF" />
      <path d="M8 14 4 5l-4-.5L8 14ZM8 14l4-9 4-.5L8 14Z" fill="#035F86" />
      <path d="M8 5.5 4 5l4 9 4-9-4 .5Z" fill="#1495CC" />
      <path d="m4 5 4-5 4 5-4.001.5L4 5Z" fill="#A9DEF4" />
      <path d="M4 5 3 0h5L4 5ZM12 5l1-5H8l4 5Z" fill="#58B7DF" />
      <path d="M4 5 3 0 0 4.5 4 5ZM12 5l1-5 3 4.5-4 .5Z" fill="#1495CC" />
    </svg>
  );
}

export function BuiltForShopifyBadge({
  href = LISTING_URL,
  className,
}: {
  href?: string;
  className?: string;
}) {
  return (
    <span className={className ? `built-for-shopify-badge-space ${className}` : "built-for-shopify-badge-space"}>
      <a
        href={href}
        className="built-for-shopify-badge"
        aria-label="Built for Shopify. View Appfox Product Bundles on the Shopify App Store."
      >
        <ShopifyBag />
        <span className="built-for-shopify-badge-label">Built for Shopify</span>
      </a>
    </span>
  );
}
