import Link from "next/link";
import { InView } from "@/components/ui/InView";
import { Reveal } from "@/components/ui/Reveal";
import { SectionSlug } from "@/components/site/SectionSlug";

/**
 * The four feature clusters of /features/subscription as alternating split
 * sections - text one side, a compact mockup vignette the other, flipping
 * each cluster. Same grammar as the order-editing FeatureClusters. All
 * light cream sections; the page closes with a CtaBand from="paper".
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
    id: "widgets",
    no: "01",
    label: "SUBSCRIBE & SAVE WIDGETS",
    caption: "On the product page, in your branding",
    headline: "The choice, right where they add to cart",
    narrative: (
      <>
        Appfox Subscription puts a subscribe-and-save option on your product pages - your fonts,
        your colors, no theme surgery. Shoppers pick one-time or a recurring plan without leaving
        the page, and the discount you set is right there next to the price. Pick a template,
        match your branding, publish. Setup takes about five minutes, and it works with PageFly
        pages too.
      </>
    ),
    capabilities: [
      <>Customizable subscription widgets and templates that match your storefront</>,
      <>One-time vs. subscribe-and-save toggle right on the product page</>,
      <>Percentage or fixed subscriber discounts, shown inline with the price</>,
      <>Flexible delivery frequencies - weekly, monthly, or anything between</>,
      <>No theme code required; works with PageFly landing pages</>,
    ],
    visual: <WidgetVisual />,
  },
  {
    id: "billing",
    no: "02",
    label: "RECURRING BILLING",
    caption: "On Shopify's native checkout",
    headline: "Renewals that run themselves",
    narrative: (
      <>
        Subscriptions are created and billed through Shopify&apos;s native subscription APIs and
        checkout - the same flow your customers already trust, with no external checkout surface
        to maintain. Auto-renewal charges on the schedule each customer picked, failed payments
        retry automatically, and there are{" "}
        <Link
          href="/vs/recharge"
          className="font-medium text-brand-700 underline decoration-brand-300 underline-offset-[3px] transition-colors hover:decoration-brand-600"
        >
          no transaction fees
        </Link>{" "}
        added on top of your normal Shopify processing.
      </>
    ),
    capabilities: [
      <>Auto-renewal and recurring billing through Shopify Checkout</>,
      <>Automatic retries on failed payments, with dunning</>,
      <>No per-transaction fee on renewals beyond Shopify&apos;s own</>,
      <>Fixed, tiered, trial-period, and custom pricing</>,
      <>Contracts held in Shopify&apos;s native subscription infrastructure - portable, not locked in</>,
    ],
    visual: <BillingVisual />,
  },
  {
    id: "portal",
    no: "03",
    label: "CUSTOMER PORTAL",
    caption: "The tickets that never get written",
    headline: "Subscribers who manage themselves",
    narrative: (
      <>
        The fastest way to lose a subscriber is to make them email you to change anything. Appfox
        gives customers a self-service portal in their account: skip a delivery, pause, swap
        products, change frequency, update their card, or cancel - on their own. Most cancellations
        start as &quot;I just need to skip a month,&quot; and the portal makes skip and pause the
        easy path.
      </>
    ),
    capabilities: [
      <>Skip, pause, or reschedule an upcoming delivery</>,
      <>Swap products or change quantities mid-subscription</>,
      <>Update payment details and shipping address without support</>,
      <>Self-service cancellation - with skip and pause offered first</>,
      <>Reads like your store, not a third-party account page</>,
    ],
    visual: <PortalVisual />,
  },
  {
    id: "models",
    no: "04",
    label: "MODELS & INTEGRATIONS",
    caption: "If it recurs, it fits",
    headline: "Every subscription model, wired to your stack",
    narrative: (
      <>
        Replenishment, curated boxes, memberships, access subscriptions, digital products,
        services, and bundles - physical or digital, if it recurs, Appfox models it. And it plays
        well with the tools you already run: Shopify Checkout and customer accounts, Shopify Flow,
        and integrations with Klaviyo, PageFly, and Loyalty Lion. Migrating from another
        subscription app? Bring your subscribers along.
      </>
    ),
    capabilities: [
      <>Subscription boxes, memberships, replenishment, and access subscriptions</>,
      <>Digital products, services, and product bundles</>,
      <>Klaviyo, PageFly, and Loyalty Lion integrations</>,
      <>Shopify Flow triggers and actions</>,
      <>
        <Link
          href="https://subscriptions-docs.getappfox.com/sidekick"
          className="font-medium text-brand-700 underline decoration-brand-300 underline-offset-[3px] transition-colors hover:decoration-brand-600"
        >
          Shopify Sidekick
        </Link>{" "}
        integration - merchants ask subscription questions in Shopify admin and jump to the right page
      </>,
      <>
        <Link
          href="https://subscriptions-docs.getappfox.com/api/mcp"
          className="font-medium text-brand-700 underline decoration-brand-300 underline-offset-[3px] transition-colors hover:decoration-brand-600"
        >
          MCP server
        </Link>{" "}
        for developers - read subscription data in Cursor, Claude, and VS Code with Appfox API keys
      </>,
      <>
        Assisted migration from apps like{" "}
        <Link
          href="/vs/recharge"
          className="font-medium text-brand-700 underline decoration-brand-300 underline-offset-[3px] transition-colors hover:decoration-brand-600"
        >
          Recharge
        </Link>
        . Payment methods saved in Shopify come across; cards held outside Shopify need customers to add them again.
      </>,
      <>Live chat and email support, included for every store</>,
    ],
    visual: <ModelsVisual />,
  },
];

export function SubscriptionFeatureClusters() {
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

/* ── Cluster 1 - product-page subscribe & save widget ───────────── */

function WidgetVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[22rem]" aria-hidden="true">
      <div className="card rounded-[20px] p-5 shadow-(--shadow-raised)">
        <div className="border-b border-paper-edge pb-3">
          <div className="h-1 w-10 rounded-full bg-brand-600" />
          <div className="mt-2 flex items-baseline justify-between">
            <p className="text-[0.8125rem] font-semibold tracking-[0.08em] text-ink-900">
              OAK &amp; ANCHOR
            </p>
            <p className="till text-[0.6875rem] text-ink-500">Coffee · 12oz</p>
          </div>
        </div>

        {/* one-time - unselected */}
        <div className="mt-3 flex items-center justify-between rounded-lg border border-paper-edge px-3 py-2">
          <span className="flex items-center gap-2.5">
            <span className="h-3.5 w-3.5 rounded-full border-2 border-ink-300" />
            <span className="text-[0.8125rem] font-medium text-ink-700">One-time</span>
          </span>
          <span className="till text-[0.75rem] text-ink-500">$18.00</span>
        </div>

        {/* subscribe & save - selected */}
        <div className="mt-2 rounded-lg border border-brand-200 bg-brand-50 px-3 py-2 ring-2 ring-brand-200/50">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2.5">
              <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-brand-600 bg-brand-600">
                <span className="h-1 w-1 rounded-full bg-paper" />
              </span>
              <span className="text-[0.8125rem] font-semibold text-ink-900">Subscribe &amp; save 10%</span>
            </span>
            <span className="till text-[0.75rem] text-brand-700">$16.20</span>
          </div>
          <div className="till mt-2 flex items-center justify-between rounded-md border border-paper-edge bg-paper-raised px-2.5 py-1.5 text-[0.6875rem] text-ink-900">
            <span className="text-ink-500">Deliver every</span>
            <span>30 days</span>
          </div>
        </div>

        <span className="mt-3.5 flex items-center justify-center rounded-xl bg-brand-600 px-3.5 py-2 text-[0.8125rem] font-semibold leading-none text-paper shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
          Add to cart - $16.20/mo
        </span>
      </div>
      <span className="chip absolute -top-3 left-5 border border-paper-edge bg-paper-raised !text-[0.6875rem] font-medium text-ink-700 shadow-(--shadow-card)">
        Your branding
      </span>
    </div>
  );
}

/* ── Cluster 2 - renewal schedule ledger ────────────────────────── */

