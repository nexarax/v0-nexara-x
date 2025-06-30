"use server"

export async function sendWaitlistEmail(formData: FormData) {
  const email = formData.get("email") as string
  const source = (formData.get("source") as string) || "homepage"

  try {
    // In production, you would use a service like Resend, SendGrid, or Nodemailer
    // For now, we'll simulate the email sending and log the details

    const emailData = {
      to: "hello@nexarax.com",
      subject: `New Waitlist Signup - ${email}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">🎉 New NexaraX Waitlist Signup!</h2>
          
          <div style="background: #F8FAFC; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1E293B;">Contact Details:</h3>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Source:</strong> ${source}</p>
            <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <div style="background: #EEF2FF; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #4338CA;">Next Steps:</h3>
            <ul style="color: #475569;">
              <li>Add ${email} to your email marketing list</li>
              <li>Send welcome email with early access details</li>
              <li>Track engagement for launch notifications</li>
            </ul>
          </div>
          
          <p style="color: #64748B; font-size: 14px; margin-top: 30px;">
            This email was automatically generated from the NexaraX waitlist form.
          </p>
        </div>
      `,
    }

    // Log the email data (in production, this would actually send the email)
    console.log("Waitlist Email Data:", emailData)

    // Simulate successful email sending
    await new Promise((resolve) => setTimeout(resolve, 500))

    return {
      success: true,
      message: "Successfully added to waitlist and notified team!",
    }
  } catch (error) {
    console.error("Email sending error:", error)
    return {
      success: false,
      message: "Failed to process signup. Please try again.",
    }
  }
}

export async function sendContactEmail(formData: FormData) {
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const email = formData.get("email") as string
  const company = formData.get("company") as string
  const subject = formData.get("subject") as string
  const message = formData.get("message") as string

  try {
    const emailData = {
      to: "hello@nexarax.com",
      subject: `Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">📞 New Contact Form Submission</h2>
          
          <div style="background: #F8FAFC; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1E293B;">Contact Details:</h3>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company || "Not provided"}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <div style="background: #FEF7F0; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #C2410C;">Message:</h3>
            <p style="white-space: pre-wrap; color: #475569;">${message}</p>
          </div>
          
          <div style="background: #EEF2FF; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #4338CA;">Recommended Response Time:</h3>
            <p style="color: #475569;">Reply within 24 hours for best customer experience</p>
          </div>
          
          <p style="color: #64748B; font-size: 14px; margin-top: 30px;">
            This email was automatically generated from the NexaraX contact form.
          </p>
        </div>
      `,
    }

    console.log("Contact Email Data:", emailData)
    await new Promise((resolve) => setTimeout(resolve, 500))

    return {
      success: true,
      message: "Message sent successfully! We'll get back to you within 24 hours.",
    }
  } catch (error) {
    console.error("Contact email error:", error)
    return {
      success: false,
      message: "Failed to send message. Please try again.",
    }
  }
}
