export type Service = {
  slug: string;
  name: string;
  summary: string;
  description: string;
  audience: string;
  outcomes: string[];
  updatedAt: string;
};

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  longBio: string;
  specialties: string[];
  image?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
  };
  updatedAt: string;
};

export type Testimonial = {
  name: string;
  title: string;
  quote: string;
};

export type NavItem = {
  label: string;
  href: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  body: string[];
};

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  keywords: string[];
  company: {
    legalName: string;
    email: string;
    phone: string;
    country: string;
  };
  blogPosts: BlogPost[];
};
