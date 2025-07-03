import { serve } from "@upstash/workflow/nextjs"
import { sendEmail } from "@/lib/resend-client"
import {
  getWaitlistWelcomeTemplate,
  getWaitlistBehindScenesTemplate,
  getContactConfirmationTemplate,
} from "@/lib/email-templates"

interface WaitlistSequenceData {
  email: string
  firstName?: string
  source: string
}

interface ContactSequenceData {
  firstName: string
  lastName: string
  email: string
  subject: string
}

export const { POST } = serve<WaitlistSequenceData | ContactSequenceData>(async (context) => {
  const data = context.requestPayload

  // Determine sequence type
  if ("subject" in data) {
    // Contact sequence
    const contactData = data as ContactSequenceData

    // Step 1: Immediate confirmation
    await context.run("send-contact-confirmation", async () => {
      await sendEmail({
        to: contactData.email,
        subject: "✅ Message Received - We'll Respond Within 24 Hours",
        html: getContactConfirmationTemplate(contactData),
        from: "NexaraX <noreply@updates.nexarax.com>",
      })
    })

    // Step 2: Wait 24 hours, then send follow-up
    await context.sleep("wait-24-hours", 24 * 60 * 60)

    await context.run("send-contact-followup", async () => {
      await sendEmail({
        to: contactData.email,
        subject: "📋 Your NexaraX Inquiry: Next Steps",
        html: `
          <h2>Hi ${contactData.firstName}!</h2>
          <p>Following up on your inquiry about "${contactData.subject}".</p>
          <p>Our team has reviewed your message and we'd love to discuss how NexaraX can help you achieve your social media goals.</p>
          <p>Would you be available for a 15-minute call this week?</p>
          <p>Best regards,<br>The NexaraX Team</p>
        `,
        from: "NexaraX <hello@nexarax.com>",
      })
    })
  } else {
    // Waitlist sequence
    const waitlistData = data as WaitlistSequenceData

    // Step 1: Immediate welcome
    await context.run("send-welcome-email", async () => {
      await sendEmail({
        to: waitlistData.email,
        subject: "🎉 Welcome to NexaraX - You're In!",
        html: getWaitlistWelcomeTemplate(waitlistData),
        from: "NexaraX <noreply@updates.nexarax.com>",
      })
    })

    // Step 2: Wait 3 days, then send behind-the-scenes
    await context.sleep("wait-3-days", 3 * 24 * 60 * 60)

    await context.run("send-behind-scenes", async () => {
      await sendEmail({
        to: waitlistData.email,
        subject: "🚀 Behind the Scenes: Building the Future of Social Media",
        html: getWaitlistBehindScenesTemplate(waitlistData),
        from: "NexaraX <noreply@updates.nexarax.com>",
      })
    })

    // Step 3: Wait 4 more days (7 total), then send feature preview
    await context.sleep("wait-4-more-days", 4 * 24 * 60 * 60)

    await context.run("send-feature-preview", async () => {
      await sendEmail({
        to: waitlistData.email,
        subject: "👀 Sneak Peek: AI Features That Will Blow Your Mind",
        html: `
          <h2>Exclusive Preview for ${waitlistData.firstName || "You"}! 🎬</h2>
          <p>Ready to see NexaraX in action? Here's what our AI can do:</p>
          <ul>
            <li>🎨 Generate 10 unique posts in 30 seconds</li>
            <li>📈 Predict which content will go viral with 89% accuracy</li>
            <li>🤖 Respond to comments in your brand voice automatically</li>
            <li>📊 Analyze competitor strategies and suggest improvements</li>
          </ul>
          <p>Beta testing starts next week - you're on the priority list!</p>
        `,
        from: "NexaraX <noreply@updates.nexarax.com>",
      })
    })

    // Continue with more emails...
  }
})
