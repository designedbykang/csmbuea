import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  // Supabase SSR client setup (exact standard pattern)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          req.cookies.set(name, value)
          res.cookies.set(name, value, options)
        },
        remove(name: string, options: any) {
          req.cookies.delete(name)
          res.cookies.delete(name)
        },
      },
    }
  )

  // 1. ALWAYS allow the login page to load. No redirects here.
  if (req.nextUrl.pathname === '/admin/login') {
    return res
  }

  // 2. Check the session
  const { data: { session } } = await supabase.auth.getSession()

  // 3. If there's no session on a protected route, force a hard redirect to login.
  if (!session && req.nextUrl.pathname.startsWith('/admin')) {
    // Using a hard redirect (302) ensures the browser completely forgets the stale page
    const redirectUrl = new URL('/admin/login', req.url)
    return NextResponse.redirect(redirectUrl, 302)
  }

  return res
}

export const config = {
  matcher: ['/admin/:path*'],
}