import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { isAppHidden } from "@/lib/visibility";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: isAppHidden("order-editing")
      ? "Shopify apps for subscriptions and product bundles."
      : site.shortDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#f5f3fa",
    theme_color: "#f5f3fa",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
