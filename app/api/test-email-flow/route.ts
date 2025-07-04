import { type NextRequest, NextResponse } from "next/server"
import { sendEmail } from "@/lib/resend-client"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const testType = searchParams.get("type") || "both"
  const testEmail = searchParams.get("email") || "hello@nexarax.com"

  console.log("🧪 Testing email flow:", { testType, testEmail })

  try {
    const results = []

    if (testType === "waitlist" || testType === "both") {
      console.log("🎯 Testing waitlist notification...")
      const waitlistResult = await sendEmail({
        to: "hello@nexarax.com",
        subject: "🧪 TEST: Waitlist Notification",
        html: `
          <h2>🧪 Waitlist Test</h2>
          <p><strong>Email:</strong> ${testEmail}</p>
          <p><strong>Source:</strong> homepage-test</p>
          <p><strong>Time:</strong> ${new Date().toISOString()}</p>
          <p>This is a test to verify waitlist notifications are working.</p>
        `,
      })
      results.push({ type: "waitlist-notification", result: waitlistResult })

      console.log("🎉 Testing waitlist welcome...")
      const welcomeResult = await sendEmail({
        to: testEmail,
        subject: "🧪 TEST: Welcome to NexaraX",
        html: `
          <h2>🎉 Welcome Test</h2>
          <p>Hi there!</p>
          <p>This is a test welcome email to verify the customer welcome flow is working.</p>
          <p><strong>Time:</strong> ${new Date().toISOString()}</p>
        `,
      })
      results.push({ type: "waitlist-welcome", result: welcomeResult })
    }

    if (testType === "contact" || testType === "both") {
      console.log("📞 Testing contact notification...")
      const contactResult = await sendEmail({
        to: "hello@nexarax.com",
        subject: "🧪 TEST: Contact Form Notification",
        html: `
          <h2>🧪 Contact Test</h2>
          <p><strong>Name:</strong> Test User</p>
          <p><strong>Email:</strong> ${testEmail}</p>
          <p><strong>Subject:</strong> Test Message</p>
          <p><strong>Time:</strong> ${new Date().toISOString()}</p>
          <p>This is a test to verify contact notifications are working.</p>
        `,
      })
      results.push({ type: "contact-notification", result: contactResult })

      console.log("✅ Testing contact confirmation...")
      const confirmationResult = await sendEmail({
        to: testEmail,
        subject: "🧪 TEST: Message Received Confirmation",
        html: `
          <h2>✅ Confirmation Test</h2>
          <p>Hi Test User!</p>
          <p>This is a test confirmation email to verify the customer confirmation flow is working.</p>
          <p><strong>Time:</strong> ${new Date().toISOString()}</p>
        `,
      })
      results.push({ type: "contact-confirmation", result: confirmationResult })
    }

    return NextResponse.json({
      success: true,
      message: "Email flow test completed",
      results,
      instructions: [
        "Check hello@nexarax.com for notification emails",
        `Check ${testEmail} for customer emails`,
        "All emails should arrive within 1-2 minutes",
      ],
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
