// VERSION 228 RESTORED - Simpler layout without complex tabs
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Rocket, Star, Check, ArrowRight, Play } from "lucide-react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

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
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-gradient-to-r from-green-100 to-blue-100 text-green-800 border-green-200">
              💎 Choose Your Plan
            </Badge>
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Pricing That Scales With You
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Start free and upgrade as you grow. All plans include our core AI features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Free Plan */}
            <Card className="border-2 border-gray-200 hover:border-blue-300 transition-colors">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl">Free</CardTitle>
                <div className="text-4xl font-bold text-gray-900 mb-2">£0</div>
                <CardDescription>Perfect for getting started</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-sm">5 AI images/month</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-sm">Basic templates</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-sm">1 social platform</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-sm">Basic analytics</span>
                  </li>
                </ul>
                <Button className="w-full mt-6" variant="outline" onClick={() => router.push("/create")}>
                  Start Free
                </Button>
              </CardContent>
            </Card>

            {/* Starter Plan */}
            <Card className="border-2 border-blue-200 hover:border-blue-400 transition-colors">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl">Starter</CardTitle>
                <div className="text-4xl font-bold text-blue-600 mb-2">£9</div>
                <CardDescription>For growing creators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-sm">50 AI images/month</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-sm">10 AI videos/month</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-sm">3 social platforms</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-sm">Advanced templates</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-sm">Scheduling tools</span>
                  </li>
                </ul>
                <Button
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => router.push("/create")}
                >
                  Choose Starter
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="border-2 border-purple-300 hover:border-purple-500 transition-colors relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                  <Star className="w-4 h-4 mr-1" />
                  Most Popular
                </Badge>
              </div>
              <CardHeader className="text-center pb-2 pt-8">
                <CardTitle className="text-2xl">Pro</CardTitle>
                <div className="text-4xl font-bold text-purple-600 mb-2">£29</div>
                <CardDescription>For serious creators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-sm">200 AI images/month</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-sm">50 AI videos/month</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-sm">Unlimited platforms</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-sm">AI voice generation</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-sm">Advanced analytics</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-sm">Priority support</span>
                  </li>
                </ul>
                <Button
                  className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  onClick={() => router.push("/create")}
                >
                  Choose Pro
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="border-2 border-gray-300 hover:border-gray-500 transition-colors">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl">Enterprise</CardTitle>
                <div className="text-4xl font-bold text-gray-900 mb-2">£99</div>
                <CardDescription>For teams & agencies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-sm">Unlimited AI content</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-sm">Team collaboration</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-sm">White-label options</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-sm">Custom integrations</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-sm">Dedicated support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-sm">SLA guarantee</span>
                  </li>
                </ul>
                <Button
                  className="w-full mt-6 bg-gray-900 hover:bg-gray-800 text-white"
                  onClick={() => router.push("/create")}
                >
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Ready to Go Viral?
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Join thousands of creators who are already using NexaraX to transform their social media presence.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-6 text-xl"
            onClick={() => router.push("/create")}
          >
            <Rocket className="w-6 h-6 mr-3" />
            Get Started Free Today
            <ArrowRight className="w-6 h-6 ml-3" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">NexaraX</span>
              </div>
              <p className="text-gray-400">AI-powered social media marketing that actually works.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Button variant="link" className="p-0 h-auto text-gray-400" onClick={() => router.push("/features")}>
                    Features
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="p-0 h-auto text-gray-400" onClick={() => router.push("/pricing")}>
                    Pricing
                  </Button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Button variant="link" className="p-0 h-auto text-gray-400">
                    About
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="p-0 h-auto text-gray-400" onClick={() => router.push("/contact")}>
                    Contact
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="p-0 h-auto text-gray-400" onClick={() => router.push("/privacy")}>
                    Privacy
                  </Button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Button variant="link" className="p-0 h-auto text-gray-400">
                    Help Center
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="p-0 h-auto text-gray-400">
                    Documentation
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="p-0 h-auto text-gray-400" onClick={() => router.push("/status")}>
                    Status
                  </Button>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 NexaraX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
