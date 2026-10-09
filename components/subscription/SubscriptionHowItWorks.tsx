import { InView } from "@/components/ui/InView";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { SectionSlug } from "@/components/site/SectionSlug";

/**
 * NO. 02 - HOW IT WORKS. Same three-card, dashed-thread grammar as the
 * home page's HowItWorks, retold for subscriptions.
 */

const STEPS: {
  numeral: string;
  title: string;
  copy: React.ReactNode;
  vignette: React.ReactNode;
  caption?: string;
}[] = [
  {
    numeral: "1",
    title: "You set the plan",
    copy: (
      <>
        Pick the products, the delivery frequency, and the subscribe-and-save discount. Drop the
        widget on your product pages - no code, in your branding.
      </>
    ),
    vignette: <PlanVignette />,
  },
  {
    numeral: "2",
    title: "They subscribe at checkout",
    copy: (
      <>
        Shoppers choose one-time or subscribe-and-save right on the product page, then pay through
        Shopify&apos;s native checkout - same trust, same speed, no detours.
      </>
    ),
    vignette: <CheckoutVignette />,
  },
  {
    numeral: "3",
    title: "Renewals run themselves",
    copy: (
      <>
        Auto-renewal bills on schedule, failed payments retry, and customers skip, pause, or swap
        in their own portal - without ever emailing you.
      </>
    ),
    vignette: <RenewalVignette />,
    caption: "billed on schedule · managed by the customer",
  },
];

export function SubscriptionHowItWorks() {
  return (
    <section id="how-it-works" className="bg-paper-sunken py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <Reveal variant="none">
          <SectionSlug no="02" label="HOW IT WORKS" caption="From product page to renewal no. 12" />
        </Reveal>
        <Reveal>
          <h2 className="mt-8 max-w-2xl">Three steps - then it repeats without you</h2>
        </Reveal>

        <InView className="relative mt-12">
          {/* Dashed thread stitching the three cards together (desktop only) */}
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-0 top-8 hidden h-28 w-full md:block"
            aria-hidden="true"
            fill="none"
          >
            <defs>
              <mask id="sub-thread-mask" maskUnits="userSpaceOnUse">
                <path
                  d="M0 74 C 160 30, 300 96, 460 62 C 600 33, 700 90, 840 62 C 980 34, 1090 78, 1200 54"
                  pathLength={400}
                  className="draw-path"
                  stroke="#fff"
                  strokeWidth="10"
                  strokeLinecap="round"
                  style={{ "--draw-delay": "250ms" } as React.CSSProperties}
                />
              </mask>
            </defs>
            <path
              d="M0 74 C 160 30, 300 96, 460 62 C 600 33, 700 90, 840 62 C 980 34, 1090 78, 1200 54"
              pathLength={400}
              stroke="var(--color-brand-300)"
              strokeWidth="2"
              strokeDasharray="2 6"
              strokeLinecap="round"
              mask="url(#sub-thread-mask)"
            />
          </svg>

          <StaggerGroup step={120}>
            <div className="grid gap-6 md:grid-cols-3">
              {STEPS.map((step, i) => (
                <Reveal key={step.numeral} index={i} className="h-full">
                  <article className="card relative flex h-full flex-col p-7">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-marigold-300">
                      <span
                        className="font-display text-[1.375rem] leading-none text-ink-900"
                        style={{ fontWeight: 560 }}
                      >
                        {step.numeral}
                      </span>
                    </span>
                    <h3 className="mt-5 text-[1.375rem]">{step.title}</h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-700">{step.copy}</p>
                    <div className="mt-auto pt-6">
                      {step.vignette}
                      {step.caption ? (
                        <p className="till mt-3 text-[0.75rem] tracking-wide text-ink-500">
                          {step.caption}
                        </p>
                      ) : null}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </StaggerGroup>
        </InView>
      </div>
    </section>
  );
}

/* ── Step 1 - mini plan builder ─────────────────────────────────── */

function PlanVignette() {
  return (
    <div className="shot p-4" aria-hidden="true">
      <p className="text-[0.6875rem] font-medium text-ink-500">Subscription plan</p>
      <div className="till mt-1.5 flex items-center justify-between rounded-lg border border-paper-edge bg-paper-raised px-2.5 py-1.5 text-[0.75rem] text-ink-900">
        <span>Deliver every</span>
        <span className="text-brand-700">30 days</span>
      </div>
      <div className="till mt-1.5 flex items-center justify-between rounded-lg border border-paper-edge bg-paper-raised px-2.5 py-1.5 text-[0.75rem] text-ink-900">
        <span>Subscriber discount</span>
        <span className="text-brand-700">10%</span>
      </div>
    </div>
  );
}

/* ── Step 2 - mini checkout line ────────────────────────────────── */

function CheckoutVignette() {
  return (
    <div className="shot p-4" aria-hidden="true">
      <div className="flex items-baseline justify-between border-b border-paper-edge pb-2.5">
        <p className="text-[0.75rem] font-semibold tracking-wide text-ink-900">Checkout</p>
        <p className="till text-[0.6875rem] text-ink-500">shopify</p>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <p className="till text-[0.6875rem] text-ink-700">Coffee, 12oz · every 30d</p>
        <p className="till text-[0.6875rem] text-ink-900">$16.20</p>
      </div>
      <div className="mt-1.5 flex items-center justify-between">
        <p className="till text-[0.6875rem] text-ink-500">Subscribe &amp; save</p>
        <p className="till text-[0.6875rem] text-success">-10%</p>
      </div>
      <span className="shot-btn mt-3">
        Pay now
      </span>
    </div>
  );
}

/* ── Step 3 - mini renewal ledger, one row stamping ─────────────── */

function RenewalVignette() {
  return (
    <div className="shot p-4" aria-hidden="true">
      <div className="flex items-center justify-between gap-2 border-b border-paper-edge pb-2.5">
        <p className="till text-[0.6875rem] text-ink-500">
          <span className="text-ink-700">Renewal 3 of ∞</span> · Jul 04
        </p>
        <span
          className="chip chip-success stamp-in !px-2 !py-0.5 !text-[0.625rem] tracking-wide"
          style={{ "--stamp-delay": "1100ms" } as React.CSSProperties}
        >
          BILLED
        </span>
      </div>
      <div className="flex items-center justify-between gap-2 pt-2.5">
        <p className="till text-[0.6875rem] text-ink-500">
          <span className="text-ink-700">Next box</span> · Aug 03
        </p>
        <span className="chip chip-warn !px-2 !py-0.5 !text-[0.625rem] tracking-wide">
          SKIPPED BY CUSTOMER
        </span>
      </div>
    </div>
  );
}
