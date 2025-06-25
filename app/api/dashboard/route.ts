import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const dataType = searchParams.get("type")

  try {
    switch (dataType) {
      case "platforms":
        return NextResponse.json(await getPlatformStatuses())
      case "alerts":
        return NextResponse.json(await getActiveAlerts())
      case "notifications":
        return NextResponse.json(await getNotificationStatuses())
      case "team":
        return NextResponse.json(await getTeamStatuses())
      case "metrics":
        return NextResponse.json(await getSystemMetrics())
      default:
        return NextResponse.json(await getDashboardOverview())
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch dashboard data",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

async function getPlatformStatuses() {
  // Simulate real-time platform status data
  const platforms = [
    {
      platform: "Instagram",
      status: Math.random() > 0.1 ? "healthy" : "warning",
      responseTime: Math.floor(Math.random() * 2000 + 500),
      uptime: 99.7 + (Math.random() - 0.5) * 0.5,
      lastCheck: new Date().toISOString(),
      metrics: {
        apiCalls: Math.floor(Math.random() * 1000 + 15000),
        successRate: 95 + Math.random() * 4,
        rateLimit: Math.floor(Math.random() * 60 + 20),
        authStatus: Math.random() > 0.05,
      },
    },
    {
      platform: "TikTok",
      status: Math.random() > 0.2 ? "healthy" : Math.random() > 0.5 ? "warning" : "critical",
      responseTime: Math.floor(Math.random() * 3000 + 800),
      uptime: 98.2 + (Math.random() - 0.5) * 1,
      lastCheck: new Date().toISOString(),
      metrics: {
        apiCalls: Math.floor(Math.random() * 500 + 8500),
        successRate: 90 + Math.random() * 8,
        rateLimit: Math.floor(Math.random() * 40 + 60),
        authStatus: Math.random() > 0.1,
      },
    },
    {
      platform: "Twitter/X",
      status: Math.random() > 0.05 ? "healthy" : "warning",
      responseTime: Math.floor(Math.random() * 1500 + 400),
      uptime: 99.9 + (Math.random() - 0.5) * 0.2,
      lastCheck: new Date().toISOString(),
      metrics: {
        apiCalls: Math.floor(Math.random() * 2000 + 20000),
        successRate: 97 + Math.random() * 3,
        rateLimit: Math.floor(Math.random() * 50 + 10),
        authStatus: Math.random() > 0.02,
      },
    },
    {
      platform: "YouTube",
      status: Math.random() > 0.3 ? "healthy" : Math.random() > 0.6 ? "warning" : "critical",
      responseTime: Math.floor(Math.random() * 4000 + 1500),
      uptime: 95.8 + (Math.random() - 0.5) * 2,
      lastCheck: new Date().toISOString(),
      metrics: {
        apiCalls: Math.floor(Math.random() * 300 + 3000),
        successRate: 85 + Math.random() * 10,
        rateLimit: Math.floor(Math.random() * 30 + 70),
        authStatus: Math.random() > 0.15,
      },
    },
  ]

  return {
    success: true,
    data: platforms,
    timestamp: new Date().toISOString(),
  }
}

async function getActiveAlerts() {
  // Simulate active alerts
  const alerts = [
    {
      id: `alert-${Date.now()}-1`,
      platform: "YouTube",
      type: "critical",
      message: "API quota exceeded - upload functionality disabled",
      timestamp: new Date(Date.now() - Math.random() * 60 * 60 * 1000).toISOString(),
      escalationLevel: Math.floor(Math.random() * 3) + 1,
      status: ["active", "acknowledged", "escalated"][Math.floor(Math.random() * 3)],
      assignedTo: Math.random() > 0.5 ? "Michael Rodriguez" : undefined,
    },
    {
      id: `alert-${Date.now()}-2`,
      platform: "TikTok",
      type: "warning",
      message: "Response time elevated above threshold",
      timestamp: new Date(Date.now() - Math.random() * 30 * 60 * 1000).toISOString(),
      escalationLevel: 1,
      status: ["active", "acknowledged"][Math.floor(Math.random() * 2)],
      assignedTo: Math.random() > 0.5 ? "Alex Chen" : undefined,
    },
  ]

  return {
    success: true,
    data: alerts,
    timestamp: new Date().toISOString(),
  }
}

async function getNotificationStatuses() {
  // Simulate notification channel statuses
  const notifications = [
    {
      channel: "email-primary",
      type: "email",
      status: Math.random() > 0.1 ? "operational" : "degraded",
      successRate: 95 + Math.random() * 4,
      avgResponseTime: Math.floor(Math.random() * 1000 + 800),
      lastDelivery: new Date(Date.now() - Math.random() * 10 * 60 * 1000).toISOString(),
      queueSize: Math.floor(Math.random() * 10),
    },
    {
      channel: "sms-primary",
      type: "sms",
      status: Math.random() > 0.05 ? "operational" : "degraded",
      successRate: 97 + Math.random() * 2,
      avgResponseTime: Math.floor(Math.random() * 500 + 500),
      lastDelivery: new Date(Date.now() - Math.random() * 5 * 60 * 1000).toISOString(),
      queueSize: Math.floor(Math.random() * 5),
    },
    {
      channel: "slack-primary",
      type: "slack",
      status: Math.random() > 0.02 ? "operational" : "degraded",
      successRate: 98 + Math.random() * 2,
      avgResponseTime: Math.floor(Math.random() * 300 + 200),
      lastDelivery: new Date(Date.now() - Math.random() * 2 * 60 * 1000).toISOString(),
      queueSize: Math.floor(Math.random() * 3),
    },
    {
      channel: "webhook-primary",
      type: "webhook",
      status: Math.random() > 0.15 ? "operational" : "degraded",
      successRate: 88 + Math.random() * 8,
      avgResponseTime: Math.floor(Math.random() * 2000 + 2000),
      lastDelivery: new Date(Date.now() - Math.random() * 15 * 60 * 1000).toISOString(),
      queueSize: Math.floor(Math.random() * 20),
    },
  ]

  return {
    success: true,
    data: notifications,
    timestamp: new Date().toISOString(),
  }
}

async function getTeamStatuses() {
  // Simulate team member statuses
  const team = [
    {
      id: "alex-chen",
      name: "Alex Chen",
      role: "Senior Developer",
      status: ["available", "busy", "on-call"][Math.floor(Math.random() * 3)],
      escalationLevel: 1,
      lastSeen: new Date(Date.now() - Math.random() * 30 * 60 * 1000).toISOString(),
      activeAlerts: Math.floor(Math.random() * 3),
    },
    {
      id: "sarah-johnson",
      name: "Sarah Johnson",
      role: "DevOps Engineer",
      status: ["available", "busy", "offline"][Math.floor(Math.random() * 3)],
      escalationLevel: 1,
      lastSeen: new Date(Date.now() - Math.random() * 60 * 60 * 1000).toISOString(),
      activeAlerts: Math.floor(Math.random() * 2),
    },
    {
      id: "michael-rodriguez",
      name: "Michael Rodriguez",
      role: "Technical Lead",
      status: ["available", "busy", "on-call"][Math.floor(Math.random() * 3)],
      escalationLevel: 2,
      lastSeen: new Date(Date.now() - Math.random() * 15 * 60 * 1000).toISOString(),
      activeAlerts: Math.floor(Math.random() * 4),
    },
    {
      id: "emma-thompson",
      name: "Emma Thompson",
      role: "Engineering Manager",
      status: ["available", "busy", "offline"][Math.floor(Math.random() * 3)],
      escalationLevel: 3,
      lastSeen: new Date(Date.now() - Math.random() * 120 * 60 * 1000).toISOString(),
      activeAlerts: Math.floor(Math.random() * 2),
    },
    {
      id: "david-kim",
      name: "David Kim",
      role: "CTO",
      status: ["available", "offline"][Math.floor(Math.random() * 2)],
      escalationLevel: 4,
      lastSeen: new Date(Date.now() - Math.random() * 240 * 60 * 1000).toISOString(),
      activeAlerts: Math.floor(Math.random() * 1),
    },
  ]

  return {
    success: true,
    data: team,
    timestamp: new Date().toISOString(),
  }
}

async function getSystemMetrics() {
  // Simulate system metrics
  const metrics = {
    totalAlerts: 847 + Math.floor(Math.random() * 10),
    activeAlerts: Math.floor(Math.random() * 5) + 1,
    resolvedToday: 28 + Math.floor(Math.random() * 5),
    avgResolutionTime: 18.5 + (Math.random() - 0.5) * 2,
    systemUptime: 99.2 + (Math.random() - 0.5) * 0.5,
    selfHealingSuccess: 94.7 + (Math.random() - 0.5) * 2,
    notificationsSent: 1250 + Math.floor(Math.random() * 50),
    escalationsTriggered: 12 + Math.floor(Math.random() * 3),
  }

  return {
    success: true,
    data: metrics,
    timestamp: new Date().toISOString(),
  }
}

async function getDashboardOverview() {
  // Return complete dashboard data
  const [platforms, alerts, notifications, team, metrics] = await Promise.all([
    getPlatformStatuses(),
    getActiveAlerts(),
    getNotificationStatuses(),
    getTeamStatuses(),
    getSystemMetrics(),
  ])

  return {
    success: true,
    data: {
      platforms: platforms.data,
      alerts: alerts.data,
      notifications: notifications.data,
      team: team.data,
      metrics: metrics.data,
    },
    timestamp: new Date().toISOString(),
  }
}

// WebSocket endpoint for real-time updates
export async function POST(request: Request) {
  try {
    const { action, data } = await request.json()

    switch (action) {
      case "acknowledge_alert":
        return NextResponse.json({
          success: true,
          message: `Alert ${data.alertId} acknowledged by ${data.user}`,
          timestamp: new Date().toISOString(),
        })

      case "escalate_alert":
        return NextResponse.json({
          success: true,
          message: `Alert ${data.alertId} escalated to level ${data.newLevel}`,
          timestamp: new Date().toISOString(),
        })

      case "resolve_alert":
        return NextResponse.json({
          success: true,
          message: `Alert ${data.alertId} resolved: ${data.resolution}`,
          timestamp: new Date().toISOString(),
        })

      case "test_platform":
        // Simulate platform test
        await new Promise((resolve) => setTimeout(resolve, 2000))
        return NextResponse.json({
          success: Math.random() > 0.1,
          platform: data.platform,
          responseTime: Math.floor(Math.random() * 2000 + 500),
          timestamp: new Date().toISOString(),
        })

      default:
        throw new Error(`Unknown action: ${action}`)
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Dashboard action failed",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
