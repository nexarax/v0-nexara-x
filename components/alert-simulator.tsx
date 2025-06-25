"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, RotateCcw, Settings } from "lucide-react"

interface AlertSimulatorProps {
  platform: string
  onSimulationComplete: (results: any) => void
}

export function AlertSimulator({ platform, onSimulationComplete }: AlertSimulatorProps) {
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)

  const runSimulation = async () => {
    setIsRunning(true)
    setProgress(0)

    // Simulate alert testing
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i)
      await new Promise((resolve) => setTimeout(resolve, 200))
    }

    const results = {
      platform,
      alertsGenerated: Math.floor(Math.random() * 5) + 1,
      notificationsSent: Math.floor(Math.random() * 10) + 5,
      escalations: Math.floor(Math.random() * 3),
      success: Math.random() > 0.2, // 80% success rate
    }

    onSimulationComplete(results)
    setIsRunning(false)
    setProgress(0)
  }

  return (
    <Card className="border-2 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-blue-600" />
          {platform} Alert Simulator
        </CardTitle>
        <CardDescription>Test alert thresholds and notification delivery</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isRunning && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Running simulation...</span>
              <span className="text-sm font-semibold">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button onClick={runSimulation} disabled={isRunning} className="bg-blue-600 hover:bg-blue-700">
            <Play className="h-4 w-4 mr-2" />
            {isRunning ? "Running..." : "Start Simulation"}
          </Button>
          <Button variant="outline" disabled={isRunning}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
