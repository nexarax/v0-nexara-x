"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Mail, MessageCircle, Send } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isWaitlistSubmitting, setIsWaitlistSubmitting] = useState(false)
  const [waitlistName, setWaitlistName] = useState("")
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isSubmitting) return
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.currentTarget)

      // Import the server action dynamically to avoid build issues
      const { handleContactForm } = await import("@/app/actions/email-actions")
      const result = await handleContactForm(formData)

      if (result?.success) {
        toast({
          title: "✅ Message sent successfully!",
          description: result.message || "We'll respond within 24 hours.",
        })
        e.currentTarget.reset()
      } else {
        toast({
          title: "Error",
          description: result?.error || "Failed to send message. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Contact form error:", error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again or email us directly at hello@nexarax.com",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleWaitlist = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isWaitlistSubmitting) return
    setIsWaitlistSubmitting(true)

    try {
      const formData = new FormData(e.currentTarget)
      formData.append("source", "contact-page")

      // Import the server action dynamically to avoid build issues
      const { handleWaitlistSignup } = await import("@/app/actions/email-actions")
      const result = await handleWaitlistSignup(formData)

      if (result?.success) {
        toast({
          title: "🎉 Added to waitlist!",
          description: result.message || "Check your email for a welcome message.",
        })
        e.currentTarget.reset()
        setWaitlistName("")
      } else {
        toast({
          title: "Error",
          description: result?.error || "Failed to join waitlist. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Waitlist form error:", error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsWaitlistSubmitting(false)
    }
  }

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
            <span className="text-slate-900 font-medium">Contact</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-blue-100 text-blue-800 border-blue-200">📞 Get in Touch</Badge>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Contact Us
            </span>
          </h1>

          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Have questions about NexaraX? We're here to help you succeed with AI-powered social media marketing.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a message</CardTitle>
                  <CardDescription className="text-base">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-2">
                          First Name
                        </label>
                        <Input id="firstName" name="firstName" placeholder="John" required disabled={isSubmitting} />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-2">
                          Last Name
                        </label>
                        <Input id="lastName" name="lastName" placeholder="Doe" required disabled={isSubmitting} />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">
                        Company (Optional)
                      </label>
                      <Input id="company" name="company" placeholder="Your Company" disabled={isSubmitting} />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="How can we help you?"
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us more about your needs..."
                        rows={6}
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                      <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Email</p>
                      <p className="text-slate-600">hello@nexarax.com</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <MessageCircle className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Live Chat</p>
                      <p className="text-slate-600">Coming Soon</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Launching Soon Card */}
              <Card className="border-0 shadow-xl bg-gradient-to-br from-yellow-50 to-orange-50">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2">Launching Soon!</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    NexaraX is currently in development. Contact us to be notified when we launch!
                  </p>

                  <form onSubmit={handleWaitlist} className="space-y-3">
                    <Input
                      type="text"
                      name="name"
                      placeholder="Your first name"
                      value={waitlistName}
                      onChange={(e) => setWaitlistName(e.target.value)}
                      required
                      disabled={isWaitlistSubmitting}
                    />
                    <Input
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      required
                      disabled={isWaitlistSubmitting}
                    />
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                      disabled={isWaitlistSubmitting}
                    >
                      {isWaitlistSubmitting ? "Joining..." : "Join Waitlist"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 mt-16">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">NexaraX</span>
          </div>

          <p className="text-slate-400 mb-8">Transform your social media presence with AI-powered content creation.</p>

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
