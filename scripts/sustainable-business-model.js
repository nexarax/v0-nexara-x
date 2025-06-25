console.log("💰 SUSTAINABLE BUSINESS MODEL ANALYSIS")
console.log("=====================================")

// Pro Plan Economics with Generous Limits
const proPlanEconomics = {
  revenue: 29.0, // £29/month per user
  costs: {
    aiGeneration: 12.5, // £12.50 (500 images, 100 videos, 5hrs voice, 300 templates)
    platform: 3.0, // hosting, storage, CDN
    support: 2.0, // customer support
    payment: 1.2, // Stripe fees (4%)
    total: 18.7, // total costs per user
  },
  grossProfit: 10.3, // £10.30 per user per month
  grossMargin: 35.5, // 35.5% margin
}

console.log("📊 Pro Plan Unit Economics:")
console.log(`Revenue per user: £${proPlanEconomics.revenue}`)
console.log(`Total costs per user: £${proPlanEconomics.costs.total}`)
console.log(`Gross profit per user: £${proPlanEconomics.grossProfit}`)
console.log(`Gross margin: ${proPlanEconomics.grossMargin}%`)

// Jason's 80/20 Split Strategy
const reinvestmentStrategy = {
  grossProfit: 10.3, // per user per month
  reinvestmentRate: 0.8, // 80%
  personalRate: 0.2, // 20%
  reinvestmentPerUser: 8.24, // £8.24 per user for growth
  personalEarningsPerUser: 2.06, // £2.06 per user for Jason
}

console.log("\n💼 80/20 REINVESTMENT STRATEGY:")
console.log(`Reinvestment (80%): £${reinvestmentStrategy.reinvestmentPerUser} per user`)
console.log(`Personal earnings (20%): £${reinvestmentStrategy.personalEarningsPerUser} per user`)

// Monthly targets for different income levels
const incomeTargets = {
  survival: {
    targetIncome: 2000, // £2K/month personal
    usersNeeded: Math.ceil(2000 / reinvestmentStrategy.personalEarningsPerUser),
    monthlyRevenue: 0,
    reinvestmentBudget: 0,
  },
  comfortable: {
    targetIncome: 5000, // £5K/month personal
    usersNeeded: Math.ceil(5000 / reinvestmentStrategy.personalEarningsPerUser),
    monthlyRevenue: 0,
    reinvestmentBudget: 0,
  },
  excellent: {
    targetIncome: 10000, // £10K/month personal
    usersNeeded: Math.ceil(10000 / reinvestmentStrategy.personalEarningsPerUser),
    monthlyRevenue: 0,
    reinvestmentBudget: 0,
  },
}

// Calculate revenue and reinvestment for each target
Object.keys(incomeTargets).forEach((level) => {
  const target = incomeTargets[level]
  target.monthlyRevenue = target.usersNeeded * proPlanEconomics.revenue
  target.reinvestmentBudget = target.usersNeeded * reinvestmentStrategy.reinvestmentPerUser
})

console.log("\n🎯 INCOME TARGETS:")
Object.entries(incomeTargets).forEach(([level, data]) => {
  console.log(`${level.toUpperCase()}:`)
  console.log(`  Personal income: £${data.targetIncome}/month`)
  console.log(`  Users needed: ${data.usersNeeded}`)
  console.log(`  Monthly revenue: £${data.monthlyRevenue}`)
  console.log(`  Reinvestment budget: £${data.reinvestmentBudget}`)
  console.log("")
})

// 6-month growth projection
const growthProjection = {
  month1: { users: 500, revenue: 14500, personalIncome: 1030, reinvestment: 4120 },
  month2: { users: 800, revenue: 23200, personalIncome: 1648, reinvestment: 6592 },
  month3: { users: 1200, revenue: 34800, personalIncome: 2472, reinvestment: 9888 },
  month4: { users: 1800, revenue: 52200, personalIncome: 3708, reinvestment: 14832 },
  month5: { users: 2500, revenue: 72500, personalIncome: 5150, reinvestment: 20600 },
  month6: { users: 3500, revenue: 101500, personalIncome: 7210, reinvestment: 28840 },
}

console.log("📈 6-MONTH GROWTH PROJECTION:")
Object.entries(growthProjection).forEach(([month, data]) => {
  console.log(`${month.toUpperCase()}:`)
  console.log(`  Users: ${data.users}`)
  console.log(`  Revenue: £${data.revenue}`)
  console.log(`  Your income: £${data.personalIncome}`)
  console.log(`  Reinvestment: £${data.reinvestment}`)
  console.log("")
})

// What reinvestment budget can buy
const reinvestmentOptions = {
  month3: {
    budget: 9888,
    options: [
      "£5K - Senior developer (part-time)",
      "£3K - Marketing campaigns",
      "£1K - AI infrastructure scaling",
      "£888 - Tools and software",
    ],
  },
  month6: {
    budget: 28840,
    options: [
      "£15K - Full-time developer",
      "£8K - Aggressive marketing",
      "£3K - AI infrastructure",
      "£2K - Customer success manager",
      "£840 - Tools and contingency",
    ],
  },
}

console.log("💸 REINVESTMENT OPTIONS:")
Object.entries(reinvestmentOptions).forEach(([month, data]) => {
  console.log(`${month.toUpperCase()} - £${data.budget} budget:`)
  data.options.forEach((option) => console.log(`  • ${option}`))
  console.log("")
})

// Comparison: Unlimited vs Generous Limits
const comparison = {
  unlimited: {
    averageCost: 25.0, // £25 per user (heavy users kill margins)
    grossProfit: 4.0, // £4 per user
    personalIncome: 0.8, // £0.80 per user (20%)
    usersFor5K: Math.ceil(5000 / 0.8), // 6,250 users needed!
  },
  generousLimits: {
    averageCost: 18.7, // £18.70 per user
    grossProfit: 10.3, // £10.30 per user
    personalIncome: 2.06, // £2.06 per user (20%)
    usersFor5K: Math.ceil(5000 / 2.06), // 2,427 users needed
  },
}

console.log("⚖️ UNLIMITED vs GENEROUS LIMITS:")
console.log("Unlimited approach:")
console.log(`  Users needed for £5K income: ${comparison.unlimited.usersFor5K}`)
console.log(`  Personal income per user: £${comparison.unlimited.personalIncome}`)
console.log("")
console.log("Generous limits approach:")
console.log(`  Users needed for £5K income: ${comparison.generousLimits.usersFor5K}`)
console.log(`  Personal income per user: £${comparison.generousLimits.personalIncome}`)
console.log("")
console.log(`DIFFERENCE: ${comparison.unlimited.usersFor5K - comparison.generousLimits.usersFor5K} fewer users needed!`)

// Success milestones
const milestones = {
  breakeven: {
    users: 100,
    personalIncome: 206,
    milestone: "Cover basic expenses",
  },
  partTime: {
    users: 1000,
    personalIncome: 2060,
    milestone: "Replace part-time job",
  },
  fullTime: {
    users: 2500,
    personalIncome: 5150,
    milestone: "Replace full-time job",
  },
  scale: {
    users: 5000,
    personalIncome: 10300,
    milestone: "Serious business income",
  },
}

console.log("🎯 SUCCESS MILESTONES:")
Object.entries(milestones).forEach(([level, data]) => {
  console.log(`${data.milestone}: ${data.users} users = £${data.personalIncome}/month personal`)
})
