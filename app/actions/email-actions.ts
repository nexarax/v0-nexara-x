"use server"

import { sendEmail, createContactEmailHTML, createWaitlistEmailHTML } from "@/lib/resend-client"

export async function handleContactForm(formData: FormData) {
  console.log("🚀 Contact form submission started")

  // Wrap everything in a try-catch to prevent any unhandled errors
  try {
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const company = formData.get("company") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    console.log("📝 Form data:", { firstName, lastName, email, subject })

    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message) {
      return { success: false, error: "Please fill in all required fields" }
    }

    // Track success of each operation
    let notificationSent = false
    let customerSent = false
    let notificationError = null
    let customerError = null

    // Send notification email (to you)
    try {
      console.log("📧 Sending notification email...")
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

      if (notificationResult.success) {
        notificationSent = true
        console.log("✅ Notification email sent successfully")
      } else {
        notificationError = notificationResult.error
        console.log("⚠️ Notification email failed:", notificationResult.error)
      }
    } catch (error) {
      notificationError = error instanceof Error ? error.message : "Unknown error"
      console.log("⚠️ Notification email exception:", notificationError)
    }

    // Send customer confirmation email
    try {
      console.log("📧 Sending customer confirmation...")

      // Import template safely
      let getContactConfirmationTemplate
      try {
        const templates = await import("@/lib/email-templates")
        getContactConfirmationTemplate = templates.getContactConfirmationTemplate
      } catch (importError) {
        console.log("⚠️ Template import failed:", importError)
        throw new Error("Template import failed")
      }

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

      if (customerResult.success) {
        customerSent = true
        console.log("✅ Customer confirmation sent successfully")
      } else {
        customerError = customerResult.error
        console.log("⚠️ Customer confirmation failed:", customerResult.error)
      }
    } catch (error) {
      customerError = error instanceof Error ? error.message : "Unknown error"
      console.log("⚠️ Customer confirmation exception:", customerError)
    }

    // Return success if at least one email was sent successfully
    if (notificationSent || customerSent) {
      console.log("🎉 Contact form completed successfully")
      return {
        success: true,
        message: "Message sent successfully! You'll receive a confirmation email and we'll respond within 24 hours.",
        debug: {
          notificationSent,
          customerSent,
          notificationError,
          customerError,
          timestamp: new Date().toISOString(),
        },
      }
    } else {
      console.log("❌ Both emails failed")
      return {
        success: false,
        error: "Failed to send message. Please try again or email us directly at hello@nexarax.com",
        debug: {
          notificationError,
          customerError,
        },
      }
    }
  } catch (error) {
    // Catch any unexpected errors
    console.error("❌ Unexpected contact form error:", error)
    return {
      success: false,
      error: "An error occurred. Please try again or contact us directly at hello@nexarax.com",
      debug: {
        unexpectedError: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
      },
    }
  }
}

export async function handleWaitlistSignup(formData: FormData) {
  console.log("🎯 Waitlist signup started")

  // Wrap everything in a try-catch to prevent any unhandled errors
  try {
    const email = formData.get("email") as string
    const name = formData.get("name") as string
    const source = (formData.get("source") as string) || "website"

    console.log("📝 Waitlist data:", { email, name, source })

    // Validate required fields
    if (!email) {
      return { success: false, error: "Please enter your email address" }
    }

    if (!name) {
      return { success: false, error: "Please enter your name" }
    }

    // Track success of each operation
    let notificationSent = false
    let customerSent = false
    let notificationError = null
    let customerError = null

    // Send notification email (to you)
    try {
      console.log("📧 Sending waitlist notification...")
      const notificationResult = await sendEmail({
        to: "hello@nexarax.com",
        subject: `🎉 New Waitlist Signup - ${email}`,
        html: createWaitlistEmailHTML({ email, source }),
      })

      if (notificationResult.success) {
        notificationSent = true
        console.log("✅ Waitlist notification sent successfully")
      } else {
        notificationError = notificationResult.error
        console.log("⚠️ Waitlist notification failed:", notificationResult.error)
      }
    } catch (error) {
      notificationError = error instanceof Error ? error.message : "Unknown error"
      console.log("⚠️ Waitlist notification exception:", notificationError)
    }

    // Send customer welcome email
    try {
      console.log("🎉 Sending customer welcome...")

      // Import template safely
      let getWaitlistWelcomeTemplate
      try {
        const templates = await import("@/lib/email-templates")
        getWaitlistWelcomeTemplate = templates.getWaitlistWelcomeTemplate
      } catch (importError) {
        console.log("⚠️ Template import failed:", importError)
        throw new Error("Template import failed")
      }

      const customerResult = await sendEmail({
        to: email,
        subject: "🎉 Welcome to NexaraX - You're In!",
        html: getWaitlistWelcomeTemplate({
          email,
          firstName: name,
        }),
        from: "NexaraX <noreply@updates.nexarax.com>",
      })

      if (customerResult.success) {
        customerSent = true
        console.log("✅ Customer welcome sent successfully")
      } else {
        customerError = customerResult.error
        console.log("⚠️ Customer welcome failed:", customerResult.error)
      }
    } catch (error) {
      customerError = error instanceof Error ? error.message : "Unknown error"
      console.log("⚠️ Customer welcome exception:", customerError)
    }

    // Return success if at least one email was sent successfully
    if (notificationSent || customerSent) {
      console.log("🎉 Waitlist signup completed successfully")
      return {
        success: true,
        message: "Welcome to the waitlist! Check your email for a special welcome message.",
        debug: {
          notificationSent,
          customerSent,
          notificationError,
          customerError,
          timestamp: new Date().toISOString(),
        },
      }
    } else {
      console.log("❌ Both emails failed")
      return {
        success: false,
        error: "Failed to join waitlist. Please try again or email us at hello@nexarax.com",
        debug: {
          notificationError,
          customerError,
        },
      }
    }
  } catch (error) {
    // Catch any unexpected errors
    console.error("❌ Unexpected waitlist error:", error)
    return {
      success: false,
      error: "An error occurred. Please try again or email us directly at hello@nexarax.com",
      debug: {
        unexpectedError: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
      },
    }
  }
}
