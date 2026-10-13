import fs from "node:fs";
import path from "node:path";

const PAGE_FILES = new Set([
  "page.tsx",
  "page.ts",
  "page.jsx",
  "page.js",
  "route.ts",
  "route.js",
]);

type DocsBasePath = {
  id: string;
  basePath: string;
};

/** Static App Router paths (page and route handlers). Route groups are flattened. */
export function listAppRoutes(appDir: string): string[] {
  const routes: string[] = [];

  function walk(dir: string, segments: string[]) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.name.startsWith(".") || entry.name.startsWith("_") || entry.name.startsWith("@")) {
        continue;
      }
      if (entry.isDirectory()) {
        const nextSegments =
          entry.name.startsWith("(") && entry.name.endsWith(")")
            ? segments
            : [...segments, entry.name];
        walk(path.join(dir, entry.name), nextSegments);
        continue;
      }
      if (!PAGE_FILES.has(entry.name)) continue;
      routes.push(segments.length === 0 ? "/" : `/${segments.join("/")}`);
    }
  }

  walk(appDir, []);
  return routes;
}

/**
 * Shared Mintlify paths that are not under a docs base path. The live HTML
 * loads CSS and JS from `/mintlify-assets/_next/static/...`, not from
 * `{basePath}/mintlify-assets`. `/_mintlify` is the analytics, search, and
 * assistant API. Neither prefix is this site's `/_next`.
 *
 * Both projects request those same root paths. A stylesheet URL does not say
 * which project it belongs to. Favicon URLs do: they contain the Mintlify
 * project slug (`/mintlify-assets/_mintlify/favicons/appfox-bundles/...`) and
 * the other origin answers 403. Page-initiated requests send the docs URL as
 * Referer. Fonts loaded from a stylesheet send the stylesheet URL instead, and
 * the `/_next` client files are content-addressed, so either origin can serve
 * them. Anything still ambiguous is rewritten to the probe route, which tries
 * each enabled origin.
 */
export const MINTLIFY_ROOT_ASSET_PREFIXES = ["/mintlify-assets", "/_mintlify"] as const;

/** Internal route that tries each Mintlify origin. Must stay last in the rewrite list. */
export const MINTLIFY_ROOT_ASSET_PROBE_PREFIX = "/api/mintlify-root-asset";

type DocsAssetSite = {
  id: string;
  enabled: boolean;
  basePath: string;
  mintlifyOrigin: string;
};

type HeaderHas = {
  type: "header";
  key: "referer";
  value: string;
};

export type MintlifyRootAssetRewrite = {
  source: string;
  destination: string;
  has?: HeaderHas[];
};

/** Host label of a `*.mintlify.site` origin, for example `appfox-bundles`. */
export function mintlifyProjectSlug(mintlifyOrigin: string): string {
  let hostname: string;
  try {
    hostname = new URL(mintlifyOrigin).hostname;
  } catch {
    throw new Error(`Docs mintlifyOrigin is not a URL: ${mintlifyOrigin}`);
  }
  const slug = hostname.split(".")[0] ?? "";
  if (!/^[a-z0-9-]+$/.test(slug)) {
    throw new Error(`Docs mintlify host ${hostname} has no usable project slug`);
  }
  return slug;
}

/**
 * Next anchors this as `^value$` against the whole Referer header.
 * The path must be the docs base path or a page under it, on any host.
 */
export function docsRefererHeaderPattern(basePath: string): string {
  const escaped = basePath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return `https?://[^/]+${escaped}(?:/[^?#]*)?(?:\\?[^#]*)?`;
}

export function isSharedMintlifyClientAsset(pathname: string): boolean {
  return pathname === "/mintlify-assets/_next" || pathname.startsWith("/mintlify-assets/_next/");
}

/**
 * The Mintlify project that owns this root asset request, when the path or
 * the Referer says so. Null means the caller should try the enabled origins.
 */
