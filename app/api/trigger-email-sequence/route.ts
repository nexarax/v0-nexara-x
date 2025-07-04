import { type NextRequest, NextResponse } from "next/server"
import { sendEmail } from "@/lib/resend-client"
import { getWaitlistWelcomeTemplate, getContactConfirmationTemplate } from "@/lib/email-templates"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    console.log("🚀 Email sequence trigger received:", data)

    if ("subject" in data) {
      // CONTACT SEQUENCE - Send immediate confirmation to customer
      const contactData = data
      console.log("📞 Sending contact confirmation to customer:", contactData.email)

      const result = await sendEmail({
        to: contactData.email,
        subject: "✅ Message Received - We'll Respond Within 24 Hours",
        html: getContactConfirmationTemplate(contactData),
        from: "NexaraX <noreply@updates.nexarax.com>",
      })

      console.log("📧 Contact confirmation result:", result)

      return NextResponse.json({
        success: true,
        message: "Contact confirmation sent",
        emailId: result.data?.id,
      })
    } else {
      // WAITLIST SEQUENCE - Send immediate welcome to customer
      const waitlistData = data
      console.log("🎯 Sending waitlist welcome to customer:", waitlistData.email)

      const result = await sendEmail({
        to: waitlistData.email,
        subject: "🎉 Welcome to NexaraX - You're In!",
        html: getWaitlistWelcomeTemplate(waitlistData),
        from: "NexaraX <noreply@updates.nexarax.com>",
      })

      console.log("📧 Waitlist welcome result:", result)

      return NextResponse.json({
        success: true,
        message: "Waitlist welcome sent",
        emailId: result.data?.id,
      })
    }
  } catch (error) {
    console.error("❌ Email sequence trigger error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
