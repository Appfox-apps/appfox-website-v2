import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { SectionSlug } from "@/components/site/SectionSlug";

/**
 * NO. 01 - THE HOUSE RULES. What holds across every Appfox app -
 * the reasons to trust the brand, not one product's feature list.
 */

const RULES: { title: string; copy: string }[] = [
  {
    title: "Native Shopify APIs, no hacks",
    copy: "Orders edit in place through Shopify's Order Editing API; subscriptions bill through Shopify Checkout. No cancel-and-reorder tricks, no checkout detours, no lost payment fees.",
  },
  {
    title: "Free to start, honestly",
    copy: "Both apps have free plans that never expire - Order Editing's covers 50 edits a month, Subscription's covers 50 active subscriptions. No card required to install, no per-transaction skim on your revenue.",
  },
  {
    title: "Five-minute setup, no code",
    copy: "Widgets and edit links drop in from the app - your branding, no theme surgery. If you can install a Shopify app, you're done before the coffee cools.",
  },
  {
    title: "Support that answers",
    copy: "One team behind both apps, reachable at the same address on every page. Migrations, edge cases, weird themes - bring them.",
  },
];

export function WhyAppfox() {
  return (
    <section className="bg-paper-sunken py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <Reveal variant="none">
          <SectionSlug no="01" label="THE HOUSE RULES" caption="True of every app we ship" />
        </Reveal>
        <Reveal>
          <h2 className="mt-8 max-w-2xl">Different apps. Same standards.</h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StaggerGroup step={90}>
            {RULES.map((rule, i) => (
              <Reveal key={rule.title} index={i} className="h-full">
                <article className="card flex h-full flex-col p-7 transition-all duration-700 hover:-translate-y-1 hover:shadow-(--shadow-raised)">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-marigold-300">
                    <span
                      className="font-display text-2xl leading-none text-ink-900"
                      style={{ fontWeight: 600 }}
                    >
                      {i + 1}
                    </span>
                  </span>
                  <h3 className="mt-5 text-xl">{rule.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-700">{rule.copy}</p>
                </article>
              </Reveal>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
