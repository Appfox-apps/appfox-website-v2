import Link from "next/link";
import Image from "next/image";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { SectionSlug } from "@/components/site/SectionSlug";
import {
  subscriptionIntegrations,
  integrationCategories,
  getIntegrationsByCategory,
  type IntegrationEntry,
} from "@/data/subscription-integrations";

/**
 * Subscription Integrations page component - the "Works with" ecosystem.
 * Lists complementary services and native integrations, organized by category.
 * Cards with partner/native app logos and "native" vs "partner" badges.
 */

function IntegrationCard({
  integration,
  index,
}: {
  integration: IntegrationEntry;
  index: number;
}) {
  const CardContent = () => (
    <>
      {integration.logoSrc && (
        <div className="mb-4 flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-ink-900/5">
          <Image
            src={integration.logoSrc}
            alt={`${integration.name} logo`}
            width={64}
            height={64}
            className="h-full w-full object-contain p-2"
          />
        </div>
      )}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-ink-900">{integration.name}</h3>
        <span
          className={`shrink-0 rounded-md px-2 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-wide ${
            integration.type === "native"
              ? "bg-brand-100 text-brand-700"
              : "bg-paper-sunken text-ink-500"
          }`}
        >
          {integration.type === "native" ? "Native" : "Works with"}
        </span>
      </div>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">
        {integration.description}
      </p>
      {integration.href && (
        <p className="mt-auto pt-4 text-sm font-medium text-brand-700">
          Learn more →
        </p>
      )}
    </>
  );

  return (
    <Reveal index={index} className="h-full" as="li">
      {integration.href ? (
        <Link
          href={integration.href}
          target={integration.href.startsWith("http") ? "_blank" : undefined}
          rel={integration.href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="card lift hover:border-brand-300 transition-all flex h-full flex-col p-5 sm:p-6"
        >
          <CardContent />
        </Link>
      ) : (
        <div className="card flex h-full flex-col p-5 sm:p-6">
          <CardContent />
        </div>
      )}
    </Reveal>
  );
}

function CategorySection({ categorySlug, index }: { categorySlug: string; index: number }) {
  const category = integrationCategories.find((c) => c.slug === categorySlug);
  const integrations = getIntegrationsByCategory(categorySlug);

  if (!category || integrations.length === 0) return null;

  return (
    <div className="space-y-8">
      <Reveal delay={index * 100}>
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold text-ink-900">{category.name}</h3>
          <p className="text-base text-ink-500">{category.description}</p>
        </div>
      </Reveal>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <StaggerGroup step={80}>
          {integrations.map((integration, i) => (
            <IntegrationCard key={integration.slug} integration={integration} index={i} />
          ))}
        </StaggerGroup>
      </ul>
    </div>
  );
}

export function SubscriptionIntegrations() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <Reveal variant="none">
          <SectionSlug
            no="02"
            label="INTEGRATIONS"
            caption="Works with the tools you already run"
          />
        </Reveal>
        <Reveal>
          <h2 className="mt-8 max-w-3xl">Subscriptions that plug into your stack.</h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-500">
            AppFox Subscription connects to your marketing, loyalty, and automation tools - native
            integrations where they matter, Shopify-compatible everywhere else. No subscription
            lives alone.
          </p>
        </Reveal>

        <div className="mt-16 space-y-16 sm:mt-20 sm:space-y-20">
          {integrationCategories.map((category, index) => (
            <CategorySection key={category.slug} categorySlug={category.slug} index={index} />
          ))}
        </div>

        {/* Call to action - link back to main subscription page */}
        <Reveal delay={120}>
          <div className="card mt-16 p-8 text-center sm:mt-20 sm:p-10">
            <h3 className="text-2xl font-semibold text-ink-900">
              Ready to build your subscription stack?
            </h3>
            <p className="mt-3 text-base text-ink-600">
              Install AppFox Subscription free and connect the tools that matter to your business.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="https://apps.shopify.com/appfox-subscriptions"
                className="btn-primary"
              >
                Install free
              </a>
              <Link href="/subscription" className="btn-secondary">
                Back to Subscription
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
