import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CtaBand } from "@/components/site/CtaBand";
import { FeatureClusters } from "@/components/features/FeatureClusters";
import { routeMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = routeMeta.featuresOrderEditing;

/**
 * /features/order-editing - the full tour. Compact cream hero, then the
 * four feature clusters (COPY.md §2) as alternating split sections, closed
 * by the variant-B (money) CTA band. Every section here is light paper, so
 * the only seam is CtaBand's own perforation (from="paper").
 */
export default function OrderEditingFeaturesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* ── Compact cream hero ─────────────────────────────── */}
        <section className="paper-wash relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 pt-36 pb-16 sm:px-8 lg:px-10">
            <p
              className="enter-fade-rise till text-[0.8125rem] uppercase tracking-[0.12em] text-marigold-700"
              style={{ animationDelay: "60ms" }}
            >
              ORDER EDITING &amp; UPSELL · THE FULL TOUR
            </p>
            <h1 className="enter-rise mt-5 max-w-3xl">
              Every edit, rule, and upsell in the toolkit
            </h1>
            <p
              className="enter-fade-rise mt-6 max-w-[65ch] text-xl leading-[1.55] text-ink-700"
              style={{ animationDelay: "140ms" }}
            >
              An order isn&apos;t finished when the customer pays - that&apos;s when the address
              typos surface, the size regrets kick in, and the &quot;actually, add one more&quot;
              emails start. Appfox Order Editing &amp; Upsell turns all of it into a self-service
              flow that follows your rules, settles its own payments, and sells a little more
              along the way. Here&apos;s the full tour.
            </p>
          </div>
        </section>

        {/* ── The four clusters (NO. 01–04) ──────────────────── */}
        <FeatureClusters />

        {/* ── Final CTA - variant B (money) ──────────────────── */}
        <CtaBand
          headline="Every cancel-and-reorder edit burns 1.5–2.9% in fees"
          body="Appfox edits orders in place on the original payment - and turns the edit screen into your highest-attention upsell placement. Try it free for 14 days, no card required."
          primaryLabel="Start free trial"
          primaryHref={site.installUrl}
          secondaryLabel="See pricing"
          secondaryHref="/pricing/order-editing"
          from="paper"
        />
      </main>
      <Footer />
    </>
  );
}
