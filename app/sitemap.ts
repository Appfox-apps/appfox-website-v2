import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { competitors } from "@/data/competitors";
import { bundleAlternativeSlugs } from "@/data/bundle-compare";
import { posts } from "@/data/posts";

/**
 * Bump when marketing content meaningfully changes. A perpetually-fresh
 * build-time date would teach crawlers to ignore lastModified entirely.
 */
const CONTENT_UPDATED = new Date("2026-10-10");

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = CONTENT_UPDATED;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: site.url, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/apps`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/order-editing`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/subscription`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/product-bundles`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/product-bundles/compare`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/features`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/features/order-editing`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/features/subscription`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/features/product-bundles`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/pricing`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/pricing/order-editing`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/pricing/subscription`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/pricing/product-bundles`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/vs`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/blog`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${site.url}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/terms`, lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];

  const comparisonSlugs = new Set([
    ...competitors.map((c) => c.slug),
    ...bundleAlternativeSlugs(),
  ]);
  const comparisonRoutes: MetadataRoute.Sitemap = [...comparisonSlugs].map((slug) => ({
    url: `${site.url}/vs/${slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${site.url}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...comparisonRoutes, ...blogRoutes];
}
