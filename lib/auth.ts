import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"

export async function requireAuth() {
  const session = await getServerSession()

  if (!session) {
    redirect("/auth/signin")
  }

  return session
}

export async function requireRole(requiredRole: string) {
  const session = await getServerSession()

  if (!session) {
    redirect("/auth/signin")
  }

  // Check if user has role property, otherwise default to 'user'
  const userRole = (session.user as any)?.role || 'user'
  
  if (userRole !== requiredRole && userRole !== "admin") {
    redirect("/unauthorized")
  }

  return session
}

export async function logSecurityEvent(event: {
  type: string
  userId?: string
  ip?: string
  userAgent?: string
  details?: any
}) {
  try {
    // Log security events for monitoring
    console.log("[SECURITY EVENT]", {
      timestamp: new Date().toISOString(),
      type: event.type,
      userId: event.userId || "anonymous",
      ip: event.ip || "unknown",
      userAgent: event.userAgent || "unknown",
      details: event.details || {},
    })

    // In production, you would send this to your logging service
    // await sendToLoggingService(event);

    return { success: true }
  } catch (error) {
    console.error("Failed to log security event:", error)
    return { success: false, error }
  }
}
