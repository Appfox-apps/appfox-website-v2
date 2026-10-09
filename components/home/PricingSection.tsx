import Link from "next/link";
import { SectionSlug } from "@/components/site/SectionSlug";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

/**
 * §5.11 Pricing - light, sunken band · `NO. 09 - PRICING`.
 * Seam: light sections sit above (Integrations §5.10) and below (Further
 * Reading §5.12) - no perforation needed, the sunken band reads as a
 * recessed ledger panel. Monthly only - there is no annual toggle.
 *
 * Hand-drawn SVG ticks draw on via `.draw-path`, triggered by each card's
 * own <Reveal> gaining `.is-visible` (same mechanism as InView, but ticks
 * never draw before their card is revealed).
 */

type Plan = {
  name: string;
  price: string;
  cta: string;
  features: string[];
  featured?: boolean;
};

const PLANS: Plan[] = [
  {
    name: site.pricing.free.name,
    price: `$${site.pricing.free.price}`,
    cta: "Install free",
    features: [
      "50 edits per month",
      "Address & quantity edits",
      "2 active upsell offers",
      "Editing on thank-you & order status pages",
      "Email support",
    ],
  },
  {
    name: site.pricing.growth.name,
    price: `$${site.pricing.growth.price}`,
    cta: "Start free trial",
    featured: true,
    features: [
      "Unlimited edits",
      "All edit types",
      "Unlimited upsell offers",
      "AI-powered upsell recommendations",
      "Analytics dashboard",
      "Priority support",
    ],
  },
  {
    name: site.pricing.pro.name,
    price: `$${site.pricing.pro.price}`,
    cta: "Start free trial",
    features: [
      "Everything in Growth",
      "Custom branding & white-label",
      "Full API access",
      "Advanced analytics & exports",
      "Dedicated account manager",
      "SLA support",
    ],
  },
];

/* Hand-drawn tick - draws on when the card reveals */
function Tick({ delay }: { delay: number }) {
  return (
    <svg viewBox="0 0 24 24" className="mt-1 h-4 w-4 shrink-0" fill="none" aria-hidden="true">
      <path
        className="draw-path"
        pathLength={400}
        d="M3.5 13.2 9 18.4 20.5 5.8"
        stroke="var(--color-success)"
        strokeWidth={2.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ "--draw-delay": `${delay}ms` } as React.CSSProperties}
      />
    </svg>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  const cardClass = plan.featured
    ? "relative flex h-full flex-col rounded-2xl border border-brand-200 bg-paper-raised p-6 shadow-(--shadow-pop) transition-transform duration-200 hover:-translate-y-1 sm:p-8 lg:scale-[1.03]"
    : "card lift flex h-full flex-col p-6 sm:p-8";

  return (
    <article className={cardClass}>
      {plan.featured ? (
        <span className="sticker absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
          MOST POPULAR
        </span>
      ) : null}

      <p className="till text-[0.8125rem] uppercase tracking-[0.12em] text-ink-500">{plan.name}</p>
      <p className="mt-3 flex items-baseline gap-1.5">
        <span className="font-display font-[560] text-5xl tracking-tight text-ink-900">
          {plan.price}
        </span>
        <span className="till text-sm text-ink-500">/mo</span>
      </p>

      <ul className="mt-6 space-y-3 border-t border-paper-edge pt-6">
        {plan.features.map((feature, i) => (
          <li key={feature} className="flex items-start gap-2.5 text-[0.9375rem] text-ink-700">
            <Tick delay={250 + i * 40} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <a
        href={site.installUrl}
        className={`${plan.featured ? "btn-primary" : "btn-secondary"} mt-8 w-full`}
      >
        {plan.cta}
      </a>
    </article>
  );
}

export function PricingSection() {
  return (
    <section id="pricing" className="bg-paper-sunken">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-28 lg:px-10">
        <Reveal variant="none">
          <SectionSlug no="09" label="PRICING" caption="Pricing you can read in one breath" />
        </Reveal>
        <Reveal>
          <h2 className="mt-8 max-w-2xl">Pricing that starts at free.</h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-500">
            Free to start. <span className="till">$19/month</span> for unlimited edits. No per-edit
            fees, no upsell revenue caps, no “contact sales.” Paid plans come with a 14-day free
            trial - no card required.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:gap-7">
          <StaggerGroup step={120}>
            {PLANS.map((plan, i) => (
              <Reveal key={plan.name} index={i} className="h-full">
                <PlanCard plan={plan} />
              </Reveal>
            ))}
          </StaggerGroup>
        </div>

        <Reveal delay={150}>
          <div className="mt-12 flex flex-col items-center gap-3 text-center">
            <p className="till text-[0.8125rem] text-ink-500">
              14-day free trial on paid plans · no card required · cancel anytime
            </p>
            <Link
              href="/pricing/order-editing"
              className="till text-[0.8125rem] font-semibold text-brand-600 transition-colors hover:text-brand-700"
            >
              Compare plans →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default PricingSection;
