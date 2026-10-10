# Docs cutover: subdomains to folders

Move the two Mintlify sites onto the apex without breaking partner links.

| Today | After |
| --- | --- |
| `https://subscriptions-docs.getappfox.com/<path>` | `https://getappfox.com/subscription/docs/<path>` |
| `https://bundles-docs.getappfox.com/<path>` | `https://getappfox.com/product-bundles/docs/<path>` |

The path after the new folder is the same path as today. Query strings are kept by the 301. Browsers reattach fragments themselves; the server never sees them.

Base paths live in [`lib/docs-sites.json`](lib/docs-sites.json). Changing a `basePath` there updates the redirects, the rewrites, the sitemap, and the check script.

This file is the manual work. The repo already contains the rewrites, the host 301s, the sitemap entries, and `scripts/check-docs-redirects.mjs`.

## What this repo already does

Rewrites are `beforeFiles` in `next.config.ts`. Each docs folder proxies to that project's `*.mintlify.site` host (not `*.mintlify.app`):

- `/subscription/docs` and `/subscription/docs/:match*` → `https://appfox-subscriptions.mintlify.site/subscription/docs...`
- `/product-bundles/docs` and `/product-bundles/docs/:match*` → `https://appfox-bundles.mintlify.site/product-bundles/docs...`

The proxy is an external rewrite. Next (`changeOrigin`) and Vercel both send the destination host upstream. The visitor's `Host` is not forwarded.

Those rewrites forward every method. Mintlify records analytics with `POST <base>/_mintlify/api/v1/e`, which is inside the folder, so it is proxied.

Root `/_mintlify/*`, `/mintlify-assets/*`, and `/api/request` are not proxied. Mintlify's single-site Vercel example uses those root paths, and each one can point at only one project. With two projects on one domain, a root rewrite would send the other project's assets and API calls to the wrong site.

