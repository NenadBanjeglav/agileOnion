export const siteConfig = {
  name: "Agile Onion",
  description:
    "Agile Onion je blog za sve koji žele da uče, rastu i napreduju sloj po sloj — uz prijateljski ton, praktične savete i agilni mindset.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://agile-onion.vercel.app",
  links: {
    github: "",
    contact: "",
  },
};

export type SiteConfig = typeof siteConfig;
