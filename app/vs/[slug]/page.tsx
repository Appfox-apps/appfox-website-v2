import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CtaBand } from "@/components/site/CtaBand";
import { SectionSlug } from "@/components/site/SectionSlug";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { InView } from "@/components/ui/InView";
import { AccordionItem } from "@/components/ui/Accordion";
import { ComparisonTable } from "@/components/vs/ComparisonTable";
import { DrawTick } from "@/components/vs/DrawTick";
import { VsIndexRow, VsTitle } from "@/components/vs/VsIndexRow";
import { competitors, getCompetitor, type Competitor } from "@/data/competitors";
import { getApp } from "@/data/apps";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return competitors.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const competitor = getCompetitor(slug);
  if (!competitor) return {};
  const path = `/vs/${competitor.slug}`;
  return {
    // metaTitle already contains "AppFox" - skip the "| AppFox" template
    title: { absolute: competitor.metaTitle },
    description: competitor.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      title: competitor.metaTitle,
      description: competitor.metaDescription,
      url: path,
      type: "website",
    },
  };
}

/** Tokenize a category for affinity scoring ("Order Editor & Upsell" → order/editor/upsell). */
function categoryTokens(category: string): string[] {
  return category
    .split(/[^A-Za-z-]+/)
    .filter(Boolean)
    .map((t) => t.toLowerCase());
}

/**
 * Two thematic siblings from the same AppFox app's comparison set, nearest
 * by category: exact category matches first, then shared category words,
 * data order breaking ties.
 */
function relatedCompetitors(current: Competitor, count = 2): Competitor[] {
  const tokens = new Set(categoryTokens(current.category));
  return competitors
    .filter((c) => c.slug !== current.slug && c.app === current.app)
    .map((c, i) => ({
      c,
      i,
      score:
        (c.category === current.category ? 10 : 0) +
        categoryTokens(c.category).filter((t) => tokens.has(t)).length,
    }))
    .sort((a, b) => b.score - a.score || a.i - b.i)
    .slice(0, count)
    .map((x) => x.c);
}

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

