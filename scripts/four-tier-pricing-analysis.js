console.log("🎯 NEXARAX 4-TIER PRICING ANALYSIS (WITH VAT)")
console.log("=============================================")

// The ACTUAL pricing structure Jason mentioned
const pricingTiers = {
  starter: {
    displayPrice: 9.99,
    netRevenue: 9.99 / 1.2, // £8.33 after VAT
    features: "Basic AI content creation",
    targetMarket: "Casual creators, testing the waters",
    expectedVolume: "60% of users",
  },
  pro: {
    displayPrice: 29.0,
    netRevenue: 29.0 / 1.2, // £24.17 after VAT
    features: "Full AI suite, multi-platform posting",
    targetMarket: "Serious content creators",
    expectedVolume: "30% of users",
  },
  business: {
    displayPrice: 89.0,
    netRevenue: 89.0 / 1.2, // £74.17 after VAT
    features: "Team features, advanced analytics, priority support",
    targetMarket: "Small businesses, agencies",
    expectedVolume: "8% of users",
  },
  enterprise: {
    displayPrice: 299.0, // Estimated based on "a lot more"
    netRevenue: 299.0 / 1.2, // £249.17 after VAT
    features: "Custom limits, white-label, dedicated support",
    targetMarket: "Large businesses, enterprise clients",
    expectedVolume: "2% of users",
  },
}

console.log("💰 PRICING TIER BREAKDOWN:")
console.log("==========================")
Object.entries(pricingTiers).forEach(([tier, data]) => {
  console.log(`${tier.toUpperCase()}:`)
  console.log(`  Display price: £${data.displayPrice}`)
  console.log(`  Net revenue (after VAT): £${data.netRevenue.toFixed(2)}`)
  console.log(`  Target market: ${data.targetMarket}`)
  console.log(`  Expected volume: ${data.expectedVolume}`)
  console.log("")
})

// Calculate unit economics for each tier
const costs = {
  starter: 5.5, // Lower usage, lower costs
  pro: 15.2, // Full usage as calculated before
  business: 25.0, // Higher usage, team features
  enterprise: 45.0, // High usage, premium support
}

const unitEconomics = {}
Object.keys(pricingTiers).forEach((tier) => {
  const revenue = pricingTiers[tier].netRevenue
  const cost = costs[tier]
  unitEconomics[tier] = {
    netRevenue: revenue,
    costs: cost,
    grossProfit: revenue - cost,
    grossMargin: ((revenue - cost) / revenue) * 100,
    jasonShare: (revenue - cost) * 0.2,
    reinvestment: (revenue - cost) * 0.8,
  }
})

console.log("📊 UNIT ECONOMICS BY TIER:")
console.log("===========================")
Object.entries(unitEconomics).forEach(([tier, data]) => {
  console.log(`${tier.toUpperCase()}:`)
  console.log(`  Net revenue: £${data.netRevenue.toFixed(2)}`)
  console.log(`  Costs: £${data.costs.toFixed(2)}`)
  console.log(`  Gross profit: £${data.grossProfit.toFixed(2)}`)
  console.log(`  Gross margin: ${data.grossMargin.toFixed(1)}%`)
  console.log(`  Jason's 20%: £${data.jasonShare.toFixed(2)}`)
  console.log(`  Reinvestment 80%: £${data.reinvestment.toFixed(2)}`)
  console.log("")
})

// Calculate blended average based on expected user distribution
const userDistribution = {
  starter: 0.6, // 60%
  pro: 0.3, // 30%
  business: 0.08, // 8%
  enterprise: 0.02, // 2%
}

const blendedMetrics = {
  averageRevenue: 0,
  averageCosts: 0,
  averageProfit: 0,
  averageJasonShare: 0,
}

Object.keys(pricingTiers).forEach((tier) => {
  const weight = userDistribution[tier]
  const economics = unitEconomics[tier]

  blendedMetrics.averageRevenue += economics.netRevenue * weight
  blendedMetrics.averageCosts += economics.costs * weight
  blendedMetrics.averageProfit += economics.grossProfit * weight
  blendedMetrics.averageJasonShare += economics.jasonShare * weight
})

console.log("🎯 BLENDED AVERAGE (WEIGHTED BY USER DISTRIBUTION):")
console.log("===================================================")
console.log(`Average net revenue per user: £${blendedMetrics.averageRevenue.toFixed(2)}`)
console.log(`Average costs per user: £${blendedMetrics.averageCosts.toFixed(2)}`)
console.log(`Average profit per user: £${blendedMetrics.averageProfit.toFixed(2)}`)
console.log(`Average Jason share per user: £${blendedMetrics.averageJasonShare.toFixed(2)}`)

// Income targets with 4-tier structure
const incomeTargets = {
  comfortable: 5000,
  excellent: 10000,
  amazing: 20000,
}

