import Link from "next/link";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CtaBand } from "@/components/site/CtaBand";
import { SectionSlug } from "@/components/site/SectionSlug";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { AccordionItem } from "@/components/ui/Accordion";
import { MultiCompareTable } from "@/components/compare/MultiCompareTable";
import { ColumnCheckNotes, CompareFootnotes } from "@/components/compare/CompareFootnotes";
import { VsIndexRow } from "@/components/vs/VsIndexRow";
import { subscriptionCompare, subscriptionVsPages } from "@/data/subscription-compare";
import { getApp } from "@/data/apps";
import { routeMeta } from "@/lib/seo";
import { site } from "@/lib/site";

const path = "/subscription/compare";
const pageUrl = `${site.url}${path}`;
const subscriptionApp = getApp("subscription")!;

export const metadata = routeMeta.subscriptionCompare;

const plusIcon = (
  <span
    aria-hidden="true"
    className="shrink-0 text-ink-500 transition-[rotate,color] duration-250 [[data-open]_&]:rotate-45 [[data-open]_&]:text-brand-700"
  >
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  </span>
);

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${pageUrl}#breadcrumb`,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: site.url },
    { "@type": "ListItem", position: 2, name: "Subscription", item: `${site.url}/subscription` },
    { "@type": "ListItem", position: 3, name: "Compare" },
  ],
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${pageUrl}#faq`,
  mainEntity: subscriptionCompare.faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function SubscriptionComparePage() {
  const names = subscriptionCompare.vendors
    .filter((v) => !v.highlight)
    .map((v) => v.shortName);
  const titleTail = `${names.slice(0, -1).join(", ")} & ${names.at(-1)}`;

  return (
    <>
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={faqLd} />
      <Navbar />
      <main className="flex-1">
        <section className="paper-wash grain grain-soft relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 pt-28 pb-12 sm:px-8 sm:pt-32 sm:pb-16 lg:px-10">
            <nav aria-label="Breadcrumb" className="enter-fade-rise" style={{ animationDelay: "60ms" }}>
              <ol className="till flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8125rem] text-ink-500">
                <li>
                  <Link href="/" className="transition-colors hover:text-brand-700">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="text-ink-300">
                  /
                </li>
                <li>
                  <Link href="/subscription" className="transition-colors hover:text-brand-700">
                    Subscription
                  </Link>
                </li>
                <li aria-hidden="true" className="text-ink-300">
                  /
                </li>
                <li aria-current="page" className="text-ink-700">
                  Compare
                </li>
              </ol>
            </nav>

            <h1 className="enter-rise mt-5 max-w-5xl">
              AppFox <span className="wonk">vs</span> {titleTail}
            </h1>
            <p
              className="enter-fade-rise mt-6 max-w-[70ch] text-lg leading-relaxed text-ink-700"
              style={{ animationDelay: "140ms" }}
            >
              {subscriptionCompare.intro}
            </p>
            <div
              className="enter-fade-rise mt-9 flex flex-col gap-4 sm:flex-row"
              style={{ animationDelay: "220ms" }}
            >
              <a href={subscriptionApp.installUrl} className="btn-primary">
                Try Subscriptions free
              </a>
              <a href="#at-a-glance" className="btn-secondary">
                Jump to the table
              </a>
            </div>
          </div>
        </section>

        <section id="roadmap" className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <Reveal variant="none">
              <SectionSlug
                no="0"
                label="PUBLIC ROADMAP"
                caption="How In development and Planned are used, when we use them."
              />
            </Reveal>
            <Reveal>
              <h2 className="mt-8 max-w-2xl">What the status words mean</h2>
            </Reveal>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <Reveal className="h-full">
                <article className="card h-full p-7">
                  <p className="till text-[0.75rem] uppercase tracking-[0.14em] text-brand-700">
                    In development
                  </p>
                  <p className="mt-3 leading-relaxed text-ink-700">
                    {subscriptionCompare.roadmap.inDevelopment}
                  </p>
                </article>
              </Reveal>
              <Reveal delay={80} className="h-full">
                <article className="card h-full p-7">
                  <p className="till text-[0.75rem] uppercase tracking-[0.14em] text-ink-500">
                    Planned
                  </p>
                  <p className="mt-3 leading-relaxed text-ink-700">{subscriptionCompare.roadmap.planned}</p>
                </article>
              </Reveal>
            </div>
            <Reveal delay={120}>
              <p className="mt-6 max-w-[62ch] text-[0.9375rem] leading-relaxed text-ink-500">
                {subscriptionCompare.roadmap.note}
              </p>
            </Reveal>
          </div>
        </section>

        {subscriptionCompare.sections.map((section) => (
          <section key={section.id} id={section.id} className="py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
              <Reveal variant="none">
                <SectionSlug no={section.no} label={section.label} caption={section.caption} />
              </Reveal>
              <Reveal>
                <h2 className="mt-8 max-w-2xl">{section.title}</h2>
              </Reveal>
              <MultiCompareTable
                section={section}
                vendors={subscriptionCompare.vendors}
                productName="AppFox Subscriptions"
                className="mt-8"
              />
            </div>
          </section>
        ))}

        <section id="sources" className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <p className="text-sm text-ink-500">
              AppFox column checked against the product on {subscriptionCompare.checked}. Competitor
              columns were checked the same day against each app&apos;s public help center, pricing
              page, and feature pages. A question mark means those pages do not say. Pricing and
              features may change.
            </p>
            <ColumnCheckNotes vendors={subscriptionCompare.vendors} />
            <CompareFootnotes notes={subscriptionCompare.footnotes} />
            <p className="mt-8 till text-[0.75rem] uppercase tracking-[0.14em] text-ink-500">
              Sources
            </p>
            <ul className="mt-2 space-y-1 text-sm text-ink-500">
              {subscriptionCompare.sources.map((source) => (
                <li key={source.url + source.label}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-paper-edge underline-offset-2 transition-colors hover:text-brand-700 hover:decoration-brand-300"
                  >
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="feature-request" className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <div className="card-tinted p-8 sm:p-10">
              <p className="till text-[0.75rem] uppercase tracking-[0.14em] text-brand-700">
                Feature request
              </p>
              <h2 className="mt-4 max-w-2xl">Missing a row you need?</h2>
              <p className="mt-4 max-w-[62ch] text-lg leading-relaxed text-ink-700">
                Tell us which feature to check against a public listing or our product docs. We
                will not invent a cell, and we will not mark it In development unless that status
                is public.
              </p>
              <a
                href={`mailto:${site.supportEmail}?subject=${encodeURIComponent("Subscriptions feature request")}`}
                className="btn-primary mt-8"
              >
                Email {site.supportEmail}
              </a>
            </div>
          </div>
        </section>

        <section id="faq" className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <Reveal variant="none">
              <SectionSlug
                no="07"
                label="HONEST QUESTIONS"
                caption="Vendor page, public sources, real gaps."
              />
            </Reveal>
            <Reveal>
              <h2 className="mt-8 max-w-2xl">Questions we would ask this page</h2>
            </Reveal>
            <div className="mt-8 max-w-3xl divide-y divide-paper-edge border-y border-paper-edge">
              <StaggerGroup step={60}>
                {subscriptionCompare.faq.map((faq, i) => (
                  <Reveal key={faq.q} index={i}>
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
                      icon={plusIcon}
                    >
                      <p>{faq.a}</p>
                    </AccordionItem>
                  </Reveal>
                ))}
              </StaggerGroup>
            </div>
          </div>
        </section>

        <section id="one-to-one" className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <Reveal variant="none">
              <SectionSlug
                no="08"
                label="ONE TO ONE"
                caption="The same table, AppFox against one app."
              />
            </Reveal>
            <Reveal>
              <h2 className="mt-8 max-w-2xl">Per-app pages</h2>
            </Reveal>
            <ul className="mt-8 max-w-5xl divide-y divide-paper-edge border-b border-paper-edge">
              <StaggerGroup step={70}>
                {subscriptionVsPages.map((page, i) => (
                  <Reveal key={page.slug} as="li" index={i}>
                    <VsIndexRow
                      href={`/vs/${page.slug}`}
                      numeral={String(i + 1).padStart(2, "0")}
                      title={page.h1}
                      category="Subscriptions"
                      framing={page.summary}
                      action="READ"
                    />
                  </Reveal>
                ))}
              </StaggerGroup>
            </ul>
          </div>
        </section>

        <CtaBand
          headline="Free for new installs, with the gaps written down"
          body="Subscribe-and-save, a customer portal, prepaid, build-a-box, and Klaviyo on a free install. One review and no cancel-flow builder. If that is a deal-breaker, the table above says so."
          primaryHref={subscriptionApp.installUrl}
          secondaryLabel="Subscription overview"
          secondaryHref="/subscription"
          from="paper"
        />
      </main>
      <Footer />
    </>
  );
}
