console.log("💰 WEALTH ACCUMULATION CALCULATOR")
console.log("==================================")

// Jason's wealth building scenarios
const wealthScenarios = {
  conservative: {
    name: "Conservative Growth",
    monthlyGrowthRate: 0.1, // 10% monthly growth
    churnRate: 0.08,
    averageRevenue: 25,
    startingUsers: 100,
  },
  moderate: {
    name: "Moderate Growth",
    monthlyGrowthRate: 0.15, // 15% monthly growth
    churnRate: 0.07,
    averageRevenue: 30,
    startingUsers: 100,
  },
  aggressive: {
    name: "Aggressive Growth",
    monthlyGrowthRate: 0.2, // 20% monthly growth
    churnRate: 0.06,
    averageRevenue: 35,
    startingUsers: 100,
  },
  viral: {
    name: "Viral Growth",
    monthlyGrowthRate: 0.25, // 25% monthly growth
    churnRate: 0.05,
    averageRevenue: 32,
    startingUsers: 100,
  },
}

// Calculate wealth accumulation for each scenario
function calculateWealthAccumulation(scenario) {
  let users = scenario.startingUsers
  let totalWealth = 0
  let monthlyIncome = 0
  const timeline = []

  for (let month = 1; month <= 60; month++) {
    // Calculate monthly metrics
    const monthlyRevenue = users * scenario.averageRevenue
    const monthlyCosts = users * 15.2 // Fixed cost per user
    const monthlyProfit = monthlyRevenue - monthlyCosts
    monthlyIncome = monthlyProfit * 0.2 // Jason's 20%
    const monthlyReinvestment = monthlyProfit * 0.8

    // Accumulate wealth
    totalWealth += monthlyIncome

    // Apply growth and churn
    users = Math.floor(users * (1 + scenario.monthlyGrowthRate) * (1 - scenario.churnRate))

    // Store key milestones
    if (month % 12 === 0) {
      timeline.push({
        year: month / 12,
        users,
        monthlyIncome: Math.round(monthlyIncome),
        totalWealth: Math.round(totalWealth),
        monthlyRevenue: Math.round(monthlyRevenue),
      })
    }
  }

  return { scenario: scenario.name, timeline }
}

// Calculate all scenarios
console.log("\n📈 WEALTH ACCUMULATION PROJECTIONS:")
console.log("====================================")

Object.values(wealthScenarios).forEach((scenario) => {
  const result = calculateWealthAccumulation(scenario)
  console.log(`\n${result.scenario.toUpperCase()}:`)
  result.timeline.forEach((milestone) => {
    console.log(
      `  Year ${milestone.year}: ${milestone.users} users, £${milestone.monthlyIncome}/month, £${milestone.totalWealth} total wealth`,
    )
  })
})

// Millionaire timeline
console.log("\n🏆 MILLIONAIRE TIMELINE:")
console.log("========================")

Object.values(wealthScenarios).forEach((scenario) => {
  const result = calculateWealthAccumulation(scenario)
  const millionaireYear = result.timeline.find((m) => m.totalWealth >= 1000000)
  if (millionaireYear) {
    console.log(`${scenario.name}: Millionaire by Year ${millionaireYear.year}`)
  } else {
    const finalYear = result.timeline[result.timeline.length - 1]
    console.log(
      `${scenario.name}: £${finalYear.totalWealth} by Year 5 (${Math.round((finalYear.totalWealth / 1000000) * 100)}% to millionaire)`,
    )
  }
})

// Financial independence milestones
const milestones = {
  comfortable: 5000, // £5K/month
  wealthy: 15000, // £15K/month
  rich: 30000, // £30K/month
  veryRich: 50000, // £50K/month
}

console.log("\n🎯 FINANCIAL INDEPENDENCE MILESTONES:")
console.log("=====================================")

Object.entries(milestones).forEach(([level, targetIncome]) => {
  console.log(`\n${level.toUpperCase()} (£${targetIncome}/month):`)

  Object.values(wealthScenarios).forEach((scenario) => {
    const result = calculateWealthAccumulation(scenario)
    const milestone = result.timeline.find((m) => m.monthlyIncome >= targetIncome)
    if (milestone) {
      console.log(`  ${scenario.name}: Year ${milestone.year}`)
    } else {
      console.log(`  ${scenario.name}: Not reached by Year 5`)
    }
  })
})
