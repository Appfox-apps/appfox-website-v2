import Link from "next/link";
import { DigitRoll } from "@/components/ui/DigitRoll";
import { InView } from "@/components/ui/InView";
import { Reveal } from "@/components/ui/Reveal";
import { SectionSlug } from "@/components/site/SectionSlug";

/**
 * The four feature clusters of /features (COPY.md §2) as alternating
 * split sections - text one side, a compact mockup vignette the other,
 * flipping each cluster. All light cream sections (no perforations
 * needed between them); the page closes with a CtaBand from="paper".
 * Capability checklists use hand-drawn .draw-path ticks inside InView.
 */

type Cluster = {
  id: string;
  no: string;
  label: string;
  caption: string;
  headline: React.ReactNode;
  narrative: React.ReactNode;
  capabilities: React.ReactNode[];
  visual: React.ReactNode;
};

const CLUSTERS: Cluster[] = [
  {
    id: "self-service",
    no: "01",
    label: "SELF-SERVICE EDITING",
    caption: "On the pages customers already land on",
    headline: "Editing where your customers already are",
    narrative: (
      <>
        Appfox lives on your thank-you page and order status page - the page Shopify already links
        from every order confirmation email. There&apos;s no separate app to find, no login, no
        account creation, no support thread: the customer is looking at their order, and the edit
        controls are right there. Because both pages are part of your store&apos;s checkout, the
        whole experience is in your branding by default. Customers see only the edits they&apos;re
        allowed to make, and finish in a couple of taps.
      </>
    ),
    capabilities: [
      <>
        Editing on the thank-you page and order status page - no new link, no login, nothing to
        install for customers
      </>,
      <>
        Shipping address changes with validation and autocomplete, so bad addresses get caught
        before they ship
      </>,
      <>Variant swaps for size and color, quantity updates, and adding or removing items</>,
      <>Self-service order cancellation within your edit window</>,
      <>Part of your store&apos;s checkout, so it&apos;s mobile-first and in your branding</>,
      <>
        One-click post-purchase upsells inside the edit flow - added to the existing order, no
        second checkout
      </>,
    ],
    visual: <PortalVisual />,
  },
  {
    id: "controls",
    no: "02",
    label: "CONTROLS & APPROVALS",
    caption: "Eligibility decided before customers see a thing",
    headline: "Self-service for them, control for you",
    narrative: (
      <>
        The fear with customer editing is the order your warehouse already picked. Appfox&apos;s
        eligibility engine evaluates every order against your edit windows (say, 24 hours),
        fulfillment cutoffs, and per-action rules - and edits that don&apos;t qualify are never
        shown, so customers can&apos;t request what you can&apos;t grant. For everything else, you
        decide per edit type whether it applies instantly or waits for a human.
      </>
    ),
    capabilities: [
      <>Edit windows, fulfillment cutoffs, and per-action eligibility rules</>,
      <>Ineligible edits hidden from customers entirely - no requests to decline</>,
      <>Auto-apply for safe edits, approval queue for sensitive ones, configured per edit type</>,
      <>Full audit timeline on every order - who changed what, when</>,
      <>Slack alerts for pending approvals and SLA breaches</>,
      <>Shopify Flow triggers and actions to wire edits into the rest of your operation</>,
    ],
    visual: <RulesVisual />,
  },
  {
    id: "payments",
    no: "03",
    label: "PAYMENTS & ACCURACY",
    caption: "In place, on the original payment",
    headline: "Edits that don’t break your books",
    narrative: (
      <>
        Appfox edits orders in place through Shopify&apos;s native Order Editing API - it never
        cancels and reorders. That means the original order number, payment, and history stay
        intact, customers never sit through a second checkout, and you never forfeit the Shopify
        Payments fees of 1.5–2.9% that{" "}
        <Link
          href="/vs/orderify"
          className="font-medium text-brand-700 underline decoration-brand-300 underline-offset-[3px] transition-colors hover:decoration-brand-600"
        >
          cancel-and-reorder tools
        </Link>{" "}
        quietly burn on every edit. Price differences settle themselves in both directions.
      </>
    ),
    capabilities: [
      <>In-place editing via Shopify&apos;s native Order Editing API - never cancel-and-reorder</>,
      <>Shopify Payments fees preserved on every edit</>,
      <>Automatic payment requests when an edit raises the total</>,
      <>Automatic partial refunds when an edit lowers it</>,
      <>Address validation and autocomplete to prevent failed deliveries</>,
      <>Branded transactional emails confirming every change</>,
    ],
    visual: <ReceiptVisual />,
  },
  {
    id: "insights",
    no: "04",
    label: "REVENUE & INSIGHTS",
    caption: "The most engaged shopper you have",
    headline: "The edit flow that earns its keep",
    narrative: (
      <>
        A customer reviewing their order is the most engaged shopper you have - payment on file,
        intent proven minutes ago. Appfox places your upsell offers inside that moment and adds
        accepted offers to the existing order with one click. Then the analytics dashboard shows
        you exactly what the whole loop is doing: what customers fix, what they buy, and how fast
        your team clears the queue.
      </>
    ),
    capabilities: [
      <>Post-purchase upsells shown inside the edit flow</>,
      <>One-click add to the existing order - no second checkout, no new order number</>,
      <>
        AI-powered upsell recommendations (
        <Link
          href="/pricing/order-editing"
          className="font-medium text-brand-700 underline decoration-brand-300 underline-offset-[3px] transition-colors hover:decoration-brand-600"
        >
          Growth plan and up
        </Link>
        )
      </>,
      <>Dashboard tracking edit volume, approval rates, upsell revenue, and time-to-approve</>,
      <>Advanced analytics and exports on the Pro plan</>,
      <>Gorgias sidebar so support sees edit status without leaving the ticket</>,
    ],
    visual: <AnalyticsVisual />,
  },
];

