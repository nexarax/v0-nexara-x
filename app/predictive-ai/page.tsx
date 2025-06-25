"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Instagram,
  Twitter,
  Youtube,
  Brain,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Activity,
  Shield,
  Eye,
  Settings,
  Download,
  RefreshCw,
  Play,
  Pause,
  BarChart3,
  PieChart,
  Cpu,
  Lightbulb,
  Wrench,
  Bell,
  ArrowRight,
  Calendar,
  Gauge,
  BotIcon as Robot,
  CheckCircle2,
} from "lucide-react"

interface PredictionModel {
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

interface Prediction {
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

interface PreventiveAction {
  id: string
  predictionId: string
  action: string
  type: "automatic" | "manual" | "scheduled"
  status: "pending" | "executing" | "completed" | "failed"
  executedAt?: Date
  result?: string
  impact: string
  confidence: number
}

interface MLMetrics {
  totalPredictions: number
  accuratepredictions: number
  falsePositives: number
  preventedIssues: number
  modelsActive: number
  dataPointsProcessed: number
  avgConfidence: number
  predictionLatency: number
}

interface AnomalyDetection {
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
}

export default function PredictiveAIPage() {
  const [models, setModels] = useState<PredictionModel[]>([])
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [preventiveActions, setPreventiveActions] = useState<PreventiveAction[]>([])
  const [mlMetrics, setMLMetrics] = useState<MLMetrics>({
    totalPredictions: 0,
    accuratepredictions: 0,
    falsePositives: 0,
    preventedIssues: 0,
    modelsActive: 0,
    dataPointsProcessed: 0,
    avgConfidence: 0,
    predictionLatency: 0,
  })
  const [anomalies, setAnomalies] = useState<AnomalyDetection[]>([])
  const [isAIActive, setIsAIActive] = useState(true)
  const [selectedTimeframe, setSelectedTimeframe] = useState("24h")
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  useEffect(() => {
    initializePredictiveSystem()

    const interval = setInterval(() => {
      if (isAIActive) {
        updatePredictions()
        detectAnomalies()
      }
    }, 10000) // Update every 10 seconds

    return () => clearInterval(interval)
  }, [isAIActive])

  const initializePredictiveSystem = () => {
    // Initialize ML models
    const mlModels: PredictionModel[] = [
      {
        id: "instagram-response-predictor",
        name: "Instagram Response Time Predictor",
        type: "time_series",
        platform: "Instagram",
        metric: "response_time",
        accuracy: 94.2,
        lastTrained: new Date(Date.now() - 2 * 60 * 60 * 1000),
        status: "active",
        predictions: 1247,
        preventions: 89,
        description: "LSTM model predicting API response time spikes based on historical patterns",
      },
      {
        id: "tiktok-auth-failure-predictor",
        name: "TikTok Auth Failure Predictor",
        type: "classification",
        platform: "TikTok",
        metric: "auth_failures",
        accuracy: 87.8,
        lastTrained: new Date(Date.now() - 4 * 60 * 60 * 1000),
        status: "active",
        predictions: 892,
        preventions: 156,
        description: "Random Forest classifier predicting authentication token expiry and failures",
      },
      {
        id: "twitter-rate-limit-predictor",
        name: "Twitter Rate Limit Predictor",
        type: "regression",
        platform: "Twitter/X",
        metric: "rate_limit_usage",
        accuracy: 91.5,
        lastTrained: new Date(Date.now() - 1 * 60 * 60 * 1000),
        status: "active",
        predictions: 2156,
        preventions: 234,
        description: "Linear regression model predicting rate limit exhaustion based on usage patterns",
      },
      {
        id: "youtube-quota-predictor",
        name: "YouTube Quota Predictor",
        type: "time_series",
        platform: "YouTube",
        metric: "api_quota",
        accuracy: 89.3,
        lastTrained: new Date(Date.now() - 6 * 60 * 60 * 1000),
        status: "active",
        predictions: 567,
        preventions: 78,
        description: "ARIMA model predicting daily quota exhaustion and upload failures",
      },
      {
        id: "universal-anomaly-detector",
        name: "Universal Anomaly Detector",
        type: "anomaly_detection",
        platform: "All",
        metric: "system_health",
        accuracy: 96.7,
        lastTrained: new Date(Date.now() - 30 * 60 * 1000),
        status: "active",
        predictions: 3421,
        preventions: 445,
        description: "Isolation Forest model detecting unusual patterns across all platforms",
      },
      {
        id: "engagement-drop-predictor",
        name: "Engagement Drop Predictor",
        type: "classification",
        platform: "All",
        metric: "engagement_rate",
        accuracy: 85.4,
        lastTrained: new Date(Date.now() - 8 * 60 * 60 * 1000),
        status: "training",
        predictions: 1834,
        preventions: 267,
        description: "Gradient Boosting model predicting significant engagement rate drops",
      },
    ]
    setModels(mlModels)

    // Initialize predictions
    const currentPredictions: Prediction[] = [
      {
        id: "pred-1",
        platform: "Instagram",
        issueType: "Response Time Spike",
        severity: "high",
        probability: 87.3,
        predictedTime: new Date(Date.now() + 45 * 60 * 1000), // 45 minutes from now
        confidence: 94.2,
        description: "API response time likely to exceed 3s threshold due to increased traffic pattern",
        recommendedActions: [
          "Scale API infrastructure proactively",
          "Enable request caching",
          "Implement circuit breaker pattern",
          "Alert operations team",
        ],
        status: "pending",
        modelUsed: "instagram-response-predictor",
        dataPoints: 2847,
        trend: "increasing",
      },
      {
        id: "pred-2",
        platform: "TikTok",
        issueType: "Authentication Token Expiry",
        severity: "critical",
        probability: 95.8,
        predictedTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
        confidence: 87.8,
        description: "OAuth token will expire within 2 hours based on refresh pattern analysis",
        recommendedActions: [
          "Trigger proactive token refresh",
          "Verify refresh token validity",
          "Update token expiry monitoring",
          "Prepare fallback authentication",
        ],
        status: "pending",
        modelUsed: "tiktok-auth-failure-predictor",
        dataPoints: 1456,
        trend: "stable",
      },
      {
        id: "pred-3",
        platform: "Twitter/X",
        issueType: "Rate Limit Exhaustion",
        severity: "medium",
        probability: 73.4,
        predictedTime: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 hours from now
        confidence: 91.5,
        description: "Current API usage trend suggests rate limit will be reached in ~3 hours",
        recommendedActions: [
          "Implement request throttling",
          "Queue non-urgent requests",
          "Distribute load across time windows",
          "Consider additional API keys",
        ],
        status: "pending",
        modelUsed: "twitter-rate-limit-predictor",
        dataPoints: 3241,
        trend: "increasing",
      },
      {
        id: "pred-4",
        platform: "YouTube",
        issueType: "Daily Quota Exhaustion",
        severity: "high",
        probability: 91.2,
        predictedTime: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
        confidence: 89.3,
        description: "Daily API quota consumption pattern indicates exhaustion by 6 PM today",
        recommendedActions: [
          "Prioritize critical uploads",
          "Defer non-essential API calls",
          "Implement quota-aware scheduling",
          "Prepare quota reset procedures",
        ],
        status: "pending",
        modelUsed: "youtube-quota-predictor",
        dataPoints: 892,
        trend: "increasing",
      },
      {
        id: "pred-5",
        platform: "All",
        issueType: "System-wide Anomaly",
        severity: "low",
        probability: 68.7,
        predictedTime: new Date(Date.now() + 8 * 60 * 60 * 1000), // 8 hours from now
        confidence: 96.7,
        description: "Unusual pattern detected in cross-platform metrics suggesting potential issue",
        recommendedActions: [
          "Increase monitoring frequency",
          "Review system logs",
          "Check external dependencies",
          "Prepare incident response team",
        ],
        status: "pending",
        modelUsed: "universal-anomaly-detector",
        dataPoints: 5678,
        trend: "stable",
      },
    ]
    setPredictions(currentPredictions)

    // Initialize preventive actions
    const actions: PreventiveAction[] = [
      {
        id: "action-1",
        predictionId: "pred-2",
        action: "Proactive OAuth Token Refresh",
        type: "automatic",
        status: "executing",
        impact: "Prevents 2-hour service disruption",
        confidence: 87.8,
      },
      {
        id: "action-2",
        predictionId: "pred-1",
        action: "Scale API Infrastructure",
        type: "scheduled",
        status: "pending",
        impact: "Reduces response time by 40%",
        confidence: 94.2,
      },
      {
        id: "action-3",
        predictionId: "pred-3",
        action: "Implement Request Throttling",
        type: "manual",
        status: "completed",
        executedAt: new Date(Date.now() - 30 * 60 * 1000),
        result: "Successfully reduced API usage by 25%",
        impact: "Extends rate limit window by 2 hours",
        confidence: 91.5,
      },
    ]
    setPreventiveActions(actions)

    // Initialize metrics
    setMLMetrics({
      totalPredictions: 8517,
      accuratepredictions: 7834,
      falsePositives: 683,
      preventedIssues: 1269,
      modelsActive: 5,
      dataPointsProcessed: 2847592,
      avgConfidence: 91.2,
      predictionLatency: 145,
    })

    // Initialize anomaly detection
    generateAnomalies()
  }

  const generateAnomalies = () => {
    const anomalyData: AnomalyDetection[] = [
      {
        platform: "Instagram",
        metric: "response_time",
        currentValue: 2847,
        expectedValue: 1250,
        deviation: 127.8,
        anomalyScore: 0.87,
        threshold: 0.75,
        isAnomaly: true,
        trend: [1200, 1180, 1350, 1890, 2340, 2847],
        timestamp: new Date(),
      },
      {
        platform: "TikTok",
        metric: "auth_success_rate",
        currentValue: 87.3,
        expectedValue: 96.8,
        deviation: -9.5,
        anomalyScore: 0.92,
        threshold: 0.75,
        isAnomaly: true,
        trend: [96.8, 95.2, 93.1, 90.4, 88.7, 87.3],
        timestamp: new Date(),
      },
      {
        platform: "Twitter/X",
        metric: "api_calls_per_minute",
        currentValue: 847,
        expectedValue: 450,
        deviation: 88.2,
        anomalyScore: 0.94,
        threshold: 0.75,
        isAnomaly: true,
        trend: [420, 445, 523, 678, 756, 847],
        timestamp: new Date(),
      },
      {
        platform: "YouTube",
        metric: "upload_failure_rate",
        currentValue: 12.4,
        expectedValue: 3.2,
        deviation: 287.5,
        anomalyScore: 0.96,
        threshold: 0.75,
        isAnomaly: true,
        trend: [3.2, 4.1, 5.8, 7.9, 10.2, 12.4],
        timestamp: new Date(),
      },
    ]
    setAnomalies(anomalyData)
  }

  const updatePredictions = () => {
    // Simulate real-time prediction updates
    setPredictions((prev) =>
      prev.map((pred) => ({
        ...pred,
        probability: Math.max(0, Math.min(100, pred.probability + (Math.random() - 0.5) * 5)),
        confidence: Math.max(70, Math.min(99, pred.confidence + (Math.random() - 0.5) * 2)),
        predictedTime: new Date(pred.predictedTime.getTime() - 60000), // Move closer by 1 minute
      })),
    )

    setMLMetrics((prev) => ({
      ...prev,
      totalPredictions: prev.totalPredictions + Math.floor(Math.random() * 3),
      dataPointsProcessed: prev.dataPointsProcessed + Math.floor(Math.random() * 1000 + 500),
      predictionLatency: Math.max(100, Math.min(300, prev.predictionLatency + (Math.random() - 0.5) * 20)),
    }))

    setLastUpdate(new Date())
  }

  const detectAnomalies = () => {
    // Update anomaly detection in real-time
    setAnomalies((prev) =>
      prev.map((anomaly) => ({
        ...anomaly,
        currentValue: anomaly.currentValue + (Math.random() - 0.5) * (anomaly.currentValue * 0.1),
        anomalyScore: Math.max(0, Math.min(1, anomaly.anomalyScore + (Math.random() - 0.5) * 0.1)),
        timestamp: new Date(),
      })),
    )
  }

  const trainModel = async (modelId: string) => {
    setModels((prev) => prev.map((model) => (model.id === modelId ? { ...model, status: "training" } : model)))

    // Simulate training process
    await new Promise((resolve) => setTimeout(resolve, 5000))

    setModels((prev) =>
      prev.map((model) =>
        model.id === modelId
          ? {
              ...model,
              status: "active",
              accuracy: Math.min(99, model.accuracy + Math.random() * 2),
              lastTrained: new Date(),
            }
          : model,
      ),
    )
  }

  const executePrevention = async (predictionId: string) => {
    const prediction = predictions.find((p) => p.id === predictionId)
    if (!prediction) return

    const newAction: PreventiveAction = {
      id: `action-${Date.now()}`,
      predictionId,
      action: `Prevent ${prediction.issueType}`,
      type: "manual",
      status: "executing",
      impact: `Prevents ${prediction.severity} severity issue`,
      confidence: prediction.confidence,
    }

    setPreventiveActions((prev) => [newAction, ...prev])

    // Simulate execution
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setPreventiveActions((prev) =>
      prev.map((action) =>
        action.id === newAction.id
          ? {
              ...action,
              status: "completed",
              executedAt: new Date(),
              result: "Successfully prevented predicted issue",
            }
          : action,
      ),
    )

    setPredictions((prev) => prev.map((pred) => (pred.id === predictionId ? { ...pred, status: "prevented" } : pred)))

    setMLMetrics((prev) => ({
      ...prev,
      preventedIssues: prev.preventedIssues + 1,
    }))
  }

  const toggleAI = () => {
    setIsAIActive(!isAIActive)
  }

  const exportPredictions = () => {
    const exportData = {
      timestamp: new Date().toISOString(),
      models,
      predictions,
      preventiveActions,
      metrics: mlMetrics,
      anomalies,
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `predictive-ai-report-${new Date().toISOString().split("T")[0]}.json`
    a.click()
  }

  const platformIcons = {
    Instagram: <Instagram className="h-5 w-5 text-pink-600" />,
    TikTok: (
      <div className="h-5 w-5 bg-black rounded-sm flex items-center justify-center text-white text-xs font-bold">T</div>
    ),
    "Twitter/X": <Twitter className="h-5 w-5 text-blue-500" />,
    YouTube: <Youtube className="h-5 w-5 text-red-600" />,
    All: <Activity className="h-5 w-5 text-purple-600" />,
  }

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
      case "active":
      case "completed":
      case "prevented":
        return "bg-green-100 text-green-800"
      case "training":
      case "executing":
      case "pending":
        return "bg-blue-100 text-blue-800"
      case "error":
      case "failed":
        return "bg-red-100 text-red-800"
      case "inactive":
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

  const accuracyRate = Math.round((mlMetrics.accuratepredictions / mlMetrics.totalPredictions) * 100)
  const preventionRate = Math.round((mlMetrics.preventedIssues / mlMetrics.totalPredictions) * 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-purple-100 text-purple-800">🤖 Predictive AI</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            AI-Powered Issue Prevention
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Machine learning models that predict and prevent issues before they impact your platforms
          </p>
        </div>

        {/* AI System Status */}
        <Card className="mb-8 border-2 border-purple-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-6 w-6 text-purple-600" />
                AI Prediction Engine
              </CardTitle>
              <div className="flex gap-2">
                <Button onClick={toggleAI} variant={isAIActive ? "destructive" : "default"}>
                  {isAIActive ? (
                    <>
                      <Pause className="h-4 w-4 mr-2" />
                      Pause AI
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Activate AI
                    </>
                  )}
                </Button>
                <Button onClick={exportPredictions} variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                {isAIActive ? (
                  <>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-green-600">AI Active</span>
                  </>
                ) : (
                  <>
                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-600">AI Paused</span>
                  </>
                )}
              </div>
              <div className="text-sm text-gray-600">
                {mlMetrics.modelsActive} models active • {mlMetrics.totalPredictions} predictions made
              </div>
              <div className="text-sm text-gray-600">
                {accuracyRate}% accuracy • {mlMetrics.preventedIssues} issues prevented
              </div>
              <div className="text-sm text-gray-600">
                Last update: {lastUpdate.toLocaleTimeString()} • {mlMetrics.predictionLatency}ms latency
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 border-green-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <span className="text-3xl font-bold text-green-600">{accuracyRate}%</span>
              </div>
              <p className="text-sm text-gray-600">Prediction Accuracy</p>
              <div className="flex items-center justify-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-xs text-green-600">+2.3% this week</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Shield className="h-6 w-6 text-blue-600" />
                <span className="text-3xl font-bold text-blue-600">{mlMetrics.preventedIssues}</span>
              </div>
              <p className="text-sm text-gray-600">Issues Prevented</p>
              <div className="flex items-center justify-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-xs text-green-600">+47 this week</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Robot className="h-6 w-6 text-purple-600" />
                <span className="text-3xl font-bold text-purple-600">{mlMetrics.modelsActive}</span>
              </div>
              <p className="text-sm text-gray-600">Active Models</p>
              <div className="flex items-center justify-center mt-2">
                <Activity className="h-4 w-4 text-blue-500 mr-1" />
                <span className="text-xs text-blue-600">All operational</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Gauge className="h-6 w-6 text-orange-600" />
                <span className="text-3xl font-bold text-orange-600">{mlMetrics.avgConfidence}%</span>
              </div>
              <p className="text-sm text-gray-600">Avg Confidence</p>
              <div className="flex items-center justify-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-xs text-green-600">+1.8% this week</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="predictions" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="predictions">🔮 Predictions</TabsTrigger>
            <TabsTrigger value="models">🧠 ML Models</TabsTrigger>
            <TabsTrigger value="anomalies">⚡ Anomalies</TabsTrigger>
            <TabsTrigger value="prevention">🛡️ Prevention</TabsTrigger>
            <TabsTrigger value="analytics">📊 Analytics</TabsTrigger>
          </TabsList>

          {/* Predictions Tab */}
          <TabsContent value="predictions">
            <div className="space-y-6">
              {predictions.map((prediction) => (
                <Card key={prediction.id} className="border-2 border-purple-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        {platformIcons[prediction.platform as keyof typeof platformIcons]}
                        {prediction.platform} - {prediction.issueType}
                      </CardTitle>
                      <div className="flex gap-2">
                        <Badge className={getSeverityColor(prediction.severity)}>
                          {prediction.severity.toUpperCase()}
                        </Badge>
                        <Badge className={getStatusColor(prediction.status)}>{prediction.status.toUpperCase()}</Badge>
                      </div>
                    </div>
                    <CardDescription>
                      Predicted in {Math.floor((prediction.predictedTime.getTime() - Date.now()) / (1000 * 60))} minutes
                      • {prediction.confidence}% confidence
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700">{prediction.description}</p>

                    {/* Prediction Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

                    {/* Recommended Actions */}
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Lightbulb className="h-4 w-4 text-yellow-500" />
                        Recommended Actions
                      </h4>
                      <div className="space-y-2">
                        {prediction.recommendedActions.map((action, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm p-2 bg-gray-50 rounded">
                            <ArrowRight className="h-4 w-4 text-blue-500" />
                            {action}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {prediction.status === "pending" && (
                      <div className="flex gap-2">
                        <Button
                          onClick={() => executePrevention(prediction.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Shield className="h-4 w-4 mr-2" />
                          Execute Prevention
                        </Button>
                        <Button variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button variant="outline">
                          <Settings className="h-4 w-4 mr-2" />
                          Adjust Threshold
                        </Button>
                      </div>
                    )}

                    <div className="text-xs text-gray-500 border-t pt-2">
                      Model: {prediction.modelUsed} • Generated: {new Date().toLocaleTimeString()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* ML Models Tab */}
          <TabsContent value="models">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {models.map((model) => (
                <Card key={model.id} className="border-2 border-blue-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Cpu className="h-5 w-5 text-blue-600" />
                        {model.name}
                      </CardTitle>
                      <Badge className={getStatusColor(model.status)}>{model.status.toUpperCase()}</Badge>
                    </div>
                    <CardDescription>{model.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-green-50 rounded">
                        <div className="text-lg font-bold text-green-600">{model.accuracy}%</div>
                        <div className="text-xs text-gray-600">Accuracy</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded">
                        <div className="text-lg font-bold text-blue-600">{model.predictions}</div>
                        <div className="text-xs text-gray-600">Predictions</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Platform:</span>
                        <span className="font-semibold">{model.platform}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Model Type:</span>
                        <span className="font-semibold capitalize">{model.type.replace("_", " ")}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Metric:</span>
                        <span className="font-semibold capitalize">{model.metric.replace("_", " ")}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Preventions:</span>
                        <span className="font-semibold text-green-600">{model.preventions}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Last Trained:</span>
                        <span className="font-semibold">
                          {Math.floor((Date.now() - model.lastTrained.getTime()) / (1000 * 60 * 60))}h ago
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => trainModel(model.id)}
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
                            Retrain Model
                          </>
                        )}
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        View Metrics
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Anomalies Tab */}
          <TabsContent value="anomalies">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {anomalies.map((anomaly, index) => (
                <Card key={index} className="border-2 border-yellow-200">
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
                      Anomaly Score: {(anomaly.anomalyScore * 100).toFixed(1)}% • Threshold: {anomaly.threshold * 100}%
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
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

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Deviation:</span>
                        <span className={`font-semibold ${anomaly.deviation > 0 ? "text-red-600" : "text-green-600"}`}>
                          {anomaly.deviation > 0 ? "+" : ""}
                          {anomaly.deviation.toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Anomaly Score:</span>
                        <span className="font-semibold">{(anomaly.anomalyScore * 100).toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Last Updated:</span>
                        <span className="font-semibold">{anomaly.timestamp.toLocaleTimeString()}</span>
                      </div>
                    </div>

                    {/* Trend Visualization */}
                    <div>
                      <h4 className="font-semibold mb-2">Recent Trend</h4>
                      <div className="flex items-end gap-1 h-16">
                        {anomaly.trend.map((value, i) => (
                          <div
                            key={i}
                            className="bg-blue-500 rounded-t"
                            style={{
                              height: `${(value / Math.max(...anomaly.trend)) * 100}%`,
                              width: "16.66%",
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>

                    {anomaly.isAnomaly && (
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Investigate
                        </Button>
                        <Button size="sm" variant="outline">
                          <Bell className="h-4 w-4 mr-2" />
                          Create Alert
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Prevention Tab */}
          <TabsContent value="prevention">
            <div className="space-y-6">
              {preventiveActions.map((action) => (
                <Card key={action.id} className="border-2 border-green-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Wrench className="h-5 w-5 text-green-600" />
                        {action.action}
                      </CardTitle>
                      <div className="flex gap-2">
                        <Badge
                          className={
                            action.type === "automatic"
                              ? "bg-blue-100 text-blue-800"
                              : action.type === "manual"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-orange-100 text-orange-800"
                          }
                        >
                          {action.type.toUpperCase()}
                        </Badge>
                        <Badge className={getStatusColor(action.status)}>{action.status.toUpperCase()}</Badge>
                      </div>
                    </div>
                    <CardDescription>
                      Confidence: {action.confidence}% • Impact: {action.impact}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {action.result && (
                      <div className="p-3 bg-green-50 rounded border border-green-200">
                        <div className="flex items-center gap-2 mb-1">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          <span className="font-semibold text-green-800">Execution Result</span>
                        </div>
                        <p className="text-sm text-green-700">{action.result}</p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <span className="text-sm text-gray-600">Action Type:</span>
                        <div className="font-semibold capitalize">{action.type}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Confidence:</span>
                        <div className="font-semibold">{action.confidence}%</div>
                      </div>
                      {action.executedAt && (
                        <div>
                          <span className="text-sm text-gray-600">Executed:</span>
                          <div className="font-semibold">{action.executedAt.toLocaleTimeString()}</div>
                        </div>
                      )}
                    </div>

                    {action.status === "pending" && (
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <Play className="h-4 w-4 mr-2" />
                          Execute Now
                        </Button>
                        <Button size="sm" variant="outline">
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-2 border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-6 w-6 text-green-600" />
                    Prediction Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                      <span className="text-sm">Accuracy Rate</span>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="font-semibold text-green-600">{accuracyRate}% (+2.3%)</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                      <span className="text-sm">Prevention Rate</span>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="font-semibold text-blue-600">{preventionRate}% (+5.1%)</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                      <span className="text-sm">False Positive Rate</span>
                      <div className="flex items-center gap-2">
                        <TrendingDown className="h-4 w-4 text-green-500" />
                        <span className="font-semibold text-purple-600">
                          {Math.round((mlMetrics.falsePositives / mlMetrics.totalPredictions) * 100)}% (-1.2%)
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
                      <span className="text-sm">Avg Prediction Latency</span>
                      <div className="flex items-center gap-2">
                        <TrendingDown className="h-4 w-4 text-green-500" />
                        <span className="font-semibold text-orange-600">{mlMetrics.predictionLatency}ms (-15ms)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-6 w-6 text-blue-600" />
                    Model Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-500 rounded"></div>
                        <span className="text-sm">Time Series</span>
                      </div>
                      <span className="font-semibold">2 models</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-500 rounded"></div>
                        <span className="text-sm">Classification</span>
                      </div>
                      <span className="font-semibold">2 models</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-purple-500 rounded"></div>
                        <span className="text-sm">Regression</span>
                      </div>
                      <span className="font-semibold">1 model</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-orange-500 rounded"></div>
                        <span className="text-sm">Anomaly Detection</span>
                      </div>
                      <span className="font-semibold">1 model</span>
                    </div>

                    <div className="mt-6">
                      <h4 className="font-semibold mb-2">Platform Coverage</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Instagram:</span>
                          <span>2 models</span>
                        </div>
                        <div className="flex justify-between">
                          <span>TikTok:</span>
                          <span>1 model</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Twitter/X:</span>
                          <span>1 model</span>
                        </div>
                        <div className="flex justify-between">
                          <span>YouTube:</span>
                          <span>1 model</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Universal:</span>
                          <span>2 models</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
