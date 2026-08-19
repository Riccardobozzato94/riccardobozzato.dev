import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getBlogPosts } from "@/lib/blog";

const STATIC_PAGES = [
  "",
  "about",
  "blog",
  "books",
  "contact",
  "freebie",
  "playbook",
  "privacy",
  "projects",
  "services",
  "shipkit",
];

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

  return [...staticRoutes, ...blogRoutes];
}
