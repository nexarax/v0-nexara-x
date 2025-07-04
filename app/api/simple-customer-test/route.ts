import { NextResponse } from "next/server"
import { sendEmail } from "@/lib/resend-client"
import { getWaitlistWelcomeTemplate, getContactConfirmationTemplate } from "@/lib/email-templates"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const testEmail = searchParams.get("email") || "test@example.com"

    console.log("🧪 Simple customer email test for:", testEmail)

    // Test 1: Direct contact confirmation
    console.log("📞 Sending contact confirmation directly...")
    const contactResult = await sendEmail({
      to: testEmail,
      subject: "🧪 TEST: Contact Confirmation",
      html: getContactConfirmationTemplate({
        firstName: "Test",
        lastName: "User",
        email: testEmail,
        subject: "Test Contact Message",
      }),
      from: "NexaraX <noreply@updates.nexarax.com>",
    })

    // Test 2: Direct waitlist welcome
    console.log("🎯 Sending waitlist welcome directly...")
    const waitlistResult = await sendEmail({
      to: testEmail,
      subject: "🧪 TEST: Waitlist Welcome",
      html: getWaitlistWelcomeTemplate({
        email: testEmail,
        firstName: "Test",
      }),
      from: "NexaraX <noreply@updates.nexarax.com>",
    })

    return NextResponse.json({
      success: true,
      message: "Direct customer email test completed",
      testEmail,
      results: {
        contactConfirmation: contactResult,
        waitlistWelcome: waitlistResult,
      },
      instructions: [
        `Check ${testEmail} for both test emails`,
        "Contact confirmation should arrive",
        "Waitlist welcome should arrive",
        "Check Resend dashboard for delivery status",
      ],
    })
  } catch (error) {
    console.error("❌ Simple customer test error:", error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
