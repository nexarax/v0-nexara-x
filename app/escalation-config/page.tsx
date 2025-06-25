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
  AlertTriangle,
  Clock,
  Users,
  Phone,
  Mail,
  MessageSquare,
  Shield,
  Settings,
  Bell,
  User,
  UserCheck,
  Crown,
  Building,
  Smartphone,
  Webhook,
  CheckCircle,
  ArrowUp,
  Save,
  TestTube,
  Activity,
  TrendingUp,
  AlertCircle,
} from "lucide-react"

interface EscalationLevel {
  id: string
  name: string
  description: string
  triggerDelay: number // minutes
  maxWaitTime: number // minutes
  contacts: Contact[]
  channels: NotificationChannel[]
  autoAcknowledge: boolean
  businessHoursOnly: boolean
}

interface Contact {
  id: string
  name: string
  role: string
  email: string
  phone: string
  timezone: string
  availability: {
    weekdays: string
    weekends: string
  }
  escalationPriority: number
}

interface NotificationChannel {
  type: "email" | "sms" | "slack" | "teams" | "webhook" | "phone"
  enabled: boolean
  config: {
    endpoint?: string
    template?: string
    priority?: "low" | "medium" | "high" | "critical"
  }
}

interface EscalationRule {
  id: string
  platform: string
  issueType: string
  severity: "warning" | "critical" | "emergency"
  selfHealingAttempts: number
  escalationPath: string[] // Level IDs
  businessImpact: "low" | "medium" | "high" | "critical"
  customerFacing: boolean
  regulatoryImpact: boolean
}

interface EscalationEvent {
  id: string
  platform: string
  issueType: string
  severity: "warning" | "critical" | "emergency"
  startTime: Date
  currentLevel: number
  levelHistory: {
    level: string
    startTime: Date
    acknowledgedBy?: string
    acknowledgedAt?: Date
    escalatedAt?: Date
    resolved?: boolean
  }[]
  selfHealingAttempts: number
  businessImpact: string
  status: "active" | "acknowledged" | "resolved" | "escalated"
  assignedTo?: string
  resolution?: string
}

