"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import {
  Instagram,
  Twitter,
  Youtube,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  Bell,
  TrendingUp,
  Mail,
  Smartphone,
  MessageSquare,
  Webhook,
  Eye,
  Settings,
  BarChart3,
  User,
  Crown,
  Building,
  Sparkles,
  ImageIcon,
  Video,
  Calendar,
  Heart,
  Mic,
  Zap,
  Plus,
  Play,
  Download,
  Share,
  MessageCircle,
} from "lucide-react"

interface PlatformStatus {
  platform: string
  status: "healthy" | "warning" | "critical" | "down"
  responseTime: number
  uptime: number
  lastCheck: Date
  issues: string[]
  metrics: {
    apiCalls: number
    successRate: number
    rateLimit: number
    authStatus: boolean
  }
}

interface Alert {
  id: string
  platform: string
  type: "warning" | "critical" | "emergency"
  message: string
  timestamp: Date
  escalationLevel: number
  status: "active" | "acknowledged" | "escalated" | "resolved"
  assignedTo?: string
  responseTime?: number
}

interface NotificationStatus {
  channel: string
  type: "email" | "sms" | "slack" | "webhook"
  status: "operational" | "degraded" | "down"
  successRate: number
  avgResponseTime: number
  lastDelivery: Date
  queueSize: number
}

interface TeamMember {
  id: string
  name: string
  role: string
  status: "available" | "busy" | "offline" | "on-call"
  escalationLevel: number
  lastSeen: Date
  activeAlerts: number
}

interface SystemMetrics {
  totalAlerts: number
  activeAlerts: number
  resolvedToday: number
  avgResolutionTime: number
  systemUptime: number
  selfHealingSuccess: number
  notificationsSent: number
  escalationsTriggered: number
}

