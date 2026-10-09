/** AppFox wordmark. Brutalist uses a signal-yellow square; control keeps the violet dot. */
export function Wordmark({
  className = "text-2xl",
  onNight = false,
}: {
  className?: string;
  onNight?: boolean;
}) {
  return (
    <span
      className={`font-display font-extrabold tracking-[-0.04em] ${
        onNight ? "text-cream-on-night" : "text-ink-900"
      } ${className}`}
    >
      AppFox
      <span
        aria-hidden="true"
        className="brutalist-only ml-[0.1em] inline-block h-[0.28em] w-[0.28em] border-2 border-ink-900 bg-marigold-500 align-baseline"
      />
      <span
        aria-hidden="true"
        className="control-only ml-[0.06em] inline-block h-[0.16em] w-[0.16em] rounded-full bg-brand-600 align-baseline"
      />
    </span>
  );
}
