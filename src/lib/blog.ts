import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  locale: string;
  description: string;
  tags: string[];
  author: string;
  image?: string;
  published: boolean;
  body: string;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export function getBlogPosts(locale: string): BlogPost[] {
  const dir = path.join(BLOG_DIR, locale);
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter(f => f.endsWith(".md"));
  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), "utf-8");
    const { data, content } = matter(raw);
    return {
      slug: file.replace(/\.md$/, ""),
      title: data.title,
      date: data.date,
      locale: data.locale || locale,
      description: data.description || "",
      tags: data.tags || [],
      author: data.author || "Riccardo Bozzato",
      image: data.image || undefined,
      published: data.published !== false,
      body: content,
    };
  });
  return posts
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPost(locale: string, slug: string): BlogPost | null {
  const posts = getBlogPosts(locale);
  return posts.find((p) => p.slug === slug) || null;
}
