"use client";

import { createContext, useContext, useEffect, useRef } from "react";

type RevealVariant = "up" | "down" | "left" | "right" | "scale" | "blur" | "none";

const StaggerContext = createContext<{ step: number; base: number } | null>(null);

/**
 * Marks the wrapper with `.is-visible` once it has entered the viewport.
 * Content is painted at full opacity immediately — visibility does not wait
 * on this class. The class is only a hook for optional decoration.
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
    const show = () => el.classList.add("is-visible");
    const inOrPastView = () => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    };
    if (inOrPastView()) show();
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px" }
    );
    observer.observe(el);
    // A fast fling can jump an element across the viewport between
    // observer frames. The scroll event still fires at the end, and any
    // block already on screen or above it must not stay unrevealed.
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
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
