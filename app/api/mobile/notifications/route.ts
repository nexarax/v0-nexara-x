import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const unreadOnly = searchParams.get("unread") === "true"

  try {
    const notifications = [
      {
        id: "mobile-notif-1",
        type: "alert",
        title: "Critical Alert",
        message: "TikTok authentication token expires in 45 minutes",
        timestamp: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
        read: false,
        priority: "high",
        actionRequired: true,
        deepLink: "/alerts/mobile-alert-2",
        icon: "alert-triangle",
        category: "system",
      },
      {
        id: "mobile-notif-2",
        type: "team",
        title: "Team Update",
        message: "Sarah Johnson acknowledged YouTube upload issue",
        timestamp: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
        read: false,
        priority: "medium",
        actionRequired: false,
        deepLink: "/team/sarah-johnson",
        icon: "users",
        category: "team",
      },
      {
        id: "mobile-notif-3",
        type: "system",
        title: "System Update",
        message: "Predictive AI prevented Instagram outage",
        timestamp: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
        read: false,
        priority: "low",
        actionRequired: false,
        deepLink: "/predictive-ai",
        icon: "brain",
        category: "ai",
      },
      {
        id: "mobile-notif-4",
        type: "maintenance",
        title: "Scheduled Maintenance",
        message: "Infrastructure upgrade scheduled for tomorrow 2 AM GMT",
        timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
        read: true,
        priority: "medium",
        actionRequired: false,
        deepLink: "/maintenance",
        icon: "settings",
        category: "maintenance",
      },
    ]

    let filteredNotifications = notifications

    if (unreadOnly) {
      filteredNotifications = filteredNotifications.filter((notif) => !notif.read)
    }

    const unreadCount = notifications.filter((notif) => !notif.read).length

    return NextResponse.json({
      success: true,
      notifications: filteredNotifications,
      unreadCount,
      total: filteredNotifications.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { action, notificationId, userId } = await request.json()

    switch (action) {
      case "mark_read":
        return NextResponse.json({
          success: true,
          message: `Notification ${notificationId} marked as read`,
          timestamp: new Date().toISOString(),
        })

      case "mark_all_read":
        return NextResponse.json({
          success: true,
          message: "All notifications marked as read",
          timestamp: new Date().toISOString(),
        })

      case "delete":
        return NextResponse.json({
          success: true,
          message: `Notification ${notificationId} deleted`,
          timestamp: new Date().toISOString(),
        })

      default:
        throw new Error(`Unknown action: ${action}`)
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to process notification action" }, { status: 500 })
  }
}
