import raw from "./docs-sites.json";
import { site } from "./site";

/**
 * Mintlify docs served under folders on the apex.
 *
 * Edit `basePath` in lib/docs-sites.json to move a docs site. Set `enabled`
 * to false to skip that site's rewrites, host 301s, sitemap URLs, and the
 * redirect check. A second enabled site fails the build (see below).
 * Subscriptions stays singular (`/subscription/docs`) so it sits next to the
 * existing /subscription page.
 *
 * Root `/mintlify-assets/*` and `/_mintlify/*` are proxied to the single
 * enabled site (the live HTML loads CSS and JS from `/mintlify-assets`).
 * Those paths are not this site's `/_next`. Enabling a second site fails
 * the build, because one rewrite cannot serve both projects. See CUTOVER.md.
 */

export type DocsSite = {
  id: string;
  enabled: boolean;
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
