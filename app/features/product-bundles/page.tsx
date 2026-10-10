import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CtaBand } from "@/components/site/CtaBand";
import { BundlesFeatureClusters } from "@/components/features/BundlesFeatureClusters";
import { routeMeta } from "@/lib/seo";
import { getApp } from "@/data/apps";

export const metadata = routeMeta.featuresProductBundles;

const bundlesApp = getApp("product-bundles")!;

/**
 * /features/product-bundles - the full tour for Appfox Product Bundles.
 * Compact cream hero, then the four feature clusters as alternating split
 * sections, closed by the CTA band.
 */
export default function ProductBundlesFeaturesPage() {
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
              PRODUCT BUNDLES · THE FULL TOUR
            </p>
            <h1 className="enter-rise mt-5 max-w-3xl">
              Every way to bundle, in one app
            </h1>
            <p
              className="enter-fade-rise mt-6 max-w-[65ch] text-xl leading-[1.55] text-ink-700"
              style={{ animationDelay: "140ms" }}
            >
              Curated sets, mix-and-match collections, volume discounts, and BOGO offers - with
              widgets that match your theme and analytics that show what&apos;s working. Here&apos;s
              the full tour.
            </p>
          </div>
        </section>

        {/* ── The four clusters (NO. 01–04) ──────────────────── */}
        <BundlesFeatureClusters />

        {/* ── Final CTA ──────────────────────────────────────── */}
        <CtaBand
          headline="Turn one item into three, and three into five"
          body="Install Appfox Product Bundles, create your first bundle, and watch your average order value climb. Setup takes about 5 minutes."
          primaryLabel="Install free on Shopify"
          primaryHref={bundlesApp.installUrl}
          secondaryLabel="Compare alternatives"
          secondaryHref="/product-bundles/compare"
          from="paper"
        />
      </main>
      <Footer />
    </>
  );
}
