"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Rocket,
  Target,
  TrendingUp,
  Users,
  DollarSign,
  Instagram,
  Twitter,
  Youtube,
  CheckCircle,
  BarChart3,
  Heart,
  Settings,
  Sparkles,
  Megaphone,
  BrainCircuit,
  LineChart,
  PieChart,
  Activity,
  Gauge,
  AlertCircle,
  Plus,
  Edit,
} from "lucide-react"

interface LaunchCampaign {
  id: string
  name: string
  description: string
  status: "draft" | "scheduled" | "active" | "completed" | "paused"
  budget: number
  targetAudience: string
  platforms: string[]
  startDate: Date
  endDate: Date
  goals: {
    reach: number
    engagement: number
    conversions: number
    revenue: number
  }
  currentMetrics: {
    reach: number
    engagement: number
    conversions: number
    revenue: number
    impressions: number
    clicks: number
  }
  content: {
    posts: number
    videos: number
    images: number
    stories: number
  }
}

export default function LaunchCampaignPage() {
  const [campaigns, setCampaigns] = useState<LaunchCampaign[]>([])
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  const initializeCampaigns = () => {
    const sampleCampaigns: LaunchCampaign[] = [
      {
        id: "campaign-1",
        name: "NexaraX Launch Blitz",
        description: "Major product launch campaign across all platforms",
        status: "active",
        budget: 50000,
        targetAudience: "Content Creators & Entrepreneurs",
        platforms: ["Instagram", "TikTok", "Twitter", "YouTube"],
        startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() + 23 * 24 * 60 * 60 * 1000),
        goals: {
          reach: 10000000,
          engagement: 500000,
          conversions: 25000,
          revenue: 1000000,
        },
        currentMetrics: {
          reach: 7200000,
          engagement: 380000,
          conversions: 18500,
          revenue: 740000,
          impressions: 15600000,
          clicks: 890000,
        },
        content: {
          posts: 156,
          videos: 45,
          images: 89,
          stories: 67,
        },
      },
      {
        id: "campaign-2",
        name: "AI Creator Success Stories",
        description: "Showcase user success stories and testimonials",
        status: "scheduled",
        budget: 25000,
        targetAudience: "Aspiring Content Creators",
        platforms: ["Instagram", "YouTube", "Twitter"],
        startDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() + 33 * 24 * 60 * 60 * 1000),
        goals: {
          reach: 5000000,
          engagement: 250000,
          conversions: 12000,
          revenue: 480000,
        },
        currentMetrics: {
          reach: 0,
          engagement: 0,
          conversions: 0,
          revenue: 0,
          impressions: 0,
          clicks: 0,
        },
        content: {
          posts: 78,
          videos: 24,
          images: 45,
          stories: 32,
        },
      },
      {
        id: "campaign-3",
        name: "Viral Content Masterclass",
        description: "Educational campaign teaching viral content creation",
        status: "completed",
        budget: 35000,
        targetAudience: "Content Creators & Marketers",
        platforms: ["YouTube", "Instagram", "Twitter"],
        startDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        goals: {
          reach: 8000000,
          engagement: 400000,
          conversions: 20000,
          revenue: 800000,
        },
        currentMetrics: {
          reach: 9200000,
          engagement: 520000,
          conversions: 24500,
          revenue: 980000,
          impressions: 18900000,
          clicks: 1200000,
        },
        content: {
          posts: 124,
          videos: 38,
          images: 67,
          stories: 45,
        },
      },
    ]
    setCampaigns(sampleCampaigns)
  }

  useState(() => {
    initializeCampaigns()
  })

  const platformIcons = {
    Instagram: <Instagram className="h-5 w-5 text-pink-600" />,
    TikTok: (
      <div className="h-5 w-5 bg-black rounded-sm flex items-center justify-center text-white text-xs font-bold">T</div>
    ),
    Twitter: <Twitter className="h-5 w-5 text-blue-500" />,
    YouTube: <Youtube className="h-5 w-5 text-red-600" />,
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-purple-100 text-purple-800"
      case "paused":
        return "bg-yellow-100 text-yellow-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const calculateProgress = (current: number, goal: number) => {
    return Math.min(100, (current / goal) * 100)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  const launchNewCampaign = () => {
    // Redirect to campaign creation
    window.location.href = "/campaign-builder"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-orange-100 text-orange-800">🚀 Launch Center</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Campaign Launch Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Create, manage, and optimize viral marketing campaigns that drive massive growth and revenue
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 border-green-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Rocket className="h-6 w-6 text-green-600" />
                <span className="text-3xl font-bold text-green-600">3</span>
              </div>
              <p className="text-sm text-gray-600">Active Campaigns</p>
              <div className="flex items-center justify-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-xs text-green-600">+2 this month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Users className="h-6 w-6 text-blue-600" />
                <span className="text-3xl font-bold text-blue-600">16.4M</span>
              </div>
              <p className="text-sm text-gray-600">Total Reach</p>
              <div className="flex items-center justify-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-xs text-green-600">+3.2M this week</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <DollarSign className="h-6 w-6 text-purple-600" />
                <span className="text-3xl font-bold text-purple-600">{formatCurrency(1720000)}</span>
              </div>
              <p className="text-sm text-gray-600">Revenue Generated</p>
              <div className="flex items-center justify-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-xs text-green-600">+£240K this week</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Target className="h-6 w-6 text-orange-600" />
                <span className="text-3xl font-bold text-orange-600">43K</span>
              </div>
              <p className="text-sm text-gray-600">Conversions</p>
              <div className="flex items-center justify-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-xs text-green-600">+8.5K this week</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <Button
            size="lg"
            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
            onClick={launchNewCampaign}
          >
            <Rocket className="w-5 h-5 mr-2" />
            Launch New Campaign
          </Button>
          <Button size="lg" variant="outline" onClick={() => (window.location.href = "/ai-content-posting")}>
            <BrainCircuit className="w-5 h-5 mr-2" />
            AI Content Engine
          </Button>
          <Button size="lg" variant="outline" onClick={() => (window.location.href = "/analytics")}>
            <BarChart3 className="w-5 h-5 mr-2" />
            View Analytics
          </Button>
        </div>

        <Tabs defaultValue="campaigns" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="campaigns">🎯 Campaigns</TabsTrigger>
            <TabsTrigger value="performance">📊 Performance</TabsTrigger>
            <TabsTrigger value="templates">📝 Templates</TabsTrigger>
            <TabsTrigger value="insights">💡 Insights</TabsTrigger>
          </TabsList>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns">
            <div className="space-y-6">
              {campaigns.map((campaign) => (
                <Card key={campaign.id} className="border-2 border-orange-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-6 w-6 text-orange-600" />
                        {campaign.name}
                      </CardTitle>
                      <div className="flex gap-2">
                        <Badge className={getStatusColor(campaign.status)}>{campaign.status.toUpperCase()}</Badge>
                        <Badge variant="outline">{formatCurrency(campaign.budget)} budget</Badge>
                      </div>
                    </div>
                    <CardDescription>{campaign.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Campaign Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Users className="h-5 w-5 text-blue-600" />
                          <span className="text-lg font-bold text-blue-600">
                            {formatNumber(campaign.currentMetrics.reach)}
                          </span>
                        </div>
                        <div className="text-xs text-gray-600 mb-1">Reach</div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${calculateProgress(campaign.currentMetrics.reach, campaign.goals.reach)}%`,
                            }}
                          />
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {calculateProgress(campaign.currentMetrics.reach, campaign.goals.reach).toFixed(1)}% of goal
                        </div>
                      </div>

                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Heart className="h-5 w-5 text-green-600" />
                          <span className="text-lg font-bold text-green-600">
                            {formatNumber(campaign.currentMetrics.engagement)}
                          </span>
                        </div>
                        <div className="text-xs text-gray-600 mb-1">Engagement</div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${calculateProgress(campaign.currentMetrics.engagement, campaign.goals.engagement)}%`,
                            }}
                          />
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {calculateProgress(campaign.currentMetrics.engagement, campaign.goals.engagement).toFixed(1)}%
                          of goal
                        </div>
                      </div>

                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Target className="h-5 w-5 text-purple-600" />
                          <span className="text-lg font-bold text-purple-600">
                            {formatNumber(campaign.currentMetrics.conversions)}
                          </span>
                        </div>
                        <div className="text-xs text-gray-600 mb-1">Conversions</div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${calculateProgress(campaign.currentMetrics.conversions, campaign.goals.conversions)}%`,
                            }}
                          />
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {calculateProgress(campaign.currentMetrics.conversions, campaign.goals.conversions).toFixed(
                            1,
                          )}
                          % of goal
                        </div>
                      </div>

                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <DollarSign className="h-5 w-5 text-orange-600" />
                          <span className="text-lg font-bold text-orange-600">
                            {formatCurrency(campaign.currentMetrics.revenue)}
                          </span>
                        </div>
                        <div className="text-xs text-gray-600 mb-1">Revenue</div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${calculateProgress(campaign.currentMetrics.revenue, campaign.goals.revenue)}%`,
                            }}
                          />
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {calculateProgress(campaign.currentMetrics.revenue, campaign.goals.revenue).toFixed(1)}% of
                          goal
                        </div>
                      </div>
                    </div>

                    {/* Campaign Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Campaign Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Target Audience:</span>
                            <span className="font-medium">{campaign.targetAudience}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Duration:</span>
                            <span className="font-medium">
                              {Math.ceil(
                                (campaign.endDate.getTime() - campaign.startDate.getTime()) / (1000 * 60 * 60 * 24),
                              )}{" "}
                              days
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Budget:</span>
                            <span className="font-medium">{formatCurrency(campaign.budget)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">ROI:</span>
                            <span className="font-medium text-green-600">
                              {((campaign.currentMetrics.revenue / campaign.budget - 1) * 100).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Content Created</h4>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="text-center p-3 bg-blue-50 rounded">
                            <div className="text-lg font-bold text-blue-600">{campaign.content.posts}</div>
                            <div className="text-xs text-gray-600">Posts</div>
                          </div>
                          <div className="text-center p-3 bg-red-50 rounded">
                            <div className="text-lg font-bold text-red-600">{campaign.content.videos}</div>
                            <div className="text-xs text-gray-600">Videos</div>
                          </div>
                          <div className="text-center p-3 bg-green-50 rounded">
                            <div className="text-lg font-bold text-green-600">{campaign.content.images}</div>
                            <div className="text-xs text-gray-600">Images</div>
                          </div>
                          <div className="text-center p-3 bg-purple-50 rounded">
                            <div className="text-lg font-bold text-purple-600">{campaign.content.stories}</div>
                            <div className="text-xs text-gray-600">Stories</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Platforms */}
                    <div>
                      <h4 className="font-semibold mb-3">Active Platforms</h4>
                      <div className="flex gap-3">
                        {campaign.platforms.map((platform) => (
                          <div key={platform} className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                            {platformIcons[platform as keyof typeof platformIcons]}
                            <span className="text-sm font-medium">{platform}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4 border-t">
                      <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        View Analytics
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Campaign
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Button>
                      {campaign.status === "active" && (
                        <Button size="sm" variant="outline">
                          <AlertCircle className="h-4 w-4 mr-2" />
                          Pause
                        </Button>
                      )}
                      {campaign.status === "scheduled" && (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <Rocket className="h-4 w-4 mr-2" />
                          Launch Now
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-2 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="h-6 w-6 text-blue-600" />
                    Campaign Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                      <span className="text-sm">Best Performing Campaign</span>
                      <span className="font-semibold text-green-600">Viral Content Masterclass</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                      <span className="text-sm">Highest ROI</span>
                      <span className="font-semibold text-blue-600">180% (Masterclass)</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                      <span className="text-sm">Best Platform</span>
                      <span className="font-semibold text-purple-600">TikTok (18.7% engagement)</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
                      <span className="text-sm">Total Campaigns</span>
                      <span className="font-semibold text-orange-600">12 (3 active)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-6 w-6 text-green-600" />
                    Revenue Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-500 rounded"></div>
                        <span className="text-sm">Subscriptions</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{formatCurrency(1200000)}</div>
                        <div className="text-xs text-gray-500">70%</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-500 rounded"></div>
                        <span className="text-sm">One-time Purchases</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{formatCurrency(350000)}</div>
                        <div className="text-xs text-gray-500">20%</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-purple-500 rounded"></div>
                        <span className="text-sm">Affiliate Commissions</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{formatCurrency(170000)}</div>
                        <div className="text-xs text-gray-500">10%</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-2 border-purple-200 cursor-pointer hover:border-purple-300 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Rocket className="h-6 w-6 text-purple-600" />
                    Product Launch
                  </CardTitle>
                  <CardDescription>Complete campaign for new product launches</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      30-day campaign timeline
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Multi-platform content
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Influencer outreach
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Performance tracking
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">Use Template</Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-200 cursor-pointer hover:border-blue-300 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                    Viral Content Series
                  </CardTitle>
                  <CardDescription>Create viral content that spreads organically</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Trending topic research
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Hook optimization
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Cross-platform adaptation
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Engagement boosting
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">Use Template</Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200 cursor-pointer hover:border-green-300 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-6 w-6 text-green-600" />
                    Community Building
                  </CardTitle>
                  <CardDescription>Build engaged communities around your brand</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Community guidelines
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Engagement strategies
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      User-generated content
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Moderation tools
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">Use Template</Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-orange-200 cursor-pointer hover:border-orange-300 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-6 w-6 text-orange-600" />
                    Revenue Campaign
                  </CardTitle>
                  <CardDescription>Maximize revenue with conversion-focused campaigns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Sales funnel optimization
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Conversion tracking
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      A/B testing framework
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      ROI optimization
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-orange-600 hover:bg-orange-700">Use Template</Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-red-200 cursor-pointer hover:border-red-300 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Megaphone className="h-6 w-6 text-red-600" />
                    Brand Awareness
                  </CardTitle>
                  <CardDescription>Increase brand visibility and recognition</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Brand storytelling
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Visual identity consistency
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Reach optimization
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Brand mention tracking
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-red-600 hover:bg-red-700">Use Template</Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-gray-200 cursor-pointer hover:border-gray-300 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-6 w-6 text-gray-600" />
                    Custom Campaign
                  </CardTitle>
                  <CardDescription>Build your own campaign from scratch</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Flexible structure
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Custom objectives
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Personalized strategy
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Advanced targeting
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-gray-600 hover:bg-gray-700">Create Custom</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights">
            <div className="space-y-6">
              <Card className="border-2 border-yellow-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-yellow-600" />
                    AI Campaign Insights
                  </CardTitle>
                  <CardDescription>Data-driven recommendations for your campaigns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-green-800">Optimal Posting Time Identified</h4>
                        <p className="text-sm text-green-700">
                          Your audience is most active at 2:00 PM GMT. Consider scheduling more content during this time
                          for 23% higher engagement.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-800">Trending Content Opportunity</h4>
                        <p className="text-sm text-blue-700">
                          "AI productivity hacks" is trending in your niche. Create content around this topic for
                          potential viral reach.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-start gap-3">
                      <Target className="h-5 w-5 text-purple-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-purple-800">Audience Expansion Opportunity</h4>
                        <p className="text-sm text-purple-700">
                          Your content resonates well with "Digital Marketers" segment. Consider targeting this audience
                          for 15% better conversion rates.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-start gap-3">
                      <DollarSign className="h-5 w-5 text-orange-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-orange-800">Budget Optimization Suggestion</h4>
                        <p className="text-sm text-orange-700">
                          Reallocate 20% of your Twitter budget to TikTok for potentially 40% higher ROI based on
                          current performance data.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-2 border-blue-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-6 w-6 text-blue-600" />
                      Performance Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                        <span className="text-sm">Engagement Rate</span>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          <span className="font-semibold text-green-600">+2.3%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                        <span className="text-sm">Conversion Rate</span>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          <span className="font-semibold text-green-600">+1.8%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                        <span className="text-sm">Click-through Rate</span>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-blue-500" />
                          <span className="font-semibold text-blue-600">+0.9%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-yellow-50 rounded">
                        <span className="text-sm">Cost per Acquisition</span>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
                          <span className="font-semibold text-green-600">-12%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-purple-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Gauge className="h-6 w-6 text-purple-600" />
                      Campaign Health Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-6">
                      <div className="text-4xl font-bold text-green-600 mb-2">87/100</div>
                      <div className="text-sm text-gray-600">Excellent Performance</div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Content Quality</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: "92%" }}></div>
                          </div>
                          <span className="text-sm font-medium">92%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Audience Targeting</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: "88%" }}></div>
                          </div>
                          <span className="text-sm font-medium">88%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Budget Efficiency</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "76%" }}></div>
                          </div>
                          <span className="text-sm font-medium">76%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Timing Optimization</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: "94%" }}></div>
                          </div>
                          <span className="text-sm font-medium">94%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
