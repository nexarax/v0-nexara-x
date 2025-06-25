"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Clock,
  Instagram,
  Twitter,
  Youtube,
  Zap,
  TrendingUp,
  Settings,
  Play,
  Pause,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  Copy,
} from "lucide-react"

interface ScheduledPost {
  id: string
  platform: "Instagram" | "TikTok" | "Twitter/X" | "YouTube"
  content: string
  scheduledTime: Date
  status: "scheduled" | "posted" | "failed"
  engagement?: {
    likes: number
    comments: number
    shares: number
    views: number
  }
}

interface OptimalTime {
  platform: string
  times: string[]
  timezone: string
  engagement_boost: string
}

export default function ContentCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([])
  const [isAutomationActive, setIsAutomationActive] = useState(true)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  // Sample scheduled posts
  useEffect(() => {
    const samplePosts: ScheduledPost[] = [
      {
        id: "1",
        platform: "Instagram",
        content: "🚀 Ready to transform your content game with AI? Here's what NexaraX can do...",
        scheduledTime: new Date(2024, 11, 20, 18, 0), // 6 PM today
        status: "scheduled",
      },
      {
        id: "2",
        platform: "TikTok",
        content: "POV: You discover AI that creates viral content in seconds 🤯",
        scheduledTime: new Date(2024, 11, 20, 19, 30), // 7:30 PM today
        status: "scheduled",
      },
      {
        id: "3",
        platform: "Twitter/X",
        content: "🧵 How I used AI to 10x my content output (and you can too)",
        scheduledTime: new Date(2024, 11, 20, 14, 0), // 2 PM today
        status: "posted",
        engagement: { likes: 127, comments: 23, shares: 45, views: 2340 },
      },
      {
        id: "4",
        platform: "YouTube",
        content: "I Used AI to Create 30 Days of Content in 30 Minutes",
        scheduledTime: new Date(2024, 11, 21, 10, 0), // 10 AM tomorrow
        status: "scheduled",
      },
      {
        id: "5",
        platform: "Instagram",
        content: "✨ AI-generated content that actually converts...",
        scheduledTime: new Date(2024, 11, 21, 18, 0), // 6 PM tomorrow
        status: "scheduled",
      },
    ]
    setScheduledPosts(samplePosts)
  }, [])

  const optimalTimes: OptimalTime[] = [
    {
      platform: "Instagram",
      times: ["6:00 PM", "8:00 PM", "12:00 PM"],
      timezone: "GMT",
      engagement_boost: "+40%",
    },
    {
      platform: "TikTok",
      times: ["7:30 PM", "9:00 PM", "6:00 AM"],
      timezone: "GMT",
      engagement_boost: "+65%",
    },
    {
      platform: "Twitter/X",
      times: ["2:00 PM", "5:00 PM", "9:00 AM"],
      timezone: "GMT",
      engagement_boost: "+35%",
    },
    {
      platform: "YouTube",
      times: ["10:00 AM", "2:00 PM", "7:00 PM"],
      timezone: "GMT",
      engagement_boost: "+50%",
    },
  ]

  const platformIcons = {
    Instagram: <Instagram className="h-4 w-4 text-pink-600" />,
    TikTok: (
      <div className="h-4 w-4 bg-black rounded-sm flex items-center justify-center text-white text-xs font-bold">T</div>
    ),
    "Twitter/X": <Twitter className="h-4 w-4 text-blue-500" />,
    YouTube: <Youtube className="h-4 w-4 text-red-600" />,
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "posted":
        return "bg-green-100 text-green-800"
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "posted":
        return <CheckCircle className="h-4 w-4" />
      case "scheduled":
        return <Clock className="h-4 w-4" />
      case "failed":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const generateWeeklySchedule = () => {
    // Simulate generating a week's worth of content
    alert("🚀 Generating 7 days of optimized content across all platforms...")
  }

  const toggleAutomation = () => {
    setIsAutomationActive(!isAutomationActive)
  }

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days = []
    const current = new Date(startDate)

    for (let i = 0; i < 42; i++) {
      days.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }

    return days
  }

  const getPostsForDate = (date: Date) => {
    return scheduledPosts.filter((post) => {
      const postDate = new Date(post.scheduledTime)
      return (
        postDate.getDate() === date.getDate() &&
        postDate.getMonth() === date.getMonth() &&
        postDate.getFullYear() === date.getFullYear()
      )
    })
  }

  const calendarDays = generateCalendarDays()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-100 text-blue-800">📅 Smart Scheduling</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI-Powered Content Calendar
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Automated posting across all platforms with optimal timing and AI-generated content
          </p>
        </div>

        {/* Control Panel */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 border-green-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                {isAutomationActive ? (
                  <Play className="h-5 w-5 text-green-600" />
                ) : (
                  <Pause className="h-5 w-5 text-red-600" />
                )}
                <span className="text-2xl font-bold text-green-600">{isAutomationActive ? "ACTIVE" : "PAUSED"}</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">Automation Status</p>
              <Button
                onClick={toggleAutomation}
                size="sm"
                className={isAutomationActive ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
              >
                {isAutomationActive ? "Pause" : "Resume"}
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <span className="text-2xl font-bold text-blue-600">{scheduledPosts.length}</span>
              </div>
              <p className="text-sm text-gray-600">Scheduled Posts</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                <span className="text-2xl font-bold text-purple-600">+127%</span>
              </div>
              <p className="text-sm text-gray-600">Engagement Boost</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Zap className="h-5 w-5 text-orange-600" />
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <p className="text-sm text-gray-600">Platforms Active</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="calendar" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="calendar">📅 Calendar View</TabsTrigger>
            <TabsTrigger value="schedule">⏰ Optimal Times</TabsTrigger>
            <TabsTrigger value="posts">📝 Scheduled Posts</TabsTrigger>
            <TabsTrigger value="analytics">📊 Analytics</TabsTrigger>
          </TabsList>

          {/* Calendar View */}
          <TabsContent value="calendar">
            <Card className="border-2 border-blue-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-6 w-6 text-blue-600" />
                    Content Calendar - {currentDate.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
                    >
                      ←
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
                    >
                      →
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="text-center font-semibold text-gray-600 p-2">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {calendarDays.map((day, index) => {
                    const postsForDay = getPostsForDate(day)
                    const isCurrentMonth = day.getMonth() === currentDate.getMonth()
                    const isToday = day.toDateString() === new Date().toDateString()

                    return (
                      <div
                        key={index}
                        className={`min-h-[100px] p-2 border rounded-lg cursor-pointer transition-colors ${
                          isCurrentMonth ? "bg-white hover:bg-blue-50" : "bg-gray-50 text-gray-400"
                        } ${isToday ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
                        onClick={() => setSelectedDate(day)}
                      >
                        <div className="font-semibold text-sm mb-1">{day.getDate()}</div>
                        <div className="space-y-1">
                          {postsForDay.slice(0, 3).map((post) => (
                            <div key={post.id} className="flex items-center gap-1 text-xs p-1 rounded bg-gray-100">
                              {platformIcons[post.platform]}
                              <span className="truncate">
                                {new Date(post.scheduledTime).toLocaleTimeString("en-GB", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>
                          ))}
                          {postsForDay.length > 3 && (
                            <div className="text-xs text-gray-500">+{postsForDay.length - 3} more</div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-6 flex justify-center">
                  <Button onClick={generateWeeklySchedule} size="lg" className="bg-purple-600 hover:bg-purple-700">
                    <Zap className="h-5 w-5 mr-2" />
                    Generate Weekly Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Optimal Times */}
          <TabsContent value="schedule">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {optimalTimes.map((timeData) => (
                <Card key={timeData.platform} className="border-2 border-green-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {platformIcons[timeData.platform as keyof typeof platformIcons]}
                      {timeData.platform} Optimal Times
                    </CardTitle>
                    <CardDescription>Best posting times for maximum engagement</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Engagement Boost:</span>
                      <Badge className="bg-green-100 text-green-800">{timeData.engagement_boost}</Badge>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Peak Times ({timeData.timezone}):</h4>
                      <div className="space-y-2">
                        {timeData.times.map((time, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <span className="font-mono">{time}</span>
                            <Badge variant="outline">Peak #{index + 1}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full" variant="outline">
                      <Settings className="h-4 w-4 mr-2" />
                      Customize Times
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Scheduled Posts */}
          <TabsContent value="posts">
            <Card className="border-2 border-purple-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-6 w-6 text-purple-600" />
                    Scheduled Posts
                  </CardTitle>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Post
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scheduledPosts.map((post) => (
                    <div key={post.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {platformIcons[post.platform]}
                            <span className="font-semibold">{post.platform}</span>
                            <Badge className={getStatusColor(post.status)}>
                              {getStatusIcon(post.status)}
                              <span className="ml-1 capitalize">{post.status}</span>
                            </Badge>
                          </div>

                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{post.content}</p>

                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>
                              📅 {post.scheduledTime.toLocaleDateString("en-GB")} at{" "}
                              {post.scheduledTime.toLocaleTimeString("en-GB", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                            {post.engagement && (
                              <span>
                                👍 {post.engagement.likes} | 💬 {post.engagement.comments} | 🔄 {post.engagement.shares}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-2 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-6 w-6 text-blue-600" />
                    Platform Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-pink-50 rounded">
                      <div className="flex items-center gap-2">
                        <Instagram className="h-5 w-5 text-pink-600" />
                        <span>Instagram</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">+45% engagement</div>
                        <div className="text-sm text-gray-600">2.3K avg. likes</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 bg-black rounded-sm flex items-center justify-center text-white text-xs font-bold">
                          T
                        </div>
                        <span>TikTok</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">+78% engagement</div>
                        <div className="text-sm text-gray-600">15.2K avg. views</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                      <div className="flex items-center gap-2">
                        <Twitter className="h-5 w-5 text-blue-500" />
                        <span>Twitter/X</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">+32% engagement</div>
                        <div className="text-sm text-gray-600">890 avg. likes</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-red-50 rounded">
                      <div className="flex items-center gap-2">
                        <Youtube className="h-5 w-5 text-red-600" />
                        <span>YouTube</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">+67% engagement</div>
                        <div className="text-sm text-gray-600">8.7K avg. views</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                    Weekly Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-green-50 rounded">
                      <div className="text-3xl font-bold text-green-600 mb-1">28</div>
                      <div className="text-sm text-gray-600">Posts Published</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded">
                        <div className="text-xl font-bold text-blue-600">127K</div>
                        <div className="text-xs text-gray-600">Total Reach</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded">
                        <div className="text-xl font-bold text-purple-600">8.9K</div>
                        <div className="text-xs text-gray-600">Engagements</div>
                      </div>
                    </div>

                    <div className="text-center p-3 bg-yellow-50 rounded">
                      <div className="text-lg font-bold text-yellow-600">+156%</div>
                      <div className="text-sm text-gray-600">Growth vs. Last Week</div>
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
