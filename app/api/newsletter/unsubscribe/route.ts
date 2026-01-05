import {NextResponse} from 'next/server'
import {siteConfig} from '@/lib/config/site'
import {sanityAdminClient} from '@/lib/sanity/adminClient'

export const runtime = 'nodejs'

const successRedirect = () =>
  NextResponse.redirect(new URL('/?newsletter=unsubscribed', siteConfig.url))
const errorRedirect = (reason: string) =>
  NextResponse.redirect(
    new URL(`/?newsletter=${encodeURIComponent(reason)}`, siteConfig.url),
  )

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url)
  const token = searchParams.get('token')
  if (!token) {
    return errorRedirect('invalid')
  }

  const subscriber = await sanityAdminClient.fetch<
    {
      _id: string
    } | null,
    {unsubscribeToken: string}
  >(
    `*[_type == "newsletterSubscriber" && unsubscribeToken == $unsubscribeToken][0]{
      _id
    }`,
    {unsubscribeToken: token},
  )

  if (!subscriber) {
    return errorRedirect('invalid')
  }

  const nowIso = new Date().toISOString()
  await sanityAdminClient
    .patch(subscriber._id)
    .set({
      status: 'unsubscribed',
      unsubscribedAt: nowIso,
    })
    .commit({autoGenerateArrayKeys: true})

  return successRedirect()
}
