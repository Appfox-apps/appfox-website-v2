"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppFoxMark } from "@/components/brand/marks";
import { site } from "@/lib/site";
import { competitorsForApp } from "@/data/competitors";
import { apps } from "@/data/apps";
import { Wordmark } from "./Wordmark";

const NAV_LINKS = [{ label: "Blog", href: "/blog" }];

const FEATURES_LINKS = [
  { label: "Order Editing & Upsell", detail: "Self-service edits + upsells", href: "/features/order-editing" },
  { label: "Subscription", detail: "Recurring billing + portal", href: "/features/subscription" },
  { label: "Product Bundles", detail: "Bundle offers + volume discounts", href: "/features/product-bundles" },
];

const HOW_IT_WORKS_LINKS = [
  { label: "Order Editing & Upsell", detail: "Confirmation email → settled edit", href: "/order-editing#how-it-works" },
  { label: "Subscription", detail: "Product page → renewal", href: "/subscription#how-it-works" },
  { label: "Product Bundles", detail: "Create bundle → boost AOV", href: "/product-bundles#how-it-works" },
];

const FAQ_LINKS = [
  { label: "Order Editing & Upsell", detail: "Edits, approvals & upsells", href: "/order-editing#faq" },
  { label: "Subscription", detail: "Billing, portal & migration", href: "/subscription#faq" },
  { label: "Product Bundles", detail: "Bundle types, pricing & setup", href: "/product-bundles#faq" },
];

const PRICING_LINKS = [
  { label: "Order Editing & Upsell", detail: "Free plan · paid from $19/mo", href: "/pricing/order-editing" },
  { label: "Subscription", detail: "Free for now · every feature", href: "/pricing/subscription" },
  { label: "Product Bundles", detail: "Free to start", href: "/pricing/product-bundles" },
];

const COMPARE_GROUPS = [
  { label: "Order Editing & Upsell", competitors: competitorsForApp("order-editing") },
  { label: "Subscription", competitors: competitorsForApp("subscription") },
  { label: "Product Bundles", competitors: competitorsForApp("product-bundles") },
];

/** Routes whose install CTA should point at AppFox Subscription. */
const SUBSCRIPTION_PATHS = new Set([
  "/subscription",
  "/features/subscription",
  "/pricing/subscription",
  ...competitorsForApp("subscription").map((c) => `/vs/${c.slug}`),
]);

/** Routes whose install CTA should point at AppFox Product Bundles. */
const BUNDLES_PATHS = new Set([
  "/product-bundles",
  "/features/product-bundles",
  "/pricing/product-bundles",
  ...competitorsForApp("product-bundles").map((c) => `/vs/${c.slug}`),
]);

/** The navbar install CTA follows the app the visitor is reading about. */
function installUrlForPath(pathname: string): string {
  const subscriptionApp = apps.find((a) => a.slug === "subscription");
  const bundlesApp = apps.find((a) => a.slug === "product-bundles");
  if (subscriptionApp && SUBSCRIPTION_PATHS.has(pathname)) return subscriptionApp.installUrl;
  if (bundlesApp && BUNDLES_PATHS.has(pathname)) return bundlesApp.installUrl;
  return site.installUrl;
}

export function NavbarBrutalist() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const installUrl = installUrlForPath(usePathname() ?? "/");

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navLink =
    "till inline-flex items-center gap-1 text-[0.75rem] font-bold uppercase tracking-[0.14em] text-cream-on-night hover:text-marigold-500 transition-colors duration-150";

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 h-[72px] border-b-4 border-marigold-500 bg-ink-900 text-cream-on-night">
        <nav
          className="mx-auto flex h-full max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-10"
          aria-label="Main"
        >
          <Link
            href="/"
            aria-label="AppFox home"
            onClick={() => setMobileOpen(false)}
            className="mr-auto flex items-center gap-2.5"
          >
            <AppFoxMark className="h-7 w-7 shrink-0" />
            <Wordmark onNight className="text-lg" />
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <div className="group relative">
              <Link href="/apps" className={navLink} aria-haspopup="true">
                Apps
                <svg
                  aria-hidden="true"
                  className="h-3 w-3 transition-transform duration-150 group-hover:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path strokeLinecap="square" strokeLinejoin="miter" d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              <div className="invisible absolute left-0 top-full pt-3 opacity-0 translate-y-1 transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <div className="w-72 border-[3px] border-ink-900 bg-paper-raised p-2 text-ink-900 shadow-(--shadow-raised)">
                  {apps.map((app) => (
                    <Link
                      key={app.slug}
                      href={app.href}
                      className="flex flex-col gap-0.5 px-3 py-2.5 hover:bg-marigold-500"
                    >
                      <span className="text-sm font-bold text-ink-900">{app.shortName}</span>
                      <span className="till text-xs text-ink-500">{app.tagline}</span>
                    </Link>
                  ))}
                  <div className="mt-1 border-t-2 border-ink-900 pt-1">
                    <Link
                      href="/apps"
                      className="till flex px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-ink-900 hover:bg-marigold-500"
                    >
                      All apps →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/pricing" className={navLink}>
              Pricing
            </Link>

            <Link href="/blog" className={navLink}>
              Blog
            </Link>
          </div>

          <div className="hidden items-center md:flex">
            <a href={installUrl} className="btn-marigold !px-4 !py-2 !text-xs">
              Install free
            </a>
          </div>

          <button
            className="p-2 text-cream-on-night md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <div className="flex h-5 w-6 flex-col justify-between">
              <span
                className={`block h-1 w-full bg-current transition-transform duration-150 ${
                  mobileOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-1 w-full bg-current transition-opacity duration-150 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-1 w-full bg-current transition-transform duration-150 ${
                  mobileOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </nav>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-paper text-ink-900 md:hidden">
          <nav className="flex h-full flex-col px-6 pt-24" aria-label="Mobile">
            {[
              { label: "Apps", href: "/apps" },
              { label: "Features", href: "/features" },
              { label: "Pricing", href: "/pricing" },
              { label: "Blog", href: "/blog" },
              { label: "Compare", href: "/vs" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="border-b-[3px] border-ink-900 py-4 font-display text-4xl font-extrabold tracking-tight text-ink-900"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-8 flex flex-col gap-4">
              <a href={installUrl} className="btn-primary" onClick={() => setMobileOpen(false)}>
                Install free
              </a>
              <a
                href={`mailto:${site.supportEmail}`}
                className="till text-center text-sm font-medium text-ink-700"
              >
                {site.supportEmail}
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
