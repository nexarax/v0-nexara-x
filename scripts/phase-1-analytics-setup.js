console.log("📊 PHASE 1 ANALYTICS SETUP")
console.log("==========================")

// Phase 1 tracking configuration
const phase1Analytics = {
  userTypeTracking: {
    onboardingQuestion: "What best describes you?",
    options: [
      { id: "creator", label: "Content Creator", target: "primary" },
      { id: "artist", label: "Artist/Designer", target: "secondary" },
      { id: "business", label: "Business Owner", target: "secondary" },
      { id: "other", label: "Other", target: "research" },
    ],
  },

  featureUsageTracking: {
    creators: [
      "video_generation",
      "multi_platform_posting",
      "viral_prediction",
      "content_calendar",
      "engagement_analytics",
    ],
    artists: ["image_generation", "art_templates", "high_res_exports", "style_variations", "portfolio_features"],
    businesses: ["brand_templates", "scheduling_tools", "roi_tracking", "team_collaboration", "analytics_dashboard"],
  },

  conversionTracking: {
    signupToTrial: "track by user type",
    trialToPaid: "track by user type",
    featureAdoption: "track by user type",
    churnReasons: "track by user type",
  },

  phase2Triggers: {
    artistMarket: {
      signupThreshold: "20% of total signups",
      engagementThreshold: "High usage of image features",
      churnThreshold: "Low churn rate (<5%)",
      featureRequests: "Art-specific feature requests",
    },
    businessMarket: {
      signupThreshold: "15% of total signups",
      pricingTolerance: "Willingness to pay £49+",
      featureRequests: "Team/collaboration requests",
      usagePatterns: "Heavy analytics usage",
    },
  },

  successMetrics: {
    week1: {
      totalSignups: 500,
      creatorSignups: "60-70%",
      artistSignups: "15-25%",
      businessSignups: "10-20%",
      trialConversion: "20%",
    },
    month1: {
      totalUsers: 1500,
      mrr: "£40K",
      userSatisfaction: "4.5+ rating",
      featureAdoption: "80%+ using core features",
    },
  },
}

// Data collection setup
const dataCollection = {
  userOnboarding: {
    question: "What best describes you?",
    trackingEvent: "user_type_selected",
    customProperties: {
      userType: "creator|artist|business|other",
      timestamp: "ISO date",
      source: "organic|paid|referral",
    },
  },

  featureUsage: {
    trackingEvents: ["image_generated", "video_created", "content_posted", "analytics_viewed", "template_used"],
    segmentBy: "userType",
  },

  surveyQuestions: {
    newUsers: [
      "What's your primary goal with NexaraX?",
      "What other tools do you currently use?",
      "How did you hear about us?",
      "What's most important to you? (features)",
    ],
    churnedUsers: [
      "Why are you canceling?",
      "What could we have done better?",
      "Would you recommend us to others?",
      "What features were you missing?",
    ],
  },
}

console.log("✅ Phase 1 analytics configured")
console.log("📊 Ready to track user types and expansion opportunities")

// Export for implementation
if (typeof module !== "undefined" && module.exports) {
  module.exports = { phase1Analytics, dataCollection }
}
