import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Softtech Financials",
    short_name: "Softtech",
    description: "Financial advisory, audit, tax, and outsourced finance solutions.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f1e8",
    theme_color: "#0f766e",
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}

