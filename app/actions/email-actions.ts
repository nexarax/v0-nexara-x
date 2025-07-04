"use server"

import { sendEmail, createContactEmailHTML, createWaitlistEmailHTML } from "@/lib/resend-client"

// Define the expected return type for our functions
interface ActionResult {
  success: boolean
  message?: string
  error?: string
  debug?: any
}

// Define the sendEmail result type to match what it actually returns
interface SendEmailResult {
  success: boolean
  data?: any
  error?: string
  details?: any
}

export async function handleContactForm(formData: FormData): Promise<ActionResult> {
  console.log("🚀 CONTACT FORM: Starting submission")

  try {
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const company = formData.get("company") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message) {
      return {
        success: false,
        error: "Please fill in all required fields",
      }
    }

    // Send notification email (to you)
    const notificationResult = await sendEmail({
      to: "hello@nexarax.com",
      subject: `Contact Form: ${subject}`,
      html: createContactEmailHTML({
        firstName,
        lastName,
        email,
        company,
        subject,
        message,
      }),
    })

    // Send customer confirmation
    const { getContactConfirmationTemplate } = await import("@/lib/email-templates")
    const customerResult = await sendEmail({
      to: email,
      subject: "✅ Message Received - We'll Respond Within 24 Hours",
      html: getContactConfirmationTemplate({
        firstName,
        lastName,
        email,
        subject,
      }),
      from: "NexaraX <noreply@updates.nexarax.com>",
    })

    // If either email was sent successfully, consider it a success
    if (notificationResult.success || customerResult.success) {
      return {
        success: true,
        message: "Message sent successfully! We'll respond within 24 hours.",
      }
    } else {
      return {
        success: false,
        error: "Failed to send message. Please try again or email us directly at hello@nexarax.com",
      }
    }
  } catch (error) {
    console.error("❌ CONTACT FORM: Error:", error)
    return {
      success: false,
      error: "Please try again or email us directly at hello@nexarax.com",
    }
  }
}

export async function handleWaitlistSignup(formData: FormData): Promise<ActionResult> {
  console.log("🎯 WAITLIST: Starting signup")

  try {
    const email = formData.get("email") as string
    const name = formData.get("name") as string
    const source = (formData.get("source") as string) || "website"

    // Validate required fields
    if (!email || !name) {
      return {
        success: false,
        error: "Please enter your name and email address",
      }
    }

    // Send notification email (to you)
    const notificationResult = await sendEmail({
      to: "hello@nexarax.com",
      subject: `🎉 New Waitlist Signup - ${email}`,
      html: createWaitlistEmailHTML({ email, source }),
    })

    // Send customer welcome
    const { getWaitlistWelcomeTemplate } = await import("@/lib/email-templates")
    const customerResult = await sendEmail({
      to: email,
      subject: "🎉 Welcome to NexaraX - You're In!",
      html: getWaitlistWelcomeTemplate({
        email,
        firstName: name,
      }),
      from: "NexaraX <noreply@updates.nexarax.com>",
    })

    // If either email was sent successfully, consider it a success
    if (notificationResult.success || customerResult.success) {
      return {
        success: true,
        message: "Welcome to the waitlist! Check your email for a welcome message.",
      }
    } else {
      return {
        success: false,
        error: "Failed to join waitlist. Please try again or email us at hello@nexarax.com",
      }
    }
  } catch (error) {
    console.error("❌ WAITLIST: Error:", error)
    return {
      success: false,
      error: "Please try again or email us directly at hello@nexarax.com",
    }
  }
}
