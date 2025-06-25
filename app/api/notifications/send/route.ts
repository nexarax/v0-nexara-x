import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { channelId, templateId, variables, escalationLevel } = await request.json()

    // Simulate sending notification
    const sendResult = await sendNotification(channelId, templateId, variables, escalationLevel)

    return NextResponse.json({
      success: sendResult.success,
      channelId,
      templateId,
      messageId: sendResult.messageId,
      deliveryTime: sendResult.deliveryTime,
      error: sendResult.error,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to send notification",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

async function sendNotification(channelId: string, templateId: string, variables: any, escalationLevel?: string) {
  console.log(`Sending notification via ${channelId} using template ${templateId}`)

  // Simulate delivery delay
  const deliveryDelay = Math.random() * 3000 + 500 // 500ms to 3.5s
  await new Promise((resolve) => setTimeout(resolve, deliveryDelay))

  // Simulate different delivery success rates by channel
  const deliveryRates = {
    "email-primary": 0.95,
    "sms-primary": 0.98,
    "slack-primary": 0.99,
    "webhook-primary": 0.92,
  }

  const successRate = deliveryRates[channelId as keyof typeof deliveryRates] || 0.9
  const success = Math.random() < successRate

  return {
    success,
    messageId: success ? `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` : null,
    deliveryTime: Math.floor(deliveryDelay),
    error: success ? null : getRandomError(channelId),
  }
}

function getRandomError(channelId: string) {
  const errors = {
    "email-primary": [
      "SMTP server temporarily unavailable",
      "Recipient email address invalid",
      "Message rejected by spam filter",
      "Authentication failed",
    ],
    "sms-primary": ["Invalid phone number", "SMS quota exceeded", "Carrier delivery failed", "Message too long"],
    "slack-primary": ["Channel not found", "Bot token expired", "Rate limit exceeded", "Insufficient permissions"],
    "webhook-primary": ["Endpoint unreachable", "HTTP timeout", "Invalid response format", "Authentication failed"],
  }

  const channelErrors = errors[channelId as keyof typeof errors] || ["Unknown error"]
  return channelErrors[Math.floor(Math.random() * channelErrors.length)]
}
