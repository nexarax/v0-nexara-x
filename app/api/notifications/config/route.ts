import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { channels, templates } = await request.json()

    // Simulate saving configuration
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Saving notification configuration:", {
      channelCount: channels.length,
      templateCount: templates.length,
    })

    // Validate configuration
    const validation = validateConfiguration(channels, templates)

    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: "Configuration validation failed",
          details: validation.errors,
        },
        { status: 400 },
      )
    }

    return NextResponse.json({
      success: true,
      message: "Configuration saved successfully",
      channelsUpdated: channels.length,
      templatesUpdated: templates.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to save configuration",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  // Return current configuration
  return NextResponse.json({
    channels: [
      {
        id: "email-primary",
        type: "email",
        name: "Primary Email (SMTP)",
        enabled: true,
        lastTested: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        testResults: {
          success: true,
          responseTime: 1250,
        },
      },
      {
        id: "sms-primary",
        type: "sms",
        name: "SMS (Twilio)",
        enabled: true,
        lastTested: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
        testResults: {
          success: true,
          responseTime: 850,
        },
      },
      {
        id: "slack-primary",
        type: "slack",
        name: "Slack Workspace",
        enabled: true,
        lastTested: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
        testResults: {
          success: true,
          responseTime: 420,
        },
      },
      {
        id: "webhook-primary",
        type: "webhook",
        name: "External Webhooks",
        enabled: true,
        lastTested: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 minutes ago
        testResults: {
          success: false,
          responseTime: 0,
          error: "Endpoint timeout",
        },
      },
    ],
    templates: 12,
    lastUpdate: new Date().toISOString(),
  })
}

function validateConfiguration(channels: any[], templates: any[]) {
  const errors: string[] = []

  // Validate channels
  for (const channel of channels) {
    if (!channel.id || !channel.type || !channel.name) {
      errors.push(`Channel missing required fields: ${channel.id || "unknown"}`)
    }

    if (channel.type === "email" && !channel.config?.host) {
      errors.push(`Email channel ${channel.id} missing SMTP host`)
    }

    if (channel.type === "sms" && !channel.config?.accountSid) {
      errors.push(`SMS channel ${channel.id} missing account SID`)
    }

    if (channel.type === "slack" && !channel.config?.botToken) {
      errors.push(`Slack channel ${channel.id} missing bot token`)
    }

    if (channel.type === "webhook" && !channel.config?.endpoints) {
      errors.push(`Webhook channel ${channel.id} missing endpoints`)
    }
  }

  // Validate templates
  for (const template of templates) {
    if (!template.id || !template.type || !template.body) {
      errors.push(`Template missing required fields: ${template.id || "unknown"}`)
    }

    if (template.type === "email" && !template.subject) {
      errors.push(`Email template ${template.id} missing subject`)
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}
