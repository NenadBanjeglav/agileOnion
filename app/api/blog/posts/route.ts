import { NextResponse } from 'next/server'

import { sanityClient } from '@/lib/sanity/client'
import { formatDate } from '@/lib/utils/date'
import { CATEGORY_LABELS } from '@/app/(public)/blog/_components/categoryData'
import type { PostCard } from '@/app/(public)/blog/_components/types'

const POSTS_QUERY = `*[
  _type == "post" &&
  defined(slug.current)
] | order(coalesce(publishedAt, _createdAt) desc)[$start...$end] {
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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const start = Number(searchParams.get('start') ?? '0')
  const limit = Number(searchParams.get('limit') ?? '9')
  const safeStart = Number.isFinite(start) && start >= 0 ? start : 0
  const safeLimit = Number.isFinite(limit) && limit > 0 ? limit : 9
  const end = safeStart + safeLimit

  const posts = await sanityClient.fetch<SanityPost[]>(POSTS_QUERY, {
    start: safeStart,
    end,
  })

  return NextResponse.json(posts.map(mapPost))
}
