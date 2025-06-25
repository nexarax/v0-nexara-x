"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  Bell,
  Calendar,
  TrendingUp,
  Globe,
  Rss,
  Mail,
  Smartphone,
  ExternalLink,
  Download,
  Share2,
  Instagram,
  Twitter,
  Youtube,
  Activity,
  Zap,
  Shield,
  BarChart3,
  Users,
  MessageSquare,
} from "lucide-react"

interface ServiceStatus {
  id: string
  name: string
  description: string
  status: "operational" | "degraded" | "partial_outage" | "major_outage" | "maintenance"
  uptime: number
  responseTime: number
  icon: React.ReactNode
  lastIncident?: Date
}

interface Incident {
  id: string
  title: string
  description: string
  status: "investigating" | "identified" | "monitoring" | "resolved"
  severity: "minor" | "major" | "critical"
  startTime: Date
  resolvedTime?: Date
  affectedServices: string[]
  updates: IncidentUpdate[]
}

interface IncidentUpdate {
  id: string
  timestamp: Date
  status: string
  message: string
  author: string
}

interface MaintenanceWindow {
  id: string
  title: string
  description: string
  startTime: Date
  endTime: Date
  affectedServices: string[]
  status: "scheduled" | "in_progress" | "completed"
}

export default function StatusPage() {
  const [services, setServices] = useState<ServiceStatus[]>([])
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [maintenance, setMaintenance] = useState<MaintenanceWindow[]>([])
  const [overallStatus, setOverallStatus] = useState<"operational" | "degraded" | "outage">("operational")
  const [subscriberCount, setSubscriberCount] = useState(12847)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [emailSubscription, setEmailSubscription] = useState("")

  useEffect(() => {
    // Initialize services
    const initialServices: ServiceStatus[] = [
      {
        id: "ai-content-generation",
        name: "AI Content Generation",
        description: "Image, video, and text generation services",
        status: "operational",
        uptime: 99.97,
        responseTime: 1.2,
        icon: <Zap className="h-5 w-5 text-blue-600" />,
      },
      {
        id: "instagram-integration",
        name: "Instagram Integration",
        description: "Instagram API and posting services",
        status: "operational",
        uptime: 99.94,
        responseTime: 0.8,
        icon: <Instagram className="h-5 w-5 text-pink-600" />,
      },
      {
        id: "tiktok-integration",
        name: "TikTok Integration",
        description: "TikTok API and content publishing",
        status: "degraded",
        uptime: 98.76,
        responseTime: 2.1,
        icon: (
          <div className="h-5 w-5 bg-black rounded-sm flex items-center justify-center text-white text-xs font-bold">
            T
          </div>
        ),
        lastIncident: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
      {
        id: "twitter-integration",
        name: "Twitter/X Integration",
        description: "Twitter API and social media management",
        status: "operational",
        uptime: 99.89,
        responseTime: 1.1,
        icon: <Twitter className="h-5 w-5 text-blue-500" />,
      },
      {
        id: "youtube-integration",
        name: "YouTube Integration",
        description: "YouTube API and video management",
        status: "operational",
        uptime: 99.92,
        responseTime: 1.5,
        icon: <Youtube className="h-5 w-5 text-red-600" />,
      },
      {
        id: "analytics-dashboard",
        name: "Analytics Dashboard",
        description: "Performance tracking and insights",
        status: "operational",
        uptime: 99.98,
        responseTime: 0.6,
        icon: <BarChart3 className="h-5 w-5 text-green-600" />,
      },
      {
        id: "user-authentication",
        name: "User Authentication",
        description: "Login, registration, and account management",
        status: "operational",
        uptime: 99.99,
        responseTime: 0.4,
        icon: <Shield className="h-5 w-5 text-purple-600" />,
      },
      {
        id: "api-services",
        name: "API Services",
        description: "REST API and developer tools",
        status: "operational",
        uptime: 99.95,
        responseTime: 0.9,
        icon: <Globe className="h-5 w-5 text-indigo-600" />,
      },
    ]
    setServices(initialServices)

    // Initialize incidents
    const initialIncidents: Incident[] = [
      {
        id: "inc-001",
        title: "TikTok API Rate Limiting Issues",
        description: "Users experiencing slower response times when posting to TikTok due to API rate limiting.",
        status: "monitoring",
        severity: "minor",
        startTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
        affectedServices: ["tiktok-integration"],
        updates: [
          {
            id: "upd-001",
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
            status: "investigating",
            message: "We are investigating reports of slower TikTok posting times.",
            author: "Engineering Team",
          },
          {
            id: "upd-002",
            timestamp: new Date(Date.now() - 90 * 60 * 1000),
            status: "identified",
            message:
              "We have identified the issue as TikTok API rate limiting. Implementing retry logic and queue optimization.",
            author: "Engineering Team",
          },
          {
            id: "upd-003",
            timestamp: new Date(Date.now() - 30 * 60 * 1000),
            status: "monitoring",
            message: "Fix has been deployed. We are monitoring the system for improvements in response times.",
            author: "Engineering Team",
          },
        ],
      },
      {
        id: "inc-002",
        title: "Scheduled Database Maintenance Completed",
        description: "Routine database maintenance to improve performance and reliability.",
        status: "resolved",
        severity: "minor",
        startTime: new Date(Date.now() - 24 * 60 * 60 * 1000),
        resolvedTime: new Date(Date.now() - 22 * 60 * 60 * 1000),
        affectedServices: ["ai-content-generation", "analytics-dashboard"],
        updates: [
          {
            id: "upd-004",
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
            status: "monitoring",
            message: "Database maintenance has been completed successfully. All services are operational.",
            author: "Infrastructure Team",
          },
        ],
      },
    ]
    setIncidents(initialIncidents)

    // Initialize maintenance windows
    const initialMaintenance: MaintenanceWindow[] = [
      {
        id: "maint-001",
        title: "Infrastructure Upgrade",
        description: "Upgrading our cloud infrastructure to improve performance and add new AI capabilities.",
        startTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
        affectedServices: ["ai-content-generation", "api-services"],
        status: "scheduled",
      },
      {
        id: "maint-002",
        title: "Security Updates",
        description: "Applying security patches and updates across all systems.",
        startTime: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        endTime: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000),
        affectedServices: ["user-authentication"],
        status: "scheduled",
      },
    ]
    setMaintenance(initialMaintenance)

    // Determine overall status
    const hasOutage = initialServices.some((s) => s.status === "major_outage" || s.status === "partial_outage")
    const hasDegraded = initialServices.some((s) => s.status === "degraded")

    if (hasOutage) {
      setOverallStatus("outage")
    } else if (hasDegraded) {
      setOverallStatus("degraded")
    } else {
      setOverallStatus("operational")
    }

    // Update timestamp every minute
    const interval = setInterval(() => {
      setLastUpdated(new Date())
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-green-100 text-green-800"
      case "degraded":
        return "bg-yellow-100 text-yellow-800"
      case "partial_outage":
        return "bg-orange-100 text-orange-800"
      case "major_outage":
        return "bg-red-100 text-red-800"
      case "maintenance":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "degraded":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "partial_outage":
      case "major_outage":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "maintenance":
        return <Clock className="h-4 w-4 text-blue-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getIncidentSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800"
      case "major":
        return "bg-orange-100 text-orange-800"
      case "minor":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getIncidentStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "bg-green-100 text-green-800"
      case "monitoring":
        return "bg-blue-100 text-blue-800"
      case "identified":
        return "bg-yellow-100 text-yellow-800"
      case "investigating":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getOverallStatusMessage = () => {
    switch (overallStatus) {
      case "operational":
        return "All systems operational"
      case "degraded":
        return "Some systems experiencing issues"
      case "outage":
        return "Service disruption in progress"
      default:
        return "Status unknown"
    }
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (emailSubscription) {
      // Simulate subscription
      setSubscriberCount((prev) => prev + 1)
      setEmailSubscription("")
      alert("Successfully subscribed to status updates!")
    }
  }

  const shareStatus = () => {
    if (navigator.share) {
      navigator.share({
        title: "NexaraX Status",
        text: "Check the current status of NexaraX services",
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Status page URL copied to clipboard!")
    }
  }

  const overallUptime = services.reduce((sum, service) => sum + service.uptime, 0) / services.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">NexaraX Status</h1>
                <p className="text-gray-600">Real-time service status and incident updates</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={shareStatus}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Rss className="h-4 w-4 mr-2" />
                RSS
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                API
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Overall Status */}
        <Card
          className={`mb-8 border-2 ${overallStatus === "operational" ? "border-green-200" : overallStatus === "degraded" ? "border-yellow-200" : "border-red-200"}`}
        >
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-full ${overallStatus === "operational" ? "bg-green-100" : overallStatus === "degraded" ? "bg-yellow-100" : "bg-red-100"}`}
                >
                  {overallStatus === "operational" ? (
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  ) : overallStatus === "degraded" ? (
                    <AlertTriangle className="h-8 w-8 text-yellow-600" />
                  ) : (
                    <XCircle className="h-8 w-8 text-red-600" />
                  )}
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-1">{getOverallStatusMessage()}</h2>
                  <p className="text-gray-600">
                    Last updated:{" "}
                    {lastUpdated.toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    GMT
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-600">{overallUptime.toFixed(2)}%</div>
                <div className="text-sm text-gray-600">Overall uptime (30 days)</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="services" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="services">🔧 Services</TabsTrigger>
            <TabsTrigger value="incidents">🚨 Incidents</TabsTrigger>
            <TabsTrigger value="maintenance">🔧 Maintenance</TabsTrigger>
            <TabsTrigger value="subscribe">📧 Subscribe</TabsTrigger>
          </TabsList>

          {/* Services */}
          <TabsContent value="services">
            <div className="space-y-4">
              {services.map((service) => (
                <Card key={service.id} className="border-2 border-gray-200 hover:border-gray-300 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-gray-50 rounded-lg">{service.icon}</div>
                        <div>
                          <h3 className="font-semibold text-lg">{service.name}</h3>
                          <p className="text-gray-600 text-sm">{service.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="text-sm text-gray-600">Uptime (30d)</div>
                          <div className="font-semibold text-green-600">{service.uptime}%</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">Response Time</div>
                          <div className="font-semibold">{service.responseTime}s</div>
                        </div>
                        <Badge className={getStatusColor(service.status)}>
                          {getStatusIcon(service.status)}
                          <span className="ml-2 capitalize">{service.status.replace("_", " ")}</span>
                        </Badge>
                      </div>
                    </div>
                    {service.lastIncident && (
                      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-center gap-2 text-sm text-yellow-800">
                          <AlertTriangle className="h-4 w-4" />
                          Last incident:{" "}
                          {service.lastIncident.toLocaleString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Incidents */}
          <TabsContent value="incidents">
            <div className="space-y-6">
              {incidents.length === 0 ? (
                <Card className="border-2 border-green-200">
                  <CardContent className="p-8 text-center">
                    <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No active incidents</h3>
                    <p className="text-gray-600">All systems are operating normally.</p>
                  </CardContent>
                </Card>
              ) : (
                incidents.map((incident) => (
                  <Card key={incident.id} className="border-2 border-orange-200">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-3">
                            {incident.title}
                            <Badge className={getIncidentSeverityColor(incident.severity)}>
                              {incident.severity.toUpperCase()}
                            </Badge>
                            <Badge className={getIncidentStatusColor(incident.status)}>
                              {incident.status.replace("_", " ").toUpperCase()}
                            </Badge>
                          </CardTitle>
                          <CardDescription className="mt-2">{incident.description}</CardDescription>
                        </div>
                        <div className="text-right text-sm text-gray-600">
                          <div>Started: {incident.startTime.toLocaleString("en-GB")}</div>
                          {incident.resolvedTime && (
                            <div>Resolved: {incident.resolvedTime.toLocaleString("en-GB")}</div>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <h4 className="font-semibold mb-2">Affected Services:</h4>
                        <div className="flex flex-wrap gap-2">
                          {incident.affectedServices.map((serviceId) => {
                            const service = services.find((s) => s.id === serviceId)
                            return service ? (
                              <Badge key={serviceId} variant="outline">
                                {service.name}
                              </Badge>
                            ) : null
                          })}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Updates:</h4>
                        <div className="space-y-3">
                          {incident.updates.map((update) => (
                            <div key={update.id} className="border-l-4 border-blue-200 pl-4">
                              <div className="flex items-center justify-between mb-1">
                                <Badge className={getIncidentStatusColor(update.status)}>
                                  {update.status.replace("_", " ").toUpperCase()}
                                </Badge>
                                <span className="text-sm text-gray-600">
                                  {update.timestamp.toLocaleString("en-GB")}
                                </span>
                              </div>
                              <p className="text-gray-700">{update.message}</p>
                              <p className="text-sm text-gray-500 mt-1">— {update.author}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Maintenance */}
          <TabsContent value="maintenance">
            <div className="space-y-4">
              {maintenance.length === 0 ? (
                <Card className="border-2 border-blue-200">
                  <CardContent className="p-8 text-center">
                    <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No scheduled maintenance</h3>
                    <p className="text-gray-600">No maintenance windows are currently scheduled.</p>
                  </CardContent>
                </Card>
              ) : (
                maintenance.map((maint) => (
                  <Card key={maint.id} className="border-2 border-blue-200">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-3">
                            {maint.title}
                            <Badge
                              className={
                                maint.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : maint.status === "in_progress"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-blue-100 text-blue-800"
                              }
                            >
                              {maint.status.replace("_", " ").toUpperCase()}
                            </Badge>
                          </CardTitle>
                          <CardDescription className="mt-2">{maint.description}</CardDescription>
                        </div>
                        <div className="text-right text-sm text-gray-600">
                          <div>Start: {maint.startTime.toLocaleString("en-GB")}</div>
                          <div>End: {maint.endTime.toLocaleString("en-GB")}</div>
                          <div className="mt-1 font-semibold">
                            Duration: {Math.round((maint.endTime.getTime() - maint.startTime.getTime()) / (1000 * 60))}{" "}
                            minutes
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div>
                        <h4 className="font-semibold mb-2">Affected Services:</h4>
                        <div className="flex flex-wrap gap-2">
                          {maint.affectedServices.map((serviceId) => {
                            const service = services.find((s) => s.id === serviceId)
                            return service ? (
                              <Badge key={serviceId} variant="outline">
                                {service.name}
                              </Badge>
                            ) : null
                          })}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Subscribe */}
          <TabsContent value="subscribe">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-2 border-purple-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-6 w-6 text-purple-600" />
                    Get Status Updates
                  </CardTitle>
                  <CardDescription>
                    Stay informed about service status, incidents, and maintenance windows
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <form onSubmit={handleSubscribe} className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={emailSubscription}
                        onChange={(e) => setEmailSubscription(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                      <Mail className="h-4 w-4 mr-2" />
                      Subscribe to Updates
                    </Button>
                  </form>

                  <div className="pt-4 border-t">
                    <h4 className="font-semibold mb-3">Other Ways to Stay Updated:</h4>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <Rss className="h-4 w-4 mr-2" />
                        RSS Feed
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Smartphone className="h-4 w-4 mr-2" />
                        SMS Notifications
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Slack Integration
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Webhook API
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                    Status Statistics
                  </CardTitle>
                  <CardDescription>Historical performance and reliability metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{overallUptime.toFixed(2)}%</div>
                      <div className="text-sm text-gray-600">30-day uptime</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">1.1s</div>
                      <div className="text-sm text-gray-600">Avg response time</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Active subscribers:</span>
                      <span className="font-semibold">{subscriberCount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Incidents this month:</span>
                      <span className="font-semibold">2</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Avg resolution time:</span>
                      <span className="font-semibold">47 minutes</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Services monitored:</span>
                      <span className="font-semibold">{services.length}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <Users className="h-4 w-4" />
                      <span>Trusted by {subscriberCount.toLocaleString()} users worldwide</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Globe className="h-4 w-4" />
                      <span>Monitoring from 12 global locations</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>© 2024 NexaraX</span>
              <span>•</span>
              <a href="#" className="hover:text-gray-900">
                Privacy Policy
              </a>
              <span>•</span>
              <a href="#" className="hover:text-gray-900">
                Terms of Service
              </a>
              <span>•</span>
              <a href="#" className="hover:text-gray-900">
                Support
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Activity className="h-4 w-4" />
              <span>Powered by NexaraX Monitoring</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
