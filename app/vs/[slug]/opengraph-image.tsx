import { getCompetitor } from "@/data/competitors";
import { brandOgImage, vsOgImage } from "@/lib/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * `alt` must be a static string export, so the per-competitor alt text
 * ("AppFox vs {name} - Shopify order editing comparison") is supplied via
 * generateImageMetadata instead.
 */
export function generateImageMetadata({ params }: { params: { slug: string } }) {
  const competitor = getCompetitor(params.slug);
  const name = competitor?.shortName ?? "the competition";
  const topic =
    competitor?.app === "subscription"
      ? "Shopify subscriptions"
      : competitor?.app === "product-bundles"
        ? "Shopify product bundles"
        : "Shopify order editing";
  return [
    {
      id: "comparison",
      alt: `AppFox vs ${name} - ${topic} comparison`,
      size: { width: 1200, height: 630 },
      contentType: "image/png",
    },
  ];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const competitor = getCompetitor(slug);

  if (!competitor) {
    // Unknown slug (page 404s anyway) - fall back to the hub layout.
    return brandOgImage("Compare order editing apps for Shopify");
  }

  return vsOgImage(competitor);
}
