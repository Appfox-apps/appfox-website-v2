import { DigitRoll } from "@/components/ui/DigitRoll";
import { InView } from "@/components/ui/InView";
import { Reveal } from "@/components/ui/Reveal";
import { Perforation } from "@/components/site/Perforation";
import { SectionSlug } from "@/components/site/SectionSlug";

/**
 * NO. 06 - REVENUE (§5.8). Light section.
 *
 * Seams: it follows the dark Control Room (§5.7), so it opens with
 * <Perforation from="night" />. The next section (The Math, §5.9) is dark
 * and carries its own <Perforation from="paper" /> entry tear.
 */

const MICRO_STATS: { value: string; label: string }[] = [
  { value: "1 click", label: "from offer to added item" },
  { value: "0", label: "second checkouts, ever" },
  { value: "1.5–2.9%", label: "Shopify Payments fees kept by editing in place" },
];

export function UpsellStory() {
  return (
    <section id="upsell" className="relative">
      <Perforation from="night" />

      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-28 lg:px-10">
        <Reveal variant="none">
          <SectionSlug
            no="06"
            label="REVENUE"
            caption="The highest-attention moment after checkout"
          />
        </Reveal>
        <Reveal>
          <h2 className="mt-8 max-w-3xl">
            They came to fix a typo. They left with the matching beanie.
          </h2>
        </Reveal>

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left - copy block + micro-stats */}
          <div>
            <Reveal>
              <h3>The upsell your customer is already looking at</h3>
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-4 max-w-[60ch] text-ink-700">
                Post-purchase emails get ignored. But a customer editing their order is already
                inside it - payment on file, full attention. Your offer shows right there, and one
                click adds it to the order. No second checkout.
              </p>
            </Reveal>

            <InView>
              <ul className="mt-10 grid gap-8 sm:grid-cols-3">
                {MICRO_STATS.map((stat) => (
                  <li key={stat.label} className="border-t border-paper-edge pt-4">
                    <DigitRoll
                      value={stat.value}
                      className="whitespace-nowrap text-[1.75rem] leading-none text-ink-900"
                    />
                    <p className="mt-2 text-[0.875rem] font-medium leading-snug text-ink-500">
                      {stat.label}
                    </p>
                  </li>
                ))}
              </ul>
            </InView>
          </div>

          {/* Right - the receipt centerpiece */}
          <Reveal variant="left" delay={120}>
            <ReceiptCard />
            <p className="till mt-5 text-center text-[0.75rem] text-ink-500">
              AI-powered recommendations on Growth and above
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── Receipt-styled card - perforated top + bottom, mono throughout ──
   Rows print in sequence like paper feeding from a till. */

function ReceiptCard() {
  return (
    <InView as="figure" className="mx-auto w-full max-w-sm">
      <div className="shot bg-paper-raised shadow-(--shadow-raised)" aria-hidden="true">
        <Perforation from="paper" />

        <div className="till px-7 py-6 text-[0.8125rem] leading-relaxed text-ink-700">
          <header className="text-center">
            <p className="text-[0.875rem] font-semibold tracking-[0.22em] text-ink-900">
              OAK &amp; ANCHOR
            </p>
            <p className="mt-1 text-[0.6875rem] tracking-[0.08em] text-ink-500">
              ORDER #1042 · 14:02
            </p>
          </header>

          <div className="my-4 border-t border-dashed border-paper-edge" />

          {/* Original items */}
          <div className="space-y-2.5">
            <div
              className="print-out flex items-baseline justify-between gap-3"
              style={{ "--i": 0 } as React.CSSProperties}
            >
              <span>1 × Tee - Olive / L</span>
              <span className="text-ink-900">$48.00</span>
            </div>
            <div
              className="print-out flex items-baseline justify-between gap-3"
              style={{ "--i": 1 } as React.CSSProperties}
            >
              <span>1 × Canvas Tote</span>
              <span className="text-ink-900">$38.00</span>
            </div>
          </div>

          {/* The upsell row - the marigold revenue moment. The print-out
              wrapper is padded so the ember glow isn't clipped by its
              clip-path once the row has printed. */}
          <div
            className="print-out -mx-3 mt-2 px-3 py-1"
            style={{ "--i": 2, "--print-delay": "260ms" } as React.CSSProperties}
          >
            <div className="ember ember-pulse flex items-baseline justify-between gap-3 rounded-lg bg-marigold-500/10 px-3 py-2.5">
              <span className="text-ink-900">+ Wool Beanie</span>
              <span className="text-marigold-700">$24.00</span>
            </div>
          </div>

          <div className="my-4 border-t border-dashed border-paper-edge" />

          {/* Delta math, line by line */}
          <div className="space-y-1.5">
            <div
              className="print-out flex items-baseline justify-between gap-3 text-ink-900"
              style={{ "--i": 3, "--print-delay": "560ms" } as React.CSSProperties}
            >
              <span>Subtotal</span>
              <span>+$24.00</span>
            </div>
            <div
              className="print-out text-ink-500"
              style={{ "--i": 4, "--print-delay": "560ms" } as React.CSSProperties}
            >
              Charged via Shopify payment request
            </div>
            <div
              className="print-out text-ink-500"
              style={{ "--i": 5, "--print-delay": "560ms" } as React.CSSProperties}
            >
              No second checkout
            </div>
          </div>
        </div>

        <div className="rotate-180">
          <Perforation from="paper" />
        </div>
      </div>
    </InView>
  );
}

export default UpsellStory;
