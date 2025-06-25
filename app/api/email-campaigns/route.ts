import { NextResponse } from "next/server"
import { sendMarketingEmail, sendBulkCampaign, emailTemplates } from "@/lib/email-marketing"
import { trackNexaraXEvent } from "@/lib/google-marketing-tools"

export async function POST(request: Request) {
  try {
    // Check if email service is available
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Email service not configured. Please add RESEND_API_KEY environment variable." },
        { status: 503 },
      )
    }

    const { type, recipients, templateKey, variables } = await request.json()

    if (type === "single") {
      // Send single email
      const result = await sendMarketingEmail(recipients[0].email, templateKey, variables)

      // Track email sent event
      trackNexaraXEvent.signup(templateKey)

      return NextResponse.json({
        success: result.success,
        messageId: result.messageId,
        error: result.error,
      })
    }

    if (type === "bulk") {
      // Send bulk campaign
      const results = await sendBulkCampaign(recipients, templateKey)

      const successCount = results.filter((r) => r.success).length
      const failureCount = results.filter((r) => !r.success).length

      return NextResponse.json({
        success: true,
        totalSent: successCount,
        totalFailed: failureCount,
        results,
      })
    }

    return NextResponse.json({ error: "Invalid campaign type" }, { status: 400 })
  } catch (error) {
    console.error("Email campaign error:", error)
    return NextResponse.json({ error: "Failed to send email campaign" }, { status: 500 })
  }
}

// Get available email templates
export async function GET() {
  const templates = Object.keys(emailTemplates).map((key) => ({
    key,
    subject: emailTemplates[key as keyof typeof emailTemplates].subject,
    description: getTemplateDescription(key),
  }))

  return NextResponse.json({ templates })
}

function getTemplateDescription(key: string): string {
  const descriptions: Record<string, string> = {
    welcome: "Welcome new users to NexaraX with onboarding information",
    onboarding_day2: "Show users their AI-generated content after 24 hours",
    success_story: "Share user success stories to inspire and convert",
  }

  return descriptions[key] || "Email template"
}
