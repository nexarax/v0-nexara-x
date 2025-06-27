'use server'

export async function submitContactForm(formData: FormData) {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1000))

  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string
  const email = formData.get('email') as string
  const company = formData.get('company') as string
  const subject = formData.get('subject') as string
  const message = formData.get('message') as string

  // Here you would typically:
  // 1. Validate the data
  // 2. Send email via Resend or another service
  // 3. Store in database
  // 4. Send notifications

  console.log('Contact form submission:', {
    firstName,
    lastName,
    email,
    company,
    subject,
    message,
    timestamp: new Date().toISOString()
  })

  // For now, just return success
  return {
    success: true,
    message: 'Thank you for your message. We will get back to you soon!'
  }
}
