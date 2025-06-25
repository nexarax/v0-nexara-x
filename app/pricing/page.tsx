"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star } from 'lucide-react'
import { PRICING_TIERS } from "@/lib/pricing-config"

export default function PricingPage() {
  const tiers = Object.entries(PRICING_TIERS).map(([key, tier]) => ({
    ...tier,
    id: key,
    popular: key === "pro", // Set Pro as popular
    description: getDescription(key) // Add description based on tier
  }))

  function getDescription(tierId: string) {
    switch (tierId) {
      case "free":
        return "Perfect for getting started"
      case "starter":
        return "For growing creators"
      case "pro":
        return "For serious creators"
      case "enterprise":
        return "For teams & agencies"
      default:
        return "Get started today"
    }
  }

  const getButtonStyle = (tierId: string) => {
    switch (tierId) {
      case "free":
        return "bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300"
      case "starter":
        return "bg-blue-600 text-white hover:bg-blue-700"
      case "pro":
        return "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
      case "enterprise":
        return "bg-gray-900 text-white hover:bg-gray-800"
      default:
        return "bg-blue-600 text-white hover:bg-blue-700"
    }
  }

  const getButtonText = (tierId: string) => {
    switch (tierId) {
      case "free":
        return "Start Free"
      case "starter":
        return "Choose Starter"
      case "pro":
        return "Choose Pro"
      case "enterprise":
        return "Contact Sales"
      default:
        return "Get Started"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Pricing That Scales With You
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start free and upgrade as you grow. All plans include our core AI features.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tiers.map((tier) => (
            <Card
              key={tier.id}
              className={`relative border-2 transition-all duration-300 hover:shadow-xl ${
                tier.popular ? "border-purple-500 shadow-lg scale-105" : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">£{tier.price}</span>
                  {tier.price > 0 && <span className="text-gray-500 ml-1">/month</span>}
                </div>
                <CardDescription className="mt-2">{tier.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Features List */}
                <div className="space-y-3">
                  {tier.id === "free" && (
                    <>
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">5 AI images/month</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">Basic templates</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">1 social platform</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">Basic analytics</span>
                      </div>
                    </>
                  )}

                  {tier.id === "starter" && (
                    <>
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">50 AI images/month</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">10 AI videos/month</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">3 social platforms</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">Advanced templates</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">Scheduling tools</span>
                      </div>
                    </>
                  )}

                  {tier.id === "pro" && (
                    <>
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">200 AI images/month</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">50 AI videos/month</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">Unlimited platforms</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">AI voice generation</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">Advanced analytics</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">Priority support</span>
                      </div>
                    </>
                  )}

                  {tier.id === "enterprise" && (
                    <>
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">Unlimited AI content</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">Team collaboration</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">White-label options</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">Custom integrations</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">Dedicated support</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">SLA guarantee</span>
                      </div>
                    </>
                  )}
                </div>

                {/* CTA Button */}
                <div className="pt-6">
                  <Button className={`w-full ${getButtonStyle(tier.id)}`} size="lg">
                    {getButtonText(tier.id)}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
{/* FAQ or Additional Info */}
<div className="text-center mt-16">
  <div className="space-y-2">
    <p className="text-gray-600">
      <span className="font-medium">Free Trial:</span> 14 days, no credit card required
    </p>
    <p className="text-gray-600">
      <span className="font-medium">Paid Plans:</span> Start immediately • Cancel anytime
    </p>
  </div>
</div>
        
      </div>
    </div>
  )
}
