import { Link } from "@/i18n/navigation";

interface Crumb {
  label: string;
  href?: string;
}

/**
 * Breadcrumbs — Home > Sezione > Titolo (checklist punto 5).
 * Navigazione accessibile con aria-current.
 */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs font-mono text-muted-foreground">
        <li>
          <Link href="/" className="hover-underline hover:text-foreground transition-colors">
            Home
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <span aria-hidden className="text-outline">
              /
            </span>
            {item.href ? (
              <Link
                href={item.href}
                className="hover-underline hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-foreground">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}