import { NextResponse } from "next/server"
import { Redis } from "@upstash/redis"

export async function GET() {
  console.log("🧪 Testing Redis connection...")

  try {
    // Check if environment variables exist
    const url = process.env.UPSTASH_REDIS_REST_URL
    const token = process.env.UPSTASH_REDIS_REST_TOKEN

    if (!url || !token) {
      return NextResponse.json({
        success: false,
        error: "Missing Redis environment variables",
        debug: {
          hasUrl: !!url,
          hasToken: !!token,
          urlPreview: url ? url.substring(0, 30) + "..." : "missing",
        },
      })
    }

    // Initialize Redis client
    const redis = new Redis({
      url: url,
      token: token,
    })

    // Test basic operations
    const testKey = `nexarax-test-${Date.now()}`
    const testValue = "Hello from NexaraX!"

    console.log("🔍 Setting test value...")
    await redis.set(testKey, testValue)

    console.log("🔍 Getting test value...")
    const result = await redis.get(testKey)

    console.log("🔍 Cleaning up test key...")
    await redis.del(testKey)

    if (result === testValue) {
      return NextResponse.json({
        success: true,
        message: "Redis connection successful!",
        debug: {
          testKey,
          testValue,
          result,
          timestamp: new Date().toISOString(),
        },
      })
    } else {
      return NextResponse.json({
        success: false,
        error: "Redis test failed - value mismatch",
        debug: {
          expected: testValue,
          received: result,
        },
      })
    }
  } catch (error) {
    console.error("❌ Redis test error:", error)
    return NextResponse.json({
      success: false,
      error: "Redis connection failed",
      debug: {
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
    })
  }
}
