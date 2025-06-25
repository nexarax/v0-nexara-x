"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, BarChart3, Activity } from "lucide-react"

interface DataPoint {
  timestamp: Date
  value: number
  label?: string
}

interface RealTimeChartProps {
  title: string
  type: "line" | "bar" | "area"
  dataPoints: DataPoint[]
  color?: string
  unit?: string
  maxPoints?: number
}

export function RealTimeChart({
  title,
  type = "line",
  dataPoints,
  color = "blue",
  unit = "",
  maxPoints = 20,
}: RealTimeChartProps) {
  const [chartData, setChartData] = useState<DataPoint[]>(dataPoints)

  useEffect(() => {
    setChartData(dataPoints.slice(-maxPoints))
  }, [dataPoints, maxPoints])

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "stroke-blue-500 fill-blue-100 border-blue-200",
      green: "stroke-green-500 fill-green-100 border-green-200",
      red: "stroke-red-500 fill-red-100 border-red-200",
      yellow: "stroke-yellow-500 fill-yellow-100 border-yellow-200",
      purple: "stroke-purple-500 fill-purple-100 border-purple-200",
      orange: "stroke-orange-500 fill-orange-100 border-orange-200",
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  const maxValue = Math.max(...chartData.map((d) => d.value))
  const minValue = Math.min(...chartData.map((d) => d.value))
  const range = maxValue - minValue || 1

  const getChartIcon = () => {
    switch (type) {
      case "line":
        return <LineChart className="h-5 w-5" />
      case "bar":
        return <BarChart3 className="h-5 w-5" />
      case "area":
        return <Activity className="h-5 w-5" />
      default:
        return <LineChart className="h-5 w-5" />
    }
  }

  return (
    <Card className={`border-2 ${getColorClasses(color).split(" ")[2]}`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          {getChartIcon()}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-32 w-full relative">
          <svg className="w-full h-full" viewBox="0 0 400 120" preserveAspectRatio="none">
            {type === "line" && (
              <polyline
                points={chartData
                  .map((point, index) => {
                    const x = (index / (chartData.length - 1)) * 380 + 10
                    const y = 110 - ((point.value - minValue) / range) * 100
                    return `${x},${y}`
                  })
                  .join(" ")}
                className={`${getColorClasses(color).split(" ")[0]} stroke-2 fill-none`}
              />
            )}

            {type === "area" && (
              <polygon
                points={[
                  "10,110",
                  ...chartData.map((point, index) => {
                    const x = (index / (chartData.length - 1)) * 380 + 10
                    const y = 110 - ((point.value - minValue) / range) * 100
                    return `${x},${y}`
                  }),
                  "390,110",
                ].join(" ")}
                className={`${getColorClasses(color).split(" ")[1]} ${getColorClasses(color).split(" ")[0]} stroke-2`}
              />
            )}

            {type === "bar" &&
              chartData.map((point, index) => {
                const x = (index / chartData.length) * 380 + 10
                const height = ((point.value - minValue) / range) * 100
                const y = 110 - height
                const width = 380 / chartData.length - 2

                return (
                  <rect
                    key={index}
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    className={getColorClasses(color).split(" ")[1]}
                  />
                )
              })}

            {/* Data points */}
            {chartData.map((point, index) => {
              const x = (index / (chartData.length - 1)) * 380 + 10
              const y = 110 - ((point.value - minValue) / range) * 100
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="3"
                  className={`${getColorClasses(color).split(" ")[0].replace("stroke", "fill")} stroke-white stroke-2`}
                />
              )
            })}
          </svg>

          {/* Current value display */}
          <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded shadow text-sm font-semibold">
            {chartData[chartData.length - 1]?.value.toFixed(1)}
            {unit}
          </div>
        </div>

        {/* Mini stats */}
        <div className="flex justify-between mt-4 text-xs text-gray-600">
          <span>
            Min: {minValue.toFixed(1)}
            {unit}
          </span>
          <span>
            Avg: {(chartData.reduce((sum, d) => sum + d.value, 0) / chartData.length).toFixed(1)}
            {unit}
          </span>
          <span>
            Max: {maxValue.toFixed(1)}
            {unit}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
