import { InView } from "@/components/ui/InView";
import { Wordmark } from "@/components/site/Wordmark";
import { site } from "@/lib/site";
import type { Competitor } from "@/data/competitors";
import { DrawTick } from "./DrawTick";

/**
 * §8 comparison table. Desktop (md+): a single ledger card with a sticky
 * cream-glass header row pinned beneath the condensed navbar (60px); the
 * AppFox column is tinted brand-50 with brand-200 side rails. Below md the
 * same data renders as stacked per-feature cards, AppFox value first -
 * both variants are server-rendered and toggled with responsive classes.
 *
 * Checks are hand-drawn ticks (`.draw-path`, staggered per row); competitor
 * misses are an ink-300 em-dash - never a red X. String values are mono.
 *
 * Note: the card wrapper uses `overflow-clip` (not `overflow-hidden`) so the
 * rounded corners still clip without creating a scroll container, which
 * would defeat `position: sticky` on the header row.
 */

function CellValue({
  value,
  tone,
  center = false,
  delay = 0,
}: {
  value: string | true | false;
  tone: "appfox" | "competitor";
  center?: boolean;
  delay?: number;
}) {
  if (value === true) {
    return (
      <>
        <DrawTick className={`h-5 w-5 text-success ${center ? "mx-auto" : ""}`} delay={delay} />
        <span className="sr-only">Yes</span>
      </>
    );
  }
  if (value === false) {
    return (
      <>
        <span aria-hidden="true" className="text-ink-300">
          -
        </span>
        <span className="sr-only">No</span>
      </>
    );
  }
  return (
    <span
      className={`till text-[0.875rem] leading-snug ${
        tone === "appfox" ? "text-brand-900" : "text-ink-700"
      }`}
    >
      {value}
    </span>
  );
}

export function ComparisonTable({
  competitor,
  className = "",
}: {
  competitor: Competitor;
  className?: string;
}) {
  const rows = competitor.comparison;
  const stickyTh = "sticky top-[60px] z-10 py-4 backdrop-blur-[10px]";

  return (
    <InView threshold={0.05} className={className}>
      {/* ── Desktop: ledger table ─────────────────────────── */}
      <div className="card hidden overflow-clip md:block">
        <table className="w-full border-separate border-spacing-0 text-left">
          <caption className="sr-only">
            Feature comparison between AppFox and {competitor.shortName}
          </caption>
          <thead>
            <tr>
              <th
                scope="col"
                className={`${stickyTh} border-b border-paper-edge bg-paper/85 px-5 text-left lg:px-7`}
              >
                <span className="till text-[0.75rem] font-medium uppercase tracking-[0.14em] text-ink-500">
                  Feature
                </span>
              </th>
              <th
                scope="col"
                className={`${stickyTh} w-[26%] border-x border-b border-x-brand-200 border-b-brand-200 bg-brand-50/90 px-4 text-center`}
              >
                <span className="flex flex-col items-center gap-1.5">
                  <Wordmark className="text-[1.125rem]" />
                  <span className="chip till border border-brand-200 bg-paper-raised text-[0.75rem] text-brand-700">
                    From ${site.pricing.free.price}/mo
                  </span>
                </span>
              </th>
              <th
                scope="col"
                className={`${stickyTh} w-[26%] border-b border-paper-edge bg-paper/85 px-4 text-center`}
              >
                <span className="text-[1.0625rem] font-semibold text-ink-700">
                  {competitor.shortName}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.feature} className="transition-colors duration-150 hover:bg-paper-sunken">
                <th
                  scope="row"
                  className={`px-5 py-3.5 text-left text-[0.9375rem] font-normal text-ink-700 lg:px-7 ${
                    i > 0 ? "border-t border-paper-edge" : ""
                  }`}
                >
                  {row.feature}
                </th>
                <td
                  className={`border-x border-x-brand-200 bg-brand-50 px-4 py-3.5 text-center ${
                    i > 0 ? "border-t border-t-brand-200/50" : ""
                  }`}
                >
                  <CellValue value={row.appfox} tone="appfox" center delay={i * 45} />
                </td>
                <td
                  className={`px-4 py-3.5 text-center ${i > 0 ? "border-t border-paper-edge" : ""}`}
                >
                  <CellValue value={row.competitor} tone="competitor" center delay={i * 45 + 150} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Mobile: stacked per-feature cards, AppFox first ── */}
      <div className="space-y-3 md:hidden">
        {rows.map((row, i) => (
          <div key={row.feature} className="card p-5">
            <p className="text-[0.9375rem] font-semibold leading-snug text-ink-900">
              {row.feature}
            </p>
            <dl className="mt-3.5 space-y-2">
              <div className="flex items-center justify-between gap-4 rounded-lg border border-brand-200 bg-brand-50 px-3.5 py-2.5">
                <dt className="till text-[0.75rem] tracking-[0.1em] text-brand-700">APPFOX</dt>
                <dd className="text-right">
                  <CellValue value={row.appfox} tone="appfox" delay={i * 45} />
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-lg bg-paper-sunken px-3.5 py-2.5">
                <dt className="till text-[0.75rem] uppercase tracking-[0.1em] text-ink-500">
                  {competitor.shortName}
                </dt>
                <dd className="text-right">
                  <CellValue value={row.competitor} tone="competitor" delay={i * 45 + 150} />
                </dd>
              </div>
            </dl>
          </div>
        ))}
      </div>
    </InView>
  );
}
