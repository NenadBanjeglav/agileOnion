import type { MetadataRoute } from "next";

import { CATEGORY_CARDS } from "@/app/(public)/blog/_components/categoryData";
import { sanityClient } from "@/lib/sanity/client";

const POSTS_QUERY = `*[
  _type == "post" &&
  defined(slug.current)
]{
  "slug": slug.current,
  publishedAt,
  _createdAt
}`;

type PostEntry = {
  slug: string;
  publishedAt?: string;
  _createdAt?: string;
};

const toLastModified = (value?: string) => (value ? new Date(value) : new Date());

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://agileonion.rs";
  const posts = await sanityClient.fetch<PostEntry[]>(POSTS_QUERY);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: new Date() },
    { url: `${baseUrl}/blog`, lastModified: new Date() },
    ...CATEGORY_CARDS.map((category) => ({
      url: `${baseUrl}/blog/category/${category.slug}`,
      lastModified: new Date(),
    })),
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: toLastModified(post.publishedAt ?? post._createdAt),
  }));

  return [...staticRoutes, ...postRoutes];
}
