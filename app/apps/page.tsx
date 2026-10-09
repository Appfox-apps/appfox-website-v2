import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CtaBand } from "@/components/site/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { SectionSlug } from "@/components/site/SectionSlug";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { apps } from "@/data/apps";
import { AppMark } from "@/components/brand/AppMark";

export const metadata: Metadata = pageMetadata({
  title: "Shopify Apps by AppFox - Order Editing & Subscriptions",
  description:
    "Every AppFox app for Shopify in one place: self-service order editing with post-purchase upsells, and recurring subscriptions. Both install in minutes.",
  path: "/apps",
});

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${site.url}/apps#list`,
  itemListElement: apps.map((app, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: app.name,
    url: `${site.url}${app.href}`,
  })),
};

/** Hand-drawn tick - never a ✓ character. */
function Tick({ delay }: { delay: number }) {
  return (
    <svg viewBox="0 0 24 24" className="mt-1 h-4 w-4 shrink-0" fill="none" aria-hidden="true">
      <path
        className="draw-path"
        pathLength={400}
        d="M3.5 13.2 9 18.4 20.5 5.8"
        stroke="var(--color-success)"
        strokeWidth={2.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ "--draw-delay": `${delay}ms` } as React.CSSProperties}
      />
    </svg>
  );
}

export default function AppsPage() {
  return (
    <>
      <JsonLd data={itemListJsonLd} />
      <Navbar />
      <main className="flex-1">
        {/* ── Header ─────────────────────────────────────── */}
        <section className="paper-wash grain grain-soft relative overflow-hidden">
          <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-14 sm:px-8 sm:pt-36 sm:pb-20 lg:px-10">
            <p className="enter-fade-rise" style={{ animationDelay: "60ms" }}>
              <span className="till inline-flex items-center rounded-lg border border-paper-edge bg-paper-raised px-3 py-1.5 text-[0.8125rem] text-marigold-700 shadow-(--shadow-card)">
                Three apps · one storefront toolkit
              </span>
            </p>
            <h1 className="enter-rise mt-6 max-w-3xl">
              All three apps,{" "}
              <span className="wonk relative inline-block">
                side by side
                <svg
                  className="absolute -bottom-[0.04em] left-0 h-[0.2em] w-full"
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 8.5C20 5 38 9.5 56 7 72 4.8 88 7.5 98 5.5"
                    fill="none"
                    stroke="var(--color-marigold-300)"
                    strokeWidth={5}
                    strokeLinecap="round"
                    pathLength={400}
                    className="draw-path is-visible"
                    style={{ "--draw-delay": "600ms" } as React.CSSProperties}
                  />
                </svg>
              </span>
            </h1>
            <p
              className="enter-fade-rise mt-6 max-w-[58ch] text-xl leading-[1.55] text-ink-700"
              style={{ animationDelay: "140ms" }}
            >
              AppFox builds Shopify apps for the whole order journey - subscriptions that start
              on the product page, product bundles that boost average order value, plus fixing and
              growing orders after checkout. Pick one, or run all three.
            </p>
          </div>
        </section>

        {/* ── The shelf ──────────────────────────────────── */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <Reveal variant="none">
              <SectionSlug no="01" label="THE APPS" caption="Both free to start" />
            </Reveal>

            <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8">
              <StaggerGroup step={120}>
                {apps.map((app, i) => (
                  <Reveal key={app.slug} index={i} className="h-full">
                    <article className="card lift flex h-full flex-col p-7 sm:p-9">
                      <div className="flex items-start justify-between gap-4">
                        <p className="till text-[0.8125rem] uppercase tracking-[0.12em] text-ink-500">
                          {String(i + 1).padStart(2, "0")} · {app.pricingLine}
                        </p>
                        <AppMark size={56} />
                      </div>
                      <h2 className="mt-4 !text-[1.75rem] sm:!text-[2rem]">{app.name}</h2>
                      <p className="mt-2 text-[1.0625rem] font-medium text-brand-700">
                        {app.tagline}
                      </p>
                      <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-700">
                        {app.description}
                      </p>

                      <ul className="mt-6 space-y-2.5 border-t border-paper-edge pt-6">
                        {app.highlights.map((h, j) => (
                          <li
                            key={h}
                            className="flex items-start gap-2.5 text-[0.9375rem] text-ink-700"
                          >
                            <Tick delay={250 + j * 40} />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row sm:items-center">
                        <a href={app.installUrl} className="btn-primary">
                          Install free on Shopify
                        </a>
                        <Link href={app.href} className="btn-secondary">
                          Learn more
                        </Link>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </StaggerGroup>
            </div>

            <Reveal delay={150}>
              <p className="till mt-12 text-center text-[0.8125rem] text-ink-500">
                All apps install in about 5 minutes · no theme code · {site.supportEmail}
              </p>
            </Reveal>
          </div>
        </section>

        <CtaBand
          headline="Start with one. The others will make sense soon enough."
          body="Order Editing keeps every sale intact and growing; Subscription makes the next one automatic; Product Bundles boosts the size. All three start free, all set up in minutes."
          primaryLabel="Get Order Editing"
          secondaryLabel="See all apps"
          secondaryHref="/apps"
          from="paper"
        />
      </main>
      <Footer />
    </>
  );
}
