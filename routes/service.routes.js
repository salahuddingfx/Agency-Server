import express from 'express';
import {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
} from '../controllers/service.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';
import { isAdminStaff } from '../middlewares/admin.middleware.js';
import { validateRequest } from '../middlewares/validate.middleware.js';
import { serviceSchema } from '../validators/index.validator.js';

const router = express.Router();

// Public actions
router.get('/', getServices);
router.get('/:id', getService);

// Gated actions
router.use(protect);
router.use(isAdminStaff);
router.use(authorize('Super Admin', 'Admin', 'Manager', 'Editor'));

router.post('/', validateRequest(serviceSchema), createService);
router.put('/:id', validateRequest(serviceSchema), updateService);
router.delete('/:id', deleteService);

export default router;
