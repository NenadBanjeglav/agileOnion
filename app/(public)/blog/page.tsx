import { AppShell } from '@/components/layout/AppShell'
import { Container } from '@/components/layout/Container'
import { sanityClient } from '@/lib/sanity/client'
import { siteConfig } from '@/lib/config/site'
import { formatDate } from '@/lib/utils/date'
import { BlogHero } from './_components/BlogHero'
import { CategoryGrid } from './_components/CategoryGrid'
import { FeaturedPosts } from './_components/FeaturedPosts'

import { CATEGORY_CARDS, CATEGORY_LABELS } from './_components/categoryData'
import type { PostCard } from './_components/types'
import { NewsletterShuffle } from '../_components/NewsletterShuffle'
import { AboutMe } from '../_components/AboutMe'
import { Footer } from '@/components/layout/Footer'
import { ParallaxLogos } from '../_components/ParallaxLogos'
import { JsonLd } from '@/components/seo/JsonLd'
import { InfinitePostGrid } from './_components/InfinitePostGrid'

export const revalidate = 3600

const FEATURED_COUNT = 4
const FEED_PAGE_SIZE = 9
const INITIAL_POST_LIMIT = FEATURED_COUNT + FEED_PAGE_SIZE

const POSTS_QUERY = `*[
  _type == "post" &&
  defined(slug.current)
] | order(coalesce(publishedAt, _createdAt) desc)[0...${INITIAL_POST_LIMIT}] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  category,
  publishedAt,
  _createdAt,
  "coverImage": coverImage.asset->url
}`

const FALLBACK_IMAGE = '/media/trail/trail-notes.webp'

type SanityPost = {
  _id: string
  title: string
  slug: string
  excerpt?: string
  category?: string
  publishedAt?: string
  _createdAt?: string
  coverImage?: string
}

const mapPost = (post: SanityPost): PostCard => ({
  id: post._id,
  title: post.title,
  slug: post.slug,
  excerpt: post.excerpt ?? 'Novi tekst na blogu.',
  categoryLabel: CATEGORY_LABELS[post.category ?? ''] ?? 'Blog',
  image: post.coverImage ?? FALLBACK_IMAGE,
  date: formatDate(post.publishedAt ?? post._createdAt),
})

export const generateMetadata = () => {
  const title = `Blog | ${siteConfig.name}`
  const description = siteConfig.description
  const url = `${siteConfig.url}/blog`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
    },
    twitter: {
      title,
      description,
      card: 'summary',
    },
  }
}

export default async function BlogPage() {
  const posts = await sanityClient.fetch<SanityPost[]>(POSTS_QUERY)
  const mappedPosts = posts.map(mapPost)
  const heroPost = mappedPosts[0]
  const sidePosts = mappedPosts.slice(1, FEATURED_COUNT)
  const feedPosts = mappedPosts.slice(FEATURED_COUNT)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: siteConfig.name,
    description: siteConfig.description,
    url: `${siteConfig.url}/blog`,
  }

  return (
    <AppShell padded={false}>
      <JsonLd data={jsonLd} />
      <ParallaxLogos />
      <Container>
        <BlogHero />
        <FeaturedPosts heroPost={heroPost} sidePosts={sidePosts} />
        <CategoryGrid categories={CATEGORY_CARDS} />
        <InfinitePostGrid
          initialPosts={feedPosts}
          startFrom={FEATURED_COUNT + feedPosts.length}
          pageSize={FEED_PAGE_SIZE}
        />
      </Container>
      <NewsletterShuffle />
      <AboutMe />
      <Footer />
    </AppShell>
  )
}
