"use client";

import { useEffect, useRef } from "react";

/**
 * Adds `.is-visible` to the wrapper when it scrolls into view - the CSS
 * trigger for stamps, digit rolls, draw-paths, print-outs and bar charts.
 * Unlike <Reveal>, children are never hidden; this only fires animations.
 */
export function InView({
  children,
  className = "",
  threshold = 0.2,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  as?: "div" | "section" | "span" | "li" | "figure";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className}>
      {children}
    </Tag>
  );
}
