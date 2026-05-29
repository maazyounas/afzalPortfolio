import { manrope, merriweather } from "@/styles/fonts";
import "@/styles/globals.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${merriweather.variable} scroll-smooth`}
    >
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
