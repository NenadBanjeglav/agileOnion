import {NextRequest, NextResponse} from 'next/server'

const studioUser = process.env.STUDIO_BASIC_AUTH_USER
const studioPass = process.env.STUDIO_BASIC_AUTH_PASS

const unauthorized = () =>
  new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Sanity Studio"' },
  })

const buildCsp = ({isStudio, isDev}: {isStudio: boolean; isDev: boolean}) => {
  const scriptSrc = [
    "'self'",
    "'unsafe-inline'",
    ...(isDev ? ["'unsafe-eval'"] : []),
    'https:',
  ]
  const connectSrc = isStudio
    ? ["'self'", 'https:', 'wss:']
    : [
        "'self'",
        'https:',
        'https://*.api.sanity.io',
        'https://*.apicdn.sanity.io',
        'https://*.sanity.io',
        'https://*.sanitycdn.com',
      ]

  return [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    `frame-ancestors ${isStudio ? "'self'" : "'none'"}`,
    "object-src 'none'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data: https:",
    "style-src 'self' 'unsafe-inline' https:",
    `script-src ${scriptSrc.join(' ')}`,
    `connect-src ${connectSrc.join(' ')}`,
  ].join('; ')
}

export function middleware(request: NextRequest) {
  const isDev = process.env.NODE_ENV !== 'production'
  const isStudio = request.nextUrl.pathname.startsWith('/studio')

  if (!isStudio) {
    const response = NextResponse.next()
    response.headers.set('Content-Security-Policy', buildCsp({ isDev, isStudio }))
    response.headers.set('Cross-Origin-Opener-Policy', 'same-origin')
    response.headers.set('X-Frame-Options', isStudio ? 'SAMEORIGIN' : 'DENY')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    response.headers.set(
      'Permissions-Policy',
      'camera=(), microphone=(), geolocation=()',
    )
    return response
  }

  if (!studioUser || !studioPass) {
    const response = NextResponse.next()
    response.headers.set('Content-Security-Policy', buildCsp({ isDev, isStudio }))
    response.headers.set('Cross-Origin-Opener-Policy', 'same-origin')
    response.headers.set('X-Frame-Options', 'SAMEORIGIN')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    response.headers.set(
      'Permissions-Policy',
      'camera=(), microphone=(), geolocation=()',
    )
    return response
  }

  const authHeader = request.headers.get('authorization')
  if (!authHeader) {
    return unauthorized()
  }

  const [scheme, encoded] = authHeader.split(' ')
  if (scheme !== 'Basic' || !encoded) {
    return unauthorized()
  }

  const decoded = atob(encoded)
  const [user, pass] = decoded.split(':')

  if (user !== studioUser || pass !== studioPass) {
    return unauthorized()
  }

  const response = NextResponse.next()
  response.headers.set('Content-Security-Policy', buildCsp({ isDev, isStudio }))
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin')
  response.headers.set('X-Frame-Options', isStudio ? 'SAMEORIGIN' : 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()',
  )
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
