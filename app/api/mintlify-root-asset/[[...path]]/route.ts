import { docsSites } from "@/lib/docs-sites";
import {
  isSharedMintlifyClientAsset,
  mintlifyRootAssetOwner,
} from "@/lib/docs-route-guard";
import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

const HOP_BY_HOP = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailers",
  "transfer-encoding",
  "upgrade",
  "host",
  "content-length",
  "content-encoding",
]);

type AssetSite = (typeof docsSites)[number];

function assetPathname(parts: string[]): string | null {
  if (parts.some((part) => part === "" || part === "." || part === "..")) return null;
  const pathname = `/${parts.map((part) => encodeURIComponent(part)).join("/")}`;
  const allowed =
    pathname.startsWith("/mintlify-assets/") || pathname === "/_mintlify" || pathname.startsWith("/_mintlify/");
  return allowed ? pathname : null;
}

function passthrough(upstream: Response): Response {
  const headers = new Headers();
  upstream.headers.forEach((value, key) => {
    if (!HOP_BY_HOP.has(key.toLowerCase())) headers.set(key, value);
  });
  // This route is the ambiguous fallback. Do not let a shared cache keep one
  // project's response for a URL the other project also uses.
  headers.set("cache-control", "private, no-store");
  return new Response(upstream.body, { status: upstream.status, statusText: upstream.statusText, headers });
}

async function fetchOrigin(
  docsSite: AssetSite,
  pathname: string,
  search: string,
  method: string,
  headers: Headers,
  body: ArrayBuffer | undefined,
): Promise<Response | null> {
  try {
    return await fetch(`${docsSite.mintlifyOrigin}${pathname}${search}`, {
      method,
      headers,
      body: body && body.byteLength > 0 ? body : undefined,
      redirect: "manual",
      cache: "no-store",
    });
  } catch {
    return null;
  }
}

function upstreamHeaders(request: NextRequest): Headers {
  const headers = new Headers();
  request.headers.forEach((value, key) => {
    if (!HOP_BY_HOP.has(key.toLowerCase())) headers.set(key, value);
  });
  return headers;
}

/**
 * Last-resort proxy for root Mintlify assets. Rewrites already send favicons
 * to the project slug in the path, and page requests to the project named by
 * Referer. This runs when those rules do not match.
 */
async function handle(request: NextRequest, context: { params: Promise<{ path?: string[] }> }) {
  const { path: parts = [] } = await context.params;
  const pathname = assetPathname(parts);
  if (!pathname) return new Response("Not found", { status: 404 });

  const enabled = docsSites.filter((docsSite) => docsSite.enabled);
  if (enabled.length === 0) return new Response("Not found", { status: 404 });

  const search = request.nextUrl.search;
  const method = request.method;
  const headers = upstreamHeaders(request);
  const safeToFanOut = method === "GET" || method === "HEAD";
  const body = safeToFanOut ? undefined : await request.arrayBuffer();

  const owner =
    mintlifyRootAssetOwner(pathname, request.headers.get("referer"), enabled) ??
    (isSharedMintlifyClientAsset(pathname) ? enabled[0] : null);

  if (owner) {
    const upstream = await fetchOrigin(owner, pathname, search, method, headers, body);
    return upstream ? passthrough(upstream) : new Response("Bad gateway", { status: 502 });
  }

  if (!safeToFanOut) {
    return new Response("Mintlify asset origin is ambiguous", { status: 404 });
  }

  // Mintlify answers another project's files with 403, and missing paths with
  // 500 HTML rather than 404. Keep the first error and prefer the first 2xx.
  let fallback: Response | null = null;
  for (const docsSite of enabled) {
    const upstream = await fetchOrigin(docsSite, pathname, search, method, headers, undefined);
    if (!upstream) continue;
    if (upstream.status >= 200 && upstream.status < 300) {
      if (fallback) await fallback.body?.cancel();
      return passthrough(upstream);
    }
    if (fallback) await fallback.body?.cancel();
    fallback = upstream;
  }
  return fallback ? passthrough(fallback) : new Response("Bad gateway", { status: 502 });
}

export const GET = handle;
export const HEAD = handle;
export const POST = handle;
export const PUT = handle;
export const PATCH = handle;
export const DELETE = handle;
export const OPTIONS = handle;
