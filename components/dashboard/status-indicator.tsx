"use client"

import { CheckCircle, AlertTriangle, XCircle, Clock, WifiOff } from "lucide-react"

interface StatusIndicatorProps {
  status: "healthy" | "warning" | "critical" | "down" | "unknown"
  size?: "sm" | "md" | "lg"
  showText?: boolean
  animated?: boolean
}

export function StatusIndicator({ status, size = "md", showText = true, animated = false }: StatusIndicatorProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "healthy":
        return {
          icon: CheckCircle,
          color: "text-green-500",
          bgColor: "bg-green-100",
          text: "Healthy",
          pulse: false,
        }
      case "warning":
        return {
          icon: AlertTriangle,
          color: "text-yellow-500",
          bgColor: "bg-yellow-100",
          text: "Warning",
          pulse: true,
        }
      case "critical":
        return {
          icon: XCircle,
          color: "text-red-500",
          bgColor: "bg-red-100",
          text: "Critical",
          pulse: true,
        }
      case "down":
        return {
          icon: WifiOff,
          color: "text-gray-500",
          bgColor: "bg-gray-100",
          text: "Down",
          pulse: false,
        }
      default:
        return {
          icon: Clock,
          color: "text-gray-400",
          bgColor: "bg-gray-50",
          text: "Unknown",
          pulse: false,
        }
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "h-4 w-4"
      case "lg":
        return "h-8 w-8"
      default:
        return "h-6 w-6"
    }
  }

  const config = getStatusConfig()
  const Icon = config.icon

  return (
    <div className="flex items-center gap-2">
      <div className={`${config.bgColor} p-1 rounded-full`}>
        <Icon className={`${getSizeClasses()} ${config.color} ${animated && config.pulse ? "animate-pulse" : ""}`} />
      </div>
      {showText && <span className={`text-sm font-medium ${config.color}`}>{config.text}</span>}
    </div>
  )
}
