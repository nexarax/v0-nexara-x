"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Sparkles, Check, ArrowRight, Zap, Crown, Users, Mail, AlertCircle } from 'lucide-react'
import { useRouter } from "next/navigation"

export default function GetStartedPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [selectedPlan, setSelectedPlan] = useState("pro")
  const [isValidating, setIsValidating] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  // Email validation function
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Handle form submission
  const handleStartCreating = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsValidating(true)

    // Validate email
    if (!email) {
      setError("Please enter your email address")
      setIsValidating(false)
      return
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      setIsValidating(false)
      return
    }

    try {
      // Store email in session storage for the create page
      sessionStorage.setItem("nexarax_user_email", email)
      sessionStorage.setItem("nexarax_selected_plan", selectedPlan)
      sessionStorage.setItem("nexarax_email_validated", "true")
      
      setSuccess(true)
      
      // Redirect after short delay
      setTimeout(() => {
        router.push("/create")
      }, 1000)
      
    } catch (error) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsValidating(false)
    }
  }

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
          <Button variant="ghost" onClick={() => router.push("/")}>
            ← Back to Home
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-blue-200">
              🚀 Start Your AI Content Journey
            </Badge>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Get Started with NexaraX
            </h1>

            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Join 50,000+ creators using AI to generate viral content. Enter your email to start creating in under 60 seconds.
            </p>
          </div>

          {/* Quick Start Form - Enhanced with Validation */}
          <Card className="mb-12 border-2 border-blue-200 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl flex items-center justify-center gap-2">
                <Mail className="w-6 h-6" />
                Quick Start - Free Trial
              </CardTitle>
              <CardDescription>Enter your email to start creating • No credit card required</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleStartCreating} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-lg py-3"
                    required
                    disabled={isValidating || success}
                  />
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert className="border-green-200 bg-green-50">
                    <Check className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      Email validated! Redirecting to create page...
                    </AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 text-lg"
                  disabled={isValidating || success}
                >
                  {isValidating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Validating Email...
                    </>
                  ) : success ? (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Email Validated!
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Start Creating Now - FREE
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </form>

              <p className="text-center text-sm text-gray-600">
                By signing up, you agree to our Terms of Service and Privacy Policy
              </p>
            </CardContent>
          </Card>

          {/* Plan Selection - Updated 4-Tier Structure */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Free Trial */}
            <Card
              className={`border-2 transition-all cursor-pointer ${selectedPlan === "free" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}
              onClick={() => setSelectedPlan("free")}
            >
              <CardHeader className="text-center">
                <CardTitle className="text-xl">Free Trial</CardTitle>
                <div className="text-3xl font-bold text-gray-600 my-2">£0.00</div>
                <CardDescription>14 days • Then £9.99/month</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />5 AI posts
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />1 social platform
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Basic templates
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Email notifications
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Starter Plan */}
            <Card
              className={`border-2 transition-all cursor-pointer ${selectedPlan === "starter" ? "border-blue-500 bg-blue-50" : "border-blue-200 hover:border-blue-300"}`}
              onClick={() => setSelectedPlan("starter")}
            >
              <CardHeader className="text-center">
                <CardTitle className="text-xl">Starter</CardTitle>
                <div className="text-3xl font-bold text-blue-600 my-2">£9.99</div>
                <CardDescription>per month</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    50 AI posts/month
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />2 social platforms
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Premium templates
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Basic analytics
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Email support
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Pro Plan - Most Popular */}
            <Card
              className={`border-2 transition-all cursor-pointer relative ${selectedPlan === "pro" ? "border-purple-500 bg-purple-50" : "border-purple-200 hover:border-purple-300"}`}
              onClick={() => setSelectedPlan("pro")}
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-purple-500 text-white px-4 py-1">
                  <Crown className="w-4 h-4 mr-1" />
                  Most Popular
                </Badge>
              </div>
              <CardHeader className="text-center pt-8">
                <CardTitle className="text-xl">Pro</CardTitle>
                <div className="text-3xl font-bold text-purple-600 my-2">£29.99</div>
                <CardDescription>per month</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    200 AI posts/month
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />3 social platforms
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    All templates
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    AI voice cloning
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Advanced analytics
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Priority support
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card
              className={`border-2 transition-all cursor-pointer ${selectedPlan === "enterprise" ? "border-orange-500 bg-orange-50" : "border-orange-200 hover:border-orange-300"}`}
              onClick={() => setSelectedPlan("enterprise")}
            >
              <CardHeader className="text-center">
                <CardTitle className="text-xl">Enterprise</CardTitle>
                <div className="text-3xl font-bold text-orange-600 my-2">£299.00</div>
                <CardDescription>per month</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Unlimited posts*
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    All platforms
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Custom templates
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    White-label
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    API access
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    Dedicated support
                  </li>
                </ul>
                <p className="text-xs text-gray-500 mt-2">*Fair usage policy</p>
              </CardContent>
            </Card>
          </div>

          {/* Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center border-2 border-blue-200 bg-white/80">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <CardTitle>AI Content Generation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Create viral images, videos, and posts with advanced AI technology</p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-purple-200 bg-white/80">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <CardTitle>Auto-Posting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Schedule and auto-post to multiple social platforms 24/7</p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-green-200 bg-white/80">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle>Analytics & Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Track performance and optimize content for maximum engagement</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
