interface EmailData {
  to: string
  subject: string
  html: string
  from?: string
}

export async function sendEmail(emailData: EmailData) {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    console.error("RESEND_API_KEY is not set")
    return { success: false, error: "Email service not configured" }
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: emailData.from || "NexaraX <noreply@resend.dev>", // Use resend.dev for testing
        to: [emailData.to],
        subject: emailData.subject,
        html: emailData.html,
      }),
    })

    const result = await response.json()

    if (response.ok) {
      return { success: true, data: result }
    } else {
      console.error("Resend API error:", result)
      return { success: false, error: result.message || "Failed to send email" }
    }
  } catch (error) {
    console.error("Email sending error:", error)
    return { success: false, error: "Network error" }
  }
}

export function createContactEmailHTML(data: {
  firstName: string
  lastName: string
  email: string
  company?: string
  subject: string
  message: string
}) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Contact Form Submission</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f8fafc; padding: 20px; border-radius: 0 0 8px 8px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #475569; }
        .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; border-left: 4px solid #3b82f6; }
        .footer { text-align: center; margin-top: 20px; color: #64748b; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚀 New Contact Form Submission</h1>
          <p>Someone reached out through your NexaraX website!</p>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">👤 Name:</div>
            <div class="value">${data.firstName} ${data.lastName}</div>
          </div>
          <div class="field">
            <div class="label">📧 Email:</div>
            <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
          </div>
          ${
            data.company
              ? `
          <div class="field">
            <div class="label">🏢 Company:</div>
            <div class="value">${data.company}</div>
          </div>
          `
              : ""
          }
          <div class="field">
            <div class="label">📝 Subject:</div>
            <div class="value">${data.subject}</div>
          </div>
          <div class="field">
            <div class="label">💬 Message:</div>
            <div class="value">${data.message.replace(/\n/g, "<br>")}</div>
          </div>
        </div>
        <div class="footer">
          <p>Sent from NexaraX Contact Form • ${new Date().toLocaleString()}</p>
        </div>
      </div>
    </body>
    </html>
  `
}

export function createWaitlistEmailHTML(data: {
  email: string
  source: string
}) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Waitlist Signup</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #10b981, #3b82f6); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
        .content { background: #f0fdf4; padding: 20px; border-radius: 0 0 8px 8px; }
        .highlight { background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981; margin: 15px 0; }
        .footer { text-align: center; margin-top: 20px; color: #64748b; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 New Waitlist Signup!</h1>
          <p>Someone just joined your NexaraX waitlist</p>
        </div>
        <div class="content">
          <div class="highlight">
            <p><strong>📧 Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
            <p><strong>📍 Source:</strong> ${data.source}</p>
            <p><strong>🕒 Date:</strong> ${new Date().toLocaleString()}</p>
          </div>
          <p>🚀 Your waitlist is growing! Make sure to follow up with this potential customer.</p>
        </div>
        <div class="footer">
          <p>Sent from NexaraX Waitlist System</p>
        </div>
      </div>
    </body>
    </html>
  `
}
