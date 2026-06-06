import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt.config.js';

export const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role, email: user.email },
    jwtConfig.accessSecret,
    { expiresIn: jwtConfig.accessExpiry }
  );
};

export const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id },
    jwtConfig.refreshSecret,
    { expiresIn: jwtConfig.refreshExpiry }
  );
};

export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, jwtConfig.refreshSecret);
  } catch (error) {
    return null;
  }
};
