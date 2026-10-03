"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
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

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const installUrl = installUrlForPath(usePathname() ?? "/");

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Floating island navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="mx-auto mt-6 w-max max-w-[calc(100vw-3rem)] pointer-events-auto">
          <nav
            className="flex items-center gap-6 rounded-full border border-paper-edge bg-[rgba(245,243,250,0.85)] backdrop-blur-xl backdrop-saturate-[1.4] px-4 py-3 shadow-(--shadow-raised)"
            aria-label="Main"
          >
            {/* Logo */}
            <Link
              href="/"
              aria-label="AppFox home"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2.5"
            >
              <Image
                src="/images/brand/appfox-icon.png"
                alt="AppFox"
                width={28}
                height={28}
                className="rounded-lg"
              />
              <Wordmark className="text-lg hidden sm:block" />
            </Link>

            {/* Desktop nav links - simplified for island */}
            <div className="hidden md:flex items-center gap-4">
              <div className="relative group">
                <Link
                  href="/apps"
                  className="inline-flex items-center gap-1 text-sm font-medium text-ink-700 hover:text-brand-700 transition-colors duration-700"
                  aria-haspopup="true"
                >
                  Apps
                  <svg
                    aria-hidden="true"
                    className="w-3 h-3 transition-transform duration-700 group-hover:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 transition-all duration-700">
                  <div className="card w-72 p-2 shadow-(--shadow-raised)">
                    {apps.map((app) => (
                      <Link
                        key={app.slug}
                        href={app.href}
                        className="flex flex-col gap-0.5 px-3 py-2.5 rounded-lg hover:bg-brand-50 transition-colors duration-700"
                      >
                        <span className="text-sm font-medium text-ink-900">{app.shortName}</span>
                        <span className="till text-xs text-ink-500">{app.tagline}</span>
                      </Link>
                    ))}
                    <div className="border-t border-paper-edge mt-1 pt-1">
                      <Link
                        href="/apps"
                        className="flex px-3 py-2 rounded-lg text-sm font-semibold text-brand-700 hover:bg-brand-50 transition-colors duration-700"
                      >
                        All apps →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="/pricing"
                className="text-sm font-medium text-ink-700 hover:text-brand-700 transition-colors duration-700"
              >
                Pricing
              </Link>

              <Link
                href="/blog"
                className="text-sm font-medium text-ink-700 hover:text-brand-700 transition-colors duration-700"
              >
                Blog
              </Link>
            </div>

            {/* CTA button */}
            <div className="hidden md:flex items-center">
              <a href={installUrl} className="btn-primary !px-4 !py-2 !text-sm">
                Install free
              </a>
            </div>
            {/* Mobile toggle - animated hamburger */}
            <button
              className="md:hidden p-2 -mr-2 text-ink-900"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span
                  className={`block h-0.5 w-full bg-current rounded-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    mobileOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-full bg-current rounded-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    mobileOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-full bg-current rounded-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    mobileOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile menu - full-screen overlay with backdrop blur */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-3xl">
          <nav className="flex flex-col items-center justify-center h-full px-6" aria-label="Mobile">
            {[
              { label: "Apps", href: "/apps" },
              { label: "Features", href: "/features" },
              { label: "Pricing", href: "/pricing" },
              { label: "Blog", href: "/blog" },
              { label: "Compare", href: "/vs" },
            ].map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="enter-fade-rise font-display font-semibold text-5xl text-white py-4 opacity-0"
                style={{
                  animationDelay: `${i * 60}ms`,
                  animation: "enter-fade-rise 800ms var(--ease-out-soft) both",
                }}
              >
                {link.label}
              </Link>
            ))}
            <div
              className="mt-8 flex flex-col gap-4 opacity-0"
              style={{
                animationDelay: "300ms",
                animation: "enter-fade-rise 800ms var(--ease-out-soft) both",
              }}
            >
              <a href={installUrl} className="btn-primary" onClick={() => setMobileOpen(false)}>
                Install free
              </a>
              <a
                href={`mailto:${site.supportEmail}`}
                className="text-center text-sm font-medium text-white/70"
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
