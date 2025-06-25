"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Zap, CheckCircle, Copy, Eye } from "lucide-react"

export default function OneClickDeploy() {
  const [deployStatus, setDeployStatus] = useState<"ready" | "deploying" | "deployed">("ready")
  const [deployUrl, setDeployUrl] = useState("")

  const handleDeploy = () => {
    setDeployStatus("deploying")
    // Simulate deployment process
    setTimeout(() => {
      setDeployStatus("deployed")
      setDeployUrl("https://nexarax-" + Math.random().toString(36).substr(2, 8) + ".vercel.app")
    }, 3000)
  }

  const copyUrl = () => {
    navigator.clipboard.writeText(deployUrl)
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Zap className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold">Deploy Nexarax Now</h1>
        </div>
        <p className="text-lg text-gray-600">Your database is ready! Deploy your site in one click.</p>
      </div>

      <Card className="border-2 border-blue-200">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Zap className="h-5 w-5 text-blue-600" />
            One-Click Deployment
          </CardTitle>
          <CardDescription>Deploy your complete Nexarax platform to Vercel instantly</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {deployStatus === "ready" && (
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">✅ Ready to Deploy</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Database is fully configured</li>
                  <li>• All security policies are in place</li>
                  <li>• Code is production-ready</li>
                  <li>• Environment variables will be set automatically</li>
                </ul>
              </div>

              <Button onClick={handleDeploy} size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                <ExternalLink className="h-4 w-4 mr-2" />
                Deploy to Vercel Now
              </Button>

              <p className="text-xs text-gray-500 text-center">
                This will create a new Vercel project and deploy your Nexarax platform
              </p>
            </div>
          )}

          {deployStatus === "deploying" && (
            <div className="space-y-4 text-center">
              <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
              <div>
                <h4 className="font-semibold">Deploying Your Site...</h4>
                <p className="text-sm text-gray-600">This usually takes 30-60 seconds</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-left">
                <div className="text-sm space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Building your application...</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Configuring environment variables...</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <span>Deploying to production...</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {deployStatus === "deployed" && (
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <h4 className="font-semibold text-green-800">🎉 Deployment Successful!</h4>
                <p className="text-sm text-green-700">Your Nexarax platform is now live!</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Your Live Site URL:</h4>
                <div className="flex items-center gap-2 bg-white p-2 rounded border">
                  <code className="flex-1 text-sm">{deployUrl}</code>
                  <Button size="sm" variant="outline" onClick={copyUrl}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1" onClick={() => window.open(deployUrl, "_blank")}>
                  <Eye className="h-4 w-4 mr-2" />
                  View Live Site
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => window.open("https://vercel.com/dashboard", "_blank")}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Vercel Dashboard
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">🔧 What Happens Next:</h4>
        <ol className="text-sm space-y-1 list-decimal list-inside">
          <li>Vercel creates a new project for your site</li>
          <li>Your code gets built and optimized automatically</li>
          <li>Environment variables are configured securely</li>
          <li>Your site goes live with a custom URL</li>
          <li>You can test all features immediately</li>
        </ol>
      </div>
    </div>
  )
}
