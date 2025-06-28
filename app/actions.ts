"use server"

import { Resend } from "resend"

// Initialize Resend with proper error handling
let resend: Resend | null = null

try {
  if (process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY)
  }
} catch (error) {
  console.error("Failed to initialize Resend:", error)
}

export async function submitWaitlistForm(formData: FormData) {
  const email = formData.get("email") as string

  if (!email) {
    return {
      success: false,
      message: "Please enter your email address.",
    }
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: "Please enter a valid email address.",
    }
  }

  try {
    // If Resend is not available, just log and return success
    if (!resend || !process.env.RESEND_API_KEY) {
      console.log("Waitlist signup (no email service):", { email, timestamp: new Date().toISOString() })
      return {
        success: true,
        message: "Thanks for joining our waitlist! We'll notify you when we launch.",
      }
    }

    // Send notification to your team
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "NexaraX Waitlist <noreply@nexarax.com>",
      to: ["hello@nexarax.com"],
      subject: "New Waitlist Signup",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Waitlist Signup</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        </div>
      `,
    })

    // Send welcome email to user
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "NexaraX <hello@nexarax.com>",
      to: [email],
      subject: "Welcome to the NexaraX Waitlist!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; padding: 40px 20px;">
            <h1 style="color: #2563eb; margin-bottom: 20px;">Welcome to NexaraX!</h1>
            <p style="font-size: 18px; color: #374151; margin-bottom: 30px;">
              Thanks for joining our waitlist! You're now part of an exclusive group that will get early access to our AI-powered social media platform.
            </p>
            
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 30px 0;">
              <h3 style="margin: 0 0 10px 0; color: #374151;">What's Next?</h3>
              <ul style="text-align: left; color: #6b7280; margin: 0; padding-left: 20px;">
                <li>We'll send you updates as we get closer to launch</li>
                <li>You'll get early access before the general public</li>
                <li>Special launch pricing just for waitlist members</li>
              </ul>
            </div>
            
            <p style="color: #6b7280;">
              Have questions? Feel free to reply to this email or contact us anytime.
            </p>
            
            <p style="color: #6b7280; font-size: 14px; margin-top: 40px;">
              Best regards,<br>
              The NexaraX Team
            </p>
          </div>
        </div>
      `,
    })

    return {
      success: true,
      message: "Thanks for joining our waitlist! Check your email for confirmation.",
    }
  } catch (error) {
    console.error("Failed to process waitlist signup:", error)
    return {
      success: false,
      message: "Failed to join waitlist. Please try again or email us directly at hello@nexarax.com.",
    }
  }
}
