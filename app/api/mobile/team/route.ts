import { NextResponse } from "next/server"

export async function GET() {
  try {
    const teamMembers = [
      {
        id: "team-mobile-1",
        name: "Sarah Johnson",
        role: "DevOps Engineer",
        status: "available",
        location: "New York, US",
        timezone: "EST",
        avatar: "SJ",
        lastSeen: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        phoneNumber: "+1-555-0102",
        email: "sarah.johnson@nexarax.com",
        skills: ["AWS", "Kubernetes", "Docker"],
        currentShift: "Day Shift",
        escalationLevel: 1,
        activeAlerts: 1,
        responseTime: "2.3 minutes",
        availability: {
          monday: "09:00-17:00",
          tuesday: "09:00-17:00",
          wednesday: "09:00-17:00",
          thursday: "09:00-17:00",
          friday: "09:00-17:00",
          saturday: "on-call",
          sunday: "off",
        },
      },
      {
        id: "team-mobile-2",
        name: "Michael Rodriguez",
        role: "Technical Lead",
        status: "busy",
        location: "Madrid, ES",
        timezone: "CET",
        avatar: "MR",
        lastSeen: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
        phoneNumber: "+34-555-0201",
        email: "michael.rodriguez@nexarax.com",
        skills: ["Node.js", "React", "Python"],
        currentShift: "Day Shift",
        escalationLevel: 2,
        activeAlerts: 2,
        responseTime: "1.8 minutes",
        availability: {
          monday: "08:00-18:00",
          tuesday: "08:00-18:00",
          wednesday: "08:00-18:00",
          thursday: "08:00-18:00",
          friday: "08:00-16:00",
          saturday: "on-call",
          sunday: "off",
        },
      },
      {
        id: "team-mobile-3",
        name: "Emma Thompson",
        role: "Engineering Manager",
        status: "offline",
        location: "London, UK",
        timezone: "GMT",
        avatar: "ET",
        lastSeen: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        phoneNumber: "+44-555-0301",
        email: "emma.thompson@nexarax.com",
        skills: ["Management", "Strategy", "Architecture"],
        currentShift: "Off Duty",
        escalationLevel: 3,
        activeAlerts: 0,
        responseTime: "5.2 minutes",
        availability: {
          monday: "09:00-18:00",
          tuesday: "09:00-18:00",
          wednesday: "09:00-18:00",
          thursday: "09:00-18:00",
          friday: "09:00-17:00",
          saturday: "emergency-only",
          sunday: "off",
        },
      },
      {
        id: "team-mobile-4",
        name: "David Kim",
        role: "CTO",
        status: "available",
        location: "Seoul, KR",
        timezone: "KST",
        avatar: "DK",
        lastSeen: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
        phoneNumber: "+82-555-0401",
        email: "david.kim@nexarax.com",
        skills: ["Leadership", "AI/ML", "Cloud Architecture"],
        currentShift: "Executive",
        escalationLevel: 4,
        activeAlerts: 0,
        responseTime: "3.1 minutes",
        availability: {
          monday: "24/7",
          tuesday: "24/7",
          wednesday: "24/7",
          thursday: "24/7",
          friday: "24/7",
          saturday: "24/7",
          sunday: "24/7",
        },
      },
    ]

    const teamStats = {
      totalMembers: teamMembers.length,
      available: teamMembers.filter((m) => m.status === "available").length,
      busy: teamMembers.filter((m) => m.status === "busy").length,
      offline: teamMembers.filter((m) => m.status === "offline").length,
      onCall: teamMembers.filter((m) => m.status === "on-call").length,
      avgResponseTime: "2.9 minutes",
      totalActiveAlerts: teamMembers.reduce((sum, m) => sum + m.activeAlerts, 0),
    }

    return NextResponse.json({
      success: true,
      teamMembers,
      stats: teamStats,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch team data" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { action, memberId, userId } = await request.json()

    switch (action) {
      case "call":
        return NextResponse.json({
          success: true,
          message: `Initiating call to ${memberId}`,
          callId: `call_${Date.now()}`,
          timestamp: new Date().toISOString(),
        })

      case "message":
        return NextResponse.json({
          success: true,
          message: `Message sent to ${memberId}`,
          messageId: `msg_${Date.now()}`,
          timestamp: new Date().toISOString(),
        })

      case "update_status":
        return NextResponse.json({
          success: true,
          message: `Status updated for ${memberId}`,
          timestamp: new Date().toISOString(),
        })

      default:
        throw new Error(`Unknown action: ${action}`)
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to process team action" }, { status: 500 })
  }
}
