import Link from "next/link";
import { getApp } from "@/data/apps";
import { Reveal } from "@/components/ui/Reveal";
import { SectionSlug } from "@/components/site/SectionSlug";
import { Tick } from "@/components/pricing/Tick";
import {
  SUBSCRIPTION_FREE_FEATURES,
  SUBSCRIPTION_PRICE_LABEL,
} from "@/data/subscription-pricing";

/**
 * NO. 03 - PRICING. A condensed cut of /pricing/subscription: the app is
 * free for now, so the core app on the left and everything unlocked on the
 * right.
 */

const subscriptionApp = getApp("subscription")!;

/** The core app every store gets. */
const INCLUDED = [
  "0% transaction fees on renewals",
  "Subscription widgets & templates",
  "Auto-renewal & recurring billing on Shopify Checkout",
  "Customer self-service portal - skip, pause, swap, cancel",
  "Subscribe & save discounts and trials",
  "Klaviyo, PageFly & Loyalty Lion integrations",
];

export function SubscriptionPricing() {
  return (
    <section id="pricing" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <Reveal variant="none">
          <SectionSlug no="03" label="PRICING" caption="Free for now · every feature included" />
        </Reveal>

        <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <h2 className="max-w-xl">Free for now. Every feature included.</h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-500">
                AppFox Subscription is free for now. Every store gets the full app - analytics,
                bundling, branded emails and the API included - with no cap on active
                subscriptions, and AppFox never takes a cut of your renewals.
              </p>
            </Reveal>

            <Reveal delay={160}>
              <ul className="mt-7 max-w-lg space-y-2.5 border-t border-paper-edge pt-6">
                {INCLUDED.map((feature, i) => (
                  <li key={feature} className="flex items-start gap-2.5 text-[0.9375rem] text-ink-700">
                    <Tick delay={250 + i * 40} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={220}>
              <p className="till mt-6 text-[0.8125rem] text-ink-500">
                No card required · No subscription cap · Works on all Shopify plans
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={120}>
              <article className="relative flex flex-col rounded-2xl border border-brand-200 bg-paper-raised p-6 shadow-(--shadow-pop) sm:p-8">
                <span className="sticker absolute -top-4 left-8 whitespace-nowrap">
                  {SUBSCRIPTION_PRICE_LABEL.toUpperCase()} · $0
                </span>

                <p className="till text-[0.8125rem] uppercase tracking-[0.12em] text-ink-500">
                  {subscriptionApp.name}
                </p>

                <p className="mt-4 flex items-baseline gap-1.5">
                  <span className="font-display font-[560] text-4xl tracking-tight text-ink-900">
                    $0
                  </span>
                  <span className="till text-sm text-ink-500">no plan to pick</span>
                </p>

                <ul className="mt-5 space-y-2.5 border-t border-paper-edge pt-5">
                  {SUBSCRIPTION_FREE_FEATURES.map((feature, i) => (
                    <li key={feature} className="flex items-start gap-2.5 text-[0.9375rem] text-ink-700">
                      <Tick delay={250 + i * 40} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <a href={subscriptionApp.installUrl} className="btn-primary flex-1">
                    Install free on Shopify
                  </a>
                  <Link href="/pricing/subscription" className="btn-secondary flex-1">
                    See pricing details
                  </Link>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
