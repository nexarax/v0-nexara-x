"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Bot,
  CheckCircle,
  AlertCircle,
  Play,
  Pause,
  Settings,
  Zap,
  Brain,
  ImageIcon,
  Video,
  Mic,
  Calendar,
  TrendingUp,
  RefreshCw,
} from "lucide-react"

interface AISystem {
  id: string
  name: string
  description: string
  status: "active" | "inactive" | "error" | "starting"
  lastActive?: Date
  postsGenerated: number
  successRate: number
  icon: React.ReactNode
}

export default function AIActivationPage() {
  const [aiSystems, setAiSystems] = useState<AISystem[]>([])
  const [isActivatingAll, setIsActivatingAll] = useState(false)
  const [systemStats, setSystemStats] = useState({
    totalSystems: 0,
    activeSystems: 0,
    totalPosts: 0,
    avgSuccessRate: 0,
  })

  useEffect(() => {
    initializeAISystems()

    // Simulate real-time updates
    const interval = setInterval(() => {
      updateSystemMetrics()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const initializeAISystems = () => {
    const systems: AISystem[] = [
      {
        id: "content-generator",
        name: "AI Content Generator",
        description: "Generates viral text content for all platforms",
        status: "inactive",
        postsGenerated: 0,
        successRate: 0,
        icon: <Bot className="h-6 w-6 text-blue-600" />,
      },
      {
        id: "image-generator",
        name: "AI Image Generator",
        description: "Creates stunning visuals from text prompts",
        status: "inactive",
        postsGenerated: 0,
        successRate: 0,
        icon: <ImageIcon className="h-6 w-6 text-purple-600" />,
      },
      {
        id: "video-generator",
        name: "AI Video Creator",
        description: "Generates viral videos automatically",
        status: "inactive",
        postsGenerated: 0,
        successRate: 0,
        icon: <Video className="h-6 w-6 text-green-600" />,
      },
      {
        id: "voice-cloner",
        name: "AI Voice Cloning",
        description: "Clones voices for audio content",
        status: "inactive",
        postsGenerated: 0,
        successRate: 0,
        icon: <Mic className="h-6 w-6 text-orange-600" />,
      },
      {
        id: "posting-engine",
        name: "Auto-Posting Engine",
        description: "Automatically posts content across platforms",
        status: "inactive",
        postsGenerated: 0,
        successRate: 0,
        icon: <Calendar className="h-6 w-6 text-pink-600" />,
      },
      {
        id: "predictive-ai",
        name: "Predictive Analytics AI",
        description: "Predicts viral potential and optimizes content",
        status: "inactive",
        postsGenerated: 0,
        successRate: 0,
        icon: <Brain className="h-6 w-6 text-cyan-600" />,
      },
    ]

    setAiSystems(systems)
    updateStats(systems)
  }

  const updateSystemMetrics = () => {
    setAiSystems((prev) =>
      prev.map((system) => {
        if (system.status === "active") {
          return {
            ...system,
            postsGenerated: system.postsGenerated + Math.floor(Math.random() * 3),
            successRate: Math.min(100, system.successRate + Math.random() * 2),
            lastActive: new Date(),
          }
        }
        return system
      }),
    )
  }

  const updateStats = (systems: AISystem[]) => {
    const totalSystems = systems.length
    const activeSystems = systems.filter((s) => s.status === "active").length
    const totalPosts = systems.reduce((sum, s) => sum + s.postsGenerated, 0)
    const avgSuccessRate = systems.reduce((sum, s) => sum + s.successRate, 0) / totalSystems

    setSystemStats({
      totalSystems,
      activeSystems,
      totalPosts,
      avgSuccessRate,
    })
  }

  const activateSystem = async (systemId: string) => {
    setAiSystems((prev) => prev.map((system) => (system.id === systemId ? { ...system, status: "starting" } : system)))

    // Simulate activation process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setAiSystems((prev) =>
      prev.map((system) =>
        system.id === systemId
          ? {
              ...system,
              status: "active",
              lastActive: new Date(),
              successRate: 85 + Math.random() * 10, // 85-95% success rate
            }
          : system,
      ),
    )
  }

  const deactivateSystem = (systemId: string) => {
    setAiSystems((prev) => prev.map((system) => (system.id === systemId ? { ...system, status: "inactive" } : system)))
  }

  const activateAllSystems = async () => {
    setIsActivatingAll(true)

    for (const system of aiSystems) {
      if (system.status === "inactive") {
        await activateSystem(system.id)
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Stagger activation
      }
    }

    setIsActivatingAll(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "starting":
        return "bg-blue-100 text-blue-800"
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4" />
      case "starting":
        return <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full" />
      case "error":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <div className="h-4 w-4 border-2 border-gray-400 rounded-full" />
    }
  }

  useEffect(() => {
    updateStats(aiSystems)
  }, [aiSystems])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-100 text-blue-800">🤖 AI System Control</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Activate AI Systems
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Power up your AI engines and start generating viral content automatically
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 border-blue-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Bot className="h-5 w-5 text-blue-600" />
                <span className="text-2xl font-bold text-blue-600">
                  {systemStats.activeSystems}/{systemStats.totalSystems}
                </span>
              </div>
              <p className="text-sm text-gray-600">Systems Active</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="text-2xl font-bold text-green-600">{systemStats.totalPosts}</span>
              </div>
              <p className="text-sm text-gray-600">Posts Generated</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Zap className="h-5 w-5 text-purple-600" />
                <span className="text-2xl font-bold text-purple-600">{systemStats.avgSuccessRate.toFixed(1)}%</span>
              </div>
              <p className="text-sm text-gray-600">Success Rate</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <RefreshCw className="h-5 w-5 text-orange-600" />
                <span className="text-2xl font-bold text-orange-600">24/7</span>
              </div>
              <p className="text-sm text-gray-600">Auto Mode</p>
            </CardContent>
          </Card>
        </div>

        {/* Master Control */}
        <Card className="mb-8 border-2 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-6 w-6 text-purple-600" />
              Master AI Control
            </CardTitle>
            <CardDescription>Activate all AI systems to begin automated content generation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Button
                onClick={activateAllSystems}
                disabled={isActivatingAll}
                className="bg-green-600 hover:bg-green-700"
              >
                {isActivatingAll ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                    Activating All Systems...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Activate All AI Systems
                  </>
                )}
              </Button>

              <Button variant="outline">
                <Pause className="h-4 w-4 mr-2" />
                Emergency Stop
              </Button>

              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Configure Settings
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* AI Systems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiSystems.map((system) => (
            <Card key={system.id} className="border-2 border-gray-200 hover:border-blue-300 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {system.icon}
                    <div>
                      <CardTitle className="text-lg">{system.name}</CardTitle>
                      <CardDescription className="text-sm">{system.description}</CardDescription>
                    </div>
                  </div>
                  <Badge className={getStatusColor(system.status)}>
                    {getStatusIcon(system.status)}
                    <span className="ml-1 capitalize">{system.status}</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* System Metrics */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Posts Generated:</span>
                    <div className="font-semibold">{system.postsGenerated}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Success Rate:</span>
                    <div className="font-semibold">{system.successRate.toFixed(1)}%</div>
                  </div>
                </div>

                {system.lastActive && (
                  <div className="text-xs text-gray-500">Last active: {system.lastActive.toLocaleTimeString()}</div>
                )}

                {/* Control Buttons */}
                <div className="flex gap-2">
                  {system.status === "inactive" ? (
                    <Button
                      size="sm"
                      onClick={() => activateSystem(system.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Activate
                    </Button>
                  ) : system.status === "active" ? (
                    <Button size="sm" variant="outline" onClick={() => deactivateSystem(system.id)}>
                      <Pause className="h-4 w-4 mr-2" />
                      Deactivate
                    </Button>
                  ) : (
                    <Button size="sm" disabled>
                      <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full mr-2" />
                      Starting...
                    </Button>
                  )}

                  <Button size="sm" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Configure
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Success Message */}
        {systemStats.activeSystems === systemStats.totalSystems && systemStats.activeSystems > 0 && (
          <Card className="mt-8 border-2 border-green-200 bg-green-50">
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-green-800 mb-2">🚀 All AI Systems Active!</h3>
              <p className="text-green-700 mb-4">
                Your AI engines are now running 24/7, generating and posting viral content automatically.
              </p>
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={() => (window.location.href = "/ai-content-posting")}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                View Live Content Generation
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
