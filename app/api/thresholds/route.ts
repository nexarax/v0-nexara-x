import { NextResponse } from "next/server"

// API endpoint for saving threshold configurations
export async function POST(request: Request) {
  try {
    const thresholds = await request.json()

    // Validate threshold configurations
    const validationErrors = validateThresholds(thresholds)
    if (validationErrors.length > 0) {
      return NextResponse.json({ success: false, errors: validationErrors }, { status: 400 })
    }

    // Save to database (simulated)
    console.log("Saving threshold configurations:", thresholds)

    // Update monitoring system with new thresholds
    await updateMonitoringSystem(thresholds)

    return NextResponse.json({
      success: true,
      message: "Threshold configurations saved successfully",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to save threshold configurations" }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Fetch current threshold configurations
    const thresholds = await getCurrentThresholds()

    return NextResponse.json({
      success: true,
      thresholds,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch threshold configurations" }, { status: 500 })
  }
}

function validateThresholds(thresholds: any[]): string[] {
  const errors: string[] = []

  for (const config of thresholds) {
    // Validate that warning thresholds are less than critical thresholds
    for (const [metricKey, metric] of Object.entries(config.metrics)) {
      const m = metric as any
      if (m.warning >= m.critical) {
        errors.push(`${config.platform}: ${metricKey} warning threshold must be less than critical threshold`)
      }

      if (m.warning <= 0 || m.critical <= 0) {
        errors.push(`${config.platform}: ${metricKey} thresholds must be positive numbers`)
      }
    }

    // Validate business hours
    if (config.businessHours.enabled) {
      if (config.businessHours.multiplier <= 0 || config.businessHours.multiplier > 2) {
        errors.push(`${config.platform}: Business hours multiplier must be between 0.1 and 2.0`)
      }
    }

    // Validate escalation settings
    if (config.escalation.warningDelay < 0 || config.escalation.criticalDelay < 0) {
      errors.push(`${config.platform}: Escalation delays cannot be negative`)
    }

    if (config.escalation.maxRetries < 1 || config.escalation.maxRetries > 10) {
      errors.push(`${config.platform}: Max retries must be between 1 and 10`)
    }
  }

  return errors
}

async function updateMonitoringSystem(thresholds: any[]) {
  // Update the monitoring system with new thresholds
  // This would integrate with your actual monitoring infrastructure
  console.log("Updating monitoring system with new thresholds...")

  // Simulate API call to monitoring system
  await new Promise((resolve) => setTimeout(resolve, 500))

  return true
}

async function getCurrentThresholds() {
  // Fetch current thresholds from database
  // This is simulated - replace with actual database query
  return [
    {
      platform: "Instagram",
      lastUpdated: new Date().toISOString(),
      // ... threshold configuration
    },
  ]
}
