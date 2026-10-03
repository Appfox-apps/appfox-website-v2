import Link from "next/link";
import { AccordionItem } from "@/components/ui/Accordion";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { SectionSlug } from "@/components/site/SectionSlug";
import { site } from "@/lib/site";

/**
 * NO. 04 - QUESTIONS. Same ledger-ruled accordion as the home FAQ.
 *
 * `subscriptionFaqs` is exported so the page assembler can build FAQPage
 * JSON-LD from the exact same strings rendered here.
 */
export const subscriptionFaqs: { q: string; a: string }[] = [
  {
    q: "How much does AppFox Subscription cost?",
    a: "Nothing, for now. AppFox Subscription is free for now with every feature unlocked - analytics, bundling, branded emails and the API included - no cap on active subscriptions, and 0% transaction fees. No card required.",
  },
  {
    q: "Does it use Shopify's native checkout?",
    a: "Yes. Subscriptions are created and billed through Shopify Checkout and Shopify's native subscription APIs - customers pay on the same checkout they already trust, and recurring charges renew automatically on the schedule they picked.",
  },
  {
    q: "What kinds of subscriptions can I offer?",
    a: "Replenishment (subscribe-and-save), curated subscription boxes, memberships and access subscriptions, digital products, services, and product bundles - with fixed, tiered, or trial-period pricing. If it recurs, you can model it.",
  },
  {
    q: "Can customers manage their own subscriptions?",
    a: "Yes. The customer portal lets subscribers skip a delivery, pause, swap products, change frequency, update payment details, or cancel - on their own, from their account. Most \"about my subscription\" emails never get sent.",
  },
  {
    q: "Wasn't this app called Trust Subscriptions?",
    a: "Same app, new name. Trust Subscriptions joined the AppFox family and is now AppFox Subscription - existing merchants, subscriptions, and settings carry over unchanged, and the app keeps its App Store review history.",
  },
  {
    q: "Can I migrate from another subscription app?",
    a: "Yes. You can bring existing subscribers over from apps like Recharge, and support will help with the move - reach out before you switch and we'll walk through it together.",
  },
  {
    q: "Do I need to touch my theme code?",
    a: "No. The subscription widget drops onto your product pages from the app - pick a template, match your branding, and publish. Setup takes about five minutes, and it also works with PageFly pages.",
  },
  {
    q: "Do you have MCP for developers?",
    a: "Yes. AppFox Subscription has a hosted MCP (Model Context Protocol) server that lets store developers and agencies connect Cursor, Claude Desktop, or VS Code to read subscription contracts, selling plans, failed billing, and upcoming renewals directly from their AI IDE - using the same API keys as the REST API. The MCP docs live at subscriptions-docs.getappfox.com/api/mcp.",
  },
  {
    q: "Does AppFox work with Shopify Sidekick?",
    a: "Yes. Shopify Sidekick (Shopify's admin AI assistant) integrates with AppFox Subscription so merchants can ask natural-language questions about their subscriptions and jump straight to the right page - no extra setup, included with install. Try asking Sidekick: \"How many paused subscriptions do I have?\" or \"Find Jane Smith's subscription\" or \"Which subscriptions failed billing?\" or \"Show me subscriptions renewing this week.\" Read more at subscriptions-docs.getappfox.com/sidekick.",
  },
];

const answerLink =
  "text-brand-700 underline decoration-brand-300 underline-offset-2 transition-colors hover:decoration-brand-700";

export function SubscriptionFaq() {
  return (
    <section id="faq" className="bg-paper-sunken py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <Reveal variant="none">
          <SectionSlug no="04" label="QUESTIONS" caption="Nine straight answers" />
        </Reveal>

        <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: sticky headline + support line */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <h2 className="max-w-md">The questions you&apos;d ask before installing</h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="mt-5 max-w-sm text-ink-500">
                  Didn&apos;t see yours? Ask us directly at{" "}
                  <a href={`mailto:${site.supportEmail}`} className={`till ${answerLink}`}>
                    {site.supportEmail}
                  </a>
                  . And if you also want customers editing their one-time orders,{" "}
                  <Link href="/order-editing" className={answerLink}>
                    meet Order Editing
                  </Link>
                  .
                </p>
              </Reveal>
            </div>
          </div>

          {/* Right: ledger-ruled accordion - no cards, hairlines only */}
          <div className="lg:col-span-7">
            <div className="border-y border-paper-edge divide-y divide-paper-edge">
              <StaggerGroup step={60}>
                {subscriptionFaqs.map((faq, i) => (
                  <Reveal key={faq.q} index={i} variant="up">
                    <AccordionItem
                      buttonClassName="flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left"
                      panelClassName="max-w-[62ch] pb-6 pr-10 text-ink-700"
                      title={
                        <span className="block">
                          <span className="block text-lg font-semibold leading-snug text-ink-900 transition-colors duration-200 [[data-open]_&]:text-brand-700">
                            {faq.q}
                          </span>
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
                      <p>{faq.a}</p>
                    </AccordionItem>
                  </Reveal>
                ))}
              </StaggerGroup>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
