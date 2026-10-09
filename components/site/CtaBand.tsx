import Link from "next/link";
import { Perforation } from "./Perforation";
import { site } from "@/lib/site";

/**
 * Dark final-CTA band with the rotating dashed "stamp about to land"
 * circle. Carries the only marigold button on each page. Place directly
 * above the <Footer /> - the night background runs continuously into it.
 */
export function CtaBand({
  headline,
  body,
  primaryLabel = "Install free on Shopify",
  primaryHref = site.installUrl,
  secondaryLabel,
  secondaryHref,
  from = "paper",
}: {
  headline: string;
  body: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  /** background of the section above (for the perforation tear) */
  from?: "paper" | "sunken" | "raised";
}) {
  return (
    <section className="on-night night-wash grain relative overflow-hidden">
      <Perforation from={from} />
      <div className="relative max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 py-24 sm:py-32 text-center">
        {/* The stamp about to land */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[34rem] pointer-events-none"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full orbit-slow opacity-25">
            <circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="var(--color-brand-300)"
              strokeWidth="0.4"
              strokeDasharray="0.6 2.4"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <h2 className="relative text-cream-on-night max-w-3xl mx-auto">{headline}</h2>
        <p className="relative mt-5 text-lg text-mist-on-night max-w-2xl mx-auto leading-relaxed">
          {body}
        </p>
        <div className="relative mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href={primaryHref} className="btn-marigold">
            {primaryLabel}
          </a>
          {secondaryLabel && secondaryHref ? (
            secondaryHref.startsWith("/") ? (
              <Link href={secondaryHref} className="btn-secondary on-night">
                {secondaryLabel}
              </Link>
            ) : (
              <a href={secondaryHref} className="btn-secondary on-night">
                {secondaryLabel}
              </a>
            )
          ) : null}
        </div>
        <p className="relative till mt-8 text-xs text-mist-on-night/80">
          Free plan available · {site.supportEmail}
        </p>
      </div>
    </section>
  );
}
