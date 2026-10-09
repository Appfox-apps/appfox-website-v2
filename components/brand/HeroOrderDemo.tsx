"use client";

import { useState } from "react";
import { ProductFrame } from "@/components/brand/ProductFrame";

/**
 * Interactive hero vignette - a working miniature of the customer portal.
 * Visitors can swap a size, add the gift-wrap upsell, and flip the order
 * to monthly; the receipt updates in place and the AUTO-APPLIED chip
 * stamps on, making the "no support ticket" claim tangible before a
 * single word of copy is read.
 *
 * Reuses the global animation vocabulary (.stamp-in / .print-out /
 * .draw-path with .is-visible added at mount) so entrances match the
 * rest of the site and reduced-motion users simply see final states.
 */

const SIZES = ["S", "M", "L"] as const;
type Size = (typeof SIZES)[number];

const ROBE_PRICE = 48;
const GIFT_WRAP_PRICE = 4;
const SUBSCRIBE_DISCOUNT = 0.1;

function money(n: number) {
  return `$${n.toFixed(2)}`;
}

export function HeroOrderDemo() {
  const [size, setSize] = useState<Size>("M");
  const [giftWrap, setGiftWrap] = useState(false);
  const [monthly, setMonthly] = useState(false);

  const edited = size !== "M" || giftWrap || monthly;
  const subtotal = ROBE_PRICE + (giftWrap ? GIFT_WRAP_PRICE : 0);
  const total = monthly ? subtotal * (1 - SUBSCRIBE_DISCOUNT) : subtotal;

  return (
    <div className="relative mx-auto w-full max-w-md">
      <ProductFrame kicker="Order #1042 · try an edit" className="relative">
      <div className="relative p-6 sm:p-7">
        <span className="sticker absolute -top-3 right-6">TRY AN EDIT</span>

        {/* Receipt header */}
        <div className="flex items-center justify-between gap-3 border-b border-paper-edge pb-4">
          <p className="till text-[0.75rem] text-ink-500">
            ORDER <span className="text-ink-900">#1042</span> · just placed
          </p>
          {edited ? (
            <span
              className="chip chip-success stamp-in is-visible !px-2 !py-0.5 !text-[0.625rem] tracking-wide"
              style={{ "--stamp-delay": "80ms" } as React.CSSProperties}
            >
              AUTO-APPLIED
            </span>
          ) : (
            <span className="chip chip-warn !px-2 !py-0.5 !text-[0.625rem] tracking-wide">
              EDIT WINDOW OPEN
            </span>
          )}
        </div>

        {/* Line item with live size swap */}
        <div className="flex items-start justify-between gap-3 pt-4">
          <div>
            <p className="text-[0.9375rem] font-semibold text-ink-900">Waffle-knit robe</p>
            <div className="mt-2 flex items-center gap-1.5" role="group" aria-label="Change size">
              {SIZES.map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={size === s}
                  onClick={() => setSize(s)}
                  className={
                    size === s
                      ? "till rounded-lg border border-brand-600 bg-brand-600 px-2.5 py-1 text-[0.75rem] text-white shadow-(--shadow-card)"
                      : "till cursor-pointer rounded-lg border border-paper-edge bg-paper-raised px-2.5 py-1 text-[0.75rem] text-ink-700 transition-colors duration-150 hover:border-brand-300 hover:text-ink-900"
                  }
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <p className="till text-sm text-ink-900">{money(ROBE_PRICE)}</p>
        </div>

        {/* Gift-wrap upsell - offer becomes a receipt line once taken */}
        <div className="pt-4">
          {giftWrap ? (
            <div className="print-out is-visible flex items-center justify-between gap-3 rounded-xl border border-marigold-500 bg-warn-bg px-3.5 py-2.5">
              <p className="text-sm font-medium text-ink-900">Gift wrap + note</p>
              <span className="flex items-center gap-2.5">
                <span className="till text-sm text-ink-900">+{money(GIFT_WRAP_PRICE)}</span>
                <button
                  type="button"
                  onClick={() => setGiftWrap(false)}
                  aria-label="Remove gift wrap"
                  className="till cursor-pointer rounded-md px-1 text-sm leading-none text-ink-500 transition-colors duration-150 hover:text-danger"
                >
                  ×
                </button>
              </span>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setGiftWrap(true)}
              className="ember flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl border border-dashed border-marigold-700/40 bg-warn-bg px-3.5 py-2.5 text-left transition-transform duration-150 hover:-translate-y-0.5"
            >
              <span className="text-sm font-semibold text-ink-900">Add gift wrap + note</span>
              <span className="till text-[0.75rem] text-marigold-700">+{money(GIFT_WRAP_PRICE)}</span>
            </button>
          )}
        </div>

        {/* Subscribe & save toggle - the second app, one flip away */}
        <div className="pt-3">
          <button
            type="button"
            role="switch"
            aria-checked={monthly}
            onClick={() => setMonthly((v) => !v)}
            className={`flex w-full cursor-pointer items-center justify-between gap-3 border-[3px] border-ink-900 px-3.5 py-2.5 text-left ${
              monthly ? "bg-brand-50" : "bg-paper"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className={`h-5 w-9 shrink-0 border-2 border-ink-900 p-0.5 ${
                  monthly ? "bg-marigold-500" : "bg-paper-sunken"
                }`}
              >
                <span
                  className={`block h-3.5 w-3.5 bg-ink-900 transition-transform duration-200 ${
                    monthly ? "translate-x-4" : ""
                  }`}
                />
              </span>
              <span className="text-sm font-semibold text-ink-900">Make it monthly</span>
            </span>
            <span className={`till text-[0.75rem] ${monthly ? "text-brand-700" : "text-ink-500"}`}>
              save 10%
            </span>
          </button>
        </div>

        {/* Total - re-keyed on change so the amount rises in */}
        <div className="mt-4 flex items-baseline justify-between gap-3 border-t border-dashed border-paper-edge pt-4">
          <p className="till text-[0.6875rem] uppercase tracking-[0.12em] text-ink-500">
            Order total
          </p>
          <p className="till text-xl text-ink-900">
            <span
              key={`${total}-${monthly}`}
              className="enter-fade-rise inline-block"
              style={{ animationDuration: "350ms" }}
            >
              {money(total)}
              {monthly && <span className="text-sm text-brand-700">/mo</span>}
            </span>
          </p>
        </div>

        {edited && (
          <p className="print-out is-visible mt-3 flex items-center gap-1.5 text-[0.8125rem] font-medium text-success">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" fill="none" aria-hidden="true">
              <path
                className="draw-path is-visible"
                pathLength={400}
                d="M3.5 13.2 9 18.4 20.5 5.8"
                stroke="var(--color-success)"
                strokeWidth={2.75}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Handled without a support ticket.
          </p>
        )}
      </div>
      </ProductFrame>

      <p className="till mt-4 text-center text-[0.75rem] text-ink-500">
        Live demo · the same portal your customers get
      </p>
    </div>
  );
}
