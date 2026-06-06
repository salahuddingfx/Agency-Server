import { cloudinary, isCloudinaryConfigured } from '../config/cloudinary.config.js';
import fs from 'fs';

export const uploadAsset = async (filePath, folder = 'nextora') => {
  try {
    if (isCloudinaryConfigured) {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: folder,
      });
      // Delete temporary local file
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      return {
        url: result.secure_url,
        publicId: result.public_id,
      };
    } else {
      console.log(`Cloudinary inactive. Saving file locally: ${filePath}`);
      // Return local path URL directly
      const filename = filePath.split(/[\\/]/).pop();
      return {
        url: `/uploads/${filename}`,
        publicId: `local-${filename}`,
      };
    }
  } catch (error) {
    console.error(`Asset upload error: ${error.message}`);
    // Cleanup temporary file on error
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    throw error;
  }
};

export const deleteAsset = async (publicId) => {
  try {
    if (isCloudinaryConfigured && !publicId.startsWith('local-')) {
      await cloudinary.uploader.destroy(publicId);
    } else {
      console.log(`Local mock asset delete: ${publicId}`);
    }
    return { success: true };
  } catch (error) {
    console.error(`Asset deletion error: ${error.message}`);
    throw error;
  }
};
