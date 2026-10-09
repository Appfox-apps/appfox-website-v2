import Link from "next/link";
import { apps, getApp } from "@/data/apps";
import { InView } from "@/components/ui/InView";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { AppMark } from "@/components/brand/marks";

/**
 * The front-of-house shelf: one large card per app, each with a mini
 * product vignette, the app's proof points, and both CTAs. Sits directly
 * under the brand hero on the same paper-wash - the hero's second half.
 */

const orderEditing = getApp("order-editing")!;
const subscription = getApp("subscription")!;

/** Hand-drawn tick - never a ✓ character. */
function Tick({ delay }: { delay: number }) {
  return (
    <svg viewBox="0 0 24 24" className="mt-1 h-4 w-4 shrink-0" fill="none" aria-hidden="true">
      <path
        className="draw-path"
        pathLength={400}
        d="M3.5 13.2 9 18.4 20.5 5.8"
        stroke="var(--color-success)"
        strokeWidth={2.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ "--draw-delay": `${delay}ms` } as React.CSSProperties}
      />
    </svg>
  );
}

const VIGNETTES: Record<string, React.ReactNode> = {
  "order-editing": <OrderEditVignette />,
  subscription: <SubscribeVignette />,
  "product-bundles": <BundleVignette />,
};

export function AppShowcase() {
  return (
    <section id="apps" className="paper-wash grain grain-soft relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6 pt-10 pb-20 sm:px-8 sm:pt-12 sm:pb-28 lg:px-10">
        <InView>
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            <StaggerGroup step={140}>
              {apps.map((app, i) => (
                <Reveal key={app.slug} index={i} className="h-full">
                  <article className="relative flex h-full flex-col rounded-2xl border-[3px] border-ink-900 bg-paper-raised p-7 shadow-(--shadow-pop) transition-transform duration-150 hover:-translate-y-1 sm:p-9">
                    <span className="sticker absolute -top-4 left-8 whitespace-nowrap">
                      FREE TO START
                    </span>

                    <div className="flex items-center gap-3">
                      <AppMark slug={app.slug} className="brutalist-only h-11 w-11 shrink-0" />
                      <p className="till text-xs uppercase tracking-[0.12em] text-ink-500">
                        {String(i + 1).padStart(2, "0")} · {app.pricingLine}
                      </p>
                    </div>
                    <h2 className="mt-4 !text-3xl sm:!text-4xl">{app.name}</h2>
                    <p className="mt-2 text-base font-medium text-brand-700">{app.tagline}</p>

                    <div className="mt-6">{VIGNETTES[app.slug]}</div>

                    <ul className="mt-6 space-y-2.5 border-t border-paper-edge pt-6">
                      {app.highlights.slice(0, 3).map((h, j) => (
                        <li key={h} className="flex items-start gap-2.5 text-sm text-ink-700">
                          <Tick delay={250 + j * 40} />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row sm:items-center">
                      <Link href={app.href} className="btn-primary">
                        Explore {app.shortName}
                      </Link>
                      <a href={app.installUrl} className="btn-secondary">
                        Install free
                      </a>
                    </div>
                  </article>
                </Reveal>
              ))}
            </StaggerGroup>
          </div>
        </InView>
      </div>
    </section>
  );
}

/* ── Order Editing - mini portal row, edit auto-applying ─────────── */

function OrderEditVignette() {
  return (
      <div className="rounded-2xl border-[3px] border-ink-900 bg-paper p-4 shadow-(--shadow-card)" aria-hidden="true">
      <div className="flex items-center justify-between gap-2 border-b border-paper-edge pb-2.5">
        <p className="till text-xs text-ink-500">
          <span className="text-ink-700">#1042</span> · Size swap M → L
        </p>
        <span
          className="chip chip-success stamp-in !px-2 !py-0.5 !text-[0.625rem] tracking-wide"
          style={{ "--stamp-delay": "900ms" } as React.CSSProperties}
        >
          AUTO-APPLIED
        </span>
      </div>
      <div className="flex items-center justify-between gap-2 pt-2.5">
        <p className="till text-xs text-ink-500">
          <span className="text-ink-700">#1041</span> · Added gift wrap
        </p>
        <span className="till text-xs text-success">+$4.00 upsell</span>
      </div>
    </div>
  );
}

/* ── Subscription - mini subscribe-and-save widget ───────────────── */

function SubscribeVignette() {
  return (
    <div className="rounded-2xl border-[3px] border-ink-900 bg-paper p-4 shadow-(--shadow-card)" aria-hidden="true">
      <div className="press-selected flex items-center justify-between rounded-lg border-[3px] border-ink-900 bg-marigold-500 px-3 py-2">
        <span className="flex items-center gap-2.5">
          <span className="press-dot flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-ink-900 bg-ink-900">
            <span className="h-1.5 w-1.5 bg-marigold-500" />
          </span>
          <span className="text-xs font-semibold text-ink-900">Subscribe &amp; save 10%</span>
        </span>
        <span className="till text-xs text-brand-700">$16.20/mo</span>
      </div>
      <div className="mt-2 flex items-center justify-between gap-2 pt-0.5">
        <p className="till text-xs text-ink-500">Deliver every 30 days</p>
        <span className="till text-xs text-ink-500">skip · pause · cancel</span>
      </div>
    </div>
  );
}

/* ── Bundles - mini mix-and-match screenshot ─────────────────────── */

function BundleVignette() {
  return (
    <div className="brutalist-only rounded-2xl border-[3px] border-ink-900 bg-paper p-4 shadow-(--shadow-card)" aria-hidden="true">
      <div className="flex items-center justify-between border-b-[3px] border-ink-900 pb-2.5">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-900">Essentials set</p>
        <span className="till text-xs font-bold text-ink-900">Save 20%</span>
      </div>
      <ul className="mt-2.5 space-y-1.5">
        {["Oak Tee", "Wool Beanie", "Canvas Tote"].map((name) => (
          <li key={name} className="flex items-center gap-2 text-xs font-medium text-ink-900">
            <span className="h-3.5 w-3.5 border-2 border-ink-900 bg-ink-900" />
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
