const CACHE_NAME = "nexarax-pwa-v1.0.0"
const STATIC_CACHE_NAME = "nexarax-static-v1.0.0"
const DYNAMIC_CACHE_NAME = "nexarax-dynamic-v1.0.0"

// Files to cache immediately
const STATIC_FILES = [
  "/pwa-mobile",
  "/manifest.json",
  "/_next/static/css/app/layout.css",
  "/_next/static/chunks/webpack.js",
  "/_next/static/chunks/main.js",
  "/placeholder.svg?height=192&width=192&text=NX",
]

// API endpoints to cache
const API_CACHE_PATTERNS = [/^\/api\/mobile\//, /^\/api\/dashboard\//, /^\/api\/status\//]

// Install event - cache static files
self.addEventListener("install", (event) => {
  console.log("Service Worker: Installing...")

  event.waitUntil(
    caches
      .open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log("Service Worker: Caching static files")
        return cache.addAll(STATIC_FILES)
      })
      .then(() => {
        console.log("Service Worker: Static files cached")
        return self.skipWaiting()
      })
      .catch((error) => {
        console.error("Service Worker: Cache failed", error)
      }),
  )
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activating...")

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME && cacheName !== CACHE_NAME) {
              console.log("Service Worker: Deleting old cache", cacheName)
              return caches.delete(cacheName)
            }
          }),
        )
      })
      .then(() => {
        console.log("Service Worker: Activated")
        return self.clients.claim()
      }),
  )
})

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Handle API requests
  if (API_CACHE_PATTERNS.some((pattern) => pattern.test(url.pathname))) {
    event.respondWith(
      caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
        return fetch(request)
          .then((response) => {
            // Cache successful API responses
            if (response.status === 200) {
              cache.put(request, response.clone())
            }
            return response
          })
          .catch(() => {
            // Return cached version if network fails
            return cache.match(request).then((cachedResponse) => {
              if (cachedResponse) {
                return cachedResponse
              }
              // Return offline fallback for critical APIs
              return new Response(
                JSON.stringify({
                  offline: true,
                  message: "You are offline. Showing cached data.",
                  timestamp: new Date().toISOString(),
                }),
                {
                  headers: { "Content-Type": "application/json" },
                },
              )
            })
          })
      }),
    )
    return
  }

  // Handle static files and pages
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse
      }

      return fetch(request)
        .then((response) => {
          // Don't cache non-successful responses
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response
          }

          // Cache the response
          const responseToCache = response.clone()
          caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache)
          })

          return response
        })
        .catch(() => {
          // Return offline page for navigation requests
          if (request.mode === "navigate") {
            return caches.match("/pwa-mobile")
          }

          // Return placeholder for images
          if (request.destination === "image") {
            return caches.match("/placeholder.svg?height=192&width=192&text=Offline")
          }
        })
    }),
  )
})

// Background sync for offline actions
self.addEventListener("sync", (event) => {
  console.log("Service Worker: Background sync triggered", event.tag)

  if (event.tag === "alert-acknowledgment") {
    event.waitUntil(syncAlertAcknowledgments())
  }

  if (event.tag === "emergency-alert") {
    event.waitUntil(syncEmergencyAlerts())
  }
})

// Push notification handler
self.addEventListener("push", (event) => {
  console.log("Service Worker: Push notification received")

  const options = {
    body: "You have a new alert that requires attention.",
    icon: "/placeholder.svg?height=192&width=192&text=NX",
    badge: "/placeholder.svg?height=72&width=72&text=!",
    vibrate: [200, 100, 200],
    tag: "nexarax-alert",
    requireInteraction: true,
    actions: [
      {
        action: "acknowledge",
        title: "Acknowledge",
        icon: "/placeholder.svg?height=32&width=32&text=✓",
      },
      {
        action: "view",
        title: "View Details",
        icon: "/placeholder.svg?height=32&width=32&text=👁",
      },
    ],
    data: {
      url: "/pwa-mobile?tab=alerts",
      timestamp: Date.now(),
    },
  }

  if (event.data) {
    try {
      const payload = event.data.json()
      options.title = payload.title || "NexaraX Alert"
      options.body = payload.body || options.body
      options.tag = payload.tag || options.tag

      // Set priority-based vibration patterns
      if (payload.severity === "critical") {
        options.vibrate = [300, 100, 300, 100, 300]
        options.requireInteraction = true
      }
    } catch (error) {
      console.error("Service Worker: Error parsing push payload", error)
    }
  }

  event.waitUntil(self.registration.showNotification("NexaraX Alert", options))
})

// Notification click handler
self.addEventListener("notificationclick", (event) => {
  console.log("Service Worker: Notification clicked", event.action)

  event.notification.close()

  if (event.action === "acknowledge") {
    // Handle acknowledgment
    event.waitUntil(
      fetch("/api/mobile/alerts/acknowledge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          alertId: event.notification.tag,
          timestamp: Date.now(),
        }),
      }).catch(() => {
        // Queue for background sync if offline
        return self.registration.sync.register("alert-acknowledgment")
      }),
    )
  } else {
    // Open the app
    const urlToOpen = event.notification.data?.url || "/pwa-mobile"

    event.waitUntil(
      clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
        // Check if app is already open
        for (const client of clientList) {
          if (client.url.includes("/pwa-mobile") && "focus" in client) {
            return client.focus()
          }
        }

        // Open new window if app not open
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen)
        }
      }),
    )
  }
})

// Helper functions for background sync
async function syncAlertAcknowledgments() {
  try {
    // Get queued acknowledgments from IndexedDB
    const acknowledgments = await getQueuedAcknowledgments()

    for (const ack of acknowledgments) {
      await fetch("/api/mobile/alerts/acknowledge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ack),
      })
    }

    // Clear queued acknowledgments
    await clearQueuedAcknowledgments()
    console.log("Service Worker: Alert acknowledgments synced")
  } catch (error) {
    console.error("Service Worker: Failed to sync acknowledgments", error)
  }
}

async function syncEmergencyAlerts() {
  try {
    // Get queued emergency alerts
    const emergencyAlerts = await getQueuedEmergencyAlerts()

    for (const alert of emergencyAlerts) {
      await fetch("/api/mobile/emergency", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(alert),
      })
    }

    await clearQueuedEmergencyAlerts()
    console.log("Service Worker: Emergency alerts synced")
  } catch (error) {
    console.error("Service Worker: Failed to sync emergency alerts", error)
  }
}

// IndexedDB helpers (simplified for demo)
async function getQueuedAcknowledgments() {
  // In a real implementation, this would use IndexedDB
  return []
}

async function clearQueuedAcknowledgments() {
  // Clear IndexedDB queue
}

async function getQueuedEmergencyAlerts() {
  return []
}

async function clearQueuedEmergencyAlerts() {
  // Clear IndexedDB queue
}
