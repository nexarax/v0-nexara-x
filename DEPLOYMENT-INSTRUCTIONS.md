# 🚀 NexaraX Deployment Instructions

## Complete Step-by-Step Deployment Guide

### Prerequisites
- GitHub account
- Vercel account
- Supabase account
- Stripe account
- Domain name (optional)

### Step 1: GitHub Setup
1. Create new repository: `nexarax-platform`
2. Upload all files from backup
3. Ensure all files are committed

### Step 2: Environment Variables
Set up these variables in Vercel:

\`\`\`env
# Database
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Payments
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable
STRIPE_WEBHOOK_SECRET=your_webhook_secret

# Authentication
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=https://your-domain.com

# Email
RESEND_API_KEY=your_resend_key
RESEND_FROM_EMAIL=noreply@yourdomain.com

# AI Services
AI_VIDEO_API_KEY=your_ai_video_key
VOICE_API_KEY=your_voice_api_key
\`\`\`

### Step 3: Database Setup
1. Run the `initialize-database.sql` script in Supabase
2. Verify all tables are created
3. Set up Row Level Security policies

### Step 4: Stripe Configuration
1. Create products for each pricing tier
2. Set up webhook endpoints
3. Configure subscription settings

### Step 5: Deployment
1. Connect GitHub repo to Vercel
2. Deploy with environment variables
3. Set up custom domain
4. Configure DNS settings

### Step 6: Testing
1. Test user registration
2. Test payment flows
3. Test AI content generation
4. Verify all API endpoints

### Step 7: Launch
1. Enable production mode
2. Set up monitoring
3. Launch marketing campaigns
4. Monitor system performance

## Troubleshooting

### Common Issues
- TypeScript errors: Check type definitions
- Database errors: Verify connection strings
- Payment errors: Check Stripe configuration
- Deployment errors: Review build logs

### Support
- Check deployment logs in Vercel
- Review database logs in Supabase
- Monitor error tracking
- Use health check endpoints
