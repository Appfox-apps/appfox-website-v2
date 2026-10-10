import { DrawTick } from "@/components/vs/DrawTick";
import type { CompareCell } from "@/data/bundle-compare";

/**
 * Cell renderer for the multi-competitor table. Separate from
 * `components/vs/ComparisonTable.tsx` so existing /vs pages keep their
 * yes / em-dash / string contract. Extra kinds (partial, via,
 * in_development, planned) live here only.
 *
 * Checks are hand-drawn ticks; misses are an ink-300 em-dash — never a
 * red X. String values use the till mono voice.
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

  if (cell.kind === "yes") {
    return (
      <span className="inline-flex flex-col items-center gap-1">
        <DrawTick className="h-5 w-5 text-success" delay={delay} />
        {cell.label ? (
          <span className={`till text-[0.6875rem] leading-snug ${ink}`}>{cell.label}</span>
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
          <span className="till text-[0.6875rem] leading-snug text-ink-500">{cell.label}</span>
        ) : (
          <span className="sr-only">No</span>
        )}
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

  if (cell.kind === "partial") {
    return (
      <span className={`till text-[0.8125rem] leading-snug ${ink}`}>{cell.label ?? "Partial"}</span>
    );
  }

  if (cell.kind === "via") {
    return (
      <span className={`till text-[0.8125rem] leading-snug ${ink}`}>
        via {cell.label ?? "other"}
      </span>
    );
  }

  return <span className={`till text-[0.8125rem] leading-snug ${ink}`}>{cell.label}</span>;
}
