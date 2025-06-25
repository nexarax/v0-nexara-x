"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, ExternalLink, Zap, DollarSign } from "lucide-react"

export default function ZeroCostGoogleSetup() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const steps = [
    {
      id: 1,
      title: "Create Google Analytics Account",
      time: "5 minutes",
      cost: "£0",
      description: "Use existing email, no payment required",
      action: "https://analytics.google.com",
    },
    {
      id: 2,
      title: "Add NexaraX Property",
      time: "3 minutes",
      cost: "£0",
      description: "Property name: 'NexaraX AI Platform'",
      action: null,
    },
    {
      id: 3,
      title: "Copy Tracking ID",
      time: "1 minute",
      cost: "£0",
      description: "Format: G-XXXXXXXXXX",
      action: null,
    },
    {
      id: 4,
      title: "Add to Environment Variables",
      time: "2 minutes",
      cost: "£0",
      description: "NEXT_PUBLIC_GA_TRACKING_ID=your-id",
      action: null,
    },
    {
      id: 5,
      title: "Verify Search Console",
      time: "5 minutes",
      cost: "£0",
      description: "Use existing domain ownership",
      action: "https://search.google.com/search-console",
    },
    {
      id: 6,
      title: "Submit Sitemap",
      time: "2 minutes",
      cost: "£0",
      description: "Add /sitemap.xml to Search Console",
      action: null,
    },
  ]

  const toggleStep = (stepId: number) => {
    setCompletedSteps((prev) => (prev.includes(stepId) ? prev.filter((id) => id !== stepId) : [...prev, stepId]))
  }

  const totalTime = steps.reduce((acc, step) => {
    const minutes = Number.parseInt(step.time.split(" ")[0])
    return acc + minutes
  }, 0)

  const progress = (completedSteps.length / steps.length) * 100

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Zap className="h-8 w-8 text-yellow-500" />
          <h1 className="text-3xl font-bold">Zero-Cost Google Setup</h1>
          <DollarSign className="h-8 w-8 text-green-500" />
        </div>
        <p className="text-gray-600 mb-4">
          Complete Google Analytics & Search Console setup using existing NexaraX infrastructure
        </p>

        {/* Stats */}
        <div className="flex justify-center gap-8 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">£0</div>
            <div className="text-sm text-gray-500">Total Cost</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{totalTime}min</div>
            <div className="text-sm text-gray-500">Setup Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">£900+</div>
            <div className="text-sm text-gray-500">Monthly ROI</div>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-gray-200 rounded-full h-3 w-full max-w-md mx-auto mb-2">
          <div
            className="bg-green-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-500">
          {completedSteps.length} of {steps.length} steps completed
        </p>
      </div>

      {/* Setup Steps */}
      <Card>
        <CardHeader>
          <CardTitle>🚀 30-Minute Setup Checklist</CardTitle>
          <CardDescription>Use your existing NexaraX infrastructure - no additional costs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {steps.map((step) => (
            <div key={step.id} className="flex items-start gap-3 p-4 border rounded-lg hover:bg-gray-50">
              <button onClick={() => toggleStep(step.id)} className="mt-1">
                {completedSteps.includes(step.id) ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <Circle className="h-5 w-5 text-gray-400" />
                )}
              </button>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3
                    className={`font-medium ${completedSteps.includes(step.id) ? "text-green-700 line-through" : ""}`}
                  >
                    {step.title}
                  </h3>
                  <Badge variant="outline" className="text-xs">
                    {step.time}
                  </Badge>
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                    {step.cost}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                {step.action && (
                  <a
                    href={step.action}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-600 text-sm hover:underline"
                  >
                    Open Tool <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Zero-Cost Benefits */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-green-800">💰 Zero-Cost Advantages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-green-800 mb-2">Using Existing Infrastructure:</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>✅ Domain already owned (nexarax.com)</li>
                <li>✅ Hosting on Vercel (free tier)</li>
                <li>✅ Supabase database (free tier)</li>
                <li>✅ Environment variables set up</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-green-800 mb-2">Free Google Tools:</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>✅ Google Analytics (10M events/month)</li>
                <li>✅ Search Console (unlimited)</li>
                <li>✅ Google Ads (£300 free credit)</li>
                <li>✅ Google My Business (free listing)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expected Results */}
      <Card>
        <CardHeader>
          <CardTitle>📈 Expected Results (30 Days)</CardTitle>
          <CardDescription>What you'll achieve with zero investment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">3,000+</div>
              <div className="text-sm text-gray-600">Monthly Visitors</div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">150+</div>
              <div className="text-sm text-gray-600">Email Signups</div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600">30+</div>
              <div className="text-sm text-gray-600">Paid Conversions</div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="text-2xl font-bold text-orange-600">£900+</div>
              <div className="text-sm text-gray-600">Monthly Revenue</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Success Message */}
      {completedSteps.length === steps.length && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-green-800 mb-2">Zero-Cost Setup Complete! 🎉</h3>
            <p className="text-green-700 mb-4">
              NexaraX is now tracking everything with £0 investment and existing infrastructure.
            </p>
            <div className="text-sm text-green-600 space-y-1 mb-4">
              <p>✅ Total cost: £0 (using existing resources)</p>
              <p>✅ Setup time: {totalTime} minutes</p>
              <p>✅ Expected ROI: £900+ monthly</p>
              <p>✅ Analytics: 10M free events/month</p>
            </div>
            <Button className="bg-green-600 hover:bg-green-700">Next: Test Email System (Also Free!) →</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
