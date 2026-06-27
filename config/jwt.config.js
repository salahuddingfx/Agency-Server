import env from './env.config.js';

export const jwtConfig = {
  accessSecret: env.JWT_ACCESS_SECRET,
  accessExpiry: env.JWT_ACCESS_EXPIRY,
  refreshSecret: env.JWT_REFRESH_SECRET,
  refreshExpiry: env.JWT_REFRESH_EXPIRY,
};
