"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Crown, CheckCircle, Sparkles, ArrowRight, Mail, User, CreditCard, Shield, Clock, Star } from "lucide-react"
import Link from "next/link"

export default function ProTrialPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Redirect to dashboard with Pro trial activated
      window.location.href = "/dashboard?trial=pro&activated=true"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">NexaraX</span>
          </Link>
          <Link href="/">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    i <= step ? "bg-gradient-to-r from-orange-500 to-red-500 text-white" : "bg-white/10 text-gray-400"
                  }`}
                >
                  {i < step ? <CheckCircle className="w-5 h-5" /> : i}
                </div>
                {i < 3 && <div className={`w-12 h-0.5 mx-2 ${i < step ? "bg-orange-500" : "bg-white/10"}`} />}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Form */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <div className="flex items-center space-x-2 mb-4">
                <Crown className="w-6 h-6 text-orange-500" />
                <Badge className="bg-gradient-to-r from-orange-500 to-red-500">Pro Trial</Badge>
              </div>
              <CardTitle className="text-white text-2xl">
                {step === 1 && "Start Your Pro Trial"}
                {step === 2 && "Choose Your Platforms"}
                {step === 3 && "Activate Your Trial"}
              </CardTitle>
              <CardDescription className="text-gray-300">
                {step === 1 && "Get 14 days of Pro features completely free"}
                {step === 2 && "Select which social platforms you want to connect"}
                {step === 3 && "Your Pro trial is ready to activate!"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 && (
                  <>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name" className="text-white">
                          Full Name
                        </Label>
                        <div className="relative mt-2">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="name"
                            type="text"
                            required
                            className="pl-10 bg-white/5 border-white/10 text-white placeholder-gray-400"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-white">
                          Email Address
                        </Label>
                        <div className="relative mt-2">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            required
                            className="pl-10 bg-white/5 border-white/10 text-white placeholder-gray-400"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="company" className="text-white">
                          Company (Optional)
                        </Label>
                        <Input
                          id="company"
                          type="text"
                          className="mt-2 bg-white/5 border-white/10 text-white placeholder-gray-400"
                          placeholder="Your company name"
                          value={formData.company}
                          onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                        />
                      </div>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <p className="text-gray-300">Select up to 3 platforms for your Pro trial:</p>
                    {["Instagram", "TikTok", "Twitter/X"].map((platform) => (
                      <div
                        key={platform}
                        className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10"
                      >
                        <input type="checkbox" className="w-4 h-4 text-orange-500" defaultChecked />
                        <span className="text-white">{platform}</span>
                        <Badge variant="outline" className="ml-auto border-green-500/50 text-green-400">
                          Included
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-green-400 font-semibold">Trial Ready!</span>
                      </div>
                      <p className="text-gray-300 text-sm">
                        Your 14-day Pro trial includes 50 AI posts per day across 3 platforms with advanced analytics.
                      </p>
                    </div>
                    <div className="space-y-2 text-sm text-gray-300">
                      <div className="flex justify-between">
                        <span>Trial Duration:</span>
                        <span className="text-white">14 days</span>
                      </div>
                      <div className="flex justify-between">
                        <span>AI Posts per Month:</span>
                        <span className="text-white">200 (Pro tier)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Platforms:</span>
                        <span className="text-white">3 connected</span>
                      </div>
                      <div className="flex justify-between">
                        <span>After Trial:</span>
                        <span className="text-white">£29/month (Pro tier)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Or downgrade to:</span>
                        <span className="text-white">£9.99/month (Starter)</span>
                      </div>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold"
                  size="lg"
                >
                  {step === 1 && "Continue to Platforms"}
                  {step === 2 && "Review Trial Details"}
                  {step === 3 && "Activate Pro Trial"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                {step === 1 && (
                  <p className="text-xs text-center text-gray-400">
                    No credit card required • Cancel anytime during trial
                  </p>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Right Side - Benefits */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-b from-purple-500/10 to-blue-500/10 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Crown className="w-5 h-5 text-purple-500 mr-2" />
                  Pro Trial Benefits (£29/month value)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "200 AI-generated posts per month",
                    "Connect up to 3 social platforms",
                    "Advanced analytics & insights",
                    "Priority customer support",
                    "All premium templates",
                    "AI voice cloning included",
                    "Scheduled posting automation",
                    "Viral prediction scoring",
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Shield className="w-5 h-5 text-blue-400 mr-2" />
                  Trial Guarantee
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <Clock className="h-4 w-4 text-blue-400 mr-3" />
                  14 days completely free
                </div>
                <div className="flex items-center text-gray-300">
                  <CreditCard className="h-4 w-4 text-blue-400 mr-3" />
                  No credit card required
                </div>
                <div className="flex items-center text-gray-300">
                  <Star className="h-4 w-4 text-blue-400 mr-3" />
                  Cancel anytime during trial
                </div>
              </CardContent>
            </Card>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <p className="text-blue-200 text-sm">
                <strong>💡 Pro Tip:</strong> Most users see 3x more engagement within their first week of using Pro
                features!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
