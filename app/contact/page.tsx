"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { submitContactForm } from "./actions"
import { Mail, MessageSquare, Send, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    try {
      const result = await submitContactForm(formData)
      if (result.success) {
        toast({
          title: "Message Sent!",
          description: result.message,
        })
        // Reset form
        const form = document.getElementById("contact-form") as HTMLFormElement
        form?.reset()
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Get In Touch
            </Button>
          </Link>
        </div>

        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-blue-600 mb-4">Contact NexaraX</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions about our AI-powered content creation platform? We'd love to hear from you!
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Get Support Card */}
            <Card className="bg-white/80 backdrop-blur-sm border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Mail className="h-5 w-5 text-blue-600" />
                  Get Support
                </CardTitle>
                <CardDescription className="text-gray-600">Our team typically responds within 24 hours</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Email Support</p>
                    <p className="text-sm text-blue-600">hello@nexarax.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Live Chat</p>
                    <p className="text-sm text-purple-600">Coming Soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Common Questions Card */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-100">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">Common Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium text-gray-900 mb-1">How does the AI generation work?</p>
                  <p className="text-sm text-gray-600">
                    Our AI uses advanced models to create images, videos, and content from your prompts.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-900 mb-1">When will NexaraX launch?</p>
                  <p className="text-sm text-gray-600">
                    We're launching very soon! Join our waitlist to be notified first.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-900 mb-1">Will there be a free plan?</p>
                  <p className="text-sm text-gray-600">Yes! We'll offer both free and premium plans at launch.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Contact Form */}
          <Card className="bg-white/80 backdrop-blur-sm border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Send className="h-5 w-5 text-blue-600" />
                Send us a Message
              </CardTitle>
              <CardDescription className="text-gray-600">
                Fill out the form below and we'll get back to you soon
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form id="contact-form" action={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-gray-700 font-medium">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your full name"
                    required
                    disabled={isSubmitting}
                    className="mt-1 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    disabled={isSubmitting}
                    className="mt-1 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <Label htmlFor="subject" className="text-gray-700 font-medium">
                    Subject <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="What's this about?"
                    required
                    disabled={isSubmitting}
                    className="mt-1 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-gray-700 font-medium">
                    Message <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us more about your question or feedback..."
                    required
                    disabled={isSubmitting}
                    rows={5}
                    className="mt-1 border-gray-200 focus:border-blue-500 focus:ring-blue-500 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
