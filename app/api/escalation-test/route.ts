import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { config, levels } = body

    if (!config || !levels) {
      return new NextResponse("Config and Levels are required", { status: 400 })
    }

    async function testEscalationLevel(level: number, levelName: string, config: any): Promise<any> {
      try {
        // Simulate escalation level testing logic here
        console.log(`Testing escalation level ${level}: ${levelName} with config:`, config)
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate some async work

        return {
          level: level,
          levelName: levelName,
          status: "success",
          message: `Escalation level ${levelName} passed successfully.`,
        }
      } catch (error: any) {
        console.error(`Error testing escalation level ${levelName}:`, error)
        return {
          level: level,
          levelName: levelName,
          status: "error",
          message: `Escalation level ${levelName} failed: ${error.message || error}`,
        }
      }
    }

    const results = []
    for (let i = 0; i < levels.length; i++) {
      const levelResult = await testEscalationLevel(i, levels[i], config)
      results.push(levelResult)
    }

    return NextResponse.json({ results })
  } catch (error: any) {
    console.error("Error during escalation test:", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
