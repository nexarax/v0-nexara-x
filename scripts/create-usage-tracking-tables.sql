-- Create user usage tracking table
CREATE TABLE IF NOT EXISTS user_usage (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  month VARCHAR(7) NOT NULL, -- YYYY-MM format
  text_posts INTEGER DEFAULT 0,
  images INTEGER DEFAULT 0,
  voice_minutes DECIMAL(10,2) DEFAULT 0,
  videos INTEGER DEFAULT 0,
  total_cost DECIMAL(10,2) DEFAULT 0,
  tier VARCHAR(20) DEFAULT 'free',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, month)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_user_usage_user_month ON user_usage(user_id, month);
CREATE INDEX IF NOT EXISTS idx_user_usage_month ON user_usage(month);

-- Create user subscriptions table
CREATE TABLE IF NOT EXISTS user_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  tier VARCHAR(20) NOT NULL DEFAULT 'free',
  stripe_customer_id VARCHAR(255),
  stripe_subscription_id VARCHAR(255),
  status VARCHAR(20) DEFAULT 'active', -- active, canceled, past_due, etc.
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for subscriptions
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_user_id ON user_subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_stripe_customer ON user_subscriptions(stripe_customer_id);

-- Create AI generation logs table for detailed tracking
CREATE TABLE IF NOT EXISTS ai_generation_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  type VARCHAR(20) NOT NULL, -- text, image, voice, video
  prompt TEXT,
  result_size INTEGER, -- characters for text, pixels for image, seconds for voice/video
  cost DECIMAL(8,4) NOT NULL,
  provider VARCHAR(50), -- openai, anthropic, etc.
  model VARCHAR(100), -- gpt-4, claude-3, etc.
  success BOOLEAN DEFAULT TRUE,
  error_message TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for AI logs
CREATE INDEX IF NOT EXISTS idx_ai_logs_user_date ON ai_generation_logs(user_id, created_at);
CREATE INDEX IF NOT EXISTS idx_ai_logs_type ON ai_generation_logs(type);
CREATE INDEX IF NOT EXISTS idx_ai_logs_cost ON ai_generation_logs(cost);

-- Create function to update usage automatically
CREATE OR REPLACE FUNCTION update_user_usage()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_usage (user_id, month, text_posts, images, voice_minutes, videos, total_cost)
  VALUES (
    NEW.user_id,
    TO_CHAR(NEW.created_at, 'YYYY-MM'),
    CASE WHEN NEW.type = 'text' THEN 1 ELSE 0 END,
    CASE WHEN NEW.type = 'image' THEN 1 ELSE 0 END,
    CASE WHEN NEW.type = 'voice' THEN NEW.result_size ELSE 0 END,
    CASE WHEN NEW.type = 'video' THEN 1 ELSE 0 END,
    NEW.cost
  )
  ON CONFLICT (user_id, month) DO UPDATE SET
    text_posts = user_usage.text_posts + CASE WHEN NEW.type = 'text' THEN 1 ELSE 0 END,
    images = user_usage.images + CASE WHEN NEW.type = 'image' THEN 1 ELSE 0 END,
    voice_minutes = user_usage.voice_minutes + CASE WHEN NEW.type = 'voice' THEN NEW.result_size ELSE 0 END,
    videos = user_usage.videos + CASE WHEN NEW.type = 'video' THEN 1 ELSE 0 END,
    total_cost = user_usage.total_cost + NEW.cost,
    updated_at = NOW();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update usage
DROP TRIGGER IF EXISTS trigger_update_user_usage ON ai_generation_logs;
CREATE TRIGGER trigger_update_user_usage
  AFTER INSERT ON ai_generation_logs
  FOR EACH ROW
  EXECUTE FUNCTION update_user_usage();

-- Insert default free tier for existing users (if any)
INSERT INTO user_subscriptions (user_id, tier)
SELECT id, 'free'
FROM auth.users
WHERE id NOT IN (SELECT user_id FROM user_subscriptions)
ON CONFLICT (user_id) DO NOTHING;
