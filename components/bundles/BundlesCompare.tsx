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
            caption={`${bundleComps.length} honest comparisons, public sources only.`}
          />
        </Reveal>
        <Reveal>
          <h2 className="mt-8 max-w-2xl">See how Product Bundles compares</h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-500">
            Kaching, Fast Bundle, Bundler, and the rest - side by side with AppFox, including
            where they are a better fit. No invented ratings.
          </p>
        </Reveal>

        <ul className="mt-10 max-w-5xl divide-y divide-paper-edge border-b border-paper-edge">
          <StaggerGroup step={70}>
            {bundleComps.map((c, i) => (
              <Reveal key={c.slug} as="li" index={i}>
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
            <Reveal as="li" index={bundleComps.length}>
              <VsIndexRow
                href="/vs#product-bundles"
                numeral={String(bundleComps.length + 1).padStart(2, "0")}
                title="All Product Bundles comparisons"
                action="VIEW ALL"
              />
            </Reveal>
          </StaggerGroup>
        </ul>
      </div>
    </section>
  );
}
