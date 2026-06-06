import express from 'express';
import {
  getLeads,
  getLead,
  createLead,
  updateLead,
  deleteLead,
} from '../controllers/lead.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';
import { isAdminStaff } from '../middlewares/admin.middleware.js';
import { validateRequest } from '../middlewares/validate.middleware.js';
import { leadSchema } from '../validators/index.validator.js';

const router = express.Router();

router.use(protect);
router.use(isAdminStaff);
router.use(authorize('Super Admin', 'Admin', 'Manager'));

router.route('/')
  .get(getLeads)
  .post(validateRequest(leadSchema), createLead);

router.route('/:id')
  .get(getLead)
  .put(validateRequest(leadSchema), updateLead)
  .delete(deleteLead);

export default router;
