import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Softech Financials",
    short_name: "Softech",
    description: "Financial advisory, audit, tax, and outsourced finance solutions.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f1e8",
    theme_color: "#0f766e",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
