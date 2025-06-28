import { Brain, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              NexaraX
            </span>
          </Link>
          <Link href="/">
            <Button variant="ghost">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </nav>
      </header>

      {/* Terms of Service Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Terms of Service
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using NexaraX, you accept and agree to be bound by the terms and provision of this
                agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">2. Use License</h2>
              <p className="text-gray-700 mb-4">
                Permission is granted to temporarily access NexaraX for personal, non-commercial transitory viewing
                only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on the platform</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">3. User Accounts</h2>
              <p className="text-gray-700 mb-4">
                When you create an account with us, you must provide information that is accurate, complete, and current
                at all times. You are responsible for safeguarding the password and for all activities that occur under
                your account.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">4. Prohibited Uses</h2>
              <p className="text-gray-700 mb-4">You may not use our service:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                <li>
                  To violate any international, federal, provincial, or state regulations, rules, laws, or local
                  ordinances
                </li>
                <li>
                  To infringe upon or violate our intellectual property rights or the intellectual property rights of
                  others
                </li>
                <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>To submit false or misleading information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">5. Service Availability</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to withdraw or amend our service, and any service or material we provide on
                NexaraX, in our sole discretion without notice. We will not be liable if for any reason all or any part
                of the service is unavailable at any time or for any period.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">6. Disclaimer</h2>
              <p className="text-gray-700 mb-4">
                The information on this platform is provided on an 'as is' basis. To the fullest extent permitted by
                law, this Company excludes all representations, warranties, conditions and terms relating to our
                platform and the use of this platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">7. Limitations</h2>
              <p className="text-gray-700 mb-4">
                In no event shall NexaraX or its suppliers be liable for any damages (including, without limitation,
                damages for loss of data or profit, or due to business interruption) arising out of the use or inability
                to use NexaraX, even if NexaraX or a NexaraX authorized representative has been notified orally or in
                writing of the possibility of such damage.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">8. Revisions and Errata</h2>
              <p className="text-gray-700 mb-4">
                The materials appearing on NexaraX could include technical, typographical, or photographic errors.
                NexaraX does not warrant that any of the materials on its platform are accurate, complete, or current.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">9. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <p className="text-gray-700">
                Email:{" "}
                <a href="mailto:legal@nexarax.com" className="text-blue-600 hover:text-blue-700">
                  legal@nexarax.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
