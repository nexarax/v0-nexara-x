import { NextResponse } from "next/server"

interface ServiceStatus {
  id: string
  name: string
  status: "operational" | "degraded" | "partial_outage" | "major_outage" | "maintenance"
  uptime: number
  responseTime: number
  lastChecked: string
}

interface StatusResponse {
  page: {
    id: string
    name: string
    url: string
    timeZone: string
    updatedAt: string
  }
  status: {
    indicator: "none" | "minor" | "major" | "critical"
    description: string
  }
  components: ServiceStatus[]
  incidents: any[]
  scheduledMaintenances: any[]
}

export async function GET() {
  try {
    // This would typically fetch from your monitoring database
    const services: ServiceStatus[] = [
      {
        id: "ai-content-generation",
        name: "AI Content Generation",
        status: "operational",
        uptime: 99.97,
        responseTime: 1.2,
        lastChecked: new Date().toISOString(),
      },
      {
        id: "instagram-integration",
        name: "Instagram Integration",
        status: "operational",
        uptime: 99.94,
        responseTime: 0.8,
        lastChecked: new Date().toISOString(),
      },
      {
        id: "tiktok-integration",
        name: "TikTok Integration",
        status: "degraded",
        uptime: 98.76,
        responseTime: 2.1,
        lastChecked: new Date().toISOString(),
      },
      {
        id: "twitter-integration",
        name: "Twitter/X Integration",
        status: "operational",
        uptime: 99.89,
        responseTime: 1.1,
        lastChecked: new Date().toISOString(),
      },
      {
        id: "youtube-integration",
        name: "YouTube Integration",
        status: "operational",
        uptime: 99.92,
        responseTime: 1.5,
        lastChecked: new Date().toISOString(),
      },
      {
        id: "analytics-dashboard",
        name: "Analytics Dashboard",
        status: "operational",
        uptime: 99.98,
        responseTime: 0.6,
        lastChecked: new Date().toISOString(),
      },
      {
        id: "user-authentication",
        name: "User Authentication",
        status: "operational",
        uptime: 99.99,
        responseTime: 0.4,
        lastChecked: new Date().toISOString(),
      },
      {
        id: "api-services",
        name: "API Services",
        status: "operational",
        uptime: 99.95,
        responseTime: 0.9,
        lastChecked: new Date().toISOString(),
      },
    ]

    // Determine overall status
    const hasOutage = services.some((s) => s.status === "major_outage" || s.status === "partial_outage")
    const hasDegraded = services.some((s) => s.status === "degraded")

    let overallStatus: "none" | "minor" | "major" | "critical" = "none"
    let description = "All systems operational"

    if (hasOutage) {
      overallStatus = "major"
      description = "Service disruption in progress"
    } else if (hasDegraded) {
      overallStatus = "minor"
      description = "Some systems experiencing issues"
    }

    const response: StatusResponse = {
      page: {
        id: "nexarax-status",
        name: "NexaraX Status",
        url: "https://status.nexarax.com",
        timeZone: "Europe/London",
        updatedAt: new Date().toISOString(),
      },
      status: {
        indicator: overallStatus,
        description,
      },
      components: services,
      incidents: [], // Would fetch from incidents database
      scheduledMaintenances: [], // Would fetch from maintenance database
    }

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch status" }, { status: 500 })
  }
}
