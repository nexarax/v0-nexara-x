export function getWaitlistWelcomeTemplate(data: { email: string; firstName?: string }) {
  const name = data.firstName && data.firstName !== "test" ? data.firstName : "there"

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Welcome to NexaraX!</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { 
          background: linear-gradient(135deg, #3b82f6, #8b5cf6); 
          color: white; 
          padding: 30px 20px; 
          border-radius: 12px 12px 0 0;
          text-align: center;
        }
        .logo { font-size: 28px; font-weight: bold; margin-bottom: 10px; }
        .content { background: #f8fafc; padding: 30px 20px; border-radius: 0 0 12px 12px; }
        .welcome-box { 
          background: white; 
          padding: 25px; 
          border-radius: 8px; 
          border-left: 4px solid #10b981; 
          margin: 20px 0; 
        }
        .benefits { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .benefit-item { 
          display: flex; 
          align-items: center; 
          margin: 15px 0; 
          padding: 10px;
          background: #f0fdf4;
          border-radius: 6px;
        }
        .checkmark { color: #10b981; font-weight: bold; margin-right: 10px; font-size: 18px; }
        .cta-button {
          display: inline-block;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: white;
          padding: 15px 30px;
          text-decoration: none;
          border-radius: 8px;
          font-weight: bold;
          margin: 20px 0;
        }
        .footer { 
          text-align: center; 
          margin-top: 30px; 
          color: #64748b; 
          font-size: 14px; 
        }
        .social-links { margin: 20px 0; }
        .social-links a { 
          display: inline-block; 
          margin: 0 10px; 
          color: #3b82f6; 
          text-decoration: none; 
        }
        .debug { 
          background: #f1f5f9; 
          padding: 10px; 
          border-radius: 4px; 
          font-size: 12px; 
          color: #64748b; 
          margin: 10px 0; 
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">⚡ NexaraX</div>
          <h1>Welcome to the Future!</h1>
          <p>You're now part of something revolutionary</p>
        </div>
        <div class="content">
          <div class="welcome-box">
            <h2>🎉 Hey ${name}!</h2>
            <p>Thank you for joining the NexaraX waitlist! You're now part of an exclusive group of forward-thinking creators and businesses who are ready to revolutionize their social media presence.</p>
            <p><strong>Your spot is secured:</strong> #${Math.floor(Math.random() * 1000) + 1}</p>
          </div>

          <div class="benefits">
            <h3>🚀 What You Get as an Early Member:</h3>
            <div class="benefit-item">
              <span class="checkmark">✅</span>
              <span><strong>Early Access:</strong> Be first to try our AI-powered platform</span>
            </div>
            <div class="benefit-item">
              <span class="checkmark">✅</span>
              <span><strong>Special Pricing:</strong> 50% off your first 3 months</span>
            </div>
            <div class="benefit-item">
              <span class="checkmark">✅</span>
              <span><strong>Exclusive Updates:</strong> Behind-the-scenes development insights</span>
            </div>
            <div class="benefit-item">
              <span class="checkmark">✅</span>
              <span><strong>VIP Support:</strong> Direct line to our founding team</span>
            </div>
            <div class="benefit-item">
              <span class="checkmark">✅</span>
              <span><strong>Feature Influence:</strong> Help shape the platform's future</span>
            </div>
          </div>

          <div style="text-align: center;">
            <a href="https://nexarax.com" class="cta-button">
              🌟 Visit NexaraX
            </a>
          </div>

          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>📅 What's Next?</h3>
            <p><strong>Over the next few weeks, you'll receive:</strong></p>
            <ul>
              <li>🎬 Behind-the-scenes development updates</li>
              <li>🔮 Sneak peeks of AI features in action</li>
              <li>📊 Early beta testing opportunities</li>
              <li>🎁 Exclusive launch day surprises</li>
            </ul>
          </div>

          <div class="social-links">
            <p><strong>Stay Connected:</strong></p>
            <a href="https://instagram.com/nexarax_official" target="_blank">📱 Instagram</a>
            <a href="https://tiktok.com/@nexarax.ai" target="_blank">🎵 TikTok</a>
            <a href="https://x.com/NexaraX" target="_blank">🐦 X (Twitter)</a>
          </div>

          <div class="debug">
            <strong>🔧 Debug Info:</strong><br>
            Email: ${data.email}<br>
            Name: ${name}<br>
            Sent: ${new Date().toISOString()}<br>
            Template: waitlist-welcome-v1
          </div>
        </div>
        <div class="footer">
          <p>🚀 <strong>NexaraX</strong> - AI-Powered Social Media Revolution</p>
          <p>You're receiving this because you joined our waitlist at nexarax.com</p>
          <p><a href="#" style="color: #64748b;">Unsubscribe</a> | <a href="#" style="color: #64748b;">Update Preferences</a></p>
        </div>
      </div>
    </body>
    </html>
  `
}

export function getWaitlistBehindScenesTemplate(data: { email: string; firstName?: string }) {
  const name = data.firstName && data.firstName !== "test" ? data.firstName : "there"

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Behind the Scenes at NexaraX</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { 
          background: linear-gradient(135deg, #10b981, #3b82f6); 
          color: white; 
          padding: 30px 20px; 
          border-radius: 12px 12px 0 0;
          text-align: center;
        }
        .logo { font-size: 28px; font-weight: bold; margin-bottom: 10px; }
        .content { background: #f8fafc; padding: 30px 20px; border-radius: 0 0 12px 12px; }
        .story-box { 
          background: white; 
          padding: 25px; 
          border-radius: 8px; 
          margin: 20px 0; 
        }
        .founder-quote {
          background: linear-gradient(135deg, #fef3c7, #fde68a);
          padding: 20px;
          border-radius: 8px;
          border-left: 4px solid #f59e0b;
          margin: 20px 0;
          font-style: italic;
        }
        .progress-item {
          background: white;
          padding: 15px;
          border-radius: 6px;
          margin: 10px 0;
          border-left: 4px solid #3b82f6;
        }
        .footer { 
          text-align: center; 
          margin-top: 30px; 
          color: #64748b; 
          font-size: 14px; 
        }
        .debug { 
          background: #f1f5f9; 
          padding: 10px; 
          border-radius: 4px; 
          font-size: 12px; 
          color: #64748b; 
          margin: 10px 0; 
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">⚡ NexaraX</div>
          <h1>🚀 Behind the Scenes</h1>
          <p>The story of building the future</p>
        </div>
        <div class="content">
          <div class="story-box">
            <h2>Hey ${name}! 👋</h2>
            <p>It's been 3 days since you joined our waitlist, and I wanted to share something special with you - the real story behind NexaraX.</p>
          </div>

          <div class="founder-quote">
            <p><strong>"The idea for NexaraX came to me at 2 AM while struggling with my own social media strategy. I thought: 'What if AI could not just create content, but predict what would actually work?' That night, I started coding the first prototype."</strong></p>
            <p style="text-align: right; margin-top: 15px;">— Founder, NexaraX</p>
          </div>

          <div class="story-box">
            <h3>🛠️ Development Progress:</h3>
            <div class="progress-item">
              <strong>✅ AI Content Engine:</strong> 95% complete - Creating human-like posts, captions, and hashtags
            </div>
            <div class="progress-item">
              <strong>🔄 Predictive Analytics:</strong> 80% complete - Forecasting viral potential and optimal timing
            </div>
            <div class="progress-item">
              <strong>🤖 Smart Automation:</strong> 70% complete - Intelligent responses and engagement strategies
            </div>
            <div class="progress-item">
              <strong>📊 Audience Insights:</strong> 85% complete - Deep behavioral analysis and recommendations
            </div>
          </div>

          <div class="story-box">
            <h3>🎯 Why This Matters:</h3>
            <p>We're not just building another social media tool. We're creating an AI assistant that understands your brand, learns from your audience, and evolves with your business.</p>
            <p><strong>The result?</strong> Content that doesn't just look good - it performs.</p>
          </div>

          <div style="background: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>📈 Early Results from Beta Testing:</h3>
            <ul>
              <li>🚀 <strong>340% increase</strong> in engagement rates</li>
              <li>⏰ <strong>15 hours saved</strong> per week on content creation</li>
              <li>📊 <strong>89% accuracy</strong> in viral content prediction</li>
              <li>💰 <strong>250% ROI improvement</strong> on social media spend</li>
            </ul>
          </div>

          <div class="debug">
            <strong>🔧 Debug Info:</strong><br>
            Email: ${data.email}<br>
            Name: ${name}<br>
            Sent: ${new Date().toISOString()}<br>
            Template: waitlist-behind-scenes-v1<br>
            Trigger: Cron job (3 days after signup)
          </div>
        </div>
        <div class="footer">
          <p>🚀 <strong>NexaraX</strong> - AI-Powered Social Media Revolution</p>
          <p>More updates coming soon! Stay tuned for feature previews.</p>
          <p><a href="#" style="color: #64748b;">Unsubscribe</a> | <a href="#" style="color: #64748b;">Update Preferences</a></p>
        </div>
      </div>
    </body>
    </html>
  `
}

export function getContactConfirmationTemplate(data: {
  firstName: string
  lastName: string
  email: string
  subject: string
}) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Message Received - NexaraX</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { 
          background: linear-gradient(135deg, #3b82f6, #8b5cf6); 
          color: white; 
          padding: 30px 20px; 
          border-radius: 12px 12px 0 0;
          text-align: center;
        }
        .logo { font-size: 28px; font-weight: bold; margin-bottom: 10px; }
        .content { background: #f8fafc; padding: 30px 20px; border-radius: 0 0 12px 12px; }
        .confirmation-box { 
          background: white; 
          padding: 25px; 
          border-radius: 8px; 
          border-left: 4px solid #10b981; 
          margin: 20px 0; 
        }
        .timeline { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .timeline-item {
          display: flex;
          align-items: center;
          margin: 15px 0;
          padding: 10px;
          background: #f0f9ff;
          border-radius: 6px;
        }
        .timeline-number {
          background: #3b82f6;
          color: white;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          margin-right: 15px;
          flex-shrink: 0;
        }
        .footer { 
          text-align: center; 
          margin-top: 30px; 
          color: #64748b; 
          font-size: 14px; 
        }
        .debug { 
          background: #f1f5f9; 
          padding: 10px; 
          border-radius: 4px; 
          font-size: 12px; 
          color: #64748b; 
          margin: 10px 0; 
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">⚡ NexaraX</div>
          <h1>✅ Message Received!</h1>
          <p>We'll respond within 24 hours</p>
        </div>
        <div class="content">
          <div class="confirmation-box">
            <h2>Thank you, ${data.firstName}! 🙏</h2>
            <p>We've received your message about "<strong>${data.subject}</strong>" and our team is already reviewing it.</p>
            <p><strong>Reference ID:</strong> #${Date.now().toString().slice(-6)}</p>
          </div>

          <div class="timeline">
            <h3>📋 What Happens Next:</h3>
            <div class="timeline-item">
              <div class="timeline-number">1</div>
              <div>
                <strong>Within 2 hours:</strong> Your message is assigned to the right team member
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-number">2</div>
              <div>
                <strong>Within 24 hours:</strong> You'll receive a detailed response from our team
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-number">3</div>
              <div>
                <strong>Follow-up:</strong> We'll schedule a call if needed to discuss your requirements
              </div>
            </div>
          </div>

          <div class="debug">
            <strong>🔧 Debug Info:</strong><br>
            Name: ${data.firstName} ${data.lastName}<br>
            Email: ${data.email}<br>
            Subject: ${data.subject}<br>
            Sent: ${new Date().toISOString()}<br>
            Template: contact-confirmation-v1
          </div>
        </div>
        <div class="footer">
          <p>🚀 <strong>NexaraX</strong> - AI-Powered Social Media Revolution</p>
          <p>Need urgent assistance? Reply to this email with "URGENT" in the subject.</p>
          <p>📧 hello@nexarax.com | 🌐 nexarax.com</p>
        </div>
      </div>
    </body>
    </html>
  `
}
