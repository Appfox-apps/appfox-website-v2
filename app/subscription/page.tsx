import type { Metadata } from "next";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CtaBand } from "@/components/site/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { getApp } from "@/data/apps";
import { SubscriptionHero } from "@/components/subscription/SubscriptionHero";
import { SubscriptionFeatures } from "@/components/subscription/SubscriptionFeatures";
import { SubscriptionHowItWorks } from "@/components/subscription/SubscriptionHowItWorks";
import { SubscriptionPricing } from "@/components/subscription/SubscriptionPricing";
import { SubscriptionFaq, subscriptionFaqs } from "@/components/subscription/SubscriptionFaq";

const subscriptionApp = getApp("subscription")!;

export const metadata: Metadata = pageMetadata({
  title: "Shopify Subscription App - Recurring Payments, Free for Now",
  description:
    "Subscribe-and-save widgets, auto-renewal billing on Shopify Checkout, and a self-service customer portal. Free for now - formerly Trust Subscriptions.",
  path: "/subscription",
});

const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${site.url}/subscription#app`,
  name: subscriptionApp.name,
  url: `${site.url}/subscription`,
  description: subscriptionApp.description,
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Shopify App",
  operatingSystem: "Web",
  author: { "@id": `${site.url}/#organization` },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  // Sourced from the live App Store listing's public reviews.
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.2",
    ratingCount: 20,
    bestRating: "5",
  },
  featureList: [
    "Customizable subscription widgets and templates",
    "Auto-renewal and recurring billing on Shopify's native checkout",
    "Customer self-service portal: skip, pause, swap, cancel",
    "Subscribe & save discounts, trials, and tiered pricing",
    "Subscription boxes, memberships, replenishment, and digital products",
    "Klaviyo, PageFly, Loyalty Lion, and Shopify Flow integrations",
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${site.url}/subscription#faq`,
  mainEntity: subscriptionFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function SubscriptionPage() {
  return (
    <>
      <JsonLd data={softwareApplicationJsonLd} />
      <JsonLd data={faqJsonLd} />
      <Navbar />
      <main className="flex-1">
        <SubscriptionHero />
        <SubscriptionFeatures />
        <SubscriptionHowItWorks />
        <SubscriptionPricing />
        <SubscriptionFaq />
        <CtaBand
          headline="Recurring revenue, without the recurring admin"
          body="Install free, drop the widget on your product pages, and let auto-renewal do the collecting. Your subscribers manage themselves - you just ship."
          primaryHref={subscriptionApp.installUrl}
          secondaryLabel="Meet Order Editing"
          secondaryHref="/order-editing"
          from="sunken"
        />
      </main>
      <Footer />
    </>
  );
}
