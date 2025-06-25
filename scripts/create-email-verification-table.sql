-- Create email verification table
CREATE TABLE IF NOT EXISTS email_verifications (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  verification_token VARCHAR(64) NOT NULL UNIQUE,
  selected_plan VARCHAR(50) DEFAULT 'free',
  verified BOOLEAN DEFAULT FALSE,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  verified_at TIMESTAMP NULL,
  
  INDEX idx_verification_token (verification_token),
  INDEX idx_email (email),
  INDEX idx_expires_at (expires_at)
);
