import Link from 'next/link'
import { notFound } from 'next/navigation'

import { AppShell } from '@/components/layout/AppShell'
import { Container } from '@/components/layout/Container'
import { sanityClient } from '@/lib/sanity/client'
import { siteConfig } from '@/lib/config/site'
import { formatDate } from '@/lib/utils/date'
import { InfinitePostGrid } from '../../_components/InfinitePostGrid'
import {
  CATEGORY_CARDS,
  CATEGORY_LABELS,
  CATEGORY_LOOKUP,
} from '../../_components/categoryData'
import type { PostCard } from '../../_components/types'
import { NewsletterShuffle } from '@/app/(public)/_components/NewsletterShuffle'
import { AboutMe } from '@/app/(public)/_components/AboutMe'
import { Footer } from '@/components/layout/Footer'
import { JsonLd } from '@/components/seo/JsonLd'

export const revalidate = 3600

const FEED_PAGE_SIZE = 9

const POSTS_QUERY = `*[
  _type == "post" &&
  category == $slug &&
  defined(slug.current)
] | order(coalesce(publishedAt, _createdAt) desc)[0...${FEED_PAGE_SIZE}] {
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

type CategoryPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = CATEGORY_LOOKUP.get(slug)
  if (!category) return {}

  const title = `${category.title} | ${siteConfig.name}`
  const description = category.description?.trim() || siteConfig.description
  const url = `${siteConfig.url}/blog/category/${slug}`

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

export function generateStaticParams() {
  return CATEGORY_CARDS.map((category) => ({ slug: category.slug }))
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = CATEGORY_LOOKUP.get(slug)
  if (!category) {
    notFound()
  }

  const posts = await sanityClient.fetch<SanityPost[]>(POSTS_QUERY, {
    slug,
  })
  const mappedPosts = posts.map(mapPost)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.title,
    description: category.description,
    url: `${siteConfig.url}/blog/category/${slug}`,
  }

  return (
    <AppShell padded={false}>
      <JsonLd data={jsonLd} />
      <Container>
        <div className="flex flex-col gap-12">
          <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-6 py-10 shadow-[0_26px_70px_-40px_rgba(0,0,0,0.9)] sm:px-10 sm:py-12">
            <div
              className="pointer-events-none absolute inset-0 opacity-55"
              style={{
                backgroundImage: `url(${category.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-60"
              aria-hidden
            >
              <div className="absolute top-8 -left-20 h-56 w-56 rounded-full bg-emerald-400/25 blur-[120px]" />
              <div className="absolute -right-20 bottom-6 h-56 w-56 rounded-full bg-cyan-400/15 blur-[120px]" />
            </div>
            <div
              className="pointer-events-none absolute inset-0 bg-neutral-950/40"
              aria-hidden
            />

            <div className="relative z-10 space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold tracking-[0.14em] text-emerald-200 uppercase">
                <span className="rounded-full border border-emerald-200/40 bg-emerald-400/10 px-3 py-1">
                  Kategorija
                </span>
                <Link
                  href="/blog"
                  className="text-emerald-100/80 transition hover:text-emerald-50"
                >
                  Nazad na blog
                </Link>
              </div>
              <h1 className="text-3xl leading-tight font-semibold text-white sm:text-4xl md:text-5xl">
                {category.title}
              </h1>
              <p className="max-w-3xl text-base leading-relaxed text-zinc-200 sm:text-lg">
                {category.description}
              </p>
            </div>
          </section>

          <InfinitePostGrid
            initialPosts={mappedPosts}
            startFrom={mappedPosts.length}
            pageSize={FEED_PAGE_SIZE}
            fetchUrl={`/api/blog/category/posts?slug=${slug}`}
            title={`Pri?e iz ${category.title}`}
            subtitle="Sve objave iz ove kategorije, uredno poslo_ene za ?itanje."
          />
        </div>
      </Container>
      <NewsletterShuffle />
      <AboutMe />
      <Footer />
    </AppShell>
  )
}


