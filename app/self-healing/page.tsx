"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Instagram,
  Twitter,
  Youtube,
  RefreshCw,
  Shield,
  Zap,
  CheckCircle,
  XCircle,
  Clock,
  Activity,
  Settings,
  AlertTriangle,
  Wrench,
  Target,
  TrendingUp,
  Play,
  Pause,
  Eye,
  Download,
} from "lucide-react"

interface HealingMechanism {
  id: string
  name: string
  platform: string
  issueType: "auth" | "rateLimit" | "connectivity" | "timeout" | "quota" | "server"
  description: string
  strategy: string
  enabled: boolean
  priority: number
  successRate: number
  avgRecoveryTime: number
  lastTriggered?: Date
  totalAttempts: number
  successfulAttempts: number
}

interface RecoveryAttempt {
  id: string
  timestamp: Date
  platform: string
  issueType: string
  mechanism: string
  status: "running" | "success" | "failed" | "timeout"
  duration: number
  details: string
  errorMessage?: string
  retryCount: number
}

interface PlatformHealth {
  platform: string
  status: "healthy" | "recovering" | "degraded" | "down"
  lastIssue?: Date
  activeRecoveries: number
  totalRecoveries: number
  uptime: number
  issues: {
    auth: boolean
    rateLimit: boolean
    connectivity: boolean
    timeout: boolean
  }
}

