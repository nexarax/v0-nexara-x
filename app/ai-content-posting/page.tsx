"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bot,
  Instagram,
  Twitter,
  Youtube,
  Play,
  Pause,
  Calendar,
  TrendingUp,
  Users,
  Heart,
  MessageCircle,
  Share,
  Eye,
  Settings,
  Clock,
  Target,
  Sparkles,
  BarChart3,
  Send,
  Edit,
  Copy,
  ExternalLink,
} from "lucide-react"

interface AIPost {
  id: string
  platform: string
  content: string
  media: string
  scheduledTime: Date
  status: "scheduled" | "posted" | "failed" | "draft"
  engagement: {
    views: number
    likes: number
    comments: number
    shares: number
  }
  aiGenerated: boolean
  hashtags: string[]
  performance: "viral" | "high" | "medium" | "low"
}

interface Campaign {
  id: string
  name: string
  description: string
  platforms: string[]
  status: "active" | "paused" | "completed"
  postsCount: number
  totalReach: number
  engagement: number
  startDate: Date
  endDate: Date
}

export default function AIContentPostingPage() {
  const [isAIActive, setIsAIActive] = useState(true)
  const [posts, setPosts] = useState<AIPost[]>([])
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [selectedPlatform, setSelectedPlatform] = useState("all")
  const [postingStats, setPostingStats] = useState({
    totalPosts: 0,
    scheduledPosts: 0,
    viralPosts: 0,
    totalReach: 0,
    avgEngagement: 0,
    postsToday: 0,
  })

  useEffect(() => {
    initializeAIPosting()

    const interval = setInterval(() => {
      if (isAIActive) {
        generateNewContent()
        updateEngagementMetrics()
      }
    }, 15000) // Generate new content every 15 seconds

    return () => clearInterval(interval)
  }, [isAIActive])

  const initializeAIPosting = () => {
    // Initialize AI-generated posts
    // Update the platforms array to only include your active accounts
    const platforms = ["Instagram", "TikTok", "Twitter/X"] // Remove YouTube for now

    // Update sample posts to use your actual handles
    const aiPosts: AIPost[] = [
      {
        id: "post-1",
        platform: "Instagram",
        content:
          "🚀 NexaraX is revolutionizing AI content creation! Generate viral posts in seconds with our advanced AI engine. #NexaraX #AIContent #ContentCreation",
        media: "/placeholder.svg?height=400&width=400&text=NexaraX+AI+Revolution",
        scheduledTime: new Date(Date.now() + 30 * 60 * 1000),
        status: "scheduled",
        engagement: { views: 0, likes: 0, comments: 0, shares: 0 },
        aiGenerated: true,
        hashtags: ["#NexaraX", "#AIContent", "#ContentCreation", "#ViralMarketing"],
        performance: "high",
      },
      {
        id: "post-2",
        platform: "TikTok",
        content:
          "POV: You discover NexaraX and can create viral content in 30 seconds 🤯 The future of content creation is here! #NexaraX #AITool #ContentHack",
        media: "/placeholder.svg?height=400&width=300&text=NexaraX+TikTok+Demo",
        scheduledTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
        status: "scheduled",
        engagement: { views: 0, likes: 0, comments: 0, shares: 0 },
        aiGenerated: true,
        hashtags: ["#NexaraX", "#AITool", "#ContentHack", "#TikTokAI"],
        performance: "viral",
      },
      {
        id: "post-3",
        platform: "Twitter/X",
        content:
          "🧵 THREAD: How NexaraX is changing the content creation game\n\n1. AI-powered generation in seconds\n2. Multi-platform optimization\n3. Viral template library\n\nThe future is here 🚀 #NexaraX",
        media: "/placeholder.svg?height=300&width=500&text=NexaraX+Twitter+Thread",
        scheduledTime: new Date(Date.now() - 1 * 60 * 60 * 1000),
        status: "posted",
        engagement: { views: 15230, likes: 847, comments: 56, shares: 192 },
        aiGenerated: true,
        hashtags: ["#NexaraX", "#AIContent", "#ContentStrategy", "#TwitterThread"],
        performance: "viral",
      },
    ]
    setPosts(aiPosts)

    // Initialize campaigns
    const aiCampaigns: Campaign[] = [
      {
        id: "campaign-1",
        name: "AI Hacks Viral Series",
        description: "7-day series revealing AI content creation secrets",
        platforms: ["Instagram", "TikTok", "Twitter"],
        status: "active",
        postsCount: 21,
        totalReach: 2450000,
        engagement: 8.7,
        startDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      },
      {
        id: "campaign-2",
        name: "Make Money Online Challenge",
        description: "30-day challenge showing income generation with AI",
        platforms: ["YouTube", "Instagram", "Twitter"],
        status: "active",
        postsCount: 45,
        totalReach: 5670000,
        engagement: 12.3,
        startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      },
      {
        id: "campaign-3",
        name: "Content Creator Masterclass",
        description: "Educational series on advanced AI content techniques",
        platforms: ["YouTube", "Instagram"],
        status: "paused",
        postsCount: 12,
        totalReach: 890000,
        engagement: 15.6,
        startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() + 23 * 24 * 60 * 60 * 1000),
      },
    ]
    setCampaigns(aiCampaigns)

    // Initialize stats
    setPostingStats({
      totalPosts: 247,
      scheduledPosts: 18,
      viralPosts: 23,
      totalReach: 8950000,
      avgEngagement: 11.2,
      postsToday: 8,
    })
  }

  const generateNewContent = () => {
    // Simulate AI generating new content
    const platforms = ["Instagram", "TikTok", "Twitter", "YouTube"]
    const contentTypes = [
      "🔥 This AI prompt just made me £2K in one day...",
      "POV: You discover the secret to viral content creation",
      "THREAD: 5 AI tools that will change your life",
      "Behind the scenes: How I create viral content with AI",
      "The AI hack that 99% of creators don't know about",
      "From 0 to 100K followers using only AI content",
    ]

    if (Math.random() > 0.7) {
      // 30% chance to generate new content
      const newPost: AIPost = {
        id: `post-${Date.now()}`,
        platform: platforms[Math.floor(Math.random() * platforms.length)],
        content: contentTypes[Math.floor(Math.random() * contentTypes.length)],
        media: `/placeholder.svg?height=400&width=400&text=AI+Generated+${Date.now()}`,
        scheduledTime: new Date(Date.now() + Math.random() * 8 * 60 * 60 * 1000), // Random time in next 8 hours
        status: "draft",
        engagement: { views: 0, likes: 0, comments: 0, shares: 0 },
        aiGenerated: true,
        hashtags: ["#AIContent", "#ViralTips", "#ContentCreator"],
        performance: ["viral", "high", "medium"][Math.floor(Math.random() * 3)] as "viral" | "high" | "medium",
      }

      setPosts((prev) => [newPost, ...prev])
      setPostingStats((prev) => ({
        ...prev,
        totalPosts: prev.totalPosts + 1,
      }))
    }
  }

  const updateEngagementMetrics = () => {
    // Simulate real-time engagement updates
    setPosts((prev) =>
      prev.map((post) => {
        if (post.status === "posted") {
          return {
            ...post,
            engagement: {
              views: post.engagement.views + Math.floor(Math.random() * 1000),
              likes: post.engagement.likes + Math.floor(Math.random() * 100),
              comments: post.engagement.comments + Math.floor(Math.random() * 10),
              shares: post.engagement.shares + Math.floor(Math.random() * 50),
            },
          }
        }
        return post
      }),
    )

    // Update overall stats
    setPostingStats((prev) => ({
      ...prev,
      totalReach: prev.totalReach + Math.floor(Math.random() * 10000),
      avgEngagement: prev.avgEngagement + (Math.random() - 0.5) * 0.1,
    }))
  }

  const toggleAI = () => {
    setIsAIActive(!isAIActive)
  }

  const schedulePost = (postId: string) => {
    setPosts((prev) => prev.map((post) => (post.id === postId ? { ...post, status: "scheduled" } : post)))
    setPostingStats((prev) => ({
      ...prev,
      scheduledPosts: prev.scheduledPosts + 1,
    }))
  }

  const publishNow = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              status: "posted",
              scheduledTime: new Date(),
              engagement: {
                views: Math.floor(Math.random() * 10000),
                likes: Math.floor(Math.random() * 1000),
                comments: Math.floor(Math.random() * 100),
                shares: Math.floor(Math.random() * 200),
              },
            }
          : post,
      ),
    )
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
      case "posted":
        return "bg-green-100 text-green-800"
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case "viral":
        return "bg-purple-100 text-purple-800"
      case "high":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredPosts = selectedPlatform === "all" ? posts : posts.filter((post) => post.platform === selectedPlatform)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-purple-100 text-purple-800">🤖 AI Content Engine</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            AI-Powered Content Posting
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Let AI create, schedule, and optimize your viral content across all platforms automatically
          </p>
        </div>

        {/* AI Control Panel */}
        <Card className="mb-8 border-2 border-purple-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-6 w-6 text-purple-600" />
                AI Content Engine
              </CardTitle>
              <div className="flex gap-2">
                <Button onClick={toggleAI} variant={isAIActive ? "destructive" : "default"}>
                  {isAIActive ? (
                    <>
                      <Pause className="h-4 w-4 mr-2" />
                      Pause AI
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Activate AI
                    </>
                  )}
                </Button>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Configure
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div className="flex items-center gap-2">
                {isAIActive ? (
                  <>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-green-600">AI Active</span>
                  </>
                ) : (
                  <>
                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-600">AI Paused</span>
                  </>
                )}
              </div>
              <div className="text-sm text-gray-600">{postingStats.totalPosts} posts created</div>
              <div className="text-sm text-gray-600">{postingStats.scheduledPosts} scheduled</div>
              <div className="text-sm text-gray-600">{postingStats.viralPosts} viral hits</div>
              <div className="text-sm text-gray-600">{(postingStats.totalReach / 1000000).toFixed(1)}M total reach</div>
              <div className="text-sm text-gray-600">{postingStats.avgEngagement.toFixed(1)}% avg engagement</div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 border-green-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <TrendingUp className="h-6 w-6 text-green-600" />
                <span className="text-3xl font-bold text-green-600">{postingStats.viralPosts}</span>
              </div>
              <p className="text-sm text-gray-600">Viral Posts</p>
              <div className="flex items-center justify-center mt-2">
                <Sparkles className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-xs text-green-600">+5 this week</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Users className="h-6 w-6 text-blue-600" />
                <span className="text-3xl font-bold text-blue-600">
                  {(postingStats.totalReach / 1000000).toFixed(1)}M
                </span>
              </div>
              <p className="text-sm text-gray-600">Total Reach</p>
              <div className="flex items-center justify-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-xs text-green-600">+2.3M this week</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Heart className="h-6 w-6 text-purple-600" />
                <span className="text-3xl font-bold text-purple-600">{postingStats.avgEngagement.toFixed(1)}%</span>
              </div>
              <p className="text-sm text-gray-600">Avg Engagement</p>
              <div className="flex items-center justify-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-xs text-green-600">+1.8% this week</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Calendar className="h-6 w-6 text-orange-600" />
                <span className="text-3xl font-bold text-orange-600">{postingStats.postsToday}</span>
              </div>
              <p className="text-sm text-gray-600">Posts Today</p>
              <div className="flex items-center justify-center mt-2">
                <Clock className="h-4 w-4 text-blue-500 mr-1" />
                <span className="text-xs text-blue-600">Next in 30min</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="posts">📝 AI Posts</TabsTrigger>
            <TabsTrigger value="campaigns">🎯 Campaigns</TabsTrigger>
            <TabsTrigger value="analytics">📊 Analytics</TabsTrigger>
            <TabsTrigger value="settings">⚙️ Settings</TabsTrigger>
          </TabsList>

          {/* Posts Tab */}
          <TabsContent value="posts">
            <div className="space-y-6">
              {/* Platform Filter */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Filter by platform:</span>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={selectedPlatform === "all" ? "default" : "outline"}
                    onClick={() => setSelectedPlatform("all")}
                  >
                    All Platforms
                  </Button>
                  {Object.entries(platformIcons).map(([platform, icon]) => (
                    <Button
                      key={platform}
                      size="sm"
                      variant={selectedPlatform === platform ? "default" : "outline"}
                      onClick={() => setSelectedPlatform(platform)}
                      className="flex items-center gap-2"
                    >
                      {icon}
                      {platform}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Posts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="border-2 border-purple-200">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          {platformIcons[post.platform as keyof typeof platformIcons]}
                          {post.platform}
                        </CardTitle>
                        <div className="flex gap-2">
                          <Badge className={getStatusColor(post.status)}>{post.status.toUpperCase()}</Badge>
                          <Badge className={getPerformanceColor(post.performance)}>
                            {post.performance.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      <CardDescription>
                        {post.status === "scheduled"
                          ? `Scheduled for ${post.scheduledTime.toLocaleString()}`
                          : post.status === "posted"
                            ? `Posted ${post.scheduledTime.toLocaleString()}`
                            : "Draft - Ready to schedule"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Media Preview */}
                      <div className="relative">
                        <img
                          src={post.media || "/placeholder.svg"}
                          alt="Post media"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        {post.aiGenerated && (
                          <Badge className="absolute top-2 left-2 bg-purple-600 text-white">
                            <Bot className="h-3 w-3 mr-1" />
                            AI Generated
                          </Badge>
                        )}
                      </div>

                      {/* Content */}
                      <div>
                        <p className="text-sm text-gray-700 line-clamp-3">{post.content}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {post.hashtags.slice(0, 3).map((hashtag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {hashtag}
                            </Badge>
                          ))}
                          {post.hashtags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{post.hashtags.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Engagement Metrics */}
                      {post.status === "posted" && (
                        <div className="grid grid-cols-4 gap-4 p-3 bg-gray-50 rounded-lg">
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-1">
                              <Eye className="h-4 w-4 text-gray-500" />
                              <span className="text-sm font-semibold">{post.engagement.views.toLocaleString()}</span>
                            </div>
                            <span className="text-xs text-gray-500">Views</span>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-1">
                              <Heart className="h-4 w-4 text-red-500" />
                              <span className="text-sm font-semibold">{post.engagement.likes.toLocaleString()}</span>
                            </div>
                            <span className="text-xs text-gray-500">Likes</span>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-1">
                              <MessageCircle className="h-4 w-4 text-blue-500" />
                              <span className="text-sm font-semibold">{post.engagement.comments}</span>
                            </div>
                            <span className="text-xs text-gray-500">Comments</span>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-1">
                              <Share className="h-4 w-4 text-green-500" />
                              <span className="text-sm font-semibold">{post.engagement.shares}</span>
                            </div>
                            <span className="text-xs text-gray-500">Shares</span>
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        {post.status === "draft" && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => schedulePost(post.id)}
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              <Calendar className="h-4 w-4 mr-2" />
                              Schedule
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => publishNow(post.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Send className="h-4 w-4 mr-2" />
                              Post Now
                            </Button>
                          </>
                        )}
                        {post.status === "scheduled" && (
                          <Button
                            size="sm"
                            onClick={() => publishNow(post.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Send className="h-4 w-4 mr-2" />
                            Post Now
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </Button>
                        {post.status === "posted" && (
                          <Button size="sm" variant="outline">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Post
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns">
            <div className="space-y-6">
              {campaigns.map((campaign) => (
                <Card key={campaign.id} className="border-2 border-blue-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-6 w-6 text-blue-600" />
                        {campaign.name}
                      </CardTitle>
                      <Badge
                        className={
                          campaign.status === "active"
                            ? "bg-green-100 text-green-800"
                            : campaign.status === "paused"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                        }
                      >
                        {campaign.status.toUpperCase()}
                      </Badge>
                    </div>
                    <CardDescription>{campaign.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded">
                        <div className="text-lg font-bold text-blue-600">{campaign.postsCount}</div>
                        <div className="text-xs text-gray-600">Posts</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded">
                        <div className="text-lg font-bold text-green-600">
                          {(campaign.totalReach / 1000000).toFixed(1)}M
                        </div>
                        <div className="text-xs text-gray-600">Reach</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded">
                        <div className="text-lg font-bold text-purple-600">{campaign.engagement}%</div>
                        <div className="text-xs text-gray-600">Engagement</div>
                      </div>
                      <div className="text-center p-3 bg-orange-50 rounded">
                        <div className="text-lg font-bold text-orange-600">
                          {Math.ceil((campaign.endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))}
                        </div>
                        <div className="text-xs text-gray-600">Days Left</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Platforms:</span>
                      {campaign.platforms.map((platform) => (
                        <div key={platform} className="flex items-center gap-1">
                          {platformIcons[platform as keyof typeof platformIcons]}
                          <span className="text-sm">{platform}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        View Analytics
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Campaign
                      </Button>
                      <Button size="sm" variant="outline">
                        {campaign.status === "active" ? (
                          <>
                            <Pause className="h-4 w-4 mr-2" />
                            Pause
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Resume
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-2 border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                    Performance Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                      <span className="text-sm">Total Posts Created</span>
                      <span className="font-semibold text-green-600">{postingStats.totalPosts}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                      <span className="text-sm">Viral Success Rate</span>
                      <span className="font-semibold text-blue-600">
                        {((postingStats.viralPosts / postingStats.totalPosts) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                      <span className="text-sm">Average Engagement</span>
                      <span className="font-semibold text-purple-600">{postingStats.avgEngagement.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
                      <span className="text-sm">Total Reach</span>
                      <span className="font-semibold text-orange-600">
                        {(postingStats.totalReach / 1000000).toFixed(1)}M
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-6 w-6 text-blue-600" />
                    Platform Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Instagram className="h-5 w-5 text-pink-600" />
                        <span className="text-sm">Instagram</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">2.3M reach</div>
                        <div className="text-xs text-gray-500">12.4% engagement</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 bg-black rounded text-white text-xs flex items-center justify-center font-bold">
                          T
                        </div>
                        <span className="text-sm">TikTok</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">4.1M reach</div>
                        <div className="text-xs text-gray-500">18.7% engagement</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Twitter className="h-5 w-5 text-blue-500" />
                        <span className="text-sm">Twitter/X</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">1.8M reach</div>
                        <div className="text-xs text-gray-500">8.9% engagement</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Youtube className="h-5 w-5 text-red-600" />
                        <span className="text-sm">YouTube</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">750K reach</div>
                        <div className="text-xs text-gray-500">15.2% engagement</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-2 border-purple-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-6 w-6 text-purple-600" />
                    AI Content Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Content Generation Frequency</label>
                    <select className="w-full p-2 border rounded-lg">
                      <option>Every 15 minutes</option>
                      <option>Every 30 minutes</option>
                      <option>Every hour</option>
                      <option>Every 2 hours</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Content Style</label>
                    <select className="w-full p-2 border rounded-lg">
                      <option>Viral & Engaging</option>
                      <option>Professional</option>
                      <option>Educational</option>
                      <option>Entertainment</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Target Audience</label>
                    <select className="w-full p-2 border rounded-lg">
                      <option>Content Creators</option>
                      <option>Entrepreneurs</option>
                      <option>General Public</option>
                      <option>Tech Enthusiasts</option>
                    </select>
                  </div>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <Settings className="h-4 w-4 mr-2" />
                    Save AI Settings
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-6 w-6 text-blue-600" />
                    Posting Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Auto-Post Times</label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked />
                        <span className="text-sm">9:00 AM (Peak morning)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked />
                        <span className="text-sm">1:00 PM (Lunch break)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked />
                        <span className="text-sm">6:00 PM (Evening peak)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" />
                        <span className="text-sm">9:00 PM (Night scroll)</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Time Zone</label>
                    <select className="w-full p-2 border rounded-lg">
                      <option>GMT (London)</option>
                      <option>EST (New York)</option>
                      <option>PST (Los Angeles)</option>
                      <option>CET (Paris)</option>
                    </select>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Calendar className="h-4 w-4 mr-2" />
                    Update Schedule
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
