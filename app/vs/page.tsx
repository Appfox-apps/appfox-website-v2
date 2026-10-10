import type { Metadata } from "next";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CtaBand } from "@/components/site/CtaBand";
import { SectionSlug } from "@/components/site/SectionSlug";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { VsIndexRow, VsTitle } from "@/components/vs/VsIndexRow";
import { competitorsForApp } from "@/data/competitors";
import { routeMeta } from "@/lib/seo";

export const metadata: Metadata = routeMeta.vs;

/**
 * /vs - comparison hub, one ruled editorial index per AppFox app.
 * Light throughout until the CTA band's perforation.
 */

const orderEditingComps = competitorsForApp("order-editing");
const subscriptionComps = competitorsForApp("subscription");
const bundleComps = competitorsForApp("product-bundles");

export default function ComparisonHubPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* ── Hero - compact cream ─────────────────────────── */}
        <section className="paper-wash grain grain-soft relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 pt-28 pb-12 sm:px-8 sm:pt-36 sm:pb-16 lg:px-10">
            <p
              className="enter-fade-rise till text-[0.8125rem] uppercase tracking-[0.14em] text-marigold-700"
              style={{ animationDelay: "60ms" }}
            >
              Comparisons
            </p>
            <h1 className="enter-rise mt-4 max-w-3xl">Compare AppFox to the alternatives</h1>
            <p
              className="enter-fade-rise mt-6 max-w-[70ch] text-lg leading-relaxed text-ink-700"
              style={{ animationDelay: "140ms" }}
            >
              Every app in these categories promises fewer tickets and more revenue - the
              differences live in the details: how edits actually happen, what the pricing meters
              (edits, subscribers, bundle sales), and how much control the merchant keeps. These
              comparisons lay those details out side by side, plainly. Where a competitor is
              genuinely strong, we say so; where the trade-offs favor AppFox, we show our work.
            </p>
          </div>
        </section>

        {/* ── Index 1 - Order Editing comparisons ──────────── */}
        <section id="order-editing" className="pt-14 pb-8 sm:pt-20 sm:pb-10">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <Reveal variant="none">
              <SectionSlug
                no="01"
                label="ORDER EDITING & UPSELL"
                caption={`${orderEditingComps.length} comparisons, one standard.`}
              />
            </Reveal>

            <ul className="mt-2 max-w-5xl divide-y divide-paper-edge border-b border-paper-edge">
              <StaggerGroup step={70}>
                {orderEditingComps.map((c, i) => (
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
              </StaggerGroup>
            </ul>
          </div>
        </section>

        {/* ── Index 2 - Subscription comparisons ───────────── */}
        <section id="subscription" className="pt-8 pb-8 sm:pt-10 sm:pb-10">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <Reveal variant="none">
              <SectionSlug
                no="02"
                label="SUBSCRIPTION"
                caption={`${subscriptionComps.length} comparisons, flat plans vs metered.`}
              />
            </Reveal>

            <ul className="mt-2 max-w-5xl divide-y divide-paper-edge border-b border-paper-edge">
              <StaggerGroup step={70}>
                {subscriptionComps.map((c, i) => (
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
              </StaggerGroup>
            </ul>
          </div>
        </section>

        {/* ── Index 3 - Product Bundles comparisons ────────── */}
        <section id="product-bundles" className="pt-8 pb-14 sm:pt-10 sm:pb-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <Reveal variant="none">
              <SectionSlug
                no="03"
                label="PRODUCT BUNDLES"
                caption="One table, then optional one-to-one pages."
              />
            </Reveal>

            <ul className="mt-2 max-w-5xl divide-y divide-paper-edge border-b border-paper-edge">
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
                    framing="Kaching, Fast Bundle, Bundler, Simple Bundles, and Shopify Bundles in one table — including where they win. Public sources, checked October 2026."
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

        {/* CTA band - previous section is light paper. */}
        <CtaBand
          headline="However you compare it, every AppFox app starts at $0"
          body="Order Editing's free plan never expires. Subscription is free for now. Product Bundles is free to install with unlimited listed offer types. Five-minute setups, no cards required."
          primaryLabel="Get Order Editing"
          secondaryLabel="Get Product Bundles"
          secondaryHref="/product-bundles"
          from="paper"
        />
      </main>
      <Footer />
    </>
  );
}
