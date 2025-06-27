"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Zap, Mail, ArrowRight, ImageIcon, Video, Users, Clock, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function HoldingPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleNotifyMe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      // Here you would typically send the email to your backend
      console.log("Email subscription:", email)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">NexaraX</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Button variant="ghost" onClick={() => router.push("/contact")}>
              Contact
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-6xl">
          <Badge className="mb-6 bg-blue-100 text-blue-800 border-blue-200 px-4 py-2">
            🚀 AI-Powered Social Media Revolution
          </Badge>

          <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Create Viral Content
            <br />
            with AI Magic
          </h1>

          <p className="text-xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Transform your social media presence with AI-powered content creation. Generate stunning images, videos, and
            posts that captivate your audience and drive engagement.
          </p>

          {/* Coming Soon Notice */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-blue-200 mb-12 max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Clock className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Launching Very Soon!</h2>
            </div>
            <p className="text-gray-600 mb-6">
              We're putting the finishing touches on NexaraX. Be the first to know when we go live!
            </p>

            {!isSubscribed ? (
              <form onSubmit={handleNotifyMe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Notify Me
                </Button>
              </form>
            ) : (
              <div className="flex items-center justify-center text-green-600">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span className="font-medium">Thanks! We'll notify you when we launch.</span>
              </div>
            )}
          </div>

          <Button
            size="lg"
            variant="outline"
            className="border-2 border-blue-300 hover:bg-blue-50 px-8 py-4 text-lg bg-transparent"
            onClick={() => router.push("/contact")}
          >
            <Mail className="w-5 h-5 mr-2" />
            Get in Touch
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20 px-4 bg-white/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Everything You Need to Go Viral</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful AI tools designed to help creators, businesses, and influencers dominate social media.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* AI Image Generation */}
            <Card className="border-2 border-gray-100 hover:border-blue-200 transition-colors p-6 bg-white/80 backdrop-blur-sm">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <ImageIcon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">AI Image Generation</h3>
                <p className="text-gray-600">Create stunning visuals with advanced AI that understands your brand</p>
              </div>
            </Card>

            {/* AI Video Creation */}
            <Card className="border-2 border-gray-100 hover:border-purple-200 transition-colors p-6 bg-white/80 backdrop-blur-sm">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Video className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">AI Video Creation</h3>
                <p className="text-gray-600">Generate engaging videos that capture attention and drive engagement</p>
              </div>
            </Card>

            {/* Multi-Platform Publishing */}
            <Card className="border-2 border-gray-100 hover:border-green-200 transition-colors p-6 bg-white/80 backdrop-blur-sm">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Multi-Platform Publishing</h3>
                <p className="text-gray-600">Post to all your social platforms with one click and optimal formatting</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Ready to Transform Your Social Media?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join our waitlist and be among the first to experience the future of AI-powered content creation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4"
              onClick={() => document.querySelector('input[type="email"]')?.focus()}
            >
              <Zap className="w-5 h-5 mr-2" />
              Join Waitlist
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-gray-300 hover:bg-gray-50 px-8 py-4 bg-transparent"
              onClick={() => router.push("/contact")}
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">NexaraX</span>
            </div>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Transform your social media presence with AI-powered content creation.
            </p>
            <div className="flex justify-center space-x-8 mb-8">
              <Button variant="link" className="text-gray-400 hover:text-white p-0">
                Privacy
              </Button>
              <Button variant="link" className="text-gray-400 hover:text-white p-0">
                Terms
              </Button>
              <Button
                variant="link"
                className="text-gray-400 hover:text-white p-0"
                onClick={() => router.push("/contact")}
              >
                Contact
              </Button>
            </div>
            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-500">&copy; 2025 NexaraX. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
