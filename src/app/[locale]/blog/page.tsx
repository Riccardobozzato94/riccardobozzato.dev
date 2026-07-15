import { blogPosts, type BlogPost } from "@/content/blog";
import { CalendarDays, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Section from "@/components/Section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

function getPostsForLocale(locale: string): BlogPost[] {
  return blogPosts
    .filter((p) => p.locale === locale)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function BlogIndexPage({ params }: Props) {
  const { locale } = await params;
  const posts = getPostsForLocale(locale);
  const isIt = locale === "it";

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-8 md:pt-36 md:pb-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-accent/8 blur-[120px]" />
        </div>
        <Section className="!pt-0 !pb-0 text-center relative">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm text-accent mb-6">
              <Sparkles className="size-3.5" />
              {isIt ? "Articoli" : "Posts"}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              {isIt ? "Blog" : "Blog"}
            </h1>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              {isIt
                ? "Pensieri, progetti e lezioni imparate costruendo cose."
                : "Thoughts, projects, and lessons learned building things."}
            </p>
          </div>
        </Section>
      </section>

      {/* Posts */}
      <Section animate className="!py-16 md:!py-20">
        <div className="max-w-4xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                {isIt
                  ? "Nessun articolo ancora. Torna presto!"
                  : "No posts yet. Check back soon!"}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post, idx) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                  <Card className="border-border/50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5 hover:border-accent/30 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-accent/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    <CardHeader>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                        <span className="flex items-center gap-1.5">
                          <CalendarDays className="size-3.5" />
                          {post.date}
                        </span>
                      </div>
                      <CardTitle className="text-xl group-hover:text-accent transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-sm mt-2 leading-relaxed">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs font-normal border border-border/50">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                          {isIt ? "Leggi" : "Read more"}
                          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </Section>
    </>
  );
}