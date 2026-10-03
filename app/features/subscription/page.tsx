import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CtaBand } from "@/components/site/CtaBand";
import { SubscriptionFeatureClusters } from "@/components/features/SubscriptionFeatureClusters";
import { routeMeta } from "@/lib/seo";
import { getApp } from "@/data/apps";

export const metadata = routeMeta.featuresSubscription;

const subscriptionApp = getApp("subscription")!;

/**
 * /features/subscription - the full tour for AppFox Subscription. Compact
 * cream hero, then the four feature clusters as alternating split sections,
 * closed by the CTA band. Light throughout until the band's perforation.
 */
export default function SubscriptionFeaturesPage() {
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
              SUBSCRIPTION · THE FULL TOUR
            </p>
            <h1 className="enter-rise mt-5 max-w-3xl">
              Everything a subscription needs, nothing it doesn&apos;t
            </h1>
            <p
              className="enter-fade-rise mt-6 max-w-[65ch] text-xl leading-[1.55] text-ink-700"
              style={{ animationDelay: "140ms" }}
            >
              Recurring revenue shouldn&apos;t mean recurring admin. AppFox Subscription handles the
              widgets, the billing, and the customer questions - on Shopify&apos;s native checkout,
              free to start - so you handle the product. Here&apos;s the full tour.
            </p>
          </div>
        </section>

        {/* ── The four clusters (NO. 01–04) ──────────────────── */}
        <SubscriptionFeatureClusters />

        {/* ── Final CTA ──────────────────────────────────────── */}
        <CtaBand
          headline="Recurring revenue, without the recurring admin"
          body="Install free, drop the widget on your product pages, and let auto-renewal do the collecting. The app is free for now, with every feature included."
          primaryLabel="Install free on Shopify"
          primaryHref={subscriptionApp.installUrl}
          secondaryLabel="See pricing"
          secondaryHref="/pricing/subscription"
          from="paper"
        />
      </main>
      <Footer />
    </>
  );
}
