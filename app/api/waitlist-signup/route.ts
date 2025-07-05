import { type NextRequest, NextResponse } from "next/server"
import { sendEmail, createWaitlistEmailHTML } from "@/lib/resend-client"
import { getWaitlistWelcomeTemplate } from "@/lib/email-templates"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const email = formData.get("email") as string
    const name = formData.get("name") as string
    const source = "contact-page"

    console.log("🎯 Waitlist signup:", { email, name, source })

    // Validate required fields
    if (!email || !name) {
      return NextResponse.json({
        success: false,
        error: "Please enter your name and email address",
      })
    }

    // Send notification email (to you)
    const notificationResult = await sendEmail({
      to: "hello@nexarax.com",
      subject: `🎉 New Waitlist Signup - ${email}`,
      html: createWaitlistEmailHTML({ email, source }),
    })

    // Send customer welcome
    const customerResult = await sendEmail({
      to: email,
      subject: "🎉 Welcome to NexaraX - You're In!",
      html: getWaitlistWelcomeTemplate({
        email,
        firstName: name,
      }),
      from: "NexaraX <noreply@updates.nexarax.com>",
    })

    console.log("📧 Email results:", {
      notification: notificationResult.success,
      customer: customerResult.success,
    })

    // If either email was sent successfully, consider it a success
    if (notificationResult.success || customerResult.success) {
      return NextResponse.json({
        success: true,
        message: "Welcome to the waitlist! Check your email for a welcome message.",
      })
    } else {
      return NextResponse.json({
        success: false,
        error: "Failed to join waitlist. Please try again or email us at hello@nexarax.com",
      })
    }
  } catch (error) {
    console.error("❌ Waitlist API error:", error)
    return NextResponse.json({
      success: false,
      error: "Please try again or email us directly at hello@nexarax.com",
    })
  }
}
