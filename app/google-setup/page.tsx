"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AnalyticsSetup from "@/components/google-setup/analytics-setup"
import SearchConsoleSetup from "@/components/google-setup/search-console-setup"
import { BarChart3, Search } from "lucide-react"

export default function GoogleSetupPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">🚀 Google Marketing Setup</h1>
          <p className="text-xl text-gray-600 mb-2">Set up Google Analytics 4 and Search Console for NexaraX</p>
          <p className="text-gray-500">Complete tracking and SEO optimization in under 30 minutes</p>
        </div>

        <Tabs defaultValue="analytics" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Google Analytics 4
            </TabsTrigger>
            <TabsTrigger value="search-console" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Search Console
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analytics">
            <AnalyticsSetup />
          </TabsContent>

          <TabsContent value="search-console">
            <SearchConsoleSetup />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
