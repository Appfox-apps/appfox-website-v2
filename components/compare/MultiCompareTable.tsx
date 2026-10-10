"use client";

import { useState } from "react";
import Link from "next/link";
import { InView } from "@/components/ui/InView";
import { Wordmark } from "@/components/site/Wordmark";
import { CompareCellValue } from "./CompareCellValue";
import {
  moreRows,
  primaryRows,
  type CompareRow,
  type CompareSection,
  type CompareVendor,
} from "@/data/bundle-compare";

/**
 * Multi-competitor feature table. New component — do not replace
 * `components/vs/ComparisonTable.tsx`, which the one-to-one /vs pages use.
 *
 * Desktop: ledger card, sticky header, sticky feature column, AppFox
 * column tinted brand-50. Mobile: the same table in a horizontal scroller
 * so columns stay aligned; the feature column stays pinned left.
 *
 * Extra rows stay in the DOM (no-JS / crawlers). `html.js` hides them
 * until "More {section} features (N)" is opened.
 */

function VendorHead({ vendor }: { vendor: CompareVendor }) {
  const inner = (
    <span className="flex flex-col items-center gap-1.5">
      {vendor.highlight ? (
        <Wordmark className="text-[1.0625rem]" />
      ) : (
        <span className="text-[0.9375rem] font-semibold leading-snug text-ink-700">
          {vendor.shortName}
        </span>
      )}
      {vendor.priceChip ? (
        <span
          className={`chip till text-[0.6875rem] ${
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
      className={`min-w-[11.5rem] max-w-[14rem] px-4 py-3.5 text-left text-[0.875rem] font-normal text-ink-700 lg:px-5 ${
        sticky ? "compare-sticky-col" : ""
      } ${borderTop ? "border-t border-paper-edge" : ""}`}
    >
      <span className="block leading-snug">{row.feature}</span>
      {row.hint ? <span className="mt-1 block text-[0.75rem] leading-snug text-ink-500">{row.hint}</span> : null}
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
      className={`min-w-[7.5rem] px-3 py-3.5 text-center ${
        highlight ? "border-x border-x-brand-200 bg-brand-50" : ""
      } ${
        borderTop ? (highlight ? "border-t border-t-brand-200/50" : "border-t border-paper-edge") : ""
      }`}
    >
      <CompareCellValue
        cell={row.cells[vendor.id]}
        highlight={highlight}
        delay={index * 30}
      />
    </td>
  );
}

function SectionRows({
  rows,
  vendors,
  extra = false,
}: {
  rows: CompareRow[];
  vendors: CompareVendor[];
  extra?: boolean;
}) {
  return (
    <>
      {rows.map((row, i) => (
        <tr
          key={row.id}
          data-compare-extra={extra || undefined}
          className="transition-colors duration-150 hover:bg-paper-sunken"
        >
          <FeatureCell row={row} sticky borderTop={i > 0 || extra} />
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
  const [open, setOpen] = useState(false);
  const primary = primaryRows(section);
  const extra = moreRows(section);
  const stickyTh = "sticky top-0 z-10 py-4 backdrop-blur-[10px]";

  return (
    <InView threshold={0.05} className={className}>
      <div
        data-compare-more=""
        data-open={open || undefined}
        className="card overflow-x-auto"
      >
        <table className="w-full min-w-[58rem] border-separate border-spacing-0 text-left">
          <caption className="sr-only">
            {section.title}: AppFox Product Bundles compared with{" "}
            {vendors
              .filter((v) => !v.highlight)
              .map((v) => v.shortName)
              .join(", ")}
          </caption>
          <thead>
            <tr>
              <th
                scope="col"
                className={`${stickyTh} compare-sticky-col border-b border-paper-edge px-4 text-left lg:px-5`}
              >
                <span className="till text-[0.75rem] font-medium uppercase tracking-[0.14em] text-ink-500">
                  Feature
                </span>
              </th>
              {vendors.map((vendor) => (
                <th
                  key={vendor.id}
                  scope="col"
                  className={`${stickyTh} border-b px-3 text-center ${
                    vendor.highlight
                      ? "border-x border-b-brand-200 border-x-brand-200 bg-brand-50/95"
                      : "border-paper-edge bg-paper-raised/95"
                  }`}
                >
                  <VendorHead vendor={vendor} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <SectionRows rows={primary} vendors={vendors} />
            {extra.length > 0 ? <SectionRows rows={extra} vendors={vendors} extra /> : null}
          </tbody>
        </table>
      </div>

      {extra.length > 0 ? (
        <button
          type="button"
          className="mt-3 till text-[0.8125rem] font-medium text-brand-700 transition-colors hover:text-brand-800"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open
            ? `Hide extra ${section.title.toLowerCase()} features`
            : `More ${section.title.toLowerCase()} features (${extra.length})`}
        </button>
      ) : null}

      <p className="mt-3 md:hidden till text-[0.75rem] text-ink-500">
        Scroll sideways to see every app.
      </p>
    </InView>
  );
}
