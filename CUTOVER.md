# Docs cutover: subdomains to folders

Move the subscriptions Mintlify site onto the apex without breaking partner links. Bundles stays on `bundles-docs.getappfox.com` for now. Mintlify allows one project per org to claim `getappfox.com`, and a support case is open for the second project. Bundles is `"enabled": false` in [`lib/docs-sites.json`](lib/docs-sites.json). Do not add `bundles-docs` to this Vercel project or change its DNS until that section at the bottom.

| Today | After this cutover |
| --- | --- |
| `https://subscriptions-docs.getappfox.com/<path>` | `https://getappfox.com/subscription/docs/<path>` |
| `https://bundles-docs.getappfox.com/<path>` | Unchanged until **Bundles later** |

The path after `/subscription/docs` is the same path as today. Query strings are kept by the 301. Browsers reattach fragments themselves; the server never sees them.

Base paths live in [`lib/docs-sites.json`](lib/docs-sites.json). Changing a `basePath` there updates the redirects, the rewrites, the sitemap, and the check script. Set `enabled` to false to skip that site. Turning bundles on later is that one field.

This file is the manual work. The repo already contains the subscriptions rewrites, the subscriptions host 301s, the subscriptions sitemap entries, and `scripts/check-docs-redirects.mjs`.

## What this repo already does

Rewrites are `beforeFiles` in `next.config.ts`. Only sites with `enabled: true` are proxied. Each of those folders proxies to that project's `*.mintlify.site` host (not `*.mintlify.app`):

- `/subscription/docs` and `/subscription/docs/:match*` → `https://appfox-subscriptions.mintlify.site/subscription/docs...`

`/product-bundles/docs` is not rewritten while bundles is disabled. The marketing pages at `/product-bundles` are unchanged.

The proxy is an external rewrite. Next (`changeOrigin`) and Vercel both send the destination host upstream. The visitor's `Host` is not forwarded.

Those rewrites forward every method. Mintlify records analytics with `POST <base>/_mintlify/api/v1/e`, which is inside the folder, so it is proxied.

Root `/_mintlify/*`, `/mintlify-assets/*`, and `/api/request` are not proxied. Mintlify's single-site Vercel example uses those root paths, and each one can point at only one project. With two projects on one domain, a root rewrite would send the other project's assets and API calls to the wrong site.

