import express from 'express';
import {
  getTestimonials,
  getTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/testimonial.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';
import { isAdminStaff } from '../middlewares/admin.middleware.js';
import { validateRequest } from '../middlewares/validate.middleware.js';
import { testimonialSchema } from '../validators/index.validator.js';

const router = express.Router();

router.get('/', getTestimonials);
router.get('/:id', getTestimonial);

router.use(protect);
router.use(isAdminStaff);
router.use(authorize('Super Admin', 'Admin', 'Manager', 'Editor'));

router.post('/', validateRequest(testimonialSchema), createTestimonial);
router.put('/:id', validateRequest(testimonialSchema), updateTestimonial);
router.delete('/:id', deleteTestimonial);

export default router;
