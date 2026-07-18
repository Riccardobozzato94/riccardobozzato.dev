import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";
import { getBlogPosts } from "@/lib/blog";

function escapeXml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildRssItem(post: ReturnType<typeof getBlogPosts>[number]) {
  const locale = post.locale === "it" ? "it" : "en";
  const link = `${SITE_URL}/${locale}/blog/${post.slug}`;
  const title = escapeXml(post.title);
  const description = escapeXml(post.description || "");
  const date = new Date(post.date).toUTCString();
  return `    <item>
      <title>${title}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${date}</pubDate>
      <description>${description}</description>
      <category>Blog</category>
    </item>`;
}

export async function GET() {
  const enPosts = getBlogPosts("en");
  const itPosts = getBlogPosts("it");
  const allPosts = [...enPosts, ...itPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const items = allPosts.map(buildRssItem).join("\n");
  const now = new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)} — Blog</title>
    <link>${SITE_URL}/en/blog</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
