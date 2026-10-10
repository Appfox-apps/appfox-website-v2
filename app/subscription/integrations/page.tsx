import type { Metadata } from "next";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CtaBand } from "@/components/site/CtaBand";
import { pageMetadata } from "@/lib/seo";
import { getApp } from "@/data/apps";
import { SubscriptionIntegrations } from "@/components/subscription/SubscriptionIntegrations";

const subscriptionApp = getApp("subscription")!;

export const metadata: Metadata = pageMetadata({
  title: "Appfox Subscription Integrations - Works with Klaviyo, Flow & More",
  description:
    "Appfox Subscription integrates with Klaviyo, LoyaltyLion, Shopify Flow, PageFly, and more. Connect subscriptions to your marketing, loyalty, and automation stack.",
  path: "/subscription/integrations",
});

export default function SubscriptionIntegrationsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <SubscriptionIntegrations />
        <CtaBand
          headline="Ready to connect your subscription stack?"
          body="Install Appfox Subscription free and start integrating with the tools that power your business - from Klaviyo campaigns to Shopify Flow automations."
          primaryHref={subscriptionApp.installUrl}
          secondaryLabel="View pricing"
          secondaryHref="/pricing/subscription"
          from="paper"
        />
      </main>
      <Footer />
    </>
  );
}
