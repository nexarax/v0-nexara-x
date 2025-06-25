"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Activity, AlertTriangle, CheckCircle, Users, Settings, Phone, MessageSquare, Zap, Eye, ArrowUp, MapPin, Moon, Sun, Wifi, WifiOff, Battery, Instagram, Twitter, Youtube, Home, BarChart3, User, Search, Filter, Share2 } from 'lucide-react'

interface MobileAlert {
  id: string
  title: string
  platform: string
  severity: "low" | "medium" | "high" | "critical"
  timestamp: Date
  status: "active" | "acknowledged" | "resolved"
  location?: string
  assignedTo?: string
  description: string
  quickActions: string[]
}

interface TeamMember {
  id: string
  name: string
  role: string
  status: "available" | "busy" | "offline" | "on-call"
  location: string
  avatar: string
  lastSeen: Date
  phoneNumber: string
}

interface AppNotification {
  id: string
  type: "alert" | "system" | "team" | "maintenance"
  title: string
  message: string
  timestamp: Date
  read: boolean
  priority: "low" | "medium" | "high"
  actionRequired: boolean
}

export default function MobileAppPage() {
  const [alerts, setAlerts] = useState<MobileAlert[]>([])
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [notifications, setNotifications] = useState<AppNotification[]>([])
  const [currentUser, setCurrentUser] = useState({
    name: "Alex Chen",
    role: "Senior Developer",
    status: "on-call",
    location: "London, UK",
    avatar: "AC",
  })
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [batteryLevel, setBatteryLevel] = useState(87)
  const [signalStrength, setSignalStrength] = useState(4)
  const [selectedTab, setSelectedTab] = useState("dashboard")
  const [unreadCount, setUnreadCount] = useState(3)

  useEffect(() => {
    initializeMobileApp()

    // Simulate real-time updates
    const interval = setInterval(() => {
      updateRealTimeData()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const initializeMobileApp = () => {
    // Initialize alerts
    const mobileAlerts: MobileAlert[] = [
      {
        id: "alert-mobile-1",
        title: "Instagram API Response Time Spike",
        platform: "Instagram",
        severity: "high",
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        status: "active",
        location: "EU-West-1",
        description: "Response time exceeded 3s threshold. Affecting 1,247 users.",
        quickActions: ["Scale Infrastructure", "Enable Caching", "Contact Team"],
      },
      {
        id: "alert-mobile-2",
        title: "TikTok Authentication Token Expiry",
        platform: "TikTok",
        severity: "critical",
        timestamp: new Date(Date.now() - 8 * 60 * 1000),
        status: "active",
        location: "Global",
        description: "OAuth token expires in 45 minutes. Immediate action required.",
        quickActions: ["Refresh Token", "Escalate", "Call Team"],
      },
      {
        id: "alert-mobile-3",
        title: "YouTube Upload Queue Backlog",
        platform: "YouTube",
        severity: "medium",
        timestamp: new Date(Date.now() - 25 * 60 * 1000),
        status: "acknowledged",
        assignedTo: "Sarah Johnson",
        location: "US-East-1",
        description: "Upload queue has 47 pending videos. Processing slower than normal.",
        quickActions: ["Clear Queue", "Add Workers", "Monitor"],
      },
    ]
    setAlerts(mobileAlerts)

    // Initialize team members
    const team: TeamMember[] = [
      {
        id: "team-1",
        name: "Sarah Johnson",
        role: "DevOps Engineer",
        status: "available",
        location: "New York, US",
        avatar: "SJ",
        lastSeen: new Date(Date.now() - 5 * 60 * 1000),
        phoneNumber: "+1-555-0102",
      },
      {
        id: "team-2",
        name: "Michael Rodriguez",
        role: "Technical Lead",
        status: "busy",
        location: "Madrid, ES",
        avatar: "MR",
        lastSeen: new Date(Date.now() - 2 * 60 * 1000),
        phoneNumber: "+34-555-0201",
      },
      {
        id: "team-3",
        name: "Emma Thompson",
        role: "Engineering Manager",
        status: "offline",
        location: "London, UK",
        avatar: "ET",
        lastSeen: new Date(Date.now() - 45 * 60 * 1000),
        phoneNumber: "+44-555-0301",
      },
      {
        id: "team-4",
        name: "David Kim",
        role: "CTO",
        status: "available",
        location: "Seoul, KR",
        avatar: "DK",
        lastSeen: new Date(Date.now() - 10 * 60 * 1000),
        phoneNumber: "+82-555-0401",
      },
    ]
    setTeamMembers(team)

    // Initialize notifications
    const appNotifications: AppNotification[] = [
      {
        id: "notif-1",
        type: "alert",
        title: "Critical Alert",
        message: "TikTok authentication token expires in 45 minutes",
        timestamp: new Date(Date.now() - 8 * 60 * 1000),
        read: false,
        priority: "high",
        actionRequired: true,
      },
      {
        id: "notif-2",
        type: "team",
        title: "Team Update",
        message: "Sarah Johnson acknowledged YouTube upload issue",
        timestamp: new Date(Date.now() - 20 * 60 * 1000),
        read: false,
        priority: "medium",
        actionRequired: false,
      },
      {
        id: "notif-3",
        type: "system",
        title: "System Update",
        message: "Predictive AI prevented Instagram outage",
        timestamp: new Date(Date.now() - 35 * 60 * 1000),
        read: false,
        priority: "low",
        actionRequired: false,
      },
    ]
    setNotifications(appNotifications)
  }

  const updateRealTimeData = () => {
    // Simulate battery drain
    setBatteryLevel((prev) => Math.max(10, prev - Math.random() * 2))

    // Simulate signal changes
    setSignalStrength(Math.floor(Math.random() * 5))

    // Simulate connectivity
    setIsOnline(Math.random() > 0.1)
  }

  const acknowledgeAlert = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, status: "acknowledged", assignedTo: currentUser.name } : alert,
      ),
    )
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  const escalateAlert = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, severity: alert.severity === "high" ? "critical" : "high" } : alert,
      ),
    )
  }

  const resolveAlert = (alertId: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, status: "resolved" } : alert)))
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  const callTeamMember = (phoneNumber: string) => {
    // Simulate phone call
    alert(`Calling ${phoneNumber}...`)
  }

  const sendQuickMessage = (memberId: string) => {
    // Simulate quick message
    alert("Quick message sent!")
  }

  const markNotificationRead = (notificationId: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === notificationId ? { ...notif, read: true } : notif)))
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
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
      case "available":
      case "resolved":
        return "bg-green-100 text-green-800"
      case "busy":
      case "acknowledged":
        return "bg-yellow-100 text-yellow-800"
      case "offline":
      case "active":
        return "bg-red-100 text-red-800"
      case "on-call":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const platformIcons = {
    Instagram: <Instagram className="h-4 w-4 text-pink-600" />,
    TikTok: (
      <div className="h-4 w-4 bg-black rounded-sm flex items-center justify-center text-white text-xs font-bold">T</div>
    ),
    "Twitter/X": <Twitter className="h-4 w-4 text-blue-500" />,
    YouTube: <Youtube className="h-4 w-4 text-red-600" />,
  }

  const activeAlerts = alerts.filter((a) => a.status === "active").length
  const acknowledgedAlerts = alerts.filter((a) => a.status === "acknowledged").length
  const availableTeam = teamMembers.filter((m) => m.status === "available").length

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      {/* Mobile Status Bar */}
      <div
        className={`flex items-center justify-between px-4 py-2 text-sm ${isDarkMode ? "bg-gray-800" : "bg-white"} border-b`}
      >
        <div className="flex items-center gap-2">
          <span className="font-medium">9:41</span>
          <div className="flex items-center gap-1">
            {Array.from({ length: signalStrength }, (_, i) => (
              <div key={i} className="w-1 h-3 bg-green-500 rounded-full"></div>
            ))}
            {Array.from({ length: 4 - signalStrength }, (_, i) => (
              <div key={i} className="w-1 h-3 bg-gray-300 rounded-full"></div>
            ))}
          </div>
          {isOnline ? <Wifi className="h-4 w-4 text-green-500" /> : <WifiOff className="h-4 w-4 text-red-500" />}
        </div>
        <div className="flex items-center gap-2">
          <span>{batteryLevel}%</span>
          <Battery className={`h-4 w-4 ${batteryLevel > 20 ? "text-green-500" : "text-red-500"}`} />
        </div>
      </div>

      {/* App Header */}
      <div
        className={`flex items-center justify-between px-4 py-4 ${isDarkMode ? "bg-gray-800" : "bg-white"} border-b shadow-sm`}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold">NexaraX Mobile</h1>
            <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              {currentUser.name} • {currentUser.location}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={toggleDarkMode}>
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <div className="relative">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            {unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className={`grid grid-cols-3 gap-4 p-4 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">{activeAlerts}</div>
          <div className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Active Alerts</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{acknowledgedAlerts}</div>
          <div className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Acknowledged</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{availableTeam}</div>
          <div className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Team Available</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 pb-20">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="dashboard" className="text-xs">
              <Home className="h-4 w-4 mr-1" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="alerts" className="text-xs">
              <AlertTriangle className="h-4 w-4 mr-1" />
              Alerts
            </TabsTrigger>
            <TabsTrigger value="team" className="text-xs">
              <Users className="h-4 w-4 mr-1" />
              Team
            </TabsTrigger>
            <TabsTrigger value="notifications" className="text-xs">
              <Bell className="h-4 w-4 mr-1" />
              Notifications
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-4">
            {/* System Status */}
            <Card className={`border-2 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="h-5 w-5 text-green-600" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-xl font-bold text-green-600">99.94%</div>
                    <div className="text-xs text-gray-600">Uptime</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-xl font-bold text-blue-600">1.2s</div>
                    <div className="text-xs text-gray-600">Response</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Alerts */}
            <Card className={`border-2 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    Recent Alerts
                  </span>
                  <Badge className="bg-red-100 text-red-800">{activeAlerts} Active</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {alerts.slice(0, 2).map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-3 rounded-lg border ${isDarkMode ? "border-gray-600 bg-gray-700" : "border-gray-200 bg-gray-50"}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {platformIcons[alert.platform as keyof typeof platformIcons]}
                          <span className="font-medium text-sm">{alert.platform}</span>
                          <Badge className={getSeverityColor(alert.severity)}>
                            {alert.severity.toUpperCase()}
                          </Badge>
                        </div>
                        <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                          {Math.floor((Date.now() - alert.timestamp.getTime()) / (1000 * 60))}m ago
                        </span>
                      </div>
                      <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-2`}>{alert.title}</p>
                      {alert.status === "active" && (
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => acknowledgeAlert(alert.id)} className="text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            ACK
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => escalateAlert(alert.id)}
                            className="text-xs"
                          >
                            <ArrowUp className="h-3 w-3 mr-1" />
                            Escalate
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className={`border-2 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-12 flex-col gap-1">
                    <Eye className="h-4 w-4" />
                    <span className="text-xs">View Status</span>
                  </Button>
                  <Button variant="outline" className="h-12 flex-col gap-1">
                    <Phone className="h-4 w-4" />
                    <span className="text-xs">Call Team</span>
                  </Button>
                  <Button variant="outline" className="h-12 flex-col gap-1">
                    <BarChart3 className="h-4 w-4" />
                    <span className="text-xs">Analytics</span>
                  </Button>
                  <Button variant="outline" className="h-12 flex-col gap-1">
                    <Settings className="h-4 w-4" />
                    <span className="text-xs">Settings</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Alerts Tab */}
          <TabsContent value="alerts" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Active Alerts</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {alerts.map((alert) => (
              <Card
                key={alert.id}
                className={`border-2 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {platformIcons[alert.platform as keyof typeof platformIcons]}
                      <span className="font-medium">{alert.platform}</span>
                      <Badge className={getSeverityColor(alert.severity)}>{alert.severity.toUpperCase()}</Badge>
                      <Badge className={getStatusColor(alert.status)}>{alert.status.toUpperCase()}</Badge>
                    </div>
                    <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                      {Math.floor((Date.now() - alert.timestamp.getTime()) / (1000 * 60))}m ago
                    </span>
                  </div>

                  <h3 className="font-semibold mb-2">{alert.title}</h3>
                  <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"} mb-3`}>
                    {alert.description}
                  </p>

                  {alert.location && (
                    <div className="flex items-center gap-1 mb-3">
                      <MapPin className="h-3 w-3 text-gray-500" />
                      <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                        {alert.location}
                      </span>
                    </div>
                  )}

                  {alert.assignedTo && (
                    <div className="flex items-center gap-1 mb-3">
                      <User className="h-3 w-3 text-blue-500" />
                      <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                        Assigned to {alert.assignedTo}
                      </span>
                    </div>
                  )}

                  {/* Quick Actions */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {alert.quickActions.map((action, index) => (
                      <Button key={index} variant="outline" size="sm" className="text-xs">
                        {action}
                      </Button>
                    ))}
                  </div>

                  {/* Alert Actions */}
                  <div className="flex gap-2">
                    {alert.status === "active" && (
                      <>
                        <Button size="sm" onClick={() => acknowledgeAlert(alert.id)} className="bg-blue-600">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Acknowledge
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => escalateAlert(alert.id)}>
                          <ArrowUp className="h-3 w-3 mr-1" />
                          Escalate
                        </Button>
                      </>
                    )}
                    {alert.status === "acknowledged" && (
                      <Button size="sm" onClick={() => resolveAlert(alert.id)} className="bg-green-600">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Resolve
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      <Share2 className="h-3 w-3 mr-1" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Team Status</h2>
              <Badge className="bg-green-100 text-green-800">{availableTeam} Available</Badge>
            </div>

            {teamMembers.map((member) => (
              <Card
                key={member.id}
                className={`border-2 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {member.avatar}
                      </div>
                      <div>
                        <h3 className="font-semibold">{member.name}</h3>
                        <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{member.role}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3 text-gray-500" />
                          <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                            {member.location}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(member.status)}>{member.status.toUpperCase()}</Badge>
                      <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"} mt-1`}>
                        {Math.floor((Date.now() - member.lastSeen.getTime()) / (1000 * 60))}m ago
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <Button
                      size="sm"
                      onClick={() => callTeamMember(member.phoneNumber)}
                      className="bg-green-600 flex-1"
                    >
                      <Phone className="h-3 w-3 mr-1" />
                      Call
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => sendQuickMessage(member.id)} className="flex-1">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Notifications</h2>
              <Button variant="outline" size="sm">
                Mark All Read
              </Button>
            </div>

            {notifications.map((notification) => (
              <Card
                key={notification.id}
                className={`border-2 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} ${!notification.read ? "border-blue-300" : ""}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {notification.type === "alert" && <AlertTriangle className="h-4 w-4 text-red-500" />}
                        {notification.type === "team" && <Users className="h-4 w-4 text-blue-500" />}
                        {notification.type === "system" && <Activity className="h-4 w-4 text-green-500" />}
                        {notification.type === "maintenance" && <Settings className="h-4 w-4 text-orange-500" />}
                        <span className="font-semibold">{notification.title}</span>
                        {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                      </div>
                      <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"} mb-2`}>
                        {notification.message}
                      </p>
                      <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                        {Math.floor((Date.now() - notification.timestamp.getTime()) / (1000 * 60))}m ago
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge
                        className={
                          notification.priority === "high"
                            ? "bg-red-100 text-red-800"
                            : notification.priority === "medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                        }
                      >
                        {notification.priority.toUpperCase()}
                      </Badge>
                      {!notification.read && (
                        <Button size="sm" variant="outline" onClick={() => markNotificationRead(notification.id)}>
                          <Eye className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                  {notification.actionRequired && (
                    <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded">
                      <span className="text-sm text-red-800 font-medium">Action Required</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom Navigation */}
      <div className={`fixed bottom-0 left-0 right-0 ${isDarkMode ? "bg-gray-800" : "bg-white"} border-t px-4 py-2`}>
        <div className="flex items-center justify-around">
          <Button
            variant={selectedTab === "dashboard" ? "default" : "ghost"}
            size="sm"
            onClick={() => setSelectedTab("dashboard")}
            className="flex-col gap-1 h-12"
          >
            <Home className="h-4 w-4" />
            <span className="text-xs">Home</span>
          </Button>
          <Button
            variant={selectedTab === "alerts" ? "default" : "ghost"}
            size="sm"
            onClick={() => setSelectedTab("alerts")}
            className="flex-col gap-1 h-12 relative"
          >
            <AlertTriangle className="h-4 w-4" />
            <span className="text-xs">Alerts</span>
            {activeAlerts > 0 && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {activeAlerts}
              </div>
            )}
          </Button>
          <Button
            variant={selectedTab === "team" ? "default" : "ghost"}
            size="sm"
            onClick={() => setSelectedTab("team")}
            className="flex-col gap-1 h-12"
          >
            <Users className="h-4 w-4" />
            <span className="text-xs">Team</span>
          </Button>
          <Button
            variant={selectedTab === "notifications" ? "default" : "ghost"}
            size="sm"
            onClick={() => setSelectedTab("notifications")}
            className="flex-col gap-1 h-12 relative"
          >
            <Bell className="h-4 w-4" />
            <span className="text-xs">Notifications</span>
            {unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount}
              </div>
            )}
          </Button>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-20 right-4">
        <Button className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 shadow-lg">
          <Phone className="h-6 w-6 text-white" />
        </Button>
      </div>
    </div>
  )
}
