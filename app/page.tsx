"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { submitWaitlistForm } from "./actions"
import { Brain, Zap, Target, Users, ArrowRight, CheckCircle, Star } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    try {
      const result = await submitWaitlistForm(formData)
      if (result.success) {
        toast({
          title: "Success!",
          description: result.message,
        })
        // Reset form
        const form = document.getElementById("waitlist-form") as HTMLFormElement
        form?.reset()
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              NexaraX
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/contact">
              <Button variant="ghost">Contact</Button>
            </Link>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Coming Soon
            </Badge>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">🚀 Revolutionary AI Platform</Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            The Future of Social Media is Here
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            NexaraX combines cutting-edge AI with social media management to create content, predict trends, and engage
            audiences automatically. Join the revolution.
          </p>

          {/* Waitlist Form */}
          <Card className="max-w-md mx-auto mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl">Join the Waitlist</CardTitle>
              <CardDescription>Be the first to experience AI-powered social media management</CardDescription>
            </CardHeader>
            <CardContent>
              <form id="waitlist-form" action={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" name="email" type="email" placeholder="your@email.com" required className="mt-1" />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Joining..."
                  ) : (
                    <>
                      Join Waitlist <ArrowRight className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              Free to join
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              Early access
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              Special pricing
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="text-center p-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Brain className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">AI Content Creation</h3>
            <p className="text-sm text-gray-600">Generate engaging posts, captions, and hashtags automatically</p>
          </Card>

          <Card className="text-center p-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">Predictive Analytics</h3>
            <p className="text-sm text-gray-600">Forecast trends and optimize posting times for maximum reach</p>
          </Card>

          <Card className="text-center p-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">Smart Automation</h3>
            <p className="text-sm text-gray-600">Automate responses, scheduling, and engagement strategies</p>
          </Card>

          <Card className="text-center p-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-pink-600" />
            </div>
            <h3 className="font-semibold mb-2">Audience Insights</h3>
            <p className="text-sm text-gray-600">Deep understanding of your audience behavior and preferences</p>
          </Card>
        </div>

        {/* Social Proof */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-gray-600 mb-2">Trusted by forward-thinking creators and businesses</p>
          <p className="text-sm text-gray-500">Join 1,000+ people already on the waitlist</p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                NexaraX
              </span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <Link href="/privacy" className="hover:text-blue-600 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-blue-600 transition-colors">
                Terms of Service
              </Link>
              <Link href="/contact" className="hover:text-blue-600 transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
          <div className="text-center mt-4 pt-4 border-t text-sm text-gray-500">
            © 2024 NexaraX. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