Host 301s (status `301`, not Next's default 308), one rule for `/` and one for `/:path*`, only for enabled sites:

- `subscriptions-docs.getappfox.com` → `https://getappfox.com/subscription/docs...`

`bundles-docs.getappfox.com` is not redirected by this repo while bundles is disabled. That hostname must keep serving Mintlify.

They do nothing until that hostname resolves to this Vercel project.

Next also inserts its own trailing-slash redirect (308 from `/page/` to `/page`) ahead of these rules. A partner link with a trailing slash takes that 308 on the old host, then the 301 to the apex. Sitemap URLs have no trailing slash, so they are a single 301. Fragments are not part of either hop; the browser adds them back on the final URL.

### Routes checked for clashes

`beforeFiles` runs before the filesystem, so a base path that equals or contains an existing page would hide that page. `next.config.ts` fails the build if an **enabled** base path does that. Checked against the App Router pages on this branch:

No clash. The docs folders are narrower than the marketing pages:

- `/subscription`, `/subscription/compare`, `/subscription/integrations` stay on this app. Docs are only under `/subscription/docs`.
- `/product-bundles` and `/product-bundles/compare` stay on this app. Docs will only be under `/product-bundles/docs` once bundles is enabled.
- `/pricing/subscription`, `/features/subscription`, `/pricing/product-bundles`, and `/features/product-bundles` are different paths.
- There is no `app/subscription/docs` or `app/product-bundles/docs` page.

## Do these steps in order

Do not point `subscriptions-docs` DNS at Vercel, and do not remove that Mintlify custom domain, until the new folder returns 200 and the old host still returns 200. Partner links stay on Mintlify until step 8. Leave `bundles-docs` alone throughout.

### 1. Deploy this pull request to production

Ship `getappfox.com` with the subscriptions rewrites and redirects before anything else. Until DNS changes, `subscriptions-docs` still serves Mintlify, so existing links keep working. `/subscription/docs` will 404 until step 3 because Mintlify is still mounted at the root of that project.

### 2. Update `docs.json` in the subscriptions docs repo

The public base path is a Mintlify dashboard setting, not a directory. Do not move files into `subscription/docs/`. Do not add `docs.json` redirects for the hostname change. Those redirects are path-only on the Mintlify host and will not see `subscriptions-docs.getappfox.com` after DNS moves. The 301s in this repo cover every old path.

Mintlify appends each page's path to `seo.metatags.canonical`. Set the canonical to the folder root, with no trailing slash and no page path.

In [Appfox-apps/subscriptions-remix](https://github.com/Appfox-apps/subscriptions-remix) `docs/docs.json`, merge this key into the existing `seo.metatags` object. If `seo` or `metatags` is missing, add the object. Keep any other keys already there (`google-site-verification`, `og:image`, and so on).

```json
"seo": {
  "metatags": {
    "canonical": "https://getappfox.com/subscription/docs"
  }
}
```

Then search that repo and replace the hardcoded old host:

- `subscriptions-docs.getappfox.com` → `getappfox.com/subscription/docs`

Do not edit the bundles docs repo yet. Deploy the subscriptions docs project and wait until Mintlify finishes the build.

### 3. Turn on Mintlify subpath hosting for subscriptions

Leave the existing custom domain (`subscriptions-docs.getappfox.com`) attached. Removing it is step 11, after the redirect check passes. Do not set a subpath on `appfox-bundles`.

Subscriptions project `appfox-subscriptions`:

1. Open Custom domain setup.
2. Enable **Host at**.
3. Domain: `getappfox.com`.
4. Base path: `/subscription/docs` (leading slash, no trailing slash).
5. Click **Add domain**.

Mintlify rebuilds so the canonical docs URL on its own host becomes `https://appfox-subscriptions.mintlify.site/subscription/docs`. The rewrite in this repo proxies to that URL. Confirmed live host (October 2026): `https://appfox-subscriptions.mintlify.site` responds. Use `.mintlify.site`, not `.mintlify.app`.

Immediately confirm the old site still serves the docs at the root:

```bash
curl -sI https://subscriptions-docs.getappfox.com/plans
```

It must still be 200 from Mintlify. If it starts 404ing or redirecting into `/subscription/docs` on the old host, stop and roll back this step (see Rollback). Partner links are still pointed here.

Then confirm the subpath itself:

```bash
curl -sI https://appfox-subscriptions.mintlify.site/subscription/docs/plans
```

It must be 200 before you continue.

### 4. Check that assets are prefixed with the base path

Mintlify's single-site proxy docs also rewrite root `/mintlify-assets/*` and `/_mintlify/*`. Those root rewrites are intentionally absent, so a second project can be added later. After the base path is on, the HTML at the Mintlify host must not reference those root paths.

```bash
curl -sL https://appfox-subscriptions.mintlify.site/subscription/docs \
  | grep -oE '/mintlify-assets[^"'\'' ]*|/_mintlify[^"'\'' ]*' \
  | sort -u
```

Stop the cutover if any URL starts with `/mintlify-assets` or `/_mintlify` and is not under `/subscription/docs`. Those root URLs would 404 on getappfox.com, or, if a root rewrite were added, one project would steal the other's assets. Ask Mintlify to prefix them, then re-run this check.

Also confirm analytics stays inside the folder. The page should post to `/subscription/docs/_mintlify/api/v1/e`, not to `/_mintlify/api/v1/e` at the domain root.

A prefixed asset looks like `/subscription/docs/mintlify-assets/...` or `/subscription/docs/_mintlify/...`. That is fine: the `:match*` rewrite already forwards it.

### 5. Confirm the apex folder

`www.getappfox.com` is the host that currently returns 200 (see step 6). Check subscriptions only:

```bash
curl -sI https://www.getappfox.com/subscription/docs/plans
```

Expect 200 and a Mintlify response (`x-mint-proxy-version`). A 404 here means step 3 has not finished or the rewrite destination does not match the base path.

Open the page in a browser and click through a few links, including an API page and a nested page. Styles, search, and the API playground have to work. If the browser requests `/mintlify-assets/...` on `getappfox.com` and gets 404, go back to step 4.

### 6. Make the apex the primary domain

Checked 10 October 2026: `https://getappfox.com/` returns **307** to `https://www.getappfox.com/`. Canonicals in this repo (`lib/site.ts`) and the docs 301s use the apex, `https://getappfox.com`.

In the Vercel project for this site: Settings → Domains → set `getappfox.com` as the primary domain so `www.getappfox.com` **308**s to the apex.

Do this before the docs DNS change. Otherwise every docs 301 lands on the apex and Vercel immediately 307s it to www. After this step, `curl -sI https://getappfox.com/subscription/docs/plans` should be 200 with no redirect.

This changes the marketing site's public host to the host its canonicals already name. It is a dashboard setting, not a code change.

### 7. Add the subscriptions subdomain to this Vercel project

Project → Settings → Domains → add `subscriptions-docs.getappfox.com` and assign it to Production.

Do not add `bundles-docs.getappfox.com`.

Vercel will show a CNAME. For this project the recommended target is:

`25427e4e7b9a36eb.vercel-dns-016.com`

If the dashboard prints a different CNAME, use the dashboard value. Fallback if that specific record is rejected: `cname.vercel-dns.com`.

Adding the domain does not move traffic. DNS still points at Mintlify until step 8.

### 8. Change DNS for subscriptions-docs only

Nameservers are Google's (`ns-cloud-e1.googledomains.com` through `ns-cloud-e4.googledomains.com`). The DNS editor is Squarespace Domains, not Cloudflare and not Vercel DNS.

Today `subscriptions-docs` is CNAME `cname.mintlify.builders` (trailing dot on the wire). Write that down before editing. It is the rollback target. Leave the `bundles-docs` CNAME on `cname.mintlify.builders`.

1. Open getappfox.com → DNS → DNS records.
2. Edit the CNAME whose host is `subscriptions-docs`.
3. Set the data to `25427e4e7b9a36eb.vercel-dns-016.com` (or whatever step 7 displayed). Do not include a trailing dot unless the form adds it.
4. Leave `bundles-docs`, `@`, `www`, and every other record alone.

Wait until the name answers from Vercel and HTTPS is issued:

```bash
dig +short CNAME subscriptions-docs.getappfox.com
curl -sI https://subscriptions-docs.getappfox.com/plans
```

The curl must be **301** with `Location: https://getappfox.com/subscription/docs/plans`. A certificate error means Vercel has not finished provisioning yet. Do not remove the Mintlify domain while that is true.

`dig +short CNAME bundles-docs.getappfox.com` must still be `cname.mintlify.builders.`

### 9. Run the redirect check

Against production, after DNS is serving Vercel:

```bash
npm run check-docs-redirects -- check --base https://getappfox.com --via-dns
```

The script only checks sites with `enabled: true`. It reads the committed URL list (refreshed from the live sitemaps in the previous PR), skips bundles, requests every subscriptions URL on the real legacy host, and requires:

- 301 to the apex URL with the same path and the same query string
- 200 on the new URL

Refresh the list first if the docs nav has changed since this PR. Refresh still pulls every site, including disabled ones, so the committed list stays complete:

```bash
npm run check-docs-redirects -- refresh
```

Commit the updated `data/docs-url-list.json` if you want the sitemap to match. The check does not need that commit to pass; it checks the list you have. Bundles URLs in that file stay out of the sitemap until `enabled` is true.

Before DNS, the same command against a local build is:

```bash
npm run build && npm run start
npm run check-docs-redirects -- check --base http://127.0.0.1:3000
```

That sends the legacy `Host` header to the local server. It cannot prove the new pages return 200 until step 3 is done, because Mintlify still 404s `*.mintlify.site/<basePath>` until the subpath is enabled. A POST to `<base>/_mintlify/api/v1/e` is forwarded either way. Until that route exists, Mintlify answers it with 405. That 405 is the upstream, not this Next app refusing the method. After the docs pages return 200, the same POST must not be 405.

### 10. Watch one real partner URL

Pick a subscriptions URL that is actually published, including a query string if the post has one:

```bash
curl -sI "https://subscriptions-docs.getappfox.com/plans?utm_source=partner"
```

`Location` must be the apex folder plus the same path and query. Then open the `Location` URL and confirm the page. Do not test `bundles-docs` as part of this cutover; it should still return 200 from Mintlify.

### 11. Remove the subscriptions custom domain from Mintlify

Only after step 9 passes.

In `appfox-subscriptions`, remove `subscriptions-docs.getappfox.com`. Keep the `getappfox.com` subpath domain from step 3. If you remove the subpath domain, the rewrite starts 404ing.

Do not remove `bundles-docs.getappfox.com` from `appfox-bundles`.

### 12. Search Console

Do not use Change of address. That tool is only for moving a whole domain property to a new domain. This is a host-to-folder move on the same apex.

1. Use the property for `https://getappfox.com` (or a domain property for `getappfox.com`). Canonicals already point at the apex. If the only verified property is `www`, add the apex URL-prefix property, or rely on the domain property, after step 6.
2. Submit `https://getappfox.com/sitemap.xml`. This sitemap lists the marketing URLs and the enabled docs URLs from `data/docs-url-list.json`. While bundles is disabled, that is subscriptions only.
3. URL Inspection: inspect the subscriptions docs home and a few deep pages partners link to (`/subscription/docs/plans`, `/subscription/docs/settings/billing`). Request indexing.
4. If a property exists for `subscriptions-docs.getappfox.com`, leave it in place. Coverage should shift to "Page with redirect". That is the point. Confirm that property is verified with a DNS TXT record. An HTML-file or meta-tag check on the docs host will fail once the host only returns 301s and no HTML. Leave any `bundles-docs` property as it is.
5. Remove any sitemap submission whose URL is `https://subscriptions-docs.getappfox.com/sitemap.xml`. That now 301s to Mintlify's sitemap under the new folder. Prefer the apex sitemap from step 2 of this list, which already uses the new URLs. Leave the bundles sitemap submission until bundles is cut over.
6. After Mintlify's own sitemap is proxied (`/subscription/docs/sitemap.xml`), open it and confirm `<loc>` values use `https://getappfox.com/...`, not the old subdomain. If they still name the old host, the canonical from step 2 is not live yet.
7. Check Coverage / Page indexing over the next crawls for a spike of 404s on `/subscription/docs`. A 404 there means the rewrite or the Mintlify base path missed a page that is still in the sitemap.

## Bundles later

Mintlify only lets one project per org claim `getappfox.com`. Subscriptions takes that claim in the steps above. When support allows `appfox-bundles` to use the same domain, turn bundles on with one line in `lib/docs-sites.json`:

```json
"enabled": true
```

Deploy that change. It adds the `/product-bundles/docs` rewrites, the `bundles-docs.getappfox.com` 301s, and the bundles sitemap URLs. The redirect check starts including bundles on its own. Then repeat the subscriptions steps for bundles only:

1. In [Appfox-apps/bundles-app-new](https://github.com/Appfox-apps/bundles-app-new) `help-docs/docs.json`, set `seo.metatags.canonical` to `https://getappfox.com/product-bundles/docs` (no trailing slash). Replace hardcoded `bundles-docs.getappfox.com` with `getappfox.com/product-bundles/docs`. Deploy the docs project.
2. On Mintlify project `appfox-bundles`, enable **Host at** for `getappfox.com` with base path `/product-bundles/docs`. Leave `bundles-docs.getappfox.com` attached. Confirm `https://bundles-docs.getappfox.com/getting-started` is still 200, then `https://appfox-bundles.mintlify.site/product-bundles/docs/getting-started` is 200.
3. Run the asset grep from step 4 against `https://appfox-bundles.mintlify.site/product-bundles/docs`. Stop if any `/mintlify-assets` or `/_mintlify` URL is not under `/product-bundles/docs`. Do not add a root rewrite.
4. Confirm `https://getappfox.com/product-bundles/docs/getting-started` is 200.
5. Add `bundles-docs.getappfox.com` to this Vercel project (Production). Change only that CNAME from `cname.mintlify.builders` to the Vercel CNAME from step 7 (`25427e4e7b9a36eb.vercel-dns-016.com`, or whatever the dashboard shows). Leave `@` and `www` alone.
6. Run `npm run check-docs-redirects -- check --base https://getappfox.com --via-dns`. It now checks both enabled sites.
7. After the check passes, remove `bundles-docs.getappfox.com` from Mintlify. Keep the subpath domain.
8. In Search Console, inspect `/product-bundles/docs` pages, and only then retire the old bundles sitemap submission. Confirm `/product-bundles/docs/sitemap.xml` uses apex `<loc>` values.

Until `enabled` is true, do none of those Vercel or DNS steps.

## Rollback

Stop at the earliest step that went wrong. Later steps are what make the old subscriptions links depend on this repo. Bundles DNS should still be `cname.mintlify.builders`; do not change it to roll this back.

**Old host broke as soon as the subpath was enabled (step 3), DNS not touched.** In `appfox-subscriptions`, remove the `getappfox.com` subpath domain (or turn **Host at** off) so the project is mounted at the root again. Revert the `docs.json` canonical to the old host, or remove the `canonical` key if it was not there before. Confirm `https://subscriptions-docs.getappfox.com/plans` is 200. This repo's deploy can stay: the new folder 404s until the subpath is on, and the host 301 does not run while DNS still points at Mintlify.

**New folder 404s, old host still fine.** Do not change DNS. Re-check the base path spelling in Mintlify and in `lib/docs-sites.json`. They must match, including `/subscription/docs` singular.

**DNS already points at Vercel and the 301s are wrong.** Set the `subscriptions-docs` CNAME back to `cname.mintlify.builders`. The Mintlify custom domain must still be attached, which is why it stays until step 11. After DNS returns, the old URLs should 200 from Mintlify again. If you already removed that custom domain, add it back as a root domain (not as a subpath) and then restore the CNAME.

**Apex primary change caused a problem.** In Vercel Domains, set `www.getappfox.com` as the redirect target again so the apex 307s to www, which was the previous behavior.

**Assets 404 after a successful 301.** The HTML check in step 4 failed or was skipped. Roll DNS back if partner links are what load the broken pages. Do not add a root `/mintlify-assets` rewrite that points at only one Mintlify host.

The code in this PR only affects `subscriptions-docs.getappfox.com` and `/subscription/docs`. Revert the deployment if that folder is serving the wrong project or a marketing URL under it is missing. You do not need to revert it to restore the old host, as long as DNS points back at `cname.mintlify.builders` and Mintlify still has that custom domain.
