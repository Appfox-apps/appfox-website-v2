import Link from "next/link";
import { Wordmark } from "@/components/site/Wordmark";
import { CompareCellValue } from "./CompareCellValue";
import { CompareMoreShell } from "./CompareMoreShell";
import {
  moreRows,
  primaryRows,
  sectionHasUnclear,
  UNCLEAR_NOTE,
  type CompareRow,
  type CompareSection,
  type CompareVendor,
} from "@/data/bundle-compare";

/**
 * Multi-competitor feature table. Server-rendered HTML (`<table>`, `th`
 * scope, caption). Extra rows stay in the DOM for crawlers; a small
 * client shell toggles visibility. Do not replace
 * `components/vs/ComparisonTable.tsx`.
 *
 * Visual contract matches ComparisonTable. Sticky header `top` uses
 * `--compare-sticky-top` so the row clears the floating island nav.
 */

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
      className={`min-w-[12.5rem] max-w-[16rem] px-5 py-3.5 text-left text-[0.9375rem] font-normal text-ink-700 lg:px-7 ${
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

function SectionRows({
  rows,
  vendors,
  extra = false,
  stickyFeature,
}: {
  rows: CompareRow[];
  vendors: CompareVendor[];
  extra?: boolean;
  stickyFeature: boolean;
}) {
  return (
    <>
      {rows.map((row, i) => (
        <tr
          key={row.id}
          data-compare-extra={extra || undefined}
          className="transition-colors duration-150 hover:bg-paper-sunken"
        >
          <FeatureCell row={row} sticky={stickyFeature} borderTop={i > 0 || extra} />
          {vendors.map((vendor) => (
            <DataCell
              key={vendor.id}
              row={row}
              vendor={vendor}
              index={i}
              borderTop={i > 0 || extra}
            />
          ))}
        </tr>
      ))}
    </>
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
  const primary = primaryRows(section);
  const extra = moreRows(section);
  const showUnclearNote = sectionHasUnclear(
    section,
    vendors.map((v) => v.id),
  );
  const wide = vendors.length > 3;
  // Hub tables use overflow-x-auto below lg, which would slide a sticky
  // thead under the nav. Pin the thead on lg+ only; the compact vendor
  // bar covers small screens. Two-column pages keep overflow-clip + sticky.
  const stickyTh = wide
    ? "lg:sticky lg:top-[var(--compare-sticky-top)] z-10 py-4 backdrop-blur-[10px]"
    : "sticky top-[var(--compare-sticky-top)] z-10 py-4 backdrop-blur-[10px]";
  const names = vendors
    .filter((v) => !v.highlight)
    .map((v) => v.shortName)
    .join(", ");

  return (
    <CompareMoreShell
      extraCount={extra.length}
      sectionTitle={section.title}
      className={className}
      footnote={
        <>
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
        </>
      }
    >
      {wide ? (
        <div className="sticky top-[var(--compare-sticky-top)] z-20 mb-2 flex gap-2 overflow-x-auto rounded-xl border border-paper-edge bg-paper/90 px-3 py-2 backdrop-blur-[10px] lg:hidden">
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
      ) : null}
      {/*
        overflow-clip (not overflow-x-auto) keeps thead sticky on the
        viewport — same reason ComparisonTable uses overflow-clip.
        Below lg the hub table still needs a sideways scroller; the
        compact vendor bar above stays pinned below the nav.
      */}
      <div className={wide ? "card overflow-clip max-lg:overflow-x-auto" : "card overflow-clip"}>
        <table
          className={`w-full border-separate border-spacing-0 text-left ${wide ? "min-w-[58rem]" : ""}`}
        >
          <caption className="sr-only">
            {section.title}: AppFox Product Bundles compared with {names}
          </caption>
          <thead>
            <tr>
              <th
                scope="col"
                className={`${stickyTh} ${wide ? "compare-sticky-col" : ""} border-b border-paper-edge bg-paper/85 px-5 text-left lg:px-7`}
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
                      ? "border-x border-b-brand-200 border-x-brand-200 bg-brand-50/90"
                      : "border-paper-edge bg-paper/85"
                  }`}
                >
                  <VendorHead vendor={vendor} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <SectionRows rows={primary} vendors={vendors} stickyFeature={wide} />
            {extra.length > 0 ? (
              <SectionRows rows={extra} vendors={vendors} extra stickyFeature={wide} />
            ) : null}
          </tbody>
        </table>
      </div>
    </CompareMoreShell>
  );
}
