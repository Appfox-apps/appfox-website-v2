#!/usr/bin/env node
/**
 * Pull both Mintlify sitemaps into data/docs-url-list.json, then check a
 * deployment:
 *
 *   node scripts/check-docs-redirects.mjs refresh
 *   node scripts/check-docs-redirects.mjs check --base http://127.0.0.1:3000
 *   node scripts/check-docs-redirects.mjs check --base https://getappfox.com --via-dns
 *
 * `check` requests each legacy path on `--base` with the legacy Host header
 * (so a local or preview server can be tested before DNS moves). It expects
 * 301 to https://getappfox.com{basePath}{path}, including the query string.
 * It then requests the new path on `--base` and expects 200.
 *
 * `--via-dns` sends the 301 requests to the real legacy hosts instead. Use
 * that after subscriptions-docs and bundles-docs point at this Vercel project.
 *
 * Fragments are not sent to servers; this script does not invent them.
 */

import fs from "node:fs";
import http from "node:http";
import https from "node:https";
import path from "node:path";
import { fileURLToPath } from "node:url";
import docsConfig from "../lib/docs-sites.json" with { type: "json" };

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const listPath = path.join(repoRoot, "data", "docs-url-list.json");
const QUERY_PROBE = "partner";
const QUERY_PROBE_VALUE = "blog";

function usage() {
  console.error(`Usage:
  node scripts/check-docs-redirects.mjs refresh
  node scripts/check-docs-redirects.mjs check --base <origin> [--via-dns]`);
}

function decodeXml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'");
}

function parseSitemap(xml) {
  const urls = [];
  for (const block of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = block[1].match(/<loc>([^<]+)<\/loc>/);
    if (!loc) continue;
    const lastmod = block[1].match(/<lastmod>([^<]+)<\/lastmod>/);
    const legacyUrl = decodeXml(loc[1].trim());
    const parsed = new URL(legacyUrl);
    urls.push({
      legacyUrl,
      path: parsed.pathname || "/",
      lastmod: lastmod ? lastmod[1].trim() : null,
    });
  }
  return urls;
}

function fetchText(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https:") ? https : http;
    const req = lib.get(url, { headers: { accept: "application/xml,text/xml,*/*", "user-agent": "appfox-docs-redirect-check" } }, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        const next = new URL(res.headers.location, url);
        resolve(fetchText(next.toString()));
        return;
      }
      const chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => {
        const body = Buffer.concat(chunks).toString("utf8");
        if (!res.statusCode || res.statusCode >= 400) {
          reject(new Error(`${url} returned ${res.statusCode}: ${body.slice(0, 200)}`));
          return;
        }
        resolve(body);
      });
    });
    req.setTimeout(30_000, () => req.destroy(new Error(`timeout fetching ${url}`)));
    req.on("error", reject);
  });
}

async function refresh() {
  const urls = [];
  for (const docsSite of docsConfig.sites) {
    const xml = await fetchText(docsSite.sitemapUrl);
    const parsed = parseSitemap(xml);
    if (parsed.length === 0) {
      throw new Error(`No <url> entries in ${docsSite.sitemapUrl}`);
    }
    for (const entry of parsed) {
      const host = new URL(entry.legacyUrl).host;
      if (host !== docsSite.legacyHost) {
        throw new Error(`${entry.legacyUrl} is not on ${docsSite.legacyHost}`);
      }
      urls.push({ siteId: docsSite.id, ...entry });
    }
    console.log(`${docsSite.id}: ${parsed.length} urls from ${docsSite.sitemapUrl}`);
  }
  urls.sort((a, b) => a.siteId.localeCompare(b.siteId) || a.path.localeCompare(b.path));
  const document = {
    generatedAt: new Date().toISOString(),
    sources: docsConfig.sites.map((docsSite) => ({
      id: docsSite.id,
      sitemapUrl: docsSite.sitemapUrl,
    })),
    urls,
  };
  fs.mkdirSync(path.dirname(listPath), { recursive: true });
  fs.writeFileSync(listPath, `${JSON.stringify(document, null, 2)}\n`);
  console.log(`wrote ${urls.length} urls to ${path.relative(repoRoot, listPath)}`);
}

function loadList() {
  const document = JSON.parse(fs.readFileSync(listPath, "utf8"));
  if (!Array.isArray(document.urls) || document.urls.length === 0) {
    throw new Error(`${listPath} is empty. Run: node scripts/check-docs-redirects.mjs refresh`);
  }
  return document.urls;
}

