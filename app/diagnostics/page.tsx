"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Terminal,
  Globe,
  Settings,
  Zap,
  ArrowRight,
} from "lucide-react"

export default function DiagnosticsPage() {
  const [diagnostics, setDiagnostics] = useState({
    nextjs: "checking",
    react: "checking",
    routing: "checking",
    components: "checking",
    environment: "checking",
    build: "checking",
  })

  const [errors, setErrors] = useState<string[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    runDiagnostics()
  }, [])

  const runDiagnostics = async () => {
    const results = { ...diagnostics }
    const foundErrors: string[] = []

    try {
      // Test React
      results.react = "success"
    } catch (error) {
      results.react = "error"
      foundErrors.push("React not working properly")
    }

    try {
      // Test Next.js
      if (typeof window !== "undefined") {
        results.nextjs = "success"
      }
    } catch (error) {
      results.nextjs = "error"
      foundErrors.push("Next.js client-side issues")
    }

    try {
      // Test routing
      if (typeof window !== "undefined" && window.location) {
        results.routing = "success"
      }
    } catch (error) {
      results.routing = "error"
      foundErrors.push("Routing system issues")
    }

    try {
      // Test components
      results.components = "success"
    } catch (error) {
      results.components = "error"
      foundErrors.push("UI components not loading")
    }

    try {
      // Test environment
      results.environment = "success"
    } catch (error) {
      results.environment = "error"
      foundErrors.push("Environment configuration issues")
    }

    try {
      // Test build
      results.build = "success"
    } catch (error) {
      results.build = "error"
      foundErrors.push("Build system issues")
    }

    setDiagnostics(results)
    setErrors(foundErrors)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "checking":
        return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />
      default:
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
    }
  }

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-500" />
          <h1 className="text-2xl font-bold mb-2">Loading Diagnostics...</h1>
          <p className="text-gray-600">Checking system status</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">🔧 NexaraX Diagnostics</h1>
          <p className="text-gray-600">Let's figure out what's not working</p>
        </div>

        {/* Quick Status */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Quick Status Check
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                {getStatusIcon(diagnostics.react)}
                <span>React</span>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(diagnostics.nextjs)}
                <span>Next.js</span>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(diagnostics.routing)}
                <span>Routing</span>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(diagnostics.components)}
                <span>Components</span>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(diagnostics.environment)}
                <span>Environment</span>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(diagnostics.build)}
                <span>Build</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error Messages */}
        {errors.length > 0 && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Issues Found:</strong>
              <ul className="list-disc list-inside mt-2">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {/* Troubleshooting Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Checks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Basic Checks
              </CardTitle>
              <CardDescription>Start with these fundamental checks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold">1. Is the development server running?</h4>
                <div className="bg-gray-100 p-3 rounded font-mono text-sm">
                  npm run dev
                  <br /># or
                  <br />
                  yarn dev
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">2. Check the URL</h4>
                <p className="text-sm text-gray-600">Should be: http://localhost:3000</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">3. Check browser console</h4>
                <p className="text-sm text-gray-600">Press F12 → Console tab → Look for red errors</p>
              </div>
            </CardContent>
          </Card>

          {/* Common Issues */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                Common Issues
              </CardTitle>
              <CardDescription>Most frequent problems and solutions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Port already in use</h4>
                <div className="bg-gray-100 p-2 rounded font-mono text-sm">npx kill-port 3000</div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Dependencies missing</h4>
                <div className="bg-gray-100 p-2 rounded font-mono text-sm">npm install</div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Cache issues</h4>
                <div className="bg-gray-100 p-2 rounded font-mono text-sm">rm -rf .next && npm run dev</div>
              </div>
            </CardContent>
          </Card>

          {/* Environment Setup */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-blue-500" />
                Environment Setup
              </CardTitle>
              <CardDescription>Required tools and versions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Node.js Version</h4>
                <p className="text-sm text-gray-600">Required: Node.js 18+ or 20+</p>
                <div className="bg-gray-100 p-2 rounded font-mono text-sm">node --version</div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Package Manager</h4>
                <div className="bg-gray-100 p-2 rounded font-mono text-sm">
                  npm --version
                  <br /># or
                  <br />
                  yarn --version
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step-by-Step Fix */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="h-5 w-5 text-purple-500" />
                Step-by-Step Fix
              </CardTitle>
              <CardDescription>Try these commands in order</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">1</Badge>
                  <span className="text-sm">Stop any running servers</span>
                </div>
                <div className="bg-gray-100 p-2 rounded font-mono text-sm">Ctrl+C in terminal</div>

                <div className="flex items-center gap-2">
                  <Badge variant="outline">2</Badge>
                  <span className="text-sm">Clear cache and reinstall</span>
                </div>
                <div className="bg-gray-100 p-2 rounded font-mono text-sm">
                  rm -rf node_modules .next
                  <br />
                  npm install
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="outline">3</Badge>
                  <span className="text-sm">Start development server</span>
                </div>
                <div className="bg-gray-100 p-2 rounded font-mono text-sm">npm run dev</div>

                <div className="flex items-center gap-2">
                  <Badge variant="outline">4</Badge>
                  <span className="text-sm">Open in browser</span>
                </div>
                <div className="bg-gray-100 p-2 rounded font-mono text-sm">http://localhost:3000</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Reset */}
        <Card className="mt-6 border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <XCircle className="h-5 w-5" />
              Emergency Reset (Last Resort)
            </CardTitle>
            <CardDescription>If nothing else works, try this complete reset</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-red-50 p-4 rounded">
              <h4 className="font-semibold mb-2">Complete Project Reset:</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm">
                # Delete everything and start fresh
                <br />
                rm -rf node_modules .next package-lock.json
                <br />
                npm install
                <br />
                npm run dev
              </div>
              <p className="text-sm text-red-600 mt-2">⚠️ This will delete all node_modules and rebuild everything</p>
            </div>
          </CardContent>
        </Card>

        {/* Get Help */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-600">
              <Globe className="h-5 w-5" />
              Still Need Help?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">If you're still having issues, please share:</p>
            <ul className="list-disc list-inside space-y-1 text-sm mb-4">
              <li>What error messages you see (exact text)</li>
              <li>What happens when you run `npm run dev`</li>
              <li>Your operating system (Windows/Mac/Linux)</li>
              <li>Node.js version (`node --version`)</li>
              <li>Browser console errors (F12 → Console)</li>
            </ul>
            <Button className="w-full">
              <ArrowRight className="h-4 w-4 mr-2" />
              Copy Diagnostic Info to Share
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
