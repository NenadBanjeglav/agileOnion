import {NextResponse} from 'next/server'
import {NewsletterPost} from '@/emails/NewsletterPost'
import {siteConfig} from '@/lib/config/site'
import {sendEmail} from '@/lib/email/resend'
import {createToken} from '@/lib/newsletter/tokens'
import {sanityAdminClient} from '@/lib/sanity/adminClient'

export const runtime = 'nodejs'

const BATCH_SIZE = 50

const CAMPAIGN_QUERY = `*[
  _type == "newsletterCampaign" &&
  status in ["pending", "sending"]
] | order(_createdAt asc)[0]{
  _id,
  status,
  postTitle,
  postSlug,
  postExcerpt,
  postImageUrl,
  customMessage,
  nextOffset,
  sentCount,
  totalRecipients
}`

const SUBSCRIBERS_QUERY = `*[
  _type == "newsletterSubscriber" &&
  status == "subscribed" &&
  defined(email)
] | order(_createdAt asc)[$offset...$end]{
  _id,
  email,
  unsubscribeToken
}`

export async function POST(request: Request) {
  const secret = process.env.NEWSLETTER_WEBHOOK_SECRET
  const headerSecret = request.headers.get('x-webhook-secret')
  if (!secret || headerSecret !== secret) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401})
  }

  const campaign = await sanityAdminClient.fetch<
    {
      _id: string
      status?: string
      postTitle?: string
      postSlug?: string
  postExcerpt?: string
  postImageUrl?: string
  customMessage?: string
  nextOffset?: number
  sentCount?: number
  totalRecipients?: number
} | null
>(CAMPAIGN_QUERY)

  if (!campaign) {
    return NextResponse.json({ok: true, idle: true})
  }

  if (!campaign.postSlug) {
    await sanityAdminClient
      .patch(campaign._id)
      .set({status: 'error', lastError: 'Missing post slug'})
      .commit({autoGenerateArrayKeys: true})
    return NextResponse.json({error: 'Campaign missing post slug'}, {status: 500})
  }

  const nowIso = new Date().toISOString()
  const startOffset = campaign.nextOffset ?? 0
  if (campaign.status === 'pending') {
    await sanityAdminClient
      .patch(campaign._id)
      .set({
        status: 'sending',
        startedAt: nowIso,
        nextOffset: startOffset,
      })
      .commit({autoGenerateArrayKeys: true})
  }

  const totalRecipients =
    campaign.totalRecipients ??
    (await sanityAdminClient.fetch<number>(
      `count(*[_type == "newsletterSubscriber" && status == "subscribed" && defined(email)])`,
    ))

  const end = startOffset + BATCH_SIZE
  const subscribers = await sanityAdminClient.fetch<
    {
      _id: string
      email: string
      unsubscribeToken?: string
    }[],
    {offset: number; end: number}
  >(SUBSCRIBERS_QUERY, {offset: startOffset, end})

  if (!subscribers.length) {
    await sanityAdminClient
      .patch(campaign._id)
      .set({
        status: 'completed',
        completedAt: nowIso,
        lastRunAt: nowIso,
        totalRecipients,
      })
      .commit({autoGenerateArrayKeys: true})
    return NextResponse.json({ok: true, completed: true})
  }

  const postUrl = `${siteConfig.url}/blog/${campaign.postSlug}`
  const logoUrl = `${siteConfig.url}/media/brand/og-image.png`
  let sentCount = campaign.sentCount ?? 0
  let lastError: string | undefined

  for (const subscriber of subscribers) {
    const unsubscribeToken =
      subscriber.unsubscribeToken ?? createToken()

    if (!subscriber.unsubscribeToken) {
      await sanityAdminClient
        .patch(subscriber._id)
        .set({unsubscribeToken})
        .commit({autoGenerateArrayKeys: true})
    }

    const unsubscribeUrl = `${siteConfig.url}/api/newsletter/unsubscribe?token=${unsubscribeToken}`

    const {error} = await sendEmail({
      to: subscriber.email,
      subject: campaign.postTitle
        ? `Novi tekst: ${campaign.postTitle}`
        : 'Novi tekst na Agile Onion',
      react: NewsletterPost({
        postTitle: campaign.postTitle ?? 'Novi tekst na blogu',
        postUrl,
      postExcerpt: campaign.postExcerpt ?? undefined,
      postImageUrl: campaign.postImageUrl ?? undefined,
      logoUrl,
      unsubscribeUrl,
      customMessage: campaign.customMessage ?? undefined,
    }),
      replyTo: 'agileonion.blog@gmail.com',
    })

    if (error) {
      lastError = error.message ?? 'Email delivery failed'
      continue
    }

    sentCount += 1
  }

  const isComplete = subscribers.length < BATCH_SIZE
  await sanityAdminClient
    .patch(campaign._id)
    .set({
      sentCount,
      nextOffset: startOffset + subscribers.length,
      lastRunAt: nowIso,
      totalRecipients,
      ...(lastError ? {lastError} : {}),
      ...(isComplete ? {status: 'completed', completedAt: nowIso} : {}),
    })
    .commit({autoGenerateArrayKeys: true})

  return NextResponse.json({
    ok: true,
    sent: sentCount,
    nextOffset: isComplete ? null : startOffset + subscribers.length,
  })
}
