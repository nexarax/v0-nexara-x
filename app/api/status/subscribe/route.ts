import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, notifications } = await request.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email address is required" }, { status: 400 })
    }

    // In a real application, you would:
    // 1. Validate the email address
    // 2. Store the subscription in your database
    // 3. Send a confirmation email
    // 4. Set up notification preferences

    // Simulate database storage
    const subscription = {
      id: `sub_${Date.now()}`,
      email,
      notifications: notifications || {
        incidents: true,
        maintenance: true,
        statusChanges: true,
      },
      subscribedAt: new Date().toISOString(),
      confirmed: false,
    }

    // Simulate sending confirmation email
    console.log(`Sending confirmation email to ${email}`)

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to status updates",
      subscription: {
        id: subscription.id,
        email: subscription.email,
        subscribedAt: subscription.subscribedAt,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to process subscription" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email address is required" }, { status: 400 })
    }

    // In a real application, you would remove the subscription from your database
    console.log(`Unsubscribing ${email} from status updates`)

    return NextResponse.json({
      success: true,
      message: "Successfully unsubscribed from status updates",
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to process unsubscription" }, { status: 500 })
  }
}
