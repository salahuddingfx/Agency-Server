import express from 'express';
import upload from '../middlewares/upload.middleware.js';
import { protect } from '../middlewares/auth.middleware.js';
import { isAdminStaff } from '../middlewares/admin.middleware.js';

const router = express.Router();

// Allow authenticated admin/staff users to upload any file
router.post('/', protect, isAdminStaff, upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    
    // Express serves uploads statically under /uploads
    const fileUrl = `/uploads/${req.file.filename}`;
    res.status(200).json({
      success: true,
      url: fileUrl,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
