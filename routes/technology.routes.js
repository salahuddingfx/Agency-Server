import express from 'express';
import {
  getTechnologies,
  getTechnology,
  createTechnology,
  updateTechnology,
  deleteTechnology,
} from '../controllers/technology.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';
import { isAdminStaff } from '../middlewares/admin.middleware.js';
import { validateRequest } from '../middlewares/validate.middleware.js';
import { techSchema } from '../validators/index.validator.js';

const router = express.Router();

router.get('/', getTechnologies);
router.get('/:id', getTechnology);

router.use(protect);
router.use(isAdminStaff);
router.use(authorize('Super Admin', 'Admin', 'Manager', 'Editor'));

router.post('/', validateRequest(techSchema), createTechnology);
router.put('/:id', validateRequest(techSchema), updateTechnology);
router.delete('/:id', deleteTechnology);

export default router;
