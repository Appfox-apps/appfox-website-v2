"use client";

import { useEffect, useState } from "react";

/**
 * Cycles through `words` in place. All words share one grid cell, so the
 * container is as wide as the longest word and the layout never shifts.
 * Only the active word is exposed to assistive tech; with
 * prefers-reduced-motion the first word stays put.
 *
 * `underline` draws the hand-drawn marigold scribble under each word as it
 * enters (reuses the site's `.draw-path` machinery).
 */
export function RotatingWords({
  words,
  interval = 2800,
  className = "",
  wordClassName = "",
  underline = false,
}: {
  words: string[];
  interval?: number;
  className?: string;
  wordClassName?: string;
  underline?: boolean;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (words.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className={`rotating-words ${className}`}>
      {words.map((word, i) => (
        <span
          key={word}
          className={`rotating-word${i === active ? " is-active" : ""}`}
          aria-hidden={i === active ? undefined : true}
        >
          <span className={`relative inline-block ${wordClassName}`}>
            {word}
            {underline && (
              <svg
                className="absolute -bottom-[0.04em] left-0 h-[0.2em] w-full"
                viewBox="0 0 100 12"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M2 8.5C20 5 38 9.5 56 7 72 4.8 88 7.5 98 5.5"
                  fill="none"
                  stroke="var(--color-marigold-300)"
                  strokeWidth={5}
                  strokeLinecap="round"
                  pathLength={400}
                  className="draw-path"
                  style={{ "--draw-delay": "250ms" } as React.CSSProperties}
                />
              </svg>
            )}
          </span>
        </span>
      ))}
    </span>
  );
}
