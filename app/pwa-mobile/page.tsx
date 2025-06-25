"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bell,
  Users,
  AlertTriangle,
  CheckCircle,
  Phone,
  MessageSquare,
  Download,
  Wifi,
  WifiOff,
  Battery,
  Signal,
  Home,
  Zap,
  Shield,
  Smartphone,
} from "lucide-react"

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export default function PWAMobileApp() {
  const [isOnline, setIsOnline] = useState(true)
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [notifications, setNotifications] = useState("default")
  const [currentTime, setCurrentTime] = useState(new Date())

  // PWA Installation Logic
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setInstallPrompt(e as BeforeInstallPromptEvent)
    }

    const handleAppInstalled = () => {
      setIsInstalled(true)
      setInstallPrompt(null)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    window.addEventListener("appinstalled", handleAppInstalled)

    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true)
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("appinstalled", handleAppInstalled)
    }
  }, [])

  // Online/Offline Detection
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)
    setIsOnline(navigator.onLine)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  // Real-time clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Request Notification Permission
  const requestNotificationPermission = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission()
      setNotifications(permission)

      if (permission === "granted") {
        new Notification("NexaraX PWA", {
          body: "Push notifications enabled! You'll receive real-time alerts.",
          icon: "/placeholder.svg?height=64&width=64&text=NX",
          badge: "/placeholder.svg?height=32&width=32&text=!",
          tag: "welcome",
        })
      }
    }
  }

  // Install PWA
  const handleInstallClick = async () => {
    if (installPrompt) {
      installPrompt.prompt()
      const { outcome } = await installPrompt.userChoice
      if (outcome === "accepted") {
        setInstallPrompt(null)
      }
    }
  }

  // Mock data
  const alerts = [
    {
      id: 1,
      platform: "Instagram",
      severity: "critical",
      message: "API rate limit exceeded",
      time: "2 min ago",
      status: "active",
    },
    {
      id: 2,
      platform: "TikTok",
      severity: "high",
      message: "Upload failures detected",
      time: "5 min ago",
      status: "active",
    },
    {
      id: 3,
      platform: "YouTube",
      severity: "medium",
      message: "Slow response times",
      time: "12 min ago",
      status: "acknowledged",
    },
  ]

  const team = [
    { id: 1, name: "Sarah Chen", role: "DevOps Lead", status: "available", phone: "+1-555-0123" },
    { id: 2, name: "Mike Rodriguez", role: "SRE", status: "busy", phone: "+1-555-0124" },
    { id: 3, name: "Emma Thompson", role: "Platform Engineer", status: "available", phone: "+1-555-0125" },
    { id: 4, name: "David Kim", role: "Security Engineer", status: "offline", phone: "+1-555-0126" },
  ]

  const recentNotifications = [
    { id: 1, type: "alert", message: "Instagram API alert acknowledged by Sarah", time: "3 min ago", read: false },
    { id: 2, type: "team", message: "Mike Rodriguez is now on-call", time: "15 min ago", read: false },
    { id: 3, type: "system", message: "Weekly maintenance scheduled for Sunday", time: "1 hour ago", read: true },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Mobile Status Bar */}
      <div className="bg-black text-white px-4 py-1 flex justify-between items-center text-sm">
        <div className="flex items-center gap-1">
          <Signal className="h-3 w-3" />
          <Wifi className={`h-3 w-3 ${isOnline ? "text-green-400" : "text-red-400"}`} />
          <span className="text-xs">{isOnline ? "Online" : "Offline"}</span>
        </div>
        <div className="font-mono">{currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
        <div className="flex items-center gap-1">
          <Battery className="h-3 w-3" />
          <span className="text-xs">87%</span>
        </div>
      </div>

      {/* PWA Install Banner */}
      {installPrompt && !isInstalled && (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            <span className="text-sm font-medium">Install NexaraX App</span>
          </div>
          <Button size="sm" variant="secondary" onClick={handleInstallClick}>
            <Download className="h-4 w-4 mr-1" />
            Install
          </Button>
        </div>
      )}

      {/* Offline Banner */}
      {!isOnline && (
        <div className="bg-orange-600 text-white p-2 text-center text-sm flex items-center justify-center gap-2">
          <WifiOff className="h-4 w-4" />
          You're offline. Some features may be limited.
        </div>
      )}

      <div className="p-4 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">NexaraX Mobile</h1>
            <p className="text-gray-300 text-sm">On-the-go monitoring & alerts</p>
          </div>
          <div className="flex gap-2">
            {notifications !== "granted" && (
              <Button size="sm" onClick={requestNotificationPermission} className="bg-blue-600 hover:bg-blue-700">
                <Bell className="h-4 w-4 mr-1" />
                Enable Alerts
              </Button>
            )}
            <div className="relative">
              <Bell className="h-6 w-6 text-white" />
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-xs flex items-center justify-center p-0">
                3
              </Badge>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="bg-red-500/20 border-red-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-200 text-sm">Critical Alerts</p>
                  <p className="text-2xl font-bold text-red-400">2</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-500/20 border-green-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-200 text-sm">Team Available</p>
                  <p className="text-2xl font-bold text-green-400">2/4</p>
                </div>
                <Users className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="home" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
            <TabsTrigger value="home" className="data-[state=active]:bg-blue-600">
              <Home className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="alerts" className="data-[state=active]:bg-red-600">
              <AlertTriangle className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="team" className="data-[state=active]:bg-green-600">
              <Users className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-purple-600">
              <Bell className="h-4 w-4" />
            </TabsTrigger>
          </TabsList>

          {/* Home Tab */}
          <TabsContent value="home" className="space-y-4">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-400" />
                  System Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-400">99.8%</p>
                    <p className="text-gray-400 text-sm">Uptime</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-400">47ms</p>
                    <p className="text-gray-400 text-sm">Response</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Instagram API</span>
                    <Badge className="bg-red-500">Critical</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">TikTok Upload</span>
                    <Badge className="bg-yellow-500">Warning</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">YouTube Analytics</span>
                    <Badge className="bg-green-500">Healthy</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* PWA Features Card */}
            <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-400" />
                  PWA Features Active
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Offline Mode</span>
                  <Badge className={isOnline ? "bg-green-500" : "bg-orange-500"}>
                    {isOnline ? "Online" : "Offline"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Push Notifications</span>
                  <Badge className={notifications === "granted" ? "bg-green-500" : "bg-gray-500"}>
                    {notifications === "granted" ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">App Installed</span>
                  <Badge className={isInstalled ? "bg-green-500" : "bg-gray-500"}>{isInstalled ? "Yes" : "No"}</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Alerts Tab */}
          <TabsContent value="alerts" className="space-y-4">
            {alerts.map((alert) => (
              <Card key={alert.id} className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge
                        className={
                          alert.severity === "critical"
                            ? "bg-red-500"
                            : alert.severity === "high"
                              ? "bg-orange-500"
                              : "bg-yellow-500"
                        }
                      >
                        {alert.severity}
                      </Badge>
                      <span className="text-white font-medium">{alert.platform}</span>
                    </div>
                    <span className="text-gray-400 text-xs">{alert.time}</span>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">{alert.message}</p>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 flex-1">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Acknowledge
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Escalate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="space-y-4">
            {team.map((member) => (
              <Card key={member.id} className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-white font-medium">{member.name}</h3>
                      <p className="text-gray-400 text-sm">{member.role}</p>
                    </div>
                    <Badge
                      className={
                        member.status === "available"
                          ? "bg-green-500"
                          : member.status === "busy"
                            ? "bg-yellow-500"
                            : "bg-gray-500"
                      }
                    >
                      {member.status}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 flex-1">
                      <Phone className="h-4 w-4 mr-1" />
                      Call
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-4">
            {recentNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`bg-slate-800/50 border-slate-700 ${!notification.read ? "border-l-4 border-l-blue-500" : ""}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <Badge
                      className={
                        notification.type === "alert"
                          ? "bg-red-500"
                          : notification.type === "team"
                            ? "bg-green-500"
                            : "bg-blue-500"
                      }
                    >
                      {notification.type}
                    </Badge>
                    <span className="text-gray-400 text-xs">{notification.time}</span>
                  </div>
                  <p className="text-gray-300 text-sm">{notification.message}</p>
                  {!notification.read && (
                    <div className="mt-2">
                      <Button size="sm" variant="outline" className="text-xs">
                        Mark as Read
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Emergency FAB */}
      <div className="fixed bottom-6 right-6">
        <Button
          size="lg"
          className="rounded-full h-14 w-14 bg-red-600 hover:bg-red-700 shadow-lg"
          onClick={() => {
            if (notifications === "granted") {
              new Notification("Emergency Alert Sent", {
                body: "All team members have been notified of the emergency.",
                icon: "/placeholder.svg?height=64&width=64&text=🚨",
                tag: "emergency",
              })
            }
          }}
        >
          <AlertTriangle className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
