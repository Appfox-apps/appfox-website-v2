import type { Metadata } from "next";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CtaBand } from "@/components/site/CtaBand";
import { SectionSlug } from "@/components/site/SectionSlug";
import { JsonLd } from "@/components/seo/JsonLd";
import { BlogSearch } from "@/components/blog/BlogSearch";
import { Reveal } from "@/components/ui/Reveal";
import { posts, readingMinutes, formatPostDate } from "@/data/posts";
import { routeMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = routeMeta.blog;

/**
 * /blog - editorial index. Compact cream hero, then a card grid of posts
 * (newest first, ordered by data/posts.ts), then the CTA band. Light
 * throughout until the band's perforation. Blog/CollectionPage JSON-LD
 * lists the posts so each is discoverable as a BlogPosting.
 */
export default function BlogIndexPage() {
  const searchablePosts = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    date: post.date,
    formattedDate: formatPostDate(post.date),
    readingMinutes: readingMinutes(post),
  }));

  const blogLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${site.url}/blog#blog`,
    name: "Appfox Blog",
    url: `${site.url}/blog`,
    publisher: { "@id": `${site.url}/#organization` },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      "@id": `${site.url}/blog/${p.slug}#post`,
      headline: p.title,
      description: p.excerpt,
      datePublished: p.date,
      url: `${site.url}/blog/${p.slug}`,
      author: { "@type": "Organization", name: p.author },
    })),
  };

  return (
    <>
      <JsonLd data={blogLd} />
      <Navbar />
      <main className="flex-1">
        {/* ── Hero - compact cream ─────────────────────────── */}
        <section className="paper-wash grain grain-soft relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 pt-28 pb-12 sm:px-8 sm:pt-36 sm:pb-16 lg:px-10">
            <p
              className="enter-fade-rise till text-[0.8125rem] uppercase tracking-[0.14em] text-marigold-700"
              style={{ animationDelay: "60ms" }}
            >
              Blog
            </p>
            <h1 className="enter-rise mt-4 max-w-3xl">
              Notes on order editing, subscriptions, and product bundles
            </h1>
            <p
              className="enter-fade-rise mt-6 max-w-[68ch] text-lg leading-relaxed text-ink-700"
              style={{ animationDelay: "140ms" }}
            >
              Practical guides for Shopify merchants - helping customers fix orders, building
              recurring revenue with subscriptions, and growing order value with product bundles.
            </p>
          </div>
        </section>

        {/* ── The index - card grid ────────────────────────── */}
        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <Reveal variant="none">
              <SectionSlug no="01" label="LATEST" caption="Newest first." />
            </Reveal>
            <BlogSearch posts={searchablePosts} />
          </div>
        </section>

        {/* CTA band - previous section is light paper */}
        <CtaBand
          headline="Stop answering “can I change my order?” by hand"
          body="Let customers fix their own orders, keep your Shopify fees, and grow the order on the way out. Five-minute setup. The free plan never expires."
          secondaryLabel="See how it works"
          secondaryHref="/order-editing#how-it-works"
          from="paper"
        />
      </main>
      <Footer />
    </>
  );
}
