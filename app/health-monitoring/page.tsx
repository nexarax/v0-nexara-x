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
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Bell,
  Settings,
  Activity,
  BarChart3,
  Calendar,
  Mail,
  Smartphone,
  Zap,
  TrendingUp,
  Shield,
  RefreshCw,
  Play,
  Pause,
  Download,
} from "lucide-react"

interface HealthCheck {
  id: string
  platform: string
  timestamp: Date
  status: "healthy" | "warning" | "critical" | "down"
  responseTime: number
  tests: {
    auth: boolean
    posting: boolean
    analytics: boolean
    rateLimit: number
  }
  issues: string[]
}

interface MonitoringConfig {
  platform: string
  enabled: boolean
  schedule: string
  alertThreshold: {
    responseTime: number
    failureRate: number
    rateLimit: number
  }
  notifications: {
    email: boolean
    sms: boolean
    webhook: boolean
  }
}

interface Alert {
  id: string
  platform: string
  type: "warning" | "critical" | "recovery"
  message: string
  timestamp: Date
  acknowledged: boolean
  resolvedAt?: Date
}

export default function HealthMonitoringPage() {
  const [healthChecks, setHealthChecks] = useState<HealthCheck[]>([])
  const [monitoringConfigs, setMonitoringConfigs] = useState<MonitoringConfig[]>([])
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [isMonitoringActive, setIsMonitoringActive] = useState(true)
  const [lastCheckTime, setLastCheckTime] = useState<Date>(new Date())

  useEffect(() => {
    // Initialize monitoring configurations
    const configs: MonitoringConfig[] = [
      {
        platform: "Instagram",
        enabled: true,
        schedule: "0 6,12,18 * * *", // 6 AM, 12 PM, 6 PM daily
        alertThreshold: {
          responseTime: 2000,
          failureRate: 10,
          rateLimit: 80,
        },
        notifications: {
          email: true,
          sms: false,
          webhook: true,
        },
      },
      {
        platform: "TikTok",
        enabled: true,
        schedule: "0 7,13,19 * * *", // 7 AM, 1 PM, 7 PM daily
        alertThreshold: {
          responseTime: 3000,
          failureRate: 15,
          rateLimit: 85,
        },
        notifications: {
          email: true,
          sms: true,
          webhook: true,
        },
      },
      {
        platform: "Twitter/X",
        enabled: true,
        schedule: "0 8,14,20 * * *", // 8 AM, 2 PM, 8 PM daily
        alertThreshold: {
          responseTime: 1500,
          failureRate: 5,
          rateLimit: 90,
        },
        notifications: {
          email: true,
          sms: false,
          webhook: true,
        },
      },
      {
        platform: "YouTube",
        enabled: true,
        schedule: "0 9,15,21 * * *", // 9 AM, 3 PM, 9 PM daily
        alertThreshold: {
          responseTime: 5000,
          failureRate: 20,
          rateLimit: 70,
        },
        notifications: {
          email: true,
          sms: true,
          webhook: true,
        },
      },
    ]
    setMonitoringConfigs(configs)

    // Generate sample health check data
    generateSampleHealthChecks()

    // Generate sample alerts
    generateSampleAlerts()

    // Start monitoring simulation
    const interval = setInterval(() => {
      if (isMonitoringActive) {
        runHealthCheck()
      }
    }, 30000) // Check every 30 seconds for demo

    return () => clearInterval(interval)
  }, [isMonitoringActive])

  const generateSampleHealthChecks = () => {
    const platforms = ["Instagram", "TikTok", "Twitter/X", "YouTube"]
    const checks: HealthCheck[] = []

    // Generate last 7 days of health checks
    for (let day = 6; day >= 0; day--) {
      for (const platform of platforms) {
        const date = new Date()
        date.setDate(date.getDate() - day)
        date.setHours(6 + Math.floor(Math.random() * 12), Math.floor(Math.random() * 60))

        const responseTime = 200 + Math.random() * 2000
        const rateLimit = Math.floor(Math.random() * 100)
        const hasIssues = Math.random() < 0.1

        checks.push({
          id: `${platform}-${day}-${Math.random()}`,
          platform,
          timestamp: date,
          status: hasIssues
            ? Math.random() < 0.5
              ? "warning"
              : "critical"
            : responseTime > 2000
              ? "warning"
              : "healthy",
          responseTime: Math.floor(responseTime),
          tests: {
            auth: !hasIssues || Math.random() > 0.3,
            posting: !hasIssues || Math.random() > 0.2,
            analytics: !hasIssues || Math.random() > 0.4,
            rateLimit,
          },
          issues: hasIssues
            ? [
                "Rate limit approaching threshold",
                "Slow API response times",
                "Authentication token expires soon",
              ].slice(0, Math.floor(Math.random() * 3) + 1)
            : [],
        })
      }
    }

    setHealthChecks(checks.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()))
  }

  const generateSampleAlerts = () => {
    const sampleAlerts: Alert[] = [
      {
        id: "alert-1",
        platform: "Instagram",
        type: "warning",
        message: "API response time exceeded 2 seconds (2.3s average)",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        acknowledged: false,
      },
      {
        id: "alert-2",
        platform: "TikTok",
        type: "critical",
        message: "Authentication failed - token may be expired",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        acknowledged: true,
        resolvedAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
      },
      {
        id: "alert-3",
        platform: "Twitter/X",
        type: "warning",
        message: "Rate limit at 92% - approaching threshold",
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
        acknowledged: false,
      },
      {
        id: "alert-4",
        platform: "YouTube",
        type: "recovery",
        message: "API health restored - all systems operational",
        timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        acknowledged: true,
      },
    ]
    setAlerts(sampleAlerts)
  }

  const runHealthCheck = () => {
    const platforms = ["Instagram", "TikTok", "Twitter/X", "YouTube"]
    const newChecks: HealthCheck[] = []

    platforms.forEach((platform) => {
      const responseTime = 200 + Math.random() * 1800
      const rateLimit = Math.floor(Math.random() * 100)
      const hasIssues = Math.random() < 0.05 // 5% chance of issues

      const check: HealthCheck = {
        id: `${platform}-${Date.now()}-${Math.random()}`,
        platform,
        timestamp: new Date(),
        status: hasIssues ? "warning" : responseTime > 1500 ? "warning" : "healthy",
        responseTime: Math.floor(responseTime),
        tests: {
          auth: !hasIssues || Math.random() > 0.2,
          posting: !hasIssues || Math.random() > 0.3,
          analytics: !hasIssues || Math.random() > 0.4,
          rateLimit,
        },
        issues: hasIssues ? ["Intermittent connectivity issues"] : [],
      }

      newChecks.push(check)
    })

    setHealthChecks((prev) => [...newChecks, ...prev].slice(0, 100)) // Keep last 100 checks
    setLastCheckTime(new Date())
  }

  const acknowledgeAlert = (alertId: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, acknowledged: true } : alert)))
  }

  const toggleMonitoring = () => {
    setIsMonitoringActive(!isMonitoringActive)
  }

  const exportHealthReport = () => {
    const report = {
      generatedAt: new Date().toISOString(),
      monitoringStatus: isMonitoringActive ? "active" : "paused",
      healthChecks: healthChecks.slice(0, 50), // Last 50 checks
      alerts: alerts,
      summary: {
        totalChecks: healthChecks.length,
        healthyChecks: healthChecks.filter((c) => c.status === "healthy").length,
        warningChecks: healthChecks.filter((c) => c.status === "warning").length,
        criticalChecks: healthChecks.filter((c) => c.status === "critical").length,
      },
    }

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `nexarax-health-report-${new Date().toISOString().split("T")[0]}.json`
    a.click()
  }

  const platformIcons = {
    Instagram: <Instagram className="h-5 w-5 text-pink-600" />,
    TikTok: (
      <div className="h-5 w-5 bg-black rounded-sm flex items-center justify-center text-white text-xs font-bold">T</div>
    ),
    "Twitter/X": <Twitter className="h-5 w-5 text-blue-500" />,
    YouTube: <Youtube className="h-5 w-5 text-red-600" />,
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "critical":
        return "bg-red-100 text-red-800"
      case "down":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "critical":
      case "down":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "critical":
        return "bg-red-100 text-red-800"
      case "recovery":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const healthyCount = healthChecks.filter((c) => c.status === "healthy").length
  const warningCount = healthChecks.filter((c) => c.status === "warning").length
  const criticalCount = healthChecks.filter((c) => c.status === "critical").length
  const unacknowledgedAlerts = alerts.filter((a) => !a.acknowledged).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-100 text-blue-800">🤖 Automated Monitoring</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Daily API Health Monitoring
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Automated 24/7 monitoring with intelligent alerts and proactive issue detection
          </p>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card className="border-2 border-blue-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                {isMonitoringActive ? (
                  <Activity className="h-5 w-5 text-green-600 animate-pulse" />
                ) : (
                  <Pause className="h-5 w-5 text-red-600" />
                )}
                <span className="text-lg font-bold text-blue-600">{isMonitoringActive ? "ACTIVE" : "PAUSED"}</span>
              </div>
              <p className="text-sm text-gray-600">Monitoring Status</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-2xl font-bold text-green-600">{healthyCount}</span>
              </div>
              <p className="text-sm text-gray-600">Healthy</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-yellow-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <span className="text-2xl font-bold text-yellow-600">{warningCount}</span>
              </div>
              <p className="text-sm text-gray-600">Warnings</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-red-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <XCircle className="h-5 w-5 text-red-600" />
                <span className="text-2xl font-bold text-red-600">{criticalCount}</span>
              </div>
              <p className="text-sm text-gray-600">Critical</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Bell className="h-5 w-5 text-purple-600" />
                <span className="text-2xl font-bold text-purple-600">{unacknowledgedAlerts}</span>
              </div>
              <p className="text-sm text-gray-600">Active Alerts</p>
            </CardContent>
          </Card>
        </div>

        {/* Control Panel */}
        <Card className="mb-8 border-2 border-blue-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-blue-600" />
                Monitoring Control Panel
              </CardTitle>
              <div className="flex gap-2">
                <Button onClick={toggleMonitoring} variant={isMonitoringActive ? "destructive" : "default"}>
                  {isMonitoringActive ? (
                    <>
                      <Pause className="h-4 w-4 mr-2" />
                      Pause Monitoring
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Resume Monitoring
                    </>
                  )}
                </Button>
                <Button onClick={runHealthCheck} variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Run Check Now
                </Button>
                <Button onClick={exportHealthReport} variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm">
                  Last Check: {lastCheckTime.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Next Check: In 2 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Uptime: 99.7%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">📊 Dashboard</TabsTrigger>
            <TabsTrigger value="alerts">🚨 Alerts</TabsTrigger>
            <TabsTrigger value="config">⚙️ Configuration</TabsTrigger>
            <TabsTrigger value="reports">📈 Reports</TabsTrigger>
          </TabsList>

          {/* Dashboard */}
          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Health Checks */}
              <Card className="border-2 border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-6 w-6 text-green-600" />
                    Recent Health Checks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {healthChecks.slice(0, 10).map((check) => (
                      <div key={check.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          {platformIcons[check.platform as keyof typeof platformIcons]}
                          <div>
                            <div className="font-medium">{check.platform}</div>
                            <div className="text-xs text-gray-500">
                              {check.timestamp.toLocaleTimeString("en-GB", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-mono">{check.responseTime}ms</span>
                          <Badge className={getStatusColor(check.status)}>
                            {getStatusIcon(check.status)}
                            <span className="ml-1 capitalize">{check.status}</span>
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Platform Status */}
              <Card className="border-2 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-6 w-6 text-blue-600" />
                    Platform Status Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["Instagram", "TikTok", "Twitter/X", "YouTube"].map((platform) => {
                      const platformChecks = healthChecks.filter((c) => c.platform === platform).slice(0, 5)
                      const avgResponseTime =
                        platformChecks.reduce((sum, c) => sum + c.responseTime, 0) / platformChecks.length || 0
                      const latestCheck = platformChecks[0]

                      return (
                        <div key={platform} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {platformIcons[platform as keyof typeof platformIcons]}
                              <span className="font-medium">{platform}</span>
                            </div>
                            {latestCheck && (
                              <Badge className={getStatusColor(latestCheck.status)}>
                                {getStatusIcon(latestCheck.status)}
                                <span className="ml-1 capitalize">{latestCheck.status}</span>
                              </Badge>
                            )}
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <div className="text-gray-500">Avg Response</div>
                              <div className="font-semibold">{Math.round(avgResponseTime)}ms</div>
                            </div>
                            <div>
                              <div className="text-gray-500">Success Rate</div>
                              <div className="font-semibold text-green-600">
                                {Math.round(
                                  (platformChecks.filter((c) => c.status === "healthy").length /
                                    platformChecks.length) *
                                    100,
                                )}
                                %
                              </div>
                            </div>
                            <div>
                              <div className="text-gray-500">Rate Limit</div>
                              <div className="font-semibold">
                                {latestCheck ? `${latestCheck.tests.rateLimit}%` : "N/A"}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Alerts */}
          <TabsContent value="alerts">
            <Card className="border-2 border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-6 w-6 text-red-600" />
                  Active Alerts & Notifications
                </CardTitle>
                <CardDescription>Monitor and manage system alerts and notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div key={alert.id} className={`p-4 border rounded-lg ${alert.acknowledged ? "opacity-60" : ""}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {platformIcons[alert.platform as keyof typeof platformIcons]}
                            <span className="font-medium">{alert.platform}</span>
                            <Badge className={getAlertColor(alert.type)}>
                              <span className="capitalize">{alert.type}</span>
                            </Badge>
                            {alert.acknowledged && <Badge variant="outline">Acknowledged</Badge>}
                          </div>
                          <p className="text-gray-700 mb-2">{alert.message}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>
                              🕒{" "}
                              {alert.timestamp.toLocaleString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                            {alert.resolvedAt && (
                              <span>
                                ✅ Resolved at{" "}
                                {alert.resolvedAt.toLocaleTimeString("en-GB", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            )}
                          </div>
                        </div>
                        {!alert.acknowledged && (
                          <Button variant="outline" size="sm" onClick={() => acknowledgeAlert(alert.id)}>
                            Acknowledge
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Configuration */}
          <TabsContent value="config">
            <div className="space-y-6">
              {monitoringConfigs.map((config) => (
                <Card key={config.platform} className="border-2 border-purple-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {platformIcons[config.platform as keyof typeof platformIcons]}
                      {config.platform} Monitoring Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Schedule (Cron)</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          value={config.schedule}
                          readOnly
                        />
                        <p className="text-xs text-gray-500 mt-1">Runs 3 times daily</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <Badge className={config.enabled ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                          {config.enabled ? "Enabled" : "Disabled"}
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Alert Thresholds</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm text-gray-600">Response Time</label>
                          <span className="font-semibold">{config.alertThreshold.responseTime}ms</span>
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600">Failure Rate</label>
                          <span className="font-semibold">{config.alertThreshold.failureRate}%</span>
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600">Rate Limit</label>
                          <span className="font-semibold">{config.alertThreshold.rateLimit}%</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Notification Channels</h4>
                      <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-blue-500" />
                          <span className="text-sm">Email</span>
                          <Badge
                            className={
                              config.notifications.email ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }
                          >
                            {config.notifications.email ? "On" : "Off"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Smartphone className="h-4 w-4 text-green-500" />
                          <span className="text-sm">SMS</span>
                          <Badge
                            className={
                              config.notifications.sms ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }
                          >
                            {config.notifications.sms ? "On" : "Off"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-purple-500" />
                          <span className="text-sm">Webhook</span>
                          <Badge
                            className={
                              config.notifications.webhook ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }
                          >
                            {config.notifications.webhook ? "On" : "Off"}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        <Settings className="h-4 w-4 mr-2" />
                        Configure
                      </Button>
                      <Button variant="outline" size="sm">
                        Test Alerts
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Reports */}
          <TabsContent value="reports">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-2 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-6 w-6 text-blue-600" />
                    Weekly Health Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-green-50 rounded">
                      <div className="text-3xl font-bold text-green-600 mb-1">99.7%</div>
                      <div className="text-sm text-gray-600">Overall Uptime</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded">
                        <div className="text-xl font-bold text-blue-600">847ms</div>
                        <div className="text-xs text-gray-600">Avg Response</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded">
                        <div className="text-xl font-bold text-purple-600">168</div>
                        <div className="text-xs text-gray-600">Total Checks</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Healthy Checks:</span>
                        <span className="font-semibold text-green-600">156 (92.9%)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Warning Checks:</span>
                        <span className="font-semibold text-yellow-600">10 (6.0%)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Critical Checks:</span>
                        <span className="font-semibold text-red-600">2 (1.2%)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                    Performance Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                      <span className="text-sm">Response Time Trend</span>
                      <span className="font-semibold text-green-600">↓ 12% improvement</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                      <span className="text-sm">Success Rate Trend</span>
                      <span className="font-semibold text-blue-600">↑ 2.3% improvement</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                      <span className="text-sm">Alert Frequency</span>
                      <span className="font-semibold text-purple-600">↓ 45% reduction</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-yellow-50 rounded">
                      <span className="text-sm">Rate Limit Usage</span>
                      <span className="font-semibold text-yellow-600">→ Stable at 65%</span>
                    </div>
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
