import { DigitRoll } from "@/components/ui/DigitRoll";
import { InView } from "@/components/ui/InView";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { Perforation } from "@/components/site/Perforation";
import { SectionSlug } from "@/components/site/SectionSlug";

/**
 * NO. 07 - THE MATH (§5.9). DARK night section.
 *
 * Seams: the section above (Upsell Story) is light paper, so the entry tear
 * is <Perforation from="paper" />. NOTE for the page assembler: the next
 * section (Integrations, light) must open with <Perforation from="night" />
 * - that lives in another agent's file (components/home/Integrations.tsx).
 */

const STATS: { value: string; label: string }[] = [
  { value: "~80%", label: "of common edits self-served" },
  { value: "1.5–2.9%", label: "payment fees preserved per edit" },
  { value: "5 min", label: "setup, no code" },
];

export function TheMath() {
  return (
    <section id="the-math" className="on-night night-wash grain relative">
      <Perforation from="paper" />

      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-28 lg:px-10">
        <Reveal variant="none">
          <SectionSlug
            no="07"
            label="THE MATH"
            caption="What cancel-and-reorder actually costs"
            onNight
          />
        </Reveal>
        <Reveal>
          <h2
            className="mt-8 max-w-2xl text-cream-on-night"
            style={{ color: "var(--color-cream-on-night)" }}
          >
            Cancel-and-reorder is a tax. Stop paying it.
          </h2>
        </Reveal>

        {/* Two-panel ledger comparison */}
        <StaggerGroup step={120}>
          <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-2">
            <Reveal index={0} className="h-full">
              <OldWayPanel />
            </Reveal>
            <Reveal index={1} className="h-full">
              <AppFoxPanel />
            </Reveal>
          </div>
        </StaggerGroup>

        {/* Three large stats, digits rolling on entry */}
        <InView>
          <ul className="mt-16 grid gap-10 text-center sm:grid-cols-3">
            {STATS.map((stat, i) => (
              <li
                key={stat.label}
                className={
                  i > 0 ? "sm:border-l sm:border-(--color-night-edge)" : undefined
                }
              >
                <DigitRoll
                  value={stat.value}
                  className="whitespace-nowrap text-[clamp(2.75rem,4.5vw,4rem)] leading-none text-cream-on-night"
                />
                <p className="till mt-3 text-[0.8125rem] tracking-[0.06em] text-mist-on-night">
                  {stat.label}
                </p>
              </li>
            ))}
          </ul>
        </InView>
      </div>
    </section>
  );
}

/* ── Left panel - the old way (danger-tinted ledger) ────────────── */

function OldWayPanel() {
  return (
    <article
      className="card-night relative h-full p-7"
      style={{ borderColor: "rgba(206, 67, 67, 0.3)" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(120%_80%_at_50%_0%,rgba(206,67,67,0.09),transparent_70%)]"
      />
      <div className="relative flex h-full flex-col">
        <h3 style={{ color: "var(--color-cream-on-night)" }}>The old way</h3>
        <p className="till mt-4 text-[0.9375rem] text-cream-on-night">
          cancel <span className="text-danger">→</span> refund{" "}
          <span className="text-danger">→</span> re-checkout
        </p>
        <p className="mt-4 max-w-[52ch] text-[0.9375rem] leading-relaxed text-mist-on-night">
          Some tools “edit” an order by canceling the original and creating a new one -
          forfeiting fees Shopify doesn’t return, and sending the customer through checkout
          again.
        </p>
        <div
          className="mt-auto border-t border-dashed pt-4"
          style={{ borderColor: "rgba(206, 67, 67, 0.35)" }}
        >
          <p className="till text-[0.9375rem] text-danger line-through">
            Shopify Payments fees lost: 1.5–2.9% per order
          </p>
        </div>
      </div>
    </article>
  );
}

/* ── Right panel - with Appfox (success-tinted, stamped APPROVED) ── */

function AppFoxPanel() {
  return (
    <article
      className="card-night relative h-full p-7"
      style={{ borderColor: "rgba(30, 158, 106, 0.35)" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(120%_80%_at_50%_0%,rgba(30,158,106,0.1),transparent_70%)]"
      />

      {/* APPROVED stamp - slams on when the panel reveals */}
      <span
        className="stamp-in till absolute right-5 top-5 rounded-lg border-2 border-success px-3.5 py-1.5 text-[0.9375rem] uppercase tracking-[0.18em] text-success"
        style={
          {
            "--stamp-delay": "800ms",
            backgroundColor: "rgba(30, 158, 106, 0.08)",
          } as React.CSSProperties
        }
        aria-hidden="true"
      >
        Approved
      </span>

      <div className="relative flex h-full flex-col">
        <h3 style={{ color: "var(--color-cream-on-night)" }}>With Appfox</h3>
        <p className="till mt-4 text-[0.9375rem] text-cream-on-night">
          edit in place <span className="text-success">→</span> fees preserved{" "}
          <span className="text-success">→</span> deltas auto-settle
        </p>
        <p className="mt-4 max-w-[52ch] text-[0.9375rem] leading-relaxed text-mist-on-night">
          Price increases are charged and decreases refunded automatically - in place, via
          Shopify’s native Order Editing API, never cancel-and-reorder.
        </p>
        <div
          className="mt-auto border-t border-dashed pt-4"
          style={{ borderColor: "rgba(30, 158, 106, 0.35)" }}
        >
          <p className="till text-[0.9375rem] text-success">
            Order number, payment, and fees - intact
          </p>
        </div>
      </div>
    </article>
  );
}

export default TheMath;
