import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NexaraX - AI-Powered Social Media Platform",
  description:
    "Revolutionary AI-powered social media platform with predictive analytics, automated content creation, and intelligent engagement tools.",
  keywords: ["AI", "social media", "automation", "analytics", "content creation"],
  authors: [{ name: "NexaraX Team" }],
  openGraph: {
    title: "NexaraX - AI-Powered Social Media Platform",
    description:
      "Revolutionary AI-powered social media platform with predictive analytics, automated content creation, and intelligent engagement tools.",
    type: "website",
    url: "https://nexarax.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "NexaraX - AI-Powered Social Media Platform",
    description:
      "Revolutionary AI-powered social media platform with predictive analytics, automated content creation, and intelligent engagement tools.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
