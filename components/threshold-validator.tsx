"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react"

interface ValidationResult {
  type: "error" | "warning" | "info" | "success"
  message: string
  metric?: string
  platform?: string
}

interface ThresholdValidatorProps {
  thresholds: any[]
  onValidationChange: (isValid: boolean, results: ValidationResult[]) => void
}

export default function ThresholdValidator({ thresholds, onValidationChange }: ThresholdValidatorProps) {
  const [validationResults, setValidationResults] = useState<ValidationResult[]>([])

  const validateThresholds = () => {
    const results: ValidationResult[] = []

    for (const config of thresholds) {
      // Check threshold logic
      for (const [metricKey, metric] of Object.entries(config.metrics)) {
        const m = metric as any

        if (m.warning >= m.critical) {
          results.push({
            type: "error",
            message: `Warning threshold (${m.warning}) must be less than critical threshold (${m.critical})`,
            metric: metricKey,
            platform: config.platform,
          })
        }

        // Platform-specific recommendations
        if (config.platform === "Instagram" && metricKey === "responseTime") {
          if (m.warning > 3000) {
            results.push({
              type: "warning",
              message: "Instagram response time warning threshold is quite high - consider lowering for better UX",
              metric: metricKey,
              platform: config.platform,
            })
          }
        }

        if (config.platform === "Twitter/X" && metricKey === "rateLimit") {
          if (m.warning < 85) {
            results.push({
              type: "info",
              message: "Twitter rate limit warning could be higher - Twitter API is generally reliable",
              metric: metricKey,
              platform: config.platform,
            })
          }
        }

        if (config.platform === "TikTok" && metricKey === "failureRate") {
          if (m.warning < 15) {
            results.push({
              type: "info",
              message: "TikTok has higher natural failure rates - consider increasing threshold",
              metric: metricKey,
              platform: config.platform,
            })
          }
        }
      }

      // Business hours validation
      if (config.businessHours.enabled && config.businessHours.multiplier > 1) {
        results.push({
          type: "warning",
          message: "Business hours multiplier > 1 makes alerts less sensitive during peak times",
          platform: config.platform,
        })
      }

      // Escalation validation
      if (config.escalation.criticalDelay > 5) {
        results.push({
          type: "warning",
          message: "Critical alert delay > 5 minutes may be too long for urgent issues",
          platform: config.platform,
        })
      }
    }

    // Add success message if no errors
    if (results.filter((r) => r.type === "error").length === 0) {
      results.push({
        type: "success",
        message: "All threshold configurations are valid and ready to deploy",
      })
    }

    setValidationResults(results)
    onValidationChange(results.filter((r) => r.type === "error").length === 0, results)
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <Info className="h-4 w-4 text-gray-500" />
    }
  }

  const getColor = (type: string) => {
    switch (type) {
      case "error":
        return "bg-red-100 text-red-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "info":
        return "bg-blue-100 text-blue-800"
      case "success":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="border-2 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-6 w-6 text-blue-600" />
          Threshold Validation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {validationResults.map((result, index) => (
            <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
              {getIcon(result.type)}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className={getColor(result.type)}>{result.type.toUpperCase()}</Badge>
                  {result.platform && <Badge variant="outline">{result.platform}</Badge>}
                  {result.metric && <Badge variant="outline">{result.metric}</Badge>}
                </div>
                <p className="text-sm text-gray-700">{result.message}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
