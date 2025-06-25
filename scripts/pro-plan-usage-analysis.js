console.log("💰 PRO PLAN USAGE & COST ANALYSIS")
console.log("=================================")

// AI Generation Costs (estimated)
const aiCosts = {
  imageGeneration: {
    costPerImage: 0.02, // £0.02 per image
    averageUserImages: 150, // per month
    monthlyCost: 3.0, // £3 per user
  },
  videoGeneration: {
    costPerVideo: 0.15, // £0.15 per video
    averageUserVideos: 30, // per month
    monthlyCost: 4.5, // £4.50 per user
  },
  voiceCloning: {
    costPerMinute: 0.05, // £0.05 per minute
    averageUserMinutes: 60, // per month
    monthlyCost: 3.0, // £3 per user
  },
  templateProcessing: {
    costPerTemplate: 0.01, // £0.01 per template
    averageUserTemplates: 100, // per month
    monthlyCost: 1.0, // £1 per user
  },
}

// Calculate total AI costs per user
const totalAiCostPerUser = Object.values(aiCosts).reduce((sum, cost) => sum + cost.monthlyCost, 0)
console.log(`💸 Total AI cost per user: £${totalAiCostPerUser}/month`)

// Pro plan economics
const proPlanEconomics = {
  revenue: 29.0, // £29/month
  aiCosts: totalAiCostPerUser, // £11.50/month
  platformCosts: 3.0, // hosting, storage, etc.
  supportCosts: 2.0, // customer support
  totalCosts: totalAiCostPerUser + 3.0 + 2.0,
  grossMargin: 29.0 - (totalAiCostPerUser + 3.0 + 2.0),
  marginPercentage: ((29.0 - (totalAiCostPerUser + 3.0 + 2.0)) / 29.0) * 100,
}

console.log("📊 Pro Plan Economics:")
console.log(`Revenue: £${proPlanEconomics.revenue}`)
console.log(`Total Costs: £${proPlanEconomics.totalCosts}`)
console.log(`Gross Margin: £${proPlanEconomics.grossMargin}`)
console.log(`Margin %: ${proPlanEconomics.marginPercentage.toFixed(1)}%`)

// Usage scenarios
const usageScenarios = {
  lightUser: {
    images: 50,
    videos: 10,
    voice: 20,
    templates: 30,
    monthlyCost: 50 * 0.02 + 10 * 0.15 + 20 * 0.05 + 30 * 0.01,
    profitable: true,
  },
  averageUser: {
    images: 150,
    videos: 30,
    voice: 60,
    templates: 100,
    monthlyCost: 150 * 0.02 + 30 * 0.15 + 60 * 0.05 + 100 * 0.01,
    profitable: true,
  },
  heavyUser: {
    images: 500,
    videos: 100,
    voice: 200,
    templates: 300,
    monthlyCost: 500 * 0.02 + 100 * 0.15 + 200 * 0.05 + 300 * 0.01,
    profitable: false,
  },
  abuser: {
    images: 2000,
    videos: 500,
    voice: 1000,
    templates: 1000,
    monthlyCost: 2000 * 0.02 + 500 * 0.15 + 1000 * 0.05 + 1000 * 0.01,
    profitable: false,
  },
}

console.log("\n📈 Usage Scenarios:")
Object.entries(usageScenarios).forEach(([type, scenario]) => {
  console.log(
    `${type}: £${scenario.monthlyCost.toFixed(2)} cost - ${scenario.profitable ? "✅ Profitable" : "❌ Loss"}`,
  )
})

// Competitor analysis
const competitorLimits = {
  midjourney: {
    plan: "$30/month",
    limit: "Unlimited generations",
    note: "But rate limited",
  },
  runway: {
    plan: "$35/month",
    limit: "125 video generations",
    note: "Clear monthly cap",
  },
  jasper: {
    plan: "$49/month",
    limit: "Unlimited words",
    note: "But usage monitoring",
  },
  canva: {
    plan: "$15/month",
    limit: "Unlimited designs",
    note: "But premium elements limited",
  },
}

console.log("\n🏆 Competitor Limits:")
Object.entries(competitorLimits).forEach(([competitor, data]) => {
  console.log(`${competitor}: ${data.plan} - ${data.limit} (${data.note})`)
})

// Recommended limits
const recommendedLimits = {
  conservative: {
    images: 200,
    videos: 50,
    voice: 120, // minutes
    templates: 150,
    reasoning: "Safe profitability, covers 90% of users",
  },
  balanced: {
    images: 300,
    videos: 75,
    voice: 180, // minutes
    templates: 200,
    reasoning: "Good balance of value and profitability",
  },
  generous: {
    images: 500,
    videos: 100,
    voice: 300, // minutes
    templates: 300,
    reasoning: "High value, some risk of heavy users",
  },
}

console.log("\n🎯 Recommended Limits:")
Object.entries(recommendedLimits).forEach(([approach, limits]) => {
  const monthlyCost = limits.images * 0.02 + limits.videos * 0.15 + limits.voice * 0.05 + limits.templates * 0.01
  const profitable = monthlyCost < 20 // leaving £9 margin minimum
  console.log(`${approach}: £${monthlyCost.toFixed(2)} cost - ${profitable ? "✅" : "❌"} (${limits.reasoning})`)
})

// Fair usage policy examples
const fairUsagePolicies = {
  softLimit: "Unlimited with fair usage monitoring - contact heavy users",
  hardLimit: "Clear monthly limits with overage fees",
  tieredUnlimited: "Unlimited but with rate limiting (X per hour)",
  resetMonthly: "High limits that reset monthly",
}

console.log("\n📋 Fair Usage Options:")
Object.entries(fairUsagePolicies).forEach(([type, description]) => {
  console.log(`${type}: ${description}`)
})

// Recommendation
console.log("\n🎯 RECOMMENDATION:")
console.log("Use 'GENEROUS LIMITS' approach:")
console.log("- 500 images, 100 videos, 5 hours voice, 300 templates per month")
console.log("- Market as 'Generous limits for serious creators'")
console.log("- Covers 95% of users, maintains profitability")
console.log("- Add fair usage policy for extreme cases")
console.log("- Creates upsell opportunity for true unlimited tier")
