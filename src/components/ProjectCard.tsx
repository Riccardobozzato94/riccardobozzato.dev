"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

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
    <Link href={href} className="group block">
      <Card
        className={cn(
          "overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5",
          featured
            ? "border-accent/20 hover:border-accent/40"
            : "border-border/60 hover:border-border",
          className,
        )}
      >
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
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : (
          <div
            className={cn(
              "w-full bg-gradient-to-br from-accent/10 to-accent/5",
              featured ? "aspect-[16/7]" : "aspect-video",
            )}
          />
        )}

        <CardHeader className={cn(featured && "p-6 md:p-8")}>
          <div className="flex items-center justify-between gap-2 mb-1">
            <CardTitle className={cn(featured ? "text-2xl md:text-3xl" : "text-lg")}>
              {title}
            </CardTitle>
            {badge && (
              <Badge
                variant="secondary"
                className={cn("shrink-0 text-xs", badgeColor)}
              >
                {badge}
              </Badge>
            )}
          </div>
          {subtitle && (
            <p
              className={cn(
                "text-muted-foreground",
                featured ? "text-base" : "text-sm",
              )}
            >
              {subtitle}
            </p>
          )}
          <CardDescription
            className={cn(
              "leading-relaxed",
              featured ? "text-base mt-2" : "text-sm mt-1",
            )}
          >
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className={cn(featured && "px-6 md:px-8")}>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className={cn(
                  "text-xs",
                  featured && "text-sm px-3 py-1",
                )}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter
          className={cn(
            "border-t border-border/50",
            featured && "px-6 md:px-8 py-4",
          )}
        >
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors group-hover:text-accent/80">
            {t("viewProject")}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
