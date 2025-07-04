import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const testEmail = searchParams.get("email") || "test@example.com"

    console.log("🧪 Testing customer email trigger for:", testEmail)

    // Get the correct base URL
    const host = request.headers.get("host")
    const protocol = request.headers.get("x-forwarded-proto") || "https"
    const baseUrl = `${protocol}://${host}`

    console.log("🌐 Using base URL:", baseUrl)

    // Test contact confirmation
    console.log("📞 Testing contact confirmation...")
    const contactResponse = await fetch(`${baseUrl}/api/trigger-email-sequence`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "NexaraX-Test/1.0",
      },
      body: JSON.stringify({
        firstName: "Test",
        lastName: "User",
        email: testEmail,
        subject: "Test Contact Message",
        contactDate: new Date().toISOString(),
      }),
    })

    let contactResult
    try {
      contactResult = await contactResponse.json()
    } catch (parseError) {
      const contactText = await contactResponse.text()
      contactResult = {
        error: "Failed to parse JSON",
        status: contactResponse.status,
        statusText: contactResponse.statusText,
        body: contactText.substring(0, 200) + "...",
      }
    }

    console.log("📊 Contact result:", contactResult)

    // Test waitlist welcome
    console.log("🎯 Testing waitlist welcome...")
    const waitlistResponse = await fetch(`${baseUrl}/api/trigger-email-sequence`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "NexaraX-Test/1.0",
      },
      body: JSON.stringify({
        email: testEmail,
        firstName: "Test",
        source: "test",
        signupDate: new Date().toISOString(),
      }),
    })

    let waitlistResult
    try {
      waitlistResult = await waitlistResponse.json()
    } catch (parseError) {
      const waitlistText = await waitlistResponse.text()
      waitlistResult = {
        error: "Failed to parse JSON",
        status: waitlistResponse.status,
        statusText: waitlistResponse.statusText,
        body: waitlistText.substring(0, 200) + "...",
      }
    }

    console.log("📊 Waitlist result:", waitlistResult)

    return NextResponse.json({
      success: true,
      message: "Customer email test completed",
      testEmail,
      baseUrl,
      results: {
        contact: {
          status: contactResponse.status,
          success: contactResponse.ok,
          result: contactResult,
        },
        waitlist: {
          status: waitlistResponse.status,
          success: waitlistResponse.ok,
          result: waitlistResult,
        },
      },
      instructions: [
        `Check ${testEmail} for confirmation emails`,
        "Both contact confirmation and waitlist welcome should arrive",
        "Check Resend dashboard for delivery status",
      ],
    })
  } catch (error) {
    console.error("❌ Customer email test error:", error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    })
  }
}
