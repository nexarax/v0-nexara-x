import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    console.log("🧪 Testing cron job manually...")

    // Call our cron endpoint with the correct authorization
    const cronSecret = process.env.CRON_SECRET
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"

    console.log("🔐 Using cron secret:", cronSecret ? "✅ Found" : "❌ Missing")
    console.log("🌐 Base URL:", baseUrl)

    const response = await fetch(`${baseUrl}/api/cron/email-sequences`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cronSecret}`,
        "Content-Type": "application/json",
      },
    })

    const result = await response.json()

    console.log("📊 Cron test result:", result)

    return NextResponse.json({
      success: true,
      message: "Cron job test completed",
      cronResponse: result,
      status: response.status,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("❌ Cron test error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
