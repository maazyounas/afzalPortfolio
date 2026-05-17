import { manrope, merriweather } from "@/styles/fonts";
import "@/styles/globals.css";
import { AnimationProvider } from "@/components/providers/AnimationProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${merriweather.variable} scroll-smooth overflow-x-clip`}
    >
      <body className="overflow-x-clip antialiased">
        <AnimationProvider>{children}</AnimationProvider>
      </body>
    </html>
  );
}
