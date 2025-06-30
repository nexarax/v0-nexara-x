export interface UserBehavior {
  userId: string
  timestamp: Date
  action: string
  element: string
  context: Record<string, any>
  sessionId: string
}

export interface AIPersonality {
  userId: string
  preferences: {
    workflowStyle: "visual" | "text" | "mixed"
    complexity: "beginner" | "intermediate" | "advanced"
    creativity: number // 0-100
    efficiency: number // 0-100
    collaboration: number // 0-100
  }
  patterns: {
    mostUsedFeatures: string[]
    timeOfDayActivity: Record<string, number>
    workflowSequences: string[][]
    averageSessionLength: number
  }
  predictions: {
    nextActions: Array<{ action: string; probability: number }>
    suggestedFeatures: string[]
    optimalWorkflow: string[]
  }
  learningProgress: {
    accuracy: number
    interactions: number
    lastUpdated: Date
  }
}

export class AILearningEngine {
  static trackInteraction(behavior: UserBehavior) {
    // Track user behavior for learning
    console.log("AI Learning: Tracking interaction", behavior)

    // In production, this would send to analytics service
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("ai-learning") || "[]"
      const behaviors = JSON.parse(stored)
      behaviors.push(behavior)

      // Keep only last 1000 interactions
      if (behaviors.length > 1000) {
        behaviors.splice(0, behaviors.length - 1000)
      }

      localStorage.setItem("ai-learning", JSON.stringify(behaviors))
    }
  }

  static async generatePersonality(userId: string): Promise<AIPersonality> {
    // Simulate AI personality generation based on user behavior
    const behaviors = this.getUserBehaviors(userId)

    return {
      userId,
      preferences: {
        workflowStyle: this.detectWorkflowStyle(behaviors),
        complexity: this.detectComplexityLevel(behaviors),
        creativity: Math.floor(Math.random() * 100),
        efficiency: Math.floor(Math.random() * 100),
        collaboration: Math.floor(Math.random() * 100),
      },
      patterns: {
        mostUsedFeatures: this.getMostUsedFeatures(behaviors),
        timeOfDayActivity: this.getTimePatterns(behaviors),
        workflowSequences: this.getWorkflowSequences(behaviors),
        averageSessionLength: this.getAverageSessionLength(behaviors),
      },
      predictions: {
        nextActions: this.predictNextActions(behaviors),
        suggestedFeatures: this.suggestFeatures(behaviors),
        optimalWorkflow: this.optimizeWorkflow(behaviors),
      },
      learningProgress: {
        accuracy: Math.min((behaviors.length / 100) * 85, 95),
        interactions: behaviors.length,
        lastUpdated: new Date(),
      },
    }
  }

  private static getUserBehaviors(userId: string): UserBehavior[] {
    if (typeof window === "undefined") return []

    const stored = localStorage.getItem("ai-learning") || "[]"
    const behaviors = JSON.parse(stored)
    return behaviors.filter((b: UserBehavior) => b.userId === userId)
  }

  private static detectWorkflowStyle(behaviors: UserBehavior[]): "visual" | "text" | "mixed" {
    const visualActions = behaviors.filter(
      (b) => b.action.includes("image") || b.action.includes("video") || b.action.includes("design"),
    ).length

    const textActions = behaviors.filter(
      (b) => b.action.includes("text") || b.action.includes("write") || b.action.includes("copy"),
    ).length

    if (visualActions > textActions * 1.5) return "visual"
    if (textActions > visualActions * 1.5) return "text"
    return "mixed"
  }

  private static detectComplexityLevel(behaviors: UserBehavior[]): "beginner" | "intermediate" | "advanced" {
    const advancedFeatures = behaviors.filter(
      (b) => b.action.includes("advanced") || b.action.includes("custom") || b.action.includes("api"),
    ).length

    if (advancedFeatures > behaviors.length * 0.3) return "advanced"
    if (advancedFeatures > behaviors.length * 0.1) return "intermediate"
    return "beginner"
  }

  private static getMostUsedFeatures(behaviors: UserBehavior[]): string[] {
    const featureCounts: Record<string, number> = {}

    behaviors.forEach((b) => {
      const feature = b.action.split("-")[0]
      featureCounts[feature] = (featureCounts[feature] || 0) + 1
    })

    return Object.entries(featureCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([feature]) => feature)
  }

  private static getTimePatterns(behaviors: UserBehavior[]): Record<string, number> {
    const timePatterns: Record<string, number> = {}

    behaviors.forEach((b) => {
      const hour = new Date(b.timestamp).getHours()
      const timeSlot = hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening"
      timePatterns[timeSlot] = (timePatterns[timeSlot] || 0) + 1
    })

    return timePatterns
  }

  private static getWorkflowSequences(behaviors: UserBehavior[]): string[][] {
    // Group behaviors by session and extract sequences
    const sessions: Record<string, UserBehavior[]> = {}

    behaviors.forEach((b) => {
      if (!sessions[b.sessionId]) sessions[b.sessionId] = []
      sessions[b.sessionId].push(b)
    })

    return Object.values(sessions)
      .map((session) => session.map((b) => b.action))
      .filter((sequence) => sequence.length > 2)
      .slice(0, 10)
  }

  private static getAverageSessionLength(behaviors: UserBehavior[]): number {
    const sessions: Record<string, UserBehavior[]> = {}

    behaviors.forEach((b) => {
      if (!sessions[b.sessionId]) sessions[b.sessionId] = []
      sessions[b.sessionId].push(b)
    })

    const sessionLengths = Object.values(sessions).map((session) => {
      if (session.length < 2) return 0
      const start = new Date(session[0].timestamp).getTime()
      const end = new Date(session[session.length - 1].timestamp).getTime()
      return (end - start) / 1000 / 60 // minutes
    })

    return sessionLengths.reduce((a, b) => a + b, 0) / sessionLengths.length || 0
  }

  private static predictNextActions(behaviors: UserBehavior[]): Array<{ action: string; probability: number }> {
    const sequences = this.getWorkflowSequences(behaviors)
    const actionPairs: Record<string, Record<string, number>> = {}

    sequences.forEach((sequence) => {
      for (let i = 0; i < sequence.length - 1; i++) {
        const current = sequence[i]
        const next = sequence[i + 1]

        if (!actionPairs[current]) actionPairs[current] = {}
        actionPairs[current][next] = (actionPairs[current][next] || 0) + 1
      }
    })

    // Get last action and predict next
    const lastAction = behaviors[behaviors.length - 1]?.action
    if (!lastAction || !actionPairs[lastAction]) return []

    const nextActions = Object.entries(actionPairs[lastAction])
      .map(([action, count]) => ({
        action,
        probability: count / Object.values(actionPairs[lastAction]).reduce((a, b) => a + b, 0),
      }))
      .sort((a, b) => b.probability - a.probability)
      .slice(0, 3)

    return nextActions
  }

  private static suggestFeatures(behaviors: UserBehavior[]): string[] {
    const usedFeatures = new Set(behaviors.map((b) => b.action.split("-")[0]))
    const allFeatures = [
      "ai-image",
      "ai-video",
      "ai-music",
      "ai-copy",
      "templates",
      "crm",
      "ecommerce",
      "booking",
      "blog",
    ]

    return allFeatures.filter((feature) => !usedFeatures.has(feature)).slice(0, 3)
  }

  private static optimizeWorkflow(behaviors: UserBehavior[]): string[] {
    const sequences = this.getWorkflowSequences(behaviors)
    const mostCommon = sequences.reduce((a, b) => (a.length > b.length ? a : b), [])

    return mostCommon.slice(0, 5)
  }
}
