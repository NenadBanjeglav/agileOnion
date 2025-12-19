import {NextRequest, NextResponse} from 'next/server'

const studioUser = process.env.STUDIO_BASIC_AUTH_USER
const studioPass = process.env.STUDIO_BASIC_AUTH_PASS

const unauthorized = () =>
  new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Sanity Studio"' },
  })

export function middleware(request: NextRequest) {
  if (!studioUser || !studioPass) {
    return NextResponse.next()
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

  return NextResponse.next()
}

export const config = {
  matcher: ['/studio/:path*'],
}
