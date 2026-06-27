import User from '../models/user.model.js';
import Admin from '../models/admin.model.js';
import * as factory from '../helpers/factory.helper.js';
import { uploadToCloudinary } from '../middlewares/upload.middleware.js';

export const getUsers = factory.getAll(User);
export const getUser = factory.getOne(User);
export const createUser = factory.createOne(User);
export const updateUser = factory.updateOne(User);
export const deleteUser = factory.deleteOne(User);
export const getMe = async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
};

export const updateMe = async (req, res, next) => {
  try {
    const { name, company } = req.body;
    const updates = {};
    if (name !== undefined) updates.name = name;
    if (company !== undefined) updates.company = company;

    if (req.file) {
      // Upload avatar buffer directly to Cloudinary
      const cloudinaryUrl = await uploadToCloudinary(req.file.buffer, 'nextora/avatars');
      updates.avatar = cloudinaryUrl;
    }

    let updatedUser;
    // Check if the current authenticated user belongs to the Admin collection
    const isAdmin = req.user.role && ['Super Admin', 'Admin', 'Manager', 'Editor'].includes(req.user.role);

    if (isAdmin) {
      updatedUser = await Admin.findByIdAndUpdate(req.user._id, updates, {
        new: true,
        runValidators: true,
      });
    } else {
      updatedUser = await User.findByIdAndUpdate(req.user._id, updates, {
        new: true,
        runValidators: true,
      });
    }

    res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to update profile details',
    });
  }
};

