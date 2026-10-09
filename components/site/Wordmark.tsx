/** AppFox wordmark - bold Hanken Grotesk with the violet full-stop after the x. */
export function Wordmark({
  className = "text-2xl",
  onNight = false,
}: {
  className?: string;
  onNight?: boolean;
}) {
  return (
    <span
      className={`font-display font-[750] tracking-[-0.02em] ${
        onNight ? "text-cream-on-night" : "text-ink-900"
      } ${className}`}
    >
      AppFox
      <span aria-hidden="true" className="inline-block w-[0.16em] h-[0.16em] rounded-full bg-brand-600 ml-[0.06em] align-baseline" />
    </span>
  );
}
