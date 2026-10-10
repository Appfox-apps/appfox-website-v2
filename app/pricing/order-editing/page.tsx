import Link from "next/link";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CtaBand } from "@/components/site/CtaBand";
import { SectionSlug } from "@/components/site/SectionSlug";
import { JsonLd } from "@/components/seo/JsonLd";
import { PricingCards } from "@/components/pricing/PricingCards";
import { PlanTable } from "@/components/pricing/PlanTable";
import { PricingFaq, pricingFaqs } from "@/components/pricing/PricingFaq";
import { routeMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = routeMeta.pricingOrderEditing;

/** FAQPage JSON-LD built from the same array that feeds the accordion - never drifts. */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${site.url}/pricing/order-editing#faq`,
  mainEntity: pricingFaqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function OrderEditingPricingPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <JsonLd data={faqJsonLd} />

        {/* ── Cream hero - light; sunken plans band follows (no perforation) ── */}
        <section className="paper-wash grain grain-soft relative overflow-hidden">
          <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-14 sm:px-8 sm:pt-36 sm:pb-20 lg:px-10">
            <div className="enter-fade-rise" style={{ animationDelay: "60ms" }}>
              <SectionSlug
                no="01"
                label="PRICING"
                caption="Order Editing & Upsell · three plans · monthly"
              />
            </div>

            <h1 className="enter-rise mt-10 max-w-3xl">
              Pricing without the{" "}
              <span className="wonk relative inline-block">
                meter
                {/* hand-drawn marigold underline, draws on at ~600ms */}
                <svg
                  className="absolute -bottom-[0.04em] left-0 h-[0.2em] w-full"
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 8.5C20 5 38 9.5 56 7 72 4.8 88 7.5 98 5.5"
                    fill="none"
                    stroke="var(--color-marigold-300)"
                    strokeWidth={5}
                    strokeLinecap="round"
                    pathLength={400}
                    className="draw-path is-visible"
                    style={{ "--draw-delay": "600ms" } as React.CSSProperties}
                  />
                </svg>
              </span>{" "}
              running
            </h1>

            <p
              className="enter-fade-rise mt-6 max-w-[58ch] text-xl leading-[1.55] text-ink-700"
              style={{ animationDelay: "140ms" }}
            >
              No per-edit overage fees, no upsell revenue caps, no support held hostage behind a
              tier - just three plans for{" "}
              <Link
                href="/order-editing"
                className="text-brand-700 underline decoration-brand-300 underline-offset-2 transition-colors hover:decoration-brand-700"
              >
                Order Editing &amp; Upsell
              </Link>{" "}
              you can read in under a minute.
            </p>
          </div>
        </section>

        {/* ── Plan cards - sunken band (§5.11 treatment) ── */}
        <PricingCards />

        {/* ── Plan-difference table - light ── */}
        <PlanTable />

        {/* ── The other app's pricing fits in one sentence ── */}
        <section>
          <div className="mx-auto max-w-7xl px-6 pb-4 sm:px-8 lg:px-10">
            <div className="card-tinted flex flex-col items-start justify-between gap-5 rounded-2xl border p-7 sm:flex-row sm:items-center sm:p-8">
              <div>
                <p className="till text-[0.8125rem] uppercase tracking-[0.12em] text-ink-500">
                  Also from Appfox
                </p>
                <p className="mt-2 text-lg font-semibold text-ink-900">
                  Appfox Subscription starts free, with paid plans from $10/mo.
                </p>
                <p className="mt-1 text-[0.9375rem] text-ink-700">
                  Recurring billing, subscribe &amp; save, and a customer portal - free for your
                  first 50 subscriptions, 0% transaction fees on every plan.
                </p>
              </div>
              <Link href="/pricing/subscription" className="btn-secondary shrink-0">
                Subscription pricing
              </Link>
            </div>
          </div>
        </section>

        {/* ── Pricing FAQ - light; CtaBand below tears from paper ── */}
        <PricingFaq />

        <CtaBand
          headline={"There’s a “can I change my order?” email in your inbox right now"}
          body="Make it the last one anyone on your team answers by hand. Setup takes about 5 minutes, and the free plan doesn’t expire."
          secondaryLabel="Compare order editing apps"
          secondaryHref="/vs#order-editing"
          from="paper"
        />
      </main>
      <Footer />
    </>
  );
}
