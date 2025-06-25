"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Users, BarChart3, Palette, Check, Star } from 'lucide-react'
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                NexaraX
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
                Pricing
              </a>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                Contact
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/auth/signin">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/get-started">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
            🚀 AI-Powered Social Media Revolution
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Create Viral Content
            <br />
            with AI Magic
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transform your social media presence with AI-powered content creation. Generate stunning images, videos, and
            posts that captivate your audience and drive engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-started">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3">
                <Zap className="w-5 h-5 mr-2" />
                Start Creating Now - FREE
              </Button>
            </Link>
            <a href="#features">
              <Button size="lg" variant="outline" className="px-8 py-3">
                <BarChart3 className="w-5 h-5 mr-2" />
                See Features
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Go Viral</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful AI tools designed to help creators, businesses, and influencers dominate social media.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <Palette className="w-10 h-10 text-blue-600 mb-2" />
                <CardTitle>AI Image Generation</CardTitle>
                <CardDescription>Create stunning visuals with advanced AI that understands your brand</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-purple-200 transition-colors">
              <CardHeader>
                <Zap className="w-10 h-10 text-purple-600 mb-2" />
                <CardTitle>AI Video Creation</CardTitle>
                <CardDescription>Generate engaging videos that capture attention and drive engagement</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-green-200 transition-colors">
              <CardHeader>
                <Users className="w-10 h-10 text-green-600 mb-2" />
                <CardTitle>Multi-Platform Publishing</CardTitle>
                <CardDescription>
                  Post to all your social platforms with one click and optimal formatting
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">💰 Choose Your Plan</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Pricing That Scales With You
            </h2>
            <p className="text-xl text-gray-600">
              Start free and upgrade as you grow. All plans include our core AI features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Free Trial */}
            <Card className="border-2 border-gray-200 hover:border-blue-300 transition-colors">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl">Free Trial</CardTitle>
                <div className="text-4xl font-bold text-gray-900 mb-2">£0.00</div>
                <CardDescription>14 days • Then £9.99/month</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-sm">5 AI posts</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-sm">1 social platform</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-sm">Basic templates</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-sm">Email notifications</span>
                  </li>
                </ul>
                <Button className="w-full mt-6" variant="outline">
                  Start Free Trial
                </Button>
              </CardContent>
            </Card>

            {/* Starter Plan */}
            <Card className="border-2 border-blue-200 hover:border-blue-400 transition-colors">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl">Starter</CardTitle>
                <div className="text-4xl font-bold text-blue-600 mb-2">£9.99</div>
                <CardDescription>per month</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-sm">50 AI posts/month</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-sm">2 social platforms</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-sm">Premium templates</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-sm">Basic analytics</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-sm">Email support</span>
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white">Choose Starter</Button>
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
                <div className="text-4xl font-bold text-purple-600 mb-2">£29.99</div>
                <CardDescription>per month</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-sm">200 AI posts/month</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-sm">3 social platforms</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-sm">All templates</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-sm">AI Voice cloning</span>
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
                <Button className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                  Choose Pro
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="border-2 border-gray-300 hover:border-gray-500 transition-colors">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl">Enterprise</CardTitle>
                <div className="text-4xl font-bold text-gray-900 mb-2">£299.00</div>
                <CardDescription>per month</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-sm">Unlimited posts*</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-sm">All platforms</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-sm">Custom templates</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-sm">White-label</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-sm">API access</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-sm">Dedicated support</span>
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-gray-900 hover:bg-gray-800 text-white">Contact Sales</Button>
                <p className="text-xs text-gray-500 text-center">*Fair usage policy applies</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Ready to Go Viral?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of creators who are already using NexaraX to transform their social media presence.
          </p>
          <Link href="/get-started">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-6 text-xl">
              <Zap className="w-6 h-6 mr-3" />
              Start Your Free Trial Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">NexaraX</span>
          </div>
          <p className="text-gray-400 mb-4">Transform your social media presence with AI-powered content creation.</p>
          <div className="flex justify-center space-x-6">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
              Contact
            </Link>
          </div>
          <p className="text-gray-500 text-sm mt-8">© 2024 NexaraX. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
