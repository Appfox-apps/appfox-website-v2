import { brandOgImage } from "@/lib/og";
import { isAppPublic } from "@/lib/visibility";

export const alt = isAppPublic("order-editing")
  ? "Appfox apps for Shopify - Order Editing & Subscription"
  : "Appfox apps for Shopify - Subscriptions & Product Bundles";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return brandOgImage("Shopify apps for the whole order journey");
}
