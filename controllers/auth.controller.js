import crypto from 'crypto';
import User from '../models/user.model.js';
import Admin from '../models/admin.model.js';
import Client from '../models/client.model.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../services/jwt.service.js';
import { generateResetToken, findByResetToken } from '../services/auth.service.js';
import { sendPasswordResetEmail, sendOtpEmail } from '../services/mail.service.js';

// @desc    Register a new client user
// @route   POST /api/v1/auth/register
// @access  Public
export const register = async (req, res, next) => {
  try {
    const { name, email, password, company } = req.body;

    let user = await User.findOne({ email });
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    if (user) {
      if (!user.isVerified) {
        // Update user information and resend OTP
        user.name = name;
        user.password = password;
        user.company = company;
        user.otpCode = otpCode;
        user.otpExpire = otpExpire;
        await user.save();

        await sendOtpEmail(user.email, otpCode);

        return res.status(200).json({
          success: true,
          message: 'Registration pending verification. A new verification code has been sent to your email.',
          email: user.email,
        });
      }
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    user = await User.create({
      name,
      email,
      password,
      company,
      isVerified: false,
      otpCode,
      otpExpire,
    });

    await sendOtpEmail(user.email, otpCode);

    res.status(201).json({
      success: true,
      message: 'Registration successful! Please verify your email using the OTP sent to you.',
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify OTP for registration activation
// @route   POST /api/v1/auth/verify-otp
// @access  Public
export const verifyOtp = async (req, res, next) => {
  try {
    const { email, otpCode } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user.isVerified) {
      return res.status(400).json({ success: false, message: 'Email already verified' });
    }

    if (user.otpCode !== otpCode || user.otpExpire < new Date()) {
      return res.status(400).json({ success: false, message: 'Invalid or expired verification code' });
    }

    // Mark as verified and clear OTP
    user.isVerified = true;
    user.otpCode = undefined;
    user.otpExpire = undefined;
    await user.save();

    // Create corresponding Client profile so projects/invoices/tickets bindings work automatically!
    let client = await Client.findOne({ email: user.email });
    if (!client) {
      await Client.create({
        name: user.name,
        email: user.email,
        company: user.company || 'Nextora Partner',
        userId: user._id,
      });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Set refresh token in HttpOnly cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      success: true,
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        company: user.company,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login user (client or administrative staff)
// @route   POST /api/v1/auth/login
// @access  Public
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Search Admin first
    let user = await Admin.findOne({ email }).select('+password');
    let isStaff = true;

    if (!user) {
      // Search Client user
      user = await User.findOne({ email }).select('+password');
      isStaff = false;
    }

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    if (user.isActive === false) {
      return res.status(401).json({ success: false, message: 'Your account is deactivated' });
    }

    if (!isStaff && !user.isVerified) {
      // Send a new OTP so they can verify if their code expired
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      user.otpCode = otpCode;
      user.otpExpire = new Date(Date.now() + 10 * 60 * 1000);
      await user.save();
      await sendOtpEmail(user.email, otpCode);

      return res.status(403).json({
        success: false,
        isVerified: false,
        message: 'Your account is pending email verification. A new verification code has been sent to your email.',
        email: user.email,
      });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        company: !isStaff ? user.company : undefined,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Log user out / clear cookie
// @route   POST /api/v1/auth/logout
// @access  Private
export const logout = async (req, res, next) => {
  try {
    res.clearCookie('refreshToken');
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Refresh access token
// @route   POST /api/v1/auth/refresh-token
// @access  Public
export const refreshToken = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      return res.status(401).json({ success: false, message: 'Refresh token missing' });
    }

    const decoded = verifyRefreshToken(token);
    if (!decoded) {
      return res.status(401).json({ success: false, message: 'Invalid or expired refresh token' });
    }

    // Try finding admin or user
    let user = await Admin.findById(decoded.id);
    if (!user) {
      user = await User.findById(decoded.id);
    }

    if (!user) {
      return res.status(401).json({ success: false, message: 'Session owner not found' });
    }

    const newAccessToken = generateAccessToken(user);
    res.status(200).json({ success: true, accessToken: newAccessToken });
  } catch (error) {
    next(error);
  }
};

// @desc    Request forgot password reset OTP
// @route   POST /api/v1/auth/forgot-password
// @access  Public
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    let user = await Admin.findOne({ email });
    let modelType = 'admin';

    if (!user) {
      user = await User.findOne({ email });
      modelType = 'user';
    }

    if (!user) {
      return res.status(404).json({ success: false, message: 'Email address not found' });
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.otpCode = otpCode;
    user.otpExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    await user.save();

    await sendOtpEmail(user.email, otpCode);

    res.status(200).json({ success: true, message: 'A verification security code has been sent to your email' });
  } catch (error) {
    next(error);
  }
};

// @desc    Reset password using email verification code (OTP)
// @route   POST /api/v1/auth/reset-password-otp
// @access  Public
export const resetPasswordOtp = async (req, res, next) => {
  try {
    const { email, otpCode, password } = req.body;

    let user = await Admin.findOne({ email }).select('+password');
    if (!user) {
      user = await User.findOne({ email }).select('+password');
    }

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user.otpCode !== otpCode || user.otpExpire < new Date()) {
      return res.status(400).json({ success: false, message: 'Invalid or expired verification code' });
    }

    // Update password and clear OTP fields
    user.password = password;
    user.otpCode = undefined;
    user.otpExpire = undefined;
    
    // Also clear any legacy link-based reset token fields just in case
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    
    await user.save();

    res.status(200).json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Change password (authenticated)
// @route   PUT /api/v1/auth/change-password
// @access  Private
export const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const model = req.user.role === 'client' ? User : Admin;
    const user = await model.findById(req.user._id).select('+password');

    if (!(await user.comparePassword(oldPassword))) {
      return res.status(400).json({ success: false, message: 'Old password is incorrect' });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    next(error);
  }
};
