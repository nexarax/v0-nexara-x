"use client"

import { useState } from "react"

export default function SimpleTestPage() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>🧪 Simple Test Page</h1>
      <p>If you can see this page, basic React/Next.js is working!</p>

      <div style={{ margin: "20px 0", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
        <h2>Interactive Test</h2>
        <p>Counter: {count}</p>
        <button
          onClick={() => setCount(count + 1)}
          style={{
            padding: "10px 20px",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Click me! (+1)
        </button>
      </div>

      <div style={{ margin: "20px 0", padding: "20px", backgroundColor: "#f0f0f0", borderRadius: "8px" }}>
        <h2>✅ What's Working:</h2>
        <ul>
          <li>✅ React components rendering</li>
          <li>✅ useState hook working</li>
          <li>✅ Event handlers working</li>
          <li>✅ Next.js routing working</li>
          <li>✅ CSS styling working</li>
        </ul>
      </div>

      <div style={{ margin: "20px 0" }}>
        <h2>🔗 Quick Navigation Test:</h2>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <a
            href="/"
            style={{
              padding: "8px 16px",
              backgroundColor: "#28a745",
              color: "white",
              textDecoration: "none",
              borderRadius: "4px",
            }}
          >
            Home
          </a>
          <a
            href="/onboarding"
            style={{
              padding: "8px 16px",
              backgroundColor: "#17a2b8",
              color: "white",
              textDecoration: "none",
              borderRadius: "4px",
            }}
          >
            Onboarding
          </a>
          <a
            href="/dashboard"
            style={{
              padding: "8px 16px",
              backgroundColor: "#ffc107",
              color: "black",
              textDecoration: "none",
              borderRadius: "4px",
            }}
          >
            Dashboard
          </a>
          <a
            href="/diagnostics"
            style={{
              padding: "8px 16px",
              backgroundColor: "#dc3545",
              color: "white",
              textDecoration: "none",
              borderRadius: "4px",
            }}
          >
            Diagnostics
          </a>
        </div>
      </div>

      <div
        style={{
          margin: "20px 0",
          padding: "20px",
          backgroundColor: "#fff3cd",
          border: "1px solid #ffeaa7",
          borderRadius: "8px",
        }}
      >
        <h2>🚨 If you see this page but other pages don't work:</h2>
        <ol>
          <li>Check browser console for errors (F12 → Console)</li>
          <li>Try the navigation links above</li>
          <li>Check if the development server is running</li>
          <li>Look for any red error messages in your terminal</li>
        </ol>
      </div>
    </div>
  )
}
