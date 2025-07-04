import { NextResponse } from "next/server"

export async function GET() {
  console.log("🔍 Testing Resend API Key...")

  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    return NextResponse.json({
      success: false,
      error: "RESEND_API_KEY not found in environment variables",
      debug: {
        nodeEnv: process.env.NODE_ENV,
        hasKey: false,
      },
    })
  }

  if (!apiKey.startsWith("re_")) {
    return NextResponse.json({
      success: false,
      error: "API key doesn't start with 're_' - invalid format",
      debug: {
        keyPrefix: apiKey.substring(0, 3),
        keyLength: apiKey.length,
      },
    })
  }

  // Test the API key with a simple request
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "NexaraX <noreply@updates.nexarax.com>",
        to: ["hello@nexarax.com"],
        subject: "🧪 API Key Test - NexaraX",
        html: `
          <h2>✅ API Key Test Successful!</h2>
          <p>Your Resend API key is working correctly.</p>
          <p><strong>Time:</strong> ${new Date().toISOString()}</p>
          <p><strong>Environment:</strong> ${process.env.NODE_ENV}</p>
        `,
      }),
    })

    const result = await response.json()

    if (response.ok) {
      return NextResponse.json({
        success: true,
        message: "API key is working! Test email sent.",
        debug: {
          status: response.status,
          emailId: result.id,
          keyLength: apiKey.length,
          environment: process.env.NODE_ENV,
        },
      })
    } else {
      return NextResponse.json({
        success: false,
        error: "API key found but Resend API returned error",
        debug: {
          status: response.status,
          resendError: result,
          keyLength: apiKey.length,
        },
      })
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Network error when testing API",
      debug: {
        error: error instanceof Error ? error.message : "Unknown error",
        keyLength: apiKey.length,
      },
    })
  }
}
