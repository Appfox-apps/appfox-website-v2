"use client";

import { useState, type ReactNode } from "react";
import { InView } from "@/components/ui/InView";

/**
 * Client shell for expand/collapse only. The table itself is passed in as
 * server-rendered children so crawlers see every row (including `more`
 * rows) in the HTML. `html.js` hides extra rows until this sets data-open.
 */
export function CompareMoreShell({
  extraCount,
  sectionTitle,
  footnote,
  className = "",
  children,
}: {
  extraCount: number;
  sectionTitle: string;
  footnote?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <InView threshold={0.05} className={className}>
      <div data-compare-more="" data-open={open || undefined}>
        {children}
      </div>

      {extraCount > 0 ? (
        <button
          type="button"
          className="mt-3 till text-[0.8125rem] font-medium text-brand-700 transition-colors hover:text-brand-800"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open
            ? `Hide extra ${sectionTitle.toLowerCase()} features`
            : `More ${sectionTitle.toLowerCase()} features (${extraCount})`}
        </button>
      ) : null}

      {footnote}
    </InView>
  );
}
