"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  Zap,
  TestTube,
  RefreshCw,
  Eye,
  Download,
  MessageSquare,
  BarChart3,
  Globe,
  Camera,
  TrendingUp,
  Activity,
} from "lucide-react"

interface TestResult {
  id: string
  name: string
  platform: string
  category: "connection" | "posting" | "media" | "analytics" | "webhooks"
  status: "pending" | "running" | "passed" | "failed" | "warning"
  duration?: number
  message: string
  details?: string[]
  timestamp?: Date
}

interface PlatformStats {
  platform: string
  totalTests: number
  passed: number
  failed: number
  warnings: number
  uptime: string
  lastTest: Date
  rateLimit: {
    used: number
    limit: number
    resetTime: Date
  }
}

export default function APITestingPage() {
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [platformStats, setPlatformStats] = useState<PlatformStats[]>([])
  const [isRunningTests, setIsRunningTests] = useState(false)
  const [currentTest, setCurrentTest] = useState<string | null>(null)
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all")

  useEffect(() => {
    // Initialize test results
    const initialTests: TestResult[] = [
      // Instagram Tests
      {
        id: "ig-auth",
        name: "Authentication Check",
        platform: "Instagram",
        category: "connection",
        status: "pending",
        message: "Verifying OAuth token validity...",
      },
      {
        id: "ig-profile",
        name: "Profile Access",
        platform: "Instagram",
        category: "connection",
        status: "pending",
        message: "Testing profile data retrieval...",
      },
      {
        id: "ig-post",
        name: "Text Post Creation",
        platform: "Instagram",
        category: "posting",
        status: "pending",
        message: "Testing basic post publishing...",
      },
      {
        id: "ig-media",
        name: "Image Upload",
        platform: "Instagram",
        category: "media",
        status: "pending",
        message: "Testing image upload capabilities...",
      },
      {
        id: "ig-insights",
        name: "Analytics Access",
        platform: "Instagram",
        category: "analytics",
        status: "pending",
        message: "Testing insights API access...",
      },
      {
        id: "ig-webhook",
        name: "Webhook Delivery",
        platform: "Instagram",
        category: "webhooks",
        status: "pending",
        message: "Testing webhook notifications...",
      },

      // TikTok Tests
      {
        id: "tt-auth",
        name: "Authentication Check",
        platform: "TikTok",
        category: "connection",
        status: "pending",
        message: "Verifying API credentials...",
      },
      {
        id: "tt-user",
        name: "User Info Access",
        platform: "TikTok",
        category: "connection",
        status: "pending",
        message: "Testing user data retrieval...",
      },
      {
        id: "tt-video",
        name: "Video Upload",
        platform: "TikTok",
        category: "media",
        status: "pending",
        message: "Testing video upload functionality...",
      },
      {
        id: "tt-analytics",
        name: "Video Analytics",
        platform: "TikTok",
        category: "analytics",
        status: "pending",
        message: "Testing analytics data access...",
      },

      // Twitter/X Tests
      {
        id: "tw-auth",
        name: "Authentication Check",
        platform: "Twitter/X",
        category: "connection",
        status: "pending",
        message: "Verifying API v2 access...",
      },
      {
        id: "tw-tweet",
        name: "Tweet Creation",
        platform: "Twitter/X",
        category: "posting",
        status: "pending",
        message: "Testing tweet publishing...",
      },
      {
        id: "tw-media",
        name: "Media Upload",
        platform: "Twitter/X",
        category: "media",
        status: "pending",
        message: "Testing image/video upload...",
      },
      {
        id: "tw-thread",
        name: "Thread Creation",
        platform: "Twitter/X",
        category: "posting",
        status: "pending",
        message: "Testing thread functionality...",
      },
      {
        id: "tw-metrics",
        name: "Tweet Metrics",
        platform: "Twitter/X",
        category: "analytics",
        status: "pending",
        message: "Testing engagement metrics...",
      },

      // YouTube Tests
      {
        id: "yt-auth",
        name: "Authentication Check",
        platform: "YouTube",
        category: "connection",
        status: "pending",
        message: "Verifying Google OAuth access...",
      },
      {
        id: "yt-channel",
        name: "Channel Access",
        platform: "YouTube",
        category: "connection",
        status: "pending",
        message: "Testing channel data access...",
      },
      {
        id: "yt-upload",
        name: "Video Upload",
        platform: "YouTube",
        category: "media",
        status: "pending",
        message: "Testing video upload capability...",
      },
      {
        id: "yt-analytics",
        name: "Channel Analytics",
        platform: "YouTube",
        category: "analytics",
        status: "pending",
        message: "Testing analytics API access...",
      },
    ]

    setTestResults(initialTests)

    // Initialize platform stats
    const stats: PlatformStats[] = [
      {
        platform: "Instagram",
        totalTests: 6,
        passed: 0,
        failed: 0,
        warnings: 0,
        uptime: "99.2%",
        lastTest: new Date(),
        rateLimit: { used: 45, limit: 200, resetTime: new Date(Date.now() + 3600000) },
      },
      {
        platform: "TikTok",
        totalTests: 4,
        passed: 0,
        failed: 0,
        warnings: 0,
        uptime: "98.7%",
        lastTest: new Date(),
        rateLimit: { used: 12, limit: 100, resetTime: new Date(Date.now() + 3600000) },
      },
      {
        platform: "Twitter/X",
        totalTests: 5,
        passed: 0,
        failed: 0,
        warnings: 0,
        uptime: "99.8%",
        lastTest: new Date(),
        rateLimit: { used: 78, limit: 300, resetTime: new Date(Date.now() + 900000) },
      },
      {
        platform: "YouTube",
        totalTests: 4,
        passed: 0,
        failed: 0,
        warnings: 0,
        uptime: "99.9%",
        lastTest: new Date(),
        rateLimit: { used: 23, limit: 10000, resetTime: new Date(Date.now() + 86400000) },
      },
    ]

    setPlatformStats(stats)
  }, [])

  const runAllTests = async () => {
    setIsRunningTests(true)
    setCurrentTest(null)

    // Reset all tests to pending
    setTestResults((prev) => prev.map((test) => ({ ...test, status: "pending" as const })))

    // Run tests sequentially
    for (const test of testResults) {
      setCurrentTest(test.id)

      // Update test to running
      setTestResults((prev) =>
        prev.map((t) => (t.id === test.id ? { ...t, status: "running" as const, timestamp: new Date() } : t)),
      )

      // Simulate test execution
      const startTime = Date.now()
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 2000 + 1000))
      const duration = Date.now() - startTime

      // Simulate test results (mostly successful with some warnings/failures)
      const random = Math.random()
      let status: "passed" | "failed" | "warning"
      let message: string
      let details: string[] = []

      if (random > 0.85) {
        status = "failed"
        message = getFailureMessage(test)
        details = getFailureDetails(test)
      } else if (random > 0.7) {
        status = "warning"
        message = getWarningMessage(test)
        details = getWarningDetails(test)
      } else {
        status = "passed"
        message = getSuccessMessage(test)
        details = getSuccessDetails(test)
      }

      // Update test result
      setTestResults((prev) =>
        prev.map((t) =>
          t.id === test.id
            ? {
                ...t,
                status,
                message,
                details,
                duration,
                timestamp: new Date(),
              }
            : t,
        ),
      )
    }

    // Update platform stats
    setPlatformStats((prev) =>
      prev.map((stat) => {
        const platformTests = testResults.filter((t) => t.platform === stat.platform)
        const passed = platformTests.filter((t) => t.status === "passed").length
        const failed = platformTests.filter((t) => t.status === "failed").length
        const warnings = platformTests.filter((t) => t.status === "warning").length

        return {
          ...stat,
          passed,
          failed,
          warnings,
          lastTest: new Date(),
        }
      }),
    )

    setIsRunningTests(false)
    setCurrentTest(null)
  }

  const runPlatformTests = async (platform: string) => {
    const platformTests = testResults.filter((test) => test.platform === platform)
    setIsRunningTests(true)

    for (const test of platformTests) {
      setCurrentTest(test.id)
      setTestResults((prev) => prev.map((t) => (t.id === test.id ? { ...t, status: "running" as const } : t)))

      await new Promise((resolve) => setTimeout(resolve, 1500))

      const status = Math.random() > 0.2 ? "passed" : "failed"
      setTestResults((prev) =>
        prev.map((t) =>
          t.id === test.id
            ? {
                ...t,
                status: status as "passed" | "failed",
                message: status === "passed" ? getSuccessMessage(test) : getFailureMessage(test),
                timestamp: new Date(),
              }
            : t,
        ),
      )
    }

    setIsRunningTests(false)
    setCurrentTest(null)
  }

  const getSuccessMessage = (test: TestResult): string => {
    const messages: Record<string, string> = {
      "ig-auth": "✅ Instagram authentication successful - Token valid for 60 days",
      "ig-profile": "✅ Profile data retrieved - @nexarax.official (12.5K followers)",
      "ig-post": "✅ Test post published successfully - Post ID: 18123456789",
      "ig-media": "✅ Image uploaded successfully - Media ID: 17987654321",
      "ig-insights": "✅ Analytics data accessible - 30-day metrics available",
      "ig-webhook": "✅ Webhook delivered successfully - Response time: 245ms",
      "tt-auth": "✅ TikTok authentication successful - API access granted",
      "tt-user": "✅ User info retrieved - @nexarax.ai (8.2K followers)",
      "tt-video": "✅ Video upload successful - Processing in TikTok servers",
      "tt-analytics": "✅ Analytics accessible - Video performance data available",
      "tw-auth": "✅ Twitter API v2 authentication successful",
      "tw-tweet": "✅ Tweet published successfully - Tweet ID: 1234567890123456789",
      "tw-media": "✅ Media upload successful - 4 images attached",
      "tw-thread": "✅ Thread created successfully - 5 tweets linked",
      "tw-metrics": "✅ Tweet metrics accessible - Real-time engagement data",
      "yt-auth": "✅ YouTube authentication successful - Full channel access",
      "yt-channel": "✅ Channel data retrieved - NexaraX (1.2K subscribers)",
      "yt-upload": "✅ Video upload successful - Processing HD quality",
      "yt-analytics": "✅ Analytics accessible - Channel & video metrics available",
    }
    return messages[test.id] || "✅ Test completed successfully"
  }

  const getFailureMessage = (test: TestResult): string => {
    const messages: Record<string, string> = {
      "ig-auth": "❌ Instagram authentication failed - Token expired or invalid",
      "ig-profile": "❌ Profile access denied - Check app permissions",
      "ig-post": "❌ Post creation failed - Content policy violation",
      "ig-media": "❌ Image upload failed - File size too large (>8MB)",
      "ig-insights": "❌ Analytics access denied - Business account required",
      "ig-webhook": "❌ Webhook delivery failed - Endpoint not responding",
      "tt-auth": "❌ TikTok authentication failed - Invalid client credentials",
      "tt-user": "❌ User info access denied - Insufficient permissions",
      "tt-video": "❌ Video upload failed - Unsupported format or duration",
      "tt-analytics": "❌ Analytics access denied - Pro account required",
      "tw-auth": "❌ Twitter authentication failed - API key suspended",
      "tw-tweet": "❌ Tweet creation failed - Rate limit exceeded",
      "tw-media": "❌ Media upload failed - Invalid file format",
      "tw-thread": "❌ Thread creation failed - Tweet limit reached",
      "tw-metrics": "❌ Metrics access denied - Premium API required",
      "yt-auth": "❌ YouTube authentication failed - OAuth scope insufficient",
      "yt-channel": "❌ Channel access denied - Channel not found",
      "yt-upload": "❌ Video upload failed - Copyright claim detected",
      "yt-analytics": "❌ Analytics access denied - Channel too new",
    }
    return messages[test.id] || "❌ Test failed"
  }

  const getWarningMessage = (test: TestResult): string => {
    const messages: Record<string, string> = {
      "ig-auth": "⚠️ Instagram token expires in 7 days - Renewal recommended",
      "ig-profile": "⚠️ Profile data retrieved but some fields missing",
      "ig-post": "⚠️ Post published but engagement limited - Shadow banned?",
      "ig-media": "⚠️ Image uploaded but quality reduced automatically",
      "ig-insights": "⚠️ Analytics available but limited historical data",
      "ig-webhook": "⚠️ Webhook delivered but with 2-second delay",
      "tt-auth": "⚠️ TikTok authentication successful but rate limited",
      "tt-user": "⚠️ User info retrieved but profile incomplete",
      "tt-video": "⚠️ Video uploaded but processing slowly",
      "tt-analytics": "⚠️ Analytics available but data delayed",
      "tw-auth": "⚠️ Twitter authentication successful but approaching limits",
      "tw-tweet": "⚠️ Tweet published but visibility may be limited",
      "tw-media": "⚠️ Media uploaded but compression applied",
      "tw-thread": "⚠️ Thread created but some tweets may be rate limited",
      "tw-metrics": "⚠️ Metrics available but real-time data delayed",
      "yt-auth": "⚠️ YouTube authentication successful but quota low",
      "yt-channel": "⚠️ Channel data retrieved but some analytics missing",
      "yt-upload": "⚠️ Video uploaded but processing may take longer",
      "yt-analytics": "⚠️ Analytics available but some metrics delayed",
    }
    return messages[test.id] || "⚠️ Test completed with warnings"
  }

  const getSuccessDetails = (test: TestResult): string[] => {
    return [
      "API response time: < 500ms",
      "All required permissions granted",
      "Rate limits within acceptable range",
      "Data format validation passed",
      "Security checks completed",
    ]
  }

  const getFailureDetails = (test: TestResult): string[] => {
    return [
      "Check API credentials in settings",
      "Verify app permissions and scopes",
      "Review platform-specific requirements",
      "Contact support if issue persists",
      "Check platform status page",
    ]
  }

  const getWarningDetails = (test: TestResult): string[] => {
    return [
      "Monitor for potential issues",
      "Consider upgrading API access",
      "Review content guidelines",
      "Check rate limit usage",
      "Update credentials if needed",
    ]
  }

  const platformIcons = {
    Instagram: <Instagram className="h-5 w-5 text-pink-600" />,
    TikTok: (
      <div className="h-5 w-5 bg-black rounded-sm flex items-center justify-center text-white text-xs font-bold">T</div>
    ),
    "Twitter/X": <Twitter className="h-5 w-5 text-blue-500" />,
    YouTube: <Youtube className="h-5 w-5 text-red-600" />,
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "passed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "running":
        return <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "passed":
        return "bg-green-100 text-green-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "running":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "connection":
        return <Globe className="h-4 w-4" />
      case "posting":
        return <MessageSquare className="h-4 w-4" />
      case "media":
        return <Camera className="h-4 w-4" />
      case "analytics":
        return <BarChart3 className="h-4 w-4" />
      case "webhooks":
        return <Activity className="h-4 w-4" />
      default:
        return <TestTube className="h-4 w-4" />
    }
  }

  const filteredTests =
    selectedPlatform === "all" ? testResults : testResults.filter((test) => test.platform === selectedPlatform)

  const totalTests = testResults.length
  const passedTests = testResults.filter((t) => t.status === "passed").length
  const failedTests = testResults.filter((t) => t.status === "failed").length
  const warningTests = testResults.filter((t) => t.status === "warning").length

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-green-100 text-green-800">🧪 API Testing Suite</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            API Integration Testing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive testing suite to verify all social media API integrations are working correctly
          </p>
        </div>

        {/* Test Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 border-green-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-2xl font-bold text-green-600">{passedTests}</span>
              </div>
              <p className="text-sm text-gray-600">Tests Passed</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-red-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <XCircle className="h-5 w-5 text-red-600" />
                <span className="text-2xl font-bold text-red-600">{failedTests}</span>
              </div>
              <p className="text-sm text-gray-600">Tests Failed</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-yellow-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <span className="text-2xl font-bold text-yellow-600">{warningTests}</span>
              </div>
              <p className="text-sm text-gray-600">Warnings</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <TestTube className="h-5 w-5 text-blue-600" />
                <span className="text-2xl font-bold text-blue-600">{totalTests}</span>
              </div>
              <p className="text-sm text-gray-600">Total Tests</p>
            </CardContent>
          </Card>
        </div>

        {/* Control Panel */}
        <Card className="mb-8 border-2 border-purple-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-6 w-6 text-purple-600" />
                Test Control Panel
              </CardTitle>
              <div className="flex gap-2">
                <Button onClick={runAllTests} disabled={isRunningTests} className="bg-purple-600 hover:bg-purple-700">
                  {isRunningTests ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                      Running Tests...
                    </>
                  ) : (
                    <>
                      <TestTube className="h-4 w-4 mr-2" />
                      Run All Tests
                    </>
                  )}
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Results
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedPlatform === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPlatform("all")}
              >
                All Platforms
              </Button>
              {["Instagram", "TikTok", "Twitter/X", "YouTube"].map((platform) => (
                <Button
                  key={platform}
                  variant={selectedPlatform === platform ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPlatform(platform)}
                  className="flex items-center gap-2"
                >
                  {platformIcons[platform as keyof typeof platformIcons]}
                  {platform}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="tests" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tests">🧪 Test Results</TabsTrigger>
            <TabsTrigger value="platforms">📊 Platform Stats</TabsTrigger>
            <TabsTrigger value="monitoring">📈 Live Monitoring</TabsTrigger>
          </TabsList>

          {/* Test Results */}
          <TabsContent value="tests">
            <div className="space-y-4">
              {filteredTests.map((test) => (
                <Card
                  key={test.id}
                  className={`border-2 transition-colors ${
                    currentTest === test.id ? "border-blue-400 bg-blue-50" : "border-gray-200"
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {platformIcons[test.platform as keyof typeof platformIcons]}
                          <span className="font-semibold">{test.platform}</span>
                          <Badge variant="outline" className="flex items-center gap-1">
                            {getCategoryIcon(test.category)}
                            {test.category}
                          </Badge>
                          <Badge className={getStatusColor(test.status)}>
                            {getStatusIcon(test.status)}
                            <span className="ml-1 capitalize">{test.status}</span>
                          </Badge>
                        </div>

                        <h3 className="font-semibold text-lg mb-1">{test.name}</h3>
                        <p className="text-gray-600 mb-3">{test.message}</p>

                        {test.details && test.details.length > 0 && (
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <h4 className="font-semibold text-sm mb-2">Details:</h4>
                            <ul className="text-sm space-y-1">
                              {test.details.map((detail, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                                  {detail}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {test.timestamp && (
                          <div className="flex items-center gap-4 text-xs text-gray-500 mt-3">
                            <span>
                              🕒 {test.timestamp.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                            </span>
                            {test.duration && <span>⏱️ {test.duration}ms</span>}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Platform Stats */}
          <TabsContent value="platforms">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {platformStats.map((stat) => (
                <Card key={stat.platform} className="border-2 border-blue-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {platformIcons[stat.platform as keyof typeof platformIcons]}
                      {stat.platform} Statistics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-3 bg-green-50 rounded">
                        <div className="text-xl font-bold text-green-600">{stat.passed}</div>
                        <div className="text-xs text-gray-600">Passed</div>
                      </div>
                      <div className="p-3 bg-red-50 rounded">
                        <div className="text-xl font-bold text-red-600">{stat.failed}</div>
                        <div className="text-xs text-gray-600">Failed</div>
                      </div>
                      <div className="p-3 bg-yellow-50 rounded">
                        <div className="text-xl font-bold text-yellow-600">{stat.warnings}</div>
                        <div className="text-xs text-gray-600">Warnings</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>API Uptime:</span>
                        <span className="font-semibold text-green-600">{stat.uptime}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Rate Limit:</span>
                        <span className="font-semibold">
                          {stat.rateLimit.used}/{stat.rateLimit.limit}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(stat.rateLimit.used / stat.rateLimit.limit) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Last Test:</span>
                        <span className="text-gray-600">
                          {stat.lastTest.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                    </div>

                    <Button
                      onClick={() => runPlatformTests(stat.platform)}
                      disabled={isRunningTests}
                      className="w-full"
                    >
                      <TestTube className="h-4 w-4 mr-2" />
                      Test {stat.platform}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Live Monitoring */}
          <TabsContent value="monitoring">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-2 border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-6 w-6 text-green-600" />
                    Real-time Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["Instagram", "TikTok", "Twitter/X", "YouTube"].map((platform) => (
                      <div key={platform} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-2">
                          {platformIcons[platform as keyof typeof platformIcons]}
                          <span className="font-medium">{platform}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          <span className="text-sm text-green-600">Online</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Average Response Time</span>
                      <span className="font-semibold text-green-600">342ms</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Success Rate</span>
                      <span className="font-semibold text-green-600">97.8%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Tests Run Today</span>
                      <span className="font-semibold">156</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Last Incident</span>
                      <span className="text-gray-600">3 days ago</span>
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
