import { Resend } from "resend"

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

// Email templates for NexaraX marketing campaigns
export const emailTemplates = {
  welcome: {
    subject: "🚀 Welcome to NexaraX - Your AI Social Media Empire Starts Now!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 0;">
        <div style="background: white; margin: 20px; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">🚀 Welcome to NexaraX!</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Your AI Social Media Empire Starts Now</p>
          </div>

          <!-- Main Content -->
          <div style="padding: 40px 30px;">
            <h2 style="color: #333; margin: 0 0 20px 0; font-size: 24px;">Hey {{firstName}},</h2>
            
            <p style="color: #555; line-height: 1.6; margin-bottom: 20px; font-size: 16px;">
              You just joined the AI revolution that's about to change everything. 
              <strong>NexaraX isn't just another tool - it's your personal AI empire builder.</strong>
            </p>

            <div style="background: #f8f9ff; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #667eea;">
              <h3 style="color: #667eea; margin: 0 0 15px 0; font-size: 18px;">🎯 What Happens Next:</h3>
              <ul style="color: #555; line-height: 1.8; margin: 0; padding-left: 20px;">
                <li><strong>AI creates all your content</strong> - Instagram, TikTok, Twitter, LinkedIn</li>
                <li><strong>Posts go live automatically</strong> - while you sleep, work, or relax</li>
                <li><strong>Your followers grow exponentially</strong> - AI knows what goes viral</li>
                <li><strong>You become the success story</strong> - that everyone wants to copy</li>
              </ul>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="https://nexarax.com/onboarding" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block;">
                🚀 Start Building Your Empire
              </a>
            </div>

            <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 25px 0; border: 1px solid #ffeaa7;">
              <h4 style="color: #856404; margin: 0 0 10px 0;">💡 Pro Tip from Jason (NexaraX Founder):</h4>
              <p style="color: #856404; margin: 0; font-style: italic;">
                "I built NexaraX because I was tired of spending hours creating content. Now my AI creates everything, 
                and I focus on what matters - building the business. You're about to experience the same freedom."
              </p>
            </div>

            <p style="color: #555; line-height: 1.6; margin-bottom: 30px;">
              Questions? Just reply to this email - I read every single one personally.
            </p>

            <p style="color: #555; margin: 0;">
              Welcome to the future,<br>
              <strong>Jason & The NexaraX Team</strong> 🚀
            </p>
          </div>

          <!-- Footer -->
          <div style="background: #f8f9fa; padding: 20px 30px; text-align: center; border-top: 1px solid #eee;">
            <p style="color: #666; margin: 0; font-size: 12px;">
              You're receiving this because you signed up for NexaraX. 
              <a href="{{unsubscribe_url}}" style="color: #667eea;">Unsubscribe</a>
            </p>
          </div>
        </div>
      </div>
    `,
  },

  onboarding_day2: {
    subject: "🔥 Your AI is Ready - See What It Created for You!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 26px;">🔥 Your AI Just Created This!</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Check out what NexaraX generated for your account</p>
        </div>
        
        <div style="padding: 30px; background: white;">
          <p style="color: #333; font-size: 16px; line-height: 1.6;">Hey {{firstName}},</p>
          
          <p style="color: #555; line-height: 1.6;">
            Your AI has been working overnight and created <strong>5 viral-ready posts</strong> for your social media accounts.
          </p>

          <div style="background: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <h3 style="color: #667eea; margin: 0 0 15px 0;">📊 Your AI's Performance:</h3>
            <div style="display: flex; justify-content: space-around; text-align: center;">
              <div>
                <div style="font-size: 24px; font-weight: bold; color: #667eea;">5</div>
                <div style="font-size: 12px; color: #666;">Posts Created</div>
              </div>
              <div>
                <div style="font-size: 24px; font-weight: bold; color: #667eea;">94%</div>
                <div style="font-size: 12px; color: #666;">Viral Score</div>
              </div>
              <div>
                <div style="font-size: 24px; font-weight: bold; color: #667eea;">2.3K</div>
                <div style="font-size: 12px; color: #666;">Est. Reach</div>
              </div>
            </div>
          </div>

          <div style="text-align: center; margin: 25px 0;">
            <a href="https://nexarax.com/dashboard" style="background: #667eea; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              👀 View Your AI-Generated Content
            </a>
          </div>

          <p style="color: #555; line-height: 1.6; font-size: 14px; margin-top: 30px;">
            P.S. This is just the beginning. Tomorrow your AI will create even better content as it learns your style.
          </p>
        </div>
      </div>
    `,
  },

  success_story: {
    subject: "🎉 {{firstName}} Just Hit {{milestone}} - Here's How They Did It",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px;">🎉 Success Story Alert!</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Another NexaraX user just crushed their goals</p>
        </div>
        
        <div style="padding: 30px; background: white;">
          <div style="background: #f0fdf4; padding: 25px; border-radius: 8px; border-left: 4px solid #10b981; margin-bottom: 25px;">
            <h2 style="color: #059669; margin: 0 0 15px 0;">"{{testimonial}}"</h2>
            <p style="color: #374151; margin: 0; font-style: italic;">- {{customerName}}, {{customerTitle}}</p>
          </div>

          <h3 style="color: #333; margin: 0 0 15px 0;">📈 Their Results:</h3>
          <ul style="color: #555; line-height: 1.8; margin-bottom: 25px;">
            <li><strong>{{metric1}}</strong> in just {{timeframe}}</li>
            <li><strong>{{metric2}}</strong> with zero manual posting</li>
            <li><strong>{{metric3}}</strong> using AI-generated content</li>
          </ul>

          <div style="background: #fffbeb; padding: 20px; border-radius: 8px; margin: 25px 0; border: 1px solid #fbbf24;">
            <h4 style="color: #92400e; margin: 0 0 10px 0;">💡 Want the same results?</h4>
            <p style="color: #92400e; margin: 0;">
              Join {{customerName}} and thousands of others who are building their empires with NexaraX AI.
            </p>
          </div>

          <div style="text-align: center; margin: 25px 0;">
            <a href="https://nexarax.com/signup" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
              🚀 Start Your Success Story
            </a>
          </div>
        </div>
      </div>
    `,
  },
}

// Email campaign sequences
export const emailSequences = {
  onboarding: [
    { day: 0, template: "welcome", trigger: "signup" },
    { day: 1, template: "onboarding_day2", trigger: "time_delay" },
    { day: 3, template: "first_results", trigger: "time_delay" },
    { day: 7, template: "weekly_summary", trigger: "time_delay" },
    { day: 14, template: "upgrade_prompt", trigger: "time_delay" },
  ],

  success_stories: [
    { trigger: "milestone_reached", template: "success_story" },
    { trigger: "viral_post", template: "viral_celebration" },
    { trigger: "follower_growth", template: "growth_story" },
  ],
}

// Send marketing email function
export async function sendMarketingEmail(
  to: string,
  templateKey: keyof typeof emailTemplates,
  variables: Record<string, string> = {},
) {
  // Check if Resend is configured
  if (!resend) {
    console.warn("Resend API key not configured - email sending disabled")
    return { success: false, error: "Email service not configured" }
  }

  const template = emailTemplates[templateKey]

  // Replace variables in template
  let htmlContent = template.html
  let subject = template.subject

  Object.entries(variables).forEach(([key, value]) => {
    const placeholder = `{{${key}}}`
    htmlContent = htmlContent.replace(new RegExp(placeholder, "g"), value)
    subject = subject.replace(new RegExp(placeholder, "g"), value)
  })

  try {
    const result = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "jason@nexarax.com",
      to: [to],
      subject,
      html: htmlContent,
    })

    return { success: true, messageId: result.data?.id }
  } catch (error) {
    console.error("Email send error:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

// Bulk email campaign function
export async function sendBulkCampaign(
  recipients: Array<{ email: string; variables: Record<string, string> }>,
  templateKey: keyof typeof emailTemplates,
) {
  const results = []

  for (const recipient of recipients) {
    const result = await sendMarketingEmail(recipient.email, templateKey, recipient.variables)

    results.push({
      email: recipient.email,
      ...result,
    })

    // Rate limiting - wait 100ms between emails
    await new Promise((resolve) => setTimeout(resolve, 100))
  }

  return results
}
