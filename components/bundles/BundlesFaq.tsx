import { AccordionItem } from "@/components/ui/Accordion";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { SectionSlug } from "@/components/site/SectionSlug";

/**
 * Product Bundles FAQ - the straight answers merchants need before
 * installing. Rendered as accordion items. Also exported as structured
 * data for the FAQPage schema.
 */

export const bundlesFaqs: { q: string; a: string }[] = [
  {
    q: "What types of bundles can I create?",
    a: "Appfox supports fixed bundles (curated product sets with preset discounts), mix-and-match bundles (customers choose from a selection), volume discounts (buy more, save more), quantity breaks (tiered pricing), and BOGO offers. You can combine products across collections, variants, and inventory locations.",
  },
  {
    q: "Do bundles work with my existing theme?",
    a: "Yes. Bundle widgets integrate via Shopify 2.0 app blocks, which inherit your theme's fonts, colors, and spacing automatically. No theme code edits required. The widgets are fully responsive and work on all modern Shopify themes.",
  },
  {
    q: "How do bundle discounts work at checkout?",
    a: "Bundle pricing displays clearly on the product page, in the cart, and at checkout. Discounts are applied automatically when customers add a bundle to their cart - no coupon codes needed. The savings calculation shows at every step.",
  },
  {
    q: "Can customers mix and match products in a bundle?",
    a: "Yes. Mix-and-match bundles let customers build their own sets from products you select. You define the bundle size (e.g., pick any 3 items), the discount, and which products qualify. The widget updates pricing in real time as they build their bundle.",
  },
  {
    q: "What happens if a bundled product is out of stock?",
    a: "Appfox syncs with Shopify inventory in real time. If a product in a fixed bundle goes out of stock, the bundle becomes unavailable until inventory is restored. For mix-and-match bundles, out-of-stock items are hidden from the selection automatically.",
  },
  {
    q: "Can I run bundle promotions alongside discount codes?",
    a: "Bundle discounts stack with most Shopify discount codes, but behavior depends on your store's discount settings. You control whether bundles are eligible for additional discounts. Bundle analytics show the effective discount rate on every sale.",
  },
  {
    q: "How long does setup take?",
    a: "About 5 minutes. Install the app, create your first bundle (select products, set discount, choose bundle type), add the widget to a page via Shopify's theme editor, and preview. No developer required.",
  },
  {
    q: "Is the free plan actually free?",
    a: "Yes - free to install, no trial period, no credit card required. The free plan includes unlimited bundles, all bundle types, widgets, and analytics. You only upgrade when you need advanced features.",
  },
];

export function BundlesFaq() {
  return (
    <section id="faq" className="bg-paper-sunken py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <Reveal variant="none">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionSlug no="04" label="FAQ" caption="The questions everyone asks" />
              <h2 className="mt-8">Questions, answered</h2>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-500">
                The straight answers merchants need before installing.
              </p>
              <p className="mt-5">
                <a
                  href="mailto:support@getappfox.com"
                  className="text-[0.9375rem] font-semibold text-brand-700 hover:text-brand-600 transition-colors"
                >
                  support@getappfox.com
                </a>
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="space-y-0 border-t border-paper-edge">
              <StaggerGroup step={60}>
                {bundlesFaqs.map((faq, i) => (
                  <Reveal key={faq.q} index={i} variant="up">
                    <AccordionItem
                      className="border-b border-paper-edge"
                      buttonClassName="flex w-full items-center justify-between gap-4 py-5 text-left text-[1.0625rem] font-semibold text-ink-900 transition-colors hover:text-brand-700 data-[open]:text-brand-700"
                      panelClassName="pb-5 text-[0.9375rem] leading-relaxed text-ink-700"
                      title={faq.q}
                      icon={
                        <svg
                          className="h-6 w-6 shrink-0 transition-transform duration-300 [[data-open]_&]:rotate-45"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                        </svg>
                      }
                    >
                      <p>{faq.a}</p>
                    </AccordionItem>
                  </Reveal>
                ))}
              </StaggerGroup>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
