"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, FileText, AlertTriangle, Scale, Zap } from "lucide-react"
import { useRouter } from "next/navigation"

export default function TermsPage() {
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
          <Badge className="mb-4 bg-blue-100 text-blue-800">📋 Terms of Service</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Please read these terms carefully before using NexaraX services.
          </p>
          <p className="text-sm text-gray-500 mt-2">Last updated: January 2025</p>
        </div>

        <div className="space-y-8">
          {/* Acceptance of Terms */}
          <Card className="border-2 border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Acceptance of Terms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                By accessing or using NexaraX services, you agree to be bound by these Terms of Service and our Privacy
                Policy. If you do not agree to these terms, please do not use our services.
              </p>
            </CardContent>
          </Card>

          {/* Service Description */}
          <Card className="border-2 border-purple-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-purple-600" />
                Service Description
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-sm">
                NexaraX is an AI-powered content creation platform that helps users generate images, videos, and social
                media content. Our services include:
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• AI image generation</li>
                <li>• AI video creation</li>
                <li>• Content scheduling and publishing</li>
                <li>• Social media management tools</li>
                <li>• Analytics and insights</li>
              </ul>
            </CardContent>
          </Card>

          {/* User Responsibilities */}
          <Card className="border-2 border-green-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-green-600" />
                User Responsibilities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-sm mb-3">You agree to:</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Provide accurate and complete information</li>
                <li>• Use our services in compliance with applicable laws</li>
                <li>• Not use our services for illegal or harmful purposes</li>
                <li>• Respect intellectual property rights</li>
                <li>• Not attempt to reverse engineer our technology</li>
                <li>• Keep your account credentials secure</li>
              </ul>
            </CardContent>
          </Card>

          {/* Prohibited Uses */}
          <Card className="border-2 border-red-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Prohibited Uses
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-sm mb-3">You may not use NexaraX to:</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Create harmful, offensive, or illegal content</li>
                <li>• Violate copyright or intellectual property rights</li>
                <li>• Spread misinformation or fake news</li>
                <li>• Harass, threaten, or harm others</li>
                <li>• Attempt to hack or disrupt our services</li>
                <li>• Create content that violates platform policies</li>
              </ul>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card className="border-2 border-orange-100">
            <CardHeader>
              <CardTitle>Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Your Content</h3>
                <p className="text-gray-600 text-sm">
                  You retain ownership of content you create using NexaraX. However, you grant us a license to process
                  and store your content to provide our services.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Our Platform</h3>
                <p className="text-gray-600 text-sm">
                  NexaraX and its technology are protected by intellectual property laws. You may not copy, modify, or
                  distribute our platform without permission.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card className="border-2 border-gray-100">
            <CardHeader>
              <CardTitle>Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                NexaraX is provided "as is" without warranties. We are not liable for any damages arising from your use
                of our services, including but not limited to direct, indirect, incidental, or consequential damages.
              </p>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card className="border-2 border-yellow-100">
            <CardHeader>
              <CardTitle>Termination</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                We may terminate or suspend your access to NexaraX at any time for violation of these terms. You may
                also terminate your account at any time by contacting us.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="border-2 border-blue-100">
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4">
                If you have questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm">
                  <strong>Email:</strong> legal@nexarax.com
                  <br />
                  <strong>General Contact:</strong> hello@nexarax.com
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
