console.log("🏴󠁧󠁢󠁥󠁮󠁧󠁿 VAT-CORRECTED BUSINESS MODEL (20% VAT)")
console.log("=============================================")

// VAT correction - this changes EVERYTHING
const vatRate = 0.2 // 20% UK VAT
const vatMultiplier = 1 + vatRate // 1.20

console.log("💰 VAT IMPACT ANALYSIS:")
console.log("=======================")

// Original (incorrect) vs VAT-corrected calculations
const pricing = {
  displayPrice: 29.0, // What customer sees
  netRevenue: 29.0 / vatMultiplier, // What Jason actually gets
  vatAmount: 29.0 - 29.0 / vatMultiplier, // What goes to government
}

console.log(`Customer pays: £${pricing.displayPrice}`)
console.log(`Jason receives: £${pricing.netRevenue.toFixed(2)}`)
console.log(`VAT to government: £${pricing.vatAmount.toFixed(2)}`)
console.log(`VAT percentage: ${((pricing.vatAmount / pricing.displayPrice) * 100).toFixed(1)}%`)

// Corrected unit economics
const correctedEconomics = {
  netRevenue: 24.17, // £29 ÷ 1.20
  costs: 15.2, // Same costs (AI APIs, hosting, Stripe)
  grossProfit: 24.17 - 15.2, // £8.97
  grossMargin: ((24.17 - 15.2) / 24.17) * 100, // 37.1%
  jasonShare: (24.17 - 15.2) * 0.2, // £1.79
  reinvestment: (24.17 - 15.2) * 0.8, // £7.18
}

console.log("\n📊 CORRECTED UNIT ECONOMICS:")
console.log("=============================")
console.log(`Net revenue (after VAT): £${correctedEconomics.netRevenue}`)
console.log(`Costs per user: £${correctedEconomics.costs}`)
console.log(`Gross profit: £${correctedEconomics.grossProfit.toFixed(2)}`)
console.log(`Gross margin: ${correctedEconomics.grossMargin.toFixed(1)}%`)
console.log(`Jason's 20%: £${correctedEconomics.jasonShare.toFixed(2)}`)
console.log(`Reinvestment 80%: £${correctedEconomics.reinvestment.toFixed(2)}`)

// Impact on income targets
const correctedTargets = {
  comfortable: {
    targetIncome: 5000,
    usersNeeded: Math.ceil(5000 / correctedEconomics.jasonShare),
    monthlyRevenue: 0,
    displayRevenue: 0,
  },
  excellent: {
    targetIncome: 10000,
    usersNeeded: Math.ceil(10000 / correctedEconomics.jasonShare),
    monthlyRevenue: 0,
    displayRevenue: 0,
  },
  amazing: {
    targetIncome: 20000,
    usersNeeded: Math.ceil(20000 / correctedEconomics.jasonShare),
    monthlyRevenue: 0,
    displayRevenue: 0,
  },
}

// Calculate totals
Object.keys(correctedTargets).forEach((level) => {
  const target = correctedTargets[level]
  target.monthlyRevenue = target.usersNeeded * correctedEconomics.netRevenue
  target.displayRevenue = target.usersNeeded * pricing.displayPrice
})

console.log("\n🎯 CORRECTED INCOME TARGETS:")
console.log("=============================")
Object.entries(correctedTargets).forEach(([level, data]) => {
  console.log(`${level.toUpperCase()}:`)
  console.log(`  Jason's income: £${data.targetIncome}/month`)
  console.log(`  Users needed: ${data.usersNeeded}`)
  console.log(`  Net revenue: £${Math.round(data.monthlyRevenue)}`)
  console.log(`  Display revenue: £${Math.round(data.displayRevenue)}`)
  console.log("")
})

// Comparison with previous (incorrect) calculations
const comparison = {
  previousJasonPerUser: 2.76,
  correctedJasonPerUser: 1.79,
  difference: 2.76 - 1.79,
  percentageReduction: ((2.76 - 1.79) / 2.76) * 100,
  previousUsersFor5K: Math.ceil(5000 / 2.76),
  correctedUsersFor5K: Math.ceil(5000 / 1.79),
  additionalUsersNeeded: Math.ceil(5000 / 1.79) - Math.ceil(5000 / 2.76),
}

console.log("⚠️ IMPACT OF VAT CORRECTION:")
console.log("=============================")
console.log(`Previous Jason per user: £${comparison.previousJasonPerUser}`)
console.log(`Corrected Jason per user: £${comparison.correctedJasonPerUser}`)
console.log(`Reduction: £${comparison.difference.toFixed(2)} (${comparison.percentageReduction.toFixed(1)}%)`)
console.log(`Previous users needed for £5K: ${comparison.previousUsersFor5K}`)
console.log(`Corrected users needed for £5K: ${comparison.correctedUsersFor5K}`)
console.log(`Additional users needed: ${comparison.additionalUsersNeeded}`)

