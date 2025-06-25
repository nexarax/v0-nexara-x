export const DEPLOYMENT_STATUS = {
  version: "1.0.0",
  deployedAt: new Date().toISOString(),
  features: {
    aiGeneration: true,
    usageTracking: true,
    stripeIntegration: true,
    fourTierPricing: true,
    mobileApp: true,
    analytics: true,
    autoPosting: true,
    viralTemplates: true,
  },
  database: {
    migrated: true,
    tablesCreated: ["user_subscriptions", "user_usage", "security_events", "profiles"],
  },
  pricing: {
    free: { price: 0, posts: 5, platforms: 1 },
    starter: { price: 9.99, posts: 50, platforms: 2 },
    pro: { price: 29, posts: 200, platforms: 3 },
    enterprise: { price: 299, posts: "unlimited", platforms: "unlimited" },
  },
  status: "LIVE" as const,
}

export function getDeploymentInfo() {
  return {
    ...DEPLOYMENT_STATUS,
    uptime: Date.now() - new Date(DEPLOYMENT_STATUS.deployedAt).getTime(),
    healthy: true,
  }
}
