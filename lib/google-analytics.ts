// Google Analytics 4 Setup for NexaraX
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID || "G-NEXARAX2024"

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window === "undefined") return

  // Load gtag script
  const script = document.createElement("script")
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`
  script.async = true
  document.head.appendChild(script)

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }

  window.gtag("js", new Date())
  window.gtag("config", GA_TRACKING_ID, {
    page_title: "NexaraX - AI Social Media Automation",
    page_location: window.location.href,
    send_page_view: true,
  })

  console.log("✅ Google Analytics 4 initialized for NexaraX")
}

// Custom NexaraX Events
export const trackNexaraXEvent = {
  // User Registration Events
  signup: (plan: string, method = "email") => {
    window.gtag?.("event", "nexarax_signup", {
      event_category: "User Registration",
      event_label: plan,
      method: method,
      value: plan === "free" ? 0 : plan === "starter" ? 9.99 : 29,
      currency: "GBP",
    })
    console.log(`📊 Tracked: User signup - ${plan} plan via ${method}`)
  },

  // AI Content Events
  firstPost: (platform: string, contentType = "text") => {
    window.gtag?.("event", "nexarax_first_post", {
      event_category: "AI Content",
      event_label: platform,
      content_type: contentType,
      value: 10, // First post has £10 value
    })
    console.log(`📊 Tracked: First AI post on ${platform}`)
  },

  viralPost: (platform: string, views: number, engagement: number) => {
    window.gtag?.("event", "nexarax_viral_post", {
      event_category: "AI Content Success",
      event_label: platform,
      views: views,
      engagement_rate: engagement,
      value: Math.min(views / 100, 500), // Max £500 value for viral posts
    })
    console.log(`📊 Tracked: Viral post - ${views} views on ${platform}`)
  },

  // Conversion Events
  upgrade: (fromPlan: string, toPlan: string, revenue: number) => {
    window.gtag?.("event", "purchase", {
      transaction_id: `nexarax_${Date.now()}`,
      value: revenue,
      currency: "GBP",
      items: [
        {
          item_id: `plan_${toPlan}`,
          item_name: `NexaraX ${toPlan} Plan`,
          category: "Subscription",
          quantity: 1,
          price: revenue,
        },
      ],
    })

    window.gtag?.("event", "nexarax_upgrade", {
      event_category: "Conversion",
      from_plan: fromPlan,
      to_plan: toPlan,
      value: revenue,
    })
    console.log(`📊 Tracked: Plan upgrade ${fromPlan} → ${toPlan} (£${revenue})`)
  },

  // Milestone Events
  milestone: (type: string, value: number) => {
    window.gtag?.("event", "nexarax_milestone", {
      event_category: "User Success",
      milestone_type: type,
      milestone_value: value,
      value: type === "followers" ? Math.min(value / 100, 200) : 50,
    })
    console.log(`📊 Tracked: Milestone - ${value} ${type}`)
  },

  // Platform Connection Events
  connectPlatform: (platform: string, accountType = "personal") => {
    window.gtag?.("event", "nexarax_platform_connect", {
      event_category: "Platform Integration",
      event_label: platform,
      account_type: accountType,
      value: 5, // Each connection worth £5
    })
    console.log(`📊 Tracked: Connected ${platform} account`)
  },

  // AI Generation Events
  generateContent: (contentType: string, platform: string, success: boolean) => {
    window.gtag?.("event", "nexarax_ai_generate", {
      event_category: "AI Usage",
      content_type: contentType,
      platform: platform,
      success: success,
      value: success ? 2 : 0,
    })
    console.log(`📊 Tracked: AI content generation - ${contentType} for ${platform}`)
  },
}

// Page view tracking
export const trackPageView = (url: string, title: string) => {
  window.gtag?.("config", GA_TRACKING_ID, {
    page_title: title,
    page_location: url,
  })
  console.log(`📊 Tracked: Page view - ${title}`)
}

// Conversion goals setup
export const setupConversionGoals = () => {
  const goals = [
    { name: "Free Trial Signup", value: 0, event: "nexarax_signup" },
    { name: "First Social Connection", value: 5, event: "nexarax_platform_connect" },
    { name: "First AI Post", value: 10, event: "nexarax_first_post" },
    { name: "Plan Upgrade", value: 29, event: "nexarax_upgrade" },
    { name: "1K Followers", value: 50, event: "nexarax_milestone" },
    { name: "10K Followers", value: 200, event: "nexarax_milestone" },
  ]

  console.log("🎯 NexaraX Conversion Goals Setup:")
  goals.forEach((goal) => {
    console.log(`   • ${goal.name}: £${goal.value} (${goal.event})`)
  })
}

// Zero-Cost Google Analytics using existing NexaraX infrastructure

// Use existing environment variable

// Zero-cost initialization (uses existing app structure)
export const initZeroCostGA = () => {
  if (typeof window === "undefined" || !GA_TRACKING_ID) return

  // Use existing script loading pattern
  const script = document.createElement("script")
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`
  script.async = true
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }

  window.gtag("js", new Date())
  window.gtag("config", GA_TRACKING_ID, {
    // Zero-cost configuration
    send_page_view: true,
    custom_map: {
      custom_parameter_1: "nexarax_user_type",
      custom_parameter_2: "nexarax_plan",
    },
  })

  console.log("✅ Zero-cost GA4 initialized with existing infrastructure")
}

// Simplified tracking for zero-cost model
export const trackZeroCostEvents = {
  // Free user signup (most important conversion)
  freeSignup: () => {
    window.gtag?.("event", "nexarax_free_signup", {
      event_category: "Zero Cost Conversion",
      value: 0,
      currency: "GBP",
    })
  },

  // Paid upgrade (revenue event)
  paidUpgrade: (plan: string, amount: number) => {
    window.gtag?.("event", "purchase", {
      transaction_id: `nexarax_${Date.now()}`,
      value: amount,
      currency: "GBP",
      items: [
        {
          item_id: plan,
          item_name: `NexaraX ${plan}`,
          price: amount,
          quantity: 1,
        },
      ],
    })
  },

  // AI content generation (feature usage)
  aiContentUsed: (platform: string) => {
    window.gtag?.("event", "nexarax_ai_used", {
      event_category: "Feature Usage",
      event_label: platform,
      value: 1,
    })
  },
}
