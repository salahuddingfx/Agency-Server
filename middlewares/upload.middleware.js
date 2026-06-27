import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import env from '../config/env.config.js';

// Configure Cloudinary using centralized env config
cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

// Store files in memory (buffer) so we can stream them to Cloudinary
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|webp|pdf|doc|docx/;
  const mimeOk = allowed.test(file.mimetype);
  const extOk = allowed.test(file.originalname.split('.').pop().toLowerCase());

  if (mimeOk || extOk) {
    return cb(null, true);
  }
  cb(new Error('Only images, PDFs, or Word documents are allowed'));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
});

/**
 * Uploads a buffer to Cloudinary and resolves with the secure_url.
 * @param {Buffer} buffer - File buffer from multer memoryStorage
 * @param {string} folder - Cloudinary folder name
 * @returns {Promise<string>} - Resolves to the Cloudinary secure URL
 */
export function uploadToCloudinary(buffer, folder = 'nextora') {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'auto',
        transformation: [{ quality: 'auto', fetch_format: 'auto' }],
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
}

export default upload;
