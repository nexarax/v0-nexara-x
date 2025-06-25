"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, CheckCircle, XCircle, Clock } from "lucide-react"

interface RecoveryMechanismProps {
  mechanism: {
    id: string
    name: string
    platform: string
    issueType: string
    enabled: boolean
    successRate: number
    avgRecoveryTime: number
  }
  onToggle: (id: string) => void
  onTest: (platform: string, issueType: string) => void
}

export function RecoveryMechanism({ mechanism, onToggle, onTest }: RecoveryMechanismProps) {
  const [isTesting, setIsTesting] = useState(false)
  const [testResult, setTestResult] = useState<"success" | "failed" | null>(null)

  const handleTest = async () => {
    setIsTesting(true)
    setTestResult(null)

    try {
      await onTest(mechanism.platform, mechanism.issueType)

      // Simulate test result
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setTestResult(Math.random() > 0.2 ? "success" : "failed")
    } catch (error) {
      setTestResult("failed")
    } finally {
      setIsTesting(false)
      setTimeout(() => setTestResult(null), 3000)
    }
  }

  return (
    <Card className="border-2 border-blue-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{mechanism.name}</CardTitle>
          <div className="flex items-center gap-2">
            <Badge className={mechanism.enabled ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
              {mechanism.enabled ? "ENABLED" : "DISABLED"}
            </Badge>
            {testResult && (
              <Badge className={testResult === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                {testResult === "success" ? (
                  <CheckCircle className="h-3 w-3 mr-1" />
                ) : (
                  <XCircle className="h-3 w-3 mr-1" />
                )}
                {testResult.toUpperCase()}
              </Badge>
            )}
          </div>
        </div>
        <CardDescription>
          {mechanism.platform} • {mechanism.issueType}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-center p-2 bg-green-50 rounded">
            <div className="font-bold text-green-600">{mechanism.successRate}%</div>
            <div className="text-xs text-gray-600">Success Rate</div>
          </div>
          <div className="text-center p-2 bg-blue-50 rounded">
            <div className="font-bold text-blue-600">{mechanism.avgRecoveryTime}s</div>
            <div className="text-xs text-gray-600">Avg Recovery</div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => onToggle(mechanism.id)}
            size="sm"
            variant={mechanism.enabled ? "destructive" : "default"}
          >
            {mechanism.enabled ? "Disable" : "Enable"}
          </Button>
          <Button onClick={handleTest} size="sm" variant="outline" disabled={!mechanism.enabled || isTesting}>
            {isTesting ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Testing...
              </>
            ) : (
              <>
                <Clock className="h-4 w-4 mr-2" />
                Test
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
