import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CtaBand } from "@/components/site/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";
import { publicApps } from "@/data/apps";
import { countWord, isAppPublic } from "@/lib/visibility";
import { BrandHero } from "@/components/brand/BrandHero";
import { AppShowcase } from "@/components/brand/AppShowcase";
import { WhyAppfox } from "@/components/brand/WhyAppfox";
import { BrandReading } from "@/components/brand/BrandReading";

const appListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${site.url}/#apps`,
  name: "Appfox apps for Shopify",
  itemListElement: publicApps.map((app, i) => ({
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
          headline={
            isAppPublic("order-editing")
              ? "Three apps. One quieter inbox."
              : `${countWord(publicApps.length, true)} apps. One quieter inbox.`
          }
          body={
            isAppPublic("order-editing")
              ? "Order Editing lets customers fix and grow their own orders; Product Bundles boosts average order value; Subscription brings them back on a schedule. All three start free and set up in about five minutes."
              : "Product Bundles boosts average order value; Subscription brings customers back on a schedule. Both start free and set up in about five minutes."
          }
          primaryLabel={isAppPublic("order-editing") ? "Get Order Editing" : "See the apps"}
          primaryHref={isAppPublic("order-editing") ? undefined : "/apps"}
          secondaryLabel={isAppPublic("order-editing") ? "See all apps" : "See pricing"}
          secondaryHref={isAppPublic("order-editing") ? "/apps" : "/pricing"}
          from="paper"
        />
      </main>
      <Footer />
    </>
  );
}
