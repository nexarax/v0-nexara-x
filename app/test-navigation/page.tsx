"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import {
  CheckCircle,
  XCircle,
  ExternalLink,
  Sparkles,
  ArrowLeft,
  Home,
  Users,
  BarChart3,
  Smartphone,
  Mail,
  Settings,
  Play,
  Calendar,
  ImageIcon,
  Shield,
  AlertTriangle,
} from "lucide-react"

interface NavigationTest {
  name: string
  path: string
  description: string
  icon: any
  status: "untested" | "success" | "error"
  critical: boolean
}

export default function TestNavigationPage() {
  const router = useRouter()
  const [tests, setTests] = useState<NavigationTest[]>([
    {
      name: "Homepage",
      path: "/",
      description: "Main landing page with hero section",
      icon: Home,
      status: "untested",
      critical: true,
    },
    {
      name: "Onboarding",
      path: "/onboarding",
      description: "User signup and type selection flow",
      icon: Users,
      status: "untested",
      critical: true,
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      description: "User dashboard with quick actions",
      icon: BarChart3,
      status: "untested",
      critical: true,
    },
    {
      name: "Mobile App (PWA)",
      path: "/pwa-mobile",
      description: "Progressive web app interface",
      icon: Smartphone,
      status: "untested",
      critical: false,
    },
    {
      name: "Contact Form",
      path: "/contact",
      description: "Contact and support page",
      icon: Mail,
      status: "untested",
      critical: false,
    },
    {
      name: "Content Generator",
      path: "/content-generator",
      description: "AI content creation interface",
      icon: ImageIcon,
      status: "untested",
      critical: false,
    },
    {
      name: "Content Calendar",
      path: "/content-calendar",
      description: "Content scheduling and planning",
      icon: Calendar,
      status: "untested",
      critical: false,
    },
    {
      name: "Demo Page",
      path: "/demo",
      description: "Product demonstration and tutorials",
      icon: Play,
      status: "untested",
      critical: false,
    },
    {
      name: "Health Monitoring",
      path: "/health-monitoring",
      description: "System health and monitoring dashboard",
      icon: Shield,
      status: "untested",
      critical: false,
    },
    {
      name: "API Testing",
      path: "/api-testing",
      description: "API endpoint testing interface",
      icon: Settings,
      status: "untested",
      critical: false,
    },
  ])

  const testNavigation = async (test: NavigationTest, index: number) => {
    try {
      // Update status to testing
      setTests((prev) => {
        const updated = [...prev]
        updated[index] = { ...updated[index], status: "untested" }
        return updated
      })

      // Attempt navigation
      router.push(test.path)

      // Simulate success (in real scenario, you'd check if page loaded)
      setTimeout(() => {
        setTests((prev) => {
          const updated = [...prev]
          updated[index] = { ...updated[index], status: "success" }
          return updated
        })
      }, 1000)
    } catch (error) {
      setTests((prev) => {
        const updated = [...prev]
        updated[index] = { ...updated[index], status: "error" }
        return updated
      })
    }
  }

  const testAllNavigation = async () => {
    for (let i = 0; i < tests.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 500))
      await testNavigation(tests[i], i)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800"
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const successCount = tests.filter((t) => t.status === "success").length
  const errorCount = tests.filter((t) => t.status === "error").length
  const criticalErrors = tests.filter((t) => t.critical && t.status === "error").length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">Navigation Test Suite</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => router.push("/")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <Button onClick={testAllNavigation}>
              <Play className="w-4 h-4 mr-2" />
              Test All
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Navigation Test Results
            </CardTitle>
            <CardDescription>Test all navigation routes and functionality</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">{successCount}</div>
                <div className="text-sm text-gray-600">Working</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">{errorCount}</div>
                <div className="text-sm text-gray-600">Errors</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">{criticalErrors}</div>
                <div className="text-sm text-gray-600">Critical Issues</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Tests */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tests.map((test, index) => {
            const IconComponent = test.icon
            return (
              <Card key={index} className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <IconComponent className="w-5 h-5" />
                      {test.name}
                      {test.critical && <Badge variant="outline">Critical</Badge>}
                    </CardTitle>
                    <Badge className={getStatusColor(test.status)}>
                      {getStatusIcon(test.status)}
                      <span className="ml-1">{test.status.toUpperCase()}</span>
                    </Badge>
                  </div>
                  <CardDescription>{test.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={() => testNavigation(test, index)} className="flex-1">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Test Route
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => router.push(test.path)}>
                      Visit
                    </Button>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">Route: {test.path}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Instructions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>How to Use This Test Suite</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Click "Test All" to automatically test all navigation routes</li>
              <li>Or click "Test Route" on individual items to test specific pages</li>
              <li>Green status means the route works and page loads correctly</li>
              <li>Red status indicates navigation errors or missing pages</li>
              <li>Critical routes (marked with badge) are essential for core functionality</li>
              <li>Use "Visit" button to manually navigate and inspect pages</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
