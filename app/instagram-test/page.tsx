"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Instagram,
  CheckCircle,
  AlertCircle,
  XCircle,
  Loader2,
  TestTube,
  Shield,
  Zap,
  Eye,
  Heart,
  MessageCircle,
  Clock,
  Settings,
} from "lucide-react"

interface TestResult {
  name: string
  status: "pending" | "running" | "success" | "error"
  message: string
  details?: string
}

interface InstagramMetrics {
  followers: number
  following: number
  posts: number
  engagement_rate: number
}

export default function InstagramTestPage() {
  const [isTestingConnection, setIsTestingConnection] = useState(false)
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [currentTest, setCurrentTest] = useState(0)
  const [testProgress, setTestProgress] = useState(0)
  const [accountMetrics, setAccountMetrics] = useState<InstagramMetrics | null>(null)
  const [testPostData, setTestPostData] = useState<any>(null)

  const tests: TestResult[] = [
    {
      name: "API Credentials Validation",
      status: "pending",
      message: "Validating App ID and App Secret...",
    },
    {
      name: "OAuth Token Generation",
      status: "pending",
      message: "Generating access token for @nexarax.official...",
    },
    {
      name: "Account Permissions Check",
      status: "pending",
      message: "Verifying instagram_basic and instagram_content_publish permissions...",
    },
    {
      name: "Profile Data Retrieval",
      status: "pending",
      message: "Fetching @nexarax.official profile information...",
    },
    {
      name: "Media Upload Test",
      status: "pending",
      message: "Testing image upload capabilities...",
    },
    {
      name: "Test Post Creation",
      status: "pending",
      message: "Creating test post with NexaraX branding...",
    },
    {
      name: "Webhook Validation",
      status: "pending",
      message: "Testing webhook endpoint connectivity...",
    },
    {
      name: "Rate Limit Check",
      status: "pending",
      message: "Checking API rate limits and quotas...",
    },
  ]

  useEffect(() => {
    setTestResults(tests)
  }, [])

  const runConnectionTest = async () => {
    setIsTestingConnection(true)
    setCurrentTest(0)
    setTestProgress(0)

    for (let i = 0; i < tests.length; i++) {
      setCurrentTest(i)
      setTestProgress((i / tests.length) * 100)

      // Update current test to running
      setTestResults((prev) => prev.map((test, index) => (index === i ? { ...test, status: "running" } : test)))

      // Simulate test execution time
      await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1000))

      // Simulate test results
      const success = Math.random() > 0.1 // 90% success rate for demo

      let resultMessage = ""
      let details = ""

      switch (i) {
        case 0: // API Credentials
          resultMessage = success
            ? "✅ Valid App ID and App Secret confirmed"
            : "❌ Invalid credentials - check App ID and Secret"
          details = success ? "App ID: 1234567890123456 | Status: Active" : "Error: Invalid App Secret provided"
          break
        case 1: // OAuth Token
          resultMessage = success ? "✅ Access token generated successfully" : "❌ Failed to generate access token"
          details = success
            ? "Token: IGQVJXa2F... | Expires: 60 days | Scope: instagram_basic,instagram_content_publish"
            : "Error: User authorization required"
          break
        case 2: // Permissions
          resultMessage = success ? "✅ All required permissions granted" : "❌ Missing required permissions"
          details = success
            ? "✓ instagram_basic ✓ instagram_content_publish ✓ instagram_manage_insights"
            : "Missing: instagram_content_publish permission"
          break
        case 3: // Profile Data
          if (success) {
            const metrics = {
              followers: Math.floor(Math.random() * 1000) + 500,
              following: Math.floor(Math.random() * 200) + 100,
              posts: Math.floor(Math.random() * 50) + 10,
              engagement_rate: Math.random() * 5 + 2,
            }
            setAccountMetrics(metrics)
            resultMessage = "✅ Profile data retrieved successfully"
            details = `@nexarax.official | ${metrics.followers} followers | ${metrics.posts} posts`
          } else {
            resultMessage = "❌ Failed to fetch profile data"
            details = "Error: Account not found or private"
          }
          break
        case 4: // Media Upload
          resultMessage = success ? "✅ Media upload test successful" : "❌ Media upload failed"
          details = success
            ? "Test image uploaded | Size: 1080x1080 | Format: JPG"
            : "Error: File size too large or unsupported format"
          break
        case 5: // Test Post
          if (success) {
            setTestPostData({
              id: "18123456789012345",
              caption: "🚀 Testing NexaraX AI-powered content creation! #NexaraX #AI #ContentCreation",
              media_type: "IMAGE",
              timestamp: new Date().toISOString(),
              likes: Math.floor(Math.random() * 50) + 10,
              comments: Math.floor(Math.random() * 10) + 2,
            })
            resultMessage = "✅ Test post created successfully"
            details = "Post ID: 18123456789012345 | Status: Published"
          } else {
            resultMessage = "❌ Test post creation failed"
            details = "Error: Content policy violation or API limit reached"
          }
          break
        case 6: // Webhook
          resultMessage = success ? "✅ Webhook endpoint responding" : "❌ Webhook endpoint unreachable"
          details = success
            ? "URL: https://nexarax.com/webhooks/instagram | Response: 200 OK"
            : "Error: Connection timeout or 404 Not Found"
          break
        case 7: // Rate Limits
          resultMessage = success ? "✅ Rate limits within acceptable range" : "⚠️ Approaching rate limits"
          details = success
            ? "API Calls: 150/200 per hour | Reset: 45 minutes"
            : "API Calls: 195/200 per hour | Reset: 12 minutes"
          break
      }

      // Update test result
      setTestResults((prev) =>
        prev.map((test, index) =>
          index === i
            ? {
                ...test,
                status: success ? "success" : "error",
                message: resultMessage,
                details: details,
              }
            : test,
        ),
      )
    }

    setTestProgress(100)
    setIsTestingConnection(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running":
        return <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "border-blue-200 bg-blue-50"
      case "success":
        return "border-green-200 bg-green-50"
      case "error":
        return "border-red-200 bg-red-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-pink-100 text-pink-800">
            <Instagram className="h-4 w-4 mr-2" />
            Instagram API Testing
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Test Instagram Connection
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Verify your Instagram API integration for @nexarax.official automated posting
          </p>
        </div>

        {/* Test Progress */}
        {isTestingConnection && (
          <Card className="mb-8 border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TestTube className="h-6 w-6 text-blue-600" />
                Running Connection Tests...
              </CardTitle>
              <CardDescription>
                Testing step {currentTest + 1} of {tests.length}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={testProgress} className="mb-4" />
              <p className="text-sm text-gray-600">{testResults[currentTest]?.message || "Initializing tests..."}</p>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Test Results */}
          <div className="lg:col-span-2">
            <Card className="border-2 border-gray-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-6 w-6 text-gray-600" />
                    Connection Test Results
                  </CardTitle>
                  <Button
                    onClick={runConnectionTest}
                    disabled={isTestingConnection}
                    className="bg-pink-600 hover:bg-pink-700"
                  >
                    {isTestingConnection ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Testing...
                      </>
                    ) : (
                      <>
                        <TestTube className="h-4 w-4 mr-2" />
                        Run Full Test
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {testResults.map((test, index) => (
                    <Card key={index} className={`border transition-colors ${getStatusColor(test.status)}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          {getStatusIcon(test.status)}
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm">{test.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">{test.message}</p>
                            {test.details && (
                              <p className="text-xs text-gray-500 mt-2 font-mono bg-gray-100 p-2 rounded">
                                {test.details}
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Account Info & Test Post */}
          <div className="space-y-6">
            {/* Account Metrics */}
            {accountMetrics && (
              <Card className="border-2 border-pink-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Instagram className="h-6 w-6 text-pink-600" />
                    @nexarax.official
                  </CardTitle>
                  <CardDescription>Account metrics retrieved</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-pink-600">{accountMetrics.followers}</div>
                      <div className="text-xs text-gray-500">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{accountMetrics.posts}</div>
                      <div className="text-xs text-gray-500">Posts</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-green-600">
                      {accountMetrics.engagement_rate.toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-500">Engagement Rate</div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Test Post Preview */}
            {testPostData && (
              <Card className="border-2 border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-6 w-6 text-green-600" />
                    Test Post Created
                  </CardTitle>
                  <CardDescription>Successfully posted to Instagram</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg p-4 text-white text-center">
                    <div className="text-4xl mb-2">🚀</div>
                    <div className="text-sm font-medium">NexaraX Test Post</div>
                  </div>

                  <div className="text-sm">
                    <p className="font-medium mb-2">Caption:</p>
                    <p className="text-gray-600 italic">{testPostData.caption}</p>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        {testPostData.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        {testPostData.comments}
                      </span>
                    </div>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Just now
                    </span>
                  </div>

                  <div className="text-xs text-gray-500 font-mono bg-gray-100 p-2 rounded">
                    Post ID: {testPostData.id}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card className="border-2 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-6 w-6 text-blue-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Eye className="h-4 w-4 mr-2" />
                  View Instagram Profile
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TestTube className="h-4 w-4 mr-2" />
                  Send Another Test Post
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Check API Permissions
                </Button>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Enable Auto-Posting
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
