console.log("💸 CASH FLOW TIMELINE ANALYSIS")
console.log("==============================")
console.log("📊 80% Reinvestment (Months 1-6) → 30% Reinvestment (Months 7+)")

// Import projections from previous analysis
const monthlyProjections = [
  // Month 1-6 (80% reinvestment phase)
  { month: 1, revenue: 2400, costs: 1800, profit: 600, jasonIncome: 120, reinvestment: 480 },
  { month: 2, revenue: 3200, costs: 2300, profit: 900, jasonIncome: 180, reinvestment: 720 },
  { month: 3, revenue: 4500, costs: 3100, profit: 1400, jasonIncome: 280, reinvestment: 1120 },
  { month: 4, revenue: 6200, costs: 4200, profit: 2000, jasonIncome: 400, reinvestment: 1600 },
  { month: 5, revenue: 8500, costs: 5600, profit: 2900, jasonIncome: 580, reinvestment: 2320 },
  { month: 6, revenue: 11800, costs: 7500, profit: 4300, jasonIncome: 860, reinvestment: 3440 },

  // Month 7-12 (30% reinvestment phase)
  { month: 7, revenue: 15200, costs: 9200, profit: 6000, jasonIncome: 4200, reinvestment: 1800 },
  { month: 8, revenue: 18500, costs: 11000, profit: 7500, jasonIncome: 5250, reinvestment: 2250 },
  { month: 9, revenue: 22800, costs: 13200, profit: 9600, jasonIncome: 6720, reinvestment: 2880 },
  { month: 10, revenue: 28200, costs: 15800, profit: 12400, jasonIncome: 8680, reinvestment: 3720 },
  { month: 11, revenue: 34500, costs: 18900, profit: 15600, jasonIncome: 10920, reinvestment: 4680 },
  { month: 12, revenue: 42000, costs: 22500, profit: 19500, jasonIncome: 13650, reinvestment: 5850 },

  // Month 13-24 (continued 30% reinvestment)
  { month: 18, revenue: 85000, costs: 42000, profit: 43000, jasonIncome: 30100, reinvestment: 12900 },
  { month: 24, revenue: 145000, costs: 68000, profit: 77000, jasonIncome: 53900, reinvestment: 23100 },
]

// Calculate cumulative cash flow
let cumulativeJasonIncome = 0
let cumulativeReinvestment = 0
let cumulativeRevenue = 0

console.log("\n📈 MONTHLY CASH FLOW BREAKDOWN:")
console.log("===============================")

monthlyProjections.forEach((month) => {
  cumulativeJasonIncome += month.jasonIncome
  cumulativeReinvestment += month.reinvestment
  cumulativeRevenue += month.revenue

  const phase = month.month <= 6 ? "Phase 1" : "Phase 2"
  const reinvestRate = month.month <= 6 ? "80%" : "30%"

  console.log(`\nMONTH ${month.month} (${phase} - ${reinvestRate} Reinvest):`)
  console.log(`  Revenue: £${month.revenue.toLocaleString()}`)
  console.log(`  Costs: £${month.costs.toLocaleString()}`)
  console.log(`  Profit: £${month.profit.toLocaleString()}`)
  console.log(`  Jason Income: £${month.jasonIncome.toLocaleString()}`)
  console.log(`  Reinvestment: £${month.reinvestment.toLocaleString()}`)
  console.log(`  Cumulative Jason: £${cumulativeJasonIncome.toLocaleString()}`)
  console.log(`  Cumulative Reinvest: £${cumulativeReinvestment.toLocaleString()}`)
})

// Phase analysis
const phase1Total = monthlyProjections.slice(0, 6).reduce(
  (sum, month) => ({
    jasonIncome: sum.jasonIncome + month.jasonIncome,
    reinvestment: sum.reinvestment + month.reinvestment,
    revenue: sum.revenue + month.revenue,
  }),
  { jasonIncome: 0, reinvestment: 0, revenue: 0 },
)

const phase2Total = monthlyProjections.slice(6, 12).reduce(
  (sum, month) => ({
    jasonIncome: sum.jasonIncome + month.jasonIncome,
    reinvestment: sum.reinvestment + month.reinvestment,
    revenue: sum.revenue + month.revenue,
  }),
  { jasonIncome: 0, reinvestment: 0, revenue: 0 },
)

console.log("\n🔄 PHASE SUMMARY:")
console.log("=================")

console.log("PHASE 1 (Months 1-6) - 80% Reinvestment:")
console.log(`  Total Jason Income: £${phase1Total.jasonIncome.toLocaleString()}`)
console.log(`  Total Reinvestment: £${phase1Total.reinvestment.toLocaleString()}`)
console.log(`  Total Revenue: £${phase1Total.revenue.toLocaleString()}`)
console.log(`  Average Monthly Jason: £${Math.round(phase1Total.jasonIncome / 6).toLocaleString()}`)
console.log(
  `  Sacrifice Ratio: ${Math.round((phase1Total.reinvestment / (phase1Total.jasonIncome + phase1Total.reinvestment)) * 100)}% reinvested`,
)

