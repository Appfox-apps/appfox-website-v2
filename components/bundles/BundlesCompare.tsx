import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { SectionSlug } from "@/components/site/SectionSlug";
import { VsIndexRow, VsTitle } from "@/components/vs/VsIndexRow";
import { competitorsForApp } from "@/data/competitors";

const bundleComps = competitorsForApp("product-bundles");

/**
 * Ruled comparison index for the Product Bundles landing page - same
 * editorial rows as /vs, scoped to this app so subscription URLs stay put.
 */
export function BundlesCompare() {
  return (
    <section id="compare" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <Reveal variant="none">
          <SectionSlug
            no="05"
            label="COMPARED"
            caption="One table, public sources only."
          />
        </Reveal>
        <Reveal>
          <h2 className="mt-8 max-w-2xl">See how Product Bundles compares</h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-500">
            One table against Kaching, Fast Bundle, Bundler, Simple Bundles, and Shopify Bundles
            — including where they are a better fit. Optional one-to-one pages sit underneath.
          </p>
        </Reveal>

        <ul className="mt-10 max-w-5xl divide-y divide-paper-edge border-b border-paper-edge">
          <StaggerGroup step={70}>
            <Reveal as="li" index={0}>
              <VsIndexRow
                href="/product-bundles/compare"
                numeral="00"
                title={
                  <>
                    AppFox <span className="wonk text-marigold-700">vs</span> five bundle apps
                  </>
                }
                category="Multi-competitor table"
                framing="Feature columns for AppFox, Kaching, Fast Bundle, Bundler, Simple Bundles, and Shopify Bundles. Public sources, checked October 2026."
                action="OPEN TABLE"
              />
            </Reveal>
            {bundleComps.map((c, i) => (
              <Reveal key={c.slug} as="li" index={i + 1}>
                <VsIndexRow
                  href={`/vs/${c.slug}`}
                  numeral={String(i + 1).padStart(2, "0")}
                  title={<VsTitle shortName={c.shortName} />}
                  category={c.category}
                  framing={c.framing}
                  action="READ"
                />
              </Reveal>
            ))}
          </StaggerGroup>
        </ul>
      </div>
    </section>
  );
}
