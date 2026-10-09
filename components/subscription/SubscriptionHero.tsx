import { getApp } from "@/data/apps";
import { InView } from "@/components/ui/InView";
import { AppMark } from "@/components/brand/AppMark";
import { ProductFrame } from "@/components/brand/ProductFrame";

/**
 * Subscription hero - same "Counter" grammar as the home hero: light cream,
 * paper-wash + soft grain, 55/45 split, h1 on `.enter-rise` (LCP rule),
 * everything else `.enter-fade-rise` with staggered delays.
 */

const subscriptionApp = getApp("subscription")!;

/** Hand-drawn tick - never a ✓ character. */
function Tick({ delay }: { delay: string }) {
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
        style={{ "--draw-delay": delay } as React.CSSProperties}
      />
    </svg>
  );
}

export function SubscriptionHero() {
  return (
    <section className="paper-wash grain grain-soft relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-16 sm:px-8 sm:pt-36 sm:pb-24 lg:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-[55fr_45fr] lg:gap-10">
          {/* ── Left: copy ─────────────────────────────────── */}
          <InView className="relative z-10">
            <p className="enter-fade-rise flex items-center gap-3" style={{ animationDelay: "60ms" }}>
              <AppMark size={44} />
              <span className="till inline-flex items-center border border-paper-edge bg-paper-raised px-3 py-1.5 text-[0.8125rem] text-marigold-700 shadow-(--shadow-card)">
                4.2★ on the Shopify App Store · Free to install
              </span>
            </p>

            <h1 className="enter-rise mt-6">
              Turn one-time buyers into{" "}
              <span className="wonk relative inline-block">
                subscribers
                {/* Hand-drawn marigold underline, draws on at ~600ms */}
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
            </h1>

            <p
              className="enter-fade-rise mt-6 max-w-[58ch] text-xl leading-[1.55] text-ink-700"
              style={{ animationDelay: "140ms" }}
            >
              Subscribe-and-save widgets, recurring billing, and a self-service customer portal -
              all on Shopify&apos;s native checkout. Set it up in minutes; the renewals run
              themselves.
            </p>

            <div
              className="enter-fade-rise mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{ animationDelay: "220ms" }}
            >
              <a href={subscriptionApp.installUrl} className="btn-primary">
                Install free on Shopify
              </a>
              <a href="#how-it-works" className="btn-secondary">
                See how it works
              </a>
            </div>

            <p
              className="enter-fade-rise till mt-4 text-sm text-ink-500"
              style={{ animationDelay: "320ms" }}
            >
              No code · Free to install · Works with Shopify Checkout
            </p>

            <ul
              className="enter-fade-rise mt-6 flex max-w-xl flex-wrap gap-x-6 gap-y-2.5"
              style={{ animationDelay: "420ms" }}
            >
              {[
                "Native Shopify Checkout billing",
                "Customer portal - skip, pause, cancel",
                "Subscribe & save discounts",
                "5-minute setup, no code",
              ].map((content, i) => (
                <li
                  key={content}
                  className="flex items-center gap-2 text-[0.9375rem] font-medium text-ink-700"
                >
                  <Tick delay={`${700 + i * 90}ms`} />
                  <span>{content}</span>
                </li>
              ))}
            </ul>
          </InView>

          {/* ── Right: the subscribe widget demo over a faint watermark ── */}
          <div className="relative">
            <span
              aria-hidden="true"
              className="font-display pointer-events-none absolute -top-24 -right-10 z-0 hidden leading-none tracking-tight text-brand-50 select-none lg:block lg:text-[13rem] xl:text-[16rem]"
              style={{ fontWeight: 560 }}
            >
              every&nbsp;30d
            </span>
            <div className="enter-rise relative z-10" style={{ animationDelay: "150ms" }}>
              <WidgetDemo />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── The product-page widget, as a still life ───────────────────── */

function WidgetDemo() {
  return (
    <ProductFrame kicker="Subscribe widget · 10% off" className="mx-auto w-full max-w-md">
    <div className="p-6" aria-hidden="true">
      <div className="flex items-start justify-between gap-4 border-b border-paper-edge pb-4">
        <div>
          <p className="text-[0.8125rem] font-semibold tracking-wide text-ink-900">OAK &amp; ANCHOR</p>
          <p className="mt-1 text-[1.0625rem] font-semibold text-ink-900">Single-Origin Coffee, 12oz</p>
        </div>
        <p className="till text-[0.9375rem] text-ink-700">$18.00</p>
      </div>

      {/* One-time option - unselected */}
      <div className="mt-4 flex items-center justify-between border-[3px] border-ink-900 px-4 py-3">
        <span className="flex items-center gap-3">
          <span className="h-4 w-4 border-2 border-ink-900 bg-paper-raised" />
          <span className="text-[0.9375rem] font-medium text-ink-700">One-time purchase</span>
        </span>
        <span className="till text-[0.875rem] text-ink-500">$18.00</span>
      </div>

      {/* Subscribe & save - selected */}
      <div className="mt-2.5 border-[3px] border-ink-900 bg-brand-50 px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-3">
            <span className="flex h-4 w-4 items-center justify-center border-2 border-ink-900 bg-marigold-500">
              <span className="h-2 w-2 bg-ink-900" />
            </span>
            <span className="text-[0.9375rem] font-semibold text-ink-900">Subscribe &amp; save 10%</span>
          </span>
          <span className="till text-[0.875rem] text-brand-700">$16.20</span>
        </div>
        <div className="mt-3 flex items-center justify-between rounded-lg border border-paper-edge bg-paper-raised px-3 py-2">
          <span className="text-[0.8125rem] text-ink-500">Deliver every</span>
          <span className="till flex items-center gap-1.5 text-[0.8125rem] text-ink-900">
            30 days
            <svg className="h-3 w-3 text-ink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </div>
      </div>

      <span className="shot-btn mt-5 w-full">
        Add to cart - $16.20/mo
      </span>

      <p className="till mt-3 text-center text-[0.75rem] text-ink-500">
        skip · pause · swap · cancel anytime
      </p>
    </div>
    </ProductFrame>
  );
}
