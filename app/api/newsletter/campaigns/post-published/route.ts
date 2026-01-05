import {NextResponse} from 'next/server'
import {sanityAdminClient} from '@/lib/sanity/adminClient'

export const runtime = 'nodejs'

type WebhookPayload = {
  _id?: string
  documentId?: string
  postId?: string
}

const POST_QUERY = `*[_id == $postId][0]{
  _id,
  title,
  excerpt,
  "slug": slug.current,
  "coverImageUrl": coverImage.asset->url
}`

export async function POST(request: Request) {
  const secret = process.env.NEWSLETTER_WEBHOOK_SECRET
  const headerSecret = request.headers.get('x-webhook-secret')
  if (!secret || headerSecret !== secret) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401})
  }

  let payload: WebhookPayload | null = null
  try {
    payload = (await request.json()) as WebhookPayload
  } catch {
    return NextResponse.json({error: 'Invalid JSON'}, {status: 400})
  }

  const postId = payload?.documentId ?? payload?._id ?? payload?.postId
  if (!postId) {
    return NextResponse.json({error: 'Missing post id'}, {status: 400})
  }

  const post = await sanityAdminClient.fetch<
    {
      _id: string
      title?: string
      excerpt?: string
      slug?: string
      coverImageUrl?: string
    } | null,
    {postId: string}
  >(POST_QUERY, {postId})

  if (!post?.slug) {
    return NextResponse.json({ok: true, skipped: true})
  }

  const existingCampaign = await sanityAdminClient.fetch<
    {_id: string; status?: string} | null,
    {postId: string}
  >(
    `*[_type == "newsletterCampaign" && postId == $postId][0]{_id, status}`,
    {postId},
  )

  if (existingCampaign) {
    return NextResponse.json({ok: true, alreadyQueued: true})
  }

  await sanityAdminClient.create({
    _type: 'newsletterCampaign',
    postId: post._id,
    postTitle: post.title,
    postSlug: post.slug,
    postExcerpt: post.excerpt,
    postImageUrl: post.coverImageUrl,
    status: 'pending',
  })

  return NextResponse.json({ok: true})
}
