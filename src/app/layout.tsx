import { manrope, merriweather } from "@/styles/fonts";
import "@/styles/globals.css";
import JsonLd from "@/components/JsonLd";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdData = [
    {
      "@context": "https://schema.org",
      "@type": "Website",
      url: "https://yourdomain.com",
      name: "Afzal's Portfolio",
      description: "Professional portfolio and services",
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Afzal",
      url: "https://yourdomain.com",
      sameAs: [
        "https://twitter.com/yourhandle",
        "https://linkedin.com/in/yourhandle",
        "https://github.com/yourhandle",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Softech Financials",
      url: "https://yourdomain.com",
      logo: "https://yourdomain.com/logo.png",
    },
  ];

  return (
    <html
      lang="en"
      className={`${manrope.variable} ${merriweather.variable} scroll-smooth`}
    >
      <body className="antialiased">
        <JsonLd data={jsonLdData} />
        {children}
      </body>
    </html>
  );
}
