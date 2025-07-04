# NexaraX Environment Variables Setup

## Required Environment Variables

To resolve the Vercel integration warnings, you need to set up these environment variables:

### 1. Email Service (Resend)
\`\`\`
RESEND_API_KEY=re_your_api_key_here
\`\`\`

### 2. Database (if using)
\`\`\`
POSTGRES_URL=your_postgres_connection_string
POSTGRES_PRISMA_URL=your_prisma_connection_string
POSTGRES_URL_NON_POOLING=your_non_pooling_connection_string
POSTGRES_USER=your_username
POSTGRES_PASSWORD=your_password
POSTGRES_DATABASE=your_database_name
POSTGRES_HOST=your_host
\`\`\`

### 3. Authentication (if using NextAuth)
\`\`\`
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=https://your-domain.com
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
\`\`\`

### 4. Upstash Redis (for workflows)
\`\`\`
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
\`\`\`

### 5. Cron Jobs
\`\`\`
CRON_SECRET=your_random_secret_string
\`\`\`

### 6. App Configuration
\`\`\`
NEXT_PUBLIC_APP_URL=https://your-domain.com
VERCEL_URL=your-vercel-url
\`\`\`

## How to Set Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your NexaraX project
3. Go to Settings → Environment Variables
4. Add each variable with its value
5. Make sure to set them for all environments (Production, Preview, Development)

## Current Status
- ✅ Email service (Resend) is configured
- ⚠️ Some integrations may need environment variables
- ⚠️ Check Vercel dashboard for specific missing variables

## Testing
After setting up environment variables, you can test:
- `/api/test-resend` - Test email functionality
- `/api/test-email-flow` - Test complete email flow
- `/api/debug-full-flow` - Comprehensive system test
