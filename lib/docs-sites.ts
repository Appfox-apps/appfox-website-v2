import raw from "./docs-sites.json";
import { site } from "./site";

/**
 * Mintlify docs served under folders on the apex.
 *
 * Edit `basePath` in lib/docs-sites.json to move a docs site. Set `enabled`
 * to false to skip that site's rewrites, host 301s, sitemap URLs, and the
 * redirect check. Subscriptions stays singular (`/subscription/docs`) so it
 * sits next to the existing /subscription page.
 *
 * The live HTML loads CSS and JS from root `/mintlify-assets`, not from the
 * docs base path. Those paths, and root `/_mintlify`, are not this site's
 * `/_next`. With more than one site enabled, each request is sent to the
 * Mintlify project that owns it. See lib/docs-route-guard.ts and CUTOVER.md.
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
