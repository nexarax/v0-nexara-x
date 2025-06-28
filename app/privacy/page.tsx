"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Shield, Eye, Lock, Users } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PrivacyPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => router.push("/")} className="mb-6 hover:bg-blue-50">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-100 text-blue-800">🔒 Privacy Policy</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your privacy is important to us. Here's how we protect and handle your data.
          </p>
          <p className="text-sm text-gray-500 mt-2">Last updated: January 2025</p>
        </div>

        <div className="space-y-8">
          {/* Information We Collect */}
          <Card className="border-2 border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-blue-600" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Personal Information</h3>
                <p className="text-gray-600 text-sm">
                  When you sign up for our waitlist or contact us, we collect your name and email address. This helps us
                  communicate with you about NexaraX updates and respond to your inquiries.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Usage Data</h3>
                <p className="text-gray-600 text-sm">
                  We collect information about how you interact with our website, including pages visited, time spent,
                  and browser information. This helps us improve our service.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Your Information */}
          <Card className="border-2 border-green-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-green-600" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Send you updates about NexaraX launch and features</li>
                <li>• Respond to your questions and support requests</li>
                <li>• Improve our website and services</li>
                <li>• Analyze usage patterns to enhance user experience</li>
                <li>• Comply with legal obligations</li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Protection */}
          <Card className="border-2 border-purple-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-600" />
                Data Protection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Security Measures</h3>
                <p className="text-gray-600 text-sm">
                  We implement industry-standard security measures to protect your personal information, including
                  encryption, secure servers, and regular security audits.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Data Retention</h3>
                <p className="text-gray-600 text-sm">
                  We retain your information only as long as necessary to provide our services and comply with legal
                  obligations. You can request deletion of your data at any time.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card className="border-2 border-orange-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-orange-600" />
                Your Rights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-sm mb-3">You have the right to:</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Access your personal data we hold</li>
                <li>• Correct inaccurate or incomplete data</li>
                <li>• Delete your personal data</li>
                <li>• Object to processing of your data</li>
                <li>• Data portability</li>
                <li>• Withdraw consent at any time</li>
              </ul>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="border-2 border-gray-100">
            <CardHeader>
              <CardTitle>Contact Us About Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4">
                If you have questions about this Privacy Policy or how we handle your data, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm">
                  <strong>Email:</strong> privacy@nexarax.com
                  <br />
                  <strong>General Contact:</strong> hello@nexarax.com
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Updates */}
          <Card className="border-2 border-blue-100">
            <CardHeader>
              <CardTitle>Policy Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                We may update this Privacy Policy from time to time. We will notify you of any significant changes by
                email or through our website. Your continued use of our services after such modifications constitutes
                acceptance of the updated Privacy Policy.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
