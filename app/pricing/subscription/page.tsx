import Link from "next/link";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CtaBand } from "@/components/site/CtaBand";
import { SectionSlug } from "@/components/site/SectionSlug";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { Tick } from "@/components/pricing/Tick";
import { routeMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { getApp } from "@/data/apps";
import {
  SUBSCRIPTION_FREE_FEATURES,
  SUBSCRIPTION_PRICE_LABEL,
} from "@/data/subscription-pricing";

export const metadata = routeMeta.pricingSubscription;

const subscriptionApp = getApp("subscription")!;

/** The questions everyone asks about an app that is free for now. */
export const subscriptionPricingFaqs: { q: string; a: string }[] = [
  {
    q: "Is Appfox Subscription really free?",
    a: "Yes. Appfox Subscription is free for now - no monthly fee, no trial clock, no card required, and no plan to choose. Every feature is unlocked, including analytics, bundles and build-a-box, custom emails, and the External API.",
  },
  {
    q: "Is there a limit on active subscriptions?",
    a: "No. While the app is free there's no cap on active subscriptions, so you can grow your program without hitting a plan ceiling.",
  },
  {
    q: "Are there transaction fees on renewals?",
    a: "No. Renewals bill through Shopify's own checkout and payment infrastructure, so you pay only your normal Shopify payment processing. Appfox takes 0% of your recurring revenue.",
  },
  {
    q: "What if paid plans come back?",
    a: "Appfox Subscription bills through Shopify App Pricing, so any future paid plan would need your approval in Shopify before a charge is made. Merchants already on a paid plan keep it as it is.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${site.url}/pricing/subscription#faq`,
  mainEntity: subscriptionPricingFaqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

/** The single plan: free, everything unlocked. */
function FreeCard() {
  return (
    <article className="relative flex h-full flex-col rounded-2xl border border-brand-200 bg-paper-raised p-6 shadow-(--shadow-pop) sm:p-8">
      <span className="sticker absolute -top-4 left-8 whitespace-nowrap">FREE FOR NOW</span>

      <p className="till text-[0.8125rem] uppercase tracking-[0.12em] text-ink-500">
        {subscriptionApp.name}
      </p>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-700">
        Every feature, every store, no subscription ceiling.
      </p>

      <p className="mt-4 flex items-baseline gap-1.5">
        <span className="font-display font-[560] text-4xl tracking-tight text-ink-900">$0</span>
        <span className="till text-sm text-ink-500">{SUBSCRIPTION_PRICE_LABEL.toLowerCase()}</span>
      </p>

      <ul className="mt-5 grid flex-1 gap-2.5 border-t border-paper-edge pt-5 sm:grid-cols-2">
        {SUBSCRIPTION_FREE_FEATURES.map((feature, i) => (
          <li key={feature} className="flex items-start gap-2.5 text-[0.9375rem] text-ink-700">
            <Tick delay={250 + i * 40} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <a href={subscriptionApp.installUrl} className="btn-primary mt-7 w-full">
        Install free on Shopify
      </a>
    </article>
  );
}

export default function SubscriptionPricingPage() {
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
                caption="Appfox Subscription · free for now"
              />
            </div>

            <h1 className="enter-rise mt-10 max-w-3xl">
              <span className="wonk relative inline-block">
                Free
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
              {" "}for now. Every feature included.
            </h1>

            <p
              className="enter-fade-rise mt-6 max-w-[58ch] text-xl leading-[1.55] text-ink-700"
              style={{ animationDelay: "140ms" }}
            >
              <Link
                href="/subscription"
                className="text-brand-700 underline decoration-brand-300 underline-offset-2 transition-colors hover:decoration-brand-700"
              >
                Appfox Subscription
              </Link>{" "}
              is free for now: every feature unlocked, no limit on active subscriptions, and 0%
              transaction fees, so the recurring revenue stays yours.
            </p>
          </div>
        </section>

        {/* ── The plan - sunken band ── */}
        <section id="plans" className="bg-paper-sunken">
          <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-24 lg:px-10">
            <Reveal variant="none">
              <SectionSlug
                no="02"
                label="THE PLAN"
                caption="One plan, everything included"
              />
            </Reveal>
            <h2 className="sr-only">The plan</h2>

            <div className="mx-auto mt-12 max-w-3xl pt-2">
              <Reveal className="h-full">
                <FreeCard />
              </Reveal>
            </div>

            <Reveal delay={150}>
              <p className="till mt-12 text-center text-[0.8125rem] text-ink-500">
                No card required · No subscription cap · Works on all Shopify plans
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── Straight answers - light ── */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <Reveal variant="none">
              <SectionSlug no="03" label="QUESTIONS" caption="The fine print, minus the squinting" />
            </Reveal>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {subscriptionPricingFaqs.map((faq, i) => (
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

        {/* ── The paid sibling, one line ── */}
        <section>
          <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:px-10">
            <div className="card-tinted flex flex-col items-start justify-between gap-5 rounded-2xl border p-7 sm:flex-row sm:items-center sm:p-8">
              <div>
                <p className="till text-[0.8125rem] uppercase tracking-[0.12em] text-ink-500">
                  Also from Appfox
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
          </div>
        </section>

        <CtaBand
          headline="Every subscriber is on the house, for now"
          body="Install free, drop the widget on your product pages, and let auto-renewal do the collecting. Every feature is unlocked and there's no cap on active subscriptions."
          primaryHref={subscriptionApp.installUrl}
          secondaryLabel="Compare subscription apps"
          secondaryHref="/subscription/compare"
          from="paper"
        />
      </main>
      <Footer />
    </>
  );
}
