import { DigitRoll } from "@/components/ui/DigitRoll";
import { InView } from "@/components/ui/InView";

/**
 * §5.3 Trust Strip - sunken band directly under the hero. Four mono stat
 * chips separated by hairlines; numbers roll in via DigitRoll. Below `lg`
 * the row becomes a horizontal marquee (paused on hover/focus, stopped
 * under reduced-motion). Light section - no perforation on either side.
 *
 * No rating claim here: the app has no public App Store reviews yet.
 */

/** The four stat chips. `withDividers` adds a per-cell hairline for the marquee loop. */
function StatItems({ withDividers = false }: { withDividers?: boolean }) {
  const cell = `till flex items-center justify-center gap-2 whitespace-nowrap px-4 py-1 text-[0.875rem] text-ink-700${
    withDividers ? " border-r border-paper-edge" : ""
  }`;
  return (
    <>
      <div className={cell}>
        <span>No per-edit fees</span>
      </div>
      <div className={cell}>
        <span>
          <DigitRoll value="~80%" /> of common edits self-served
        </span>
      </div>
      <div className={cell}>
        <span>
          <DigitRoll value="5" />
          -minute setup
        </span>
      </div>
      <div className={cell}>
        <span>All Shopify plans</span>
      </div>
    </>
  );
}

export function TrustStrip() {
  return (
    <section aria-label="Appfox at a glance" className="border-y border-paper-edge bg-paper-sunken">
      <InView>
        {/* lg+: one row, hairline-separated (4 nowrap columns need the room) */}
        <div className="mx-auto hidden max-w-7xl grid-cols-4 divide-x divide-paper-edge px-6 py-5 sm:px-8 lg:grid lg:px-10">
          <StatItems />
        </div>

        {/* Below lg: horizontal marquee, content duplicated for a seamless loop */}
        <div className="marquee-pause overflow-hidden py-4 lg:hidden">
          <div className="marquee-x flex w-max items-center">
            <div className="flex items-center">
              <StatItems withDividers />
            </div>
            <div className="flex items-center" aria-hidden="true">
              <StatItems withDividers />
            </div>
          </div>
        </div>
      </InView>
    </section>
  );
}
