import { NextResponse } from "next/server"
import { sendEmail } from "@/lib/resend-client"
import { getWaitlistWelcomeTemplate, getContactConfirmationTemplate } from "@/lib/email-templates"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const testEmail = searchParams.get("email") || "debbiev74@googlemail.com"

  console.log("🔍 Debugging customer emails for:", testEmail)

  try {
    const results = []

    // Test 1: Direct waitlist welcome
    console.log("🎯 Test 1: Direct waitlist welcome...")
    const waitlistResult = await sendEmail({
      to: testEmail,
      subject: "🧪 DEBUG: Waitlist Welcome Direct",
      html: getWaitlistWelcomeTemplate({
        email: testEmail,
        firstName: "Debug User",
      }),
      from: "NexaraX <noreply@updates.nexarax.com>",
    })

    results.push({
      test: "waitlist-welcome-direct",
      success: waitlistResult.success,
      result: waitlistResult,
    })

    // Test 2: Direct contact confirmation
    console.log("📞 Test 2: Direct contact confirmation...")
    const contactResult = await sendEmail({
      to: testEmail,
      subject: "🧪 DEBUG: Contact Confirmation Direct",
      html: getContactConfirmationTemplate({
        firstName: "Debug",
        lastName: "User",
        email: testEmail,
        subject: "Debug Contact Test",
      }),
      from: "NexaraX <noreply@updates.nexarax.com>",
    })

    results.push({
      test: "contact-confirmation-direct",
      success: contactResult.success,
      result: contactResult,
    })

    // Test 3: Check environment
    const envCheck = {
      hasResendKey: !!process.env.RESEND_API_KEY,
      keyLength: process.env.RESEND_API_KEY?.length || 0,
      vercelUrl: process.env.VERCEL_URL || "not-set",
      nodeEnv: process.env.NODE_ENV,
    }

    return NextResponse.json({
      success: true,
      message: "Customer email debug completed",
      testEmail,
      results,
      environment: envCheck,
      instructions: [
        `Check ${testEmail} for both debug emails`,
        "Both should arrive within 1-2 minutes",
        "Check Resend dashboard for delivery status",
        "If emails don't arrive, check spam folder",
      ],
    })
  } catch (error) {
    console.error("❌ Debug error:", error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    })
  }
}
