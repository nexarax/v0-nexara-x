"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { AILearningEngine, type AIPersonality, type UserBehavior } from "@/lib/ai-learning"
import { useAuth } from "./auth-provider"

interface AILearningContextType {
  personality: AIPersonality | null
  trackInteraction: (action: string, element: string, context?: Record<string, any>) => void
  suggestions: string[]
  predictedActions: Array<{ action: string; probability: number }>
  learningProgress: number
}

const AILearningContext = createContext<AILearningContextType | undefined>(undefined)

export function AILearningProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [personality, setPersonality] = useState<AIPersonality | null>(null)
  const [sessionId] = useState(() => Math.random().toString(36).substring(7))
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [predictedActions, setPredictedActions] = useState<Array<{ action: string; probability: number }>>([])

  useEffect(() => {
    if (user?.id) {
      // Load AI personality
      AILearningEngine.generatePersonality(user.id).then(setPersonality)
    }
  }, [user?.id])

  useEffect(() => {
    if (personality) {
      setSuggestions(personality.predictions.suggestedFeatures)
      setPredictedActions(personality.predictions.nextActions)
    }
  }, [personality])

  const trackInteraction = (action: string, element: string, context: Record<string, any> = {}) => {
    if (!user?.id) return

    const behavior: UserBehavior = {
      userId: user.id,
      timestamp: new Date(),
      action,
      element,
      context,
      sessionId,
    }

    AILearningEngine.trackInteraction(behavior)

    // Update personality periodically
    if (Math.random() < 0.1) {
      // 10% chance to update
      AILearningEngine.generatePersonality(user.id).then(setPersonality)
    }
  }

  const value = {
    personality,
    trackInteraction,
    suggestions,
    predictedActions,
    learningProgress: personality?.learningProgress.accuracy || 0,
  }

  return <AILearningContext.Provider value={value}>{children}</AILearningContext.Provider>
}

export function useAILearning() {
  const context = useContext(AILearningContext)
  if (context === undefined) {
    throw new Error("useAILearning must be used within an AILearningProvider")
  }
  return context
}
