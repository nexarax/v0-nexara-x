"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Zap, BarChart3, Bot, Users, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { sendWaitlistEmail } from "@/app/actions/email"

export default function HomePage() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleWaitlistSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("email", email)
      formData.append("source", "homepage")

      const result = await sendWaitlistEmail(formData)

      if (result.success) {
        toast({
          title: "Welcome to the waitlist! 🎉",
          description: "You'll be the first to know when NexaraX launches.",
        })
        setEmail("")
      } else {
        toast({
          title: "Oops! Something went wrong",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to join waitlist. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="border-b border-white/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">NexaraX</span>
          </div>
          <nav className="flex items-center space-x-6">
            <Link href="/contact" className="text-slate-600 hover:text-slate-900 transition-colors">
              Contact
            </Link>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Coming Soon
            </Badge>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-blue-100 text-blue-800 border-blue-200">🚀 Revolutionary AI Platform</Badge>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            The Future of{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Social Media
            </span>{" "}
            is Here
          </h1>

          <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            NexaraX combines cutting-edge AI with social media management to create content, predict trends, and engage
            audiences automatically. Join the revolution.
          </p>

          {/* Waitlist Signup */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 max-w-md mx-auto mb-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Join the Waitlist</h3>
            <p className="text-slate-600 mb-6">Be the first to experience AI-powered social media management</p>

            <form onSubmit={handleWaitlistSignup} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Joining..." : "Join Waitlist"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-slate-600">
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-1" />
                Free to join
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-1" />
                Early access
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-1" />
                Special pricing
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Bot,
                title: "AI Content Creation",
                description: "Generate engaging posts, captions, and hashtags automatically",
                color: "text-blue-600",
                bgColor: "bg-blue-100",
              },
              {
                icon: BarChart3,
                title: "Predictive Analytics",
                description: "Forecast trends and optimize posting times for maximum reach",
                color: "text-purple-600",
                bgColor: "bg-purple-100",
              },
              {
                icon: Zap,
                title: "Smart Automation",
                description: "Automate responses, scheduling, and engagement strategies",
                color: "text-green-600",
                bgColor: "bg-green-100",
              },
              {
                icon: Users,
                title: "Audience Insights",
                description: "Deep understanding of your audience behavior and preferences",
                color: "text-pink-600",
                bgColor: "bg-pink-100",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                  >
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-6 h-6 text-yellow-400 fill-current">
                ⭐
              </div>
            ))}
          </div>
          <p className="text-lg font-medium text-slate-900 mb-2">Trusted by forward-thinking creators and businesses</p>
          <p className="text-slate-600">Join 1,000+ people already on the waitlist</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">NexaraX</span>
          </div>

          <p className="text-slate-400 mb-8">Transform your social media presence with AI-powered content creation.</p>

          <div className="flex justify-center space-x-6 text-sm text-slate-400 mb-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact Us
            </Link>
          </div>

          <p className="text-slate-500">© 2025 NexaraX. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
