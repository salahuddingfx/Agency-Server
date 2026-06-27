import express from 'express';
import upload, { uploadToCloudinary } from '../middlewares/upload.middleware.js';
import { protect } from '../middlewares/auth.middleware.js';
import { isAdminStaff } from '../middlewares/admin.middleware.js';

const router = express.Router();

// Allow authenticated admin/staff users to upload any file to Cloudinary
router.post('/', protect, isAdminStaff, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    // Upload buffer to Cloudinary and get back permanent CDN URL
    const cloudinaryUrl = await uploadToCloudinary(req.file.buffer, 'nextora/uploads');

    res.status(200).json({
      success: true,
      url: cloudinaryUrl,
    });
  } catch (err) {
    console.error('Cloudinary upload error:', err);
    res.status(500).json({ success: false, message: err.message || 'Upload failed' });
  }
});

export default router;
