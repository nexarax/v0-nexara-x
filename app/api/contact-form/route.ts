import { type NextRequest, NextResponse } from "next/server"
import { sendEmail, createContactEmailHTML } from "@/lib/resend-client"
import { getContactConfirmationTemplate } from "@/lib/email-templates"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const company = formData.get("company") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    console.log("📞 Contact form submission:", { firstName, lastName, email, subject })

    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json({
        success: false,
        error: "Please fill in all required fields",
      })
    }

    // Send notification email (to you)
    const notificationResult = await sendEmail({
      to: "hello@nexarax.com",
      subject: `Contact Form: ${subject}`,
      html: createContactEmailHTML({
        firstName,
        lastName,
        email,
        company,
        subject,
        message,
      }),
    })

    // Send customer confirmation
    const customerResult = await sendEmail({
      to: email,
      subject: "✅ Message Received - We'll Respond Within 24 Hours",
      html: getContactConfirmationTemplate({
        firstName,
        lastName,
        email,
        subject,
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
        message: "Message sent successfully! We'll respond within 24 hours.",
      })
    } else {
      return NextResponse.json({
        success: false,
        error: "Failed to send message. Please try again or email us directly at hello@nexarax.com",
      })
    }
  } catch (error) {
    console.error("❌ Contact form API error:", error)
    return NextResponse.json({
      success: false,
      error: "Please try again or email us directly at hello@nexarax.com",
    })
  }
}
