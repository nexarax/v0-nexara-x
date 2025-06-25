"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowUp, MapPin, User, Clock, Users, Share2, Instagram, Twitter, Youtube } from "lucide-react"

interface MobileAlertCardProps {
  alert: {
    id: string
    title: string
    platform: string
    severity: "low" | "medium" | "high" | "critical"
    timestamp: Date
    status: "active" | "acknowledged" | "resolved"
    location?: string
    assignedTo?: string
    description: string
    quickActions: string[]
    affectedUsers?: number
    estimatedResolution?: string
  }
  onAcknowledge?: (alertId: string) => void
  onEscalate?: (alertId: string) => void
  onResolve?: (alertId: string) => void
  isDarkMode?: boolean
}

export function MobileAlertCard({
  alert,
  onAcknowledge,
  onEscalate,
  onResolve,
  isDarkMode = false,
}: MobileAlertCardProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-300"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-300"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "bg-green-100 text-green-800"
      case "acknowledged":
        return "bg-yellow-100 text-yellow-800"
      case "active":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const platformIcons = {
    Instagram: <Instagram className="h-4 w-4 text-pink-600" />,
    TikTok: (
      <div className="h-4 w-4 bg-black rounded-sm flex items-center justify-center text-white text-xs font-bold">T</div>
    ),
    "Twitter/X": <Twitter className="h-4 w-4 text-blue-500" />,
    YouTube: <Youtube className="h-4 w-4 text-red-600" />,
  }

  const timeAgo = Math.floor((Date.now() - alert.timestamp.getTime()) / (1000 * 60))

  return (
    <Card className={`border-2 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            {platformIcons[alert.platform as keyof typeof platformIcons]}
            <span className="font-medium">{alert.platform}</span>
            <Badge className={getSeverityColor(alert.severity)}>{alert.severity.toUpperCase()}</Badge>
            <Badge className={getStatusColor(alert.status)}>{alert.status.toUpperCase()}</Badge>
          </div>
          <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{timeAgo}m ago</span>
        </div>

        {/* Title and Description */}
        <h3 className="font-semibold mb-2 text-sm">{alert.title}</h3>
        <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"} mb-3`}>{alert.description}</p>

        {/* Metadata */}
        <div className="space-y-1 mb-3">
          {alert.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3 text-gray-500" />
              <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{alert.location}</span>
            </div>
          )}
          {alert.assignedTo && (
            <div className="flex items-center gap-1">
              <User className="h-3 w-3 text-blue-500" />
              <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                Assigned to {alert.assignedTo}
              </span>
            </div>
          )}
          {alert.affectedUsers && (
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3 text-orange-500" />
              <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                {alert.affectedUsers.toLocaleString()} users affected
              </span>
            </div>
          )}
          {alert.estimatedResolution && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-purple-500" />
              <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                ETA: {alert.estimatedResolution}
              </span>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-1 mb-3">
          {alert.quickActions.slice(0, 3).map((action, index) => (
            <Button key={index} variant="outline" size="sm" className="text-xs h-6 px-2">
              {action}
            </Button>
          ))}
          {alert.quickActions.length > 3 && (
            <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"} self-center`}>
              +{alert.quickActions.length - 3} more
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {alert.status === "active" && (
            <>
              <Button size="sm" onClick={() => onAcknowledge?.(alert.id)} className="bg-blue-600 text-xs flex-1">
                <CheckCircle className="h-3 w-3 mr-1" />
                ACK
              </Button>
              <Button size="sm" variant="outline" onClick={() => onEscalate?.(alert.id)} className="text-xs">
                <ArrowUp className="h-3 w-3 mr-1" />
                Escalate
              </Button>
            </>
          )}
          {alert.status === "acknowledged" && (
            <Button size="sm" onClick={() => onResolve?.(alert.id)} className="bg-green-600 text-xs flex-1">
              <CheckCircle className="h-3 w-3 mr-1" />
              Resolve
            </Button>
          )}
          <Button size="sm" variant="outline" className="text-xs">
            <Share2 className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
