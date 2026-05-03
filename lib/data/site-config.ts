import type { BlogPost } from "@/types";

const blogPosts: BlogPost[] = [
  {
    slug: "why-finance-teams-need-clean-close-processes",
    title: "Why Finance Teams Need Clean Close Processes",
    excerpt:
      "A stronger close is often the fastest route to better leadership reporting and fewer downstream surprises.",
    category: "Operations",
    publishedAt: "2026-04-15",
    body: [
      "Close discipline affects everything that comes after it, from board packs to tax planning to day-to-day management decisions.",
      "The most resilient teams simplify ownership, document review points, and make exceptions visible early in the cycle.",
      "That clarity gives leaders better numbers, sooner, and with less internal rework.",
    ],
  },
  {
    slug: "fractional-cfo-support-for-growth-stage-companies",
    title: "When Fractional CFO Support Makes Sense",
    excerpt:
      "Growth-stage companies often need senior finance thinking before they need a full-time executive hire.",
    category: "Advisory",
    publishedAt: "2026-04-25",
    body: [
      "Fractional finance leadership can help shape planning, cash visibility, and reporting discipline at a stage where hiring permanently may still be premature.",
      "The key is making that support operational rather than purely strategic.",
      "Good engagements leave behind systems, habits, and clearer ownership inside the internal team.",
    ],
  },
];

export const siteConfig = {
  name: "Softech Financials & Associates",
  shortName: "Softech Financials",
  description:
    "Certified bookkeepers and tax advisors in Islamabad, helping businesses strengthen accounting, tax planning, and finance operations.",
  url: "https://www.softechfinancials.com",
  ogImage: "https://www.softechfinancials.com/og-image.jpg",
  keywords: [
    "accounting firm",
    "tax advisory",
    "bookkeeping Islamabad",
    "finance consultancy",
    "corporate finance Pakistan",
  ],
  company: {
    legalName: "Softech Financials & Associates",
    email: "afzalkhancma1997@gmail.com",
    phone: "+92 344 1561173",
    country: "PK",
  },
  location: {
    address: "G8 4 Street 32 Islamabad",
    phone: "+92 344 1561173",
    email: "afzalkhancma1997@gmail.com",
    servicesArea: ["Islamabad", "Rawalpindi", "Pakistan"],
  },
  social: {
    linkedin: "https://linkedin.com/company/softech-financials",
  },
  businessHours: [{ day: "Monday - Friday", hours: "8:30 AM - 6:00 PM" }],
  blogPosts,
} as const;
