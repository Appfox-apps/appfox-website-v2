import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionSlug } from "@/components/site/SectionSlug";

const compareLink =
  "font-medium text-brand-700 underline decoration-brand-300 underline-offset-[3px] transition-colors hover:decoration-brand-600";

/**
 * Product Bundles feature clusters - four groups covering the full tour.
 * Alternating split layout sections, each with a headline, narrative, and
 * capability bullets. Follows the same pattern as subscription feature clusters.
 */

const CLUSTERS: {
  no: string;
  label: string;
  headline: string;
  narrative: string;
  capabilities: string[];
}[] = [
  {
    no: "01",
    label: "BUNDLE TYPES",
    headline: "Every way to bundle",
    narrative:
      "Fixed bundles let you curate perfect product sets with preset discounts. Mix-and-match bundles let customers build their own combinations from products you select. Volume discounts reward bigger orders with tiered pricing. All three work with the same widget system and analytics dashboard. If you are weighing us against Kaching or Fast Bundle, the honest write-ups live on the comparison pages.",
    capabilities: [
      "Fixed bundles - curated product sets with preset pricing",
      "Mix-and-match - customers choose from your selection",
      "Volume discounts - buy more, save more (quantity breaks)",
      "BOGO offers - Buy X Get Y, free gifts with purchase",
      "Time-limited promotional bundles",
      "Bundle products across collections and variants",
    ],
  },
  {
    no: "02",
    label: "WIDGETS & INTEGRATION",
    headline: "Widgets that match your store",
    narrative:
      "Bundle widgets integrate via Shopify 2.0 app blocks, which means they inherit your theme's fonts, colors, and spacing automatically - no theme code edits required. The widgets are fully responsive, load fast, and work on all modern Shopify themes. Drop them on product pages, collection pages, or your homepage.",
    capabilities: [
      "Shopify 2.0 app blocks - no theme code required",
      "Automatically inherits your theme's design",
      "Fully responsive on all devices",
      "Works with all modern Shopify themes",
      "Place on product, collection, or home pages",
      "Real-time price updates as customers build bundles",
    ],
  },
  {
    no: "03",
    label: "DISCOUNTS & PRICING",
    headline: "Pricing that sells itself",
    narrative:
      "Bundle discounts display clearly at every step - product page, cart, and checkout - so customers see the savings before they commit. Discounts apply automatically when bundles are added to cart; no coupon codes to remember or copy. You control the discount structure: percentage off, fixed amount, or tiered pricing that scales with quantity.",
    capabilities: [
      "Automatic discounts - no coupon codes needed",
      "Percentage off, fixed amount, or tiered pricing",
      "Clear savings display at product page, cart, and checkout",
      "Compatible with most Shopify discount codes",
      "Real-time inventory checks prevent overselling",
      "Multi-variant bundle support",
    ],
  },
  {
    no: "04",
    label: "ANALYTICS & INSIGHTS",
    headline: "See what's working",
    narrative:
      "Bundle analytics show which offers drive the most revenue, how bundle AOV compares to standalone products, and where customers engage or drop off. Track conversion rates, revenue per bundle type, and performance over time. Use the data to refine your bundle strategy and double down on what works.",
    capabilities: [
      "Revenue tracking per bundle type",
      "Bundle AOV vs standalone product AOV",
      "Conversion rates and drop-off analysis",
      "Performance trends over time",
      "Top-performing bundles dashboard",
      "Export data for deeper analysis",
    ],
  },
];

export function BundlesFeatureClusters() {
  return (
    <>
      {CLUSTERS.map((cluster, i) => {
        const isEven = i % 2 === 0;
        const bgClass = isEven ? "bg-paper" : "bg-paper-sunken";

        return (
          <section key={cluster.no} className={`${bgClass} py-20 sm:py-28`}>
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
              <Reveal variant="none">
                <SectionSlug no={cluster.no} label={cluster.label} caption="" />
              </Reveal>

              <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-16">
                <Reveal>
                  <div>
                    <h2 className="max-w-xl">{cluster.headline}</h2>
                    <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-700">
                      {cluster.narrative}
                    </p>
                    {cluster.no === "01" ? (
                      <p className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-ink-500">
                        <Link href="/product-bundles/compare" className={compareLink}>
                          Compare Appfox to Kaching, Fast Bundle, Bundler & more
                        </Link>
                      </p>
                    ) : null}
                  </div>
                </Reveal>

                <Reveal delay={100}>
                  <ul className="space-y-4">
                    {cluster.capabilities.map((cap, j) => (
                      <li
                        key={cap}
                        className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-ink-700"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="mt-0.5 h-5 w-5 shrink-0 text-success"
                          aria-hidden="true"
                        >
                          <path
                            d="M4 12.5l5 5L20 6.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            pathLength={400}
                            className="draw-path"
                            style={{ "--draw-delay": `${200 + j * 50}ms` } as React.CSSProperties}
                          />
                        </svg>
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