function BillingVisual() {
  return (
    <div className="mx-auto w-full max-w-md space-y-4" aria-hidden="true">
      <div className="card rounded-[20px] p-5">
        <div className="flex items-baseline justify-between">
          <p className="till text-[0.6875rem] uppercase tracking-[0.12em] text-ink-500">
            Billing schedule
          </p>
          <span className="chip chip-success !px-2 !py-0.5 !text-[0.625rem] tracking-wide">
            ACTIVE
          </span>
        </div>
        <div className="till mt-2 divide-y divide-paper-edge text-[0.75rem]">
          <RenewalRow date="Jun 04" label="Renewal 2" status="Billed" tone="paid" />
          <RenewalRow date="Jul 04" label="Renewal 3" status="Billed" tone="paid" />
          <RenewalRow date="Aug 03" label="Renewal 4" status="Scheduled" tone="next" />
        </div>
      </div>

      <div className="card-tinted rounded-[20px] p-5 shadow-(--shadow-card)">
        <div className="flex items-center justify-between gap-2">
          <p className="till text-[0.75rem] text-ink-700">
            <span className="text-ink-900">Payment retry</span> · card declined
          </p>
          <span
            className="chip chip-success stamp-in !px-2 !py-0.5 !text-[0.625rem] tracking-wide"
            style={{ "--stamp-delay": "700ms" } as React.CSSProperties}
          >
            RECOVERED
          </span>
        </div>
        <p className="till mt-2.5 border-t border-dashed border-brand-200/60 pt-2.5 text-[0.6875rem] leading-relaxed text-ink-500">
          Attempt 1 failed · retried in 48h · charged on Shopify Checkout
        </p>
      </div>
    </div>
  );
}

function RenewalRow({
  date,
  label,
  status,
  tone,
}: {
  date: string;
  label: string;
  status: string;
  tone: "paid" | "next";
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-ink-700">
        {label} · <span className="text-ink-500">{date}</span>
      </span>
      <span className={tone === "paid" ? "text-success" : "text-brand-700"}>{status}</span>
    </div>
  );
}

/* ── Cluster 3 - customer self-service portal ───────────────────── */

function PortalVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[22rem]" aria-hidden="true">
      <div className="card rounded-[20px] p-5 shadow-(--shadow-raised)">
        <div className="flex items-baseline justify-between border-b border-paper-edge pb-3">
          <p className="text-[0.8125rem] font-semibold tracking-[0.08em] text-ink-900">
            YOUR SUBSCRIPTION
          </p>
          <p className="till text-[0.6875rem] text-ink-500">Coffee · 12oz</p>
        </div>

        <div className="till mt-3 flex items-center justify-between text-[0.75rem] text-ink-700">
          <span>Next delivery</span>
          <span className="text-ink-900">Aug 03</span>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          {["Skip", "Pause", "Swap", "Reschedule"].map((action) => (
            <span
              key={action}
              className="till rounded-lg border border-paper-edge bg-paper-sunken px-2.5 py-2 text-center text-[0.75rem] font-medium text-ink-900"
            >
              {action}
            </span>
          ))}
        </div>

        <div className="ember mt-3 rounded-lg border border-marigold-300/60 bg-paper-raised px-2.5 py-2">
          <p className="till text-[0.6875rem] text-ink-500">
            Thinking of cancelling? <span className="text-marigold-700">Skip a month instead →</span>
          </p>
        </div>
      </div>
      <span className="chip absolute -top-3 left-5 border border-paper-edge bg-paper-raised !text-[0.6875rem] font-medium text-ink-700 shadow-(--shadow-card)">
        No support ticket
      </span>
    </div>
  );
}

/* ── Cluster 4 - models grid + integration chips ────────────────── */

const MODELS = [
  "Subscription boxes",
  "Memberships",
  "Replenishment",
  "Digital products",
  "Services",
  "Bundles",
];

const INTEGRATIONS = ["Klaviyo", "PageFly", "Loyalty Lion", "Shopify Flow"];

function ModelsVisual() {
  return (
    <div className="mx-auto w-full max-w-md space-y-4" aria-hidden="true">
      <div className="card rounded-[20px] p-5">
        <p className="till text-[0.6875rem] uppercase tracking-[0.12em] text-ink-500">
          Subscription models
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {MODELS.map((model) => (
            <span
              key={model}
              className="till rounded-lg border border-paper-edge bg-paper-sunken px-2.5 py-2 text-[0.75rem] font-medium text-ink-900"
            >
              {model}
            </span>
          ))}
        </div>
      </div>

      <div className="card-tinted rounded-[20px] p-5 shadow-(--shadow-card)">
        <p className="till text-[0.6875rem] uppercase tracking-[0.12em] text-brand-700">
          Integrations
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {INTEGRATIONS.map((tool) => (
            <span
              key={tool}
              className="till rounded-full border border-brand-200/70 bg-paper-raised px-3 py-1 text-[0.6875rem] font-medium text-ink-700"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
