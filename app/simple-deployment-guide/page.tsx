"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle } from "lucide-react"

export default function SimpleDeploymentGuide() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const toggleStep = (stepNumber: number) => {
    if (completedSteps.includes(stepNumber)) {
      setCompletedSteps(completedSteps.filter((n) => n !== stepNumber))
    } else {
      setCompletedSteps([...completedSteps, stepNumber])
    }
  }

  const steps = [
    {
      number: 1,
      title: "Deploy NexaraX WITHOUT payments (2 minutes)",
      description: "Get your site live first, add payments later",
      action: "Push your code to GitHub and let Vercel deploy it",
      commands: ["git add .", 'git commit -m "Deploy NexaraX free version"', "git push origin main"],
      why: "This gets you live immediately. Users can signup and use free features.",
      risk: "ZERO - No payment processing to break",
    },
    {
      number: 2,
      title: "Test your live site (5 minutes)",
      description: "Make sure everything works on nexarax.com",
      action: "Visit your live site and test the signup flow",
      commands: ["Go to nexarax.com", "Click 'Sign Up'", "Test user registration", "Check AI features work"],
      why: "Verify your site is working before marketing it",
      risk: "LOW - Just testing, no real users yet",
    },
    {
      number: 3,
      title: "Start marketing (30 minutes)",
      description: "Tell people about NexaraX while it's free",
      action: "Post on social media about your AI tool",
      commands: [
        "Post on Twitter/X about NexaraX",
        "Share in relevant Facebook groups",
        "Tell friends and family",
        "Post on LinkedIn",
      ],
      why: "Build user base while it's free - easier to get signups",
      risk: "ZERO - Free users, no payment issues",
    },
    {
      number: 4,
      title: "Add Stripe payments (when ready)",
      description: "Only do this when users want to upgrade",
      action: "Set up Stripe account and add payment processing",
      commands: [
        "Create Stripe account",
        "Get API keys",
        "Add to Vercel environment variables",
        "Redeploy with payments",
      ],
      why: "Add revenue when users are asking for premium features",
      risk: "LOW - You'll have users who want to pay by then",
    },
  ]

  const currentStep = completedSteps.length + 1

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">🚀 Simple NexaraX Deployment</h1>
          <p className="text-xl text-gray-600">Follow these 4 steps to get live and making money</p>
          <div className="mt-4">
            <Badge variant="outline" className="text-lg px-4 py-2">
              Step {currentStep} of 4
            </Badge>
          </div>
        </div>

        <div className="space-y-6">
          {steps.map((step) => {
            const isCompleted = completedSteps.includes(step.number)
            const isCurrent = step.number === currentStep
            const isUpcoming = step.number > currentStep

            return (
              <Card
                key={step.number}
                className={`border-2 transition-all ${
                  isCompleted
                    ? "border-green-500 bg-green-50"
                    : isCurrent
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 bg-gray-50"
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <button
                        onClick={() => toggleStep(step.number)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                          isCompleted ? "bg-green-500" : isCurrent ? "bg-blue-500" : "bg-gray-400"
                        }`}
                      >
                        {isCompleted ? <CheckCircle className="w-6 h-6" /> : step.number}
                      </button>
                      <div>
                        <div className="text-xl">{step.title}</div>
                        <div className="text-sm text-gray-600 font-normal">{step.description}</div>
                      </div>
                    </CardTitle>
                    {isCompleted && <Badge className="bg-green-500">✓ Done</Badge>}
                    {isCurrent && <Badge className="bg-blue-500">👈 Do This Now</Badge>}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border">
                    <h4 className="font-semibold text-gray-900 mb-2">🎯 What to do:</h4>
                    <p className="text-gray-700">{step.action}</p>
                  </div>

                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">💻 Commands/Actions:</h4>
                    <div className="space-y-1">
                      {step.commands.map((command, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Circle className="w-3 h-3 text-gray-500" />
                          <code className="text-sm bg-white px-2 py-1 rounded">{command}</code>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h5 className="font-semibold text-blue-900 mb-1">💡 Why this step:</h5>
                      <p className="text-blue-800 text-sm">{step.why}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <h5 className="font-semibold text-green-900 mb-1">⚠️ Risk level:</h5>
                      <p className="text-green-800 text-sm">{step.risk}</p>
                    </div>
                  </div>

                  {isCurrent && (
                    <Button
                      onClick={() => toggleStep(step.number)}
                      className="w-full bg-blue-500 hover:bg-blue-600"
                      size="lg"
                    >
                      ✅ Mark Step {step.number} Complete
                    </Button>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Progress Summary */}
        <Card className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50">
          <CardContent className="p-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                📊 Your Progress: {completedSteps.length}/4 Steps Complete
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="text-2xl font-bold text-blue-500">{completedSteps.length}</div>
                  <div className="text-sm text-gray-600">Steps Done</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="text-2xl font-bold text-green-500">{4 - completedSteps.length}</div>
                  <div className="text-sm text-gray-600">Steps Left</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="text-2xl font-bold text-purple-500">
                    {Math.round((completedSteps.length / 4) * 100)}%
                  </div>
                  <div className="text-sm text-gray-600">Complete</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="text-2xl font-bold text-orange-500">
                    {completedSteps.length === 4 ? "LIVE!" : `${15 * (4 - completedSteps.length)} min`}
                  </div>
                  <div className="text-sm text-gray-600">Time Left</div>
                </div>
              </div>

              {completedSteps.length === 4 ? (
                <div className="bg-green-100 p-6 rounded-lg border border-green-200">
                  <h3 className="text-xl font-bold text-green-900 mb-2">🎉 NexaraX is LIVE!</h3>
                  <p className="text-green-800">Congratulations! Your AI empire is now live and ready to make money.</p>
                </div>
              ) : (
                <div className="bg-blue-100 p-6 rounded-lg border border-blue-200">
                  <h3 className="text-xl font-bold text-blue-900 mb-2">👆 Focus on Step {currentStep} Next</h3>
                  <p className="text-blue-800">
                    You're {Math.round((completedSteps.length / 4) * 100)}% done! Just {4 - completedSteps.length} more
                    steps to go live.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