export default async function ComparisonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const competitor = getCompetitor(slug);
  if (!competitor) notFound();

  const path = `/vs/${competitor.slug}`;
  const pageUrl = `${site.url}${path}`;
  const related = relatedCompetitors(competitor);
  const appfoxApp = getApp(competitor.app)!;
  const isSubscription = competitor.app === "subscription";
  const isBundles = competitor.app === "product-bundles";
  const hasHonesty = Boolean(competitor.whereTheyWin?.length);
  const checkedLabel = competitor.checked ?? "June 2026";
  const faqNo = hasHonesty ? "05" : "04";
  const relatedNo = hasHonesty ? "06" : "05";

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Compare", item: `${site.url}/vs` },
      // Last item: current page - no "item" property per Google's guidelines
      { "@type": "ListItem", position: 3, name: `AppFox vs ${competitor.shortName}` },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: competitor.faq.map((f) => ({
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
        {/* ── Compact cream hero ───────────────────────────── */}
        <section className="paper-wash grain grain-soft relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 pt-28 pb-12 sm:px-8 sm:pt-32 sm:pb-16 lg:px-10">
            {/* Visible breadcrumb - mirrors the BreadcrumbList JSON-LD */}
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
                  <Link href="/vs" className="transition-colors hover:text-brand-700">
                    Compare
                  </Link>
                </li>
                <li aria-hidden="true" className="text-ink-300">
                  /
                </li>
                <li aria-current="page" className="text-ink-700">
                  AppFox vs {competitor.shortName}
                </li>
              </ol>
            </nav>

            <h1 className="enter-rise mt-5 max-w-4xl">
              <VsTitle shortName={competitor.shortName} />
            </h1>
            <p
              className="enter-fade-rise mt-6 max-w-[62ch] text-xl leading-[1.55] text-ink-700"
              style={{ animationDelay: "140ms" }}
            >
              {competitor.tagline}
            </p>
            <div
              className="enter-fade-rise mt-9 flex flex-col gap-4 sm:flex-row"
              style={{ animationDelay: "220ms" }}
            >
              <a href={appfoxApp.installUrl} className="btn-primary">
                Try {appfoxApp.name} free
              </a>
              <a href="#comparison" className="btn-secondary">
                See full comparison
              </a>
            </div>
          </div>
        </section>

        {/* ── 01 · The short version ───────────────────────── */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <Reveal variant="none">
              <SectionSlug no="01" label="THE SHORT VERSION" caption={competitor.category} />
            </Reveal>
            <Reveal>
              <h2 className="mt-8 max-w-2xl">The short version</h2>
            </Reveal>
            <div className="mt-8 grid items-start gap-8 lg:grid-cols-12 lg:gap-14">
              <Reveal delay={80} className="lg:col-span-7">
                <p className="max-w-[62ch] text-lg leading-relaxed text-ink-700">
                  {competitor.intro}
                </p>
              </Reveal>
              <Reveal delay={180} className="lg:col-span-5">
                <div className="card-tinted p-7">
                  <p className="till text-[0.75rem] uppercase tracking-[0.14em] text-brand-700">
                    Best for
                  </p>
                  <p className="mt-3 leading-relaxed text-ink-900">{competitor.bestFor}</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── 02 · Why merchants switch ────────────────────── */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <Reveal variant="none">
              <SectionSlug
                no="02"
                label="WHY MERCHANTS SWITCH"
                caption="The differences that move the needle."
              />
            </Reveal>
            <Reveal>
              <h2 className="mt-8 max-w-2xl">Why merchants switch from {competitor.shortName}</h2>
            </Reveal>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <StaggerGroup step={80}>
                {competitor.whyAppfox.map((item, i) => (
                  <Reveal key={item.title} index={i} className="h-full">
                    <InView className="card lift h-full p-7">
                      {/* Hand-drawn tick medallion */}
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-success-bg">
                        <DrawTick className="h-5 w-5 text-success" delay={i * 90 + 150} />
                      </span>
                      <h3 className="mt-5">{item.title}</h3>
                      <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-500">
                        {item.description}
                      </p>
                    </InView>
                  </Reveal>
                ))}
              </StaggerGroup>
            </div>
          </div>
        </section>

        {/* ── 03 · Side by side (#comparison) ──────────────── */}
        {/* anchor offset handled by the global scroll-padding-top (88px) */}
        <section id="comparison" className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <Reveal variant="none">
              <SectionSlug no="03" label="SIDE BY SIDE" caption="Every line item, in the open." />
            </Reveal>
            <Reveal>
              <h2 className="mt-8 max-w-2xl">Side by side, line by line</h2>
            </Reveal>

            {/* No Reveal around the table: it must paint immediately for
                SEO and to keep the sticky header free of transformed
                ancestors. Ticks still draw on via the InView inside. */}
            <ComparisonTable competitor={competitor} className="mt-10" />

            <p className="mt-5 text-sm text-ink-500">
              Comparison based on publicly available information as of {checkedLabel}. Pricing and
              features may change. Unverified items are marked &ldquo;Not listed&rdquo; or
              &ldquo;Listed&rdquo; rather than guessed.
            </p>
            {competitor.sources?.length ? (
              <div className="mt-4">
                <p className="till text-[0.75rem] uppercase tracking-[0.14em] text-ink-500">
                  Sources
                </p>
                <ul className="mt-2 space-y-1 text-sm text-ink-500">
                  {competitor.sources.map((source) => (
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
            ) : null}
          </div>
        </section>

        {hasHonesty ? (
          <section className="py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
              <Reveal variant="none">
                <SectionSlug
                  no="04"
                  label="WHERE THEY WIN"
                  caption="The gaps we will not talk around."
                />
              </Reveal>
              <Reveal>
                <h2 className="mt-8 max-w-2xl">
                  Where {competitor.shortName} is a better fit
                </h2>
              </Reveal>
              <Reveal delay={80}>
                <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-ink-500">
                  What we do not do yet - or do not do as well. If one of these is the job, pick
                  them.
                </p>
              </Reveal>
              <div className="mt-10 grid gap-5 md:grid-cols-2">
                <StaggerGroup step={80}>
                  {competitor.whereTheyWin!.map((item, i) => (
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
        ) : null}

        {/* ── 04 · FAQ ─────────────────────────────────────── */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <Reveal variant="none">
              <SectionSlug no={faqNo} label="SWITCHING QUESTIONS" caption="Straight answers, no hedging." />
            </Reveal>
            <Reveal>
              <h2 className="mt-8 max-w-2xl">Switching from {competitor.shortName}?</h2>
            </Reveal>

            <div className="mt-8 max-w-3xl divide-y divide-paper-edge border-y border-paper-edge">
              <StaggerGroup step={60}>
                {competitor.faq.map((faq, i) => (
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

        {/* ── 05 · Related comparisons ─────────────────────── */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <Reveal variant="none">
              <SectionSlug no={relatedNo} label="KEEP COMPARING" />
            </Reveal>
            <h2 className="sr-only">Related comparisons</h2>

            <ul className="mt-2 max-w-4xl divide-y divide-paper-edge border-b border-paper-edge">
              <StaggerGroup step={70}>
                {related.map((c, i) => (
                  <Reveal key={c.slug} as="li" index={i}>
                    <VsIndexRow
                      href={`/vs/${c.slug}`}
                      numeral={String(i + 1).padStart(2, "0")}
                      title={<VsTitle shortName={c.shortName} />}
                      category={c.category}
                      action="READ"
                    />
                  </Reveal>
                ))}
                <Reveal as="li" index={related.length}>
                  <VsIndexRow
                    href="/vs"
                    numeral={String(related.length + 1).padStart(2, "0")}
                    title="All comparisons"
                    action="VIEW ALL"
                  />
                </Reveal>
              </StaggerGroup>
            </ul>
          </div>
        </section>

        {/* Final CTA - previous section is light paper */}
        <CtaBand
          headline={`See why merchants switch to ${appfoxApp.name}`}
          body={
            isSubscription
              ? "Free for now with every feature included - 0% transaction fees. 5-minute setup, no card required."
              : isBundles
                ? "Free to install with unlimited listed bundle types. 5-minute setup. No card required."
                : "Free plan up to 50 edits per month. 5-minute setup. No card required."
          }
          primaryHref={appfoxApp.installUrl}
          secondaryLabel={
            isSubscription
              ? "See Subscription pricing"
              : isBundles
                ? "See Product Bundles pricing"
                : "Compare plans"
          }
          secondaryHref={
            isSubscription
              ? "/pricing/subscription"
              : isBundles
                ? "/pricing/product-bundles"
                : "/pricing/order-editing"
          }
          from="paper"
        />
      </main>
      <Footer />
    </>
  );
}
