import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { scenarioId, platform, metrics, duration } = await request.json()

    // Simulate alert processing
    const alertResults = await processAlertSimulation({
      scenarioId,
      platform,
      metrics,
      duration,
    })

    return NextResponse.json({
      success: true,
      results: alertResults,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Alert simulation failed" }, { status: 500 })
  }
}

async function processAlertSimulation(params: any) {
  const { scenarioId, platform, metrics, duration } = params

  // Simulate alert generation logic
  const alerts = []
  const notifications = []

  // Check thresholds
  for (const [metric, value] of Object.entries(metrics)) {
    const thresholds = getThresholds(platform, metric)
    const numericValue = Number(value) // Fix: Convert to number

    if (numericValue >= thresholds.critical) {
      alerts.push({
        type: "critical",
        metric,
        value: numericValue, // Use numericValue instead of value
        threshold: thresholds.critical,
        escalationLevel: 2,
      })

      // Send critical notifications
      notifications.push(
        { channel: "email", status: "sent", timestamp: new Date() },
        { channel: "sms", status: "sent", timestamp: new Date() },
        { channel: "webhook", status: "sent", timestamp: new Date() },
        { channel: "slack", status: "sent", timestamp: new Date() },
      )
    } else if (numericValue >= thresholds.warning) {
      alerts.push({
        type: "warning",
        metric,
        value: numericValue, // Use numericValue instead of value
        threshold: thresholds.warning,
        escalationLevel: 1,
      })

      // Send warning notifications
      notifications.push(
        { channel: "email", status: "sent", timestamp: new Date() },
        { channel: "webhook", status: "sent", timestamp: new Date() },
        { channel: "slack", status: "sent", timestamp: new Date() },
      )
    }
  }

  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, duration * 10)) // Speed up for demo

  return {
    scenarioId,
    platform,
    alerts,
    notifications,
    summary: {
      totalAlerts: alerts.length,
      criticalAlerts: alerts.filter((a) => a.type === "critical").length,
      warningAlerts: alerts.filter((a) => a.type === "warning").length,
      notificationsSent: notifications.filter((n) => n.status === "sent").length,
      notificationsFailed: notifications.filter((n) => n.status === "failed").length,
    },
  }
}

function getThresholds(platform: string, metric: string) {
  const thresholds: { [key: string]: { [key: string]: { warning: number; critical: number } } } = {
    Instagram: {
      responseTime: { warning: 2000, critical: 5000 },
      failureRate: { warning: 10, critical: 25 },
      rateLimit: { warning: 80, critical: 95 },
      authExpiry: { warning: 7, critical: 1 },
    },
    TikTok: {
      responseTime: { warning: 3000, critical: 8000 },
      failureRate: { warning: 15, critical: 35 },
      rateLimit: { warning: 85, critical: 98 },
      authExpiry: { warning: 14, critical: 3 },
    },
    "Twitter/X": {
      responseTime: { warning: 1500, critical: 4000 },
      failureRate: { warning: 5, critical: 15 },
      rateLimit: { warning: 90, critical: 99 },
      authExpiry: { warning: 30, critical: 7 },
    },
    YouTube: {
      responseTime: { warning: 5000, critical: 15000 },
      failureRate: { warning: 20, critical: 40 },
      rateLimit: { warning: 70, critical: 90 },
      authExpiry: { warning: 14, critical: 3 },
    },
  }

  return thresholds[platform]?.[metric] || { warning: 100, critical: 200 }
}
