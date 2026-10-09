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
    const show = () => el.classList.add("is-visible");
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) show();
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px" }
    );
    observer.observe(el);
    const onScroll = () => {
      const next = el.getBoundingClientRect();
      if (next.top < window.innerHeight) {
        show();
        observer.disconnect();
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [threshold]);

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className}>
      {children}
    </Tag>
  );
}
