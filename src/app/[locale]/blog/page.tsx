import { blogPosts, type BlogPost } from "@/content/blog";
import { CalendarDays, Clock, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Section from "@/components/Section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

function getPostsForLocale(locale: string): BlogPost[] {
  // When called from a server component, locale comes from params
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
      <Section className="text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {isIt ? "Blog" : "Blog"}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {isIt
              ? "Pensieri, progetti e lezioni imparate costruendo cose."
              : "Thoughts, projects, and lessons learned building things."}
          </p>
        </div>
      </Section>

      <Section className="bg-muted/30">
        <div className="max-w-4xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {isIt
                  ? "Nessun articolo ancora. Torna presto!"
                  : "No posts yet. Check back soon!"}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                  <Card className="transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-accent/30">
                    <CardHeader>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                        <span className="flex items-center gap-1">
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
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                          {isIt ? "Leggi" : "Read more"}
                          <ArrowRight className="size-4" />
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
