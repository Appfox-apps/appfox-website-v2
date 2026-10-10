import { Perforation } from "@/components/site/Perforation";
import { SectionSlug } from "@/components/site/SectionSlug";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { InView } from "@/components/ui/InView";
import { DigitRoll } from "@/components/ui/DigitRoll";

/**
 * §5.10 Integrations + Analytics - light · `NO. 08 - YOUR STACK`.
 * Seam: expects the dark TheMath section (§5.9) directly above - the
 * opening <Perforation from="night" /> tears out of it. The section below
 * (Pricing, §5.11) is a sunken band; no closing perforation needed here.
 *
 * Integration tiles are typographic only (no trademark logos) - each gets
 * a small functional vignette built from CSS/SVG. Beneath, a fake-browser
 * analytics frame with obviously-demo numbers (product-UI demo values).
 */

/* Edit volume by day - 14 demo bars, % heights */
const BARS = [34, 46, 38, 52, 44, 61, 53, 68, 57, 74, 66, 82, 76, 90];

const KPIS = [
  { label: "EDIT VOLUME", value: "238" },
  { label: "APPROVAL RATE", value: "92%" },
  { label: "UPSELL REVENUE", value: "$4,820" },
  { label: "TIME-TO-APPROVE", value: "1.4h" },
] as const;

function Tile({
  index,
  name,
  blurb,
  children,
}: {
  index: number;
  name: string;
  blurb: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Reveal index={index} className="h-full" as="li">
      <article className="card lift flex h-full flex-col p-4 sm:p-5">
        <div
          className="flex h-28 items-center justify-center overflow-hidden rounded-lg border border-paper-edge bg-paper p-3"
          aria-hidden="true"
        >
          {children}
        </div>
        <p className="mt-4 text-base font-semibold text-ink-900">{name}</p>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{blurb}</p>
      </article>
    </Reveal>
  );
}

/* Shopify Flow - trigger→action node pair joined by a marching dashed wire */
function FlowVignette() {
  return (
    <div className="relative flex h-full w-full items-center justify-between">
      <svg
        className="absolute left-1/2 top-1/2 h-10 w-16 -translate-x-1/2 -translate-y-1/2"
        viewBox="0 0 64 40"
        fill="none"
        aria-hidden="true"
      >
        <path
          className="dash-flow"
          d="M2 20 C 20 8, 44 32, 62 20"
          stroke="var(--color-brand-300)"
          strokeWidth={2}
          strokeDasharray="2 6"
          strokeLinecap="round"
        />
      </svg>
      <div className="relative rounded-lg border border-brand-200 bg-brand-50 px-2 py-1.5">
        <p className="till text-[9px] tracking-[0.12em] text-brand-600">TRIGGER</p>
        <p className="text-[11px] font-semibold leading-tight text-ink-900">Order edited</p>
      </div>
      <div className="relative rounded-lg border border-paper-edge bg-paper-raised px-2 py-1.5 text-right shadow-(--shadow-card)">
        <p className="till text-[9px] tracking-[0.12em] text-marigold-700">ACTION</p>
        <p className="text-[11px] font-semibold leading-tight text-ink-900">Notify 3PL</p>
      </div>
    </div>
  );
}

/* Gorgias - mini ticket sidebar with order context rows */
function GorgiasVignette() {
  return (
    <div className="flex h-full w-full flex-col justify-center gap-1">
      <div className="flex items-center justify-between rounded-md bg-paper-sunken px-2 py-1">
        <span className="till text-[10px] text-ink-700">#1042</span>
        <span className="till text-[9px] tracking-[0.08em] text-ink-500">OAK &amp; ANCHOR</span>
      </div>
      <div className="flex items-center justify-between px-2 py-0.5">
        <span className="text-[10px] text-ink-500">Edit status</span>
        <span className="rounded bg-success-bg px-1.5 text-[9px] font-semibold text-success">
          Approved
        </span>
      </div>
      <div className="flex items-center justify-between border-t border-paper-edge px-2 py-0.5">
        <span className="text-[10px] text-ink-500">Edit window</span>
        <span className="till text-[10px] text-ink-700">14h left</span>
      </div>
      <div className="flex items-center justify-between border-t border-paper-edge px-2 py-0.5">
        <span className="text-[10px] text-ink-500">Upsell</span>
        <span className="till text-[10px] text-marigold-700">+$24.00</span>
      </div>
    </div>
  );
}

/* Slack - message bubble printing in on reveal */
function SlackVignette() {
  return (
    <InView className="flex h-full w-full items-center">
      <div className="print-out flex w-full items-start gap-2">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-600 text-[11px] font-bold text-cream-on-night">
          Af
        </div>
        <div className="min-w-0">
          <p className="flex items-baseline gap-1.5">
            <span className="text-[11px] font-bold text-ink-900">Appfox</span>
            <span className="rounded-sm bg-paper-sunken px-1 text-[8px] font-semibold tracking-wide text-ink-500">
              APP
            </span>
            <span className="till text-[9px] text-ink-300">14:02</span>
          </p>
          <p className="till mt-0.5 text-[10px] leading-snug text-ink-700">
            Edit pending approval · #1042 · SLA 2h
          </p>
        </div>
      </div>
    </InView>
  );
}

