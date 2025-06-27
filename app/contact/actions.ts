"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function submitContactForm(formData: FormData) {
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const email = formData.get("email") as string
  const company = (formData.get("company") as string) || "Not specified"
  const subject = formData.get("subject") as string
  const message = formData.get("message") as string

  const fullName = `${firstName} ${lastName}`.trim()

  // Basic validation
  if (!firstName || !lastName || !email || !subject || !message) {
    throw new Error("All required fields must be filled")
  }

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "contact@nexarax.com",
      to: ["hello@nexarax.com"],
      subject: `[HOLDING PAGE] Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">New Contact Form Submission</h1>
            <p style="color: #e0e7ff; margin: 5px 0 0 0; font-size: 14px;">[FROM HOLDING PAGE]</p>
          </div>
          
          <div style="padding: 30px; background: #f8f9fa;">
            <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #333; margin-top: 0;">Contact Details</h2>
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #667eea;">Name:</strong>
                <p style="margin: 5px 0; color: #555;">${fullName}</p>
              </div>
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #667eea;">Email:</strong>
                <p style="margin: 5px 0; color: #555;">${email}</p>
              </div>

              <div style="margin-bottom: 15px;">
                <strong style="color: #667eea;">Company:</strong>
                <p style="margin: 5px 0; color: #555;">${company}</p>
              </div>
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #667eea;">Subject:</strong>
                <p style="margin: 5px 0; color: #555;">${subject}</p>
              </div>
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #667eea;">Message:</strong>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 4px; margin-top: 5px;">
                  <p style="margin: 0; color: #555; line-height: 1.6;">${message.replace(/\n/g, "<br>")}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
            <p>This email was sent from the NexaraX holding page contact form</p>
          </div>
        </div>
      `,
    })

    return {
      success: true,
      message: "Thank you! Your message has been sent successfully.",
    }
  } catch (error) {
    console.error("Email send error:", error)
    throw new Error("Sorry, there was an error sending your message. Please try again.")
  }
}
