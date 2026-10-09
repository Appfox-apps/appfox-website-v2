/**
 * Brutalist frame for product UI stills: ink caption bar, 3px rule,
 * hard offset shadow. Inner copy stays the real product UI.
 */
export function ProductFrame({
  kicker,
  children,
  className = "",
}: {
  kicker: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`border-[3px] border-ink-900 bg-paper-raised shadow-[6px_6px_0_0_#0A0A0A] ${className}`}
    >
      <div className="flex items-center justify-between gap-3 border-b-[3px] border-ink-900 bg-ink-900 px-3 py-1.5">
        <span className="till text-[0.625rem] font-bold uppercase tracking-[0.16em] text-marigold-500">
          {kicker}
        </span>
        <span className="flex gap-1" aria-hidden="true">
          <span className="block h-2.5 w-2.5 bg-marigold-500" />
          <span className="block h-2.5 w-2.5 bg-brand-600" />
        </span>
      </div>
      {children}
    </div>
  );
}
