import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked async if using await inside
export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.includes('/dashboard')) {
    const {nextUrl: {search}} = request
    const queryParams = request.nextUrl.searchParams
    console.log(`aaaaaaaaaaaaa ${JSON.stringify(queryParams, null, 2)}`)
    return NextResponse.next()
  }

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/admin/:path*',
}