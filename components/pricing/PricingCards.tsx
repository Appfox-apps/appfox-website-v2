import { SectionSlug } from "@/components/site/SectionSlug";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { site } from "@/lib/site";
import { Tick } from "./Tick";

/**
 * Pricing-page plan cards - same three plans and treatment as home §5.11
 * (Growth center, raised `--shadow-pop`, brand-200 border, marigold
 * MOST POPULAR sticker), plus the per-plan one-liners from the pricing-page
 * copy under each plan name. Light, sunken band; light sections sit above
 * (hero) and below (plan table) - no perforation needed.
 * Monthly only - there is no annual toggle.
 */

type Plan = {
  name: string;
  price: string;
  /** per-plan one-liner from COPY §3 - verbatim */
  blurb: string;
  cta: string;
  features: string[];
  featured?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Free",
    price: `$${site.pricing.free.price}`,
    blurb:
      "For stores testing the water: 50 edits a month, address and quantity edits, 2 active upsell offers, editing on your thank-you and order status pages, and email support.",
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
    name: "Growth",
    price: `$${site.pricing.growth.price}`,
    blurb:
      "Unlimited edits, every edit type, unlimited upsells with AI-powered recommendations, the analytics dashboard, and priority support - the whole product, one flat price.",
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
    name: "Pro",
    price: `$${site.pricing.pro.price}`,
    blurb:
      "Everything in Growth plus white-label branding, full API access, advanced analytics and exports, a dedicated account manager, and SLA-backed support.",
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
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-700">{plan.blurb}</p>

      <p className="mt-5 flex items-baseline gap-1.5">
        <span className="font-display font-[560] text-5xl tracking-tight text-ink-900">
          {plan.price}
        </span>
        <span className="till text-sm text-ink-500">/mo</span>
      </p>

      <ul className="mt-6 flex-1 space-y-3 border-t border-paper-edge pt-6">
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

export function PricingCards() {
  return (
    <section id="plans" className="bg-paper-sunken">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-28 lg:px-10">
        <Reveal variant="none">
          <SectionSlug no="02" label="THE PLANS" caption="Monthly only - no annual toggle, no meters" />
        </Reveal>
        <h2 className="sr-only">The plans</h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:gap-7">
          <StaggerGroup step={120}>
            {PLANS.map((plan, i) => (
              <Reveal key={plan.name} index={i} className="h-full">
                <PlanCard plan={plan} />
              </Reveal>
            ))}
          </StaggerGroup>
        </div>

        <Reveal delay={150}>
          <p className="till mt-12 text-center text-[0.8125rem] text-ink-500">
            14-day free trial on paid plans · No card required · Works on all Shopify plans
          </p>
        </Reveal>
      </div>
    </section>
  );
}
