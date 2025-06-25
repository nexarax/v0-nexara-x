import { NextRequest, NextResponse } from "next/server"
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json()

    if (!token) {
      return NextResponse.json(
        { error: "Token is required" },
        { status: 400 }
      )
    }

    // Find verification record
    const { data: verification, error } = await supabase
      .from('email_verifications')
      .select('*')
      .eq('verification_token', token)
      .single()

    if (error || !verification) {
      return NextResponse.json(
        { error: "Invalid verification token" },
        { status: 400 }
      )
    }

    // Check if already verified
    if (verification.verified) {
      return NextResponse.json(
        { error: "Email already verified" },
        { status: 400 }
      )
    }

    // Check if expired
    const now = new Date()
    const expiresAt = new Date(verification.expires_at)
    
    if (now > expiresAt) {
      return NextResponse.json(
        { error: "Verification token expired", expired: true },
        { status: 400 }
      )
    }

    // Mark as verified
    const { error: updateError } = await supabase
      .from('email_verifications')
      .update({ 
        verified: true, 
        verified_at: new Date().toISOString() 
      })
      .eq('verification_token', token)

    if (updateError) {
      return NextResponse.json(
        { error: "Failed to verify email" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      email: verification.email,
      selectedPlan: verification.selected_plan
    })

  } catch (error) {
    console.error("Token verification error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