export default function SelfHealingPage() {
  const [healingMechanisms, setHealingMechanisms] = useState<HealingMechanism[]>([])
  const [recoveryAttempts, setRecoveryAttempts] = useState<RecoveryAttempt[]>([])
  const [platformHealth, setPlatformHealth] = useState<PlatformHealth[]>([])
  const [isSystemActive, setIsSystemActive] = useState(true)
  const [activeRecoveries, setActiveRecoveries] = useState(0)
  const [totalRecoveries, setTotalRecoveries] = useState(0)

  useEffect(() => {
    // Initialize healing mechanisms
    const mechanisms: HealingMechanism[] = [
      // Instagram Healing Mechanisms
      {
        id: "instagram-token-refresh",
        name: "OAuth Token Auto-Refresh",
        platform: "Instagram",
        issueType: "auth",
        description: "Automatically refresh expired OAuth tokens using refresh token",
        strategy: "Token refresh with exponential backoff",
        enabled: true,
        priority: 1,
        successRate: 95,
        avgRecoveryTime: 2.3,
        totalAttempts: 47,
        successfulAttempts: 45,
        lastTriggered: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      },
      {
        id: "instagram-rate-limit-backoff",
        name: "Rate Limit Backoff",
        platform: "Instagram",
        issueType: "rateLimit",
        description: "Implement exponential backoff when rate limits are hit",
        strategy: "Exponential backoff with jitter (1s, 2s, 4s, 8s)",
        enabled: true,
        priority: 2,
        successRate: 88,
        avgRecoveryTime: 45.2,
        totalAttempts: 23,
        successfulAttempts: 20,
        lastTriggered: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      },
      {
        id: "instagram-connection-retry",
        name: "Connection Retry Logic",
        platform: "Instagram",
        issueType: "connectivity",
        description: "Retry failed connections with circuit breaker pattern",
        strategy: "Circuit breaker with 3 retries, 30s timeout",
        enabled: true,
        priority: 3,
        successRate: 92,
        avgRecoveryTime: 8.7,
        totalAttempts: 156,
        successfulAttempts: 143,
        lastTriggered: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      },

      // TikTok Healing Mechanisms
      {
        id: "tiktok-token-refresh",
        name: "TikTok Token Refresh",
        platform: "TikTok",
        issueType: "auth",
        description: "Handle TikTok's 24-hour token expiry with auto-refresh",
        strategy: "Proactive refresh 2 hours before expiry",
        enabled: true,
        priority: 1,
        successRate: 78,
        avgRecoveryTime: 12.4,
        totalAttempts: 89,
        successfulAttempts: 69,
        lastTriggered: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      },
      {
        id: "tiktok-quota-management",
        name: "Daily Quota Management",
        platform: "TikTok",
        issueType: "quota",
        description: "Manage TikTok's strict daily API quotas",
        strategy: "Queue requests and distribute across 24-hour window",
        enabled: true,
        priority: 2,
        successRate: 85,
        avgRecoveryTime: 120.0,
        totalAttempts: 34,
        successfulAttempts: 29,
        lastTriggered: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      },

      // Twitter/X Healing Mechanisms
      {
        id: "twitter-bearer-refresh",
        name: "Bearer Token Validation",
        platform: "Twitter/X",
        issueType: "auth",
        description: "Validate and refresh Twitter Bearer tokens",
        strategy: "Token validation with automatic regeneration",
        enabled: true,
        priority: 1,
        successRate: 97,
        avgRecoveryTime: 1.8,
        totalAttempts: 12,
        successfulAttempts: 12,
        lastTriggered: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
      },
      {
        id: "twitter-rate-limit-smart",
        name: "Smart Rate Limit Handling",
        platform: "Twitter/X",
        issueType: "rateLimit",
        description: "Intelligent rate limit management with request queuing",
        strategy: "Request queuing with priority-based scheduling",
        enabled: true,
        priority: 2,
        successRate: 94,
        avgRecoveryTime: 15.3,
        totalAttempts: 67,
        successfulAttempts: 63,
        lastTriggered: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      },

      // YouTube Healing Mechanisms
      {
        id: "youtube-oauth-refresh",
        name: "YouTube OAuth Management",
        platform: "YouTube",
        issueType: "auth",
        description: "Handle YouTube's complex OAuth refresh flow",
        strategy: "OAuth 2.0 refresh with scope validation",
        enabled: true,
        priority: 1,
        successRate: 89,
        avgRecoveryTime: 5.6,
        totalAttempts: 28,
        successfulAttempts: 25,
        lastTriggered: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      },
      {
        id: "youtube-upload-retry",
        name: "Upload Failure Recovery",
        platform: "YouTube",
        issueType: "server",
        description: "Retry failed video uploads with resumable upload",
        strategy: "Resumable upload with chunk verification",
        enabled: true,
        priority: 3,
        successRate: 76,
        avgRecoveryTime: 180.5,
        totalAttempts: 15,
        successfulAttempts: 11,
        lastTriggered: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      },

      // Universal Healing Mechanisms
      {
        id: "universal-timeout-handler",
        name: "Timeout Recovery",
        platform: "All",
        issueType: "timeout",
        description: "Handle API timeouts with adaptive timeout values",
        strategy: "Adaptive timeout with request retry",
        enabled: true,
        priority: 4,
        successRate: 91,
        avgRecoveryTime: 12.1,
        totalAttempts: 203,
        successfulAttempts: 185,
        lastTriggered: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      },
    ]

    setHealingMechanisms(mechanisms)

    // Initialize platform health
    const health: PlatformHealth[] = [
      {
        platform: "Instagram",
        status: "healthy",
        activeRecoveries: 0,
        totalRecoveries: 112,
        uptime: 99.2,
        issues: { auth: false, rateLimit: false, connectivity: false, timeout: false },
      },
      {
        platform: "TikTok",
        status: "recovering",
        lastIssue: new Date(Date.now() - 10 * 60 * 1000),
        activeRecoveries: 1,
        totalRecoveries: 123,
        uptime: 97.8,
        issues: { auth: true, rateLimit: false, connectivity: false, timeout: false },
      },
      {
        platform: "Twitter/X",
        status: "healthy",
        activeRecoveries: 0,
        totalRecoveries: 79,
        uptime: 99.7,
        issues: { auth: false, rateLimit: false, connectivity: false, timeout: false },
      },
      {
        platform: "YouTube",
        status: "degraded",
        lastIssue: new Date(Date.now() - 2 * 60 * 1000),
        activeRecoveries: 2,
        totalRecoveries: 43,
        uptime: 98.5,
        issues: { auth: false, rateLimit: false, connectivity: true, timeout: true },
      },
    ]

    setPlatformHealth(health)

    // Generate sample recovery attempts
    generateSampleRecoveryAttempts()

    // Calculate totals
    setTotalRecoveries(mechanisms.reduce((sum, m) => sum + m.successfulAttempts, 0))
    setActiveRecoveries(health.reduce((sum, h) => sum + h.activeRecoveries, 0))

    // Start real-time simulation
    const interval = setInterval(() => {
      if (isSystemActive) {
        simulateRecoveryActivity()
      }
    }, 10000) // Every 10 seconds

    return () => clearInterval(interval)
  }, [isSystemActive])

  const generateSampleRecoveryAttempts = () => {
    const attempts: RecoveryAttempt[] = [
      {
        id: "recovery-1",
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        platform: "TikTok",
        issueType: "auth",
        mechanism: "TikTok Token Refresh",
        status: "success",
        duration: 12.4,
        details: "Successfully refreshed OAuth token before expiry",
        retryCount: 1,
      },
      {
        id: "recovery-2",
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        platform: "Instagram",
        issueType: "connectivity",
        mechanism: "Connection Retry Logic",
        status: "success",
        duration: 8.7,
        details: "Recovered from temporary network timeout",
        retryCount: 2,
      },
      {
        id: "recovery-3",
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        platform: "YouTube",
        issueType: "server",
        mechanism: "Upload Failure Recovery",
        status: "failed",
        duration: 180.5,
        details: "Upload retry failed after 3 attempts",
        errorMessage: "Server returned 503 Service Unavailable",
        retryCount: 3,
      },
      {
        id: "recovery-4",
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        platform: "Twitter/X",
        issueType: "rateLimit",
        mechanism: "Smart Rate Limit Handling",
        status: "success",
        duration: 15.3,
        details: "Queued requests and resumed after rate limit reset",
        retryCount: 1,
      },
    ]

    setRecoveryAttempts(attempts)
  }

  const simulateRecoveryActivity = () => {
    // Randomly trigger recovery attempts for demonstration
    if (Math.random() < 0.3) {
      // 30% chance every 10 seconds
      const platforms = ["Instagram", "TikTok", "Twitter/X", "YouTube"]
      const issueTypes = ["auth", "rateLimit", "connectivity", "timeout"]
      const platform = platforms[Math.floor(Math.random() * platforms.length)]
      const issueType = issueTypes[Math.floor(Math.random() * issueTypes.length)]

      triggerRecovery(platform, issueType as any)
    }
  }

  const triggerRecovery = async (platform: string, issueType: string) => {
    const mechanism = healingMechanisms.find((m) => m.platform === platform && m.issueType === issueType)
    if (!mechanism || !mechanism.enabled) return

    const recoveryId = `recovery-${Date.now()}-${Math.random()}`
    const newAttempt: RecoveryAttempt = {
      id: recoveryId,
      timestamp: new Date(),
      platform,
      issueType,
      mechanism: mechanism.name,
      status: "running",
      duration: 0,
      details: `Attempting ${mechanism.strategy}`,
      retryCount: 1,
    }

    setRecoveryAttempts((prev) => [newAttempt, ...prev].slice(0, 20))
    setActiveRecoveries((prev) => prev + 1)

    // Update platform health
    setPlatformHealth((prev) =>
      prev.map((health) =>
        health.platform === platform
          ? {
              ...health,
              status: "recovering" as const,
              activeRecoveries: health.activeRecoveries + 1,
              lastIssue: new Date(),
              issues: { ...health.issues, [issueType]: true },
            }
          : health,
      ),
    )

    // Simulate recovery process
    const recoveryTime = mechanism.avgRecoveryTime * 1000 * (0.5 + Math.random()) // Vary recovery time
    await new Promise((resolve) => setTimeout(resolve, Math.min(recoveryTime, 5000))) // Cap at 5s for demo

    // Determine success based on mechanism success rate
    const success = Math.random() < mechanism.successRate / 100

    const completedAttempt: RecoveryAttempt = {
      ...newAttempt,
      status: success ? "success" : "failed",
      duration: recoveryTime / 1000,
      details: success
        ? `Successfully resolved ${issueType} issue using ${mechanism.strategy}`
        : `Failed to resolve ${issueType} issue - escalating to manual intervention`,
      errorMessage: success ? undefined : "Recovery mechanism failed after maximum retries",
    }

    setRecoveryAttempts((prev) => prev.map((attempt) => (attempt.id === recoveryId ? completedAttempt : attempt)))
    setActiveRecoveries((prev) => prev - 1)

    // Update mechanism stats
    setHealingMechanisms((prev) =>
      prev.map((m) =>
        m.id === mechanism.id
          ? {
              ...m,
              totalAttempts: m.totalAttempts + 1,
              successfulAttempts: success ? m.successfulAttempts + 1 : m.successfulAttempts,
              successRate: Math.round(
                ((success ? m.successfulAttempts + 1 : m.successfulAttempts) / (m.totalAttempts + 1)) * 100,
              ),
              lastTriggered: new Date(),
            }
          : m,
      ),
    )

    // Update platform health
    setPlatformHealth((prev) =>
      prev.map((health) =>
        health.platform === platform
          ? {
              ...health,
              status: success ? "healthy" : "degraded",
              activeRecoveries: health.activeRecoveries - 1,
              totalRecoveries: success ? health.totalRecoveries + 1 : health.totalRecoveries,
              issues: success ? { ...health.issues, [issueType]: false } : health.issues,
            }
          : health,
      ),
    )

    if (success) {
      setTotalRecoveries((prev) => prev + 1)
    }
  }

  const toggleMechanism = (mechanismId: string) => {
    setHealingMechanisms((prev) => prev.map((m) => (m.id === mechanismId ? { ...m, enabled: !m.enabled } : m)))
  }

  const toggleSystem = () => {
    setIsSystemActive(!isSystemActive)
  }

  const testRecovery = (platform: string, issueType: string) => {
    triggerRecovery(platform, issueType)
  }

  const exportReport = () => {
    const report = {
      timestamp: new Date().toISOString(),
      systemStatus: isSystemActive ? "active" : "paused",
      summary: {
        totalMechanisms: healingMechanisms.length,
        enabledMechanisms: healingMechanisms.filter((m) => m.enabled).length,
        totalRecoveries,
        activeRecoveries,
        avgSuccessRate: Math.round(
          healingMechanisms.reduce((sum, m) => sum + m.successRate, 0) / healingMechanisms.length,
        ),
      },
      mechanisms: healingMechanisms,
      recentAttempts: recoveryAttempts.slice(0, 10),
      platformHealth,
    }

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `self-healing-report-${new Date().toISOString().split("T")[0]}.json`
    a.click()
  }

  const platformIcons = {
    Instagram: <Instagram className="h-5 w-5 text-pink-600" />,
    TikTok: (
      <div className="h-5 w-5 bg-black rounded-sm flex items-center justify-center text-white text-xs font-bold">T</div>
    ),
    "Twitter/X": <Twitter className="h-5 w-5 text-blue-500" />,
    YouTube: <Youtube className="h-5 w-5 text-red-600" />,
    All: <Activity className="h-5 w-5 text-purple-600" />,
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800"
      case "recovering":
        return "bg-blue-100 text-blue-800"
      case "degraded":
        return "bg-yellow-100 text-yellow-800"
      case "down":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRecoveryStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "running":
        return "bg-blue-100 text-blue-800"
      case "timeout":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getIssueTypeIcon = (issueType: string) => {
    switch (issueType) {
      case "auth":
        return <Shield className="h-4 w-4" />
      case "rateLimit":
        return <Clock className="h-4 w-4" />
      case "connectivity":
        return <Zap className="h-4 w-4" />
      case "timeout":
        return <AlertTriangle className="h-4 w-4" />
      case "quota":
        return <Target className="h-4 w-4" />
      case "server":
        return <Settings className="h-4 w-4" />
      default:
        return <Wrench className="h-4 w-4" />
    }
  }

  const avgSuccessRate = Math.round(
    healingMechanisms.reduce((sum, m) => sum + m.successRate, 0) / healingMechanisms.length,
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-green-100 text-green-800">🔄 Self-Healing</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Automated Recovery System
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Intelligent self-healing mechanisms that automatically resolve common API issues
          </p>
        </div>

        {/* System Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card className="border-2 border-green-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                {isSystemActive ? (
                  <Activity className="h-5 w-5 text-green-600 animate-pulse" />
                ) : (
                  <Pause className="h-5 w-5 text-red-600" />
                )}
                <span className="text-lg font-bold text-green-600">{isSystemActive ? "ACTIVE" : "PAUSED"}</span>
              </div>
              <p className="text-sm text-gray-600">System Status</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <RefreshCw className="h-5 w-5 text-blue-600" />
                <span className="text-2xl font-bold text-blue-600">{totalRecoveries}</span>
              </div>
              <p className="text-sm text-gray-600">Total Recoveries</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Activity className="h-5 w-5 text-purple-600" />
                <span className="text-2xl font-bold text-purple-600">{activeRecoveries}</span>
              </div>
              <p className="text-sm text-gray-600">Active Recoveries</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <TrendingUp className="h-5 w-5 text-orange-600" />
                <span className="text-2xl font-bold text-orange-600">{avgSuccessRate}%</span>
              </div>
              <p className="text-sm text-gray-600">Success Rate</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-red-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Wrench className="h-5 w-5 text-red-600" />
                <span className="text-2xl font-bold text-red-600">
                  {healingMechanisms.filter((m) => m.enabled).length}
                </span>
              </div>
              <p className="text-sm text-gray-600">Active Mechanisms</p>
            </CardContent>
          </Card>
        </div>

        {/* Control Panel */}
        <Card className="mb-8 border-2 border-green-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-green-600" />
                Self-Healing Control Panel
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  onClick={toggleSystem}
                  variant={isSystemActive ? "destructive" : "default"}
                  className={isSystemActive ? "" : "bg-green-600 hover:bg-green-700"}
                >
                  {isSystemActive ? (
                    <>
                      <Pause className="h-4 w-4 mr-2" />
                      Pause System
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Activate System
                    </>
                  )}
                </Button>
                <Button onClick={exportReport} variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-gray-500" />
                <span className="text-sm">
                  System: {isSystemActive ? "Monitoring & Auto-healing" : "Monitoring only"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Check Interval: Every 30 seconds</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Coverage: All platforms & issue types</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="mechanisms" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="mechanisms">🔧 Mechanisms</TabsTrigger>
            <TabsTrigger value="health">💚 Platform Health</TabsTrigger>
            <TabsTrigger value="recovery">🔄 Recovery Log</TabsTrigger>
            <TabsTrigger value="testing">🧪 Testing</TabsTrigger>
          </TabsList>

          {/* Healing Mechanisms */}
          <TabsContent value="mechanisms">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {healingMechanisms.map((mechanism) => (
                <Card key={mechanism.id} className="border-2 border-blue-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        {platformIcons[mechanism.platform as keyof typeof platformIcons]}
                        {mechanism.name}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={`${
                            mechanism.enabled ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {mechanism.enabled ? "ENABLED" : "DISABLED"}
                        </Badge>
                        <Badge variant="outline">Priority {mechanism.priority}</Badge>
                      </div>
                    </div>
                    <CardDescription>{mechanism.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-sm">
                      {getIssueTypeIcon(mechanism.issueType)}
                      <span className="font-medium capitalize">{mechanism.issueType}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-600">{mechanism.strategy}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center p-2 bg-green-50 rounded">
                        <div className="font-bold text-green-600">{mechanism.successRate}%</div>
                        <div className="text-xs text-gray-600">Success Rate</div>
                      </div>
                      <div className="text-center p-2 bg-blue-50 rounded">
                        <div className="font-bold text-blue-600">{mechanism.avgRecoveryTime}s</div>
                        <div className="text-xs text-gray-600">Avg Recovery</div>
                      </div>
                      <div className="text-center p-2 bg-purple-50 rounded">
                        <div className="font-bold text-purple-600">{mechanism.successfulAttempts}</div>
                        <div className="text-xs text-gray-600">Successful</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Total Attempts: {mechanism.totalAttempts}</span>
                      {mechanism.lastTriggered && (
                        <span>
                          Last:{" "}
                          {mechanism.lastTriggered.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => toggleMechanism(mechanism.id)}
                        size="sm"
                        variant={mechanism.enabled ? "destructive" : "default"}
                        className={mechanism.enabled ? "" : "bg-green-600 hover:bg-green-700"}
                      >
                        {mechanism.enabled ? (
                          <>
                            <Pause className="h-4 w-4 mr-2" />
                            Disable
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Enable
                          </>
                        )}
                      </Button>
                      <Button
                        onClick={() => testRecovery(mechanism.platform, mechanism.issueType)}
                        size="sm"
                        variant="outline"
                        disabled={!mechanism.enabled}
                      >
                        <Wrench className="h-4 w-4 mr-2" />
                        Test
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Platform Health */}
          <TabsContent value="health">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {platformHealth.map((health) => (
                <Card key={health.platform} className="border-2 border-green-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        {platformIcons[health.platform as keyof typeof platformIcons]}
                        {health.platform}
                      </CardTitle>
                      <Badge className={getStatusColor(health.status)}>{health.status.toUpperCase()}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-green-50 rounded">
                        <div className="text-lg font-bold text-green-600">{health.uptime}%</div>
                        <div className="text-xs text-gray-600">Uptime</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded">
                        <div className="text-lg font-bold text-blue-600">{health.activeRecoveries}</div>
                        <div className="text-xs text-gray-600">Active</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded">
                        <div className="text-lg font-bold text-purple-600">{health.totalRecoveries}</div>
                        <div className="text-xs text-gray-600">Total</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Current Issues</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(health.issues).map(([issueType, hasIssue]) => (
                          <div
                            key={issueType}
                            className={`flex items-center gap-2 p-2 rounded text-sm ${
                              hasIssue ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"
                            }`}
                          >
                            {hasIssue ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                            <span className="capitalize">{issueType}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {health.lastIssue && (
                      <div className="text-xs text-gray-500">
                        Last Issue:{" "}
                        {health.lastIssue.toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Recovery Log */}
          <TabsContent value="recovery">
            <Card className="border-2 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-6 w-6 text-purple-600" />
                  Recent Recovery Attempts
                </CardTitle>
                <CardDescription>Live log of self-healing activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {recoveryAttempts.map((attempt) => (
                    <div key={attempt.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          {platformIcons[attempt.platform as keyof typeof platformIcons]}
                          <span className="font-medium">{attempt.platform}</span>
                          <Badge className={getRecoveryStatusColor(attempt.status)}>
                            {attempt.status.toUpperCase()}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {attempt.timestamp.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {getIssueTypeIcon(attempt.issueType)}
                          <span className="text-sm capitalize">{attempt.issueType}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="font-medium">Mechanism:</span> {attempt.mechanism}
                        </div>
                        <div className="text-sm text-gray-600">{attempt.details}</div>
                        {attempt.errorMessage && (
                          <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                            <span className="font-medium">Error:</span> {attempt.errorMessage}
                          </div>
                        )}
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>Duration: {attempt.duration.toFixed(1)}s</span>
                          <span>Retries: {attempt.retryCount}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {recoveryAttempts.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <RefreshCw className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No recovery attempts logged yet.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Testing */}
          <TabsContent value="testing">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-2 border-orange-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wrench className="h-6 w-6 text-orange-600" />
                    Manual Recovery Testing
                  </CardTitle>
                  <CardDescription>Test recovery mechanisms manually</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {["Instagram", "TikTok", "Twitter/X", "YouTube"].map((platform) => (
                    <div key={platform} className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        {platformIcons[platform as keyof typeof platformIcons]}
                        <span className="font-medium">{platform}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {["auth", "rateLimit", "connectivity", "timeout"].map((issueType) => (
                          <Button
                            key={issueType}
                            onClick={() => testRecovery(platform, issueType)}
                            size="sm"
                            variant="outline"
                            className="flex items-center gap-2"
                          >
                            {getIssueTypeIcon(issueType)}
                            <span className="capitalize">{issueType}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-6 w-6 text-blue-600" />
                    Recovery Statistics
                  </CardTitle>
                  <CardDescription>Performance metrics for self-healing system</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded">
                      <div className="text-2xl font-bold text-green-600">{avgSuccessRate}%</div>
                      <div className="text-sm text-gray-600">Overall Success Rate</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded">
                      <div className="text-2xl font-bold text-blue-600">
                        {(
                          healingMechanisms.reduce((sum, m) => sum + m.avgRecoveryTime, 0) / healingMechanisms.length
                        ).toFixed(1)}
                        s
                      </div>
                      <div className="text-sm text-gray-600">Avg Recovery Time</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Success Rates by Issue Type</h4>
                    {["auth", "rateLimit", "connectivity", "timeout", "quota", "server"].map((issueType) => {
                      const mechanisms = healingMechanisms.filter((m) => m.issueType === issueType)
                      const avgRate = mechanisms.length
                        ? Math.round(mechanisms.reduce((sum, m) => sum + m.successRate, 0) / mechanisms.length)
                        : 0

                      return (
                        <div key={issueType} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex items-center gap-2">
                            {getIssueTypeIcon(issueType)}
                            <span className="capitalize">{issueType}</span>
                          </div>
                          <span className="font-semibold">{avgRate}%</span>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