/* Email - mini branded email frame + customizable color-dot row */
function EmailVignette() {
  return (
    <div className="flex h-full w-full flex-col justify-center gap-2">
      <div className="overflow-hidden rounded-lg border border-paper-edge bg-paper-raised shadow-(--shadow-card)">
        <div className="flex items-center gap-1.5 bg-brand-600 px-2 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-cream-on-night/80" />
          <span className="till text-[8px] tracking-[0.1em] text-cream-on-night/90">
            YOUR STORE
          </span>
        </div>
        <div className="space-y-1 px-2 py-2">
          <div className="h-1 w-3/4 rounded bg-paper-sunken" />
          <div className="h-1 w-1/2 rounded bg-paper-sunken" />
          <div className="mt-1.5 h-4 w-16 rounded-md bg-brand-600" />
        </div>
      </div>
      <div className="flex items-center gap-1.5 px-1">
        <span className="till text-[8px] tracking-[0.1em] text-ink-500">BRAND</span>
        <span className="h-2.5 w-2.5 rounded-full bg-brand-600 ring-2 ring-brand-200 ring-offset-1 ring-offset-paper" />
        <span className="h-2.5 w-2.5 rounded-full bg-marigold-500" />
        <span className="h-2.5 w-2.5 rounded-full bg-success" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink-900" />
        <span className="h-2.5 w-2.5 rounded-full bg-danger" />
      </div>
    </div>
  );
}

export function Integrations() {
  return (
    <section id="integrations" className="relative">
      {/* Tears out of the dark TheMath section above */}
      <Perforation from="night" />
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-28 lg:px-10">
        <Reveal variant="none">
          <SectionSlug no="08" label="YOUR STACK" caption="Wired into the tools you already run." />
        </Reveal>
        <Reveal>
          <h2 className="mt-8 max-w-2xl">Plays nicely with your support stack.</h2>
        </Reveal>

        <ul className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          <StaggerGroup step={80}>
            <Tile
              index={0}
              name="Shopify Flow"
              blurb="Custom triggers and actions - an order edit can kick off anything else in your ops."
            >
              <FlowVignette />
            </Tile>
            <Tile
              index={1}
              name="Gorgias"
              blurb="See the order’s edit status right inside the ticket - and resolve it without switching tabs."
            >
              <GorgiasVignette />
            </Tile>
            <Tile
              index={2}
              name="Slack"
              blurb="Approval alerts and SLA-breach warnings, so a pending edit never sits unseen overnight."
            >
              <SlackVignette />
            </Tile>
            <Tile
              index={3}
              name="Email"
              blurb="Branded transactional emails for every edit, confirmation, and approval - your logo, not ours."
            >
              <EmailVignette />
            </Tile>
          </StaggerGroup>
        </ul>

        {/* Analytics - fake-browser frame, demo numbers */}
        <Reveal delay={120}>
          <div className="card mt-6 overflow-hidden sm:mt-8">
            {/* Browser chrome */}
            <div className="flex items-center gap-1.5 border-b border-paper-edge bg-paper px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-paper-edge" aria-hidden="true" />
              <span className="h-2.5 w-2.5 rounded-full bg-paper-edge" aria-hidden="true" />
              <span className="h-2.5 w-2.5 rounded-full bg-paper-edge" aria-hidden="true" />
              <span className="till mx-auto rounded-md bg-paper-sunken px-2.5 py-0.5 text-[11px] text-ink-500">
                appfox · analytics
              </span>
              <span className="w-12" aria-hidden="true" />
            </div>

            <InView className="p-5 sm:p-7">
              <div className="grid gap-8 lg:grid-cols-[1.65fr_1fr] lg:items-end">
                {/* Bar chart - edit volume by day */}
                <div>
                  <div className="flex items-baseline justify-between">
                    <p className="till text-[11px] tracking-[0.12em] text-ink-500">
                      EDIT VOLUME - LAST 14 DAYS
                    </p>
                    <p className="till hidden text-[11px] text-ink-300 sm:block">DEMO DATA</p>
                  </div>
                  <div
                    className="mt-4 flex h-36 items-end gap-1.5 border-b border-paper-edge sm:gap-2"
                    aria-hidden="true"
                  >
                    {BARS.map((h, i) => (
                      <div
                        key={i}
                        className={`bar-grow flex-1 rounded-t-[3px] ${
                          i === BARS.length - 1 ? "bg-brand-600" : "bg-brand-300"
                        }`}
                        style={{ height: `${h}%`, "--i": i } as React.CSSProperties}
                      />
                    ))}
                  </div>
                  <div className="mt-2 flex justify-between">
                    <span className="till text-[10px] text-ink-300">MAY 27</span>
                    <span className="till text-[10px] text-ink-300">JUN 09</span>
                  </div>
                </div>

                {/* Approval-rate donut */}
                <div className="flex items-center gap-5">
                  <div
                    className="relative h-28 w-28 shrink-0 rounded-full"
                    style={{
                      background:
                        "conic-gradient(var(--color-brand-600) 0deg 331deg, var(--color-brand-100) 331deg 360deg)",
                    }}
                  >
                    <div className="absolute inset-3 flex items-center justify-center rounded-full bg-paper-raised">
                      <DigitRoll value="92%" className="text-xl text-ink-900" />
                    </div>
                  </div>
                  <div>
                    <p className="till text-[11px] tracking-[0.12em] text-ink-500">APPROVAL RATE</p>
                    <p className="mt-1 text-sm leading-snug text-ink-500">
                      Auto-applied or approved within the edit window.
                    </p>
                  </div>
                </div>
              </div>

              {/* KPI tiles */}
              <div className="mt-7 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                {KPIS.map((k) => (
                  <div
                    key={k.label}
                    className="rounded-xl border border-paper-edge bg-paper px-4 py-3.5"
                  >
                    <p className="till text-[10px] tracking-[0.12em] text-ink-500">{k.label}</p>
                    <DigitRoll value={k.value} className="mt-1 text-2xl text-ink-900" />
                  </div>
                ))}
              </div>
            </InView>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default Integrations;
