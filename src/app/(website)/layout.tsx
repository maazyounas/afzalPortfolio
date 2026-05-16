import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { getSettings } from "@/actions/settings";
import JsonLd from "@/components/seo/JsonLd";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  
  if (!settings) return {};

  return {
    metadataBase: new URL(settings.url),
    title: {
      default: settings.siteName,
      template: `%s | ${settings.siteName}`,
    },
    description: settings.description,
    keywords: ["finance", "accounting", "tax advisory"],
    openGraph: {
      title: settings.siteName,
      description: settings.description,
      url: settings.url,
      siteName: settings.siteName,
      locale: "en_US",
      type: "website",
    },
  };
}

export default async function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  const organizationSchema = settings ? {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": settings.siteName,
    "url": settings.url,
    "logo": `${settings.url}/logo.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": settings.contactPhone,
      "contactType": "customer service",
      "email": settings.contactEmail
    }
  } : null;

  return (
    <>
      {organizationSchema && <JsonLd data={organizationSchema} />}
      <div className="min-h-screen bg-[var(--color-sand)] text-[var(--color-ink)]">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}
