import { NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanity/client'

type SearchResult = {
  _id: string
  title: string
  slug: string
  category?: string
  coverImage?: string
}

const SEARCH_QUERY = `*[
  _type == "post" &&
  defined(slug.current) &&
  ($category == "" || category == $category) &&
  ($searchQuery == "" || title match $searchQuery)
] | order(coalesce(publishedAt, _createdAt) desc)[0...10] {
  _id,
  title,
  "slug": slug.current,
  category,
  "coverImage": coverImage.asset->url
}`

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const rawQuery = searchParams.get('q') ?? ''
  const category = searchParams.get('category') ?? ''
  const searchQuery = rawQuery.trim() ? `${rawQuery.trim()}*` : ''

  const results = await sanityClient.fetch<SearchResult[]>(SEARCH_QUERY, {
    searchQuery,
    category,
  })

  return NextResponse.json({
    results: results.map((item) => ({
      id: item._id,
      title: item.title,
      slug: item.slug,
      category: item.category,
      coverImage: item.coverImage,
    })),
  })
}
