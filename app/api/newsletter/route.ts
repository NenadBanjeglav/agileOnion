import crypto from 'crypto'
import {NextResponse} from 'next/server'
import {NewsletterConfirm} from '@/emails/NewsletterConfirm'
import {siteConfig} from '@/lib/config/site'
import {sendEmail} from '@/lib/email/resend'
import {sanityAdminClient} from '@/lib/sanity/adminClient'

export const runtime = 'nodejs'

type NewsletterRequest = {
  email?: string
  source?: string
  company?: string
}

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX = 5
const rateLimitStore = new Map<string, {count: number; resetAt: number}>()
const CONFIRMATION_EXPIRY_MS = 24 * 60 * 60 * 1000

const isValidEmail = (value: string) => {
  if (value.length > 254) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

const normalizeEmail = (value: string) => value.trim().toLowerCase()

const idForEmail = (email: string) =>
  `newsletterSubscriber.${Buffer.from(email).toString('base64url')}`

const createConfirmationToken = () => crypto.randomBytes(32).toString('hex')

const getClientIp = (request: Request) => {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() ?? 'unknown'
  }
  return request.headers.get('x-real-ip') ?? 'unknown'
}

const checkRateLimit = (key: string) => {
  const now = Date.now()
  const existing = rateLimitStore.get(key)
  if (!existing || existing.resetAt <= now) {
    rateLimitStore.set(key, {count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS})
    return true
  }
  if (existing.count >= RATE_LIMIT_MAX) {
    return false
  }
  existing.count += 1
  return true
}

export async function POST(request: Request) {
  const token = process.env.SANITY_API_TOKEN
  if (!token) {
    return NextResponse.json(
      {error: 'Missing SANITY_API_TOKEN'},
      {status: 500},
    )
  }

  let payload: NewsletterRequest
  try {
    payload = (await request.json()) as NewsletterRequest
  } catch {
    return NextResponse.json({error: 'Invalid JSON'}, {status: 400})
  }

  if (payload.company) {
    return NextResponse.json({ok: true})
  }

  const email = normalizeEmail(payload.email ?? '')
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({error: 'Invalid email'}, {status: 400})
  }

  const ip = getClientIp(request)
  if (!checkRateLimit(ip)) {
    return NextResponse.json({error: 'Too many requests'}, {status: 429})
  }

  const existing = await sanityAdminClient.fetch<{
    _id: string
    status?: string
    confirmationToken?: string
    confirmationExpiresAt?: string
  } | null>(
    `*[_type == "newsletterSubscriber" && email == $email][0]{
      _id,
      status,
      confirmationToken,
      confirmationExpiresAt
    }`,
    {email},
  )

  if (existing?.status === 'subscribed') {
    return NextResponse.json({ok: true, alreadySubscribed: true})
  }

  const now = new Date()
  const nowIso = now.toISOString()
  const expiresAtIso = new Date(now.getTime() + CONFIRMATION_EXPIRY_MS)
    .toISOString()
  const hasValidToken =
    existing?.confirmationToken &&
    existing?.confirmationExpiresAt &&
    new Date(existing.confirmationExpiresAt).getTime() > now.getTime()
  const confirmationToken = hasValidToken
    ? existing?.confirmationToken
    : createConfirmationToken()
  const confirmationExpiresAt = hasValidToken
    ? existing?.confirmationExpiresAt
    : expiresAtIso

  let subscriberId = existing?._id
  if (subscriberId) {
    await sanityAdminClient
      .patch(subscriberId)
      .set({
        status: 'pending',
        subscribedAt: nowIso,
        source: payload.source ?? 'newsletter-shuffle',
        ip,
        userAgent: request.headers.get('user-agent') ?? undefined,
        confirmationToken,
        confirmationSentAt: nowIso,
        confirmationExpiresAt,
      })
      .unset(['confirmedAt', 'unsubscribedAt', 'introEmailSentAt'])
      .commit({autoGenerateArrayKeys: true})
  } else {
    const created = await sanityAdminClient.create({
      _id: idForEmail(email),
      _type: 'newsletterSubscriber',
      email,
      status: 'pending',
      subscribedAt: nowIso,
      source: payload.source ?? 'newsletter-shuffle',
      ip,
      userAgent: request.headers.get('user-agent') ?? undefined,
      confirmationToken,
      confirmationSentAt: nowIso,
      confirmationExpiresAt,
    })
    subscriberId = created._id
  }

  const confirmationUrl = `${siteConfig.url}/api/newsletter/confirm?token=${confirmationToken}`
  const {data, error} = await sendEmail({
    to: email,
    subject: 'Potvrdi svoju prijavu na Agile Onion',
    react: NewsletterConfirm({confirmUrl: confirmationUrl}),
    replyTo: 'agileonion.blog@gmail.com',
  })

  if (error) {
    return NextResponse.json({error: 'Email delivery failed'}, {status: 500})
  }

  if (data?.id && subscriberId) {
    await sanityAdminClient
      .patch(subscriberId)
      .set({confirmationMessageId: data.id})
      .commit({autoGenerateArrayKeys: true})
  }

  return NextResponse.json({ok: true, alreadySubscribed: false})
}
