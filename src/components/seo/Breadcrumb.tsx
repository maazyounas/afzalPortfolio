import Link from "next/link";
import JsonLd from "@/components/JsonLd";

type BreadcrumbItem = {
  label: string;
  href: string;
};

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const allItems = [{ label: "Home", href: "/" }, ...items];
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `https://yourdomain.com${item.href}`,
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="mb-8 text-sm text-[var(--color-muted)]">
      <JsonLd data={jsonLdData} />
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href="/">Home</Link>
        </li>
        {items.map((item) => (
          <li key={item.href} className="flex items-center gap-2">
            <span>/</span>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
