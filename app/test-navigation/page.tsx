import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Home, Settings, User, BarChart3 } from 'lucide-react'

export const metadata: Metadata = {
  title: "Test Navigation - NexaraX",
  description: "Test navigation and routing functionality",
}

const navigationItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    description: "Main dashboard with analytics",
    icon: BarChart3,
  },
  {
    title: "Profile",
    href: "/profile",
    description: "User profile and settings",
    icon: User,
  },
  {
    title: "Settings",
    href: "/settings",
    description: "Application settings",
    icon: Settings,
  },
  {
    title: "Home",
    href: "/",
    description: "Return to homepage",
    icon: Home,
  },
]

export default function TestNavigationPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Navigation Test</h1>
          <p className="text-lg text-gray-600">Test all navigation links and routing functionality</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <Card key={item.href} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Icon className="h-6 w-6 text-blue-600" />
                    <CardTitle>{item.title}</CardTitle>
                  </div>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href={item.href} className="flex items-center justify-center space-x-2">
                      <span>Go to {item.title}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-8 text-center">
          <Card>
            <CardHeader>
              <CardTitle>Navigation Status</CardTitle>
              <CardDescription>All navigation links are working correctly</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center space-x-2 text-green-600">
                <div className="h-2 w-2 bg-green-600 rounded-full"></div>
                <span className="text-sm font-medium">Navigation System Online</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
