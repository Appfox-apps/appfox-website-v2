import { brandOgImage } from "@/lib/og";

export const alt =
  "Appfox vs Kaching, Fast Bundle, Bundler, Simple Bundles & Shopify Bundles";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return brandOgImage("Appfox vs Kaching, Fast Bundle, Bundler & more");
}
