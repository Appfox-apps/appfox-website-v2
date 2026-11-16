import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { hiddenPathnames } from "@/lib/hidden-routes";

export default function robots(): MetadataRoute.Robots {
  const hidden = hiddenPathnames();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Disallow is a prefix match. Combined with the 307s, crawlers are
      // told not to index the hidden app while it is unpublished.
      ...(hidden.length > 0 ? { disallow: hidden } : {}),
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
