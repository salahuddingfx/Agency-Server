import express from 'express';
import { getSettings, updateSettings } from '../controllers/settings.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';
import { isAdminStaff } from '../middlewares/admin.middleware.js';
import { validateRequest } from '../middlewares/validate.middleware.js';
import { settingsSchema } from '../validators/index.validator.js';

const router = express.Router();

// Publicly read settings for SEO/logo rendering
router.get('/', getSettings);

// Gated update actions
router.put('/', protect, isAdminStaff, authorize('Super Admin', 'Admin'), validateRequest(settingsSchema), updateSettings);

export default router;
