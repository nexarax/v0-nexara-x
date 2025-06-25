import { NextResponse } from "next/server"
import { UsageTracker } from "@/lib/usage-tracker-fixed"
import { PRICING_TIERS } from "@/lib/pricing-config"
import { supabaseAdmin } from "@/lib/supabase-client"

export async function POST(request: Request) {
  try {
    const { userId, type, amount = 1 } = await request.json()

    if (!userId || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get user's current subscription tier
    const { data: subscription } = await supabaseAdmin
      .from("user_subscriptions")
      .select("tier")
      .eq("user_id", userId)
      .single()

    const userTier = subscription?.tier || "free"
    const tierConfig = PRICING_TIERS[userTier as keyof typeof PRICING_TIERS]

    // Check current usage and limits
    const { withinLimits, usage, recommendedTier } = await UsageTracker.checkLimits(userId, userTier)

    // Calculate what usage would be after this generation
    const futureUsage = {
      textPosts: usage.textPosts + (type === "text" ? amount : 0),
      images: usage.images + (type === "image" ? amount : 0),
      voiceMinutes: usage.voiceMinutes + (type === "voice" ? amount : 0),
      videos: usage.videos + (type === "video" ? amount : 0),
    }

    const totalFuturePosts = futureUsage.textPosts + futureUsage.images + futureUsage.videos
    const tierLimit = tierConfig.features.aiPosts

    // Check if this generation would exceed limits
    const wouldExceedLimit = tierLimit !== "unlimited" && totalFuturePosts > tierLimit

    return NextResponse.json({
      allowed: !wouldExceedLimit,
      currentUsage: usage,
      tierLimit,
      userTier,
      recommendedTier: wouldExceedLimit ? recommendedTier : undefined,
      message: wouldExceedLimit
        ? `This would exceed your ${userTier} plan limit of ${tierLimit} posts per month. Consider upgrading to ${recommendedTier}.`
        : `You have ${tierLimit === "unlimited" ? "unlimited" : tierLimit - totalFuturePosts} generations remaining this month.`,
    })
  } catch (error) {
    console.error("Usage check error:", error)
    return NextResponse.json({ error: "Failed to check usage limits" }, { status: 500 })
  }
}
