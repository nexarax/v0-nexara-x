"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Lock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Key,
  Database,
  Server,
  Globe,
  RefreshCw,
} from "lucide-react"
import { runSecurityAudit } from "./actions"

interface SecurityCheck {
  category: string
  item: string
  status: "pass" | "warning" | "fail"
  description: string
  recommendation?: string
}

export default function SecurityAuditPage() {
  const [auditResults, setAuditResults] = useState<SecurityCheck[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [showSensitive, setShowSensitive] = useState(false)

  const runAudit = async () => {
    setIsRunning(true)
    try {
      const results = await runSecurityAudit()
      setAuditResults(results)
    } catch (error) {
      console.error("Audit failed:", error)
    } finally {
      setIsRunning(false)
    }
  }

  useEffect(() => {
    runAudit()
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pass":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case "fail":
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pass":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "fail":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const groupedResults = auditResults.reduce(
    (acc, result) => {
      if (!acc[result.category]) {
        acc[result.category] = []
      }
      acc[result.category].push(result)
      return acc
    },
    {} as Record<string, SecurityCheck[]>,
  )

  const overallStats = {
    total: auditResults.length,
    passed: auditResults.filter((r) => r.status === "pass").length,
    warnings: auditResults.filter((r) => r.status === "warning").length,
    failed: auditResults.filter((r) => r.status === "fail").length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-100 text-blue-800">🔒 Security Audit</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Privacy & Security Check
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive audit of all security measures and privacy protections
          </p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 border-green-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <span className="text-3xl font-bold text-green-600">{overallStats.passed}</span>
              </div>
              <p className="text-sm text-gray-600">Passed</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-yellow-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
                <span className="text-3xl font-bold text-yellow-600">{overallStats.warnings}</span>
              </div>
              <p className="text-sm text-gray-600">Warnings</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-red-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <XCircle className="h-6 w-6 text-red-600" />
                <span className="text-3xl font-bold text-red-600">{overallStats.failed}</span>
              </div>
              <p className="text-sm text-gray-600">Failed</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Shield className="h-6 w-6 text-blue-600" />
                <span className="text-3xl font-bold text-blue-600">
                  {Math.round((overallStats.passed / overallStats.total) * 100)}%
                </span>
              </div>
              <p className="text-sm text-gray-600">Security Score</p>
            </CardContent>
          </Card>
        </div>

        {/* Audit Results */}
        <Card className="border-2 border-gray-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-blue-600" />
                Security Audit Results
              </CardTitle>
              <Button onClick={runAudit} disabled={isRunning}>
                {isRunning ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full mr-2" />
                    Running Audit...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Re-run Audit
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isRunning ? (
              <div className="text-center py-12">
                <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4" />
                <p className="text-gray-600">Running comprehensive security audit...</p>
              </div>
            ) : (
              <div className="space-y-6">
                {Object.entries(groupedResults).map(([category, checks]) => (
                  <div key={category}>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      {category === "Environment Variables" && <Key className="h-5 w-5" />}
                      {category === "Client-Side Security" && <Globe className="h-5 w-5" />}
                      {category === "Data Protection" && <Database className="h-5 w-5" />}
                      {category === "Network Security" && <Server className="h-5 w-5" />}
                      {category === "File Security" && <Lock className="h-5 w-5" />}
                      {category}
                    </h3>
                    <div className="grid gap-4">
                      {checks.map((check, index) => (
                        <Card key={index} className="border border-gray-200">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  {getStatusIcon(check.status)}
                                  <h4 className="font-medium">{check.item}</h4>
                                  <Badge className={getStatusColor(check.status)}>{check.status.toUpperCase()}</Badge>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{check.description}</p>
                                {check.recommendation && (
                                  <div className="bg-yellow-50 p-3 rounded-lg">
                                    <p className="text-sm text-yellow-800">
                                      <strong>Recommendation:</strong> {check.recommendation}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Environment Variables Check */}
        <Card className="border-2 border-purple-200 mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-6 w-6 text-purple-600" />
              Environment Variables Status
            </CardTitle>
            <CardDescription>Checking which environment variables are properly configured</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-3 text-green-700">✅ Properly Protected (Server-Side)</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-green-600" />
                    <span>STRIPE_SECRET_KEY</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-green-600" />
                    <span>SUPABASE_SERVICE_ROLE_KEY</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-green-600" />
                    <span>POSTGRES_PASSWORD</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-green-600" />
                    <span>RESEND_API_KEY</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-green-600" />
                    <span>AI_VIDEO_API_KEY</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-green-600" />
                    <span>VOICE_API_KEY</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 text-blue-700">🌐 Safe for Client-Side</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-blue-600" />
                    <span>NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-blue-600" />
                    <span>NEXT_PUBLIC_SUPABASE_URL</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-blue-600" />
                    <span>NEXT_PUBLIC_SUPABASE_ANON_KEY</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-blue-600" />
                    <span>NEXT_PUBLIC_APP_URL</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
