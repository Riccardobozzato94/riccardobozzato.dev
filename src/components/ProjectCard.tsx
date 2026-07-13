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
  className?: string;
}

export default function ProjectCard({
  title,
  subtitle,
  description,
  tags,
  href,
  image,
  className,
}: ProjectCardProps) {
  const t = useTranslations("home");

  return (
    <Link href={href} className="group block">
      <Card
        className={cn(
          "overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5",
          className,
        )}
      >
        {image ? (
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="aspect-video w-full bg-gradient-to-br from-green-500/20 to-blue-500/20" />
        )}

        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
          <CardDescription>{description}</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors group-hover:text-accent/80">
            {t("viewProject")}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
