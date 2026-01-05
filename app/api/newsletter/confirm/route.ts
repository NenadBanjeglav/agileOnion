import { NextResponse } from 'next/server'
import { NewsletterWelcome } from '@/emails/NewsletterWelcome'
import { siteConfig } from '@/lib/config/site'
import { sendEmail } from '@/lib/email/resend'
import { sanityAdminClient } from '@/lib/sanity/adminClient'

export const runtime = 'nodejs'

const successRedirect = () =>
  NextResponse.redirect(new URL('/?newsletter=confirmed', siteConfig.url))
const errorRedirect = (reason: string) =>
  NextResponse.redirect(
    new URL(`/?newsletter=${encodeURIComponent(reason)}`, siteConfig.url),
  )

const LATEST_POST_QUERY = `*[
  _type == "post" &&
  defined(slug.current)
] | order(coalesce(publishedAt, _createdAt) desc)[0]{
  title,
  "slug": slug.current
}`

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')
  if (!token) {
    return errorRedirect('invalid')
  }

  const subscriber = await sanityAdminClient.fetch<
    {
      _id: string
      email: string
      status?: string
      confirmationExpiresAt?: string
      introEmailSentAt?: string
    } | null,
    { confirmationToken: string }
  >(
    `*[_type == "newsletterSubscriber" && confirmationToken == $confirmationToken][0]{
      _id,
      email,
      status,
      confirmationExpiresAt,
      introEmailSentAt
    }`,
    { confirmationToken: token },
  )

  if (!subscriber) {
    return errorRedirect('invalid')
  }

  if (
    subscriber.confirmationExpiresAt &&
    new Date(subscriber.confirmationExpiresAt).getTime() <= Date.now()
  ) {
    return errorRedirect('expired')
  }

  const nowIso = new Date().toISOString()

  await sanityAdminClient
    .patch(subscriber._id)
    .set({
      status: 'subscribed',
      confirmedAt: nowIso,
    })
    .unset(['confirmationToken', 'confirmationExpiresAt'])
    .commit({ autoGenerateArrayKeys: true })

  if (!subscriber.introEmailSentAt) {
    const latestPost = await sanityAdminClient.fetch<{
      title?: string
      slug?: string
    } | null>(LATEST_POST_QUERY)
    const latestPostUrl = latestPost?.slug
      ? `${siteConfig.url}/blog/${latestPost.slug}`
      : `${siteConfig.url}/blog`

    const { data, error } = await sendEmail({
      to: subscriber.email,
      subject: 'Dobrodošao/la u Agile Onion',
      react: NewsletterWelcome({
        latestPostUrl,
        latestPostTitle: latestPost?.title,
      }),
      replyTo: 'agileonion.blog@gmail.com',
    })

    if (!error) {
      await sanityAdminClient
        .patch(subscriber._id)
        .set({
          introEmailSentAt: nowIso,
          welcomeMessageId: data?.id,
        })
        .commit({ autoGenerateArrayKeys: true })
    }
  }

  return successRedirect()
}