export function mintlifyRootAssetOwner<T extends DocsAssetSite>(
  pathname: string,
  referer: string | null,
  sites: readonly T[],
): T | null {
  const enabled = sites.filter((docsSite) => docsSite.enabled);
  const segments = pathname.split("/").filter(Boolean);
  const bySlug = enabled.filter((docsSite) => segments.includes(mintlifyProjectSlug(docsSite.mintlifyOrigin)));
  if (bySlug.length === 1) return bySlug[0];

  let refererPath: string | null = null;
  if (referer) {
    try {
      refererPath = new URL(referer).pathname;
    } catch {
      refererPath = null;
    }
  }
  if (!refererPath) return null;

  const byReferer = enabled
    .filter(
      (docsSite) => refererPath === docsSite.basePath || refererPath.startsWith(`${docsSite.basePath}/`),
    )
    .sort((a, b) => b.basePath.length - a.basePath.length);
  if (byReferer.length === 0) return null;
  if (byReferer.length > 1 && byReferer[0].basePath.length === byReferer[1].basePath.length) return null;
  return byReferer[0];
}

/**
 * Root `/mintlify-assets` and `/_mintlify` must not hide an App Router page
 * or this site's `/_next`. Several enabled docs sites may share the prefixes.
 */
export function assertMintlifyRootAssetPathsDoNotClash(appDir: string): void {
  const routes = listAppRoutes(appDir);
  const siteAssetPrefix: string = "/_next";
  for (const prefix of MINTLIFY_ROOT_ASSET_PREFIXES) {
    const overlapsSiteAssets =
      prefix === siteAssetPrefix ||
      prefix.startsWith(`${siteAssetPrefix}/`) ||
      siteAssetPrefix.startsWith(`${prefix}/`);
    if (overlapsSiteAssets) {
      throw new Error(`Mintlify root asset path ${prefix} clashes with this site's /_next`);
    }
    for (const route of routes) {
      if (route === prefix || route.startsWith(`${prefix}/`)) {
        throw new Error(`Mintlify root asset path ${prefix} clashes with existing route ${route}`);
      }
    }
  }
}

/**
 * beforeFiles external rewrites return on the first match, so the specific
 * rules stay above the shared-client fallback and the probe.
 */
export function mintlifyRootAssetRewrites<T extends DocsAssetSite>(
  sites: readonly T[],
): MintlifyRootAssetRewrite[] {
  const enabled = sites.filter((docsSite) => docsSite.enabled);
  const rewrites: MintlifyRootAssetRewrite[] = [];

  for (const docsSite of enabled) {
    const slug = mintlifyProjectSlug(docsSite.mintlifyOrigin);
    const faviconPath = `/mintlify-assets/_mintlify/favicons/${slug}/:path*`;
    rewrites.push({
      source: faviconPath,
      destination: `${docsSite.mintlifyOrigin}${faviconPath}`,
    });
  }

  for (const docsSite of enabled) {
    const has: HeaderHas[] = [
      { type: "header", key: "referer", value: docsRefererHeaderPattern(docsSite.basePath) },
    ];
    rewrites.push({
      source: "/mintlify-assets/:path+",
      has,
      destination: `${docsSite.mintlifyOrigin}/mintlify-assets/:path+`,
    });
    rewrites.push({
      source: "/_mintlify/:path*",
      has,
      destination: `${docsSite.mintlifyOrigin}/_mintlify/:path*`,
    });
  }

  const shared = enabled[0];
  if (!shared) return rewrites;

  rewrites.push({
    source: "/mintlify-assets/_next/:path+",
    destination: `${shared.mintlifyOrigin}/mintlify-assets/_next/:path+`,
  });
  rewrites.push({
    source: "/mintlify-assets/:path+",
    destination: `${MINTLIFY_ROOT_ASSET_PROBE_PREFIX}/mintlify-assets/:path+`,
  });
  rewrites.push({
    source: "/_mintlify/:path*",
    destination: `${MINTLIFY_ROOT_ASSET_PROBE_PREFIX}/_mintlify/:path*`,
  });

  return rewrites;
}

/**
 * beforeFiles rewrites run ahead of the filesystem, so a base path that
 * equals or contains an existing page would hide that page. Fail the build.
 */
export function assertDocsBasePathsDoNotClash(appDir: string, sites: readonly DocsBasePath[]): void {
  const routes = listAppRoutes(appDir);
  for (const docsSite of sites) {
    if (!docsSite.basePath.startsWith("/") || docsSite.basePath.endsWith("/") || docsSite.basePath === "/") {
      throw new Error(
        `Docs base path ${docsSite.basePath} must be an absolute path without a trailing slash`,
      );
    }
    for (const route of routes) {
      if (route === docsSite.basePath || route.startsWith(`${docsSite.basePath}/`)) {
        throw new Error(
          `Docs rewrite ${docsSite.basePath} (${docsSite.id}) clashes with existing route ${route}`,
        );
      }
    }
  }
}
