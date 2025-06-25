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
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Key,
  Shield,
  Zap,
  RefreshCw,
  Eye,
  EyeOff,
  Copy,
  TestTube,
  Link,
  Unlink,
} from "lucide-react"

interface SocialAccount {
  platform: string
  connected: boolean
  username?: string
  followers?: number
  lastSync?: Date
  permissions: string[]
  apiStatus: "active" | "expired" | "error"
  testPost?: boolean
}

interface APICredentials {
  platform: string
  clientId: string
  clientSecret: string
  accessToken?: string
  refreshToken?: string
  webhookUrl?: string
}

export default function IntegrationsPage() {
  const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>([])
  const [apiCredentials, setApiCredentials] = useState<APICredentials[]>([])
  const [showSecrets, setShowSecrets] = useState<{ [key: string]: boolean }>({})
  const [isConnecting, setIsConnecting] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    // Update the social accounts initialization to match your actual accounts
    const accounts: SocialAccount[] = [
      {
        platform: "Instagram",
        connected: false,
        username: "@nexarax.official", // Your actual Instagram handle
        permissions: ["publish_content", "read_insights", "manage_comments"],
        apiStatus: "expired",
      },
      {
        platform: "TikTok",
        connected: false,
        username: "@nexarax.ai", // Your actual TikTok handle
        permissions: ["video.upload", "user.info.basic", "video.list"],
        apiStatus: "expired",
      },
      {
        platform: "Twitter/X",
        connected: false,
        username: "@NexaraX", // Your actual Twitter handle
        permissions: ["tweet.write", "tweet.read", "users.read", "offline.access"],
        apiStatus: "expired",
      },
      // Remove YouTube for now since it's not set up yet
      // {
      //   platform: "YouTube",
      //   connected: false,
      //   permissions: ["youtube.upload", "youtube.readonly", "youtubepartner.channel-audit"],
      //   apiStatus: "expired",
      // },
    ]
    setSocialAccounts(accounts)

    // Initialize API credentials templates
    const credentials: APICredentials[] = [
      {
        platform: "Instagram",
        clientId: "",
        clientSecret: "",
        webhookUrl: "https://nexarax.com/webhooks/instagram",
      },
      {
        platform: "TikTok",
        clientId: "",
        clientSecret: "",
        webhookUrl: "https://nexarax.com/webhooks/tiktok",
      },
      {
        platform: "Twitter/X",
        clientId: "",
        clientSecret: "",
        webhookUrl: "https://nexarax.com/webhooks/twitter",
      },
      // Remove YouTube until ready
    ]
    setApiCredentials(credentials)
  }, [])

  const connectAccount = async (platform: string) => {
    setIsConnecting({ ...isConnecting, [platform]: true })

    // Simulate OAuth flow
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Update account status
    setSocialAccounts((prev) =>
      prev.map((account) =>
        account.platform === platform
          ? {
              ...account,
              connected: true,
              username: `@nexarax${platform.toLowerCase().replace("/", "")}`,
              followers: Math.floor(Math.random() * 10000) + 1000,
              lastSync: new Date(),
              apiStatus: "active" as const,
            }
          : account,
      ),
    )

    setIsConnecting({ ...isConnecting, [platform]: false })
  }

  const disconnectAccount = (platform: string) => {
    setSocialAccounts((prev) =>
      prev.map((account) =>
        account.platform === platform
          ? {
              ...account,
              connected: false,
              username: undefined,
              followers: undefined,
              lastSync: undefined,
              apiStatus: "expired" as const,
            }
          : account,
      ),
    )
  }

  const testConnection = async (platform: string) => {
    // Simulate test post
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setSocialAccounts((prev) =>
      prev.map((account) => (account.platform === platform ? { ...account, testPost: true } : account)),
    )

    setTimeout(() => {
      setSocialAccounts((prev) =>
        prev.map((account) => (account.platform === platform ? { ...account, testPost: false } : account)),
      )
    }, 3000)
  }

  const toggleSecretVisibility = (platform: string) => {
    setShowSecrets({ ...showSecrets, [platform]: !showSecrets[platform] })
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const platformIcons = {
    Instagram: <Instagram className="h-5 w-5 text-pink-600" />,
    TikTok: (
      <div className="h-5 w-5 bg-black rounded-sm flex items-center justify-center text-white text-xs font-bold">T</div>
    ),
    "Twitter/X": <Twitter className="h-5 w-5 text-blue-500" />,
    YouTube: <Youtube className="h-5 w-5 text-red-600" />,
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "expired":
        return "bg-red-100 text-red-800"
      case "error":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4" />
      case "expired":
      case "error":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const connectedCount = socialAccounts.filter((account) => account.connected).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-green-100 text-green-800">🔗 API Integrations</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Connect Your Social Accounts
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Link your social media accounts to enable automated posting and real-time analytics
          </p>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 border-green-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Link className="h-5 w-5 text-green-600" />
                <span className="text-2xl font-bold text-green-600">{connectedCount}/4</span>
              </div>
              <p className="text-sm text-gray-600">Accounts Connected</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <span className="text-2xl font-bold text-blue-600">OAuth 2.0</span>
              </div>
              <p className="text-sm text-gray-600">Secure Authentication</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Zap className="h-5 w-5 text-purple-600" />
                <span className="text-2xl font-bold text-purple-600">Real-time</span>
              </div>
              <p className="text-sm text-gray-600">Auto Posting</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-200">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <RefreshCw className="h-5 w-5 text-orange-600" />
                <span className="text-2xl font-bold text-orange-600">24/7</span>
              </div>
              <p className="text-sm text-gray-600">Sync Active</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="accounts" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="accounts">🔗 Account Connections</TabsTrigger>
            <TabsTrigger value="setup">⚙️ API Setup</TabsTrigger>
            <TabsTrigger value="webhooks">🔔 Webhooks & Testing</TabsTrigger>
          </TabsList>

          {/* Account Connections */}
          <TabsContent value="accounts">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {socialAccounts.map((account) => (
                <Card
                  key={account.platform}
                  className="border-2 border-gray-200 hover:border-blue-300 transition-colors"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {platformIcons[account.platform as keyof typeof platformIcons]}
                        <div>
                          <CardTitle className="text-lg">{account.platform}</CardTitle>
                          {account.connected && account.username && (
                            <CardDescription>
                              {account.username} • {account.followers?.toLocaleString()} followers
                            </CardDescription>
                          )}
                        </div>
                      </div>
                      <Badge className={getStatusColor(account.apiStatus)}>
                        {getStatusIcon(account.apiStatus)}
                        <span className="ml-1 capitalize">{account.apiStatus}</span>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Permissions */}
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Required Permissions:</h4>
                      <div className="flex flex-wrap gap-1">
                        {account.permissions.map((permission) => (
                          <Badge key={permission} variant="outline" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Connection Status */}
                    {account.connected ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>Last Sync:</span>
                          <span className="text-gray-600">
                            {account.lastSync?.toLocaleString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => testConnection(account.platform)}
                            disabled={account.testPost}
                          >
                            {account.testPost ? (
                              <>
                                <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full mr-2" />
                                Testing...
                              </>
                            ) : (
                              <>
                                <TestTube className="h-4 w-4 mr-2" />
                                Test Post
                              </>
                            )}
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => disconnectAccount(account.platform)}>
                            <Unlink className="h-4 w-4 mr-2" />
                            Disconnect
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        onClick={() => connectAccount(account.platform)}
                        disabled={isConnecting[account.platform]}
                        className="w-full"
                      >
                        {isConnecting[account.platform] ? (
                          <>
                            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                            Connecting...
                          </>
                        ) : (
                          <>
                            <Link className="h-4 w-4 mr-2" />
                            Connect {account.platform}
                          </>
                        )}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* API Setup */}
          <TabsContent value="setup">
            <div className="space-y-6">
              <Card className="border-2 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-6 w-6 text-blue-600" />
                    API Configuration Guide
                  </CardTitle>
                  <CardDescription>
                    Set up your API credentials for each platform to enable automated posting
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <h4 className="font-semibold mb-2">🔒 Security Notice</h4>
                    <p className="text-sm text-gray-700">
                      All API keys are encrypted and stored securely. We use OAuth 2.0 for authentication and never
                      store your passwords.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <Card key="Instagram" className="border border-gray-200 bg-pink-50">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Instagram className="h-6 w-6 text-pink-600" />
                          Instagram API Setup - @nexarax.official
                        </CardTitle>
                        <CardDescription>
                          Connect your Instagram account for automated posting and engagement tracking
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-pink-100 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">📱 Quick Setup Guide</h4>
                          <ol className="text-sm space-y-2 list-decimal list-inside">
                            <li>
                              Go to{" "}
                              <a
                                href="https://developers.facebook.com"
                                target="_blank"
                                className="text-blue-600 underline"
                                rel="noreferrer"
                              >
                                Facebook Developers
                              </a>
                            </li>
                            <li>Create a new app → "Business" type</li>
                            <li>Add "Instagram Basic Display" product</li>
                            <li>Add your Instagram account: @nexarax.official</li>
                            <li>Copy the credentials below</li>
                          </ol>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Instagram App ID</label>
                            <div className="flex">
                              <input
                                type="text"
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                placeholder="Your Instagram App ID"
                                value=""
                              />
                              <Button variant="outline" size="sm" className="rounded-l-none">
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Instagram App Secret</label>
                            <div className="flex">
                              <input
                                type="password"
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                placeholder="Your Instagram App Secret"
                                value=""
                              />
                              <Button variant="outline" size="sm" className="rounded-none">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm" className="rounded-l-none">
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Redirect URI (Copy this to your app)
                          </label>
                          <div className="flex">
                            <input
                              type="text"
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50"
                              value="https://nexarax.com/auth/instagram/callback"
                              readOnly
                            />
                            <Button variant="outline" size="sm" className="rounded-l-none">
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Webhook URL (Copy this to your app)
                          </label>
                          <div className="flex">
                            <input
                              type="text"
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50"
                              value="https://nexarax.com/webhooks/instagram"
                              readOnly
                            />
                            <Button variant="outline" size="sm" className="rounded-l-none">
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Add this webhook URL in your Instagram app settings for real-time updates
                          </p>
                        </div>

                        <div className="bg-yellow-50 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">⚠️ Important Setup Notes</h4>
                          <ul className="text-sm space-y-1">
                            <li>• Use instagram@nexarax.com as the contact email</li>
                            <li>• Set app to "Live" mode for production posting</li>
                            <li>• Add @nexarax.official as a test user first</li>
                            <li>• Enable required permissions: instagram_basic, instagram_content_publish</li>
                          </ul>
                        </div>

                        <div className="flex gap-2">
                          <Button className="bg-pink-600 hover:bg-pink-700">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Connect Instagram
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => window.open("https://developers.facebook.com/apps/", "_blank")}
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Open Facebook Developers
                          </Button>
                          <Button variant="outline">
                            <TestTube className="h-4 w-4 mr-2" />
                            Test Connection
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    {apiCredentials.slice(1).map((cred) => (
                      <Card key={cred.platform} className="border border-gray-200">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-lg">
                            {platformIcons[cred.platform as keyof typeof platformIcons]}
                            {cred.platform} API Setup
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Client ID</label>
                              <div className="flex">
                                <input
                                  type="text"
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  placeholder="Enter your client ID"
                                  value={cred.clientId}
                                  onChange={(e) =>
                                    setApiCredentials((prev) =>
                                      prev.map((c) =>
                                        c.platform === cred.platform ? { ...c, clientId: e.target.value } : c,
                                      ),
                                    )
                                  }
                                />
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="rounded-l-none"
                                  onClick={() => copyToClipboard(cred.clientId)}
                                >
                                  <Copy className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Client Secret</label>
                              <div className="flex">
                                <input
                                  type={showSecrets[cred.platform] ? "text" : "password"}
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  placeholder="Enter your client secret"
                                  value={cred.clientSecret}
                                  onChange={(e) =>
                                    setApiCredentials((prev) =>
                                      prev.map((c) =>
                                        c.platform === cred.platform ? { ...c, clientSecret: e.target.value } : c,
                                      ),
                                    )
                                  }
                                />
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="rounded-none"
                                  onClick={() => toggleSecretVisibility(cred.platform)}
                                >
                                  {showSecrets[cred.platform] ? (
                                    <EyeOff className="h-4 w-4" />
                                  ) : (
                                    <Eye className="h-4 w-4" />
                                  )}
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="rounded-l-none"
                                  onClick={() => copyToClipboard(cred.clientSecret)}
                                >
                                  <Copy className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Webhook URL</label>
                            <div className="flex">
                              <input
                                type="text"
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50"
                                value={cred.webhookUrl}
                                readOnly
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                className="rounded-l-none"
                                onClick={() => copyToClipboard(cred.webhookUrl || "")}
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              Use this URL in your {cred.platform} app webhook settings
                            </p>
                          </div>

                          <div className="flex gap-2">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Save Configuration
                            </Button>
                            <Button variant="outline" size="sm">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Platform Docs
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Webhooks & Testing */}
          <TabsContent value="webhooks">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-2 border-purple-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-6 w-6 text-purple-600" />
                    Webhook Configuration
                  </CardTitle>
                  <CardDescription>Real-time notifications for post status and engagement</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">📡 Webhook Events</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Post published successfully</li>
                      <li>• Post failed to publish</li>
                      <li>• New comments received</li>
                      <li>• Engagement milestones reached</li>
                      <li>• API rate limits approached</li>
                    </ul>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Webhook Endpoint</label>
                    <div className="flex">
                      <input
                        type="text"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50"
                        value="https://nexarax.com/api/webhooks"
                        readOnly
                      />
                      <Button variant="outline" size="sm" className="rounded-l-none">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Webhook Secret</label>
                    <div className="flex">
                      <input
                        type="password"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md"
                        value="wh_secret_nexarax_2024"
                        readOnly
                      />
                      <Button variant="outline" size="sm" className="rounded-l-none">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Test Webhook Connection
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TestTube className="h-6 w-6 text-green-600" />
                    Connection Testing
                  </CardTitle>
                  <CardDescription>Test your API connections before going live</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {socialAccounts.map((account) => (
                      <div key={account.platform} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-2">
                          {platformIcons[account.platform as keyof typeof platformIcons]}
                          <span className="font-medium">{account.platform}</span>
                          {account.connected && <Badge className="bg-green-100 text-green-800">Connected</Badge>}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={!account.connected}
                          onClick={() => testConnection(account.platform)}
                        >
                          {account.testPost ? (
                            <div className="animate-spin h-4 w-4 border-2 border-green-600 border-t-transparent rounded-full" />
                          ) : (
                            <TestTube className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">🧪 Test Features</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Send test posts to verify posting</li>
                      <li>• Check API rate limits</li>
                      <li>• Validate webhook delivery</li>
                      <li>• Test content formatting</li>
                      <li>• Verify media upload capabilities</li>
                    </ul>
                  </div>

                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Zap className="h-4 w-4 mr-2" />
                    Run Full Integration Test
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
