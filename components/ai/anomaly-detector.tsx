"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, Activity, Bell, Eye, Instagram, Twitter, Youtube } from "lucide-react"

interface AnomalyDetectorProps {
  anomalies: Array<{
    platform: string
    metric: string
    currentValue: number
    expectedValue: number
    deviation: number
    anomalyScore: number
    threshold: number
    isAnomaly: boolean
    trend: number[]
    timestamp: Date
  }>
  onInvestigate?: (platform: string, metric: string) => void
  onCreateAlert?: (platform: string, metric: string) => void
}

export function AnomalyDetector({ anomalies, onInvestigate, onCreateAlert }: AnomalyDetectorProps) {
  const platformIcons = {
    Instagram: <Instagram className="h-5 w-5 text-pink-600" />,
    TikTok: (
      <div className="h-5 w-5 bg-black rounded-sm flex items-center justify-center text-white text-xs font-bold">T</div>
    ),
    "Twitter/X": <Twitter className="h-5 w-5 text-blue-500" />,
    YouTube: <Youtube className="h-5 w-5 text-red-600" />,
  }

  const getDeviationColor = (deviation: number) => {
    const absDeviation = Math.abs(deviation)
    if (absDeviation > 50) return "text-red-600"
    if (absDeviation > 25) return "text-orange-600"
    if (absDeviation > 10) return "text-yellow-600"
    return "text-green-600"
  }

  const getAnomalyScoreColor = (score: number) => {
    if (score > 0.9) return "bg-red-100 text-red-800"
    if (score > 0.75) return "bg-orange-100 text-orange-800"
    if (score > 0.5) return "bg-yellow-100 text-yellow-800"
    return "bg-green-100 text-green-800"
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {anomalies.map((anomaly, index) => (
        <Card key={index} className="border-2 border-yellow-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                {platformIcons[anomaly.platform as keyof typeof platformIcons]}
                {anomaly.platform} - {anomaly.metric.replace("_", " ")}
              </CardTitle>
              <Badge className={anomaly.isAnomaly ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}>
                {anomaly.isAnomaly ? "ANOMALY" : "NORMAL"}
              </Badge>
            </div>
            <CardDescription>
              Score: {(anomaly.anomalyScore * 100).toFixed(1)}% • Threshold: {anomaly.threshold * 100}%
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Current vs Expected Values */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-red-50 rounded">
                <div className="text-lg font-bold text-red-600">{anomaly.currentValue.toFixed(1)}</div>
                <div className="text-xs text-gray-600">Current Value</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded">
                <div className="text-lg font-bold text-blue-600">{anomaly.expectedValue.toFixed(1)}</div>
                <div className="text-xs text-gray-600">Expected Value</div>
              </div>
            </div>

            {/* Anomaly Score Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Anomaly Score</span>
                <span>{(anomaly.anomalyScore * 100).toFixed(1)}%</span>
              </div>
              <Progress value={anomaly.anomalyScore * 100} className="h-2" />
            </div>

            {/* Metrics */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Deviation:</span>
                <span className={`font-semibold ${getDeviationColor(anomaly.deviation)}`}>
                  {anomaly.deviation > 0 ? "+" : ""}
                  {anomaly.deviation.toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Threshold:</span>
                <span className="font-semibold">{anomaly.threshold * 100}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Last Updated:</span>
                <span className="font-semibold">{anomaly.timestamp.toLocaleTimeString()}</span>
              </div>
            </div>

            {/* Trend Visualization */}
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Activity className="h-4 w-4 text-blue-500" />
                Recent Trend
              </h4>
              <div className="flex items-end gap-1 h-16 bg-gray-50 rounded p-2">
                {anomaly.trend.map((value, i) => {
                  const height = (value / Math.max(...anomaly.trend)) * 100
                  const isLast = i === anomaly.trend.length - 1
                  return (
                    <div
                      key={i}
                      className={`rounded-t transition-all ${
                        isLast ? "bg-red-500" : "bg-blue-500"
                      } ${isLast ? "opacity-100" : "opacity-70"}`}
                      style={{
                        height: `${height}%`,
                        width: `${100 / anomaly.trend.length}%`,
                      }}
                    ></div>
                  )
                })}
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>6 periods ago</span>
                <span>Now</span>
              </div>
            </div>

            {/* Severity Indicator */}
            <div
              className="flex items-center gap-2 p-2 rounded"
              style={{
                backgroundColor: anomaly.isAnomaly ? "#fef2f2" : "#f0fdf4",
              }}
            >
              {anomaly.isAnomaly ? (
                <AlertTriangle className="h-4 w-4 text-red-500" />
              ) : (
                <Activity className="h-4 w-4 text-green-500" />
              )}
              <span className={`text-sm font-medium ${anomaly.isAnomaly ? "text-red-700" : "text-green-700"}`}>
                {anomaly.isAnomaly
                  ? `Anomaly detected - ${anomaly.deviation > 0 ? "above" : "below"} normal range`
                  : "Operating within normal parameters"}
              </span>
            </div>

            {/* Action Buttons */}
            {anomaly.isAnomaly && (
              <div className="flex gap-2">
                <Button
                  onClick={() => onInvestigate?.(anomaly.platform, anomaly.metric)}
                  size="sm"
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Investigate
                </Button>
                <Button onClick={() => onCreateAlert?.(anomaly.platform, anomaly.metric)} size="sm" variant="outline">
                  <Bell className="h-4 w-4 mr-2" />
                  Create Alert
                </Button>
              </div>
            )}

            <div className="text-xs text-gray-500 border-t pt-2">
              Metric: {anomaly.metric} • Platform: {anomaly.platform}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
