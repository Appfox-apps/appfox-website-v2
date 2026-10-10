import { brandOgImage } from "@/lib/og";

export const alt =
  "AppFox vs Kaching, Fast Bundle, Bundler, Simple Bundles & Shopify Bundles";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return brandOgImage("AppFox vs Kaching, Fast Bundle, Bundler & more");
}
