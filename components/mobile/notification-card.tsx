"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Users, Activity, Settings, Eye, X } from "lucide-react"

interface MobileNotificationCardProps {
  notification: {
    id: string
    type: "alert" | "system" | "team" | "maintenance"
    title: string
    message: string
    timestamp: Date
    read: boolean
    priority: "low" | "medium" | "high"
    actionRequired: boolean
  }
  onMarkRead?: (notificationId: string) => void
  onDelete?: (notificationId: string) => void
  isDarkMode?: boolean
}

export function MobileNotificationCard({
  notification,
  onMarkRead,
  onDelete,
  isDarkMode = false,
}: MobileNotificationCardProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "team":
        return <Users className="h-4 w-4 text-blue-500" />
      case "system":
        return <Activity className="h-4 w-4 text-green-500" />
      case "maintenance":
        return <Settings className="h-4 w-4 text-orange-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const timeAgo = Math.floor((Date.now() - notification.timestamp.getTime()) / (1000 * 60))

  return (
    <Card
      className={`border-2 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} ${!notification.read ? "border-blue-300" : ""}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              {getTypeIcon(notification.type)}
              <span className="font-semibold text-sm">{notification.title}</span>
              {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
            </div>
            <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"} mb-2`}>{notification.message}</p>
            <div className="flex items-center justify-between">
              <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                {timeAgo === 0 ? "Just now" : `${timeAgo}m ago`}
              </span>
              <Badge className={getPriorityColor(notification.priority)}>{notification.priority.toUpperCase()}</Badge>
            </div>
          </div>
          <div className="flex flex-col gap-1 ml-2">
            {!notification.read && (
              <Button size="sm" variant="outline" onClick={() => onMarkRead?.(notification.id)}>
                <Eye className="h-3 w-3" />
              </Button>
            )}
            <Button size="sm" variant="outline" onClick={() => onDelete?.(notification.id)}>
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
        {notification.actionRequired && (
          <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded">
            <span className="text-sm text-red-800 font-medium">⚡ Action Required</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