Host 301s (status `301`, not Next's default 308), one rule for `/` and one for `/:path*`:

- `subscriptions-docs.getappfox.com` → `https://getappfox.com/subscription/docs...`
- `bundles-docs.getappfox.com` → `https://getappfox.com/product-bundles/docs...`

They do nothing until those hostnames resolve to this Vercel project.

Next also inserts its own trailing-slash redirect (308 from `/page/` to `/page`) ahead of these rules. A partner link with a trailing slash takes that 308 on the old host, then the 301 to the apex. Sitemap URLs have no trailing slash, so they are a single 301. Fragments are not part of either hop; the browser adds them back on the final URL.

### Routes checked for clashes

`beforeFiles` runs before the filesystem, so a base path that equals or contains an existing page would hide that page. `next.config.ts` fails the build if that happens. Checked against the App Router pages on this branch:

No clash. The docs folders are narrower than the marketing pages:

- `/subscription`, `/subscription/compare`, `/subscription/integrations` stay on this app. Docs are only under `/subscription/docs`.
- `/product-bundles` and `/product-bundles/compare` stay on this app. Docs are only under `/product-bundles/docs`.
- `/pricing/subscription`, `/features/subscription`, `/pricing/product-bundles`, and `/features/product-bundles` are different paths.
- There is no `app/subscription/docs` or `app/product-bundles/docs` page.

## Do these steps in order

Do not point DNS at Vercel, and do not remove the Mintlify custom domains, until the new folders return 200 and the old hosts still return 200. Partner links stay on Mintlify until step 8.

### 1. Deploy this pull request to production

Ship `getappfox.com` with these rewrites and redirects before anything else. Until DNS changes, the old subdomains still serve Mintlify, so existing links keep working. The new folders will 404 until step 3 because Mintlify is still mounted at the root of each project.

### 2. Update `docs.json` in the two docs repos

The public base path is a Mintlify dashboard setting, not a directory. Do not move files into `subscription/docs/` or `product-bundles/docs/`. Do not add `docs.json` redirects for the hostname change. Those redirects are path-only on the Mintlify host and will not see `subscriptions-docs.getappfox.com` after DNS moves. The 301s in this repo cover every old path.

Mintlify appends each page's path to `seo.metatags.canonical`. Set the canonical to the folder root, with no trailing slash and no page path.

In [Appfox-apps/subscriptions-remix](https://github.com/Appfox-apps/subscriptions-remix) `docs/docs.json`, merge this key into the existing `seo.metatags` object. If `seo` or `metatags` is missing, add the object. Keep any other keys already there (`google-site-verification`, `og:image`, and so on).

```json
"seo": {
  "metatags": {
    "canonical": "https://getappfox.com/subscription/docs"
  }
}
```

In [Appfox-apps/bundles-app-new](https://github.com/Appfox-apps/bundles-app-new) `help-docs/docs.json`:

```json
"seo": {
  "metatags": {
    "canonical": "https://getappfox.com/product-bundles/docs"
  }
}
```

Then search both repos and replace hardcoded old hosts:

- `subscriptions-docs.getappfox.com` → `getappfox.com/subscription/docs`
- `bundles-docs.getappfox.com` → `getappfox.com/product-bundles/docs`

Deploy both docs projects and wait until Mintlify finishes the build.

### 3. Turn on Mintlify subpath hosting

Do this for both projects. Leave the existing custom domains (`subscriptions-docs.getappfox.com`, `bundles-docs.getappfox.com`) attached. Removing them is step 11, after the redirect check passes.

Subscriptions project `appfox-subscriptions`:

1. Open Custom domain setup.
2. Enable **Host at**.
3. Domain: `getappfox.com`.
4. Base path: `/subscription/docs` (leading slash, no trailing slash).
5. Click **Add domain**.

Bundles project `appfox-bundles`:

1. Open Custom domain setup.
2. Enable **Host at**.
3. Domain: `getappfox.com`.
4. Base path: `/product-bundles/docs`.
5. Click **Add domain**.

Mintlify rebuilds so the canonical docs URL on its own host becomes `https://appfox-subscriptions.mintlify.site/subscription/docs` and `https://appfox-bundles.mintlify.site/product-bundles/docs`. The rewrites in this repo proxy to those URLs. Confirmed live hosts (October 2026): both `https://appfox-subscriptions.mintlify.site` and `https://appfox-bundles.mintlify.site` respond. Use `.mintlify.site`, not `.mintlify.app`.

Immediately confirm the old sites still serve the docs at the root:

```bash
curl -sI https://subscriptions-docs.getappfox.com/plans
curl -sI https://bundles-docs.getappfox.com/getting-started
```

Both must still be 200 from Mintlify. If either starts 404ing or redirecting into `/subscription/docs` on the old host, stop and roll back this step (see Rollback). Partner links are still pointed here.

Then confirm the subpath itself:

```bash
curl -sI https://appfox-subscriptions.mintlify.site/subscription/docs/plans
curl -sI https://appfox-bundles.mintlify.site/product-bundles/docs/getting-started
```

Both must be 200 before you continue.

### 4. Check that assets are prefixed with the base path

Mintlify's single-site proxy docs also rewrite root `/mintlify-assets/*` and `/_mintlify/*`. This domain hosts two projects, so those root rewrites are intentionally absent. After the base path is on, the HTML at the Mintlify host must not reference those root paths.

```bash
curl -sL https://appfox-subscriptions.mintlify.site/subscription/docs \
  | grep -oE '/mintlify-assets[^"'\'' ]*|/_mintlify[^"'\'' ]*' \
  | sort -u

curl -sL https://appfox-bundles.mintlify.site/product-bundles/docs \
  | grep -oE '/mintlify-assets[^"'\'' ]*|/_mintlify[^"'\'' ]*' \
  | sort -u
```

Stop the cutover if any URL starts with `/mintlify-assets` or `/_mintlify` and is not under `/subscription/docs` or `/product-bundles/docs`. Those root URLs would 404 on getappfox.com, or, if a root rewrite were added, one project would steal the other's assets. Ask Mintlify to prefix them, then re-run this check.

Also confirm analytics stays inside the folder. The page should post to `/subscription/docs/_mintlify/api/v1/e` and `/product-bundles/docs/_mintlify/api/v1/e`, not to `/_mintlify/api/v1/e` at the domain root.

A prefixed asset looks like `/subscription/docs/mintlify-assets/...` or `/subscription/docs/_mintlify/...`. That is fine: the `:match*` rewrite already forwards it.

### 5. Confirm the apex folders

`www.getappfox.com` is the host that currently returns 200 (see step 6). Check both:

```bash
curl -sI https://www.getappfox.com/subscription/docs/plans
curl -sI https://www.getappfox.com/product-bundles/docs/getting-started
```

Expect 200 and a Mintlify response (`x-mint-proxy-version`). A 404 here means step 3 has not finished or the rewrite destination does not match the base path.

Open each page in a browser and click through a few links, including an API page and a nested page. Styles, search, and the API playground have to work. If the browser requests `/mintlify-assets/...` on `getappfox.com` and gets 404, go back to step 4.

### 6. Make the apex the primary domain

Checked 10 October 2026: `https://getappfox.com/` returns **307** to `https://www.getappfox.com/`. Canonicals in this repo (`lib/site.ts`) and the docs 301s use the apex, `https://getappfox.com`.

In the Vercel project for this site: Settings → Domains → set `getappfox.com` as the primary domain so `www.getappfox.com` **308**s to the apex.

Do this before the docs DNS change. Otherwise every docs 301 lands on the apex and Vercel immediately 307s it to www. After this step, `curl -sI https://getappfox.com/subscription/docs/plans` should be 200 with no redirect.

This changes the marketing site's public host to the host its canonicals already name. It is a dashboard setting, not a code change.

### 7. Add the two subdomains to this Vercel project

Project → Settings → Domains → add, and assign both to Production:

- `subscriptions-docs.getappfox.com`
- `bundles-docs.getappfox.com`

Vercel will show a CNAME. For this project the recommended target is:

`25427e4e7b9a36eb.vercel-dns-016.com`

If the dashboard prints a different CNAME, use the dashboard value. Fallback if that specific record is rejected: `cname.vercel-dns.com`.

Adding the domain does not move traffic. DNS still points at Mintlify until step 8.

### 8. Change DNS at Squarespace Domains

Nameservers are Google's (`ns-cloud-e1.googledomains.com` through `ns-cloud-e4.googledomains.com`). The DNS editor is Squarespace Domains, not Cloudflare and not Vercel DNS.

Today both hosts are CNAME `cname.mintlify.builders` (trailing dot on the wire). Write that down before editing. It is the rollback target.

For each of `subscriptions-docs` and `bundles-docs`:

1. Open getappfox.com → DNS → DNS records.
2. Edit the CNAME whose host is `subscriptions-docs` or `bundles-docs`.
3. Set the data to `25427e4e7b9a36eb.vercel-dns-016.com` (or whatever step 7 displayed). Do not include a trailing dot unless the form adds it.
4. Leave `@`, `www`, and every other record alone.

Wait until both names answer from Vercel and HTTPS is issued:

```bash
dig +short CNAME subscriptions-docs.getappfox.com
dig +short CNAME bundles-docs.getappfox.com
curl -sI https://subscriptions-docs.getappfox.com/plans
```

The curl must be **301** with `Location: https://getappfox.com/subscription/docs/plans`. A certificate error means Vercel has not finished provisioning yet. Do not remove the Mintlify domains while that is true.

### 9. Run the redirect check

Against production, after DNS is serving Vercel:

```bash
npm run check-docs-redirects -- check --base https://getappfox.com --via-dns
```

That reads the committed URL list (refreshed from the live sitemaps in this PR), requests every old URL on the real legacy host, and requires:

- 301 to the apex URL with the same path and the same query string
- 200 on the new URL

Refresh the list first if the docs nav has changed since this PR:

```bash
npm run check-docs-redirects -- refresh
```

Commit the updated `data/docs-url-list.json` if you want the sitemap to match. The check does not need that commit to pass; it checks the list you have.

Before DNS, the same command against a local build is:

```bash
npm run build && npm run start
npm run check-docs-redirects -- check --base http://127.0.0.1:3000
```

That sends the legacy `Host` header to the local server. It cannot prove the new pages return 200 until step 3 is done, because Mintlify still 404s `*.mintlify.site/<basePath>` until the subpath is enabled.

### 10. Watch one real partner URL

Pick a URL that is actually published, including a query string if the post has one:

```bash
curl -sI "https://subscriptions-docs.getappfox.com/plans?utm_source=partner"
curl -sI "https://bundles-docs.getappfox.com/bundles/classic?utm_source=partner"
```

`Location` must be the apex folder plus the same path and query. Then open the `Location` URL and confirm the page.

### 11. Remove the custom domains from Mintlify

Only after step 9 passes.

In each Mintlify project, remove the old custom domain:

- `subscriptions-docs.getappfox.com` from `appfox-subscriptions`
- `bundles-docs.getappfox.com` from `appfox-bundles`

Keep the `getappfox.com` subpath domain from step 3. If you remove the subpath domain, the rewrites start 404ing.

### 12. Search Console

Do not use Change of address. That tool is only for moving a whole domain property to a new domain. This is a host-to-folder move on the same apex.

1. Use the property for `https://getappfox.com` (or a domain property for `getappfox.com`). Canonicals already point at the apex. If the only verified property is `www`, add the apex URL-prefix property, or rely on the domain property, after step 6.
2. Submit `https://getappfox.com/sitemap.xml`. This sitemap now lists the marketing URLs and every docs URL from `data/docs-url-list.json` under the new folders.
3. URL Inspection: inspect the two docs homes and a few deep pages partners link to (`/subscription/docs/plans`, `/subscription/docs/settings/billing`, `/product-bundles/docs/bundles/classic`). Request indexing.
4. If properties exist for `subscriptions-docs.getappfox.com` and `bundles-docs.getappfox.com`, leave them in place. Coverage should shift to "Page with redirect". That is the point. Confirm those properties are verified with a DNS TXT record. An HTML-file or meta-tag check on the docs host will fail once the host only returns 301s and no HTML.
5. Remove any sitemap submission whose URL is `https://subscriptions-docs.getappfox.com/sitemap.xml` or `https://bundles-docs.getappfox.com/sitemap.xml`. Those now 301 to Mintlify's sitemap under the new folder. Prefer the apex sitemap from step 2 of this list, which already uses the new URLs.
6. After Mintlify's own sitemap is proxied (`/subscription/docs/sitemap.xml` and `/product-bundles/docs/sitemap.xml`), open both and confirm `<loc>` values use `https://getappfox.com/...`, not the old subdomain. If they still name the old host, the canonical from step 2 is not live yet.
7. Check Coverage / Page indexing over the next crawls for a spike of 404s on the new folders. A 404 there means the rewrite or the Mintlify base path missed a page that is still in the sitemap.

## Rollback

Stop at the earliest step that went wrong. Later steps are what make the old links depend on this repo.

**Old host broke as soon as the subpath was enabled (step 3), DNS not touched.** In each Mintlify project, remove the `getappfox.com` subpath domain (or turn **Host at** off) so the project is mounted at the root again. Revert the `docs.json` canonical to the old host, or remove the `canonical` key if it was not there before. Confirm `https://subscriptions-docs.getappfox.com/plans` is 200. This repo's deploy can stay: the new folders 404 until the subpath is on, and the host 301s do not run while DNS still points at Mintlify.

**New folders 404, old host still fine.** Do not change DNS. Re-check the base path spelling in Mintlify and in `lib/docs-sites.json`. They must match, including `/subscription/docs` singular.

**DNS already points at Vercel and the 301s are wrong.** Set both CNAMEs back to `cname.mintlify.builders`. The Mintlify custom domains must still be attached, which is why they stay until step 11. After DNS returns, the old URLs should 200 from Mintlify again. If you already removed those custom domains, add them back as root domains (not as a subpath) and then restore the CNAME.

**Apex primary change caused a problem.** In Vercel Domains, set `www.getappfox.com` as the redirect target again so the apex 307s to www, which was the previous behavior.

**Assets 404 after a successful 301.** The HTML check in step 4 failed or was skipped. Roll DNS back if partner links are what load the broken pages. Do not add a root `/mintlify-assets` rewrite that points at only one of the two Mintlify hosts.

The code in this PR only affects the two legacy hosts and the two docs folders. Revert the deployment if those folders are serving the wrong project or a marketing URL under them is missing. You do not need to revert it to restore the old hosts, as long as DNS points back at `cname.mintlify.builders` and Mintlify still has those custom domains.
