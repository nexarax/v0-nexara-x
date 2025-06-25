import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")
  const platform = searchParams.get("platform")

  try {
    // Simulate mobile-optimized alert data
    const alerts = [
      {
        id: "mobile-alert-1",
        title: "Instagram API Response Time Spike",
        platform: "Instagram",
        severity: "high",
        timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        status: "active",
        location: "EU-West-1",
        description: "Response time exceeded 3s threshold. Affecting 1,247 users.",
        quickActions: ["Scale Infrastructure", "Enable Caching", "Contact Team"],
        assignedTo: null,
        estimatedResolution: "30 minutes",
        affectedUsers: 1247,
        priority: "high",
      },
      {
        id: "mobile-alert-2",
        title: "TikTok Authentication Token Expiry",
        platform: "TikTok",
        severity: "critical",
        timestamp: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
        status: "active",
        location: "Global",
        description: "OAuth token expires in 45 minutes. Immediate action required.",
        quickActions: ["Refresh Token", "Escalate", "Call Team"],
        assignedTo: null,
        estimatedResolution: "15 minutes",
        affectedUsers: 5432,
        priority: "critical",
      },
      {
        id: "mobile-alert-3",
        title: "YouTube Upload Queue Backlog",
        platform: "YouTube",
        severity: "medium",
        timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
        status: "acknowledged",
        location: "US-East-1",
        description: "Upload queue has 47 pending videos. Processing slower than normal.",
        quickActions: ["Clear Queue", "Add Workers", "Monitor"],
        assignedTo: "Sarah Johnson",
        estimatedResolution: "60 minutes",
        affectedUsers: 234,
        priority: "medium",
      },
    ]

    // Filter alerts based on query parameters
    let filteredAlerts = alerts

    if (status) {
      filteredAlerts = filteredAlerts.filter((alert) => alert.status === status)
    }

    if (platform) {
      filteredAlerts = filteredAlerts.filter((alert) => alert.platform.toLowerCase() === platform.toLowerCase())
    }

    return NextResponse.json({
      success: true,
      alerts: filteredAlerts,
      total: filteredAlerts.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch mobile alerts" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { action, alertId, userId } = await request.json()

    switch (action) {
      case "acknowledge":
        return NextResponse.json({
          success: true,
          message: `Alert ${alertId} acknowledged by ${userId}`,
          timestamp: new Date().toISOString(),
        })

      case "escalate":
        return NextResponse.json({
          success: true,
          message: `Alert ${alertId} escalated`,
          newSeverity: "critical",
          timestamp: new Date().toISOString(),
        })

      case "resolve":
        return NextResponse.json({
          success: true,
          message: `Alert ${alertId} resolved by ${userId}`,
          timestamp: new Date().toISOString(),
        })

      case "assign":
        return NextResponse.json({
          success: true,
          message: `Alert ${alertId} assigned to ${userId}`,
          timestamp: new Date().toISOString(),
        })

      default:
        throw new Error(`Unknown action: ${action}`)
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to process alert action" }, { status: 500 })
  }
}
