import { DigitRoll } from "@/components/ui/DigitRoll";
import { InView } from "@/components/ui/InView";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { SectionSlug } from "@/components/site/SectionSlug";

/**
 * NO. 04 - SIX EDITS, ZERO TICKETS (§5.6). Light cream section; sits
 * between light sections, so no perforation needed here. 3×2 grid of
 * lifting cards, each topped by a living vignette that animates once when
 * the card scrolls into view (InView adds `.is-visible`; vignettes use the
 * existing stamp/draw/print/digit utilities plus `[.is-visible_&]:`
 * delayed transitions - no new keyframes).
 */

const CARDS: { title: React.ReactNode; description: React.ReactNode; vignette: React.ReactNode }[] = [
  {
    title: "Address changes that stick",
    description: (
      <>Autocomplete and validation catch the typo before the carrier does.</>
    ),
    vignette: <AddressVignette />,
  },
  {
    title: "Size and color swaps",
    description: (
      <>
        The &quot;can I get a medium instead?&quot; email becomes a two-tap variant swap - no agent
        involved.
      </>
    ),
    vignette: <VariantVignette />,
  },
  {
    title: "Quantities, adds, removes",
    description: (
      <>Adjust line items, add a forgotten product, or drop one - all on the original order.</>
    ),
    vignette: <QuantityVignette />,
  },
  {
    title: "Payments that settle themselves",
    description: (
      <>
        Increases charged, decreases refunded - automatically, in place, never cancel-and-reorder.
      </>
    ),
    vignette: <AddItemVignette />,
  },
  {
    title: <>Approve it, or don’t bother</>,
    description: (
      <>Auto-apply safe edits, queue sensitive ones - set per edit type, every change logged.</>
    ),
    vignette: <RemoveItemVignette />,
  },
  {
    title: "Cancellations, on your terms",
    description: (
      <>
        Self-service cancellation inside your edit window, instead of an angry email after the box
        ships.
      </>
    ),
    vignette: <CancelVignette />,
  },
];

export function EditTypes() {
  return (
    <section id="edit-types" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <Reveal variant="none">
          <SectionSlug
            no="04"
            label="SIX EDITS, ZERO TICKETS"
            caption="Every edit your inbox handles today"
          />
        </Reveal>
        <Reveal>
          <h2 className="mt-8 max-w-2xl">
            Everything they ask for. Nothing they shouldn’t touch.
          </h2>
        </Reveal>

        <StaggerGroup step={80}>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CARDS.map((card, i) => (
              <Reveal key={i} index={i} className="h-full">
                <InView as="div" className="card lift flex h-full flex-col p-6" threshold={0.35}>
                  <div className="shot flex min-h-[9.5rem] flex-col justify-center rounded-2xl border border-paper-edge bg-paper p-4">
                    {card.vignette}
                  </div>
                  <h3 className="mt-5 font-sans text-[1.125rem] font-semibold tracking-normal text-ink-900">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-700">
                    {card.description}
                  </p>
                </InView>
              </Reveal>
            ))}
          </div>
        </StaggerGroup>
      </div>
    </section>
  );
}

/* ── 1. Address change - input + autocomplete + validation tick ── */

function AddressVignette() {
  return (
    <div aria-hidden="true">
      <div className="shot-field till flex items-center justify-between rounded-lg border border-brand-200 bg-paper-raised px-2.5 py-1.5 text-[0.75rem] text-ink-900">
        <span>123 Mian St</span>
        <span className="text-ink-300">⌫</span>
      </div>
      <div className="shot-field mt-1.5 overflow-hidden rounded-lg border border-paper-edge bg-paper-raised shadow-(--shadow-card)">
        <div
          className="print-out flex items-center justify-between bg-brand-50 px-2.5 py-1.5"
          style={{ "--i": 0, "--print-delay": "250ms" } as React.CSSProperties}
        >
          <span className="till text-[0.75rem] text-brand-700">123 Main St, Portland</span>
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
            <path
              d="M4 12.5l5 5 11-11"
              pathLength={400}
              className="draw-path"
              stroke="var(--color-success)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ "--draw-delay": "750ms" } as React.CSSProperties}
            />
          </svg>
        </div>
        <p
          className="print-out till px-2.5 py-1.5 text-[0.75rem] text-ink-500"
          style={{ "--i": 1, "--print-delay": "250ms" } as React.CSSProperties}
        >
          123 Maine Ave, Salem
        </p>
      </div>
    </div>
  );
}

/* ── 2. Variant swap - M deselects, L selects (delayed transition) ── */

const VARIANT_CHIP =
  "till inline-flex h-8 min-w-9 items-center justify-center rounded-lg border px-2 text-[0.8125rem] transition-colors duration-300 motion-reduce:transition-none";

