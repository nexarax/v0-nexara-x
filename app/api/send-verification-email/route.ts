import { NextRequest, NextResponse } from "next/server"
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const { email, selectedPlan } = await req.json()

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    // Store verification token in database
    const { error: dbError } = await supabase
      .from('email_verifications')
      .upsert({
        email,
        verification_token: verificationToken,
        selected_plan: selectedPlan,
        expires_at: expiresAt.toISOString(),
        verified: false,
        created_at: new Date().toISOString()
      })

    if (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { error: "Failed to store verification" },
        { status: 500 }
      )
    }

    // Create verification URL
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${verificationToken}`

    // Send verification email using Resend
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL,
        to: [email],
        subject: 'Verify your email - Welcome to NexaraX! 🚀',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #3B82F6, #8B5CF6); padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to NexaraX! ✨</h1>
              <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">AI-Powered Content Creation Platform</p>
            </div>
            
            <div style="background: white; padding: 40px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <h2 style="color: #1F2937; margin-bottom: 20px;">Verify Your Email Address</h2>
              
              <p style="color: #4B5563; line-height: 1.6; margin-bottom: 30px;">
                Thank you for joining NexaraX! You're just one click away from creating viral content with AI. 
                Please verify your email address to get started.
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${verificationUrl}" 
                   style="background: linear-gradient(135deg, #3B82F6, #8B5CF6); 
                          color: white; 
                          padding: 15px 30px; 
                          text-decoration: none; 
                          border-radius: 8px; 
                          font-weight: bold; 
                          display: inline-block;
                          font-size: 16px;">
                  ✅ Verify Email & Start Creating
                </a>
              </div>
              
              <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 30px 0;">
                <h3 style="color: #1F2937; margin: 0 0 15px 0; font-size: 18px;">What's Next?</h3>
                <ul style="color: #4B5563; margin: 0; padding-left: 20px;">
                  <li>✨ Generate viral images with AI</li>
                  <li>🎥 Create engaging videos instantly</li>
                  <li>🎯 Auto-post to social platforms</li>
                  <li>📊 Track performance & growth</li>
                </ul>
              </div>
              
              <p style="color: #6B7280; font-size: 14px; margin-top: 30px;">
                This verification link expires in 24 hours. If you didn't sign up for NexaraX, you can safely ignore this email.
              </p>
              
              <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;">
              
              <p style="color: #9CA3AF; font-size: 12px; text-align: center; margin: 0;">
                © 2024 NexaraX. All rights reserved.<br>
                AI-Powered Content Creation Platform
              </p>
            </div>
          </div>
        `
      })
    })

    if (!emailResponse.ok) {
      return NextResponse.json(
        { error: "Failed to send verification email" },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      message: "Verification email sent successfully" 
    })

  } catch (error) {
    console.error("Verification email error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
