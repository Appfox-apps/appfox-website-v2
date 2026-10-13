import { docsSites, type DocsSite } from "./docs-sites";

/**
 * Visible docs links for the marketing site.
 *
 * Only sites with `enabled: true` in lib/docs-sites.json are returned, so a
 * folder that is not proxied yet never gets a link that 404s. Product Bundles
 * stays hidden until that flag flips; the same call sites then show it.
 * Destinations are each site's `basePath`, not a hardcoded path.
 *
 * Render these with a plain `<a>`. The folders are `beforeFiles` rewrites to
 * Mintlify, and a next/link client navigation would not load that document.
 */

const COPY: Record<string, { label: string; detail: string }> = {
  subscriptions: {
    label: "Subscriptions docs",
    detail: "Billing, portal, and setup",
  },
  bundles: {
    label: "Product Bundles docs",
    detail: "Offers, discounts, and widgets",
  },
};

export type DocsNavItem = {
  id: string;
  label: string;
  detail: string;
  href: string;
};

function toNavItem(docsSite: DocsSite): DocsNavItem {
  const copy = COPY[docsSite.id] ?? {
    label: `${docsSite.id} docs`,
    detail: "Documentation",
  };
  return {
    id: docsSite.id,
    label: copy.label,
    detail: copy.detail,
    href: docsSite.basePath,
  };
}

/** Enabled docs sites, in the order they appear in lib/docs-sites.json. */
export function enabledDocsNavItems(): DocsNavItem[] {
  return docsSites.filter((docsSite) => docsSite.enabled).map(toNavItem);
}

/** One site's docs link, or null while that site is disabled. */
export function docsNavItem(id: string): DocsNavItem | null {
  const docsSite = docsSites.find((item) => item.id === id);
  if (!docsSite?.enabled) return null;
  return toNavItem(docsSite);
}

/**
 * True for any configured docs path, including a site that is still disabled.
 * Callers use this to pick a full-page `<a>` over next/link.
 */
export function isDocsPath(href: string): boolean {
  return docsSites.some(
    (docsSite) => href === docsSite.basePath || href.startsWith(`${docsSite.basePath}/`),
  );
}
