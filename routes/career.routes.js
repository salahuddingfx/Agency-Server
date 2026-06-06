import express from 'express';
import {
  getCareers,
  getCareer,
  createCareer,
  updateCareer,
  deleteCareer,
} from '../controllers/career.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';
import { isAdminStaff } from '../middlewares/admin.middleware.js';
import { validateRequest } from '../middlewares/validate.middleware.js';
import { careerSchema } from '../validators/index.validator.js';

const router = express.Router();

router.get('/', getCareers);
router.get('/:id', getCareer);

router.use(protect);
router.use(isAdminStaff);
router.use(authorize('Super Admin', 'Admin', 'Manager', 'Editor'));

router.post('/', validateRequest(careerSchema), createCareer);
router.put('/:id', validateRequest(careerSchema), updateCareer);
router.delete('/:id', deleteCareer);

export default router;
