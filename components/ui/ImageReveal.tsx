import { InView } from "@/components/ui/InView";

/**
 * Screenshot/media reveal: a soft-edged wipe with a blur-to-sharp settle,
 * triggered on scroll. Pure CSS (clip-path + filter), so it costs no JS
 * beyond the shared IntersectionObserver in <InView>. Content is fully
 * visible without JS and under prefers-reduced-motion.
 */
export function ImageReveal({
  children,
  className = "",
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "left";
}) {
  return (
    <InView className={`image-reveal image-reveal-${direction} ${className}`} threshold={0.25}>
      <div className="image-reveal-inner">{children}</div>
    </InView>
  );
}
