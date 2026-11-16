import { competitors } from "../data/competitors";
import { isAppHidden, ORDER_EDITING_POST_SLUGS } from "./visibility";

type TemporaryRedirect = {
  source: string;
  destination: string;
  permanent: false;
};

/**
 * Marketing paths for a hidden app. Exact paths are removed from the sitemap
 * and disallowed in robots.txt. `next.config` 307s each one to the homepage.
 * Prefixes also cover opengraph-image routes under the same folder.
 */
const ORDER_EDITING_PREFIXES = [
  "/order-editing",
  "/features/order-editing",
  "/pricing/order-editing",
] as const;

export function hiddenPathnames(): string[] {
  if (!isAppHidden("order-editing")) return [];

  const comparisons = competitors
    .filter((competitor) => competitor.app === "order-editing")
    .map((competitor) => `/vs/${competitor.slug}`);
  const posts = ORDER_EDITING_POST_SLUGS.map((slug) => `/blog/${slug}`);

  return [...ORDER_EDITING_PREFIXES, ...comparisons, ...posts];
}

export function isHiddenPublicPath(href: string): boolean {
  const path = href.split(/[?#]/)[0] ?? href;
  return hiddenPathnames().some((hidden) => path === hidden || path.startsWith(`${hidden}/`));
}

/**
 * Temporary 307s. Next.js uses 307 when `permanent` is false, and does not
 * cache that the way a 308 would, so emptying HIDDEN_APP_SLUGS publishes the
 * URLs again without a permanent-redirect to undo.
 */
export function hiddenRedirects(): TemporaryRedirect[] {
  return hiddenPathnames().flatMap((path) => {
    const rules: TemporaryRedirect[] = [
      { source: path, destination: "/", permanent: false },
    ];
    if ((ORDER_EDITING_PREFIXES as readonly string[]).includes(path)) {
      rules.push({ source: `${path}/:path*`, destination: "/", permanent: false });
    }
    return rules;
  });
}
