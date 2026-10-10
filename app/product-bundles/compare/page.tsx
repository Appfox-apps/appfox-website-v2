import Link from "next/link";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CtaBand } from "@/components/site/CtaBand";
import { SectionSlug } from "@/components/site/SectionSlug";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { AccordionItem } from "@/components/ui/Accordion";
import { MultiCompareTable } from "@/components/compare/MultiCompareTable";
import { VsIndexRow, VsTitle } from "@/components/vs/VsIndexRow";
import { bundleCompare } from "@/data/bundle-compare";
import { competitorsForApp } from "@/data/competitors";
import { getApp } from "@/data/apps";
import { routeMeta } from "@/lib/seo";
import { site } from "@/lib/site";

const path = "/product-bundles/compare";
const pageUrl = `${site.url}${path}`;
const bundlesApp = getApp("product-bundles")!;
const oneToOne = competitorsForApp("product-bundles");

export const metadata = routeMeta.productBundlesCompare;

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
    { "@type": "ListItem", position: 2, name: "Product Bundles", item: `${site.url}/product-bundles` },
    { "@type": "ListItem", position: 3, name: "Compare" },
  ],
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${pageUrl}#faq`,
  mainEntity: bundleCompare.faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function ProductBundlesComparePage() {
  const names = bundleCompare.vendors
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
                  <Link href="/product-bundles" className="transition-colors hover:text-brand-700">
                    Product Bundles
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
              {bundleCompare.intro}
            </p>
            <div
              className="enter-fade-rise mt-9 flex flex-col gap-4 sm:flex-row"
              style={{ animationDelay: "220ms" }}
            >
              <a href={bundlesApp.installUrl} className="btn-primary">
                Try Product Bundles free
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
                caption="How In development and Planned are used — when we use them."
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
                    {bundleCompare.roadmap.inDevelopment}
                  </p>
                </article>
              </Reveal>
              <Reveal delay={80} className="h-full">
                <article className="card h-full p-7">
                  <p className="till text-[0.75rem] uppercase tracking-[0.14em] text-ink-500">
                    Planned
                  </p>
                  <p className="mt-3 leading-relaxed text-ink-700">{bundleCompare.roadmap.planned}</p>
                </article>
              </Reveal>
            </div>
            <Reveal delay={120}>
              <p className="mt-6 max-w-[62ch] text-[0.9375rem] leading-relaxed text-ink-500">
                {bundleCompare.roadmap.note}
              </p>
            </Reveal>
          </div>
        </section>

        {bundleCompare.sections.map((section) => (
          <section key={section.id} id={section.id} className="py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
              <Reveal variant="none">
                <SectionSlug no={section.no} label={section.label} caption={section.caption} />
              </Reveal>
              <Reveal>
                <h2 className="mt-8 max-w-2xl">{section.title}</h2>
              </Reveal>
              <MultiCompareTable section={section} vendors={bundleCompare.vendors} className="mt-8" />
            </div>
          </section>
        ))}

        <section id="sources" className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <p className="text-sm text-ink-500">
              Checked {bundleCompare.checked}. Comparison based on publicly available information.
              Pricing and features may change. Unverified items are marked &ldquo;Not listed&rdquo; or
              &ldquo;Listed&rdquo; rather than guessed.
            </p>
            <p className="mt-4 till text-[0.75rem] uppercase tracking-[0.14em] text-ink-500">
              Sources
            </p>
            <ul className="mt-2 space-y-1 text-sm text-ink-500">
              {bundleCompare.sources.map((source) => (
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

        <section id="feature-request" className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <div className="card-tinted p-8 sm:p-10">
              <p className="till text-[0.75rem] uppercase tracking-[0.14em] text-brand-700">
                Feature request
              </p>
              <h2 className="mt-4 max-w-2xl">Missing a row you need?</h2>
              <p className="mt-4 max-w-[62ch] text-lg leading-relaxed text-ink-700">
                Tell us which feature to check against public listings. We will not invent a cell,
                and we will not mark it In development unless that status is public.
              </p>
              <a
                href={`mailto:${site.supportEmail}?subject=${encodeURIComponent("Product Bundles feature request")}`}
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
              <SectionSlug no="10" label="HONEST QUESTIONS" caption="Vendor page, public sources, real gaps." />
            </Reveal>
            <Reveal>
              <h2 className="mt-8 max-w-2xl">Questions we would ask this page</h2>
            </Reveal>
            <div className="mt-8 max-w-3xl divide-y divide-paper-edge border-y border-paper-edge">
              <StaggerGroup step={60}>
                {bundleCompare.faq.map((faq, i) => (
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
                no="11"
                label="ONE TO ONE"
                caption="Optional deeper write-ups, including Wide Bundles and Rebolt."
              />
            </Reveal>
            <Reveal>
              <h2 className="mt-8 max-w-2xl">Per-app pages</h2>
            </Reveal>
            <ul className="mt-8 max-w-5xl divide-y divide-paper-edge border-b border-paper-edge">
              <StaggerGroup step={70}>
                {oneToOne.map((c, i) => (
                  <Reveal key={c.slug} as="li" index={i}>
                    <VsIndexRow
                      href={`/vs/${c.slug}`}
                      numeral={String(i + 1).padStart(2, "0")}
                      title={<VsTitle shortName={c.shortName} />}
                      category={c.category}
                      framing={c.framing}
                      action="READ"
                    />
                  </Reveal>
                ))}
              </StaggerGroup>
            </ul>
          </div>
        </section>

        <CtaBand
          headline="The offer types most stores run, on a free install"
          body="Volume discounts, mix-and-match, BOGO, and theme widgets. Four reviews, no POS, English only — if that is a deal-breaker, the table above says so."
          primaryHref={bundlesApp.installUrl}
          secondaryLabel="Product Bundles overview"
          secondaryHref="/product-bundles"
          from="paper"
        />
      </main>
      <Footer />
    </>
  );
}
