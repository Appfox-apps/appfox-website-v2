import Image from "next/image";
import type { AppSlug } from "@/data/apps";

const MARKS = {
  brand: {
    src: "/images/brand/appfox-512.png",
    alt: "AppFox",
  },
  "order-editing": {
    src: "/images/brand/order-editing-512.png",
    alt: "AppFox Order Editing & Upsell",
  },
  subscription: {
    src: "/images/brand/subscriptions-512.png",
    alt: "AppFox Subscriptions",
  },
  "product-bundles": {
    src: "/images/brand/bundles-512.png",
    alt: "AppFox Bundles",
  },
} as const;

export type AppMarkId = "brand" | AppSlug;

/** Square app mark. The SVG already carries the ink rule and yellow tab. */
export function AppMark({
  id,
  size = 40,
  className = "",
}: {
  id: AppMarkId;
  size?: number;
  className?: string;
}) {
  const mark = MARKS[id];
  return (
    <Image
      src={mark.src}
      alt={mark.alt}
      width={size}
      height={size}
      className={`shrink-0 ${className}`}
    />
  );
}