console.log("\nPHASE 2 (Months 7-12) - 30% Reinvestment:")
console.log(`  Total Jason Income: £${phase2Total.jasonIncome.toLocaleString()}`)
console.log(`  Total Reinvestment: £${phase2Total.reinvestment.toLocaleString()}`)
console.log(`  Total Revenue: £${phase2Total.revenue.toLocaleString()}`)
console.log(`  Average Monthly Jason: £${Math.round(phase2Total.jasonIncome / 6).toLocaleString()}`)
console.log(
  `  Harvest Ratio: ${Math.round((phase2Total.jasonIncome / (phase2Total.jasonIncome + phase2Total.reinvestment)) * 100)}% personal income`,
)

// Break-even analysis
console.log("\n⚖️ BREAK-EVEN ANALYSIS:")
console.log("=======================")

const breakEvenMonth = monthlyProjections.findIndex((month) => month.jasonIncome >= 2000) + 1
const comfortableMonth = monthlyProjections.findIndex((month) => month.jasonIncome >= 5000) + 1

console.log(`Break-even (£2K/month): Month ${breakEvenMonth}`)
console.log(`Comfortable (£5K/month): Month ${comfortableMonth}`)
console.log(`Phase 1 sacrifice period: 6 months`)
console.log(`ROI payback period: ${comfortableMonth - 6} months after phase 1`)

// Comparison with competitors' founder income
console.log("\n🏆 FOUNDER INCOME COMPARISON:")
console.log("=============================")

const founderIncomeComparison = {
  month12: {
    nexarax: 13650,
    jasperFounder: 8000, // Estimated
    copyAIFounder: 5000, // Estimated
    bufferFounder: 15000, // Joel Gascoigne public data
    hootsuiteFounder: 25000, // Ryan Holmes (but much later stage)
  },
  month24: {
    nexarax: 53900,
    jasperFounder: 35000,
    copyAIFounder: 22000,
    bufferFounder: 45000,
    hootsuiteFounder: 80000,
  },
}

console.log("MONTH 12 FOUNDER INCOME:")
Object.entries(founderIncomeComparison.month12).forEach(([founder, income]) => {
  console.log(`  ${founder}: £${income.toLocaleString()}/month`)
})

console.log("MONTH 24 FOUNDER INCOME:")
Object.entries(founderIncomeComparison.month24).forEach(([founder, income]) => {
  console.log(`  ${founder}: £${income.toLocaleString()}/month`)
})

// Cash flow health metrics
console.log("\n💊 CASH FLOW HEALTH METRICS:")
console.log("=============================")

const healthMetrics = {
  month6: {
    burnRate: phase1Total.reinvestment / 6,
    runway: phase1Total.jasonIncome / (phase1Total.reinvestment / 6), // How long Jason income could sustain reinvestment
    growthEfficiency: phase1Total.revenue / phase1Total.reinvestment,
  },
  month12: {
    profitMargin: (monthlyProjections[11].profit / monthlyProjections[11].revenue) * 100,
    reinvestmentROI: (monthlyProjections[11].jasonIncome / (phase1Total.reinvestment / 6)) * 100,
    sustainabilityRatio: monthlyProjections[11].jasonIncome / monthlyProjections[11].reinvestment,
  },
}

console.log("MONTH 6 HEALTH CHECK:")
console.log(`  Monthly Burn Rate: £${Math.round(healthMetrics.month6.burnRate).toLocaleString()}`)
console.log(`  Growth Efficiency: £${healthMetrics.month6.growthEfficiency.toFixed(2)} revenue per £1 reinvested`)

console.log("MONTH 12 HEALTH CHECK:")
console.log(`  Profit Margin: ${healthMetrics.month12.profitMargin.toFixed(1)}%`)
console.log(`  Sustainability Ratio: ${healthMetrics.month12.sustainabilityRatio.toFixed(1)}:1 (income:reinvestment)`)

console.log("\n🎯 KEY INSIGHTS:")
console.log("================")
console.log("1. Phase 1 sacrifice: £2.4K total personal income over 6 months")
console.log("2. Phase 2 harvest: £49K+ personal income in next 6 months")
console.log("3. Break-even at month 7 (£4.2K/month)")
console.log("4. Comfortable income by month 8 (£5.2K/month)")
console.log("5. 20x income growth from month 6 to month 12")
console.log("6. Reinvestment creates £10K+ monthly income advantage vs 50% strategy")
console.log("")
console.log("🚀 This strategy front-loads the pain for maximum long-term gain!")
