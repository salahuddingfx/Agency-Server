import express from 'express';
import {
  register,
  login,
  logout,
  refreshToken,
  forgotPassword,
  verifyOtp,
  resetPasswordOtp,
  changePassword,
} from '../controllers/auth.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { validateRequest } from '../middlewares/validate.middleware.js';
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  verifyOtpSchema,
  resetPasswordOtpSchema,
  changePasswordSchema,
} from '../validators/auth.validator.js';
import { authLimiter } from '../middlewares/rateLimit.middleware.js';

const router = express.Router();

router.post('/register', authLimiter, validateRequest(registerSchema), register);
router.post('/verify-otp', authLimiter, validateRequest(verifyOtpSchema), verifyOtp);
router.post('/login', authLimiter, validateRequest(loginSchema), login);
router.post('/logout', logout);
router.post('/refresh-token', refreshToken);
router.post('/forgot-password', validateRequest(forgotPasswordSchema), forgotPassword);
router.post('/reset-password-otp', validateRequest(resetPasswordOtpSchema), resetPasswordOtp);
router.put('/change-password', protect, validateRequest(changePasswordSchema), changePassword);

export default router;
