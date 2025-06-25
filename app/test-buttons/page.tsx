"use client"

import { useRouter } from "next/navigation"

export default function TestButtonsPage() {
  const router = useRouter()

  const handleTest = () => {
    alert("Button clicked! Navigation is working!")
    console.log("Button test successful")
  }

  const handleGoHome = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-6">Button Test Page</h1>
        <p className="mb-6">If you can see this page, navigation is working!</p>

        <div className="space-y-4">
          <button
            onClick={handleTest}
            className="block w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700"
          >
            Test Alert Button
          </button>

          <button
            onClick={handleGoHome}
            className="block w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700"
          >
            Go Back Home
          </button>
        </div>
      </div>
    </div>
  )
}
