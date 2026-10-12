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
