import { NextResponse } from "next/server"
import { handleContactForm, handleWaitlistSignup } from "@/app/actions/email-actions"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const testEmail = searchParams.get("email") || "test@example.com"

  console.log("🔍 FULL FLOW DEBUG - Starting comprehensive test...")

  try {
    const results = {
      environment: {
        hasResendKey: !!process.env.RESEND_API_KEY,
        keyLength: process.env.RESEND_API_KEY?.length || 0,
        keyPrefix: process.env.RESEND_API_KEY?.substring(0, 10) || "missing",
        nodeEnv: process.env.NODE_ENV,
        vercelUrl: process.env.VERCEL_URL || "not-set",
      },
      tests: {} as any,
    }

    // Test 1: Direct Resend API call
    console.log("🧪 Test 1: Direct Resend API call...")
    try {
      const directApiResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "NexaraX <noreply@updates.nexarax.com>",
          to: ["hello@nexarax.com"],
          subject: "🧪 Direct API Test",
          html: `<h2>Direct API Test</h2><p>Time: ${new Date().toISOString()}</p>`,
        }),
      })

      const directApiResult = await directApiResponse.json()
      results.tests.directApi = {
        success: directApiResponse.ok,
        status: directApiResponse.status,
        result: directApiResult,
      }
      console.log("📊 Direct API result:", results.tests.directApi)
    } catch (error) {
      results.tests.directApi = {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }

    // Test 2: sendEmail function
    console.log("🧪 Test 2: sendEmail function...")
    try {
      const { sendEmail } = await import("@/lib/resend-client")
      const sendEmailResult = await sendEmail({
        to: "hello@nexarax.com",
        subject: "🧪 sendEmail Function Test",
        html: `<h2>sendEmail Function Test</h2><p>Time: ${new Date().toISOString()}</p>`,
      })

      results.tests.sendEmailFunction = sendEmailResult
      console.log("📊 sendEmail function result:", sendEmailResult)
    } catch (error) {
      results.tests.sendEmailFunction = {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }

    // Test 3: Contact form server action
    console.log("🧪 Test 3: Contact form server action...")
    try {
      const contactFormData = new FormData()
      contactFormData.append("firstName", "Debug")
      contactFormData.append("lastName", "Test")
      contactFormData.append("email", testEmail)
      contactFormData.append("subject", "Debug Contact Test")
      contactFormData.append("message", "This is a debug test message")

      const contactResult = await handleContactForm(contactFormData)
      results.tests.contactServerAction = contactResult
      console.log("📊 Contact server action result:", contactResult)
    } catch (error) {
      results.tests.contactServerAction = {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }

    // Test 4: Waitlist server action
    console.log("🧪 Test 4: Waitlist server action...")
    try {
      const waitlistFormData = new FormData()
      waitlistFormData.append("email", testEmail)
      waitlistFormData.append("name", "Debug User")
      waitlistFormData.append("source", "debug-test")

      const waitlistResult = await handleWaitlistSignup(waitlistFormData)
      results.tests.waitlistServerAction = waitlistResult
      console.log("📊 Waitlist server action result:", waitlistResult)
    } catch (error) {
      results.tests.waitlistServerAction = {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }

    // Analysis
    const analysis = {
      environmentOk: results.environment.hasResendKey && results.environment.keyLength > 20,
      directApiWorks: results.tests.directApi?.success,
      sendEmailWorks: results.tests.sendEmailFunction?.success,
      contactActionWorks: results.tests.contactServerAction?.success,
      waitlistActionWorks: results.tests.waitlistServerAction?.success,

      // Identify the failure point
      failurePoint: (() => {
        if (!results.environment.hasResendKey) return "Missing RESEND_API_KEY"
        if (!results.tests.directApi?.success) return "Direct API call failed"
        if (!results.tests.sendEmailFunction?.success) return "sendEmail function failed"
        if (!results.tests.contactServerAction?.success) return "Contact server action failed"
        if (!results.tests.waitlistServerAction?.success) return "Waitlist server action failed"
        return "All tests passed"
      })(),
    }

    console.log("🎯 ANALYSIS:", analysis)

    return NextResponse.json({
      success: true,
      message: "Full flow debug completed",
      testEmail,
      timestamp: new Date().toISOString(),
      results,
      analysis,
      recommendations: [
        "Check the console logs above for detailed error information",
        "Look at the 'failurePoint' in analysis to see where it's breaking",
        "If direct API works but server actions don't, it's a logic issue",
        "If nothing works, it's likely an environment variable issue",
      ],
    })
  } catch (error) {
    console.error("❌ Full flow debug error:", error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    })
  }
}
