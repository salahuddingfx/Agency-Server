import { v2 as cloudinary } from 'cloudinary';
import env from './env.config.js';

const isCloudinaryConfigured = 
  env.CLOUDINARY_CLOUD_NAME && 
  env.CLOUDINARY_API_KEY && 
  env.CLOUDINARY_API_SECRET;

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
  });
} else {
  console.warn('Cloudinary environment variables missing. Server will fall back to local file storage for uploads.');
}

export { cloudinary, isCloudinaryConfigured };
