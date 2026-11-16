import { brandOgImage } from "@/lib/og";
import { isAppPublic } from "@/lib/visibility";

export const alt = isAppPublic("order-editing")
  ? "Appfox - Compare Shopify order editing, subscription, and bundle apps"
  : "Appfox - Compare Shopify subscription and bundle apps";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return brandOgImage(
    isAppPublic("order-editing")
      ? "Compare Shopify apps: edits, subscriptions, bundles"
      : "Compare Shopify apps: subscriptions and bundles",
  );
}
