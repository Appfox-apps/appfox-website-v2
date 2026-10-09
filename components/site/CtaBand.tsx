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
        {/* Hard frame behind the close */}
        <div
          aria-hidden="true"
          className="brutalist-only pointer-events-none absolute left-1/2 top-1/2 h-[22rem] w-[min(100%,36rem)] -translate-x-1/2 -translate-y-1/2 border-[3px] border-marigold-500 opacity-40"
        />

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
