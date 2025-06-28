"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function submitWaitlistEmail(email: string) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.log("Waitlist signup:", email)
      return { success: true, message: "Added to waitlist!" }
    }

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "waitlist@nexarax.com",
      to: ["hello@nexarax.com"],
      subject: "New Waitlist Signup - NexaraX",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">New Waitlist Signup!</h1>
          </div>
          
          <div style="padding: 30px; background: #f8f9fa;">
            <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #333; margin-top: 0;">Waitlist Details</h2>
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #667eea;">Email:</strong>
                <p style="margin: 5px 0; color: #555;">${email}</p>
              </div>
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #667eea;">Signed up:</strong>
                <p style="margin: 5px 0; color: #555;">${new Date().toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
            <p>This email was sent from the NexaraX waitlist signup</p>
          </div>
        </div>
      `,
    })

    return { success: true, message: "Added to waitlist!" }
  } catch (error) {
    console.error("Failed to send waitlist email:", error)
    return { success: true, message: "Added to waitlist!" }
  }
}
