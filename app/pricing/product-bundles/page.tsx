import Link from "next/link";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CtaBand } from "@/components/site/CtaBand";
import { SectionSlug } from "@/components/site/SectionSlug";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { routeMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { getApp } from "@/data/apps";

export const metadata = routeMeta.pricingProductBundles;

const bundlesApp = getApp("product-bundles")!;

/** The four questions everyone asks about a free-to-start app with upgrade paths. */
export const bundlesPricingFaqs: { q: string; a: string }[] = [
  {
    q: "Is the free plan actually free?",
    a: "Yes - free to install, no trial clock, no card required. It includes unlimited product bundles, all bundle types (fixed, mix-and-match, volume discounts, BOGO), theme-integrated widgets, and bundle analytics. You only upgrade when your bundle program needs advanced features.",
  },
  {
    q: "What types of bundles can I create on the free plan?",
    a: "All of them. The free plan supports fixed bundles, mix-and-match, volume discounts, quantity breaks, and BOGO offers - unlimited. You get the full widget system, Shopify 2.0 integration, and performance analytics. There are no bundle limits or feature restrictions on core functionality.",
  },
  {
    q: "Do bundles work with discount codes?",
    a: "Bundle discounts stack with most Shopify discount codes, but behavior depends on your store's settings. You control whether bundles are eligible for additional discounts through your Shopify admin. Bundle analytics show the effective discount rate on every sale.",
  },
  {
    q: "When would I need to upgrade?",
    a: "Most stores stay on the free plan indefinitely. Paid plans add features like advanced segmentation, priority support, API access, and white-label options. Install free and explore; upgrade paths appear in-app when they make sense for your business.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${site.url}/pricing/product-bundles#faq`,
  mainEntity: bundlesPricingFaqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

/** Hand-drawn tick - never a ✓ character. */
function Tick({ delay }: { delay: number }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-success" aria-hidden="true">
      <path
        d="M4 12.5l5 5L20 6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={400}
        className="draw-path"
        style={{ "--draw-delay": `${delay}ms` } as React.CSSProperties}
      />
    </svg>
  );
}

const FREE_PLAN_FEATURES = [
  "Unlimited product bundles",
  "All bundle types: fixed, mix-and-match, volume discounts, BOGO",
  "Automatic bundle discounts - percentage, fixed, or tiered",
  "Responsive Shopify 2.0 widgets that match your theme",
  "Real-time inventory sync",
  "Bundle performance analytics",
  "Product page, collection, and homepage placement",
  "Email support",
];

export default function ProductBundlesPricingPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <JsonLd data={faqJsonLd} />

        {/* ── Cream hero ── */}
        <section className="paper-wash grain grain-soft relative overflow-hidden">
          <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-14 sm:px-8 sm:pt-36 sm:pb-20 lg:px-10">
            <div className="enter-fade-rise" style={{ animationDelay: "60ms" }}>
              <SectionSlug
                no="01"
                label="PRICING"
                caption="AppFox Product Bundles · free to start"
              />
            </div>

            <h1 className="enter-rise mt-10 max-w-3xl">
              Starts{" "}
              <span className="wonk relative inline-block">
                free
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
              </span>
              . Stays simple.
            </h1>

            <p
              className="enter-fade-rise mt-6 max-w-[58ch] text-xl leading-[1.55] text-ink-700"
              style={{ animationDelay: "140ms" }}
            >
              <Link
                href="/product-bundles"
                className="text-brand-700 underline decoration-brand-300 underline-offset-2 transition-colors hover:decoration-brand-700"
              >
                AppFox Product Bundles
              </Link>{" "}
              is free to install with unlimited bundles, all bundle types, and full analytics. Most
              stores never need to upgrade.
            </p>
          </div>
        </section>

        {/* ── Free plan card - sunken band ── */}
        <section id="plans" className="bg-paper-sunken">
          <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-24 lg:px-10">
            <Reveal variant="none">
              <SectionSlug
                no="02"
                label="THE PLAN"
                caption="Everything you need to start selling bundles"
              />
            </Reveal>
            <h2 className="sr-only">Free plan</h2>

            <div className="mt-12 flex justify-center">
              <Reveal className="w-full max-w-xl">
                <article className="card relative overflow-hidden p-7 sm:p-9">
                  <p className="till text-[0.8125rem] uppercase tracking-[0.12em] text-ink-500">
                    Free plan
                  </p>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-700">
                    Everything you need to boost AOV with bundles
                  </p>

                  <p className="mt-4 flex items-baseline gap-1.5">
                    <span className="font-display font-[560] text-5xl tracking-tight text-ink-900">
                      Free
                    </span>
                    <span className="till text-sm text-ink-500">to install · no expiration</span>
                  </p>

                  <ul className="mt-6 space-y-3 border-t border-paper-edge pt-6">
                    {FREE_PLAN_FEATURES.map((feature, i) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-[0.9375rem] text-ink-700"
                      >
                        <Tick delay={250 + i * 40} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a href={bundlesApp.installUrl} className="btn-primary mt-8 w-full">
                    Install free on Shopify
                  </a>

                  <p className="till mt-4 text-center text-[0.75rem] text-ink-500">
                    No credit card required · Works on all Shopify plans
                  </p>
                </article>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Four straight answers - light ── */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <Reveal variant="none">
              <SectionSlug no="03" label="QUESTIONS" caption="The fine print, minus the squinting" />
            </Reveal>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {bundlesPricingFaqs.map((faq, i) => (
                <Reveal key={faq.q} delay={i * 90}>
                  <article className="card h-full p-7">
                    <h3 className="text-[1.125rem]">{faq.q}</h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-700">{faq.a}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── The paid siblings, one line each ── */}
        <section className="bg-paper-sunken">
          <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:px-10">
            <div className="space-y-5">
              <div className="card-tinted flex flex-col items-start justify-between gap-5 rounded-2xl border p-7 sm:flex-row sm:items-center sm:p-8">
                <div>
                  <p className="till text-[0.8125rem] uppercase tracking-[0.12em] text-ink-500">
                    Also from AppFox
                  </p>
                  <p className="mt-2 text-lg font-semibold text-ink-900">
                    Order Editing &amp; Upsell starts free, with paid plans from $19/mo.
                  </p>
                  <p className="mt-1 text-[0.9375rem] text-ink-700">
                    Self-service order edits and one-click upsells - no per-edit fees, no revenue
                    caps.
                  </p>
                </div>
                <Link href="/pricing/order-editing" className="btn-secondary shrink-0">
                  Order Editing pricing
                </Link>
              </div>

              <div className="card-tinted flex flex-col items-start justify-between gap-5 rounded-2xl border p-7 sm:flex-row sm:items-center sm:p-8">
                <div>
                  <p className="till text-[0.8125rem] uppercase tracking-[0.12em] text-ink-500">
                    Also from AppFox
                  </p>
                  <p className="mt-2 text-lg font-semibold text-ink-900">
                    Subscription is free for now, with every feature included.
                  </p>
                  <p className="mt-1 text-[0.9375rem] text-ink-700">
                    Recurring billing and a self-service portal - 0% transaction fees on all plans.
                  </p>
                </div>
                <Link href="/pricing/subscription" className="btn-secondary shrink-0">
                  Subscription pricing
                </Link>
              </div>
            </div>
          </div>
        </section>

        <CtaBand
          headline="Install free, start bundling"
          body="Unlimited product bundles, all bundle types, and full analytics - free to install with no expiration. Set up your first bundle in about 5 minutes."
          primaryHref={bundlesApp.installUrl}
          secondaryLabel="See all features"
          secondaryHref="/features/product-bundles"
          from="paper"
        />
      </main>
      <Footer />
    </>
  );
}
