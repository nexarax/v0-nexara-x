import { NextResponse } from "next/server"

export async function GET() {
  console.log("🔍 Testing Resend API permissions...")

  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    return NextResponse.json({
      success: false,
      error: "RESEND_API_KEY not found",
    })
  }

  try {
    // Test 1: Send to hello@nexarax.com (known working)
    console.log("📧 Test 1: Sending to hello@nexarax.com...")
    const test1Response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "NexaraX <noreply@updates.nexarax.com>",
        to: ["hello@nexarax.com"],
        subject: "🧪 Permission Test 1: To hello@nexarax.com",
        html: `
          <h2>✅ Test 1 Success</h2>
          <p>This email was sent to hello@nexarax.com</p>
          <p><strong>Time:</strong> ${new Date().toISOString()}</p>
        `,
      }),
    })

    const test1Result = await test1Response.json()
    console.log("📊 Test 1 result:", test1Result)

    // Test 2: Send to a different email (gmail)
    console.log("📧 Test 2: Sending to external email...")
    const test2Response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "NexaraX <noreply@updates.nexarax.com>",
        to: ["test.nexarax@gmail.com"], // Using a test Gmail
        subject: "🧪 Permission Test 2: To External Email",
        html: `
          <h2>✅ Test 2 Success</h2>
          <p>This email was sent to an external email address</p>
          <p><strong>Time:</strong> ${new Date().toISOString()}</p>
          <p>If you receive this, the API key permissions are working correctly!</p>
        `,
      }),
    })

    const test2Result = await test2Response.json()
    console.log("📊 Test 2 result:", test2Result)

    // Test 3: Check API key info
    console.log("🔑 Test 3: Checking API key info...")
    const keyInfoResponse = await fetch("https://api.resend.com/api-keys", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })

    const keyInfoResult = await keyInfoResponse.json()
    console.log("📊 API Key info:", keyInfoResult)

    return NextResponse.json({
      success: true,
      message: "Permission tests completed",
      tests: {
        test1: {
          status: test1Response.status,
          success: test1Response.ok,
          result: test1Result,
        },
        test2: {
          status: test2Response.status,
          success: test2Response.ok,
          result: test2Result,
        },
        keyInfo: {
          status: keyInfoResponse.status,
          success: keyInfoResponse.ok,
          result: keyInfoResult,
        },
      },
      analysis: {
        canSendToNexarax: test1Response.ok,
        canSendToExternal: test2Response.ok,
        hasKeyAccess: keyInfoResponse.ok,
        permissionLevel: "Sending access (from dashboard)",
      },
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