// Corrected 5-year wealth projection
const correctedWealthProjection = {
  year1: { users: 1500, monthlyIncome: 2685, totalWealth: 32220 },
  year2: { users: 3500, monthlyIncome: 6265, totalWealth: 107460 },
  year3: { users: 7500, monthlyIncome: 13425, totalWealth: 268740 },
  year4: { users: 15000, monthlyIncome: 26850, totalWealth: 590820 },
  year5: { users: 25000, monthlyIncome: 44750, totalWealth: 1127700 },
}

console.log("\n📈 CORRECTED 5-YEAR WEALTH PROJECTION:")
console.log("=======================================")
Object.entries(correctedWealthProjection).forEach(([year, data]) => {
  console.log(`${year.toUpperCase()}:`)
  console.log(`  Users: ${data.users}`)
  console.log(`  Jason monthly: £${data.monthlyIncome}`)
  console.log(`  Jason total wealth: £${data.totalWealth}`)
  console.log("")
})

// Pricing strategy implications
const pricingImplications = {
  currentPlan: {
    displayPrice: 29,
    netRevenue: 24.17,
    profit: 8.97,
    margin: 37.1,
  },
  alternativeOptions: {
    option1: {
      displayPrice: 35, // Increase display price
      netRevenue: 35 / 1.2, // £29.17
      costs: 15.2,
      profit: 35 / 1.2 - 15.2, // £13.97
      jasonShare: (35 / 1.2 - 15.2) * 0.2, // £2.79
    },
    option2: {
      displayPrice: 39, // Higher price point
      netRevenue: 39 / 1.2, // £32.50
      costs: 15.2,
      profit: 39 / 1.2 - 15.2, // £17.30
      jasonShare: (39 / 1.2 - 15.2) * 0.2, // £3.46
    },
  },
}

console.log("💡 PRICING STRATEGY OPTIONS:")
console.log("=============================")
console.log("CURRENT (£29 display):")
console.log(`  Net revenue: £${pricingImplications.currentPlan.netRevenue}`)
console.log(`  Profit: £${pricingImplications.currentPlan.profit.toFixed(2)}`)
console.log(`  Jason per user: £${(pricingImplications.currentPlan.profit * 0.2).toFixed(2)}`)

console.log("\nOPTION 1 (£35 display):")
console.log(`  Net revenue: £${pricingImplications.alternativeOptions.option1.netRevenue.toFixed(2)}`)
console.log(`  Profit: £${pricingImplications.alternativeOptions.option1.profit.toFixed(2)}`)
console.log(`  Jason per user: £${pricingImplications.alternativeOptions.option1.jasonShare.toFixed(2)}`)
console.log(`  Users needed for £5K: ${Math.ceil(5000 / pricingImplications.alternativeOptions.option1.jasonShare)}`)

console.log("\nOPTION 2 (£39 display):")
console.log(`  Net revenue: £${pricingImplications.alternativeOptions.option2.netRevenue.toFixed(2)}`)
console.log(`  Profit: £${pricingImplications.alternativeOptions.option2.profit.toFixed(2)}`)
console.log(`  Jason per user: £${pricingImplications.alternativeOptions.option2.jasonShare.toFixed(2)}`)
console.log(`  Users needed for £5K: ${Math.ceil(5000 / pricingImplications.alternativeOptions.option2.jasonShare)}`)

// Free tier impact with VAT
const freeTierWithVAT = {
  freeUserCost: 2.5, // Same cost for limited usage
  proUserNetRevenue: 24.17, // After VAT
  proUserCost: 15.2,
  proUserProfit: 8.97,
  breakEvenRatio: 2.5 / 8.97, // Need 1 pro user for every 3.6 free users
}

console.log("\n🆓 FREE TIER IMPACT (WITH VAT):")
console.log("================================")
console.log(`Free user cost: £${freeTierWithVAT.freeUserCost}`)
console.log(`Pro user profit: £${freeTierWithVAT.proUserProfit.toFixed(2)}`)
console.log(`Break-even ratio: 1 pro user covers ${(1 / freeTierWithVAT.breakEvenRatio).toFixed(1)} free users`)
console.log(`Conversion rate needed: ${(freeTierWithVAT.breakEvenRatio * 100).toFixed(1)}% minimum`)

// Final recommendations with VAT consideration
const vatRecommendations = {
  pricing: "Consider £35 display price (£29.17 net) for better margins",
  launch: "Pro only launch even more critical with lower margins",
  freeTier: "Free tier riskier - need 28% conversion rate to break even",
  growth: "Focus on higher-value customers and retention",
  timeline: "Longer timeline to reach income goals due to VAT impact",
}

console.log("\n🎯 VAT-ADJUSTED RECOMMENDATIONS:")
console.log("=================================")
Object.entries(vatRecommendations).forEach(([category, recommendation]) => {
  console.log(`${category}: ${recommendation}`)
})

console.log("\n🔥 BOTTOM LINE WITH VAT:")
console.log("========================")
console.log("• VAT reduces your profit per user by 35%")
console.log("• You need 2,793 users for £5K/month (not 1,812)")
console.log("• Consider £35 display price for better margins")
console.log("• Pro-only launch is even more critical")
console.log("• Free tier is much riskier with VAT impact")
console.log("• Focus on retention and higher-value customers")
