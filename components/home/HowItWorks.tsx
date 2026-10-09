import { InView } from "@/components/ui/InView";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { SectionSlug } from "@/components/site/SectionSlug";

/**
 * NO. 03 - HOW IT WORKS (§5.5). Light cream section; sits between light
 * sections, so no perforation needed here. Three white cards joined by a
 * dashed thread that draws on with scroll (mask-revealed so the stitching
 * stays dashed while it draws).
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
    title: "Customer opens their order",
    copy: (
      <>
        Right on your thank-you and order status pages - the ones Shopify already links from every
        confirmation email. No login, no new app. Just their order, in your branding.
      </>
    ),
    vignette: <EmailVignette />,
  },
  {
    numeral: "2",
    title: "They fix it themselves",
    copy: (
      <>
        Address, size, quantity, items, cancellation - but only what your rules allow. Anything
        past your window or cutoff never shows up. A one-click upsell rides along on the way out.
      </>
    ),
    vignette: <PortalVignette />,
  },
  {
    numeral: "3",
    title: "It settles itself",
    copy: (
      <>
        Safe edits auto-apply. Sensitive ones wait for your approval, per edit type. Price
        differences settle automatically, every change logged.
      </>
    ),
    vignette: <QueueVignette />,
    caption: "auto-apply safe edits · queue the sensitive ones",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <Reveal variant="none">
          <SectionSlug no="03" label="HOW IT WORKS" caption="From confirmation email to settled edit" />
        </Reveal>
        <Reveal>
          <h2 className="mt-8 max-w-2xl">Three steps, none of them yours</h2>
        </Reveal>

        <InView className="relative mt-12">
          {/* Dashed thread stitching the three cards together (desktop only).
              The dashed stroke is revealed by a solid .draw-path mask so it
              draws on without losing its 2/6 stitch pattern. */}
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-0 top-8 hidden h-28 w-full md:block"
            aria-hidden="true"
            fill="none"
          >
            <defs>
              <mask id="hiw-thread-mask" maskUnits="userSpaceOnUse">
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
              mask="url(#hiw-thread-mask)"
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

/* ── Step 1 - mini confirmation-email mockup ────────────────────── */

function EmailVignette() {
  return (
    <div className="shot rounded-2xl border border-paper-edge bg-paper p-4" aria-hidden="true">
      <div className="border-b border-paper-edge pb-2.5">
        <p className="text-[0.75rem] font-semibold tracking-wide text-ink-900">OAK &amp; ANCHOR</p>
        <p className="till mt-0.5 text-[0.6875rem] text-ink-500">
          Order <span className="text-ink-700">#1042</span> is confirmed
        </p>
      </div>
      <div className="mt-3 space-y-1.5">
        <div className="h-1.5 w-full rounded-full bg-paper-edge" />
        <div className="h-1.5 w-3/4 rounded-full bg-paper-edge" />
      </div>
      <span className="shot-cta mt-3.5 inline-flex rounded-xl bg-brand-600 px-3.5 py-2 text-[0.75rem] font-semibold leading-none text-paper shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
        Edit your order
      </span>
    </div>
  );
}

/* ── Step 2 - mini order status page, address autocomplete open ── */

function PortalVignette() {
  return (
    <div className="shot rounded-2xl border border-paper-edge bg-paper p-4" aria-hidden="true">
      <div className="flex items-baseline justify-between border-b border-paper-edge pb-2.5">
        <p className="text-[0.75rem] font-semibold tracking-wide text-ink-900">OAK &amp; ANCHOR</p>
        <p className="till text-[0.6875rem] text-ink-500">#1042</p>
      </div>
      <p className="mt-3 text-[0.6875rem] font-medium text-ink-500">Shipping address</p>
      <div className="shot-field till mt-1.5 flex items-center rounded-lg border border-brand-200 bg-paper-raised px-2.5 py-1.5 text-[0.75rem] text-ink-900 ring-2 ring-brand-200/50">
        123 M<span className="text-brand-600">|</span>
      </div>
      <div className="shot-field mt-1.5 overflow-hidden rounded-lg border border-paper-edge bg-paper-raised shadow-(--shadow-card)">
        <p className="till bg-brand-50 px-2.5 py-1.5 text-[0.75rem] text-brand-700">
          123 Main St, Portland
        </p>
        <p className="till px-2.5 py-1.5 text-[0.75rem] text-ink-500">123 Maine Ave, Salem</p>
      </div>
    </div>
  );
}

/* ── Step 3 - mini approval queue, one row auto-stamping ────────── */

function QueueVignette() {
  return (
    <div className="shot rounded-2xl border border-paper-edge bg-paper p-4" aria-hidden="true">
      <div className="flex items-center justify-between gap-2 border-b border-paper-edge pb-2.5">
        <p className="till text-[0.6875rem] text-ink-500">
          <span className="text-ink-700">#1042</span> · Address change
        </p>
        <span
          className="chip chip-success stamp-in !px-2 !py-0.5 !text-[0.625rem] tracking-wide"
          style={{ "--stamp-delay": "1100ms" } as React.CSSProperties}
        >
          AUTO-APPLIED
        </span>
      </div>
      <div className="flex items-center justify-between gap-2 pt-2.5">
        <p className="till text-[0.6875rem] text-ink-500">
          <span className="text-ink-700">#1041</span> · Cancellation
        </p>
        <span className="chip chip-warn !px-2 !py-0.5 !text-[0.625rem] tracking-wide">
          NEEDS REVIEW
        </span>
      </div>
    </div>
  );
}
