import express from 'express';
import {
  getApplications,
  getApplication,
  createApplication,
  updateApplication,
  deleteApplication,
} from '../controllers/application.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';
import { isAdminStaff } from '../middlewares/admin.middleware.js';
import { validateRequest } from '../middlewares/validate.middleware.js';
import { applicationSchema } from '../validators/index.validator.js';

const router = express.Router();

// Public application form post
router.post('/', validateRequest(applicationSchema), createApplication);

// Gated administration view
router.use(protect);
router.use(isAdminStaff);
router.use(authorize('Super Admin', 'Admin', 'Manager', 'Editor'));

router.get('/', getApplications);
router.get('/:id', getApplication);
router.put('/:id', validateRequest(applicationSchema), updateApplication);
router.delete('/:id', deleteApplication);

export default router;
