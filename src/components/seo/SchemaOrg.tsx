import { siteConfig } from "@/lib/data/site-config";

export function SchemaOrg() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.company.phone,
    email: siteConfig.company.email,
    address: {
      "@type": "PostalAddress",
      addressCountry: siteConfig.company.country,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
