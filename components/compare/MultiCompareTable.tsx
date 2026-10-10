import Link from "next/link";
import { Wordmark } from "@/components/site/Wordmark";
import { InView } from "@/components/ui/InView";
import { CompareCellValue } from "./CompareCellValue";
import {
  sectionHasUnclear,
  UNCLEAR_NOTE,
  type CompareRow,
  type CompareSection,
  type CompareVendor,
} from "@/data/bundle-compare";

/**
 * Multi-competitor feature table. Server-rendered HTML (`<table>`, `th`
 * scope, caption). Every row is visible — no expand/collapse. Do not
 * replace `components/vs/ComparisonTable.tsx`.
 *
 * Feature header and body cells share `.compare-feature-col` so the
 * sticky first column cannot overhang the AppFox column. Sticky header
 * `top` uses `--compare-sticky-top`; cells are fully opaque.
 */

const FEATURE_COL =
  "compare-feature-col px-5 text-left lg:px-7";

function VendorHead({ vendor }: { vendor: CompareVendor }) {
  const inner = (
    <span className="flex flex-col items-center gap-1.5">
      {vendor.highlight ? (
        <Wordmark className="text-[1.125rem]" />
      ) : (
        <span className="text-[1.0625rem] font-semibold text-ink-700">
          {vendor.shortName}
        </span>
      )}
      {vendor.priceChip ? (
        <span
          className={`chip till text-[0.75rem] ${
            vendor.highlight
              ? "border border-brand-200 bg-paper-raised text-brand-700"
              : "border border-paper-edge bg-paper-raised text-ink-500"
          }`}
        >
          {vendor.priceChip}
        </span>
      ) : null}
    </span>
  );

  if (vendor.href) {
    return (
      <Link
        href={vendor.href}
        className="transition-colors hover:text-brand-700"
        title={vendor.name}
      >
        {inner}
      </Link>
    );
  }
  return inner;
}

function FeatureCell({
  row,
  sticky,
  borderTop,
}: {
  row: CompareRow;
  sticky: boolean;
  borderTop: boolean;
}) {
  return (
    <th
      scope="row"
      className={`${FEATURE_COL} py-3.5 text-[0.9375rem] font-normal text-ink-700 ${
        sticky ? "compare-sticky-col" : ""
      } ${borderTop ? "border-t border-paper-edge" : ""}`}
    >
      <span className="block leading-snug">{row.feature}</span>
      {row.hint ? (
        <span className="mt-1 block text-[0.8125rem] leading-snug text-ink-500">{row.hint}</span>
      ) : null}
    </th>
  );
}

function DataCell({
  row,
  vendor,
  index,
  borderTop,
}: {
  row: CompareRow;
  vendor: CompareVendor;
  index: number;
  borderTop: boolean;
}) {
  const highlight = Boolean(vendor.highlight);
  return (
    <td
      className={`min-w-[8.5rem] px-4 py-3.5 text-center ${
        highlight ? "border-x border-x-brand-200 bg-brand-50" : ""
      } ${
        borderTop ? (highlight ? "border-t border-t-brand-200/50" : "border-t border-paper-edge") : ""
      }`}
    >
      <CompareCellValue
        cell={row.cells[vendor.id]}
        highlight={highlight}
        delay={index * 45}
      />
    </td>
  );
}

export function MultiCompareTable({
  section,
  vendors,
  className = "",
}: {
  section: CompareSection;
  vendors: CompareVendor[];
  className?: string;
}) {
  const showUnclearNote = sectionHasUnclear(
    section,
    vendors.map((v) => v.id),
  );
  const wide = vendors.length > 3;
  const stickyTh = wide
    ? "compare-sticky-head lg:sticky lg:top-[var(--compare-sticky-top)] z-20 py-4"
    : "compare-sticky-head sticky top-[var(--compare-sticky-top)] z-20 py-4";
  const names = vendors
    .filter((v) => !v.highlight)
    .map((v) => v.shortName)
    .join(", ");

  return (
    <InView threshold={0.05} className={className}>
      {wide ? (
        <div className="compare-sticky-bar sticky top-[var(--compare-sticky-top)] z-20 mb-2 rounded-xl border border-paper-edge lg:hidden">
          <div className="flex gap-2 overflow-x-auto px-3 py-2">
            {vendors.map((vendor) => (
              <span
                key={vendor.id}
                className={`till shrink-0 text-[0.6875rem] ${
                  vendor.highlight ? "font-semibold text-brand-700" : "text-ink-500"
                }`}
              >
                {vendor.shortName}
                {vendor.priceChip ? ` · ${vendor.priceChip}` : ""}
              </span>
            ))}
          </div>
        </div>
      ) : null}
      {/*
        Card clips to its radius. Horizontal scroll (hub, <lg) lives on an
        inner wrapper so sticky left cells cannot paint past the corner.
      */}
      <div className="card isolate overflow-clip">
        <div className={wide ? "max-lg:overflow-x-auto" : undefined}>
          <table
            className={`w-full table-fixed border-separate border-spacing-0 text-left ${wide ? "min-w-[58rem]" : ""}`}
          >
            <caption className="sr-only">
              {section.title}: AppFox Product Bundles compared with {names}
            </caption>
            <colgroup>
              <col className="compare-feature-col" />
              {vendors.map((vendor) => (
                <col key={vendor.id} />
              ))}
            </colgroup>
            <thead>
              <tr>
                <th
                  scope="col"
                  className={`${stickyTh} ${FEATURE_COL} ${wide ? "compare-sticky-col" : ""} border-b border-paper-edge`}
                >
                  <span className="till text-[0.75rem] font-medium uppercase tracking-[0.14em] text-ink-500">
                    Feature
                  </span>
                </th>
                {vendors.map((vendor) => (
                  <th
                    key={vendor.id}
                    scope="col"
                    className={`${stickyTh} border-b px-4 text-center ${
                      vendor.highlight
                        ? "compare-sticky-head--brand border-x border-b-brand-200 border-x-brand-200"
                        : "border-paper-edge"
                    }`}
                  >
                    <VendorHead vendor={vendor} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.rows.map((row, i) => (
                <tr
                  key={row.id}
                  className="transition-colors duration-150 hover:bg-paper-sunken"
                >
                  <FeatureCell row={row} sticky={wide} borderTop={i > 0} />
                  {vendors.map((vendor) => (
                    <DataCell
                      key={vendor.id}
                      row={row}
                      vendor={vendor}
                      index={i}
                      borderTop={i > 0}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showUnclearNote ? (
        <p className="mt-3 text-sm text-ink-500">
          <span className="till">?</span> {UNCLEAR_NOTE}
        </p>
      ) : null}
      {wide ? (
        <p className="mt-3 md:hidden till text-[0.75rem] text-ink-500">
          Scroll sideways to see every app.
        </p>
      ) : null}
    </InView>
  );
}
