import type { Metadata } from "next";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Perforation } from "@/components/site/Perforation";
import { site } from "@/lib/site";
import { routeMeta } from "@/lib/seo";

export const metadata: Metadata = routeMeta.privacy;

/** Numbered legal section in the ledger voice. */
function Section({
  no,
  title,
  children,
}: {
  no: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      <h2
        className="flex items-baseline gap-3"
        style={{ fontSize: "1.4375rem", lineHeight: 1.3, letterSpacing: "-0.01em" }}
      >
        <span className="till text-[0.8125rem] text-marigold-700" aria-hidden="true">
          {no}
        </span>
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-[0.9375rem] leading-relaxed text-ink-700">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <>
      {/* TODO(launch): have counsel review before publishing */}
      <Navbar />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-10 pt-32 sm:pt-40 pb-24">
          <p className="till text-[0.8125rem] uppercase tracking-[0.12em] text-marigold-700">
            Legal
          </p>
          <h1 className="mt-3" style={{ fontSize: "clamp(2.25rem, 1.8rem + 2vw, 3.25rem)" }}>
            Privacy policy
          </h1>
          <p className="till mt-4 text-[0.8125rem] uppercase tracking-[0.12em] text-ink-500">
            Last updated: June 9, 2026
          </p>

          <p className="mt-8 text-ink-700 leading-relaxed">
            Appfox (&ldquo;we&rdquo;, &ldquo;us&rdquo;) makes Shopify apps: {site.appName}, which
            lets customers edit their own orders and adds post-purchase upsells, and Appfox
            Subscription, which powers recurring subscriptions. This policy explains what data
            our apps touch, why, and what happens to it. We have tried to keep it in plain
            language - if anything is unclear, email{" "}
            <a className="text-brand-500 underline underline-offset-2" href={`mailto:${site.supportEmail}`}>
              {site.supportEmail}
            </a>
            .
          </p>

          <Section no="01" title="What this policy covers">
            <p>
              This policy covers the Appfox apps installed from the Shopify App Store - the
              customer-facing editing on your store&rsquo;s thank-you and order status pages, the
              subscription widgets and customer portal - and this marketing website. It
              does not cover Shopify itself or other apps you install - those have their own
              policies.
            </p>
          </Section>

          <Section no="02" title="Information we collect from merchants">
            <p>When you install Appfox, we receive from Shopify:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Your store name, store domain, and the email address on the store account.</li>
              <li>Your Shopify plan and store settings needed to configure the app.</li>
              <li>Your Appfox plan, billing status, and app configuration choices.</li>
            </ul>
          </Section>

          <Section no="03" title="Order data we access through the Shopify API">
            <p>
              To power order editing and subscriptions, our apps read and update order data
              through Shopify&rsquo;s APIs. This includes order contents (products, variants,
              quantities, prices), shipping addresses, order status and fulfillment state,
              subscription contracts and billing schedules, and the customer name and email
              attached to an order - used to send edit and renewal confirmations. We access
              only the data each app needs to function, under the API scopes you approve at
              install.
            </p>
          </Section>

          <Section no="04" title="How we use this information">
            <ul className="list-disc pl-5 space-y-1.5">
              <li>To let customers view and edit their orders within the rules you set.</li>
              <li>To let customers manage their subscriptions - skip, pause, swap, or cancel - in the customer portal.</li>
              <li>To run your approval queue, notifications, and integrations you enable.</li>
              <li>To process payment differences, recurring charges, and refunds through Shopify.</li>
              <li>To show you analytics about edits, upsell revenue, and subscriptions in your dashboard.</li>
              <li>To provide support and to operate, secure, and improve the service.</li>
            </ul>
          </Section>

          <Section no="05" title="What we never do">
            <ul className="list-disc pl-5 space-y-1.5">
              <li>We do not sell your data or your customers&rsquo; data. Ever.</li>
              <li>We do not show third-party ads on your storefront or in the edit flow.</li>
              <li>We do not market to your customers or use their data to train models.</li>
              <li>We do not access data beyond the Shopify API scopes you approve.</li>
            </ul>
          </Section>

          <Section no="06" title="Sharing and subprocessors">
            <p>
              We share data only with the service providers required to run Appfox - cloud
              hosting and infrastructure providers, and email delivery for transactional messages
              like edit confirmations. If you connect an optional integration (for example a
              helpdesk or Slack), we share only what that integration needs and only after you
              enable it. We may also disclose data where the law requires it.
            </p>
          </Section>

          <Section no="07" title="Data retention and deletion on uninstall">
            <p>
              When you uninstall Appfox, Shopify notifies us and we delete your store&rsquo;s data
              from our systems within 30 days, except where a short retention period is required
              by law or for billing records. We also honor Shopify&rsquo;s mandatory data-erasure
              requests for individual customers - when a customer asks your store to delete their
              data, the corresponding records held by Appfox are deleted too.
            </p>
          </Section>

          <Section no="08" title="Security">
            <p>
              Data is encrypted in transit and at rest. Customer editing happens on your
              store&rsquo;s own thank-you and order status pages, scoped to that single order -
              no account credentials are exposed. Access to production data is restricted to the
              small set of people who operate the service.
            </p>
          </Section>

          <Section no="09" title="Cookies">
            <p>
              The merchant dashboard uses session cookies required for sign-in inside the Shopify
              admin. The customer editing experience runs on your store&rsquo;s checkout-hosted
              pages and does not set advertising or cross-site tracking cookies. This marketing site does not use
              third-party tracking cookies.
            </p>
          </Section>

          <Section no="10" title="Your rights and your customers' rights">
            <p>
              For your customers&rsquo; data, you are the data controller and Appfox acts as a
              processor - we act on your instructions, given through the app and through
              Shopify&rsquo;s privacy webhooks. If you or your customers exercise rights under
              GDPR, CCPA, or similar laws (access, correction, deletion, portability), we will
              support the request. Start with Shopify&rsquo;s built-in tools, or email us
              directly.
            </p>
          </Section>

          <Section no="11" title="Children">
            <p>
              Appfox is a business tool for merchants and is not directed at children. We do not
              knowingly collect data from anyone under 16, beyond order records your store
              lawfully holds.
            </p>
          </Section>

          <Section no="12" title="Changes and contact">
            <p>
              If we make material changes to this policy, we will update the date at the top and
              notify merchants in the app. Questions, concerns, or data requests:{" "}
              <a className="text-brand-500 underline underline-offset-2" href={`mailto:${site.supportEmail}`}>
                {site.supportEmail}
              </a>
              .
            </p>
          </Section>
        </div>

        {/* Receipt-tear seam into the night footer */}
        <div className="bg-night" aria-hidden="true">
          <Perforation from="paper" />
        </div>
      </main>
      <Footer />
    </>
  );
}
