import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { cache } from 'react'

import {
  PortableText,
  toPlainText,
  type PortableTextComponents,
} from '@portabletext/react'

import { AppShell } from '@/components/layout/AppShell'
import { Container } from '@/components/layout/Container'
import { siteConfig } from '@/lib/config/site'
import { sanityClient } from '@/lib/sanity/client'
import { urlFor } from '@/lib/sanity/image'
import { formatDate } from '@/lib/utils/date'
import { CATEGORY_LABELS } from '../_components/categoryData'
import { NewsletterShuffle } from '../../_components/NewsletterShuffle'
import { Footer } from '@/components/layout/Footer'
import { ParallaxLogos } from '../../_components/ParallaxLogos'
import { JsonLd } from '@/components/seo/JsonLd'

export const revalidate = 3600

const SANITY_TIMEOUT_MS = 8000

const withTimeout = async <T,>(promise: Promise<T>) => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined
  const timeout = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error('Sanity request timed out'))
    }, SANITY_TIMEOUT_MS)
  })

  try {
    return (await Promise.race([promise, timeout])) as T
  } finally {
    if (timeoutId) clearTimeout(timeoutId)
  }
}

const POST_QUERY = `*[
  _type == "post" &&
  slug.current == $slug
][0]{
  _id,
  title,
  excerpt,
  "slug": slug.current,
  category,
  publishedAt,
  _createdAt,
  body,
  coverImage,
  author->{name, image}
}`

const RELATED_QUERY = `*[
  _type == "post" &&
  slug.current != $slug &&
  category == $category &&
  defined(slug.current)
] | order(coalesce(publishedAt, _createdAt) desc)[0...3]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  category,
  publishedAt,
  _createdAt,
  coverImage
}`

const SLUGS_QUERY = `*[
  _type == "post" &&
  defined(slug.current)
]{ "slug": slug.current }`

type Author = {
  name?: string
  image?: unknown
}

type Post = {
  _id: string
  title: string
  excerpt?: string
  slug: string
  category?: string
  publishedAt?: string
  _createdAt?: string
  body?: PortableTextValue
  coverImage?: unknown
  author?: Author
}

type PortableTextValue = Parameters<typeof toPlainText>[0]

const hasPortableText = (
  value: PortableTextValue | undefined,
): value is PortableTextValue => Array.isArray(value) && value.length > 0

const getPost = cache(async (slug: string) =>
  withTimeout(sanityClient.fetch<Post | null>(POST_QUERY, { slug })),
)

const getRelatedPosts = cache(async (slug: string, category?: string) => {
  if (!category) return []
  return withTimeout(
    sanityClient.fetch<Post[]>(RELATED_QUERY, { slug, category }),
  )
})

const getReadingTime = (value?: PortableTextValue) => {
  if (!hasPortableText(value)) return null
  const plain = toPlainText(value)
  const words = plain.trim().split(/\s+/).length
  if (!words) return null
  return Math.max(1, Math.ceil(words / 200))
}

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const imageUrl = urlFor(value).width(1200).auto('format').url()
      if (!imageUrl) return null
      return (
        <figure className="my-8 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
          <Image
            src={imageUrl}
            alt="Ilustracija u članku"
            width={1200}
            height={700}
            className="h-auto w-full object-cover"
          />
        </figure>
      )
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="mt-10 scroll-mt-28 text-2xl font-semibold text-white sm:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 scroll-mt-28 text-xl font-semibold text-white sm:text-2xl">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-2 border-emerald-300/60 bg-white/5 px-6 py-5 text-lg text-emerald-100">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="text-base leading-relaxed text-zinc-200 sm:text-lg">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="ml-5 list-disc space-y-2 text-base text-zinc-200 sm:text-lg">
        {children}
      </ul>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
  },
  marks: {
    link: ({ value, children }) => {
      const href = value?.href as string | undefined
      const blank = value?.blank
      const rel = blank ? 'noreferrer noopener' : undefined
      return (
        <a
          href={href}
          target={blank ? '_blank' : undefined}
          rel={rel}
          className="font-semibold text-emerald-200 underline underline-offset-4 transition hover:text-emerald-100"
        >
          {children}
        </a>
      )
    },
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}
  const description =
    post.excerpt?.trim() ||
    (hasPortableText(post.body)
      ? toPlainText(post.body).slice(0, 160)
      : siteConfig.description)
  const imageUrl = post.coverImage
    ? urlFor(post.coverImage).width(1200).auto('format').url()
    : undefined
  const url = `${siteConfig.url}/blog/${post.slug}`

  return {
    title: `${post.title} | ${siteConfig.name}`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      url,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    },
    twitter: {
      card: imageUrl ? 'summary_large_image' : 'summary',
      title: post.title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  }
}

