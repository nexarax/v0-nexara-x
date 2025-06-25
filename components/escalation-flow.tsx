"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  User,
  UserCheck,
  Users,
  Crown,
  ArrowRight,
  Clock,
  CheckCircle,
  Phone,
  Mail,
  MessageSquare,
  AlertTriangle,
  Play,
  Pause,
  RotateCcw,
  Activity,
  Timer,
  Bell,
  Zap,
} from "lucide-react"
import type { JSX } from "react/jsx-runtime"

interface EscalationFlowProps {
  platform: string
  severity: "warning" | "critical" | "emergency"
  issueType: string
  currentLevel?: number
  isActive?: boolean
  onLevelChange?: (level: number) => void
  onStatusChange?: (status: string) => void
  autoProgress?: boolean
}

interface EscalationLevel {
  id: string
  name: string
  icon: JSX.Element
  delay: number
  maxWait: number
  contacts: string[]
  channels: string[]
  description: string
  priority: "low" | "medium" | "high" | "critical"
}

export function EscalationFlow({
  platform,
  severity,
  issueType,
  currentLevel = 0,
  isActive = false,
  onLevelChange,
  onStatusChange,
  autoProgress = false,
}: EscalationFlowProps) {
  const [activeLevel, setActiveLevel] = useState(currentLevel)
  const [status, setStatus] = useState<"pending" | "active" | "acknowledged" | "escalated" | "resolved">("pending")
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isRunning, setIsRunning] = useState(isActive)
  const [levelHistory, setLevelHistory] = useState<
    Array<{
      level: number
      startTime: Date
      acknowledgedAt?: Date
      escalatedAt?: Date
      resolvedAt?: Date
    }>
  >([])

  const escalationLevels: EscalationLevel[] = [
    {
      id: "level-1",
      name: "L1 - Technical Response",
      icon: <User className="h-5 w-5 text-blue-600" />,
      delay: 0,
      maxWait: 15,
      contacts: ["Alex Chen", "Sarah Johnson"],
      channels: ["email", "slack"],
      description: "Immediate technical response team",
      priority: "high",
    },
    {
      id: "level-2",
      name: "L2 - Team Lead",
      icon: <UserCheck className="h-5 w-5 text-green-600" />,
      delay: 15,
      maxWait: 30,
      contacts: ["Michael Rodriguez"],
      channels: ["email", "sms", "slack"],
      description: "Technical leadership escalation",
      priority: "high",
    },
    {
      id: "level-3",
      name: "L3 - Management",
      icon: <Users className="h-5 w-5 text-orange-600" />,
      delay: 45,
      maxWait: 60,
      contacts: ["Emma Thompson"],
      channels: ["email", "sms", "phone"],
      description: "Management team involvement",
      priority: "critical",
    },
    {
      id: "level-4",
      name: "L4 - Executive",
      icon: <Crown className="h-5 w-5 text-purple-600" />,
      delay: 90,
      maxWait: 120,
      contacts: ["David Kim"],
      channels: ["phone", "sms"],
      description: "C-level executive escalation",
      priority: "critical",
    },
  ]

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning && status === "active") {
      interval = setInterval(() => {
        setTimeElapsed((prev) => {
          const newTime = prev + 1

          // Auto-escalate if enabled and time exceeded
          if (autoProgress) {
            const currentLevelData = relevantLevels[activeLevel]
            if (currentLevelData && newTime >= currentLevelData.maxWait * 60) {
              handleEscalate()
            }
          }

          return newTime
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, status, activeLevel, autoProgress])

  // Initialize level history
  useEffect(() => {
    if (isActive && levelHistory.length === 0) {
      setLevelHistory([
        {
          level: 0,
          startTime: new Date(),
        },
      ])
      setStatus("active")
      setIsRunning(true)
    }
  }, [isActive])

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "email":
        return <Mail className="h-3 w-3 text-blue-500" />
      case "sms":
        return <MessageSquare className="h-3 w-3 text-green-500" />
      case "phone":
        return <Phone className="h-3 w-3 text-red-500" />
      case "slack":
        return <MessageSquare className="h-3 w-3 text-purple-500" />
      default:
        return <Bell className="h-3 w-3 text-gray-500" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "critical":
        return "bg-red-100 text-red-800 border-red-300"
      case "emergency":
        return "bg-purple-100 text-purple-800 border-purple-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-gray-100 text-gray-800"
      case "active":
        return "bg-blue-100 text-blue-800"
      case "acknowledged":
        return "bg-green-100 text-green-800"
      case "escalated":
        return "bg-orange-100 text-orange-800"
      case "resolved":
        return "bg-emerald-100 text-emerald-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getMaxLevels = () => {
    switch (severity) {
      case "warning":
        return 1
      case "critical":
        return 3
      case "emergency":
        return 4
      default:
        return 2
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleStart = () => {
    setIsRunning(true)
    setStatus("active")
    setTimeElapsed(0)
    setLevelHistory([
      {
        level: activeLevel,
        startTime: new Date(),
      },
    ])
    onStatusChange?.("active")
  }

  const handlePause = () => {
    setIsRunning(false)
    onStatusChange?.("paused")
  }

  const handleAcknowledge = () => {
    setStatus("acknowledged")
    setIsRunning(false)

    setLevelHistory((prev) =>
      prev.map((h, index) => (index === activeLevel ? { ...h, acknowledgedAt: new Date() } : h)),
    )

    onStatusChange?.("acknowledged")
  }

  const handleEscalate = () => {
    if (activeLevel < maxLevels - 1) {
      const newLevel = activeLevel + 1

      setLevelHistory((prev) => [
        ...prev.map((h, index) => (index === activeLevel ? { ...h, escalatedAt: new Date() } : h)),
        {
          level: newLevel,
          startTime: new Date(),
        },
      ])

      setActiveLevel(newLevel)
      setStatus("escalated")
      setTimeElapsed(0)
      setIsRunning(true)

      onLevelChange?.(newLevel)
      onStatusChange?.("escalated")
    }
  }

  const handleResolve = () => {
    setStatus("resolved")
    setIsRunning(false)

    setLevelHistory((prev) => prev.map((h, index) => (index === activeLevel ? { ...h, resolvedAt: new Date() } : h)))

    onStatusChange?.("resolved")
  }

  const handleReset = () => {
    setActiveLevel(0)
    setStatus("pending")
    setTimeElapsed(0)
    setIsRunning(false)
    setLevelHistory([])
    onLevelChange?.(0)
    onStatusChange?.("reset")
  }

  const maxLevels = getMaxLevels()
  const relevantLevels = escalationLevels.slice(0, maxLevels)
  const currentLevelData = relevantLevels[activeLevel]

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-blue-600" />
            Escalation Flow: {platform}
          </CardTitle>
          <div className="flex gap-2">
            <Badge className={getSeverityColor(severity)}>{severity.toUpperCase()}</Badge>
            <Badge className={getStatusColor(status)}>{status.toUpperCase()}</Badge>
            <Badge variant="outline">{issueType.replace(/_/g, " ")}</Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Control Panel */}
        <Card className="border-2 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Timer className="h-5 w-5 text-blue-600" />
                  <span className="text-2xl font-mono font-bold">{formatTime(timeElapsed)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-orange-500" />
                  <span className="text-sm text-gray-600">
                    Level {activeLevel + 1} of {maxLevels}
                  </span>
                </div>

                {currentLevelData && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Max: {currentLevelData.maxWait}m</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                {status === "pending" && (
                  <Button onClick={handleStart} size="sm" className="bg-green-600 hover:bg-green-700">
                    <Play className="h-4 w-4 mr-2" />
                    Start
                  </Button>
                )}

                {status === "active" && (
                  <>
                    <Button onClick={handlePause} size="sm" variant="outline">
                      <Pause className="h-4 w-4 mr-2" />
                      Pause
                    </Button>
                    <Button onClick={handleAcknowledge} size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Acknowledge
                    </Button>
                  </>
                )}

                {(status === "acknowledged" || status === "escalated") && (
                  <>
                    <Button
                      onClick={handleEscalate}
                      size="sm"
                      variant="outline"
                      disabled={activeLevel >= maxLevels - 1}
                    >
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Escalate
                    </Button>
                    <Button onClick={handleResolve} size="sm" className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Resolve
                    </Button>
                  </>
                )}

                <Button onClick={handleReset} size="sm" variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Escalation Levels */}
        <div className="space-y-4">
          {relevantLevels.map((level, index) => {
            const isCurrentLevel = index === activeLevel
            const isPastLevel = index < activeLevel
            const isFutureLevel = index > activeLevel
            const levelHistoryEntry = levelHistory.find((h) => h.level === index)

            return (
              <div key={level.id} className="relative">
                {index < relevantLevels.length - 1 && (
                  <div className="absolute left-6 top-20 w-0.5 h-12 bg-gray-300"></div>
                )}

                <div
                  className={`flex items-start gap-4 p-6 rounded-lg border-2 transition-all duration-300 ${
                    isCurrentLevel && status === "active"
                      ? "border-blue-500 bg-blue-50 shadow-lg"
                      : isCurrentLevel && status === "acknowledged"
                        ? "border-green-500 bg-green-50 shadow-lg"
                        : isPastLevel
                          ? "border-green-300 bg-green-50"
                          : isFutureLevel
                            ? "border-gray-200 bg-gray-50"
                            : "border-gray-200 bg-white"
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                      isCurrentLevel && status === "active"
                        ? "bg-blue-500 text-white animate-pulse"
                        : isCurrentLevel && status === "acknowledged"
                          ? "bg-green-500 text-white"
                          : isPastLevel
                            ? "bg-green-500 text-white"
                            : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {isPastLevel || (isCurrentLevel && status === "resolved") ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : isCurrentLevel && status === "active" ? (
                      <AlertTriangle className="h-6 w-6 animate-bounce" />
                    ) : (
                      level.icon
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-lg">{level.name}</h3>
                      <div className="flex items-center gap-3">
                        <Badge
                          className={`${level.priority === "critical" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"}`}
                        >
                          {level.priority.toUpperCase()}
                        </Badge>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          {level.delay === 0 ? "Immediate" : `${level.delay} min`}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{level.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-semibold mb-3 text-gray-700">Contacts</h4>
                        <div className="space-y-2">
                          {level.contacts.map((contact) => (
                            <div key={contact} className="flex items-center gap-2 text-sm">
                              <User className="h-3 w-3 text-gray-500" />
                              <span>{contact}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold mb-3 text-gray-700">Notification Channels</h4>
                        <div className="flex flex-wrap gap-2">
                          {level.channels.map((channel) => (
                            <div
                              key={channel}
                              className="flex items-center gap-2 px-3 py-1 bg-white rounded-full border text-xs font-medium"
                            >
                              {getChannelIcon(channel)}
                              <span className="capitalize">{channel}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Level History */}
                    {levelHistoryEntry && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <h5 className="text-xs font-semibold text-gray-600 mb-2">Timeline</h5>
                        <div className="space-y-1 text-xs text-gray-600">
                          <div>Started: {levelHistoryEntry.startTime.toLocaleTimeString()}</div>
                          {levelHistoryEntry.acknowledgedAt && (
                            <div className="text-green-600">
                              ✓ Acknowledged: {levelHistoryEntry.acknowledgedAt.toLocaleTimeString()}
                            </div>
                          )}
                          {levelHistoryEntry.escalatedAt && (
                            <div className="text-orange-600">
                              ↗ Escalated: {levelHistoryEntry.escalatedAt.toLocaleTimeString()}
                            </div>
                          )}
                          {levelHistoryEntry.resolvedAt && (
                            <div className="text-green-600">
                              ✅ Resolved: {levelHistoryEntry.resolvedAt.toLocaleTimeString()}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Progress Bar */}
                    {isCurrentLevel && status === "active" && (
                      <div className="mt-4">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Time Elapsed</span>
                          <span>
                            {Math.floor(timeElapsed / 60)}m {timeElapsed % 60}s / {level.maxWait}m
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-1000 ${
                              timeElapsed >= level.maxWait * 60
                                ? "bg-red-500"
                                : timeElapsed >= level.maxWait * 60 * 0.8
                                  ? "bg-orange-500"
                                  : "bg-blue-500"
                            }`}
                            style={{
                              width: `${Math.min((timeElapsed / (level.maxWait * 60)) * 100, 100)}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Summary */}
        <Card className="border-2 border-gray-200">
          <CardContent className="p-4">
            <h4 className="font-semibold mb-3">Escalation Summary</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">Total Levels:</span>
                <span className="font-medium">{maxLevels}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">Max Time:</span>
                <span className="font-medium">{relevantLevels[relevantLevels.length - 1]?.maxWait || 0} min</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">Current Status:</span>
                <span className="font-medium capitalize">{status}</span>
              </div>
              <div className="flex items-center gap-2">
                <Timer className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">Elapsed:</span>
                <span className="font-medium">{formatTime(timeElapsed)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}
