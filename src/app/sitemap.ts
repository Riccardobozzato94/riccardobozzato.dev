import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getBlogPosts } from "@/lib/blog";

/**
 * Sitemap
 *
 * Single source of truth. NOTE: there must be no `public/sitemap.xml` — a file
 * in public/ shadows this metadata route and silently wins. That is exactly how
 * a stale July 2026 sitemap (still advertising `/services`, and missing all 12
 * blog posts) kept being served after the offer page was hidden.
 */

const LOCALES = ["en", "it"] as const;

/**
 * Public, indexable pages.
 *
 * A page belongs here only if it is NOT `noindex`. Keeping a noindex page in
 * the sitemap tells search engines to crawl something you have told them to
 * ignore, which is a contradiction. The excluded ones are:
 *   services  - contact-gated until P.IVA, robots noindex
 *   books, playbook, shipkit - hidden offer pages, robots noindex
 *   login, thank-you, confirm, unsubscribe - transactional, no search value
 *   advertise - new; opt in here once it has earned some links
 */
const STATIC_PAGES = [
  "",
  "about",
  "accessibility",
  "books",
  "blog",
  "contact",
  "freebie",
  "privacy",
  "projects",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = STATIC_PAGES.flatMap((page) =>
    LOCALES.map((locale) => ({
      url: `${SITE_URL}/${locale}${page ? `/${page}` : ""}`,
      lastModified: now,
      changeFrequency: page === "blog" ? ("daily" as const) : ("weekly" as const),
      priority: page === "" ? 1 : page === "blog" || page === "freebie" ? 0.8 : 0.6,
      alternates: {
        languages: {
          en: `${SITE_URL}/en${page ? `/${page}` : ""}`,
          it: `${SITE_URL}/it${page ? `/${page}` : ""}`,
        },
      },
    }))
  );

  const blogRoutes: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    getBlogPosts(locale).map((post) => ({
      url: `${SITE_URL}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: {
          en: `${SITE_URL}/en/blog/${post.slug}`,
          it: `${SITE_URL}/it/blog/${post.slug}`,
        },
      },
    }))
  );

  return [...staticRoutes, ...blogRoutes];
}
