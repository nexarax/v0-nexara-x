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
  console.log("🚀 Contact form submission started")

  try {
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const company = formData.get("company") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    console.log("📝 Contact form data:", { firstName, lastName, email, subject })

    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message) {
      console.log("❌ Missing required fields")
      return { success: false, error: "Please fill in all required fields" }
    }

    // Send notification email (to you) - this is the critical one
    console.log("📧 Sending notification email to hello@nexarax.com...")
    const notificationResult: SendEmailResult = await sendEmail({
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

    console.log("📊 Notification result:", notificationResult)

    // Send customer confirmation (secondary)
    console.log("📧 Sending customer confirmation...")
    let customerResult: SendEmailResult = { success: false, error: "Not attempted" }

    try {
      const { getContactConfirmationTemplate } = await import("@/lib/email-templates")

      customerResult = await sendEmail({
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

      console.log("📊 Customer confirmation result:", customerResult)
    } catch (customerError) {
      console.log("⚠️ Customer confirmation failed:", customerError)
      customerResult = { success: false, error: "Customer email failed" }
    }

    // SUCCESS CRITERIA: If notification email was sent, consider it a success
    if (notificationResult.success) {
      console.log("✅ CONTACT FORM SUCCESS - Notification email sent")
      return {
        success: true,
        message: "Message sent successfully! You'll receive a confirmation email and we'll respond within 24 hours.",
        debug: {
          notificationSent: notificationResult.success,
          customerSent: customerResult.success,
          timestamp: new Date().toISOString(),
        },
      }
    } else {
      console.log("❌ CONTACT FORM FAILED - Notification email failed")
      return {
        success: false,
        error: "Failed to send message. Please try again or email us directly at hello@nexarax.com",
        debug: {
          notificationError: notificationResult.error,
          customerError: customerResult.error,
        },
      }
    }
  } catch (error) {
    console.error("❌ Contact form exception:", error)
    return {
      success: false,
      error: "Please try again or email us directly at hello@nexarax.com",
    }
  }
}

export async function handleWaitlistSignup(formData: FormData): Promise<ActionResult> {
  console.log("🎯 Waitlist signup started")

  try {
    const email = formData.get("email") as string
    const name = formData.get("name") as string
    const source = (formData.get("source") as string) || "website"

    console.log("📝 Waitlist data:", { email, name, source })

    // Validate required fields
    if (!email) {
      console.log("❌ Missing email")
      return { success: false, error: "Please enter your email address" }
    }

    if (!name) {
      console.log("❌ Missing name")
      return { success: false, error: "Please enter your name" }
    }

    // Send notification email (to you) - this is the critical one
    console.log("📧 Sending waitlist notification to hello@nexarax.com...")
    const notificationResult: SendEmailResult = await sendEmail({
      to: "hello@nexarax.com",
      subject: `🎉 New Waitlist Signup - ${email}`,
      html: createWaitlistEmailHTML({ email, source }),
    })

    console.log("📊 Waitlist notification result:", notificationResult)

    // Send customer welcome (secondary)
    console.log("🎉 Sending customer welcome...")
    let customerResult: SendEmailResult = { success: false, error: "Not attempted" }

    try {
      const { getWaitlistWelcomeTemplate } = await import("@/lib/email-templates")

      customerResult = await sendEmail({
        to: email,
        subject: "🎉 Welcome to NexaraX - You're In!",
        html: getWaitlistWelcomeTemplate({
          email,
          firstName: name,
        }),
        from: "NexaraX <noreply@updates.nexarax.com>",
      })

      console.log("📊 Customer welcome result:", customerResult)
    } catch (customerError) {
      console.log("⚠️ Customer welcome failed:", customerError)
      customerResult = { success: false, error: "Customer email failed" }
    }

    // SUCCESS CRITERIA: If notification email was sent, consider it a success
    if (notificationResult.success) {
      console.log("✅ WAITLIST SUCCESS - Notification email sent")
      return {
        success: true,
        message: "Welcome to the waitlist! Check your email for a special welcome message.",
        debug: {
          notificationSent: notificationResult.success,
          customerSent: customerResult.success,
          timestamp: new Date().toISOString(),
        },
      }
    } else {
      console.log("❌ WAITLIST FAILED - Notification email failed")
      return {
        success: false,
        error: "Failed to join waitlist. Please try again or email us at hello@nexarax.com",
        debug: {
          notificationError: notificationResult.error,
          customerError: customerResult.error,
        },
      }
    }
  } catch (error) {
    console.error("❌ Waitlist exception:", error)
    return {
      success: false,
      error: "Please try again or email us directly at hello@nexarax.com",
    }
  }
}
