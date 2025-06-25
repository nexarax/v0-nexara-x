"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, CheckCircle, Shield, User, Mail, Phone, Building, Crown, Zap, ArrowRight } from "lucide-react"

export default function SignupPage() {
  const searchParams = useSearchParams()
  const [selectedPlan, setSelectedPlan] = useState("pro")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
  })

  useEffect(() => {
    const plan = searchParams.get("plan")
    if (plan) {
      setSelectedPlan(plan)
    }
  }, [searchParams])

  const plans = {
    starter: {
      name: "Creative Starter",
      price: "£12",
      period: "/month",
      description: "Perfect for individual creators",
      features: [
        "150 AI generations/month",
        "HD exports (1080p)",
        "Commercial license",
        "Email support",
        "Basic templates",
      ],
      color: "border-gray-200",
    },
    pro: {
      name: "Creative Pro",
      price: "£32",
      period: "/month",
      description: "For serious content creators",
      features: [
        "Unlimited generations",
        "4K exports (ultra-HD)",
        "Voice cloning & video",
        "Priority support (2hr response)",
        "Premium templates",
        "Viral analytics",
      ],
      color: "border-blue-500",
      recommended: true,
    },
    studio: {
      name: "Creative Studio",
      price: "£89",
      period: "/month",
      description: "For teams and agencies",
      features: [
        "Everything in Pro",
        "Team collaboration (10 seats)",
        "White-label exports",
        "Custom AI training",
        "API access",
        "Dedicated support",
      ],
      color: "border-purple-200",
    },
  }

  const currentPlan = plans[selectedPlan as keyof typeof plans]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Redirect to onboarding with plan
    window.location.href = `/onboarding?plan=${selectedPlan}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
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
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-100 text-green-800">🎉 14-Day Free Trial</Badge>
            <h1 className="text-4xl font-bold mb-4">Start Your Creative Journey</h1>
            <p className="text-xl text-gray-600">Join thousands of creators making money with AI-powered content</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Signup Form */}
            <Card className="border-2 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-6 w-6 text-blue-600 mr-2" />
                  Create Your Account
                </CardTitle>
                <CardDescription>Get started with your 14-day free trial - no credit card required</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        required
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        type="email"
                        required
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Company (Optional)</label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your company name"
                        value={formData.company}
                        onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        type="tel"
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+44 7XXX XXXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      size="lg"
                    >
                      <Sparkles className="w-5 h-5 mr-2" />
                      Start Free Trial
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>

                  <div className="text-center">
                    <p className="text-xs text-gray-500">
                      By signing up, you agree to our Terms of Service and Privacy Policy
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Plan Summary */}
            <div className="space-y-6">
              <Card
                className={`border-2 ${currentPlan.color} ${currentPlan.recommended ? "ring-2 ring-blue-200" : ""}`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      {selectedPlan === "pro" && <Crown className="w-5 h-5 text-blue-600 mr-2" />}
                      {currentPlan.name}
                    </CardTitle>
                    {currentPlan.recommended && <Badge className="bg-blue-600 text-white">Most Popular</Badge>}
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">{currentPlan.price}</span>
                    <span className="text-gray-500 ml-1">{currentPlan.period}</span>
                  </div>
                  <CardDescription>{currentPlan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {currentPlan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 pt-6 border-t">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span>Plan:</span>
                      <span className="font-semibold">{currentPlan.name}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span>Free Trial:</span>
                      <span className="font-semibold text-green-600">14 Days</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mb-4">
                      <span>Monthly Price:</span>
                      <span className="font-semibold">{currentPlan.price}/month</span>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="flex items-center text-sm text-green-800">
                        <Shield className="w-4 h-4 mr-2" />
                        <span className="font-medium">No payment required for trial</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Button variant="outline" className="w-full" onClick={() => (window.location.href = "/#pricing")}>
                      Change Plan
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Trust Indicators */}
              <Card className="border-2 border-green-200">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <Shield className="w-5 h-5 text-green-600 mr-2" />
                    Why Choose NexaraX?
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                      <span>50,000+ happy creators worldwide</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                      <span>£2.5M+ earned by our users</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                      <span>4.9/5 star rating from 10,000+ reviews</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                      <span>Bank-level security & privacy</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                      <span>24/7 customer support</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Money Back Guarantee */}
              <Card className="border-2 border-blue-200 bg-blue-50">
                <CardContent className="p-6 text-center">
                  <Zap className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">30-Day Money-Back Guarantee</h3>
                  <p className="text-sm text-gray-600">
                    Not satisfied? Get a full refund within 30 days, no questions asked.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
