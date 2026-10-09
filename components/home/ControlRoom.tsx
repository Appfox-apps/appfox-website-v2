import { InView } from "@/components/ui/InView";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { Perforation } from "@/components/site/Perforation";
import { SectionSlug } from "@/components/site/SectionSlug";

/**
 * NO. 05 - YOU SET THE RULES (§5.7). DARK night section.
 *
 * Seams: the section above (Edit Types) is light paper, so the entry tear
 * is <Perforation from="paper" />. The next section (Upsell Story, light)
 * opens with <Perforation from="night" /> in its own file.
 *
 * The toggle self-flip loop (§9.3, simplified): keyframes cannot be declared
 * via arbitrary Tailwind values, so a small scoped `cr-*` <style> block
 * carries the 6s flip + status-label crossfade. It is gated behind
 * prefers-reduced-motion; the static state matches the spec copy
 * (`Cancellations - Require approval`).
 */

const RULE_BULLETS: { title: string; body: string }[] = [
  {
    title: "Edit windows",
    body: "Set an editing window - 24h, 48h, whatever fits how you ship. When it closes, so does editing.",
  },
  {
    title: "Fulfillment cutoffs",
    body: "Once an order ships or hits your cutoff, editing switches off. Customers never race your warehouse.",
  },
  {
    title: "Approval or auto-apply, per action",
    body: "Auto-apply address fixes; queue cancellations for review. Every change lands on an audit timeline.",
  },
];

const TIMELINE_EVENTS: {
  time: string;
  label: React.ReactNode;
  dotColor: string;
}[] = [
  {
    time: "14:02",
    label: (
      <>
        <span className="text-cream-on-night">Edit requested</span>{" "}
        <span className="text-mist-on-night/70">· customer</span>
      </>
    ),
    dotColor: "var(--color-brand-300)",
  },
  {
    time: "14:02",
    label: (
      <>
        <span className="text-cream-on-night">Rule check: pre-fulfillment</span>{" "}
        <svg viewBox="0 0 24 24" className="inline-block h-3 w-3 align-baseline" fill="none" aria-hidden="true">
          <path
            d="M4 12.5l5.2 5L20 6.5"
            pathLength={400}
            className="draw-path"
            stroke="var(--color-success)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ "--draw-delay": "1150ms" } as React.CSSProperties}
          />
        </svg>
      </>
    ),
    dotColor: "var(--color-brand-300)",
  },
  {
    time: "14:02",
    label: <span className="text-success">Auto-approved</span>,
    dotColor: "var(--color-success)",
  },
  {
    time: "14:03",
    label: (
      <>
        <span className="text-cream-on-night">Payment captured</span>{" "}
        <span className="text-marigold-300">+$24.00</span>
      </>
    ),
    dotColor: "var(--color-marigold-300)",
  },
];

/* 6s self-flip loop for the Cancellations toggle + status-label crossfade.
   Base state (no JS, reduced motion): knob left, fill hidden, label A
   ("Require approval") showing. */
const TOGGLE_CSS = `
.cr-fill, .cr-label-b { opacity: 0; }
@media (prefers-reduced-motion: no-preference) {
  .cr-knob { animation: cr-knob 6s cubic-bezier(0.45, 0, 0.15, 1) infinite; }
  .cr-fill { animation: cr-fade 6s cubic-bezier(0.45, 0, 0.15, 1) infinite; }
  .cr-label-a { animation: cr-label-a 6s cubic-bezier(0.45, 0, 0.15, 1) infinite; }
  .cr-label-b { animation: cr-label-b 6s cubic-bezier(0.45, 0, 0.15, 1) infinite; }
}
@keyframes cr-knob { 0%, 44% { transform: translateX(0); } 52%, 94% { transform: translateX(14px); } 100% { transform: translateX(0); } }
@keyframes cr-fade { 0%, 44% { opacity: 0; } 52%, 94% { opacity: 1; } 100% { opacity: 0; } }
@keyframes cr-label-a { 0%, 44% { opacity: 1; } 52%, 94% { opacity: 0; } 100% { opacity: 1; } }
@keyframes cr-label-b { 0%, 44% { opacity: 0; } 52%, 94% { opacity: 1; } 100% { opacity: 0; } }
`;

