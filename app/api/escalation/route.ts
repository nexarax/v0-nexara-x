import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { action, eventId, levelId, data } = await request.json()

    switch (action) {
      case "trigger":
        return await triggerEscalation(data)
      case "acknowledge":
        return await acknowledgeAlert(eventId, data.acknowledgedBy)
      case "escalate":
        return await escalateToNextLevel(eventId)
      case "resolve":
        return await resolveAlert(eventId, data.resolution)
      case "test":
        return await testEscalationLevel(levelId)
      default:
        throw new Error(`Unknown action: ${action}`)
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: "Escalation action failed" }, { status: 500 })
  }
}

async function triggerEscalation(alertData: any) {
  console.log("Triggering escalation for:", alertData)

  // Simulate escalation trigger logic
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Determine escalation path based on platform and severity
  const escalationPath = determineEscalationPath(alertData.platform, alertData.severity, alertData.issueType)

  // Send initial notifications
  const notificationResults = await sendLevelNotifications(escalationPath[0], alertData)

  return NextResponse.json({
    success: true,
    escalationId: `esc_${Date.now()}`,
    escalationPath,
    initialLevel: escalationPath[0],
    notificationResults,
    timestamp: new Date().toISOString(),
  })
}

async function acknowledgeAlert(eventId: string, acknowledgedBy: string) {
  console.log(`Alert ${eventId} acknowledged by ${acknowledgedBy}`)

  // Simulate acknowledgment logic
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json({
    success: true,
    eventId,
    acknowledgedBy,
    acknowledgedAt: new Date().toISOString(),
    status: "acknowledged",
  })
}

async function escalateToNextLevel(eventId: string) {
  console.log(`Escalating event ${eventId} to next level`)

  // Simulate escalation logic
  await new Promise((resolve) => setTimeout(resolve, 1500))

  return NextResponse.json({
    success: true,
    eventId,
    escalatedAt: new Date().toISOString(),
    newLevel: "level-2", // This would be determined dynamically
    status: "escalated",
  })
}

async function resolveAlert(eventId: string, resolution: string) {
  console.log(`Resolving event ${eventId}: ${resolution}`)

  // Simulate resolution logic
  await new Promise((resolve) => setTimeout(resolve, 800))

  return NextResponse.json({
    success: true,
    eventId,
    resolution,
    resolvedAt: new Date().toISOString(),
    status: "resolved",
  })
}

async function testEscalationLevel(levelId: string) {
  console.log(`Testing escalation level ${levelId}`)

  // Simulate testing all notification channels for the level
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const testResults = {
    email: Math.random() > 0.1, // 90% success rate
    sms: Math.random() > 0.15, // 85% success rate
    slack: Math.random() > 0.05, // 95% success rate
    phone: Math.random() > 0.2, // 80% success rate
  }

  return NextResponse.json({
    success: true,
    levelId,
    testResults,
    overallSuccess: Object.values(testResults).every((result) => result),
    testedAt: new Date().toISOString(),
  })
}

function determineEscalationPath(platform: string, severity: string, issueType: string): string[] {
  // Platform and severity-specific escalation paths
  const escalationMatrix = {
    Instagram: {
      critical: ["level-1", "level-2", "level-3"],
      emergency: ["level-1", "level-2", "level-3", "level-4"],
      warning: ["level-1"],
    },
    TikTok: {
      critical: ["level-1", "level-2", "level-3"],
      emergency: ["level-1", "level-2", "level-3", "level-4"],
      warning: ["level-1"],
    },
    "Twitter/X": {
      critical: ["level-1", "level-2"],
      emergency: ["level-1", "level-2", "level-3"],
      warning: ["level-1"],
    },
    YouTube: {
      critical: ["level-1", "level-2", "level-3"],
      emergency: ["level-1", "level-2", "level-3", "level-4"],
      warning: ["level-1"],
    },
  }

  const platformMatrix = escalationMatrix[platform as keyof typeof escalationMatrix]
  if (!platformMatrix) {
    return ["level-1", "level-2"] // Default path
  }

  return platformMatrix[severity as keyof typeof platformMatrix] || ["level-1"]
}

// Fix the notification results type issue
async function sendLevelNotifications(levelId: string, alertData: any) {
  console.log(`Sending notifications for level ${levelId}`)

  // Simulate sending notifications through various channels
  const channels = ["email", "slack", "sms"]
  const results: Record<string, any> = {}

  for (const channel of channels) {
    await new Promise((resolve) => setTimeout(resolve, 200))
    results[channel] = {
      success: Math.random() > 0.1, // 90% success rate
      sentAt: new Date().toISOString(),
      recipients: Math.floor(Math.random() * 3) + 1,
    }
  }

  return results
}

// GET endpoint for retrieving escalation status
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const eventId = searchParams.get("eventId")

  if (eventId) {
    // Return specific event status
    return NextResponse.json({
      eventId,
      status: "active",
      currentLevel: 1,
      escalationPath: ["level-1", "level-2", "level-3"],
      startTime: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      lastUpdate: new Date().toISOString(),
    })
  }

  // Return overall escalation system status
  return NextResponse.json({
    systemStatus: "active",
    activeEscalations: 3,
    totalLevels: 4,
    avgResponseTime: "3.2 minutes",
    successRate: "94.7%",
    lastUpdate: new Date().toISOString(),
  })
}
