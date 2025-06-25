import { supabaseAdmin } from "./supabase"
import { PRICING_TIERS, type PricingTier } from "./pricing-config"

export class UsageTracker {
  static async checkLimits(userId: string, tier: string) {
    const currentMonth = new Date().toISOString().slice(0, 7) // YYYY-MM

    // Get current usage
    const { data: usage } = await supabaseAdmin
      .from("usage_tracking")
      .select("*")
      .eq("user_id", userId)
      .eq("month_year", currentMonth)
      .single()

    const currentUsage = usage || {
      text_posts: 0,
      images: 0,
      videos: 0,
      voice_minutes: 0,
    }

    const tierConfig = PRICING_TIERS[tier as PricingTier]
    const limit = tierConfig.features.aiPosts
    const totalUsed = currentUsage.text_posts + currentUsage.images + currentUsage.videos

    const withinLimits = limit === "unlimited" || totalUsed < limit

    return {
      withinLimits,
      usage: currentUsage,
      recommendedTier: withinLimits ? null : this.getNextTier(tier as PricingTier),
    }
  }

  static getNextTier(currentTier: PricingTier): PricingTier {
    const tiers: PricingTier[] = ["free", "starter", "pro", "enterprise"]
    const currentIndex = tiers.indexOf(currentTier)
    return tiers[currentIndex + 1] || "enterprise"
  }

  static async incrementUsage(userId: string, type: "text" | "image" | "video" | "voice", amount = 1) {
    const currentMonth = new Date().toISOString().slice(0, 7)

    const { error } = await supabaseAdmin.from("usage_tracking").upsert(
      {
        user_id: userId,
        month_year: currentMonth,
        [`${type}_posts`]: amount,
      },
      {
        onConflict: "user_id,month_year",
      },
    )

    return !error
  }
}
