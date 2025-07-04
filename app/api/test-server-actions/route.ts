import { NextResponse } from "next/server"
import { handleContactForm, handleWaitlistSignup } from "@/app/actions/email-actions"

export async function GET() {
  console.log("🧪 Testing server actions directly...")

  try {
    // Test contact form
    console.log("📞 Testing contact form server action...")
    const contactFormData = new FormData()
    contactFormData.append("firstName", "Test")
    contactFormData.append("lastName", "User")
    contactFormData.append("email", "test@example.com")
    contactFormData.append("subject", "Server Action Test")
    contactFormData.append("message", "Testing server action directly")

    const contactResult = await handleContactForm(contactFormData)
    console.log("📊 Contact server action result:", contactResult)

    // Test waitlist form
    console.log("🎯 Testing waitlist server action...")
    const waitlistFormData = new FormData()
    waitlistFormData.append("email", "test@example.com")
    waitlistFormData.append("name", "Test User")
    waitlistFormData.append("source", "server-action-test")

    const waitlistResult = await handleWaitlistSignup(waitlistFormData)
    console.log("📊 Waitlist server action result:", waitlistResult)

    return NextResponse.json({
      success: true,
      message: "Server actions tested",
      results: {
        contact: contactResult,
        waitlist: waitlistResult,
      },
      analysis: {
        contactSuccess: contactResult?.success,
        waitlistSuccess: waitlistResult?.success,
        contactHasMessage: !!contactResult?.message,
        waitlistHasMessage: !!waitlistResult?.message,
      },
    })
  } catch (error) {
    console.error("❌ Server action test error:", error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
