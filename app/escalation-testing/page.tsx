"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Play,
  Square,
  CheckCircle,
  XCircle,
  Clock,
  Mail,
  MessageSquare,
  Phone,
  Webhook,
  Activity,
  TestTube,
  Target,
  Timer,
  Bell,
  Shield,
  TrendingUp,
  BarChart3,
  Instagram,
  Twitter,
  Youtube,
  Settings,
  RefreshCw,
  Download,
  Eye,
} from "lucide-react"
import { EscalationFlow } from "@/components/escalation-flow"

interface TestScenario {
  id: string
  name: string
  description: string
  platform: string
  severity: "warning" | "critical" | "emergency"
  issueType: string
  expectedLevels: number
  expectedDuration: number // minutes
  testChannels: string[]
  businessImpact: "low" | "medium" | "high" | "critical"
}

interface TestResult {
  scenarioId: string
  status: "pending" | "running" | "passed" | "failed" | "partial"
  startTime: Date
  endTime?: Date
  duration: number
  levelResults: LevelTestResult[]
  notificationResults: NotificationTestResult[]
  overallScore: number
  issues: string[]
}

interface LevelTestResult {
  level: number
  levelName: string
  triggered: boolean
  triggerTime: Date
  acknowledged: boolean
  acknowledgeTime?: Date
  escalated: boolean
  escalateTime?: Date
  contacts: ContactTestResult[]
  expectedDelay: number
  actualDelay: number
  passed: boolean
}

interface ContactTestResult {
  name: string
  email: string
  phone: string
  reachable: boolean
  responseTime: number
  availability: "available" | "busy" | "unavailable"
}

interface NotificationTestResult {
  channel: "email" | "sms" | "slack" | "phone" | "webhook"
  level: number
  sent: boolean
  delivered: boolean
  acknowledged: boolean
  deliveryTime: number
  errorMessage?: string
  retryCount: number
}

