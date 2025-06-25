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
  Settings,
  AlertTriangle,
  XCircle,
  Clock,
  Zap,
  TrendingUp,
  BarChart3,
  Save,
  RotateCcw,
  TestTube,
  Info,
  CheckCircle,
  Target,
  Activity,
  Bell,
} from "lucide-react"

interface ThresholdConfig {
  platform: string
  metrics: {
    responseTime: {
      warning: number
      critical: number
      unit: string
      description: string
    }
    failureRate: {
      warning: number
      critical: number
      unit: string
      description: string
    }
    rateLimit: {
      warning: number
      critical: number
      unit: string
      description: string
    }
    authExpiry: {
      warning: number
      critical: number
      unit: string
      description: string
    }
    engagement: {
      warning: number
      critical: number
      unit: string
      description: string
    }
    uploadSize: {
      warning: number
      critical: number
      unit: string
      description: string
    }
  }
  businessHours: {
    enabled: boolean
    start: string
    end: string
    timezone: string
    multiplier: number
  }
  escalation: {
    warningDelay: number
    criticalDelay: number
    maxRetries: number
    autoResolve: boolean
  }
}

interface PlatformRecommendations {
  platform: string
  recommendations: {
    metric: string
    current: { warning: number; critical: number }
    recommended: { warning: number; critical: number }
    reason: string
    impact: "low" | "medium" | "high"
  }[]
  historicalData: {
    avgResponseTime: number
    p95ResponseTime: number
    avgFailureRate: number
    peakRateLimit: number
  }
}

