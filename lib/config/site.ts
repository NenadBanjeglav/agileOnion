export const siteConfig = {
  name: "Agile Onion",
  description:
    "Agile Onion offers agile coaching, Scrum guidance, and practical mindset tools for personal and professional growth.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://agile-onion.vercel.app",
  links: {
    github: "",
    contact: "",
  },
};

export type SiteConfig = typeof siteConfig;
