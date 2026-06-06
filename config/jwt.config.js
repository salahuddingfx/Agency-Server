import dotenv from 'dotenv';

dotenv.config();

export const jwtConfig = {
  accessSecret: process.env.JWT_ACCESS_SECRET || 'default_access_secret_1234567890',
  accessExpiry: process.env.JWT_ACCESS_EXPIRY || '15m',
  refreshSecret: process.env.JWT_REFRESH_SECRET || 'default_refresh_secret_1234567890',
  refreshExpiry: process.env.JWT_REFRESH_EXPIRY || '7d',
};
