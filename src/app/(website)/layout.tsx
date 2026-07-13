import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getSettings } from "@/actions/settings";
import JsonLd from "@/components/seo/JsonLd";
import { AnimationProvider } from "@/components/providers/AnimationProvider";
import { siteConfig } from "@/lib/data/site-config";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  const siteName = settings?.siteName ?? siteConfig.name;
  const description = settings?.description ?? siteConfig.description;
  const url = settings?.url ?? siteConfig.url;

  return {
    metadataBase: url ? new URL(url) : undefined,
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    applicationName: siteName,
    description,
    keywords: [...siteConfig.keywords],
    authors: [{ name: siteName }],
    creator: siteName,
    openGraph: {
      title: siteName,
      description,
      url,
      siteName,
      locale: "en_US",
      type: "website",
      images: url ? [`${url}/og.png`] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: siteName,
      description,
      images: url ? [`${url}/og.png`] : undefined,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    icons: {
      icon: "/icon.png",
    },
    alternates: {
      canonical: url || undefined,
    },
  };
}

export default async function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  const baseUrl = settings?.url ?? siteConfig.url;
  const siteName = settings?.siteName ?? siteConfig.name;
  const description = settings?.description ?? siteConfig.description;
  const contactEmail = settings?.contactEmail ?? siteConfig.company.email;
  const contactPhone = settings?.contactPhone ?? siteConfig.company.phone;

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    alternateName: siteConfig.shortName,
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: contactPhone,
      email: contactEmail,
      contactType: "customer service",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    alternateName: siteConfig.shortName,
    url: baseUrl,
  };

  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />

      <div className="flex min-h-screen flex-col bg-(--color-sand) text-(--color-ink) antialiased scroll-smooth overflow-x-hidden">
        <Navbar siteName={siteName} />

        <AnimationProvider>
          <main className="flex-1">{children}</main>
        </AnimationProvider>

        <Footer siteName={siteName} />
      </div>
    </>
  );
}