export default function EscalationTestingPage() {
  const [testScenarios] = useState<TestScenario[]>([
    {
      id: "instagram-auth-critical",
      name: "Instagram Authentication Failure",
      description: "Critical authentication failure requiring immediate technical response",
      platform: "Instagram",
      severity: "critical",
      issueType: "authentication",
      expectedLevels: 3,
      expectedDuration: 45,
      testChannels: ["email", "slack", "sms"],
      businessImpact: "high",
    },
    {
      id: "tiktok-quota-emergency",
      name: "TikTok Quota Emergency",
      description: "Emergency quota exceeded requiring full escalation path",
      platform: "TikTok",
      severity: "emergency",
      issueType: "quota_exceeded",
      expectedLevels: 4,
      expectedDuration: 90,
      testChannels: ["email", "sms", "phone", "slack"],
      businessImpact: "critical",
    },
    {
      id: "twitter-rate-warning",
      name: "Twitter Rate Limit Warning",
      description: "Rate limit warning requiring L1 response only",
      platform: "Twitter/X",
      severity: "warning",
      issueType: "rate_limit",
      expectedLevels: 1,
      expectedDuration: 15,
      testChannels: ["email", "slack"],
      businessImpact: "low",
    },
    {
      id: "youtube-upload-critical",
      name: "YouTube Upload Failure",
      description: "Critical upload failure affecting content delivery",
      platform: "YouTube",
      severity: "critical",
      issueType: "upload_failure",
      expectedLevels: 3,
      expectedDuration: 45,
      testChannels: ["email", "sms", "slack"],
      businessImpact: "high",
    },
  ])

  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [currentTest, setCurrentTest] = useState<TestResult | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [selectedScenario, setSelectedScenario] = useState<TestScenario | null>(null)
  const [testProgress, setTestProgress] = useState(0)
  const [liveResults, setLiveResults] = useState<any[]>([])
  const [testStats, setTestStats] = useState({
    totalTests: 0,
    passedTests: 0,
    failedTests: 0,
    avgResponseTime: 0,
    successRate: 0,
  })

  useEffect(() => {
    // Calculate test statistics
    const total = testResults.length
    const passed = testResults.filter((r) => r.status === "passed").length
    const failed = testResults.filter((r) => r.status === "failed").length
    const avgTime = testResults.length > 0 ? testResults.reduce((acc, r) => acc + r.duration, 0) / total : 0
    const successRate = total > 0 ? (passed / total) * 100 : 0

    setTestStats({
      totalTests: total,
      passedTests: passed,
      failedTests: failed,
      avgResponseTime: avgTime,
      successRate,
    })
  }, [testResults])

  const runSingleTest = async (scenario: TestScenario) => {
    setIsRunning(true)
    setSelectedScenario(scenario)
    setTestProgress(0)

    const testResult: TestResult = {
      scenarioId: scenario.id,
      status: "running",
      startTime: new Date(),
      duration: 0,
      levelResults: [],
      notificationResults: [],
      overallScore: 0,
      issues: [],
    }

    setCurrentTest(testResult)
    setLiveResults([])

    try {
      // Simulate escalation flow testing
      await simulateEscalationTest(scenario, testResult)
    } catch (error) {
      testResult.status = "failed"
      testResult.issues.push(`Test execution failed: ${error}`)
    }

    testResult.endTime = new Date()
    testResult.duration = (testResult.endTime.getTime() - testResult.startTime.getTime()) / 1000 / 60 // minutes

    setTestResults((prev) => [...prev.filter((r) => r.scenarioId !== scenario.id), testResult])
    setCurrentTest(null)
    setIsRunning(false)
  }

  const simulateEscalationTest = async (scenario: TestScenario, testResult: TestResult) => {
    const levels = ["L1 - Technical", "L2 - Team Lead", "L3 - Management", "L4 - Executive"]
    const contacts = [
      { name: "Alex Chen", email: "alex@nexarax.com", phone: "+1-555-0101" },
      { name: "Sarah Johnson", email: "sarah@nexarax.com", phone: "+1-555-0102" },
      { name: "Michael Rodriguez", email: "michael@nexarax.com", phone: "+1-555-0201" },
      { name: "Emma Thompson", email: "emma@nexarax.com", phone: "+1-555-0301" },
      { name: "David Kim", email: "david@nexarax.com", phone: "+1-555-0401" },
    ]

    // Test each expected level
    for (let level = 0; level < scenario.expectedLevels; level++) {
      setTestProgress(((level + 1) / scenario.expectedLevels) * 100)

      const levelResult: LevelTestResult = {
        level,
        levelName: levels[level],
        triggered: false,
        triggerTime: new Date(),
        acknowledged: false,
        escalated: false,
        contacts: [],
        expectedDelay: level === 0 ? 0 : level * 15, // 0, 15, 30, 45 minutes
        actualDelay: 0,
        passed: false,
      }

      // Simulate level trigger
      await new Promise((resolve) => setTimeout(resolve, 1000))
      levelResult.triggered = true

      setLiveResults((prev) => [...prev, { type: "level_triggered", level, time: new Date(), data: levelResult }])

      // Test contacts for this level
      const levelContacts = contacts.slice(level, level + 2) // 2 contacts per level
      for (const contact of levelContacts) {
        const contactResult: ContactTestResult = {
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          reachable: Math.random() > 0.1, // 90% reachable
          responseTime: Math.random() * 300 + 30, // 30-330 seconds
          availability: Math.random() > 0.2 ? "available" : Math.random() > 0.5 ? "busy" : "unavailable",
        }

        levelResult.contacts.push(contactResult)
        await new Promise((resolve) => setTimeout(resolve, 500))

        setLiveResults((prev) => [
          ...prev,
          { type: "contact_tested", level, contact: contact.name, result: contactResult, time: new Date() },
        ])
      }

      // Test notification channels for this level
      for (const channel of scenario.testChannels) {
        const notificationResult: NotificationTestResult = {
          channel: channel as any,
          level,
          sent: true,
          delivered: Math.random() > 0.05, // 95% delivery rate
          acknowledged: Math.random() > 0.3, // 70% acknowledgment rate
          deliveryTime: Math.random() * 60 + 5, // 5-65 seconds
          retryCount: Math.random() > 0.9 ? Math.floor(Math.random() * 3) + 1 : 0,
        }

        if (!notificationResult.delivered) {
          notificationResult.errorMessage = "Network timeout"
          notificationResult.retryCount = 2
        }

        testResult.notificationResults.push(notificationResult)
        await new Promise((resolve) => setTimeout(resolve, 800))

        setLiveResults((prev) => [
          ...prev,
          {
            type: "notification_sent",
            level,
            channel,
            result: notificationResult,
            time: new Date(),
          },
        ])
      }

      // Simulate acknowledgment or escalation
      if (level < scenario.expectedLevels - 1) {
        // Escalate to next level
        await new Promise((resolve) => setTimeout(resolve, 1500))
        levelResult.escalated = true
        levelResult.escalateTime = new Date()

        setLiveResults((prev) => [...prev, { type: "escalated", level, time: new Date() }])
      } else {
        // Final level - acknowledge and resolve
        await new Promise((resolve) => setTimeout(resolve, 1000))
        levelResult.acknowledged = true
        levelResult.acknowledgeTime = new Date()

        setLiveResults((prev) => [...prev, { type: "acknowledged", level, time: new Date() }])
      }

      levelResult.actualDelay = (new Date().getTime() - levelResult.triggerTime.getTime()) / 1000 / 60
      levelResult.passed = levelResult.triggered && (levelResult.acknowledged || levelResult.escalated)

      testResult.levelResults.push(levelResult)
    }

    // Calculate overall test score
    const levelScore = testResult.levelResults.filter((l) => l.passed).length / testResult.levelResults.length
    const notificationScore =
      testResult.notificationResults.filter((n) => n.delivered).length / testResult.notificationResults.length
    const contactScore =
      testResult.levelResults.flatMap((l) => l.contacts).filter((c) => c.reachable).length /
      testResult.levelResults.flatMap((l) => l.contacts).length

    testResult.overallScore = Math.round(((levelScore + notificationScore + contactScore) / 3) * 100)

    // Determine test status
    if (testResult.overallScore >= 90) {
      testResult.status = "passed"
    } else if (testResult.overallScore >= 70) {
      testResult.status = "partial"
    } else {
      testResult.status = "failed"
    }

    // Add issues if any
    if (testResult.overallScore < 100) {
      const failedNotifications = testResult.notificationResults.filter((n) => !n.delivered)
      const unreachableContacts = testResult.levelResults.flatMap((l) => l.contacts).filter((c) => !c.reachable)

      if (failedNotifications.length > 0) {
        testResult.issues.push(`${failedNotifications.length} notification(s) failed to deliver`)
      }
      if (unreachableContacts.length > 0) {
        testResult.issues.push(`${unreachableContacts.length} contact(s) unreachable`)
      }
    }

    setLiveResults((prev) => [...prev, { type: "test_completed", score: testResult.overallScore, time: new Date() }])
  }

  const runAllTests = async () => {
    setIsRunning(true)
    for (const scenario of testScenarios) {
      await runSingleTest(scenario)
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Pause between tests
    }
    setIsRunning(false)
  }

  const stopTest = () => {
    setIsRunning(false)
    if (currentTest) {
      currentTest.status = "failed"
      currentTest.issues.push("Test manually stopped")
      setCurrentTest(null)
    }
  }

  const clearResults = () => {
    setTestResults([])
    setCurrentTest(null)
    setLiveResults([])
  }

  const exportResults = () => {
    const data = {
      testStats,
      testResults,
      exportTime: new Date().toISOString(),
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `escalation-test-results-${new Date().toISOString().split("T")[0]}.json`
    a.click()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "passed":
        return "bg-green-100 text-green-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "partial":
        return "bg-yellow-100 text-yellow-800"
      case "running":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "email":
        return <Mail className="h-4 w-4 text-blue-500" />
      case "sms":
        return <MessageSquare className="h-4 w-4 text-green-500" />
      case "phone":
        return <Phone className="h-4 w-4 text-red-500" />
      case "slack":
        return <MessageSquare className="h-4 w-4 text-purple-500" />
      case "webhook":
        return <Webhook className="h-4 w-4 text-orange-500" />
      default:
        return <Bell className="h-4 w-4 text-gray-500" />
    }
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "Instagram":
        return <Instagram className="h-5 w-5 text-pink-600" />
      case "TikTok":
        return (
          <div className="h-5 w-5 bg-black rounded-sm flex items-center justify-center text-white text-xs font-bold">
            T
          </div>
        )
      case "Twitter/X":
        return <Twitter className="h-5 w-5 text-blue-500" />
      case "YouTube":
        return <Youtube className="h-5 w-5 text-red-600" />
      default:
        return <Activity className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-100 text-blue-800">🧪 Testing Suite</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Escalation Flow Testing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive testing of escalation flows, notifications, and response times
          </p>
        </div>

        {/* Test Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card className="border-2 border-blue-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <TestTube className="h-5 w-5 text-blue-600" />
                <span className="text-2xl font-bold text-blue-600">{testStats.totalTests}</span>
              </div>
              <p className="text-sm text-gray-600">Total Tests</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-2xl font-bold text-green-600">{testStats.passedTests}</span>
              </div>
              <p className="text-sm text-gray-600">Passed</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-red-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <XCircle className="h-5 w-5 text-red-600" />
                <span className="text-2xl font-bold text-red-600">{testStats.failedTests}</span>
              </div>
              <p className="text-sm text-gray-600">Failed</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Timer className="h-5 w-5 text-orange-600" />
                <span className="text-2xl font-bold text-orange-600">{testStats.avgResponseTime.toFixed(1)}m</span>
              </div>
              <p className="text-sm text-gray-600">Avg Response</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                <span className="text-2xl font-bold text-purple-600">{testStats.successRate.toFixed(1)}%</span>
              </div>
              <p className="text-sm text-gray-600">Success Rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Control Panel */}
        <Card className="mb-8 border-2 border-blue-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-blue-600" />
                Test Control Panel
              </CardTitle>
              <div className="flex gap-2">
                <Button onClick={runAllTests} disabled={isRunning} className="bg-blue-600 hover:bg-blue-700">
                  <Play className="h-4 w-4 mr-2" />
                  Run All Tests
                </Button>
                {isRunning && (
                  <Button onClick={stopTest} variant="outline">
                    <Square className="h-4 w-4 mr-2" />
                    Stop Test
                  </Button>
                )}
                <Button onClick={clearResults} variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Clear Results
                </Button>
                <Button onClick={exportResults} variant="outline" disabled={testResults.length === 0}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Results
                </Button>
              </div>
            </div>
          </CardHeader>
          {isRunning && currentTest && (
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Testing: {selectedScenario?.name}</span>
                  <Badge className="bg-blue-100 text-blue-800">RUNNING</Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${testProgress}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-600">Progress: {testProgress.toFixed(0)}%</div>
              </div>
            </CardContent>
          )}
        </Card>

        <Tabs defaultValue="scenarios" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="scenarios">🎯 Test Scenarios</TabsTrigger>
            <TabsTrigger value="results">📊 Test Results</TabsTrigger>
            <TabsTrigger value="live">📡 Live Testing</TabsTrigger>
            <TabsTrigger value="analytics">📈 Analytics</TabsTrigger>
          </TabsList>

          {/* Test Scenarios */}
          <TabsContent value="scenarios">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {testScenarios.map((scenario) => (
                <Card key={scenario.id} className="border-2 border-green-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        {getPlatformIcon(scenario.platform)}
                        {scenario.name}
                      </CardTitle>
                      <div className="flex gap-2">
                        <Badge
                          className={
                            scenario.severity === "emergency"
                              ? "bg-purple-100 text-purple-800"
                              : scenario.severity === "critical"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {scenario.severity.toUpperCase()}
                        </Badge>
                        <Badge
                          className={
                            scenario.businessImpact === "critical"
                              ? "bg-red-100 text-red-800"
                              : scenario.businessImpact === "high"
                                ? "bg-orange-100 text-orange-800"
                                : scenario.businessImpact === "medium"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                          }
                        >
                          {scenario.businessImpact.toUpperCase()} IMPACT
                        </Badge>
                      </div>
                    </div>
                    <CardDescription>{scenario.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">Test Parameters</h4>
                          <div className="space-y-1 text-sm">
                            <div>Expected Levels: {scenario.expectedLevels}</div>
                            <div>Max Duration: {scenario.expectedDuration} min</div>
                            <div>Issue Type: {scenario.issueType.replace(/_/g, " ")}</div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Test Channels</h4>
                          <div className="flex flex-wrap gap-1">
                            {scenario.testChannels.map((channel) => (
                              <div
                                key={channel}
                                className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-xs"
                              >
                                {getChannelIcon(channel)}
                                <span className="capitalize">{channel}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={() => runSingleTest(scenario)}
                          disabled={isRunning}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Run Test
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          Preview Flow
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="h-4 w-4 mr-2" />
                          Configure
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Test Results */}
          <TabsContent value="results">
            <div className="space-y-6">
              {testResults.map((result) => {
                const scenario = testScenarios.find((s) => s.id === result.scenarioId)
                return (
                  <Card key={result.scenarioId} className="border-2 border-gray-200">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          {scenario && getPlatformIcon(scenario.platform)}
                          {scenario?.name || result.scenarioId}
                        </CardTitle>
                        <div className="flex gap-2">
                          <Badge className={getStatusColor(result.status)}>{result.status.toUpperCase()}</Badge>
                          <Badge className="bg-blue-100 text-blue-800">Score: {result.overallScore}%</Badge>
                        </div>
                      </div>
                      <CardDescription>
                        Duration: {result.duration.toFixed(1)} minutes • Started:{" "}
                        {result.startTime.toLocaleTimeString()}
                        {result.endTime && ` • Ended: ${result.endTime.toLocaleTimeString()}`}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Level Results */}
                        <div>
                          <h4 className="font-semibold mb-3">Escalation Levels</h4>
                          <div className="space-y-2">
                            {result.levelResults.map((level) => (
                              <div
                                key={level.level}
                                className={`p-3 rounded border ${level.passed ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50"}`}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-medium">{level.levelName}</span>
                                  {level.passed ? (
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                  ) : (
                                    <XCircle className="h-4 w-4 text-red-600" />
                                  )}
                                </div>
                                <div className="text-sm text-gray-600">
                                  <div>Triggered: {level.triggered ? "✓" : "✗"}</div>
                                  <div>Acknowledged: {level.acknowledged ? "✓" : "✗"}</div>
                                  <div>Escalated: {level.escalated ? "✓" : "✗"}</div>
                                  <div>
                                    Contacts Reached: {level.contacts.filter((c) => c.reachable).length}/
                                    {level.contacts.length}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Notification Results */}
                        <div>
                          <h4 className="font-semibold mb-3">Notification Results</h4>
                          <div className="space-y-2">
                            {result.notificationResults.map((notification, index) => (
                              <div
                                key={index}
                                className={`p-3 rounded border ${notification.delivered ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50"}`}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    {getChannelIcon(notification.channel)}
                                    <span className="font-medium capitalize">{notification.channel}</span>
                                    <Badge variant="outline">L{notification.level + 1}</Badge>
                                  </div>
                                  {notification.delivered ? (
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                  ) : (
                                    <XCircle className="h-4 w-4 text-red-600" />
                                  )}
                                </div>
                                <div className="text-sm text-gray-600">
                                  <div>Delivery Time: {notification.deliveryTime.toFixed(1)}s</div>
                                  <div>Acknowledged: {notification.acknowledged ? "✓" : "✗"}</div>
                                  {notification.retryCount > 0 && <div>Retries: {notification.retryCount}</div>}
                                  {notification.errorMessage && (
                                    <div className="text-red-600">Error: {notification.errorMessage}</div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Issues */}
                      {result.issues.length > 0 && (
                        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
                          <h5 className="font-semibold text-red-800 mb-2">Issues Found:</h5>
                          <ul className="text-sm text-red-700 space-y-1">
                            {result.issues.map((issue, index) => (
                              <li key={index}>• {issue}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Live Testing */}
          <TabsContent value="live">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Live Test Feed */}
              <Card className="border-2 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-6 w-6 text-blue-600" />
                    Live Test Feed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-96 overflow-y-auto space-y-2">
                    {liveResults.length === 0 ? (
                      <div className="text-center text-gray-500 py-8">
                        <TestTube className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>No active tests. Start a test to see live results.</p>
                      </div>
                    ) : (
                      liveResults.map((result, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded border">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm">{result.type.replace(/_/g, " ").toUpperCase()}</span>
                            <span className="text-xs text-gray-500">{result.time.toLocaleTimeString()}</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            {result.type === "level_triggered" && `Level ${result.level + 1} activated`}
                            {result.type === "contact_tested" && (
                              <span>
                                {result.contact}: {result.result.reachable ? "✓ Reachable" : "✗ Unreachable"} (
                                {result.result.responseTime.toFixed(0)}s)
                              </span>
                            )}
                            {result.type === "notification_sent" && (
                              <span>
                                {result.channel} notification: {result.result.delivered ? "✓ Delivered" : "✗ Failed"} (
                                {result.result.deliveryTime.toFixed(1)}s)
                              </span>
                            )}
                            {result.type === "escalated" && `Escalated to Level ${result.level + 2}`}
                            {result.type === "acknowledged" && `Level ${result.level + 1} acknowledged`}
                            {result.type === "test_completed" && `Test completed with score: ${result.score}%`}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Interactive Flow */}
              <Card className="border-2 border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-6 w-6 text-green-600" />
                    Interactive Test Flow
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedScenario ? (
                    <EscalationFlow
                      platform={selectedScenario.platform}
                      severity={selectedScenario.severity}
                      issueType={selectedScenario.issueType}
                      isActive={isRunning}
                      autoProgress={true}
                      onLevelChange={(level) => console.log("Level changed:", level)}
                      onStatusChange={(status) => console.log("Status changed:", status)}
                    />
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      <Target className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>Select a test scenario to see the interactive flow.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance Metrics */}
              <Card className="border-2 border-purple-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-6 w-6 text-purple-600" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded">
                        <div className="text-2xl font-bold text-blue-600">{testStats.successRate.toFixed(1)}%</div>
                        <div className="text-sm text-gray-600">Overall Success Rate</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded">
                        <div className="text-2xl font-bold text-green-600">{testStats.avgResponseTime.toFixed(1)}m</div>
                        <div className="text-sm text-gray-600">Avg Response Time</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Channel Reliability</h4>
                      <div className="space-y-2">
                        {["email", "sms", "slack", "phone"].map((channel) => {
                          const channelResults = testResults.flatMap((r) =>
                            r.notificationResults.filter((n) => n.channel === channel),
                          )
                          const successRate =
                            channelResults.length > 0
                              ? (channelResults.filter((n) => n.delivered).length / channelResults.length) * 100
                              : 0

                          return (
                            <div key={channel} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {getChannelIcon(channel)}
                                <span className="capitalize">{channel}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-24 bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-green-500 h-2 rounded-full"
                                    style={{ width: `${successRate}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium">{successRate.toFixed(0)}%</span>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Test History */}
              <Card className="border-2 border-orange-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-6 w-6 text-orange-600" />
                    Test History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {testResults.slice(-10).map((result) => {
                      const scenario = testScenarios.find((s) => s.id === result.scenarioId)
                      return (
                        <div
                          key={`${result.scenarioId}-${result.startTime.getTime()}`}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded"
                        >
                          <div>
                            <div className="font-medium text-sm">{scenario?.name || result.scenarioId}</div>
                            <div className="text-xs text-gray-600">
                              {result.startTime.toLocaleString()} • {result.duration.toFixed(1)}m
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(result.status)}>{result.status}</Badge>
                            <span className="text-sm font-medium">{result.overallScore}%</span>
                          </div>
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
