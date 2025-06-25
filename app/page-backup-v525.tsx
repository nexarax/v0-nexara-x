// BACKUP OF VERSION 525 - Complete with tabs
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, Target, TrendingUp, BarChart3, Play, ImageIcon, Video, Mic, Calendar, BarChart } from "lucide-react"
import { useRouter } from "next/navigation"

export default function HomePageBackupV525() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("create")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              NexaraX
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Button variant="ghost" onClick={() => router.push("/features")}>
              Features
            </Button>
            <Button variant="ghost" onClick={() => router.push("/pricing")}>
              Pricing
            </Button>
            <Button
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              onClick={() => router.push("/create")}
            >
              Get Started
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-6xl">
          <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-blue-200">
            🚀 AI-Powered Social Media Revolution
          </Badge>

          <h1 className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Create Viral Content
            <br />
            with AI Magic
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
            Transform your social media presence with AI-powered content creation. Generate stunning images, videos, and
            posts that captivate your audience and drive engagement.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
              onClick={() => router.push("/create")}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Start Creating Now - FREE
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-blue-200 hover:bg-blue-50 px-8 py-4 text-lg"
              onClick={() => router.push("/features")}
            >
              <Play className="w-5 h-5 mr-2" />
              See Features
            </Button>
          </div>

          {/* Feature Tabs - THIS IS WHAT WAS IN V525 */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="create" className="flex items-center">
                <ImageIcon className="w-4 h-4 mr-2" />
                AI Creation
              </TabsTrigger>
              <TabsTrigger value="schedule" className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Smart Scheduling
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center">
                <BarChart className="w-4 h-4 mr-2" />
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="create" className="space-y-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-blue-200">
                <h3 className="text-2xl font-bold mb-4">AI Content Generation</h3>
                <p className="text-gray-600 mb-6">
                  Create stunning visuals, videos, and copy with advanced AI technology.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <ImageIcon className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                    <h4 className="font-semibold">AI Images</h4>
                    <p className="text-sm text-gray-600">Generate custom images from text prompts</p>
                  </div>
                  <div className="text-center">
                    <Video className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                    <h4 className="font-semibold">AI Videos</h4>
                    <p className="text-sm text-gray-600">Create engaging video content automatically</p>
                  </div>
                  <div className="text-center">
                    <Mic className="w-12 h-12 text-green-600 mx-auto mb-3" />
                    <h4 className="font-semibold">AI Voice</h4>
                    <p className="text-sm text-gray-600">Generate natural-sounding voiceovers</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-purple-200">
                <h3 className="text-2xl font-bold mb-4">Smart Scheduling & Automation</h3>
                <p className="text-gray-600 mb-6">
                  Post at optimal times across all platforms with intelligent automation.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-3">
                    <Calendar className="w-8 h-8 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold">Optimal Timing</h4>
                      <p className="text-sm text-gray-600">
                        AI determines the best posting times for maximum engagement
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Target className="w-8 h-8 text-purple-600 mt-1" />
                    <div>
                      <h4 className="font-semibold">Multi-Platform</h4>
                      <p className="text-sm text-gray-600">Schedule across Instagram, TikTok, Twitter, and more</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-green-200">
                <h3 className="text-2xl font-bold mb-4">Advanced Analytics & Insights</h3>
                <p className="text-gray-600 mb-6">
                  Track performance and optimize your content strategy with AI-powered insights.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-3">
                    <BarChart3 className="w-8 h-8 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold">Performance Tracking</h4>
                      <p className="text-sm text-gray-600">Monitor engagement, reach, and conversion metrics</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <TrendingUp className="w-8 h-8 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-semibold">Growth Insights</h4>
                      <p className="text-sm text-gray-600">AI-powered recommendations to boost your growth</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Rest of the page... */}
    </div>
  )
}
