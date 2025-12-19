import { AppShell } from '@/components/layout/AppShell'
import { Container } from '@/components/layout/Container'
import { sanityClient } from '@/lib/sanity/client'
import { formatDate } from '@/lib/utils/date'
import { BlogHero } from './_components/BlogHero'
import { CategoryGrid } from './_components/CategoryGrid'
import { FeaturedPosts } from './_components/FeaturedPosts'
import { PostGrid } from './_components/PostGrid'
import { CATEGORY_CARDS, CATEGORY_LABELS } from './_components/categoryData'
import type { PostCard } from './_components/types'
import { NewsletterShuffle } from '../_components/NewsletterShuffle'
import { AboutMe } from '../_components/AboutMe'
import { Footer } from '@/components/layout/Footer'
import { ParallaxLogos } from '../_components/ParallaxLogos'

export const revalidate = 60

const POSTS_QUERY = `*[
  _type == "post" &&
  defined(slug.current)
] | order(coalesce(publishedAt, _createdAt) desc)[0...24] {
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

export default async function BlogPage() {
  const posts = await sanityClient.fetch<SanityPost[]>(POSTS_QUERY)
  const mappedPosts = posts.map(mapPost)
  const heroPost = mappedPosts[0]
  const sidePosts = mappedPosts.slice(1, 4)
  const feedPosts = mappedPosts.slice(4)

  return (
    <AppShell padded={false}>
      <ParallaxLogos />
      <Container>
        <BlogHero />
        <FeaturedPosts heroPost={heroPost} sidePosts={sidePosts} />
        <CategoryGrid categories={CATEGORY_CARDS} />
        <PostGrid posts={feedPosts} />
      </Container>
      <NewsletterShuffle />
      <AboutMe />
      <Footer />
    </AppShell>
  )
}
