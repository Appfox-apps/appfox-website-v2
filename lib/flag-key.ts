/** Vercel Flags key for the site-design experiment. */
export const FLAG_KEY = "brutalist-redesign";

export const DESIGN_VARIANTS = ["control", "brutalist"] as const;

export type DesignVariant = (typeof DESIGN_VARIANTS)[number];

/** Stable visitor id. The production split buckets on `visitor.id`. */
export const VISITOR_COOKIE = "vercel-flag-visitor-id";

/** QA override set by `?flag=brutalist-redesign=<variant>`. Sticky. */
export const OVERRIDE_COOKIE = "brutalist-redesign";

export function asDesign(value: unknown): DesignVariant | null {
  return value === "control" || value === "brutalist" ? value : null;
}

/**
 * QA force. Accepts `?flag=brutalist-redesign=brutalist` (or `control`).
 * Repeated `flag` params are scanned until one matches this key.
 */
export function designFromFlagQuery(params: { getAll(name: string): string[] }): DesignVariant | null {
  for (const raw of params.getAll("flag")) {
    const eq = raw.indexOf("=");
    if (eq === -1) continue;
    const key = raw.slice(0, eq);
    const value = raw.slice(eq + 1);
    if (key !== FLAG_KEY) continue;
    const design = asDesign(value);
    if (design) return design;
  }
  return null;
}
