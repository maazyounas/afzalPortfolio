import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getSettings } from "@/actions/settings";
import JsonLd from "@/components/seo/JsonLd";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  const siteName = settings?.siteName ?? "Website";
  const description =
    settings?.description ?? "Modern financial solutions";
  const url = settings?.url ?? "";

  return {
    metadataBase: url ? new URL(url) : undefined,

    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },

    description,

    keywords: [
      "finance",
      "accounting",
      "tax advisory",
      "financial consulting",
      "business solutions",
    ],

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
      icon: "/favicon.ico",
    },

    // optional but recommended for SEO stability
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

  const baseUrl = settings?.url;

  const organizationSchema =
    settings && baseUrl
      ? {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: settings.siteName,
          url: baseUrl,
          logo: `${baseUrl}/logo.png`,
          description: settings.description,
          contactPoint: {
            "@type": "ContactPoint",
            telephone: settings.contactPhone,
            email: settings.contactEmail,
            contactType: "customer service",
          },
        }
      : null;

  return (
    <>
      {/* Structured Data */}
      {organizationSchema && <JsonLd data={organizationSchema} />}

      {/* App Shell */}
      <div className="flex min-h-screen flex-col bg-(--color-sand) text-(--color-ink) antialiased scroll-smooth">
        <Navbar />

        <main className="flex-1">{children}</main>

        <Footer />
      </div>
    </>
  );
}