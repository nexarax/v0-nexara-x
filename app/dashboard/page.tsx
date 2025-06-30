"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAILearning } from "@/components/ai-learning-provider"
import { useAuth } from "@/components/auth-provider"
import { PRICING_TIERS } from "@/lib/pricing"
import {
  BarChart3,
  Users,
  ShoppingCart,
  Calendar,
  Palette,
  Video,
  Music,
  FileText,
  Zap,
  Brain,
  TrendingUp,
  Star,
} from "lucide-react"

export default function Dashboard() {
  const { user } = useAuth()
  const { personality, trackInteraction, suggestions, predictedActions, learningProgress } = useAILearning()
  const [credits, setCredits] = useState(1250)
  const [currentTier] = useState("PRO")

  useEffect(() => {
    trackInteraction("dashboard-view", "main-dashboard")
  }, [trackInteraction])

  const handleFeatureClick = (feature: string) => {
    trackInteraction("feature-click", feature)
  }

  const tierInfo = PRICING_TIERS[currentTier as keyof typeof PRICING_TIERS]

  const quickActions = [
    { icon: Palette, label: "AI Image Generator", action: "ai-image", color: "bg-purple-500" },
    { icon: Video, label: "AI Video Studio", action: "ai-video", color: "bg-blue-500" },
    { icon: Music, label: "AI Music Generator", action: "ai-music", color: "bg-green-500" },
    { icon: FileText, label: "AI Copywriter", action: "ai-copy", color: "bg-orange-500" },
    { icon: Users, label: "CRM", action: "crm", color: "bg-red-500" },
    { icon: ShoppingCart, label: "E-commerce", action: "ecommerce", color: "bg-indigo-500" },
    { icon: Calendar, label: "Booking System", action: "booking", color: "bg-teal-500" },
    { icon: BarChart3, label: "Analytics", action: "analytics", color: "bg-pink-500" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
              Welcome back, {user?.name || "User"}! 👋
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Your AI assistant is {learningProgress}% trained and ready to help
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-sm">
              {tierInfo.name} Plan
            </Badge>
            <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-3 py-2 rounded-lg shadow-sm">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span className="font-medium">{credits} Credits</span>
            </div>
          </div>
        </div>

        {/* AI Learning Progress */}
        {personality && (
          <Card className="border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-600" />
                AI Learning Progress
              </CardTitle>
              <CardDescription>Your AI assistant is learning your preferences and workflow patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Learning Accuracy</span>
                    <span>{Math.round(learningProgress)}%</span>
                  </div>
                  <Progress value={learningProgress} className="h-2" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-slate-600 dark:text-slate-400">Workflow Style:</span>
                    <p className="font-medium capitalize">{personality.preferences.workflowStyle}</p>
                  </div>
                  <div>
                    <span className="text-slate-600 dark:text-slate-400">Complexity Level:</span>
                    <p className="font-medium capitalize">{personality.preferences.complexity}</p>
                  </div>
                  <div>
                    <span className="text-slate-600 dark:text-slate-400">Interactions:</span>
                    <p className="font-medium">{personality.learningProgress.interactions}</p>
                  </div>
                </div>

                {predictedActions.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Predicted Next Actions:</h4>
                    <div className="flex flex-wrap gap-2">
                      {predictedActions.map((action, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {action.action} ({Math.round(action.probability * 100)}%)
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            const isRecommended = suggestions.includes(action.action)

            return (
              <Card
                key={index}
                className={`cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                  isRecommended ? "ring-2 ring-yellow-400 ring-opacity-50" : ""
                }`}
                onClick={() => handleFeatureClick(action.action)}
              >
                <CardContent className="p-4 text-center">
                  <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-medium text-sm mb-1">{action.label}</h3>
                  {isRecommended && (
                    <Badge variant="outline" className="text-xs">
                      <Star className="h-3 w-3 mr-1" />
                      Recommended
                    </Badge>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Total Projects</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">AI Generations</p>
                  <p className="text-2xl font-bold">156</p>
                </div>
                <Brain className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Active Customers</p>
                  <p className="text-2xl font-bold">89</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Revenue</p>
                  <p className="text-2xl font-bold">$12.4k</p>
                </div>
                <BarChart3 className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions and AI-generated content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { action: "Generated AI image", time: "2 minutes ago", type: "ai-image" },
                { action: "Created new customer", time: "1 hour ago", type: "crm" },
                { action: "AI copywriting session", time: "3 hours ago", type: "ai-copy" },
                { action: "Booking confirmed", time: "5 hours ago", type: "booking" },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-slate-200 dark:border-slate-700 last:border-0"
                >
                  <span className="text-sm">{activity.action}</span>
                  <span className="text-xs text-slate-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
