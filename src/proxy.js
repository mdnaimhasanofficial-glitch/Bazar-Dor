import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
 
export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  // Jodi user login kora na thake (session na thake), tahole signin page a redirect korbe
  if (!session) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  // Jodi login thake, tahole tar gontobbe (requested page) jete dibe
  return NextResponse.next()
}

export const config = {
  matcher: ['/profile', '/productDetails/:path*'],
}