"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ExternalLink, GitBranch, Zap } from "lucide-react"

export default function VercelDeploymentGuide() {
  const [step, setStep] = useState(1)

  const steps = [
    {
      title: "Connect GitHub Repository",
      description: "Link your code to Vercel for automatic deployments",
      action: "Connect Repository",
      status: "pending",
    },
    {
      title: "Configure Environment Variables",
      description: "Add your Supabase and Stripe keys to Vercel",
      action: "Add Environment Variables",
      status: "pending",
    },
    {
      title: "Deploy to Production",
      description: "Launch your Nexarax platform live",
      action: "Deploy Now",
      status: "pending",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Zap className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold">Deploy Nexarax to Vercel</h1>
        </div>
        <p className="text-lg text-gray-600">Your database is ready! Now let's get your site live in 3 simple steps.</p>
      </div>

      <div className="grid gap-6">
        {steps.map((stepItem, index) => (
          <Card
            key={index}
            className={`transition-all ${step > index + 1 ? "bg-green-50 border-green-200" : step === index + 1 ? "border-blue-200 shadow-md" : "opacity-60"}`}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      step > index + 1
                        ? "bg-green-500 text-white"
                        : step === index + 1
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step > index + 1 ? <CheckCircle className="h-4 w-4" /> : index + 1}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{stepItem.title}</CardTitle>
                    <CardDescription>{stepItem.description}</CardDescription>
                  </div>
                </div>
                <Badge variant={step > index + 1 ? "default" : step === index + 1 ? "secondary" : "outline"}>
                  {step > index + 1 ? "Complete" : step === index + 1 ? "Current" : "Pending"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {index === 0 && (
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">🔗 Connect Your Repository</h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                      <li>
                        Go to{" "}
                        <a
                          href="https://vercel.com"
                          className="text-blue-600 hover:underline"
                          target="_blank"
                          rel="noreferrer"
                        >
                          vercel.com
                        </a>
                      </li>
                      <li>Click "Import Project"</li>
                      <li>Connect your GitHub account</li>
                      <li>Select your Nexarax repository</li>
                    </ol>
                  </div>
                  <Button onClick={() => setStep(2)} className="w-full" disabled={step !== 1}>
                    <GitBranch className="h-4 w-4 mr-2" />
                    Repository Connected
                  </Button>
                </div>
              )}

              {index === 1 && (
                <div className="space-y-4">
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">⚙️ Environment Variables</h4>
                    <p className="text-sm mb-3">Add these to your Vercel project settings:</p>
                    <div className="bg-gray-900 text-green-400 p-3 rounded text-xs font-mono">
                      <div>NEXT_PUBLIC_SUPABASE_URL=your_supabase_url</div>
                      <div>NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key</div>
                      <div>STRIPE_SECRET_KEY=your_stripe_key</div>
                      <div>NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_public_key</div>
                    </div>
                  </div>
                  <Button onClick={() => setStep(3)} className="w-full" disabled={step !== 2}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Environment Variables Added
                  </Button>
                </div>
              )}

              {index === 2 && (
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">🚀 Deploy Your Site</h4>
                    <p className="text-sm mb-3">Click "Deploy" in Vercel and your site will be live!</p>
                    <div className="flex items-center gap-2 text-sm text-green-700">
                      <CheckCircle className="h-4 w-4" />
                      <span>Database is ready ✅</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-green-700">
                      <CheckCircle className="h-4 w-4" />
                      <span>Code is prepared ✅</span>
                    </div>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700" disabled={step !== 3}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Deploy to Production
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-blue-50 p-6 rounded-lg text-center">
        <h3 className="font-semibold text-lg mb-2">🎯 Alternative: One-Click Deploy</h3>
        <p className="text-sm text-gray-600 mb-4">Skip the manual setup and deploy directly from this code</p>
        <Button size="lg" className="bg-black hover:bg-gray-800">
          <ExternalLink className="h-4 w-4 mr-2" />
          Deploy with Vercel
        </Button>
      </div>
    </div>
  )
}
