import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

function rateLimit(ip: string, limit = 1000, windowMs: number = 15 * 60 * 1000) {
  const now = Date.now()
  const key = `${ip}`

  const current = rateLimitStore.get(key)

  if (!current || now > current.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs })
    return { allowed: true, remaining: limit - 1 }
  }

  if (current.count >= limit) {
    return { allowed: false, remaining: 0 }
  }

  current.count++
  return { allowed: true, remaining: limit - current.count }
}

export async function middleware(req: NextRequest) {
  // Rate limiting
  const ip = req.ip || req.headers.get("x-forwarded-for") || "unknown"
  const { allowed, remaining } = rateLimit(ip)

  if (!allowed) {
    return new NextResponse("Too Many Requests", {
      status: 429,
      headers: {
        "Retry-After": "900",
        "X-RateLimit-Limit": "1000",
        "X-RateLimit-Remaining": "0",
      },
    })
  }

  // Public routes that don't require authentication
  const publicRoutes = [
    "/",
    "/demo",
    "/contact",
    "/get-started",
    "/create",
    "/pricing",
    "/auth/signin",
    "/auth/signup",
    "/auth/error",
    "/privacy",
    "/terms",
    "/status",
    "/api/health-check",
    "/api/status",
    "/api/auth",
  ]

  const pathname = req.nextUrl.pathname

  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.some(route => {
    if (route === "/") {
      return pathname === "/"
    }
    return pathname === route || pathname.startsWith(route + "/")
  })

  // Simple security headers without authentication for now
  const response = NextResponse.next()

  // Add basic security headers
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-XSS-Protection", "1; mode=block")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")

  // Check authentication for protected routes ONLY
  if (!isPublicRoute) {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    })

    if (!token) {
      const signInUrl = new URL("/auth/signin", req.url)
      signInUrl.searchParams.set("callbackUrl", req.url)
      return NextResponse.redirect(signInUrl)
    }
  }

  // CSRF Protection for state-changing operations
  if (["POST", "PUT", "DELETE", "PATCH"].includes(req.method)) {
    const referer = req.headers.get("referer")
    const origin = req.headers.get("origin")

    // Check if request is from same origin
    if (!referer && !origin) {
      return new NextResponse("CSRF token missing", { status: 403 })
    }

    const requestOrigin = origin || new URL(referer!).origin
    const expectedOrigin = new URL(req.url).origin

    if (requestOrigin !== expectedOrigin) {
      return new NextResponse("CSRF validation failed", { status: 403 })
    }
  }

  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()")
  response.headers.set("X-RateLimit-Limit", "1000")
  response.headers.set("X-RateLimit-Remaining", remaining.toString())

  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|manifest.json|sw.js).*)"],
}
