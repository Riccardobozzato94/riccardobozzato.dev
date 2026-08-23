"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  title: string;
  subtitle?: string;
  description: string;
  tags: string[];
  href: string;
  image?: string;
  badge?: string;
  badgeColor?: string;
  featured?: boolean;
  /** Optional highlight bullets — max 3 are rendered to keep cards uniform. */
  features?: string[];
  className?: string;
}

/** Returns true if the href is an absolute URL (external link). */
function isExternal(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export default function ProjectCard({
  title,
  subtitle,
  description,
  tags,
  href,
  image,
  badge,
  badgeColor = "bg-accent/10 text-accent",
  featured = false,
  features,
  className,
}: ProjectCardProps) {
  const t = useTranslations("home");

  const Wrapper = isExternal(href)
    ? ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="group block focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 rounded-2xl"
          {...props}
        >
          {children}
          {/* External link indicator */}
          <span className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ExternalLink className="size-4 text-muted-foreground/60" />
          </span>
        </a>
      )
    : ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
        <Link href={href} className="group block focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 rounded-2xl" {...props}>
          {children}
        </Link>
      );

  const visibleFeatures = features?.slice(0, featured ? 3 : 2) ?? [];

  return (
    <Wrapper>
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border transition-all duration-500 h-full flex flex-col",
          featured
            ? "border-accent/25 hover:border-accent/50"
            : "border-border/60 hover:border-primary/40",
          "hover:-translate-y-1.5",
          featured
            ? "shadow-lg shadow-black/20 hover:shadow-2xl hover:shadow-accent/20"
            : "shadow-sm shadow-black/10 hover:shadow-xl hover:shadow-primary/10",
          "bg-gradient-to-b from-card to-card/80",
          className,
        )}
      >
        {/* Image */}
        {image ? (
          <div
            className={cn(
              "relative w-full overflow-hidden",
              featured ? "aspect-[16/7]" : "aspect-video",
            )}
          >
            <Image
              src={image}
              alt={title}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-all duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card/60 via-transparent to-transparent pointer-events-none" />

            {/* Badge overlaid on image */}
            {badge && (
              <Badge
                variant="secondary"
                className={cn(
                  "absolute top-3 left-3 z-10 shrink-0 text-xs font-medium backdrop-blur-sm border border-white/10 shadow-sm",
                  badgeColor,
                )}
              >
                {badge}
              </Badge>
            )}
          </div>
        ) : null}

        {/* Content */}
        <div className={cn("flex flex-col grow", featured ? "p-6 md:p-8" : "p-5 md:p-6")}>
          <div className="flex items-start justify-between gap-3 mb-1">
            <h3 className={cn(
              "font-heading font-bold tracking-tight",
              featured ? "text-2xl md:text-3xl" : "text-lg",
            )}>
              {title}
            </h3>
            {!image && badge && (
              <Badge
                variant="secondary"
                className={cn("shrink-0 text-xs font-medium", badgeColor)}
              >
                {badge}
              </Badge>
            )}
          </div>

          {subtitle && (
            <p
              className={cn(
                "text-muted-foreground/80 mb-2",
                featured ? "text-base" : "text-sm",
              )}
            >
              {subtitle}
            </p>
          )}

          <p
            className={cn(
              "text-muted-foreground leading-relaxed mt-1",
              featured ? "text-base" : "text-sm",
            )}
          >
            {description}
          </p>

          {/* Feature highlights */}
          {visibleFeatures.length > 0 && (
            <ul className={cn("space-y-2", featured ? "mt-5" : "mt-4")}>
              {visibleFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                  <span aria-hidden className="mt-[7px] size-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Tags pinned to bottom for uniform card heights */}
          <div className="flex flex-wrap gap-1.5 mt-auto pt-5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-md border border-border/50 bg-muted/30 px-2.5 py-0.5 font-mono text-[11px] font-medium text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-5 pt-4 border-t border-border/30">
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent group/cta">
              {t("viewProject")}
              <ArrowRight className="size-4 transition-all duration-300 group-hover/cta:translate-x-1 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
