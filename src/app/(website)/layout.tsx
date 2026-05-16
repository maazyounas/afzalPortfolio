import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getSettings } from "@/actions/settings";
import JsonLd from "@/components/seo/JsonLd";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  if (!settings) {
    return {
      title: "Website",
      description: "Modern financial solutions",
    };
  }

  return {
    metadataBase: new URL(settings.url),

    title: {
      default: settings.siteName,
      template: `%s | ${settings.siteName}`,
    },

    description: settings.description,

    keywords: [
      "finance",
      "accounting",
      "tax advisory",
      "financial consulting",
      "business solutions",
    ],

    authors: [{ name: settings.siteName }],

    creator: settings.siteName,

    openGraph: {
      title: settings.siteName,
      description: settings.description,
      url: settings.url,
      siteName: settings.siteName,
      locale: "en_US",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: settings.siteName,
      description: settings.description,
    },

    robots: {
      index: true,
      follow: true,
    },

    icons: {
      icon: "/favicon.ico",
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
      {/* SEO Schema */}
      {organizationSchema && (
        <JsonLd data={organizationSchema} />
      )}

      {/* App Shell */}
      <div className="flex min-h-screen flex-col bg-(--color-sand) text-(--color-ink) antialiased">
        <Navbar />

        <main className="flex-1">{children}</main>

        <Footer />
      </div>
    </>
  );
}
