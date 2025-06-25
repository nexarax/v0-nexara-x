"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Cpu, Brain, RefreshCw, Eye, TrendingUp, Activity, CheckCircle, AlertCircle } from "lucide-react"

interface ModelStatusCardProps {
  model: {
    id: string
    name: string
    type: "anomaly_detection" | "time_series" | "classification" | "regression"
    platform: string
    metric: string
    accuracy: number
    lastTrained: Date
    status: "active" | "training" | "inactive" | "error"
    predictions: number
    preventions: number
    description: string
  }
  onTrainModel?: (modelId: string) => void
  onViewMetrics?: (modelId: string) => void
}

export function ModelStatusCard({ model, onTrainModel, onViewMetrics }: ModelStatusCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "training":
        return "bg-blue-100 text-blue-800"
      case "error":
        return "bg-red-100 text-red-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "training":
        return <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      case "inactive":
        return <Activity className="h-4 w-4 text-gray-600" />
      default:
        return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "time_series":
        return "bg-green-100 text-green-800"
      case "classification":
        return "bg-blue-100 text-blue-800"
      case "regression":
        return "bg-purple-100 text-purple-800"
      case "anomaly_detection":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const hoursAgo = Math.floor((Date.now() - model.lastTrained.getTime()) / (1000 * 60 * 60))
  const preventionRate = Math.round((model.preventions / model.predictions) * 100)

  return (
    <Card className="border-2 border-blue-200 hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Cpu className="h-5 w-5 text-blue-600" />
            {model.name}
          </CardTitle>
          <div className="flex gap-2">
            <Badge className={getTypeColor(model.type)}>{model.type.replace("_", " ").toUpperCase()}</Badge>
            <Badge className={getStatusColor(model.status)}>
              <div className="flex items-center gap-1">
                {getStatusIcon(model.status)}
                {model.status.toUpperCase()}
              </div>
            </Badge>
          </div>
        </div>
        <CardDescription>{model.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-green-50 rounded">
            <div className="text-lg font-bold text-green-600">{model.accuracy.toFixed(1)}%</div>
            <div className="text-xs text-gray-600">Accuracy</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded">
            <div className="text-lg font-bold text-blue-600">{model.predictions}</div>
            <div className="text-xs text-gray-600">Predictions</div>
          </div>
        </div>

        {/* Accuracy Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Model Accuracy</span>
            <span>{model.accuracy.toFixed(1)}%</span>
          </div>
          <Progress value={model.accuracy} className="h-2" />
        </div>

        {/* Model Details */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Platform:</span>
            <span className="font-semibold">{model.platform}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Metric:</span>
            <span className="font-semibold capitalize">{model.metric.replace("_", " ")}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Preventions:</span>
            <span className="font-semibold text-green-600">
              {model.preventions} ({preventionRate}%)
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Last Trained:</span>
            <span className="font-semibold">{hoursAgo === 0 ? "< 1h ago" : `${hoursAgo}h ago`}</span>
          </div>
        </div>

        {/* Performance Indicator */}
        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
          <TrendingUp className="h-4 w-4 text-green-500" />
          <span className="text-sm text-gray-700">Performance trending upward (+2.3% this week)</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={() => onTrainModel?.(model.id)}
            size="sm"
            disabled={model.status === "training"}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {model.status === "training" ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Training...
              </>
            ) : (
              <>
                <Brain className="h-4 w-4 mr-2" />
                Retrain
              </>
            )}
          </Button>
          <Button onClick={() => onViewMetrics?.(model.id)} size="sm" variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Metrics
          </Button>
        </div>

        <div className="text-xs text-gray-500 border-t pt-2">
          Model ID: {model.id} • Type: {model.type}
        </div>
      </CardContent>
    </Card>
  )
}
