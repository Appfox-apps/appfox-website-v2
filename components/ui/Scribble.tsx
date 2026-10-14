import { InView } from "@/components/ui/InView";

const PATHS = {
  underline: { d: "M2 8.5C20 5 38 9.5 56 7 72 4.8 88 7.5 98 5.5", viewBox: "0 0 100 12" },
  circle: {
    d: "M96 30C98 12 76 3 50 4 24 5 3 14 4 30 5 46 28 56 52 55 78 54 99 44 94 24 92 16 82 10 70 8",
    viewBox: "0 0 100 60",
  },
} as const;

/**
 * Hand-drawn highlight that draws itself when scrolled into view.
 * `underline` sits under the text; `circle` rings it. Pure SVG + the
 * existing `.draw-path` CSS, so no animation library is needed.
 */
export function Scribble({
  children,
  variant = "underline",
  color = "var(--color-marigold-300)",
  delay = 200,
  className = "",
}: {
  children: React.ReactNode;
  variant?: keyof typeof PATHS;
  color?: string;
  delay?: number;
  className?: string;
}) {
  const { d, viewBox } = PATHS[variant];
  const circle = variant === "circle";
  return (
    <InView as="span" className={`relative inline-block ${className}`} threshold={0.6}>
      {children}
      <svg
        className={
          circle
            ? "pointer-events-none absolute -inset-x-[0.35em] -inset-y-[0.2em] h-[calc(100%+0.4em)] w-[calc(100%+0.7em)]"
            : "pointer-events-none absolute -bottom-[0.04em] left-0 h-[0.2em] w-full"
        }
        viewBox={viewBox}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d={d}
          fill="none"
          stroke={color}
          strokeWidth={circle ? 3 : 5}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          pathLength={400}
          className="draw-path"
          style={{ "--draw-delay": `${delay}ms` } as React.CSSProperties}
        />
      </svg>
    </InView>
  );
}
