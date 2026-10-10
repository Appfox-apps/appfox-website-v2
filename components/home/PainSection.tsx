import Link from "next/link";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { InView } from "@/components/ui/InView";
import { SectionSlug } from "@/components/site/SectionSlug";

/**
 * §5.4 The Pain - light section, slug NO. 02. Giant italic pull-quote,
 * then two columns: the "costing you three times" copy on the left and a
 * masked vertical marquee of inbound ticket cards on the right (every 4th
 * one stamped SELF-SERVED). Light section between the sunken TrustStrip
 * above and the light How-It-Works below - no perforations needed.
 */

const TICKET_SUBJECTS = [
  "wrong address!! please help",
  "can I swap to a Large?",
  "ordered twice by accident",
  "cancel my order?",
];

/* 8 cards per half (subjects twice over); every 4th carries the stamp */
const TICKETS = [...TICKET_SUBJECTS, ...TICKET_SUBJECTS];

const MARQUEE_MASK: React.CSSProperties = {
  maskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
  WebkitMaskImage:
    "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
};

function EnvelopeGlyph() {
  return (
    <svg viewBox="0 0 20 16" className="h-3.5 w-[18px] shrink-0 text-ink-300" aria-hidden="true">
      <rect
        x="1"
        y="1"
        width="18"
        height="14"
        rx="2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
      />
      <path
        d="M2.5 3.5L10 9.5l7.5-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** One half of the seamless loop - rendered twice inside `.marquee-y`. */
function TicketHalf({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div aria-hidden={ariaHidden || undefined} className="px-1">
      {TICKETS.map((subject, i) => (
        <div key={i} className="card mb-3 flex items-center justify-between gap-3 px-4 py-3.5">
          <span className="flex min-w-0 items-center gap-2.5">
            <EnvelopeGlyph />
            <span className="truncate text-[0.9375rem] font-medium text-ink-900">{subject}</span>
          </span>
          {(i + 1) % 4 === 0 ? (
            <span
              className="stamp-in chip chip-success till shrink-0 text-[0.6875rem] tracking-[0.08em]"
              style={{ "--stamp-delay": `${350 + i * 120}ms` } as React.CSSProperties}
            >
              SELF-SERVED
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export function PainSection() {
  return (
    <section id="problem" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <Reveal variant="none">
          <SectionSlug
            no="02"
            label="THE PROBLEM"
            caption="Three emails, three costs, every morning."
          />
        </Reveal>

        {/* Pull-quote spanning the grid, hanging quote marks in brand-200 */}
        <Reveal delay={60}>
          <figure className="relative mt-16 sm:mt-20">
            <span
              aria-hidden="true"
              className="font-display pointer-events-none absolute -top-9 -left-2 text-[5.5rem] leading-none italic select-none sm:-top-12 sm:-left-14 sm:text-[8rem]"
              style={{ color: "var(--color-brand-200)" }}
            >
              “
            </span>
            <blockquote className="font-display relative max-w-4xl text-[clamp(1.75rem,1.2rem+2.4vw,2.75rem)] leading-[1.2] font-normal text-ink-900 italic">
              Hi - can I change my order?
              <span
                aria-hidden="true"
                className="relative -top-[0.08em] ml-1.5 inline-block text-[1.4em] leading-[0.5] select-none"
                style={{ color: "var(--color-brand-200)" }}
              >
                ”
              </span>
            </blockquote>
          </figure>
        </Reveal>

        <div className="mt-14 grid items-start gap-14 lg:grid-cols-2 lg:gap-16">
          {/* ── Left: the three costs ─────────────────────── */}
          <div>
            <Reveal>
              <h2 className="max-w-[20ch]">Every order edit is costing you three times</h2>
            </Reveal>

            <Reveal delay={80}>
              <p className="mt-6 max-w-[65ch] text-ink-700">
                The same three emails arrive every morning. <em>“Can I change my order?”</em>{" "}
                <em>“I typo’d my apartment number.”</em>{" "}
                <em>“Actually, can I get a large instead?”</em> Each one costs you:
              </p>
            </Reveal>

            <ol className="mt-8 space-y-6">
              <StaggerGroup step={100} base={140}>
                <Reveal as="li" index={0} className="flex gap-4">
                  <span className="till pt-0.5 text-[0.9375rem] text-marigold-700">1.</span>
                  <p className="max-w-[60ch]">
                    <strong className="font-semibold text-ink-900">The ticket.</strong> An agent
                    reads it, hunts down the order, and edits it by hand - every time.
                  </p>
                </Reveal>
                <Reveal as="li" index={1} className="flex gap-4">
                  <span className="till pt-0.5 text-[0.9375rem] text-marigold-700">2.</span>
                  <p className="max-w-[60ch]">
                    <strong className="font-semibold text-ink-900">The delivery.</strong> Uncaught
                    address typos become failed deliveries. Overnight cancellations become
                    chargebacks.
                  </p>
                </Reveal>
                <Reveal as="li" index={2} className="flex gap-4">
                  <span className="till pt-0.5 text-[0.9375rem] text-marigold-700">3.</span>
                  <p className="max-w-[60ch]">
                    <strong className="font-semibold text-ink-900">The fee.</strong> Tools that{" "}
                    <Link
                      href="/vs/orderify"
                      className="font-medium text-brand-500 underline decoration-brand-200 decoration-2 underline-offset-[3px] transition-colors hover:text-brand-700 hover:decoration-brand-300"
                    >
                      cancel and reorder
                    </Link>{" "}
                    forfeit <span className="till">1.5–2.9%</span> in Shopify fees -{" "}
                    <span className="till">$1.50–$2.90</span> per <span className="till">$100</span>{" "}
                    order, gone.
                  </p>
                </Reveal>
              </StaggerGroup>
            </ol>

            <Reveal delay={200}>
              <p className="mt-8 max-w-[65ch] text-ink-700">
                Appfox removes all three. Customers self-serve inside your rules, addresses get
                validated, and edits happen in place - so the fees stay yours.
              </p>
            </Reveal>
          </div>

          {/* ── Right: the inbox, scrolling by ─────────────── */}
          <Reveal variant="left" delay={160}>
            <InView>
              <div
                className="marquee-pause relative h-[420px] overflow-hidden sm:h-[460px]"
                style={MARQUEE_MASK}
              >
                <div className="marquee-y flex w-full flex-col">
                  <TicketHalf />
                  <TicketHalf ariaHidden />
                </div>
              </div>
              <p className="till mt-5 border-t border-paper-edge pt-3 text-sm text-ink-500">
                3 tickets · 0 minutes of agent time
              </p>
            </InView>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
