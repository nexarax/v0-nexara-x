"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Mail,
  MessageSquare,
  Webhook,
  Settings,
  TestTube,
  CheckCircle,
  AlertTriangle,
  Send,
  Save,
  Eye,
  EyeOff,
  Copy,
  RefreshCw,
  Activity,
  TrendingUp,
  Clock,
  Bell,
  Smartphone,
  PlayCircle,
  PauseCircle,
} from "lucide-react"

interface NotificationChannel {
  id: string
  type: "email" | "sms" | "slack" | "webhook"
  name: string
  enabled: boolean
  config: {
    [key: string]: any
  }
  templates: {
    [key: string]: string
  }
  rateLimit: {
    maxPerMinute: number
    maxPerHour: number
  }
  retryPolicy: {
    maxRetries: number
    backoffMultiplier: number
    initialDelay: number
  }
  lastTested?: Date
  testResults?: {
    success: boolean
    responseTime: number
    error?: string
  }
}

interface NotificationTemplate {
  id: string
  name: string
  type: "email" | "sms" | "slack" | "webhook"
  subject?: string
  body: string
  variables: string[]
  escalationLevel: string
  priority: "low" | "medium" | "high" | "critical"
}

interface DeliveryStats {
  channel: string
  sent: number
  delivered: number
  failed: number
  avgResponseTime: number
  successRate: number
}

