import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/config/site'
import { sanityClient } from '@/lib/sanity/client'
import { CATEGORY_CARDS } from '@/app/(public)/blog/_components/categoryData'

const POSTS_QUERY = `*[
  _type == "post" &&
  defined(slug.current)
]{
  "slug": slug.current,
  publishedAt,
  _updatedAt
}`

type PostEntry = {
  slug: string
  publishedAt?: string
  _updatedAt?: string
}

const toIsoDate = (value?: string) => value ?? new Date().toISOString()

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await sanityClient.fetch<PostEntry[]>(POSTS_QUERY)

  const baseEntries: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  const categoryEntries: MetadataRoute.Sitemap = CATEGORY_CARDS.map(
    (category) => ({
      url: `${siteConfig.url}/blog/category/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    }),
  )

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: toIsoDate(post._updatedAt ?? post.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...baseEntries, ...categoryEntries, ...postEntries]
}
