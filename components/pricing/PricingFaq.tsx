import Link from "next/link";
import { AccordionItem } from "@/components/ui/Accordion";
import { SectionSlug } from "@/components/site/SectionSlug";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

/**
 * Pricing FAQ - five questions from COPY §3, verbatim.
 * `pricingFaqs` is exported so app/pricing/page.tsx can build FAQPage
 * JSON-LD from the exact same strings rendered here - markup and structured
 * data never drift. Light section on paper; the CtaBand below opens with
 * its own <Perforation from="paper" />.
 */
export const pricingFaqs: { q: string; a: string }[] = [
  {
    q: "How does the free trial work?",
    a: "Every paid plan starts with a 14-day free trial, and we don't ask for a card to begin. Use the full plan for two weeks; if it isn't earning its fee in saved tickets and added revenue, walk away - or drop down to the Free plan and keep using Appfox at no cost.",
  },
  {
    q: "What's actually included in the Free plan?",
    a: "The Free plan is a working product, not a teaser: 50 customer edits a month, address and quantity edits, 2 active upsell offers, editing on your thank-you and order status pages, and email support. It doesn't expire. If your store outgrows 50 edits, that's usually the moment the math on $19 for unlimited makes itself.",
  },
  {
    q: "What counts as an edit?",
    a: "An edit is a change a customer completes on your thank-you or order status page - an address fix, a variant swap, a quantity change, an item added or removed, or a cancellation. Customers just looking at their order doesn't count against your limit. And on Growth and Pro, nothing counts, because edits are unlimited.",
  },
  {
    q: "Can I change plans later?",
    a: "Yes, in either direction, whenever you want. Upgrades take effect right away so you get the new features immediately; downgrades take effect with your next billing cycle. Billing is handled through Shopify, so it all shows up on your existing Shopify invoice.",
  },
  {
    q: "What's your refund policy?",
    a: `Charges run through Shopify's standard app billing, and the trial plus free plan exist so you never pay for something unproven. If a charge ever feels wrong - you forgot to cancel, you downgraded late, something broke - email ${site.supportEmail}. We review every case individually and err on the side of the merchant.`,
  },
];

const answerLink =
  "text-brand-700 underline decoration-brand-300 underline-offset-2 transition-colors hover:decoration-brand-700";

/**
 * Two answers carry links in the DOM (text identical to `pricingFaqs` so
 * JSON-LD stays valid plain text). Keyed by index.
 */
const linkedAnswers: Record<number, React.ReactNode> = {
  1: (
    <>
      The Free plan is a working product, not a teaser: 50 customer edits a month, address and
      quantity edits, 2 active upsell offers,{" "}
      <Link href="/features/order-editing" className={answerLink}>
        editing on your thank-you and order status pages
      </Link>
      , and email support. It doesn&apos;t expire. If your store outgrows 50 edits, that&apos;s
      usually the moment the math on <span className="till">$19</span> for unlimited makes itself.
    </>
  ),
  4: (
    <>
      Charges run through Shopify&apos;s standard app billing, and the trial plus free plan exist
      so you never pay for something unproven. If a charge ever feels wrong &mdash; you forgot to
      cancel, you downgraded late, something broke &mdash; email{" "}
      <a href={`mailto:${site.supportEmail}`} className={`till ${answerLink}`}>
        {site.supportEmail}
      </a>
      . We review every case individually and err on the side of the merchant.
    </>
  ),
};

export function PricingFaq() {
  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <Reveal variant="none">
          <SectionSlug no="04" label="PRICING QUESTIONS" caption="Five straight answers" />
        </Reveal>
        <Reveal>
          <h2 className="mt-8 max-w-2xl">Questions, answered.</h2>
        </Reveal>

        <div className="mt-10 max-w-3xl">
          {/* Ledger-ruled accordion - hairlines only, no cards */}
          <div className="border-y border-paper-edge divide-y divide-paper-edge">
            <StaggerGroup step={60}>
              {pricingFaqs.map((faq, i) => (
                <Reveal key={faq.q} index={i} variant="up">
                  <AccordionItem
                    buttonClassName="flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left"
                    panelClassName="max-w-[62ch] pb-6 pr-10 text-ink-700"
                    title={
                      <span className="block">
                        <span className="block text-lg font-semibold leading-snug text-ink-900 transition-colors duration-200 [[data-open]_&]:text-brand-700">
                          {faq.q}
                        </span>
                        {/* marigold underline draws beneath the open question */}
                        <span
                          aria-hidden="true"
                          className="mt-1.5 block h-0.5 w-12 origin-left scale-x-0 bg-marigold-500 transition-transform duration-300 [[data-open]_&]:scale-x-100"
                        />
                      </span>
                    }
                    icon={
                      <span
                        aria-hidden="true"
                        className="shrink-0 text-ink-500 transition-[rotate,color] duration-250 [[data-open]_&]:rotate-45 [[data-open]_&]:text-brand-700"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7 1v12M1 7h12"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                    }
                  >
                    <p>{linkedAnswers[i] ?? faq.a}</p>
                  </AccordionItem>
                </Reveal>
              ))}
            </StaggerGroup>
          </div>

          <Reveal delay={120}>
            <p className="mt-8 text-ink-500">
              Still shortlisting?{" "}
              <Link href="/vs" className={answerLink}>
                See how Appfox compares
              </Link>{" "}
              to seven other order editing and upsell apps.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
