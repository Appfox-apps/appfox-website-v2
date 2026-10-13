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
 * Shared Mintlify paths that are not under a docs base path. The live
 * subscriptions HTML loads CSS and JS from `/mintlify-assets/_next/static/...`.
 * `/_mintlify` is the analytics and assistant API. Neither prefix is `/_next`.
 */
export const MINTLIFY_ROOT_ASSET_REWRITES = [
  { source: "/mintlify-assets/:path+", destinationPath: "/mintlify-assets/:path+" },
  { source: "/_mintlify/:path*", destinationPath: "/_mintlify/:path*" },
] as const;

const MINTLIFY_ROOT_ASSET_PREFIXES = ["/mintlify-assets", "/_mintlify"] as const;

type RootAssetOwner = {
  id: string;
  enabled: boolean;
  mintlifyOrigin: string;
};

/**
 * Root asset paths can point at only one Mintlify project. The single enabled
 * site owns them. Two enabled sites would both claim the same paths, so the
 * build fails instead of proxying the wrong project's CSS and API.
 */
export function assertSingleEnabledDocsSiteOwnsRootAssets<T extends RootAssetOwner>(
  appDir: string,
  sites: readonly T[],
): T | null {
  const enabled = sites.filter((docsSite) => docsSite.enabled);
  if (enabled.length > 1) {
    throw new Error(
      `Root Mintlify paths ${MINTLIFY_ROOT_ASSET_PREFIXES.join(", ")} can belong to only one enabled docs site. Enabled: ${enabled.map((docsSite) => docsSite.id).join(", ")}.`,
    );
  }

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

  return enabled[0] ?? null;
}

export function mintlifyRootAssetRewrites(owner: RootAssetOwner | null) {
  if (!owner) return [];
  return MINTLIFY_ROOT_ASSET_REWRITES.map((rewrite) => ({
    source: rewrite.source,
    destination: `${owner.mintlifyOrigin}${rewrite.destinationPath}`,
  }));
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
