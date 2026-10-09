import { apps } from "@/data/apps";
import { HeroOrderDemo } from "@/components/brand/HeroOrderDemo";
import { FoxMascot } from "@/components/site/FoxMascot";

/**
 * Brand hero - the multi-app front door. Copy on the left, a working
 * interactive miniature of the customer portal (<HeroOrderDemo>) on the
 * right; the two app cards in <AppShowcase> sit directly below and carry
 * the detail, so the copy stays short: one claim, one CTA, one trust line.
 * Below lg the demo card stacks under the (re-centered) copy.
 *
 * LCP rule: h1 animates with `.enter-rise` (transform-only); everything
 * else `.enter-fade-rise` with staggered delays.
 */
export function BrandHero() {
  return (
    <section className="paper-wash grain grain-soft relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-6 sm:px-8 sm:pt-28 lg:px-10 lg:pt-32 lg:pb-10">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div className="text-center lg:text-left">
            <div className="enter-fade-rise" style={{ animationDelay: "0ms" }}>
              <FoxMascot />
            </div>

            <p className="enter-fade-rise" style={{ animationDelay: "60ms" }}>
              <span className="till inline-flex items-center rounded-full border border-brand-200 bg-paper-raised px-3.5 py-1.5 text-xs text-brand-700 shadow-(--shadow-card)">
                {apps.length} apps · built for Shopify merchants
              </span>
            </p>

            <h1 className="enter-rise mx-auto mt-6 max-w-4xl hero-gradient lg:mx-0 lg:text-[3.75rem] xl:text-[4.25rem]">
              Grow revenue from{" "}
              <span className="wonk relative inline-block" style={{
                background: "linear-gradient(to right, var(--color-brand-600), var(--color-brand-400))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                every order
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
              className="enter-fade-rise mx-auto mt-6 max-w-[58ch] text-xl leading-[1.55] text-ink-700 lg:mx-0"
              style={{ animationDelay: "140ms" }}
            >
              AppFox builds Shopify apps that turn orders into growth - customers subscribe
              right from your product page, fix their own orders, and add to them after
              checkout. Fewer tickets, bigger orders, recurring revenue.
            </p>

            <div
              className="enter-fade-rise mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
              style={{ animationDelay: "220ms" }}
            >
              <a href="#apps" className="btn-primary">
                Explore the apps
              </a>
            </div>

            <p
              className="enter-fade-rise till mt-4 text-sm text-ink-500"
              style={{ animationDelay: "320ms" }}
            >
              Free to start · 5-minute setup · No theme code
            </p>
          </div>

          <div className="enter-fade-rise" style={{ animationDelay: "280ms" }}>
            <HeroOrderDemo />
          </div>
        </div>
      </div>
    </section>
  );
}
