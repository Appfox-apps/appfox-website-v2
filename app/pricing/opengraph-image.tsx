import { brandOgImage } from "@/lib/og";

export const alt = "Appfox pricing - two apps, plans from $0 - no hidden meters";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return brandOgImage("Two apps · plans from $0 · no hidden meters");
}
