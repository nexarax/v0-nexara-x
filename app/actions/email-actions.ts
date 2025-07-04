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
  console.log("🔍 CONTACT FORM: Environment check - RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY)

  try {
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const company = formData.get("company") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    console.log("📝 CONTACT FORM: Form data extracted:", {
      firstName,
      lastName,
      email,
      subject,
      hasCompany: !!company,
      messageLength: message?.length || 0,
    })

    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message) {
      console.log("❌ CONTACT FORM: Missing required fields")
      return {
        success: false,
        error: "Please fill in all required fields",
        debug: { firstName: !!firstName, lastName: !!lastName, email: !!email, subject: !!subject, message: !!message },
      }
    }

    // Send notification email (to you) - this is the critical one
    console.log("📧 CONTACT FORM: Attempting to send notification email...")

    let notificationResult: SendEmailResult
    try {
      notificationResult = await sendEmail({
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
      console.log("📊 CONTACT FORM: Notification email result:", notificationResult)
    } catch (notificationError) {
      console.error("❌ CONTACT FORM: Notification email threw exception:", notificationError)
      return {
        success: false,
        error: "Failed to send notification email",
        debug: {
          notificationError: notificationError instanceof Error ? notificationError.message : "Unknown error",
          step: "notification-email",
        },
      }
    }

    // Send customer confirmation (secondary)
    console.log("📧 CONTACT FORM: Attempting customer confirmation...")
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

      console.log("📊 CONTACT FORM: Customer confirmation result:", customerResult)
    } catch (customerError) {
      console.log("⚠️ CONTACT FORM: Customer confirmation failed:", customerError)
      customerResult = {
        success: false,
        error: customerError instanceof Error ? customerError.message : "Customer email failed",
      }
    }

    // SUCCESS CRITERIA: If notification email was sent, consider it a success
    console.log("🎯 CONTACT FORM: Evaluating success criteria...")
    console.log("🎯 CONTACT FORM: Notification success:", notificationResult.success)
    console.log("🎯 CONTACT FORM: Customer success:", customerResult.success)

    if (notificationResult.success) {
      console.log("✅ CONTACT FORM: SUCCESS - Notification email sent successfully")
      return {
        success: true,
        message: "Message sent successfully! You'll receive a confirmation email and we'll respond within 24 hours.",
        debug: {
          notificationSent: notificationResult.success,
          customerSent: customerResult.success,
          timestamp: new Date().toISOString(),
          notificationData: notificationResult.data,
          customerData: customerResult.data,
        },
      }
    } else {
      console.log("❌ CONTACT FORM: FAILED - Notification email failed")
      console.log("❌ CONTACT FORM: Notification error:", notificationResult.error)
      return {
        success: false,
        error: "Failed to send message. Please try again or email us directly at hello@nexarax.com",
        debug: {
          notificationError: notificationResult.error,
          customerError: customerResult.error,
          notificationDetails: notificationResult.details,
          step: "notification-failed",
        },
      }
    }
  } catch (error) {
    console.error("❌ CONTACT FORM: Top-level exception:", error)
    return {
      success: false,
      error: "Please try again or email us directly at hello@nexarax.com",
      debug: {
        topLevelError: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
      },
    }
  }
}

export async function handleWaitlistSignup(formData: FormData): Promise<ActionResult> {
  console.log("🎯 WAITLIST: Starting signup")
  console.log("🔍 WAITLIST: Environment check - RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY)

  try {
    const email = formData.get("email") as string
    const name = formData.get("name") as string
    const source = (formData.get("source") as string) || "website"

    console.log("📝 WAITLIST: Form data extracted:", { email, name, source })

    // Validate required fields
    if (!email) {
      console.log("❌ WAITLIST: Missing email")
      return { success: false, error: "Please enter your email address" }
    }

    if (!name) {
      console.log("❌ WAITLIST: Missing name")
      return { success: false, error: "Please enter your name" }
    }

    // Send notification email (to you) - this is the critical one
    console.log("📧 WAITLIST: Attempting to send notification email...")

    let notificationResult: SendEmailResult
    try {
      notificationResult = await sendEmail({
        to: "hello@nexarax.com",
        subject: `🎉 New Waitlist Signup - ${email}`,
        html: createWaitlistEmailHTML({ email, source }),
      })
      console.log("📊 WAITLIST: Notification email result:", notificationResult)
    } catch (notificationError) {
      console.error("❌ WAITLIST: Notification email threw exception:", notificationError)
      return {
        success: false,
        error: "Failed to join waitlist",
        debug: {
          notificationError: notificationError instanceof Error ? notificationError.message : "Unknown error",
          step: "notification-email",
        },
      }
    }

    // Send customer welcome (secondary)
    console.log("🎉 WAITLIST: Attempting customer welcome...")
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

      console.log("📊 WAITLIST: Customer welcome result:", customerResult)
    } catch (customerError) {
      console.log("⚠️ WAITLIST: Customer welcome failed:", customerError)
      customerResult = {
        success: false,
        error: customerError instanceof Error ? customerError.message : "Customer email failed",
      }
    }

    // SUCCESS CRITERIA: If notification email was sent, consider it a success
    console.log("🎯 WAITLIST: Evaluating success criteria...")
    console.log("🎯 WAITLIST: Notification success:", notificationResult.success)
    console.log("🎯 WAITLIST: Customer success:", customerResult.success)

    if (notificationResult.success) {
      console.log("✅ WAITLIST: SUCCESS - Notification email sent successfully")
      return {
        success: true,
        message: "Welcome to the waitlist! Check your email for a special welcome message.",
        debug: {
          notificationSent: notificationResult.success,
          customerSent: customerResult.success,
          timestamp: new Date().toISOString(),
          notificationData: notificationResult.data,
          customerData: customerResult.data,
        },
      }
    } else {
      console.log("❌ WAITLIST: FAILED - Notification email failed")
      console.log("❌ WAITLIST: Notification error:", notificationResult.error)
      return {
        success: false,
        error: "Failed to join waitlist. Please try again or email us at hello@nexarax.com",
        debug: {
          notificationError: notificationResult.error,
          customerError: customerResult.error,
          notificationDetails: notificationResult.details,
          step: "notification-failed",
        },
      }
    }
  } catch (error) {
    console.error("❌ WAITLIST: Top-level exception:", error)
    return {
      success: false,
      error: "Please try again or email us directly at hello@nexarax.com",
      debug: {
        topLevelError: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
      },
    }
  }
}
