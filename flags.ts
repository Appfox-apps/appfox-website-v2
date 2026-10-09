import { dedupe, flag } from "flags/next";
import { vercelAdapter } from "@flags-sdk/vercel";
import { FLAG_KEY, VISITOR_COOKIE, type DesignVariant } from "@/lib/flag-key";

type Entities = {
  visitor?: { id: string };
};

/**
 * Same visitor id on every flag read in the request.
 * Proxy stamps `x-flags-visitor-id` on the first visit, then the cookie.
 */
const identify = dedupe(({ cookies, headers }): Entities => {
  const id =
    cookies.get(VISITOR_COOKIE)?.value || headers.get("x-flags-visitor-id") || undefined;
  return { visitor: id ? { id } : undefined };
});

/**
 * 50/50 sticky experiment. Production evaluates this through Vercel Flags.
 * A missing flag, an archived flag, or a failed evaluation falls back to
 * `control` (the pre-redesign site). Bucket the split on `visitor.id`.
 */
export const brutalistRedesign = flag<DesignVariant, Entities>({
  key: FLAG_KEY,
  description: "Sticky A/B of the previous site (control) versus the brutalist redesign.",
  defaultValue: "control",
  options: [
    { value: "control", label: "Control" },
    { value: "brutalist", label: "Brutalist" },
  ],
  identify,
  adapter: vercelAdapter(),
});
