import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CtaBand } from "@/components/site/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";
import { apps } from "@/data/apps";
import { BrandHero } from "@/components/brand/BrandHero";
import { AppShowcase } from "@/components/brand/AppShowcase";
import { WhyAppfox } from "@/components/brand/WhyAppfox";
import { BrandReading } from "@/components/brand/BrandReading";

const appListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${site.url}/#apps`,
  name: "Appfox apps for Shopify",
  itemListElement: apps.map((app, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: app.name,
    url: `${site.url}${app.href}`,
  })),
};

export default function Home() {
  return (
    <>
      <JsonLd data={appListJsonLd} />
      <Navbar />
      <main className="flex-1">
        <BrandHero />
        <AppShowcase />
        <WhyAppfox />
        <BrandReading />
        <CtaBand
          headline="Three apps. One quieter inbox."
          body="Order Editing lets customers fix and grow their own orders; Product Bundles boosts average order value; Subscription brings them back on a schedule. All three start free and set up in about five minutes."
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
