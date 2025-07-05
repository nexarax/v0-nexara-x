import { type NextRequest, NextResponse } from "next/server"
import { sendEmail } from "@/lib/resend-client"
import { getWaitlistBehindScenesTemplate } from "@/lib/email-templates"

// This will be called by Vercel Cron Jobs
export async function GET(request: NextRequest) {
  try {
    // Verify this is called by Vercel Cron with your specific secret
    const authHeader = request.headers.get("authorization")
    const expectedAuth = `Bearer ${process.env.CRON_SECRET}`

    console.log("🔐 Checking cron authentication...")
    console.log("Auth header present:", !!authHeader)
    console.log("Expected secret length:", process.env.CRON_SECRET?.length || 0)

    if (authHeader !== expectedAuth) {
      console.error("❌ Unauthorized cron request")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.log("✅ Cron authentication successful")
    console.log("⏰ Running scheduled email sequences...")

    // In a real implementation, you'd:
    // 1. Query your database for users who signed up 3 days ago
    // 2. Send them the "behind the scenes" email
    // 3. Mark them as having received this email

    // For demonstration, let's simulate processing some users
    const mockUsers = [{ email: "test@example.com", firstName: "Test", signupDate: "3 days ago" }]

    let processedCount = 0

    for (const user of mockUsers) {
      try {
        console.log(`📧 Sending follow-up email to ${user.email}`)

        // Send the "behind the scenes" email
        const result = await sendEmail({
          to: user.email,
          subject: "🚀 Behind the Scenes: Building the Future of Social Media",
          html: getWaitlistBehindScenesTemplate({
            email: user.email,
            firstName: user.firstName,
          }),
          from: "NexaraX <noreply@updates.nexarax.com>",
        })

        if (result.success) {
          processedCount++
          console.log(`✅ Email sent to ${user.email}`)
        } else {
          console.error(`❌ Failed to send email to ${user.email}:`, result.error)
        }
      } catch (emailError) {
        console.error(`❌ Error sending email to ${user.email}:`, emailError)
      }
    }

    console.log(`✅ Cron job completed. Processed ${processedCount} users.`)

    return NextResponse.json({
      success: true,
      message: `Email sequences processed successfully`,
      processedCount,
      timestamp: new Date().toISOString(),
      cronSecret: "✅ Authenticated",
    })
  } catch (error) {
    console.error("❌ Cron job error:", error)
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
