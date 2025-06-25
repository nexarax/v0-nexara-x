"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  Maximize,
  Sparkles,
  ImageIcon,
  Video,
  Mic,
  TrendingUp,
  Clock,
  CheckCircle,
  ArrowRight,
  Download,
  Share,
  Eye,
  Heart,
  MessageCircle,
} from "lucide-react"

interface DemoVideo {
  id: string
  title: string
  description: string
  duration: string
  thumbnail: string
  category: string
  views: string
  likes: string
}

export default function DemoPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentVideo, setCurrentVideo] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration] = useState(180) // 3 minutes

  const demoVideos: DemoVideo[] = [
    {
      id: "intro",
      title: "NexaraX Platform Overview",
      description: "Complete walkthrough of AI-powered content creation",
      duration: "3:24",
      thumbnail: "/placeholder.svg?height=200&width=350&text=Platform+Overview",
      category: "Overview",
      views: "12.5K",
      likes: "1.2K",
    },
    {
      id: "ai-generator",
      title: "AI Image & Video Generator",
      description: "Create stunning visuals from text prompts in seconds",
      duration: "2:45",
      thumbnail: "/placeholder.svg?height=200&width=350&text=AI+Generator",
      category: "Features",
      views: "8.9K",
      likes: "892",
    },
    {
      id: "voice-cloning",
      title: "AI Voice Cloning Demo",
      description: "Clone any voice and create professional narrations",
      duration: "1:58",
      thumbnail: "/placeholder.svg?height=200&width=350&text=Voice+Cloning",
      category: "Features",
      views: "15.2K",
      likes: "1.8K",
    },
    {
      id: "viral-templates",
      title: "Viral Templates Library",
      description: "1000+ ready-to-use templates for instant viral content",
      duration: "2:12",
      thumbnail: "/placeholder.svg?height=200&width=350&text=Viral+Templates",
      category: "Templates",
      views: "6.7K",
      likes: "654",
    },
    {
      id: "success-story",
      title: "Creator Success Story",
      description: "How Sarah made £50K in 3 months using NexaraX",
      duration: "4:33",
      thumbnail: "/placeholder.svg?height=200&width=350&text=Success+Story",
      category: "Success Stories",
      views: "23.1K",
      likes: "2.9K",
    },
    {
      id: "mobile-app",
      title: "Mobile App Walkthrough",
      description: "Create content on-the-go with our PWA mobile app",
      duration: "2:28",
      thumbnail: "/placeholder.svg?height=200&width=350&text=Mobile+App",
      category: "Mobile",
      views: "9.4K",
      likes: "743",
    },
  ]

  const features = [
    {
      icon: ImageIcon,
      title: "AI Image Generation",
      description: "Create 4K images from text prompts",
      demo: "Watch how to generate viral Instagram posts in 30 seconds",
    },
    {
      icon: Video,
      title: "AI Video Creation",
      description: "Generate HD videos with AI narration",
      demo: "See how to create TikTok videos that get millions of views",
    },
    {
      icon: Mic,
      title: "Voice Cloning",
      description: "Clone any voice in multiple languages",
      demo: "Learn how to create professional voiceovers instantly",
    },
    {
      icon: TrendingUp,
      title: "Viral Analytics",
      description: "Track performance and optimize content",
      demo: "Discover how to identify viral content patterns",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Content Creator",
      avatar: "/placeholder.svg?height=50&width=50&text=SJ",
      quote: "Made £50K in 3 months using NexaraX. The AI tools are incredible!",
      metrics: "2.3M followers gained",
    },
    {
      name: "Mike Chen",
      role: "Digital Marketer",
      avatar: "/placeholder.svg?height=50&width=50&text=MC",
      quote: "Our client engagement increased 400% after using NexaraX templates.",
      metrics: "400% engagement boost",
    },
    {
      name: "Emma Davis",
      role: "Small Business Owner",
      avatar: "/placeholder.svg?height=50&width=50&text=ED",
      quote: "Finally, professional content creation without hiring a team!",
      metrics: "£25K revenue increase",
    },
  ]

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleVideoSelect = (index: number) => {
    setCurrentVideo(index)
    setCurrentTime(0)
    setIsPlaying(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">NexaraX</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => (window.location.href = "/")}>
              Back to Home
            </Button>
            <Button onClick={() => (window.location.href = "/onboarding")}>Start Free Trial</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-purple-100 text-purple-800">🎬 Interactive Demo</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            See NexaraX in Action
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Watch how thousands of creators are making £1000s with AI-powered content creation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Video Player */}
          <div className="lg:col-span-2">
            <Card className="border-2 border-purple-200">
              <CardContent className="p-0">
                {/* Video Container */}
                <div className="relative bg-black rounded-t-lg aspect-video">
                  <img
                    src={demoVideos[currentVideo].thumbnail || "/placeholder.svg"}
                    alt={demoVideos[currentVideo].title}
                    className="w-full h-full object-cover rounded-t-lg"
                  />

                  {/* Play Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      size="lg"
                      className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
                      onClick={handlePlayPause}
                    >
                      {isPlaying ? (
                        <Pause className="w-8 h-8 text-white" />
                      ) : (
                        <Play className="w-8 h-8 text-white ml-1" />
                      )}
                    </Button>
                  </div>

                  {/* Video Controls */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="w-full bg-white/20 rounded-full h-1">
                        <div
                          className="bg-white h-1 rounded-full transition-all duration-300"
                          style={{ width: `${(currentTime / duration) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center space-x-3">
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                          <SkipBack className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-white hover:bg-white/20"
                          onClick={handlePlayPause}
                        >
                          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </Button>
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                          <SkipForward className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                          <Volume2 className="w-4 h-4" />
                        </Button>
                        <span className="text-sm">
                          {formatTime(currentTime)} / {demoVideos[currentVideo].duration}
                        </span>
                      </div>
                      <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                        <Maximize className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Video Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-bold mb-2">{demoVideos[currentVideo].title}</h2>
                      <p className="text-gray-600 mb-3">{demoVideos[currentVideo].description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{demoVideos[currentVideo].views} views</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{demoVideos[currentVideo].likes} likes</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{demoVideos[currentVideo].duration}</span>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-purple-100 text-purple-800">{demoVideos[currentVideo].category}</Badge>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Button
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      onClick={() => (window.location.href = "/onboarding")}
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Start Free Trial
                    </Button>
                    <Button variant="outline">
                      <Share className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Video Playlist */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Demo Videos</CardTitle>
                <CardDescription>Choose what you'd like to see</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {demoVideos.map((video, index) => (
                  <div
                    key={video.id}
                    className={`flex space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      currentVideo === index ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50"
                    }`}
                    onClick={() => handleVideoSelect(index)}
                  >
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-20 h-12 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{video.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">{video.duration}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-400">{video.views} views</span>
                        <Badge variant="outline" className="text-xs">
                          {video.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Start */}
            <Card className="border-2 border-green-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  Ready to Start?
                </CardTitle>
                <CardDescription>Join thousands of successful creators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    14-day free trial
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    No credit card required
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Cancel anytime
                  </div>
                </div>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => (window.location.href = "/onboarding")}
                >
                  Start Creating Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12">See Every Feature in Action</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="border-2 border-blue-100 hover:border-blue-200 transition-colors">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{feature.demo}</p>
                    <Button size="sm" variant="outline" className="w-full">
                      <Play className="w-4 h-4 mr-2" />
                      Watch Demo
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Success Stories */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12">Creator Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-2 border-green-100">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <blockquote className="text-gray-700 mb-4">"{testimonial.quote}"</blockquote>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-green-100 text-green-800">{testimonial.metrics}</Badge>
                    <Button size="sm" variant="outline">
                      <Play className="w-4 h-4 mr-2" />
                      Watch Story
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Create Viral Content?</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Join 50,000+ creators who are already making money with AI-powered content
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={() => (window.location.href = "/onboarding")}
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start Your Free Trial
                </Button>
                <Button size="lg" variant="outline" onClick={() => (window.location.href = "/contact")}>
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Talk to Sales
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-4">14-day free trial • No credit card required • Cancel anytime</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
