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
  Play,
  RotateCcw,
  CheckCircle,
  XCircle,
  Clock,
  Bell,
  Zap,
  Activity,
  TestTube,
  Mail,
  Smartphone,
  MessageSquare,
  Download,
  Eye,
  Timer,
  Target,
} from "lucide-react"

interface SimulationScenario {
  id: string
  name: string
  platform: string
  type: "warning" | "critical" | "recovery"
  description: string
  metrics: {
    responseTime?: number
    failureRate?: number
    rateLimit?: number
    authExpiry?: number
  }
  duration: number
  expectedAlerts: number
  businessHours: boolean
}

interface AlertEvent {
  id: string
  timestamp: Date
  platform: string
  type: "warning" | "critical" | "recovery"
  metric: string
  value: number
  threshold: number
  message: string
  escalationLevel: number
  notifications: {
    email: boolean
    sms: boolean
    webhook: boolean
    slack: boolean
  }
  acknowledged: boolean
  resolved: boolean
  responseTime: number
}

interface TestResult {
  scenarioId: string
  status: "running" | "passed" | "failed" | "pending"
  startTime: Date
  endTime?: Date
  alertsGenerated: number
  expectedAlerts: number
  notifications: {
    sent: number
    failed: number
    channels: string[]
  }
  escalations: {
    warning: number
    critical: number
    resolved: number
  }
  issues: string[]
}

