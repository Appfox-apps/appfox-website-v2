import { DrawTick } from "@/components/vs/DrawTick";
import { UNCLEAR_NOTE, type CompareCell } from "@/data/bundle-compare";

/**
 * Cell renderer for the multi-competitor table. Separate from
 * `components/vs/ComparisonTable.tsx` so existing /vs pages keep their
 * yes / em-dash / string contract. Extra kinds (partial, via, unclear,
 * in_development, planned) live here only.
 *
 * Marks match ComparisonTable: hand-drawn ticks, ink-300 em-dash (never
 * a red X), and `.till` mono at 0.875rem for any written value.
 */
export function CompareCellValue({
  cell,
  highlight = false,
  delay = 0,
}: {
  cell: CompareCell | undefined;
  highlight?: boolean;
  delay?: number;
}) {
  if (!cell) {
    return (
      <>
        <span aria-hidden="true" className="text-ink-300">
          -
        </span>
        <span className="sr-only">Not specified</span>
      </>
    );
  }

  const ink = highlight ? "text-brand-900" : "text-ink-700";
  const written = `till text-[0.875rem] leading-snug ${ink}`;

  if (cell.kind === "yes") {
    return (
      <span className="inline-flex flex-col items-center gap-1">
        <DrawTick className="h-5 w-5 text-success" delay={delay} />
        {cell.label ? (
          <span className={written}>{cell.label}</span>
        ) : (
          <span className="sr-only">Yes</span>
        )}
      </span>
    );
  }

  if (cell.kind === "no") {
    return (
      <span className="inline-flex flex-col items-center gap-1">
        <span aria-hidden="true" className="text-ink-300">
          -
        </span>
        {cell.label ? (
          <span className="till text-[0.875rem] leading-snug text-ink-500">{cell.label}</span>
        ) : (
          <span className="sr-only">No</span>
        )}
      </span>
    );
  }

  if (cell.kind === "unclear") {
    return (
      <span
        className="inline-flex cursor-help flex-col items-center"
        title={UNCLEAR_NOTE}
      >
        <span aria-hidden="true" className="till text-[0.875rem] leading-none text-ink-500">
          ?
        </span>
        <span className="sr-only">Unclear. {UNCLEAR_NOTE}</span>
      </span>
    );
  }

  if (cell.kind === "in_development") {
    return (
      <span className="chip border border-brand-200 bg-brand-50 text-brand-700">
        In development
      </span>
    );
  }

  if (cell.kind === "planned") {
    return (
      <span className="chip border border-paper-edge bg-paper-sunken text-ink-500">Planned</span>
    );
  }

  if (cell.kind === "via") {
    return (
      <span className={written}>via {cell.label ?? "other"}</span>
    );
  }

  return <span className={written}>{cell.label ?? "Partial"}</span>;
}
