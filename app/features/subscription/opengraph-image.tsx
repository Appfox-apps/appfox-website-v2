import { brandOgImage } from "@/lib/og";

export const alt = "Appfox Subscription features - Everything a subscription needs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return brandOgImage("Everything a subscription needs, nothing it doesn’t");
}
