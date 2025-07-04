"use server"

import { sendEmail, createContactEmailHTML, createWaitlistEmailHTML } from "@/lib/resend-client"

export async function handleContactForm(formData: FormData) {
  console.log("🚀 Professional contact form submission started")

  try {
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const company = formData.get("company") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    console.log("📝 Form data received:", { firstName, lastName, email, subject })

    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message) {
      console.error("❌ Missing required fields")
      return { success: false, error: "Please fill in all required fields" }
    }

    const emailData = {
      firstName,
      lastName,
      email,
      company,
      subject,
      message,
    }

    // Send notification to you
    console.log("📧 Sending notification email...")
    const notificationResult = await sendEmail({
      to: "hello@nexarax.com",
      subject: `Contact Form: ${subject}`,
      html: createContactEmailHTML(emailData),
    })

    console.log("📊 Notification email result:", notificationResult)

    // Send immediate customer confirmation email directly (instead of via API call)
    console.log("📧 Sending customer confirmation email directly...")
    try {
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

      console.log("📧 Customer confirmation result:", customerResult)

      if (!customerResult.success) {
        console.error("⚠️ Customer confirmation failed:", customerResult.error)
      }
    } catch (customerError) {
      console.error("⚠️ Customer confirmation error:", customerError)
    }

    if (notificationResult.success) {
      return {
        success: true,
        message: "Message sent successfully! You'll receive a confirmation email and we'll respond within 24 hours.",
        debug: {
          emailId: notificationResult.data?.id,
          timestamp: new Date().toISOString(),
          sequenceType: "professional-contact-direct",
        },
      }
    } else {
      console.error("❌ Email send failed:", notificationResult.error)
      return {
        success: false,
        error: notificationResult.error || "Failed to send message",
        debug: {
          details: notificationResult.details,
          timestamp: new Date().toISOString(),
        },
      }
    }
  } catch (error) {
    console.error("❌ Contact form error:", error)
    return {
      success: false,
      error: "Server error occurred",
      debug: {
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
    }
  }
}

export async function handleWaitlistSignup(formData: FormData) {
  console.log("🎯 Professional waitlist signup started")

  try {
    const email = formData.get("email") as string
    const name = formData.get("name") as string
    const source = (formData.get("source") as string) || "website"

    console.log("📝 Waitlist data:", { email, name, source })

    if (!email) {
      console.error("❌ Missing email")
      return { success: false, error: "Please enter your email address" }
    }

    if (!name) {
      console.error("❌ Missing name")
      return { success: false, error: "Please enter your name" }
    }

    // Send notification to you
    console.log("📧 Sending waitlist notification...")
    const notificationResult = await sendEmail({
      to: "hello@nexarax.com",
      subject: `🎉 New Waitlist Signup - ${email}`,
      html: createWaitlistEmailHTML({ email, source }),
    })

    console.log("📊 Notification email result:", notificationResult)

    // Send immediate customer welcome email directly (instead of via API call)
    console.log("🎉 Sending customer welcome email directly...")
    try {
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

      console.log("📧 Customer welcome result:", customerResult)

      if (!customerResult.success) {
        console.error("⚠️ Customer welcome failed:", customerResult.error)
      }
    } catch (customerError) {
      console.error("⚠️ Customer welcome error:", customerError)
    }

    if (notificationResult.success) {
      return {
        success: true,
        message:
          "Welcome to the waitlist! Check your email for a special welcome message and get ready for an amazing journey!",
        debug: {
          emailId: notificationResult.data?.id,
          timestamp: new Date().toISOString(),
          sequenceType: "professional-waitlist-direct",
        },
      }
    } else {
      console.error("❌ Waitlist email failed:", notificationResult.error)
      return {
        success: false,
        error: notificationResult.error || "Failed to join waitlist",
        debug: {
          details: notificationResult.details,
          timestamp: new Date().toISOString(),
        },
      }
    }
  } catch (error) {
    console.error("❌ Waitlist signup error:", error)
    return {
      success: false,
      error: "Server error occurred",
      debug: {
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
    }
  }
}
