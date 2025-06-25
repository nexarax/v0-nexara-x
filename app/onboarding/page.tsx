"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import {
  Sparkles,
  Instagram,
  Twitter,
  Youtube,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  User,
  Mail,
  Building,
  Shield,
  Zap,
  Crown,
  Rocket,
  Target,
  TrendingUp,
  Users,
  Calendar,
  Palette,
  Building2,
} from "lucide-react"

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedPlan, setSelectedPlan] = useState("pro")
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    platforms: [] as string[],
    goals: [] as string[],
  })

  const steps = [
    {
      id: "welcome",
      title: "Welcome to NexaraX",
      description: "Let's get you set up with AI-powered content creation",
      completed: false,
    },
    {
      id: "account",
      title: "Create Your Account",
      description: "Basic information to personalize your experience",
      completed: false,
    },
    {
      id: "platforms",
      title: "Connect Platforms",
      description: "Choose which social media platforms to integrate",
      completed: false,
    },
    {
      id: "goals",
      title: "Set Your Goals",
      description: "Tell us what you want to achieve",
      completed: false,
    },
    {
      id: "plan",
      title: "Choose Your Plan",
      description: "Select the perfect plan for your needs",
      completed: false,
    },
    {
      id: "complete",
      title: "You're All Set!",
      description: "Welcome to the future of content creation",
      completed: false,
    },
  ]

  const platforms = [
    { id: "instagram", name: "Instagram", icon: Instagram, color: "text-pink-600" },
    { id: "twitter", name: "Twitter/X", icon: Twitter, color: "text-blue-500" },
    { id: "youtube", name: "YouTube", icon: Youtube, color: "text-red-600" },
  ]

  const goals = [
    { id: "viral", name: "Go Viral", icon: TrendingUp, description: "Create content that gets millions of views" },
    { id: "brand", name: "Build Brand", icon: Building, description: "Establish strong brand presence" },
    { id: "sales", name: "Drive Sales", icon: Target, description: "Convert followers into customers" },
    { id: "audience", name: "Grow Audience", icon: Users, description: "Increase followers and engagement" },
  ]

  const plans = [
    {
      id: "starter",
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
      badge: "Popular",
      color: "border-gray-200",
    },
    {
      id: "pro",
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
      badge: "Most Popular",
      color: "border-blue-500",
      recommended: true,
    },
    {
      id: "studio",
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
      badge: "Enterprise",
      color: "border-purple-200",
    },
  ]

  const userTypes = [
    {
      id: "creator",
      title: "Content Creator",
      description: "Individual creators, influencers, and social media enthusiasts",
      icon: Users,
      features: ["AI content generation", "Auto-posting", "Viral templates", "Analytics dashboard"],
    },
    {
      id: "artist",
      title: "Artist & Designer",
      description: "Digital artists, graphic designers, and creative professionals",
      icon: Palette,
      features: ["AI art generation", "Style templates", "High-res exports", "Creative tools"],
    },
    {
      id: "business",
      title: "Business & Agency",
      description: "Companies, marketing agencies, and professional teams",
      icon: Building2,
      features: ["Team collaboration", "Brand management", "Advanced analytics", "API access"],
    },
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handlePlatformToggle = (platformId: string) => {
    setFormData((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platformId)
        ? prev.platforms.filter((p) => p !== platformId)
        : [...prev.platforms, platformId],
    }))
  }

  const handleGoalToggle = (goalId: string) => {
    setFormData((prev) => ({
      ...prev,
      goals: prev.goals.includes(goalId) ? prev.goals.filter((g) => g !== goalId) : [...prev.goals, goalId],
    }))
  }

  const handleComplete = () => {
    router.push("/dashboard")
  }

  const handleContinue = () => {
    if (selectedType) {
      router.push("/dashboard")
    }
  }

  const renderStep = () => {
    switch (steps[currentStep].id) {
      case "welcome":
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Welcome to NexaraX!</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                You're about to join thousands of creators making £1000s with AI-powered content creation. Let's get you
                set up in just a few minutes.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <Rocket className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Quick Setup</h3>
                <p className="text-sm text-gray-600">Get started in under 5 minutes</p>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <Shield className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">14-Day Free Trial</h3>
                <p className="text-sm text-gray-600">No commitment, cancel anytime</p>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-lg">
                <Zap className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Instant Results</h3>
                <p className="text-sm text-gray-600">Create viral content immediately</p>
              </div>
            </div>
          </div>
        )

      case "account":
        return (
          <div className="max-w-md mx-auto space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Create Your Account</h2>
              <p className="text-gray-600">Let's personalize your NexaraX experience</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
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
            </div>
          </div>
        )

      case "platforms":
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Connect Your Platforms</h2>
              <p className="text-gray-600">Choose which social media platforms you want to create content for</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {platforms.map((platform) => {
                const Icon = platform.icon
                const isSelected = formData.platforms.includes(platform.id)
                return (
                  <div
                    key={platform.id}
                    className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                      isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handlePlatformToggle(platform.id)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`${platform.color}`}>
                        <Icon />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{platform.name}</h3>
                        <p className="text-sm text-gray-600">Create viral content for {platform.name}</p>
                      </div>
                      {isSelected && <CheckCircle className="w-6 h-6 text-blue-500" />}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )

      case "goals":
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">What's Your Goal?</h2>
              <p className="text-gray-600">Tell us what you want to achieve so we can personalize your experience</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {goals.map((goal) => {
                const Icon = goal.icon
                const isSelected = formData.goals.includes(goal.id)
                return (
                  <div
                    key={goal.id}
                    className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                      isSelected ? "border-purple-500 bg-purple-50" : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleGoalToggle(goal.id)}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Icon className="w-8 h-8 text-purple-600" />
                        {isSelected && <CheckCircle className="w-6 h-6 text-purple-500" />}
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{goal.name}</h3>
                        <p className="text-sm text-gray-600">{goal.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )

      case "plan":
        return (
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Choose Your Plan</h2>
              <p className="text-gray-600">Start with a 14-day free trial, cancel anytime</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <Card
                  key={plan.id}
                  className={`border-2 cursor-pointer transition-all ${
                    selectedPlan === plan.id ? "border-blue-500 ring-2 ring-blue-200" : plan.color
                  } ${plan.recommended ? "relative" : ""}`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.recommended && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-blue-600 text-white">{plan.badge}</Badge>
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{plan.name}</CardTitle>
                      {plan.id === "pro" && <Crown className="w-5 h-5 text-blue-600" />}
                    </div>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-gray-500 ml-1">{plan.period}</span>
                    </div>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case "complete":
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">🎉 Welcome to NexaraX!</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Your account is ready! You now have access to AI-powered content creation tools that will help you go
                viral.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <Sparkles className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">AI Content Generator</h3>
                <p className="text-sm text-gray-600">Create stunning visuals and videos</p>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-lg">
                <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Content Calendar</h3>
                <p className="text-sm text-gray-600">Plan and schedule your posts</p>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Viral Analytics</h3>
                <p className="text-sm text-gray-600">Track performance and optimize</p>
              </div>
            </div>
            <div className="space-y-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={handleComplete}
              >
                <Rocket className="w-5 h-5 mr-2" />
                Go to Dashboard
              </Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">NexaraX</span>
          </div>
          <Button variant="ghost" onClick={() => router.push("/")} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index <= currentStep ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {index < currentStep ? <CheckCircle className="w-4 h-4" /> : index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-1 mx-2 ${index < currentStep ? "bg-blue-600" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">{renderStep()}</div>
      </main>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>
            Back
          </Button>
          <div className="text-sm text-gray-600">
            {currentStep + 1} of {steps.length}
          </div>
          <Button
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {currentStep === steps.length - 1 ? "Complete" : "Next"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