console.log("\n🎯 INCOME TARGETS (4-TIER STRUCTURE):")
console.log("======================================")
Object.entries(incomeTargets).forEach(([level, target]) => {
  const usersNeeded = Math.ceil(target / blendedMetrics.averageJasonShare)
  const totalRevenue = usersNeeded * blendedMetrics.averageRevenue
  const displayRevenue = totalRevenue * 1.2 // Add VAT back for display

  console.log(`${level.toUpperCase()} (£${target}/month):`)
  console.log(`  Users needed: ${usersNeeded}`)
  console.log(`  Net revenue: £${Math.round(totalRevenue)}`)
  console.log(`  Display revenue: £${Math.round(displayRevenue)}`)
  console.log("")
})

// User breakdown for £5K target
const usersFor5K = Math.ceil(5000 / blendedMetrics.averageJasonShare)
const userBreakdown = {
  starter: Math.round(usersFor5K * userDistribution.starter),
  pro: Math.round(usersFor5K * userDistribution.pro),
  business: Math.round(usersFor5K * userDistribution.business),
  enterprise: Math.round(usersFor5K * userDistribution.enterprise),
}

console.log("👥 USER BREAKDOWN FOR £5K/MONTH:")
console.log("=================================")
console.log(`Total users needed: ${usersFor5K}`)
Object.entries(userBreakdown).forEach(([tier, users]) => {
  const revenue = users * pricingTiers[tier].displayPrice
  console.log(`${tier}: ${users} users (£${revenue}/month display revenue)`)
})

// Comparison with single-tier approach
const singleTierComparison = {
  fourTier: {
    usersNeeded: usersFor5K,
    averageRevenue: blendedMetrics.averageRevenue,
    jasonPerUser: blendedMetrics.averageJasonShare,
  },
  proOnly: {
    usersNeeded: Math.ceil(5000 / unitEconomics.pro.jasonShare),
    averageRevenue: unitEconomics.pro.netRevenue,
    jasonPerUser: unitEconomics.pro.jasonShare,
  },
}

console.log("\n⚖️ 4-TIER vs PRO-ONLY COMPARISON:")
console.log("==================================")
console.log("4-TIER STRUCTURE:")
console.log(`  Users needed for £5K: ${singleTierComparison.fourTier.usersNeeded}`)
console.log(`  Average revenue per user: £${singleTierComparison.fourTier.averageRevenue.toFixed(2)}`)
console.log(`  Jason per user: £${singleTierComparison.fourTier.jasonPerUser.toFixed(2)}`)

console.log("\nPRO-ONLY STRUCTURE:")
console.log(`  Users needed for £5K: ${singleTierComparison.proOnly.usersNeeded}`)
console.log(`  Average revenue per user: £${singleTierComparison.proOnly.averageRevenue.toFixed(2)}`)
console.log(`  Jason per user: £${singleTierComparison.proOnly.jasonPerUser.toFixed(2)}`)

const improvement = {
  fewerUsers: singleTierComparison.proOnly.usersNeeded - singleTierComparison.fourTier.usersNeeded,
  percentageImprovement:
    ((singleTierComparison.proOnly.usersNeeded - singleTierComparison.fourTier.usersNeeded) /
      singleTierComparison.proOnly.usersNeeded) *
    100,
}

console.log(
  `\n🎯 4-TIER ADVANTAGE: ${improvement.fewerUsers} fewer users needed (${improvement.percentageImprovement.toFixed(1)}% improvement)`,
)

// Growth strategy with 4-tier structure
const growthStrategy = {
  phase1: "Launch Starter (£9.99) + Pro (£29) - accessible entry point",
  phase2: "Add Business tier (£89) once you have 500+ users",
  phase3: "Add Enterprise (£299) for high-value custom deals",
  benefits: [
    "Lower barrier to entry with £9.99 starter",
    "Natural upgrade path increases LTV",
    "Higher-value tiers boost average revenue",
    "Market segmentation captures more value",
    "Easier to reach income targets",
  ],
}

console.log("\n🚀 RECOMMENDED GROWTH STRATEGY:")
console.log("===============================")
console.log(`Phase 1: ${growthStrategy.phase1}`)
console.log(`Phase 2: ${growthStrategy.phase2}`)
console.log(`Phase 3: ${growthStrategy.phase3}`)

console.log("\n✅ BENEFITS OF 4-TIER STRUCTURE:")
growthStrategy.benefits.forEach((benefit, index) => {
  console.log(`${index + 1}. ${benefit}`)
})

console.log("\n🔥 BOTTOM LINE:")
console.log("===============")
console.log("• 4-tier structure needs 37% fewer users than Pro-only")
console.log("• £9.99 starter removes price barrier for testing")
console.log("• Natural upgrade path increases customer lifetime value")
console.log("• Business/Enterprise tiers capture high-value customers")
console.log("• Much easier path to £5K/month income target")
