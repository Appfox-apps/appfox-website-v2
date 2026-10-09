import { getApp } from "@/data/apps";
import { InView } from "@/components/ui/InView";
import { AppMark } from "@/components/brand/AppMark";
import { ProductFrame } from "@/components/brand/ProductFrame";

/**
 * Product Bundles hero - same "Counter" grammar as the subscription hero:
 * light cream, paper-wash + soft grain, 55/45 split, h1 on `.enter-rise`,
 * everything else `.enter-fade-rise` with staggered delays.
 */

const bundlesApp = getApp("product-bundles")!;

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

export function BundlesHero() {
  return (
    <section className="paper-wash grain grain-soft relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-16 sm:px-8 sm:pt-36 sm:pb-24 lg:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-[55fr_45fr] lg:gap-10">
          {/* ── Left: copy ─────────────────────────────────── */}
          <InView className="relative z-10">
            <p className="enter-fade-rise flex items-center gap-3" style={{ animationDelay: "60ms" }}>
              <AppMark size={44} />
              <span className="till inline-flex items-center border border-paper-edge bg-paper-raised px-3 py-1.5 text-[0.8125rem] text-marigold-700 shadow-(--shadow-card)">
                Free to install · Unlimited bundles
              </span>
            </p>

            <h1 className="enter-rise mt-6">
              Boost AOV with{" "}
              <span className="wonk relative inline-block">
                bundles
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
              Product bundles, volume discounts, quantity breaks, BOGO, and mix-and-match - with
              responsive widgets that match your theme. Easy setup, unlimited bundles.
            </p>

            <div
              className="enter-fade-rise mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{ animationDelay: "220ms" }}
            >
              <a href={bundlesApp.installUrl} className="btn-primary">
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
              No code · Free to start · Works with Shopify 2.0 themes
            </p>

            <ul
              className="enter-fade-rise mt-6 flex max-w-xl flex-wrap gap-x-6 gap-y-2.5"
              style={{ animationDelay: "420ms" }}
            >
              {[
                "Unlimited product bundles",
                "Volume discounts & quantity breaks",
                "Mix-and-match & BOGO offers",
                "Theme-integrated widgets",
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

          {/* ── Right: bundle demo over a faint watermark ── */}
          <div className="relative">
            <span
              aria-hidden="true"
              className="font-display pointer-events-none absolute -top-24 -right-10 z-0 hidden leading-none tracking-tight text-brand-50 select-none lg:block lg:text-[13rem] xl:text-[16rem]"
              style={{ fontWeight: 560 }}
            >
              3&nbsp;for&nbsp;2
            </span>
            <div className="enter-rise relative z-10" style={{ animationDelay: "150ms" }}>
              <BundleDemo />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── The bundle widget, as a still life ───────────────────── */

function BundleDemo() {
  return (
    <ProductFrame kicker="Bundle widget · save 20%" className="mx-auto w-full max-w-md">
    <div className="p-6" aria-hidden="true">
      <div className="border-b border-paper-edge pb-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.8125rem] font-semibold tracking-wide text-ink-900">
              COMPLETE THE SET
            </p>
            <p className="mt-1 text-[1.0625rem] font-semibold text-ink-900">
              Essentials Bundle - Save 20%
            </p>
          </div>
          <span className="sticker !-rotate-2 text-xs">BUNDLE</span>
        </div>
      </div>

      {/* Bundle items */}
      <div className="mt-4 space-y-3">
        {[
          { name: "Oak Tee - White", price: "$32" },
          { name: "Wool Beanie", price: "$24" },
          { name: "Canvas Tote", price: "$18" },
        ].map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-5 w-5 items-center justify-center border-2 border-ink-900 bg-marigold-500">
                <svg className="h-3 w-3 text-ink-900" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-[0.9375rem] font-medium text-ink-900">{item.name}</span>
            </div>
            <span className="till text-[0.875rem] text-ink-500 line-through">{item.price}</span>
          </div>
        ))}
      </div>

      {/* Price summary */}
      <div className="mt-5 border-[3px] border-ink-900 bg-brand-50 p-4">
        <div className="flex items-center justify-between">
          <span className="text-[0.9375rem] font-medium text-ink-700">Bundle price</span>
          <div className="text-right">
            <span className="till mr-2 text-[0.875rem] text-ink-500 line-through">$74.00</span>
            <span className="text-[1.125rem] font-semibold text-brand-700">$59.20</span>
          </div>
        </div>
        <p className="till mt-1 text-[0.75rem] text-success">Save $14.80 (20%)</p>
      </div>

      <button className="shot-btn mt-5 w-full">
        Add bundle to cart
      </button>
    </div>
    </ProductFrame>
  );
}
