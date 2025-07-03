export interface EmailSequenceData {
  email: string
  firstName?: string
  lastName?: string
  source: string
  timestamp: Date
}

export const WAITLIST_SEQUENCE = [
  {
    delay: 0, // Immediate
    subject: "🎉 Welcome to NexaraX - You're In!",
    template: "waitlist-welcome",
  },
  {
    delay: 3 * 24 * 60 * 60, // 3 days in seconds
    subject: "🚀 Behind the Scenes: Building the Future of Social Media",
    template: "waitlist-behind-scenes",
  },
  {
    delay: 7 * 24 * 60 * 60, // 7 days
    subject: "👀 Sneak Peek: AI Features That Will Blow Your Mind",
    template: "waitlist-feature-preview",
  },
  {
    delay: 14 * 24 * 60 * 60, // 14 days
    subject: "🌟 Join 1,000+ Creators Already Waiting",
    template: "waitlist-social-proof",
  },
  {
    delay: 21 * 24 * 60 * 60, // 21 days
    subject: "⏰ Final Countdown: Early Access Starting Soon",
    template: "waitlist-final-countdown",
  },
]

export const CONTACT_SEQUENCE = [
  {
    delay: 0, // Immediate
    subject: "✅ Message Received - We'll Respond Within 24 Hours",
    template: "contact-confirmation",
  },
  {
    delay: 24 * 60 * 60, // 1 day
    subject: "📋 Your NexaraX Inquiry: Next Steps",
    template: "contact-follow-up",
  },
  {
    delay: 7 * 24 * 60 * 60, // 7 days
    subject: "🤝 How Can We Better Serve You?",
    template: "contact-check-in",
  },
]
