import Link from "next/link";
import { SectionSlug } from "@/components/site/SectionSlug";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { posts, formatPostDate } from "@/data/posts";

/**
 * NO. 02 - THE LEDGER. Dotted-leader index rows (same grammar as the
 * order-editing page's Further Reading) funneling home link equity into
 * the blog and the comparison hub.
 */

function IndexRow({
  href,
  numeral,
  title,
  action,
}: {
  href: string;
  numeral: string;
  title: string;
  action: string;
}) {
  return (
    <Link href={href} className="group flex items-baseline gap-3 py-4 sm:gap-5 sm:py-5">
      <span
        className="till text-[0.8125rem] text-ink-500 transition-colors duration-200 group-hover:text-marigold-700"
        aria-hidden="true"
      >
        {numeral}
      </span>
      <span className="text-base font-semibold text-ink-900 transition-colors duration-200 group-hover:text-brand-700 sm:text-lg">
        {title}
      </span>
      <span className="leader min-w-8 flex-1 group-hover:border-ink-700" aria-hidden="true" />
      <span
        className="till whitespace-nowrap text-[0.8125rem] text-ink-500 transition-colors duration-200 group-hover:text-ink-900"
        aria-hidden="true"
      >
        {action}{" "}
        <span className="inline-block transition-transform duration-200 group-hover:translate-x-[3px]">
          →
        </span>
      </span>
    </Link>
  );
}

export function BrandReading() {
  const displayedPosts = posts.slice(0, 6);
  const displayedPostsCount = displayedPosts.length;

  return (
    <section>
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-28 lg:px-10">
        <Reveal variant="none">
          <SectionSlug no="02" label="THE LEDGER" caption="Guides, playbooks, and comparisons" />
        </Reveal>
        <Reveal>
          <h2 className="mt-8 max-w-2xl">Worth reading before you install anything.</h2>
        </Reveal>

        <ul className="mt-8 max-w-4xl">
          <StaggerGroup step={60}>
            {displayedPosts.map((p, i) => (
              <Reveal key={p.slug} as="li" index={i}>
                <IndexRow
                  href={`/blog/${p.slug}`}
                  numeral={String(i + 1).padStart(2, "0")}
                  title={p.title}
                  action={formatPostDate(p.date).toUpperCase()}
                />
              </Reveal>
            ))}
            <Reveal as="li" index={displayedPostsCount}>
              <IndexRow
                href="/blog"
                numeral={String(displayedPostsCount + 1).padStart(2, "0")}
                title="View all posts"
                action="VIEW ALL"
              />
            </Reveal>
            <Reveal as="li" index={displayedPostsCount + 1}>
              <IndexRow
                href="/vs"
                numeral={String(displayedPostsCount + 2).padStart(2, "0")}
                title="How Appfox compares to the alternatives"
                action="VIEW ALL"
              />
            </Reveal>
          </StaggerGroup>
        </ul>
      </div>
    </section>
  );
}
