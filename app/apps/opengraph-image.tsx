import { brandOgImage } from "@/lib/og";

export const alt = "Appfox apps for Shopify - Order Editing & Subscription";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return brandOgImage("Shopify apps for the whole order journey");
}
