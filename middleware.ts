// This is a minimal middleware that does nothing but pass through all requests
// We're not using middleware for authentication to avoid redirect loops

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Just pass through all requests
  return NextResponse.next()
}

// Optional: Configure middleware to run only for specific paths
// export const config = {
//   matcher: ['/api/:path*'],
// }