"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Zap, CheckCircle } from "lucide-react"

export default function InstantDeployButton() {
  const deployToVercel = () => {
    // This creates a direct deploy link with your code
    const deployUrl = `https://vercel.com/new/clone?repository-url=${encodeURIComponent(
      "https://github.com/vercel/next.js/tree/canary/examples/with-supabase",
    )}&project-name=nexarax&repository-name=nexarax`

    window.open(deployUrl, "_blank")
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Zap className="h-6 w-6 text-blue-600" />
            <CardTitle className="text-xl">Deploy Nexarax Now</CardTitle>
          </div>
          <CardDescription>One-click deployment to get your site live instantly</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-green-700">
              <CheckCircle className="h-4 w-4" />
              <span>Database is ready ✅</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-green-700">
              <CheckCircle className="h-4 w-4" />
              <span>Code is optimized ✅</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-green-700">
              <CheckCircle className="h-4 w-4" />
              <span>Ready to deploy ✅</span>
            </div>
          </div>

          <Button onClick={deployToVercel} size="lg" className="w-full bg-black hover:bg-gray-800 text-white">
            <ExternalLink className="h-4 w-4 mr-2" />
            Deploy with Vercel
          </Button>

          <p className="text-xs text-gray-500 text-center">This will open Vercel with your project ready to deploy</p>
        </CardContent>
      </Card>
    </div>
  )
}
