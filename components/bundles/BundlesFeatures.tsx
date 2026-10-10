import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { SectionSlug } from "@/components/site/SectionSlug";

/**
 * NO. 01 - WHAT YOU GET. Light section, six white cards on the
 * same grid grammar as the subscription features.
 */

const FEATURES: { title: string; copy: string; caption: string }[] = [
  {
    title: "Unlimited product bundles",
    copy: "Create as many bundles as you need - curated sets, mix-and-match collections, or customer-built combinations. Fixed pricing, percentage discounts, or tiered rules that reward bigger orders.",
    caption: "fixed bundles · mix & match · custom pricing",
  },
  {
    title: "Volume discounts & quantity breaks",
    copy: "Buy 2 get 10% off, buy 3 get 20% - tiered pricing that scales with quantity. Discounts apply automatically at checkout, no codes to remember or copy.",
    caption: "tiered pricing · quantity breaks",
  },
  {
    title: "BOGO & promotional bundles",
    copy: "Buy X Get Y offers, free gifts with purchase, and time-limited bundle promotions. Set the rules once; the widget shows the savings at every step.",
    caption: "bogo · gifts · promotions",
  },
  {
    title: "Theme-friendly widgets",
    copy: "Responsive bundle widgets that integrate with Shopify 2.0 app blocks - your fonts, your colors, your spacing. No theme code edits required.",
    caption: "shopify 2.0 blocks · responsive",
  },
  {
    title: "Bundle analytics",
    copy: "See which bundles drive the most revenue, how bundle AOV compares to standalone products, and where customers drop off. Performance tracking built in.",
    caption: "revenue tracking · conversion metrics",
  },
  {
    title: "Works with your catalog",
    copy: "Bundle products across collections, variants, and inventory locations. Automatic stock checks prevent overselling. Compatible with discount codes and existing promotions.",
    caption: "multi-variant · inventory sync",
  },
];

export function BundlesFeatures() {
  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <Reveal variant="none">
          <SectionSlug no="01" label="WHAT YOU GET" caption="Everything a bundle needs" />
        </Reveal>
        <Reveal>
          <h2 className="mt-8 max-w-2xl">Sell more by selling together</h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-500">
            Product bundles turn one item into three, quantity breaks reward bigger orders, and
            mix-and-match lets customers build their perfect set. Appfox makes it easy.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <StaggerGroup step={90}>
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} index={i} className="h-full">
                <article className="card lift flex h-full flex-col p-7">
                  <h3 className="text-[1.375rem]">{f.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-700">{f.copy}</p>
                  <p className="till mt-auto pt-5 text-[0.75rem] tracking-wide text-ink-500">
                    {f.caption}
                  </p>
                </article>
              </Reveal>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
