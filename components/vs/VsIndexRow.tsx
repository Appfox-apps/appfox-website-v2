import Link from "next/link";

/**
 * "Appfox vs {shortName}" title with the "vs" set as the single italic
 * display word in marigold - the h1 pattern of every /vs page, reused
 * at index-row scale.
 */
export function VsTitle({ shortName }: { shortName: string }) {
  return (
    <>
      Appfox <span className="wonk text-marigold-700">vs</span> {shortName}
    </>
  );
}

/**
 * Ruled editorial index row (magazine contents page): mono numeral,
 * display title, optional category chip, dotted leader stretching to a
 * mono action, optional supporting sentence beneath. The whole row is
 * the link.
 */
export function VsIndexRow({
  href,
  numeral,
  title,
  category,
  framing,
  action = "READ",
}: {
  href: string;
  numeral: string;
  title: React.ReactNode;
  category?: string;
  framing?: string;
  action?: string;
}) {
  return (
    <Link href={href} className="group grid gap-x-4 py-6 sm:grid-cols-[3rem_1fr] sm:py-7">
      {/* Numeral column (collapses inline on mobile) */}
      <span
        className="till hidden pt-[0.4em] text-[0.8125rem] text-ink-500 transition-colors duration-200 group-hover:text-marigold-700 sm:block"
        aria-hidden="true"
      >
        {numeral}
      </span>

      <span className="block min-w-0">
        <span className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <span
            className="till text-[0.8125rem] text-ink-500 transition-colors duration-200 group-hover:text-marigold-700 sm:hidden"
            aria-hidden="true"
          >
            {numeral}
          </span>
          <span className="font-display text-[1.25rem] font-[560] tracking-[-0.01em] text-ink-900 transition-colors duration-200 group-hover:text-brand-700 sm:text-[1.375rem]">
            {title}
          </span>
          {category ? (
            <span className="chip border border-paper-edge bg-paper-raised text-ink-500">
              {category}
            </span>
          ) : null}
          {/* Dotted leader on the text baseline, running out to the action */}
          <span
            className="leader hidden min-w-8 flex-1 group-hover:border-ink-700 sm:block"
            aria-hidden="true"
          />
          <span className="till ml-auto whitespace-nowrap text-[0.8125rem] text-ink-500 transition-colors duration-200 group-hover:text-ink-900 sm:ml-0">
            {action}{" "}
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-[3px]">
              →
            </span>
          </span>
        </span>

        {framing ? (
          <span className="mt-2.5 block max-w-[72ch] text-[0.9375rem] leading-relaxed text-ink-500">
            {framing}
          </span>
        ) : null}
      </span>
    </Link>
  );
}
