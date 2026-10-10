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
import {
  subscriptionCompare,
  subscriptionVsPages,
  vendorsForSubscription,
  type SubscriptionVsPage,
} from "@/data/subscription-compare";
import { getApp } from "@/data/apps";
import { site } from "@/lib/site";

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

export function SubscriptionVsArticle({ page }: { page: SubscriptionVsPage }) {
  const path = `/vs/${page.slug}`;
  const pageUrl = `${site.url}${path}`;
  const hubUrl = `${site.url}/subscription/compare`;
  const subscriptionApp = getApp("subscription")!;
  const vendors = vendorsForSubscription(page.competitorId);
  const competitor = vendors.find((vendor) => vendor.id === page.competitorId);
  const competitorName = competitor?.shortName ?? page.h1;
  const siblings = subscriptionVsPages.filter((item) => item.slug !== page.slug);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Subscription comparisons", item: hubUrl },
      { "@type": "ListItem", position: 3, name: page.h1 },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: page.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

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
                  <Link href="/subscription/compare" className="transition-colors hover:text-brand-700">
                    Subscription comparisons
                  </Link>
                </li>
                <li aria-hidden="true" className="text-ink-300">
                  /
                </li>
                <li aria-current="page" className="text-ink-700">
                  {page.h1}
                </li>
              </ol>
            </nav>

            <h1 className="enter-rise mt-5 max-w-4xl">{page.h1}</h1>
            <p
              className="enter-fade-rise mt-6 max-w-[70ch] text-lg leading-relaxed text-ink-700"
              style={{ animationDelay: "140ms" }}
            >
              {page.summary}
            </p>
            <div
              className="enter-fade-rise mt-9 flex flex-col gap-4 sm:flex-row"
              style={{ animationDelay: "220ms" }}
            >
              <a href={subscriptionApp.installUrl} className="btn-primary">
                Try Subscriptions free
              </a>
              <a href="#comparison" className="btn-secondary">
                See the table
              </a>
            </div>
          </div>
        </section>

        <section id="where-they-win" className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <Reveal variant="none">
              <SectionSlug
                no="01"
                label="WHERE THEY WIN"
                caption={`When ${competitorName} is the better install.`}
              />
            </Reveal>
            <Reveal>
              <h2 className="mt-8 max-w-2xl">Where {competitorName} is a better fit</h2>
            </Reveal>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <StaggerGroup step={80}>
                {page.whereTheyWin.map((item, i) => (
                  <Reveal key={item.title} index={i} className="h-full">
                    <article className="card h-full p-7">
                      <p className="till text-[0.75rem] uppercase tracking-[0.14em] text-marigold-700">
                        Better there
                      </p>
                      <h3 className="mt-3">{item.title}</h3>
                      <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-500">
                        {item.description}
                      </p>
                    </article>
                  </Reveal>
                ))}
              </StaggerGroup>
            </div>
          </div>
        </section>

        <section id="what-we-dont" className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <Reveal variant="none">
              <SectionSlug
                no="02"
                label="WHAT WE DON'T DO YET"
                caption="Gaps on the AppFox side of this page."
              />
            </Reveal>
            <Reveal>
              <h2 className="mt-8 max-w-2xl">What AppFox does not do yet</h2>
            </Reveal>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <StaggerGroup step={80}>
                {page.whatWeDont.map((item, i) => (
                  <Reveal key={item.title} index={i} className="h-full">
                    <article className="card h-full p-7">
                      <p className="till text-[0.75rem] uppercase tracking-[0.14em] text-ink-500">
                        Not yet
                      </p>
                      <h3 className="mt-3">{item.title}</h3>
                      <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-500">
                        {item.description}
                      </p>
                    </article>
                  </Reveal>
                ))}
              </StaggerGroup>
            </div>
          </div>
        </section>

        <section id="comparison" className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <Reveal variant="none">
              <SectionSlug
                no="03"
                label="SIDE BY SIDE"
                caption="Same rows as the full comparison, two columns."
              />
            </Reveal>
            <Reveal>
              <h2 className="mt-8 max-w-2xl">AppFox and {competitorName}</h2>
            </Reveal>
            <div className="mt-10 space-y-12">
              {subscriptionCompare.sections.map((section) => (
                <div key={section.id} id={section.id}>
                  <h3 className="text-xl">
                    <span className="till mr-2 text-[0.75rem] text-ink-500">{section.no}</span>
                    {section.title}
                  </h3>
                  <MultiCompareTable
                    section={section}
                    vendors={vendors}
                    productName="AppFox Subscriptions"
                    collapseExtra
                    className="mt-4"
                  />
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm text-ink-500">
              AppFox column checked against the product on {subscriptionCompare.checked}.{" "}
              {competitorName} checked against public docs the same day. A question mark means those
              pages do not say.
            </p>
            <ColumnCheckNotes vendors={vendors} />
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
            <p className="mt-6 text-sm text-ink-500">
              <Link
                href="/subscription/compare"
                className="font-medium text-brand-700 underline decoration-brand-300 underline-offset-[3px] hover:decoration-brand-600"
              >
                Full comparison table
              </Link>{" "}
              with Recharge, Appstle, Seal, Loop, and Skio.
            </p>
          </div>
        </section>

        <section id="faq" className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <Reveal variant="none">
              <SectionSlug no="04" label="HONEST QUESTIONS" caption="Including where this page is biased." />
            </Reveal>
            <Reveal>
              <h2 className="mt-8 max-w-2xl">Questions about this {page.h1}</h2>
            </Reveal>
            <div className="mt-8 max-w-3xl divide-y divide-paper-edge border-y border-paper-edge">
              <StaggerGroup step={60}>
                {page.faq.map((faq, i) => (
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

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <Reveal variant="none">
              <SectionSlug no="05" label="KEEP COMPARING" />
            </Reveal>
            <h2 className="sr-only">Related comparisons</h2>
            <ul className="mt-2 max-w-4xl divide-y divide-paper-edge border-b border-paper-edge">
              <StaggerGroup step={70}>
                <Reveal as="li" index={0}>
                  <VsIndexRow
                    href="/subscription/compare"
                    numeral="00"
                    title="Subscriptions comparison table"
                    action="OPEN TABLE"
                  />
                </Reveal>
                {siblings.map((item, i) => (
                  <Reveal key={item.slug} as="li" index={i + 1}>
                    <VsIndexRow
                      href={`/vs/${item.slug}`}
                      numeral={String(i + 1).padStart(2, "0")}
                      title={item.h1}
                      action="READ"
                    />
                  </Reveal>
                ))}
              </StaggerGroup>
            </ul>
          </div>
        </section>

        <CtaBand
          headline={`See the ${page.h1} in the table, then decide`}
          body="Free for new installs, 0% of renewals, and a short list of things we do not do. One App Store review. If that is not enough proof, use the other column."
          primaryHref={subscriptionApp.installUrl}
          secondaryLabel="All subscription apps"
          secondaryHref="/subscription/compare"
          from="paper"
        />
      </main>
      <Footer />
    </>
  );
}
