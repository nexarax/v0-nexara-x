"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Activity,
  Shield,
  Eye,
  Settings,
  Clock,
  Target,
  Zap,
} from "lucide-react"

interface PredictionCardProps {
  prediction: {
    id: string
    platform: string
    issueType: string
    severity: "low" | "medium" | "high" | "critical"
    probability: number
    predictedTime: Date
    confidence: number
    description: string
    recommendedActions: string[]
    status: "pending" | "prevented" | "occurred" | "false_positive"
    modelUsed: string
    dataPoints: number
    trend: "increasing" | "decreasing" | "stable"
  }
  onExecutePrevention?: (predictionId: string) => void
  onViewDetails?: (predictionId: string) => void
}

export function PredictionCard({ prediction, onExecutePrevention, onViewDetails }: PredictionCardProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-300"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-300"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "prevented":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-blue-100 text-blue-800"
      case "occurred":
        return "bg-red-100 text-red-800"
      case "false_positive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "increasing":
        return <TrendingUp className="h-4 w-4 text-red-500" />
      case "decreasing":
        return <TrendingDown className="h-4 w-4 text-green-500" />
      case "stable":
        return <Activity className="h-4 w-4 text-blue-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  const timeUntilPrediction = Math.floor((prediction.predictedTime.getTime() - Date.now()) / (1000 * 60))

  return (
    <Card className="border-2 border-purple-200 hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-purple-600" />
            {prediction.platform} - {prediction.issueType}
          </CardTitle>
          <div className="flex gap-2">
            <Badge className={getSeverityColor(prediction.severity)}>{prediction.severity.toUpperCase()}</Badge>
            <Badge className={getStatusColor(prediction.status)}>{prediction.status.toUpperCase()}</Badge>
          </div>
        </div>
        <CardDescription className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {timeUntilPrediction > 0 ? `In ${timeUntilPrediction} minutes` : "Overdue"}
          </span>
          <span className="flex items-center gap-1">
            <Target className="h-4 w-4" />
            {prediction.confidence}% confidence
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-700">{prediction.description}</p>

        {/* Prediction Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-red-50 rounded">
            <div className="text-lg font-bold text-red-600">{prediction.probability.toFixed(1)}%</div>
            <div className="text-xs text-gray-600">Probability</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded">
            <div className="text-lg font-bold text-blue-600">{prediction.confidence}%</div>
            <div className="text-xs text-gray-600">Confidence</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded">
            <div className="text-lg font-bold text-green-600">{prediction.dataPoints}</div>
            <div className="text-xs text-gray-600">Data Points</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded">
            <div className="flex items-center justify-center gap-1">
              {getTrendIcon(prediction.trend)}
              <span className="text-lg font-bold text-purple-600 capitalize">{prediction.trend}</span>
            </div>
            <div className="text-xs text-gray-600">Trend</div>
          </div>
        </div>

        {/* Probability Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Risk Level</span>
            <span>{prediction.probability.toFixed(1)}%</span>
          </div>
          <Progress value={prediction.probability} className="h-2" />
        </div>

        {/* Recommended Actions */}
        <div>
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <Zap className="h-4 w-4 text-yellow-500" />
            Recommended Actions
          </h4>
          <div className="space-y-1">
            {prediction.recommendedActions.slice(0, 3).map((action, index) => (
              <div key={index} className="flex items-center gap-2 text-sm p-2 bg-gray-50 rounded">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                {action}
              </div>
            ))}
            {prediction.recommendedActions.length > 3 && (
              <div className="text-xs text-gray-500 pl-4">+{prediction.recommendedActions.length - 3} more actions</div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        {prediction.status === "pending" && (
          <div className="flex gap-2">
            <Button
              onClick={() => onExecutePrevention?.(prediction.id)}
              className="bg-green-600 hover:bg-green-700"
              size="sm"
            >
              <Shield className="h-4 w-4 mr-2" />
              Execute Prevention
            </Button>
            <Button onClick={() => onViewDetails?.(prediction.id)} variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Adjust
            </Button>
          </div>
        )}

        <div className="text-xs text-gray-500 border-t pt-2">
          Model: {prediction.modelUsed} • Generated: {new Date().toLocaleTimeString()}
        </div>
      </CardContent>
    </Card>
  )
}
