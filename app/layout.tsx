import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/components/auth-provider"
import { AILearningProvider } from "@/components/ai-learning-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NexaraX - All-in-One Business Platform",
  description: "Complete business platform with AI-powered tools, CRM, e-commerce, booking, and more.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "NexaraX",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "NexaraX",
    title: "NexaraX - All-in-One Business Platform",
    description: "Complete business platform with AI-powered tools",
  },
  twitter: {
    card: "summary",
    title: "NexaraX - All-in-One Business Platform",
    description: "Complete business platform with AI-powered tools",
  },
    generator: 'v0.dev'
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <AILearningProvider>
              {children}
              <Toaster />
            </AILearningProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