function VariantVignette() {
  return (
    <div aria-hidden="true">
      <p className="till text-[0.6875rem] text-ink-500">
        Tee - Olive · <span className="text-ink-700">Size</span>
      </p>
      <div className="mt-2 flex items-center gap-2">
        <span className={`${VARIANT_CHIP} border-paper-edge text-ink-500`}>S</span>
        {/* M starts selected, then lets go */}
        <span
          className={`${VARIANT_CHIP} delay-500 border-brand-600 bg-brand-600 text-paper [.is-visible_&]:border-paper-edge [.is-visible_&]:bg-transparent [.is-visible_&]:text-ink-300 [.is-visible_&]:line-through`}
        >
          M
        </span>
        {/* L starts plain, then takes the selection */}
        <span
          className={`${VARIANT_CHIP} delay-[900ms] border-paper-edge text-ink-500 [.is-visible_&]:border-brand-600 [.is-visible_&]:bg-brand-600 [.is-visible_&]:text-paper`}
        >
          L
        </span>
        <span className={`${VARIANT_CHIP} border-paper-edge text-ink-500`}>XL</span>
      </div>
    </div>
  );
}

/* ── 3. Quantity - stepper rolling to 2 via DigitRoll ───────────── */

function QuantityVignette() {
  return (
    <div aria-hidden="true">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="h-8 w-8 rounded-lg bg-brand-100" />
          <div>
            <p className="text-[0.8125rem] font-semibold text-ink-900">Canvas Tote</p>
            <p className="till text-[0.6875rem] text-ink-500">$32.00 each</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="shot-field till flex h-7 w-7 items-center justify-center rounded-lg border border-paper-edge text-[0.8125rem] text-ink-500">
            −
          </span>
          <DigitRoll value="2" className="text-[0.9375rem] text-ink-900" />
          <span className="shot-cta till flex h-7 w-7 items-center justify-center rounded-lg bg-brand-600 text-[0.8125rem] text-paper">
            +
          </span>
        </div>
      </div>
      <p className="till mt-3 border-t border-dashed border-paper-edge pt-2 text-[0.6875rem] text-ink-500">
        Line updated · <span className="text-ink-700">+$32.00</span>
      </p>
    </div>
  );
}

/* ── 4. Add items - product row printing in ─────────────────────── */

function AddItemVignette() {
  return (
    <div aria-hidden="true">
      <div className="till flex items-center justify-between text-[0.75rem] text-ink-500">
        <span>Tee - Olive / L</span>
        <span>$38.00</span>
      </div>
      <div
        className="shot-on print-out till mt-1.5 flex items-center justify-between rounded-lg border border-brand-200 bg-brand-50 px-2.5 py-1.5 text-[0.75rem]"
        style={{ "--i": 0, "--print-delay": "450ms" } as React.CSSProperties}
      >
        <span className="text-brand-700">+ Wool Beanie</span>
        <span className="text-marigold-700">+$24.00</span>
      </div>
      <div className="till mt-2 flex items-center justify-between border-t border-dashed border-paper-edge pt-2 text-[0.75rem] text-ink-900">
        <span>Total</span>
        <span>
          $<DigitRoll value="110.00" />
        </span>
      </div>
    </div>
  );
}

/* ── 5. Remove items - row strikes through and fades, then queues ── */

function RemoveItemVignette() {
  return (
    <div aria-hidden="true">
      <div className="till flex items-center justify-between text-[0.75rem] text-ink-700">
        <span>Tee - Olive / L</span>
        <span>$38.00</span>
      </div>
      <div className="till mt-1.5 flex items-center justify-between text-[0.75rem] text-ink-700 transition-all delay-500 duration-500 motion-reduce:transition-none [.is-visible_&]:text-ink-300 [.is-visible_&]:line-through [.is-visible_&]:opacity-40">
        <span>Logo Cap</span>
        <span>$18.00</span>
      </div>
      <div className="mt-2.5 flex items-center justify-between border-t border-dashed border-paper-edge pt-2">
        <span className="till text-[0.6875rem] text-ink-500">1 item removed</span>
        <span
          className="chip chip-warn stamp-in !px-2 !py-0.5 !text-[0.625rem] tracking-wide"
          style={{ "--stamp-delay": "1100ms" } as React.CSSProperties}
        >
          NEEDS REVIEW
        </span>
      </div>
    </div>
  );
}

/* ── 6. Cancel order - countdown, rules sticker, the edit they never see ── */

function CancelVignette() {
  return (
    <div aria-hidden="true">
      <div className="rounded-lg border border-danger/20 bg-danger-bg px-3 py-2.5">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-[0.75rem] font-semibold text-danger">Cancel this order</p>
            <p className="till mt-0.5 text-[0.6875rem] text-ink-500">
              Eligible for <span className="text-danger">23:14:09</span>
            </p>
          </div>
          <span className="sticker !px-2.5 !py-1 !text-[0.625rem] tracking-wide">Rules apply</span>
        </div>
      </div>
      <div className="mt-2.5 flex items-center gap-2">
        <span className="chip border border-dashed border-ink-300 bg-transparent text-ink-300 opacity-70 !px-2 !py-0.5 !text-[0.625rem] tracking-wide">
          <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" aria-hidden="true">
            <rect x="2" y="5" width="8" height="5.5" rx="1.5" fill="currentColor" />
            <path
              d="M4 5V3.5a2 2 0 1 1 4 0V5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
          CANCEL AFTER FULFILLMENT
        </span>
        <span className="text-[0.6875rem] text-ink-500">Customers never see this.</span>
      </div>
    </div>
  );
}
