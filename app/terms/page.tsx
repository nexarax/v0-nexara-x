import { Zap } from "lucide-react"
import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="border-b border-white/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">NexaraX</span>
          </Link>
          <nav className="flex items-center space-x-6">
            <Link href="/" className="text-slate-600 hover:text-slate-900 transition-colors">
              Home
            </Link>
            <Link href="/contact" className="text-slate-600 hover:text-slate-900 transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-8">Terms of Service</h1>
          <p className="text-slate-600 mb-8">Last updated: December 30, 2024</p>

          <div className="prose prose-slate max-w-none">
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-slate-700 mb-4">
              By accessing and using NexaraX ("the Service"), you accept and agree to be bound by the terms and
              provision of this agreement.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Description of Service</h2>
            <p className="text-slate-700 mb-4">
              NexaraX is an AI-powered social media management platform that helps users create content, predict trends,
              and engage audiences automatically.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. User Accounts</h2>
            <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Account Creation</h3>
            <ul className="list-disc pl-6 text-slate-700 mb-4">
              <li>You must provide accurate and complete information</li>
              <li>You are responsible for maintaining account security</li>
              <li>You must be at least 13 years old to use the Service</li>
              <li>One person or legal entity may maintain no more than one account</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Account Responsibilities</h3>
            <ul className="list-disc pl-6 text-slate-700 mb-4">
              <li>Keep your login credentials secure</li>
              <li>Notify us immediately of any unauthorized use</li>
              <li>You are responsible for all activities under your account</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Acceptable Use</h2>
            <p className="text-slate-700 mb-4">You agree not to use the Service to:</p>
            <ul className="list-disc pl-6 text-slate-700 mb-4">
              <li>Violate any laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Transmit harmful or malicious content</li>
              <li>Spam or send unsolicited communications</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Use the Service for any illegal or unauthorized purpose</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">5. Content and Intellectual Property</h2>
            <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Your Content</h3>
            <ul className="list-disc pl-6 text-slate-700 mb-4">
              <li>You retain ownership of content you create</li>
              <li>You grant us license to use your content to provide the Service</li>
              <li>You are responsible for ensuring you have rights to all content you upload</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Our Content</h3>
            <ul className="list-disc pl-6 text-slate-700 mb-4">
              <li>The Service and its content are protected by copyright and other laws</li>
              <li>You may not copy, modify, or distribute our content without permission</li>
              <li>AI-generated content may be subject to specific terms</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">6. Payment and Billing</h2>
            <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Subscription Plans</h3>
            <ul className="list-disc pl-6 text-slate-700 mb-4">
              <li>Subscription fees are billed in advance</li>
              <li>All fees are non-refundable unless required by law</li>
              <li>We may change pricing with 30 days notice</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">Credits System</h3>
            <ul className="list-disc pl-6 text-slate-700 mb-4">
              <li>Credits are used to access premium features</li>
              <li>Credits do not expire but are non-transferable</li>
              <li>Unused credits are forfeited upon account termination</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">7. Privacy and Data Protection</h2>
            <p className="text-slate-700 mb-4">
              Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the
              Service, to understand our practices.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">8. Service Availability</h2>
            <ul className="list-disc pl-6 text-slate-700 mb-4">
              <li>We strive for 99.9% uptime but cannot guarantee uninterrupted service</li>
              <li>We may perform maintenance that temporarily affects availability</li>
              <li>We are not liable for service interruptions beyond our control</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">9. Termination</h2>
            <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">By You</h3>
            <ul className="list-disc pl-6 text-slate-700 mb-4">
              <li>You may terminate your account at any time</li>
              <li>Termination does not entitle you to a refund</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">By Us</h3>
            <ul className="list-disc pl-6 text-slate-700 mb-4">
              <li>We may terminate accounts that violate these terms</li>
              <li>We may discontinue the Service with reasonable notice</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">10. Disclaimers and Limitations</h2>
            <p className="text-slate-700 mb-4">
              THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. WE DISCLAIM ALL WARRANTIES, EXPRESS OR
              IMPLIED, INCLUDING MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">11. Indemnification</h2>
            <p className="text-slate-700 mb-4">
              You agree to indemnify and hold us harmless from any claims, damages, or expenses arising from your use of
              the Service or violation of these terms.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">12. Governing Law</h2>
            <p className="text-slate-700 mb-4">
              These terms are governed by the laws of [Your Jurisdiction] without regard to conflict of law principles.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">13. Changes to Terms</h2>
            <p className="text-slate-700 mb-4">
              We may modify these terms at any time. We will notify users of material changes via email or through the
              Service.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">14. Contact Information</h2>
            <p className="text-slate-700 mb-4">If you have questions about these terms, please contact us at:</p>
            <p className="text-slate-700">
              Email: legal@nexarax.com
              <br />
              Address: [Your Business Address]
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">NexaraX</span>
          </div>

          <div className="flex justify-center space-x-6 text-sm text-slate-400 mb-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>

          <p className="text-slate-500">© 2025 NexaraX. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
