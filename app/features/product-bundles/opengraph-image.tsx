import { brandOgImage } from "@/lib/og";

export const alt = "Appfox Product Bundles Features";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return brandOgImage("Every way to bundle, in one app");
}
