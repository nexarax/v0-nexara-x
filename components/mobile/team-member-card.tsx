"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Phone, MessageSquare, MapPin, Clock, AlertTriangle } from "lucide-react"

interface MobileTeamMemberCardProps {
  member: {
    id: string
    name: string
    role: string
    status: "available" | "busy" | "offline" | "on-call"
    location: string
    avatar: string
    lastSeen: Date
    phoneNumber: string
    activeAlerts: number
    responseTime: string
  }
  onCall?: (phoneNumber: string) => void
  onMessage?: (memberId: string) => void
  isDarkMode?: boolean
}

export function MobileTeamMemberCard({ member, onCall, onMessage, isDarkMode = false }: MobileTeamMemberCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800"
      case "busy":
        return "bg-yellow-100 text-yellow-800"
      case "offline":
        return "bg-gray-100 text-gray-800"
      case "on-call":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const timeAgo = Math.floor((Date.now() - member.lastSeen.getTime()) / (1000 * 60))

  return (
    <Card className={`border-2 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {member.avatar}
            </div>
            <div>
              <h3 className="font-semibold text-sm">{member.name}</h3>
              <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{member.role}</p>
            </div>
          </div>
          <div className="text-right">
            <Badge className={getStatusColor(member.status)}>{member.status.toUpperCase()}</Badge>
            {member.activeAlerts > 0 && (
              <div className="flex items-center gap-1 mt-1">
                <AlertTriangle className="h-3 w-3 text-orange-500" />
                <span className="text-xs text-orange-600">{member.activeAlerts} alerts</span>
              </div>
            )}
          </div>
        </div>

        {/* Member Details */}
        <div className="space-y-1 mb-3">
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3 text-gray-500" />
            <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{member.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-gray-500" />
            <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              {timeAgo === 0 ? "Online now" : `${timeAgo}m ago`}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              Avg response: {member.responseTime}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() => onCall?.(member.phoneNumber)}
            className="bg-green-600 hover:bg-green-700 flex-1"
          >
            <Phone className="h-3 w-3 mr-1" />
            Call
          </Button>
          <Button size="sm" variant="outline" onClick={() => onMessage?.(member.id)} className="flex-1">
            <MessageSquare className="h-3 w-3 mr-1" />
            Message
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
