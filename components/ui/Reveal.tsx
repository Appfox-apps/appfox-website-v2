"use client";

import { createContext, useContext, useEffect, useRef } from "react";

type RevealVariant = "up" | "down" | "left" | "right" | "scale" | "blur" | "none";

const StaggerContext = createContext<{ step: number; base: number } | null>(null);

/**
 * Scroll-triggered reveal. Children start hidden (CSS `.reveal`) and animate
 * in when they enter the viewport. Honors prefers-reduced-motion via CSS
 * (the .reveal rules are wrapped in a motion-safe media query in globals.css).
 *
 * Wrap a list in <StaggerGroup> to auto-stagger child <Reveal> delays.
 */
export function Reveal({
  children,
  variant = "up",
  delay,
  index = 0,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  variant?: RevealVariant;
  /** delay in ms; overrides stagger context */
  delay?: number;
  /** position within a StaggerGroup */
  index?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span" | "article";
}) {
  const ref = useRef<HTMLElement>(null);
  const stagger = useContext(StaggerContext);
  const computedDelay = delay ?? (stagger ? stagger.base + index * stagger.step : 0);

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
      { threshold: 0, rootMargin: "0px 0px -100px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={`reveal reveal-${variant}${className ? ` ${className}` : ""}`}
      style={computedDelay ? ({ "--reveal-delay": `${computedDelay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}

/** Provides automatic stagger delays to nested <Reveal index={i}> children. */
export function StaggerGroup({
  children,
  step = 80,
  base = 0,
}: {
  children: React.ReactNode;
  /** ms between consecutive children */
  step?: number;
  /** ms before the first child */
  base?: number;
}) {
  return <StaggerContext.Provider value={{ step, base }}>{children}</StaggerContext.Provider>;
}
