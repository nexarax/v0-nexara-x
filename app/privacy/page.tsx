import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Eye, Lock, Database, Cookie, Mail } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-green-100 text-green-800">🔒 PRIVACY POLICY</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Your Privacy Matters
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are committed to protecting your privacy and ensuring transparency about how we collect, use, and protect
            your data.
          </p>
          <p className="text-sm text-gray-500 mt-4">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-8">
          <Card className="border-2 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-6 w-6 text-green-600" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Account Information</h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Name and email address</li>
                    <li>• Profile picture (if provided)</li>
                    <li>• Account preferences</li>
                    <li>• Subscription details</li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">Usage Data</h3>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Platform interactions</li>
                    <li>• Content creation metrics</li>
                    <li>• Feature usage patterns</li>
                    <li>• Performance analytics</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-6 w-6 text-blue-600" />
                How We Use Your Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="bg-green-100 rounded-full p-3 w-fit mx-auto mb-3">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-green-800 mb-2">Service Provision</h3>
                  <p className="text-sm text-green-700">
                    To provide and improve our AI-powered social media management services
                  </p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="bg-blue-100 rounded-full p-3 w-fit mx-auto mb-3">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-blue-800 mb-2">Communication</h3>
                  <p className="text-sm text-blue-700">
                    To send important updates, security alerts, and support responses
                  </p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="bg-purple-100 rounded-full p-3 w-fit mx-auto mb-3">
                    <Lock className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-purple-800 mb-2">Security</h3>
                  <p className="text-sm text-purple-700">To protect your account and prevent unauthorized access</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cookie className="h-6 w-6 text-orange-600" />
                Cookies & Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-orange-50 p-6 rounded-lg">
                <h3 className="font-semibold text-orange-800 mb-4">We use cookies for:</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-orange-700 mb-2">Essential Cookies</h4>
                    <ul className="text-sm text-orange-600 space-y-1">
                      <li>• Authentication and security</li>
                      <li>• Session management</li>
                      <li>• CSRF protection</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-orange-700 mb-2">Analytics Cookies</h4>
                    <ul className="text-sm text-orange-600 space-y-1">
                      <li>• Usage analytics (Google Analytics)</li>
                      <li>• Performance monitoring</li>
                      <li>• Error tracking</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-red-600" />
                Your Rights (GDPR Compliance)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-red-800 mb-2">Access & Portability</h3>
                    <p className="text-sm text-red-700">
                      Request a copy of all personal data we hold about you in a portable format
                    </p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-red-800 mb-2">Rectification</h3>
                    <p className="text-sm text-red-700">Correct any inaccurate or incomplete personal data</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-red-800 mb-2">Erasure</h3>
                    <p className="text-sm text-red-700">
                      Request deletion of your personal data (right to be forgotten)
                    </p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-red-800 mb-2">Objection</h3>
                    <p className="text-sm text-red-700">
                      Object to processing of your personal data for specific purposes
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200">
            <CardHeader>
              <CardTitle>Data Retention & Security</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">🗄️ Data Retention</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Account data: Retained while account is active + 30 days after deletion</li>
                    <li>• Usage analytics: Aggregated data retained for 2 years</li>
                    <li>• Security logs: Retained for 1 year for security purposes</li>
                    <li>• Payment data: Retained as required by law (typically 7 years)</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">🔒 Security Measures</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• End-to-end encryption for sensitive data</li>
                    <li>• Regular security audits and penetration testing</li>
                    <li>• SOC 2 Type II compliance</li>
                    <li>• 24/7 security monitoring and incident response</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-4 border-blue-200 bg-blue-50">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-blue-800 mb-4">Contact Us About Privacy</h2>
              <p className="text-blue-700 mb-6">Have questions about your privacy or want to exercise your rights?</p>
              <div className="space-y-2">
                <p className="text-sm text-blue-600">
                  <strong>Email:</strong> privacy@nexarax.com
                </p>
                <p className="text-sm text-blue-600">
                  <strong>Data Protection Officer:</strong> dpo@nexarax.com
                </p>
                <p className="text-sm text-blue-600">
                  <strong>Response Time:</strong> Within 30 days as required by GDPR
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
