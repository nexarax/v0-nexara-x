import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  // Redirect favicon.ico requests to your PNG icon
  return NextResponse.redirect(new URL("/icon-192.png", request.url))
}