export default function AlertSimulationPage() {
  const [scenarios, setScenarios] = useState<SimulationScenario[]>([])
  const [alertEvents, setAlertEvents] = useState<AlertEvent[]>([])
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [isSimulationRunning, setIsSimulationRunning] = useState(false)
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null)
  const [simulationProgress, setSimulationProgress] = useState(0)
  const [liveMetrics, setLiveMetrics] = useState<{ [key: string]: any }>({})

  useEffect(() => {
    // Initialize simulation scenarios
    const defaultScenarios: SimulationScenario[] = [
      {
        id: "instagram-response-warning",
        name: "Instagram Response Time Warning",
        platform: "Instagram",
        type: "warning",
        description: "Simulate Instagram API response time exceeding warning threshold (2000ms)",
        metrics: { responseTime: 2500 },
        duration: 300, // 5 minutes
        expectedAlerts: 1,
        businessHours: true,
      },
      {
        id: "instagram-response-critical",
        name: "Instagram Response Time Critical",
        platform: "Instagram",
        type: "critical",
        description: "Simulate Instagram API response time exceeding critical threshold (5000ms)",
        metrics: { responseTime: 7000 },
        duration: 180, // 3 minutes
        expectedAlerts: 2, // Warning + Critical
        businessHours: true,
      },
      {
        id: "tiktok-rate-limit",
        name: "TikTok Rate Limit Critical",
        platform: "TikTok",
        type: "critical",
        description: "Simulate TikTok API rate limit approaching 98% threshold",
        metrics: { rateLimit: 99 },
        duration: 600, // 10 minutes
        expectedAlerts: 3, // Warning + Critical + Escalation
        businessHours: false,
      },
      {
        id: "twitter-failure-spike",
        name: "Twitter/X Failure Rate Spike",
        platform: "Twitter/X",
        type: "warning",
        description: "Simulate Twitter API failure rate spike to 8% (warning at 5%)",
        metrics: { failureRate: 8 },
        duration: 240, // 4 minutes
        expectedAlerts: 1,
        businessHours: true,
      },
      {
        id: "youtube-auth-expiry",
        name: "YouTube Auth Token Expiry",
        platform: "YouTube",
        type: "critical",
        description: "Simulate YouTube OAuth token expiring in 2 days (critical at 3 days)",
        metrics: { authExpiry: 2 },
        duration: 120, // 2 minutes
        expectedAlerts: 2,
        businessHours: false,
      },
      {
        id: "multi-platform-outage",
        name: "Multi-Platform Outage",
        platform: "All",
        type: "critical",
        description: "Simulate simultaneous issues across all platforms",
        metrics: { responseTime: 8000, failureRate: 50 },
        duration: 900, // 15 minutes
        expectedAlerts: 8, // Multiple platforms and metrics
        businessHours: true,
      },
      {
        id: "business-hours-sensitivity",
        name: "Business Hours Sensitivity Test",
        platform: "Instagram",
        type: "warning",
        description: "Test business hours threshold sensitivity (0.5x multiplier)",
        metrics: { responseTime: 1500 }, // Would be warning during business hours only
        duration: 300,
        expectedAlerts: 1,
        businessHours: true,
      },
      {
        id: "auto-recovery-test",
        name: "Auto-Recovery Mechanism",
        platform: "Twitter/X",
        type: "recovery",
        description: "Test automatic alert resolution when metrics return to normal",
        metrics: { responseTime: 3000 }, // Start high, then recover
        duration: 420, // 7 minutes
        expectedAlerts: 3, // Warning + Critical + Recovery
        businessHours: false,
      },
    ]

    setScenarios(defaultScenarios)
    initializeLiveMetrics()
  }, [])

  const initializeLiveMetrics = () => {
    const metrics = {
      Instagram: { responseTime: 800, failureRate: 2, rateLimit: 45, authExpiry: 15 },
      TikTok: { responseTime: 1200, failureRate: 5, rateLimit: 60, authExpiry: 8 },
      "Twitter/X": { responseTime: 600, failureRate: 1, rateLimit: 35, authExpiry: 45 },
      YouTube: { responseTime: 2000, failureRate: 8, rateLimit: 25, authExpiry: 12 },
    }
    setLiveMetrics(metrics)
  }

  const runScenario = async (scenarioId: string) => {
    const scenario = scenarios.find((s) => s.id === scenarioId)
    if (!scenario) return

    setSelectedScenario(scenarioId)
    setIsSimulationRunning(true)
    setSimulationProgress(0)

    // Initialize test result
    const testResult: TestResult = {
      scenarioId,
      status: "running",
      startTime: new Date(),
      alertsGenerated: 0,
      expectedAlerts: scenario.expectedAlerts,
      notifications: { sent: 0, failed: 0, channels: [] },
      escalations: { warning: 0, critical: 0, resolved: 0 },
      issues: [],
    }

    setTestResults((prev) => [...prev.filter((r) => r.scenarioId !== scenarioId), testResult])

    try {
      // Simulate the scenario
      await simulateScenario(scenario, testResult)

      // Mark as completed
      testResult.status = testResult.issues.length === 0 ? "passed" : "failed"
      testResult.endTime = new Date()

      setTestResults((prev) => prev.map((r) => (r.scenarioId === scenarioId ? testResult : r)))
    } catch (error) {
      testResult.status = "failed"
      testResult.endTime = new Date()
      testResult.issues.push(`Simulation failed: ${error}`)
      setTestResults((prev) => prev.map((r) => (r.scenarioId === scenarioId ? testResult : r)))
    } finally {
      setIsSimulationRunning(false)
      setSimulationProgress(0)
      setSelectedScenario(null)
    }
  }

  const simulateScenario = async (scenario: SimulationScenario, testResult: TestResult) => {
    const platforms =
      scenario.platform === "All" ? ["Instagram", "TikTok", "Twitter/X", "YouTube"] : [scenario.platform]
    const stepDuration = scenario.duration / 10 // 10 steps for progress
    let alertCount = 0

    for (let step = 0; step < 10; step++) {
      setSimulationProgress((step + 1) * 10)

      for (const platform of platforms) {
        // Simulate metric changes
        if (scenario.metrics.responseTime) {
          await simulateMetricAlert(platform, "responseTime", scenario.metrics.responseTime, scenario.type, testResult)
          alertCount++
        }

        if (scenario.metrics.failureRate) {
          await simulateMetricAlert(platform, "failureRate", scenario.metrics.failureRate, scenario.type, testResult)
          alertCount++
        }

        if (scenario.metrics.rateLimit) {
          await simulateMetricAlert(platform, "rateLimit", scenario.metrics.rateLimit, scenario.type, testResult)
          alertCount++
        }

        if (scenario.metrics.authExpiry) {
          await simulateMetricAlert(platform, "authExpiry", scenario.metrics.authExpiry, scenario.type, testResult)
          alertCount++
        }
      }

      // Simulate recovery for auto-recovery test
      if (scenario.id === "auto-recovery-test" && step > 5) {
        await simulateRecovery(scenario.platform, testResult)
      }

      await new Promise((resolve) => setTimeout(resolve, stepDuration * 100)) // Speed up for demo
    }

    testResult.alertsGenerated = alertCount

    // Validate results
    if (alertCount < scenario.expectedAlerts) {
      testResult.issues.push(`Expected ${scenario.expectedAlerts} alerts, but only generated ${alertCount}`)
    }

    // Simulate notification delivery
    await simulateNotifications(testResult)
  }

  const simulateMetricAlert = async (
    platform: string,
    metric: string,
    value: number,
    type: "warning" | "critical" | "recovery",
    testResult: TestResult,
  ) => {
    const thresholds = getThresholds(platform, metric)
    let alertType: "warning" | "critical" | "recovery" = "warning"
    let threshold = thresholds.warning

    if (value >= thresholds.critical) {
      alertType = "critical"
      threshold = thresholds.critical
      testResult.escalations.critical++
    } else if (value >= thresholds.warning) {
      alertType = "warning"
      threshold = thresholds.warning
      testResult.escalations.warning++
    }

    const alertEvent: AlertEvent = {
      id: `alert-${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
      platform,
      type: alertType,
      metric,
      value,
      threshold,
      message: `${platform} ${metric} ${alertType}: ${value} exceeds threshold of ${threshold}`,
      escalationLevel: alertType === "critical" ? 2 : 1,
      notifications: {
        email: true,
        sms: alertType === "critical",
        webhook: true,
        slack: true,
      },
      acknowledged: false,
      resolved: false,
      responseTime: Math.random() * 1000 + 500,
    }

    setAlertEvents((prev) => [alertEvent, ...prev].slice(0, 50)) // Keep last 50 alerts

    // Update live metrics to show the simulated values
    setLiveMetrics((prev) => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        [metric]: value,
      },
    }))

    await new Promise((resolve) => setTimeout(resolve, 100)) // Simulate processing delay
  }

  const simulateRecovery = async (platform: string, testResult: TestResult) => {
    const recoveryEvent: AlertEvent = {
      id: `recovery-${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
      platform,
      type: "recovery",
      metric: "responseTime",
      value: 800, // Back to normal
      threshold: 2000,
      message: `${platform} metrics have returned to normal - auto-resolving alerts`,
      escalationLevel: 0,
      notifications: {
        email: true,
        sms: false,
        webhook: true,
        slack: true,
      },
      acknowledged: true,
      resolved: true,
      responseTime: 200,
    }

    setAlertEvents((prev) => [recoveryEvent, ...prev])
    testResult.escalations.resolved++

    // Reset live metrics to normal
    setLiveMetrics((prev) => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        responseTime: 800,
        failureRate: 2,
      },
    }))
  }

  const simulateNotifications = async (testResult: TestResult) => {
    // Simulate notification delivery with some failures
    const channels = ["email", "sms", "webhook", "slack"]
    let sent = 0
    let failed = 0

    for (const channel of channels) {
      if (Math.random() > 0.1) {
        // 90% success rate
        sent++
        testResult.notifications.channels.push(channel)
      } else {
        failed++
        testResult.issues.push(`Failed to send ${channel} notification`)
      }
      await new Promise((resolve) => setTimeout(resolve, 50))
    }

    testResult.notifications.sent = sent
    testResult.notifications.failed = failed
  }

  const getThresholds = (platform: string, metric: string) => {
    // Return platform-specific thresholds
    const thresholds: { [key: string]: { [key: string]: { warning: number; critical: number } } } = {
      Instagram: {
        responseTime: { warning: 2000, critical: 5000 },
        failureRate: { warning: 10, critical: 25 },
        rateLimit: { warning: 80, critical: 95 },
        authExpiry: { warning: 7, critical: 1 },
      },
      TikTok: {
        responseTime: { warning: 3000, critical: 8000 },
        failureRate: { warning: 15, critical: 35 },
        rateLimit: { warning: 85, critical: 98 },
        authExpiry: { warning: 14, critical: 3 },
      },
      "Twitter/X": {
        responseTime: { warning: 1500, critical: 4000 },
        failureRate: { warning: 5, critical: 15 },
        rateLimit: { warning: 90, critical: 99 },
        authExpiry: { warning: 30, critical: 7 },
      },
      YouTube: {
        responseTime: { warning: 5000, critical: 15000 },
        failureRate: { warning: 20, critical: 40 },
        rateLimit: { warning: 70, critical: 90 },
        authExpiry: { warning: 14, critical: 3 },
      },
    }

    return thresholds[platform]?.[metric] || { warning: 100, critical: 200 }
  }

  const runAllTests = async () => {
    for (const scenario of scenarios) {
      if (!isSimulationRunning) {
        await runScenario(scenario.id)
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Pause between tests
      }
    }
  }

  const clearResults = () => {
    setTestResults([])
    setAlertEvents([])
    initializeLiveMetrics()
  }

  const exportResults = () => {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalTests: testResults.length,
        passed: testResults.filter((r) => r.status === "passed").length,
        failed: testResults.filter((r) => r.status === "failed").length,
        totalAlerts: testResults.reduce((sum, r) => sum + r.alertsGenerated, 0),
        totalNotifications: testResults.reduce((sum, r) => sum + r.notifications.sent, 0),
      },
      results: testResults,
      alertEvents: alertEvents.slice(0, 20), // Last 20 events
    }

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `alert-simulation-report-${new Date().toISOString().split("T")[0]}.json`
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
      case "passed":
        return "bg-green-100 text-green-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "running":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getAlertTypeColor = (type: string) => {
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

  const passedTests = testResults.filter((r) => r.status === "passed").length
  const failedTests = testResults.filter((r) => r.status === "failed").length
  const totalAlerts = testResults.reduce((sum, r) => sum + r.alertsGenerated, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-purple-100 text-purple-800">🧪 Alert Testing</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Alert Simulation & Testing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Verify threshold configurations with comprehensive alert simulations
          </p>
        </div>

        {/* Test Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 border-blue-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <TestTube className="h-5 w-5 text-blue-600" />
                <span className="text-2xl font-bold text-blue-600">{testResults.length}</span>
              </div>
              <p className="text-sm text-gray-600">Tests Run</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-2xl font-bold text-green-600">{passedTests}</span>
              </div>
              <p className="text-sm text-gray-600">Passed</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-red-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <XCircle className="h-5 w-5 text-red-600" />
                <span className="text-2xl font-bold text-red-600">{failedTests}</span>
              </div>
              <p className="text-sm text-gray-600">Failed</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Bell className="h-5 w-5 text-purple-600" />
                <span className="text-2xl font-bold text-purple-600">{totalAlerts}</span>
              </div>
              <p className="text-sm text-gray-600">Alerts Generated</p>
            </CardContent>
          </Card>
        </div>

        {/* Control Panel */}
        <Card className="mb-8 border-2 border-purple-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-6 w-6 text-purple-600" />
                Simulation Control Panel
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  onClick={runAllTests}
                  disabled={isSimulationRunning}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Run All Tests
                </Button>
                <Button onClick={clearResults} variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Clear Results
                </Button>
                <Button onClick={exportResults} variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>
          </CardHeader>
          {isSimulationRunning && (
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Running simulation: {selectedScenario}</span>
                  <span className="text-sm font-semibold">{simulationProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${simulationProgress}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        <Tabs defaultValue="scenarios" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="scenarios">🎯 Scenarios</TabsTrigger>
            <TabsTrigger value="results">📊 Results</TabsTrigger>
            <TabsTrigger value="alerts">🚨 Live Alerts</TabsTrigger>
            <TabsTrigger value="metrics">📈 Live Metrics</TabsTrigger>
          </TabsList>

          {/* Test Scenarios */}
          <TabsContent value="scenarios">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {scenarios.map((scenario) => {
                const result = testResults.find((r) => r.scenarioId === scenario.id)
                return (
                  <Card key={scenario.id} className="border-2 border-blue-200">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          {platformIcons[scenario.platform as keyof typeof platformIcons]}
                          {scenario.name}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge className={getAlertTypeColor(scenario.type)}>{scenario.type.toUpperCase()}</Badge>
                          {result && (
                            <Badge className={getStatusColor(result.status)}>{result.status.toUpperCase()}</Badge>
                          )}
                        </div>
                      </div>
                      <CardDescription>{scenario.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Duration:</span>
                          <span className="ml-2 font-semibold">
                            {Math.floor(scenario.duration / 60)}m {scenario.duration % 60}s
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Expected Alerts:</span>
                          <span className="ml-2 font-semibold">{scenario.expectedAlerts}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Business Hours:</span>
                          <span className="ml-2 font-semibold">{scenario.businessHours ? "Yes" : "No"}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Platform:</span>
                          <span className="ml-2 font-semibold">{scenario.platform}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Simulated Metrics:</h4>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(scenario.metrics).map(([metric, value]) => (
                            <Badge key={metric} variant="outline" className="text-xs">
                              {metric}: {value}
                              {metric === "responseTime" && "ms"}
                              {metric === "failureRate" && "%"}
                              {metric === "rateLimit" && "%"}
                              {metric === "authExpiry" && " days"}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={() => runScenario(scenario.id)}
                          disabled={isSimulationRunning}
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Run Test
                        </Button>
                        {result && (
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Test Results */}
          <TabsContent value="results">
            <div className="space-y-6">
              {testResults.map((result) => {
                const scenario = scenarios.find((s) => s.id === result.scenarioId)
                return (
                  <Card key={result.scenarioId} className="border-2 border-green-200">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          {scenario && platformIcons[scenario.platform as keyof typeof platformIcons]}
                          {scenario?.name || result.scenarioId}
                        </CardTitle>
                        <Badge className={getStatusColor(result.status)}>{result.status.toUpperCase()}</Badge>
                      </div>
                      <CardDescription>
                        Started: {result.startTime.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                        {result.endTime && (
                          <span>
                            {" "}
                            | Completed:{" "}
                            {result.endTime.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        )}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-blue-50 rounded">
                          <div className="text-lg font-bold text-blue-600">{result.alertsGenerated}</div>
                          <div className="text-xs text-gray-600">Alerts Generated</div>
                          <div className="text-xs text-gray-500">Expected: {result.expectedAlerts}</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded">
                          <div className="text-lg font-bold text-green-600">{result.notifications.sent}</div>
                          <div className="text-xs text-gray-600">Notifications Sent</div>
                          <div className="text-xs text-gray-500">Failed: {result.notifications.failed}</div>
                        </div>
                        <div className="text-center p-3 bg-yellow-50 rounded">
                          <div className="text-lg font-bold text-yellow-600">{result.escalations.warning}</div>
                          <div className="text-xs text-gray-600">Warning Escalations</div>
                        </div>
                        <div className="text-center p-3 bg-red-50 rounded">
                          <div className="text-lg font-bold text-red-600">{result.escalations.critical}</div>
                          <div className="text-xs text-gray-600">Critical Escalations</div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Notification Channels</h4>
                        <div className="flex flex-wrap gap-2">
                          {result.notifications.channels.map((channel, index) => (
                            <Badge key={index} className="bg-green-100 text-green-800">
                              {channel === "email" && <Mail className="h-3 w-3 mr-1" />}
                              {channel === "sms" && <Smartphone className="h-3 w-3 mr-1" />}
                              {channel === "webhook" && <Zap className="h-3 w-3 mr-1" />}
                              {channel === "slack" && <MessageSquare className="h-3 w-3 mr-1" />}
                              {channel}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {result.issues.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2 text-red-600">Issues Found</h4>
                          <div className="space-y-1">
                            {result.issues.map((issue, index) => (
                              <div key={index} className="flex items-center gap-2 text-sm text-red-600">
                                <XCircle className="h-4 w-4" />
                                {issue}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Live Alerts */}
          <TabsContent value="alerts">
            <Card className="border-2 border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-6 w-6 text-red-600" />
                  Live Alert Stream
                </CardTitle>
                <CardDescription>Real-time alerts generated during simulations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {alertEvents.map((alert) => (
                    <div key={alert.id} className="flex items-start justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {platformIcons[alert.platform as keyof typeof platformIcons]}
                          <span className="font-medium">{alert.platform}</span>
                          <Badge className={getAlertTypeColor(alert.type)}>{alert.type.toUpperCase()}</Badge>
                          <span className="text-xs text-gray-500">
                            {alert.timestamp.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{alert.message}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>Metric: {alert.metric}</span>
                          <span>Value: {alert.value}</span>
                          <span>Threshold: {alert.threshold}</span>
                          <span>Response: {Math.round(alert.responseTime)}ms</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        {alert.notifications.email && <Mail className="h-4 w-4 text-blue-500" />}
                        {alert.notifications.sms && <Smartphone className="h-4 w-4 text-green-500" />}
                        {alert.notifications.webhook && <Zap className="h-4 w-4 text-purple-500" />}
                        {alert.notifications.slack && <MessageSquare className="h-4 w-4 text-orange-500" />}
                      </div>
                    </div>
                  ))}
                  {alertEvents.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No alerts generated yet. Run a simulation to see live alerts.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Live Metrics */}
          <TabsContent value="metrics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Object.entries(liveMetrics).map(([platform, metrics]) => (
                <Card key={platform} className="border-2 border-orange-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {platformIcons[platform as keyof typeof platformIcons]}
                      {platform} Live Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Clock className="h-4 w-4 text-blue-600" />
                          <span className="text-xs text-gray-600">Response Time</span>
                        </div>
                        <div className="text-lg font-bold text-blue-600">{metrics.responseTime}ms</div>
                      </div>
                      <div className="text-center p-3 bg-red-50 rounded">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <XCircle className="h-4 w-4 text-red-600" />
                          <span className="text-xs text-gray-600">Failure Rate</span>
                        </div>
                        <div className="text-lg font-bold text-red-600">{metrics.failureRate}%</div>
                      </div>
                      <div className="text-center p-3 bg-yellow-50 rounded">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Zap className="h-4 w-4 text-yellow-600" />
                          <span className="text-xs text-gray-600">Rate Limit</span>
                        </div>
                        <div className="text-lg font-bold text-yellow-600">{metrics.rateLimit}%</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Timer className="h-4 w-4 text-purple-600" />
                          <span className="text-xs text-gray-600">Auth Expiry</span>
                        </div>
                        <div className="text-lg font-bold text-purple-600">{metrics.authExpiry} days</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
