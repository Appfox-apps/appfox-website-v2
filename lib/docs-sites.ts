import raw from "./docs-sites.json";
import { site } from "./site";

/**
 * Mintlify docs served under folders on the apex.
 *
 * Edit `basePath` in lib/docs-sites.json to move a docs site. Redirects,
 * rewrites, the sitemap, and scripts/check-docs-redirects.mjs all read it.
 * Subscriptions stays singular (`/subscription/docs`) so it sits next to the
 * existing /subscription page.
 *
 * Only those base paths are proxied. Root `/_mintlify/*` and
 * `/mintlify-assets/*` are shared by every Mintlify project, so one rewrite
 * cannot serve both docs sites. See CUTOVER.md.
 */

export type DocsSite = {
  id: string;
  legacyHost: string;
  basePath: string;
  mintlifyOrigin: string;
  sitemapUrl: string;
};

export const CANONICAL_ORIGIN = raw.canonicalOrigin;
export const docsSites: readonly DocsSite[] = raw.sites;

if (CANONICAL_ORIGIN !== site.url) {
  throw new Error(
    `Docs canonical origin ${CANONICAL_ORIGIN} must match site.url ${site.url}`,
  );
}

export function docsPublicUrl(basePath: string, pathname: string): string {
  const suffix = pathname === "/" ? "" : pathname;
  return `${CANONICAL_ORIGIN}${basePath}${suffix}`;
}
