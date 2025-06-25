import { supabaseAdmin } from "./supabase-client"
import { PRICING_TIERS } from "./pricing-config"

// Define the PricingTier type based on the keys of PRICING_TIERS
export type PricingTier = keyof typeof PRICING_TIERS

export interface UserUsage {
  userId: string
  monthYear: string
  textPosts: number
  images: number
  videos: number
  voiceMinutes: number
  totalCost: number
}

export class UsageTracker {
  static async checkLimits(userId: string, tier: string) {
    const currentMonth = new Date().toISOString().slice(0, 7) // YYYY-MM

    try {
      // Get current usage
      const { data: usage, error } = await supabaseAdmin
        .from("usage_tracking")
        .select("*")
        .eq("user_id", userId)
        .eq("month_year", currentMonth)
        .single()

      if (error && error.code !== "PGRST116") {
        throw error
      }

      const currentUsage = usage || {
        text_posts: 0,
        images: 0,
        videos: 0,
        voice_minutes: 0,
      }

      const tierConfig = PRICING_TIERS[tier as PricingTier]
      const limit = tierConfig?.features?.aiPosts || 0
      const totalUsed = currentUsage.text_posts + currentUsage.images + currentUsage.videos

      const withinLimits = limit === "unlimited" || totalUsed < (typeof limit === "number" ? limit : 999999)

      return {
        withinLimits,
        usage: currentUsage,
        recommendedTier: withinLimits ? null : this.getNextTier(tier as PricingTier),
      }
    } catch (error) {
      console.error("Usage check error:", error)
      // Return safe defaults on error
      return {
        withinLimits: true,
        usage: { text_posts: 0, images: 0, videos: 0, voice_minutes: 0 },
        recommendedTier: null,
      }
    }
  }

  static getNextTier(currentTier: PricingTier): PricingTier {
    const tiers: PricingTier[] = ["free", "starter", "pro", "enterprise"]
    const currentIndex = tiers.indexOf(currentTier)
    return tiers[currentIndex + 1] || "enterprise"
  }

  static async incrementUsage(userId: string, type: "text" | "image" | "video" | "voice", amount = 1) {
    const currentMonth = new Date().toISOString().slice(0, 7)

    try {
      const columnName = type === "text" ? "text_posts" : 
                        type === "image" ? "images" : 
                        type === "video" ? "videos" : "voice_minutes"

      const { error } = await supabaseAdmin.from("usage_tracking").upsert(
        {
          user_id: userId,
          month_year: currentMonth,
          [columnName]: amount,
        },
        {
          onConflict: "user_id,month_year",
        },
      )

      return !error
    } catch (error) {
      console.error("Usage increment error:", error)
      return false
    }
  }
}
