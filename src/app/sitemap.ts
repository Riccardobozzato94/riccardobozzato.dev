import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getBlogPosts } from "@/lib/blog";

const STATIC_PAGES = [
  "",
  "about",
  "accessibility",
  "advertise",
  "blog",
  "contact",
  "freebie",
  "privacy",
  "projects",
];

// Project detail pages (indexable).
const PROJECT_SLUGS = ["panificio", "synapse", "vulnclaw"];

// NOTE: books / playbook / shipkit / services are intentionally excluded
// (consulting offer hidden — hiring-first positioning). Pages stay online
// but carry robots noindex metadata, so they must NOT be advertised here.
//
// WARNING: do not add a static `public/sitemap.xml`. A file in public/ shadows
// this metadata route and silently wins — that is how a stale July 2026 sitemap
// (with /services in it) kept being served after c3b8ea8 hid the offer.

const LOCALES = ["en", "it"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static pages for each locale
  const staticRoutes: MetadataRoute.Sitemap = STATIC_PAGES.flatMap((page) =>
    LOCALES.map((locale) => ({
      url: `${SITE_URL}/${locale}${page ? `/${page}` : ""}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: page === "" ? 1 : 0.7,
      alternates: {
        languages: {
          en: `${SITE_URL}/en${page ? `/${page}` : ""}`,
          it: `${SITE_URL}/it${page ? `/${page}` : ""}`,
        },
      },
    }))
  );

  // Project detail pages for each locale
  const projectRoutes: MetadataRoute.Sitemap = PROJECT_SLUGS.flatMap((slug) =>
    LOCALES.map((locale) => ({
      url: `${SITE_URL}/${locale}/projects/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: {
          en: `${SITE_URL}/en/projects/${slug}`,
          it: `${SITE_URL}/it/projects/${slug}`,
        },
      },
    }))
  );

  // Blog posts for each locale
  const blogRoutes: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    getBlogPosts(locale).map((post) => ({
      url: `${SITE_URL}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: {
        languages: {
          en: `${SITE_URL}/en/blog/${post.slug}`,
          it: `${SITE_URL}/it/blog/${post.slug}`,
        },
      },
    }))
  );

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
