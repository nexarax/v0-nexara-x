"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Check, AlertCircle, Mail } from 'lucide-react'

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'verifying' | 'success' | 'error' | 'expired'>('verifying')
  const [email, setEmail] = useState("")

  useEffect(() => {
    const token = searchParams.get('token')
    
    if (!token) {
      setStatus('error')
      return
    }

    // Verify the token
    const verifyToken = async () => {
      try {
        const response = await fetch('/api/verify-email-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        })

        const data = await response.json()

        if (response.ok && data.success) {
          setEmail(data.email)
          setStatus('success')
          
          // Store verification in sessionStorage for create page access
          sessionStorage.setItem("nexarax_email_verified", "true")
          sessionStorage.setItem("nexarax_user_email", data.email)
          sessionStorage.setItem("nexarax_selected_plan", data.selectedPlan || "free")
          
        } else if (data.expired) {
          setStatus('expired')
        } else {
          setStatus('error')
        }
      } catch (error) {
        console.error('Verification error:', error)
        setStatus('error')
      }
    }

    verifyToken()
  }, [searchParams])

  const handleContinue = () => {
    router.push('/create')
  }

  const handleResendEmail = () => {
    router.push('/get-started')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-2 bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            {status === 'verifying' && <Sparkles className="w-8 h-8 text-white animate-spin" />}
            {status === 'success' && <Check className="w-8 h-8 text-white" />}
            {(status === 'error' || status === 'expired') && <AlertCircle className="w-8 h-8 text-white" />}
          </div>
          
          <CardTitle className="text-2xl">
            {status === 'verifying' && 'Verifying Email...'}
            {status === 'success' && 'Email Verified! 🎉'}
            {status === 'error' && 'Verification Failed'}
            {status === 'expired' && 'Link Expired'}
          </CardTitle>
          
          <CardDescription>
            {status === 'verifying' && 'Please wait while we verify your email address'}
            {status === 'success' && `Welcome to NexaraX, ${email}!`}
            {status === 'error' && 'The verification link is invalid or has been used'}
            {status === 'expired' && 'This verification link has expired'}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {status === 'success' && (
            <>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-green-800 font-medium">Email successfully verified!</span>
                </div>
                <p className="text-green-700 text-sm mt-2">
                  You can now access the AI content creation studio.
                </p>
              </div>
              
              <Button 
                onClick={handleContinue}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Start Creating Content
              </Button>
            </>
          )}
          
          {(status === 'error' || status === 'expired') && (
            <>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                  <span className="text-red-800 font-medium">
                    {status === 'expired' ? 'Verification link expired' : 'Verification failed'}
                  </span>
                </div>
                <p className="text-red-700 text-sm mt-2">
                  {status === 'expired' 
                    ? 'Please request a new verification email to continue.'
                    : 'The verification link is invalid or has already been used.'
                  }
                </p>
              </div>
              
              <Button 
                onClick={handleResendEmail}
                variant="outline"
                className="w-full"
              >
                <Mail className="w-5 h-5 mr-2" />
                Get New Verification Email
              </Button>
            </>
          )}
          
          {status === 'verifying' && (
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-600">This should only take a moment...</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