export default function EscalationConfigPage() {
  const [escalationLevels, setEscalationLevels] = useState<EscalationLevel[]>([])
  const [escalationRules, setEscalationRules] = useState<EscalationRule[]>([])
  const [activeEvents, setActiveEvents] = useState<EscalationEvent[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [selectedLevel, setSelectedLevel] = useState<string>("level-1")
  const [testResults, setTestResults] = useState<{ [key: string]: boolean }>({})
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  useEffect(() => {
    initializeEscalationSystem()
    generateSampleEvents()
  }, [])

  const initializeEscalationSystem = () => {
    // Initialize contacts
    const defaultContacts: Contact[] = [
      {
        id: "dev-1",
        name: "Alex Chen",
        role: "Senior Developer",
        email: "alex.chen@nexarax.com",
        phone: "+1-555-0101",
        timezone: "GMT",
        availability: {
          weekdays: "09:00-18:00",
          weekends: "on-call",
        },
        escalationPriority: 1,
      },
      {
        id: "devops-1",
        name: "Sarah Johnson",
        role: "DevOps Engineer",
        email: "sarah.johnson@nexarax.com",
        phone: "+1-555-0102",
        timezone: "GMT",
        availability: {
          weekdays: "08:00-17:00",
          weekends: "emergency-only",
        },
        escalationPriority: 1,
      },
      {
        id: "lead-1",
        name: "Michael Rodriguez",
        role: "Technical Lead",
        email: "michael.rodriguez@nexarax.com",
        phone: "+1-555-0201",
        timezone: "GMT",
        availability: {
          weekdays: "08:00-19:00",
          weekends: "on-call",
        },
        escalationPriority: 2,
      },
      {
        id: "manager-1",
        name: "Emma Thompson",
        role: "Engineering Manager",
        email: "emma.thompson@nexarax.com",
        phone: "+1-555-0301",
        timezone: "GMT",
        availability: {
          weekdays: "09:00-18:00",
          weekends: "critical-only",
        },
        escalationPriority: 3,
      },
      {
        id: "cto-1",
        name: "David Kim",
        role: "Chief Technology Officer",
        email: "david.kim@nexarax.com",
        phone: "+1-555-0401",
        timezone: "GMT",
        availability: {
          weekdays: "24/7",
          weekends: "24/7",
        },
        escalationPriority: 4,
      },
    ]
    setContacts(defaultContacts)

    // Initialize escalation levels
    const defaultLevels: EscalationLevel[] = [
      {
        id: "level-1",
        name: "L1 - Technical Response",
        description: "First-line technical support and immediate response team",
        triggerDelay: 0, // Immediate
        maxWaitTime: 15,
        contacts: defaultContacts.filter((c) => c.escalationPriority === 1),
        channels: [
          {
            type: "email",
            enabled: true,
            config: { priority: "high", template: "technical-alert" },
          },
          {
            type: "slack",
            enabled: true,
            config: { endpoint: "#alerts-technical", priority: "high" },
          },
          {
            type: "sms",
            enabled: false,
            config: { priority: "medium" },
          },
        ],
        autoAcknowledge: false,
        businessHoursOnly: false,
      },
      {
        id: "level-2",
        name: "L2 - Team Lead Escalation",
        description: "Technical leadership and coordination response",
        triggerDelay: 15,
        maxWaitTime: 30,
        contacts: defaultContacts.filter((c) => c.escalationPriority === 2),
        channels: [
          {
            type: "email",
            enabled: true,
            config: { priority: "critical", template: "leadership-alert" },
          },
          {
            type: "sms",
            enabled: true,
            config: { priority: "high" },
          },
          {
            type: "phone",
            enabled: false,
            config: { priority: "critical" },
          },
          {
            type: "slack",
            enabled: true,
            config: { endpoint: "#alerts-leadership", priority: "critical" },
          },
        ],
        autoAcknowledge: false,
        businessHoursOnly: false,
      },
      {
        id: "level-3",
        name: "L3 - Management Escalation",
        description: "Management team for business impact assessment",
        triggerDelay: 45,
        maxWaitTime: 60,
        contacts: defaultContacts.filter((c) => c.escalationPriority === 3),
        channels: [
          {
            type: "email",
            enabled: true,
            config: { priority: "critical", template: "management-alert" },
          },
          {
            type: "sms",
            enabled: true,
            config: { priority: "critical" },
          },
          {
            type: "phone",
            enabled: true,
            config: { priority: "critical" },
          },
          {
            type: "teams",
            enabled: true,
            config: { endpoint: "management-alerts", priority: "critical" },
          },
        ],
        autoAcknowledge: false,
        businessHoursOnly: false,
      },
      {
        id: "level-4",
        name: "L4 - Executive Escalation",
        description: "C-level executives for critical business impact",
        triggerDelay: 90,
        maxWaitTime: 120,
        contacts: defaultContacts.filter((c) => c.escalationPriority === 4),
        channels: [
          {
            type: "phone",
            enabled: true,
            config: { priority: "critical" },
          },
          {
            type: "sms",
            enabled: true,
            config: { priority: "critical" },
          },
          {
            type: "email",
            enabled: true,
            config: { priority: "critical", template: "executive-alert" },
          },
        ],
        autoAcknowledge: false,
        businessHoursOnly: false,
      },
    ]
    setEscalationLevels(defaultLevels)

    // Initialize escalation rules
    const defaultRules: EscalationRule[] = [
      {
        id: "instagram-auth-critical",
        platform: "Instagram",
        issueType: "authentication",
        severity: "critical",
        selfHealingAttempts: 3,
        escalationPath: ["level-1", "level-2", "level-3"],
        businessImpact: "high",
        customerFacing: true,
        regulatoryImpact: false,
      },
      {
        id: "tiktok-quota-emergency",
        platform: "TikTok",
        issueType: "quota_exceeded",
        severity: "emergency",
        selfHealingAttempts: 2,
        escalationPath: ["level-1", "level-2", "level-3", "level-4"],
        businessImpact: "critical",
        customerFacing: true,
        regulatoryImpact: false,
      },
      {
        id: "twitter-api-warning",
        platform: "Twitter/X",
        issueType: "rate_limit",
        severity: "warning",
        selfHealingAttempts: 5,
        escalationPath: ["level-1"],
        businessImpact: "low",
        customerFacing: false,
        regulatoryImpact: false,
      },
      {
        id: "youtube-upload-critical",
        platform: "YouTube",
        issueType: "upload_failure",
        severity: "critical",
        selfHealingAttempts: 2,
        escalationPath: ["level-1", "level-2", "level-3"],
        businessImpact: "high",
        customerFacing: true,
        regulatoryImpact: false,
      },
    ]
    setEscalationRules(defaultRules)
  }

  const generateSampleEvents = () => {
    const sampleEvents: EscalationEvent[] = [
      {
        id: "event-1",
        platform: "Instagram",
        issueType: "authentication",
        severity: "critical",
        startTime: new Date(Date.now() - 25 * 60 * 1000), // 25 minutes ago
        currentLevel: 1,
        levelHistory: [
          {
            level: "level-1",
            startTime: new Date(Date.now() - 25 * 60 * 1000),
            acknowledgedBy: "Alex Chen",
            acknowledgedAt: new Date(Date.now() - 20 * 60 * 1000),
          },
          {
            level: "level-2",
            startTime: new Date(Date.now() - 10 * 60 * 1000),
          },
        ],
        selfHealingAttempts: 3,
        businessImpact: "high",
        status: "escalated",
        assignedTo: "Michael Rodriguez",
      },
      {
        id: "event-2",
        platform: "TikTok",
        issueType: "quota_exceeded",
        severity: "emergency",
        startTime: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
        currentLevel: 0,
        levelHistory: [
          {
            level: "level-1",
            startTime: new Date(Date.now() - 5 * 60 * 1000),
          },
        ],
        selfHealingAttempts: 2,
        businessImpact: "critical",
        status: "active",
      },
      {
        id: "event-3",
        platform: "YouTube",
        issueType: "upload_failure",
        severity: "critical",
        startTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        currentLevel: 2,
        levelHistory: [
          {
            level: "level-1",
            startTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
            acknowledgedBy: "Sarah Johnson",
            acknowledgedAt: new Date(Date.now() - 110 * 60 * 1000),
            escalatedAt: new Date(Date.now() - 105 * 60 * 1000),
          },
          {
            level: "level-2",
            startTime: new Date(Date.now() - 105 * 60 * 1000),
            acknowledgedBy: "Michael Rodriguez",
            acknowledgedAt: new Date(Date.now() - 90 * 60 * 1000),
            escalatedAt: new Date(Date.now() - 75 * 60 * 1000),
          },
          {
            level: "level-3",
            startTime: new Date(Date.now() - 75 * 60 * 1000),
            resolved: true,
          },
        ],
        selfHealingAttempts: 2,
        businessImpact: "high",
        status: "resolved",
        assignedTo: "Emma Thompson",
        resolution: "Manual intervention required - YouTube API quota reset",
      },
    ]
    setActiveEvents(sampleEvents)
  }

  const updateEscalationLevel = (levelId: string, field: string, value: any) => {
    setEscalationLevels((prev) => prev.map((level) => (level.id === levelId ? { ...level, [field]: value } : level)))
    setHasUnsavedChanges(true)
  }

  const updateNotificationChannel = (levelId: string, channelType: string, field: string, value: any) => {
    setEscalationLevels((prev) =>
      prev.map((level) =>
        level.id === levelId
          ? {
              ...level,
              channels: level.channels.map((channel) =>
                channel.type === channelType
                  ? {
                      ...channel,
                      [field]: field === "config" ? { ...channel.config, ...value } : value,
                    }
                  : channel,
              ),
            }
          : level,
      ),
    )
    setHasUnsavedChanges(true)
  }

  const testEscalationLevel = async (levelId: string) => {
    setTestResults({ ...testResults, [levelId]: false })

    // Simulate testing escalation level
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setTestResults({ ...testResults, [levelId]: true })

    setTimeout(() => {
      setTestResults((prev) => ({ ...prev, [levelId]: false }))
    }, 5000)
  }

  const acknowledgeEvent = (eventId: string, acknowledgedBy: string) => {
    setActiveEvents((prev) =>
      prev.map((event) =>
        event.id === eventId
          ? {
              ...event,
              status: "acknowledged" as const,
              assignedTo: acknowledgedBy,
              levelHistory: event.levelHistory.map((history, index) =>
                index === event.currentLevel
                  ? {
                      ...history,
                      acknowledgedBy,
                      acknowledgedAt: new Date(),
                    }
                  : history,
              ),
            }
          : event,
      ),
    )
  }

  const escalateEvent = (eventId: string) => {
    setActiveEvents((prev) =>
      prev.map((event) => {
        if (event.id === eventId) {
          const rule = escalationRules.find((r) => r.platform === event.platform && r.issueType === event.issueType)
          if (rule && event.currentLevel < rule.escalationPath.length - 1) {
            const newLevel = event.currentLevel + 1
            return {
              ...event,
              currentLevel: newLevel,
              status: "escalated" as const,
              levelHistory: [
                ...event.levelHistory.map((history, index) =>
                  index === event.currentLevel ? { ...history, escalatedAt: new Date() } : history,
                ),
                {
                  level: rule.escalationPath[newLevel],
                  startTime: new Date(),
                },
              ],
            }
          }
        }
        return event
      }),
    )
  }

  const resolveEvent = (eventId: string, resolution: string) => {
    setActiveEvents((prev) =>
      prev.map((event) =>
        event.id === eventId
          ? {
              ...event,
              status: "resolved" as const,
              resolution,
              levelHistory: event.levelHistory.map((history, index) =>
                index === event.currentLevel ? { ...history, resolved: true } : history,
              ),
            }
          : event,
      ),
    )
  }

  const saveConfiguration = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setHasUnsavedChanges(false)
    alert("✅ Escalation configuration saved successfully!")
  }

  const platformIcons = {
    Instagram: <Instagram className="h-5 w-5 text-pink-600" />,
    TikTok: (
      <div className="h-5 w-5 bg-black rounded-sm flex items-center justify-center text-white text-xs font-bold">T</div>
    ),
    "Twitter/X": <Twitter className="h-5 w-5 text-blue-500" />,
    YouTube: <Youtube className="h-5 w-5 text-red-600" />,
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "critical":
        return "bg-red-100 text-red-800"
      case "emergency":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-red-100 text-red-800"
      case "acknowledged":
        return "bg-blue-100 text-blue-800"
      case "escalated":
        return "bg-purple-100 text-purple-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getLevelIcon = (levelId: string) => {
    switch (levelId) {
      case "level-1":
        return <User className="h-4 w-4 text-blue-600" />
      case "level-2":
        return <UserCheck className="h-4 w-4 text-green-600" />
      case "level-3":
        return <Users className="h-4 w-4 text-orange-600" />
      case "level-4":
        return <Crown className="h-4 w-4 text-purple-600" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-600" />
    }
  }

  const getChannelIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4 text-blue-500" />
      case "sms":
        return <Smartphone className="h-4 w-4 text-green-500" />
      case "slack":
        return <MessageSquare className="h-4 w-4 text-purple-500" />
      case "teams":
        return <Building className="h-4 w-4 text-blue-600" />
      case "phone":
        return <Phone className="h-4 w-4 text-red-500" />
      case "webhook":
        return <Webhook className="h-4 w-4 text-orange-500" />
      default:
        return <Bell className="h-4 w-4 text-gray-500" />
    }
  }

  const selectedLevelData = escalationLevels.find((level) => level.id === selectedLevel)
  const activeEventsCount = activeEvents.filter((e) => e.status === "active").length
  const escalatedEventsCount = activeEvents.filter((e) => e.status === "escalated").length
  const resolvedEventsCount = activeEvents.filter((e) => e.status === "resolved").length

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-red-100 text-red-800">🚨 Escalation Management</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
            Multi-Level Alert Escalation
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Intelligent escalation system ensuring critical issues reach the right people at the right time
          </p>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 border-red-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <span className="text-2xl font-bold text-red-600">{activeEventsCount}</span>
              </div>
              <p className="text-sm text-gray-600">Active Alerts</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <ArrowUp className="h-5 w-5 text-purple-600" />
                <span className="text-2xl font-bold text-purple-600">{escalatedEventsCount}</span>
              </div>
              <p className="text-sm text-gray-600">Escalated</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-2xl font-bold text-green-600">{resolvedEventsCount}</span>
              </div>
              <p className="text-sm text-gray-600">Resolved</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <span className="text-2xl font-bold text-blue-600">4</span>
              </div>
              <p className="text-sm text-gray-600">Escalation Levels</p>
            </CardContent>
          </Card>
        </div>

        {/* Control Panel */}
        <Card className="mb-8 border-2 border-purple-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-purple-600" />
                Escalation Control Panel
              </CardTitle>
              <div className="flex gap-2">
                {hasUnsavedChanges && (
                  <Button onClick={saveConfiguration} className="bg-green-600 hover:bg-green-700">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                )}
                <Button variant="outline">
                  <TestTube className="h-4 w-4 mr-2" />
                  Test All Levels
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-gray-500" />
                <span className="text-sm">System Status: Active</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Avg Response Time: 3.2 min</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Success Rate: 94.7%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="levels" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="levels">🎯 Escalation Levels</TabsTrigger>
            <TabsTrigger value="rules">📋 Rules & Policies</TabsTrigger>
            <TabsTrigger value="events">🚨 Active Events</TabsTrigger>
            <TabsTrigger value="contacts">👥 Contact Management</TabsTrigger>
          </TabsList>

          {/* Escalation Levels */}
          <TabsContent value="levels">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Level Selector */}
              <Card className="border-2 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-6 w-6 text-blue-600" />
                    Escalation Levels
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {escalationLevels.map((level) => (
                      <Button
                        key={level.id}
                        variant={selectedLevel === level.id ? "default" : "outline"}
                        onClick={() => setSelectedLevel(level.id)}
                        className="w-full justify-start"
                      >
                        {getLevelIcon(level.id)}
                        <span className="ml-2">{level.name}</span>
                        {testResults[level.id] && <CheckCircle className="h-4 w-4 ml-auto text-green-500" />}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Level Configuration */}
              {selectedLevelData && (
                <Card className="lg:col-span-2 border-2 border-green-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        {getLevelIcon(selectedLevelData.id)}
                        {selectedLevelData.name}
                      </CardTitle>
                      <Button
                        onClick={() => testEscalationLevel(selectedLevelData.id)}
                        variant="outline"
                        size="sm"
                        disabled={testResults[selectedLevelData.id]}
                      >
                        {testResults[selectedLevelData.id] ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                            Test Passed
                          </>
                        ) : (
                          <>
                            <TestTube className="h-4 w-4 mr-2" />
                            Test Level
                          </>
                        )}
                      </Button>
                    </div>
                    <CardDescription>{selectedLevelData.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Timing Configuration */}
                    <div>
                      <h4 className="font-semibold mb-3">Timing Configuration</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Trigger Delay (minutes)
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="180"
                            value={selectedLevelData.triggerDelay}
                            onChange={(e) =>
                              updateEscalationLevel(selectedLevelData.id, "triggerDelay", Number(e.target.value))
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Max Wait Time (minutes)
                          </label>
                          <input
                            type="number"
                            min="5"
                            max="480"
                            value={selectedLevelData.maxWaitTime}
                            onChange={(e) =>
                              updateEscalationLevel(selectedLevelData.id, "maxWaitTime", Number(e.target.value))
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Notification Channels */}
                    <div>
                      <h4 className="font-semibold mb-3">Notification Channels</h4>
                      <div className="space-y-3">
                        {selectedLevelData.channels.map((channel) => (
                          <div key={channel.type} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              {getChannelIcon(channel.type)}
                              <span className="font-medium capitalize">{channel.type}</span>
                              <Badge
                                className={
                                  channel.enabled ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                                }
                              >
                                {channel.enabled ? "Enabled" : "Disabled"}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <select
                                value={channel.config.priority || "medium"}
                                onChange={(e) =>
                                  updateNotificationChannel(selectedLevelData.id, channel.type, "config", {
                                    priority: e.target.value,
                                  })
                                }
                                className="px-2 py-1 border border-gray-300 rounded text-sm"
                              >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                                <option value="critical">Critical</option>
                              </select>
                              <input
                                type="checkbox"
                                checked={channel.enabled}
                                onChange={(e) =>
                                  updateNotificationChannel(
                                    selectedLevelData.id,
                                    channel.type,
                                    "enabled",
                                    e.target.checked,
                                  )
                                }
                                className="w-4 h-4"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Assigned Contacts */}
                    <div>
                      <h4 className="font-semibold mb-3">Assigned Contacts</h4>
                      <div className="space-y-2">
                        {selectedLevelData.contacts.map((contact) => (
                          <div key={contact.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <div className="font-medium">{contact.name}</div>
                              <div className="text-sm text-gray-600">{contact.role}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm">{contact.email}</div>
                              <div className="text-sm text-gray-600">{contact.phone}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Options */}
                    <div>
                      <h4 className="font-semibold mb-3">Options</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            id={`auto-ack-${selectedLevelData.id}`}
                            checked={selectedLevelData.autoAcknowledge}
                            onChange={(e) =>
                              updateEscalationLevel(selectedLevelData.id, "autoAcknowledge", e.target.checked)
                            }
                            className="w-4 h-4"
                          />
                          <label htmlFor={`auto-ack-${selectedLevelData.id}`} className="text-sm">
                            Auto-acknowledge after notification
                          </label>
                        </div>
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            id={`business-hours-${selectedLevelData.id}`}
                            checked={selectedLevelData.businessHoursOnly}
                            onChange={(e) =>
                              updateEscalationLevel(selectedLevelData.id, "businessHoursOnly", e.target.checked)
                            }
                            className="w-4 h-4"
                          />
                          <label htmlFor={`business-hours-${selectedLevelData.id}`} className="text-sm">
                            Business hours only (9 AM - 6 PM GMT)
                          </label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Rules & Policies */}
          <TabsContent value="rules">
            <div className="space-y-6">
              {escalationRules.map((rule) => (
                <Card key={rule.id} className="border-2 border-orange-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        {platformIcons[rule.platform as keyof typeof platformIcons]}
                        {rule.platform} - {rule.issueType.replace(/_/g, " ")}
                      </CardTitle>
                      <div className="flex gap-2">
                        <Badge className={getSeverityColor(rule.severity)}>{rule.severity.toUpperCase()}</Badge>
                        <Badge
                          className={rule.customerFacing ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"}
                        >
                          {rule.customerFacing ? "Customer Facing" : "Internal"}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">Trigger Conditions</h4>
                        <div className="space-y-2 text-sm">
                          <div>Self-healing attempts: {rule.selfHealingAttempts}</div>
                          <div>Business impact: {rule.businessImpact}</div>
                          <div>Regulatory impact: {rule.regulatoryImpact ? "Yes" : "No"}</div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Escalation Path</h4>
                        <div className="space-y-1">
                          {rule.escalationPath.map((levelId, index) => {
                            const level = escalationLevels.find((l) => l.id === levelId)
                            return (
                              <div key={levelId} className="flex items-center gap-2 text-sm">
                                <span className="w-4 h-4 bg-blue-100 text-blue-800 rounded-full text-xs flex items-center justify-center">
                                  {index + 1}
                                </span>
                                {getLevelIcon(levelId)}
                                <span>{level?.name || levelId}</span>
                              </div>
                            )
                          })}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Timing</h4>
                        <div className="space-y-1 text-sm">
                          {rule.escalationPath.map((levelId, index) => {
                            const level = escalationLevels.find((l) => l.id === levelId)
                            return (
                              <div key={levelId} className="flex justify-between">
                                <span>Level {index + 1}:</span>
                                <span>{level?.triggerDelay || 0} min</span>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Active Events */}
          <TabsContent value="events">
            <div className="space-y-6">
              {activeEvents.map((event) => (
                <Card key={event.id} className="border-2 border-red-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        {platformIcons[event.platform as keyof typeof platformIcons]}
                        {event.platform} - {event.issueType.replace(/_/g, " ")}
                      </CardTitle>
                      <div className="flex gap-2">
                        <Badge className={getSeverityColor(event.severity)}>{event.severity.toUpperCase()}</Badge>
                        <Badge className={getStatusColor(event.status)}>{event.status.toUpperCase()}</Badge>
                      </div>
                    </div>
                    <CardDescription>
                      Started {Math.floor((Date.now() - event.startTime.getTime()) / (1000 * 60))} minutes ago
                      {event.assignedTo && ` • Assigned to ${event.assignedTo}`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Event Details</h4>
                        <div className="space-y-2 text-sm">
                          <div>Self-healing attempts: {event.selfHealingAttempts}</div>
                          <div>Business impact: {event.businessImpact}</div>
                          <div>Current level: {event.currentLevel + 1}</div>
                          {event.resolution && <div>Resolution: {event.resolution}</div>}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Escalation History</h4>
                        <div className="space-y-2">
                          {event.levelHistory.map((history, index) => {
                            const level = escalationLevels.find((l) => l.id === history.level)
                            const isActive = index === event.currentLevel
                            return (
                              <div
                                key={index}
                                className={`p-2 rounded border ${isActive ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    {getLevelIcon(history.level)}
                                    <span className="font-medium">{level?.name || history.level}</span>
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {history.startTime.toLocaleTimeString("en-GB", {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </div>
                                </div>
                                {history.acknowledgedBy && (
                                  <div className="text-xs text-green-600 mt-1">
                                    ✓ Acknowledged by {history.acknowledgedBy} at{" "}
                                    {history.acknowledgedAt?.toLocaleTimeString("en-GB", {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </div>
                                )}
                                {history.escalatedAt && (
                                  <div className="text-xs text-orange-600 mt-1">
                                    ↗ Escalated at{" "}
                                    {history.escalatedAt.toLocaleTimeString("en-GB", {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </div>
                                )}
                                {history.resolved && <div className="text-xs text-green-600 mt-1">✅ Resolved</div>}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>

                    {event.status !== "resolved" && (
                      <div className="flex gap-2 mt-4">
                        {event.status === "active" && (
                          <Button
                            onClick={() => acknowledgeEvent(event.id, "Current User")}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            <UserCheck className="h-4 w-4 mr-2" />
                            Acknowledge
                          </Button>
                        )}
                        <Button onClick={() => escalateEvent(event.id)} variant="outline">
                          <ArrowUp className="h-4 w-4 mr-2" />
                          Escalate Now
                        </Button>
                        <Button
                          onClick={() => resolveEvent(event.id, "Manual resolution")}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Resolve
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Contact Management */}
          <TabsContent value="contacts">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {contacts.map((contact) => (
                <Card key={contact.id} className="border-2 border-blue-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-6 w-6 text-blue-600" />
                      {contact.name}
                    </CardTitle>
                    <CardDescription>{contact.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-gray-600">Email</label>
                          <div className="font-medium">{contact.email}</div>
                        </div>
                        <div>
                          <label className="text-sm text-gray-600">Phone</label>
                          <div className="font-medium">{contact.phone}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-gray-600">Timezone</label>
                          <div className="font-medium">{contact.timezone}</div>
                        </div>
                        <div>
                          <label className="text-sm text-gray-600">Priority Level</label>
                          <Badge className="bg-blue-100 text-blue-800">L{contact.escalationPriority}</Badge>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm text-gray-600">Availability</label>
                        <div className="text-sm">
                          <div>Weekdays: {contact.availability.weekdays}</div>
                          <div>Weekends: {contact.availability.weekends}</div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Settings className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          <TestTube className="h-4 w-4 mr-2" />
                          Test Contact
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
