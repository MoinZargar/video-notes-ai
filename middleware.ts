import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

const protectedRoutes = [
  '/dashboard',
  '/notes',
  '/api/chat',
  '/api/notes/pdf',
  '/api/notes/video',
  '/api/upload/pdf'
]

const authRoutes = [
  '/signin',
  '/signup',
]

export async function middleware(req: NextRequest) {
  const token = await getToken({ 
    req, 
    secret: process.env.NEXTAUTH_SECRET
  })

  const path = req.nextUrl.pathname

  // Protect routes that require authentication
  if (protectedRoutes.some(route => path.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL('/signup', req.url))
    }
  }

  // Redirect authenticated users away from auth routes
  if (authRoutes.some(route => path.startsWith(route))) {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/signup',
    '/signin',
    '/dashboard',
    '/notes',
    '/notes/:path*',
    '/api/chat',
    '/api/notes/pdf',
    '/api/notes/video',
    '/api/upload/pdf'
  ]
}