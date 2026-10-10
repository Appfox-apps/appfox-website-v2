import type { Metadata } from "next";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Perforation } from "@/components/site/Perforation";
import { site } from "@/lib/site";
import { routeMeta } from "@/lib/seo";

export const metadata: Metadata = routeMeta.terms;

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

export default function TermsPage() {
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
            Terms of service
          </h1>
          <p className="till mt-4 text-[0.8125rem] uppercase tracking-[0.12em] text-ink-500">
            Last updated: June 9, 2026
          </p>

          <p className="mt-8 text-ink-700 leading-relaxed">
            These terms govern your use of Appfox&rsquo;s Shopify apps - {site.appName}{" "}
            and Appfox Subscription (together &ldquo;Appfox&rdquo;, the &ldquo;service&rdquo;) - and
            the related websites we provide. They are written to be read - if anything is
            unclear, email{" "}
            <a className="text-brand-500 underline underline-offset-2" href={`mailto:${site.supportEmail}`}>
              {site.supportEmail}
            </a>{" "}
            before you rely on it.
          </p>

          <Section no="01" title="Agreement to these terms">
            <p>
              By installing Appfox from the Shopify App Store or using the service, you agree to
              these terms on behalf of the business that operates the store. If you do not agree,
              do not install or use the service.
            </p>
          </Section>

          <Section no="02" title="The service">
            <p>
              Appfox provides self-service order editing for your customers, merchant-side
              controls such as eligibility rules and an approval queue, post-purchase upsells,
              recurring subscriptions with a customer self-service portal, and related analytics
              and integrations. We may improve or change features over time; we will not
              materially reduce the core service you pay for without notice.
            </p>
          </Section>

          <Section no="03" title="Your account">
            <p>
              You need an active Shopify store to use Appfox, and you must have the authority to
              bind that business. You are responsible for the staff accounts you allow into the
              app and for keeping access to your store secure.
            </p>
          </Section>

          <Section no="04" title="License and intellectual property">
            <p>
              We grant you a limited, non-exclusive, non-transferable license to use the service
              for your store&rsquo;s own commerce while these terms are in effect. The service,
              its code, and its branding remain ours. You may not copy, resell, reverse engineer,
              or build a competing service from it. Your store&rsquo;s data remains yours.
            </p>
          </Section>

          <Section no="05" title="Acceptable use">
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Use the service only for lawful commerce on your own store.</li>
              <li>Do not attempt to access other merchants&rsquo; data or probe our systems.</li>
              <li>Do not use the service to send spam or to mislead your customers.</li>
              <li>Do not interfere with the operation or rate limits of the service.</li>
            </ul>
            <p>We may suspend accounts that put other merchants or the service at risk.</p>
          </Section>

          <Section no="06" title="Fees, billing, and trials">
            <p>
              Paid plans are billed through Shopify&rsquo;s billing system on the recurring terms
              shown at checkout, and appear on your Shopify invoice. Free trials convert to the
              selected paid plan unless you cancel or downgrade before the trial ends. Plan
              changes take effect per Shopify&rsquo;s billing rules. Except where required by
              law, fees already billed are non-refundable, though we are reasonable - if
              something went wrong, contact us.
            </p>
          </Section>

          <Section no="07" title="Order edits and your customers">
            <p>
              Appfox executes edits according to the rules you configure - edit windows,
              cutoffs, approval requirements. You remain responsible for your store&rsquo;s own
              policies and legal obligations to your customers, including fulfillment, refunds,
              taxes, and consumer-protection rules in the places you sell. Review your eligibility
              settings; an edit the app correctly applies under your configuration is your
              decision, not ours.
            </p>
          </Section>

          <Section no="08" title="Third-party services">
            <p>
              The service runs on Shopify and uses Shopify&rsquo;s APIs; your use of Shopify is
              governed by Shopify&rsquo;s own terms. Optional integrations (helpdesk, Slack,
              automation tools) are provided by their own vendors under their own terms, and we
              are not responsible for them.
            </p>
          </Section>

          <Section no="09" title="Disclaimers">
            <p>
              The service is provided &ldquo;as is&rdquo; and &ldquo;as available.&rdquo; We do
              not warrant that it will be uninterrupted or error-free, or that any particular
              revenue outcome will result from using it. Statistics on our website describe
              typical usage, not a promise about your store.
            </p>
          </Section>

          <Section no="10" title="Limitation of liability">
            <p>
              To the maximum extent permitted by law, neither party is liable for indirect,
              incidental, or consequential damages, and our total liability arising out of the
              service is capped at the fees you paid us in the twelve months before the claim.
              Nothing in these terms limits liability that cannot be limited by law.
            </p>
          </Section>

          <Section no="11" title="Termination">
            <p>
              You can stop using the service at any time by uninstalling the app from your
              Shopify admin; billing stops per Shopify&rsquo;s billing rules and your data is
              deleted as described in our privacy policy. We may suspend or terminate the service
              for material breach of these terms, with notice where practical.
            </p>
          </Section>

          <Section no="12" title="Governing law">
            <p>
              {/* TODO(launch): counsel to set jurisdiction before publishing */}
              These terms are governed by the laws of the jurisdiction in which Appfox is
              established, without regard to conflict-of-law rules, and disputes will be resolved
              in the courts of that jurisdiction. This section will be finalized with a named
              jurisdiction before launch.
            </p>
          </Section>

          <Section no="13" title="Changes and contact">
            <p>
              We may update these terms as the service evolves. For material changes we will
              update the date above and notify merchants in the app; continued use after a change
              means you accept the new terms. Questions:{" "}
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