export function ControlRoom() {
  return (
    <section id="control-room" className="on-night night-wash grain relative">
      <Perforation from="paper" />
      <style>{TOGGLE_CSS}</style>

      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-28 lg:px-10">
        <Reveal variant="none">
          <SectionSlug
            no="05"
            label="YOU SET THE RULES"
            caption="Edit windows, cutoffs, approvals - your call"
            onNight
          />
        </Reveal>

        <div className="mt-12 grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left - copy, rule bullets, footnote */}
          <div>
            <Reveal>
              <h2
                className="max-w-xl text-cream-on-night"
                style={{ color: "var(--color-cream-on-night)" }}
              >
                Self-service, on your terms.
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-5 max-w-lg text-mist-on-night">
                Customers only ever see edits you’ve allowed, inside the windows you’ve set. You’re
                delegating the typing, not the decision.
              </p>
            </Reveal>

            <StaggerGroup step={100} base={160}>
              <ul className="mt-9 space-y-6">
                {RULE_BULLETS.map((bullet, i) => (
                  <Reveal key={bullet.title} index={i} as="li">
                    <div className="flex gap-4">
                      <svg
                        viewBox="0 0 24 24"
                        className="mt-1 h-5 w-5 shrink-0"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M4 12.5l5.2 5L20 6.5"
                          pathLength={400}
                          className="draw-path"
                          stroke="var(--color-success)"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ "--draw-delay": "250ms" } as React.CSSProperties}
                        />
                      </svg>
                      <div>
                        <p className="font-semibold text-cream-on-night">{bullet.title}</p>
                        <p className="mt-1 text-[0.9375rem] leading-relaxed text-mist-on-night">
                          {bullet.body}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </StaggerGroup>

            <Reveal delay={520}>
              <p className="till mt-9 border-t border-(--color-night-edge) pt-4 text-[0.8125rem] text-mist-on-night/80">
                Ineligible edits are never shown to the customer.
              </p>
            </Reveal>
          </div>

          {/* Right - dark admin mockup: rules panel + audit timeline */}
          <Reveal variant="left" delay={160}>
            <AdminMockup />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── Admin mockup - eligibility rules above the audit timeline ──── */

function AdminMockup() {
  return (
    <InView className="relative">
      <div
        className="card-night p-6 shadow-(--shadow-card) sm:p-7"
        aria-hidden="true"
      >
        {/* Header */}
        <div className="flex items-baseline justify-between gap-3 border-b border-(--color-night-edge) pb-4">
          <p className="font-semibold text-cream-on-night">Eligibility rules</p>
          <p className="till text-[0.6875rem] tracking-[0.12em] text-mist-on-night/70">
            OAK &amp; ANCHOR · ADMIN
          </p>
        </div>

        {/* Toggle rows */}
        <ul className="till divide-y divide-(--color-night-edge) text-[0.875rem]">
          <li className="flex items-center justify-between gap-3 py-3.5">
            <span className="text-cream-on-night">Address changes</span>
            <span className="flex items-center gap-2.5">
              <Toggle on />
              <span className="text-[0.8125rem] text-success">Auto-apply</span>
            </span>
          </li>
          <li className="flex items-center justify-between gap-3 py-3.5">
            <span className="text-cream-on-night">Cancellations</span>
            <span className="flex items-center gap-2.5">
              <Toggle animated />
              {/* Status label crossfades on the same 6s timeline as the toggle */}
              <span className="grid justify-items-end text-[0.8125rem]">
                <span className="cr-label-a col-start-1 row-start-1 text-warn">
                  Require approval
                </span>
                <span className="cr-label-b col-start-1 row-start-1 text-success">Auto-apply</span>
              </span>
            </span>
          </li>
          <li className="flex items-center justify-between gap-3 py-3.5">
            <span className="text-cream-on-night">Edit window</span>
            <span className="rounded-lg border border-(--color-night-edge) px-2 py-0.5 text-[0.75rem] text-cream-on-night">
              24h
            </span>
          </li>
        </ul>

        {/* Audit timeline */}
        <div className="flex items-baseline justify-between border-t border-(--color-night-edge) pt-4">
          <p className="till text-[0.6875rem] uppercase tracking-[0.12em] text-mist-on-night/70">
            Audit timeline
          </p>
          <p className="till text-[0.6875rem] text-mist-on-night/70">#1042</p>
        </div>

        <div className="relative mt-4">
          {/* Vertical dashed thread - dashed stroke revealed by a solid
              draw-path mask so it draws on without losing the stitch. */}
          <svg
            className="absolute bottom-[8px] left-[6px] top-[8px] w-[2px]"
            viewBox="0 0 2 100"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <mask id="cr-audit-mask" maskUnits="userSpaceOnUse">
                <path
                  d="M1 0 L1 100"
                  pathLength={400}
                  className="draw-path"
                  stroke="#fff"
                  strokeWidth="4"
                  style={{ "--draw-delay": "200ms" } as React.CSSProperties}
                />
              </mask>
            </defs>
            <path
              d="M1 0 L1 100"
              pathLength={100}
              stroke="var(--color-brand-300)"
              strokeWidth="2"
              strokeDasharray="0.9 2.1"
              strokeLinecap="round"
              mask="url(#cr-audit-mask)"
            />
          </svg>

          <ol className="space-y-4">
            {TIMELINE_EVENTS.map((event, i) => (
              <li
                key={i}
                className="print-out relative pl-7"
                style={{ "--i": i * 4, "--print-delay": "350ms" } as React.CSSProperties}
              >
                <span
                  className="absolute left-[2px] top-[5px] h-2.5 w-2.5 rounded-full"
                  style={{
                    backgroundColor: event.dotColor,
                    boxShadow: "0 0 0 3px var(--color-night-raised)",
                  }}
                />
                <p className="till text-[0.8125rem] leading-relaxed">
                  <span className="text-mist-on-night/70">{event.time}</span> {event.label}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </InView>
  );
}

/* ── Toggle pill - static (on/off) or riding the 6s cr-* loop ───── */

function Toggle({ on = false, animated = false }: { on?: boolean; animated?: boolean }) {
  return (
    <span
      className="relative inline-block h-[18px] w-8 shrink-0 border border-(--color-night-edge) bg-ink-900"
      aria-hidden="true"
    >
      <span
        className={`absolute inset-0 bg-success${
          animated ? " cr-fill" : on ? "" : " opacity-0"
        }`}
      />
      <span
        className={`absolute left-[2px] top-[2px] h-3 w-3 bg-cream-on-night${
          animated ? " cr-knob" : on ? " translate-x-[14px]" : ""
        }`}
      />
    </span>
  );
}

export default ControlRoom;
