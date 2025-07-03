"use server"

import { sendEmail, createContactEmailHTML, createWaitlistEmailHTML } from "@/lib/resend-client"

export async function handleContactForm(formData: FormData) {
  console.log("🚀 Contact form submission started")

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

    // Trigger automated sequence for the user
    console.log("🔄 Triggering contact sequence...")
    try {
      await fetch(`${process.env.VERCEL_URL || "http://localhost:3000"}/api/email-sequence`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          subject,
        }),
      })
    } catch (sequenceError) {
      console.error("⚠️ Sequence trigger failed:", sequenceError)
      // Don't fail the main form submission if sequence fails
    }

    console.log("📊 Email send result:", notificationResult)

    if (notificationResult.success) {
      return {
        success: true,
        message: "Message sent successfully! We'll get back to you within 24 hours.",
        debug: {
          emailId: notificationResult.data?.id,
          timestamp: new Date().toISOString(),
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
  console.log("🎯 Waitlist signup started")

  try {
    const email = formData.get("email") as string
    const source = (formData.get("source") as string) || "website"

    console.log("📝 Waitlist data:", { email, source })

    if (!email) {
      console.error("❌ Missing email")
      return { success: false, error: "Please enter your email address" }
    }

    // Send notification to you
    console.log("📧 Sending waitlist notification...")
    const notificationResult = await sendEmail({
      to: "hello@nexarax.com",
      subject: `🎉 New Waitlist Signup - ${email}`,
      html: createWaitlistEmailHTML({ email, source }),
    })

    // Trigger automated sequence for the user
    console.log("🔄 Triggering waitlist sequence...")
    try {
      await fetch(`${process.env.VERCEL_URL || "http://localhost:3000"}/api/email-sequence`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source,
          firstName: email.split("@")[0], // Extract name from email as fallback
        }),
      })
    } catch (sequenceError) {
      console.error("⚠️ Sequence trigger failed:", sequenceError)
      // Don't fail the main form submission if sequence fails
    }

    console.log("📊 Waitlist email result:", notificationResult)

    if (notificationResult.success) {
      return {
        success: true,
        message: "Welcome to the waitlist! Check your email for a special welcome message.",
        debug: {
          emailId: notificationResult.data?.id,
          timestamp: new Date().toISOString(),
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