function requestOnce({ protocol, hostname, port, method, requestPath, headers, body }) {
  const lib = protocol === "https:" ? https : http;
  return new Promise((resolve, reject) => {
    const req = lib.request(
      {
        protocol,
        hostname,
        port,
        method,
        path: requestPath,
        headers,
      },
      (res) => {
        const chunks = [];
        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", () => {
          resolve({
            status: res.statusCode ?? 0,
            headers: res.headers,
            body: Buffer.concat(chunks).toString("utf8"),
          });
        });
      },
    );
    req.setTimeout(30_000, () => req.destroy(new Error(`timeout ${method} ${hostname}${requestPath}`)));
    req.on("error", reject);
    if (body) req.write(body);
    req.end();
  });
}

function headerValue(headers, name) {
  const value = headers[name.toLowerCase()];
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

function expectedLocation(docsSite, pathname, search) {
  const suffix = pathname === "/" ? "" : pathname;
  return `${docsConfig.canonicalOrigin}${docsSite.basePath}${suffix}${search}`;
}

function urlsMatch(actual, expected) {
  const left = new URL(actual);
  const right = new URL(expected);
  const leftQuery = [...left.searchParams.entries()].sort().toString();
  const rightQuery = [...right.searchParams.entries()].sort().toString();
  return left.origin === right.origin && left.pathname === right.pathname && leftQuery === rightQuery && left.hash === right.hash;
}

function siteById(id) {
  const docsSite = docsConfig.sites.find((item) => item.id === id);
  if (!docsSite) throw new Error(`Unknown docs site ${id}`);
  return docsSite;
}

async function mapPool(items, limit, worker) {
  const results = new Array(items.length);
  let next = 0;
  async function run() {
    while (next < items.length) {
      const index = next;
      next += 1;
      results[index] = await worker(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => run()));
  return results;
}

function isProxied(response) {
  if (headerValue(response.headers, "x-mint-proxy-version")) return true;
  if (headerValue(response.headers, "x-mint-proxy")) return true;
  return false;
}

async function checkRedirect(base, docsSite, pathname, search, viaDns) {
  const target = viaDns
    ? {
        protocol: "https:",
        hostname: docsSite.legacyHost,
        port: 443,
        headers: { accept: "*/*", "user-agent": "appfox-docs-redirect-check" },
      }
    : {
        protocol: base.protocol,
        hostname: base.hostname,
        port: base.port || (base.protocol === "https:" ? 443 : 80),
        headers: {
          host: docsSite.legacyHost,
          accept: "*/*",
          "user-agent": "appfox-docs-redirect-check",
        },
      };
  const response = await requestOnce({
    ...target,
    method: "GET",
    requestPath: `${pathname}${search}`,
  });
  const location = headerValue(response.headers, "location");
  const expected = expectedLocation(docsSite, pathname, search);
  const ok = response.status === 301 && location !== "" && urlsMatch(location, expected);
  return { ok, status: response.status, location, expected };
}

async function checkNewUrl(base, docsSite, pathname, search) {
  const response = await requestOnce({
    protocol: base.protocol,
    hostname: base.hostname,
    port: base.port || (base.protocol === "https:" ? 443 : 80),
    method: "GET",
    requestPath: `${docsSite.basePath}${pathname === "/" ? "" : pathname}${search}`,
    headers: { accept: "*/*", "user-agent": "appfox-docs-redirect-check" },
  });
  return {
    ok: response.status === 200,
    status: response.status,
    proxied: isProxied(response),
    location: headerValue(response.headers, "location"),
  };
}

async function check(args) {
  const baseIndex = args.indexOf("--base");
  if (baseIndex === -1 || !args[baseIndex + 1]) {
    usage();
    process.exitCode = 1;
    return;
  }
  const base = new URL(args[baseIndex + 1]);
  const viaDns = args.includes("--via-dns");
  const entries = loadList();
  const failures = [];

  console.log(`301 checks via ${viaDns ? "live legacy DNS" : `Host header against ${base.origin}`}`);
  console.log(`200 checks against ${base.origin}`);

  const results = await mapPool(entries, 6, async (entry) => {
    const docsSite = siteById(entry.siteId);
    const redirect = await checkRedirect(base, docsSite, entry.path, "", viaDns);
    const query = await checkRedirect(base, docsSite, entry.path, `?${QUERY_PROBE}=${QUERY_PROBE_VALUE}`, viaDns);
    const page = await checkNewUrl(base, docsSite, entry.path, "");
    return { entry, redirect, query, page };
  });

  const counts = new Map();
  for (const result of results) {
    const bucket = counts.get(result.entry.siteId) ?? { total: 0, redirect: 0, query: 0, page: 0, proxied404: 0 };
    const docsSite = siteById(result.entry.siteId);
    const newPath = `${docsSite.basePath}${result.entry.path === "/" ? "" : result.entry.path}`;
    bucket.total += 1;
    if (result.redirect.ok) bucket.redirect += 1;
    else {
      failures.push(
        `${result.entry.legacyUrl} expected 301 ${result.redirect.expected}, got ${result.redirect.status} ${result.redirect.location || "(no location)"}`,
      );
    }
    if (result.query.ok) bucket.query += 1;
    else {
      failures.push(
        `${result.entry.legacyUrl}?${QUERY_PROBE}=${QUERY_PROBE_VALUE} expected 301 ${result.query.expected}, got ${result.query.status} ${result.query.location || "(no location)"}`,
      );
    }
    if (result.page.ok) bucket.page += 1;
    else if (result.page.proxied && result.page.status === 404) {
      bucket.proxied404 += 1;
      failures.push(`${base.origin}${newPath} expected 200, got proxied 404 (Mintlify is not serving this base path yet)`);
    } else {
      failures.push(
        `${base.origin}${newPath} expected 200, got ${result.page.status}${result.page.proxied ? " proxied" : ""}${result.page.location ? ` -> ${result.page.location}` : ""}`,
      );
    }
    counts.set(result.entry.siteId, bucket);
  }

  for (const docsSite of docsConfig.sites) {
    const bucket = counts.get(docsSite.id) ?? { total: 0, redirect: 0, query: 0, page: 0, proxied404: 0 };
    console.log(
      `${docsSite.id}: ${bucket.redirect}/${bucket.total} 301, ${bucket.query}/${bucket.total} query preserved, ${bucket.page}/${bucket.total} new URLs 200` +
        (bucket.proxied404 ? `, ${bucket.proxied404} proxied 404` : ""),
    );
  }

  console.log("Extra probes:");
  for (const docsSite of docsConfig.sites) {
    const unknown = await checkRedirect(base, docsSite, "/not-a-real-docs-page", "?ref=partner", viaDns);
    console.log(
      `  ${docsSite.legacyHost}/not-a-real-docs-page?ref=partner -> ${unknown.status} ${unknown.location || "(no location)"}`,
    );
    if (!unknown.ok) failures.push(`${docsSite.legacyHost}/not-a-real-docs-page query redirect failed`);

    // Next normalizes trailing slashes with an internal 308 before host redirects.
    // The follow-up request on the same host must be the 301.
    const slashed = await checkRedirect(base, docsSite, "/getting-started/", "", viaDns);
    let slashNote = `${slashed.status} ${slashed.location || "(no location)"}`;
    let slashOk = slashed.ok || urlsMatch(slashed.location, expectedLocation(docsSite, "/getting-started", ""));
    if (!slashOk && slashed.status === 308 && slashed.location) {
      const nextUrl = new URL(slashed.location, `${docsConfig.canonicalOrigin}/`);
      const follow = await checkRedirect(base, docsSite, nextUrl.pathname, nextUrl.search, viaDns);
      slashOk = follow.ok;
      slashNote += `; then ${follow.status} ${follow.location || "(no location)"}`;
    }
    console.log(`  ${docsSite.legacyHost}/getting-started/ -> ${slashNote}`);
    if (!slashOk) failures.push(`${docsSite.legacyHost}/getting-started/ did not end at the unsuffixed docs URL`);
  }

  console.log("POST analytics probe (must be proxied, not handled by this Next app):");
  for (const docsSite of docsConfig.sites) {
    const response = await requestOnce({
      protocol: base.protocol,
      hostname: base.hostname,
      port: base.port || (base.protocol === "https:" ? 443 : 80),
      method: "POST",
      requestPath: `${docsSite.basePath}/_mintlify/api/v1/e`,
      headers: {
        accept: "*/*",
        "content-type": "application/json",
        "user-agent": "appfox-docs-redirect-check",
      },
      body: "{}",
    });
    const proxied = isProxied(response);
    const app404 = response.body.includes("Wrong address");
    const ok = proxied && !app404 && response.status !== 405;
    console.log(
      `  POST ${docsSite.basePath}/_mintlify/api/v1/e -> ${response.status}${proxied ? " proxied" : " not proxied"}${app404 ? " (this app's 404)" : ""}`,
    );
    if (!ok) {
      failures.push(`POST ${docsSite.basePath}/_mintlify/api/v1/e was not proxied (status ${response.status})`);
    }
  }

  if (failures.length > 0) {
    console.error(`\n${failures.length} failure(s):`);
    for (const failure of failures) console.error(`- ${failure}`);
    process.exitCode = 1;
    return;
  }
  console.log("\nAll docs redirect checks passed.");
}

const [command, ...rest] = process.argv.slice(2);
if (command === "refresh") {
  refresh().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
} else if (command === "check") {
  check(rest).catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
} else {
  usage();
  process.exitCode = 1;
}
