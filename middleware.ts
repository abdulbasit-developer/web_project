import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // We're not going to use middleware for authentication
  // Just pass through all requests
  return NextResponse.next()
}