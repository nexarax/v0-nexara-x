import { NextResponse } from "next/server"

export async function GET() {
  // Redirect favicon.ico requests to your PNG icon
  return NextResponse.redirect(new URL("/icon-192.png", "https://nexarax.com"), 301)
}
