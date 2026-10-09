import { cache } from "react";
import { headers } from "next/headers";
import { brutalistRedesign } from "@/flags";
import { asDesign, type DesignVariant } from "@/lib/flag-key";

export type { DesignVariant };

/**
 * Resolved design for this request.
 * Query/cookie override wins, then the Vercel flag, then control.
 */
export const getDesign = cache(async (): Promise<DesignVariant> => {
  const headerStore = await headers();
  const forced = asDesign(headerStore.get("x-design-override"));
  if (forced) return forced;

  try {
    const value = await brutalistRedesign();
    return asDesign(value) ?? "control";
  } catch {
    return "control";
  }
});
