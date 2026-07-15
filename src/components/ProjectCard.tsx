"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
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
  className?: string;
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
  className,
}: ProjectCardProps) {
  const t = useTranslations("home");

  return (
    <Link href={href} className="group block focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 rounded-xl">
      <div
        className={cn(
          "relative overflow-hidden rounded-xl border transition-all duration-500",
          featured
            ? "border-accent/20 hover:border-accent/40"
            : "border-border/60 hover:border-border",
          "hover:-translate-y-1.5",
          featured
            ? "shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-accent/5"
            : "shadow-sm shadow-black/10 hover:shadow-lg hover:shadow-black/15",
          "bg-gradient-to-b from-card to-card/80",
          className,
        )}
      >
        {/* Subtle gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-accent/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Image */}
        {image ? (
          <div
            className={cn(
              "w-full overflow-hidden",
              featured ? "aspect-[16/7]" : "aspect-video",
            )}
          >
            <img
              src={image}
              alt={title}
              loading="lazy"
              className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
            />
          </div>
        ) : (
          <div
            className={cn(
              "w-full bg-gradient-to-br from-accent/10 via-accent/5 to-card",
              featured ? "aspect-[16/7]" : "aspect-video",
            )}
          />
        )}

        {/* Content */}
        <div className={cn(featured ? "p-6 md:p-8" : "p-5")}>
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className={cn(
              "font-heading font-bold tracking-tight",
              featured ? "text-2xl md:text-3xl" : "text-lg",
            )}>
              {title}
            </h3>
            {badge && (
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
                "text-muted-foreground/80",
                featured ? "text-base" : "text-sm",
              )}
            >
              {subtitle}
            </p>
          )}

          <p
            className={cn(
              "text-muted-foreground leading-relaxed mt-2",
              featured ? "text-base" : "text-sm",
            )}
          >
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-md border border-border/50 bg-muted/30 px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-5 pt-4 border-t border-border/30">
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent group/cta">
              {t("viewProject")}
              <ArrowRight className="size-4 transition-all duration-300 group-hover/cta:translate-x-1" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