export default function NotificationConfigPage() {
  const [channels, setChannels] = useState<NotificationChannel[]>([])
  const [templates, setTemplates] = useState<NotificationTemplate[]>([])
  const [deliveryStats, setDeliveryStats] = useState<DeliveryStats[]>([])
  const [selectedChannel, setSelectedChannel] = useState<string>("email")
  const [testResults, setTestResults] = useState<{ [key: string]: any }>({})
  const [isTestingAll, setIsTestingAll] = useState(false)
  const [showSecrets, setShowSecrets] = useState<{ [key: string]: boolean }>({})
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  useEffect(() => {
    initializeNotificationSystem()
    loadDeliveryStats()
  }, [])

  const initializeNotificationSystem = () => {
    const defaultChannels: NotificationChannel[] = [
      {
        id: "email-primary",
        type: "email",
        name: "Primary Email (SMTP)",
        enabled: true,
        config: {
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          auth: {
            user: "alerts@nexarax.com",
            pass: "••••••••••••",
          },
          from: "NexaraX Alerts <alerts@nexarax.com>",
          replyTo: "support@nexarax.com",
        },
        templates: {
          "level-1": "technical-alert",
          "level-2": "leadership-alert",
          "level-3": "management-alert",
          "level-4": "executive-alert",
        },
        rateLimit: {
          maxPerMinute: 60,
          maxPerHour: 1000,
        },
        retryPolicy: {
          maxRetries: 3,
          backoffMultiplier: 2,
          initialDelay: 1000,
        },
      },
      {
        id: "sms-primary",
        type: "sms",
        name: "SMS (Twilio)",
        enabled: true,
        config: {
          accountSid: "AC••••••••••••••••••••••••••••••••",
          authToken: "••••••••••••••••••••••••••••••••",
          fromNumber: "+1-555-NEXARAX",
          webhook: "https://nexarax.com/api/sms/status",
        },
        templates: {
          "level-1": "sms-technical",
          "level-2": "sms-leadership",
          "level-3": "sms-management",
          "level-4": "sms-executive",
        },
        rateLimit: {
          maxPerMinute: 10,
          maxPerHour: 100,
        },
        retryPolicy: {
          maxRetries: 2,
          backoffMultiplier: 3,
          initialDelay: 2000,
        },
      },
      {
        id: "slack-primary",
        type: "slack",
        name: "Slack Workspace",
        enabled: true,
        config: {
          botToken: "xoxb-••••••••••••••••••••••••••••••••••••••••••••••••",
          signingSecret: "••••••••••••••••••••••••••••••••",
          channels: {
            "level-1": "#alerts-technical",
            "level-2": "#alerts-leadership",
            "level-3": "#alerts-management",
            "level-4": "#alerts-executive",
          },
          username: "NexaraX Alert Bot",
          iconEmoji: ":warning:",
        },
        templates: {
          "level-1": "slack-technical",
          "level-2": "slack-leadership",
          "level-3": "slack-management",
          "level-4": "slack-executive",
        },
        rateLimit: {
          maxPerMinute: 50,
          maxPerHour: 1000,
        },
        retryPolicy: {
          maxRetries: 3,
          backoffMultiplier: 2,
          initialDelay: 1000,
        },
      },
      {
        id: "webhook-primary",
        type: "webhook",
        name: "External Webhooks",
        enabled: true,
        config: {
          endpoints: {
            "level-1": "https://api.pagerduty.com/incidents",
            "level-2": "https://hooks.zapier.com/hooks/catch/12345/abcdef/",
            "level-3": "https://api.opsgenie.com/v2/alerts",
            "level-4": "https://api.statuspage.io/v1/pages/xyz/incidents",
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer ••••••••••••••••••••••••••••••••",
            "X-API-Key": "••••••••••••••••••••••••••••••••",
          },
          timeout: 10000,
          verifySSL: true,
        },
        templates: {
          "level-1": "webhook-technical",
          "level-2": "webhook-leadership",
          "level-3": "webhook-management",
          "level-4": "webhook-executive",
        },
        rateLimit: {
          maxPerMinute: 30,
          maxPerHour: 500,
        },
        retryPolicy: {
          maxRetries: 5,
          backoffMultiplier: 2,
          initialDelay: 1000,
        },
      },
    ]
    setChannels(defaultChannels)

    const defaultTemplates: NotificationTemplate[] = [
      {
        id: "technical-alert",
        name: "Technical Alert (Email)",
        type: "email",
        subject: "🚨 ALERT: {{platform}} - {{issueType}} ({{severity}})",
        body: `
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #dc3545;">
      <h2 style="color: #dc3545; margin: 0 0 10px 0;">🚨 System Alert</h2>
      <p><strong>Platform:</strong> {{platform}}</p>
      <p><strong>Issue Type:</strong> {{issueType}}</p>
      <p><strong>Severity:</strong> <span style="color: #dc3545; font-weight: bold;">{{severity}}</span></p>
      <p><strong>Started:</strong> {{startTime}}</p>
      <p><strong>Self-Healing Attempts:</strong> {{selfHealingAttempts}}</p>
    </div>
    
    <div style="margin: 20px 0;">
      <h3>Issue Details</h3>
      <p>{{description}}</p>
      
      <h3>Immediate Actions Required</h3>
      <ul>
        <li>Investigate the root cause</li>
        <li>Check system logs and metrics</li>
        <li>Implement temporary workaround if needed</li>
        <li>Update incident status</li>
      </ul>
    </div>
    
    <div style="background: #e9ecef; padding: 15px; border-radius: 5px;">
      <p><strong>Alert ID:</strong> {{alertId}}</p>
      <p><strong>Dashboard:</strong> <a href="{{dashboardUrl}}">View Live Dashboard</a></p>
      <p><strong>Acknowledge:</strong> <a href="{{acknowledgeUrl}}">Acknowledge Alert</a></p>
    </div>
  </div>
</body>
</html>`,
        variables: [
          "platform",
          "issueType",
          "severity",
          "startTime",
          "selfHealingAttempts",
          "description",
          "alertId",
          "dashboardUrl",
          "acknowledgeUrl",
        ],
        escalationLevel: "level-1",
        priority: "high",
      },
      {
        id: "sms-technical",
        name: "Technical Alert (SMS)",
        type: "sms",
        body: "🚨 NEXARAX ALERT: {{platform}} {{issueType}} ({{severity}}) - Self-healing failed after {{selfHealingAttempts}} attempts. Immediate attention required. Alert ID: {{alertId}}",
        variables: ["platform", "issueType", "severity", "selfHealingAttempts", "alertId"],
        escalationLevel: "level-1",
        priority: "high",
      },
      {
        id: "slack-technical",
        name: "Technical Alert (Slack)",
        type: "slack",
        body: `{
  "blocks": [
    {
      "type": "header",
      "text": {
        "type": "plain_text",
        "text": "🚨 System Alert - {{severity}}"
      }
    },
    {
      "type": "section",
      "fields": [
        {
          "type": "mrkdwn",
          "text": "*Platform:*\\n{{platform}}"
        },
        {
          "type": "mrkdwn",
          "text": "*Issue:*\\n{{issueType}}"
        },
        {
          "type": "mrkdwn",
          "text": "*Started:*\\n{{startTime}}"
        },
        {
          "type": "mrkdwn",
          "text": "*Self-Healing:*\\n{{selfHealingAttempts}} attempts failed"
        }
      ]
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "{{description}}"
      }
    },
    {
      "type": "actions",
      "elements": [
        {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "Acknowledge"
          },
          "style": "primary",
          "url": "{{acknowledgeUrl}}"
        },
        {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "View Dashboard"
          },
          "url": "{{dashboardUrl}}"
        }
      ]
    }
  ]
}`,
        variables: [
          "platform",
          "issueType",
          "severity",
          "startTime",
          "selfHealingAttempts",
          "description",
          "acknowledgeUrl",
          "dashboardUrl",
        ],
        escalationLevel: "level-1",
        priority: "high",
      },
      {
        id: "webhook-technical",
        name: "Technical Alert (Webhook)",
        type: "webhook",
        body: `{
  "event_type": "alert.triggered",
  "severity": "{{severity}}",
  "platform": "{{platform}}",
  "issue_type": "{{issueType}}",
  "alert_id": "{{alertId}}",
  "started_at": "{{startTime}}",
  "self_healing_attempts": {{selfHealingAttempts}},
  "description": "{{description}}",
  "escalation_level": 1,
  "business_impact": "{{businessImpact}}",
  "customer_facing": {{customerFacing}},
  "metadata": {
    "dashboard_url": "{{dashboardUrl}}",
    "acknowledge_url": "{{acknowledgeUrl}}",
    "source": "nexarax-monitoring"
  }
}`,
        variables: [
          "severity",
          "platform",
          "issueType",
          "alertId",
          "startTime",
          "selfHealingAttempts",
          "description",
          "businessImpact",
          "customerFacing",
          "dashboardUrl",
          "acknowledgeUrl",
        ],
        escalationLevel: "level-1",
        priority: "high",
      },
    ]
    setTemplates(defaultTemplates)
  }

  const loadDeliveryStats = () => {
    const stats: DeliveryStats[] = [
      {
        channel: "email",
        sent: 1247,
        delivered: 1185,
        failed: 62,
        avgResponseTime: 2.3,
        successRate: 95.0,
      },
      {
        channel: "sms",
        sent: 892,
        delivered: 874,
        failed: 18,
        avgResponseTime: 1.2,
        successRate: 98.0,
      },
      {
        channel: "slack",
        sent: 2156,
        delivered: 2134,
        failed: 22,
        avgResponseTime: 0.8,
        successRate: 99.0,
      },
      {
        channel: "webhook",
        sent: 567,
        delivered: 523,
        failed: 44,
        avgResponseTime: 3.1,
        successRate: 92.2,
      },
    ]
    setDeliveryStats(stats)
  }

  const updateChannelConfig = (channelId: string, field: string, value: any) => {
    setChannels((prev) =>
      prev.map((channel) =>
        channel.id === channelId
          ? {
              ...channel,
              config: { ...channel.config, [field]: value },
            }
          : channel,
      ),
    )
    setHasUnsavedChanges(true)
  }

  const toggleChannelEnabled = (channelId: string) => {
    setChannels((prev) =>
      prev.map((channel) => (channel.id === channelId ? { ...channel, enabled: !channel.enabled } : channel)),
    )
    setHasUnsavedChanges(true)
  }

  const testChannel = async (channelId: string) => {
    setTestResults({ ...testResults, [channelId]: { testing: true } })

    try {
      const response = await fetch("/api/notifications/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channelId, testType: "connectivity" }),
      })

      const result = await response.json()

      setTestResults({
        ...testResults,
        [channelId]: {
          testing: false,
          success: result.success,
          responseTime: result.responseTime,
          error: result.error,
          timestamp: new Date(),
        },
      })

      // Update channel test results
      setChannels((prev) =>
        prev.map((channel) =>
          channel.id === channelId
            ? {
                ...channel,
                lastTested: new Date(),
                testResults: {
                  success: result.success,
                  responseTime: result.responseTime,
                  error: result.error,
                },
              }
            : channel,
        ),
      )
    } catch (error) {
      setTestResults({
        ...testResults,
        [channelId]: {
          testing: false,
          success: false,
          error: "Test failed to execute",
          timestamp: new Date(),
        },
      })
    }
  }

  const testAllChannels = async () => {
    setIsTestingAll(true)

    for (const channel of channels.filter((c) => c.enabled)) {
      await testChannel(channel.id)
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Delay between tests
    }

    setIsTestingAll(false)
  }

  const sendTestNotification = async (channelId: string) => {
    try {
      const response = await fetch("/api/notifications/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channelId,
          templateId: "technical-alert",
          variables: {
            platform: "Test Platform",
            issueType: "test_notification",
            severity: "warning",
            startTime: new Date().toISOString(),
            selfHealingAttempts: 0,
            description: "This is a test notification to verify channel functionality.",
            alertId: `test_${Date.now()}`,
            dashboardUrl: "https://nexarax.com/dashboard",
            acknowledgeUrl: "https://nexarax.com/acknowledge",
            businessImpact: "low",
            customerFacing: false,
          },
        }),
      })

      const result = await response.json()
      alert(result.success ? "✅ Test notification sent successfully!" : `❌ Failed to send: ${result.error}`)
    } catch (error) {
      alert("❌ Failed to send test notification")
    }
  }

  const saveConfiguration = async () => {
    try {
      const response = await fetch("/api/notifications/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channels, templates }),
      })

      if (response.ok) {
        setHasUnsavedChanges(false)
        alert("✅ Configuration saved successfully!")
      } else {
        alert("❌ Failed to save configuration")
      }
    } catch (error) {
      alert("❌ Failed to save configuration")
    }
  }

  const toggleSecretVisibility = (key: string) => {
    setShowSecrets((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("📋 Copied to clipboard!")
  }

  const getChannelIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="h-5 w-5 text-blue-500" />
      case "sms":
        return <Smartphone className="h-5 w-5 text-green-500" />
      case "slack":
        return <MessageSquare className="h-5 w-5 text-purple-500" />
      case "webhook":
        return <Webhook className="h-5 w-5 text-orange-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (success: boolean) => {
    return success ? "text-green-600" : "text-red-600"
  }

  const selectedChannelData = channels.find((c) => c.id === selectedChannel)
  const channelStats = deliveryStats.find((s) => s.channel === selectedChannelData?.type)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-100 text-blue-800">📡 Notification System</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Multi-Channel Notifications
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Configure and manage email, SMS, Slack, and webhook notifications for all escalation levels
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {deliveryStats.map((stat) => (
            <Card key={stat.channel} className="border-2 border-blue-200">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                  {getChannelIcon(stat.channel)}
                  <span className="ml-2 font-semibold capitalize">{stat.channel}</span>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-green-600">{stat.successRate}%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                  <div className="text-xs text-gray-500">
                    {stat.delivered}/{stat.sent} delivered
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Control Panel */}
        <Card className="mb-8 border-2 border-purple-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-6 w-6 text-purple-600" />
                Notification Control Panel
              </CardTitle>
              <div className="flex gap-2">
                {hasUnsavedChanges && (
                  <Button onClick={saveConfiguration} className="bg-green-600 hover:bg-green-700">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                )}
                <Button
                  onClick={testAllChannels}
                  disabled={isTestingAll}
                  variant="outline"
                  className="border-blue-500 text-blue-600 hover:bg-blue-50"
                >
                  {isTestingAll ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Testing All...
                    </>
                  ) : (
                    <>
                      <TestTube className="h-4 w-4 mr-2" />
                      Test All Channels
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Active Channels: {channels.filter((c) => c.enabled).length}</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Avg Success Rate: 96.1%</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Avg Response Time: 1.9s</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="channels" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="channels">📡 Channels</TabsTrigger>
            <TabsTrigger value="templates">📝 Templates</TabsTrigger>
            <TabsTrigger value="testing">🧪 Testing</TabsTrigger>
            <TabsTrigger value="analytics">📊 Analytics</TabsTrigger>
          </TabsList>

          {/* Channels Configuration */}
          <TabsContent value="channels">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Channel Selector */}
              <Card className="border-2 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-6 w-6 text-blue-600" />
                    Notification Channels
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {channels.map((channel) => (
                      <div
                        key={channel.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          selectedChannel === channel.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedChannel(channel.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getChannelIcon(channel.type)}
                            <span className="font-medium">{channel.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              className={channel.enabled ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                            >
                              {channel.enabled ? "Enabled" : "Disabled"}
                            </Badge>
                            {channel.testResults && (
                              <div className={getStatusColor(channel.testResults.success)}>
                                {channel.testResults.success ? (
                                  <CheckCircle className="h-4 w-4" />
                                ) : (
                                  <AlertTriangle className="h-4 w-4" />
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Channel Configuration */}
              {selectedChannelData && (
                <Card className="lg:col-span-2 border-2 border-green-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        {getChannelIcon(selectedChannelData.type)}
                        {selectedChannelData.name}
                      </CardTitle>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => toggleChannelEnabled(selectedChannelData.id)}
                          variant={selectedChannelData.enabled ? "destructive" : "default"}
                          size="sm"
                        >
                          {selectedChannelData.enabled ? (
                            <>
                              <PauseCircle className="h-4 w-4 mr-2" />
                              Disable
                            </>
                          ) : (
                            <>
                              <PlayCircle className="h-4 w-4 mr-2" />
                              Enable
                            </>
                          )}
                        </Button>
                        <Button
                          onClick={() => testChannel(selectedChannelData.id)}
                          variant="outline"
                          size="sm"
                          disabled={testResults[selectedChannelData.id]?.testing}
                        >
                          {testResults[selectedChannelData.id]?.testing ? (
                            <>
                              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                              Testing...
                            </>
                          ) : (
                            <>
                              <TestTube className="h-4 w-4 mr-2" />
                              Test
                            </>
                          )}
                        </Button>
                        <Button
                          onClick={() => sendTestNotification(selectedChannelData.id)}
                          variant="outline"
                          size="sm"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Send Test
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Configuration Fields */}
                    <div>
                      <h4 className="font-semibold mb-3">Configuration</h4>
                      <div className="space-y-4">
                        {selectedChannelData.type === "email" && (
                          <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label>
                                <input
                                  type="text"
                                  value={selectedChannelData.config.host}
                                  onChange={(e) => updateChannelConfig(selectedChannelData.id, "host", e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Port</label>
                                <input
                                  type="number"
                                  value={selectedChannelData.config.port}
                                  onChange={(e) =>
                                    updateChannelConfig(selectedChannelData.id, "port", Number(e.target.value))
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">From Address</label>
                              <input
                                type="email"
                                value={selectedChannelData.config.from}
                                onChange={(e) => updateChannelConfig(selectedChannelData.id, "from", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                                <input
                                  type="text"
                                  value={selectedChannelData.config.auth.user}
                                  onChange={(e) =>
                                    updateChannelConfig(selectedChannelData.id, "auth", {
                                      ...selectedChannelData.config.auth,
                                      user: e.target.value,
                                    })
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                <div className="relative">
                                  <input
                                    type={showSecrets[`${selectedChannelData.id}-password`] ? "text" : "password"}
                                    value={selectedChannelData.config.auth.pass}
                                    onChange={(e) =>
                                      updateChannelConfig(selectedChannelData.id, "auth", {
                                        ...selectedChannelData.config.auth,
                                        pass: e.target.value,
                                      })
                                    }
                                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => toggleSecretVisibility(`${selectedChannelData.id}-password`)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                  >
                                    {showSecrets[`${selectedChannelData.id}-password`] ? (
                                      <EyeOff className="h-4 w-4 text-gray-400" />
                                    ) : (
                                      <Eye className="h-4 w-4 text-gray-400" />
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </>
                        )}

                        {selectedChannelData.type === "sms" && (
                          <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Account SID</label>
                                <div className="relative">
                                  <input
                                    type={showSecrets[`${selectedChannelData.id}-sid`] ? "text" : "password"}
                                    value={selectedChannelData.config.accountSid}
                                    onChange={(e) =>
                                      updateChannelConfig(selectedChannelData.id, "accountSid", e.target.value)
                                    }
                                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => toggleSecretVisibility(`${selectedChannelData.id}-sid`)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                  >
                                    {showSecrets[`${selectedChannelData.id}-sid`] ? (
                                      <EyeOff className="h-4 w-4 text-gray-400" />
                                    ) : (
                                      <Eye className="h-4 w-4 text-gray-400" />
                                    )}
                                  </button>
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Auth Token</label>
                                <div className="relative">
                                  <input
                                    type={showSecrets[`${selectedChannelData.id}-token`] ? "text" : "password"}
                                    value={selectedChannelData.config.authToken}
                                    onChange={(e) =>
                                      updateChannelConfig(selectedChannelData.id, "authToken", e.target.value)
                                    }
                                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => toggleSecretVisibility(`${selectedChannelData.id}-token`)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                  >
                                    {showSecrets[`${selectedChannelData.id}-token`] ? (
                                      <EyeOff className="h-4 w-4 text-gray-400" />
                                    ) : (
                                      <Eye className="h-4 w-4 text-gray-400" />
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">From Number</label>
                              <input
                                type="tel"
                                value={selectedChannelData.config.fromNumber}
                                onChange={(e) =>
                                  updateChannelConfig(selectedChannelData.id, "fromNumber", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </>
                        )}

                        {selectedChannelData.type === "slack" && (
                          <>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Bot Token</label>
                              <div className="relative">
                                <input
                                  type={showSecrets[`${selectedChannelData.id}-bot-token`] ? "text" : "password"}
                                  value={selectedChannelData.config.botToken}
                                  onChange={(e) =>
                                    updateChannelConfig(selectedChannelData.id, "botToken", e.target.value)
                                  }
                                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                  type="button"
                                  onClick={() => toggleSecretVisibility(`${selectedChannelData.id}-bot-token`)}
                                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                  {showSecrets[`${selectedChannelData.id}-bot-token`] ? (
                                    <EyeOff className="h-4 w-4 text-gray-400" />
                                  ) : (
                                    <Eye className="h-4 w-4 text-gray-400" />
                                  )}
                                </button>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                                <input
                                  type="text"
                                  value={selectedChannelData.config.username}
                                  onChange={(e) =>
                                    updateChannelConfig(selectedChannelData.id, "username", e.target.value)
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Icon Emoji</label>
                                <input
                                  type="text"
                                  value={selectedChannelData.config.iconEmoji}
                                  onChange={(e) =>
                                    updateChannelConfig(selectedChannelData.id, "iconEmoji", e.target.value)
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                            </div>
                            <div>
                              <h5 className="font-medium mb-2">Channel Mapping</h5>
                              <div className="space-y-2">
                                {Object.entries(selectedChannelData.config.channels).map(([level, channel]) => (
                                  <div key={level} className="flex items-center gap-2">
                                    <span className="w-16 text-sm text-gray-600">{level}:</span>
                                    <input
                                      type="text"
                                      value={channel as string}
                                      onChange={(e) =>
                                        updateChannelConfig(selectedChannelData.id, "channels", {
                                          ...selectedChannelData.config.channels,
                                          [level]: e.target.value,
                                        })
                                      }
                                      className="flex-1 px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </>
                        )}

                        {selectedChannelData.type === "webhook" && (
                          <>
                            <div>
                              <h5 className="font-medium mb-2">Webhook Endpoints</h5>
                              <div className="space-y-2">
                                {Object.entries(selectedChannelData.config.endpoints).map(([level, endpoint]) => (
                                  <div key={level} className="flex items-center gap-2">
                                    <span className="w-16 text-sm text-gray-600">{level}:</span>
                                    <input
                                      type="url"
                                      value={endpoint as string}
                                      onChange={(e) =>
                                        updateChannelConfig(selectedChannelData.id, "endpoints", {
                                          ...selectedChannelData.config.endpoints,
                                          [level]: e.target.value,
                                        })
                                      }
                                      className="flex-1 px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Timeout (ms)</label>
                              <input
                                type="number"
                                value={selectedChannelData.config.timeout}
                                onChange={(e) =>
                                  updateChannelConfig(selectedChannelData.id, "timeout", Number(e.target.value))
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Rate Limiting */}
                    <div>
                      <h4 className="font-semibold mb-3">Rate Limiting</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Max per Minute</label>
                          <input
                            type="number"
                            value={selectedChannelData.rateLimit.maxPerMinute}
                            onChange={(e) =>
                              setChannels((prev) =>
                                prev.map((channel) =>
                                  channel.id === selectedChannelData.id
                                    ? {
                                        ...channel,
                                        rateLimit: { ...channel.rateLimit, maxPerMinute: Number(e.target.value) },
                                      }
                                    : channel,
                                ),
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Max per Hour</label>
                          <input
                            type="number"
                            value={selectedChannelData.rateLimit.maxPerHour}
                            onChange={(e) =>
                              setChannels((prev) =>
                                prev.map((channel) =>
                                  channel.id === selectedChannelData.id
                                    ? {
                                        ...channel,
                                        rateLimit: { ...channel.rateLimit, maxPerHour: Number(e.target.value) },
                                      }
                                    : channel,
                                ),
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Test Results */}
                    {selectedChannelData.testResults && (
                      <div>
                        <h4 className="font-semibold mb-3">Last Test Results</h4>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">Status</span>
                            <Badge
                              className={
                                selectedChannelData.testResults.success
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }
                            >
                              {selectedChannelData.testResults.success ? "PASSED" : "FAILED"}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">Response Time</span>
                            <span className="text-sm">{selectedChannelData.testResults.responseTime}ms</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Last Tested</span>
                            <span className="text-sm">
                              {selectedChannelData.lastTested?.toLocaleString() || "Never"}
                            </span>
                          </div>
                          {selectedChannelData.testResults.error && (
                            <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                              {selectedChannelData.testResults.error}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Channel Statistics */}
                    {channelStats && (
                      <div>
                        <h4 className="font-semibold mb-3">Channel Statistics</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center p-3 bg-blue-50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">{channelStats.sent}</div>
                            <div className="text-sm text-gray-600">Total Sent</div>
                          </div>
                          <div className="text-center p-3 bg-green-50 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">{channelStats.delivered}</div>
                            <div className="text-sm text-gray-600">Delivered</div>
                          </div>
                          <div className="text-center p-3 bg-red-50 rounded-lg">
                            <div className="text-2xl font-bold text-red-600">{channelStats.failed}</div>
                            <div className="text-sm text-gray-600">Failed</div>
                          </div>
                          <div className="text-center p-3 bg-purple-50 rounded-lg">
                            <div className="text-2xl font-bold text-purple-600">{channelStats.avgResponseTime}s</div>
                            <div className="text-sm text-gray-600">Avg Response</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Templates */}
          <TabsContent value="templates">
            <div className="space-y-6">
              {templates.map((template) => (
                <Card key={template.id} className="border-2 border-orange-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        {getChannelIcon(template.type)}
                        {template.name}
                      </CardTitle>
                      <div className="flex gap-2">
                        <Badge className="bg-blue-100 text-blue-800">{template.escalationLevel.toUpperCase()}</Badge>
                        <Badge
                          className={
                            template.priority === "critical"
                              ? "bg-red-100 text-red-800"
                              : template.priority === "high"
                                ? "bg-orange-100 text-orange-800"
                                : "bg-blue-100 text-blue-800"
                          }
                        >
                          {template.priority.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {template.subject && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                          <input
                            type="text"
                            value={template.subject}
                            onChange={(e) =>
                              setTemplates((prev) =>
                                prev.map((t) => (t.id === template.id ? { ...t, subject: e.target.value } : t)),
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Template Body</label>
                        <textarea
                          value={template.body}
                          onChange={(e) =>
                            setTemplates((prev) =>
                              prev.map((t) => (t.id === template.id ? { ...t, body: e.target.value } : t)),
                            )
                          }
                          rows={template.type === "email" ? 15 : template.type === "slack" ? 10 : 5}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Available Variables</label>
                        <div className="flex flex-wrap gap-2">
                          {template.variables.map((variable) => (
                            <Badge
                              key={variable}
                              variant="outline"
                              className="cursor-pointer hover:bg-gray-100"
                              onClick={() => copyToClipboard(`{{${variable}}}`)}
                            >
                              <Copy className="h-3 w-3 mr-1" />
                              {variable}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Testing */}
          <TabsContent value="testing">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-2 border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TestTube className="h-6 w-6 text-green-600" />
                    Channel Testing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {channels.map((channel) => (
                      <div key={channel.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          {getChannelIcon(channel.type)}
                          <span className="font-medium">{channel.name}</span>
                          <Badge
                            className={channel.enabled ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                          >
                            {channel.enabled ? "Enabled" : "Disabled"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          {testResults[channel.id] && (
                            <div className="text-sm">
                              {testResults[channel.id].testing ? (
                                <span className="text-blue-600">Testing...</span>
                              ) : testResults[channel.id].success ? (
                                <span className="text-green-600">✓ {testResults[channel.id].responseTime}ms</span>
                              ) : (
                                <span className="text-red-600">✗ Failed</span>
                              )}
                            </div>
                          )}
                          <Button
                            onClick={() => testChannel(channel.id)}
                            size="sm"
                            variant="outline"
                            disabled={!channel.enabled || testResults[channel.id]?.testing}
                          >
                            {testResults[channel.id]?.testing ? (
                              <RefreshCw className="h-4 w-4 animate-spin" />
                            ) : (
                              <TestTube className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            onClick={() => sendTestNotification(channel.id)}
                            size="sm"
                            disabled={!channel.enabled}
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-6 w-6 text-purple-600" />
                    Test Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(testResults).map(([channelId, result]) => {
                      const channel = channels.find((c) => c.id === channelId)
                      if (!channel || !result || result.testing) return null

                      return (
                        <div key={channelId} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {getChannelIcon(channel.type)}
                              <span className="font-medium">{channel.name}</span>
                            </div>
                            <Badge
                              className={result.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                            >
                              {result.success ? "PASSED" : "FAILED"}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-600">
                            <div>Response Time: {result.responseTime}ms</div>
                            <div>Tested: {result.timestamp?.toLocaleString()}</div>
                            {result.error && <div className="text-red-600 mt-1">Error: {result.error}</div>}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-2 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                    Delivery Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {deliveryStats.map((stat) => (
                      <div key={stat.channel} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {getChannelIcon(stat.channel)}
                            <span className="font-medium capitalize">{stat.channel}</span>
                          </div>
                          <Badge className="bg-green-100 text-green-800">{stat.successRate}%</Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div className="text-center">
                            <div className="font-bold text-blue-600">{stat.sent}</div>
                            <div className="text-gray-600">Sent</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-green-600">{stat.delivered}</div>
                            <div className="text-gray-600">Delivered</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-red-600">{stat.failed}</div>
                            <div className="text-gray-600">Failed</div>
                          </div>
                        </div>
                        <div className="mt-3">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Success Rate</span>
                            <span>{stat.successRate}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${stat.successRate}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-6 w-6 text-green-600" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3">Response Times</h4>
                      <div className="space-y-2">
                        {deliveryStats.map((stat) => (
                          <div key={stat.channel} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {getChannelIcon(stat.channel)}
                              <span className="capitalize">{stat.channel}</span>
                            </div>
                            <span className="font-mono">{stat.avgResponseTime}s</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">System Health</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span>Overall Success Rate</span>
                          <Badge className="bg-green-100 text-green-800">96.1%</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Active Channels</span>
                          <Badge className="bg-blue-100 text-blue-800">
                            {channels.filter((c) => c.enabled).length}/4
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Avg Response Time</span>
                          <Badge className="bg-purple-100 text-purple-800">1.9s</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>System Status</span>
                          <Badge className="bg-green-100 text-green-800">Operational</Badge>
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
