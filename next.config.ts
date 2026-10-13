import path from "node:path";
import type { NextConfig } from "next";
import {
  BUNDLES_SITE_URL,
  legacyBundleSlugs,
} from "./data/legacyBundleRedirects";
import docsConfig from "./lib/docs-sites.json";
import {
  assertDocsBasePathsDoNotClash,
  assertMintlifyRootAssetPathsDoNotClash,
  mintlifyRootAssetRewrites,
} from "./lib/docs-route-guard";

const activeDocsSites = docsConfig.sites.filter((docsSite) => docsSite.enabled);

const nextConfig: NextConfig = {
  // Stray lockfiles in $HOME and ~/Desktop/code make Next infer the wrong
  // workspace root (and watch far too many files); pin it to this repo.
  turbopack: {
    root: __dirname,
  },
  experimental: {
    // Restoring the Turbopack cache from .next spawns a flood of node
    // workers on this machine and hangs dev startup - keep it off.
    turbopackFileSystemCacheForDev: false,
  },
  // The old Product Bundles blog lived at getappfox.com/blog/<slug>; this site
  // (Order Editing & Upsell) now owns that path, so those URLs would 404 and
  // bleed their Google ranking. Send each one to the dedicated Bundles site
  // with a permanent 308 (equivalent content on another host = clean, ranking-
  // preserving migration). Per-slug sources — never a /blog/:slug* catch-all —
  // so this site's own posts are untouched. See data/legacyBundleRedirects.ts.
  //
  // Docs host redirects are 301 (not Next's default 308) and always target the
  // apex. Query strings are appended by Next. Fragments never reach the server;
  // browsers reattach them. `/` is its own rule because `/:path*` does not
  // match the root on every Next version.
  async redirects() {
    const docsRedirects = activeDocsSites.flatMap((docsSite) => [
      {
        source: "/",
        has: [{ type: "host" as const, value: docsSite.legacyHost }],
        destination: `${docsConfig.canonicalOrigin}${docsSite.basePath}`,
        statusCode: 301 as const,
      },
      {
        source: "/:path*",
        has: [{ type: "host" as const, value: docsSite.legacyHost }],
        destination: `${docsConfig.canonicalOrigin}${docsSite.basePath}/:path*`,
        statusCode: 301 as const,
      },
    ]);

    const legacyBlogRedirects = legacyBundleSlugs.map((slug) => ({
      source: `/blog/${slug}`,
      destination: `${BUNDLES_SITE_URL}/blog/${slug}`,
      permanent: true as const,
    }));

    return [...docsRedirects, ...legacyBlogRedirects];
  },
  // Mintlify subpath proxy. beforeFiles so these paths are proxied even if a
  // later dynamic route could match them. Sources are the docs folders only,
  // so /subscription, /subscription/compare, /subscription/integrations,
  // /product-bundles, and /product-bundles/compare stay on this app.
  // External rewrites use the destination host (Next sets changeOrigin; Vercel
  // does the same at the edge). The incoming Host is not forwarded.
  // Every method is proxied, including POST {base}/_mintlify/api/v1/e.
  // The live docs HTML also requests CSS and JS from the root path
  // /mintlify-assets/_next/static/... (not this app's /_next). Those root
  // paths, plus /_mintlify, are shared by every enabled site. Rewrites send
  // each request to the project named in the path, else the project named by
  // the Referer, else the shared client files, else a probe that tries origins.
  async rewrites() {
    const appDir = path.join(__dirname, "app");
    assertDocsBasePathsDoNotClash(appDir, activeDocsSites);
    assertMintlifyRootAssetPathsDoNotClash(appDir);
    return {
      beforeFiles: [
        ...mintlifyRootAssetRewrites(activeDocsSites),
        ...activeDocsSites.flatMap((docsSite) => [
          {
            source: docsSite.basePath,
            destination: `${docsSite.mintlifyOrigin}${docsSite.basePath}`,
          },
          {
            source: `${docsSite.basePath}/:match*`,
            destination: `${docsSite.mintlifyOrigin}${docsSite.basePath}/:match*`,
          },
        ]),
      ],
    };
  },
};

export default nextConfig;
