import { createMiddlewareClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If user is not logged in and tries to access /admin, redirect to /admin/login
  if (!session && req.nextUrl.pathname.startsWith('/admin')) {
    const redirectUrl = new URL('/admin/login', req.url)
    return NextResponse.redirect(redirectUrl)
  }
  return res
}

export const config = {
  matcher: ['/admin/:path*'],
}