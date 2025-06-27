"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Sparkles, Mail, MessageSquare, Phone, MapPin, ArrowLeft, Home, Send, CheckCircle } from 'lucide-react'
import { useRouter } from "next/navigation"
import { submitContactForm } from "./actions"

export default function ContactPage() {
  const router = useRouter()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true)
    try {
      await submitContactForm(formData)
      setIsSubmitted(true)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        {/* Header */}
        <header className="border-b bg-white sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">NexaraX</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Button variant="ghost" onClick={() => router.push("/features")}>
                Features
              </Button>
              <Button variant="ghost" onClick={() => router.push("/pricing")}>
                Pricing
              </Button>
              <Button variant="ghost" onClick={() => router.push("/contact")}>
                Contact
              </Button>
              <Button variant="ghost" onClick={() => router.push("/auth/signin")}>
                Sign In
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6" onClick={() => router.push("/create")}>
                Get Started
              </Button>
            </nav>
          </div>
        </header>

        <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
          <div className="bg-white rounded-2xl p-12 shadow-lg border">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4 text-gray-900">Message Sent Successfully!</h1>
            <p className="text-xl text-gray-600 mb-8">
              Thank you for contacting us. We'll get back to you within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => router.push("/")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                <Home className="w-4 h-4 mr-2" />
                Return to Homepage
              </Button>
              <Button variant="outline" onClick={() => router.push("/create")}>
                Start Creating
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">NexaraX</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Button variant="ghost" onClick={() => router.push("/features")}>
              Features
            </Button>
            <Button variant="ghost" onClick={() => router.push("/pricing")}>
              Pricing
            </Button>
            <Button variant="ghost" onClick={() => router.push("/contact")}>
              Contact
            </Button>
            <Button variant="ghost" onClick={() => router.push("/auth/signin")}>
              Sign In
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6" onClick={() => router.push("/create")}>
              Get Started
            </Button>
          </nav>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => router.push("/")} className="cursor-pointer">
                <Home className="w-4 h-4" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Contact</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-blue-200">
            💬 Get in Touch
          </Badge>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about NexaraX? We're here to help you succeed with AI-powered social media marketing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-2 border-blue-100">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a message</CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you within 24 hours.</CardDescription>
              </CardHeader>
              <CardContent>
                <form action={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" name="firstName" placeholder="John" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" name="lastName" placeholder="Doe" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company (Optional)</Label>
                    <Input id="company" name="company" placeholder="Your Company" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" name="subject" placeholder="How can we help you?" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us more about your needs..."
                      rows={6}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info & Quick Links */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card className="border-2 border-purple-100">
              <CardHeader>
                <CardTitle className="text-xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">hello@nexarax.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MessageSquare className="w-5 h-5 text-purple-600 mt-1" />
                  <div>
                    <p className="font-medium">Live Chat</p>
                    <p className="text-gray-600">Available 24/7</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-gray-600">+44 20 1234 5678</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-red-600 mt-1" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-gray-600">London, United Kingdom</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="border-2 border-green-100">
              <CardHeader>
                <CardTitle className="text-xl">Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="ghost" className="w-full justify-start" onClick={() => router.push("/features")}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  View Features
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => router.push("/pricing")}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  See Pricing
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => router.push("/create")}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Start Creating
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => router.push("/")}>
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
