import type { Metadata } from "next";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CtaBand } from "@/components/site/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { getApp } from "@/data/apps";
import { BundlesHero } from "@/components/bundles/BundlesHero";
import { BundlesFeatures } from "@/components/bundles/BundlesFeatures";
import { BundlesHowItWorks } from "@/components/bundles/BundlesHowItWorks";
import { BundlesPricing } from "@/components/bundles/BundlesPricing";
import { BundlesFaq, bundlesFaqs } from "@/components/bundles/BundlesFaq";
import { BundlesCompare } from "@/components/bundles/BundlesCompare";

const bundlesApp = getApp("product-bundles")!;

export const metadata: Metadata = pageMetadata({
  title: "Shopify Product Bundles App - Boost AOV with Bundle Offers",
  description:
    "Create unlimited product bundles, volume discounts, BOGO offers, and mix-and-match deals. Theme-friendly widgets, easy setup. Free to start.",
  path: "/product-bundles",
});

const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${site.url}/product-bundles#app`,
  name: bundlesApp.name,
  url: `${site.url}/product-bundles`,
  description: bundlesApp.description,
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Shopify App",
  operatingSystem: "Web",
  author: { "@id": `${site.url}/#organization` },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Unlimited product bundles with custom discounts",
    "Automatic bundle discounts: percentage, fixed amount, or tiered pricing",
    "Mix-and-match bundles from selected items",
    "Quantity breaks and volume discounts",
    "BOGO and Buy X Get Y offers",
    "Fixed and curated product bundles",
    "Responsive, theme-integrated widgets (Shopify 2.0 app blocks)",
    "Bundle performance and sales analytics",
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${site.url}/product-bundles#faq`,
  mainEntity: bundlesFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function ProductBundlesPage() {
  return (
    <>
      <JsonLd data={softwareApplicationJsonLd} />
      <JsonLd data={faqJsonLd} />
      <Navbar />
      <main className="flex-1">
        <BundlesHero />
        <BundlesFeatures />
        <BundlesHowItWorks />
        <BundlesPricing />
        <BundlesFaq />
        <BundlesCompare />
        <CtaBand
          headline="Turn one item into three, and three into five"
          body="Install AppFox Product Bundles, create your first bundle, and watch your average order value climb. Setup takes about 5 minutes. The free plan never expires."
          primaryHref={bundlesApp.installUrl}
          secondaryLabel="Compare alternatives"
          secondaryHref="/product-bundles/compare"
          from="paper"
        />
      </main>
      <Footer />
    </>
  );
}
