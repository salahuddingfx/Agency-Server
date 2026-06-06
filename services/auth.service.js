import crypto from 'crypto';
import User from '../models/user.model.js';
import Admin from '../models/admin.model.js';

export const generateResetToken = async (account) => {
  const resetToken = crypto.randomBytes(20).toString('hex');
  
  // Hash token and set to resetPasswordToken field
  account.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire (10 minutes)
  account.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  await account.save();
  return resetToken;
};

export const findByResetToken = async (token, modelType = 'admin') => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  const model = modelType === 'admin' ? Admin : User;

  return await model.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
};
