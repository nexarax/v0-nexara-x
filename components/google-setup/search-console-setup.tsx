"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, ExternalLink, Search, FileText, Globe } from "lucide-react"
import { searchConsoleConfig, generateSitemap } from "@/lib/search-console"

export default function SearchConsoleSetup() {
  const [setupSteps, setSetupSteps] = useState([
    { id: 1, title: "Verify Domain Ownership", completed: false, url: "https://search.google.com/search-console" },
    { id: 2, title: "Submit Sitemap", completed: false, description: "Upload /sitemap.xml" },
    { id: 3, title: "Set Up URL Inspection", completed: false, description: "Test key pages" },
    { id: 4, title: "Configure Search Analytics", completed: false, description: "Monitor keyword performance" },
    { id: 5, title: "Set Up Alerts", completed: false, description: "Get notified of issues" },
    { id: 6, title: "Submit Key Pages", completed: false, description: "Request indexing" },
  ])

  const toggleStep = (stepId: number) => {
    setSetupSteps((steps) => steps.map((step) => (step.id === stepId ? { ...step, completed: !step.completed } : step)))
  }

  const completedSteps = setupSteps.filter((step) => step.completed).length
  const progressPercentage = (completedSteps / setupSteps.length) * 100

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">🔍 Google Search Console Setup</h1>
        <p className="text-gray-600">Optimize NexaraX for search engine visibility</p>
        <div className="mt-4">
          <div className="bg-green-100 rounded-full h-3 w-full max-w-md mx-auto">
            <div
              className="bg-green-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {completedSteps} of {setupSteps.length} steps completed
          </p>
        </div>
      </div>

      {/* Setup Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Setup Checklist
          </CardTitle>
          <CardDescription>Configure Google Search Console for NexaraX SEO tracking</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {setupSteps.map((step) => (
            <div key={step.id} className="flex items-start gap-3 p-3 border rounded-lg">
              <button onClick={() => toggleStep(step.id)} className="mt-1">
                {step.completed ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <Circle className="h-5 w-5 text-gray-400" />
                )}
              </button>
              <div className="flex-1">
                <h3 className={`font-medium ${step.completed ? "text-green-700 line-through" : ""}`}>{step.title}</h3>
                {step.description && <p className="text-sm text-gray-600 mt-1">{step.description}</p>}
                {step.url && (
                  <a
                    href={step.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-600 text-sm mt-2 hover:underline"
                  >
                    Open Search Console <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Target Keywords */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Target Keywords
          </CardTitle>
          <CardDescription>High-value keywords for NexaraX to rank for</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {searchConsoleConfig.targetKeywords.map((keyword, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{keyword.keyword}</h4>
                  <Badge variant={keyword.priority === "High" ? "default" : "secondary"}>{keyword.priority}</Badge>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Monthly Volume: {keyword.volume.toLocaleString()}</p>
                  <p>Difficulty: {keyword.difficulty}</p>
                  <p>Intent: {keyword.intent}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* SEO Pages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            SEO-Optimized Pages
          </CardTitle>
          <CardDescription>Key pages optimized for search rankings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(searchConsoleConfig.pages).map(([key, page]) => (
              <div key={key} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{page.title}</h4>
                  <Badge variant="outline">{page.url}</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{page.description}</p>
                <div className="text-xs text-gray-500">
                  <p>
                    <strong>Target:</strong> {page.targetKeyword}
                  </p>
                  <p>
                    <strong>Keywords:</strong> {page.keywords}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Content Strategy */}
      <Card>
        <CardHeader>
          <CardTitle>📝 SEO Content Strategy</CardTitle>
          <CardDescription>Blog posts and guides to drive organic traffic</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {searchConsoleConfig.contentStrategy.map((content, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{content.title}</h4>
                  <Badge variant={content.priority === "High" ? "default" : "secondary"}>{content.priority}</Badge>
                </div>
                <div className="text-sm text-gray-600 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="font-medium">Type</p>
                    <p>{content.contentType}</p>
                  </div>
                  <div>
                    <p className="font-medium">Words</p>
                    <p>{content.wordCount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="font-medium">Keyword</p>
                    <p>{content.targetKeyword}</p>
                  </div>
                  <div>
                    <p className="font-medium">Traffic</p>
                    <p>{content.expectedTraffic.toLocaleString()}/month</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sitemap Generator */}
      <Card>
        <CardHeader>
          <CardTitle>🗺️ Sitemap Configuration</CardTitle>
          <CardDescription>Generated sitemap for search engine crawling</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-lg">
            <pre className="text-sm overflow-x-auto">{JSON.stringify(generateSitemap(), null, 2)}</pre>
          </div>
          <div className="mt-4 flex gap-2">
            <Button variant="outline" size="sm">
              Download sitemap.xml
            </Button>
            <Button variant="outline" size="sm">
              Generate robots.txt
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <Button className="bg-green-600 hover:bg-green-700">
          <ExternalLink className="h-4 w-4 mr-2" />
          Open Search Console
        </Button>
        <Button variant="outline">Verify Domain Ownership</Button>
      </div>

      {/* Success Message */}
      {completedSteps === setupSteps.length && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-green-800 mb-2">Search Console Setup Complete! 🎉</h3>
            <p className="text-green-700 mb-4">NexaraX is now optimized for search engine visibility and tracking.</p>
            <div className="space-y-2 text-sm text-green-600">
              <p>✅ Domain verified and sitemap submitted</p>
              <p>✅ Tracking 6 high-value keywords</p>
              <p>✅ 4 SEO-optimized pages configured</p>
              <p>✅ Content strategy planned for 20K+ monthly traffic</p>
            </div>
            <Button className="bg-green-600 hover:bg-green-700 mt-4">Next: Set Up Google Ads →</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