export function FeatureClusters() {
  return (
    <>
      {CLUSTERS.map((cluster, i) => {
        const flip = i % 2 === 1;
        return (
          <section key={cluster.id} id={cluster.id} className="py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
              <Reveal variant="none">
                <SectionSlug no={cluster.no} label={cluster.label} caption={cluster.caption} />
              </Reveal>

              <div className="mt-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                <div className={flip ? "lg:order-2" : ""}>
                  <Reveal>
                    <h2 className="max-w-xl">{cluster.headline}</h2>
                  </Reveal>
                  <Reveal delay={80}>
                    <p className="mt-5 max-w-[60ch] leading-relaxed text-ink-700">
                      {cluster.narrative}
                    </p>
                  </Reveal>
                  <Reveal delay={160}>
                    <InView threshold={0.3}>
                      <ul className="mt-8 space-y-3">
                        {cluster.capabilities.map((capability, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <Tick delay={150 + j * 90} />
                            <span className="text-[0.9375rem] leading-relaxed text-ink-700">
                              {capability}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </InView>
                  </Reveal>
                </div>

                <Reveal variant={flip ? "right" : "left"} delay={120} className={flip ? "lg:order-1" : ""}>
                  {cluster.visual}
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}

/* ── Hand-drawn checklist tick (draws on when the list scrolls in) ── */

function Tick({ delay }: { delay: number }) {
  return (
    <svg viewBox="0 0 24 24" className="mt-1 h-4 w-4 shrink-0" fill="none" aria-hidden="true">
      <path
        d="M4 12.5l5 5 11-11"
        pathLength={400}
        className="draw-path"
        stroke="var(--color-success)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ "--draw-delay": `${delay}ms` } as React.CSSProperties}
      />
    </svg>
  );
}

/* ── Cluster 1 - order status page frame (echo of the hero mockup) ── */

function PortalVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[22rem]" aria-hidden="true">
      <div className="card rounded-[20px] p-5 shadow-(--shadow-raised)">
        {/* fake status bar */}
        <div className="till flex items-center justify-between text-[0.625rem] text-ink-300">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <span className="h-1 w-1 rounded-full bg-ink-300" />
            <span className="h-1 w-1 rounded-full bg-ink-300" />
            <span className="h-1 w-1 rounded-full bg-ink-300" />
          </span>
        </div>
        {/* store header */}
        <div className="mt-3 border-b border-paper-edge pb-3">
          <div className="h-1 w-10 rounded-full bg-brand-600" />
          <div className="mt-2 flex items-baseline justify-between">
            <p className="text-[0.8125rem] font-semibold tracking-[0.08em] text-ink-900">
              OAK &amp; ANCHOR
            </p>
            <p className="till text-[0.6875rem] text-ink-500">#1042</p>
          </div>
        </div>
        {/* line items */}
        <div className="till mt-3 space-y-1.5 text-[0.75rem] text-ink-700">
          <div className="flex items-center justify-between">
            <span>Tee - Olive / L</span>
            <span>$38.00</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Canvas Tote</span>
            <span>$48.00</span>
          </div>
        </div>
        {/* validated address */}
        <p className="mt-3.5 text-[0.6875rem] font-medium text-ink-500">Shipping address</p>
        <div className="till mt-1.5 flex items-center justify-between gap-2 rounded-lg border border-paper-edge bg-paper-sunken px-2.5 py-1.5 text-[0.75rem] text-ink-900">
          <span>123 Main St, Portland</span>
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" fill="none">
            <path
              d="M4 12.5l5 5 11-11"
              pathLength={400}
              className="draw-path"
              stroke="var(--color-success)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ "--draw-delay": "550ms" } as React.CSSProperties}
            />
          </svg>
        </div>
        {/* in-flow upsell */}
        <div className="ember mt-3.5 rounded-lg border border-marigold-300/60 bg-paper-raised px-2.5 py-2">
          <div className="till flex items-center justify-between text-[0.75rem]">
            <span className="text-ink-900">Matching Beanie</span>
            <span className="text-marigold-700">+$24.00</span>
          </div>
          <p className="mt-1 text-[0.6875rem] text-ink-500">One tap - added to this order</p>
        </div>
        {/* save */}
        <span className="mt-4 flex items-center justify-center rounded-xl bg-brand-600 px-3.5 py-2 text-[0.8125rem] font-semibold leading-none text-paper shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
          Save changes
        </span>
      </div>
      <span className="chip absolute -top-3 left-5 border border-paper-edge bg-paper-raised !text-[0.6875rem] font-medium text-ink-700 shadow-(--shadow-card)">
        No login required
      </span>
    </div>
  );
}

/* ── Cluster 2 - eligibility rules panel + approval queue ───────── */

function RulesVisual() {
  return (
    <div className="mx-auto w-full max-w-md space-y-4" aria-hidden="true">
      <div className="card rounded-[20px] p-5">
        <p className="till text-[0.6875rem] uppercase tracking-[0.12em] text-ink-500">
          Eligibility rules
        </p>
        <div className="mt-1.5">
          <RuleRow label="Address changes" value="Auto-apply" on />
          <RuleRow label="Variant swaps" value="Auto-apply" on />
          <RuleRow label="Cancellations" value="Require approval" on={false} />
          <div className="flex items-center justify-between gap-3 py-2.5">
            <span className="text-[0.8125rem] font-medium text-ink-900">Edit window</span>
            <span className="till rounded-lg border border-paper-edge bg-paper-sunken px-2 py-0.5 text-[0.6875rem] text-ink-700">
              24h
            </span>
          </div>
        </div>
      </div>

      <div className="card-tinted rounded-[20px] p-5 shadow-(--shadow-card)">
        <p className="till text-[0.6875rem] uppercase tracking-[0.12em] text-brand-700">
          Approval queue
        </p>
        <div className="mt-2.5 flex items-center justify-between gap-2 border-b border-brand-200/60 pb-2.5">
          <p className="till text-[0.75rem] text-ink-500">
            <span className="text-ink-700">#1042</span> · Address change
          </p>
          <span
            className="chip chip-success stamp-in !px-2 !py-0.5 !text-[0.625rem] tracking-wide"
            style={{ "--stamp-delay": "700ms" } as React.CSSProperties}
          >
            AUTO-APPLIED
          </span>
        </div>
        <div className="flex items-center justify-between gap-2 pt-2.5">
          <p className="till text-[0.75rem] text-ink-500">
            <span className="text-ink-700">#1041</span> · Cancellation
          </p>
          <span className="chip chip-warn !px-2 !py-0.5 !text-[0.625rem] tracking-wide">
            NEEDS REVIEW
          </span>
        </div>
        <p className="till mt-3 border-t border-dashed border-brand-200/60 pt-2.5 text-[0.6875rem] leading-relaxed text-ink-500">
          14:02 Edit requested · 14:02 Rule check passed · 14:02 Auto-approved
        </p>
      </div>
    </div>
  );
}

function RuleRow({ label, value, on }: { label: string; value: string; on: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-paper-edge py-2.5">
      <span className="text-[0.8125rem] font-medium text-ink-900">{label}</span>
      <span className="flex items-center gap-2">
        <span className="till text-[0.6875rem] text-ink-500">{value}</span>
        <span
          className={`relative inline-block h-[18px] w-8 rounded-full ${on ? "bg-success" : "bg-ink-300"}`}
        >
          <span
            className={`absolute top-[2px] h-3.5 w-3.5 rounded-full bg-paper-raised ${
              on ? "right-[2px]" : "left-[2px]"
            }`}
          />
        </span>
      </span>
    </div>
  );
}

/* ── Cluster 3 - receipt with delta math (perforated edges) ─────── */

const RECEIPT_EDGE_TOP =
  "radial-gradient(circle at 11px 0, transparent 6.5px, var(--color-paper-raised) 7px)";
const RECEIPT_EDGE_BOTTOM =
  "radial-gradient(circle at 11px 12px, transparent 6.5px, var(--color-paper-raised) 7px)";

function ReceiptVisual() {
  return (
    <div
      className="mx-auto w-full max-w-[21rem]"
      aria-hidden="true"
      style={{
        filter:
          "drop-shadow(0 2px 4px rgba(36,27,56,0.07)) drop-shadow(0 12px 32px rgba(98,64,200,0.16))",
      }}
    >
      <div
        className="h-3"
        style={{
          backgroundImage: RECEIPT_EDGE_TOP,
          backgroundSize: "22px 12px",
          backgroundRepeat: "repeat-x",
        }}
      />
      <div className="bg-paper-raised px-5 py-4">
        <p className="text-center text-[0.8125rem] font-semibold tracking-[0.14em] text-ink-900">
          OAK &amp; ANCHOR
        </p>
        <p className="till mt-1 text-center text-[0.6875rem] text-ink-500">
          ORDER #1042 · EDITED IN PLACE
        </p>

        <div className="till mt-3 space-y-1.5 border-t border-dashed border-paper-edge pt-3 text-[0.75rem] text-ink-700">
          <div className="flex justify-between">
            <span>Tee - Olive / L</span>
            <span>$38.00</span>
          </div>
          <div className="flex justify-between">
            <span>Canvas Tote</span>
            <span>$48.00</span>
          </div>
          <div
            className="print-out flex justify-between text-brand-700"
            style={{ "--i": 0, "--print-delay": "400ms" } as React.CSSProperties}
          >
            <span>+ Wool Beanie</span>
            <span>+$24.00</span>
          </div>
        </div>

        <div className="till mt-3 space-y-1.5 border-t border-dashed border-paper-edge pt-3 text-[0.75rem]">
          <div
            className="print-out flex justify-between text-ink-500"
            style={{ "--i": 1, "--print-delay": "400ms" } as React.CSSProperties}
          >
            <span>Previously charged</span>
            <span>$86.00</span>
          </div>
          <div
            className="print-out flex justify-between text-marigold-700"
            style={{ "--i": 2, "--print-delay": "400ms" } as React.CSSProperties}
          >
            <span>Payment request</span>
            <span>+$24.00</span>
          </div>
          <div
            className="print-out flex justify-between text-ink-900"
            style={{ "--i": 3, "--print-delay": "400ms" } as React.CSSProperties}
          >
            <span>New total</span>
            <span>$110.00</span>
          </div>
        </div>

        <div className="till mt-3 border-t border-dashed border-paper-edge pt-3 text-center text-[0.6875rem] leading-relaxed text-ink-500">
          <p>Same order number · fees preserved</p>
          <p className="mt-0.5">No second checkout</p>
        </div>
      </div>
      <div
        className="h-3"
        style={{
          backgroundImage: RECEIPT_EDGE_BOTTOM,
          backgroundSize: "22px 12px",
          backgroundRepeat: "repeat-x",
        }}
      />
    </div>
  );
}

/* ── Cluster 4 - analytics mini-dashboard in a browser frame ────── */

const BARS = [34, 48, 28, 56, 44, 68, 52, 78, 62, 88, 72, 96];

const KPIS = [
  { label: "edit volume", value: "312" },
  { label: "approval rate", value: "94%" },
  { label: "upsell revenue", value: "$1,284" },
  { label: "time-to-approve", value: "38m" },
];

function AnalyticsVisual() {
  return (
    <div className="mx-auto w-full max-w-md" aria-hidden="true">
      <div className="card overflow-hidden rounded-[20px]">
        {/* fake browser bar */}
        <div className="flex items-center gap-2 border-b border-paper-edge bg-paper-sunken px-4 py-2.5">
          <span className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-ink-300/60" />
            <span className="h-2 w-2 rounded-full bg-ink-300/60" />
            <span className="h-2 w-2 rounded-full bg-ink-300/60" />
          </span>
          <span className="till mx-auto rounded-md bg-paper-raised px-3 py-0.5 text-[0.625rem] text-ink-500">
            appfox · analytics
          </span>
        </div>

        <div className="p-5">
          <div className="flex items-baseline justify-between">
            <p className="till text-[0.6875rem] uppercase tracking-[0.12em] text-ink-500">
              Edit volume · 30 days
            </p>
            <p className="till text-[0.6875rem] text-success">+12%</p>
          </div>
          <div className="mt-3 flex h-24 items-end gap-1.5">
            {BARS.map((height, i) => (
              <div
                key={i}
                className={`bar-grow w-full rounded-t-[3px] ${
                  i === 9 ? "bg-marigold-500" : "bg-brand-300"
                }`}
                style={{ height: `${height}%`, "--i": i } as React.CSSProperties}
              />
            ))}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2.5">
            {KPIS.map((kpi) => (
              <div key={kpi.label} className="rounded-lg border border-paper-edge bg-paper px-3 py-2.5">
                <DigitRoll value={kpi.value} className="text-[1rem] text-ink-900" />
                <p className="till mt-0.5 text-[0.625rem] uppercase tracking-[0.12em] text-ink-500">
                  {kpi.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
