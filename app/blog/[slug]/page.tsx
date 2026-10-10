import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CtaBand } from "@/components/site/CtaBand";
import { SectionSlug } from "@/components/site/SectionSlug";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { PostBody } from "@/components/blog/PostBody";
import { posts, getPost, readingMinutes, formatPostDate } from "@/data/posts";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const path = `/blog/${post.slug}`;
  return {
    // metaTitle is a full headline - skip the "| Appfox" template
    title: { absolute: post.metaTitle },
    description: post.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: path,
      type: "article",
      publishedTime: post.date,
    },
  };
}

/** Up to `count` other posts, in published order, excluding the current one. */
function relatedPosts(currentSlug: string, count = 2) {
  return posts.filter((p) => p.slug !== currentSlug).slice(0, count);
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const path = `/blog/${post.slug}`;
  const pageUrl = `${site.url}${path}`;
  const related = relatedPosts(post.slug);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
      // Last item: current page - no "item" property per Google's guidelines
      { "@type": "ListItem", position: 3, name: post.title },
    ],
  };

  const postLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${pageUrl}#post`,
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    url: pageUrl,
    mainEntityOfPage: pageUrl,
    author: { "@type": "Organization", name: post.author, url: site.url },
    publisher: { "@id": `${site.url}/#organization` },
  };

  return (
    <>
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={postLd} />
      <Navbar />
      <main className="flex-1">
        {/* ── Compact cream hero ───────────────────────────── */}
        <section className="paper-wash grain grain-soft relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 pt-28 pb-12 sm:px-8 sm:pt-32 sm:pb-16 lg:px-10">
            {/* Visible breadcrumb - mirrors the BreadcrumbList JSON-LD */}
            <nav aria-label="Breadcrumb" className="enter-fade-rise" style={{ animationDelay: "60ms" }}>
              <ol className="till flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8125rem] text-ink-500">
                <li>
                  <Link href="/" className="transition-colors hover:text-brand-700">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="text-ink-300">
                  /
                </li>
                <li>
                  <Link href="/blog" className="transition-colors hover:text-brand-700">
                    Blog
                  </Link>
                </li>
              </ol>
            </nav>

            <p
              className="enter-fade-rise till mt-5 flex items-center gap-2.5 text-[0.75rem] uppercase tracking-[0.14em] text-marigold-700"
              style={{ animationDelay: "100ms" }}
            >
              {post.category}
              <span aria-hidden="true" className="text-ink-300">
                ·
              </span>
              <span className="normal-case tracking-normal text-ink-500">
                {readingMinutes(post)} min read
              </span>
            </p>

            <h1 className="enter-rise mt-3 max-w-4xl">{post.title}</h1>

            <p
              className="enter-fade-rise till mt-6 text-[0.8125rem] text-ink-500"
              style={{ animationDelay: "180ms" }}
            >
              {post.author} · {formatPostDate(post.date)}
            </p>
          </div>
        </section>

        {/* ── Article body ─────────────────────────────────── */}
        <section className="pb-16 sm:pb-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <Reveal>
              <article className="pt-12 sm:pt-16">
                <PostBody blocks={post.body} />
              </article>
            </Reveal>

            <Reveal delay={80}>
              <p className="mt-14 max-w-[68ch] border-t border-paper-edge pt-6 text-ink-700">
                Appfox lets Shopify customers fix their own orders - addresses, sizes,
                cancellations - right on your thank-you and order status pages, with one-click
                upsells built in.{" "}
                <Link
                  href="/features/order-editing"
                  className="font-medium text-brand-600 underline decoration-brand-200 decoration-2 underline-offset-[3px] transition-colors hover:text-brand-700 hover:decoration-brand-300"
                >
                  See how it works
                </Link>
                .
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── Keep reading ─────────────────────────────────── */}
        {related.length > 0 ? (
          <section className="pb-16 sm:pb-24">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
              <Reveal variant="none">
                <SectionSlug no="02" label="KEEP READING" />
              </Reveal>
              <h2 className="sr-only">Related posts</h2>

              <StaggerGroup step={70}>
                <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                  {related.map((p, i) => (
                    <Reveal key={p.slug} as="li" index={i} className="h-full">
                      <Link
                        href={`/blog/${p.slug}`}
                        className="group card lift flex h-full flex-col p-6 sm:p-7"
                      >
                        <span className="till text-[0.6875rem] uppercase tracking-[0.14em] text-marigold-700">
                          {p.category}
                        </span>
                        <h3 className="mt-3 text-[1.25rem] leading-snug text-ink-900 transition-colors duration-200 group-hover:text-brand-700">
                          {p.title}
                        </h3>
                        <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-700">
                          {p.excerpt}
                        </p>
                        <span className="till mt-auto pt-6 text-[0.8125rem] font-semibold text-brand-600">
                          Read →
                        </span>
                      </Link>
                    </Reveal>
                  ))}
                </ul>
              </StaggerGroup>
            </div>
          </section>
        ) : null}

        {/* Final CTA - previous section is light paper */}
        <CtaBand
          headline="Let customers edit their own orders"
          body="Free plan up to 50 edits per month. 5-minute setup. No card required."
          secondaryLabel="Compare plans"
          secondaryHref="/pricing/order-editing"
          from="paper"
        />
      </main>
      <Footer />
    </>
  );
}
