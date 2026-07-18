import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import { getBlogPost } from "@/lib/blog";
import { CalendarDays, ArrowLeft, ArrowRight, Sparkles, Download, BookOpen } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Section from "@/components/Section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const baseUrl = SITE_URL;

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPost(locale, slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.title} — Blog`,
    description: post.description,
    openGraph: {
      title: `${post.title} | Riccardo Bozzato`,
      description: post.description,
      url: `${baseUrl}/${locale}/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  const post = getBlogPost(locale, slug);

  if (!post) {
    notFound();
  }

  const isIt = locale === "it";

  return (
    <>
      {/* Back link */}
      <div className="pt-28 md:pt-36">
        <Section className="pt-0! pb-0!">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
              {isIt ? "Torna al blog" : "Back to blog"}
            </Link>
          </div>
        </Section>
      </div>

      {/* Post header */}
      <section className="relative pt-8 pb-8 md:pb-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-accent/6 blur-[120px]" />
        </div>
        <Section className="pt-0! pb-0! relative">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="size-4" />
                {post.date}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight tracking-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="font-normal border border-border/50">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </Section>
      </section>

      {/* Post body */}
      <Section animate className="bg-muted/30 py-16! md:!py-20">
        <article className="max-w-3xl mx-auto prose prose-lg prose-invert prose-headings:text-foreground prose-headings:font-bold prose-p:text-muted-foreground prose-p:leading-relaxed prose-strong:text-foreground prose-strong:font-semibold prose-li:text-muted-foreground max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.body}
          </ReactMarkdown>
        </article>
      </Section>

      {/* Consigliato da Riccardo — Affiliate badge */}
      <Section animate className="pb-0!">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="rounded-2xl border border-accent/20 bg-accent/5 p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="size-12 shrink-0 rounded-xl bg-accent/10 flex items-center justify-center">
                <BookOpen className="size-6 text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent mb-2">
                  <Sparkles className="size-3" />
                  {isIt ? "Consigliato da Riccardo" : "Recommended by Riccardo"}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {isIt
                    ? "Alcuni link in questo articolo sono link di affiliazione Amazon. A te non costa nulla, io ricevo una piccola commissione che aiuta a mantenere il sito. Ogni libro o strumento che consiglio è stato personalmente testato e selezionato."
                    : "Some links in this post are Amazon affiliate links. You pay nothing extra, I get a small commission that helps keep this site running. Every book or tool I recommend has been personally tested and curated."}
                </p>
                <div className="mt-4">
                  <Button asChild variant="outline" size="sm" className="text-xs">
                    <Link href="/books">
                      {isIt ? "Vedi tutti i libri consigliati" : "See all recommended books"}
                      <ArrowRight className="size-3 ml-1.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Contextual CTA */}
      <Section animate>
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="size-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto">
            <Sparkles className="size-7 text-accent" />
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight">
              {isIt ? "Ti è piaciuto questo articolo?" : "Enjoyed this post?"}
            </h2>
            <p className="text-muted-foreground">
              {isIt
                ? "Condividilo con un collega o contattami per parlarne."
                : "Share it with a colleague or reach out to discuss."}
            </p>
          </div>

          {/* Contextual CTA */}
          <div className="flex flex-wrap justify-center gap-3">
            {(slug.includes("chaos") || slug.includes("caos") || slug.includes("ops-security") || slug.includes("operazioni") || slug.includes("head-of-ops") || slug.includes("builder")) && (
              <Link
                href="/freebie"
                className="group inline-flex items-center gap-2 h-11 rounded-xl bg-accent/10 hover:bg-accent/20 border border-accent/20 px-5 text-sm font-medium text-accent transition-all duration-300 hover:-translate-y-0.5"
              >
                <Download className="size-4" />
                {isIt ? "Scarica il Playbook" : "Download the Playbook"}
              </Link>
            )}
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 h-11 rounded-xl bg-accent/10 hover:bg-accent/20 border border-accent/20 px-5 text-sm font-medium text-accent transition-all duration-300 hover:-translate-y-0.5"
            >
              <ArrowRight className="size-4" />
              {isIt ? "Parlami del tuo progetto" : "Tell me about your project"}
            </Link>
            <Link
              href="/blog"
              className="group inline-flex items-center justify-center gap-2 h-11 rounded-xl border border-border/50 bg-card shadow-sm hover:border-accent/30 hover:bg-accent/5 px-5 text-sm font-medium transition-all duration-300"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
              {isIt ? "Altri articoli" : "More posts"}
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