export async function generateStaticParams() {
  const slugs = await withTimeout(
    sanityClient.fetch<{ slug: string }[]>(SLUGS_QUERY),
  )
  return slugs.map(({ slug }) => ({ slug }))
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const publishedDate = formatDate(post.publishedAt ?? post._createdAt)
  const readingTime = getReadingTime(post.body)
  const categoryLabel = CATEGORY_LABELS[post.category ?? ''] ?? 'Blog'
  const categorySlug = post.category ?? null
  const coverImageUrl = post.coverImage
    ? urlFor(post.coverImage).width(1600).auto('format').url()
    : null
  const authorName = post.author?.name ?? 'Agile Onion'
  const authorImageUrl = post.author?.image
    ? urlFor(post.author.image).width(120).height(120).auto('format').url()
    : null

  const relatedPosts = await getRelatedPosts(post.slug, post.category)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt ?? undefined,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    datePublished: post.publishedAt ?? post._createdAt,
    dateModified: post.publishedAt ?? post._createdAt,
    image: coverImageUrl ? [coverImageUrl] : undefined,
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  }

  return (
    <AppShell padded={false}>
      <ParallaxLogos />
      <Container>
        <article className="mx-auto flex w-full max-w-5xl flex-col gap-10">
          <header className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold tracking-[0.14em] text-emerald-200 uppercase">
              {categorySlug ? (
                <Link
                  href={`/blog/category/${categorySlug}`}
                  className="rounded-full border border-emerald-200/40 bg-emerald-400/10 px-3 py-1 text-emerald-100 transition hover:border-emerald-100"
                >
                  {categoryLabel}
                </Link>
              ) : (
                <span className="rounded-full border border-emerald-200/40 bg-emerald-400/10 px-3 py-1 text-emerald-100">
                  {categoryLabel}
                </span>
              )}
              {publishedDate && (
                <span className="text-emerald-100/70">{publishedDate}</span>
              )}
              {readingTime && (
                <span className="text-emerald-100/70">
                  {readingTime} min čitanja
                </span>
              )}
            </div>
            <h1 className="text-3xl leading-tight font-semibold text-white sm:text-4xl md:text-5xl">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="max-w-3xl text-base leading-relaxed text-zinc-200 sm:text-lg">
                {post.excerpt}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-300">
              {authorImageUrl && (
                <Image
                  src={authorImageUrl}
                  alt={authorName}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full border border-white/10 object-cover"
                />
              )}
              <div className="flex flex-col">
                <span className="text-xs tracking-[0.18em] text-emerald-200 uppercase">
                  Autor
                </span>
                <span className="text-base font-semibold text-white">
                  {authorName}
                </span>
              </div>
            </div>
          </header>

          {coverImageUrl && (
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_24px_70px_-40px_rgba(0,0,0,0.9)]">
              <Image
                src={coverImageUrl}
                alt={`Naslovna slika za ${post.title}`}
                width={1600}
                height={900}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          )}

          <section className="flex flex-col gap-6">
            {hasPortableText(post.body) ? (
              <div className="prose prose-invert max-w-none">
                <PortableText
                  value={post.body}
                  components={portableTextComponents}
                />
              </div>
            ) : (
              <p className="text-base text-zinc-200">
                Ovaj tekst će uskoro biti ažuriran.
              </p>
            )}
          </section>

          <section className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 text-white sm:p-8">
            <h2 className="text-xl font-semibold sm:text-2xl">Nastavi dalje</h2>
            <p className="text-base text-zinc-200">
              Ako želiš još praktičnih uvida, pogledaj ostale priče iz iste
              kategorije.
            </p>
            <div className="flex flex-wrap gap-3">
              {categorySlug && (
                <Link
                  href={`/blog/category/${categorySlug}`}
                  className="rounded-full border border-emerald-200/40 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:border-emerald-100"
                >
                  Pogledaj sve iz {categoryLabel}
                </Link>
              )}
              <Link
                href="/blog"
                className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:border-emerald-200/60 hover:text-emerald-100"
              >
                Nazad na blog
              </Link>
            </div>
          </section>

          <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">
              Srodne priče
            </h2>
            {relatedPosts.length ? (
              <div className="grid gap-6 md:grid-cols-3">
                {relatedPosts.map((item) => {
                  const itemImage = item.coverImage
                    ? urlFor(item.coverImage).width(600).auto('format').url()
                    : null

                  const itemDate = formatDate(
                    item.publishedAt ?? item._createdAt,
                  )

                  return (
                    <Link
                      key={item._id}
                      href={`/blog/${item.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/60 shadow-[0_24px_70px_-40px_rgba(0,0,0,0.9)] ring-1 ring-white/5 transition duration-200 hover:border-emerald-200/50"
                    >
                      {itemImage && (
                        <div className="relative h-36 overflow-hidden">
                          <Image
                            src={itemImage}
                            alt={`Ilustracija za ${item.title}`}
                            fill
                            sizes="(min-width: 1024px) 320px, 80vw"
                            className="object-cover transition duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/20 to-black/70" />
                        </div>
                      )}

                      <div className="flex flex-1 flex-col gap-3 p-5">
                        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-[0.14em] text-emerald-200 uppercase">
                          <span className="rounded-full border border-emerald-200/40 bg-emerald-400/10 px-3 py-1">
                            {CATEGORY_LABELS[item.category ?? ''] ?? 'Blog'}
                          </span>
                          {itemDate && <span>{itemDate}</span>}
                        </div>

                        <h3 className="text-lg font-semibold text-white">
                          {item.title}
                        </h3>

                        <p className="text-sm text-zinc-200">
                          {item.excerpt ?? 'Nova priča sa Agile Onion bloga.'}
                        </p>

                        <span className="mt-auto text-sm font-semibold text-emerald-200">
                          Pročitaj →
                        </span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            ) : (
              <p className="text-base text-zinc-200">
                Još nema srodnih priča u ovoj kategoriji.
              </p>
            )}
          </section>
        </article>
      </Container>
      <NewsletterShuffle hideShuffleCards />

      <Footer />

      <JsonLd data={jsonLd} />
    </AppShell>
  )
}
