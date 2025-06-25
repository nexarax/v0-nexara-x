"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Smartphone, Palette, BarChart3, ArrowRight } from "lucide-react"

interface UserTypeSelectorProps {
  onSelect: (userType: string) => void
}

export function UserTypeSelector({ onSelect }: UserTypeSelectorProps) {
  const [selectedType, setSelectedType] = useState<string>("")

  const userTypes = [
    {
      id: "creator",
      title: "Content Creator",
      icon: Smartphone,
      description: "I create content for social media platforms",
      benefits: ["Go viral on autopilot", "Multi-platform posting", "Viral prediction AI"],
      badge: "Most Popular",
      color: "blue",
    },
    {
      id: "artist",
      title: "Artist/Designer",
      icon: Palette,
      description: "I create digital art and visual designs",
      benefits: ["AI art generation", "Professional templates", "High-res exports"],
      badge: "Creative",
      color: "purple",
    },
    {
      id: "business",
      title: "Business Owner",
      icon: BarChart3,
      description: "I need marketing content for my business",
      benefits: ["Marketing automation", "Brand consistency", "ROI tracking"],
      badge: "Professional",
      color: "green",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">What best describes you?</h2>
        <p className="text-gray-600">Help us personalize your NexaraX experience</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {userTypes.map((type) => {
          const Icon = type.icon
          const isSelected = selectedType === type.id

          return (
            <Card
              key={type.id}
              className={`cursor-pointer transition-all duration-200 ${
                isSelected
                  ? `border-2 border-${type.color}-500 shadow-lg`
                  : "border-2 border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setSelectedType(type.id)}
            >
              <CardHeader className="text-center">
                <div className="relative">
                  <div
                    className={`w-16 h-16 bg-${type.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <Icon className={`w-8 h-8 text-${type.color}-600`} />
                  </div>
                  <Badge className={`absolute -top-2 -right-2 bg-${type.color}-600 text-white`} variant="default">
                    {type.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{type.title}</CardTitle>
                <CardDescription>{type.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {type.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <div className={`w-2 h-2 bg-${type.color}-500 rounded-full mr-2`} />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="text-center">
        <Button
          size="lg"
          disabled={!selectedType}
          onClick={() => selectedType && onSelect(selectedType)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
