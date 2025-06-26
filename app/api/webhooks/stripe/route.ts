import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

let stripe: Stripe | null = null
let supabase: any = null

if (stripeSecretKey) {
  stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2024-12-18.acacia",
  })
}

if (supabaseUrl && supabaseServiceKey) {
  supabase = createClient(supabaseUrl, supabaseServiceKey)
}

async function logSecurityEvent(event: any) {
  try {
    if (supabase) {
      await supabase.from("security_events").insert(event)
    } else {
      console.log("Security event:", event)
    }
  } catch (error) {
    console.log("Security event logging failed:", error)
  }
}

const PRICE_ID_TO_TIER: Record<string, string> = {
  [process.env.STRIPE_STARTER_PRICE_ID || ""]: "starter",
  [process.env.STRIPE_PRO_PRICE_ID || ""]: "pro",
  [process.env.STRIPE_ENTERPRISE_PRICE_ID || ""]: "enterprise",
}

export async function POST(request: Request) {
  if (!stripe || !webhookSecret) {
    return new Response("Stripe not configured", { status: 200 })
  }

  try {
    const body = await request.text()
    const signature = request.headers.get("stripe-signature")

    if (!signature) {
      return new Response("No signature", { status: 400 })
    }

    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret)

    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated":
        await handleSubscriptionChange(event.data.object as Stripe.Subscription)
        break

      case "customer.subscription.deleted":
        await handleSubscriptionCanceled(event.data.object as Stripe.Subscription)
        break

      case "invoice.payment_succeeded":
        await handlePaymentSucceeded(event.data.object as Stripe.Invoice)
        break

      case "invoice.payment_failed":
        await handlePaymentFailed(event.data.object as Stripe.Invoice)
        break
    }

    return new Response("Success", { status: 200 })
  } catch (error) {
    console.error("Stripe webhook error:", error)
    return new Response("Webhook error", { status: 400 })
  }
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  if (!supabase) return

  const customerId = subscription.customer as string
  const priceId = subscription.items.data[0]?.price.id
  const tier = PRICE_ID_TO_TIER[priceId] || "free"

  const { data: existingSubscription } = await supabase
    .from("user_subscriptions")
    .select("user_id")
    .eq("stripe_customer_id", customerId)
    .single()

  if (existingSubscription) {
    await supabase
      .from("user_subscriptions")
      .update({
        tier,
        stripe_subscription_id: subscription.id,
        status: subscription.status,
        current_period_start: new Date((subscription as any).current_period_start * 1000),
        current_period_end: new Date((subscription as any).current_period_end * 1000),
        cancel_at_period_end: (subscription as any).cancel_at_period_end,
        updated_at: new Date(),
      })
      .eq("stripe_customer_id", customerId)
  }
}

async function handleSubscriptionCanceled(subscription: Stripe.Subscription) {
  if (!supabase) return

  const customerId = subscription.customer as string

  await supabase
    .from("user_subscriptions")
    .update({
      tier: "free",
      status: "canceled",
      updated_at: new Date(),
    })
    .eq("stripe_customer_id", customerId)
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log("Payment succeeded for customer:", invoice.customer)
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  console.log("Payment failed for customer:", invoice.customer)
}
