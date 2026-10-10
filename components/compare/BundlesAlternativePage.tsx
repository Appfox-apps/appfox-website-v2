import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CtaBand } from "@/components/site/CtaBand";
import { SectionSlug } from "@/components/site/SectionSlug";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { AccordionItem } from "@/components/ui/Accordion";
import { MultiCompareTable } from "@/components/compare/MultiCompareTable";
import { VsIndexRow } from "@/components/vs/VsIndexRow";
import {
  bundleCompare,
  getBundleAlternative,
  listBundleAlternatives,
  pairVendors,
  UNCLEAR_NOTE,
  vendorById,
} from "@/data/bundle-compare";
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

export function BundlesAlternativePage({ slug }: { slug: string }) {
  const alternative = getBundleAlternative(slug);
  if (!alternative) notFound();

  const vendor = vendorById(alternative.vendorId);
  if (!vendor) notFound();

  const vendors = pairVendors(alternative.vendorId);
  const others = listBundleAlternatives().filter((a) => a.slug !== alternative.slug);
  const bundlesApp = getApp("product-bundles")!;
  const path = `/vs/${alternative.slug}`;
  const pageUrl = `${site.url}${path}`;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Compare bundle apps", item: `${site.url}/product-bundles/compare` },
      { "@type": "ListItem", position: 3, name: alternative.h1 },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: alternative.faq.map((f) => ({
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
                  <Link href="/product-bundles/compare" className="transition-colors hover:text-brand-700">
                    Compare
                  </Link>
                </li>
                <li aria-hidden="true" className="text-ink-300">
                  /
                </li>
                <li aria-current="page" className="text-ink-700">
                  {vendor.shortName} alternative
                </li>
              </ol>
            </nav>

            <h1 className="enter-rise mt-5 max-w-4xl">{alternative.h1}</h1>
            <p
              className="enter-fade-rise mt-6 max-w-[62ch] text-xl leading-[1.55] text-ink-700"
              style={{ animationDelay: "140ms" }}
            >
              {alternative.tagline}
            </p>
            <div
              className="enter-fade-rise mt-9 flex flex-col gap-4 sm:flex-row"
              style={{ animationDelay: "220ms" }}
            >
              <a href={bundlesApp.installUrl} className="btn-primary">
                Try Product Bundles free
              </a>
              <a href="#at-a-glance" className="btn-secondary">
                See full comparison
              </a>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <Reveal variant="none">
              <SectionSlug no="01" label="THE SHORT VERSION" caption="Product Bundles" />
            </Reveal>
            <Reveal>
              <h2 className="mt-8 max-w-2xl">The short version</h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-8 max-w-[62ch] text-lg leading-relaxed text-ink-700">
                {alternative.summary}
              </p>
            </Reveal>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              <Reveal className="h-full">
                <article className="card h-full p-7">
                  <p className="till text-[0.75rem] uppercase tracking-[0.14em] text-marigold-700">
                    Better there
                  </p>
                  <p className="mt-3 leading-relaxed text-ink-700">{alternative.betterFit}</p>
                </article>
              </Reveal>
              <Reveal delay={80} className="h-full">
                <article className="card h-full p-7">
                  <p className="till text-[0.75rem] uppercase tracking-[0.14em] text-ink-500">
                    What we don&apos;t do
                  </p>
                  <p className="mt-3 leading-relaxed text-ink-700">{alternative.gaps}</p>
                </article>
              </Reveal>
              <Reveal delay={160} className="h-full">
                <article className="card-tinted h-full p-7">
                  <p className="till text-[0.75rem] uppercase tracking-[0.14em] text-brand-700">
                    Who should switch
                  </p>
                  <p className="mt-3 leading-relaxed text-ink-900">{alternative.whoShouldSwitch}</p>
                </article>
              </Reveal>
            </div>
          </div>
        </section>

        {bundleCompare.sections.map((section) => (
          <section key={section.id} id={section.id} className="py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
              <Reveal variant="none">
                <SectionSlug no={section.no} label={section.label} caption={section.caption} />
              </Reveal>
              <Reveal>
                <h2 className="mt-8 max-w-2xl">{section.title}</h2>
              </Reveal>
              <MultiCompareTable section={section} vendors={vendors} className="mt-10" />
            </div>
          </section>
        ))}

        <section id="sources" className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <p className="text-sm text-ink-500">
              Checked {bundleCompare.checked}. Same cells as{" "}
              <Link href="/product-bundles/compare" className="underline decoration-paper-edge underline-offset-2 hover:text-brand-700">
                the comparison hub
              </Link>
              . Pricing and features may change. {UNCLEAR_NOTE}
            </p>
            <p className="mt-4 till text-[0.75rem] uppercase tracking-[0.14em] text-ink-500">
              Sources
            </p>
            <ul className="mt-2 space-y-1 text-sm text-ink-500">
              {alternative.sources.map((source) => (
                <li key={source.url}>
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

        <section id="faq" className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <Reveal variant="none">
              <SectionSlug no="10" label="SWITCHING QUESTIONS" caption="Straight answers, no hedging." />
            </Reveal>
            <Reveal>
              <h2 className="mt-8 max-w-2xl">Switching from {vendor.shortName}?</h2>
            </Reveal>
            <div className="mt-8 max-w-3xl divide-y divide-paper-edge border-y border-paper-edge">
              <StaggerGroup step={60}>
                {alternative.faq.map((faq, i) => (
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

        <section id="keep-comparing" className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <Reveal variant="none">
              <SectionSlug no="11" label="KEEP COMPARING" caption="The hub, then the other alternatives." />
            </Reveal>
            <Reveal>
              <h2 className="mt-8 max-w-2xl">More bundle app comparisons</h2>
            </Reveal>
            <ul className="mt-8 max-w-5xl divide-y divide-paper-edge border-b border-paper-edge">
              <StaggerGroup step={70}>
                <Reveal as="li" index={0}>
                  <VsIndexRow
                    href="/product-bundles/compare"
                    numeral="00"
                    title="Best Shopify bundle apps compared"
                    category="Hub"
                    action="OPEN TABLE"
                  />
                </Reveal>
                {others.map((alt, i) => {
                  const other = vendorById(alt.vendorId);
                  return (
                    <Reveal key={alt.slug} as="li" index={i + 1}>
                      <VsIndexRow
                        href={`/vs/${alt.slug}`}
                        numeral={String(i + 1).padStart(2, "0")}
                        title={`${other?.shortName ?? alt.slug} alternative`}
                        action="READ"
                      />
                    </Reveal>
                  );
                })}
              </StaggerGroup>
            </ul>
          </div>
        </section>

        <CtaBand
          headline={`${vendor.shortName} alternative, on a free install`}
          body="Volume discounts, mix-and-match, BOGO, FBT, and gifts. Four reviews and no verified POS — if that is a deal-breaker, the table above says so."
          primaryHref={bundlesApp.installUrl}
          secondaryLabel="All bundle apps compared"
          secondaryHref="/product-bundles/compare"
          from="paper"
        />
      </main>
      <Footer />
    </>
  );
}
