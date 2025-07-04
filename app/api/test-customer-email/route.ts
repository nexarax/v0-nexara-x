import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const testEmail = searchParams.get("email") || "test@example.com"

  console.log("🧪 Testing customer email trigger for:", testEmail)

  try {
    // Test contact confirmation
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://nexarax.com"

    console.log("📞 Testing contact confirmation...")
    const contactResponse = await fetch(`${baseUrl}/api/trigger-email-sequence`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: "Test",
        lastName: "User",
        email: testEmail,
        subject: "Test Contact Message",
        contactDate: new Date().toISOString(),
      }),
    })

    const contactResult = await contactResponse.json()
    console.log("📊 Contact result:", contactResult)

    // Test waitlist welcome
    console.log("🎯 Testing waitlist welcome...")
    const waitlistResponse = await fetch(`${baseUrl}/api/trigger-email-sequence`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: testEmail,
        firstName: "Test",
        source: "test",
        signupDate: new Date().toISOString(),
      }),
    })

    const waitlistResult = await waitlistResponse.json()
    console.log("📊 Waitlist result:", waitlistResult)

    return NextResponse.json({
      success: true,
      message: "Customer email test completed",
      results: {
        contact: contactResult,
        waitlist: waitlistResult,
      },
      instructions: [
        `Check ${testEmail} for confirmation emails`,
        "Both contact confirmation and waitlist welcome should arrive",
        "Check Resend dashboard for delivery status",
      ],
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
