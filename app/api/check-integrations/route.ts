import { NextResponse } from "next/server"

export async function GET() {
  console.log("🔍 Checking integration status...")

  const integrations = {
    resend: {
      name: "Resend Email Service",
      required: true,
      configured: !!process.env.RESEND_API_KEY,
      status: process.env.RESEND_API_KEY ? "✅ Configured" : "❌ Missing RESEND_API_KEY",
    },
    database: {
      name: "PostgreSQL Database",
      required: false,
      configured: !!process.env.POSTGRES_URL,
      status: process.env.POSTGRES_URL ? "✅ Configured" : "⚠️ Optional - Not configured",
    },
    upstash: {
      name: "Upstash Redis",
      required: false,
      configured: !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN),
      status: process.env.UPSTASH_REDIS_REST_URL ? "✅ Configured" : "⚠️ Optional - Not configured",
    },
    auth: {
      name: "NextAuth Authentication",
      required: false,
      configured: !!(process.env.NEXTAUTH_SECRET && process.env.GOOGLE_CLIENT_ID),
      status: process.env.NEXTAUTH_SECRET ? "✅ Configured" : "⚠️ Optional - Not configured",
    },
    cron: {
      name: "Cron Jobs",
      required: false,
      configured: !!process.env.CRON_SECRET,
      status: process.env.CRON_SECRET ? "✅ Configured" : "⚠️ Optional - Not configured",
    },
  }

  const missingRequired = Object.values(integrations).filter(
    (integration) => integration.required && !integration.configured,
  )

  const allConfigured = missingRequired.length === 0

  return NextResponse.json({
    success: allConfigured,
    message: allConfigured
      ? "All required integrations are configured!"
      : `${missingRequired.length} required integration(s) need configuration`,
    integrations,
    missingRequired: missingRequired.map((i) => i.name),
    recommendations: [
      "Set up Resend API key for email functionality",
      "Add environment variables in Vercel dashboard",
      "Test integrations using /api/test-resend",
      "Optional: Set up database and Redis for advanced features",
    ],
    nextSteps: allConfigured
      ? ["Deploy your application", "Test all functionality", "Monitor email delivery"]
      : ["Add missing environment variables", "Redeploy application", "Test integrations"],
  })
}
