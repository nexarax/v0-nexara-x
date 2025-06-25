import { type NextRequest, NextResponse } from "next/server"

interface Incident {
  id: string
  title: string
  description: string
  status: "investigating" | "identified" | "monitoring" | "resolved"
  severity: "minor" | "major" | "critical"
  startTime: string
  resolvedTime?: string
  affectedServices: string[]
  updates: IncidentUpdate[]
}

interface IncidentUpdate {
  id: string
  timestamp: string
  status: string
  message: string
  author: string
}

export async function GET() {
  try {
    // In a real application, this would fetch from your incidents database
    const incidents: Incident[] = [
      {
        id: "inc-001",
        title: "TikTok API Rate Limiting Issues",
        description: "Users experiencing slower response times when posting to TikTok due to API rate limiting.",
        status: "monitoring",
        severity: "minor",
        startTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        affectedServices: ["tiktok-integration"],
        updates: [
          {
            id: "upd-001",
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            status: "investigating",
            message: "We are investigating reports of slower TikTok posting times.",
            author: "Engineering Team",
          },
          {
            id: "upd-002",
            timestamp: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
            status: "identified",
            message:
              "We have identified the issue as TikTok API rate limiting. Implementing retry logic and queue optimization.",
            author: "Engineering Team",
          },
          {
            id: "upd-003",
            timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
            status: "monitoring",
            message: "Fix has been deployed. We are monitoring the system for improvements in response times.",
            author: "Engineering Team",
          },
        ],
      },
    ]

    return NextResponse.json({
      success: true,
      incidents,
      total: incidents.length,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch incidents" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, description, severity, affectedServices } = await request.json()

    if (!title || !description || !severity || !affectedServices) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In a real application, you would:
    // 1. Validate the input
    // 2. Store the incident in your database
    // 3. Send notifications to subscribers
    // 4. Update service statuses

    const incident: Incident = {
      id: `inc_${Date.now()}`,
      title,
      description,
      status: "investigating",
      severity,
      startTime: new Date().toISOString(),
      affectedServices,
      updates: [
        {
          id: `upd_${Date.now()}`,
          timestamp: new Date().toISOString(),
          status: "investigating",
          message: `We are investigating reports of ${title.toLowerCase()}.`,
          author: "Engineering Team",
        },
      ],
    }

    return NextResponse.json({
      success: true,
      message: "Incident created successfully",
      incident,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create incident" }, { status: 500 })
  }
}
