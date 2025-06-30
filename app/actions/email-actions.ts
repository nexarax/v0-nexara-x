"use server"

import { sendEmail, createContactEmailHTML, createWaitlistEmailHTML } from "@/lib/resend-client"

export async function handleContactForm(formData: FormData) {
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const email = formData.get("email") as string
  const company = formData.get("company") as string
  const subject = formData.get("subject") as string
  const message = formData.get("message") as string

  // Validate required fields
  if (!firstName || !lastName || !email || !subject || !message) {
    return { success: false, error: "Please fill in all required fields" }
  }

  const emailData = {
    firstName,
    lastName,
    email,
    company,
    subject,
    message,
  }

  const result = await sendEmail({
    to: "hello@nexarax.com",
    subject: `Contact Form: ${subject}`,
    html: createContactEmailHTML(emailData),
  })

  if (result.success) {
    return { success: true, message: "Message sent successfully! We'll get back to you within 24 hours." }
  } else {
    return { success: false, error: "Failed to send message. Please try again." }
  }
}

export async function handleWaitlistSignup(formData: FormData) {
  const email = formData.get("email") as string
  const source = (formData.get("source") as string) || "website"

  if (!email) {
    return { success: false, error: "Please enter your email address" }
  }

  const result = await sendEmail({
    to: "hello@nexarax.com",
    subject: `🎉 New Waitlist Signup - ${email}`,
    html: createWaitlistEmailHTML({ email, source }),
  })

  if (result.success) {
    return { success: true, message: "Welcome to the waitlist! You'll be the first to know when we launch." }
  } else {
    return { success: false, error: "Failed to join waitlist. Please try again." }
  }
}
