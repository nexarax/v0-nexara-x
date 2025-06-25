"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, ExternalLink, BarChart3, Target, TrendingUp } from "lucide-react"
import { initGA, trackNexaraXEvent, setupConversionGoals } from "@/lib/google-analytics"

export default function AnalyticsSetup() {
  const [setupSteps, setSetupSteps] = useState([
    { id: 1, title: "Create Google Analytics 4 Account", completed: false, url: "https://analytics.google.com" },
    { id: 2, title: "Add NexaraX Property", completed: false, description: "Property Name: NexaraX AI Platform" },
    { id: 3, title: "Install Tracking Code", completed: false, description: "Add GA4 tracking to all pages" },
    { id: 4, title: "Set Up Custom Events", completed: false, description: "Track NexaraX-specific actions" },
    { id: 5, title: "Configure Conversion Goals", completed: false, description: "Set up revenue tracking" },
    { id: 6, title: "Test Event Tracking", completed: false, description: "Verify events are firing" },
  ])

  const [isGAInitialized, setIsGAInitialized] = useState(false)

  const toggleStep = (stepId: number) => {
    setSetupSteps((steps) => steps.map((step) => (step.id === stepId ? { ...step, completed: !step.completed } : step)))
  }

  const initializeGA = () => {
    initGA()
    setupConversionGoals()
    setIsGAInitialized(true)

    // Test event
    trackNexaraXEvent.signup("free", "test")
  }

  const testEvents = () => {
    // Test all NexaraX events
    trackNexaraXEvent.signup("starter", "email")
    trackNexaraXEvent.firstPost("instagram", "image")
    trackNexaraXEvent.connectPlatform("tiktok", "business")
    trackNexaraXEvent.generateContent("video", "tiktok", true)
    trackNexaraXEvent.milestone("followers", 1000)

    alert("✅ Test events sent to Google Analytics!")
  }

  const completedSteps = setupSteps.filter((step) => step.completed).length
  const progressPercentage = (completedSteps / setupSteps.length) * 100

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">🚀 Google Analytics 4 Setup</h1>
        <p className="text-gray-600">Set up comprehensive tracking for NexaraX AI platform</p>
        <div className="mt-4">
          <div className="bg-blue-100 rounded-full h-3 w-full max-w-md mx-auto">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {completedSteps} of {setupSteps.length} steps completed
          </p>
        </div>
      </div>

      {/* Setup Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Setup Checklist
          </CardTitle>
          <CardDescription>Follow these steps to set up Google Analytics 4 for NexaraX</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {setupSteps.map((step) => (
            <div key={step.id} className="flex items-start gap-3 p-3 border rounded-lg">
              <button onClick={() => toggleStep(step.id)} className="mt-1">
                {step.completed ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <Circle className="h-5 w-5 text-gray-400" />
                )}
              </button>
              <div className="flex-1">
                <h3 className={`font-medium ${step.completed ? "text-green-700 line-through" : ""}`}>{step.title}</h3>
                {step.description && <p className="text-sm text-gray-600 mt-1">{step.description}</p>}
                {step.url && (
                  <a
                    href={step.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-600 text-sm mt-2 hover:underline"
                  >
                    Open Google Analytics <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Custom Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            NexaraX Custom Events
          </CardTitle>
          <CardDescription>Track these specific actions for NexaraX users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { event: "nexarax_signup", description: "User registration", value: "£0-29" },
              { event: "nexarax_first_post", description: "First AI-generated post", value: "£10" },
              { event: "nexarax_viral_post", description: "Post goes viral (10K+ views)", value: "£50-500" },
              { event: "nexarax_upgrade", description: "Plan upgrade", value: "£9.99-29" },
              { event: "nexarax_milestone", description: "Follower milestones", value: "£50-200" },
              { event: "nexarax_platform_connect", description: "Social platform connection", value: "£5" },
            ].map((event) => (
              <div key={event.event} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">{event.event}</code>
                  <Badge variant="secondary">{event.value}</Badge>
                </div>
                <p className="text-sm text-gray-600">{event.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Conversion Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Conversion Goals
          </CardTitle>
          <CardDescription>Revenue tracking for NexaraX business metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { goal: "Free Trial Signup", value: "£0", description: "Lead generation" },
              { goal: "First Social Connection", value: "£5", description: "User activation" },
              { goal: "First AI Post Generated", value: "£10", description: "Feature adoption" },
              { goal: "Starter Plan Upgrade", value: "£9.99", description: "Paid conversion" },
              { goal: "Pro Plan Upgrade", value: "£29", description: "Premium conversion" },
              { goal: "1K Followers Milestone", value: "£50", description: "User success" },
              { goal: "10K Followers Milestone", value: "£200", description: "Power user" },
            ].map((goal, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">{goal.goal}</h4>
                  <p className="text-sm text-gray-600">{goal.description}</p>
                </div>
                <Badge variant="outline">{goal.value}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <Button onClick={initializeGA} disabled={isGAInitialized} className="bg-blue-600 hover:bg-blue-700">
          {isGAInitialized ? "✅ GA4 Initialized" : "Initialize Google Analytics"}
        </Button>
        <Button onClick={testEvents} variant="outline" disabled={!isGAInitialized}>
          Test Event Tracking
        </Button>
      </div>

      {/* Next Steps */}
      {completedSteps === setupSteps.length && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-green-800 mb-2">Google Analytics Setup Complete! 🎉</h3>
            <p className="text-green-700 mb-4">
              Your NexaraX platform is now tracking all user interactions and conversions.
            </p>
            <Button className="bg-green-600 hover:bg-green-700">Next: Set Up Search Console →</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
