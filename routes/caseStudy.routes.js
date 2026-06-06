import express from 'express';
import {
  getCaseStudies,
  getCaseStudy,
  createCaseStudy,
  updateCaseStudy,
  deleteCaseStudy,
} from '../controllers/caseStudy.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';
import { isAdminStaff } from '../middlewares/admin.middleware.js';
import { validateRequest } from '../middlewares/validate.middleware.js';
import { caseStudySchema } from '../validators/index.validator.js';

const router = express.Router();

router.get('/', getCaseStudies);
router.get('/:id', getCaseStudy);

router.use(protect);
router.use(isAdminStaff);
router.use(authorize('Super Admin', 'Admin', 'Manager', 'Editor'));

router.post('/', validateRequest(caseStudySchema), createCaseStudy);
router.put('/:id', validateRequest(caseStudySchema), updateCaseStudy);
router.delete('/:id', deleteCaseStudy);

export default router;