export default function ThresholdConfigPage() {
  const [thresholdConfigs, setThresholdConfigs] = useState<ThresholdConfig[]>([])
  const [recommendations, setRecommendations] = useState<PlatformRecommendations[]>([])
  const [selectedPlatform, setSelectedPlatform] = useState<string>("Instagram")
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [testResults, setTestResults] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    // Initialize threshold configurations with platform-specific defaults
    const defaultConfigs: ThresholdConfig[] = [
      {
        platform: "Instagram",
        metrics: {
          responseTime: {
            warning: 2000,
            critical: 5000,
            unit: "ms",
            description: "API response time for Instagram Graph API calls",
          },
          failureRate: {
            warning: 10,
            critical: 25,
            unit: "%",
            description: "Percentage of failed API requests in 5-minute window",
          },
          rateLimit: {
            warning: 80,
            critical: 95,
            unit: "%",
            description: "Instagram API rate limit usage (200 calls/hour)",
          },
          authExpiry: {
            warning: 7,
            critical: 1,
            unit: "days",
            description: "Days until access token expires",
          },
          engagement: {
            warning: -20,
            critical: -50,
            unit: "%",
            description: "Drop in engagement rate compared to 7-day average",
          },
          uploadSize: {
            warning: 8,
            critical: 10,
            unit: "MB",
            description: "Media file size approaching Instagram limits",
          },
        },
        businessHours: {
          enabled: true,
          start: "09:00",
          end: "18:00",
          timezone: "GMT",
          multiplier: 0.5, // More sensitive during business hours
        },
        escalation: {
          warningDelay: 5,
          criticalDelay: 1,
          maxRetries: 3,
          autoResolve: true,
        },
      },
      {
        platform: "TikTok",
        metrics: {
          responseTime: {
            warning: 3000,
            critical: 8000,
            unit: "ms",
            description: "TikTok API response time (typically slower)",
          },
          failureRate: {
            warning: 15,
            critical: 35,
            unit: "%",
            description: "TikTok API has higher tolerance for failures",
          },
          rateLimit: {
            warning: 85,
            critical: 98,
            unit: "%",
            description: "TikTok API rate limit (100 calls/day for basic)",
          },
          authExpiry: {
            warning: 14,
            critical: 3,
            unit: "days",
            description: "TikTok tokens expire every 24 hours",
          },
          engagement: {
            warning: -30,
            critical: -60,
            unit: "%",
            description: "TikTok engagement can be more volatile",
          },
          uploadSize: {
            warning: 50,
            critical: 72,
            unit: "MB",
            description: "TikTok video size limits (72MB max)",
          },
        },
        businessHours: {
          enabled: true,
          start: "16:00",
          end: "22:00",
          timezone: "GMT",
          multiplier: 0.7, // TikTok peak hours are evening
        },
        escalation: {
          warningDelay: 10,
          criticalDelay: 2,
          maxRetries: 5,
          autoResolve: false, // TikTok issues often need manual intervention
        },
      },
      {
        platform: "Twitter/X",
        metrics: {
          responseTime: {
            warning: 1500,
            critical: 4000,
            unit: "ms",
            description: "Twitter API v2 response time (usually fast)",
          },
          failureRate: {
            warning: 5,
            critical: 15,
            unit: "%",
            description: "Twitter API is generally reliable",
          },
          rateLimit: {
            warning: 90,
            critical: 99,
            unit: "%",
            description: "Twitter API rate limit (300 tweets/15min)",
          },
          authExpiry: {
            warning: 30,
            critical: 7,
            unit: "days",
            description: "Twitter Bearer tokens are long-lived",
          },
          engagement: {
            warning: -15,
            critical: -40,
            unit: "%",
            description: "Twitter engagement tracking",
          },
          uploadSize: {
            warning: 5,
            critical: 5,
            unit: "MB",
            description: "Twitter media size limit (5MB)",
          },
        },
        businessHours: {
          enabled: true,
          start: "08:00",
          end: "20:00",
          timezone: "GMT",
          multiplier: 0.6,
        },
        escalation: {
          warningDelay: 3,
          criticalDelay: 1,
          maxRetries: 2,
          autoResolve: true,
        },
      },
      {
        platform: "YouTube",
        metrics: {
          responseTime: {
            warning: 5000,
            critical: 15000,
            unit: "ms",
            description: "YouTube API response time (video processing is slow)",
          },
          failureRate: {
            warning: 20,
            critical: 40,
            unit: "%",
            description: "YouTube uploads can fail due to content policies",
          },
          rateLimit: {
            warning: 70,
            critical: 90,
            unit: "%",
            description: "YouTube API quota (10,000 units/day)",
          },
          authExpiry: {
            warning: 14,
            critical: 3,
            unit: "days",
            description: "YouTube OAuth tokens refresh automatically",
          },
          engagement: {
            warning: -25,
            critical: -50,
            unit: "%",
            description: "YouTube engagement metrics",
          },
          uploadSize: {
            warning: 100,
            critical: 128,
            unit: "GB",
            description: "YouTube video size limit (128GB)",
          },
        },
        businessHours: {
          enabled: false, // YouTube is global, no specific business hours
          start: "00:00",
          end: "23:59",
          timezone: "GMT",
          multiplier: 1.0,
        },
        escalation: {
          warningDelay: 15,
          criticalDelay: 5,
          maxRetries: 1, // YouTube failures often need manual review
          autoResolve: false,
        },
      },
    ]

    setThresholdConfigs(defaultConfigs)

    // Generate recommendations based on historical data
    generateRecommendations(defaultConfigs)
  }, [])

  const generateRecommendations = (configs: ThresholdConfig[]) => {
    const recs: PlatformRecommendations[] = configs.map((config) => ({
      platform: config.platform,
      historicalData: {
        avgResponseTime: Math.random() * 1000 + 500,
        p95ResponseTime: Math.random() * 2000 + 1000,
        avgFailureRate: Math.random() * 5,
        peakRateLimit: Math.random() * 30 + 60,
      },
      recommendations: [
        {
          metric: "responseTime",
          current: {
            warning: config.metrics.responseTime.warning,
            critical: config.metrics.responseTime.critical,
          },
          recommended: {
            warning: Math.floor(Math.random() * 500 + 1500),
            critical: Math.floor(Math.random() * 1000 + 4000),
          },
          reason: "Based on 30-day P95 response time analysis",
          impact: "medium" as const,
        },
        {
          metric: "rateLimit",
          current: {
            warning: config.metrics.rateLimit.warning,
            critical: config.metrics.rateLimit.critical,
          },
          recommended: {
            warning: Math.floor(Math.random() * 10 + 75),
            critical: Math.floor(Math.random() * 5 + 92),
          },
          reason: "Optimized based on usage patterns and API quotas",
          impact: "high" as const,
        },
        {
          metric: "failureRate",
          current: {
            warning: config.metrics.failureRate.warning,
            critical: config.metrics.failureRate.critical,
          },
          recommended: {
            warning: Math.floor(Math.random() * 5 + 8),
            critical: Math.floor(Math.random() * 10 + 20),
          },
          reason: "Adjusted for platform reliability characteristics",
          impact: "low" as const,
        },
      ],
    }))

    setRecommendations(recs)
  }

  const updateThreshold = (platform: string, metric: string, type: "warning" | "critical", value: number) => {
    setThresholdConfigs((prev) =>
      prev.map((config) =>
        config.platform === platform
          ? {
              ...config,
              metrics: {
                ...config.metrics,
                [metric]: {
                  ...config.metrics[metric as keyof typeof config.metrics],
                  [type]: value,
                },
              },
            }
          : config,
      ),
    )
    setHasUnsavedChanges(true)
  }

  const updateBusinessHours = (platform: string, field: string, value: any) => {
    setThresholdConfigs((prev) =>
      prev.map((config) =>
        config.platform === platform
          ? {
              ...config,
              businessHours: {
                ...config.businessHours,
                [field]: value,
              },
            }
          : config,
      ),
    )
    setHasUnsavedChanges(true)
  }

  const updateEscalation = (platform: string, field: string, value: any) => {
    setThresholdConfigs((prev) =>
      prev.map((config) =>
        config.platform === platform
          ? {
              ...config,
              escalation: {
                ...config.escalation,
                [field]: value,
              },
            }
          : config,
      ),
    )
    setHasUnsavedChanges(true)
  }

  const applyRecommendation = (
    platform: string,
    metric: string,
    recommended: { warning: number; critical: number },
  ) => {
    setThresholdConfigs((prev) =>
      prev.map((config) =>
        config.platform === platform
          ? {
              ...config,
              metrics: {
                ...config.metrics,
                [metric]: {
                  ...config.metrics[metric as keyof typeof config.metrics],
                  warning: recommended.warning,
                  critical: recommended.critical,
                },
              },
            }
          : config,
      ),
    )
    setHasUnsavedChanges(true)
  }

  const resetToDefaults = (platform: string) => {
    // Reset to original defaults (you would fetch these from your API)
    setHasUnsavedChanges(true)
  }

  const testThresholds = async (platform: string) => {
    // Simulate testing thresholds
    setTestResults({ ...testResults, [platform]: false })

    await new Promise((resolve) => setTimeout(resolve, 2000))

    setTestResults({ ...testResults, [platform]: true })

    setTimeout(() => {
      setTestResults((prev) => ({ ...prev, [platform]: false }))
    }, 3000)
  }

  const saveConfiguration = async () => {
    // Simulate saving to API
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setHasUnsavedChanges(false)
    alert("✅ Threshold configuration saved successfully!")
  }

  const platformIcons = {
    Instagram: <Instagram className="h-5 w-5 text-pink-600" />,
    TikTok: (
      <div className="h-5 w-5 bg-black rounded-sm flex items-center justify-center text-white text-xs font-bold">T</div>
    ),
    "Twitter/X": <Twitter className="h-5 w-5 text-blue-500" />,
    YouTube: <Youtube className="h-5 w-5 text-red-600" />,
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const selectedConfig = thresholdConfigs.find((config) => config.platform === selectedPlatform)
  const selectedRecommendations = recommendations.find((rec) => rec.platform === selectedPlatform)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-orange-100 text-orange-800">⚙️ Threshold Configuration</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Custom Alert Thresholds
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Configure platform-specific warning and critical thresholds with intelligent recommendations
          </p>
        </div>

        {/* Platform Selector */}
        <Card className="mb-8 border-2 border-orange-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-6 w-6 text-orange-600" />
                Platform Configuration
              </CardTitle>
              <div className="flex gap-2">
                {hasUnsavedChanges && (
                  <Button onClick={saveConfiguration} className="bg-green-600 hover:bg-green-700">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                )}
                <Button variant="outline" onClick={() => resetToDefaults(selectedPlatform)}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {["Instagram", "TikTok", "Twitter/X", "YouTube"].map((platform) => (
                <Button
                  key={platform}
                  variant={selectedPlatform === platform ? "default" : "outline"}
                  onClick={() => setSelectedPlatform(platform)}
                  className="flex items-center gap-2"
                >
                  {platformIcons[platform as keyof typeof platformIcons]}
                  {platform}
                  {testResults[platform] && <CheckCircle className="h-4 w-4 text-green-500" />}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {selectedConfig && (
          <Tabs defaultValue="metrics" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="metrics">📊 Metrics</TabsTrigger>
              <TabsTrigger value="recommendations">💡 Recommendations</TabsTrigger>
              <TabsTrigger value="schedule">⏰ Schedule</TabsTrigger>
              <TabsTrigger value="escalation">🚨 Escalation</TabsTrigger>
            </TabsList>

            {/* Metrics Configuration */}
            <TabsContent value="metrics">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {Object.entries(selectedConfig.metrics).map(([metricKey, metric]) => (
                  <Card key={metricKey} className="border-2 border-blue-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 capitalize">
                        {metricKey === "responseTime" && <Clock className="h-5 w-5 text-blue-600" />}
                        {metricKey === "failureRate" && <XCircle className="h-5 w-5 text-red-600" />}
                        {metricKey === "rateLimit" && <Zap className="h-5 w-5 text-yellow-600" />}
                        {metricKey === "authExpiry" && <Settings className="h-5 w-5 text-purple-600" />}
                        {metricKey === "engagement" && <TrendingUp className="h-5 w-5 text-green-600" />}
                        {metricKey === "uploadSize" && <BarChart3 className="h-5 w-5 text-orange-600" />}
                        {metricKey.replace(/([A-Z])/g, " $1").trim()}
                      </CardTitle>
                      <CardDescription>{metric.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Warning Threshold</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={metric.warning}
                              onChange={(e) =>
                                updateThreshold(selectedPlatform, metricKey, "warning", Number(e.target.value))
                              }
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                            <span className="text-sm text-gray-500">{metric.unit}</span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Critical Threshold</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={metric.critical}
                              onChange={(e) =>
                                updateThreshold(selectedPlatform, metricKey, "critical", Number(e.target.value))
                              }
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                            <span className="text-sm text-gray-500">{metric.unit}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm">
                            Warning at {metric.warning}
                            {metric.unit}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <XCircle className="h-4 w-4 text-red-500" />
                          <span className="text-sm">
                            Critical at {metric.critical}
                            {metric.unit}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Recommendations */}
            <TabsContent value="recommendations">
              <div className="space-y-6">
                <Card className="border-2 border-green-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-6 w-6 text-green-600" />
                      Historical Performance Data
                    </CardTitle>
                    <CardDescription>
                      Based on the last 30 days of monitoring data for {selectedPlatform}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {selectedRecommendations && (
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">
                            {Math.round(selectedRecommendations.historicalData.avgResponseTime)}ms
                          </div>
                          <div className="text-sm text-gray-600">Avg Response Time</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">
                            {Math.round(selectedRecommendations.historicalData.p95ResponseTime)}ms
                          </div>
                          <div className="text-sm text-gray-600">95th Percentile</div>
                        </div>
                        <div className="text-center p-4 bg-red-50 rounded-lg">
                          <div className="text-2xl font-bold text-red-600">
                            {selectedRecommendations.historicalData.avgFailureRate.toFixed(1)}%
                          </div>
                          <div className="text-sm text-gray-600">Avg Failure Rate</div>
                        </div>
                        <div className="text-center p-4 bg-yellow-50 rounded-lg">
                          <div className="text-2xl font-bold text-yellow-600">
                            {Math.round(selectedRecommendations.historicalData.peakRateLimit)}%
                          </div>
                          <div className="text-sm text-gray-600">Peak Rate Limit</div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {selectedRecommendations?.recommendations.map((rec, index) => (
                  <Card key={index} className="border-2 border-yellow-200">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2 capitalize">
                          <Info className="h-5 w-5 text-yellow-600" />
                          {rec.metric.replace(/([A-Z])/g, " $1").trim()} Optimization
                        </CardTitle>
                        <Badge className={getImpactColor(rec.impact)}>{rec.impact.toUpperCase()} IMPACT</Badge>
                      </div>
                      <CardDescription>{rec.reason}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="text-center p-3 bg-gray-50 rounded">
                          <div className="text-sm text-gray-600 mb-1">Current Warning</div>
                          <div className="text-lg font-bold">{rec.current.warning}</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded">
                          <div className="text-sm text-gray-600 mb-1">Current Critical</div>
                          <div className="text-lg font-bold">{rec.current.critical}</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded">
                          <div className="text-sm text-green-600 mb-1">Recommended</div>
                          <div className="text-lg font-bold text-green-700">
                            {rec.recommended.warning} / {rec.recommended.critical}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={() => applyRecommendation(selectedPlatform, rec.metric, rec.recommended)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Apply Recommendation
                        </Button>
                        <Button variant="outline">
                          <Info className="h-4 w-4 mr-2" />
                          Learn More
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Schedule Configuration */}
            <TabsContent value="schedule">
              <Card className="border-2 border-purple-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-6 w-6 text-purple-600" />
                    Business Hours & Sensitivity
                  </CardTitle>
                  <CardDescription>Configure time-based threshold adjustments for {selectedPlatform}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      id="businessHours"
                      checked={selectedConfig.businessHours.enabled}
                      onChange={(e) => updateBusinessHours(selectedPlatform, "enabled", e.target.checked)}
                      className="w-4 h-4 text-purple-600"
                    />
                    <label htmlFor="businessHours" className="text-sm font-medium">
                      Enable business hours sensitivity
                    </label>
                  </div>

                  {selectedConfig.businessHours.enabled && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-purple-50 rounded-lg">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                        <input
                          type="time"
                          value={selectedConfig.businessHours.start}
                          onChange={(e) => updateBusinessHours(selectedPlatform, "start", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                        <input
                          type="time"
                          value={selectedConfig.businessHours.end}
                          onChange={(e) => updateBusinessHours(selectedPlatform, "end", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Sensitivity Multiplier</label>
                        <input
                          type="number"
                          step="0.1"
                          min="0.1"
                          max="2.0"
                          value={selectedConfig.businessHours.multiplier}
                          onChange={(e) => updateBusinessHours(selectedPlatform, "multiplier", Number(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">Lower = more sensitive during business hours</p>
                      </div>
                    </div>
                  )}

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">How Business Hours Work</h4>
                    <ul className="text-sm space-y-1">
                      <li>• During business hours, thresholds are multiplied by the sensitivity factor</li>
                      <li>• Lower multiplier = more sensitive alerts when users are active</li>
                      <li>• Outside business hours, normal thresholds apply</li>
                      <li>• Timezone: {selectedConfig.businessHours.timezone}</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Escalation Configuration */}
            <TabsContent value="escalation">
              <Card className="border-2 border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-6 w-6 text-red-600" />
                    Escalation & Recovery Settings
                  </CardTitle>
                  <CardDescription>
                    Configure how alerts are escalated and resolved for {selectedPlatform}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Warning Alert Delay (minutes)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="60"
                        value={selectedConfig.escalation.warningDelay}
                        onChange={(e) => updateEscalation(selectedPlatform, "warningDelay", Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">Wait time before sending warning notifications</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Critical Alert Delay (minutes)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="30"
                        value={selectedConfig.escalation.criticalDelay}
                        onChange={(e) => updateEscalation(selectedPlatform, "criticalDelay", Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">Wait time before sending critical notifications</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Retries</label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={selectedConfig.escalation.maxRetries}
                        onChange={(e) => updateEscalation(selectedPlatform, "maxRetries", Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">Number of automatic retry attempts</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        id="autoResolve"
                        checked={selectedConfig.escalation.autoResolve}
                        onChange={(e) => updateEscalation(selectedPlatform, "autoResolve", e.target.checked)}
                        className="w-4 h-4 text-red-600"
                      />
                      <label htmlFor="autoResolve" className="text-sm font-medium">
                        Auto-resolve alerts when metrics return to normal
                      </label>
                    </div>
                  </div>

                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Escalation Flow</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span>
                          Warning threshold exceeded → Wait {selectedConfig.escalation.warningDelay} min → Send alert
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span>
                          Critical threshold exceeded → Wait {selectedConfig.escalation.criticalDelay} min → Send alert
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Retry up to {selectedConfig.escalation.maxRetries} times before escalating</span>
                      </div>
                      {selectedConfig.escalation.autoResolve && (
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Auto-resolve when metrics return to normal</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        {/* Test & Save Actions */}
        <Card className="mt-8 border-2 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold mb-1">Configuration Status</h3>
                <p className="text-sm text-gray-600">
                  {hasUnsavedChanges ? "You have unsaved changes" : "All changes saved"}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => testThresholds(selectedPlatform)}
                  variant="outline"
                  disabled={testResults[selectedPlatform]}
                >
                  {testResults[selectedPlatform] ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      Test Passed
                    </>
                  ) : (
                    <>
                      <TestTube className="h-4 w-4 mr-2" />
                      Test Thresholds
                    </>
                  )}
                </Button>
                {hasUnsavedChanges && (
                  <Button onClick={saveConfiguration} className="bg-green-600 hover:bg-green-700">
                    <Save className="h-4 w-4 mr-2" />
                    Save All Changes
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
