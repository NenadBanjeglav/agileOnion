import {sanityClient} from '@/lib/sanity/client'
import type {LatestBlogsPost} from './LatestBlogsClient'
import {LatestBlogsClient} from './LatestBlogsClient'

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

const POSTS_QUERY = `*[
  _type == "post" &&
  defined(slug.current)
] | order(coalesce(publishedAt, _createdAt) desc)[0...6] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  category,
  "coverImage": coverImage.asset->url
}`

const CATEGORY_LABELS: Record<string, string> = {
  'mindset-lab': 'Mindset Lab',
  'agile-club': 'Agile Club',
  'scrum-office': 'Scrum Office',
  'very-agile-personas': 'Very Agile Personas',
}

const FALLBACK_IMAGE = '/media/trail/trail-notes.webp'

type SanityPost = {
  _id: string
  title: string
  slug: string
  excerpt?: string
  category?: string
  coverImage?: string
}

export async function LatestBlogs() {
  const posts = await withTimeout(
    sanityClient.fetch<SanityPost[]>(POSTS_QUERY),
  )
  const items: LatestBlogsPost[] = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt ?? '',
    image: post.coverImage ?? FALLBACK_IMAGE,
    categoryLabel: CATEGORY_LABELS[post.category ?? ''] ?? 'Blog',
  }))

  return <LatestBlogsClient posts={items} />
}
