"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Mail, ExternalLink, Copy } from "lucide-react"

export default function EmailSetupPage() {
  const [step, setStep] = useState(1)
  const [apiKeySet, setApiKeySet] = useState(false)
  const [testEmailSent, setTestEmailSent] = useState(false)

  const testEmailService = async () => {
    try {
      const response = await fetch("/api/email-campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "single",
          recipients: [{ email: "test@nexarax.com" }],
          templateKey: "welcome",
          variables: { firstName: "Test User" },
        }),
      })

      const result = await response.json()
      setTestEmailSent(result.success)
      return result.success
    } catch (error) {
      console.error("Email test failed:", error)
      return false
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">📧 NexaraX Email Service Setup</h1>
          <p className="text-xl text-gray-600">Configure email marketing before deployment</p>
        </div>

        <div className="grid gap-6">
          {/* Step 1: Get Resend API Key */}
          <Card className={`border-2 ${step >= 1 ? "border-blue-500" : "border-gray-200"}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${step >= 1 ? "bg-blue-500" : "bg-gray-400"}`}
                  >
                    1
                  </div>
                  Get Resend API Key
                </CardTitle>
                {apiKeySet && (
                  <Badge variant="default" className="bg-green-500">
                    ✓ Complete
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">🔑 Create Free Resend Account:</h3>
                <ol className="list-decimal list-inside space-y-2 text-blue-800">
                  <li>
                    Go to{" "}
                    <a href="https://resend.com" target="_blank" className="underline font-medium" rel="noreferrer">
                      resend.com
                    </a>
                  </li>
                  <li>Sign up with your email (FREE - 3,000 emails/month)</li>
                  <li>Verify your email address</li>
                  <li>Go to API Keys section</li>
                  <li>Create new API key named "NexaraX Production"</li>
                </ol>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="text-yellow-800">
                  <strong>💡 Pro Tip:</strong> Your API key will look like:{" "}
                  <code className="bg-yellow-100 px-2 py-1 rounded">re_xxxxxxxxxx</code>
                </p>
              </div>

              <Button
                onClick={() => {
                  setStep(2)
                  setApiKeySet(true)
                }}
                className="w-full"
                disabled={step < 1}
              >
                <ExternalLink className="w-4 h-4 mr-2" />I Have My Resend API Key
              </Button>
            </CardContent>
          </Card>

          {/* Step 2: Add to Vercel */}
          <Card className={`border-2 ${step >= 2 ? "border-blue-500" : "border-gray-200"}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${step >= 2 ? "bg-blue-500" : "bg-gray-400"}`}
                  >
                    2
                  </div>
                  Add to Vercel Environment Variables
                </CardTitle>
                {step > 2 && (
                  <Badge variant="default" className="bg-green-500">
                    ✓ Complete
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">⚙️ Vercel Configuration:</h3>
                <ol className="list-decimal list-inside space-y-2 text-purple-800">
                  <li>
                    Go to{" "}
                    <a
                      href="https://vercel.com/dashboard"
                      target="_blank"
                      className="underline font-medium"
                      rel="noreferrer"
                    >
                      vercel.com/dashboard
                    </a>
                  </li>
                  <li>Select your NexaraX project</li>
                  <li>Go to Settings → Environment Variables</li>
                  <li>Add new variable:</li>
                </ol>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Environment Variable:</span>
                  <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText("RESEND_API_KEY")}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-1">
                  <div>
                    <strong>Name:</strong> RESEND_API_KEY
                  </div>
                  <div>
                    <strong>Value:</strong> re_your_api_key_here
                  </div>
                  <div>
                    <strong>Environment:</strong> Production, Preview, Development
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">From Email Address:</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigator.clipboard.writeText("RESEND_FROM_EMAIL")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-1">
                  <div>
                    <strong>Name:</strong> RESEND_FROM_EMAIL
                  </div>
                  <div>
                    <strong>Value:</strong> jason@nexarax.com
                  </div>
                  <div>
                    <strong>Environment:</strong> Production, Preview, Development
                  </div>
                </div>
              </div>

              <Button onClick={() => setStep(3)} className="w-full" disabled={step < 2}>
                <CheckCircle className="w-4 h-4 mr-2" />
                Environment Variables Added
              </Button>
            </CardContent>
          </Card>

          {/* Step 3: Test Email Service */}
          <Card className={`border-2 ${step >= 3 ? "border-blue-500" : "border-gray-200"}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${step >= 3 ? "bg-blue-500" : "bg-gray-400"}`}
                  >
                    3
                  </div>
                  Test Email Service
                </CardTitle>
                {testEmailSent && (
                  <Badge variant="default" className="bg-green-500">
                    ✓ Working
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">🧪 Test Email Functionality:</h3>
                <p className="text-green-800 mb-3">
                  Click below to send a test welcome email and verify everything works.
                </p>
              </div>

              <Button onClick={testEmailService} className="w-full" disabled={step < 3}>
                <Mail className="w-4 h-4 mr-2" />
                Send Test Email
              </Button>

              {testEmailSent && (
                <div className="bg-green-100 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 text-green-800">
                    <CheckCircle className="w-5 h-5" />
                    <strong>Email Service Working!</strong>
                  </div>
                  <p className="text-green-700 mt-1">NexaraX email marketing is ready for deployment.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Step 4: Deploy */}
          <Card className={`border-2 ${testEmailSent ? "border-green-500" : "border-gray-200"}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${testEmailSent ? "bg-green-500" : "bg-gray-400"}`}
                >
                  4
                </div>
                Ready to Deploy!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
                <h3 className="font-bold text-xl text-gray-900 mb-2">🚀 NexaraX Ready for Launch!</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Email Service Configured</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Environment Variables Set</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Test Email Successful</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Ready for Production</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">📋 Deployment Commands:</h4>
                <div className="bg-white p-3 rounded border font-mono text-sm">
                  <div>git add .</div>
                  <div>git commit -m "Email service configured - ready for launch"</div>
                  <div>git push origin main</div>
                </div>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                disabled={!testEmailSent}
              >
                🚀 Deploy NexaraX to Production
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Success Summary */}
        {testEmailSent && (
          <Card className="mt-8 border-2 border-green-500 bg-gradient-to-r from-green-50 to-blue-50">
            <CardContent className="p-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">✅ Email Service Successfully Configured!</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="text-2xl font-bold text-green-500">3,000</div>
                    <div className="text-sm text-gray-600">Free emails/month</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="text-2xl font-bold text-blue-500">£0</div>
                    <div className="text-sm text-gray-600">Setup cost</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="text-2xl font-bold text-purple-500">∞</div>
                    <div className="text-sm text-gray-600">ROI potential</div>
                  </div>
                </div>
                <p className="text-gray-700 mt-4">
                  <strong>NexaraX is ready to launch with full email marketing capabilities!</strong>
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
