import { site } from "@/lib/site";
import { InView } from "@/components/ui/InView";
import { AppMark } from "@/components/brand/AppMark";
import { PortalDemo } from "./PortalDemo";

/**
 * §5.2 Hero - light cream, paper-wash + soft grain, 55/45 split.
 * Light section; TrustStrip (sunken) follows - no perforation needed
 * between light sections.
 *
 * LCP rule: the h1 animates with `.enter-rise` (transform-only, painted
 * immediately); every other hero element uses `.enter-fade-rise` with a
 * staggered inline animation-delay.
 */

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

export function Hero() {
  return (
    <section className="paper-wash grain grain-soft relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-16 sm:px-8 sm:pt-36 sm:pb-24 lg:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-[55fr_45fr] lg:gap-10">
          {/* ── Left: copy ─────────────────────────────────── */}
          <InView className="relative z-10">
            <p className="enter-fade-rise flex items-center gap-3" style={{ animationDelay: "60ms" }}>
              <AppMark size={44} />
              <span className="till inline-flex items-center border border-paper-edge bg-paper-raised px-3 py-1.5 text-[0.8125rem] text-marigold-700 shadow-(--shadow-card)">
                “Can I change my order?” - answered automatically
              </span>
            </p>

            <h1 className="enter-rise mt-6">
              Let customers{" "}
              <span className="wonk relative inline-block">
                edit
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
              </span>{" "}
              their orders - and add to them
            </h1>

            <p
              className="enter-fade-rise mt-6 max-w-[58ch] text-xl leading-[1.55] text-ink-700"
              style={{ animationDelay: "140ms" }}
            >
              Customers fix their own orders - addresses, sizes, cancellations - right on your
              thank-you and order status pages. You set the rules;{" "}
              <span className="till">~80%</span> handle themselves.
            </p>

            <div
              className="enter-fade-rise mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{ animationDelay: "220ms" }}
            >
              <a href={site.installUrl} className="btn-primary">
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
              No code · Works on all Shopify plans · Free plan available
            </p>

            <ul
              className="enter-fade-rise mt-6 flex max-w-xl flex-wrap gap-x-6 gap-y-2.5"
              style={{ animationDelay: "420ms" }}
            >
              {[
                <>In-place edits — fees preserved</>,
                <>5-minute setup, no code</>,
                <>Free plan - no card required</>,
                <>Works on every Shopify plan</>,
              ].map((content, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-[0.9375rem] font-medium text-ink-700"
                >
                  <Tick delay={`${700 + i * 90}ms`} />
                  <span>{content}</span>
                </li>
              ))}
            </ul>
          </InView>

          {/* ── Right: the portal demo over a faint #1042 watermark ── */}
          <div className="relative">
            <span
              aria-hidden="true"
              className="font-display pointer-events-none absolute -top-24 -right-10 z-0 hidden leading-none tracking-tight text-brand-50 select-none lg:block lg:text-[13rem] xl:text-[16rem]"
              style={{ fontWeight: 560 }}
            >
              #1042
            </span>
            <div className="enter-rise relative z-10" style={{ animationDelay: "150ms" }}>
              <PortalDemo />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