export default function MonitoringDashboard() {
  const router = useRouter()
  const [platformStatuses, setPlatformStatuses] = useState<PlatformStatus[]>([])
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [notificationStatuses, setNotificationStatuses] = useState<NotificationStatus[]>([])
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>({
    totalAlerts: 0,
    activeAlerts: 0,
    resolvedToday: 0,
    avgResolutionTime: 0,
    systemUptime: 0,
    selfHealingSuccess: 0,
    notificationsSent: 0,
    escalationsTriggered: 0,
  })
  const [isRealTimeEnabled, setIsRealTimeEnabled] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const [selectedTimeRange, setSelectedTimeRange] = useState("24h")

  const [user] = useState({
    name: "Creator",
    plan: "Pro",
    postsThisMonth: 47,
    postsLimit: 200,
    followers: 125000,
    engagement: 8.4,
    revenue: 2840,
  })

  const [recentPosts] = useState([
    {
      id: 1,
      type: "image",
      title: "AI Art: Cyberpunk City",
      platform: "Instagram",
      views: 45200,
      likes: 3400,
      comments: 89,
      status: "viral",
      createdAt: "2 hours ago",
    },
    {
      id: 2,
      type: "video",
      title: "AI Voice Tutorial",
      platform: "TikTok",
      views: 128000,
      likes: 12400,
      comments: 234,
      status: "trending",
      createdAt: "5 hours ago",
    },
    {
      id: 3,
      type: "image",
      title: "Motivational Quote Art",
      platform: "Twitter",
      views: 8900,
      likes: 567,
      comments: 23,
      status: "growing",
      createdAt: "1 day ago",
    },
  ])

  useEffect(() => {
    // Initialize dashboard data
    initializeDashboard()

    // Set up real-time updates
    const interval = setInterval(() => {
      if (isRealTimeEnabled) {
        updateDashboardData()
      }
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [isRealTimeEnabled])

  const initializeDashboard = () => {
    // Initialize platform statuses
    const platforms: PlatformStatus[] = [
      {
        platform: "Instagram",
        status: "healthy",
        responseTime: 850,
        uptime: 99.7,
        lastCheck: new Date(),
        issues: [],
        metrics: {
          apiCalls: 15420,
          successRate: 98.5,
          rateLimit: 45,
          authStatus: true,
        },
      },
      {
        platform: "TikTok",
        status: "warning",
        responseTime: 2100,
        uptime: 98.2,
        lastCheck: new Date(Date.now() - 2 * 60 * 1000),
        issues: ["Response time elevated", "Rate limit at 85%"],
        metrics: {
          apiCalls: 8930,
          successRate: 94.2,
          rateLimit: 85,
          authStatus: true,
        },
      },
      {
        platform: "Twitter/X",
        status: "healthy",
        responseTime: 650,
        uptime: 99.9,
        lastCheck: new Date(),
        issues: [],
        metrics: {
          apiCalls: 22150,
          successRate: 99.1,
          rateLimit: 32,
          authStatus: true,
        },
      },
      {
        platform: "YouTube",
        status: "critical",
        responseTime: 5200,
        uptime: 95.8,
        lastCheck: new Date(Date.now() - 5 * 60 * 1000),
        issues: ["API quota exceeded", "Upload failures detected", "Authentication token expires in 2 days"],
        metrics: {
          apiCalls: 3420,
          successRate: 87.3,
          rateLimit: 95,
          authStatus: false,
        },
      },
    ]
    setPlatformStatuses(platforms)

    // Initialize alerts
    const sampleAlerts: Alert[] = [
      {
        id: "alert-1",
        platform: "YouTube",
        type: "critical",
        message: "API quota exceeded - upload functionality disabled",
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        escalationLevel: 2,
        status: "escalated",
        assignedTo: "Michael Rodriguez",
        responseTime: 12,
      },
      {
        id: "alert-2",
        platform: "TikTok",
        type: "warning",
        message: "Response time elevated above threshold (2.1s avg)",
        timestamp: new Date(Date.now() - 8 * 60 * 1000),
        escalationLevel: 1,
        status: "acknowledged",
        assignedTo: "Alex Chen",
        responseTime: 5,
      },
      {
        id: "alert-3",
        platform: "Instagram",
        type: "warning",
        message: "Rate limit approaching 50% threshold",
        timestamp: new Date(Date.now() - 3 * 60 * 1000),
        escalationLevel: 1,
        status: "active",
      },
    ]
    setAlerts(sampleAlerts)

    // Initialize notification statuses
    const notifications: NotificationStatus[] = [
      {
        channel: "email-primary",
        type: "email",
        status: "operational",
        successRate: 96.8,
        avgResponseTime: 1250,
        lastDelivery: new Date(Date.now() - 2 * 60 * 1000),
        queueSize: 3,
      },
      {
        channel: "sms-primary",
        type: "sms",
        status: "operational",
        successRate: 98.2,
        avgResponseTime: 850,
        lastDelivery: new Date(Date.now() - 1 * 60 * 1000),
        queueSize: 1,
      },
      {
        channel: "slack-primary",
        type: "slack",
        status: "operational",
        successRate: 99.5,
        avgResponseTime: 420,
        lastDelivery: new Date(Date.now() - 30 * 1000),
        queueSize: 0,
      },
      {
        channel: "webhook-primary",
        type: "webhook",
        status: "degraded",
        successRate: 89.3,
        avgResponseTime: 3200,
        lastDelivery: new Date(Date.now() - 5 * 60 * 1000),
        queueSize: 12,
      },
    ]
    setNotificationStatuses(notifications)

    // Initialize team members
    const team: TeamMember[] = [
      {
        id: "alex-chen",
        name: "Alex Chen",
        role: "Senior Developer",
        status: "on-call",
        escalationLevel: 1,
        lastSeen: new Date(),
        activeAlerts: 1,
      },
      {
        id: "sarah-johnson",
        name: "Sarah Johnson",
        role: "DevOps Engineer",
        status: "available",
        escalationLevel: 1,
        lastSeen: new Date(Date.now() - 10 * 60 * 1000),
        activeAlerts: 0,
      },
      {
        id: "michael-rodriguez",
        name: "Michael Rodriguez",
        role: "Technical Lead",
        status: "busy",
        escalationLevel: 2,
        lastSeen: new Date(Date.now() - 2 * 60 * 1000),
        activeAlerts: 1,
      },
      {
        id: "emma-thompson",
        name: "Emma Thompson",
        role: "Engineering Manager",
        status: "available",
        escalationLevel: 3,
        lastSeen: new Date(Date.now() - 30 * 60 * 1000),
        activeAlerts: 0,
      },
      {
        id: "david-kim",
        name: "David Kim",
        role: "CTO",
        status: "offline",
        escalationLevel: 4,
        lastSeen: new Date(Date.now() - 4 * 60 * 60 * 1000),
        activeAlerts: 0,
      },
    ]
    setTeamMembers(team)

    // Initialize system metrics
    setSystemMetrics({
      totalAlerts: 847,
      activeAlerts: 3,
      resolvedToday: 28,
      avgResolutionTime: 18.5,
      systemUptime: 99.2,
      selfHealingSuccess: 94.7,
      notificationsSent: 1250,
      escalationsTriggered: 12,
    })
  }

  const updateDashboardData = () => {
    // Simulate real-time updates
    setPlatformStatuses((prev) =>
      prev.map((platform) => ({
        ...platform,
        responseTime: platform.responseTime + (Math.random() - 0.5) * 200,
        lastCheck: new Date(),
        metrics: {
          ...platform.metrics,
          apiCalls: platform.metrics.apiCalls + Math.floor(Math.random() * 50),
          rateLimit: Math.max(0, Math.min(100, platform.metrics.rateLimit + (Math.random() - 0.5) * 5)),
        },
      })),
    )

    setSystemMetrics((prev) => ({
      ...prev,
      notificationsSent: prev.notificationsSent + Math.floor(Math.random() * 5),
      totalAlerts: prev.totalAlerts + (Math.random() > 0.9 ? 1 : 0),
    }))

    setLastUpdate(new Date())
  }

  const toggleRealTime = () => {
    setIsRealTimeEnabled(!isRealTimeEnabled)
  }

  const refreshDashboard = () => {
    updateDashboardData()
  }

  const exportDashboard = () => {
    const dashboardData = {
      timestamp: new Date().toISOString(),
      platforms: platformStatuses,
      alerts: alerts,
      notifications: notificationStatuses,
      team: teamMembers,
      metrics: systemMetrics,
    }

    const blob = new Blob([JSON.stringify(dashboardData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `nexarax-dashboard-${new Date().toISOString().split("T")[0]}.json`
    a.click()
  }

  const platformIcons = {
    Instagram: <Instagram className="h-5 w-5 text-pink-600" />,
    TikTok: (
      <div className="h-5 w-5 bg-black rounded-sm flex items-center justify-center text-white text-xs font-bold">T</div>
    ),
    "Twitter/X": <Twitter className="h-5 w-5 text-blue-500" />,
    YouTube: <Youtube className="h-5 w-5 text-red-600" />,
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
      case "operational":
      case "available":
        return "bg-green-100 text-green-800 border-green-300"
      case "warning":
      case "degraded":
      case "busy":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "critical":
      case "down":
      case "offline":
        return "bg-red-100 text-red-800 border-red-300"
      case "on-call":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "viral":
        return "bg-red-500"
      case "trending":
        return "bg-orange-500"
      case "growing":
        return "bg-green-500"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
      case "operational":
      case "available":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
      case "degraded":
      case "busy":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "critical":
      case "down":
      case "offline":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "on-call":
        return <Bell className="h-4 w-4 text-blue-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4 text-blue-500" />
      case "sms":
        return <Smartphone className="h-4 w-4 text-green-500" />
      case "slack":
        return <MessageSquare className="h-4 w-4 text-purple-500" />
      case "webhook":
        return <Webhook className="h-4 w-4 text-orange-500" />
      default:
        return <Bell className="h-4 w-4 text-gray-500" />
    }
  }

  const getRoleIcon = (role: string) => {
    if (role.includes("CTO") || role.includes("Executive")) return <Crown className="h-4 w-4 text-purple-600" />
    if (role.includes("Manager")) return <Building className="h-4 w-4 text-orange-600" />
    if (role.includes("Lead")) return <Users className="h-4 w-4 text-green-600" />
    return <User className="h-4 w-4 text-blue-600" />
  }

  const healthyPlatforms = platformStatuses.filter((p) => p.status === "healthy").length
  const warningPlatforms = platformStatuses.filter((p) => p.status === "warning").length
  const criticalPlatforms = platformStatuses.filter((p) => p.status === "critical").length
  const activeAlertsCount = alerts.filter((a) => a.status === "active").length
  const escalatedAlertsCount = alerts.filter((a) => a.status === "escalated").length

  const stats = [
    { label: "Content Created", value: "0", icon: ImageIcon, color: "text-blue-600" },
    { label: "Posts Published", value: "0", icon: Video, color: "text-green-600" },
    { label: "Total Views", value: "0", icon: TrendingUp, color: "text-purple-600" },
    { label: "Engagement", value: "0%", icon: Heart, color: "text-pink-600" },
  ]

  const quickActions = [
    {
      title: "Generate AI Image",
      description: "Create viral images with AI",
      icon: ImageIcon,
      path: "/content-generator",
    },
    { title: "Create Video", description: "Generate engaging videos", icon: Video, path: "/video-creator" },
    { title: "Schedule Posts", description: "Plan your content calendar", icon: Calendar, path: "/content-calendar" },
    { title: "View Analytics", description: "Track your performance", icon: BarChart3, path: "/analytics" },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="w-4 h-4" />
      case "video":
        return <Video className="w-4 h-4" />
      case "audio":
        return <Mic className="w-4 h-4" />
      default:
        return <Sparkles className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Welcome back, {user.name}!</h1>
              <div className="flex items-center gap-2">
                <Badge className="bg-purple-100 text-purple-800">
                  <Crown className="w-3 h-3 mr-1" />
                  {user.plan} Plan
                </Badge>
                <span className="text-sm text-gray-500">Ready to create viral content?</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={() => router.push("/settings")}>
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button
              onClick={() => router.push("/create")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Content
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Posts This Month</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.postsThisMonth}</div>
              <div className="text-xs text-muted-foreground mb-2">of {user.postsLimit} limit</div>
              <Progress value={(user.postsThisMonth / user.postsLimit) * 100} className="h-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Followers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.followers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12.5%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.engagement}%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+2.1%</span> from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">£{user.revenue}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+18.2%</span> from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  Quick Create
                </CardTitle>
                <CardDescription>Generate viral content in seconds</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full justify-start h-12"
                  variant="outline"
                  onClick={() => router.push("/create/image")}
                >
                  <ImageIcon className="w-5 h-5 mr-3 text-blue-600" />
                  <div className="text-left">
                    <div className="font-semibold">AI Image</div>
                    <div className="text-xs text-gray-500">Create viral images</div>
                  </div>
                </Button>

                <Button
                  className="w-full justify-start h-12"
                  variant="outline"
                  onClick={() => router.push("/create/video")}
                >
                  <Video className="w-5 h-5 mr-3 text-purple-600" />
                  <div className="text-left">
                    <div className="font-semibold">AI Video</div>
                    <div className="text-xs text-gray-500">Generate viral videos</div>
                  </div>
                </Button>

                <Button
                  className="w-full justify-start h-12"
                  variant="outline"
                  onClick={() => router.push("/create/voice")}
                >
                  <Mic className="w-5 h-5 mr-3 text-green-600" />
                  <div className="text-left">
                    <div className="font-semibold">AI Voice</div>
                    <div className="text-xs text-gray-500">Clone any voice</div>
                  </div>
                </Button>

                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-12"
                  onClick={() => router.push("/create/auto")}
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Auto-Generate Content
                </Button>
              </CardContent>
            </Card>

            {/* Upgrade Card */}
            <Card className="mt-6 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-800">
                  <Crown className="w-5 h-5" />
                  Upgrade to Enterprise
                </CardTitle>
                <CardDescription>Unlock unlimited content creation</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm mb-4">
                  <li className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    Unlimited AI generations
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    White-label options
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    API access
                  </li>
                </ul>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">Upgrade Now</Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Posts */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-green-600" />
                      Recent Posts
                    </CardTitle>
                    <CardDescription>Your latest AI-generated content performance</CardDescription>
                  </div>
                  <Button variant="outline" onClick={() => router.push("/analytics")}>
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPosts.map((post) => (
                    <div
                      key={post.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                          {getTypeIcon(post.type)}
                        </div>
                        <div>
                          <h4 className="font-semibold">{post.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>{post.platform}</span>
                            <span>•</span>
                            <span>{post.createdAt}</span>
                            <Badge className={`${getStatusColor(post.status)} text-white text-xs`}>{post.status}</Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6 text-sm">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4 text-gray-400" />
                          <span>{post.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4 text-red-400" />
                          <span>{post.likes.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4 text-blue-400" />
                          <span>{post.comments}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Share className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Trending Templates */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                  Trending Templates
                </CardTitle>
                <CardDescription>Popular templates that are going viral right now</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="w-full h-24 bg-gradient-to-r from-pink-200 to-purple-200 rounded-lg mb-3 flex items-center justify-center">
                      <Play className="w-8 h-8 text-purple-600" />
                    </div>
                    <h4 className="font-semibold text-sm">Motivational Quote</h4>
                    <p className="text-xs text-gray-500">2.3M uses this week</p>
                  </div>

                  <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="w-full h-24 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-lg mb-3 flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-sm">AI Art Showcase</h4>
                    <p className="text-xs text-gray-500">1.8M uses this week</p>
                  </div>

                  <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="w-full h-24 bg-gradient-to-r from-green-200 to-emerald-200 rounded-lg mb-3 flex items-center justify-center">
                      <Video className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-sm">Tutorial Video</h4>
                    <p className="text-xs text-gray-500">1.2M uses this week</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
