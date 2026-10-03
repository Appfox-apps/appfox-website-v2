import Link from "next/link";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { SectionSlug } from "@/components/site/SectionSlug";

/**
 * NO. 01 - WHAT YOU GET. Light section, six white cards on the
 * same grid grammar as the home page's feature clusters.
 */

const FEATURES: { title: string; copy: string; caption: string; href?: string }[] = [
  {
    title: "Widgets that match your store",
    copy: "Customizable subscription widgets and templates sit right on your product pages - your fonts, your colors, no theme surgery. Shoppers pick one-time or subscribe-and-save without leaving the page.",
    caption: "widget · templates · your branding",
  },
  {
    title: "Recurring billing that runs itself",
    copy: "Auto-renewal charges through Shopify's native checkout on the schedule each customer picked - weekly, monthly, or anything between. Failed payments retry automatically.",
    caption: "auto-renewal · native checkout",
  },
  {
    title: "A portal that answers the tickets",
    copy: "Customers skip a delivery, pause, swap products, update their card, or cancel - themselves, in their account. The \"can I move my next box?\" email never gets written.",
    caption: "skip · pause · swap · cancel",
  },
  {
    title: "Subscribe & save, your way",
    copy: "Percentage or fixed discounts for subscribing, tiered pricing, trial periods, and bundled offerings - the levers that turn a one-time buyer into a twelve-month customer.",
    caption: "discounts · trials · tiers",
  },
  {
    title: "Every subscription model",
    copy: "Replenishment, curated boxes, memberships, digital products, services, and custom plans - physical or digital, if it recurs, it fits.",
    caption: "boxes · memberships · replenishment",
  },
  {
    title: "Plays well with your stack",
    copy: "Works with Shopify Checkout, customer accounts, and Shopify Flow, and integrates with Klaviyo, PageFly, and Loyalty Lion. Merchants ask subscription questions in Shopify Sidekick and jump straight to the right page. Developers can connect Cursor, Claude, or VS Code with MCP and AppFox API keys. Migrating from another subscription app? Bring your subscribers along.",
    caption: "klaviyo · pagefly · sidekick · mcp · shopify flow",
    href: "/subscription/integrations",
  },
];

export function SubscriptionFeatures() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <Reveal variant="none">
          <SectionSlug no="01" label="WHAT YOU GET" caption="Everything a subscription needs" />
        </Reveal>
        <Reveal>
          <h2 className="mt-8 max-w-2xl">Set the plan once. Collect it monthly.</h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-500">
            Recurring revenue shouldn&apos;t mean recurring admin. AppFox Subscription handles the
            widgets, the billing, and the customer questions - you handle the product.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <StaggerGroup step={90}>
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} index={i} className="h-full">
                {f.href ? (
                  <Link
                    href={f.href}
                    className="card lift hover:border-brand-300 transition-all flex h-full flex-col p-7"
                  >
                    <article className="flex h-full flex-col">
                      <h3 className="text-[1.375rem]">{f.title}</h3>
                      <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-700">{f.copy}</p>
                      <p className="till mt-auto pt-5 text-[0.75rem] tracking-wide text-ink-500">
                        {f.caption}
                      </p>
                      <p className="mt-3 text-sm font-medium text-brand-700">
                        View integrations →
                      </p>
                    </article>
                  </Link>
                ) : (
                  <article className="card lift flex h-full flex-col p-7">
                    <h3 className="text-[1.375rem]">{f.title}</h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-700">{f.copy}</p>
                    <p className="till mt-auto pt-5 text-[0.75rem] tracking-wide text-ink-500">
                      {f.caption}
                    </p>
                  </article>
                )}
              </Reveal>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
