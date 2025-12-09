export const siteConfig = {
  name: "Agile Onion",
  description: "Agile project workspace scaffolded with Next.js 16 and React 19.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  links: {
    github: "",
    contact: "",
  },
};

export type SiteConfig = typeof siteConfig;
