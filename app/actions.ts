"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function submitWaitlistEmail(email: string) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.log("Waitlist signup:", email)
      return { success: true, message: "Successfully joined waitlist!" }
    }

    // Send notification email to you
    await resend.emails.send({
      from: "NexaraX <noreply@nexarax.com>",
      to: ["hello@nexarax.com"],
      subject: "New Waitlist Signup - NexaraX",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Waitlist Signup!</h2>
          <p>Someone just joined the NexaraX waitlist:</p>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          </div>
          <p>Total waitlist signups are growing! 🚀</p>
        </div>
      `,
    })

    // Send welcome email to the user
    await resend.emails.send({
      from: "NexaraX <hello@nexarax.com>",
      to: [email],
      subject: "Welcome to the NexaraX Waitlist! 🚀",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; padding: 40px 20px;">
            <h1 style="color: #2563eb; margin-bottom: 20px;">Welcome to NexaraX!</h1>
            <p style="font-size: 18px; color: #374151; margin-bottom: 30px;">
              Thanks for joining our waitlist! You're now part of an exclusive group who will be first to experience the future of AI-powered content creation.
            </p>
            
            <div style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); padding: 30px; border-radius: 12px; color: white; margin: 30px 0;">
              <h2 style="margin: 0 0 15px 0;">What's Coming:</h2>
              <ul style="text-align: left; padding-left: 20px;">
                <li>AI-powered image generation</li>
                <li>Automated video creation</li>
                <li>Multi-platform content publishing</li>
                <li>Smart scheduling and analytics</li>
              </ul>
            </div>
            
            <p style="color: #6b7280;">
              We're putting the finishing touches on NexaraX and will notify you the moment we launch!
            </p>
            
            <p style="color: #6b7280; font-size: 14px; margin-top: 40px;">
              Questions? Just reply to this email - we'd love to hear from you!<br>
              The NexaraX Team
            </p>
          </div>
        </div>
      `,
    })

    return { success: true, message: "Successfully joined waitlist!" }
  } catch (error) {
    console.error("Failed to send waitlist email:", error)
    return { success: false, message: "Failed to join waitlist. Please try again." }
  }
}
