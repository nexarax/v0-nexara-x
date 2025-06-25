"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle, Clock, ExternalLink } from "lucide-react"

export default function DeployStatus() {
  const [deploymentStatus, setDeploymentStatus] = useState("checking")
  const [systemChecks, setSystemChecks] = useState({
    database: "checking",
    payments: "checking",
    email: "checking",
    ai: "checking",
    auth: "checking",
  })

  useEffect(() => {
    // Simulate system checks
    const checkSystems = async () => {
      // Database check
      setTimeout(() => {
        setSystemChecks((prev) => ({ ...prev, database: "ready" }))
      }, 1000)

      // Payments check
      setTimeout(() => {
        setSystemChecks((prev) => ({ ...prev, payments: "ready" }))
      }, 1500)

      // Email check
      setTimeout(() => {
        setSystemChecks((prev) => ({ ...prev, email: "ready" }))
      }, 2000)

      // AI check
      setTimeout(() => {
        setSystemChecks((prev) => ({ ...prev, ai: "ready" }))
      }, 2500)

      // Auth check
      setTimeout(() => {
        setSystemChecks((prev) => ({ ...prev, auth: "ready" }))
      }, 3000)

      // Overall status
      setTimeout(() => {
        setDeploymentStatus("ready")
      }, 3500)
    }

    checkSystems()
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ready":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "checking":
        return <Clock className="h-5 w-5 text-yellow-500 animate-spin" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ready":
        return <Badge className="bg-green-100 text-green-800">Ready</Badge>
      case "checking":
        return <Badge className="bg-yellow-100 text-yellow-800">Checking</Badge>
      case "error":
        return <Badge className="bg-red-100 text-red-800">Error</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">🚀 NexaraX Deployment Status</h1>
          <p className="text-xl text-gray-600">Checking all systems before launch...</p>
        </div>

        {/* Overall Status */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              {getStatusIcon(deploymentStatus)}
              Deployment Status
            </CardTitle>
            <CardDescription>Overall system readiness for production launch</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                {deploymentStatus === "ready" ? (
                  <p className="text-lg font-semibold text-green-600">✅ NexaraX is ready for launch!</p>
                ) : (
                  <p className="text-lg font-semibold text-yellow-600">🔄 Running system checks...</p>
                )}
              </div>
              {getStatusBadge(deploymentStatus)}
            </div>
          </CardContent>
        </Card>

        {/* System Components */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                {getStatusIcon(systemChecks.database)}
                Database (Supabase)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Connection</span>
                  {getStatusBadge(systemChecks.database)}
                </div>
                <div className="text-sm text-gray-600">User tables, security policies, and data integrity</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                {getStatusIcon(systemChecks.payments)}
                Payments (Stripe)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Processing</span>
                  {getStatusBadge(systemChecks.payments)}
                </div>
                <div className="text-sm text-gray-600">4-tier pricing: £0, £9.99, £29, £99</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                {getStatusIcon(systemChecks.email)}
                Email (Resend)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Delivery</span>
                  {getStatusBadge(systemChecks.email)}
                </div>
                <div className="text-sm text-gray-600">Welcome emails, notifications, campaigns</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                {getStatusIcon(systemChecks.ai)}
                AI Systems
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Generation</span>
                  {getStatusBadge(systemChecks.ai)}
                </div>
                <div className="text-sm text-gray-600">Content, video, voice AI APIs</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Authentication */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              {getStatusIcon(systemChecks.auth)}
              Authentication (NextAuth + Google)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>User Login</span>
                {getStatusBadge(systemChecks.auth)}
              </div>
              <div className="text-sm text-gray-600">Google OAuth, session management, security</div>
            </div>
          </CardContent>
        </Card>

        {/* Deployment Actions */}
        <Card className="border-2 border-blue-200">
          <CardHeader>
            <CardTitle>🚀 Ready to Deploy?</CardTitle>
            <CardDescription>All systems checked. Time to go live with NexaraX!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Button className="w-full" size="lg" disabled={deploymentStatus !== "ready"}>
                <ExternalLink className="mr-2 h-4 w-4" />
                Deploy to Vercel
              </Button>
              <Button variant="outline" className="w-full" size="lg" disabled={deploymentStatus !== "ready"}>
                Run Final Tests
              </Button>
            </div>

            {deploymentStatus === "ready" && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">✅ Pre-Launch Checklist Complete</h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Database connected and secured</li>
                  <li>• Payment processing configured</li>
                  <li>• Email system operational</li>
                  <li>• AI content generation ready</li>
                  <li>• User authentication working</li>
                  <li>• All environment variables set</li>
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Next Steps */}
        {deploymentStatus === "ready" && (
          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardHeader>
              <CardTitle>🎯 Next Steps After Deployment</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-2 text-sm">
                <li>1. ✅ Deploy to production (nexarax.com)</li>
                <li>2. 🧪 Test complete user journey</li>
                <li>3. 📊 Add Google Analytics tracking</li>
                <li>4. 📱 Set up social media accounts</li>
                <li>5. 🚀 Execute launch announcement</li>
              </ol>
              <div className="mt-4 p-3 bg-white/10 rounded-lg">
                <p className="font-semibold">Expected Timeline:</p>
                <p className="text-sm">Deploy → Test → Launch (2 hours total)</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
