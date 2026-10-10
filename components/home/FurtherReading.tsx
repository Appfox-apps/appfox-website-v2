import Link from "next/link";
import { SectionSlug } from "@/components/site/SectionSlug";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { competitorsForApp } from "@/data/competitors";

const orderEditingComps = competitorsForApp("order-editing");

/**
 * §5.12 Further Reading - light · `NO. 10 - COMPARED`.
 * Seam: sits below the sunken Pricing band (§5.11) and above the light FAQ
 * (§5.13) - light↔light on both sides, so no perforation needed.
 *
 * A dotted-leader index (grafted from The Ledger) funneling home-page link
 * equity into all seven /vs/[slug] comparison pages, plus the /vs hub.
 */

function IndexRow({
  href,
  numeral,
  title,
  action,
}: {
  href: string;
  numeral: string;
  title: string;
  action: string;
}) {
  return (
    <Link href={href} className="group flex items-baseline gap-3 py-4 sm:gap-5 sm:py-5">
      <span
        className="till text-[0.8125rem] text-ink-500 transition-colors duration-200 group-hover:text-marigold-700"
        aria-hidden="true"
      >
        {numeral}
      </span>
      <span className="text-base font-semibold text-ink-900 transition-colors duration-200 group-hover:text-brand-700 sm:text-lg">
        {title}
      </span>
      {/* Dotted leader stretching to the action - sits on the text baseline */}
      <span className="leader min-w-8 flex-1 group-hover:border-ink-700" aria-hidden="true" />
      <span
        className="till whitespace-nowrap text-[0.8125rem] text-ink-500 transition-colors duration-200 group-hover:text-ink-900"
        aria-hidden="true"
      >
        {action}{" "}
        <span className="inline-block transition-transform duration-200 group-hover:translate-x-[3px]">
          →
        </span>
      </span>
    </Link>
  );
}

export function FurtherReading() {
  return (
    <section id="compare">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-28 lg:px-10">
        <Reveal variant="none">
          <SectionSlug no="10" label="COMPARED" caption="The differences live in the details." />
        </Reveal>
        <Reveal>
          <h2 className="mt-8 max-w-2xl">See how AppFox compares.</h2>
        </Reveal>

        <ul className="mt-8 max-w-4xl">
          <StaggerGroup step={60}>
            {orderEditingComps.map((c, i) => (
              <Reveal key={c.slug} as="li" index={i}>
                <IndexRow
                  href={`/vs/${c.slug}`}
                  numeral={String(i + 1).padStart(2, "0")}
                  title={`AppFox vs ${c.shortName}`}
                  action="READ"
                />
              </Reveal>
            ))}
            <Reveal as="li" index={orderEditingComps.length}>
              <IndexRow
                href="/vs"
                numeral={String(orderEditingComps.length + 1).padStart(2, "0")}
                title="All comparisons"
                action="VIEW ALL"
              />
            </Reveal>
          </StaggerGroup>
        </ul>
      </div>
    </section>
  );
}

export default FurtherReading;
